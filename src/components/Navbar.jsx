import { Link, useNavigate, NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="nav-left">
        <span className="logo" onClick={() => navigate("/")}>
          🎵 Music App
        </span>

        <NavLink to="/trending" className="nav-link">
          Trending
        </NavLink>

        <NavLink to="/search" className="nav-link">
          Search
        </NavLink>

        {user && (
          <NavLink to="/songs" className="nav-link">
            Songs
          </NavLink>
        )}
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        {user ? (
          <>
            <NavLink to="/upload" className="nav-link">
              Upload
            </NavLink>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>

            <NavLink to="/register" className="nav-btn">
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
