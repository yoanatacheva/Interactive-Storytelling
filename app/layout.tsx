import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";
import { ReactLenis } from '@/lib/lenis'
import Footer from "@/components/Footer";
import { FontProvider } from "@/components/FontProvider";

const Inter = localFont({
  src: "./fonts/Inter.woff2",
  variable: "--font-inter",
  weight: "100 900",
});

const Helvetica = localFont({
  src: "./fonts/Helvetica-Regular.woff2",
  variable: "--font-helvetica",
  style: "regular",
});

const Juana = localFont({
  src: "./fonts/Juana-SemiBold.woff2",
  variable: "--font-juana",
  style: "semibold",
});

const Dyslexic = localFont({
  src: "./fonts/Dyslexic.woff2",
  variable: "--font-dyslexic",
  style: "regular",
});

export const metadata: Metadata = {
  title: "Megan Majocha's Story",
  description: "Interactive storytelling website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactLenis root options={{ lerp: 0.1 }}>
        <body className={`flex flex-col ${Inter.variable} ${Juana.variable} ${Helvetica.variable} ${Dyslexic.variable} antialiased select-none font-inter`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange>
            <FontProvider>
              <main className="flex-grow">{children}</main>
              <Footer />
            </FontProvider>
          </ThemeProvider>
        </body>
      </ReactLenis>
    </html>
  );
}
