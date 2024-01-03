const Details = ({ name, number, id, deleteContact }) => {
	return (
		<p>
			{name} {number} <button onClick={() => deleteContact(id, name)}>Delete</button>
		</p>
	);
};

export default Details;
