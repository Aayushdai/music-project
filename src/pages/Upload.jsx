import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/api";

export default function Upload() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, [navigate]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !artist || !file) {
      setMessage("Please fill all fields and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("audio", file);

    try {
      await API.post("/songs/upload", formData, { headers: { "Content-Type": "multipart/form-data" } });
      setMessage("Song uploaded successfully!");
      setTitle(""); setArtist(""); setFile(null);
    } catch (err) {
      setMessage(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="container">
      <h2>Upload Song</h2>
      <form onSubmit={handleUpload}>
        <input type="text" placeholder="Song Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" placeholder="Artist" value={artist} onChange={(e) => setArtist(e.target.value)} required />
        <input type="file" accept="audio/*" onChange={(e) => setFile(e.target.files[0])} required />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
