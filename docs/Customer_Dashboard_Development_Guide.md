# AUREUM Customer Dashboard Development Guide

## Overview

The Customer Dashboard provides customers with a personalized shopping experience across the AUREUM platform.

The experience should resemble modern customer portals like **Amazon, Shopify Customer Account, Nike, Apple Store, and Flipkart** while maintaining the premium **AUREUM Black & Gold Theme**.

The dashboard should be clean, responsive, interactive, and focused on shopping, orders, and account management.

Widgets should be customizable and responsive.

---

# Route

/customer/dashboard

Protected

Customer Role

---

# Layout

Navbar

↓

Sidebar

↓

Dashboard Header

↓

Quick Statistics

↓

Quick Actions

↓

Featured Products

↓

Recommended Products

↓

Recent Orders

↓

Order Tracking

↓

Wishlist

↓

Notifications

↓

Footer

---

# Sidebar

Dashboard

Browse Stores

Categories

Wishlist

Shopping Cart

My Orders

Order Tracking

Addresses

Payment Methods

Coupons

Rewards

Notifications

Support

Settings

Logout

---

# Statistics

Cards

Total Orders

Pending Orders

Delivered Orders

Cancelled Orders

Wishlist Items

Shopping Cart Items

Reward Points

Available Coupons

Each Card

Animated Counter

Icon

Progress Indicator

Trend Percentage

Gradient Background

Hover Animation

---

# Featured Products

Product Image

Product Name

Store Name

Category

Price

Discount

Rating

Add to Cart

Wishlist

Quick View

---

# Shopping Cart

Cart Items

Product Image

Quantity

Update Quantity

Remove Item

Move to Wishlist

Apply Coupon

Shipping Estimate

Checkout

Payment Summary

---

# Wishlist

Wishlist Products

Move to Cart

Remove Product

Share Wishlist

Price Drop Alerts

Recently Saved

---

# Browse Stores

Featured Stores

Popular Stores

Top Rated Stores

Nearby Stores

New Stores

Each Store

Store Logo

Store Banner

Store Name

Rating

Products Count

Visit Store

Follow Store

---

# Categories

Popular Categories

Trending Categories

Featured Categories

Category Image

Category Products

Shop Now Button

---

# Orders

Latest Orders

Pending Orders

Completed Orders

Cancelled Orders

Returned Orders

Order Details

Invoice Download

Track Order

Cancel Order

Return Request

Exchange Request

---

# Order Tracking

Timeline

Order Placed

Payment Confirmed

Packed

Shipped

In Transit

Out for Delivery

Delivered

Display

Courier Partner

Tracking Number

Estimated Delivery

Live Tracking

---

# Addresses

Home Address

Office Address

Other Address

Add Address

Edit Address

Delete Address

Default Address

---

# Payment Methods

Saved Cards

Credit Card

Debit Card

UPI

Wallet

Net Banking

Cash on Delivery

Add Payment Method

Delete Payment Method

---

# Coupons

Available Coupons

Applied Coupons

Expired Coupons

Reward Coupons

Referral Coupons

Apply Coupon

---

# Rewards

Reward Points

Membership Level

Cashback

Referral Bonus

Achievements

Levels

Silver

Gold

Platinum

Diamond

---

# Notifications

Animated Notification Bell

Dropdown Panel

Unread Counter

Real-Time Updates

Order Notifications

Flash Sales

Coupons

Wishlist Price Alerts

Product Restock Alerts

Store Announcements

Reward Earned

---

# Shopping Analytics

Purchase Summary

Monthly Spending

Orders Per Month

Favorite Categories

Favorite Stores

Reward Progress

Charts

Line Chart

Area Chart

Bar Chart

Pie Chart

Donut Chart

---

# Recent Activities

Recently Purchased

Recently Viewed

Wishlist Updated

Coupon Applied

Reward Earned

Order Delivered

Order Cancelled

Address Updated

Profile Updated

---

# Recommendations

Recommended Products

Trending Products

Recently Viewed

Customers Also Bought

Top Rated Products

Flash Sale

New Arrivals

Best Sellers

---

# Support Center

Help Center

Frequently Asked Questions

Raise Support Ticket

Live Chat

Email Support

Call Support

Report an Issue

---

# Profile Settings

Personal Information

Profile Photo

Phone Number

Email Verification

Password

Security Settings

Privacy Settings

Notification Preferences

Language

Theme

Delete Account

---

# Animations

Floating Cards

Hover Lift

Fade Animation

Slide Animation

Page Transition

Card Entrance

Counter Animation

Notification Animation

Wishlist Animation

Cart Animation

Smooth Sidebar

Loading Skeleton

---

# React Components

CustomerLayout

Sidebar

Navbar

DashboardHeader

StatisticsCards

QuickActions

FeaturedStores

FeaturedProducts

RecommendedProducts

CategoriesGrid

ShoppingCart

WishlistTable

OrdersTable

OrderTracking

RewardCard

CouponCard

NotificationPanel

ProfileForm

SupportPanel

Footer

---

# Libraries

Chart.js

React CountUp

Framer Motion

Bootstrap

Bootstrap Icons

AOS

Axios

React Router DOM

React Hot Toast

React Hook Form

---

# APIs

Dashboard

Profile

Stores

Categories

Products

Wishlist

Shopping Cart

Orders

Order Tracking

Addresses

Payments

Coupons

Rewards

Notifications

Recommendations

Support

---

# Development Rules

Responsive Dashboard

API Driven

Reusable Components

Bootstrap Based

Premium Black & Gold Theme

Dark & Light Mode

Animated UI Components

Role-Based Authentication

Laravel API Integration

JWT/Sanctum Authentication

Lazy Loading

No Hardcoded Data

Optimized Performance

SEO Friendly

Accessibility Support

---

# Dashboard UI Layout

+-----------------------------------------------------------------------------------------------------------+
| ☰ AUREUM      🔍 Search Products...                     ❤️ Wishlist   🛒 Cart   🔔   👤 Profile          |
+-----------------------------------------------------------------------------------------------------------+

+--------------------------+----------------------------------------------------------------------------+
| Dashboard                | 👋 Welcome Back, John!                                                     |
| Browse Stores            | Continue Shopping | View Orders | Track Order | Browse Categories          |
| Categories               +----------------------------------------------------------------------------+
| Wishlist                 | Orders | Wishlist | Cart | Rewards | Coupons                              |
| Shopping Cart            +----------------------------------------------------------------------------+
| My Orders                | Monthly Spending Chart                 Order Status                        |
| Order Tracking           +--------------------------------------+-------------------------------------+
| Addresses                | Featured Products                     Recommended Products                |
| Payment Methods          +--------------------------------------+-------------------------------------+
| Coupons                  | Recent Orders                         Wishlist                            |
| Rewards                  +--------------------------------------+-------------------------------------+
| Notifications            | Favorite Stores                       Flash Sale                          |
| Support                  +--------------------------------------+-------------------------------------+
| Settings                 | Recent Activities                     Notifications                       |
| Logout                   +----------------------------------------------------------------------------+
+--------------------------+----------------------------------------------------------------------------+

Footer

---

# Theme

Primary Color

Black (#0A0A0A)

Secondary Color

Gold (#D4AF37)

Background

#F8F8F8

Cards

White

Border Radius

16px

Button Radius

10px

Font

Poppins

Icons

Bootstrap Icons

Animations

Framer Motion

Charts

Chart.js

Design Style

Modern Premium Luxury Dashboard