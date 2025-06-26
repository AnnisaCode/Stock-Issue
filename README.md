# Stock Issue Management System

A beautiful full-stack web application for managing stock issue requests with a feminine/girly design aesthetic. Built with Vue 3, Vite, TailwindCSS for the frontend and Node.js/Express for the backend.

## ✨ Features

- **Authentication**: Dummy login system with frontend validation
- **Dashboard**: Beautiful overview of all stock issues with search and filtering
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality for stock issues
- **Detail Management**: Manage individual items within each stock issue
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Feminine Design**: Soft colors, elegant UI with smooth animations
- **REST API**: Full API implementation with JSON file storage

## 🎨 Design Features

- Soft pink, purple, and pastel color palette
- Smooth animations and hover effects
- Glass morphism effects
- Elegant typography and spacing
- Responsive grid layouts
- Beautiful gradient backgrounds

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone or download the project
2. Install dependencies:
```bash
npm install
```

3. Start both frontend and backend:
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

### Demo Credentials
- **Email**: admin@stockissue.com
- **Password**: admin123

## 📁 Project Structure

```
├── api/
│   └── index.js                # Express server for Vercel Serverless Functions
├── src/
│   ├── components/
│   │   ├── Login.vue           # Login page with authentication
│   │   ├── Dashboard.vue       # Main dashboard with stock issues list
│   │   └── StockIssueDetail.vue # Detailed view with item management
│   ├── App.vue                 # Root component
│   ├── main.ts                 # Application entry point with routing
│   └── style.css               # Global styles and themes
├── server/
│   └── data.json               # JSON database file (used by API)
├── package.json                # Dependencies and scripts
├── tailwind.config.js          # TailwindCSS configuration
└── vite.config.ts              # Vite configuration with proxy
```

## 🛠 API Endpoints

### Stock Issues
- `GET /api/stockissue` - Get all stock issues
- `POST /api/stockissue` - Create new stock issue
- `GET /api/stockissue/:id` - Get specific stock issue
- `PUT /api/stockissue/:id` - Update stock issue
- `DELETE /api/stockissue/:id` - Delete stock issue

### Stock Issue Details
- `GET /api/stockissue/:id/details` - Get all items in stock issue
- `POST /api/stockissue/:id/details` - Add new item
- `PUT /api/stockissue/:id/details/:detailId` - Update item
- `DELETE /api/stockissue/:id/details/:detailId` - Delete item

## 🎯 Key Features Implemented

### Frontend
- ✅ Vue 3 with Composition API
- ✅ Vue Router for multi-page navigation
- ✅ TailwindCSS for styling
- ✅ Responsive design
- ✅ Feminine/girly aesthetic
- ✅ Form validation
- ✅ Loading states and animations
- ✅ Search and filtering
- ✅ Modal dialogs

### Backend
- ✅ Express.js REST API
- ✅ CORS enabled
- ✅ JSON file database
- ✅ UUID for unique IDs
- ✅ Error handling
- ✅ Data validation

### Deployment Ready
- ✅ Production build scripts
- ✅ Environment configuration
- ✅ Vercel deployment ready

## 🚀 Deployment

This project is configured for easy deployment on **Vercel**.

1.  **Connect your GitHub repository to Vercel.**
2.  Vercel will automatically detect that it's a **Vite** project.
3.  Vercel will also automatically find the Express app in the `api` directory and deploy it as a **Serverless Function**.
4.  No extra configuration is needed. Just click **Deploy**!

The application is structured to be easily deployable on Vercel with proper configuration for both frontend and backend.

## 🎨 Color Palette

- **Primary**: Purple gradient (#d946ef to #c026d3)
- **Secondary**: Pink gradient (#ec4899 to #db2777)
- **Accent**: Orange (#f97316)
- **Background**: Soft pink/purple gradient
- **Success**: Green tones
- **Warning**: Yellow/orange tones
- **Error**: Red/pink tones

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Development Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run dev:frontend` - Start only frontend development server
- `npm run dev:backend` - Start only backend server (`node api/index.js`)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm start` - Start production server (for non-Vercel environments)

## 📋 Test Case Requirements Met

✅ Login page with dummy validation  
✅ Dashboard with stock issue list  
✅ CRUD operations for parent stock issues  
✅ Detail view with item-level CRUD  
✅ Multi-page routing  
✅ Responsive design  
✅ Feminine/girly UI design  
✅ Vue 3 + Vite + Vue Router + TailwindCSS  
✅ Node.js + Express backend  
✅ JSON file database  
✅ REST API implementation  
✅ Fetch-based API calls  
✅ Vercel deployment ready  
✅ Clean project structure  

This project demonstrates modern full-stack development practices with a beautiful, responsive user interface and robust backend API.

## 🔄 System Flow

### End-to-End System Flow

1. **Login**
   - User logs in using the provided credentials.
   - Upon successful login, user is redirected to the dashboard.
2. **Dashboard**
   - User sees a list of all stock issues, their statuses, and can search/filter them.
   - User can create a new stock issue by clicking the "New Stock Issue" button.
3. **Create Stock Issue**
   - User fills out the form with required information and submits.
   - The new stock issue is created with status `pending` and appears in the dashboard list.
4. **Manage Item Details**
   - User can add, edit, or delete item details for each stock issue while the status is `pending`.
5. **Edit or Delete Stock Issue**
   - While status is `pending`, user can edit or delete the stock issue.
6. **Change Status (Approve/Reject)**
   - User (e.g., admin/approver) can change the status of a stock issue to `approved` or `rejected` via the edit form.
   - Once status is changed to `approved` or `rejected`, the stock issue becomes read-only and cannot be edited or deleted.
7. **View History**
   - All stock issues, including those approved or rejected, remain visible in the dashboard for historical reference.
8. **Logout**
   - User can log out to end the session.

> This flow ensures that every stock issue is tracked from creation, through approval or rejection, and is always available for review in the system history.