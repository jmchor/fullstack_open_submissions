import { useState } from 'react';

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const increaseCounter = (feedback) => {
		if (feedback === 'good') {
			setGood(good + 1);
		} else if (feedback === 'neutral') {
			setNeutral(neutral + 1);
		} else {
			setBad(bad + 1);
		}
	};

	return (
		<div>
			<h1>give feedback</h1>

			<button onClick={() => increaseCounter('good')}>good</button>
			<button onClick={() => increaseCounter('neutral')}>neutral</button>
			<button onClick={() => increaseCounter('bad')}>bad</button>

			<h1>statistics</h1>
			<p>good {good}</p>
			<p>neutral {neutral}</p>
			<p>bad {bad}</p>
		</div>
	);
};

export default App;
