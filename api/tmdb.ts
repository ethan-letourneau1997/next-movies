type MediaItem = {
  id: number;
  title: string;
  poster_path: string;
};

export async function fetchTrending(mediaType: string): Promise<MediaItem[]> {
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

export async function fetchPopular(mediaType: string): Promise<MediaItem[]> {
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

export interface MediaDetails {
  id: number;
  title?: string;
  name?: string;
  overview?: string;
  poster_path?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
}

export async function fetchMediaDetails(
  mediaType: string,
  mediaId: number
): Promise<MediaDetails> {
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
