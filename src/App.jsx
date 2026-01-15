import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Upload from "./pages/Upload";
import Songs from "./pages/Songs";

import "./index.css";
import MusicSearch from "./pages/search";
import TopArtistsOfWeek from "./pages/topArtist";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/songs" element={<Songs />} />
          <Route path="/search" element={<MusicSearch />} />
          <Route path="/trending" element={<TopArtistsOfWeek />} />
          <Route path="/search" element={<MusicSearch />} />

          <Route path="*" element={<h2>404: Page Not Found</h2>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
