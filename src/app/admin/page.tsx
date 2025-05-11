"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash2, Filter, CalendarDays, CheckCircle, Clock, Truck, PackageOpen } from "lucide-react";
import type { Order, PlatterType } from "@/types";
import { format } from "date-fns-jalali";
import { he } from 'date-fns/locale';

const initialOrders: Order[] = [
  {
    id: "ORD001",
    platterType: "heart",
    fruits: ["strawberry", "berries"],
    addons: ["chocolate"],
    deliveryDate: new Date("2024-07-20"),
    deliveryTime: "14:00-16:00",
    customerDetails: { name: "ישראל ישראלי", phone: "050-1234567", address: "תל אביב, רוטשילד 1" },
    status: "paid",
    totalAmount: 250,
    paymentMethod: "credit_card_phone",
    createdAt: new Date("2024-07-18"),
    updatedAt: new Date("2024-07-18"),
  },
  {
    id: "ORD002",
    platterType: "round",
    fruits: ["melon", "grapes", "pineapple"],
    addons: [],
    deliveryDate: new Date("2024-07-22"),
    deliveryTime: "איסוף ב-10:00",
    customerDetails: { name: "שרה לוי", phone: "052-9876543", address: "איסוף עצמי" },
    status: "pending_payment",
    totalAmount: 180,
    paymentMethod: "bank_transfer",
    createdAt: new Date("2024-07-19"),
    updatedAt: new Date("2024-07-19"),
  },
  {
    id: "ORD003",
    platterType: "boat",
    fruits: ["mango", "kiwi", "strawberry", "berries"],
    addons: ["inscription", "balloon"],
    deliveryDate: new Date("2024-07-25"),
    deliveryTime: "18:00",
    customerDetails: { name: "דוד כהן", phone: "054-1122333", address: "ירושלים, יפו 30" },
    status: "in_preparation",
    totalAmount: 320,
    paymentMethod: "paid", // Assuming paid if in_preparation
    createdAt: new Date("2024-07-20"),
    updatedAt: new Date("2024-07-20"),
  },
    {
    id: "ORD004",
    platterType: "round",
    fruits: ["watermelon", "grapes"],
    addons: [],
    deliveryDate: new Date("2024-07-15"),
    deliveryTime: "12:00",
    customerDetails: { name: "רותם חן", phone: "053-5556677", address: "חיפה, הכרמל 5" },
    status: "delivered",
    totalAmount: 150,
    paymentMethod: "cash",
    createdAt: new Date("2024-07-14"),
    updatedAt: new Date("2024-07-15"),
  },
];

const statusOptions = [
  { value: "all", label: "כל הסטטוסים" },
  { value: "pending_payment", label: "בהמתנה לתשלום", icon: <Clock className="h-4 w-4 text-yellow-500" />, color: "bg-yellow-100 text-yellow-700 border-yellow-300" },
  { value: "paid", label: "שולם", icon: <CheckCircle className="h-4 w-4 text-green-500" />, color: "bg-green-100 text-green-700 border-green-300" },
  { value: "in_preparation", label: "בהכנה", icon: <PackageOpen className="h-4 w-4 text-blue-500" />, color: "bg-blue-100 text-blue-700 border-blue-300" },
  { value: "delivered", label: "נמסר", icon: <Truck className="h-4 w-4 text-purple-500" />, color: "bg-purple-100 text-purple-700 border-purple-300" },
  { value: "cancelled", label: "בוטל", icon: <Trash2 className="h-4 w-4 text-red-500" />, color: "bg-red-100 text-red-700 border-red-300" },
];

const platterTypeFilters = [
  { value: "all", label: "כל סוגי המגשים" },
  { value: "round", label: "עגול" },
  { value: "heart", label: "לב" },
  { value: "boat", label: "סירה" },
];

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [platterTypeFilter, setPlatterTypeFilter] = useState("all");
  
  // Avoid hydration errors with initial state for client components
  useEffect(() => {
    setOrders(initialOrders);
  }, []);


  const filteredOrders = useMemo(() => {
    return orders
      .filter((order) => {
        const search = searchTerm.toLowerCase();
        return (
          order.id.toLowerCase().includes(search) ||
          order.customerDetails.name.toLowerCase().includes(search) ||
          order.customerDetails.phone.includes(search)
        );
      })
      .filter((order) => statusFilter === "all" || order.status === statusFilter)
      .filter((order) => platterTypeFilter === "all" || order.platterType === platterTypeFilter)
      .sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime()); // Sort by newest first
  }, [orders, searchTerm, statusFilter, platterTypeFilter]);

  const getStatusBadge = (status: Order["status"]) => {
    const option = statusOptions.find(s => s.value === status);
    return (
      <Badge variant="outline" className={cn("flex items-center gap-1 capitalize text-xs px-2 py-1", option?.color)}>
        {option?.icon}
        {option?.label || status}
      </Badge>
    );
  };

  const handleConfirmPayment = (orderId: string) => {
    setOrders(prevOrders => prevOrders.map(order => 
      order.id === orderId && order.status === 'pending_payment' 
        ? { ...order, status: 'paid', updatedAt: new Date() } 
        : order
    ));
    // Here you would also call an API to update the backend
  };

  return (
    <div className="space-y-8">
      <header className="text-center py-8 bg-primary/10 rounded-lg">
        <h1 className="text-4xl font-bold text-primary">ניהול הזמנות</h1>
        <p className="mt-2 text-lg text-foreground/80">מעקב וניהול הזמנות לקוחות.</p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center"><Filter className="mr-2 ml-1 h-6 w-6 text-primary"/>סינון וחיפוש הזמנות</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            <Input
              placeholder="חפש לפי מזהה, שם לקוח, או טלפון..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="lg:col-span-2"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="סנן לפי סטטוס" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={platterTypeFilter} onValueChange={setPlatterTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="סנן לפי סוג מגש" />
              </SelectTrigger>
              <SelectContent>
                {platterTypeFilters.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>מזהה הזמנה</TableHead>
                <TableHead>לקוח</TableHead>
                <TableHead>תאריך משלוח</TableHead>
                <TableHead>סוג מגש</TableHead>
                <TableHead>סכום</TableHead>
                <TableHead>סטטוס</TableHead>
                <TableHead className="text-left">פעולות</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                        <div>{order.customerDetails.name}</div>
                        <div className="text-xs text-muted-foreground">{order.customerDetails.phone}</div>
                    </TableCell>
                    <TableCell>{format(order.deliveryDate, "PPP", { locale: he })}</TableCell>
                    <TableCell className="capitalize">{platterTypeFilters.find(p => p.value === order.platterType)?.label || order.platterType}</TableCell>
                    <TableCell>₪{order.totalAmount.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="text-left">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" title="צפה בפרטים">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="ערוך הזמנה">
                          <Edit className="h-4 w-4" />
                        </Button>
                         {order.status === 'pending_payment' && (
                           <Button variant="outline" size="sm" title="אשר תשלום" onClick={() => handleConfirmPayment(order.id)}>
                             <CheckCircle className="h-4 w-4 mr-1 ml-1 text-green-500" /> אשר תשלום
                           </Button>
                         )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-24">
                    לא נמצאו הזמנות התואמות את החיפוש.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
