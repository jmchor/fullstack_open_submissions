import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import Notification from './components/Notification';
import loginService from './services/login.js';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState('');

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	useEffect(() => {
		const loggedInUserJSON = window.localStorage.getItem('loggedInBlogAppUser');
		if (loggedInUserJSON) {
			const user = JSON.parse(loggedInUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			const user = await loginService.login({ username, password });
			window.localStorage.setItem('loggedInBlogAppUser', JSON.stringify(user));
			blogService.setToken(user.token);
			setUser(user);
			setUsername('');
			setPassword('');
		} catch (error) {
			setErrorMessage('Wrong credentials');
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}

		console.log('logging in with', username, password);
	};

	return (
		<div>
			<h2>blogs</h2>
			<Notification message={errorMessage} />

			{!user ? (
				<form onSubmit={handleLogin}>
					<div>
						username
						<input
							type='text'
							name='username'
							id='username'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						password
						<input
							type='password'
							name='password'
							id='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button type='submit'>login</button>
				</form>
			) : (
				<div>
					<p>{user.username} logged in</p>
				</div>
			)}
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	);
};

export default App;
