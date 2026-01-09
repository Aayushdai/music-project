import React from "react";

const Home = () => {
  return (
    <main className="bg-neutral-900 text-gray-200">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Feel the Music
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Stream your favorite songs, albums, and playlists anytime.
          </p>
          <button className="bg-black/80 text-white font-semibold px-6 py-3 rounded-full hover:bg-black transition">
            Start Listening
          </button>
        </div>
      </section>

      {/* GENRES */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-8 text-white">
          Browse by Genre
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {[
            "Pop",
            "Hip Hop",
            "Rock",
            "Electronic",
            "Jazz",
            "Classical",
            "Lo-Fi",
            "Indie",
          ].map((genre) => (
            <div
              key={genre}
              className="bg-neutral-800 p-6 rounded-xl hover:bg-neutral-700 transition cursor-pointer"
            >
              <h3 className="font-semibold text-lg">{genre}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* TRENDING TRACKS */}
      <section className="bg-neutral-800 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8 text-white">
            Trending Tracks
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((track) => (
              <div
                key={track}
                className="bg-neutral-900 rounded-xl p-4 hover:bg-neutral-700 transition cursor-pointer"
              >
                <div className="h-40 bg-neutral-700 rounded-lg mb-4 flex items-center justify-center">
                  🎵
                </div>
                <h3 className="font-semibold">Track Title</h3>
                <p className="text-sm text-gray-400">Artist Name</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED ARTISTS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-8 text-white">
          Featured Artists
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-center">
          {[1, 2, 3, 4, 5].map((artist) => (
            <div
              key={artist}
              className="bg-neutral-800 p-4 rounded-xl hover:bg-neutral-700 transition cursor-pointer"
            >
              <div className="h-24 w-24 mx-auto bg-neutral-700 rounded-full mb-3"></div>
              <h3 className="text-sm font-semibold">Artist Name</h3>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-14 text-center">
        <h2 className="text-2xl font-bold mb-4 text-white">
          Your soundtrack starts here
        </h2>
        <button className="bg-black text-white px-8 py-3 rounded-full hover:opacity-90 transition">
          Join Now
        </button>
      </section>

    </main>
  );
};

export default Home;
