import React, { useState } from 'react';

const ArtistSearch = () => {
  const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY || process.env.REACT_APP_RAPIDAPI_KEY;
  const API_HOST = import.meta.env.VITE_RAPIDAPI_HOST || process.env.REACT_APP_RAPIDAPI_HOST || 'genius-song-lyrics1.p.rapidapi.com';

  const [artistName, setArtistName] = useState('');
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [artistSongs, setArtistSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [loading, setLoading] = useState(false);
  const [songsLoading, setSongsLoading] = useState(false);
  const [error, setError] = useState('');

  const searchArtist = async (e) => {
    e.preventDefault();
    if (!artistName.trim()) return;

    setLoading(true);
    setError('');
    setArtists([]);
    setSelectedArtist(null);
    setArtistSongs([]);
    setSelectedSong(null);

    try {
      const response = await fetch(
        `https://${API_HOST}/search/?q=${encodeURIComponent(artistName)}&type=artist`,
        {
          headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST
          }
        }
      );

      const data = await response.json();
      const hits = data.hits || [];
      
      // Extract unique artists from search results
      const artistMap = new Map();
      hits.forEach(hit => {
        const artist = hit.result.primary_artist;
        if (artist && !artistMap.has(artist.id)) {
          artistMap.set(artist.id, artist);
        }
      });

      const uniqueArtists = Array.from(artistMap.values());
      
      if (uniqueArtists.length === 0) {
        setError(`No artists found for: ${artistName}`);
      } else {
        setArtists(uniqueArtists);
      }
    } catch (err) {
      console.error('Error searching artist:', err);
      setError('Failed to search artist. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectArtist = async (artist) => {
    setSelectedArtist(artist);
    setArtistSongs([]);
    setSelectedSong(null);
    setSongsLoading(true);

    try {
      const songsResponse = await fetch(
        `https://${API_HOST}/search/?q=${encodeURIComponent(artist.name)}&per_page=20`,
        {
          headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST
          }
        }
      );

      const data = await songsResponse.json();
      const hits = data.hits || [];
      
      // Filter songs where this artist is the primary artist
      const artistsSongs = hits
        .filter(hit => hit.result.primary_artist.id === artist.id)
        .map(hit => hit.result);

      setArtistSongs(artistsSongs);
    } catch (err) {
      console.error('Error fetching artist songs:', err);
    } finally {
      setSongsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <div className="bg-black bg-opacity-50 backdrop-blur-md border-b border-purple-500 border-opacity-30">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <span className="text-4xl">🎤</span>
            <h1 className="text-3xl font-bold text-white">Artist Search</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* API Warning */}
        {!API_KEY && (
          <div className="mb-6 bg-yellow-900 bg-opacity-50 border border-yellow-500 rounded-xl p-4">
            <p className="text-yellow-200 font-semibold">⚠️ Add VITE_RAPIDAPI_KEY to your .env file</p>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-8 bg-gray-800 bg-opacity-50 backdrop-blur-md p-6 rounded-xl">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchArtist(e)}
              placeholder="Search for an artist... (e.g., Drake, Taylor Swift)"
              className="flex-1 bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={searchArtist}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg px-8 py-3 transition disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search Artist'}
            </button>
          </div>
          {error && <p className="text-red-400 mt-4">{error}</p>}
        </div>

        {/* Artists Results */}
        {artists.length > 0 && !selectedArtist && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <span className="text-3xl mr-2">👥</span>
              Artists Found ({artists.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {artists.map((artist) => (
                <div
                  key={artist.id}
                  onClick={() => selectArtist(artist)}
                  className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-xl overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  <div className="relative pb-[100%] bg-gradient-to-br from-purple-600 to-pink-600">
                    <img
                      src={artist.image_url || artist.header_image_url}
                      alt={artist.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => e.target.src = 'https://via.placeholder.com/300/6366f1/ffffff?text=👤'}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold text-lg truncate">{artist.name}</h3>
                    {artist.is_verified && (
                      <span className="inline-block mt-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Artist Details & Songs */}
        {selectedArtist && (
          <div>
            {/* Back Button */}
            <button
              onClick={() => {
                setSelectedArtist(null);
                setArtistSongs([]);
                setSelectedSong(null);
              }}
              className="mb-6 text-purple-400 hover:text-purple-300 flex items-center gap-2 text-lg"
            >
              <span>←</span> Back to Artists
            </button>

            {/* Artist Profile */}
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-xl p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={selectedArtist.image_url || selectedArtist.header_image_url}
                  alt={selectedArtist.name}
                  className="w-full md:w-48 h-48 object-cover rounded-xl"
                  onError={(e) => e.target.src = 'https://via.placeholder.com/300/6366f1/ffffff?text=👤'}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-4xl font-bold text-white">{selectedArtist.name}</h2>
                    {selectedArtist.is_verified && (
                      <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded">✓ Verified</span>
                    )}
                  </div>
                  
                  {selectedArtist.alternate_names && selectedArtist.alternate_names.length > 0 && (
                    <p className="text-gray-400 mb-4">
                      Also known as: {selectedArtist.alternate_names.join(', ')}
                    </p>
                  )}

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {selectedArtist.followers_count && (
                      <div className="bg-gray-700 p-4 rounded-lg">
                        <p className="text-gray-400 text-sm">Followers</p>
                        <p className="text-white font-bold text-xl">
                          {selectedArtist.followers_count.toLocaleString()}
                        </p>
                      </div>
                    )}
                    {selectedArtist.iq && (
                      <div className="bg-gray-700 p-4 rounded-lg">
                        <p className="text-gray-400 text-sm">IQ Score</p>
                        <p className="text-white font-bold text-xl">
                          {selectedArtist.iq.toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>

                  {selectedArtist.url && (
                    <a
                      href={selectedArtist.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition"
                    >
                      View on Genius →
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Artist Songs */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="text-3xl mr-2">🎵</span>
                Top Songs {artistSongs.length > 0 && `(${artistSongs.length})`}
              </h2>

              {songsLoading ? (
                <div className="flex justify-center py-20">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
                </div>
              ) : artistSongs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {artistSongs.map((song) => (
                    <div
                      key={song.id}
                      onClick={() => setSelectedSong(song)}
                      className={`bg-gray-800 bg-opacity-50 rounded-lg p-4 cursor-pointer transition-all hover:bg-gray-700 ${
                        selectedSong?.id === song.id ? 'ring-2 ring-purple-500' : ''
                      }`}
                    >
                      <div className="flex gap-4">
                        <img
                          src={song.song_art_image_thumbnail_url || song.header_image_thumbnail_url}
                          alt={song.title}
                          className="w-16 h-16 rounded object-cover"
                          onError={(e) => e.target.src = 'https://via.placeholder.com/100/6366f1/ffffff?text=🎵'}
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-semibold truncate">{song.title}</h3>
                          <p className="text-gray-400 text-sm truncate">
                            {song.artist_names || selectedArtist.name}
                          </p>
                          {song.stats?.pageviews && (
                            <p className="text-gray-500 text-xs mt-1">
                              {song.stats.pageviews.toLocaleString()} views
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-gray-400">
                  <p>No songs found for this artist</p>
                </div>
              )}
            </div>

            {/* Selected Song Modal */}
            {selectedSong && (
              <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedSong(null)}>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl max-w-2xl w-full p-8 relative border border-purple-500 border-opacity-30" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setSelectedSong(null)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl"
                  >
                    ×
                  </button>
                  <div className="flex flex-col md:flex-row gap-6">
                    <img
                      src={selectedSong.song_art_image_url || selectedSong.header_image_url}
                      alt={selectedSong.title}
                      className="w-full md:w-48 h-48 object-cover rounded-xl"
                      onError={(e) => e.target.src = 'https://via.placeholder.com/300/6366f1/ffffff?text=🎵'}
                    />
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-white mb-2">{selectedSong.title}</h2>
                      <p className="text-xl text-purple-300 mb-4">{selectedSong.artist_names}</p>
                      
                      {selectedSong.release_date_for_display && (
                        <p className="text-gray-400 mb-4">
                          Released: {selectedSong.release_date_for_display}
                        </p>
                      )}

                      {selectedSong.stats && (
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          {selectedSong.stats.pageviews && (
                            <div className="bg-gray-700 p-3 rounded">
                              <p className="text-gray-400 text-sm">Views</p>
                              <p className="text-white font-bold">
                                {selectedSong.stats.pageviews.toLocaleString()}
                              </p>
                            </div>
                          )}
                          {selectedSong.annotation_count !== undefined && (
                            <div className="bg-gray-700 p-3 rounded">
                              <p className="text-gray-400 text-sm">Annotations</p>
                              <p className="text-white font-bold">{selectedSong.annotation_count}</p>
                            </div>
                          )}
                        </div>
                      )}

                      <a
                        href={selectedSong.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition"
                      >
                        View Lyrics on Genius →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {artists.length === 0 && !error && !loading && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-8xl mb-4">🎤</span>
            <h3 className="text-2xl font-semibold text-white mb-2">Search for Artists</h3>
            <p className="text-gray-400 max-w-md">
              Enter an artist name to see their profile, stats, and top songs.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtistSearch;