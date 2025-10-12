import './globals.css';
import type { Metadata } from 'next';
import AppProviders from './providers';

export const metadata: Metadata = {
  title: 'NounLogic',
  description: 'Connect with students worldwide — groups, messages, communities',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-ash-white text-foreground dark:bg-deep-ash dark:text-foreground transition-colors duration-300 font-sans">
        <AppProviders>
          {children}
        </AppProviders>
        <script src="https://chat-widget.sensay.io/3b1918af-8a5f-4088-b107-5aec870d9716/embed-script.js" defer />
      </body>
    </html>
  );
}
