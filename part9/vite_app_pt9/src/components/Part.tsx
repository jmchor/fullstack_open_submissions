import { CoursePart, assertNever } from '../types';

const Part = ({ part }: { part: CoursePart }) => {
	switch (part.kind) {
		case 'basic':
			return (
				<div>
					<b>
						{part.name} {part.exerciseCount}
					</b>
					<br />
					<i>{part.description}</i>
				</div>
			);
			break;
		case 'group':
			return (
				<div>
					<b>
						{part.name} {part.exerciseCount}
					</b>
					<br />
					<i>Project Count: {part.groupProjectCount}</i>
				</div>
			);
			break;
		case 'background':
			return (
				<div>
					<b>
						{part.name} {part.exerciseCount}
					</b>
					<br />
					<i>{part.description}</i>
					<br />
					<u>Background Material: {part.backgroundMaterial}</u>
				</div>
			);
		case 'special':
			return (
				<div>
					<b>
						{part.name} {part.exerciseCount}
					</b>
					<br />
					<i>{part.description}</i>
					<br />
					<p>Requirements:</p>
					<ul>
						{part.requirements.map((req) => (
							<li key={req}>{req}</li>
						))}
					</ul>
				</div>
			);
			break;
		default:
			return assertNever(part);
	}
};
export default Part;
