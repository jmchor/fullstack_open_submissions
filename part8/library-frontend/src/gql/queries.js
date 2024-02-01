import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
	query AllAuthors {
		allAuthors {
			born
			name
			_id
		}
	}
`;

export const ALL_BOOKS = gql`
	query AllBooks($genreToSearch: String) {
		allBooks(genre: $genreToSearch) {
			author {
				name
				born
			}
			published
			title
			genres
		}
	}
`;

export const CURRENT_USER = gql`
	query me {
		me {
			username
			id
			favoriteGenre
		}
	}
`;

export const BOOK_ADDED = gql`
	subscription {
		bookAdded {
			title
			published
			author {
				name
				_id
				born
			}
			genres
		}
	}
`;
