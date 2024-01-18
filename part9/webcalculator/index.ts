import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

interface bmiResponse {
	weight: number;
	height: number;
	bmi: string;
}

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
	const { height, weight } = req.query;

	if (isNaN(Number(height)) || isNaN(Number(weight))) throw new Error('malformatted parameters');

	try {
		const numericHeight = Number(height);
		const numericWeight = Number(weight);

		const calcResponse: string = calculateBmi(numericHeight, numericWeight);

		const bmiResponse: bmiResponse = {
			weight: numericWeight,
			height: numericHeight,
			bmi: calcResponse,
		};

		res.status(200).json(bmiResponse);
	} catch (error: unknown) {
		if (error instanceof Error) {
			res.status(400).json({ error: error.message });
		}
	}
});

app.post('/exercises', (req, res) => {
	const { target, daily_exercises }: { target: number; daily_exercises: number[] } = req.body;

	if (isNaN(target) || !Array.isArray(daily_exercises)) {
		res.status(400).json({ error: 'malformatted parameters' });
	}

	if (!target || !daily_exercises) {
		res.status(400).json({ error: 'parameters missing' });
	}

	const result = calculateExercises(target, daily_exercises);
	res.status(200).json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
