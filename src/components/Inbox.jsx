import React, { useState, useEffect, useRef } from "react";
import { useNavigationStore } from "../store/useNavigationStore";
import { ChatCircle, Bell, EnvelopeSimpleOpen } from "@phosphor-icons/react";
import BottomNav from "./BottomNav";
import NotificationsContainer from "./NotificationsContainer";
import Friends from "./Friends/Friends";
import EmptyState from "./EmptyState"; // <-- import
import SearchBar from "./SearchBar";

const tabData = [
  {
    icon: ChatCircle,
    badge: 2,
    label: "Chats",
  },
  {
    icon: Bell,
    badge: 5,
    label: "Notifications",
  },
  {
    icon: EnvelopeSimpleOpen,
    label: "Mail",
  },
];

export default function Inbox() {
  const [activeTab, setActiveTab] = useState(0);
  const setPage = useNavigationStore((state) => state.setPage);

  // Ref and state for tab bar height
  const tabBarRef = useRef(null);
  const [tabBarHeight, setTabBarHeight] = useState(56); // fallback default

  // Prevent auto scroll down on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Dynamically measure tab bar height
  useEffect(() => {
    if (tabBarRef.current) {
      setTabBarHeight(tabBarRef.current.offsetHeight);
    }
  }, []);

  return (
    <div>
      {/* Make the tab bar fixed and always visible */}
      <div
        ref={tabBarRef}
        className="fixed top-0 left-0 right-0 z-50 bg-white grid grid-cols-3 text-center text-xl font-medium font-sans system-border"
        style={{
          minHeight: "45px",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
        }}
      >
        {tabData.map((tab, idx) => {
          const isActive = activeTab === idx;
          const Icon = tab.icon;
          return (
            <button
              key={tab.label}
              className={`tab-item py-3 w-full flex items-center justify-center ${
                isActive ? "system-border-b-2" : "border-transparent muted-text"
              }`}
              onClick={() => setActiveTab(idx)}
              aria-label={tab.label}
              aria-selected={isActive}
            >
              <Icon
                className={`text-2xl ${
                  isActive ? "system-color" : "muted-text"
                }`}
              />
              {/* Only show badge if tab.badge exists */}
              {tab.badge !== undefined && (
                <span className="absolute top-1 right-9 bg-red-500 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {/* Add padding to push content below fixed tabs */}
      <div style={{ paddingTop: tabBarHeight }}>
        {/* SearchBar appears in all tabs */}
        <SearchBar />
        {activeTab === 0 && <Friends />}
        {activeTab === 1 && <NotificationsContainer />}
        {activeTab === 2 && (
          <EmptyState
            title="No message requests"
            message="You don’t have any message requests at the moment."
          />
        )}
        <BottomNav />
      </div>
    </div>
  );
}
