"use client";

import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
      eventType: "",
    },
  });

  const onSubmit = async (data: AISuggestionsFormValues) => {
    setIsLoading(true);
    try {
      const result = await fruitArrangementSuggestions(data);
      setSuggestions(result.suggestions || []);
      toast({
        title: "הצעות נוצרו בהצלחה!",
        description: "בדוק את ההצעות למטה.",
      });
    } catch (error) {
      toast({
        title: "שגיאה",
        description: "אירעה שגיאה ביצירת ההצעות.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, border: 1, borderColor: 'divider', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h6" gutterBottom>
        הצעות מבוססות AI
      </Typography>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <TextField
          label="העדפות"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          {...form.register("preferences")}
          error={!!form.formState.errors.preferences}
          helperText={form.formState.errors.preferences?.message}
        />
        <TextField
          label="סוג אירוע"
          fullWidth
          margin="normal"
          {...form.register("eventType")}
          error={!!form.formState.errors.eventType}
          helperText={form.formState.errors.eventType?.message}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "צור הצעות"}
        </Button>
      </form>
      {suggestions.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            הצעות:
          </Typography>
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </Box>
      )}
    </Box>
  );
}
