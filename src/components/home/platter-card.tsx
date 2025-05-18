import { Card, CardContent, CardActions, CardMedia, Typography, Button } from "@mui/material";
import Link from 'next/link';

type PlatterCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  orderLink?: string;
};

export default function PlatterCard({ title, description, imageUrl, imageHint, orderLink = "/order" }: PlatterCardProps) {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt={imageHint}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" color="primary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          component={Link}
          href={orderLink}
        >
          להזמנה בהתאמה אישית
        </Button>
      </CardActions>
    </Card>
  );
}
