import { NavLink } from "react-router-dom";
import {Compass ,
  LayoutDashboard,
  CalendarDays,
  ClipboardList,
  BarChart3,
  User,
  Info,
  Settings,
  LogOut
} from "lucide-react";
import logo from "../../assets/logos/logo.png";
import "../../styles/Sidebar.css";

function Sidebar({
  onSignOut,
  currentUser,
  isSidebarOpen
}) {
  return (
    <aside
className={`sidebar ${
isSidebarOpen ? "" : "closed"
}`}
>
  <div className="sidebar-brand">

  <img
    src={logo}
    alt="EventSphere"
    className="sidebar-logo-img"
  />

  <div className="sidebar-logo-text">

    <span className="logo-text">
      <span className="logo-event">Event</span>
      <span className="logo-sphere">Sphere</span>
    </span>

    <span className="logo-tagline">
      SMART EVENT PLATFORM
    </span>

  </div>

</div>
      <div className="sidebar-section">
        <p className="section-title">Workspace</p>


               <NavLink
  to="/dashboard"
  className={({ isActive }) =>
    isActive ? "sidebar-link active" : "sidebar-link"
  }
>
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>


        <NavLink
  to="/registrations"
  className={({ isActive }) =>
    isActive ? "sidebar-link active" : "sidebar-link"
  }
>
          <ClipboardList size={20} />
          Registrations
        </NavLink>

        <NavLink
  to="/events"
  className={({ isActive }) =>
    isActive ? "sidebar-link active" : "sidebar-link"
  }
>
          <CalendarDays size={20} />
          Events
        </NavLink>

  {currentUser?.role === "admin" && (
  <NavLink
    to="/analytics"
    className={({ isActive }) =>
      isActive ? "sidebar-link active" : "sidebar-link"
    }
  >
    <BarChart3 size={20} />
    Analytics
  </NavLink>
)}

        <NavLink
  to="/profile"
  className={({ isActive }) =>
    isActive ? "sidebar-link active" : "sidebar-link"
  }
>
          <User size={20} />
          Profile
        </NavLink>
      </div>

   <div className="sidebar-section">

  <p className="section-title">Information</p>

  <NavLink
    to="/about"
    className={({ isActive }) =>
      isActive ? "sidebar-link active" : "sidebar-link"
    }
  >
    <Info size={20} />
    About
  </NavLink>

  <NavLink
    to="/settings"
    className={({ isActive }) =>
      isActive ? "sidebar-link active" : "sidebar-link"
    }
  >
    <Settings size={20} />
    Settings
  </NavLink>

</div>
<div className="sidebar-footer">

  <div className="sidebar-user">
      <div className="avatar">
          {currentUser?.name?.charAt(0)}
      </div>

      <div>
          <h4>{currentUser?.name}</h4>
          <small>{currentUser?.role}</small>
      </div>
  </div>

  <button
      className="logout-btn"
      onClick={onSignOut}
  >
      <LogOut size={18}/>
      Logout
  </button>

</div>
 
    </aside>
  );
}

export default Sidebar;