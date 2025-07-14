import React from "react";
import "./VideosFeed.css";
import useFeedSnapScroll from "./VideosFeedScrollLogic";
import { Users, MagnifyingGlass } from "@phosphor-icons/react";
import BottomNav from "../../components/BottomNav";
import Reels from "./Reels";
import { useNavigationStore } from "../../store/useNavigationStore";
import GlassNav from "../../components/GlassNav"; // <-- import GlassNav

export default function VideosFeed() {
  const feedContainerRef = useFeedSnapScroll();
  const setPage = useNavigationStore((state) => state.setPage);

  const handlePostsTabClick = () => {
    setPage("postsFeed");
  };

  const handleUsersClick = () => {
    setPage("suggestedAccounts");
  };

  return (
    <div className="bg-white overflow-hidden">
      <GlassNav
        transparent
        className="no-border" // This removes the border-bottom
        left={
          <button onClick={handleUsersClick}>
            <Users className="text-2xl text-white" />
          </button>
        }
        center={
          <>
            <button
              className={`w-full flex items-center py-[6.5px] justify-center border-b-2 transition-colors ${
                // Assuming "Reels" is always active in VideosFeed
                "border-white text-white font-semibold"
              }`}
              aria-current="page"
            >
              Reels
            </button>
            <button
              className={`w-full flex items-center justify-center border-b-2 transition-colors text-lg font-normal ${
                // No active state for Posts tab here
                "border-transparent text-white/80"
              }`}
              onClick={handlePostsTabClick}
            >
              Posts
            </button>
          </>
        }
        right={
          <button>
            <MagnifyingGlass className="text-2xl text-white" />
          </button>
        }
      />

      <div
        className="feed-container h-screen w-full overflow-y-scroll snap-y snap-mandatory pt-16 font-sans"
        ref={feedContainerRef}
      >
        <Reels />
      </div>
      <BottomNav
        transparent
        className="border-t border-white/30 videos-feed-bottom-nav"
        getIconColor={(_, isActive) => (isActive ? "text-white" : "text-white")}
      />
    </div>
  );
}
