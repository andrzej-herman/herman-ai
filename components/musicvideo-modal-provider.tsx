"use client";

import { useEffect, useState } from "react";
import MusicVideoModal from "@/components/musicvideo-modal";

const MusicVideoModalProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <MusicVideoModal />
    </>
  );
};

export default MusicVideoModalProvider;