import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react'; // Using ArrowLeft for RTL "Get Started" button

export default function HeroSection() {
  return (
    <section className="relative h-[60vh] min-h-[400px] md:h-[70vh] flex items-center justify-center text-center text-white rounded-lg overflow-hidden shadow-xl">
      <Image
        src="https://picsum.photos/1200/800?random=1"
        alt="מגש פירות מעוצב"
        layout="fill"
        objectFit="cover"
        quality={85}
        className="z-0"
        data-ai-hint="luxury fruit platter"
      />
      <div className="absolute inset-0 bg-black/50 z-10" />
      <div className="relative z-20 p-6 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-md">
          פריויו – מגשי פירות מעוצבים בהתאמה אישית
        </h1>
        <p className="mt-4 text-xl md:text-2xl font-light drop-shadow-sm">
          טרי. צבעוני. יוקרתי.
        </p>
        <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
          <Link href="/order">
            התחלת הזמנה
            <ArrowLeft className="mr-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
