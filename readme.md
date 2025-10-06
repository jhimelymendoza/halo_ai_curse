# Chat Project Frontend & Backend

This project consists of a **frontend** developed with Angular and a **backend** using Node.js/NestJS. It allows interaction with a chat connected to a MongoDB database and the Geminis API.

---

## Prerequisites

Before running the project, make sure you have:

- **Node.js** and **npm** installed.
- **MongoDB** running and accessible.
- **Geminis API Keys** available.

---

## Configuratión

1. Set up your **Geminis API Keys** for the project.
2. Set your **MongoDB connection string** in the backend so it can connect to the database.

1. Set up your **Geminis API Keys** for the project.
2. Set your **MongoDB connection string** in the backend so it can connect to the database.
---

## Installing Dependencies

Install dependencies in both folders before starting the project:

```bash
# Frontend
cd ui
npm install

# Backend
cd ../api
npm install

```
---
## Running the Project

Frontend
```bash
# Frontend
ng s

# Backend

npm run start

```
---
## Accessing the Chat


Once both frontend and backend are running, you can access the chat in your browser
```aiignore
http://localhost:4200/chat
```
