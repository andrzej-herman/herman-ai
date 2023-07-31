import { create } from "zustand";

interface useMusicVideoModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useMusicVideoModal = create<useMusicVideoModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));