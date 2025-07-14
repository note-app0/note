import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import BottomNav from "../../components/BottomNav";
import PostCard from "./Posts";
import { useNavigationStore } from "../../store/useNavigationStore";
import TextPost from "./TextPost";
import AdCard from "./AdCard";
import "./PostsFeed.css";
import GlassNav from "../../components/GlassNav";
import { Users, MagnifyingGlass } from "@phosphor-icons/react";

export default function PostsFeed() {
  const setSelectedPost = useNavigationStore((state) => state.setSelectedPost);
  const setPage = useNavigationStore((state) => state.setPage);
  const page = useNavigationStore((state) => state.page);
  const handleBack = () => setPage("suggestedAccounts");

  const [topNavHeight, setTopNavHeight] = useState(0);
  const [bottomNavHeight, setBottomNavHeight] = useState(0);

  // Framer-motion controls for GlassNav visibility
  const glassNavRef = useRef(null);
  const controls = useAnimation();
  const lastScrollY = useRef(window.scrollY);

  useLayoutEffect(() => {
    if (glassNavRef.current) {
      setTopNavHeight(glassNavRef.current.offsetHeight);
    }
    const bottomNav = document.querySelector(".glass-bottom-nav");
    if (bottomNav) {
      setBottomNavHeight(bottomNav.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 32) {
        // Scrolling down, hide GlassNav
        controls.start({ y: -60 });
      } else {
        // Scrolling up, show GlassNav
        controls.start({ y: 0 });
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  // Tab switching logic: navigate to home (VideosFeed) when Reels is clicked
  const handleReelsTabClick = () => {
    if (page !== "home") {
      setPage("home");
    }
  };

  // Call this when an image post is clicked
  const handlePostClick = (post) => {
    setSelectedPost({ type: "image", data: post });
    setPage("PostComments");
  };

  // Call this when a text post is clicked
  const handleTextPostClick = (post) => {
    setSelectedPost({ type: "text", data: post });
    setPage("PostComments");
  };

  // Example posts array (replace with your real data)
  const posts = [
    { id: 1, type: "image", data: {} },
    { id: 2, type: "text", data: {} },
    // ...more posts
  ];

  return (
    <div className="posts-feed min-h-screen feed-container flex flex-col font-sans">
      <motion.div
        animate={controls}
        initial={{ y: 0 }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}
      >
        <GlassNav
          ref={glassNavRef}
          darkMode={true}
          left={
            <button className=" h" onClick={handleBack}>
              <Users className="text-2xl system-color" />
            </button>
          }
          center={
            <>
              <button
                className={`w-full flex items-center justify-center border-b-2 transition-colors ${
                  page === "home"
                    ? "border-black font-semibold"
                    : "border-transparent muted-text font-normal"
                }`}
                onClick={handleReelsTabClick}
                aria-current={page === "home" ? "page" : undefined}
              >
                Reels
              </button>
              <button
                className={`w-full flex items-center justify-center py-[6.5px] transition-colors ${
                  page === "postsFeed"
                    ? "system-border-b-2 system-color font-semibold"
                    : "border-transparent muted-text font-normal"
                }`}
                onClick={() => setPage("postsFeed")}
                aria-current={page === "postsFeed" ? "page" : undefined}
              >
                Posts
              </button>
            </>
          }
          right={
            <button>
              <MagnifyingGlass className="text-2xl system-color" />
            </button>
          }
        />
      </motion.div>

      <main
        className="feed-main flex flex-col font-sans"
        style={{ marginTop: topNavHeight }}
      >
        {posts.map((post) =>
          post.type === "text" ? (
            <TextPost
              key={post.id}
              {...post.data}
              onTextPostClick={() => handleTextPostClick(post.data)}
            />
          ) : (
            <PostCard
              key={post.id}
              {...post.data}
              onPostClick={() => handlePostClick(post.data)}
            />
          )
        )}
        <AdCard />
        {/* ...other feed items */}
      </main>

      <BottomNav />
    </div>
  );
}
