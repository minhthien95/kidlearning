import React from 'react';
import io from 'socket.io-client';
//let socket = io('http://localhost:3000'||'http://kid-learning.herokuapp.com:3000'||'https://kid-learning.herokuapp.com:3000');
let socket = io('http://'+window.location.hostname+':3000');

var data = document.querySelector('#maincontent');

var id_user=data.dataset.id;
var check=true;
var mon,phanlop;
var url1,url2;
var temp_username=data.dataset.username;

export class tuongtac_lichsu extends React.Component{
  	render(){
		return(
			<div>
				{/* Page header */}
				<div className="page-header page-header-default">
					<div className="breadcrumb-line">
						<ul className="breadcrumb">
							<li><a href="#"><i className="icon-home2 position-left"></i> Trang chủ</a></li>
							<li className="active" >Tương tác môn Lịch Sử</li>
							
						</ul>
					</div>
				</div>
				{/* /page header */}


				{/* Content area */}
				<div className="content">
					abc
				</div>
				{/* /content area */}

			</div>
		)
	}
	componentDidMount()
	{
		console.log("componentDidMount");


	}
	componentWillMount()
	{
		console.log("componentWillMount");
		
		////
	}
	componentWillReceiveProps(newProps)
	{
		console.log("componentWillReceiveProps");
		// var that=this;

	}
}
