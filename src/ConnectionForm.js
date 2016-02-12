var React = require('react');

module.exports = React.createClass({
	getInitialState: () => ({ name: '' }),

	updateName: function(ev) {
		this.setState({
			name: ev.target.value
		});
	},

	handleButton: function(type) {
		this.props[type](this.state.name);
	},

	render: function() {
		return <div>
			{this.props.connected ? 'Connected' : 'Not connected'}
			<input value={this.state.name} onChange={this.updateName} type="text" placeholder="Name" />
			<button onClick={this.handleButton.bind(this, 'onHost')}>Host</button>
			<button onClick={this.handleButton.bind(this, 'onJoin')}>Join</button>
		</div>;
	}
});
