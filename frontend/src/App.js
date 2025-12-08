import React from "react";
import "./App.css";
import FusionChat from "./pages/main/main.jsx";
// import "./styles/main/main.css";
import {
  // BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LanderSite from "./pages/lander/lander";
import Register from "./pages/login/Register";
import Login from "./pages/login/Login";
import ProtectedRoute from "./utils/ProtectedRoutes.jsx";

function App() {
  return (
    // <Router>
    <Routes>
      {/* Landing Page - Entry Point */}
      <Route path="/" element={<LanderSite />} />

      {/* Seperate Register and Login pages*/}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Chat Page - Protected */}
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <FusionChat />
          </ProtectedRoute>
        }
      />

      {/* Redirect unknown routes to landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    // </Router>
  );
  // return <FusionChat />;
}

export default App;
