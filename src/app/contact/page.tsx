"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "שם חייב להכיל לפחות 2 תווים." }),
  email: z.string().email({ message: "כתובת אימייל לא תקינה." }),
  phone: z.string().optional(),
  subject: z.string().min(3, { message: "נושא חייב להכיל לפחות 3 תווים."}),
  message: z.string().min(10, { message: "הודעה חייבת להכיל לפחות 10 תווים." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(data: ContactFormValues) {
    // Here you would typically send the data to a server or email service
    console.log(data);
    toast({
      title: "ההודעה נשלחה!",
      description: "ניצור איתך קשר בהקדם.",
    });
    form.reset();
  }

  return (
    <div className="space-y-12">
      <header className="text-center py-8 bg-primary/10 rounded-lg">
        <h1 className="text-4xl font-bold text-primary">צור קשר</h1>
        <p className="mt-2 text-lg text-foreground/80">נשמח לשמוע ממך!</p>
      </header>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">שלח לנו הודעה</CardTitle>
            <CardDescription>מלא את הטופס ונחזור אליך בהקדם.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>שם מלא</FormLabel>
                      <FormControl>
                        <Input placeholder="הכנס שם מלא" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>כתובת אימייל</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>מספר טלפון (אופציונלי)</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="050-1234567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>נושא הפנייה</FormLabel>
                      <FormControl>
                        <Input placeholder="נושא" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>הודעה</FormLabel>
                      <FormControl>
                        <Textarea placeholder="כתוב את הודעתך כאן..." rows={5} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">שלח הודעה</Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">פרטי התקשרות</CardTitle>
            <CardDescription>דרכים נוספות ליצור איתנו קשר.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-foreground/90">
            <div className="flex items-start space-x-3 space-x-reverse">
              <Mail className="h-6 w-6 text-primary mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">אימייל</h4>
                <a href="mailto:contact@priyuvi.co.il" className="hover:text-primary">contact@priyuvi.co.il</a>
              </div>
            </div>
            <div className="flex items-start space-x-3 space-x-reverse">
              <Phone className="h-6 w-6 text-primary mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">טלפון</h4>
                <a href="tel:+972501234567" className="hover:text-primary">050-1234567</a>
              </div>
            </div>
            <div className="flex items-start space-x-3 space-x-reverse">
              <MapPin className="h-6 w-6 text-primary mt-1 shrink-0" />
              <div>
                <h4 className="font-semibold">כתובת (לאיסוף עצמי)</h4>
                <p>רחוב הפירות 1, ישוב לדוגמה, שומרון</p>
                <p className="text-sm text-muted-foreground">(בתיאום מראש בלבד)</p>
              </div>
            </div>
             <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold mb-2">שעות פעילות</h4>
                <p>ראשון - חמישי: 09:00 - 18:00</p>
                <p>שישי וערבי חג: 09:00 - 13:00</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
