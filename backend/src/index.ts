import * as restify from 'restify';
import * as bunyan from 'bunyan';
import * as PrettyStream from 'bunyan-prettystream-circularsafe';


import sequelize from './db/sequelize';
import * as corsMiddleware from 'restify-cors-middleware';

import tokenRoutes from './routes/tokens.routes';

(async () => {
	await sequelize.sync({force: false});

	const cors = corsMiddleware({
		origins: ['*'], // @TODO insecure
		allowHeaders: ['Authorization'],
		// exposeHeaders: ['API-Token-Expiry']
	});

	const server = restify.createServer();
	server.pre(restify.plugins.pre.strictQueryParams());
	server.pre(restify.plugins.pre.dedupeSlashes());

	server.pre(cors.preflight);
	server.use(cors.actual);

	server.use(restify.plugins.queryParser());
	server.use(restify.plugins.bodyParser());
	server.use(restify.plugins.acceptParser(server.acceptable));
	server.use(restify.plugins.gzipResponse());


	server.use(restify.plugins.requestLogger({}));

	const prettyStdOut = new PrettyStream();
	prettyStdOut.pipe(process.stdout);

	const log = bunyan.createLogger({
		event: 'pre',
		name: 'myLogger',
		streams: [{
			level: 'debug',
			type: 'raw',
			stream: prettyStdOut
		}]
	});

	server.on('after', restify.plugins.auditLogger({
		log: log,
		event: 'pre',
		printLog: true
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
