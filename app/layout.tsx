import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Prausdit - AI-Native Systems for the Next Computing Era",
    template: "%s | Prausdit",
  },
  description:
    "Prausdit engineers AI-native operating systems. Explore Protroit OS, our flagship AI-first OS with on-device intelligence, NPU-first inference, and secure AI agents.",
  keywords: [
    "AI Operating System",
    "Protroit OS",
    "Prausdit",
    "AI-native",
    "NPU inference",
    "AI agents",
    "AgentKit SDK",
  ],
  openGraph: {
    title: "Prausdit - AI-Native Systems for the Next Computing Era",
    description:
      "Engineering the AI-native future with Protroit OS and the AgentKit SDK ecosystem.",
    type: "website",
    images: ["/images/banner.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#00F5FF",
          colorBackground: "#111118",
          colorText: "#E8E8ED",
          colorInputBackground: "#1A1A28",
          colorInputText: "#E8E8ED",
        },
      }}
    >
      <html lang="en">
        <body className="font-sans antialiased">
          {children}
          <Toaster
            theme="dark"
            toastOptions={{
              style: {
                background: "#111118",
                border: "1px solid #222233",
                color: "#E8E8ED",
              },
            }}
          />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
