import { useState, useEffect } from "react";
import "./App.css";
import Landing from "./Landing";
import BackHomeIcon from "./BackHomeIcon";
import thanksData from "./thanksData";

// List of photo filenames in src/photos (relative to public or src for Vite)
const PHOTOS = [
  "2025-08-21 17_22_25 X-T30 II 16mm f4.0 1_125.jpg",
  "2025-08-23 10_45_00 X-T30 II 34mm f8.0 1_500.jpg",
  "2025-08-23 11_26_28 X-T30 II 80mm f6.4 1_125.jpg",
  "2025-08-23 11_28_33 X-T30 II 80mm f4.0 1_125.jpg",
  "2025-08-23 11_32_15 X-T30 II 80mm f4.0 1_125.jpg",
  "2025-08-23 11_49_36 X-T30 II 80mm f4.0 1_200.jpg",
  "2025-08-23 11_51_32 X-T30 II 48mm f5.6 1_140.jpg",
  "20250819_182439 Jacquie Kelly.jpg",
  "20250819_182540 Jacquie Kelly.jpg",
  "20250819_183422 Cassie Brooks.jpg",
  "63CE24AC-0CE3-4743-9C68-59362B7BF18D Cath Potter.jpeg",
  "7FB23B8A-AA0B-43DB-AC91-6E7C6E7517F8 Cath Potter.jpeg",
  "AD52871F-418F-45F9-AC50-AE61CCE41021 Cath Potter.jpeg",
  "FAC857BD-15DE-4E63-BF9C-C7605DBE0611 Cath Potter.jpeg",
  "IMG_0499 Fay Winfield.JPEG",
  "IMG_0739 Fay Winfield.JPEG",
  "IMG_0869 Fay Winfield.JPEG",
  "IMG_4332 Show Choir.jpeg",
  "IMG_7517 Jack Clifton.jpeg",
  "PXL_20250819_101136433 Claire.jpg",
  "PXL_20250819_163747842 Claire.jpg",
  "PXL_20250821_172900148 Kinza.jpg",
  "PXL_20250822_092522837 Kinza.jpg",
  "PXL_20250823_095037502 Kinza.jpg",
  "WhatsApp Image 2025-09-02 at 21.32.40_1273b700.jpg",
  "WhatsApp Image 2025-09-02 at 21.32.40_e23cde48.jpg",
  "_DSF8518.jpg",
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


  // Pick a photo for this page, cycling if more pages than photos
  const photoIdx = (page - 1) % PHOTOS.length;
  const photoSrc = `/src/photos/${PHOTOS[photoIdx]}`;

  return (
    <>
      <BackHomeIcon onClick={() => setShowLanding(true)} />
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
