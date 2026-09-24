import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { logout } from "../redux/slices/authSlice";

import { toggleTheme } from "../redux/slices/themeSlice";

export default function Navbar() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // Get authentication data from Redux
  const { user, token } = useSelector((state) => state.auth);

  // Get theme from Redux
  const theme = useSelector((state) => state.theme.theme);

  // Logout
  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to Logout this account?",
    );

    if (!confirmLogout) {
      return;
    }

    dispatch(logout());

    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand fw-bold fs-4" to="/">
          🎓 Student Manager
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#studentNavbar"
          aria-controls="studentNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="studentNavbar">
          <div className="ms-auto d-flex flex-column flex-lg-row align-items-lg-center gap-2 gap-lg-3 mt-3 mt-lg-0">
            {/* Theme Button */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="btn btn-outline-light btn-sm px-3"
            >
              {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>

            {/* NOT LOGGED IN */}
            {!token && (
              <>
                <Link to="/login" className="btn btn-outline-light btn-sm px-3">
                  Login
                </Link>

                <Link to="/register" className="btn btn-success btn-sm px-3">
                  Register
                </Link>
              </>
            )}

            {/* LOGGED IN */}
            {token && (
              <>
                <span className="text-white fw-semibold">
                  Welcome, {user?.name || user?.username || "User"}
                </span>

                <Link
                  to="/dashboard"
                  className="btn btn-outline-light btn-sm px-3"
                >
                  👨‍🎓 Students
                </Link>

                <button
                  onClick={handleLogout}
                  className="btn btn-danger btn-sm px-3"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
