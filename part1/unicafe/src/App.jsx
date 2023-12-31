import { useState } from 'react';

const Statistics = ({ text, statistic }) => {
	return (
		<div>
			{text === 'positive' ? (
				<p>
					{text} {statistic} %
				</p>
			) : (
				<p>
					{text} {statistic}
				</p>
			)}
		</div>
	);
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);
	const [all, setAll] = useState(0);

	const increaseCounter = (feedback) => {
		setAll(all + 1);
		if (feedback === 'good') {
			setGood(good + 1);
		} else if (feedback === 'neutral') {
			setNeutral(neutral + 1);
		} else {
			setBad(bad + 1);
		}
	};

	const average = (good - bad) / all;
	const positive = (good / all) * 100;

	return (
		<div>
			<h1>give feedback</h1>

			<button onClick={() => increaseCounter('good')}>good</button>
			<button onClick={() => increaseCounter('neutral')}>neutral</button>
			<button onClick={() => increaseCounter('bad')}>bad</button>

			<h1>statistics</h1>
			<Statistics text={'good'} statistic={good} />
			<Statistics text={'neutral'} statistic={neutral} />
			<Statistics text={'bad'} statistic={bad} />
			<Statistics text={'all'} statistic={all} />
			<Statistics text={'average'} statistic={average} />
			<Statistics text={'positive'} statistic={positive} />
		</div>
	);
};

export default App;
