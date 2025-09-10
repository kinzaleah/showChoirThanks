import React from "react";
import "./ExtraThanks.css";

function ExtraThanks({ onBack, onHome }) {
  return (
    <div className="extra-thanks-container">
      <img
        src={`${import.meta.env.BASE_URL}photos/29-4StarReviews.jpg`}
        alt="4 Star Review"
        className="extra-thanks-photo"
        
      />
      <h2>Extra Thanks To...</h2>

      <p className="extra-thanks-text">
        Everyone who took part in Edinburgh Fringe '25 and made it such a
        success!!
      </p>
      <p className="extra-thanks-text">
        And a very big thank you to those who took photos that I've used here
        <br />- especially
        <a
          href="https://www.instagram.com/craigrosiephotography?igsh=MXVpYmE4aWJyOXF3cA=="
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginLeft: "6px" }}
        >
          craigrosiephotograpy
        </a>
      </p>
      <button className="extra-thanks-back" onClick={onBack}>
        Comments
      </button>
      <button
        className="extra-thanks-home"
        onClick={onHome}
        style={{ marginTop: "1rem" }}
      >
        Home
      </button>
    </div>
  );
}

export default ExtraThanks;
