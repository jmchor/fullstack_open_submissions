const Total = ({ parts }) => {
	const exercises = parts.map((part) => part.exercises);

	const total = exercises.reduce((acc, curr) => acc + curr, 0);

	return <b>Number of exercises {total}</b>;
};

export default Total;
