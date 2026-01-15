import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./login.css";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await API.post("/users/register", {
        name,
        email,
        password,
        role: "user",
      });
      setMessage("Registration successful! Redirecting to login...");
      setError("");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      setMessage("");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Account 🎶</h2>
        <p className="auth-subtitle">
          Join Music App and start your musical journey
        </p>

        <form onSubmit={handleRegister}>
          <input
            name="name"
            placeholder="Full Name"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />

          <button type="submit">Register</button>
        </form>

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

        <p className="auth-footer">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
}
