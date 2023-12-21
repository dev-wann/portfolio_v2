import type { Metadata } from 'next';
import ReduxProvider from './_components/ReduxProvider';
import './_styles/globals.scss';
import './_styles/reset.css';

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
      <body>
        <ReduxProvider children={children} />
      </body>
    </html>
  );
}
