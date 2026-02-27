
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import httpClient, { applyToken } from "../api/client";

function SignUp() {
  const go = useNavigate();
  const [fields, setFields] = useState({ name: "", email: "", password: "" });
  const [errMsg, setErrMsg] = useState("");

  function onFieldChange(ev) {
    const { name, value } = ev.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  }

  async function onFormSubmit(ev) {
    ev.preventDefault();
    setErrMsg("");

    try {
      const { data } = await httpClient.post("/api/auth/register", fields);
      localStorage.setItem("token", data.token);
      localStorage.setItem("studentName", data.student.name);
      applyToken(data.token);
      go("/dashboard");
    } catch (err) {
      setErrMsg(err.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-logo">📚</div>
        <div>
          <h1 className="auth-title">Create account</h1>
          <p className="auth-subtitle">Start managing your courses today</p>
        </div>

        <form onSubmit={onFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input name="name" placeholder="Full name" value={fields.name} onChange={onFieldChange} />
          <input name="email" type="email" placeholder="Email address" value={fields.email} onChange={onFieldChange} />
          <input name="password" type="password" placeholder="Password" value={fields.password} onChange={onFieldChange} />
          {errMsg && <p className="error-text">{errMsg}</p>}
          <button type="submit" className="btn-primary" style={{ marginTop: "4px" }}>Create Account</button>
        </form>

        <p className="auth-footer">
          Already registered? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
