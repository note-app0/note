import React, { forwardRef } from "react";
import "./GlassNav.css";

const GlassNav = forwardRef(function GlassNav(
  { left, center, right, transparent = false, getIconColor, className },
  ref
) {
  // Detect dark mode from the DOM
  const isDark =
    typeof document !== "undefined" && document.body.classList.contains("dark");

  const navBgClass = transparent ? "bg-transparent" : "navbar";

  // Helper to wrap children with color if getIconColor is provided
  function renderWithColor(child, isActive = false) {
    if (!getIconColor) return child;
    const colorClass = getIconColor(child, isActive);
    return React.cloneElement(child, {
      className: `${child.props.className || ""} ${colorClass}`.trim(),
    });
  }

  return (
    <div
      ref={ref}
      className={`${navBgClass} fixed top-0 left-0 right-0 z-50 h-10 flex items-center justify-between px-4 ${
        className || ""
      }`}
    >
      <div className="flex items-center">{left}</div>
      <div className="flex items-center space-x-8">{center}</div>
      <div className="flex items-center">{right}</div>
    </div>
  );
});

export default GlassNav;
