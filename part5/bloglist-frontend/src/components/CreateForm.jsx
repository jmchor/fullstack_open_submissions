import { useState } from 'react';

const CreateForm = ({ create, setSuccessMessage, setErrorMessage, setBlogs, blogFormRef }) => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();

		const newBlog = {
			title,
			author,
			url,
		};

		try {
			blogFormRef.current.toggleVisibility();
			const createdBlog = await create(newBlog);
			setSuccessMessage(`Added a new blog: ${createdBlog.title} by ${createdBlog.author}!`);
			setTimeout(() => {
				setSuccessMessage(null);
			}, 5000);

			setBlogs((prevBlogs) => [...prevBlogs, createdBlog]);

			setTitle('');
			setAuthor('');
			setUrl('');
		} catch (error) {
			setErrorMessage('Failed to create a new blog');
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	return (
		<form className='formStyles' onSubmit={handleSubmit}>
			<label htmlFor='title'>Title:</label>
			<input
				type='text'
				name='title'
				id='title'
				value={title}
				onChange={(e) => {
					setTitle(e.target.value);
				}}
			/>
			<br />
			<label htmlFor='author'>Author:</label>
			<input
				type='text'
				name='author'
				id='author'
				value={author}
				onChange={(e) => {
					setAuthor(e.target.value);
				}}
			/>
			<br />
			<label htmlFor='url'>URL:</label>
			<input
				type='text'
				name='url'
				id='url'
				value={url}
				onChange={(e) => {
					setUrl(e.target.value);
				}}
			/>
			<br />
			<button id='create-button' type='submit'>
				Create
			</button>
		</form>
	);
};

export default CreateForm;
