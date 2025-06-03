import OrderForm from '@/components/order/order-form';
import FullPlatterGallery from '@/components/order/full-platter-gallery';
import PageHeader from '@/components/ui/page-header';

export default function OrderPage() {
  return (
    <div className="space-y-12 px-4">
      <PageHeader title="התחלת הזמנה" subtitle="בחרי מגש והוסיפי להזמנה שלך" />

      <FullPlatterGallery />
            <OrderForm />

      {/* בסוף נוסיף כפתור לסיכום הזמנה בהמשך */}

      {/* בעתיד תתווסף כאן אפשרות לבניית מגש פירות בהתאמה אישית (custom platter builder) */}

      {/* <div className="space-y-12">
       <header className="text-center py-8 bg-primary/10 rounded-lg">
        <h1 className="text-4xl font-bold text-primary">התחלת הזמנה</h1>
        <p className="mt-2 text-lg text-foreground/80">בנה את מגש הפירות המושלם שלך!</p>
      </header>

    </div> */}
    </div>
  );
}
