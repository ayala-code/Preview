
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Added import
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { he } from 'date-fns/locale'; // For Hebrew localization with date-fns
import { CalendarIcon, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { platterTypeOptions, fruitOptions, addonOptions, PlatterType, Fruit, Addon } from "@/types";
import AISuggestions from "@/components/ai/ai-suggestions"; // Import AI suggestions component

const orderFormSchema = z.object({
  platterType: z.custom<PlatterType>(val => platterTypeOptions.some(p => p.value === val), {
    message: "אנא בחר סוג מגש."
  }),
  fruits: z.array(z.custom<Fruit>(val => fruitOptions.some(f => f.value === val)))
    .min(1, { message: "אנא בחר לפחות פרי אחד." }),
  addons: z.array(z.custom<Addon>(val => addonOptions.some(a => a.value === val))).optional(),
  deliveryDate: z.date({
    required_error: "אנא בחר תאריך הגעה.",
  }),
  deliveryTime: z.string().min(1, { message: "אנא הזן שעת הגעה." }),
  name: z.string().min(2, { message: "שם חייב להכיל לפחות 2 תווים." }),
  phone: z.string().min(9, { message: "מספר טלפון לא תקין." }),
  address: z.string().min(5, { message: "כתובת חייבת להכיל לפחות 5 תווים." }),
  notes: z.string().optional(),
});

type OrderFormValues = z.infer<typeof orderFormSchema>;

export default function OrderForm() {
  const { toast } = useToast();
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      platterType: undefined,
      fruits: [],
      addons: [],
      deliveryDate: undefined,
      deliveryTime: "",
      name: "",
      phone: "",
      address: "",
      notes: "",
    },
  });

  function onSubmit(data: OrderFormValues) {
    // Here you would typically send the data to a server
    console.log(data);
    toast({
      title: "ההזמנה נשלחה!",
      description: "פרטי ההזמנה שלך התקבלו. ניצור קשר בהקדם לאישור ותשלום.",
    });
    // Potentially redirect to a payment page or thank you page
    // router.push('/payment?orderId=...');
    form.reset();
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6 border rounded-lg shadow-lg bg-card">
            <h2 className="text-2xl font-semibold text-primary border-b pb-4">פרטי ההזמנה</h2>
            
            {/* Platter Type */}
            <FormField
              control={form.control}
              name="platterType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-lg font-medium">בחר סוג מגש *</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col sm:flex-row gap-4"
                    >
                      {platterTypeOptions.map((option) => (
                        <FormItem key={option.value} className="flex items-center space-x-3 space-x-reverse space-y-0">
                          <FormControl>
                            <RadioGroupItem value={option.value} />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">{option.label}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Fruits Selection */}
            <FormField
              control={form.control}
              name="fruits"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-lg font-medium">בחר פירות (לפחות אחד) *</FormLabel>
                    <FormDescription>ניתן לבחור מספר סוגי פירות.</FormDescription>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {fruitOptions.map((item) => (
                      <FormField
                        key={item.value}
                        control={form.control}
                        name="fruits"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.value}
                              className="flex flex-row items-start space-x-3 space-x-reverse space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.value)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), item.value])
                                      : field.onChange(
                                          (field.value || []).filter(
                                            (value) => value !== item.value
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Addons Selection */}
            <FormField
              control={form.control}
              name="addons"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-lg font-medium">תוספות אפשריות</FormLabel>
                  </div>
                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {addonOptions.map((item) => (
                      <FormField
                        key={item.value}
                        control={form.control}
                        name="addons"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.value}
                              className="flex flex-row items-start space-x-3 space-x-reverse space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.value)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), item.value])
                                      : field.onChange(
                                          (field.value || []).filter(
                                            (value) => value !== item.value
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Delivery Date & Time */}
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="deliveryDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-lg font-medium">תאריך הגעה *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 pr-3 text-right font-normal justify-start", // Adjusted for RTL
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: he }) 
                            ) : (
                              <span>בחר תאריך</span>
                            )}
                            <CalendarIcon className="mr-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date(new Date().setDate(new Date().getDate() -1)) // Disable past dates
                          }
                          initialFocus
                          dir="rtl" // Calendar direction
                          locale={he} // Hebrew locale for date-fns
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deliveryTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium">שעת הגעה *</FormLabel>
                    <FormControl>
                      <Input placeholder="לדוגמה: 14:00-16:00, או 'אחה''צ'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <h2 className="text-2xl font-semibold text-primary border-b pb-4 pt-6">פרטי המזמין</h2>
            {/* Customer Details */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>שם מלא *</FormLabel>
                  <FormControl>
                    <Input placeholder="הכנס שם מלא" {...field} />
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
                  <FormLabel>מספר טלפון *</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="050-1234567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>כתובת למשלוח *</FormLabel>
                  <FormControl>
                    <Input placeholder="עיר, רחוב, מספר בית ודירה" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>הערות נוספות (אופציונלי)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="בקשות מיוחדות, העדפות, או כל דבר שתרצה שנדע..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6">
              המשך לתשלום
              <ArrowLeft className="mr-2 h-5 w-5" />
            </Button>
          </form>
        </Form>
      </div>
      <div className="lg:col-span-1 space-y-8">
        <AISuggestions />
        {/* Placeholder for order summary */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">סיכום הזמנה (דוגמה)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              כאן יוצג סיכום של הפריטים שנבחרו והמחיר הסופי לאחר חישוב.
            </p>
            {/* Dynamic summary can be added here based on form state */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

