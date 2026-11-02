# Reading Tracker

A small full-stack app for keeping a reading list. Add books with page counts and deadlines, track reading goals, and update book details as you go.

## Project structure

- `frontend/` — React and TypeScript user interface
- `backend/` — Express and TypeScript API backed by MongoDB

## Requirements

- Node.js and npm
- A MongoDB database and connection string

## Setup

### Backend

Create `backend/.env` with the MongoDB connection details:

```env
DB_CONN_STRING=mongodb://localhost:27017
DB_NAME=reading_tracker
BOOKS_COLLECTION_NAME=books
```

Use your own MongoDB connection string and database name where needed. Then install dependencies and start the API:

```sh
cd backend
npm install
npm start
```

The API starts at `http://localhost:3030` and exposes book routes under `/books`.

### Frontend

In another terminal, install dependencies and start the development server:

```sh
cd frontend
npm install
npm start
```

The app is available at `http://localhost:3000`. By default, it connects to the API at `http://localhost:3030`.

## API

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/books` | List all books |
| `POST` | `/books` | Add a book |
| `PUT` | `/books/:id` | Update a book |

## Development commands

Run these from the relevant project directory:

```sh
# Backend
npm test
npm run lint
npm run build

# Frontend
npm test
npm run build
```
