"use client";

import React, { useState, useEffect } from 'react';
import { useMemo } from "react";
import { Visibility, Edit, Delete, FilterList, CalendarToday, CheckCircleOutline, AccessTime, LocalShipping, Inventory2, Badge } from "@mui/icons-material";
import type { Order, PlatterType } from "@/types";
import { cn } from "@/lib/utils"; // Added import for cn
import { Card, CardHeader, CardContent, Button, TextField, Select, MenuItem, InputLabel, FormControl, Table, TableHead, TableBody, TableRow, TableCell, Box } from "@mui/material";

type OrderLike = Omit<Order, 'deliveryDate' | 'createdAt' | 'updatedAt'> & {
  deliveryDate: string;
  createdAt: string;
  updatedAt: string;
};

const initialOrders: OrderLike[] = [
  {
    id: "ORD001",
    platterType: "heart",
    fruits: ["strawberry", "berries"],
    addons: ["chocolate"],
    deliveryDate: "2024-07-20T00:00:00.000Z",
    deliveryTime: "14:00-16:00",
    customerDetails: { name: "ישראל ישראלי", phone: "050-1234567", address: "תל אביב, רוטשילד 1" },
    status: "paid",
    totalAmount: 250,
    paymentMethod: "credit_card_phone",
    createdAt: "2024-07-18T00:00:00.000Z",
    updatedAt: "2024-07-18T00:00:00.000Z",
  },
  {
    id: "ORD002",
    platterType: "round",
    fruits: ["melon", "grapes", "pineapple"],
    addons: [],
    deliveryDate: "2024-07-22T00:00:00.000Z",
    deliveryTime: "איסוף ב-10:00",
    customerDetails: { name: "שרה לוי", phone: "052-9876543", address: "איסוף עצמי" },
    status: "pending_payment",
    totalAmount: 180,
    paymentMethod: "bank_transfer",
    createdAt: "2024-07-19T00:00:00.000Z",
    updatedAt: "2024-07-19T00:00:00.000Z",
  },
  {
    id: "ORD003",
    platterType: "boat",
    fruits: ["mango", "kiwi", "strawberry", "berries"],
    addons: ["inscription", "balloon"],
    deliveryDate: "2024-07-25T00:00:00.000Z",
    deliveryTime: "18:00",
    customerDetails: { name: "דוד כהן", phone: "054-1122333", address: "ירושלים, יפו 30" },
    status: "in_preparation",
    totalAmount: 320,
    paymentMethod: "paid",
    createdAt: "2024-07-20T00:00:00.000Z",
    updatedAt: "2024-07-20T00:00:00.000Z",
  },
  {
    id: "ORD004",
    platterType: "round",
    fruits: ["watermelon", "grapes"],
    addons: [],
    deliveryDate: "2024-07-15T00:00:00.000Z",
    deliveryTime: "12:00",
    customerDetails: { name: "רותם חן", phone: "053-5556677", address: "חיפה, הכרמל 5" },
    status: "delivered",
    totalAmount: 150,
    paymentMethod: "cash",
    createdAt: "2024-07-14T00:00:00.000Z",
    updatedAt: "2024-07-15T00:00:00.000Z",
  },
];

