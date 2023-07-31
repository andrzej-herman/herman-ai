import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import ProModalProvider from "@/components/pro-modal-provider";
import MusicVideoModalProvider from "@/components/musicvideo-modal-provider";
import { plPL } from "@clerk/localizations";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Geniusz",
  description: "Platforma sztucznej inteligencji",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={plPL}>
      <html lang="en">
        <body className={roboto.className}>
          <MusicVideoModalProvider />
          <ProModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

// time: 4:21:14 webhook
// RESET PRISMA
// npx prisma migrate reset
// npx prisma generate
// npx prisma db push
