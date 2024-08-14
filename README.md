# Event managment

This project is a full-stack web application designed to manage events. It includes a React frontend, a Node.js backend, and utilizes a PostgreSQL database. The backend interacts with the database using the node-postgres (pg) library.

## Project overview

The Event Management Application allows users to create, view, and manage events. Key features include:

- User Management: Users can sign up, sign in, and manage their profiles.
- Event Creation: Users can create events with details like title, description, venue, and date.
- Event Editing: Users can edit existing events to update any details.
- Event Listing: All created events are displayed in a list, which users can view and manage.

## Technologies Used

- Frontend: React
- Backend: Node.js, Express
- Database: PostgreSQL
- ORM: Node-postgres (pg)

## project setup

```bash
git clone https://github.com/zemikyafu/event-management.git
cd event-management

# For the frontend
cd frontend
npm install

# For the backend
cd backend
npm install
```

## Available Scripts

Database scripts located in backend/db_scripts file.
To run the project use the following command in the project directory:

### `npm run start:frontend`

### `npm run start:backend`
