import { useState } from "react";

function Search() {
  const [query, setQuery] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={query}
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value)}
        className="w-28 border rounded-full px-4 py-2 text-sm text-stone-400 transition-all duration-300 focus:outline-none focus:ring focus:ring-gray-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
      />
    </form>
  );
}

export default Search;
