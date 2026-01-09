import React from "react";

const Listbox = ({ items, clicked }) => {
  return (
    <div className="bg-gray-700 p-4 rounded-xl max-h-96 overflow-y-auto">
      {items.length === 0 && <p className="text-gray-400">No tracks found</p>}
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.track.id}
            onClick={() => clicked(item.track.id)}
            className="cursor-pointer hover:bg-gray-600 p-2 rounded transition"
          >
            {item.track.name} - {item.track.artists[0].name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Listbox;
