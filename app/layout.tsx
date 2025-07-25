import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
//import { ThemeProvider } from "@/components/themeprovider";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anony Send",
  description: "Anony Send is an application that allows different type of peoples to send anonymous messages and ask the user any anonymous question.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      {/* <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange> */}
      <AuthProvider>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
          <Toaster position="bottom-right"/>
      </body>
      </AuthProvider >
      {/* </ThemeProvider> */}
    </html>
  
  );
}
