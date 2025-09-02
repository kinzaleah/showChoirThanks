import React from "react";
import "./BackHomeIcon.css";

const ICON_URL =
  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f3e0.png"; // house emoji

function BackHomeIcon({ onClick }) {
  return (
    <img
      src={ICON_URL}
      alt="Back to Home"
      className="back-home-icon"
      onClick={onClick}
      title="Back to Home"
      style={{ cursor: "pointer" }}
    />
  );
}

export default BackHomeIcon;
