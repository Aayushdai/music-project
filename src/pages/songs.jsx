import { useEffect, useState } from "react";
import API from "../api/api";

export default function Songs() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState(""); // optional if you want to store search text

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await API.get("/songs");
        setSongs(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch songs");
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearch(query); // optional
    API.get(`/songs?search=${query}`)
      .then((res) => setSongs(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to search songs")
      );
  };

  if (loading) return <p>Loading songs...</p>;
  if (error) return <p className="error">{error}</p>;
  if (songs.length === 0) return <p>No songs uploaded yet.</p>;

  return (
    <div className="container">
      <h2>Songs</h2>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search song..."
        value={search}
        onChange={handleSearch}
        className="search-input"
        style={{ marginBottom: "20px", padding: "8px", width: "100%" }}
      />

      {songs.map((song) => (
        <div key={song._id} className="song-item">
          <p>
            {song.title} - {song.artist}
          </p>
          <audio
            controls
            src={`http://localhost:5000/public/uploads/${song.audio}`}
          />
        </div>
      ))}
    </div>
  );
}
  