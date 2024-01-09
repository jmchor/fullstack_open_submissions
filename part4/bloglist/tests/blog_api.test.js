const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');

const helper = require('./test_helper');

beforeEach(async () => {
	await Blog.deleteMany({});

	for (let blog of helper.initialBlogs) {
		let blogObject = new Blog(blog);
		await blogObject.save();
	}
});

describe('the blogs are in valid JSON format', () => {
	test('blogs are returned as json', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/);
	}, 100000);

	test('The identifier property of a blog is named id', async () => {
		const blogsAtStart = await helper.blogsInDb();
		const blogToView = blogsAtStart[0];

		expect(blogToView.id).toBeDefined();
	});
});

describe('A new blog can be added when valid', () => {
	test('a valid blog can be added', async () => {
		const newBlog = {
			title: 'A test blog',
			author: 'jmchor',
			url: '',
			likes: 0,
		};

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const blogAtEnd = await helper.blogsInDb();
		expect(blogAtEnd).toHaveLength(helper.initialBlogs.length + 1);

		const title = blogAtEnd.map((r) => r.title);
		expect(title).toContain('A test blog');
	});
});

describe('Missing properties on blog object', () => {
	test('defaults to 0 if likes property is missing', async () => {
		const newBlogWithoutLikes = {
			title: 'A test blog',
			author: 'jmchor',
			url: '',
		};

		const res = await api
			.post('/api/blogs')
			.send(newBlogWithoutLikes)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		expect(res.body.likes).toBe(0);
	});

	test('Responds with status 400 Bad Request if title or url are missing', async () => {
		const newBlog = {
			author: 'jmchor',
			likes: 0,
		};

		await api.post('/api/blogs').send(newBlog).expect(400);
		const blogAtEnd = await helper.blogsInDb();

		expect(blogAtEnd).toHaveLength(helper.initialBlogs.length);
	});
});

describe('Update and Delete manipulations are functional', () => {
	test('a blog can be deleted', async () => {
		const blogsAtStart = await helper.blogsInDb();
		const blogToDelete = blogsAtStart[0];

		await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

		const blogsAtEnd = await helper.blogsInDb();

		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

		const titles = blogsAtEnd.map((r) => r.title);
		expect(titles).not.toContain(blogToDelete.title);
	}, 10000);

	test('the likes of a blog can be updated', async () => {
		const blogsAtStart = await helper.blogsInDb();
		const blogToView = blogsAtStart[0];

		const blogWithUpdatedLikes = {
			title: 'A test blog',
			author: 'jmchor',
			url: '',
			likes: 76,
		};

		const resultBlog = await api
			.put(`/api/blogs/${blogToView.id}`)
			.send(blogWithUpdatedLikes)
			.expect(200)
			.expect('Content-Type', /application\/json/);

		expect(resultBlog.body.likes).toBe(blogWithUpdatedLikes.likes);
	});
});

// #############################

// test('blog without title is not added', async () => {
// 	const newBlog = {
// 		author: 'jmchor',
// 		url: '',
// 		likes: 0,
// 	};

// 	await api.post('/api/blogs').send(newBlog).expect(400);

// 	const blogAtEnd = await helper.blogsInDb();

// 	expect(blogAtEnd).toHaveLength(helper.initialBlogs.length);
// });

// test('a specific blog is within the returned bloglist', async () => {
// 	const response = await api.get('/api/blogs');

// 	const title = response.body.map((r) => r.title);
// 	expect(title).toContain('My first Blogpost');
// });

// test('all blogs are returned', async () => {
// 	const response = await api.get('/api/blogs');

// 	expect(response.body).toHaveLength(helper.initialBlogs.length);
// });

afterAll(async () => {
	await mongoose.connection.close();
});
