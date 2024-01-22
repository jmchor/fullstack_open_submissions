import { CoursePart } from '../types';
import Part from './Part';

const Content = ({ parts }: { parts: CoursePart[] }) => {
	return (
		<div>
			{parts.map((part) => (
				<div key={part.name}>
					<Part part={part} />
					<br />
				</div>
			))}
		</div>
	);
};

export default Content;
