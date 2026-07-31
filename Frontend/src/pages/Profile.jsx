import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Shield,
  ArrowLeft
} from "lucide-react";

import "../styles/Profile.css";

function Profile({ currentUser }) {

  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [profile, setProfile] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    role: currentUser?.role || "",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {

    try {

      const token = localStorage.getItem("app_token");

      const res = await fetch(
        "http://localhost:3000/api/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: profile.name,
            email: profile.email,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {

        localStorage.setItem(
          "app_user",
          JSON.stringify(data)
        );

        setEditing(false);

        setShowSuccessModal(true);

        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);

      } else {

        alert(data.message);

      }

    } catch (err) {

      console.log(err);

      alert("Profile update failed.");

    }

  };

  return (

    <div className="profile-container">

      <div className="profile-card">

        <button
          className="back-btn"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={18}/>
          Back to Dashboard
        </button>

        <div className="profile-header">

          <div className="profile-avatar">

    {profile.name.charAt(0).toUpperCase()}


          </div>

          <h2>Account Settings</h2>

          <p>
            Manage your personal information and account preferences.
          </p>

        </div>

        <div className="profile-form">

          <div className="form-group">

            <label>Full Name</label>

            <div className="input-box">

              <User size={18}/>

              <input
                type="text"
                name="name"
                value={profile.name}
                disabled={!editing}
                onChange={handleChange}
              />

            </div>

          </div>

          <div className="form-group">

            <label>Email Address</label>

            <div className="input-box">

              <Mail size={18}/>

              <input
                type="email"
                name="email"
                value={profile.email}
                disabled={!editing}
                onChange={handleChange}
              />

            </div>

          </div>

          <div className="form-group">

            <label>Account Role</label>

            <div className="role-badge">

              <Shield size={18}/>

              <span style={{textTransform:"capitalize"}}>
                {profile.role}
              </span>

            </div>

          </div>

          <div className="profile-actions">

            {!editing ? (

              <button
                className="btn-cta-main"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>

            ) : (

              <button
                className="btn-cta-main"
                onClick={handleSave}
              >
                Save Changes
              </button>

            )}

          </div>

        </div>

      </div>

      {showSuccessModal && (
  <div className="success-modal">

    <div className="success-card">

      <div className="success-icon">
        ✓
      </div>

      <h2>Profile Updated</h2>

      <p>
        Your changes have been saved successfully.
      </p>

      <div className="success-divider"></div>

      <span className="redirect-text">
        Returning to Dashboard...
      </span>

      <div className="loading-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>

    </div>

  </div>
)}

    </div>

  );

}

export default Profile;