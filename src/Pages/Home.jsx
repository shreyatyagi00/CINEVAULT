import { useEffect, useState, useRef } from "react";
import MovieCard from "../Components/MovieCard";
import SkeletonCard from "../Components/SkeletonCard";

const Home = ({
  searchTerm,
  favorites,
  addToFavorites,
  removeFromFavorites,
}) => {
  const [trending, setTrending] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [horror, setHorror] = useState([]);
  const [crime, setCrime] = useState([]);
  const [action, setAction] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const safeArray = (arr) => (Array.isArray(arr) ? arr : []);

  // ===== FETCH CATEGORY =====
  const fetchCategory = async (keyword, setter) => {
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${keyword}`
      );
      const data = await res.json();
      setter(safeArray(data.Search).slice(0, 12));
    } catch {
      setter([]);
    }
  };

  // ===== LOAD ALL CATEGORIES =====
  const loadCategories = async () => {
    setLoading(true);

    const trendingKeywords = [
      "batman",
      "inception",
      "joker",
      "interstellar",
      "marvel",
    ];

    const trendingMap = new Map();

    for (let keyword of trendingKeywords) {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${keyword}`
      );
      const data = await res.json();

      safeArray(data.Search)
        .slice(0, 2)
        .forEach((movie) => {
          trendingMap.set(movie.imdbID, movie);
        });
    }

    setTrending(Array.from(trendingMap.values()).slice(0, 12));

    await Promise.all([
      fetchCategory("comedy", setComedy),
      fetchCategory("horror", setHorror),
      fetchCategory("crime", setCrime),
      fetchCategory("action", setAction),
    ]);

    setLoading(false);
  };

  // ===== SEARCH =====
  const fetchSearch = async (term) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${term}`
      );
      const data = await res.json();
      setSearchResults(safeArray(data.Search));
    } catch {
      setSearchResults([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (searchTerm === "") {
      loadCategories();
    } else {
      fetchSearch(searchTerm);
    }
  }, [searchTerm]);

  // ===== ROW COMPONENT (useRef scroll version) =====
  const Row = ({ title, data }) => {
    const scrollRef = useRef(null);

    const scrollLeft = () => {
      scrollRef.current.scrollBy({
        left: -800,
        behavior: "smooth",
      });
    };

    const scrollRight = () => {
      scrollRef.current.scrollBy({
        left: 800,
        behavior: "smooth",
      });
    };

    return (
      <div className="mb-16 relative group">
        <h2 className="text-2xl font-semibold mb-6">{title}</h2>

        {/* LEFT ARROW */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-0 h-full w-16
                     bg-gradient-to-r from-black/60 to-transparent
                     flex items-center justify-center
                     opacity-0 group-hover:opacity-100
                     transition duration-300 z-20"
        >
          ❮
        </button>

        {/* MOVIE CONTAINER */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-scroll scroll-smooth scrollbar-hide"
        >
          {data.map((movie) => (
            <div
              key={movie.imdbID}
              className="w-[220px] flex-shrink-0"
            >
              <MovieCard
                movie={movie}
                favorites={favorites}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
              />
            </div>
          ))}
        </div>

        {/* RIGHT ARROW */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-0 h-full w-16
                     bg-gradient-to-l from-black/60 to-transparent
                     flex items-center justify-center
                     opacity-0 group-hover:opacity-100
                     transition duration-300 z-20"
        >
          ❯
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-8 py-12">

      {searchTerm !== "" ? (
        <>
          <h2 className="text-3xl font-semibold mb-8">
            Results for "{searchTerm}"
          </h2>

          {loading ? (
            <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {Array.from({ length: 10 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {searchResults.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  favorites={favorites}
                  addToFavorites={addToFavorites}
                  removeFromFavorites={removeFromFavorites}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          {loading ? (
            <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {Array.from({ length: 10 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <>
              <Row title="Trending" data={trending} />
              <Row title="Comedy" data={comedy} />
              <Row title="Horror" data={horror} />
              <Row title="Crime" data={crime} />
              <Row title="Action" data={action} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
