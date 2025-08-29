import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CardPage from "./CardPage.jsx";
import Home from "./Home.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<CardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
