import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/layouts/Navbar/Navbar";
import Footer from "./components/layouts/Footer/Footer";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
