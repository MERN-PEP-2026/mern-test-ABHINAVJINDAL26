/*
 * App.jsx — top-level route configuration
 * Maps URL paths to their corresponding page components
 */
import { Navigate, Route, Routes } from "react-router-dom";
import AuthGate from "./components/ProtectedRoute";
import SignIn from "./pages/LoginPage";
import SignUp from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import CoursesPage from "./pages/CoursesPage";
import AddCoursePage from "./pages/AddCoursePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" replace />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route
        path="/dashboard"
        element={
          <AuthGate>
            <DashboardPage />
          </AuthGate>
        }
      />
      <Route
        path="/courses"
        element={
          <AuthGate>
            <CoursesPage />
          </AuthGate>
        }
      />
      <Route
        path="/add-course"
        element={
          <AuthGate>
            <AddCoursePage />
          </AuthGate>
        }
      />
    </Routes>
  );
}

export default App;
