import React, { useState, useEffect } from 'react';
import { Routes, Route  , useLocation, useNavigate, Navigate } from 'react-router-dom';

import Navbar from "./components/layout/DashboardNavbar";
import RegistrationList from "./components/registrations/RegistrationList";
import AddRegistration from "./components/registrations/AddRegistration";
import EditRegistration from "./components/registrations/EditRegistration";
import AddEvent from "./components/events/AddEvent";
import LandingPage from "./pages/LandingPage";
import About from './pages/About';
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Events from "./pages/Events";
import Analytics from "./pages/Analytics";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Sidebar from "./components/layout/Sidebar";
import "./styles/MainLayout.css";
import AdminRegistrations from "./pages/AdminRegistrations";
import RoomAllocation from "./pages/RoomAllocation";
const API_URL = `${import.meta.env.VITE_API_URL}/registrations`;

function App() {

  // This only runs once when the app boots
const [currentUser, setCurrentUser] = useState(() => {
  const savedUser = localStorage.getItem('app_user');
  return savedUser ? JSON.parse(savedUser) : null;
});

  const [token, setToken] = useState(() => localStorage.getItem('app_token') || '');

  const [events, setEvents] = useState([]); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  
  const location = useLocation();
  const navigate = useNavigate();

  
  // 🔄 SCHEMA SYNCHRONIZATION FIX: Explicitly matching your backend keys
  const [formData, setFormData] = useState({
    userName: '',
    eventId: '',      
    roomNumber: '',   // Aligned perfectly with backend model definition
    ticketCount: 1,   // Aligned perfectly with backend model definition
    contact: '',
    paymentStatus: 'Not Paid'
  });

  const [editingId, setEditingId] = useState(null);
  const [roomErrorModal, setRoomErrorModal] = useState({ show: false, message: '', availableSeats: 0 });
  
  const [isMobile, setIsMobile] = useState(
  window.innerWidth <= 768
);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);

    if (window.innerWidth > 768) {
      setIsSidebarOpen(true);
    }
  };

  window.addEventListener("resize", handleResize);

  return () =>
    window.removeEventListener(
      "resize",
      handleResize
    );
}, []);

  const handleSignIn = async (credentials) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      if (res.ok) {
        const data = await res.json();
        
        localStorage.setItem('app_token', data.token);
        localStorage.setItem('app_user', JSON.stringify(data.user));
        
        setToken(data.token);
        setCurrentUser(data.user); 
        navigate('/dashboard');
      } else {
        alert("Authentication failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Sign-in pipeline exception thrown: ", err);
    }
  };
