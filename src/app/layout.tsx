import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Bricolage_Grotesque } from 'next/font/google';
import './globals.css';
import SessionWrapper from '../components/SessionWrapper';
require('@solana/wallet-adapter-react-ui/styles.css');

const Providers = dynamic(() => import('./providers'));

const bricolageGrotesque = Bricolage_Grotesque({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Community Haus',
  description: 'Connect With Your Collectors Today',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body
          className={`${bricolageGrotesque.className} flex justify-center `}
        >
          <Providers>{children}</Providers>
        </body>
      </html>
    </SessionWrapper>
  );
}
