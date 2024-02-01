const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const jwt = require('jsonwebtoken');
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');
const { GraphQLError } = require('graphql');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log('connecting to', MONGODB_URI);

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log('connected to MongoDB');
	})
	.catch((error) => {
		console.log('error connection to MongoDB:', error.message);
	});

// let authors = [
// 	{
// 		name: 'Robert Martin',
// 		id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
// 		born: 1952,
// 	},
// 	{
// 		name: 'Martin Fowler',
// 		id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
// 		born: 1963,
// 	},
// 	{
// 		name: 'Fyodor Dostoevsky',
// 		id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
// 		born: 1821,
// 	},
// 	{
// 		name: 'Joshua Kerievsky', // birthyear not known
// 		id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
// 	},
// 	{
// 		name: 'Sandi Metz', // birthyear not known
// 		id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
// 	},
// ];

// /*
//  * Suomi:
//  * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
//  * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
//  *
//  * English:
//  * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
//  * However, for simplicity, we will store the author's name in connection with the book
//  *
//  * Spanish:
//  * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
//  * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conección con el libro
//  */

// let books = [
// 	{
// 		title: 'Clean Code',
// 		published: 2008,
// 		author: 'Robert Martin',
// 		id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
// 		genres: ['refactoring'],
// 	},
// 	{
// 		title: 'Agile software development',
// 		published: 2002,
// 		author: 'Robert Martin',
// 		id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
// 		genres: ['agile', 'patterns', 'design'],
// 	},
// 	{
// 		title: 'Refactoring, edition 2',
// 		published: 2018,
// 		author: 'Martin Fowler',
// 		id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
// 		genres: ['refactoring'],
// 	},
// 	{
// 		title: 'Refactoring to patterns',
// 		published: 2008,
// 		author: 'Joshua Kerievsky',
// 		id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
// 		genres: ['refactoring', 'patterns'],
// 	},
// 	{
// 		title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
// 		published: 2012,
// 		author: 'Sandi Metz',
// 		id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
// 		genres: ['refactoring', 'design'],
// 	},
// 	{
// 		title: 'Crime and punishment',
// 		published: 1866,
// 		author: 'Fyodor Dostoevsky',
// 		id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
// 		genres: ['classic', 'crime'],
// 	},
// 	{
// 		title: 'The Demon ',
// 		published: 1872,
// 		author: 'Fyodor Dostoevsky',
// 		id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
// 		genres: ['classic', 'revolution'],
// 	},
// ];

const typeDefs = `

type Author {
	name: String!
	born: Int
	bookCount: Int
	_id: ID!
}

type Book {
	title: String!
	author: Author!
	published: Int!
	genres: [String]!
}

type User {
	username: String!
	favoriteGenre: String!
	id: ID!
  }

  type Token {
	value: String!
  }

  type Query {
    bookCount: Int
	authorCount: Int
	allBooks(genre: String, author: String): [Book!]!
	allAuthors: [Author!]!
	me: User
  }

  type Mutation {
	addBook(
		title: String!
	author: String!
	published: Int!
	genres: [String]!
	): Book
	editAuthor(name: String!, setBornTo: Int!): Author
	createUser(
		username: String!
	  ): User
	  login(
		username: String!
		password: String!
	  ): Token
  }
`;

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
				const authors = await Author.find({});
				const books = await Book.find({}).populate('author');
				const result = authors.map((author) => {
					const authorBooks = books.filter((book) => book.author.name === author.name);
					return {
						...author.toObject(),
						bookCount: authorBooks.length,
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
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

startStandaloneServer(server, {
	listen: { port: 4000 },

	context: async ({ req, res }) => {
		const auth = req ? req.headers.authorization : null;
		if (auth && auth.startsWith('Bearer ')) {
			const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
			const currentUser = await User.findById(decodedToken.id);
			return { currentUser };
		}
	},
}).then(({ url }) => {
	console.log(`Server ready at ${url}`);
});
