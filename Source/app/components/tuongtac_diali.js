import React from 'react';
import echarts from 'echarts';
import io from 'socket.io-client';
//let socket = io('http://localhost:3000'||'http://kid-learning.herokuapp.com:3000'||'https://kid-learning.herokuapp.com:3000');
let socket = io('http://'+window.location.hostname+':3000');

var data = document.querySelector('#maincontent');

var id_user=data.dataset.id;
var check=true;
var mon,phanlop;
var url1,url2;
var temp_username=data.dataset.username;

export class tuongtac_diali extends React.Component{
  	render(){
		return(
			<div>
				{/* Page header */}
				<div className="page-header page-header-default">
					<div className="breadcrumb-line">
						<ul className="breadcrumb">
							<li><a href="#"><i className="icon-home2 position-left"></i> Trang chủ</a></li>
							<li className="active"> Tương tác môn Địa Lí</li>
							
						</ul>
					</div>
				</div>
				{/* /page header */}


				{/* Content area */}
				<div className="content">

					{/* Main charts */}
					<div className="panel panel-flat">
						{/* SGK */}
						<div className="content" style={{paddingBottom: '0px'}}>
		 					<iframe id="contentSGK1"  width="100%" height="450" allowFullScreen/>
		 					<iframe id="contentSGK2"  width="100%" height="450" allowFullScreen/>
						</div>
						{/* /SGK */}
						<div className="panel-body">
							<a className="text-semibold">Mô tả:</a> abc
							<br/>
							<a className="text-semibold">Đăng bởi:</a> cba
							<br/>
							<a className="text-semibold">Ngày đăng:</a> acb
						</div>
					</div>
					{/* /main charts */}

				</div>
				{/* /content area */}

			</div>
		)
	}
	componentDidMount()
	{
		console.log("componentDidMount");
		$("#contentSGK1").attr("src", "map/bandothegioi-quocgia.html");
		$("#contentSGK2").attr("src", "map/bandothegioi-danso.html");
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
