
import axios from "axios";
import type { Movie } from "../types/movie";

export interface GetMoviesResponse {
  results: Movie[],
  total_pages: number,
}

export default async function fetchMovies(query: string, page: number): Promise<GetMoviesResponse> {

    const response = await axios.get<GetMoviesResponse>(
      `https://api.themoviedb.org/3/search/movie`,
      {
        params: {
          query,
          page,
        },
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
      }
    );

    return response.data;

  }





