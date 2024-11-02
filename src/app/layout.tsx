import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";

import "./globals.css";

const roboto_mono = Roboto_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Your Files",
  description: "List and sort your files",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto_mono.className}>
        <main className="flex items-center justify-center text-white p-5">
          <div className="w-full border border-white p-10 lg:pr-52 lg:pl-52 rounded-3xl">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
