import { useRouter } from "next/router";

export default function Episode() {
  const router = useRouter();
  const { showId, seasonId, episodeId } = router.query;
  return (
    <h1>
      {showId} : Season {seasonId} : Episode {episodeId}
    </h1>
  );
}
