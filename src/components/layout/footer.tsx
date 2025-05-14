import { Mail, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-8 text-center text-sm text-muted-foreground">
        <div className="flex flex-col md:flex-row justify-around items-center space-y-4 md:space-y-0 mb-6">
          <div>
            <h3 className="font-semibold text-foreground mb-2">יצירת קשר</h3>
            <a href="mailto:contact@priyuvi.co.il" className="flex items-center justify-center md:justify-start hover:text-primary group">
              <Mail className="w-4 h-4 mr-2 ml-1 group-hover:text-primary" />
              contact@priyuvi.co.il
            </a>
            <a href="tel:+972501234567" className="flex items-center justify-center md:justify-start mt-1 hover:text-primary group">
              <Phone className="w-4 h-4 mr-2 ml-1 group-hover:text-primary" />
              050-1234567
            </a>
          </div>
          {/* Potential quick contact form placeholder */}
          {/* <div>
            <h3 className="font-semibold text-foreground mb-2">יצירת קשר מהיר</h3>
            <p>טופס יצירת קשר קטן יופיע כאן</p>
          </div> */}
        </div>
        <p>
          &copy; {currentYear} פריויו – עיצוב פירות. כל הזכויות שמורות.
        </p>
        <p className="mt-1">
          משלוחים בשומרון והסביבה.
        </p>
      </div>
    </footer>
  );
}
