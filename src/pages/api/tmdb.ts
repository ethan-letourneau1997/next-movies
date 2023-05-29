import { MediaItemType, PersonDetails } from "../../../types";

const TMDB_API_KEY = "0fd7a8764e6522629a3b7e78c452c348";

// const temp =
//   "https://api.themoviedb.org/3/discover/movie?api_key=<<api_key>>&language=en-US&sort_by=popularity.desc";

// * Fetches trending media items from TMDB API
export async function fetchTrending(
  mediaType: string
): Promise<MediaItemType[]> {
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
): Promise<MediaItemType[]> {
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

// * Fetches person items from TMDB API
export async function fetchPersonDetails(
  mediaID: number
): Promise<PersonDetails> {
  const TMDB_API_KEY = "0fd7a8764e6522629a3b7e78c452c348";

  const response = await fetch(
    `https://api.themoviedb.org/3/person/${mediaID}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=combined_credits`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

// * Fetches media details from TMDB API
export async function fetchMediaDetails(
  mediaType: string,
  mediaId: number
): Promise<MediaItemType> {
  const TMDB_API_KEY = "0fd7a8764e6522629a3b7e78c452c348";
  const response = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${mediaId}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=credits,similar,seasons`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

// * Fetches specific media items from TMDB API
export const fetchSpecific = async (
  mediaType: string,
  page: number,

  params: string
) => {
  try {
    // const url = `https://api.themoviedb.org/3/${mediaType}/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`;
    const url = `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${TMDB_API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&region=US&sort_by=vote_average.desc${params}&with_original_language=en&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    return [];
  }
};
