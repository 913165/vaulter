"use client"
import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [theme, setTheme] = useState('light');
  const pathname = usePathname();

  useEffect(() => {
    if (localStorage.theme) {
      setTheme(localStorage.theme);
      document.documentElement.classList.add(localStorage.theme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.theme = newTheme;
    document.documentElement.classList.toggle('dark');
  };

  const navLinks = [
    { href: '/', label: 'Vaulter' },
    { href: '/secrets', label: 'Secrets' },
    { href: '/about', label: 'About' },
  ];

  return (
    <header className="flex items-center justify-between p-4 bg-header text-header-foreground border-b border-border/20 shadow-sm">
      <div className="flex items-center gap-6">
     
        <nav className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm text-white hover:text-white/80 transition-colors",
                pathname === link.href && "font-bold"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <div className="px-4 py-2 hover:bg-blue-600 text-white rounded-md transition-colors">
          <SignedOut>
            <SignInButton mode="modal" />
          </SignedOut>
          <SignedIn>
            <div className="w-15 h-15 flex items-center justify-center">
              <UserButton />
            </div>
          </SignedIn>
        </div>
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
      </div>
    </header>
  );
};

export default Header;