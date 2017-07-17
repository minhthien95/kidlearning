import React from "react";
import {render} from "react-dom";

import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import {Trangchu} from "./components/Trangchu";

import {Trangcanhan} from "./components/Trangcanhan";


import {baihoc} from "./components/baihoc";
import {baihoc_sgk} from "./components/baihoc_sgk";
import {baihoc_chitiet} from "./components/baihoc_chitiet";
import {baihoc_tip} from "./components/baihoc_tip";
import {baihoc_tip_chitiet} from "./components/baihoc_tip_chitiet";
import {baitap} from './components/baitap';
import {thaoluan} from './components/thaoluan';
import {cauhoi_chitiet} from './components/cauhoi_chitiet';

import {baithi} from './components/baithi';
import {baikiemtra} from './components/baikiemtra';

import {hoidap} from './components/hoidap';
import {tuongtac_lichsu} from './components/tuongtac_lichsu';
import {tuongtac_diali} from './components/tuongtac_diali';

import {gioithieu} from './components/gioithieu';
import {trochoi} from './components/trochoi';

import {baihoc_baiviet} from "./components/baihoc_baiviet";
import {baihoc_baiviet_chitiet} from './components/baihoc_baiviet_chitiet';

import {baihoc_video} from "./components/baihoc_video";
import {baihoc_video_chitiet} from './components/baihoc_video_chitiet';

import {baitap_tracnghiem} from "./components/baitap_tracnghiem";
import {baitap_tuluan} from "./components/baitap_tuluan";
import {baitap_tracnghiem_chitiet} from "./components/baitap_tracnghiem_chitiet";
import {baitap_tuluan_chitiet} from "./components/baitap_tuluan_chitiet";

class MainContent extends React.Component {
  	render(){
	    return (
	    	<Router history={hashHistory}>
		    	<div>
				  	<Route path="/" component={Trangchu}/>
				  	<Route path="Trangcanhan/:tab" component={Trangcanhan}/>


					<Route path=":mon/lop:lop/baihoc" component={baihoc} />
					<Route path=":mon/lop:lop/baihoc_sgk/:bai/:trang" component={baihoc_sgk} />
					<Route path=":mon/lop:lop/baihoc_chitiet/:id" component={baihoc_chitiet} />
					<Route path=":mon/lop:lop/baihoc_tip" component={baihoc_tip} />
					<Route path=":mon/lop:lop/baihoc_tip_chitiet/:bai/:id" component={baihoc_tip_chitiet} />

				 	<Route path=":mon/lop:lop/baitap" component={baitap} />
				 	<Route path=":mon/lop:lop/thaoluan" component={thaoluan} />
				 	<Route path=":mon/lop:lop/cauhoi:id" component={cauhoi_chitiet} />

				 	<Route path=":mon/lop:lop/baithi/:id" component={baithi} />
				 	<Route path=":mon/lop:lop/baikiemtra/:id" component={baikiemtra} />

				 	<Route path=":mon/lop:lop/baihoc_baiviet" component={baihoc_baiviet} />
				 	<Route path=":mon/lop:lop/baihoc_baiviet_chitiet/:id" component={baihoc_baiviet_chitiet} />

				 	<Route path=":mon/lop:lop/baihoc_video/:bai/:id" component={baihoc_video} />
				 	<Route path=":mon/lop:lop/baihoc_video_chitiet/:id/:video" component={baihoc_video_chitiet} />

				 	<Route path=":mon/lop:lop/baitap_tracnghiem" component={baitap_tracnghiem} />
				 	<Route path=":mon/lop:lop/baitap_tuluan" component={baitap_tuluan} />

				 	<Route path=":mon/lop:lop/baitap_tracnghiem_chitiet/:bai/:id" component={baitap_tracnghiem_chitiet} />
				 	<Route path=":mon/lop:lop/baitap_tuluan_chitiet/:id" component={baitap_tuluan_chitiet} />

				 	<Route path="hoidap/:mon" component={hoidap} />	

				 	<Route path="tuongtac/lichsu" component={tuongtac_lichsu} />	
				 	<Route path="tuongtac/diali" component={tuongtac_diali} />	

				 	<Route path="gioithieu" component={gioithieu} />
				 	<Route path="trochoi" component={trochoi} />		
			 	</div>
		 	</Router>

	    );
  	}
}

render(<MainContent/>, window.document.getElementById("maincontent"));

