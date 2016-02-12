var SimplePeer = require('simple-peer');
var SimpleWebsocket = require('simple-websocket');
var EventEmitter = require('events').EventEmitter;

var peers = [];
var emitter = new EventEmitter();

module.exports = function() {
	var socket = new SimpleWebsocket('ws://localhost:3210');
	socket.on('close', function() { console.log('Socket closed'); });
	socket.on('error', function(err) { console.log('Socket error'); console.log(err); });
	socket.on('connect', function() { console.log('Connected'); });

	socket.on('data', function(data) {
		var rtc = new SimplePeer({ initiator: false, trickle: false });

		rtc.signal(data);
		rtc.on('signal', function(data) {
			socket.send(data);
		});

		rtc.on('connect', function() {
			peers.push(rtc);
			emitter.emit('new-peer', rtc);
		});

		rtc.on('data', function(msg) {
			emitter.emit('message', msg);

			//as host, we need to broadcast the data to the other peers
			peers.forEach(function(p) {
				if(p === rtc) {
					return;
				}

				p.send(msg);
			});
		});
	});

	return {
		onReady: function(callback) {
			//the host is always "ready" although it may
			//not have any clients
			callback();
		},

		send: function(message) {
			peers.forEach(function(p) { p.send(message); });
		},

		onMessage: function(callback) {
			emitter.on('message', callback);
		},

		onNewPeer: function(callback) {
			emitter.on('new-peer', callback);
		}
	};
};
