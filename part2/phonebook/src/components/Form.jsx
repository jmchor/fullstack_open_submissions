const Form = ({ updatePersons, newName, newNumber, handleNumberChange, handleChange }) => {
	return (
		<div>
			<form onSubmit={updatePersons}>
				<div>
					name: <input value={newName} onChange={handleChange} />
					number: <input value={newNumber} onChange={handleNumberChange} />
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
		</div>
	);
};

export default Form;
