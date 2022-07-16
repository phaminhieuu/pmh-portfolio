import create from "zustand";

const useStore = create((set) => ({
  index: 1,
  haveBg: false,
  setIndex: (newIndex) => {
    set((state) => ({
      index: newIndex,
    }));
  },
  setHaveBg: (value) => {
    set(() => ({
      haveBg: value,
    }));
  },
}));

export default useStore;