const handleSignup = async (userData) => {
  try {
   const response = await fetch(
  `${import.meta.env.VITE_API_URL}/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert("Registration Successful!");
      navigate("/signin");
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Server Error");
  }
};
  const handleSignOut = () => {
    setCurrentUser(null);
    setToken('');
    localStorage.removeItem('app_user');
    localStorage.removeItem('app_token');
    handleClearForm();
    navigate('/signin');
  };

  useEffect(() => {
    if (token) {
      fetchEventWorkspaceRecords();
    }
  }, [token]);

  const authenticatedFetch = async (url, options = {}) => {
    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
    };
    if (!(options.body instanceof FormData) && options.body) {
      headers['Content-Type'] = 'application/json';
    }
    return fetch(url, { ...options, headers });
  };

  const fetchEventWorkspaceRecords = async () => {
    try {
const response = await authenticatedFetch(
  `${import.meta.env.VITE_API_URL}/events`
);
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (err) {
      console.error("Error connecting to event matrix: ", err);
    }
  };

  const handleClearForm = () => {
    setFormData({ userName: '', eventId: '', roomNumber: '', ticketCount: 1, contact: '', paymentStatus: 'Not Paid' });
    setEditingId(null);
  };
  const handleCreateSubmit = async (data) => {

  try {
    const response = await authenticatedFetch(API_URL, {
      method: "POST",
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      handleClearForm();
      navigate("/dashboard");
    } else {
      alert(result.message);
    }
  } catch (err) {
    console.error(err);
  }
};
  const handleEditInitialize = (item) => {
    setEditingId(item._id);
    setFormData({
      _id: item._id,
      userName: item.userName,
      eventId: item.eventId?._id || item.eventId || '',
      roomNumber: item.roomNumber || '',
      ticketCount: item.ticketCount || 1,
      contact: item.contact,
      paymentStatus: item.paymentStatus
    });
    navigate('/edit');
  };

  const handleUpdateSubmit = async (e) => {
  if (e && e.preventDefault) e.preventDefault();

  try {
    const response = await authenticatedFetch(
      `${API_URL}/${editingId}`,
      {
        method: "PUT",
        body: JSON.stringify({
          userName: formData.userName,
          eventId: formData.eventId,
          roomNumber: formData.roomNumber,
          ticketCount: Number(formData.ticketCount),
          contact: formData.contact,
          paymentStatus: formData.paymentStatus,
        }),
      }
    );

    const result = await response.json();

    if (response.ok) {
      handleClearForm();
      navigate("/dashboard");
    } else {
      alert(result.message);
    }
  } catch(err){
   console.error(err);
}
};

  const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    if (!token) return <Navigate to="/signin" replace />;
    if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser?.role)) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  const isPublicPage =
  location.pathname === "/" ||
  location.pathname === "/signin" ||
  location.pathname === "/signup";

  const [theme, setTheme] = useState(() => {
  return localStorage.getItem("theme") ?? "light";
});

useEffect(() => {
  document.documentElement.setAttribute(
    "data-theme",
    theme
  );

  console.log("Theme changed:", theme);

  localStorage.setItem("theme", theme);
}, [theme]);

const toggleTheme = () => {
  setTheme(current =>
    current === "light"
      ? "dark"
      : "light"
  );
};

  return (
    <>
    {isPublicPage ? (
        <div className="auth-wrapper">
          
            <Routes>

  <Route
    path="/"
    element={
        <LandingPage
            theme={theme}
            toggleTheme={toggleTheme}
        />
    }
/>
  <Route
    path="/signin"
    element={
      !token
        ? <SignIn onLoginSuccess={handleSignIn} />
        : <Navigate to="/dashboard" replace />
    }
  />

  <Route
    path="/signup"
    element={
      !token
        ? <SignUp onSignup={handleSignup} />
        : <Navigate to="/dashboard" replace />
    }
  />

</Routes>
        </div>
      ) : (
        <div className="master-layout-frame">
          <div className="app-shell">

  {isSidebarOpen && isMobile && (
    <div
      className="sidebar-overlay"
      onClick={() => setIsSidebarOpen(false)}
    />
  )}

  {isSidebarOpen && (
   <Sidebar
    onSignOut={handleSignOut}
    currentUser={currentUser}
    isSidebarOpen={isSidebarOpen}
/>
  )}

  <div
    className="main-workspace">
      <Navbar
    currentUser={currentUser}
    isSidebarOpen={isSidebarOpen}
    setIsSidebarOpen={setIsSidebarOpen}
    onSignOut={handleSignOut}
    toggleTheme={toggleTheme}
    theme={theme}
/>
             <main className="page-content">
 <Routes>

  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />

<Route
  path="/events"
  element={
    <ProtectedRoute>
      <Events currentUser={currentUser} />
    </ProtectedRoute>
  }
/>
    <Route
    path="/registrations"
    element={
    <ProtectedRoute>
      <RegistrationList
        events={events}
        user={currentUser}
        onEdit={handleEditInitialize}
      />
    </ProtectedRoute>
  }
/>
    <Route
  path="/analytics"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <Analytics />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin-registrations"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminRegistrations />
    </ProtectedRoute>
  }
/>

  <Route
    path="/add-registration"
    element={
      <ProtectedRoute>
        <AddRegistration
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleCreateSubmit}
          onCancel={() => navigate("/dashboard")}
          events={events}
        />
      </ProtectedRoute>
    }
  />

  <Route
    path="/edit"
    element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <EditRegistration
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleUpdateSubmit}
          onCancel={() => navigate("/dashboard")}
          events={events}
        />
      </ProtectedRoute>
    }
  />

  <Route
    path="/add-event"
    element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <AddEvent />
      </ProtectedRoute>
    }
  />

    <Route
  path="/room-allocation"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <RoomAllocation />
    </ProtectedRoute>
  }
/>

  <Route
    path="/profile"
    element={
      <ProtectedRoute>
        <Profile currentUser={currentUser} />
      </ProtectedRoute>
    }
  />
 <Route
  path="/settings"
  element={
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  }
/>

  <Route path="/about" element={<About />} />

</Routes>



            </main>
          </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;