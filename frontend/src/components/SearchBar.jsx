function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search coffee..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-coffee-dark"
    />
  );
}

export default SearchBar;