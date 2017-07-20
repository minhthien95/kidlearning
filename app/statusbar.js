import React from "react";
import {render} from "react-dom"; 
import io from 'socket.io-client';
var urlsocket;
if(window.location.hostname=="localhost")
	urlsocket='http://'+window.location.hostname+':3000';
else
	urlsocket='http://'+window.location.hostname;
let socket = io(urlsocket);

var data = document.querySelector('#statusbar');
var type_user=data.dataset.type;
var root = window.document.getElementById("statusbar");

class Statusbar extends React.Component {
	constructor(props) {
    super(props);
      this.state = {
        id_user: "assets/images/user/user_"+data.dataset.id+".jpg",
        listThongbao: [],
        sothongbao: 0
      };
    }
 	render() {
	    return (
		    <div>
				<div className="navbar-header">
					<a className="navbar-brand" href="#"><img src="assets/images/logoo.png" alt=""/></a>

					<ul className="nav navbar-nav visible-xs-block">
						<li><a data-toggle="collapse" data-target="#navbar-mobile"><i className="icon-tree5"></i></a></li>
						<li><a className="sidebar-mobile-main-toggle"><i className="icon-paragraph-justify3"></i></a></li>
					</ul>
				</div>

				<div className="navbar-collapse collapse" id="navbar-mobile">
					<ul className="nav navbar-nav">
						<li><a className="sidebar-control sidebar-main-toggle hidden-xs"><i className="icon-paragraph-justify3"></i></a></li>
						<li><a href="https://www.facebook.com/kid.learning.hcmus" target="_blank"><i className="icon-facebook2"></i></a></li>
					</ul>
					<ul className="nav navbar-nav navbar-right">
						<li className="dropdown">
							<a href="#" className="dropdown-toggle" data-toggle="dropdown">
								<i className="glyphicon glyphicon-bell"></i>
								<span className="visible-xs-inline-block position-right">Thông báo</span>
								{this.state.sothongbao=='0' ? (
									null
							        ) : (
							        <span className="badge bg-warning-400">{this.state.sothongbao}</span>
						      	)}
														
							</a>
							
							<div className="dropdown-menu dropdown-content width-350">
								<div className="dropdown-content-heading">
									Thông báo
									<ul className="icons-list">
										<li><a id="delallnoti"><i className=" icon-database-remove"></i></a></li>
									</ul>
								</div>

								<ul className="media-list dropdown-content-body">
									{this.state.sothongbao=='0' ? (
										<li className="media">
											<div className="media-body">
												<span className="text-muted">Không có thông báo nào</span>
											</div>
										</li>
								        ) : (
								        	null
								        )}
							        {this.state.listThongbao.map(function(data,index){
										return (
											<li key={index} id={data.ID_THONGBAO} className="media">
												<a href={"#/"+data.MON+"/lop"+data.LOP_CAUHOI+"/cauhoi"+data.ID_CAUHOI}>
													<div className="media-left"><img src={"assets/images/user/user_"+data.ID_KHACH+".jpg"} onError={(e)=>{e.target.src="assets/images/user/user.jpg"}} className="img-circle img-sm" alt=""/></div>
													<div className="media-body">
														<a  className="media-heading">
															<span className="text-semibold">{data.HOTEN}</span>
															<span className="media-annotation pull-right">{data.to_char}</span>
														</a>
														<span className="text-muted">Bình luận trong bài viết {data.TIEUDE}</span>
													</div>
												</a>
											</li>
										)
									})}
							      		
								</ul>
							</div>
						</li>

						<li className="dropdown dropdown-user">
							<a className="dropdown-toggle" data-toggle="dropdown">
								<img src={this.state.id_user} onError={() => {this.setState({id_user : "assets/images/user/user.jpg"}) }} alt=""/>
								<span>{data.dataset.username}</span>
								<i className="caret"></i>
							</a>

							<ul className="dropdown-menu dropdown-menu-right"> 
								<li><a href="#trangcanhan/hoatdong"><i className="icon-user"></i> Trang cá nhân</a></li>
								<li><a id="thongke" href="#trangcanhan/quatrinh"><i className="icon-stats-dots"></i>Thông kê</a></li>
								<li><a id="quanlyuser" href="#trangcanhan/quanlyuser"><i className="icon-users4"></i>Quản lý học sinh</a></li>
								<li className="divider"></li>
								<li><a href="#trangcanhan/caidat"><i className="icon-cog5"></i> Cài đặt tài khoản</a></li>
								<li><a href="/dangxuat"><i className="icon-switch2 text-danger"></i> Đăng xuất</a></li>
							</ul>
						</li>
					</ul>
				</div>
		    </div>
    	);
  	}
  	componentDidMount(){
  		if(type_user=="hocsinh"){
  			$("#quanlyuser").hide();
  		}
  		$("li").on("click",'.media',function(){
  			console.log("xoa thong bao");
  			$('.glyphicon-bell').parent().parent().removeClass("open");
  			$('.glyphicon-bell').parent().attr('aria-expanded',false);
  			$.post("delete_thongbao",{id: $(this).attr('id'),id_user: "all"});
  		});
  		$("#delallnoti").on("click",function(){
  			console.log("xoa hết thong bao");
  			$('.glyphicon-bell').parent().parent().removeClass("open");
  			$('.glyphicon-bell').parent().attr('aria-expanded',false);
  			$.post("delete_thongbao",{id: "all",id_user: data.dataset.id});
  		});
  	}
  	componentWillMount()
	{
		console.log("componentWillMount statusbar");

		var that=this;

		function loop(){
			setTimeout(function () {
				console.log("loop thong bao");
	            socket.emit('c2s_Thongbao',{id: data.dataset.id});
	            loop();
	        }, 30000);
		}
		socket.emit('c2s_Thongbao',{id: data.dataset.id});
		socket.on('s2c_Thongbao', function(data){
			console.log(data);
			console.log(data.length);
			that.setState({sothongbao: data.length});
			that.setState({listThongbao: data});
		});
		////
		loop();
	}
	componentWillReceiveProps(newProps)
	{
		socket.emit('c2s_Thongbao',{id: data.dataset.id});
	}

}
render(<Statusbar/>, root);