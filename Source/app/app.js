var React = require('react');
var ReactDOM = require('react-dom');
var Hello = require('./components/Hello');
var Chao = require('./components/Chao');

ReactDOM.render(
    <div>
	    <Hello/>
	    <Chao/>
	</div>
,document.getElementById('root')
);
