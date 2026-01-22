# 🏠 Apartment Advertising Platform

A full-stack web application for advertising and browsing apartment rentals, built with **Angular** frontend and **Node.js** backend with **MongoDB** database.

## 🎯 What This Platform Does

This is a **complete apartment rental marketplace** that allows users to:

- **Browse apartments** with advanced filtering options
- **Post apartment listings** with multiple photos
- **Search by location, category, and price** range
- **Manage personal listings** and profile information
- **View detailed apartment information** with image galleries

## 🏗️ System Architecture

**Full-Stack MEAN Application:**

```txt
📁 angular/          # Frontend (Angular + TypeScript)
├── 📁 components/   # UI Components
├── 📁 service/      # HTTP Services  
└── 📁 class/        # TypeScript Models

📁 node.js/          # Backend (Node.js + Express)
├── 📁 api/          # REST API
│   ├── controllers/ # Business Logic
│   ├── models/      # MongoDB Schemas
│   └── routes/      # API Endpoints
└── 📁 uploads/      # Image Storage
```

## 🚀 Key Features

### 🔍 Smart Search & Filtering

- **Location-based search** by cities
- **Category filtering** (apartment types)
- **Price range filtering** (max/min price)
- **Bedroom count filtering**
- **Real-time results** with instant updates

### 📸 Rich Media Support

- **Multiple image uploads** per listing
- **Image gallery** with navigation
- **Responsive image display**
- **File upload handling** with validation

### 👤 User Management

- **Advertiser profiles** with contact information
- **Personal dashboard** to manage listings
- **Authentication system** with JWT tokens
- **My Apartments** section for listing management

### 🏢 Comprehensive Listings

- **Detailed descriptions** and specifications
- **Address and location** information
- **Pricing and availability**
- **Additional amenities** and features
- **Contact information** for inquiries

## 🛠️ Technology Stack

### Frontend (Angular)

- **Angular Framework** with TypeScript
- **Reactive Forms** for data input
- **HTTP Client** for API communication
- **Router** for navigation
- **Responsive CSS** design

### Backend (Node.js)

- **Express.js** web framework
- **MongoDB** with Mongoose ODM
- **JWT Authentication** for security
- **Multer** for file uploads
- **CORS** enabled for cross-origin requests

## 📦 Installation & Setup

### Prerequisites

- Node.js (v14+)
- MongoDB
- Angular CLI

### Backend Setup

```bash
cd node.js
npm install
# Create .env file with MongoDB URL
echo "URL=mongodb://localhost:27017/apartments" > .env
npm start
```

### Frontend Setup

```bash
cd angular
npm install
ng serve
```

### Access the Application

- **Frontend**: `http://localhost:4200`
- **Backend API**: `http://localhost:3001`

## 🌐 API Endpoints

### Apartments

- `GET /apartment` - Get all apartments
- `GET /apartment/:id` - Get apartment by ID
- `GET /apartment/city/:id` - Filter by city
- `GET /apartment/category/:id` - Filter by category
- `GET /apartment/price/:price` - Filter by price
- `POST /apartment` - Create new listing
- `PUT /apartment/:id` - Update listing
- `DELETE /apartment/:id` - Delete listing

### Additional Endpoints

- **Cities**: Manage location data
- **Categories**: Apartment type management
- **Advertisers**: User profile management
- **Customers**: Customer information

## 📱 User Interface

### Main Pages

- **Home/Login** - User authentication
- **Browse Apartments** - Main listing page with filters
- **Add Apartment** - Create new listings
- **My Apartments** - Manage personal listings
- **Apartment Details** - Detailed view with images
- **Cities/Categories** - Manage location and type data

### Key Components

- **Navigation Bar** - Easy access to all features
- **Search Filters** - Advanced filtering options
- **Image Gallery** - Multiple photo display
- **Responsive Design** - Mobile-friendly interface

## 💡 Perfect For

- **Real Estate Platforms** - Apartment rental marketplaces
- **Learning Full-Stack Development** - MEAN stack implementation
- **Understanding REST APIs** - Complete CRUD operations
- **File Upload Systems** - Image handling and storage
- **Database Relationships** - MongoDB with references

## 🔧 Technical Highlights

- **RESTful API Design** with proper HTTP methods
- **MongoDB Relationships** with population
- **File Upload Handling** with Multer
- **JWT Authentication** for secure access
- **Angular Services** for state management
- **Responsive UI** with modern CSS
- **Error Handling** throughout the application
- **Data Validation** on both frontend and backend

---

*A professional apartment advertising platform demonstrating modern web development practices with Angular, Node.js, and MongoDB.*
