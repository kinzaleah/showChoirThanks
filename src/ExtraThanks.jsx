import React from "react";
import "./ExtraThanks.css";

function ExtraThanks({ onBack, onHome }) {
  return (
    <div className="extra-thanks-container">
      <img
        src={"/src/photos/29-4StarReviews.jpg"}
        alt="4 Star Review"
        className="extra-thanks-photo"
        style={{
          maxWidth: "350px",
          width: "100%",
          marginBottom: "2rem",
          borderRadius: "12px",
        }}
      />
      <h2>Extra Thanks To...</h2>

      <p>
        Everyone who took part in Edinburgh Fringe '25 and made it such a
        success!!
      </p>
      <p>
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
