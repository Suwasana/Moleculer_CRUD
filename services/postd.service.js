const { ServiceBroker } = require("moleculer");
const DbService = require("moleculer-db");
const SqlAdapter = require("moleculer-db-adapter-sequelize");
const Sequelize = require("sequelize");
const broker = new ServiceBroker();

const sequelize = new Sequelize('test-01-for-molecular', 'suwasana', 'Damm1thu#', {
	host: 'localhost',
	dialect:'postgres' , /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });


module.exports = {
	name:"postd",
	action:{
		createDbConnection: {
			rest: "/connectionEstablish",
			async handler(ctx){
				try {
					await sequelize.authenticate();
					return 'Connection has been established successfully.';
				  } catch (error) {
					return ('Unable to connect to the database:', error);
				  }
			}

		},
		helperMath:{
			// rest: "/helperMath",

			async handler(ctx){
				// const res  = await broker.call("this.helper.random");

				return "say hii from helperMath " ;
			}
		}

	}
}
