var React = require('react');

var MessageList = require('./MessageList');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			input: '',
			messages: []
		};
	},

	submit: function(ev) {
		ev.preventDefault();

		var newMessage = this.state.input;

		this.setState({
			messages: this.state.messages.concat([newMessage]),
			input: ''
		});
	},

	updateInput: function(ev) {
		this.setState({ input: ev.target.value });
	},

	render: function() {
		return <div>
			<MessageList messages={this.state.messages} />
			<form onSubmit={this.submit}>
				<input value={this.state.input} onChange={this.updateInput} type="text" />
				<input type="submit" value="Send" />
			</form>
		</div>;
	}
});


