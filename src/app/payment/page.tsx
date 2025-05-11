import PaymentOptions from '@/components/payment/payment-options';

export default function PaymentPage() {
  return (
    <div className="space-y-8">
      <header className="text-center py-8 bg-primary/10 rounded-lg">
        <h1 className="text-4xl font-bold text-primary">תשלום עבור הזמנה</h1>
        <p className="mt-2 text-lg text-foreground/80">השלם את הזמנתך על ידי בחירת אמצעי תשלום.</p>
      </header>
      
      <PaymentOptions />
    </div>
  );
}
