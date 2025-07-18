const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Pretraži turske ili bosanske riječi..."
        className="search-input"
      />
      {searchTerm && (
        <button 
          type="button" 
          onClick={() => onSearchChange('')}
          className="clear-button"
        >
          Poništi
        </button>
      )}
    </div>
  );
};

export default SearchBar;