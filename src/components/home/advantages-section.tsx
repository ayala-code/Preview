import { Leaf, Gift, Truck, Palette, CheckCircle } from 'lucide-react'; // Using Leaf for fresh fruits

const advantages = [
  {
    icon: <Leaf className="h-10 w-10 text-primary" />,
    text: "פירות טריים מהשוק",
    description: "אנו בוחרים בקפידה את הפירות הטריים והאיכותיים ביותר מדי יום."
  },
  {
    icon: <Gift className="h-10 w-10 text-primary" />,
    text: "התאמה לאירועים",
    description: "מגשים מותאמים אישית לכל סוגי האירועים: חגים, ימי הולדת, ועוד."
  },
  {
    icon: <Truck className="h-10 w-10 text-primary" />,
    text: "משלוחים בשומרון",
    description: "שירות משלוחים מהיר ואמין לכל אזור השומרון והסביבה."
  },
  {
    icon: <Palette className="h-10 w-10 text-primary" />,
    text: "עיצוב ייחודי לכל לקוח",
    description: "כל מגש מעוצב באהבה ותשומת לב, ליצירת חוויה ויזואלית מרשימה."
  },
];

export default function AdvantagesSection() {
  return (
    <section className="py-12 md:py-16 bg-muted/30 rounded-lg my-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-primary text-center mb-10">היתרונות שלנו</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {advantages.map((advantage, index) => (
            <div key={index} className="p-6 bg-background rounded-lg shadow-md flex flex-col items-center">
              <div className="mb-4 p-3 bg-primary/10 rounded-full">
                {advantage.icon}
              </div>
              <h3 className="text-xl font-medium text-foreground mb-2">{advantage.text}</h3>
              <p className="text-foreground/70 text-sm">{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
