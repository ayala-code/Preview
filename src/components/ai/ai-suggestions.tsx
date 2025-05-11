"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Wand2 } from "lucide-react";
import { fruitArrangementSuggestions } from "@/ai/flows/fruit-arrangement-suggestions";
import { useToast } from "@/hooks/use-toast";
import { eventTypeOptions } from "@/types";

const aiSuggestionsSchema = z.object({
  preferences: z.string().min(10, { message: "אנא תאר את העדפותיך (לפחות 10 תווים)." }),
  eventType: z.string({ required_error: "אנא בחר סוג אירוע." }),
});

type AISuggestionsFormValues = z.infer<typeof aiSuggestionsSchema>;

export default function AISuggestions() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const form = useForm<AISuggestionsFormValues>({
    resolver: zodResolver(aiSuggestionsSchema),
    defaultValues: {
      preferences: "",
      eventType: undefined,
    },
  });

  async function onSubmit(data: AISuggestionsFormValues) {
    setIsLoading(true);
    setSuggestions([]);
    try {
      const result = await fruitArrangementSuggestions({
        preferences: data.preferences,
        eventType: data.eventType,
      });
      if (result.suggestions && result.suggestions.length > 0) {
        setSuggestions(result.suggestions);
        toast({
          title: "הצעות התקבלו!",
          description: "מגשי ההשראה שלך מוכנים.",
        });
      } else {
        toast({
          title: "לא נמצאו הצעות",
          description: "נסה לשנות את העדפותיך או את סוג האירוע.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching AI suggestions:", error);
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה בעת קבלת ההצעות. אנא נסה שוב.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="shadow-lg w-full">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          <Wand2 className="mr-2 ml-1 h-6 w-6 text-primary" />
          קבל השראה מהבינה המלאכותית
        </CardTitle>
        <CardDescription>
          לא בטוח איזה מגש לבחור? ספר לנו קצת על האירוע וההעדפות שלך, וה-AI שלנו יציע רעיונות!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="eventType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>סוג האירוע</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="בחר סוג אירוע" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {eventTypeOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>העדפות</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="לדוגמה: 'אני מחפש משהו מרשים וצבעוני, עם דגש על פירות אדומים וצהובים, ללא קיווי. האירוע הוא יום הולדת 70 לסבתא.'"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90">
              {isLoading ? (
                <Loader2 className="mr-2 ml-1 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 ml-1 h-4 w-4" />
              )}
              קבל הצעות
            </Button>
          </form>
        </Form>

        {suggestions.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">רעיונות למגשים:</h3>
            <ul className="space-y-3 list-disc list-inside pl-4 pr-1">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="text-foreground/80">{suggestion}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
