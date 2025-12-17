import { JSX } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import ExerciseList from "./pages/exercises/ExerciseList";
import ExerciseForm from "./pages/exercises/ExerciseForm";
import Contact from "./pages/contact/Contact";
import About from "./pages/about/About";
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css";

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exercises"
          element={
            <ProtectedRoute>
              <ExerciseList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exercises/new"
          element={
            <ProtectedRoute>
              <ExerciseForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exercises/:id/edit"
          element={
            <ProtectedRoute>
              <ExerciseForm />
            </ProtectedRoute>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
