import { Box, Typography, Grid } from "@mui/material";
import PlatterCard from './platter-card';

const samplePlatters = [
  {
    title: "מגש חגיגה צבעוני",
    description: "מבחר פירות העונה מסודרים בעיצוב מרהיב, מושלם לימי הולדת ואירועים משמחים.",
    imageUrl: "https://picsum.photos/400/300?random=2",
    imageHint: "colorful fruit platter",
  },
  {
    title: "מגש אהבה רומנטי",
    description: "פירות אקזוטיים ופירות יער בצורת לב, אידיאלי ליום נישואין או הצעת נישואין.",
    imageUrl: "https://picsum.photos/400/300?random=3",
    imageHint: "heart-shaped fruit",
  },
  {
    title: "מגש פינוק יוקרתי",
    description: "שילוב של פירות מיוחדים, שוקולדים איכותיים ואגוזים, לחוויה בלתי נשכחת.",
    imageUrl: "https://picsum.photos/400/300?random=4",
    imageHint: "luxury fruit chocolate",
  },
];

export default function PlatterGallery() {
  return (
    <Box component="section" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          גלריית מגשים לדוגמה
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {samplePlatters.map((platter, index) => (
          <Grid 
            size={{ xs: 12, sm: 6, md: 4 }}
            key={index}
            display="flex"
            justifyContent="center"
          >
            <PlatterCard {...platter} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
