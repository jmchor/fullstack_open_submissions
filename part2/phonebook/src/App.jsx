import { useState } from 'react';

const App = () => {
	const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-1234567' }]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');

	const handleChange = (e) => {
		setNewName(e.target.value);
	};
	const handleNumberChange = (e) => {
		setNewNumber(e.target.value);
	};

	const updatePersons = (e) => {
		e.preventDefault();
		const newPerson = { name: newName, number: newNumber };
		if (!persons.some((person) => person.name === newPerson.name)) {
			const newArray = [...persons, newPerson];
			setPersons(newArray);
		} else {
			window.alert(`${newName} is already added in the phonebook`);
		}
		setNewName('');
		setNewNumber('');
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={updatePersons}>
				<div>
					name: <input value={newName} onChange={handleChange} />
					number: <input value={newNumber} onChange={handleNumberChange} />
				</div>
				<div>
					<button type='submit'>add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map((person) => (
				<p key={person.name}>
					{person.name} {person.number}
				</p>
			))}
			...
		</div>
	);
};

export default App;
