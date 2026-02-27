/*
 * CoursesPage.jsx — displays all courses with accordion reveal
 * Description is hidden until the student clicks a course row
 */
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import httpClient, { applyToken } from "../api/client";

function CoursesPage() {
  const go = useNavigate();
  const [records, setRecords] = useState([]);
  const [query, setQuery] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [openId, setOpenId] = useState(null);

  /* pull course list from the API */
  async function loadRecords() {
    try {
      const { data } = await httpClient.get("/api/courses");
      setRecords(data);
    } catch (err) {
      if (err.response?.status === 401) { signOut(); return; }
      setErrMsg("Unable to fetch courses");
    }
  }

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (!jwt) { go("/login"); return; }
    applyToken(jwt);
    loadRecords();
  }, []);

  function signOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("studentName");
    applyToken(null);
    go("/login");
  }

  /* toggle the expanded course panel */
  function toggleOpen(id) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  /* remove a course via API then refresh */
  async function onRemove(id) {
    try {
      await httpClient.delete(`/api/courses/${id}`);
      loadRecords();
    } catch (err) {
      setErrMsg(err.response?.data?.message || "Removal failed");
    }
  }

  /* live-filtered list based on search query */
  const visible = useMemo(() => {
    if (!query.trim()) return records;
    const lc = query.toLowerCase();
    return records.filter(
      (r) =>
        r.courseName.toLowerCase().includes(lc) ||
        r.instructor.toLowerCase().includes(lc) ||
        r.courseDescription.toLowerCase().includes(lc)
    );
  }, [records, query]);

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
          <button className="btn-ghost" onClick={() => go("/add-course")}>+ Add Course</button>
          <button className="btn-logout" onClick={signOut}>Sign out</button>
        </div>
      </nav>

      <div className="dashboard">
        <div className="dashboard-card">
          <h2>All Courses {records.length > 0 && `(${records.length})`}</h2>

          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by name, instructor, or description…"
              value={query}
              onChange={(ev) => setQuery(ev.target.value)}
            />
          </div>

          {errMsg && <p className="error-text">{errMsg}</p>}

          {visible.length === 0 ? (
            <div className="empty-state">
              {query ? "No matches found." : "No courses yet — add one to get started!"}
            </div>
          ) : (
            <div className="course-list">
              {visible.map((c) => (
                <div
                  className={`course-item-accordion${openId === c._id ? " expanded" : ""}`}
                  key={c._id}
                >
                  <div className="course-header" onClick={() => toggleOpen(c._id)}>
                    <div className="course-header-left">
                      <h3>{c.courseName}</h3>
                      <span className="course-instructor">👤 {c.instructor}</span>
                    </div>
                    <span className="expand-icon">{openId === c._id ? "▲" : "▼"}</span>
                  </div>

                  {openId === c._id && (
                    <div className="course-details">
                      <p className="course-description">{c.courseDescription}</p>
                      <button className="btn-danger" onClick={() => onRemove(c._id)}>
                        Delete Course
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CoursesPage;
