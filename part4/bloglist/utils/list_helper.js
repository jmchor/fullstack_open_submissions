const _ = require('lodash');

const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) =>
	blogs.length === 0 ? 0 : blogs.length === 1 ? blogs[0].likes : blogs.reduce((total, blog) => total + blog.likes, 0);

const favoriteBlog = (blogs) => {
	return blogs.reduce(
		(maxLikesBlog, currentBlog) => (currentBlog.likes > maxLikesBlog.likes ? currentBlog : maxLikesBlog),
		blogs[0]
	);
};

const mostBlogs = (multipleBlogs) => {
	const blogsByAuthor = _.map(_.groupBy(multipleBlogs, 'author'), (blogs, author) => ({
		author,
		blogs: blogs.length,
	}));

	const authorWithMostBlogs = _.maxBy(blogsByAuthor, 'blogs');

	return authorWithMostBlogs;
};

const mostLikes = (blogs) => {
	const likesByAuthor = _.map(_.groupBy(blogs, 'author'), (blogs, author) => ({
		author,
		likes: _.sumBy(blogs, 'likes'),
	}));

	const result = _.maxBy(likesByAuthor, 'likes');

	return result;
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
};
