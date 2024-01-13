const express = require('express');
const app = express();
require('express-async-errors');

const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

const blogRouter = require('./controllers/bloglist');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

mongoose.set('strictQuery', false);

mongoose
	.connect(config.MONGODB_URI)
	.then(() => {
		logger.info('connected to MongoDB');
	})
	.catch((error) => {
		logger.error('error connecting to MongoDB:', error.message);
	});

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
	const testingRouter = require('./controllers/testing');
	app.use('/api/testing', testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

// ...
