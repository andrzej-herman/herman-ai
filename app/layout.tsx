import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import ProModalProvider from "@/components/pro-modal-provider";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Herman AI Portal",
  description: "AI platform by Andrzej Herman",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={roboto.className}>
          <ProModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

// time: 3:40:07 Pro Modal
