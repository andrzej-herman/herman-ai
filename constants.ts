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

export const PREMIUM_PLANS = [
  {
    name: "Mikro",
    description: "5 tokenów Geniusz",
    price: "4.99",
    id: "price_1NaCnSAbxb6ynim0pIjqasj0",
  },
  {
    name: "Mini",
    description: "10 tokenów Geniusz",
    price: "7.99",
    id: "price_1NaCotAbxb6ynim0oQw5bYRT",
  },
  {
    name: "Standard",
    description: "50 tokenów Geniusz",
    price: "29.99",
    id: "price_1NaCq0Abxb6ynim0vXrX4F7F",
  },
  {
    name: "Premium",
    description: "100 tokenów Geniusz",
    price: "49.99",
    id: "price_1NaCr1Abxb6ynim0FmmNAlhe",
  },
];





// 4.99 PLN Pakiet 5 tokenów => Mikro
// 7.99 PLN Pakiet 10 tokenów => Mini
// 29.99 PLN Pakiet 50 tokenów. => Standard (najczęściej wybierany)
// 49.99 PLN Pakiet 100 tokenów. => Premium