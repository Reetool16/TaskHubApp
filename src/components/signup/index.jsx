import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import "./SignupPage.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    position: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.email &&
      formData.password &&
      formData.position
    ) {
      // Store user information in local storage
      localStorage.setItem("userData", JSON.stringify(formData));
      navigate("/login");
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div>
      <div style={{ textAlign: "right" }}>
        <p>
          Already have an account?
          <Link to="/login" style={{ color: "blue" }}>
            Login
          </Link>
        </p>
      </div>
      <div className="signup-container">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label htmlFor="position">Position</label>
          <input
            type="text"
            id="position"
            name="position"
            placeholder="Enter your position"
            value={formData.position}
            onChange={handleChange}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
