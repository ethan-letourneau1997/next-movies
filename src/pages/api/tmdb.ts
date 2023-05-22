import { LastEpisodeToAir, MediaItemType, PersonDetails } from "../../../types";

import { AutocompleteItem } from "@mantine/core";

// const temp =
//   "https://api.themoviedb.org/3/discover/movie?api_key=<<api_key>>&language=en-US&sort_by=popularity.desc";

const TMDB_API_KEY = "0fd7a8764e6522629a3b7e78c452c348";

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
  runtimeMax: string,
  keywords: string
): Promise<MediaItemType[]> {
  const TMDB_API_KEY = "0fd7a8764e6522629a3b7e78c452c348";

  //* extras based on filters

  console.log(keywords);

  let extras = "";

  if (sortBy === "vote_average") {
    extras = "&vote_count.gte=3000";
  }

  console.log(sortBy);

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${TMDB_API_KEY}${extras}&sort_by=${sortBy}.desc&with_genres=${genres}&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}&vote_average.gte=${bottomScore}&vote_average.lte=${topScore}&with_runtime.gte=${runtimeMin}&with_runtime.lte=${runtimeMax}&air_date.gte=${startDate}&air_date.lte=${endDate}&with_keywords=${keywords}&with_original_language=en&language=en-US`
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

// * Fetches 100 top rated media items from TMDB API

export const fetchTop100 = async (
  mediaType: string,
  page: number,
  minVotes: number
) => {
  try {
    // const url = `https://api.themoviedb.org/3/${mediaType}/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`;
    const url = `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${TMDB_API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&region=US&sort_by=vote_average.desc&vote_count.gte=${minVotes}&with_original_language=en&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    return [];
  }
};

// export const fetchReleaseDates = async (movieId: number) => {
//   const response = await fetch(
//     `https://api.themoviedb.org/3/movie/${movieId}/release_dates?api_key=${TMDB_API_KEY}`
//   );
//   const data = await response.json();

//   // Find the US certification (MPAA rating) for the movie
//   const usRelease = data.results.find((release) => release.iso_3166_1 === "US");
//   const certification = usRelease?.release_dates[0]?.certification;

//   return certification;
// };

export const fetchReleaseDates = async (mediaType: string, mediaId: number) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/${mediaType}/${mediaId}?api_key=${TMDB_API_KEY}&append_to_response=release_dates,content_ratings`
  );
  const data = await response.json();

  let runtimeOrEpisodeLength;

  if (mediaType === "movie") {
    const runtimeInMinutes = data.runtime;
    const hours = Math.floor(runtimeInMinutes / 60);
    const minutes = runtimeInMinutes % 60;
    runtimeOrEpisodeLength = `${hours}h ${minutes}m`;
  } else if (mediaType === "tv") {
    runtimeOrEpisodeLength = `${data.number_of_episodes}eps`;
  }

  // Find the US certification (MPAA rating) for the media
  let certification;
  if (mediaType === "movie") {
    const usRelease = data.release_dates.results.find(
      (release: any) => release.iso_3166_1 === "US"
    );
    certification = usRelease?.release_dates[0]?.certification;
  } else if (mediaType === "tv") {
    const usRelease = data.content_ratings.results.find(
      (release: any) => release.iso_3166_1 === "US"
    );
    certification = usRelease?.rating;
  } else {
    certification = "N/A";
  }

  // Find last episode air date
  let lastAirDate;
  if (mediaType === "tv" && data.last_episode_to_air) {
    lastAirDate = data.last_episode_to_air.air_date;
  } else {
    lastAirDate = "";
  }
  return { certification, runtimeOrEpisodeLength, lastAirDate };
};
