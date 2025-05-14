"use client";

import { useState, ChangeEvent } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Banknote, CreditCard, Smartphone, Upload, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PaymentOptions() {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [paymentMarked, setPaymentMarked] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUploadProof = () => {
    if (selectedFile) {
      // Simulate upload
      console.log("Uploading file:", selectedFile.name);
      toast({
        title: "אישור הועלה",
        description: "אישור התשלום הועלה בהצלחה. ההזמנה תעודכן לאחר אימות.",
      });
      setSelectedFile(null); // Clear file input
    } else {
      toast({
        title: "לא נבחר קובץ",
        description: "אנא בחר קובץ להעלות.",
        variant: "destructive",
      });
    }
  };
  
  const handleMarkAsPaid = () => {
    setPaymentMarked(true);
    toast({
        title: "סטטוס עודכן",
        description: "סימנת שהתשלום בוצע. ההזמנה תעודכן לאחר אימות.",
    });
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-primary">אפשרויות תשלום</CardTitle>
        <CardDescription>בחר את אמצעי התשלום הנוח לך ביותר.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bank_transfer" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="bank_transfer" className="text-sm md:text-base py-3"><Banknote className="inline-block mr-1 ml-1 h-5 w-5" />העברה בנקאית</TabsTrigger>
            <TabsTrigger value="credit_card_phone" className="text-sm md:text-base py-3"><CreditCard className="inline-block mr-1 ml-1 h-5 w-5" />אשראי טלפוני</TabsTrigger>
            <TabsTrigger value="cash" className="text-sm md:text-base py-3"><Smartphone className="inline-block mr-1 ml-1 h-5 w-5" />מזומן</TabsTrigger>
          </TabsList>
          
          <TabsContent value="bank_transfer">
            <Card className="border-primary/50">
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center"><Banknote className="mr-2 ml-1"/>פרטי חשבון להעברה</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p><strong>שם מוטב:</strong> פריויו עיצובים בע"מ</p>
                <p><strong>בנק:</strong> לדוגמה, מספר 12 (פועלים)</p>
                <p><strong>סניף:</strong> 777</p>
                <p><strong>מספר חשבון:</strong> 123456789</p>
                <p className="text-sm text-muted-foreground">
                  אנא ציין את מספר ההזמנה או שמך המלא בפרטי ההעברה.
                  לאחר ביצוע ההעברה, מומלץ להעלות צילום מסך של אישור התשלום או לסמן שהתשלום בוצע.
                </p>
                <div className="space-y-3 pt-4 border-t">
                  <Label htmlFor="payment-proof" className="font-medium">העלאת אישור תשלום (אופציונלי):</Label>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Input id="payment-proof" type="file" onChange={handleFileChange} className="flex-grow"/>
                    <Button onClick={handleUploadProof} disabled={!selectedFile} variant="outline">
                      <Upload className="mr-1 ml-1 h-4 w-4" /> העלה
                    </Button>
                  </div>
                  {selectedFile && <p className="text-xs text-muted-foreground">קובץ נבחר: {selectedFile.name}</p>}
                </div>
                 <Button onClick={handleMarkAsPaid} variant="secondary" className="w-full mt-2" disabled={paymentMarked}>
                    {paymentMarked ? <CheckCircle className="mr-2 ml-1 h-4 w-4" /> : null}
                    {paymentMarked ? 'התשלום סומן כבוצע' : 'סמן ששילמתי (ללא העלאת קובץ)'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="credit_card_phone">
            <Card className="border-accent/50">
              <CardHeader>
                <CardTitle className="text-xl text-accent flex items-center"><CreditCard className="mr-2 ml-1"/>תשלום בכרטיס אשראי טלפוני</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p>
                  נציג מטעמנו יצור עמך קשר טלפוני בהקדם לגביית פרטי כרטיס האשראי בצורה מאובטחת.
                </p>
                <p className="text-sm text-muted-foreground">
                  שעות פעילות המוקד הטלפוני: ימים א'-ה' 09:00-17:00.
                </p>
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground mt-4" onClick={() => toast({title: "בקשה התקבלה", description: "נציג יצור קשר בהקדם."})}>
                  הבנתי, ממתין/ה לשיחה
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cash">
            <Card className="border-secondary/50">
              <CardHeader>
                <CardTitle className="text-xl text-secondary flex items-center"><Smartphone className="mr-2 ml-1"/>תשלום במזומן</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p>
                  ניתן לשלם במזומן בעת איסוף עצמי או ישירות לשליח בעת קבלת המשלוח.
                </p>
                <p className="font-semibold">אנא הכן סכום מדויק ככל האפשר.</p>
                <p className="text-sm text-muted-foreground">
                  לתשומת לבך, ייתכן שהשליח לא יוכל לספק עודף לכל סכום.
                </p>
                 <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground mt-4" onClick={() => toast({title: "אפשרות תשלום נבחרה", description: "נא לשלם במזומן בעת קבלת ההזמנה."})}>
                  אשלם במזומן
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
