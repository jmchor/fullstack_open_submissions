import { CoursePart } from '../App';

const Content = ({ parts }: { parts: CoursePart[] }) => {
	return (
		<div>
			{parts.map((part) => (
				<p key={part.name}>
					{part.name} {part.exerciseCount}
				</p>
			))}
		</div>
	);
};

export default Content;
