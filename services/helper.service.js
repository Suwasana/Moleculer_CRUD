const { ServiceBroker } = require("moleculer");
const broker = new ServiceBroker();
require('dotenv').config();

const DbService = require("moleculer-db");
const SqlAdapter = require("moleculer-db-adapter-sequelize");
const Sequelize = require("sequelize");




module.exports = {
	name:"helper",
	mixins : [DbService],
	adapter: new SqlAdapter(process.env.DB_NAME, process.env.USER_NAME, process.env.PASSWORD, {
		host: 'localhost',
		dialect:'postgres' , /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
	  }),
	model: {
        name: "post",
        define: {
            title: Sequelize.STRING,
            content: Sequelize.TEXT,
            votes: Sequelize.INTEGER,
            author: Sequelize.INTEGER,
            status: Sequelize.BOOLEAN
        },
        options: {
            // Options from http://docs.sequelizejs.com/manual/tutorial/models-definition.html
        }
    },
	actions:{

		random(){
			return Math.round(Math.random()*10);
		},

		helperMath:{
			rest: "/helperMath",

			async handler(ctx){
				// const res  = await broker.call("this.helper.random");
				const res = await ctx.call("helper.random");
				return "say hii from helperMath " + res;
			}
		},

		createDbConnection: {
			rest:{
				method:"GET",
				path : "/connectionEstablishs"
			},
			async handler(ctx){
				console.log("in createDbConnection ")

				try {
					await adapter.authenticate();
					console.log('Connection has been established successfully.');
					console.log(process.env.DB_NAME);
					console.log(process.env.USER_NAME);
					console.log(process.env.PASSWORD);

				  } catch (error) {
					console.log ('Unable to connect to the database:', error);
				  }
			}

		},
		againSayHi :{
			rest : "/again",

			async handler(ctx){
				return "Again Say Hii";
			}
		},

		postData : {
			rest: {
				method : "POST",
				rest : "/postData"
			},
			params:{
				// _title: "string",
				// _content:"string",
				// _votes: "string",
				// _status:"string"

			},

			async handler (ctx){

				// const res = await this.adapter.insert({ title: ctx.params.title, content: ctx.params.content, votes: ctx.params.votes, status: ctx.params.status,});
				const x = {title, content} = ctx.params
				const res = await this.adapter.insert(x);
				console.log("X = " + x.votes);
				console.log({title, content});

				return "Completed";

			}

		},
		getData:{
			rest: {
				method : "GET",
				rest : "/getData"
			},
			params:{
				// _title: "string",
				// _content:"string",
				// _votes: "string",
				// _status:"string"

			},

			async handler (ctx){

				// const res = await this.adapter.insert({ title: ctx.params.title, content: ctx.params.content, votes: ctx.params.votes, status: ctx.params.status,});
				return this.adapter.find();

			}

		},
		getDataById:{
			rest: {
				method : "GET",
				rest : "/getDataById"
			},
			params:{
				// _title: "string",
				// _content:"string",
				// _votes: "string",
				// _status:"string"

			},

			async handler (ctx){

				// const res = await this.adapter.insert({ title: ctx.params.title, content: ctx.params.content, votes: ctx.params.votes, status: ctx.params.status,});
				return this.adapter.findById(ctx.params.id);

			}

		},
		removeData:{
			rest: {
				method : "DELETE",
				rest : "/removeData"
			},
			params:{
				// _title: "string",
				// _content:"string",
				// _votes: "string",
				// _status:"string"

			},

			async handler (ctx){

				// const res = await this.adapter.insert({ title: ctx.params.title, content: ctx.params.content, votes: ctx.params.votes, status: ctx.params.status,});
				return this.adapter.removeById(2);

			}
		},
		updateData:{
			rest: {
				method : "PUT",
				rest : "/updateData"
			},
			params:{
				// _title: "string",
				// _content:"string",
				// _votes: "string",
				// _status:"string"

			},

			async handler (ctx){

				// const res = await this.adapter.insert({ title: ctx.params.title, content: ctx.params.content, votes: ctx.params.votes, status: ctx.params.status,});
				return this.adapter.updateById(3,{ $set:{
					title: "Last 33",
					status: true
				}});


			}

		}



	},

	events:{
		"hello.called"(payload){
			this.logger.info("Helper Service Caught an event");
			this.logger.info(payload);
		}
	}
}
