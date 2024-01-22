import { DiaryEntry, NewDiaryEntry, Weather, Visibility } from './types';
import diaryService from './services/diaries';
import { useState, useEffect } from 'react';

const App: React.FC = () => {
	const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
	const [newDate, setNewDate] = useState<string>('');
	const [newWeather, setNewWeather] = useState<Weather>(Weather.Rainy);
	const [newVisibility, setNewVisibility] = useState<Visibility>(Visibility.Poor);
	const [newComment, setNewComment] = useState<string>('');
	const [errorMessage, setErrorMessage] = useState<string>('');

	useEffect(() => {
		const fetchDiaryEntries = async (): Promise<void> => {
			const entries = await diaryService.getAll();
			setDiaryEntries(entries);
		};

		fetchDiaryEntries();
	});

	const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
		e.preventDefault();

		const newEntry: NewDiaryEntry = {
			date: newDate,
			weather: newWeather,
			visibility: newVisibility,
			comment: newComment,
		};

		try {
			const result = await diaryService.create(newEntry);
			console.log(result);
			setNewComment('');
			setNewDate('');
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.log(error.message);
				setErrorMessage(error.message);
			}
		}
	};

	return (
		<div>
			{!errorMessage && <p> {errorMessage}</p>}
			<form onSubmit={handleSubmit}>
				<label>Date:</label>
				<input type='date' value={newDate} onChange={(e) => setNewDate(e.target.value)} required />
				<br />
				<label>Weather:</label>
				<div>
					{Object.values(Weather).map((weather) => (
						<label key={weather}>
							<input
								type='radio'
								value={weather}
								checked={newWeather === weather}
								onChange={(e) => setNewWeather(e.target.value as Weather)}
								required
							/>
							{weather}
						</label>
					))}
				</div>
				<br />
				<label>Visibility:</label>
				<div>
					{Object.values(Visibility).map((visibility) => (
						<label key={visibility}>
							<input
								type='radio'
								value={visibility}
								checked={newVisibility === visibility}
								onChange={(e) => setNewVisibility(e.target.value as Visibility)}
								required
							/>
							{visibility}
						</label>
					))}
				</div>
				<br />
				<label>Comment:</label>
				<input type='text' value={newComment} onChange={(e) => setNewComment(e.target.value)} />
				<br />
				<button type='submit'>Add</button>
			</form>
			<h1>Diary Entries</h1>
			{diaryEntries.map((entry) => (
				<div key={`${entry.date}${entry.weather} ${entry.id}`}>
					<h2>{entry.date}</h2>
					<p>Weather: {entry.weather}</p>
					<p>Visibility: {entry.visibility}</p>
					<p>Comment: {entry.comment}</p>

					<br />
				</div>
			))}
		</div>
	);
};

export default App;
