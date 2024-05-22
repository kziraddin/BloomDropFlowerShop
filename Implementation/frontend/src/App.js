import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ShopFlowers from "./components/ShopFlowers";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import Contact from "./components/Contact";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}

          <Route path="/contact" element={<Contact />} />

          <Route path="/signin" element={<SignInForm />} />

          <Route path="/signup" element={<SignUpForm />} />

          <Route path="/shopflowers" element={<ShopFlowers />} />

          {/* Add more routes for other components */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
