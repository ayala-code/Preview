'use client';

import { Box, Typography, Grid, Card, CardContent, Button, List, ListItem, ListItemText, Divider } from "@mui/material";
import { useState } from 'react';
import PlatterCardOrder from './platter-card-order';

const samplePlatters = [
  { title: "מגש בוקר מרענן", description: "פירות הדר, ענבים, תותים וקיווי לפתיחה מושלמת של היום." },
  { title: "מגש אקזוטי טרופי", description: "אננס, מנגו, פסיפלורה, פיטאיה וקוקוס לחוויה טרופית צבעונית." },
  { title: "מגש פירות יער", description: "אוכמניות, פטל, דובדבנים ותותי שדה במראה יוקרתי." },
  { title: "מגש בריאות ירוק", description: "קיווי, ענבים ירוקים, תפוח ירוק, מלון ואבוקדו." },
  { title: "מגש פירות יבשים", description: "שזיפים, משמשים, תמרים, אגוזים ושקדים – שילוב קלאסי ובריא." },
  { title: "מגש פירות הדר", description: "תפוזים, קלמנטינות, אשכוליות, לימונים וליים – חמוץ מתוק מרענן." },
  { title: "מגש פינוק שוקולדי", description: "פירות טריים עם שוקולד בלגי איכותי לטבילה והנאה." },
  { title: "מגש פירות קיץ", description: "אבטיח, מלון, ענבים, שזיפים ומשמשים – חגיגה קיצית צבעונית." },
  { title: "מגש פירות חורף", description: "תפוחים, אגסים, בננות, קיווי ותמרים – חורף ישראלי מתוק." },
  { title: "מגש פירות לאירועים", description: "מבחר פירות עונה מעוצבים במיוחד לאירועים וחגיגות." },
  { title: "מגש פירות אישי", description: "מגש קטן ומפנק לאדם אחד – מתנה מושלמת לעצמך או לחבר." },
  { title: "מגש פירות משפחתי", description: "מגש גדול ומגוון לכל המשפחה, מתאים לשבתות וחגים." },
];

export default function FullPlatterGallery() {
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (item: any) => {
    setCart(prev => [...prev, item]);
  };

  if (cart.length > 0) {
    return (
      <Box sx={{ py: 4 }}>
        <Card sx={{ maxWidth: 500, mx: 'auto', boxShadow: 4 }}>
          <CardContent>
            <Typography variant="h5" className="typography-heading-sm" color="primary" gutterBottom>
              סל הקניות שלך
            </Typography>
            <List>
              {cart.map((item, idx) => (
                <ListItem key={idx}>
                  <ListItemText
                    primary={`${item.title} (x${item.quantity})`}
                    secondary={item.description}
                  />
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              המשך להזמנה
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box component="section" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" className="typography-heading-sm" color="primary" gutterBottom>
          גלריית מגשים מלאה
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {samplePlatters.map((platter, index) => (
          <Grid 
            size={{ xs: 12, sm: 6, md: 4 }}
            key={index}
            display="flex"
            justifyContent="center"
            alignItems="stretch"
          >
            <PlatterCardOrder {...platter} cardHeight={250} sx={{ width: 1, display: 'flex', flexDirection: 'column' }} addToCart={addToCart} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
