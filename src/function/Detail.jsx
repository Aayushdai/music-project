import React from "react";

const Detail = ({ name, album, artists, external_urls }) => {
  return (
    <div className="bg-gray-700 p-4 rounded-xl shadow-lg">
      <img
        src={album.images[0].url}
        alt={name}
        className="w-full rounded mb-4"
      />
      <h2 className="text-xl font-bold mb-2 text-white">{name}</h2>
      <p className="text-gray-300 mb-2">
        {artists.map((a) => a.name).join(", ")}
      </p>
      <a
        href={external_urls.spotify}
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-500 font-semibold hover:underline"
      >
        Open in Spotify
      </a>
    </div>
  );
};

export default Detail;
