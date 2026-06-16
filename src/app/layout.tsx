import type { Metadata } from "next";
import { Poppins, Syne } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Muhammed Afnan | AI Developer & Full-Stack UI Engineer",
  description: "Explore the futuristic portfolio of Muhammed Afnan, a Software Developer & AI/ML Engineer specializing in cinematic web experiences, responsive UI/UX, and machine learning solutions.",
  keywords: [
    "Muhammed Afnan",
    "AI Developer",
    "UI Engineer",
    "Frontend Developer",
    "Machine Learning Engineer",
    "Next.js Portfolio",
    "GSAP Animations",
    "Framer Motion",
    "Lenis Scroll",
  ],
  authors: [{ name: "Muhammed Afnan" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${syne.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-[#050510] text-[#f8fafc] overflow-x-hidden">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
