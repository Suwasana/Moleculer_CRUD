"use strict";

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "testSS",

	/**
	 * Settings
	 */
	settings: {

	},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {

		/**
		 * Say a 'Hello' action.
		 *
		 * @returns
		 */
		hello: {
			rest: {
				method: "GET",
				path: "/hello"
			},
			async handler(ctx) {
				const payload  = `hiii from testSS ${this.broker.nodeID}`
				return payload;

			}
		},
		sayHi: {
			rest: {
				method: "GET",
				path: "/sayHi"
			},
			async handler(ctx) {
				const payload  = `hiii from SayHiiii`
				return payload;

			}
		},


		/**
		 * Welcome, a username
		 *
		 * @param {String} name - User name
		 */
		welcome: {
			rest: "/welcome",
			params: {
				name: "string"
			},
			/**  @param {Context} ctx  */
			async handler(ctx) {
				return `Welcome, ${ctx.params.name}`;
			}
		},

		sayHelloToWorld: {
			rest: "/sayworld",

			 async handler(ctx){
				return "Hello from sayHelloToWorld!!!!! ";
			}
		},

		sayName:{
			method:"POST",
			rest:"/sayname",
			params:{
				name:"string"
			},
			// /**  @param {Context} ctx  */
			async handler(ctx){
				return `Hii ${ctx.params.name} Nice to meet you`;
			}

		}
	},

	/**
	 * Events
	 */
	events: {

	},

	/**
	 * Methods
	 */
	methods: {

	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {

	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {

	}
};
