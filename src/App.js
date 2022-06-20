import React, { useState, useEffect } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
// c617c636

const App = () => {
  const API_URL = "http://www.omdbapi.com?apikey=c617c636";
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const searchMovies = async (title) => {
    let response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    console.log(data);
    setMovies(data.Search);
  };
  useEffect(() => {
    searchMovies("prem");
  }, []);
  
  return (
    <div className="app">
      <h1>MovieNameSearch</h1>
      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value);  searchMovies(e.target.value); }}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
