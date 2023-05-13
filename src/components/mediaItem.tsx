// import { Center, Container } from "@mantine/core";
// import { useEffect, useState } from "react";

// import { Movie } from "@/pages/tv/popular";
// import { fetchMediaDetails } from "../../api/tmdb";
// import { useRouter } from "next/router";

// export const dynamic = "force-static";

// export default function MediaItem() {
//   const router = useRouter();
//   const { id } = router.query;

//   const [movie, setMovie] = useState<Movie[]>([]);

//   useEffect(() => {
//     fetchMediaDetails("movie", num)
//       .then((data) => {
//         setMovie(data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   return (
//     <Container>
//       <Center>
//         <h1>Movie Details</h1>
//       </Center>
//     </Container>
//   );
// }
