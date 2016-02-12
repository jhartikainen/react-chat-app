const Identity = require('./Identity');
var EventEmitter = require('events').EventEmitter;

var emitter = new EventEmitter();

var messages = [];

module.exports = {
	getMessages: function() {
		return messages.concat();
	},

	subscribe: function(callback) {
		emitter.on('update', callback);
	},

	unsubscribe: function(callback) {
		emitter.off('update', callback);
	},

	newMessage: function(message) {
		messages.push(Object.assign({
			from: Identity.get()
		}, message));
		emitter.emit('update');
	}
};
