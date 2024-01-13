describe('blog app', function () {
	beforeEach(function () {
		cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
		const user = {
			name: 'Member',
			username: 'Johannes',
			password: 'swordfish',
		};
		cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
		const secondUser = {
			name: 'Member',
			username: 'Alan',
			password: 'fishsword',
		};
		cy.request('POST', `${Cypress.env('BACKEND')}/users`, secondUser);

		cy.visit('');
	});
	it('front page can be opened', function () {
		cy.contains('blogs');
		cy.contains('All them blogs');
	});

	it('login form is shown', function () {
		cy.contains('login');
	});

	it('login fails with wrong password', function () {
		cy.contains('log in').click();
		cy.get('#username').type('Johannes');
		cy.get('#password').type('wrong');
		cy.get('#login-button').click();

		cy.get('.error')
			.should('contain', 'Wrong credentials')
			.and('have.css', 'color', 'rgb(255, 0, 0)')
			.and('have.css', 'border-style', 'solid');

		cy.get('html').should('not.contain', 'Johannes logged in');
	});

	it('user can log in', function () {
		cy.contains('log in').click();
		cy.get('#username').type('Johannes');
		cy.get('#password').type('swordfish');
		cy.get('#login-button').click();

		cy.contains('Johannes logged in');
	});

	describe('when logged in', function () {
		beforeEach(function () {
			cy.login({ username: 'Johannes', password: 'swordfish' });
		});

		it('logged in user can create a new blog', function () {
			cy.get('#toggle').click();
			cy.get('#title').type('Cypress Test Blog');
			cy.get('#author').type('Cyprus');
			cy.get('#url').type('https://cypress.go');
			cy.get('#create-button').click();
			cy.contains('Cypress Test Blog by Cyprus');
		});

		describe('and a blog exists', function () {
			beforeEach(function () {
				cy.createBlog({ title: 'Cypress Test Blog', author: 'Cyprus', url: 'https://cypress.go' });
			});

			it('users can like a blog', function () {
				cy.contains('Cypress Test Blog by Cyprus');
				cy.get('#toggleShow').click();
				cy.contains('Likes 0');
				cy.get('#like-button').click();
				cy.contains('Likes 1');
			});

			it('a blog can be deleted by user who created it', function () {
				cy.contains('Cypress Test Blog by Cyprus');
				cy.get('#toggleShow').click();
				cy.get('#deleteButton').click();
				cy.on('window:confirm', () => true);

				cy.contains('All them blogs').should('not.contain', 'Cypress Test Blog by Cyprus');
			});
		});
	});

	describe('Only blog creator can see remove button', function () {
		beforeEach(function () {
			cy.login({ username: 'Johannes', password: 'swordfish' });
			cy.createBlog({
				title: 'Swordfish blog',
				author: 'Swordfish',
				url: 'www.swordfish.sw',
			});

			cy.login({ username: 'Alan', password: 'fishsword' });
			cy.createBlog({
				title: 'Fishsword blog',
				author: 'Fishsword',
				url: 'www.fishword.dev',
			});
		});

		it('Removing the blog', function () {
			cy.contains('Swordfish blog by Swordfish').parent().find('button').should('contain', 'Show').click();
			cy.contains('Swordfish blog by Swordfish').parent().parent().find('button').should('not.contain', 'remove');
		});

		it('blogs are in descending order by likes', function () {
			cy.contains('Swordfish blog by Swordfish').parent().find('button').should('contain', 'Show').click();
			cy.get('#like-button');
			cy.get('.themBlogs').eq(0).should('contain', 'Swordfish blog by Swordfish');
			cy.get('.themBlogs').eq(1).should('contain', 'Fishsword blog by Fishsword');
		});
	});
});
