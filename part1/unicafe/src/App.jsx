import { useState } from 'react';

const Statistics = ({ good, neutral, bad, all }) => {
	const average = (good - bad) / all;
	const positive = (good / all) * 100;

	return (
		<div>
			<StatisticLine text='good' value={good} />
			<StatisticLine text='neutral' value={neutral} />
			<StatisticLine text='bad' value={bad} />
			<StatisticLine text='all' value={all} />
			<StatisticLine text='average' value={average} />
			<StatisticLine text='positive' value={positive} />
		</div>
	);
};

const StatisticLine = ({ text, value }) => {
	return (
		<div>
			{text === 'positive' ? (
				<p>
					{text} {value} %
				</p>
			) : (
				<p>
					{text} {value}
				</p>
			)}
		</div>
	);
};

const Button = ({ increaseCounter, text }) => {
	return <button onClick={increaseCounter}>{text}</button>;
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const all = good + neutral + bad;
	return (
		<div>
			<h1>give feedback</h1>

			<Button increaseCounter={() => setGood(good + 1)} text={'good'} />
			<Button increaseCounter={() => setNeutral(neutral + 1)} text={'neutral'} />
			<Button increaseCounter={() => setBad(bad + 1)} text={'bad'} />

			<h1>statistics</h1>
			{all > 0 ? (
				<>
					<Statistics good={good} neutral={neutral} bad={bad} all={all} />
				</>
			) : (
				<p>No feedback given</p>
			)}
		</div>
	);
};

export default App;
