import { useContext } from 'react';
import AnecdoteContext from '../AnecdoteContext';

const Notification = () => {
	const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1,
		marginBottom: 5,
	};

	const [notification, dispatch] = useContext(AnecdoteContext);

	let timeoutId;

	if (notification) {
		// Set a timeout to hide the notification after the specified duration
		timeoutId = setTimeout(() => {
			dispatch({ type: 'CLEAR' });
		}, notification.duration);
		return <div style={style}>{notification.message}</div>;
	}

	if (!notification) return null;
};

export default Notification;
