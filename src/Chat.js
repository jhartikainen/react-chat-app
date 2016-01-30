var React = require('react');

var MessageList = require('./MessageList');
var MessageForm = require('./MessageForm');
var MessageStore = require('./MessageStore');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			messages: MessageStore.getMessages()
		};
	},

	componentWillMount: function() {
		MessageStore.subscribe(this.updateMessages);
	},

	componentWillUnmount: function() {
		MessageStore.unsubscribe(this.updateMessages);
	},

	updateMessages: function() {
		this.setState({
			messages: MessageStore.getMessages()
		});
	},

	onSend: function(newMessage) {
		MessageStore.newMessage(newMessage);
	},

	render: function() {
		return <div>
			<MessageList messages={this.state.messages} />
			<MessageForm onSend={this.onSend} />
		</div>;
	}
});


