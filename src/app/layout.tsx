import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import moment from "moment";
import Header from "@/components/layout/Header";

const roboto = Roboto({ subsets: ["latin"], weight: ['400', '500', '700'] });

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
        <main className="max-w-4xl mx-auto   p-4">
          <Header />
          {children}
          <footer className="border-t p-8 text-center mt-16">
            &copy; { moment().year()} All right reserved
          </footer>
        </main>
      </body>
    </html>
  );
}
