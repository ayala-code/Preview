import PlatterCard from './platter-card';

const samplePlatters = [
  {
    title: "מגש חגיגה צבעוני",
    description: "מבחר פירות העונה מסודרים בעיצוב מרהיב, מושלם לימי הולדת ואירועים משמחים.",
    imageUrl: "https://picsum.photos/400/300?random=2",
    imageHint: "colorful fruit platter",
  },
  {
    title: "מגש אהבה רומנטי",
    description: "פירות אקזוטיים ופירות יער בצורת לב, אידיאלי ליום נישואין או הצעת נישואין.",
    imageUrl: "https://picsum.photos/400/300?random=3",
    imageHint: "heart-shaped fruit",
  },
  {
    title: "מגש פינוק יוקרתי",
    description: "שילוב של פירות מיוחדים, שוקולדים איכותיים ואגוזים, לחוויה בלתי נשכחת.",
    imageUrl: "https://picsum.photos/400/300?random=4",
    imageHint: "luxury fruit chocolate",
  },
];

export default function PlatterGallery() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-primary text-center mb-10">גלריית מגשים לדוגמה</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {samplePlatters.map((platter, index) => (
            <PlatterCard key={index} {...platter} />
          ))}
        </div>
      </div>
    </section>
  );
}
