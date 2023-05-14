import { SpotlightAction } from "@mantine/spotlight";

interface Movie {
  title: string;
  id: number;
}

export async function getActions(
  searchTerm: string
): Promise<SpotlightAction[]> {
  const apiKey = "0fd7a8764e6522629a3b7e78c452c348";
  const apiUrl = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${searchTerm}`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  const results = data.results.filter(
    (result: any) => result.media_type === "movie"
  );

  const actions = results.map((movie: any) => ({
    title: movie.title,
    onTrigger: () => console.log(movie.title),
  }));

  return actions;
}
