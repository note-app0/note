import react from "react";
import RightBar from "../reelsControl/RightBar";
import BottomSection from "../reelsControl/BottomSection";

export default function Reels() {
  return (
    <div className="feed-item relative h-screen w-full bg-gray-900 flex items-center justify-center">
      <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80"
        alt="Mountain landscape"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <RightBar />
      <BottomSection />
    </div>
  );
}
