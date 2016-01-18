var React = require('react');

var ChatMessage = require('./ChatMessage');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			input: '',
			messages: []
		};
	},

	submit: function(ev) {
		ev.preventDefault();

		var newMessage = <ChatMessage message={this.state.input} />;

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
			<div>{this.state.messages}</div>
			<form onSubmit={this.submit}>
				<input value={this.state.input} onChange={this.updateInput} type="text" />
				<input type="submit" value="Send" />
			</form>
		</div>;
	}
});


