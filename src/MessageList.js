var React = require('react');

var ChatMessage = require('./ChatMessage');

module.exports = React.createClass({
	render: function() {
		var messages = this.props.messages.map(function(msg) {
			return <ChatMessage message={msg} />;
		});

		return <div>{messages}</div>;
	}
});
