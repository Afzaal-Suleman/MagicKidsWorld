import type { Metadata } from "next";
import { Inter, Fredoka } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fredoka = Fredoka({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-fredoka" });

export const metadata: Metadata = {
  title: "Magic Kids World",
  description: "A modern themed application for children",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fredoka.variable} ${inter.variable} font-fredoka antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <AnimatedBackground />
          <Navbar />
          <main className="pt-24 min-h-screen">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
