import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import { useNavigate } from "react-router";
import { FiSearch } from "react-icons/fi";


const SearchBar = () => {
  const context = useContext(myContext);
  const { getAllProduct } = context
  // Search State 
  const [search, setSearch] = useState("");

  // Filter Search Data
  const filtered = getAllProduct.filter((obj) => obj.title.toLowerCase().includes(search)).slice(0, 8)

  const navigate = useNavigate();

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Input Field */}
      <div className="flex items-center bg-[#FFFFFF] border border-[#000000] rounded-full px-4 py-2 shadow-sm">
        <FiSearch className="text-[#8E8E93] mr-2" />
        <input
          type="text"
          placeholder="Search for product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow bg-transparent focus:outline-none text-sm text-[#8E8E93]"
        />
      </div>

      {/* Dropdown Results */}
      {search && (
        <div className="absolute z-50 mt-2 w-full bg-[#FFFFFF] border border-[#8E8E93] rounded-md shadow-md max-h-60 overflow-y-auto">
          {filtered.length > 0 ? (
            filtered.filter(item => !item.status).map((item, index) => (
              <div
                key={index}
                className="flex items-center px-4 py-2 hover:bg-[#8E8E93] cursor-pointer transition"
                onClick={() => navigate(`/productinfo/${item.id}`)}
              >
                <img src={item.images[0]} alt={item.title} className="w-8 h-8 rounded mr-3 object-cover" />
                <span className="text-sm text-[#8E8E93">{item.title}</span>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-sm text-[#8E8E93]">
              No results found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
