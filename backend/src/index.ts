import * as restify from 'restify';
import * as bunyan from 'bunyan';

import sequelize from './db/sequelize';

import tokenRoutes from './routes/tokens.routes';

(async () => {
	await sequelize.sync({force: false});

	const server = restify.createServer();
	server.pre(restify.plugins.pre.strictQueryParams());
	server.pre(restify.plugins.pre.dedupeSlashes());

	server.use(restify.plugins.queryParser());
	server.use(restify.plugins.bodyParser());
	server.use(restify.plugins.acceptParser(server.acceptable));
	server.use(restify.plugins.gzipResponse());


	server.use(restify.plugins.requestLogger({}));
	server.on('after', restify.plugins.auditLogger({
		log: bunyan.createLogger({
			name: 'audit',
			stream: process.stdout
		}),
		event: 'after'
		// server: SERVER,
		// logMetrics : logBuffer,
		// printLog : true
	}));

	// server.on('restifyError', function (req, res, err, cb) {
	// 	if(err.errors) {
	// 		err.toJSON = function toJSON() {
	// 			return {
	// 				message: 'an internal server error occurred!',
	// 				code: 'boom!'
	// 			}
	// 		};
	// 	}
	// 	return cb();
	// });


	tokenRoutes(server);

	server.listen(process.env.API_PORT, () =>console.log('%s listening at %s', server.name, server.url) );
})();
