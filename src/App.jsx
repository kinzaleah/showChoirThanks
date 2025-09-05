import { useState, useEffect } from "react";
import "./App.css";
import Landing from "./Landing";
import thanksData from "./thanksData";
import ExtraThanks from "./ExtraThanks";

// List of photo filenames in src/photos (relative to public or src for Vite)
const PHOTOS = [
  "1-choir1aJazzHands.jpg",
  "2-choir1bJazzHands.jpg",
  "3-choir2aJazzHands.jpg",
  "4-choir2bJazzHands.jpg",
  "5-choir1Busk.JPEG",
  "6-choir2Westbury.jpg",
  "7-choir1Basses.jpeg",
  "8-choir2Sops.jpg",
  "9-choir1GroupSocial.jpg",
  "10-choir2BugsyHands.jpg",
  "11-choir1PerformanceWithDoug.jpeg",
  "12-choir2BassChaos.jpg",
  "13-choir1SopsOnTheStairs.JPEG",
  "14-choir2Doug.jpg",
  "15-choir1Bath.jpg",
  "16-choir2Basses.jpg",
  "17-choir1CliftonCastle.JPEG",
  "18-choir2Tenors.jpg",
  "19-choir1PerformanceWithJess.jpeg",
  "20-choir2Social.jpg",
  "21-choir1GroupSocial2.jpg",
  "22-choir2Sops2.jpg",
  "23-choir1GroupSocial3.jpg",
  "24-choir2ChloeOcho.jpg",
  "25-choir1Sops.jpeg",
  "28-choir2Group.jpg",
  "27-choir1ArthursSeat.jpeg",
  "26-choir2BugsyJess.jpg",
  "29-4StarReviews.jpg",
];

// Use 3 comments per page to avoid overlap
const DEFAULT_COMMENTS_PER_PAGE = 3;
const PLACEHOLDER_PHOTO = "https://picsum.photos/400/400?grayscale&random=1";

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
  const [showExtraThanks, setShowExtraThanks] = useState(false);
  const [page, setPage] = useState(1);
  const [commentsPerPage, setCommentsPerPage] = useState(
    DEFAULT_COMMENTS_PER_PAGE
  );
  const [shuffledComments, setShuffledComments] = useState([]);

  useEffect(() => {
    // Always use 3 comments per page for safety
    setCommentsPerPage(DEFAULT_COMMENTS_PER_PAGE);
    // Shuffle comments only once on mount
    setShuffledComments(shuffleArray(thanksData));
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

  if (showExtraThanks) {
    return (
      <ExtraThanks
        onBack={() => {
          setShowExtraThanks(false);
          setPage(1);
        }}
        onHome={() => {
          setShowExtraThanks(false);
          setShowLanding(true);
        }}
      />
    );
  }

  // Pick a photo for this page, cycling if more pages than photos
  const photoIdx = (page - 1) % PHOTOS.length;
  const photoSrc = `/src/photos/${PHOTOS[photoIdx]}`;

  return (
    <div className="container">
      <div className="grid">
        <div className="photo">
          <img src={photoSrc} alt={`Show Choir ${photoIdx + 1}`} />
        </div>
        <div className="comments">
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
      {page === totalPages && (
        <button
          className="extra-thanks-back"
          onClick={() => setShowExtraThanks(true)}
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
            marginBottom: "1rem",
          }}
        >
          Extra Thanks
        </button>
      )}
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt; Prev
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
          Next &gt;
        </button>
      </div>
    </div>
  );
}

export default App;
