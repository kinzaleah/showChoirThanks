import { useState } from "react";
import "./App.css";
import Landing from "./Landing";
import BackHomeIcon from "./BackHomeIcon";

const TOTAL_COMMENTS = 100;
const COMMENTS_PER_PAGE = 8;
const PLACEHOLDER_PHOTO = "https://picsum.photos/400/400?grayscale&random=1";

// Generate placeholder comments
const allComments = Array.from(
  { length: TOTAL_COMMENTS },
  (_, i) => `This is comment #${i + 1}`
);

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

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(TOTAL_COMMENTS / COMMENTS_PER_PAGE);
  const startIdx = (page - 1) * COMMENTS_PER_PAGE;
  const comments = allComments.slice(startIdx, startIdx + COMMENTS_PER_PAGE);

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
            {comments.map((comment, idx) => (
              <div
                className="comment"
                key={idx}
                style={{
                  background: COMMENT_COLORS[idx % COMMENT_COLORS.length],
                }}
              >
                {comment}
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
