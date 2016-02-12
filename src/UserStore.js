const EventEmitter = require('events').EventEmitter;

const emitter = new EventEmitter();

const users = [];

module.exports = {
	handleMessage: function(message) {
		if(message.type === 'join') {
			users.push(message.from);
			emitter.emit('update');
		}
		else if(message.type === 'users') {
			users.length = 0;
			users.push.apply(users, message.users);
			emitter.emit('update');
		}
	},

	getUsers: function() {
		return users.concat();
	},

	subscribe: function(callback) {
		emitter.on('update', callback);
	},

	unsubscribe: function(callback) {
		emitter.off('update', callback);
	}
};
