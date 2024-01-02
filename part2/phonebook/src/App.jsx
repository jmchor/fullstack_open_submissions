import { useState } from 'react';
import Form from './components/Form';
import SearchFilter from './components/SearchFilter';
import Contacts from './components/Contacts';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
	]);

	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filterValue, setFilterValue] = useState('');

	const handleChange = (e) => {
		setNewName(e.target.value);
	};
	const handleNumberChange = (e) => {
		setNewNumber(e.target.value);
	};

	const handleFilterChange = (e) => {
		const value = e.target.value.toLowerCase();
		setFilterValue(value);
	};

	const filterPersons = persons.filter((person) => person.name.toLowerCase().includes(filterValue));

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
			<SearchFilter filterValue={filterValue} handleFilterChange={handleFilterChange} />
			<h2>add a new</h2>
			<Form
				updatePersons={updatePersons}
				newName={newName}
				newNumber={newNumber}
				handleChange={handleChange}
				handleNumberChange={handleNumberChange}
			/>
			<h2>Numbers</h2>
			<Contacts filterPersons={filterPersons} />
		</div>
	);
};

export default App;
