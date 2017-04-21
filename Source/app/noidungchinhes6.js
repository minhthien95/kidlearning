import React from "react";
import {render} from "react-dom";
import PropTypes from 'prop-types'; 
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import {Trangchu} from "./components/Trangchu";
import {Lichsu_lop6_baihoc} from "./components/Lichsu_lop6_baihoc";
import {Lichsu_lop6_baitapnangcao} from './components/Lichsu_lop6_baitapnangcao';
import {Lichsu_lop6_thaoluan} from './components/Lichsu_lop6_thaoluan';

class Noidungchinhes6 extends React.Component {
  render(){
    return (
    	<Router history={hashHistory}>
    	<div>
		  	<Route path="/" component={Trangchu}/>
		  	<Route path="Lichsu_lop6_baihoc" component={Lichsu_lop6_baihoc}/>
		 	<Route path="Lichsu_lop6_baitapnangcao" component={Lichsu_lop6_baitapnangcao} />
		 	<Route path="Lichsu_lop6_thaoluan" component={Lichsu_lop6_thaoluan} />
		 	</div>
	 	</Router>

    );
  }
}

render(<Noidungchinhes6/>, window.document.getElementById("noidungchinhes6"));

