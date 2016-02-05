var SimplePeer = require('simple-peer');
var SimpleWebsocket = require('simple-websocket');
var EventEmitter = require('events').EventEmitter;

var emitter = new EventEmitter();

module.exports = function() {
	var socket = new SimpleWebsocket('ws://localhost:3210');
	var rtc;
	socket.on('close', function() { console.log('Socket closed'); });
	socket.on('error', function(err) { console.log('Socket error'); console.log(err); });

	socket.on('connect', function() {
		rtc = new SimplePeer({ initiator: true, trickle: false });
		rtc.on('signal', function(data) {
			socket.send(data);
		});

		socket.on('data', function(data) {
			rtc.signal(data);
		});

		rtc.on('connect', function() {
			emitter.emit('connected');
			//we no longer need the signaler
			socket.destroy();
		});

		rtc.on('data', function(message) {
			emitter.emit('message', message);
		});
	});

	return {
		onReady: function(callback) {
			emitter.on('connected', callback);
		},

		send: function(message) {
			rtc.send(message);
		},

		onMessage: function(cb) {
			emitter.on('message', cb);
		}
	};
};
