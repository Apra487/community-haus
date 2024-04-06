import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';
import './globals.css';
require('@solana/wallet-adapter-react-ui/styles.css');

const Providers = dynamic(() => import('./providers'));

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} container flex justify-center `}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
