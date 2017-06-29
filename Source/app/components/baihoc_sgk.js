import React from 'react';
import io from 'socket.io-client';
//let socket = io('http://kid-learning.herokuapp.com:3000'||'https://kid-learning.herokuapp.com:3000' || 'http://localhost:3000');
let socket = io('http://'+window.location.hostname+':3000');
//let socket = io('http://'+window.location.hostname);

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
					</div>
				</div>
				{/* /page header */}

				{/* Content area */}
				<div className="content">

					{/* Main charts */}
					<div className="panel panel-flat">
						{/* SGK */}
						<div className="content" style={{paddingBottom: '0px'}}>
		 					<iframe id="contentSGK"  width="100%" height="650" allowFullScreen/>
						</div>
						{/* /SGK */}
					</div>
					{/* /main charts */}

				</div>
				{/* /content area */}
			</div>
		)
	}
	componentDidMount(){
		setTimeout(this.renderFrameContent, 0);

		var url1=window.location.href;
		url1=url1.split('#');
		var mon=url1[1].split('/');
		var url2=window.location.href;
		url2=url2.split('lop');
		var phanlop=url2[1].split('/');
		//dia 7. p1 1-108, p2 1-81
		//lichsu 7. p1 1-77, p2 1-67
		//$("#contentSGK").attr("src", "sgk/"+this.props.params.mon+this.props.params.lop+"/index.html#p="+this.props.params.trang);
		if(this.props.params.lop==7){
			if(this.props.params.mon=="diali"){
				if(this.props.params.trang<=108 || this.props.params.trang=="null"){
					$("#contentSGK").attr("src", "sgk/"+this.props.params.mon+this.props.params.lop+"p1/index.html#p="+this.props.params.trang);
				}else{
					$("#contentSGK").attr("src", "sgk/"+this.props.params.mon+this.props.params.lop+"p2/index.html#p="+parseInt(this.props.params.trang-108));
				}
			}
			else{
				if(this.props.params.trang<=77 || this.props.params.trang=="null"){
					$("#contentSGK").attr("src", "sgk/"+this.props.params.mon+this.props.params.lop+"p1/index.html#p="+this.props.params.trang);
				}else{
					$("#contentSGK").attr("src", "sgk/"+this.props.params.mon+this.props.params.lop+"p2/index.html#p="+parseInt(this.props.params.trang-77));
				}
			}
		}else{
			$("#contentSGK").attr("src", "sgk/"+this.props.params.mon+this.props.params.lop+"/index.html#p="+this.props.params.trang);
		}
		//<iframe width="100%" height="650" allowFullScreen
		//						src={"sgk/"+this.props.params.mon+this.props.params.lop+"/index.html#p="+this.props.params.trang}>
		 //					</iframe>
		// $("#contentSGK").append('<iframe width="400" height="400"'+
		// 						'src="C:/Users/MinhThien/Desktop/Kidlearning/views/sgk/diali6/index.html">'+
		// 					'</iframe>');

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
