import React, { forwardRef } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import "./SearchBar.css";

const SearchBar = forwardRef(function SearchBar(
  { hideSearchButton, showCategories = true },
  ref
) {
  const categoryVariants = {
    hidden: { opacity: 0, y: -24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }, // slower show
    },
    exit: { opacity: 0, y: -24, transition: { duration: 0.6, ease: "easeIn" } }, // slower hide
  };

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 font-sans"
    >
      {!hideSearchButton && (
        <div className="search-container p-4">
          <button
            id="searchButton"
            className="flex items-cente muted-text w-full space-x-3 system-search-bar px-4 py-2 rounded-full transition-colors"
          >
            <MagnifyingGlass className="w-5 h-5" />
            <span className="text-sm muted-text">
              Search for contents, creators...
            </span>
          </button>
        </div>
      )}

      <AnimatePresence>
        {showCategories && (
          <motion.div
            key="categories"
            variants={categoryVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="category-scroll flex space-x-2 overflow-x-auto p-4 pt-0 muted-text font-semibold"
          >
            <button className="pill-button active system-color px-4 py-2 rounded-full system-search-bar text-sm font-medium whitespace-nowrap">
              All
            </button>
            <button className="pill-button px-4 py-2 rounded-full system-search-bar muted-text text-sm font-medium whitespace-nowrap hover:bg-gray-200">
              Trending
            </button>
            <button className="pill-button px-4 py-2 rounded-full system-search-bar text-sm font-medium whitespace-nowrap hover:bg-gray-200">
              Music
            </button>
            <button className="pill-button px-4 py-2 rounded-full system-search-bar text-sm font-medium whitespace-nowrap hover:bg-gray-200">
              Dance
            </button>
            <button className="pill-button px-4 py-2 rounded-full system-search-bar text-sm font-medium whitespace-nowrap hover:bg-gray-200">
              Comedy
            </button>
            <button className="pill-button px-4 py-2 rounded-full system-search-bar text-sm font-medium whitespace-nowrap hover:bg-gray-200">
              Gaming
            </button>
            <button className="pill-button px-4 py-2 rounded-full system-search-bar text-sm font-medium whitespace-nowrap hover:bg-gray-200">
              Food
            </button>
            <button className="pill-button px-4 py-2 rounded-full system-search-bar text-sm font-medium whitespace-nowrap hover:bg-gray-200">
              Travel
            </button>
            <button className="pill-button px-4 py-2 rounded-full system-search-bar text-sm font-medium whitespace-nowrap hover:bg-gray-200">
              Fashion
            </button>
            <button className="pill-button px-4 py-2 rounded-full system-search-bar text-sm font-medium whitespace-nowrap hover:bg-gray-200">
              Sports
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default SearchBar;
