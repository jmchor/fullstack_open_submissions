interface BmiValues {
	height: number;
	weight: number;
}

const parseArguments = (args: string[]): BmiValues => {
	if (args.length < 4) throw new Error('Not enough arguments');
	if (args.length > 4) throw new Error('Too many arguments');

	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
		return {
			height: Number(args[2]),
			weight: Number(args[3]),
		};
	} else {
		throw new Error('Provided values were not numbers!');
	}

	if (Number(args[3]) === 0 || Number(args[3]) === 0) throw new Error('Height or weight can not be 0');
};

export const calculateBmi = (height: number, weight: number): string => {
	height = height / 100;
	const result: number = weight / (height * height);

	if (result <= 18.4) {
		return `Underweight ( Mild to severe thinness )`;
	} else if (result <= 24.9) {
		return ` Normal (healthy weight)`;
	} else if (result <= 29.9) {
		return ` Overweight (pre-obese weight)`;
	} else {
		return `Obese`;
	}
};

try {
	const { height, weight } = parseArguments(process.argv);
	calculateBmi(height, weight);
} catch (error: unknown) {
	if (error instanceof Error) {
		console.log(error.message);
	}
}
