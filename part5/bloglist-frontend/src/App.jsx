import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import Notification from './components/Notification';
import loginService from './services/login.js';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState('');
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');

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

	const handleLogout = () => {
		window.localStorage.removeItem('loggedInBlogAppUser');
		setUser('');
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const newBlog = {
			title,
			author,
			url,
		};

		try {
			const createdBlog = await blogService.create(newBlog);
			setTimeout(() => {
				setSuccessMessage(`Added a new blog: ${createdBlog.title} by ${createdBlog.author}!`);
			}, 5000);

			// Update the blogs state with the new blog
			setBlogs((prevBlogs) => [...prevBlogs, createdBlog]);

			// Clear the form fields
			setTitle('');
			setAuthor('');
			setUrl('');
		} catch (error) {
			// Handle error if the blog creation fails
			console.error('Error creating blog:', error.message);
			setErrorMessage('Failed to create a new blog');
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	return (
		<div>
			<h2>blogs</h2>
			<Notification errorMessage={errorMessage} successMessage={successMessage} />

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
						<br />
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
					<button type='button' onClick={handleLogout}>
						Log Out
					</button>

					<h2>Create New Blog</h2>
					<form onSubmit={handleSubmit}>
						title:
						<input type='text' name='title' id='title' value={title} onChange={(e) => setTitle(e.target.value)} />
						<br />
						author:
						<input type='text' name='author' id='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
						<br />
						url:
						<input type='text' name='url' id='url' value={url} onChange={(e) => setUrl(e.target.value)} />
						<br />
						<button type='submit'>create</button>
					</form>
					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
				</div>
			)}
		</div>
	);
};

export default App;
