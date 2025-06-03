import { Box, Typography } from "@mui/material";

export default function PageHeader({ title, subtitle }: { title: string, subtitle?: string }) {
  return (
    <Box className="text-center py-8 bg-primary/10 rounded-lg mb-8">
      <Typography variant="h3" className="typography-heading-lg" gutterBottom>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" color="textSecondary">
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
