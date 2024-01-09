const blogRouter = require('express').Router();
const Blog = require('../models/blog');

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
	const blog = new Blog(req.body);

	if (!blog.likes) {
		blog.likes = 0;
	}

	if (!blog.title || !blog.url) {
		res.status(400);
	}

	const savedBlog = await blog.save();
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
