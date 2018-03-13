import {Sequelize} from 'sequelize-typescript';

const sequelize =  new Sequelize({
	database: 'chainin',
	dialect: 'mysql',
	username: 'root',
	password: 'HrAgMJ&Jc37^zMr(',
	host: 'localhost',
	operatorsAliases: false
	// modelPaths: [__dirname + '/models']
});

sequelize.addModels([__dirname + '/**/*.model.ts']);

export default sequelize;
