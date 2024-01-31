import { useState } from 'react';
import { useApolloClient, useQuery } from '@apollo/client';
import { ALL_BOOKS, CURRENT_USER } from './queries.js';

import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/Loginform';
import Notify from './components/Notify';
import Recommendation from './components/Recommendation.js.js';

const App = () => {
	const [page, setPage] = useState('authors');
	const [token, setToken] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);
	const [user, setUser] = useState({});

	const currentUser = useQuery(CURRENT_USER, {
		pollInterval: 1000,
	});

	const client = useApolloClient();

	const notify = (message) => {
		setErrorMessage(message);
		setTimeout(() => {
			setErrorMessage(null);
		}, 10000);
	};

	const logout = () => {
		setToken('');
		localStorage.clear();
		client.resetStore();
	};

	if (!token) {
		return (
			<div>
				<Notify errorMessage={errorMessage} />
				<h2>Login</h2>
				<LoginForm setToken={setToken} setError={notify} />
			</div>
		);
	}

	return (
		<div>
			<div>
				<Notify errorMessage={errorMessage} />
				<button onClick={logout}>logout</button>
				<button onClick={() => setPage('authors')}>authors</button>
				<button onClick={() => setPage('books')}>books</button>
				<button onClick={() => setPage('add')}>add book</button>
				<button onClick={() => setPage('recommended')}>recommended</button>
			</div>

			<Authors show={page === 'authors'} />

			<Books show={page === 'books'} />

			<NewBook show={page === 'add'} setError={notify} />

			{currentUser && <Recommendation show={page === 'recommended'} user={currentUser} />}
		</div>
	);
};

export default App;
