import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/"); // redirect to login
  };

  return (
    <nav style={{ display: "flex", gap: "20px", padding: "10px", background: "#222", color: "white" }}>
      <div style={{ fontWeight: "bold" }}>Music App</div>

      {user ? (
        <>
          <Link to="/songs" style={{ color: "white" }}>Songs</Link>
          <Link to="/upload" style={{ color: "white" }}>Upload</Link>
          <span style={{ marginLeft: "auto", cursor: "pointer" }} onClick={handleLogout}>
            Logout
          </span>
        </>
      ) : (
        <>
          <Link to="/login" style={{ color: "white" }}>Login</Link>
          <Link to="/register" style={{ color: "white" }}>Register</Link>
        </>
        
      )}
    </nav>
  );
}
