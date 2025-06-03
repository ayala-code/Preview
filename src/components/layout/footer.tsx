'use client'
import { Box, Typography, Link as MuiLink } from "@mui/material";

export default function Footer() {
  const currentYear = 2025;

  return (
    <Box component="footer" sx={{ borderTop: 1, borderColor: 'divider', bgcolor: 'background.default', py: 4, textAlign: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-around', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h6" className="typography-heading-sm" gutterBottom>יצירת קשר</Typography>
          {/* <MuiLink href="mailto:contact@priyuvi.co.il" underline="hover" color="primary">
            contact@priyuvi.co.il
          </MuiLink> */}
          <MuiLink href="mailto:A26294255@gmail.com" underline="hover" color="primary">
            A26294255@gmail.com
          </MuiLink>
          <br />
          <MuiLink href="tel:+972533167536" underline="hover" color="primary">
            053-3167536
          </MuiLink>
        </Box>
        {/* Placeholder for quick contact form */}
        {/* <Box>
          <Typography variant="h6" gutterBottom>יצירת קשר מהיר</Typography>
          <Typography>טופס יצירת קשר קטן יופיע כאן</Typography>
        </Box> */}
      </Box>
      <Typography variant="body2" color="textSecondary">
        &copy; {currentYear} פריויו – עיצוב פירות. כל הזכויות שמורות.
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
        משלוחים בשומרון והסביבה.
      </Typography>
    </Box>
  );
}
