"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  TextField,
  Typography,
  Box,
  Grid,
} from "@mui/material";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "שם חייב להכיל לפחות 2 תווים." }),
  email: z.string().email({ message: "כתובת אימייל לא תקינה." }),
  phone: z.string().optional(),
  subject: z.string().min(3, { message: "נושא חייב להכיל לפחות 3 תווים." }),
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
    <Box sx={{ py: 6 }}>
      <Box
        sx={{
          textAlign: "center",
          py: 4,
          bgcolor: "primary.light",
          borderRadius: 2,
          mb: 6,
        }}
      >
        <Typography
          variant="h3"
          color="primary"
          fontWeight={700}
          gutterBottom
        >
          צור קשר
        </Typography>
        <Typography variant="h6" color="text.secondary">
          נשמח לשמוע ממך!
        </Typography>
      </Box>
      <Grid container spacing={6} alignItems="flex-start">
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ boxShadow: 3 }}>
            <CardHeader
              title={<Typography variant="h5">שלח לנו הודעה</Typography>}
              subheader={
                <Typography color="text.secondary">
                  מלא את הטופס ונחזור אליך בהקדם.
                </Typography>
              }
            />
            <CardContent>
              <Box
                component="form"
                onSubmit={form.handleSubmit(onSubmit)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <TextField
                  label="שם מלא"
                  {...form.register("name")}
                  error={!!form.formState.errors.name}
                  helperText={form.formState.errors.name?.message}
                  fullWidth
                />
                <TextField
                  label="כתובת אימייל"
                  type="email"
                  {...form.register("email")}
                  error={!!form.formState.errors.email}
                  helperText={form.formState.errors.email?.message}
                  fullWidth
                />
                <TextField
                  label="מספר טלפון (אופציונלי)"
                  type="tel"
                  {...form.register("phone")}
                  error={!!form.formState.errors.phone}
                  helperText={form.formState.errors.phone?.message}
                  fullWidth
                />
                <TextField
                  label="נושא הפנייה"
                  {...form.register("subject")}
                  error={!!form.formState.errors.subject}
                  helperText={form.formState.errors.subject?.message}
                  fullWidth
                />
                <TextField
                  label="הודעה"
                  {...form.register("message")}
                  error={!!form.formState.errors.message}
                  helperText={form.formState.errors.message?.message}
                  multiline
                  minRows={5}
                  fullWidth
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  שלח הודעה
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ boxShadow: 3 }}>
            <CardHeader
              title={<Typography variant="h5">פרטי התקשרות</Typography>}
              subheader={
                <Typography color="text.secondary">
                  דרכים נוספות ליצור איתנו קשר.
                </Typography>
              }
            />
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  color: "text.primary",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                  }}
                >
                  <Mail style={{ color: "#1976d2", marginTop: 4 }} />
                  <Box>
                    <Typography fontWeight={600}>אימייל</Typography>
                    <Typography
                      component="a"
                      href="mailto:contact@priyuvi.co.il"
                      color="primary.main"
                      sx={{
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      contact@priyuvi.co.il
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                  }}
                >
                  <Phone style={{ color: "#1976d2", marginTop: 4 }} />
                  <Box>
                    <Typography fontWeight={600}>טלפון</Typography>
                    <Typography
                      component="a"
                      href="tel:+972501234567"
                      color="primary.main"
                      sx={{
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      050-1234567
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                  }}
                >
                  <MapPin style={{ color: "#1976d2", marginTop: 4 }} />
                  <Box>
                    <Typography fontWeight={600}>כתובת (לאיסוף עצמי)</Typography>
                    <Typography>רחוב הפירות 1, ישוב לדוגמה, שומרון</Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      (בתיאום מראש בלבד)
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    borderTop: 1,
                    borderColor: "divider",
                    pt: 3,
                    mt: 3,
                  }}
                >
                  <Typography fontWeight={600} mb={1}>
                    שעות פעילות
                  </Typography>
                  <Typography>ראשון - חמישי: 09:00 - 18:00</Typography>
                  <Typography>שישי וערבי חג: 09:00 - 13:00</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
