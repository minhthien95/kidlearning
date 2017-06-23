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

export class baihoc extends React.Component{
	constructor(props) {
    super(props);
      this.state = {
        listbaihoc: [],
        bai_ls: 100,
        bai_dl: 100
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
							<li className="active" id="link_pre" ></li>
						</ul>
						<ul className="breadcrumb-elements">
							<li ><a id="thembaihoc" ><i className="icon-plus-circle2 position-left"></i>Thêm bài học</a></li>
						</ul>
					</div>
				</div>
				{/* /page header */}

				{/* Content area */}
				<div className="content">
					<div id="formadd" className="panel panel-flat blog-horizontal blog-horizontal-2">
						<div className="panel-body">
							<div className="blog-preview">
								<div className="panel-body">
									<div className="form-group">
										<label className="control-label col-lg-2">Thông tin bài mới</label>
										<div className="col-lg-12">
											<div className="row">
												<div className="col-md-2" style={{paddingRight: '0px'}}>
													<input id="sobai" type="number" placeholder="Số thứ tự bài" className="form-control"/>
													<span className="help-block"></span>
												</div>

												<div className="col-md-10" style={{paddingRight: '0px'}}>
													<input id="tieudebai" type="text" placeholder="Tiêu đề bài" className="form-control"/>
													<span className="help-block"></span>
												</div>
											</div>
										</div>
									</div>
									<div className="text-right">
										<button id="addcauhoi" type="submit" className="btn bg-teal-400">Đăng bài học <i className="icon-arrow-right14 position-right"></i></button>
									</div>
								</div>
							</div>
						</div>
					</div>	
					<div id="formCauhoi" className="timeline timeline-left content-group">
						<div className="timeline-container">

							{/* List bai hoc */}
							{this.state.listbaihoc.map(function(data1,index){
								return (
									data1.MON=="lichsu"?(
										data1.BAI<this.state.bai_ls+1 || type_username=="trogiang" || type_username=="admin"? (
											data1.BAI==this.state.bai_ls ? (
										        <div key={index} className="timeline-row">
													<div className="timeline-icon">
														<div className="bg-primary">
															<i className="icon-pencil6"></i>
														</div>
													</div>

													<div className="panel panel-flat timeline-content">
														<div className="panel-heading">
															<h6 className="panel-title text-semibold no-margin"><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_chitiet/"+data1.BAI} className="text-default"><a>Bài {data1.BAI}:</a>  {data1.TIEUDE}</a></h6>
															<div className="heading-elements">
																<span className="heading-text">{data1.USERNAME} - {data1.to_char}</span>
										                	</div>
														</div>

														<div className="panel-body">
															
															<div className="row glyphs">
																<div className="col-md-2 col-sm-3"><i className="icon-book "></i><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_sgk/"+data1.BAI} ><span>Sách giáo khoa</span></a></div>
																<div className="col-md-2 col-sm-3"><i className="icon-tree7"></i><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_tip_chitiet/"+data1.BAI+"/"+data1.ID_BAIHOC}><span>Tóm tắt kiến thức</span></a></div>
																<div className="col-md-2 col-sm-3"><i className="icon-book-play"></i><a  href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_video/"+data1.BAI+"/"+data1.ID_BAIHOC}><span>Video</span></a></div>
																<div className="col-md-2 col-sm-3"><i className="icon-file-text"></i><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baitap_tracnghiem_chitiet/"+data1.BAI+"/"+data1.ID_BAIHOC}><span>Bài tập</span></a></div>

															</div>
													
														</div>
													</div>
												</div>
											):(
												<div key={index} className="timeline-row">
													<div className="timeline-icon">
														<div className="bg-success">
															<i className="icon-checkmark"></i>
														</div>
													</div>

													<div className="panel panel-flat timeline-content">
														<div className="panel-heading">
															<h6 className="panel-title text-semibold no-margin"><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_chitiet/"+data1.BAI} className="text-default"><a>Bài {data1.BAI}:</a>  {data1.TIEUDE}</a></h6>
															<div className="heading-elements">
																<span className="heading-text">{data1.USERNAME} - {data1.to_char}</span>
										                	</div>
														</div>

														<div className="panel-body">
															
															<div className="row glyphs">
																<div className="col-md-2 col-sm-3"><i className="icon-book "></i><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_sgk/"+data1.BAI} ><span>Sách giáo khoa</span></a></div>
																<div className="col-md-2 col-sm-3"><i className="icon-tree7"></i><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_tip_chitiet/"+data1.BAI+"/"+data1.ID_BAIHOC}><span>Tóm tắt kiến thức</span></a></div>
																<div className="col-md-2 col-sm-3"><i className="icon-book-play"></i><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_video/"+data1.BAI+"/"+data1.ID_BAIHOC}><span>Video</span></a></div>
																<div className="col-md-2 col-sm-3"><i className="icon-file-text"></i><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baitap_tracnghiem_chitiet/"+data1.BAI+"/"+data1.ID_BAIHOC}><span>Bài tập</span></a></div>

															</div>
													
														</div>
													</div>
												</div>
											)
								        ) : (
									        <div key={index} className="timeline-row">
												<div className="timeline-icon">
													<div className="bg-grey-300">
														<i className="icon-checkmark"></i>
													</div>
												</div>

												<div className="panel panel-flat timeline-content">
													<div className="panel-heading">
														<h6 className="panel-title text-semibold no-margin"><a  className="text-grey ">Bài {data1.BAI}: {data1.TIEUDE}</a></h6>
														<div className="heading-elements">
															<span className="heading-text">{data1.USERNAME} - {data1.to_char}</span>
									                	</div>
													</div>
												</div>
											</div>
								      	)
							        ):(
							        	data1.BAI<this.state.bai_dl+1 || type_username=="trogiang" || type_username=="admin"? (
											data1.BAI==this.state.bai_dl ? (
										        <div key={index} className="timeline-row">
													<div className="timeline-icon">
														<div className="bg-primary">
															<i className="icon-pencil6"></i>
														</div>
													</div>

													<div className="panel panel-flat timeline-content">
														<div className="panel-heading">
															<h6 className="panel-title text-semibold no-margin"><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_chitiet/"+data1.BAI} className="text-default"><a>Bài {data1.BAI}:</a>  {data1.TIEUDE}</a></h6>
															<div className="heading-elements">
																<span className="heading-text">{data1.USERNAME} - {data1.to_char}</span>
										                	</div>
														</div>

														<div className="panel-body">
															
															<div className="row glyphs">
																<div className="col-md-2 col-sm-3"><i className="icon-book "></i><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_sgk/"+data1.BAI} ><span>Sách giáo khoa</span></a></div>
																<div className="col-md-2 col-sm-3"><i className="icon-tree7"></i><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_tip_chitiet/"+data1.BAI+"/"+data1.ID_BAIHOC}><span>Tóm tắt kiến thức</span></a></div>
																<div className="col-md-2 col-sm-3"><i className="icon-book-play"></i><a  href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_video/"+data1.BAI+"/"+data1.ID_BAIHOC}><span>Video</span></a></div>
																<div className="col-md-2 col-sm-3"><i className="icon-file-text"></i><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baitap_tracnghiem_chitiet/"+data1.BAI+"/"+data1.ID_BAIHOC}><span>Bài tập</span></a></div>

															</div>
													
														</div>
													</div>
												</div>
											):(
												<div key={index} className="timeline-row">
													<div className="timeline-icon">
														<div className="bg-success">
															<i className="icon-checkmark"></i>
														</div>
													</div>

													<div className="panel panel-flat timeline-content">
														<div className="panel-heading">
															<h6 className="panel-title text-semibold no-margin"><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_chitiet/"+data1.BAI} className="text-default"><a>Bài {data1.BAI}:</a>  {data1.TIEUDE}</a></h6>
															<div className="heading-elements">
																<span className="heading-text">{data1.USERNAME} - {data1.to_char}</span>
										                	</div>
														</div>

														<div className="panel-body">
															
															<div className="row glyphs">
																<div className="col-md-2 col-sm-3"><i className="icon-book "></i><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_sgk/"+data1.BAI} ><span>Sách giáo khoa</span></a></div>
																<div className="col-md-2 col-sm-3"><i className="icon-tree7"></i><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_tip_chitiet/"+data1.BAI+"/"+data1.ID_BAIHOC}><span>Tóm tắt kiến thức</span></a></div>
																<div className="col-md-2 col-sm-3"><i className="icon-book-play"></i><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_video/"+data1.BAI+"/"+data1.ID_BAIHOC}><span>Video</span></a></div>
																<div className="col-md-2 col-sm-3"><i className="icon-file-text"></i><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baitap_tracnghiem_chitiet/"+data1.BAI+"/"+data1.ID_BAIHOC}><span>Bài tập</span></a></div>
															</div>
													
														</div>
													</div>
												</div>
											)
								        ) : (
									        <div key={index} className="timeline-row">
												<div className="timeline-icon">
													<div className="bg-grey-300">
														<i className="icon-checkmark"></i>
													</div>
												</div>

												<div className="panel panel-flat timeline-content">
													<div className="panel-heading">
														<h6 className="panel-title text-semibold no-margin"><a  className="text-grey ">Bài {data1.BAI}: {data1.TIEUDE}</a></h6>
														<div className="heading-elements">
															<span className="heading-text">{data1.USERNAME} - {data1.to_char}</span>
									                	</div>
													</div>
												</div>
											</div>
								      	)
								   	)	
								)
							}, this)}
							{/* List bai hoc */}

						</div>
				    </div>

				</div>
				{/* /content area */}
			</div>
		)
	}
	componentDidMount(){
		
		url1=window.location.href;
		url1=url1.split('#');
		mon=url1[1].split('/');
		url2=window.location.href;
		url2=url2.split('lop');
		phanlop=url2[1].split('/');

		if (type_username!="trogiang") {
            $("#thembaihoc").hide();
        }
        if (type_username=="admin") {
            $("#thembaihoc").show();
        }
		$("#formadd").hide();
		$('#thembaihoc').click(function (event) {
			console.log("click");
	        if (check) {
	            check=false;
	            $("#formadd").show();
	        } else {
	            check=true;
	            $("#formadd").hide();
	        }
	    });
	    $('#addcauhoi').click(function () {
	    	if($("#sobai").val()==""){
	    		alert("Bạn chưa nhập số thứ tự bài học!");
				return;
	    	}
			if($("#tieudebai").val()==""){
				alert("Bạn chưa nhập tiêu đề bài học!");
				return;
			}
			var currentdate = new Date();
			var datetime =currentdate.getFullYear() + "-"
			    + (currentdate.getMonth()+1)  + "-" 
			    + currentdate.getDate() +" "
			    + currentdate.getHours() + ":"  
			    + currentdate.getMinutes() + ":" 
			    + currentdate.getSeconds();

			var data={
		        id:       id_user,
		        bai: $("#sobai").val(),
				tieude: $("#tieudebai").val(),
				lop: phanlop[0],
				mon: mon[1],
				thoigian: datetime

			};
			console.log(data);
	        $.post("themBaihoc", data, function(){
	        	$("#sobai").val("");
	        	$("#tieudebai").val("");
	        	$("#formadd").hide();
	        	//window.location = "#/trangcanhan";
            	//Trangcanhan.dispatch(location.getCurrentPath(), null);
    		});
	    });
	}
	componentWillMount(){
		console.log("componentWillMount");

		var that=this;
		$.get("getUserInfo/"+id_user,function( data ){
			console.log("lay data");
			if(data.LOP==that.props.params.lop){
				console.log("bai hoc hien tai");
				that.setState({bai_ls: data.BAI_LICHSU});
				that.setState({bai_dl: data.BAI_DIALI});
			}
		});
		url1=window.location.href;
		url1=url1.split('#');
		mon=url1[1].split('/');
		url2=window.location.href;
		url2=url2.split('lop');
		phanlop=url2[1].split('/');

		var data1={
			mon: this.props.params.mon,
			lop: this.props.params.lop,
			id: "all",
			id_user: "all"
		}
		console.log(data1);
		socket.emit('c2s_Baihoc',data1);
		socket.on('s2c_Baihoc', function(data){
			console.log(data);
			var mon1;
			if(mon[1]=="lichsu")
				mon1="Lịch sử";
			if(mon[1]=="diali")
				mon1="Địa lí";

			var name_link="Bài học "+mon1+" lớp "+that.props.params.lop; 
			$("#link_pre").text(name_link);

			that.setState({listbaihoc: data});
		});
		////
	}
	componentWillReceiveProps(newProps)
	{
		url1=window.location.href;
		url1=url1.split('#');
		mon=url1[1].split('/');
		url2=window.location.href;
		url2=url2.split('lop');
		phanlop=url2[1].split('/');

		var that=this;
		$.get("getUserInfo/"+id_user,function( data ){
			console.log("lay data");
			if(data.LOP==that.props.params.lop){
				console.log("bai hoc hien tai");
				that.setState({bai_ls: data.BAI_LICHSU});
				that.setState({bai_dl: data.BAI_DIALI});
			}
			else{
				that.setState({bai_ls: 100});
				that.setState({bai_dl: 100});
			}
		});
		console.log("componentWillReceiveProps");
		var mon1;
		if(newProps.params.mon=="lichsu")
			mon1="Lịch sử";
		if(newProps.params.mon=="diali")
			mon1="Địa lí";
		var name_link="Bài học "+mon1+" lớp "+newProps.params.lop; 
		var data1={
			mon: newProps.params.mon,
			lop: newProps.params.lop,
			id: "all",
			id_user: "all"
		}
		socket.emit('c2s_Baihoc',data1);
	}
}
