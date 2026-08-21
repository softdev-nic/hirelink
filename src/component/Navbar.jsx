import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("loggenIn");
    navigate("/login", { replace: true });
  };

  return (
    <nav className="mb-8 flex items-center border-b border-slate-200 bg-white px-4 py-3 shadow-sm sm:px-8">
      <button
        type="button"
        onClick={handleLogout}
        className="rounded px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
      >
        Log out
      </button>

      <div className="ml-auto flex items-center gap-2">
        <NavLink
          to="/home"
          className="rounded px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
        >
          Home
        </NavLink>
        <NavLink
          to="/post-email"
          className="rounded bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Add email
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;