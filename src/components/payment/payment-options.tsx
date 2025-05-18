"use client";

import { Box, Button, Typography, TextField } from "@mui/material";
import { useState, ChangeEvent } from 'react';
import { useToast } from "@/hooks/use-toast";

export default function PaymentOptions() {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [paymentMarked, setPaymentMarked] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUploadProof = () => {
    if (selectedFile) {
      console.log("Uploading file:", selectedFile.name);
      toast({
        title: "הקובץ הועלה בהצלחה!",
        description: "אנו נבדוק את ההוכחה וניצור קשר בהקדם.",
      });
      setSelectedFile(null);
    } else {
      toast({
        title: "שגיאה",
        description: "אנא בחר קובץ להעלאה.",
      });
    }
  };

  return (
    <Box sx={{ p: 3, border: 1, borderColor: 'divider', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h6" gutterBottom>
        אפשרויות תשלום
      </Typography>
      <Box sx={{ mt: 2 }}>
        <TextField
          type="file"
          fullWidth
          onChange={handleFileChange}
          InputLabelProps={{ shrink: true }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleUploadProof}
        >
          העלאת הוכחת תשלום
        </Button>
      </Box>
    </Box>
  );
}
