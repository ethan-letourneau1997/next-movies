import { useRouter } from "next/router";

export default function Season() {
  const router = useRouter();
  const { showId, seasonId } = router.query;
  return (
    <h1>
      {showId} : Season {seasonId}
    </h1>
  );
}
