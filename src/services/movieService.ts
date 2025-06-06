
import axios from "axios";
import type { Movie } from "../types/movie";

export interface GetMoviesResponse {
  results: Movie[];
}

export async function fetchMovies(query: string): Promise<Movie[]> {
  try {
    const response = await axios.get<GetMoviesResponse>(
      `https://api.themoviedb.org/3/search/movie`,
      {
        params: {
          query,
        },
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
      }
    );

    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
}
