const SingleCountry = ({ country, weather }) => {
	return (
		<>
			<h1>{country.name.common}</h1>
			<p>capital {country.capital[0]}</p>
			<p>area {country.area}</p>

			<h3>languages:</h3>

			<ul>
				{Object.keys(country.languages).map((languageKey) => (
					<li key={languageKey}>{country.languages[languageKey]}</li>
				))}
			</ul>

			<img src={country.flags.png} alt={country.flags.alt} />

			{weather && (
				<>
					<h2>Weather in {country.capital}</h2>
					<p>temperature {weather.temperature} Celcius </p>

					<img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={weather.description} />

					<p>wind {weather.wind} m/s</p>
				</>
			)}
		</>
	);
};

export default SingleCountry;
