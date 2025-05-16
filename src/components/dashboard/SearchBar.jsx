export default function SearchBar({ query, onSearch }) {
  return (
    <input
      type="text"
      className="dashboard-search"
      placeholder="جستجو کالا ..."
      value={query}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}
