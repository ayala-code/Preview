import Link from 'next/link';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn("flex flex-col items-center gap-0 group", className)}>
      <span className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 text-transparent bg-clip-text drop-shadow-lg group-hover:opacity-90 transition-opacity">
        Preview
      </span>
      <span className="text-xs font-bold bg-gradient-to-r from-lime-500 via-green-400 to-yellow-400 text-transparent bg-clip-text tracking-wide mt-[-2px] drop-shadow-sm">
        עיצובי פירות בהתאמה אישית
      </span>
    </Link>
  );
}
