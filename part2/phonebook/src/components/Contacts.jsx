import Details from './Details';

const Contacts = ({ filterPersons, deleteContact }) => {
	return (
		<>
			{filterPersons?.map((person) => (
				<Details
					key={person.id}
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
