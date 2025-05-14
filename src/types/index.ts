export type PlatterType = "round" | "heart" | "boat";
export type Fruit = "strawberry" | "pineapple" | "kiwi" | "mango" | "grapes" | "melon" | "watermelon" | "berries";
export type Addon = "chocolate" | "inscription" | "balloon";

export type CustomerDetails = {
  name: string;
  phone: string;
  address: string;
  notes?: string;
};

export type Order = {
  id: string;
  platterType: PlatterType;
  fruits: Fruit[];
  addons: Addon[];
  deliveryDate: Date;
  deliveryTime: string; // e.g., "10:00-12:00"
  customerDetails: CustomerDetails;
  status: "pending_payment" | "paid" | "in_preparation" | "delivered" | "cancelled";
  totalAmount: number;
  paymentMethod?: "bank_transfer" | "credit_card_phone" | "cash";
  paymentProofUrl?: string; // For bank transfer
  createdAt: Date;
  updatedAt: Date;
};

export const platterTypeOptions: { value: PlatterType; label: string }[] = [
  { value: "round", label: "מגש עגול" },
  { value: "heart", label: "מגש לב" },
  { value: "boat", label: "מגש סירה" },
];

export const fruitOptions: { value: Fruit; label: string }[] = [
  { value: "strawberry", label: "תותים" },
  { value: "pineapple", label: "אננס" },
  { value: "kiwi", label: "קיווי" },
  { value: "mango", label: "מנגו" },
  { value: "grapes", label: "ענבים" },
  { value: "melon", label: "מלון" },
  { value: "watermelon", label: "אבטיח" },
  { value: "berries", label: "פירות יער" },
];

export const addonOptions: { value: Addon; label: string }[] = [
  { value: "chocolate", label: "שוקולד" },
  { value: "inscription", label: "כיתוב אישי" },
  { value: "balloon", label: "בלון" },
];

export const eventTypeOptions = [
    { value: "birthday", label: "יום הולדת" },
    { value: "anniversary", label: "יום נישואין" },
    { value: "holiday", label: "חג" },
    { value: "shabbat", label: "שבת/אירוח" },
    { value: "corporate", label: "אירוע חברה" },
    { value: "sympathy", label: "ניחומים" },
    { value: "new_baby", label: "לידה/ברית" },
    { value: "thank_you", label: "תודה" },
    { value: "other", label: "אחר" },
];
