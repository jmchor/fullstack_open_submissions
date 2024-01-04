import { useEffect, useState } from 'react';
import axios from 'redaxios';

import './App.css';
import SearchBar from './components/SearchBar';

function App() {
	const [countries, setCoutries] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		axios
			.get('https://studies.cs.helsinki.fi/restcountries/api/all')
			.then((res) => setCoutries(res.data))
			.catch((error) => console.log(error));
	}, []);

	const handleSearch = (e) => {
		const value = e.target.value.toLowerCase();
		setSearchTerm(value);
	};

	const filteredCountries = countries.filter((country) => country.name.common.toLowerCase().includes(searchTerm));

	console.log(filteredCountries.length);

	return (
		<>
			<p>
				find countries <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
			</p>

			{/* if 1 < x <= 10 countries, show them here */}

			{filteredCountries.length === 1 ? (
				<>
					<h1>{filteredCountries[0].name.common}</h1>
					<p>capital {filteredCountries[0].capital[0]}</p>
					<p>area {filteredCountries[0].area}</p>

					<h3>languages:</h3>

					<ul>
						{Object.keys(filteredCountries[0].languages).map((languageKey) => (
							<li key={languageKey}>{filteredCountries[0].languages[languageKey]}</li>
						))}
					</ul>

					<img src={filteredCountries[0].flags.png} alt={filteredCountries[0].flags.alt} />
				</>
			) : (
				<>
					{filteredCountries.length <= 10 ? (
						filteredCountries.map((country) => <p key={country.name.common}>{country.name.common}</p>)
					) : (
						<p>Too many matches, specify another filter</p>
					)}
				</>
			)}
		</>
	);
}

export default App;
