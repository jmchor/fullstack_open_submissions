import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
import axios from 'axios';

jest.mock('axios');

const blog = {
	title: 'BlogTest with Jest',
	author: 'jmchor',
	url: 'www.google.mo',
	likes: 2024,
	user: user,
	id: '9rb0eac585b0921fc47bc329',
};

const updateLikes = jest.fn();
const updateBlogsAfterDeletion = jest.fn();

const user = {
	username: 'asdjasdj',
	id: '659d53f65c0cbaafb432cd17',
	name: 'Jalapeno',
	token: 'token',
};

test('renders content', () => {
	render(
		<Blog blog={blog} updateBlogsAfterDeletion={updateBlogsAfterDeletion} updateLikes={updateLikes} user={user} />
	);

	const element = screen.getByTestId('blogtest');
});

test('shows details on button click', async () => {
	const { container } = render(
		<Blog blog={blog} updateBlogsAfterDeletion={updateBlogsAfterDeletion} updateLikes={updateLikes} user={user} />
	);

	const user = userEvent.setup();
	const button = screen.getByText('Show');
	user.click(button);

	// Wait for the additional details to appear
	await waitFor(() => {
		const likes = container.querySelector('#likes');
		const url = container.querySelector('#url');
		expect(likes).toBeDefined();
		expect(url).toBeDefined();
	});
});

test('clicking the like button works', async () => {
	const mockHandler = jest.fn();

	const component = render(
		<Blog blog={blog} updateLikes={mockHandler} updateBlogsAfterDeletion={updateBlogsAfterDeletion} user={user} />
	);
	const user = userEvent.setup();

	const showButton = component.getByText('Show');
	await user.click(showButton);

	const button = component.getByText('Like');
	axios.put.mockResolvedValueOnce({ blog });
	await user.click(button);

	axios.put.mockResolvedValueOnce({ blog });
	user.click(button);

	await waitFor(() => {
		expect(mockHandler).toHaveBeenCalledTimes(2);
	});
});
