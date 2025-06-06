import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";

export default function App() {
  const [moviesSet, setMoviesSet] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const handelSearch = async (newQuery: string): Promise<void> => {
    setMoviesSet([]);
    setSelectedMovie(null);
    setLoading(true);
    setError(false);
    try {
      const movies = await fetchMovies(newQuery);

      if (movies.length === 0) {
        toast.error("No movies found for your request.");
      }

      setMoviesSet(movies);
    } catch {
      setError(true);
      toast.error("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handelSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!loading && !error && moviesSet.length > 0 && (
        <MovieGrid movies={moviesSet} onSelect={handleSelectMovie} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
  );
}
