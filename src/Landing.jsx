import "./Landing.css";

const PLACEHOLDER_IMAGE = "https://picsum.photos/600/400?grayscale&random=2";

function Landing({ onEnter }) {
  return (
    <div className="landing-container">
      <img src={PLACEHOLDER_IMAGE} alt="Thank you" className="landing-image" />
      <h1 className="landing-title">Thank you Jess, Doug &amp; George!</h1>
      <button className="landing-enter" onClick={onEnter}>
        Click me!
      </button>
    </div>
  );
}

export default Landing;
