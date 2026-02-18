import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MovieCard = ({
  movie,
  favorites = [],
  addToFavorites,
  removeFromFavorites,
}) => {
  const navigate = useNavigate();
  const hoverTimeout = useRef(null);

  const [previewData, setPreviewData] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  if (!movie) return null;

  const isFavorite = favorites.some(
    (m) => m.imdbID === movie.imdbID
  );

  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&i=${movie.imdbID}`
        );
        const data = await res.json();

        if (data && data.Response !== "False") {
          setPreviewData(data);
          setShowPreview(true);
        }
      } catch (err) {
        console.error("Preview fetch error:", err);
      }
    }, 900);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout.current);
    setShowPreview(false);
  };

  const openTrailer = () => {
    window.open(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(
        movie.Title + " official trailer"
      )}`,
      "_blank"
    );
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* EXPAND CARD */}
      <motion.div
        whileHover={{ scale: 1.15 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="group cursor-pointer rounded-xl overflow-hidden 
                   bg-[#141414] shadow-md"
        onClick={() => navigate(`/movie/${movie.imdbID}`)}
      >
        <img
          src={
            movie.Poster && movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450"
          }
          alt={movie.Title}
          className="w-full h-[340px] object-cover"
        />

        <div className="absolute inset-0 
                        bg-gradient-to-t 
                        from-black/80 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white text-sm font-semibold truncate">
            {movie.Title}
          </h3>
          <p className="text-gray-400 text-xs mt-1">
            {movie.Year}
          </p>
        </div>

        {/* FAV
        <button
          onClick={(e) => {
            e.stopPropagation();
            isFavorite
              ? removeFromFavorites(movie.imdbID)
              : addToFavorites(movie);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full
            backdrop-blur-md transition-all duration-300
            opacity-0 group-hover:opacity-100
            ${
              isFavorite
                ? "bg-red-600 text-white"
                : "bg-black/40 text-white hover:bg-red-600"
            }`}

        >
          <Heart size={16} fill={isFavorite ? "white" : "none"} />
        </button> */}
      </motion.div>

      {/* NETFLIX STYLE PREVIEW PANEL */}
      <AnimatePresence>
        {showPreview && previewData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute z-50 top-0 left-0 w-[380px]
                       bg-[#181818] rounded-2xl shadow-2xl
                       border border-white/10 overflow-hidden"
          >
            {/* Poster Background */}
            <div className="relative">
              <img
                src={
                  previewData.Poster && previewData.Poster !== "N/A"
                    ? previewData.Poster
                    : "https://via.placeholder.com/600x300"
                }
                alt={previewData.Title}
                className="w-full h-[220px] object-cover"
              />

              {/* Play Button */}
              <button
                onClick={openTrailer}
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
      {previewData.Title}
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


              <p className="text-xs text-gray-400 mb-2">
                ⭐ {previewData.imdbRating} • {previewData.Genre}
              </p>

              <p className="text-sm text-gray-300 line-clamp-3">
                {previewData.Plot}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MovieCard;