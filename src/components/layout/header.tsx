"use client";

import Link from 'next/link';
import MenuIcon from "@mui/icons-material/Menu";
import AppleIcon from "@mui/icons-material/Apple";
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/logo';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'דף הבית' },
  { href: '/about', label: 'אודות' },
  { href: '/order', label: 'התחלת הזמנה' },
  { href: '/contact', label: 'צור קשר' },
  { href: '/admin', label: 'ניהול (Admin)' }, // Added admin for testing
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center space-x-6 space-x-reverse text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-primary",
                pathname === item.href ? "text-primary font-semibold" : "text-foreground/70"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">פתח תפריט ניווט</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-lg transition-colors hover:text-primary p-2 rounded-md",
                       pathname === item.href ? "text-primary bg-muted font-semibold" : "text-foreground/70"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
