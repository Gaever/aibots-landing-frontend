import type { Metadata } from "next";
import { Space_Grotesk, Inter, Unbounded } from "next/font/google";
import { headers } from "next/headers";
import { PlatformInitializer } from "@/components/PlatformInitializer";
import { ReactQueryProvider } from "@/components/ReactQueryProvider";
import type { Platform } from "@/store/usePlatformStore";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ИИ-боты под ключ | AI Business Solutions",
  description: "Автоматизируйте продажи, поддержку и бизнес с помощью искусственного интеллекта",
  icons: {
    icon: "/favicon.svg",
  },
};

async function detectPlatform(): Promise<Platform> {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";

  // Check for Android
  if (/android/i.test(userAgent)) {
    return "android";
  }

  // Default to iOS
  return "ios";
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const platform = await detectPlatform();

  return (
    <html lang="ru" className="scroll-smooth">
      <body className={`${inter.variable} ${unbounded.variable} antialiased`}>
        <PlatformInitializer initialPlatform={platform} />
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
