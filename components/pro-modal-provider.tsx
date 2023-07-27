"use client";

import { useEffect, useState } from "react";
import ProModal from "@/components/pro-modal";

const ProModalProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <ProModal />
    </>
  );
};

export default ProModalProvider;
