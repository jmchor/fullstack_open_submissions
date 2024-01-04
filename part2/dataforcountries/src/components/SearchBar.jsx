const SearchBar = ({ handleSearch, searchTerm }) => {
	return (
		<div>
			<input type='text' value={searchTerm} onChange={handleSearch} />
		</div>
	);
};

export default SearchBar;
