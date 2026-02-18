import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const goHomeAndReset = () => {
    setQuery("");        // clear input
    onSearch("");        // reset searchTerm in App
    navigate("/");       // go to home
  };

  const goFavourites = () => {
    setQuery("");        // clear input
    onSearch("");        // reset searchTerm
    navigate("/favourites");
  };

  const handleSearch = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    onSearch(trimmed);
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 w-full z-[1000]
                h-[70px]
                bg-[#0f0f0f]/95 backdrop-blur-md
                border-b border-white/10
                px-8 flex items-center justify-between">


      {/* LEFT SIDE */}
      <div className="flex items-center gap-8 text-white text-lg">

        <NavLink
          to="/"
          onClick={goHomeAndReset}
          className={({ isActive }) =>
            `transition hover:text-red-500 ${
              isActive ? "text-red-500" : "text-white"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/favourites"
          onClick={goFavourites}
          className={({ isActive }) =>
            `transition hover:text-red-500 ${
              isActive ? "text-red-500" : "text-white"
            }`
          }
        >
          Favourites ❤️
        </NavLink>

      </div>

      {/* RIGHT SIDE SEARCH */}
      <div className="flex items-center gap-3 
                      bg-white/5 
                      border border-white/10 
                      rounded-xl px-4 py-2">

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          placeholder="Search movies..."
          className="bg-transparent outline-none 
                     text-sm text-gray-200 
                     placeholder-gray-500 w-56"
        />

        <button
          onClick={handleSearch}
          className="px-4 py-1.5 text-sm rounded-lg 
                     bg-red-600 hover:bg-red-700 
                     transition"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Navbar;
