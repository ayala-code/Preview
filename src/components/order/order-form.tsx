"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import React, { useState, useEffect } from 'react';

import { format } from "date-fns";
import { he } from 'date-fns/locale';
import { useToast } from "@/hooks/use-toast";
import { platterTypeOptions, fruitOptions, addonOptions, PlatterType, Fruit, Addon } from "@/types";
import AISuggestions from "@/components/ai/ai-suggestions";
import { Checkbox, TextField, Button, FormControl, FormLabel, FormHelperText, RadioGroup, FormControlLabel, Radio, Card, CardContent, CardHeader, Typography, Box } from "@mui/material";

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

  const [deliveryDateIso, setDeliveryDateIso] = useState<string | null>(null);

  useEffect(() => {
    const val = form.watch('deliveryDate');
    if (val) {
      setDeliveryDateIso(val instanceof Date ? val.toISOString() : new Date(val).toISOString());
    } else {
      setDeliveryDateIso(null);
    }
  }, [form.watch('deliveryDate')]);

  function onSubmit(data: OrderFormValues) {
    console.log(data);
    toast({
      title: "ההזמנה נשלחה!",
      description: "פרטי ההזמנה שלך התקבלו. ניצור קשר בהקדם לאישור ותשלום.",
    });
    form.reset();
  }

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 2 }}>
      <Box>
        <Box component="form" onSubmit={form.handleSubmit(onSubmit)} sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2, bgcolor: '#f9f9f9' }}>
          <Typography variant="h5" gutterBottom>פרטי ההזמנה</Typography>

          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">בחר סוג מגש *</FormLabel>
            <RadioGroup
              onChange={(e) => form.setValue('platterType', e.target.value as PlatterType)}
              value={form.watch('platterType') || ''}
            >
              {platterTypeOptions.map(option => (
                <FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
              ))}
            </RadioGroup>
            <FormHelperText>{form.formState.errors.platterType?.message}</FormHelperText>
          </FormControl>

          <FormControl component="fieldset" margin="normal">
            <FormLabel component="legend">בחר פירות (לפחות אחד) *</FormLabel>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1 }}>
              {fruitOptions.map(item => (
                <FormControlLabel
                  key={item.value}
                  control={
                    <Checkbox
                      checked={form.watch('fruits')?.includes(item.value)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        const currentFruits = form.watch('fruits') || [];
                        form.setValue('fruits', checked ? [...currentFruits, item.value] : currentFruits.filter(f => f !== item.value));
                      }}
                    />
                  }
                  label={item.label}
                />
              ))}
            </Box>
            <FormHelperText>{form.formState.errors.fruits?.message}</FormHelperText>
          </FormControl>

          <Controller
            name="deliveryDate"
            control={form.control}
            render={({ field }) => (
              <TextField
                {...field}
                label="תאריך הגעה *"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="normal"
                error={!!form.formState.errors.deliveryDate}
                helperText={form.formState.errors.deliveryDate?.message}
              />
            )}
          />

          <Controller
            name="deliveryTime"
            control={form.control}
            render={({ field }) => (
              <TextField
                {...field}
                label="שעת הגעה *"
                fullWidth
                margin="normal"
                error={!!form.formState.errors.deliveryTime}
                helperText={form.formState.errors.deliveryTime?.message}
              />
            )}
          />

          <Controller
            name="name"
            control={form.control}
            render={({ field }) => (
              <TextField
                {...field}
                label="שם מלא *"
                fullWidth
                margin="normal"
                error={!!form.formState.errors.name}
                helperText={form.formState.errors.name?.message}
              />
            )}
          />

          <Controller
            name="phone"
            control={form.control}
            render={({ field }) => (
              <TextField
                {...field}
                label="מספר טלפון *"
                fullWidth
                margin="normal"
                error={!!form.formState.errors.phone}
                helperText={form.formState.errors.phone?.message}
              />
            )}
          />

          <Controller
            name="address"
            control={form.control}
            render={({ field }) => (
              <TextField
                {...field}
                label="כתובת למשלוח *"
                fullWidth
                margin="normal"
                error={!!form.formState.errors.address}
                helperText={form.formState.errors.address?.message}
              />
            )}
          />

          <Controller
            name="notes"
            control={form.control}
            render={({ field }) => (
              <TextField
                {...field}
                label="הערות נוספות (אופציונלי)"
                fullWidth
                margin="normal"
                multiline
                rows={4}
              />
            )}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            המשך לתשלום
          </Button>
        </Box>
      </Box>

      <Box>
        <AISuggestions />
        <Card>
          <CardHeader>
            <Typography variant="h6">סיכום הזמנה (דוגמה)</Typography>
          </CardHeader>
          <CardContent>
            <Typography color="textSecondary">
              כאן יוצג סיכום של הפריטים שנבחרו והמחיר הסופי לאחר חישוב.
            </Typography>
            {/* Example ISO date display for demonstration */}
            <Typography variant="body2" sx={{ mt: 2 }}>
              תאריך הגעה (ISO): {deliveryDateIso ?? '---'}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

