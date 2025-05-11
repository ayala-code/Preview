import Link from 'next/link';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn("text-2xl font-bold text-primary hover:opacity-80 transition-opacity", className)}>
      פריויו
    </Link>
  );
}
