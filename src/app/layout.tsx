// app/layout.tsx
"use client"
import "./globals.css";
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/custom/Navbar";
import Sidebar from "@/components/custom/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/custom/theme-provider";
import { usePathname } from "next/navigation";
import { ReactNode, } from "react";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Dashboard",
//   description: "Admin dashboard layout",
// };

export default function RootLayout({ children }: { children: ReactNode }) {

  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {isLoginPage ? (
            // No layout (no Navbar/Sidebar) for login
            <>
              {children}
              <Toaster />
            </>
          ) : (
            // Regular layout with Navbar/Sidebar
            <div className="flex flex-col h-screen">
              <Navbar />
              <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 p-6 overflow-auto bg-gray-100 dark:bg-gray-900">
                  {children}
                  <Toaster />
                </main>
              </div>
            </div>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
