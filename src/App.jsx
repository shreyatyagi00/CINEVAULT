import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
  
import Home from "./Pages/Home";
import MovieDetails from "./Pages/MovieDetails";
import Favourites from "./Pages/Favourites";
import Navbar from "./Components/Navbar";

const App = () => {
  // SEARCH STATE (controlled by Navbar)
  
  const [searchTerm, setSearchTerm] = useState("");
 
  // FAVORITES STATE (persistent)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // ADD TO FAV
  const addToFavorites = (movie) => {
    if (!favorites.find((m) => m.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie]);
    }
  };

  // REMOVE FROM FAV
  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((m) => m.imdbID !== id));
  };

  // SAVE TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div className="bg-[#0f0f0f] text-white overflow-x-hidden pt-[60px]">

      
      {/* NAVBAR (controls search) */}
       

<Navbar onSearch={setSearchTerm} />


      <Routes>

        {/* HOME */}
       
<Route
  path="/"
  element={
    <Home
      searchTerm={searchTerm}
      favorites={favorites}
      addToFavorites={addToFavorites}
      removeFromFavorites={removeFromFavorites}
    />
  }
/>

        {/* MOVIE DETAILS */}
        <Route
  path="/movie/:id"
  element={
    <MovieDetails
      favorites={favorites}
      addToFavorites={addToFavorites}
      removeFromFavorites={removeFromFavorites}
    />
  }
/>
        {/* FAVOURITES */}
        <Route
          path="/favourites"
          element={
            <Favourites
              favorites={favorites}
              removeFromFavorites={removeFromFavorites}
            />
          }
        />

      </Routes>
    </div>
  );
};

export default App;