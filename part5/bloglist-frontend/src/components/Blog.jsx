import { useState, useEffect } from 'react';
import blogService from '../services/blogs';
import PropTypes from 'prop-types';

const Blog = ({ blog, updateLikes, updateBlogsAfterDeletion, user }) => {
	const [isBlogShown, setIsBlogShown] = useState(false);
	const [likes, setLikes] = useState(blog.likes);

	const increaseLikes = async () => {
		const newLikes = likes + 1;
		setLikes(newLikes);

		const updatedBlog = {
			title: blog.title,
			author: blog.author,
			url: blog.url,
			likes: newLikes,
		};

		try {
			await blogService.update(blog.id, updatedBlog);
			updateLikes(blog.id, newLikes);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteBlog = async (blogId) => {
		const confirmed = window.confirm('Are you sure you want to delete this blog?');

		if (!confirmed) {
			return;
		}

		try {
			await blogService.deleteBlog(blogId);
			updateBlogsAfterDeletion(blogId);
		} catch (error) {
			console.log(error);
		}
	};

	const toggleBlog = () => {
		setIsBlogShown(!isBlogShown);
	};

	const blogStyle = {
		padding: '20px 10px',
		display: 'flex',
		flexDirection: 'column',
		boxShadow: '0 0 5px 3px rgba(0, 0, 0, 0.05)',
		width: '400px',
		margin: '15px',
	};

	return (
		<div className='themBlogs' style={blogStyle}>
			<p data-testid='blogtest'>
				{blog.title} by {blog.author}
			</p>
			<button id='toggleShow' type='button' onClick={toggleBlog}>
				{isBlogShown ? 'Hide' : 'Show'}
			</button>
			{isBlogShown && (
				<div>
					<p id='url'>Source: {blog?.url}</p>
					<p id='likes'>
						Likes {likes || blog.likes}{' '}
						<button id='like-button' onClick={increaseLikes}>
							Like
						</button>
					</p>
					<p id='createdBy'>Created By: {blog?.user?.username}</p>

					{blog?.user?.username === user?.username ? (
						<button id='deleteButton' type='button' onClick={() => deleteBlog(blog.id)}>
							Remove
						</button>
					) : (
						''
					)}
				</div>
			)}
		</div>
	);
};

export default Blog;

Blog.propTypes = {
	blog: PropTypes.shape({
		title: PropTypes.string.isRequired,
		author: PropTypes.string.isRequired,
		url: PropTypes.string,
		likes: PropTypes.number,
		user: PropTypes.shape({
			username: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			blogs: PropTypes.array.isRequired,
			id: PropTypes.string.isRequired,
		}),
	}).isRequired,
	updateLikes: PropTypes.func.isRequired,
	updateBlogsAfterDeletion: PropTypes.func.isRequired,
	user: PropTypes.shape({
		name: PropTypes.string.isRequired,
		token: PropTypes.string.isRequired,
		username: PropTypes.string.isRequired,
	}).isRequired,
};
