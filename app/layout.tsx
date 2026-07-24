import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/components/UserProvider";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], 
});

export const metadata: Metadata = {
  title: "Ember - Your daily health companion",
  description: "AI-powered health companion for chronic illness management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen text-slate-900 bg-white`} suppressHydrationWarning>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
