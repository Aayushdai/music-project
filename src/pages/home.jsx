import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [latestSongs, setLatestSongs] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await API.get("/songs?limit=3");
        setLatestSongs(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLatest();
  }, []);

  return (
    <div className="home">
      {/* HEADER */}
     

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Your Music, <span>Your Mood</span>
          </h1>
          <p>
            Stream, upload, and discover music — all in one place.
          </p>

          {user ? (
            <>
              <p className="welcome">
                Welcome back, <strong>{user.name}</strong> 👋
              </p>
              <div className="hero-buttons">
                <button className="primary" onClick={() => navigate("/songs")}>
                  Explore Songs
                </button>
                <button
                  className="secondary"
                  onClick={() => navigate("/upload")}
                >
                  Upload Music
                </button>
              </div>
            </>
          ) : (
            <div className="hero-buttons">
              <button
                className="primary"
                onClick={() => navigate("/login")}
              >
                Get Started
              </button>
              <button
                className="secondary"
                onClick={() => navigate("/register")}
              >
                Create Account
              </button>
            </div>
          )}
        </div>
      </section>

      {/* INTRO / ABOUT */}
      <section className="intro">
        <h2>Why Music App?</h2>
        <p>
          Music App is a simple yet powerful platform where you can listen to
          your favorite tracks, upload your own music, and explore new artists.
          Built for music lovers who want a clean, distraction-free experience.
        </p>

        <div className="intro-features">
          <div className="feature-card">
            🎧 <h4>Stream Music</h4>
            <p>Listen to the latest tracks anytime.</p>
          </div>
          <div className="feature-card">
            ⬆️ <h4>Upload Songs</h4>
            <p>Share your own music with others.</p>
          </div>
          <div className="feature-card">
            🔥 <h4>Discover</h4>
            <p>Find new artists and releases.</p>
          </div>
        </div>
      </section>

      {/* LATEST SONGS */}
      {latestSongs.length > 0 && (
        <section className="latest">
          <h2>🔥 Latest Releases</h2>
          <div className="song-grid">
            {latestSongs.map((song) => (
              <div key={song._id} className="song-card">
                <div className="song-info">
                  <h3>{song.title}</h3>
                  <p>{song.artist}</p>
                </div>

                <audio
                  controls
                  src={`http://localhost:5000/public/uploads/${song.audio}`}
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
