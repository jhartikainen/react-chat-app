const React = require('react');

module.exports = ({ users }) => <ul>
		{users.map(u => <li>{u}</li>)}
	</ul>;
