import { useState, useEffect } from 'react';
import Form from './components/Form';
import SearchFilter from './components/SearchFilter';
import Contacts from './components/Contacts';
import contactService from './services/phonebook';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filterValue, setFilterValue] = useState('');
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const successStyle = {
		color: 'green',
		border: '2px solid green',
		borderRadius: '5px',
		background: 'lightgrey',
		padding: '10px',
	};
	const errorStyle = {
		color: 'red',
		border: '2px solid red',
		borderRadius: '5px',
		background: 'lightgrey',
		padding: '10px',
	};

	useEffect(() => {
		contactService.getAll().then((response) => {
			setPersons(response.data);
		});
	}, []);

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
		const updateNumberPerson = persons.find(
			(person) => person.name === newPerson.name && person.number !== newPerson.number
		);

		if (!persons.some((person) => person.name === newPerson.name)) {
			contactService
				.create(newPerson)
				.then((res) => {
					setPersons((prevPersons) => [...prevPersons, newPerson]);
					console.log(res.data);
					setSuccessMessage(`Added ${res.data.name}`);
					setNewName('');
					setNewNumber('');
					setTimeout(() => {
						setSuccessMessage('');
					}, 3000);
				})
				.catch((error) => {
					console.error('Error!', error);
					setErrorMessage(error.response.data.error);
				});
		} else if (updateNumberPerson) {
			contactService
				.update(updateNumberPerson.id, { ...updateNumberPerson, number: newNumber })
				.then((res) => {
					console.log(`Successfully updated ${res.data.name}'s number on the server`);

					setPersons((prevPersons) => prevPersons.map((person) => (person.id === res.data.id ? res.data : person)));

					setSuccessMessage(`Successfully updated ${newPerson.name}'s number`);
					setNewName('');
					setNewNumber('');
				})
				.catch((error) => {
					console.error('Error updating number on the server!', error);
					setErrorMessage(`Information of ${updateNumberPerson.name} has already been removed from server`);
				});
		} else {
			window.alert(`${newName} is already added in the phonebook`);
		}
	};

	const deleteContact = (id, name) => {
		if (window.confirm(`Delete ${name}?`)) {
			contactService
				.deletePerson(id)
				.then(() => {
					console.log(`Successfully deleted ${name} from database`);
					setSuccessMessage(`Successfully deleted ${name} from database`);
					setPersons((prevPersons) => prevPersons.filter((person) => person.id !== id));
				})
				.catch((error) => console.log(error));
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			{successMessage && <div style={successStyle}>{successMessage}</div>}
			{errorMessage && <div style={errorStyle}>{errorMessage}</div>}
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
