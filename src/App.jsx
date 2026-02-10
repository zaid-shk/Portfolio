import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import { PortfolioProvider } from "./context/PortfolioContext";
import "./index.css";

function App() {
  return (
    <PortfolioProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </PortfolioProvider>
  );
}

export default App;
