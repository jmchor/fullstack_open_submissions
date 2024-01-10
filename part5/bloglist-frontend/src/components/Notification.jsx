const Notification = ({ errorMessage, successMessage }) => {
	if (errorMessage === null && successMessage === null) {
		return null;
	}

	const errorStyles = {
		backgroundColor: 'lightgrey',
		border: '2px solid red',
		color: 'red',
		borderRadius: '5px',
		width: 'fit-content',
		padding: '20px 10px',
	};
	const successStyles = {
		backgroundColor: 'lightgrey',
		border: '2px solid green',
		color: 'green',
		borderRadius: '5px',
		width: 'fit-content',
		padding: '20px 10px',
	};

	return (
		<>
			{!errorMessage && successMessage ? (
				<div style={successStyles}>{successMessage}</div>
			) : (
				<div style={errorStyles}>{errorMessage}</div>
			)}
		</>
	);
};

export default Notification;
