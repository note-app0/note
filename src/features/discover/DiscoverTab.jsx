import React, { useRef, useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import BottomNav from "../../components/BottomNav";
import {
  User,
  Heart,
  Image as ImageIcon,
  FilmSlate,
} from "@phosphor-icons/react";
import { useNavigationStore } from "../../store/useNavigationStore";

export default function DiscoverTab() {
  const searchBarRef = useRef(null);
  const [searchBarHeight, setSearchBarHeight] = useState("");
  const [showCategories, setShowCategories] = useState(true);
  const lastScrollY = useRef(window.scrollY);
  const setPage = useNavigationStore((state) => state.setPage);
  const setSelectedPost = useNavigationStore((state) => state.setSelectedPost);

  useEffect(() => {
    if (searchBarRef.current) {
      setSearchBarHeight(`${searchBarRef.current.offsetHeight}px`);
    }
  }, [searchBarRef]);

  useEffect(() => {
    function onScroll() {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        setShowCategories(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up
        setShowCategories(true);
      }
      lastScrollY.current = currentScrollY;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white font-sans">
      {/* Search Bar */}
      <SearchBar ref={searchBarRef} showCategories={showCategories} />

      {/* 2-Column Grid */}
      <div
        className="grid grid-cols-2 gap-1 p-1"
        style={{ marginTop: searchBarHeight }}
      >
        {/* Grid Item 1 - Image Post */}
        <div className="grid-item bg-white rounded-lg overflow-hidden flex flex-col">
          <div
            className="relative thumbnail rounded-t-lg h-40"
            style={{ aspectRatio: "3/4" }}
          >
            {/* Actual image content */}
            <img
              src="https://picsum.photos/200/300"
              alt="Random"
              className="w-full h-full object-cover rounded-b-lg"
              style={{ height: "100%", width: "100%" }}
            />
            {/* Content type icon */}
            <div className="absolute top-2 right-2">
              <ImageIcon className="text-white text-base" weight="fill" />
            </div>
            {/* Like count on image, bottom right */}
            <div className="absolute bottom-2 right-2 flex items-center space-x-1 flex-shrink-0 bg-black/50 px-2 py-1 rounded-sm">
              <Heart className="text-white/90 text-xs" weight="fill" />
              <span className="text-xs text-white">21.6K</span>
            </div>
          </div>
          {/* Post info */}
          <div className="p-2 space-y-2">
            <p className="text-sm system-color line-clamp-2">
              The truth is that this is how lecturers sound to me once it's past
              12pm
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 min-w-0">
                <img
                  src="https://picsum.photos/100/300"
                  alt="User Avatar"
                  className="w-5 h-5 avatar rounded-full object-cover flex-shrink-0"
                />
                <span className="text-xs  muted-text truncate">
                  lade_adebayo01
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Grid Item 2 - Video Post */}
        <div
          className="grid-item bg-white rounded-lg overflow-hidden flex flex-col cursor-pointer"
          onClick={() => {
            setSelectedPost({
              src: "https://www.w3schools.com/html/mov_bbb.mp4",
              // add more fields as needed
            });
            setPage("videoDetail");
          }}
        >
          <div
            className="relative thumbnail rounded-t-lg h-40"
            style={{ aspectRatio: "3/4" }}
          >
            {/* Actual video content */}
            <video
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              className="w-full h-full object-cover rounded-b-lg"
              style={{ height: "100%", width: "100%" }}
              controls={false}
              autoPlay={false}
              loop
              muted
              playsInline
            />
            {/* Content type icon */}
            <div className="absolute top-2 right-2">
              <FilmSlate className="text-white text-base" weight="fill" />{" "}
              {/* Changed to FilmSlate */}
            </div>
            {/* Like count on video, bottom right */}
            <div className="absolute bottom-2 right-2 flex items-center space-x-1 flex-shrink-0 bg-black/50 px-2 py-1 rounded-sm">
              <Heart className="text-white/90 text-xs" weight="fill" />
              <span className="text-xs text-white ">12K</span>
            </div>
          </div>
          {/* Post info */}
          <div className="p-2 space-y-2">
            <p className="text-sm system-color line-clamp-2">
              Been learning how to use the new AI tools in my workflow
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 min-w-0">
                <img
                  src="https://picsum.photos/200/200"
                  alt="User Avatar"
                  className="w-5 h-5 avatar rounded-full object-cover flex-shrink-0"
                />
                <span className="text-xs  text-gray-400 truncate">
                  rejoice_creator
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
