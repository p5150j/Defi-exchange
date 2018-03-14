import {Sequelize} from 'sequelize-typescript';

const sequelize =  new Sequelize({
	database: <string> process.env.MYSQL_DATABASE,
	dialect: 'mysql',
	username: 'root',
	password: <string> process.env.MYSQL_ROOT_PASSWORD,
	host: <string> process.env.MYSQL_HOST,
	operatorsAliases: false
	// modelPaths: [__dirname + '/models']
});

sequelize.addModels([__dirname + '/**/*.model.ts']);

export default sequelize;
