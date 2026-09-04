import { useState, useEffect } from "react";
import "./App.css";
import Landing from "./Landing";
import thanksData from "./thanksData";

// List of photo filenames in public/photos
const PHOTOS = [
  "resized-079.jpg",
  "resized-081.jpg",
  "resized-083.jpg",
  "resized-084.jpg",
  "resized-085.jpg",
  "resized-086.jpg",
  "resized-087.jpg",
  "resized-090.jpg",
  "resized-091.jpg",
  "resized-092.jpg",
  "resized-093.jpg",
  "resized-094.jpg",
  "resized-095.jpg",
  "resized-096.jpg",
  "resized-097.jpg",
  "resized-098.jpg",
  "resized-099.jpg",
  "resized-100.jpg",
  "resized-101.jpg",
  "resized-102.jpg",
  "resized-103.jpg",
  "resized-105.jpg",
  "resized-106.jpg",
  "resized-107.jpg",
  "resized-108.jpg",
  "resized-109.jpg",
  "resized-110.jpg",
  "resized-112.jpg",
  "resized-113.jpg",
  "resized-114.jpg",
  "resized-115.jpg",
  "resized-116.jpg",
  "resized-120.jpg",
  "resized-121.jpg",
  "resized-122.jpg",
  "resized-124.jpg",
  "resized-125.jpg",
  "resized-126.jpg",
  "resized-127.jpg",
];

// Use 2 comments per page to avoid overlap
const DEFAULT_COMMENTS_PER_PAGE = 2;

const COMMENT_COLORS = [
  "#FFB3BA", // light red
  "#FFDFBA", // light orange
  "#FFFFBA", // light yellow
  "#BAFFC9", // light green
  "#BAE1FF", // light blue
  "#E2BAFF", // light purple
  "#FFBAED", // light pink
  "#Baffff", // light cyan
];

function shuffleArray(array) {
  // Fisher-Yates shuffle
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [page, setPage] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);

  const [commentsPerPage, setCommentsPerPage] = useState(
    DEFAULT_COMMENTS_PER_PAGE
  );

  const [shuffledComments] = useState(() => {
    const dataSignature = JSON.stringify(thanksData);
    const saved = localStorage.getItem("shuffledComments");
    if (saved) {
      try {
        const savedData = JSON.parse(saved);
        if (
          savedData.dataSignature === dataSignature &&
          Array.isArray(savedData.comments)
        ) {
          return savedData.comments;
        }
      } catch {
        // Create a fresh shuffle if the saved value is corrupted.
      }
    }

    const shuffled = shuffleArray(thanksData);
    localStorage.setItem(
      "shuffledComments",
      JSON.stringify({ dataSignature, comments: shuffled })
    );
    return shuffled;
  });

  useEffect(() => {
    setCommentsPerPage(DEFAULT_COMMENTS_PER_PAGE);
  }, []);

  const totalPages = Math.ceil(
    (shuffledComments.length || thanksData.length) / commentsPerPage
  );
  const startIdx = (page - 1) * commentsPerPage;
  const comments = (
    shuffledComments.length ? shuffledComments : thanksData
  ).slice(startIdx, startIdx + commentsPerPage);
  // Shuffle colors for each page render
  const pageColors = shuffleArray(COMMENT_COLORS).slice(0, comments.length);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [commentsPerPage, totalPages, page]);

  // Scroll to top on page change for small screens
  useEffect(() => {
    if (window.innerWidth <= 700) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [page]);

  // Pick a photo for this page, cycling if more pages than photos
  const photoIdx = (page - 1) % PHOTOS.length;
  const photoSrc = `${import.meta.env.BASE_URL}photos/${PHOTOS[photoIdx]}`;

  // Reset the loaded flag whenever the photo changes so comments wait for it.
  useEffect(() => {
    setImageLoaded(false);
  }, [photoSrc]);

  // Preload the neighboring photos so Prev/Next feel instant once cached.
  useEffect(() => {
    const preload = (idx) => {
      const wrappedIdx = ((idx % PHOTOS.length) + PHOTOS.length) % PHOTOS.length;
      const preloadImg = new Image();
      preloadImg.src = `${import.meta.env.BASE_URL}photos/${PHOTOS[wrappedIdx]}`;
    };
    preload(photoIdx + 1);
    preload(photoIdx - 1);
  }, [photoIdx]);

  if (showLanding) {
    return (
      <Landing
        onEnter={() => {
          setShowLanding(false);
          setPage(1);
        }}
      />
    );
  }

  return (
    <div className="container">
      <div className="fringe-logo-container">
        <img
          src={`${import.meta.env.BASE_URL}photos/fringeLogo.jpg`}
          alt="Fringe Logo"
          style={{
            maxWidth: "180px",
            width: "100%",
            height: "auto",
            display: "block",
            margin: "0 auto",
          }}
        />
      </div>
      <div className="grid">
        <div className="photo">
          {!imageLoaded && <div className="photo-placeholder" aria-hidden="true" />}
          <img
            src={photoSrc}
            alt={`Show Choir ${photoIdx + 1}`}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            onLoad={() => setImageLoaded(true)}
            style={{ display: imageLoaded ? "block" : "none" }}
          />
        </div>
        <div className={`comments${imageLoaded ? " comments-visible" : ""}`}>
          {comments.map((entry, idx) => (
            <div
              className="comment"
              key={startIdx + idx}
              style={{
                background: pageColors[idx],
              }}
            >
              <strong>{entry.Name}:</strong> {entry.Comment}
            </div>
          ))}
        </div>
      </div>
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          <span className="arrow">&lt;</span>
          <span className="pagination-text"> Prev</span>
        </button>
        <span>
          Page
          <select
            value={page}
            onChange={(e) => setPage(Number(e.target.value))}
            style={{
              margin: "0 0.5rem",
              padding: "0.2rem 0.5rem",
              fontSize: "1rem",
            }}
          >
            {Array.from({ length: totalPages }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          of {totalPages}
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          <span className="pagination-text">Next </span>
          <span className="arrow">&gt;</span>
        </button>
      </div>
    </div>
  );
}

export default App;
