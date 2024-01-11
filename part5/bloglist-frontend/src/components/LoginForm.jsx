const LoginForm = ({ handleLogin, handleUsernameChange, handlePasswordChange, username, password }) => {
	return (
		<form className='formStyles' onSubmit={handleLogin}>
			<label htmlFor='username'>username</label>
			<input type='text' name='username' id='username' value={username} onChange={handleUsernameChange} />
			<label htmlFor='password'>password</label>
			<input type='password' name='password' id='password' value={password} onChange={handlePasswordChange} />

			<button type='submit'>login</button>
		</form>
	);
};

export default LoginForm;
