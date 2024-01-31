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
	query AllBooks {
		allBooks {
			author {
				name
				born
				_id
			}
			published
			title
		}
	}
`;
