import {Model, DataType, Column, Table, AllowNull, Scopes, CreatedAt, Length} from "sequelize-typescript";


@Scopes({
	// movies: {
	// 	include: [
	// 		{
	// 			model: () => Movie,
	// 			through: {attributes: []},
	// 		},
	// 	],
	// },
})
@Table({
	tableName: 'tokens',
	updatedAt: false
})
export class Token extends Model<Token> {


	@Length({max: 50})
	@AllowNull(false)
	@Column({
		primaryKey: true,
		autoIncrement: false,
		type: DataType.STRING(50)
	})
	address: string;

	@Length({max: 50})
	@AllowNull(false)
	@Column(DataType.STRING(50))
	symbol: string;

	@AllowNull(false)
	@Column
	decimals: number;

	@AllowNull(false)
	@Length({max: 200})
	@Column(DataType.STRING(200))
	name: string;

	@AllowNull(false)
	@Column
	zeroex_official: boolean;

	@AllowNull(false)
	@Column
	deprecated: boolean;

	@AllowNull(false)
	@Column
	quote: boolean;

	@AllowNull(false)
	@Column
	active: boolean;

	@CreatedAt
	@AllowNull(false)
	@Column(DataType.DATE)
	created_date: Date;


	static scope(name: string = 'defaultScope'): typeof Token {
		return super.scope.call(this, name);
	}
}
