import create from "zustand";

const useStore = create((set) => ({
  link: "/",
  setLink: (newLink) => {
    set((state) => ({
      link: newLink,
    }));
  },
}));

export default useStore;
