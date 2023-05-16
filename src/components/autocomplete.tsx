import React, { ChangeEvent, useState } from "react";

interface SearchResult {
  id: number;
  title: string;
  name: string;
}

const Autocomplete = () => {
  const [query, setQuery] = useState("");

  const [results, setResults] = useState<SearchResult[]>([]);

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=0fd7a8764e6522629a3b7e78c452c348&query=${value}`
      );
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
      />
      <ul>
        {results.map((item) => (
          <li key={item.id}>{item.title || item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
