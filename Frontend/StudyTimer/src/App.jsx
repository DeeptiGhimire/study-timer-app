import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Timer from "./pages/Timer";
import Tasks from "./pages/Tasks";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Sidebar from "./Sidebar/Sidebar";

const noSidebarRoutes = ["/login", "/signup"];

function Layout({ children }) {
  const location = useLocation();
  const showSidebar = !noSidebarRoutes.includes(location.pathname);
  return (
    <>
      {showSidebar && <Sidebar />}
      <div className={showSidebar ? "main-content" : "main-content-full"}>
        {children}
      </div>
    </>
  );
}

function App() {
  const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/timer" element={token ? <Timer /> : <Navigate to="/login" />} />
          <Route path="/tasks" element={token ? <Tasks /> : <Navigate to="/login" />} />
          <Route path="/history" element={token ? <History /> : <Navigate to="/login" />} />
          <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App; 