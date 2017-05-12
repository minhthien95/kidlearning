import React from "react";
import {render} from "react-dom";
import PropTypes from 'prop-types'; 
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import {Trangchu} from "./components/Trangchu";

import {Trangcanhan} from "./components/Trangcanhan";

import {Lichsu_lop6_baihoc} from "./components/Lichsu_lop6_baihoc";
import {Lichsu_lop6_baitapnangcao} from './components/Lichsu_lop6_baitapnangcao';
import {Lichsu_lop6_thaoluan} from './components/Lichsu_lop6_thaoluan';

import {Lichsu_lop6_sachgiaokhoa} from "./components/Lichsu_lop6_sachgiaokhoa";
import {Lichsu_lop6_video} from './components/Lichsu_lop6_video';
import {Lichsu_lop6_tuongtac} from './components/Lichsu_lop6_tuongtac';

import {Lichsu_lop7_baihoc} from "./components/Lichsu_lop7_baihoc";
import {Lichsu_lop7_baitapnangcao} from './components/Lichsu_lop7_baitapnangcao';
import {Lichsu_lop7_thaoluan} from './components/Lichsu_lop7_thaoluan';

import {Lichsu_lop8_baihoc} from "./components/Lichsu_lop8_baihoc";
import {Lichsu_lop8_baitapnangcao} from './components/Lichsu_lop8_baitapnangcao';
import {Lichsu_lop8_thaoluan} from './components/Lichsu_lop8_thaoluan';

import {Lichsu_lop9_baihoc} from "./components/Lichsu_lop9_baihoc";
import {Lichsu_lop9_baitapnangcao} from './components/Lichsu_lop9_baitapnangcao';
import {Lichsu_lop9_thaoluan} from './components/Lichsu_lop9_thaoluan';

import {Hoidap_lichsu} from './components/Hoidap_lichsu';
import {Hoidap_dialy} from './components/Hoidap_dialy';

class MainContent extends React.Component {
  render(){
    return (
    	<Router history={hashHistory}>
	    	<div>
			  	<Route path="/" component={Trangchu}/>
			  	<Route path="Trangcanhan" component={Trangcanhan}/>


			  	<Route path="Lichsu_lop6_baihoc" component={Lichsu_lop6_baihoc}/>
			 	<Route path="Lichsu_lop6_baitapnangcao" component={Lichsu_lop6_baitapnangcao} />
			 	<Route path="Lichsu_lop6_thaoluan" component={Lichsu_lop6_thaoluan} />

			 	<Route path="Lichsu_lop6_sachgiaokhoa" component={Lichsu_lop6_sachgiaokhoa}/>
			 	<Route path="Lichsu_lop6_video" component={Lichsu_lop6_video} />
			 	<Route path="Lichsu_lop6_tuongtac" component={Lichsu_lop6_tuongtac} />

			 	<Route path="Lichsu_lop7_baihoc" component={Lichsu_lop7_baihoc}/>
			 	<Route path="Lichsu_lop7_baitapnangcao" component={Lichsu_lop7_baitapnangcao} />
			 	<Route path="Lichsu_lop7_thaoluan" component={Lichsu_lop7_thaoluan} />

			 	<Route path="Lichsu_lop8_baihoc" component={Lichsu_lop8_baihoc}/>
			 	<Route path="Lichsu_lop8_baitapnangcao" component={Lichsu_lop8_baitapnangcao} />
			 	<Route path="Lichsu_lop8_thaoluan" component={Lichsu_lop8_thaoluan} />

			 	<Route path="Lichsu_lop9_baihoc" component={Lichsu_lop9_baihoc}/>
			 	<Route path="Lichsu_lop9_baitapnangcao" component={Lichsu_lop9_baitapnangcao} />
			 	<Route path="Lichsu_lop9_thaoluan" component={Lichsu_lop9_thaoluan} />

			 	<Route path="Hoidap_lichsu" component={Hoidap_lichsu} />
			 	<Route path="Hoidap_dialy" component={Hoidap_dialy} />
			 	
		 	</div>
	 	</Router>

    );
  }
}

render(<MainContent/>, window.document.getElementById("maincontent"));

