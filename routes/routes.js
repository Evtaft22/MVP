const { Router } = require('express');
const { lyricsRouter } = require('./lyrics');
const { usersRouter } = require('./users');

const apiRouter = Router();

apiRouter.use('/lyrics', lyricsRouter);
apiRouter.use('/users', usersRouter);

module.exports.apiRouter = apiRouter;