import React, { useRef, useEffect } from "react";
import {
  House,
  SquaresFour,
  Plus,
  ChatCentered,
  User,
} from "@phosphor-icons/react";
import "./BottomNav.css";
import { useNavigationStore } from "../store/useNavigationStore";

export default function BottomNav({
  transparent = false,
  iconColor = "",
  getIconColor,
  className,
}) {
  const navRef = useRef(null);
  const setPage = useNavigationStore((state) => state.setPage);
  const page = useNavigationStore((state) => state.page);

  const tabList = [
    { icon: <House className="text-2xl" />, label: "Home", page: "home" },
    {
      icon: <SquaresFour className="text-2xl" />,
      label: "Search",
      page: "discover",
    },
    {
      icon: <ChatCentered className="text-2xl" />,
      label: "Inbox",
      badge: 3,
      page: "inbox",
    },
    { icon: <User className="text-2xl" />, label: "Profile", page: "profile" },
  ];

  const leftTabs = tabList.slice(0, 2);
  const rightTabs = tabList.slice(2);
  const tabPages = tabList.map((tab) => tab.page);

  useEffect(() => {
    function handleSafeArea() {
      const nav = navRef.current;
      if (!nav) return;
      const safeAreaBottom =
        getComputedStyle(document.documentElement).getPropertyValue(
          "--safe-area-inset-bottom"
        ) || "0px";
      if (safeAreaBottom !== "0px") {
        nav.style.paddingBottom = safeAreaBottom;
      }
    }
    handleSafeArea();
    window.addEventListener("orientationchange", () => {
      setTimeout(handleSafeArea, 100);
    });

    return () => {
      window.removeEventListener("orientationchange", () => {
        setTimeout(handleSafeArea, 100);
      });
    };
  }, []);

  // Add dynamic classes
  const navBgClass = transparent ? "bg-transparent" : "bg-white";
  const iconClass = iconColor ? iconColor : "";

  // Helper to get icon color class
  function resolveIconColor(tab, isActive) {
    if (getIconColor) return getIconColor(tab, isActive);
    if (iconColor) return iconColor;
    if (isActive) return "active system-color";
    return "system-color";
  }

  return (
    <nav>
      <div
        className={`glass-bottom-nav ${navBgClass} ${
          className || "system-border-top"
        } fixed bottom-0 left-0 right-0 z-50 h-[46px] flex items-center justify-between px-4 safe-area-inset-bottom`}
        ref={navRef}
      >
        {/* Left tabs */}
        {leftTabs.map((tab) => {
          const isActive =
            tab.page === "home"
              ? page === "home" || page === "postsFeed"
              : page === tab.page && tabPages.includes(page);
          // Clone the icon and inject the weight prop
          const iconWithWeight = React.cloneElement(tab.icon, {
            weight: isActive ? "fill" : "regular",
          });
          return (
            <button
              key={tab.label}
              className={`tab-btn flex flex-col items-center justify-center  rounded-lg ${resolveIconColor(
                tab,
                isActive
              )}${tab.badge ? " relative" : ""}`}
              onClick={() => setPage(tab.page)}
              aria-label={tab.label}
            >
              {iconWithWeight}
              {tab.badge && (
                <span className="absolute top-1 -right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Create Button in the center */}
        <button
          aria-label="Create"
          ref={navRef}
          onClick={() => setPage("recording")}
        >
          <div className="create-button cursor-pointer">
            <div className="create-button-inner">
              <Plus className="text-2xl" />
            </div>
          </div>
        </button>

        {/* Right tabs */}
        {rightTabs.map((tab) => {
          const isActive = page === tab.page && tabPages.includes(page);
          const iconWithWeight = React.cloneElement(tab.icon, {
            weight: isActive ? "fill" : "regular",
          });
          return (
            <button
              key={tab.label}
              className={`tab-btn flex flex-col items-center justify-center rounded-lg ${resolveIconColor(
                tab,
                isActive
              )}${tab.badge ? " relative" : ""}`}
              onClick={() => setPage(tab.page)}
              aria-label={tab.label}
            >
              {iconWithWeight}
              {tab.badge && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
