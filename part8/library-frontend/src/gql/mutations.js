import { gql } from '@apollo/client';

export const ADD_BOOK = gql`
	mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String]!) {
		addBook(title: $title, author: $author, published: $published, genres: $genres) {
			author {
				name
				born
				_id
			}
			genres
			published
			title
		}
	}
`;

export const EDIT_BIRTHYEAR = gql`
	mutation EDIT_BIRTHYEAR($name: String!, $setBornTo: Int!) {
		editAuthor(name: $name, setBornTo: $setBornTo) {
			born
			name
		}
	}
`;

export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`;
