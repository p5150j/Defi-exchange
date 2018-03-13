import * as restify from 'restify';
const errors = require('restify-errors');

import { Token } from '../db/models/Token.model';

function routes(server:restify.Server) {
	server.get('/tokens', async (req: restify.Request, res: restify.Response, next: restify.Next) => {

		const tokens = await Token.findAll({});
		res.send(tokens);
		next();
	});

	server.get('/tokens/:id', async (req: restify.Request, res: restify.Response, next: restify.Next) => {
		const tokens = await Token.findById(req.params.id);
		if(!tokens) {
			return next(new errors.NotFoundError('oh noes!'));
		}
		res.send(tokens);
		next();
	});

	server.post('/tokens', async (req: restify.Request, res: restify.Response, next: restify.Next) => {
		try {
			const token = await Token.create(req.body);
			res.send(201, token);
			next();
		} catch (error) {
			if(error.errors) {
				res.send(400, error.errors)
			}else {
				next(error.errors);
			}
		}
	});

	server.put('/tokens/:id', async (req: restify.Request, res: restify.Response, next: restify.Next) => {
		try {
			const token = await Token.update(req.body, {where: {id: req.params['id']}});
			res.send(200, token);
			next();
		} catch (error) {
			next(error);
		}
	});
}

export default routes;
