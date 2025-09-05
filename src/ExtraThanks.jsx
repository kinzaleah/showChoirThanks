import React from "react";
import "./ExtraThanks.css";

function ExtraThanks({ onBack, onHome }) {
  return (
    <div className="extra-thanks-container">
      <h1>Extra Thanks!</h1>
      <p>
        Everyone who took part in Edinburgh Fringe 25 and made it such a
        success!!
      </p>
      <p>Those who took photos that I've used here - especially</p>
      <p>
        <a
          href="https://www.instagram.com/craigrosiephotography?igsh=MXVpYmE4aWJyOXF3cA=="
          target="_blank"
          rel="noopener noreferrer"
        >
          craigrosiephotograpy
        </a>
      </p>
      <button className="extra-thanks-back" onClick={onBack}>
        Back to Comments
      </button>
      <button
        className="extra-thanks-home"
        onClick={onHome}
        style={{ marginTop: "1rem" }}
      >
        Back to Home
      </button>
    </div>
  );
}

export default ExtraThanks;
