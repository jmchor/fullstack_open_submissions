interface exerciseResult {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

interface InputValues {
	target: number;
	dailyExerciseHours: number[];
}

const parseExerciseArguments = (args: string[]): InputValues => {
	if (args.length < 4) {
		throw new Error(
			'Not enough arguments. You need to provide at least 1 target value and 7 or more days of exercise.'
		);
	}

	const target = Number(args[2]);

	if (isNaN(target)) {
		throw new Error('Provided target value is not a number!');
	}

	const dailyExerciseHours = args.slice(3).map(Number);

	if (dailyExerciseHours.some(isNaN)) {
		throw new Error('Provided values for daily exercise hours were not numbers!');
	}

	return {
		target,
		dailyExerciseHours,
	};
};

const calculateExercises = (target: number, dailyExerciseHours: number[]): exerciseResult => {
	if (!dailyExerciseHours.every((item) => !isNaN(Number(item)))) {
		throw new Error('All items in the array must be numbers');
	}

	const daysTrained: number[] = dailyExerciseHours.filter((item) => item !== 0);

	const periodLength = dailyExerciseHours.length;
	const trainingDays = daysTrained.length;
	const success = daysTrained.every((item) => item >= target);
	const matchingDays = daysTrained.filter((item) => item >= target);
	const matchTarget = matchingDays.length;
	let rating: number;
	let ratingDescription: string;

	if (matchTarget > 5) {
		rating = 1;
		ratingDescription = 'Excellent job! Keep it up!';
	} else if (matchTarget >= 4) {
		rating = 2;
		ratingDescription = "Good effort! You're on the right track.";
	} else {
		rating = 3;
		ratingDescription = "You can do better. Let's aim for improvement.";
	}

	const sum = dailyExerciseHours.reduce((acc, num) => acc + num, 0);
	const average = sum / dailyExerciseHours.length;

	const result: exerciseResult = { periodLength, trainingDays, success, rating, ratingDescription, target, average };

	console.log(result);

	return result;
};

try {
	const { dailyExerciseHours, target } = parseExerciseArguments(process.argv);
	calculateExercises(target, dailyExerciseHours);
} catch (error: unknown) {
	if (error instanceof Error) {
		console.log(error.message);
	}
}
