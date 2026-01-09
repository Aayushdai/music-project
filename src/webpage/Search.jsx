import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropdown from '../function/Dropdown';
import Listbox from '../function/Listbox';
import Detail from '../function/Detail';
import { Credentials } from '../function/Credentials';



const Search = () => {
  const spotify = Credentials();  
  const [token, setToken] = useState('');
  const [genres, setGenres] = useState({ selectedGenre: '', listOfGenresFromAPI: [] });
  const [playlist, setPlaylist] = useState({ selectedPlaylist: '', listOfPlaylistFromAPI: [] });
  const [tracks, setTracks] = useState({ selectedTrack: '', listOfTracksFromAPI: [] });
  const [trackDetail, setTrackDetail] = useState(null);

  // Fetch token and genres on mount
  useEffect(() => {
    const fetchTokenAndGenres = async () => {
      try {
        const tokenResponse = await axios('https://accounts.spotify.com/api/token', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)
          },
          data: 'grant_type=client_credentials',
          method: 'POST'
        });

        setToken(tokenResponse.data.access_token);

        const genreResponse = await axios('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
          method: 'GET',
          headers: { 'Authorization': 'Bearer ' + tokenResponse.data.access_token }
        });

        setGenres({
          selectedGenre: '',
          listOfGenresFromAPI: genreResponse.data.categories.items
        });

      } catch (error) {
        console.error(error);
      }
    };

    fetchTokenAndGenres();
  }, [spotify.ClientId, spotify.ClientSecret]);

  // Genre selected
  const genreChanged = async (val) => {
    setGenres({ ...genres, selectedGenre: val });

    try {
      const playlistResponse = await axios(
        `https://api.spotify.com/v1/browse/categories/${val}/playlists?limit=10`,
        { headers: { 'Authorization': 'Bearer ' + token } }
      );

      setPlaylist({
        selectedPlaylist: '',
        listOfPlaylistFromAPI: playlistResponse.data.playlists.items
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Playlist selected
  const playlistChanged = (val) => {
    setPlaylist({ ...playlist, selectedPlaylist: val });
  };

  // Search tracks
  const buttonClicked = async (e) => {
    e.preventDefault();

    if (!playlist.selectedPlaylist) return;

    try {
      const tracksResponse = await axios(
        `https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist}/tracks?limit=10`,
        { headers: { 'Authorization': 'Bearer ' + token } }
      );

      setTracks({ selectedTrack: '', listOfTracksFromAPI: tracksResponse.data.items });
      setTrackDetail(null);
    } catch (error) {
      console.error(error);
    }
  };

  // Track clicked
  const listboxClicked = (val) => {
    const trackInfo = tracks.listOfTracksFromAPI.find(t => t.track.id === val);
    if (trackInfo) setTrackDetail(trackInfo.track);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
        Spotify Music Search
      </h1>

      <form onSubmit={buttonClicked} className="bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Dropdown
            label="Genre"
            options={genres.listOfGenresFromAPI}
            selectedValue={genres.selectedGenre}
            changed={genreChanged}
          />
          <Dropdown
            label="Playlist"
            options={playlist.listOfPlaylistFromAPI}
            selectedValue={playlist.selectedPlaylist}
            changed={playlistChanged}
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg px-6 py-3 transition"
          >
            Search Tracks
          </button>
        </div>

        <div className="md:flex md:space-x-6">
          <div className="md:w-1/2">
            <Listbox items={tracks.listOfTracksFromAPI} clicked={listboxClicked} />
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0">
            {trackDetail && <Detail {...trackDetail} />}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Search;
