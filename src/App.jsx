import { useState, useEffect } from "react";
import "./App.css";
import Landing from "./Landing";
import BackHomeIcon from "./BackHomeIcon";
import thanksData from "./thanksData";

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
  const [page, setPage] = useState(1);
  const [commentsPerPage, setCommentsPerPage] = useState(DEFAULT_COMMENTS_PER_PAGE);
  const [shuffledComments, setShuffledComments] = useState([]);

  useEffect(() => {
    // Always use 3 comments per page for safety
    setCommentsPerPage(DEFAULT_COMMENTS_PER_PAGE);
    // Shuffle comments only once on mount
    setShuffledComments(shuffleArray(thanksData));
    // eslint-disable-next-line
  }, []);

  const totalPages = Math.ceil((shuffledComments.length || thanksData.length) / commentsPerPage);
  const startIdx = (page - 1) * commentsPerPage;
  const comments = (shuffledComments.length ? shuffledComments : thanksData).slice(startIdx, startIdx + commentsPerPage);
  // Shuffle colors for each page render
  const pageColors = shuffleArray(COMMENT_COLORS).slice(0, comments.length);

  useEffect(() => {
    if (page > totalPages) setPage(1);
    // eslint-disable-next-line
  }, [commentsPerPage, totalPages]);

  if (showLanding) {
    return <Landing onEnter={() => setShowLanding(false)} />;
  }

  return (
    <>
      <BackHomeIcon onClick={() => setShowLanding(true)} />
      <div className="container">
        <div className="grid">
          <div className="photo">
            <img src={PLACEHOLDER_PHOTO} alt="Placeholder" />
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
        <div className="pagination">
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            &lt; Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next &gt;
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
