var React = require('react');

var MessageList = require('./MessageList');
var MessageForm = require('./MessageForm');
const UserList = require('./UserList');
var MessageStore = require('./MessageStore');
const UserStore = require('./UserStore');
const Identity = require('./Identity');
var ConnectionManager = require('./ConnectionManager');
var ConnectionForm = require('./ConnectionForm');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			messages: MessageStore.getMessages(),
			connected: ConnectionManager.isConnected(),
			users: UserStore.getUsers()
		};
	},

	componentWillMount: function() {
		MessageStore.subscribe(this.updateMessages);
		UserStore.subscribe(this.updateUsers);
		ConnectionManager.onStatusChange(this.updateConnection);
		ConnectionManager.onMessage(this.handleMessage);
	},

	componentWillUnmount: function() {
		MessageStore.unsubscribe(this.updateMessages);
		UserStore.unsubscribe(this.updateUsers);
		ConnectionManager.offStatusChange(this.updateConnection);
		ConnectionManager.offMessage(this.handleMessage);
	},

	handleMessage: function(message) {
		MessageStore.newMessage(message);
		UserStore.handleMessage(message);
	},

	updateUsers: function() {
		this.setState({
			users: UserStore.getUsers()
		});
	},

	updateMessages: function() {
		this.setState({
			messages: MessageStore.getMessages()
		});
	},

	updateConnection: function() {
		this.setState({
			connected: ConnectionManager.isConnected()
		});
	},

	onSend: function(newMessage) {
		ConnectionManager.sendMessage(newMessage);
		MessageStore.newMessage(newMessage);
	},

	handleConnectionForm: function(type, name) {
		Identity.set(name);
		ConnectionManager[type]();
	},

	render: function() {
		return <div>
			<MessageList messages={this.state.messages} />
			<UserList users={this.state.users} />
			<MessageForm onSend={this.onSend} />
			<ConnectionForm
				connected={this.state.connected}
				onHost={this.handleConnectionForm.bind(this, 'host')}
				onJoin={this.handleConnectionForm.bind(this, 'join')}
				/>
		</div>;
	}
});


