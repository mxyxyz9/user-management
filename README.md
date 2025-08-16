# User Management System

A modern, minimalistic full-stack user management application with a clean monotone design and CSV export functionality.

## 📸 Screenshots

### Main Dashboard
![Main Dashboard](images/Screenshot%202025-08-16%20at%206.19.06%20AM.png)
*Clean, minimalistic interface with user cards and export functionality*

### Add User Modal
![Add User Modal](images/Screenshot%202025-08-16%20at%206.19.35%20AM.png)
*Spacious modal form with rounded corners and clean typography*

### User Management
![User Management](images/Screenshot%202025-08-16%20at%206.19.43%20AM.png)
*Hover interactions revealing edit and delete options*

### Empty State
![Empty State](images/Screenshot%202025-08-16%20at%206.19.51%20AM.png)
*Thoughtful empty state with call-to-action*

## 🎨 Design Features

- **Monotone Theme**: Clean black and white aesthetic with subtle grays
- **Bricolage Grotesque Font**: Modern typography with light weights
- **Ample White Space**: Generous padding and spacing for readability
- **Rounded Corners**: Soft, modern interface elements
- **Responsive Design**: Works seamlessly across all devices

## ⚡ Features

- ✅ **CRUD Operations**: Create, read, update, and delete users
- ✅ **Real-time Updates**: Instant UI feedback for all operations
- ✅ **CSV Export**: Export all users to CSV with date-stamped filename
- ✅ **Modal Forms**: Clean, spacious forms for user input
- ✅ **Hover Interactions**: Smooth animations and micro-interactions
- ✅ **Empty States**: Thoughtful placeholder content
- ✅ **Type Safety**: Full TypeScript implementation

## 🛠️ Tech Stack

### Frontend
- **Next.js** - React framework for production
- **React** - UI library with TypeScript
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for APIs
- **Prisma** - Modern database toolkit & ORM

### Database
- **PostgreSQL** - Relational database

### DevOps
- **Docker** - Containerization platform
- **Docker Compose** - Multi-container orchestration

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Git installed

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mxyxyz9/user-management.git
   cd user-management
   ```

2. **Start the application**
   ```bash
   docker compose up --build
   ```

3. **Initialize the database**
   ```bash
   docker compose exec backend npx prisma migrate dev --name init
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000

## 📱 Usage

### Adding Users
1. Click the "Add User" button in the header
2. Fill in the name and email fields
3. Click "Add User" to save

### Editing Users
1. Hover over any user card
2. Click the "Edit" button that appears
3. Update the information and click "Save Changes"

### Deleting Users
1. Hover over any user card
2. Click the "Delete" button that appears
3. The user will be removed immediately

### Exporting Data
1. The "Export CSV" button appears when users exist
2. Click to download a CSV file with all user data
3. File is automatically named with the current date

## 🏗️ Project Structure

```
user-management/
├── frontend/                 # Next.js React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/          # Next.js pages
│   │   └── styles/         # CSS and styling
│   ├── package.json
│   └── frontend.dockerfile
├── backend/                 # Express.js API server
│   ├── prisma/             # Database schema and migrations
│   ├── index.js            # Main server file
│   ├── package.json
│   └── backend.dockerfile
├── compose.yaml            # Docker Compose configuration
└── README.md
```

## 🔧 Development

### Running in Development Mode

1. **Backend Development**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Frontend Development**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Database Management

- **View database**: Access PostgreSQL at `localhost:5432`
- **Run migrations**: `npx prisma migrate dev`
- **Reset database**: `npx prisma migrate reset`
- **View data**: `npx prisma studio`

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get user by ID |
| POST | `/users` | Create new user |
| PUT | `/users/:id` | Update user |
| DELETE | `/users/:id` | Delete user |
| GET | `/test` | API health check |

## 🎯 Design Philosophy

This application embraces a **minimalistic, editorial design** approach:

- **Typography-focused**: Uses Bricolage Grotesque for sophisticated text hierarchy
- **Monotone palette**: Black, white, and grays create timeless elegance
- **Generous spacing**: Ample white space improves readability and focus
- **Subtle interactions**: Hover effects and animations enhance usability
- **Content-first**: Design serves the data, not the other way around

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**mxyxyz9**
- GitHub: [@mxyxyz9](https://github.com/mxyxyz9)

---

Built with ❤️ using modern web technologies and thoughtful design principles.