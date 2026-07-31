import React from "react";

function Divider({ text = "OR" }) {
  return (
    <div className="auth-divider">
      <div className="divider-line"></div>

      <span className="divider-text">
        {text}
      </span>

      <div className="divider-line"></div>
    </div>
  );
}

export default Divider;