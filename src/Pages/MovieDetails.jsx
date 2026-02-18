import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);

      // Fetch selected movie
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&i=${id}`
      );
      const data = await res.json();
      setMovie(data);

      // ===== GENRE BASED RECOMMENDATION =====
      if (data?.Genre) {
        const primaryGenre = data.Genre.split(",")[0];

        const genreRes = await fetch(
          `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${primaryGenre}`
        );
        const genreData = await genreRes.json();

        if (genreData?.Search) {
          const filtered = genreData.Search.filter(
            (m) => m.imdbID !== id
          );
          setRecommended(filtered.slice(0, 8));
        }
      }

      setLoading(false);
      window.scrollTo(0, 0);
    };

    fetchMovie();
  }, [id]);

  if (loading || !movie) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative bg-[#0f0f0f] text-white overflow-x-hidden">

      {/* ===== SAFE BLUR BACKGROUND ===== */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center blur-3xl opacity-20"
          style={{
            backgroundImage: `url(${movie.Poster})`,
          }}
        />
      </div>

      <div className="relative z-10 px-6 md:px-12 py-10 pb-24">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-10 px-6 py-2 rounded-lg 
                     bg-white/10 backdrop-blur-md 
                     border border-white/10 
                     hover:bg-white/20 transition"
        >
          ← Back
        </button>

        {/* ===== MAIN SECTION ===== */}
        <div className="flex flex-col md:flex-row gap-12 items-start">

          {/* Poster */}
          <motion.img
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            src={movie.Poster}
            alt={movie.Title}
            className="w-[220px] h-[360px] md:w-[300px] object-cover rounded-2xl shadow-2xl"
          />

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {movie.Title}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300 mb-6">
              <p>
                <span className="text-white font-medium">Year:</span> {movie.Year}
              </p>
              <p>
                <span className="text-white font-medium">Genre:</span> {movie.Genre}
              </p>
              <p>
                <span className="text-white font-medium">Director:</span> {movie.Director}
              </p>
              <p>
                <span className="text-white font-medium">IMDB:</span> ⭐ {movie.imdbRating}
              </p>
            </div>

            <p className="text-gray-400 mb-6 leading-relaxed">
              <span className="text-white font-medium">Actors:</span> {movie.Actors}
            </p>

            <p className="text-gray-300 leading-relaxed mb-8">
              {movie.Plot}
            </p>

            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                movie.Title + " official trailer"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 rounded-xl 
                         bg-red-600 hover:bg-red-700 
                         transition font-semibold shadow-lg"
            >
              ▶ Watch Trailer
            </a>
          </motion.div>
        </div>

        {/* ===== RECOMMENDATION SECTION ===== */}
        {recommended.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-semibold mb-6">
              More Like This
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {recommended.map((rec) => (
                <Link
                  key={rec.imdbID}
                  to={`/movie/${rec.imdbID}`}
                  className="group"
                >
                  <div className="overflow-hidden rounded-xl shadow-lg">
                    <img
                      src={rec.Poster}
                      alt={rec.Title}
                      className="w-full h-[260px] object-cover 
                                 group-hover:scale-110 
                                 transition duration-300"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-300 group-hover:text-white">
                    {rec.Title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MovieDetails;