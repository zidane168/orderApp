import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./../globals.css";

import moment from "moment";
import Header from "@/components/layout/Header"; 
import { AppProvider } from "@/components/AppContext";
import { Toaster } from 'react-hot-toast'  
 
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

const roboto = Roboto({ subsets: ["latin"], weight: ['400', '500', '700'] });

require('dotenv').config();

export const metadata: Metadata = {
  title: "Order app",
  description: "By ViLH",
};

export default async function RootLayout({
  children, 
  params: {locale}
}: Readonly<{
  children: React.ReactNode,  
  params: {locale: string};
}>) {
 
  const messages = await getMessages();
  
  return (
    <html lang={locale}>
      <body className={roboto.className}>
        <main className="max-w-4xl p-4 mx-auto"> 
          <NextIntlClientProvider messages={messages}>
            <AppProvider> 
                <Toaster />
                <Header />
                {children}
                <footer className="p-8 mt-16 text-center border-t">
                  &copy; { moment().year()} All right reserved
                </footer>  
            </AppProvider>
          </NextIntlClientProvider>
        </main>
      </body>
    </html>
  );
}
