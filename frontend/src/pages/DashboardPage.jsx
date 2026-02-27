/*
 * DashboardPage.jsx — main landing page after sign-in
 * Shows project overview, user greeting, and navigation to features
 */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import httpClient, { applyToken } from "../api/client";

function DashboardPage() {
    const go = useNavigate();
    const [userName, setUserName] = useState("");
    const [courseCount, setCourseCount] = useState(0);

    useEffect(() => {
        const jwt = localStorage.getItem("token");
        if (!jwt) { go("/login"); return; }

        applyToken(jwt);
        setUserName(localStorage.getItem("studentName") || "Student");

        /* fetch count of courses for the stat card */
        httpClient
            .get("/api/courses")
            .then((res) => setCourseCount(res.data.length))
            .catch(() => setCourseCount(0));
    }, [go]);

    function signOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("studentName");
        applyToken(null);
        go("/login");
    }

    return (
        <>
            {/* Navbar */}
            <nav className="navbar">
                <div className="navbar-brand">
                    <div className="navbar-logo">📚</div>
                    <span className="navbar-title">CourseHub</span>
                </div>
                <div className="navbar-right">
                    <button className="btn-ghost" onClick={() => go("/add-course")}>+ Add Course</button>
                    <button className="btn-ghost" onClick={() => go("/courses")}>See Courses</button>
                    <button className="btn-logout" onClick={signOut}>Sign out</button>
                </div>
            </nav>

            {/* Dashboard Content */}
            <div className="dashboard">

                {/* Welcome Banner */}
                <div className="welcome-banner">
                    <div className="welcome-text">
                        <h1>Hello, {userName} 👋</h1>
                        <p>Welcome to <strong>CourseHub</strong> — your personal course management system.</p>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="stats-row">
                    <div className="stat-card">
                        <span className="stat-number">{courseCount}</span>
                        <span className="stat-label">Courses Added</span>
                    </div>
                    <div className="stat-card accent">
                        <span className="stat-number">∞</span>
                        <span className="stat-label">Possibilities</span>
                    </div>
                </div>

                {/* About Section */}
                <div className="dashboard-card">
                    <h2>📋 What is CourseHub?</h2>
                    <p className="about-text">
                        CourseHub is a <strong>Student Course Management System</strong> built
                        with the MERN stack (MongoDB, Express, React, Node.js). It lets
                        students organise their academic courses in one place — create,
                        search, and manage course records effortlessly.
                    </p>
                </div>

                <div className="dashboard-card">
                    <h2>🚀 Key Features</h2>
                    <ul className="feature-list">
                        <li>🔐 Secure sign-up &amp; sign-in with JWT authentication</li>
                        <li>📝 Add courses with name, description &amp; instructor info</li>
                        <li>🔍 Instant search across all your courses</li>
                        <li>🗑️ Remove courses you no longer need</li>
                        <li>🛡️ Each student's data is private and protected</li>
                    </ul>
                </div>

                {/* Action Buttons */}
                <div className="action-row">
                    <button className="btn-primary action-btn" onClick={() => go("/add-course")}>
                        + Add a New Course
                    </button>
                    <button className="btn-ghost action-btn" onClick={() => go("/courses")}>
                        📖 See All Courses
                    </button>
                </div>

            </div>
        </>
    );
}

export default DashboardPage;
