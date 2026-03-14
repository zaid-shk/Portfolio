import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { PortfolioProvider } from "./context/PortfolioContext";
import "./index.css";

function App() {
  return (
    <PortfolioProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </PortfolioProvider>
  );
}

export default App;
