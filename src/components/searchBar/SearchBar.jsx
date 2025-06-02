import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const searchData = [
  {
    name: 'Bolu',
    image: 'https://res.cloudinary.com/dvu5pzwte/image/upload/v1748345669/WhatsApp_Image_2025-05-27_at_18.32.38_ca3be61a_shjkgm.jpg',
  },
  {
    name: 'Chiffon',
    image: 'https://res.cloudinary.com/dvu5pzwte/image/upload/v1748345669/WhatsApp_Image_2025-05-27_at_18.32.38_f1eac40a_rkp5pu.jpg',
  },
  {
    name: 'Mandarin',
    image: 'https://res.cloudinary.com/dvu5pzwte/image/upload/v1748345669/WhatsApp_Image_2025-05-27_at_18.32.38_a70c1f09_snkii9.jpg ',
  },
];


const SearchBar = () => {
  const [search, setSearch] = useState("");

  const filtered = searchData
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 6);

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Input Field */}
      <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm">
        <FiSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search for product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow bg-transparent focus:outline-none text-sm text-gray-700"
        />
      </div>

      {/* Dropdown Results */}
      {search && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-md max-h-60 overflow-y-auto">
          {filtered.length > 0 ? (
            filtered.map((item, index) => (
              <div
                key={index}
                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer transition"
              >
                <img src={item.image} alt={item.name} className="w-8 h-8 rounded mr-3 object-cover" />
                <span className="text-sm text-gray-800">{item.name}</span>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-sm text-gray-500">
              No results found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
