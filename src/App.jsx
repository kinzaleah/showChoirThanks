
import { useState } from 'react';
import './App.css';

const TOTAL_COMMENTS = 100;
const COMMENTS_PER_PAGE = 8;
const PLACEHOLDER_PHOTO = 'https://picsum.photos/400/400?grayscale&random=1';

// Generate placeholder comments
const allComments = Array.from({ length: TOTAL_COMMENTS }, (_, i) => `This is comment #${i + 1}`);

function App() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(TOTAL_COMMENTS / COMMENTS_PER_PAGE);
  const startIdx = (page - 1) * COMMENTS_PER_PAGE;
  const comments = allComments.slice(startIdx, startIdx + COMMENTS_PER_PAGE);

  return (
    <div className="container">
      <div className="grid">
        <div className="photo">
          <img src={PLACEHOLDER_PHOTO} alt="Placeholder" />
        </div>
        <div className="comments">
          {comments.map((comment, idx) => (
            <div className="comment" key={idx}>{comment}</div>
          ))}
        </div>
      </div>
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>&lt; Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next &gt;</button>
      </div>
    </div>
  );
}

export default App;
