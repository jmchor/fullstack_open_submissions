import Details from './Details';

const Contacts = ({ filterPersons }) => {
	return (
		<>
			{filterPersons?.map((person) => (
				<Details key={person.name} name={person.name} number={person.number} />
			))}
		</>
	);
};

export default Contacts;
