import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignUpForm.css";

function SignUpForm() {
  // State variables to store form data and error messages
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);

  // React Router hook for navigation
  const history = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (PhoneNumber.toString().length !== 10) {
      setError("Phone number must be 10 digits.");
      return;
    }

    try {
      // Sending form data to the server
      const response = await axios.post(
        "http://localhost:5500/users/register",
        {
          FirstName: FirstName,
          LastName: LastName,
          Email: Email,
          Password: Password,
          PhoneNumber: PhoneNumber,
        }
      );

      console.log("Sign-up successful:", response.data);
      // Redirect to sign-in page after successful sign-up
      history("/signin");
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Sign-up error:", error.response.data);
        setError("An error occurred. Please try again later.");
      } else {
        console.error("Sign-up error:", error);
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="FirstName">First Name:</label>
          <input
            type="text"
            id="FirstName"
            value={FirstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="LastName">Last Name:</label>
          <input
            type="text"
            id="LastName"
            value={LastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Email">Email:</label>
          <input
            type="Email"
            id="Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Password">Password:</label>
          <input
            type="Password"
            id="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="PhoneNumber">Phone Number:</label>
          <input
            type="text"
            id="PhoneNumber"
            value={PhoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
