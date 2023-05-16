export const fetchSeasonDetails = async (
  showId: number,
  seasonNumber: number
) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${showId}/season/${seasonNumber}?api_key=0fd7a8764e6522629a3b7e78c452c348&language=en-US`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching season details: ", error);
    throw error;
  }
};

// api.js

export const fetchEpisodeDetails = async (
  showId: number,
  seasonNumber: number,
  episodeNumber: number
) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${showId}/season/${seasonNumber}/episode/${episodeNumber}?api_key=0fd7a8764e6522629a3b7e78c452c348&language=en-US`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching episode details: ", error);
    throw error;
  }
};
