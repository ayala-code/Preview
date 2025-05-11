import OrderForm from '@/components/order/order-form';

export default function OrderPage() {
  return (
    <div className="space-y-12">
      <header className="text-center py-8 bg-primary/10 rounded-lg">
        <h1 className="text-4xl font-bold text-primary">התחלת הזמנה</h1>
        <p className="mt-2 text-lg text-foreground/80">בנה את מגש הפירות המושלם שלך!</p>
      </header>
      
      <OrderForm />
    </div>
  );
}
