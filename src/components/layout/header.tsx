"use client";

import React from 'react';
import Link from 'next/link';
import MenuIcon from "@mui/icons-material/Menu";
import { Logo } from '@/components/logo';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Button as MuiButton } from "@mui/material";

const navItems = [
  { href: '/', label: 'דף הבית' },
  { href: '/about', label: 'אודות' },
  { href: '/order', label: 'התחלת הזמנה' },
  { href: '/contact', label: 'צור קשר' },
  { href: '/admin', label: 'ניהול (Admin)' },
];

export default function Header() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open: boolean | ((prevState: boolean) => boolean)) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if ('type' in event && event.type === 'keydown' && ('key' in event && (event.key === 'Tab' || event.key === 'Shift'))) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
      <Toolbar sx={{ width: '100%', maxWidth: 'none', px: 0, py: 2, bgcolor: 'transparent', minHeight: 'unset' }}>
        <Logo />
        <nav className="hidden md:flex items-center space-x-16 space-x-reverse text-lg font-extrabold tracking-wide flex-grow justify-center">
          {navItems.map((item) => (
            <Link
  key={item.href}
  href={item.href}
  className={cn(
    "transition-all px-3 py-1 rounded-lg font-semibold",
    pathname === item.href
      ? "bg-yellow-300 text-yellow-900 shadow"
      : "text-yellow-700 hover:text-yellow-900 hover:bg-yellow-100"
  )}
>
  {item.label}
</Link>
          ))}
        </nav>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          className="md:hidden"
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          <List>
            {navItems.map((item) => (
              <ListItem component="a" key={item.href} onClick={toggleDrawer(false)} href={item.href}>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
