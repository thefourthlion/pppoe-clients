import "./styles/Addresses.css";
import "./styles/globals.css"
import React from "react";
import Home from "./pages/Home";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="Home" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
