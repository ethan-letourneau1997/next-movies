import { useEffect, useState } from "react";

import { MediaItemType } from "../../types";
import { fetchMedia } from "../pages/api/tmdb";

export default function MediaTop100(props: { mediaType: string }) {
  const [media, setMedia] = useState<MediaItemType[]>([]);

  useEffect(() => {
    const fetchAllMedia = async () => {
      const mediaData = [];

      // Fetch the first 5 pages of movies
      for (let page = 1; page <= 5; page++) {
        const mediaPerPage = await fetchMedia(props.mediaType, page);
        mediaData.push(...mediaPerPage);
      }

      setMedia(mediaData);
    };

    fetchAllMedia();
  }, [media, props.mediaType]);
  return (
    <div>
      <h1>Top 100 {props.mediaType == "movie" ? "Movies" : "Shows"}</h1>
      <div>
        {media.map((item) => (
          <div key={item.id}>
            <h2>
              {item.title}
              {item.name}
            </h2>
            <p>{item.overview}</p>
            <p>{item.vote_average}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
