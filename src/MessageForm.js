var React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			input: ''
		};
	},

	submit: function(ev) {
		ev.preventDefault();

		this.props.onSend({
			type: 'message',
			message: this.state.input
		});

		this.setState({
			input: ''
		});
	},

	updateInput: function(ev) {
		this.setState({ input: ev.target.value });
	},

	render: function() {
		return <form onSubmit={this.submit}>
			<input value={this.state.input} onChange={this.updateInput} type="text" />
			<input type="submit" value="Send" />
		</form>;
	}
});
