import Details from './Details';

const Contacts = ({ filterPersons, deleteContact }) => {
	return (
		<>
			{filterPersons?.map((person) => (
				<Details
					key={person.name}
					name={person.name}
					number={person.number}
					id={person.id}
					deleteContact={deleteContact}
				/>
			))}
		</>
	);
};

export default Contacts;
