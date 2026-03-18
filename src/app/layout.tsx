import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "macOS Sequoia",
  description: "A high-fidelity macOS clone built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased overflow-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
