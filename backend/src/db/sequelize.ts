import {Sequelize} from 'sequelize-typescript';

const sequelize =  new Sequelize({
	database: process.env.MYSQL_DATABASE,
	dialect: 'mysql',
	username: 'root',
	password: process.env.MYSQL_ROOT_PASSWORD,
	host: process.env.MYSQL_HOST,
	operatorsAliases: false
	// modelPaths: [__dirname + '/models']
});

sequelize.addModels([__dirname + '/**/*.model.ts']);

export default sequelize;
