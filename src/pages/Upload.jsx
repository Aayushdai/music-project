import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./Upload.css";

export default function Upload() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, [navigate]);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title || !artist || !file) {
      setMessage("⚠️ Please fill all fields and select an audio file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("audio", file);

    try {
      setLoading(true);
      setMessage("");

      await API.post("/songs/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ Song uploaded successfully!");
      setTitle("");
      setArtist("");
      setFile(null);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-page">
      <div className="upload-card">
        <h2> Upload New Song</h2>
        <p className="subtitle">Share your music with the world</p>

        <form onSubmit={handleUpload}>
          <div className="form-group">
            <label>Song Title</label>
            <input
              type="text"
              placeholder="Enter song title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Artist Name</label>
            <input
              type="text"
              placeholder="Enter artist name"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Audio File</label>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
            {file && <span className="file-name">🎧 {file.name}</span>}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload Song"}
          </button>
        </form>

        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
}
