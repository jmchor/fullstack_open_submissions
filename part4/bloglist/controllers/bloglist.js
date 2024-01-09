const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const getTokenFrom = (request) => {
	const authorization = request.get('authorization');
	if (authorization && authorization.startsWith('Bearer ')) {
		return authorization.replace('Bearer ', '');
	}
	return null;
};

blogRouter.get('/', async (req, res) => {
	const foundBlogs = await Blog.find({});
	res.json(foundBlogs);
});
blogRouter.get('/:id', async (req, res) => {
	const { id } = req.params;

	const foundBlog = await Blog.findById(id);
	res.status(200).json(foundBlog).end();
});

blogRouter.post('/', async (req, res) => {
	let { title, author, url, likes } = req.body;

	const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);
	if (!decodedToken.id) {
		return res.status(401).json({ error: 'token invalid' });
	}
	const user = await User.findById(decodedToken.id);

	if (!likes) {
		likes = 0;
	}

	if (!title || !url) {
		res.status(400);
	}

	const blog = new Blog({
		title,
		author,
		url,
		likes,
		user: user.id,
	});

	const savedBlog = await blog.save();
	console.log(user.blogs);
	user.blogs = user.blogs.concat(savedBlog.id);
	await user.save();
	res.status(201).json(savedBlog);
});

blogRouter.put('/:id', async (req, res) => {
	const { title, author, url, likes } = req.body;
	const { id } = req.params;

	const blogToUpdate = await Blog.findByIdAndUpdate(id, { title, author, url, likes }, { new: true });

	res.status(200).json(blogToUpdate);
});

blogRouter.delete('/:id', async (req, res) => {
	const { id } = req.params;

	await Blog.findByIdAndDelete(id);
	res.status(204).end();
});

module.exports = blogRouter;
