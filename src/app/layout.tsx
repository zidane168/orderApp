import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import moment from "moment";
import Header from "@/components/layout/Header"; 
import { AppProvider } from "@/components/AppContext";
import { Toaster } from 'react-hot-toast'

const roboto = Roboto({ subsets: ["latin"], weight: ['400', '500', '700'] });

require('dotenv').config();

export const metadata: Metadata = {
  title: "Order app",
  description: "By ViLH",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main className="max-w-4xl p-4 mx-auto"> 
          <AppProvider>

            <Toaster />
            <Header />
            {children}
            <footer className="p-8 mt-16 text-center border-t">
              &copy; { moment().year()} All right reserved
            </footer> 
          </AppProvider>
        </main>
      </body>
    </html>
  );
}
