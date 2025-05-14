import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Users, Smile } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <header className="text-center py-8 bg-primary/10 rounded-lg">
        <h1 className="text-4xl font-bold text-primary">אודות פריויו</h1>
        <p className="mt-2 text-lg text-foreground/80">הסיפור מאחורי מגשי הפירות שלנו</p>
      </header>

      <section>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">החזון שלנו</CardTitle>
          </CardHeader>
          <CardContent className="text-foreground/90 leading-relaxed space-y-4">
            <p>
              ב"פריויו", אנו מאמינים שכל אירוע, קטן כגדול, ראוי לחגיגה של טעמים, צבעים וטריות. החזון שלנו הוא להביא שמחה ויוקרה לכל שולחן באמצעות מגשי פירות מעוצבים בקפידה, המשלבים אסתטיקה בלתי מתפשרת עם איכות פירות מעולה. אנו שואפים להיות הבחירה הראשונה לכל מי שמחפש מתנה מרשימה, כיבוד בריא או פשוט דרך להוסיף צבע וחיים ליום.
            </p>
            <div className="relative w-full h-64 md:h-80 rounded-md overflow-hidden my-6">
                <Image 
                    src="https://picsum.photos/800/400?random=10" 
                    alt="צוות פריויו מכין מגש פירות"
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="fruit preparation team"
                />
            </div>
            <p>
              הסיפור שלנו התחיל מאהבה גדולה לפירות וליצירתיות. ראינו את הפוטנציאל להפוך את הפרי הפשוט ליצירת אמנות שתעורר התפעלות ותשאיר טעם של עוד. כל מגש הוא עבורנו יצירה, ואנו משקיעים מחשבה ותשומת לב בכל פרט, החל מבחירת הפירות הטריים ביותר ועד לסידורם ההרמוני על המגש.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="grid md:grid-cols-3 gap-8 text-center">
        <Card>
          <CardHeader className="items-center">
             <Leaf className="w-12 h-12 text-primary mb-2" />
            <CardTitle className="text-xl">טריות ואיכות</CardTitle>
          </CardHeader>
          <CardContent className="text-foreground/75">
            אנו מתחייבים לפירות הטריים והאיכותיים ביותר, הנבחרים בקפידה מדי יום מהשווקים המובחרים.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="items-center">
            <Users className="w-12 h-12 text-primary mb-2" />
            <CardTitle className="text-xl">שירות אישי</CardTitle>
          </CardHeader>
          <CardContent className="text-foreground/75">
            צוות "פריויו" כאן כדי להקשיב לכם, לייעץ ולהתאים את המגש המושלם לצרכים ולאירוע שלכם.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="items-center">
            <Smile className="w-12 h-12 text-primary mb-2" />
            <CardTitle className="text-xl">חוויה בלתי נשכחת</CardTitle>
          </CardHeader>
          <CardContent className="text-foreground/75">
            מטרתנו היא ליצור עבורכם ועבור האורחים שלכם חוויה ויזואלית וקולינרית שתשאיר רושם מתוק.
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
