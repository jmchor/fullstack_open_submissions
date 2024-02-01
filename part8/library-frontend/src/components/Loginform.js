import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../gql/mutations';

const LoginForm = ({ setError, setToken }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const [login, { data }] = useMutation(LOGIN, {
		onError: (error) => {
			setError(error.graphQLErrors[0].message);
		},
	});

	useEffect(() => {
		if (data) {
			const token = data.login.value;
			setToken(token);
			localStorage.setItem('library-user-token', token);
		}
	}, [data]);

	const submit = async (event) => {
		event.preventDefault();

		login({ variables: { username, password } });
	};

	return (
		<div>
			<form onSubmit={submit}>
				<div>
					username <input value={username} onChange={(e) => setUsername(e.target.value)} />
				</div>
				<div>
					password <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
				</div>
				<button type='submit'>login</button>
			</form>
		</div>
	);
};

export default LoginForm;
