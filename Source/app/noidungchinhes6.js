import React from "react";
import {render} from "react-dom";
import {Router, Route,hashHistory } from 'react-router-dom'

import {Trangchu} from "./components/Trangchu";
import {Lichsu_lop6_baihoc} from "./components/Lichsu_lop6_baihoc";
import {Lichsu_lop6_baitapnangcao} from './components/Lichsu_lop6_baitapnangcao';
import {Lichsu_lop6_thaoluan} from './components/Lichsu_lop6_thaoluan';

class Noidungchinhes6 extends React.Component {
  render(){
    return (
	    <Router history={hashHistory}>
		  	<Route path="/" component={Trangchu}/>
		  	<Route path="Lichsu_lop6_baihoc" component={Lichsu_lop6_baihoc}/>
		 	<Route path="Lichsu_lop6_baitapnangcao" component={Lichsu_lop6_baitapnangcao} />
		 	<Route path="Lichsu_lop6_thaoluan" component={Lichsu_lop6_thaoluan} />
		  </Router>
    );
  }
}

render(<Noidungchinhes6/>, window.document.getElementById("noidungchinhes6"));