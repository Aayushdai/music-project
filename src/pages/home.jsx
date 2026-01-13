import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

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
    <div className="container">
      <h1>Welcome to Music Player App 🎵</h1>
      {user ? <p>Hello, <strong>{user.name}</strong>!</p> : <p>Please login or register to start listening!</p>}

      <div className="home-buttons">
        {user ? (
          <>
            <button onClick={() => navigate("/songs")}>View Songs</button>
            <button onClick={() => navigate("/upload")}>Upload Song</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
          </>
        )}
      </div>

      {latestSongs.length > 0 && (
        <>
          <h2>Latest Songs</h2>
          {latestSongs.map((song) => (
            <div key={song._id} className="song-item">
              <p>{song.title} - {song.artist}</p>
              <audio controls src={`http://localhost:5000/public/uploads/${song.audio}`} />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
