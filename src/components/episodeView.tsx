import React, { useEffect, useState } from "react";

import Link from "next/link";

const EpisodeView = ({ tvId, seasonNumber, episodeNumber, name }) => {
  const [episodeData, setEpisodeData] = useState(null);
  const [previousEpisode, setPreviousEpisode] = useState(null);
  const [nextEpisode, setNextEpisode] = useState(null);

  useEffect(() => {
    const fetchEpisodeData = async () => {
      try {
        const episodeResponse = await fetch(
          `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}?api_key=0fd7a8764e6522629a3b7e78c452c348`
        );
        const episodeData = await episodeResponse.json();
        setEpisodeData(episodeData);

        const prevEpisodeResponse = await fetch(
          `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}/episode/${
            episodeNumber - 1
          }?api_key=0fd7a8764e6522629a3b7e78c452c348`
        );
        if (prevEpisodeResponse.ok) {
          const prevEpisodeData = await prevEpisodeResponse.json();
          setPreviousEpisode(prevEpisodeData.episode_number);
        }

        const nextEpisodeResponse = await fetch(
          `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}/episode/${
            episodeNumber + 1
          }?api_key=0fd7a8764e6522629a3b7e78c452c348`
        );
        if (nextEpisodeResponse.ok) {
          const nextEpisodeData = await nextEpisodeResponse.json();
          setNextEpisode(nextEpisodeData.episode_number);
        }
      } catch (error) {
        console.error("Error fetching episode data:", error);
      }
    };

    fetchEpisodeData();
  }, [tvId, seasonNumber, episodeNumber]);

  return (
    <div>
      {episodeData ? (
        <div>
          <h2>{episodeData.name}</h2>
          <p>{episodeData.overview}</p>

          {previousEpisode && (
            <Link
              href={`/tv/${tvId}/season/${seasonNumber}/episode/${previousEpisode}`}
              href={{
                pathname: `/shows/${tvId}/${
                  typeof name === "string" ? encodeURIComponent(name) : ""
                }/season/${seasonNumber}/episode/${previousEpisode}`,
              }}
            >
              Previous Episode
            </Link>
          )}

          {nextEpisode && (
            <Link
              href={{
                pathname: `/shows/${tvId}/${
                  typeof name === "string" ? encodeURIComponent(name) : ""
                }/season/${seasonNumber}/episode/${nextEpisode}`,
              }}
            >
              Next Episode
            </Link>
          )}
        </div>
      ) : (
        <p>Loading episode data...</p>
      )}
    </div>
  );
};

export default EpisodeView;
