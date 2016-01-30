var React = require('react');

var MessageList = require('./MessageList');
var MessageForm = require('./MessageForm');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			messages: []
		};
	},

	onSend: function(newMessage) {
		this.setState({
			messages: this.state.messages.concat([newMessage]),
		});
	},

	render: function() {
		return <div>
			<MessageList messages={this.state.messages} />
			<MessageForm onSend={this.onSend} />
		</div>;
	}
});


