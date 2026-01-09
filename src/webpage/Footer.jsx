const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            TuneWave
          </h2>
          <p className="text-sm">
            Stream your favorite music anytime, anywhere. Discover new artists and playlists.
          </p>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Support
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">Account</li>
            <li className="hover:text-white cursor-pointer">Subscriptions</li>
            <li className="hover:text-white cursor-pointer">Contact Us</li>
          </ul>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Explore
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Genres</li>
            <li className="hover:text-white cursor-pointer">Playlists</li>
            <li className="hover:text-white cursor-pointer">Artists</li>
            <li className="hover:text-white cursor-pointer">New Releases</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white font-semibold mb-4">
            Connect With Us
          </h3>
          <div className="flex space-x-4">
            <span className="hover:text-white cursor-pointer">Facebook</span>
            <span className="hover:text-white cursor-pointer">Instagram</span>
            <span className="hover:text-white cursor-pointer">Twitter</span>
            <span className="hover:text-white cursor-pointer">YouTube</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} TuneWave. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
