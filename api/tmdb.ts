import { MediaItemTypes } from "../types";

// const temp =
//   "https://api.themoviedb.org/3/discover/movie?api_key=<<api_key>>&language=en-US&sort_by=popularity.desc";

// * Fetches discover media items from TMDB API
export async function fetchDiscover(
  mediaType: string,
  sortBy: string,
  genres: string,
  startDate: string,
  endDate: string,
  bottomScore: string,
  topScore: string,
  runtimeMin: string,
  runtimeMax: string
): Promise<MediaItemTypes[]> {
  const TMDB_API_KEY = "0fd7a8764e6522629a3b7e78c452c348";

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${TMDB_API_KEY}&sort_by=${sortBy}.desc&with_genres=${genres}&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}&vote_average.gte=${bottomScore}&vote_average.lte=${topScore}&with_runtime.gte=${runtimeMin}&with_runtime.lte=${runtimeMax}&air_date.gte=${startDate}&air_date.lte=${endDate}&with_original_language=en&language=en-US`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  return data.results;
}

// * Fetches trending media items from TMDB API
export async function fetchTrending(
  mediaType: string
): Promise<MediaItemTypes[]> {
  const TMDB_API_KEY = "0fd7a8764e6522629a3b7e78c452c348";
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=${TMDB_API_KEY}&with_original_language=en`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  return data.results;
}

// * Fetches popular media items from TMDB API
export async function fetchPopular(
  mediaType: string
): Promise<MediaItemTypes[]> {
  const TMDB_API_KEY = "0fd7a8764e6522629a3b7e78c452c348";
  const response = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/popular?api_key=${TMDB_API_KEY}&page=1&with_original_language=en`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  return data.results;
}

// * Fetches media details from TMDB API
export async function fetchMediaDetails(
  mediaType: string,
  mediaId: number
): Promise<MediaItemTypes> {
  const TMDB_API_KEY = "0fd7a8764e6522629a3b7e78c452c348";
  const response = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${mediaId}?api_key=${TMDB_API_KEY}&language=en-US`
  );
  console.log(
    `https://api.themoviedb.org/3/${mediaType}/${mediaId}?api_key=${TMDB_API_KEY}&language=en-US`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  return {
    id: data.id,
    title: mediaType === "movie" ? data.title : data.name,
    overview: data.overview,
    poster_path: data.poster_path,
    release_date: mediaType === "movie" ? data.release_date : undefined,
    first_air_date: mediaType === "tv" ? data.first_air_date : undefined,
    vote_average: data.vote_average,
  };
}
