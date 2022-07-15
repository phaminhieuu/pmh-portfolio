import create from "zustand";

const useStore = create((set) => ({
  index: 1,
  setIndex: (newIndex) => {
    set((state) => ({
      index: newIndex,
    }));
  },
}));

export default useStore;
