import React from 'react';
import './TopArtistsOfWeek.css';

const topArtists = [
  {
    id: 1,
    name: 'Bad Bunny',
    image: 'https://i.scdn.co/image/ab6761610000e5eb3a66fb2ffb0ae472df39c61b',
    spotify: 'https://open.spotify.com/artist/4q3ewBCX7sLwd24euuV69X'
  },
  {
    id: 2,
    name: 'Taylor Swift',
    image: 'https://i.scdn.co/image/ab6761610000e5ebf235ca5320bc31749e365240',
    spotify: 'https://open.spotify.com/artist/06HL4z0CvFAxyc27GXpf02'
  },
  {
    id: 3,
    name: 'The Weeknd',
    image: 'https://i.scdn.co/image/ab6761610000e5ebb5f35edf6da1f00b0fd4fbc2',
    spotify: 'https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ'
  },
  {
    id: 4,
    name: 'Drake',
    image: 'https://i.scdn.co/image/ab6761610000e5eb6c97bde957c2d1948c629a84',
    spotify: 'https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4'
  },
  {
    id: 5,
    name: 'Billie Eilish',
    image: 'https://i.scdn.co/image/ab6761610000e5ebb3b13b7d71ead6c3b89719a3',
    spotify: 'https://open.spotify.com/artist/6qqNVTkY8uBg9cP3Jd7DAH'
  },
  {
    id: 6,
    name: 'Kendrick Lamar',
    image: 'https://i.scdn.co/image/ab6761610000e5eb289a7d6bb7bdf41f085d43ff',
    spotify: 'https://open.spotify.com/artist/2YZyLoL8N0Wb9xBt1NhZWg'
  },
  {
    id: 7,
    name: 'Bruno Mars',
    image: 'https://i.scdn.co/image/ab6761610000e5eb5d8693cc4477d6b2678a108d',
    spotify: 'https://open.spotify.com/artist/0du5cEVh5yTK9QJze8zA0C'
  },
  {
    id: 8,
    name: 'Ariana Grande',
    image: 'https://i.scdn.co/image/ab6761610000e5ebf44986a5bacd68c3b6149cec',
    spotify: 'https://open.spotify.com/artist/66CXWjxzNUsdJxJ2JdwvnR'
  },
  {
    id: 9,
    name: 'Arijit Singh',
    image: 'https://i.scdn.co/image/ab6761610000e5ebff81011ab8b6b90b0a2e2f20',
    spotify: 'https://open.spotify.com/artist/1S9CLp6oqS2kpcMfrqCmJM'
  },
  {
    id: 10,
    name: 'Fuerza Regida',
    image: 'https://i.scdn.co/image/ab6761610000e5ebfac4f2679780e874c4f6c5e1',
    spotify: 'https://open.spotify.com/artist/4YRxDV8wJFPHPTeXepOstw'
  }
];

const TopArtistsOfWeek = () => {
  return (
    <div className="top-artists-container">
      <h1>🔥 Top 10 Music Artists Right Now</h1>
      <p className="subtitle">Based on global streaming & popularity</p>
      <div className="artists-grid">
        {topArtists.map((artist, index) => (
          <div key={artist.id} className="artist-card">
            <div className="rank">#{index + 1}</div>
            <img
              src={artist.image}
              alt={`${artist.name}`}
              className="artist-image"
            />
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
        ))}
      </div>
    </div>
  );
};

export default TopArtistsOfWeek;