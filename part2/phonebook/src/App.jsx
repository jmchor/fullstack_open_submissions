import { useState, useEffect } from 'react';
import Form from './components/Form';
import SearchFilter from './components/SearchFilter';
import Contacts from './components/Contacts';
import axios from 'redaxios';
import contactService from './services/phonebook';
const server = 'http://localhost:3001';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filterValue, setFilterValue] = useState('');

	useEffect(() => {
		contactService.getAll().then((response) => {
			setPersons(response.data);
		});
	}, [persons]);

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

		contactService
			.create(newPerson)
			.then((res) => console.log(`Successfully added ${res.data.name} to the datbase`))
			.catch((error) => console.error('Error!', error));

		setNewName('');
		setNewNumber('');
	};

	const deleteContact = (id, name) => {
		if (window.confirm(`Delete ${name}?`)) {
			contactService
				.deletePerson(id)
				.then((res) => console.log(`Successfully deleted ${name} from database`))
				.catch((error) => console.log(error));
		}
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
			<Contacts filterPersons={filterPersons} deleteContact={deleteContact} />
		</div>
	);
};

export default App;
