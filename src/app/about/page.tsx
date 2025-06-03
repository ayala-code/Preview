import { Box, Typography, Card, CardContent, CardHeader, Avatar, Grid } from "@mui/material";
import Image from 'next/image';
import { Spa, Group, SentimentSatisfied } from "@mui/icons-material";
import PageHeader from '@/components/ui/page-header';

export default function AboutPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <PageHeader title="אודות פריויו" subtitle="הסיפור מאחורי מגשי הפירות שלנו" />

      <Card sx={{ boxShadow: 3 }}>
        <CardHeader
          title={<Typography variant="h5" className="typography-heading-sm" color="primary">החזון שלנו</Typography>}
        />
        <CardContent>
          <Typography variant="body1" color="textSecondary" paragraph>
            ב"פריויו", אנו מאמינים שכל אירוע, קטן כגדול, ראוי לחגיגה של טעמים, צבעים וטריות. החזון שלנו הוא להביא שמחה ויוקרה לכל שולחן באמצעות מגשי פירות מעוצבים בקפידה, המשלבים אסתטיקה בלתי מתפשרת עם איכות פירות מעולה. אנו שואפים להיות הבחירה הראשונה לכל מי שמחפש מתנה מרשימה, כיבוד בריא או פשוט דרך להוסיף צבע וחיים ליום.
          </Typography>
          <Box sx={{ position: 'relative', width: '100%', height: 300, borderRadius: 2, overflow: 'hidden', my: 2 }}>
            <Image
              src="/images/Pictures-fruits/fruit1.jpg"
              alt="צוות פריויו מכין מגש פירות"
              layout="fill"
              objectFit="cover"
            />
          </Box>
          <Typography variant="body1" color="textSecondary">
            הסיפור שלנו התחיל מאהבה גדולה לפירות וליצירתיות. ראינו את הפוטנציאל להפוך את הפרי הפשוט ליצירת אמנות שתעורר התפעלות ותשאיר טעם של עוד. כל מגש הוא עבורנו יצירה, ואנו משקיעים מחשבה ותשומת לב בכל פרט, החל מבחירת הפירות הטריים ביותר ועד לסידורם ההרמוני על המגש.
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={4} sx={{ justifyContent: 'center', alignItems: 'center' }}>
        <Grid size={{ xs: 12, sm: 4 }} display="flex" justifyContent="center">
          <Card>
            <CardHeader
              avatar={<Avatar sx={{ bgcolor: 'primary.main' }}><Spa /></Avatar>}
              title={<Typography variant="h6" className="typography-heading-sm">טריות ואיכות</Typography>}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                אנו מתחייבים לפירות הטריים והאיכותיים ביותר, הנבחרים בקפידה מדי יום מהשווקים המובחרים.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }} display="flex" justifyContent="center">
          <Card>
            <CardHeader
              avatar={<Avatar sx={{ bgcolor: 'primary.main' }}><Group /></Avatar>}
              title={<Typography variant="h6" className="typography-heading-sm">שירות אישי</Typography>}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                צוות "פריויו" כאן כדי להקשיב לכם, לייעץ ולהתאים את המגש המושלם לצרכים ולאירוע שלכם.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }} display="flex" justifyContent="center">
          <Card>
            <CardHeader
              avatar={<Avatar sx={{ bgcolor: 'primary.main' }}><SentimentSatisfied /></Avatar>}
              title={<Typography variant="h6" className="typography-heading-sm">חוויה בלתי נשכחת</Typography>}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                מטרתנו היא ליצור עבורכם ועבור האורחים שלכם חוויה ויזואלית וקולינרית שתשאיר רושם מתוק.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
