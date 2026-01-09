import React from "react";

const Dropdown = ({ label, options, selectedValue, changed }) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-semibold mb-1 text-white">{label}</label>
      <select
        value={selectedValue}
        onChange={(e) => changed(e.target.value)}
        className="bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="">Select {label}</option>
        {options.map((o) => (
          <option key={o.id || o.value} value={o.id || o.value}>
            {o.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
