const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
	{
		title: 'My first Blogpost',
		author: 'ME',
		url: 'https://papertrail.jmchor.dev/posts/why-vegans-dont/',
		likes: 9,
	},
	{
		title: 'My second Blogpost',
		author: 'Again, ME',
		url: 'google.com',
		likes: 0,
	},
];

const nonExistingId = async () => {
	const blog = new Blog({ content: 'willremovethissoon' });
	await blog.save();
	await blog.deleteOne();

	return blog._id.toString();
};

const blogsInDb = async () => {
	const blogs = await Blog.find({});
	return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
	const users = await User.find({});
	return users.map((u) => u.toJSON());
};

module.exports = {
	initialBlogs,
	nonExistingId,
	blogsInDb,
	usersInDb,
};
