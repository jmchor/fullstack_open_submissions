import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import Notification from './components/Notification';
import loginService from './services/login.js';
import LoginForm from './components/LoginForm.jsx';
import Togglable from './components/Togglable.jsx';
import CreateForm from './components/CreateForm.jsx';
import './App.css';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState('');

	const blogFormRef = useRef();

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

	const updateLikes = async (blogId, newLikes) => {
		const updatedBlogs = blogs.map((blog) => (blog.id === blogId ? { ...blog, likes: newLikes } : blog));

		const sortedBlogs = updatedBlogs.sort((a, b) => b.likes - a.likes);

		setBlogs(sortedBlogs);
	};

	const updateBlogsAfterDeletion = async (blogId) => {
		try {
			setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
		} catch (error) {
			console.error('Error updating blogs after deletion:', error);
		}
	};

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

	const headlineStyles = {
		display: 'flex',
		justifyContent: 'center',
	};

	const imageStyles = {
		width: '100px',
	};
	return (
		<div className='App'>
			<div style={headlineStyles}>
				<img style={imageStyles} src='/blog.svg' alt='' />
				<h2>blogs</h2>
			</div>
			<Notification errorMessage={errorMessage} successMessage={successMessage} />

			{!user ? (
				<div className='centerStyles'>
					<Togglable buttonLabel={'log in'}>
						<LoginForm
							handleLogin={handleLogin}
							handleUsernameChange={(e) => setUsername(e.target.value)}
							handlePasswordChange={(e) => setPassword(e.target.value)}
							username={username}
							password={password}
						/>
					</Togglable>
				</div>
			) : (
				<div>
					<p>{user.username} logged in</p>
					<button type='button' onClick={handleLogout}>
						Log Out
					</button>

					<div className='centerStyles'>
						<h2>Create New Blog</h2>
						<Togglable buttonLabel={'New Blog'} ref={blogFormRef}>
							<CreateForm
								create={blogService.create}
								setSuccessMessage={setSuccessMessage}
								setErrorMessage={setErrorMessage}
								setBlogs={setBlogs}
								blogFormRef={blogFormRef}
							/>
						</Togglable>
					</div>
				</div>
			)}

			<div className='centerStyles'>
				<h2>All them blogs</h2>
				{blogs.map((blog) => (
					<Blog
						key={blog.id}
						blog={blog}
						updateLikes={updateLikes}
						updateBlogsAfterDeletion={updateBlogsAfterDeletion}
						user={user}
					/>
				))}
			</div>
		</div>
	);
};

export default App;
