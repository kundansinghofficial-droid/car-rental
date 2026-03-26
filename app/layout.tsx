import type {Metadata} from 'next';
import { Montserrat, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'LuxeDrive Prestige | Luxury Car Rental',
  description: 'Experience the pinnacle of automotive excellence with our curated collection of luxury vehicles.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${cormorant.variable}`}>
      <body suppressHydrationWarning className="bg-[#f5f2ed] text-[#1a1a1a] antialiased">
        {children}
      </body>
    </html>
  );
}
