# AUREUM Create Store Development Guide

## Overview

The **Create Store** module allows Store Owners to create, manage, edit, and delete multiple online stores from a single dashboard.

The experience should resemble **Shopify Store Management**, providing a premium, intuitive, and responsive interface with the AUREUM Black & Gold theme.

---

# Route

/owner/stores

Protected

Store Owner Role

---

# Layout

Navbar

↓

Sidebar

↓

Page Header

↓

Store Statistics

↓

Quick Actions

↓

Store Grid/List

↓

Create Store Modal

↓

Edit Store Modal

↓

Delete Confirmation Modal

↓

Footer

---

# Page Header

Title

My Stores

Description

Manage all your online stores from one place.

Buttons

Create New Store

Import Store (Optional)

Refresh

---

# Store Statistics

Cards

Total Stores

Active Stores

Inactive Stores

Draft Stores

Published Stores

Each Card

Animated Counter

Icon

Trend Indicator

Hover Animation

---

# Quick Actions

Create Store

Manage Themes

View Analytics

Store Settings

Export Stores

---

# Store Grid

Each Store Card

Store Banner

Store Logo

Store Name

Store URL

Store Status

Products Count

Orders Count

Revenue

Created Date

Theme

SEO Status

---

# Store Card Actions

Visit Store

Manage Store

Analytics

Duplicate Store

Share Store

---

# Action Buttons

### Create

Button

+ Create Store

Primary Button

Gold Background

Black Text

Hover Animation

---

### Edit

Button

✏ Edit

Blue Outline Button

Opens Edit Store Modal

---

### Delete

Button

🗑 Delete

Red Outline Button

Confirmation Required

Soft Delete Support

---

### More Actions

Duplicate Store

Preview Store

Publish

Unpublish

Archive

---

# Create Store Form

## Basic Information

Store Name

Store URL

Custom Subdomain

Store Description

Business Category

Store Logo

Store Banner

Store Email

Store Phone

---

## Appearance

Theme

Primary Color

Secondary Color

Font Style

Homepage Banner

Favicon

---

## Business Details

Business Name

Owner Name

GST/VAT Number

Business Address

Country

State

City

Postal Code

---

## SEO Settings

Meta Title

Meta Description

Keywords

SEO Image

Friendly URL

---

## Social Links

Facebook

Instagram

Twitter (X)

LinkedIn

YouTube

Website

---

## Store Preferences

Currency

Language

Timezone

Date Format

Tax Enabled

Shipping Enabled

Inventory Tracking

Maintenance Mode

---

# Store Status

Draft

Published

Paused

Archived

Deleted

---

# Store Table View

Columns

Store Logo

Store Name

Store URL

Status

Products

Orders

Revenue

Created Date

Updated Date

Actions

---

# Table Actions

View

Edit

Analytics

Duplicate

Delete

Publish

Pause

---

# Search & Filters

Search by Store Name

Search by URL

Filter by Status

Filter by Category

Filter by Date

Sort by Revenue

Sort by Orders

Sort by Latest

---

# Delete Confirmation

Title

Delete Store?

Message

This action cannot be undone.

Buttons

Cancel

Delete Store

Checkbox

I understand this action.

---

# Empty State

Illustration

No Stores Found

Description

Create your first online store to start selling.

Button

Create Store

---

# Notifications

Store Created Successfully

Store Updated Successfully

Store Deleted Successfully

Store Published

Store Paused

Store Restored

---

# Animations

Card Hover

Fade In

Slide Up

Button Ripple

Modal Animation

Delete Confirmation Animation

Floating Action Button

Counter Animation

---

# React Components

StoreLayout

StoreHeader

StoreStatistics

StoreGrid

StoreCard

StoreTable

CreateStoreModal

EditStoreModal

DeleteStoreModal

StoreFilters

SearchBar

ActionDropdown

EmptyState

Footer

---

# Libraries

Bootstrap

Bootstrap Icons

Framer Motion

AOS

React Hook Form

React Select

Axios

React Router DOM

React Hot Toast

SweetAlert2

---

# APIs

Get Stores

Create Store

Update Store

Delete Store

Restore Store

Publish Store

Pause Store

Store Analytics

Upload Logo

Upload Banner

---

# Development Rules

Responsive Design

Reusable Components

Premium Black & Gold Theme

API Driven

No Hardcoded Data

Laravel API Integration

React Form Validation

Soft Delete Support

Role-Based Authorization

Optimized Performance

---

# UI Layout

+-------------------------------------------------------------------------------------------------------+
| My Stores                                                          + Create Store                     |
+-------------------------------------------------------------------------------------------------------+

+-------------+-------------+-------------+-------------+-------------+
| Total Stores| Active      | Draft       | Orders      | Revenue      |
+-------------+-------------+-------------+-------------+-------------+

Search Store...      Status ▼      Category ▼      Sort ▼

+-----------------------------------------------------------------------------------------------+
| Store Banner                                                                                |
|-----------------------------------------------------------------------------------------------|
| 🏪 Logo     Fashion Hub                                                                    |
| URL: fashion.aureum.com                                                                    |
| Status: Published                                                                          |
| Products: 120 | Orders: 560 | Revenue: $12,500                                             |
|-----------------------------------------------------------------------------------------------|
| 👁 View | 📊 Analytics | ✏ Edit | 🗑 Delete | 📄 Duplicate                                  |
+-----------------------------------------------------------------------------------------------+

+-----------------------------------------------------------------------------------------------+
| Store Banner                                                                                |
|-----------------------------------------------------------------------------------------------|
| 🏪 Logo     Tech World                                                                     |
| URL: tech.aureum.com                                                                       |
| Status: Draft                                                                              |
| Products: 65 | Orders: 120 | Revenue: $4,800                                               |
|-----------------------------------------------------------------------------------------------|
| 👁 View | 📊 Analytics | ✏ Edit | 🗑 Delete | 📄 Duplicate                                  |
+-----------------------------------------------------------------------------------------------+

Footer