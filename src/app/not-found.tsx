import { Box, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Box sx={{ py: 8, textAlign: "center" }}>
      <Typography variant="h3" className="typography-heading-lg" color="error" gutterBottom>
        הדף לא נמצא
      </Typography>
      <Typography variant="h6" className="typography-heading-sm" color="text.secondary">
        הדף שחיפשת לא קיים או הועבר.
      </Typography>
    </Box>
  );
}
