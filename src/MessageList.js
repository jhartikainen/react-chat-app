var React = require('react');

var ChatMessage = require('./ChatMessage');
var JoinMessage = require('./JoinMessage');

function createMessage(msg) {
	if(msg.type === 'message') {
		return <ChatMessage {...msg} />;
	}
	else if(msg.type === 'join') {
		return <JoinMessage name={msg.from} />;
	}
}

module.exports = ({ messages }) => <div>
		{messages.map(createMessage)}
	</div>;
