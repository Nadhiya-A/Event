import React from "react";

function GoogleButton({
  text = "Continue with Google",
  onClick,
}) {
  return (
    <button
      type="button"
      className="google-button"
      onClick={onClick}
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="google-logo"
      />

      <span>{text}</span>
    </button>
  );
}

export default GoogleButton;