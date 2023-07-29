import {
  ArrowRight,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
} from "lucide-react";

export const MAX_FREE_COUNTS = 5;
export const TOOLS = [
  {
    label: "Czat AI",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation",
  },
  {
    label: "Generowanie obrazów",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image",
  },
  {
    label: "Generowanie video",
    icon: VideoIcon,
    color: "text-orange-600",
    bgColor: "bg-orange-600/10",
    href: "/video",
  },
  {
    label: "Generowanie muzyki",
    icon: Music,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    href: "/music",
  },
  {
    label: "Generowanie kodu aplikacji",
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/code",
  },
];
