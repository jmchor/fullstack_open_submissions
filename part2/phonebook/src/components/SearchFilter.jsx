const SearchFilter = ({ filterValue, handleFilterChange }) => {
	return (
		<div>
			<p>filter shown with </p>
			<input type='text' value={filterValue} onChange={handleFilterChange} />
		</div>
	);
};

export default SearchFilter;
