import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
	query AllAuthors {
		allAuthors {
			born
			name
		}
	}
`;

export const ALL_BOOKS = gql`
	query AllBooks {
		allBooks {
			author
			published
			title
		}
	}
`;
