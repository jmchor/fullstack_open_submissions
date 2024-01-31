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
				_id
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
