// import React, { useState } from "react";

// export const TmdbSearch = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [results, setResults] = useState([]);

//   const handleSearch = async (value) => {
//     setSearchTerm(value);
//     const TMDB_API_KEY = "0fd7a8764e6522629a3b7e78c452c348";
//     const response = await fetch(
//       `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${value}`
//     );
//     const data = await response.json();
//     setResults(data.results);
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={searchTerm}
//         onChange={(e) => handleSearch(e.target.value)}
//       />
//       <ul>
//         {results.map((result) => (
//           <li key={result.id}>{result.title || result.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TmdbSearch;
