import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Web3Provider from "@/providers/Web3Provider";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
// import { Toaster } from 'sonner'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Souldity",
  description: "Soulbound Identity",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <head className="bg-[#fff]">
      <html lang="en">
        <body className={inter.className}>
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
          <Web3Provider>
            <Navbar />
            <main className="min-h-screen min-w-screen flex flex-col items-center justify-start">
              <div className="h-[4.5rem]"/>
              {children}
              <div className="h-[2.465rem]"/>
            </main>
            <Footer />
          </Web3Provider>
        </body>
      </html>
    </head>
  );
}
