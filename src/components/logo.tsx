import Link from 'next/link';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="rounded-full border-4 border-fuchsia-400 bg-gradient-to-br from-pink-100 via-pink-50 to-fuchsia-100 shadow-lg px-8 py-3 flex items-center justify-center">
        <Link href="/" className={cn("flex flex-col items-center gap-0 group", className)}>
          <span className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-pink-600 via-pink-400 to-pink-300 text-transparent bg-clip-text drop-shadow-2xl group-hover:opacity-90 transition-opacity">
            Preview
          </span>
          <span className="ml-2 text-base font-bold text-pink-600">
            פריוויו – עיצובי פירות
          </span>
        </Link>
      </div>
    </div>
  );
}
