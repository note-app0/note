import { create } from "zustand";

// Zustand store for navigation state
export const useNavigationStore = create((set) => ({
  page: "home", // default page
  setPage: (page) => set({ page }),
  lastPage: "home",
  setLastPage: (page) => set({ lastPage: page }),
  feedScroll: 0,
  setFeedScroll: (pos) => set({ feedScroll: pos }),
  commentSliderProps: { videoSrc: "", initialTime: 0 },
  setCommentSliderProps: (props) => set({ commentSliderProps: props }),
  selectedPost: null, // <-- add this
  setSelectedPost: (post) => set({ selectedPost: post }), // <-- add this
}));
