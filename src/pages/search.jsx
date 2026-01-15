import React, { useState, useRef, useEffect } from 'react';
import "./search.css";

const MusicSearch = () => {
  const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

  const GENIUS_HOST =
    import.meta.env.VITE_RAPIDAPI_HOST ||
    'genius-song-lyrics1.p.rapidapi.com';

  const [searchQuery, setSearchQuery] = useState('');
  const [tracks, setTracks] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [spotifyTrackId, setSpotifyTrackId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const previewRef = useRef(null);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Don't close if clicking on song cards or within preview
      const clickedSongCard = event.target.closest('.song-card');
      const clickedPreview = previewRef.current && previewRef.current.contains(event.target);
      
      if (!clickedSongCard && !clickedPreview && selectedTrack) {
        setSelectedTrack(null);
        setRecommendations([]);
        setSpotifyTrackId(null);
      }
    };

    if (selectedTrack) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedTrack]);

  // ---------------- GENIUS API ----------------
  const callGeniusAPI = async (endpoint, params = {}) => {
    // Check if API key exists
    if (!API_KEY) {
      throw new Error('API key not found. Please add VITE_RAPIDAPI_KEY to your .env file');
    }

    const queryString = new URLSearchParams(params).toString();
    const url = `https://${GENIUS_HOST}/${endpoint}?${queryString}`;

    console.log('API Key present:', !!API_KEY);
    console.log('Calling URL:', url);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-rapidapi-key': API_KEY,
          'x-rapidapi-host': GENIUS_HOST
        }
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        
        if (response.status === 403) {
          throw new Error('Access forbidden. Please check: 1) Your API key is correct, 2) You are subscribed to the Genius API on RapidAPI, 3) Your subscription is active');
        } else if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait a moment and try again.');
        } else {
          throw new Error(`API Error ${response.status}: ${errorText}`);
        }
      }

      return response.json();
    } catch (err) {
      if (err.message.includes('API Error') || err.message.includes('forbidden')) {
        throw err;
      }
      throw new Error(`Network error: ${err.message}`);
    }
  };

  // ---------------- SPOTIFY SEARCH ----------------
  const searchSpotifyTrack = async (song) => {
    setSpotifyTrackId(null);
    
    try {
      const query = `${song.title} ${song.artist}`;
      
      // Using Spotify Web API search
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=1`,
        {
          headers: {
            'Authorization': 'Bearer ' // This won't work without token
          }
        }
      );

      // Since we can't get Spotify token easily, let's create embed URL directly
      // Spotify allows embedding by track ID in the URL format
      const searchQuery = encodeURIComponent(`${song.title} ${song.artist}`);
      
      // We'll construct a Spotify search URL that can be embedded
      // Note: This is a workaround - ideally you'd use Spotify API
      
      // For now, let's just create the embed URL pattern
      // Users can search manually on Spotify if needed
      console.log('Search on Spotify:', searchQuery);
      
    } catch (err) {
      console.error('Spotify search error:', err);
    }
  };

  // ---------------- FORMAT SONG ----------------
  const formatSong = (song) => ({
    id: song.id,
    title: song.title,
    artist: song.primary_artist?.name || 'Unknown Artist',
    image:
      song.song_art_image_url ||
      song.header_image_thumbnail_url ||
      'https://via.placeholder.com/300?text=🎵',
    url: song.url
  });

  // ---------------- SEARCH ----------------
  const searchSongs = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError('');
    setTracks([]);

    try {
      const data = await callGeniusAPI('search/', { q: searchQuery });

      if (data.hits?.length) {
        setTracks(data.hits.map(hit => formatSong(hit.result)));
      } else {
        setError('No songs found.');
      }
    } catch (err) {
      setError(err.message);
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- RECOMMENDATIONS ----------------
  const fetchRecommendations = async (song, e) => {
    // Prevent any default behavior
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    setLoading(true);
    setError('');
    setSelectedTrack(song);
    setRecommendations([]);
    setSpotifyTrackId(null);

    // Try to get Spotify track ID from song URL or create search link
    searchSpotifyTrack(song);

    try {
      const data = await callGeniusAPI('song/recommendations/', {
        id: song.id
      });

      if (data.song_recommendations?.recommendations?.length) {
        setRecommendations(
          data.song_recommendations.recommendations.map(r =>
            formatSong(r.recommended_song)
          )
        );
      }
    } catch (err) {
      setError(err.message);
      console.error('Recommendations error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="music-search-page">
      <main className="ms-main">
        <form onSubmit={searchSongs} className="search-form">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search songs or artists..."
          />
          <button type="submit">Search</button>
        </form>

        {error && <div className="error-box">{error}</div>}

        {loading && (
          <div className="loading-text">
            🎶 Searching the music universe...
          </div>
        )}
      </main>

      {!loading && tracks.length > 0 && (
        <div className="ms-main">
          <h2 className="section-title">Search Results</h2>
          <div className="song-grid">
            {tracks.map(song => (
              <div
                key={song.id}
                className="song-card"
                onClick={(e) => fetchRecommendations(song, e)}
              >
                <img src={song.image} alt={song.title} />
                <div className="song-info">
                  <h3>{song.title}</h3>
                  <p>{song.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTrack && (
        <div className="ms-main" ref={previewRef}>
          <div className="preview-box">
            <button
              onClick={() => {
                setSelectedTrack(null);
                setRecommendations([]);
                setSpotifyTrackId(null);
              }}
              className="close-preview"
            >
              ✕
            </button>
            
            <div className="song-preview-details">
              <img src={selectedTrack.image} alt={selectedTrack.title} className="preview-image" />
              <div className="preview-info">
                <h2 className="preview-title">{selectedTrack.title}</h2>
                <p className="preview-artist">{selectedTrack.artist}</p>
                
                <div className="preview-actions">
                  <a 
                    href={selectedTrack.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="genius-link"
                  >
                    View Lyrics on Genius →
                  </a>
                  
                  <a 
                    href={`https://open.spotify.com/search/${encodeURIComponent(selectedTrack.title + ' ' + selectedTrack.artist)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="spotify-link"
                  >
                    🎵 Play on Spotify
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="ms-main">
          <div className="recommendations-section">
            <h2 className="section-title">Recommendations</h2>
            <div className="song-grid">
              {recommendations.map(song => (
                <div key={song.id} className="song-card">
                  <img src={song.image} alt={song.title} />
                  <div className="song-info">
                    <h3>{song.title}</h3>
                    <p>{song.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicSearch;