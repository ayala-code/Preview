'use client';

import { useState } from "react";
import { Card, CardContent, CardActions, Typography, Button, IconButton, Box } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

type PlatterCardOrderProps = {
  title: string;
  description: string;
  imageUrl?: string;
  imageHint?: string;
  cardHeight?: number;
  sx?: any;
  addToCart?: (item: any) => void;
};

export default function PlatterCardOrder({ title, description, cardHeight, sx, addToCart }: PlatterCardOrderProps) {
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => setQuantity(q => Math.min(q + 1, 20));
  const handleRemove = () => setQuantity(q => Math.max(q - 1, 1));
  const handleAddToCart = () => {
    if (addToCart) {
      addToCart({ title, description, quantity });
    }
  };

  return (
    <Card 
      sx={{ display: 'flex', flexDirection: 'column', height: cardHeight || 340, boxShadow: 3, ...sx }}
      className="rounded-2xl shadow-md p-4 bg-white hover:shadow-lg transition"
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" className="typography-heading-sm text-2xl font-bold text-rose-600" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" className="text-base text-neutral-700 font-medium">
          {description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, gap: 1, justifyContent: 'center' }}>
          <IconButton aria-label="הפחת כמות" onClick={handleRemove} size="small" color="primary">
            <RemoveIcon />
          </IconButton>
          <Typography variant="body1" sx={{ minWidth: 24, textAlign: 'center' }}>{quantity}</Typography>
          <IconButton aria-label="הוסף כמות" onClick={handleAdd} size="small" color="primary">
            <AddIcon />
          </IconButton>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={handleAddToCart}
        >
          הוסף להזמנה
        </Button>
      </CardActions>
    </Card>
  );
}
