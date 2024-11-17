import './globals.css';
import type { Metadata } from 'next';
import { Orbitron } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
import { MouseCursor } from '@/components/mouse-cursor';
import { Toaster } from '@/components/ui/sonner';
import { SearchProvider } from '@/components/search-provider';
import { Footer } from '@/components/footer';

const orbitron = Orbitron({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AniStream - Watch Anime Online',
  description: 'Watch your favorite anime shows in HD quality',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${orbitron.className} flex flex-col min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SearchProvider>
            <MouseCursor />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster />
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}