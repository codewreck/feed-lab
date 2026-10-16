import { Link, Outlet } from "react-router";

export default function MainLayout() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to feed
      </a>
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Fieldnotes home">
          <span className="brand-mark">f.</span> fieldnotes
          <span className="brand-dot">®</span>
        </Link>
        <span className="header-note">
          A little less noise. A little more outside.
        </span>
        <span className="edition">THE EVERYDAY EDIT</span>
      </header>
      <main id="main" className="layout">
        <Outlet />
      </main>
    </>
  );
}
