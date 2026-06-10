# Contact Management System - MERN Stack

A full-stack Contact Management System built using the MERN stack. This project allows users to create, view, search, filter, update, and delete contact records. Contact data is stored in MongoDB Atlas and managed through a Node.js and Express.js backend API.

## Features

* Add new contacts
* View all saved contacts
* Search contacts by name or company
* Filter contacts by status
* Update contact details
* Update contact status
* Delete contacts
* MongoDB Atlas database integration
* React frontend with Vite
* REST API using Express.js

## Tech Stack

### Frontend

* React.js
* Vite
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* CORS
* Dotenv

## Project Structure

```txt
contact-management-mern/
├── backend/
│   ├── models/
│   │   └── Contact.js
│   ├── routes/
│   │   └── contactRoutes.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContactForm.jsx
│   │   │   └── ContactList.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
├── .gitignore
└── README.md
```

## API Endpoints

| Method | Endpoint        | Description          |
| ------ | --------------- | -------------------- |
| GET    | `/contacts`     | Get all contacts     |
| POST   | `/contacts`     | Create a new contact |
| PUT    | `/contacts/:id` | Update a contact     |
| DELETE | `/contacts/:id` | Delete a contact     |

## How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/your-username/contact-management-mern.git
cd contact-management-mern
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Create backend `.env` file

```env
MONGO_URI=your_mongodb_atlas_connection_string
```

### 4. Run backend

```bash
npm run dev
```

Backend runs on:

```txt
http://localhost:8000
```

### 5. Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 6. Run frontend

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

## Status Values

Contacts can have one of the following statuses:

* Interested
* Follow-up
* Closed

## Author

Developed by Dheena Amjath.
