import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
    Bell,
    Menu,
    ChevronDown,
    Moon,
    Sun
} from "lucide-react";

import "../../styles/DashboardNavbar.css";

function DashboardNavbar({
    isSidebarOpen,
    setIsSidebarOpen,
    currentUser,
    onSignOut,
    toggleTheme,
    theme
}) {

    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {

        const closeMenu = () => setShowMenu(false);

        window.addEventListener("click", closeMenu);

        return () => window.removeEventListener("click", closeMenu);

    }, []);

    return (

<header className="dashboard-navbar-container">
            <div className="nav-left">

                <button
                    className="hamburger-btn"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    <Menu size={22}/>
                </button>

            </div>

            <div className="nav-right">

                {/* Theme */}
<button className="theme-toggle" onClick={toggleTheme}>
    {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
</button>
                {/* Notification */}

                <button className="notification-btn">

                    <Bell size={20}/>

                    <span className="notification-dot"></span>

                </button>

                {/* User */}

                <div
                    className="user-profile-widget"
                    onClick={(e)=>{

                        e.stopPropagation();

                        setShowMenu(!showMenu);

                    }}
                >

                    <div className="avatar-circle">

                        {currentUser?.name?.charAt(0)}

                    </div>

                    <span className="profile-name">

                        {currentUser?.name}

                    </span>

                    <ChevronDown size={18}/>

                    {showMenu && (

                        <div className="profile-dropdown">

                            <div
                                className="dropdown-item"
                                onClick={()=>{
                                    navigate("/profile");
                                    setShowMenu(false);
                                }}
                            >
                                👤 My Profile
                            </div>

                            <div
                                className="dropdown-item logout"
                                onClick={()=>{
                                    setShowMenu(false);
                                    onSignOut();
                                }}
                            >
                                🚪 Logout
                            </div>

                        </div>

                    )}

                </div>

            </div>

        </header>

    );

}

export default DashboardNavbar;