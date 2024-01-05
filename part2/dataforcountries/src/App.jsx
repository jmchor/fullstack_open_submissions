import { useEffect, useState } from 'react';
import axios from 'redaxios';

import './App.css';
import SearchBar from './components/SearchBar';
import SingleCountry from './components/SingleCountry';

const API_KEY = import.meta.env.VITE_OW_API;

function App() {
	const [countries, setCoutries] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [isCountryShown, setCountryShown] = useState([]);
	const [weather, setWeather] = useState({});

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

	const toggleCountryShowing = (country) => {
		const countryIndex = filteredCountries.findIndex((c) => c === country);
		const newIsCountryShown = [...isCountryShown];
		newIsCountryShown[countryIndex] = !newIsCountryShown[countryIndex];
		setCountryShown(newIsCountryShown);
	};

	useEffect(() => {
		const shownCountry = filteredCountries.find((country, index) => isCountryShown[index]);

		const targetPlace = shownCountry || (filteredCountries.length > 0 ? filteredCountries[0] : null);

		if (targetPlace) {
			axios
				.get(`https://api.openweathermap.org/data/2.5/weather?q=${targetPlace?.capital}&appid=${API_KEY}&units=metric`)
				.then((res) => {
					console.log(res.data.weather);
					setWeather({
						temperature: res.data.main.temp,
						icon: res.data.weather[0].icon,
						description: res.data.weather[0].description,
						wind: res.data.wind.speed,
					});
				})
				.catch((error) => {
					// Handle errors here
					console.error('Error fetching weather data:', error);
				});
		}
	}, [filteredCountries, isCountryShown]);

	return (
		<>
			<p>
				find countries <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
			</p>

			{/* if 1 < x <= 10 countries, show them here */}

			{filteredCountries.length === 1 ? (
				<SingleCountry country={filteredCountries[0]} weather={weather} />
			) : (
				<>
					{filteredCountries.length <= 10 ? (
						filteredCountries.map((country, index) => (
							<div key={country.name.common}>
								<p>
									{country.name.common}{' '}
									<button onClick={() => toggleCountryShowing(country)}>
										{isCountryShown[index] ? 'Hide' : 'Show'}
									</button>
								</p>
								{isCountryShown[index] && <SingleCountry country={country} weather={weather} />}
							</div>
						))
					) : (
						<p>Too many matches, specify another filter</p>
					)}
				</>
			)}
		</>
	);
}

export default App;
