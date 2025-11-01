import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { chatService } from './services/chatService';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgetPassword from './pages/ForgetPassword'; // ✅ Import ForgetPassword page
import DashboardSeeker from './pages/DashboardSeeker';
import DashboardFinder from './pages/DashboardFinder';
import JobList from './pages/JobList';
import JobDetails from './pages/JobDetails';

// Optional: comment out if you don’t have these pages yet
// import ChatPage from './pages/Chat';
// import Notifications from './pages/Notifications';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    setUser(parsedUser);

    // Listen to auth changes
    const handleAuthChange = () => {
      const u = localStorage.getItem('user');
      setUser(u ? JSON.parse(u) : null);
    };
    window.addEventListener('auth-change', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);

    // Initialize chat socket if user exists
    if (parsedUser) {
      const token = localStorage.getItem('token');
      chatService.connect(parsedUser._id, token);
    }

    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
      chatService.disconnect();
    };
  }, []);

  // Protected route wrapper
  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" replace />;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgetPassword />} /> {/* ✅ Added */}

          {/* Protected Routes */}
          <Route
            path="/dashboard/seeker"
            element={
              <PrivateRoute>
                <DashboardSeeker />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/finder"
            element={
              <PrivateRoute>
                <DashboardFinder />
              </PrivateRoute>
            }
          />

          <Route path="/jobs" element={<JobList />} />
          <Route path="/jobs/:id" element={<JobDetails />} />

          {/* Uncomment if you have ChatPage or Notifications */}
          {/*
          <Route
            path="/chat/:conversationId"
            element={
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <PrivateRoute>
                <Notifications />
              </PrivateRoute>
            }
          />
          */}

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
