import React, { useState } from 'react';

const MusicSearch = () => {
  const API_KEY =
    import.meta.env.VITE_RAPIDAPI_KEY ||
    process.env.REACT_APP_RAPIDAPI_KEY;

  const GENIUS_HOST =
    import.meta.env.VITE_RAPIDAPI_HOST ||
    process.env.REACT_APP_RAPIDAPI_HOST ||
    'genius-song-lyrics1.p.rapidapi.com';

  const SPOTIFY_HOST = 'spotify23.p.rapidapi.com';

  const [searchQuery, setSearchQuery] = useState('');
  const [tracks, setTracks] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [spotifyEmbed, setSpotifyEmbed] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [error, setError] = useState('');

  // ---------------- GENIUS API ----------------
  const callGeniusAPI = async (endpoint, params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = `https://${GENIUS_HOST}/${endpoint}?${queryString}`;

    const response = await fetch(url, {
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': GENIUS_HOST
      }
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  };

  // ---------------- SPOTIFY API ----------------
  const fetchSpotifyPreview = async (song) => {
    setPreviewLoading(true);
    setSpotifyEmbed(null);

    try {
      const query = `${song.title} ${song.artist}`;

      const res = await fetch(
        `https://${SPOTIFY_HOST}/search/?q=${encodeURIComponent(
          query
        )}&type=tracks&limit=1`,
        {
          headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': SPOTIFY_HOST
          }
        }
      );

      const data = await res.json();
      const track = data.tracks?.items?.[0];

      if (track?.data?.uri) {
        const trackId = track.data.uri.split(':')[2];
        setSpotifyEmbed(
          `https://open.spotify.com/embed/track/${trackId}`
        );
      }
    } catch (err) {
      console.warn('Spotify preview not available');
    } finally {
      setPreviewLoading(false);
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
    setRecommendations([]);
    setSelectedTrack(null);
    setSpotifyEmbed(null);

    try {
      const data = await callGeniusAPI('search/', { q: searchQuery });

      if (data.hits?.length) {
        setTracks(data.hits.map(hit => formatSong(hit.result)));
      } else {
        setError('No songs found.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- RECOMMENDATIONS ----------------
  const fetchRecommendations = async (song) => {
    setLoading(true);
    setError('');
    setSelectedTrack(song);
    setRecommendations([]);
    setSpotifyEmbed(null);

    fetchSpotifyPreview(song);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      <header className="border-b border-purple-500/30 bg-black/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between">
          <h1 className="text-3xl font-bold">🎵 Music Discovery</h1>
          <span className="text-purple-300 text-sm">Genius + Spotify</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-10">
        <form onSubmit={searchSongs} className="mb-10">
          <div className="relative">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search songs or artists..."
              className="w-full p-4 rounded-xl bg-gray-800/50 border border-purple-500/30 focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bg-purple-600 px-6 py-2 rounded-lg"
            >
              Search
            </button>
          </div>
        </form>

        {error && (
          <div className="mb-6 bg-red-900/50 border border-red-500 p-4 rounded-lg">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center py-20 text-purple-300 text-xl">
            Loading...
          </div>
        )}

        {/* SEARCH RESULTS */}
        {!loading && tracks.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-4">Search Results</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {tracks.map(song => (
                <div
                  key={song.id}
                  onClick={() => fetchRecommendations(song)}
                  className="cursor-pointer bg-gray-800/50 rounded-xl hover:scale-105 transition"
                >
                  <img src={song.image} className="h-56 w-full object-cover rounded-t-xl" />
                  <div className="p-4">
                    <h3 className="font-semibold truncate">{song.title}</h3>
                    <p className="text-gray-400 text-sm truncate">{song.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* SPOTIFY PREVIEW */}
        {selectedTrack && (
          <div className="mt-10 bg-gray-800/60 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-4">
              ▶ Preview: {selectedTrack.title}
            </h3>

            {previewLoading && (
              <p className="text-yellow-300">Loading Spotify preview...</p>
            )}

            {spotifyEmbed ? (
              <iframe
                src={spotifyEmbed}
                width="100%"
                height="152"
                allow="autoplay; clipboard-write; encrypted-media"
                className="rounded"
              />
            ) : (
              !previewLoading && (
                <p className="text-gray-400">
                  Spotify preview not available for this song.
                </p>
              )
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default MusicSearch;