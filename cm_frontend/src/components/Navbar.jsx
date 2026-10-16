
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ onMenuClick }) {
  const [search, setSearch] = useState("");

  return (
    <header className="top-navbar">
      <div className="navbar-left">
        <button
          type="button"
          className="menu-toggle"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>

        <Link to="/" className="navbar-brand">
          Course<span>Flow</span>
        </Link>
      </div>

      <div className="navbar-search">
        <span aria-hidden="true">⌕</span>
        <input
          type="search"
          placeholder="Search courses or students..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search courses or students"
        />
      </div>

      <div className="navbar-right">
        <span className="navbar-role">Administrator</span>
        <div className="profile-avatar" title="Administrator">
          A
        </div>
      </div>
    </header>
  );
}
