import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Auth/Login";
import Unauthorized from "./pages/Auth/Unauthorized";
import Home from "./pages/Home/Home";
import PageNotFound from "./components/PageNotFound";

// Admin Pages
import AdminDashboard from "./pages/Admin/Dashboard";
import ManageStudents from "./pages/Admin/ManageStudents";
// import ManageTeachers from "./pages/Admin/ManageTeachers";
// import ManageDepartments from "./pages/Admin/ManageDepartments";

// Teacher Pages
// import TeacherDashboard from "./pages/Teacher/Dashboard";
// import ManageNotes from "./pages/Teacher/ManageNotes";
// import ManageResults from "./pages/Teacher/ManageResults";

// Common Pages
// import Notes from "./pages/Notes/Notes";
import Results from "./pages/Results/Results";
import Events from "./pages/Events/Events";
import Community from "./pages/Community/Community";
import Settings from "./pages/Settings/Settings";
import TeacherDashboard from "./pages/Teacher/Dashboard";
// import ManageNotes from "./pages/Teacher/ManageNotes";
import ManageResults from "./pages/Teacher/ManageResults";
import ManageTeachers from "./pages/Admin/ManageTeachers";
import ManageDepartments from "./pages/Admin/ManageDepartments";
import EditStudentModal from "./components/EditStudentModal";

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-4">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/students"
              element={
                <ProtectedRoute allowedRoles={["admin", "teacher"]}>
                  <ManageStudents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/teachers"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <ManageTeachers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/departments"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <ManageDepartments />
                </ProtectedRoute>
              }
            />

            {/* Teacher Routes */}
            <Route
              path="/teacher/dashboard"
              element={
                <ProtectedRoute allowedRoles={["teacher"]}>
                  <TeacherDashboard />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="/teacher/notes"
              element={
                <ProtectedRoute allowedRoles={["teacher"]}>
                  <ManageNotes />
                </ProtectedRoute>
              }
            /> */}
            <Route
              path="/teacher/results"
              element={
                <ProtectedRoute allowedRoles={["teacher"]}>
                  <ManageResults />
                </ProtectedRoute>
              }
            />

            {/* Common Routes */}
            {/* <Route
              path="/notes"
              element={
                <ProtectedRoute allowedRoles={["admin", "teacher"]}>
                  <Notes />
                </ProtectedRoute>
              }
            /> */}
            <Route path="//students/editStudent/:id"
              element={
                <ProtectedRoute allowedRoles={["admin", "teacher"]}>
                  <EditStudentModal />
                </ProtectedRoute>
              }
            />
            <Route
              path="/results"
              element={
                <ProtectedRoute allowedRoles={["admin", "teacher"]}>
                  <Results />
                </ProtectedRoute>
              }
            />
            <Route
              path="/events"
              element={
                <ProtectedRoute allowedRoles={["admin", "teacher"]}>
                  <Events />
                </ProtectedRoute>
              }
            />
            <Route
              path="/community"
              element={
                <ProtectedRoute allowedRoles={["admin", "teacher"]}>
                  <Community />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute allowedRoles={["admin", "teacher"]}>
                  <Settings />
                </ProtectedRoute>
              }
            />

            {/* Not Found */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
      </div>
    </>
  );
};

const App = () => (
  <Router>
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  </Router>
);

export default App;
