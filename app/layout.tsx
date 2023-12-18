import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ReduxProvider from './_components/ReduxProvider';
import './_styles/globals.scss';
import './_styles/reset.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: `Seungwan Cho's Portfolio`,
  description: 'Portfolio page of frontend developer, Seungwan Cho',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider children={children} />
      </body>
    </html>
  );
}
