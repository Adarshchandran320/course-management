
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((previous) => !previous);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="app-layout">
      <Navbar onMenuClick={toggleSidebar} />

      <div className="app-body">
        {sidebarOpen && (
          <button
            type="button"
            className="sidebar-backdrop"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          />
        )}

        <Sidebar
          isOpen={sidebarOpen}
          onNavigate={closeSidebar}
        />

        <main className="main-content">
          <div className="page-content">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
