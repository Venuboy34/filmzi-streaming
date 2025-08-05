import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black border-b border-green-500 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="https://envs.sh/E9r.jpg"
                alt="Filmzi Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <h1 className="text-2xl font-bold text-green-500">Filmzi</h1>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="hover:text-green-500 transition-colors">
                Home
              </Link>
              <Link href="/search" className="hover:text-green-500 transition-colors">
                Search
              </Link>
              <a 
                href="https://t.me/filmzi2" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-500 text-black px-4 py-2 rounded-md hover:bg-green-400 transition-colors"
              >
                Join Telegram
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-green-500 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-400 mb-4">
              © 2025 Filmzi — All Rights Reserved
            </p>
            <div className="flex justify-center space-x-4">
              <a 
                href="https://t.me/filmzi2" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-400 transition-colors"
              >
                Join us on Telegram →
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
