import Feed from "./components/Feed.jsx";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to feed
      </a>
      <header className="site-header">
        <a className="brand" href="/" aria-label="Fieldnotes home">
          <span className="brand-mark">f.</span> fieldnotes
          <span className="brand-dot">®</span>
        </a>
        <span className="header-note">
          A little less noise. A little more outside.
        </span>
        <span className="edition">THE EVERYDAY EDIT</span>
      </header>
      <main id="main" className="layout">
        <Feed />
      </main>
    </>
  );
}
