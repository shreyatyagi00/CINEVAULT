import MovieCard from "../Components/MovieCard";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Favourites = ({ favorites, removeFromFavorites }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-8 py-12">

      {/* HEADER SECTION */}
      <div className="flex items-center justify-between mb-10">
        

        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 rounded-lg 
                     bg-red-600 hover:bg-red-700 
                     transition font-medium"
        >
          ← Back to Movies
        </button>
      </div>

      {/* EMPTY STATE */}
      {favorites.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center 
                     mt-32 text-center"
        >
          <div className="text-6xl mb-4"></div>

          <h2 className="text-xl font-semibold mb-2">
            No favourite movies yet
          </h2>

          <p className="text-gray-400 mb-6">
            Start adding movies to your favourites list.
          </p>

          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 rounded-lg 
                       bg-red-600 hover:bg-red-700 
                       transition"
          >
            Browse Movies
          </button>
        </motion.div>
      ) : (
        <>
          {/* COUNT TEXT */}
          <p className="text-gray-400 mb-6">
            {favorites.length} movie
            {favorites.length > 1 && "s"} saved
          </p>

          {/* GRID */}
          <div className="grid gap-8
                          grid-cols-2 sm:grid-cols-3 
                          md:grid-cols-4 lg:grid-cols-5
                          overflow-visible">
            {favorites.map((movie, index) => (
              <motion.div
                key={movie.imdbID}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <MovieCard
                  movie={movie}
                  favorites={favorites}
                  removeFromFavorites={removeFromFavorites}
                />
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Favourites;