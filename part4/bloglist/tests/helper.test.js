const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
	const blogs = [];

	const result = listHelper.dummy(blogs);
	expect(result).toBe(1);
});

describe('total likes', () => {
	const listWithOneBlog = [
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5,
			__v: 0,
		},
	];

	const listWithoutBlog = [];

	const listWithMultipleBlogs = [
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5,
			__v: 0,
		},
		{
			_id: '5a422aa71b54a676234d17f7',
			title: 'Harmful',
			author: 'Scrooge',
			url: '',
			likes: 10,
			__v: 0,
		},
		{
			_id: '5a422aa71b54a676234d17f9',
			title: 'Statement',
			author: 'McDuck W. Dijkstra',
			url: '',
			likes: 2,
			__v: 0,
		},
	];

	test('when list has no blogs, returns zero', () => {
		const result = listHelper.totalLikes(listWithoutBlog);
		expect(result).toBe(0);
	});

	test('when list has only one blog, equals the likes of that', () => {
		const result = listHelper.totalLikes(listWithOneBlog);
		expect(result).toBe(5);
	});

	test('when list has multiple blogs, equals the sum of all likes', () => {
		const result = listHelper.totalLikes(listWithMultipleBlogs);
		expect(result).toBe(17);
	});
});

describe('favorite blog', () => {
	const listWithMultipleBlogs = [
		{
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			likes: 5,
		},
		{
			title: 'Harmful',
			author: 'Scrooge',
			likes: 10,
		},
		{
			title: 'Statement',
			author: 'McDuck W. Dijkstra',
			likes: 2,
		},
	];

	test('in a list with multiple blogs, return blog with most likes', () => {
		const result = listHelper.favoriteBlog(listWithMultipleBlogs);
		expect(result).toEqual({
			title: 'Harmful',
			author: 'Scrooge',
			likes: 10,
		});
	});
});

describe('author with most blogs', () => {
	const listWithMultipleBlogs = [
		{
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			likes: 5,
		},
		{
			title: 'Harmful',
			author: 'Scrooge',
			likes: 10,
		},
		{
			title: 'Statement-2',
			author: 'Gustavo Gunter',
			likes: 2,
		},
		{
			title: 'Blog-2',
			author: 'Edsger W. Dijkstra',
			likes: 5,
		},
		{
			title: 'Ducking',
			author: 'Donald',
			likes: 123,
		},
		{
			title: 'Statement',
			author: 'McDuck W. Dijkstra',
			likes: 22,
		},
		{
			title: 'Go To ',
			author: 'Edsger W. Dijkstra',
			likes: 59,
		},
		{
			title: 'Considered Harmful',
			author: 'Edsger W. Dijkstra',
			likes: 45,
		},
	];

	test('in a list with multiple blogs, return author with most blogs', () => {
		const result = listHelper.mostBlogs(listWithMultipleBlogs);
		expect(result).toEqual({
			author: 'Edsger W. Dijkstra',
			blogs: 4,
		});
	});
});

describe('author with most likes', () => {
	const listWithMultipleBlogs = [
		{
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			likes: 5,
		},
		{
			title: 'Harmful',
			author: 'Scrooge',
			likes: 10,
		},
		{
			title: 'Statement-2',
			author: 'Gustavo Gunter',
			likes: 2,
		},
		{
			title: 'Blog-2',
			author: 'Edsger W. Dijkstra',
			likes: 5,
		},
		{
			title: 'Ducking',
			author: 'Donald',
			likes: 13,
		},
		{
			title: 'Statement',
			author: 'McDuck W. Dijkstra',
			likes: 22,
		},
		{
			title: 'Go To ',
			author: 'Edsger W. Dijkstra',
			likes: 50,
		},
		{
			title: 'Considered Harmful',
			author: 'Edsger W. Dijkstra',
			likes: 45,
		},
	];

	test('in a list with multiple blogs, return author with most likes', () => {
		const result = listHelper.mostLikes(listWithMultipleBlogs);
		expect(result).toEqual({
			author: 'Edsger W. Dijkstra',
			likes: 105,
		});
	});
});
