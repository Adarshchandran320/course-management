
import { NavLink } from "react-router-dom";

const navigation = [
  { label: "Dashboard", path: "/", icon: "▦" },
  { label: "Courses", path: "/courses", icon: "▤" },
  { label: "Students", path: "/students", icon: "♙" },
  { label: "Enrollments", path: "/enrollments", icon: "✓" },
];

export default function Sidebar({ isOpen = true, onNavigate }) {
  return (
    <aside className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <div className="sidebar-heading">WORKSPACE</div>

      <nav className="sidebar-navigation" aria-label="Main navigation">
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            onClick={onNavigate}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span className="sidebar-icon" aria-hidden="true">
              {item.icon}
            </span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer-icon">CF</div>
        <div>
          <strong>CourseFlow</strong>
          <p>Management Portal</p>
        </div>
      </div>
    </aside>
  );
}
