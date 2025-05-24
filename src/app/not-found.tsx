import { Box, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Box sx={{ py: 8, textAlign: "center" }}>
      <Typography variant="h3" color="error" gutterBottom>
        הדף לא נמצא
      </Typography>
      <Typography variant="h6" color="text.secondary">
        הדף שחיפשת לא קיים או הועבר.
      </Typography>
    </Box>
  );
}
