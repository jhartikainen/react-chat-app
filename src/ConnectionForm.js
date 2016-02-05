var React = require('react');

module.exports = React.createClass({
	render: function() {
		return <div>
			{this.props.connected ? 'Connected' : 'Not connected'}
			<button onClick={this.props.onHost}>Host</button>
			<button onClick={this.props.onJoin}>Join</button>
		</div>;
	}
});
