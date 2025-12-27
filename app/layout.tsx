import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RetroGames - 在线复古游戏模拟器",
  description: "免费在线畅玩复古游戏，无需下载",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} bg-[#f8f9fa] min-h-screen text-gray-900`}>
        <Header />
        <main className="container mx-auto px-4 py-6">
            {children}
        </main>
      </body>
    </html>
  );
}
