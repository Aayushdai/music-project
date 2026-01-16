import React from "react";
import "./TopArtistsOfWeek.css";

const topArtists = [
  {
    id: 1,
    name: "Bad Bunny",
    image:
    "https://img.money.com/2022/12/bad-bunny.jpg?quality=85",
    spotify: "https://open.spotify.com/artist/4q3ewBCX7sLwd24euuV69X",
  },
  {
    id: 2,
    name: "Taylor Swift",
    image:
      "https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/815/cached.offlinehbpl.hbpl.co.uk/news/ORP/swift-20160725060641675.jpg",
    spotify: "https://open.spotify.com/artist/06HL4z0CvFAxyc27GXpf02",
  },
  {
    id: 3,
    name: "The Weeknd",
    image:
      "https://www.billboard.com/wp-content/uploads/2020/04/the-weeknd-press-photo-2020-billboard-jgk-1548-1586968737.jpg?w=942&h=628&crop=1",
    spotify: "https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ",
  },
  {
    id: 4,
    name: "Drake",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMW4iBTyOJxxNFho70j5zuzTHLrgI-VC87mw&s",
    spotify: "https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4",
  },
  {
    id: 5,
    name: "Billie Eilish",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Za1SnLnPDbSv6T9to5yP-bTbr65idnGiHw&s",
    spotify: "https://open.spotify.com/artist/6qqNVTkY8uBg9cP3Jd7DAH",
  },
  {
    id: 6,
    name: "Kendrick Lamar",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/kendrick-lamar-at-the-67th-grammy-awards-held-at-the-crypto-news-photo-1738959019.pjpeg?crop=1.00xw:0.667xh;0,0.0715xh&resize=640:*",
    spotify: "https://open.spotify.com/artist/2YZyLoL8N0Wb9xBt1NhZWg",
  },
  {
    id: 7,
    name: "Bruno Mars",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo-wG-BRtDiuI5FtnsjRbVYQbPJYA-nQUxgw&s",
    spotify: "https://open.spotify.com/artist/0du5cEVh5yTK9QJze8zA0C",
  },
  {
    id: 8,
    name: "Ariana Grande",
    image:
      "https://www.svtstatic.se/image-news/480/wide/0.5/0.5/e-13944504-1496402710000",
    spotify: "https://open.spotify.com/artist/66CXWjxzNUsdJxJ2JdwvnR",
  },
  {
    id: 9,
    name: "Arijit Singh",
    image:
      "https://static.india.com/wp-content/uploads/2015/01/arjit-singh.jpg",
    spotify: "https://open.spotify.com/artist/1S9CLp6oqS2kpcMfrqCmJM",
  },
  {
    id: 10,
    name: "Fuerza Regida",
    image:
      "https://mozoiloirratia.eus/wp-content/uploads/2025/03/Fuerza-Regida-cr-Courtesy-of-Street-Mob-Records-2025-billboard-1548.jpg",
    spotify: "https://open.spotify.com/artist/4YRxDV8wJFPHPTeXepOstw",
  },
];

const TopArtistsOfWeek = () => {
  return (
    <div className="top-artists-container">
      <h1>Top 10 Music Artists Right Now</h1>
      <p className="subtitle">Based on global streaming & popularity</p>

      <div className="artists-grid">
        {topArtists.map((artist, index) => (
          <div
            key={artist.id}
            className="artist-card"
            style={{ "--bg": `url(${artist.image})` }}
          >
            <div className="rank">#{index + 1}</div>

            <div className="artist-content">
              <h3>{artist.name}</h3>
              <a
                href={artist.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="spotify-btn"
              >
                Listen on Spotify
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopArtistsOfWeek;
