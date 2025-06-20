import "./globals.css";

import { Geist_Mono } from "next/font/google";

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-geist-mono",
});

export const metadata = {
  title: "Dinner Configurator 9000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} font-mono gridlines bg-size-[2rem_2rem] lg:bg-size-[3rem_3rem] text-neutral-900`}
      >
        {children}
      </body>
    </html>
  );
}
