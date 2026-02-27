
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import httpClient, { applyToken } from "../api/client";

function SignIn() {
  const go = useNavigate();
  const [fields, setFields] = useState({ email: "", password: "" });
  const [errMsg, setErrMsg] = useState("");

  /* keep form fields in sync */
  function onFieldChange(ev) {
    const { name, value } = ev.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  }

  /* submit credentials to the backend */
  async function onFormSubmit(ev) {
    ev.preventDefault();
    setErrMsg("");

    try {
      const { data } = await httpClient.post("/api/auth/login", fields);
      localStorage.setItem("token", data.token);
      localStorage.setItem("studentName", data.student.name);
      applyToken(data.token);
      go("/dashboard");
    } catch (err) {
      setErrMsg(err.response?.data?.message || "Sign-in failed");
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-logo">📚</div>
        <div>
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to your CourseHub account</p>
        </div>

        <form onSubmit={onFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input name="email" type="email" placeholder="Email address" value={fields.email} onChange={onFieldChange} />
          <input name="password" type="password" placeholder="Password" value={fields.password} onChange={onFieldChange} />
          {errMsg && <p className="error-text">{errMsg}</p>}
          <button type="submit" className="btn-primary" style={{ marginTop: "4px" }}>Sign In</button>
        </form>

        <p className="auth-footer">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
