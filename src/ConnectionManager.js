var EventEmitter = require('events').EventEmitter;

var ClientConnection = require('./ClientConnection');
var HostConnection = require('./HostConnection');
var Identity = require('./Identity');
const UserStore = require('./UserStore');

var connection = null;
var emitter = new EventEmitter();

function setupConnection(conn, n) {
	conn.onReady(function() {
		connection = conn;
		emitter.emit('status');
	});

	conn.onMessage(function(msg) {
		emitter.emit('message', msg);
	});
}

function createPacket(message) {
	return Object.assign({
		from: Identity.get()
	}, message);
}

module.exports = {
	isConnected: function() {
		return connection !== null;
	},

	sendMessage: function(message) {
		connection.send(createPacket(message));
	},

	sendTo: function(peer, message) {
		peer.send(createPacket(message));
	},

	onMessage: function(cb) {
		emitter.on('message', cb);
	},

	onStatusChange: function(cb) {
		emitter.on('status', cb);
	},

	offMessage: function(cb) {
		emitter.off('message', cb);
	},

	offStatusChange: function(cb) {
		emitter.off('status', cb);
	},

	host: function() {
		const conn = HostConnection();
		setupConnection(conn);
		conn.onNewPeer(peer => {
			//user list does not include self, but in this case
			//the host should tell the connected peer their identity
			//as well, so we include it within the user listing
			this.sendTo(peer, {
				type: 'users',
				users: UserStore.getUsers().concat([Identity.get()])
			});
		});
	},

	join: function() {
		var conn = ClientConnection();
		setupConnection(conn);

		conn.onReady(() => {
			this.sendMessage({
				type: 'join'
			});
		});
	}
};
