function SearchBar({ search, setSearch }) {

  return (
    <input
      type="text"
      placeholder="Search Users..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="search"
    />
  );
}

export default SearchBar;