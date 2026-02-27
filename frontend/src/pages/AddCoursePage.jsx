import { useState } from "react";
import { useNavigate } from "react-router-dom";
import httpClient, { applyToken } from "../api/client";

function AddCoursePage() {
    const go = useNavigate();
    const [fields, setFields] = useState({
        courseName: "",
        courseDescription: "",
        instructor: "",
    });
    const [errMsg, setErrMsg] = useState("");
    const [okMsg, setOkMsg] = useState("");

    function onFieldChange(ev) {
        const { name, value } = ev.target;
        setFields((prev) => ({ ...prev, [name]: value }));
    }

    async function onFormSubmit(ev) {
        ev.preventDefault();
        setErrMsg("");
        setOkMsg("");

        const jwt = localStorage.getItem("token");
        if (!jwt) { go("/login"); return; }
        applyToken(jwt);

        try {
            await httpClient.post("/api/courses", fields);
            setFields({ courseName: "", courseDescription: "", instructor: "" });
            setOkMsg("Course saved successfully!");
            setTimeout(() => setOkMsg(""), 3500);
        } catch (err) {
            setErrMsg(err.response?.data?.message || "Could not save the course");
        }
    }

    function signOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("studentName");
        applyToken(null);
        go("/login");
    }

    const studentName = localStorage.getItem("studentName") || "";

    return (
        <>
            <nav className="navbar">
                <div className="navbar-brand">
                    <div className="navbar-logo">📚</div>
                    <span className="navbar-title">CourseHub</span>
                </div>
                <div className="navbar-right">
                    {studentName && (
                        <p className="navbar-greeting">
                            Hey, <span>{studentName}</span>!
                        </p>
                    )}
                    <button className="btn-ghost" onClick={() => go("/dashboard")}>Dashboard</button>
                    <button className="btn-ghost" onClick={() => go("/courses")}>See Courses</button>
                    <button className="btn-logout" onClick={signOut}>Sign out</button>
                </div>
            </nav>

            <div className="dashboard">
                <div className="dashboard-card">
                    <h2>Add a New Course</h2>
                    <form onSubmit={onFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <input name="courseName" placeholder="Course name" value={fields.courseName} onChange={onFieldChange} />
                        <input
                            name="courseDescription"
                            placeholder="Short description"
                            value={fields.courseDescription}
                            onChange={onFieldChange}
                        />
                        <input name="instructor" placeholder="Instructor name" value={fields.instructor} onChange={onFieldChange} />
                        {errMsg && <p className="error-text">{errMsg}</p>}
                        {okMsg && <p className="success-text">{okMsg}</p>}
                        <button type="submit" className="btn-add">+ Add Course</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddCoursePage;
