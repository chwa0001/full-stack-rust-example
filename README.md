# 3f50d327d2834007a371d2819adeccb0

# Rust Backend with React Frontend

## Frontend (React + Vite)
The frontend is a React application built with Vite. After building the project, the static files are placed in `backend/build/` for the Rust server to serve.

### Building the Frontend
Ensure Node.js is installed, then run:

```sh
cd frontend
npm install
npm run build
```
#### Reason to pick React + Vite
It is because the React Vite framework is a super fast development and hot reloading tool which can facilitate my development and release the changes quickly.

## Backend (Rust - Shuttle - Actix Web)
The backend is built using Rust with the Actix Web framework. It serves as a lightweight HTTP server that serves the static build files generated from the React frontend.

- The Rust backend is located in the `backend/` directory.
- Static files from the React frontend build are stored in `backend/build/` and served by the backend.
- The backend routes are defined in `backend/src/routes/`.

### Running the Backend
Ensure Rust, Cargo, Shuttle are installed, then run:

```sh
cd backend
shuttle run
```

This generates a `dist/` folder, which should be moved to `backend/build/`.

#### Reason to Rust - Shuttle - Actix Web
The reason to pick Actix Web as backend with Shuttle as cloud deployment platform because it can be delivered fast with less complexity of the Rust language structures.
It could not less efficient than other Rust backend framework, however, due to its developer-friendly features, I decide to pick it as the main backend framework of our assessment.

## Live Demo
View the deployed portfolio on Vercel:  
[**Live Portfolio**](https://assessment-q0dw.shuttle.app/)

### Further improvement
I would improve the instruction with selected AI command to obtain more intuitive desired output as I believe a better AI application should have a clear instruction to retreive a better AI result.