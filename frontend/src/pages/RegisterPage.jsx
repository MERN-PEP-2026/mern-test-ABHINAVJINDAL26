import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import client, { setAuthToken } from "../api/client";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await client.post("/api/auth/register", form);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("studentName", response.data.student.name);
      setAuthToken(response.data.token);
      navigate("/courses");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="form-card">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        {error && <p className="error-text">{error}</p>}
        <button type="submit">Create Account</button>
      </form>
      <p>
        Already registered? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
