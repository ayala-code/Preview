import { Box, Typography, Button } from "@mui/material";
import Link from 'next/link';

export default function HeroSection() {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        height: { xs: '60vh', md: '70vh' },
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'common.white',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: 3,
        backgroundImage: 'url(/images/Pictures-fruits/background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1,
        }}
      />
      <Box sx={{ position: 'relative', zIndex: 2, p: 3, maxWidth: '600px' }}>
        <Typography variant="h1" sx={{ fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
          פריויו – מגשי פירות מעוצבים בהתאמה אישית
        </Typography>
        <Typography variant="h5" sx={{ mt: 2, fontWeight: '300', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
          טרי. צבעוני. יוקרתי.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 4, px: 4, py: 2, boxShadow: 3, transform: 'scale(1)', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}
          component={Link}
          href="/order"
        >
          התחלת הזמנה
        </Button>
      </Box>
    </Box>
  );
}