const statusOptions = [
  { value: "all", label: "כל הסטטוסים" },
  { value: "pending_payment", label: "בהמתנה לתשלום", icon: <AccessTime className="h-4 w-4 text-yellow-500" />, color: "bg-yellow-100 text-yellow-700 border-yellow-300" },
  { value: "paid", label: "שולם", icon: <CheckCircleOutline className="h-4 w-4 text-green-500" />, color: "bg-green-100 text-green-700 border-green-300" },
  { value: "in_preparation", label: "בהכנה", icon: <Inventory2 className="h-4 w-4 text-blue-500" />, color: "bg-blue-100 text-blue-700 border-blue-300" },
  { value: "delivered", label: "נמסר", icon: <LocalShipping className="h-4 w-4 text-purple-500" />, color: "bg-purple-100 text-purple-700 border-purple-300" },
  { value: "cancelled", label: "בוטל", icon: <Delete className="h-4 w-4 text-red-500" />, color: "bg-red-100 text-red-700 border-red-300" },
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

  // Add state for ISO delivery date strings for all orders
  const [ordersIsoDates, setOrdersIsoDates] = useState<Record<string, string>>({});

  // Avoid hydration errors with initial state for client components
  useEffect(() => {
    const parsedOrders: Order[] = initialOrders.map(order => ({
      ...order,
      deliveryDate: new Date(order.deliveryDate),
      createdAt: new Date(order.createdAt),
      updatedAt: new Date(order.updatedAt),
    }));
    setOrders(parsedOrders);
  }, []);

  useEffect(() => {
    const isoDates: Record<string, string> = {};
    orders.forEach(order => {
      if (order.deliveryDate instanceof Date) {
        isoDates[order.id] = order.deliveryDate.toISOString();
      } else {
        isoDates[order.id] = new Date(order.deliveryDate).toISOString();
      }
    });
    setOrdersIsoDates(isoDates);
  }, [orders]);

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
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); // Sort by newest first
  }, [orders, searchTerm, statusFilter, platterTypeFilter]);

  const getStatusBadge = (status: Order["status"]) => {
    const option = statusOptions.find(s => s.value === status);
    return (
      <span className={cn("flex items-center gap-1 capitalize text-xs px-2 py-1 border rounded", option?.color)}>
        {option?.icon}
        {option?.label || status}
      </span>
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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box component="header" sx={{ textAlign: 'center', p: '32px 0', bgcolor: 'rgba(25, 118, 210, 0.1)', borderRadius: 2 }}>
        <Box component="h1" sx={{ fontSize: 32, fontWeight: 700, color: '#1976d2' }}>ניהול הזמנות</Box>
        <Box component="p" sx={{ mt: 1, fontSize: 18, color: '#333' }}>מעקב וניהול הזמנות לקוחות.</Box>
      </Box>
      <Card sx={{ boxShadow: 3 }}>
        <CardHeader
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', fontSize: 24 }}>
              <FilterList sx={{ mr: 1, ml: 1, fontSize: 28, color: '#1976d2' }} />
              סינון וחיפוש הזמנות
            </Box>
          }
        />
        <CardContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 2, pt: 2 }}>
            <TextField
              label="חפש לפי מזהה, שם לקוח, או טלפון..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="outlined"
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>סנן לפי סטטוס</InputLabel>
              <Select
                value={statusFilter}
                label="סנן לפי סטטוס"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>סנן לפי סוג מגש</InputLabel>
              <Select
                value={platterTypeFilter}
                label="סנן לפי סוג מגש"
                onChange={(e) => setPlatterTypeFilter(e.target.value)}
              >
                {platterTypeFilters.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Table sx={{ marginTop: 4 }}>
            <TableHead>
              <TableRow>
                <TableCell>מזהה הזמנה</TableCell>
                <TableCell>לקוח</TableCell>
                <TableCell>תאריך משלוח</TableCell>
                <TableCell>סוג מגש</TableCell>
                <TableCell>סכום</TableCell>
                <TableCell>סטטוס</TableCell>
                <TableCell align="left">פעולות</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>
                      <Box>{order.customerDetails.name}</Box>
                      <Box sx={{ fontSize: 12, color: '#888' }}>{order.customerDetails.phone}</Box>
                    </TableCell>
                    <TableCell>{ordersIsoDates[order.id] ?? '---'}</TableCell>
                    <TableCell>{platterTypeFilters.find(p => p.value === order.platterType)?.label || order.platterType}</TableCell>
                    <TableCell>₪{order.totalAmount.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell align="left">
                      <Button variant="outlined" size="small" title="צפה בפרטים" sx={{ minWidth: 36, marginRight: 1 }}>
                        <Visibility fontSize="small" />
                      </Button>
                      <Button variant="outlined" size="small" title="ערוך הזמנה" sx={{ minWidth: 36, marginRight: 1 }}>
                        <Edit fontSize="small" />
                      </Button>
                      {order.status === 'pending_payment' && (
                        <Button variant="contained" color="success" size="small" title="אשר תשלום" sx={{ minWidth: 36 }} onClick={() => handleConfirmPayment(order.id)}>
                          <CheckCircleOutline fontSize="small" sx={{ marginLeft: 1 }} /> אשר תשלום
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ height: 96 }}>
                    לא נמצאו הזמנות התואמות את החיפוש.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
}

