'use client'

import { Roboto, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import Navbar from "./_Components/Navbar/Navbar";
import { Provider } from 'react-redux'
import { ourStore } from "_/lib/Redux/FakebossStore"; 
const geistSans = Roboto({
  variable: "--font-Merriweather",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-Merriweather",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)

{
  return (
    <html lang="en">
      <head>
        <title>Fakeboos</title>
      </head>
      <body
       className={`${geistSans.variable} ${geistMono.variable}`}
      >
        
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <Provider store={ourStore}>
          
          <Navbar />
            {children}
            </Provider>
        </AppRouterCacheProvider>
        
      </body>
    </html>
  );
}
