const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const { userExtractor, tokenExtractor } = require('../utils/middleware');

blogRouter.get('/', async (req, res) => {
	const foundBlogs = await Blog.find({}).populate('user');
	res.json(foundBlogs);
});

blogRouter.get('/:id', async (req, res) => {
	const { id } = req.params;

	const foundBlog = await Blog.findById(id);
	res.status(200).json(foundBlog).end();
});

blogRouter.post('/', tokenExtractor, userExtractor, async (req, res) => {
	let { title, author, url, likes } = req.body;

	const user = req.user;

	if (!likes) {
		likes = 0;
	}

	if (!title || !url) {
		res.status(400);
	}

	if (!req.token) {
		res.status(401);
	}

	const blog = new Blog({
		title,
		author,
		url,
		likes,
		user: user.id,
	});

	const savedBlog = await blog.save();
	user.blogs = user.blogs.concat(savedBlog.id);
	await user.save();
	res.status(201).json(savedBlog);
});

blogRouter.put('/:id', tokenExtractor, async (req, res) => {
	const { title, author, url, likes } = req.body;
	const { id } = req.params;

	const blogToUpdate = await Blog.findByIdAndUpdate(id, { title, author, url, likes }, { new: true });

	res.status(200).json(blogToUpdate);
});

blogRouter.delete('/:id', tokenExtractor, userExtractor, async (req, res) => {
	const { id } = req.params;
	const user = req.user;

	const blog = await Blog.findById(id);

	console.log('BLOG USER', blog.user.toString());
	console.log('LOGGED IN USER', user.id);

	if (blog.user.toString() === user.id.toString()) {
		await Blog.findByIdAndDelete(id);
		res.status(204).end();
	} else {
		// eslint-disable-next-line quotes
		console.log(`You're not the creator, you don't delete nothin' around here.`);
		res.status(400).end();
	}
});

module.exports = blogRouter;
