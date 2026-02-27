import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import client, { setAuthToken } from "../api/client";

const CoursesPage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [form, setForm] = useState({
    courseName: "",
    courseDescription: "",
    instructor: "",
  });
  const [error, setError] = useState("");

  const fetchCourses = async () => {
    try {
      const response = await client.get("/api/courses");
      setCourses(response.data);
    } catch (requestError) {
      if (requestError.response?.status === 401) {
        handleLogout();
      } else {
        setError("Could not load courses");
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    setAuthToken(token);
    fetchCourses();
  }, []);

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await client.post("/api/courses", form);
      setForm({ courseName: "", courseDescription: "", instructor: "" });
      fetchCourses();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Could not create course");
    }
  };

  const handleDelete = async (id) => {
    try {
      await client.delete(`/api/courses/${id}`);
      fetchCourses();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Could not delete course");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("studentName");
    setAuthToken(null);
    navigate("/login");
  };

  const filteredCourses = useMemo(() => {
    if (!searchText.trim()) {
      return courses;
    }

    const query = searchText.toLowerCase();
    return courses.filter(
      (course) =>
        course.courseName.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query) ||
        course.courseDescription.toLowerCase().includes(query)
    );
  }, [courses, searchText]);

  return (
    <div className="container">
      <div className="header-row">
        <h1>Courses Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <form onSubmit={handleCreate} className="form-card">
        <h2>Create Course</h2>
        <input name="courseName" placeholder="Course Name" value={form.courseName} onChange={handleChange} />
        <input
          name="courseDescription"
          placeholder="Course Description"
          value={form.courseDescription}
          onChange={handleChange}
        />
        <input name="instructor" placeholder="Instructor" value={form.instructor} onChange={handleChange} />
        <button type="submit">Add Course</button>
      </form>

      <div className="form-card">
        <h2>Course List</h2>
        <input
          type="text"
          placeholder="Search by course, instructor, or description"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        {error && <p className="error-text">{error}</p>}

        {filteredCourses.length === 0 ? (
          <p>No courses found.</p>
        ) : (
          <div className="course-list">
            {filteredCourses.map((course) => (
              <div className="course-card" key={course._id}>
                <h3>{course.courseName}</h3>
                <p>{course.courseDescription}</p>
                <p>
                  <strong>Instructor:</strong> {course.instructor}
                </p>
                <button onClick={() => handleDelete(course._id)}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
