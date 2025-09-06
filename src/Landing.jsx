import "./Landing.css";

const PLACEHOLDER_IMAGE = "/src/landingPagePhotos/dougBoots.jpg";

function Landing({ onEnter }) {
  return (
    <div className="landing-container">
         <div style={{ background: '#222', borderRadius: '16px', padding: '4px 16px', display: 'inline-block', marginBottom: '1.2rem' }}>
           <img src="src/photos/ShowChoirLogo.png" alt="Show Choir Logo" style={{ maxWidth: '180px', width: '100%', display: 'block' }} />
         </div>
      <img src={PLACEHOLDER_IMAGE} alt="Thank you" className="landing-image" />
      <h1 className="landing-title">Thank you Jess, Doug &amp; George!</h1>
      <button className="landing-enter" onClick={onEnter}>
        Click me!
      </button>
    </div>
  );
}

export default Landing;
