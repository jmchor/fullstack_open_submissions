const jwt = require('jsonwebtoken');
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');
const { GraphQLError } = require('graphql');

const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const resolvers = {
	Query: {
		bookCount: async (root, args) => {
			try {
				return await Book.countDocuments();
			} catch (error) {
				console.error('Error fetching book count:', error);
				throw new GraphQLError('Fetching Book Count failed', {
					extensions: {
						code: 'NO_DOCUMENTS',
						invalidArgs: error,
					},
				});
			}
		},

		authorCount: async () => {
			try {
				return await Author.countDocuments();
			} catch (error) {
				console.error('Error fetching author count:', error);
				throw new GraphQLError('Fetching Author Count failed', {
					extensions: {
						code: 'NO_DOCUMENTS',
						invalidArgs: error,
					},
				});
			}
		},

		allBooks: async (obj, { genre }) => {
			try {
				let filter = {};
				if (genre) {
					return await Book.find({ genres: { $in: [genre] } }).populate('author');
				}
				return await Book.find({}).populate('author');
			} catch (error) {
				console.error('Error fetching all books:', error);
				throw new GraphQLError('Could not fetch all books.', {
					extensions: {
						code: 'INVALID_GENRE',
						invalidArgs: genre,
						error,
					},
				});
			}
		},
		allAuthors: async () => {
			try {
				const authorCounts = await Book.aggregate([{ $group: { _id: '$author', count: { $sum: 1 } } }]);

				const authors = await Author.find({});
				const result = authors.map((author) => {
					const authorCount = authorCounts.find((count) => String(count._id) === String(author._id));
					const bookCount = authorCount ? authorCount.count : 0;
					return {
						...author.toObject(),
						bookCount,
					};
				});

				return result;
			} catch (error) {
				console.error('Error fetching authors:', error);
				throw new Error('Could not fetch authors. Please try again later.');
			}
		},
		me: (root, args, { currentUser }) => {
			return currentUser;
		},
	},
	Mutation: {
		addBook: async (obj, args, { currentUser }) => {
			if (!currentUser) {
				throw new GraphQLError('Unauthorized', {
					extensions: {
						code: 'UNAUTHORIZED',
					},
				});
			}

			const { title, author, published, genres } = args;
			if (!title || typeof title !== 'string') {
				throw new GraphQLError('Title must be a non-empty string', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				});
			}
			if (!author || typeof author !== 'string') {
				throw new GraphQLError('Author must be a non-empty string', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				});
			}
			if (!published || typeof published !== 'number') {
				throw new GraphQLError('Published must be a number', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				});
			}
			if (!Array.isArray(genres) || !genres.every((genre) => typeof genre === 'string')) {
				throw new GraphQLError('Genres must be a non-empty array of strings', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				});
			}
			try {
				console.log('AUTHOR?', args.author);
				// Check if the author already exists
				let existingAuthor = await Author.findOne({ name: args.author });
				let authorId;
				if (!existingAuthor) {
					console.log('Creating new Author');

					// If not, create a new author
					const newAuthor = await Author.create({ name: args.author });
					authorId = newAuthor._id; // Get the newly created author's ID
				} else {
					authorId = existingAuthor._id; // Get the existing author's ID
					console.log(authorId);
				}

				const genresArray = Array.isArray(args.genres)
					? args.genres
							.join(',')
							.split(',')
							.map((genre) => genre.trim())
					: args.genres.split(',').map((genre) => genre.trim());

				console.log(genresArray);

				const newBook = await Book.create({ ...args, author: authorId, genres: genresArray });
				const result = await Book.findById(newBook._id).populate('author');

				pubsub.publish('BOOK_ADDED', { bookAdded: result });

				return result;
			} catch (error) {
				throw new GraphQLError('Adding Book Failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args,
						error,
					},
				});
			}
		},

		editAuthor: async (obj, args, { currentUser }) => {
			if (!currentUser) {
				throw new GraphQLError('Unauthorized', {
					extensions: {
						code: 'UNAUTHORIZED',
					},
				});
			}
			try {
				const author = await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { new: true });

				return author;
			} catch (error) {
				throw new GraphQLError('Editing Author failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args,
						error,
					},
				});
			}
		},

		createUser: async (root, args) => {
			const user = new User({ username: args.username });

			return user.save().catch((error) => {
				throw new GraphQLError('Creating the user failed', {
					extensions: {
						code: 'BAD_USER_INPUT',
						invalidArgs: args.username,
						error,
					},
				});
			});
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username });

			if (!user || args.password !== 'secret') {
				throw new GraphQLError('wrong credentials', {
					extensions: {
						code: 'BAD_USER_INPUT',
					},
				});
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			};

			return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
		},
	},
	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
		},
	},
};

module.exports = resolvers;
