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

const calculateBmi = (height: number, weight: number) => {
	height = height / 100;
	const result: number = weight / (height * height);

	if (result <= 18.4) {
		console.log(`Underweight ( Mild to severe thinness )`);
	} else if (result <= 24.9) {
		console.log(` Normal (healthy weight)`);
	} else if (result <= 29.9) {
		console.log(` Overweight (pre-obese weight)`);
	} else {
		console.log(`Obese`);
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
