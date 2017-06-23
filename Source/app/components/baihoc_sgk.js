import React from 'react';
import io from 'socket.io-client';
let socket = io('http://localhost:3000'||'http://kid-learning.herokuapp.com:3000'||'https://kid-learning.herokuapp.com:3000');


var data = document.querySelector('#maincontent');

var id_user=data.dataset.id;
var check=true;
var mon,phanlop;
var url1,url2;
var temp_username=data.dataset.username;
var type_username=data.dataset.type;

export class baihoc_sgk extends React.Component{
	constructor(props) {
    super(props);
      this.state = {
        listbaihoc: []
      };
    }
	render(){
		return(
			<div>
				{/* Page header */}
				<div className="page-header page-header-default">
					<div className="breadcrumb-line">
						<ul className="breadcrumb">
							<li><a href="#"><i className="icon-home2 position-left"></i> Trang chủ</a></li>
							<li ><a id="link_pre" ></a></li>
							<li className="active" id="link_pre1" ></li>
						</ul>
						<ul className="breadcrumb-elements">
							<li ><a id="thembaihoc" ><i className="icon-plus-circle2 position-left"></i>Thêm bài học</a></li>
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
							<iframe width="100%" height="500"
								src="C:\Users\MinhThien\Desktop\Kidlearning\views\sgk\diali6\index.html">
							</iframe>
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
	componentDidMount(){
		var url1=window.location.href;
		url1=url1.split('#');
		var mon=url1[1].split('/');
		var url2=window.location.href;
		url2=url2.split('lop');
		var phanlop=url2[1].split('/');

		var mon1;
		if(mon[1]=="lichsu")
				mon1="Lịch sử";
		if(mon[1]=="diali")
			mon1="Địa lí";
		var name_link="Bài học "+mon1+" lớp "+this.props.params.lop+" bài "+this.props.params.bai; 
		var link_pre="#"+this.props.params.mon+"/lop"+this.props.params.lop+"/baihoc_chitiet/"+this.props.params.bai;
		var name_link1="Sách giáo khoa";
		$("#link_pre").text(name_link);
		$('#link_pre').attr('href', link_pre);
		$("#link_pre1").text(name_link1);
	}
}
