import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignInForm.css";

function SignInForm() {
  // State variables to store user input and error messages
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // React Router hook for navigation
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sending user credentials to the server for authentication
      const response = await axios.post("http://localhost:5500/users/login", {
        Email,
        Password,
      });

      // Extracting token from the server response upon successful sign-in
      const token = response.data.token;

      // Storing the token in local storage or session storage for future authentication
      localStorage.setItem("token", token);

      // Redirecting to home page after successful sign-in
      navigate("/");
    } catch (error) {
      console.error("Sign-in error:", error);

      // Handling different types of errors
      if (error.response) {
        // Error response from the server
        if (error.response.status === 401) {
          // Unauthorized error (invalid email or password)
          setError("Invalid email or password");
        } else {
          // Other server errors
          setError("An error occurred. Please try again later.");
        }
      } else if (error.request) {
        // No response received (possibly a network error)
        setError("Network error. Please try again later.");
      } else {
        // Other types of errors
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      {/* Displaying error message if present */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* Sign-in form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
