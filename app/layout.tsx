import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "TravelWithLocals — Where Locals Take You Off the Map",
    template: "%s · TravelWithLocals",
  },
  description:
    "Connect with local hosts, plan community-built itineraries, and book stays and transport for trips shaped by people who actually live there.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth">
      {/* suppressHydrationWarning: some browser extensions (e.g. video-speed
          controllers) inject a class onto <body> before React hydrates —
          this is the documented escape hatch for that mismatch, not for
          hiding real ones. */}
      <body className="flex min-h-full flex-col bg-surface text-ink-700" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-brand-blue focus:px-4 focus:py-2 focus:text-mist-100"
        >
          Skip to content
        </a>
        <div id="main-content" className="flex flex-1 flex-col">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
