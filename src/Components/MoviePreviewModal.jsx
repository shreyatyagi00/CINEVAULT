import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const MoviePreviewModal = ({
  movie,
  favorites = [],
  addToFavorites,
  removeFromFavorites,
}) => {
  if (!movie) return null;

  const isFavorite = favorites.some(
    (m) => m.imdbID === movie.imdbID
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="absolute z-50 top-0 left-0 
                 w-[380px] bg-[#181818] 
                 rounded-2xl shadow-2xl 
                 border border-white/10 overflow-hidden"
    >
      {/* Poster */}
      <div className="relative">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full h-[220px] object-cover"
        />

        {/* Play Button */}
        <button
          onClick={() =>
            window.open(
              `https://www.youtube.com/results?search_query=${encodeURIComponent(
                movie.Title + " official trailer"
              )}`,
              "_blank"
            )
          }
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-16 h-16 rounded-full 
                          bg-white/20 backdrop-blur-md
                          flex items-center justify-center
                          hover:scale-110 transition">
            ▶
          </div>
        </button>
      </div>

      <div className="p-4">

        {/* TITLE + HEART */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">
            {movie.Title}
          </h3>

          <button
            onClick={(e) => {
              e.stopPropagation();
              isFavorite
                ? removeFromFavorites(movie.imdbID)
                : addToFavorites(movie);
            }}
            className={`p-2 rounded-full transition
              ${
                isFavorite
                  ? "bg-red-600 text-white"
                  : "bg-white/10 text-white hover:bg-red-600"
              }`}
          >
            <Heart
              size={18}
              fill={isFavorite ? "white" : "none"}
            />
          </button>
        </div>

        {/* Rating */}
        <p className="text-xs text-gray-400 mb-2">
          ⭐ {movie.imdbRating} • {movie.Genre}
        </p>

        {/* Plot */}
        <p className="text-sm text-gray-300 line-clamp-3">
          {movie.Plot}
        </p>
      </div>
    </motion.div>
  );
};

export default MoviePreviewModal;

