import { useState } from 'react';
import { useApolloClient, useQuery, useSubscription } from '@apollo/client';
import { ALL_BOOKS, BOOK_ADDED, CURRENT_USER } from './gql/queries.js';

import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/Loginform';
import Notify from './components/Notify';
import Recommendation from './components/Recommendation.js';

export const updateCache = (cache, query, bookAdded) => {
	// helper that is used to eliminate saving same book twice
	const uniqueByTitle = (a) => {
		let seen = new Set();
		return a.filter((item) => {
			let k = item.title;
			return seen.has(k) ? false : seen.add(k);
		});
	};

	cache.updateQuery(query, ({ allBooks }) => {
		console.log(allBooks);
		return {
			allBooks: uniqueByTitle(allBooks.concat(bookAdded)),
		};
	});
};

const App = () => {
	const [page, setPage] = useState('authors');
	const [token, setToken] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	const currentUser = useQuery(CURRENT_USER, {
		skip: !token,
	});

	const client = useApolloClient();

	useSubscription(BOOK_ADDED, {
		onData: ({ data, client }) => {
			const bookAdded = data.data.bookAdded;
			console.log('book', bookAdded);
			window.alert(`${bookAdded.title} by ${bookAdded.author.name} added`);
			notify(`${bookAdded.title} by ${bookAdded.author.name} added`);

			updateCache(client.cache, { query: ALL_BOOKS }, bookAdded);
		},
	});

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

	const { data } = useQuery(ALL_BOOKS);
	const books = data?.allBooks;

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

			<Books show={page === 'books'} books={books} />

			<NewBook show={page === 'add'} setError={notify} user={currentUser} />

			{currentUser && <Recommendation show={page === 'recommended'} user={currentUser} />}
		</div>
	);
};

export default App;
