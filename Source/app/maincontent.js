import React from "react";
import {render} from "react-dom";
import PropTypes from 'prop-types'; 
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import {Trangchu} from "./components/Trangchu";

import {Trangcanhan} from "./components/Trangcanhan";


import {baihoc} from "./components/baihoc";
import {baihoc_tip} from "./components/baihoc_tip";
import {baihoc_tip_chitiet} from "./components/baihoc_tip_chitiet";
import {baitap} from './components/baitap';
import {thaoluan} from './components/thaoluan';
import {cauhoi_chitiet} from './components/cauhoi_chitiet';

import {hoidap} from './components/hoidap';

import {Lichsu_baihoc} from "./components/Lichsu_baihoc";
import {Lichsu_baitapnangcao} from './components/Lichsu_baitapnangcao';
import {Lichsu_thaoluan} from './components/Lichsu_thaoluan';

import {Hoidap_lichsu_chitiet} from './components/Hoidap_lichsu_chitiet';
import {Hoidap_lichsu} from './components/Hoidap_lichsu';
import {Hoidap_diali} from './components/Hoidap_diali';

class MainContent extends React.Component {
  	render(){
	    return (
	    	<Router history={hashHistory}>
		    	<div>
				  	<Route path="/" component={Trangchu}/>
				  	<Route path="Trangcanhan" component={Trangcanhan}/>


					<Route path=":mon/lop:lop/baihoc" component={baihoc} />
					<Route path=":mon/lop:lop/baihoc_tip" component={baihoc_tip} />
					<Route path=":mon/lop:lop/baihoc_tip/bai:id" component={baihoc_tip_chitiet} />

				 	<Route path=":mon/lop:lop/baitap" component={baitap} />
				 	<Route path=":mon/lop:lop/thaoluan" component={thaoluan} />
				 	<Route path=":mon/lop:lop/cauhoi:id" component={cauhoi_chitiet} />

				 	<Route path="hoidap/:mon" component={hoidap} />

				  	<Route path="Lichsu_baihoc/lop:lop" component={Lichsu_baihoc} />
				 	<Route path="Lichsu_baitapnangcao/lop:lop" component={Lichsu_baitapnangcao} />
				 	<Route path="Lichsu_thaoluan/lop:lop" component={Lichsu_thaoluan} />

				 	<Route path="Hoidap_lichsu_chitiet/lop:lop/id:id" component={Hoidap_lichsu_chitiet} />

				 	<Route path="Hoidap_lichsu/lop:lop/id:id" component={Hoidap_lichsu} />
				 	<Route path="Hoidap_diali/lop:lop/id:id" component={Hoidap_diali} />
				 	
			 	</div>
		 	</Router>

	    );
  	}
}

render(<MainContent/>, window.document.getElementById("maincontent"));

