import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const apiKey = process.env.TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  res.status(200).json(data);
};

export default handler;
