import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateForm from './CreateForm';

describe('CreateForm', () => {
	test('submits the form', async () => {
		const createMock = jest.fn();
		const setSuccessMessageMock = jest.fn();
		const setErrorMessageMock = jest.fn();
		const setBlogsMock = jest.fn();
		const blogFormRefMock = { current: { toggleVisibility: jest.fn() } };

		const blog = {
			title: 'BlogTest with Jest',
			author: 'jmchor',
			url: 'www.google.mo',
		};

		const { container, getByText } = render(
			<CreateForm
				create={createMock}
				setSuccessMessage={setSuccessMessageMock}
				setErrorMessage={setErrorMessageMock}
				setBlogs={setBlogsMock}
				blogFormRef={blogFormRefMock}
			/>
		);

		const title = container.querySelector('#title');
		const author = container.querySelector('#author');
		const url = container.querySelector('#url');
		const createButton = container.querySelector('button[type="submit"]');

		fireEvent.change(title, { target: { value: blog.title } });
		fireEvent.change(author, { target: { value: blog.author } });
		fireEvent.change(url, { target: { value: blog.url } });

		fireEvent.click(createButton);

		await waitFor(() => {
			expect(createMock).toHaveBeenCalledWith({
				title: blog.title,
				author: blog.author,
				url: blog.url,
			});

			expect(blogFormRefMock.current.toggleVisibility).toHaveBeenCalled();
		});
	});
});
