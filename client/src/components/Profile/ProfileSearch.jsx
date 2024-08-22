import { useState } from "react";

function ProfileSearch() {
  const [query, setQuery] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <input
        value={query}
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value)}
        className="w-[90%] border rounded-full px-4 border-stone-400 py-2 text-sm text-stone-400 transition-all duration-300 focus:outline-none  sm:w-64 sm:focus:w-72"
      />
    </form>
  );
}

export default ProfileSearch;
