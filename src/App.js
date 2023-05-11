import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovies from "./components/AddMovies";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  

  

  const fetchMoviesHandler = useCallback(async () => {
    setError(null);

    

    try {
      const response = await fetch(
        "https://react-http-e3022-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error(" Something went wrong!...Retrying ");
      }
      const data = await response.json();
      const loadedMovie = [];

      for (const key in data) {
        loadedMovie.push({
          id: key,
          title: data[key].title,
          releaseDate: data[key].releaseDate,
          openingText: data[key].openingText,
        });
      }
      setMovies(loadedMovie);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);


  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);



  async function addMovieHandler(NewMovie) {
    const response = await fetch(
      "https://react-http-e3022-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(NewMovie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );


    const data = await response.json();
    console.log(data);
  }

  async function deleteMovieHandler(id) {
    
    const response= await fetch(`https://react-http-e3022-default-rtdb.firebaseio.com/movies/${id}.json`,
    {
      method:'DELETE',
    });

    setMovies((prev)=>{
      const updatedMovies= prev.filter((NewMovie)=>NewMovie.id !==id)
      return updatedMovies
    })
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList ondelete={deleteMovieHandler} movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading....</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovies onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
