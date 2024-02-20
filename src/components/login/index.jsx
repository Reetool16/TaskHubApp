// LoginPage.js
import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (
      userData &&
      formData.email === userData.email &&
      formData.password === userData.password
    ) {
      navigate("/taskboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div>
      <div style={{ textAlign: "right" }}>
        <p>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "blue" }}>
            Sign Up
          </Link>
        </p>
      </div>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
