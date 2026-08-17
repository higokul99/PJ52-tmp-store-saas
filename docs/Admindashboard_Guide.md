# AUREUM Admin Dashboard Development Guide

## Overview

The Admin Dashboard controls the complete AUREUM platform.

The dashboard should feel similar to modern analytics software like Shopify Admin, Vercel Dashboard, and Linear.

All widgets should be movable and customizable.

---

# Route

/admin/dashboard

Protected

Admin Role

---

# Layout

Top Navbar

↓

Collapsible Sidebar

↓

Dashboard Header

↓

Movable Widgets

↓

Analytics

↓

Recent Activities

↓

Footer

---

# Sidebar

Dashboard

Users

Store Owners

Stores

Products

Categories

Orders

Payments

Reports

Settings

Logout

Icons

Bootstrap Icons

---

# Dashboard Widgets

Widgets should support

Drag & Drop

Resize

Collapse

Expand

Save Layout

Widgets

Total Users

Stores

Orders

Revenue

Visitors

New Registrations

Latest Stores

Latest Orders

Revenue Chart

Sales Chart

Top Categories

Top Products

System Health

Recent Activities

Notifications

---

# Charts

Line Chart

Area Chart

Bar Chart

Pie Chart

Donut Chart

Use Chart.js

---

# Recent Activities

Live Updates

New User

New Store

New Order

Payment

Product Added

---

# Notifications

Animated Notification Bell

Dropdown

Unread Counter

Real-time Updates

---

# Animations

Card Entrance

Widget Drag

Sidebar Transition

Counter Animation

Chart Animation

Loading Skeleton

---

# React Components

AdminLayout

Navbar

Sidebar

DashboardHeader

WidgetGrid

RevenueChart

OrdersChart

SalesChart

UserTable

StoreTable

NotificationPanel

Footer

---

# Libraries

React Grid Layout

Chart.js

React Beautiful DnD

Framer Motion

React CountUp

Bootstrap

Bootstrap Icons

---

# APIs

Dashboard

Users

Stores

Products

Orders

Revenue

Notifications

Reports

---

# Development Rules

Widgets must be draggable.

Widgets must remember user positions.

Responsive Dashboard.

No hardcoded statistics.

Use Laravel APIs.