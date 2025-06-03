import PaymentOptions from '@/components/payment/payment-options';
import PageHeader from '@/components/ui/page-header';

export default function PaymentPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="תשלום עבור הזמנה" subtitle="השלם את הזמנתך על ידי בחירת אמצעי תשלום." />
      
      <PaymentOptions />
    </div>
  );
}
