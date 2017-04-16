var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router
var Trangchu = require('./components/Trangchu');
var Lichsu_lop6_baihoc = require('./components/Lichsu_lop6_baihoc');
var Lichsu_lop6_baitapnangcao = require('./components/Lichsu_lop6_baitapnangcao');
var Lichsu_lop6_thaoluan = require('./components/Lichsu_lop6_thaoluan');

var { Router,
      Route,
      IndexRoute,
      IndexLink,
      hashHistory,
      Link } = ReactRouter;

ReactDOM.render(
	<Router history={hashHistory}>	  	
		<Route path="/" component={Trangchu}/>
	  	<Route path="Lichsu_lop6_baihoc" component={Lichsu_lop6_baihoc}/>
	 	<Route path="Lichsu_lop6_baitapnangcao" component={Lichsu_lop6_baitapnangcao} />
	 	<Route path="Lichsu_lop6_thaoluan" component={Lichsu_lop6_thaoluan} />
	</Router>
,document.getElementById('noidungchinh')
);