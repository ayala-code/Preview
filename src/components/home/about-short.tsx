import { Box, Typography } from "@mui/material";

export default function AboutShort() {
  return (
    <Box component="section" sx={{ py: 4, bgcolor: 'background.paper', borderRadius: 2, my: 4 }}>
      <Box sx={{ textAlign: 'center', px: 3 }}>
        <Typography variant="h4" className="typography-heading-sm" color="primary" gutterBottom>
          קצת עלינו
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ maxWidth: '600px', mx: 'auto', lineHeight: 1.75 }}>
          ב"פריויו" אנחנו מאמינים שחוויה מתחילה עוד לפני הביס הראשון.
          אנו יוצרים מגשי פירות אישיים, מעוצבים בקפידה ומותאמים לכל אירוע – 
          ומגיעים עד אליכם טריים ורעננים לשומרון והסביבה.
        </Typography>
      </Box>
    </Box>
  );
}
