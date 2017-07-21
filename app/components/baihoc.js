import React from 'react';
import io from 'socket.io-client';
//let socket = io('http://kid-learning.herokuapp.com:3000'||'https://kid-learning.herokuapp.com:3000' || 'http://localhost:3000');
//let socket = io('http://'+window.location.hostname+':3000');
//let socket = io('http://'+window.location.hostname);
console.log('http://'+window.location.hostname);
var urlsocket;
if(window.location.hostname=="localhost")
	urlsocket='http://'+window.location.hostname+':3000';
else
	urlsocket='http://'+window.location.hostname;
let socket = io(urlsocket);

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
							<li ><a id="themsgk" data-popup="tooltip" data-toggle="modal" data-target="#confirm2"><i className="icon-plus-circle2 position-left"></i>Thêm Sách Giáo Khoa</a></li>
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

												<div className="col-md-8" style={{paddingRight: '0px'}}>
													<input id="tieudebai" type="text" placeholder="Tiêu đề bài" className="form-control"/>
													<span className="help-block"></span>
												</div>
												<div className="col-md-2" style={{paddingRight: '0px'}}>
													<input id="sotrangsach" type="number" placeholder="Số trang của bài" className="form-control"/>
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
					<div id="listbaihoc" className="timeline timeline-left content-group">
						<div className="timeline-container">

							{/* List bai hoc */}
							{this.state.listbaihoc.map(function(data1,index){
								return (
									data1.MON=="lichsu"?(
										data1.BAI<parseInt(this.state.bai_ls+1) || type_username=="trogiang" || type_username=="admin"? (
											data1.BAI==this.state.bai_ls ? (
										        <div key={index} className="timeline-row">
													<div className="timeline-icon">
														<div className="bg-primary">
															<i className="icon-pencil6"></i>
														</div>
													</div>

													<div className="panel panel-flat timeline-content">
														<div className="panel-heading">
															<h6 className="panel-title text-semibold no-margin"><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_chitiet/"+data1.BAI} className="text-default"><span className="text-primary">Bài {data1.BAI}:</span> {data1.TIEUDE}</a></h6>
															<div className="heading-elements">
																<span className="heading-text">{data1.USERNAME} - {data1.to_char}</span>
											                	{data1.USERNAME==data.dataset.username ? (
															        <ul className="list-inline list-inline-separate heading-text pull-right">
																		<li><a id={data1.ID_TACGIA} name={data1.ID_BAIHOC} className="text-danger-400" data-popup="tooltip" data-toggle="modal" data-target="#confirm"><i className="icon-cross2 position-right"/></a></li>
																	</ul>) : (
															        null
														      	)}
										                	</div>
														</div>

														<div className="panel-body">
															
															<div className="row glyphs">
																<div className="col-md-2 col-sm-3"><i className="icon-book "></i><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_sgk/"+data1.BAI+"/"+data1.TRANGSACH} ><span>Sách giáo khoa</span></a></div>
																<div className="col-md-2 col-sm-3"><i className="icon-tree7"></i><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_tip_chitiet/"+data1.BAI+"/"+data1.ID_BAIHOC}><span>Tóm tắt kiến thức</span></a></div>
																<div className="col-md-2 col-sm-3"><i className="icon-book-play"></i><a  href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_video/"+data1.BAI+"/"+data1.ID_BAIHOC}><span>Video</span></a></div>
																<div className="col-md-2 col-sm-3"><i className="icon-file-text"></i><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baitap_tracnghiem_chitiet/"+data1.BAI+"/"+data1.ID_BAIHOC}><span>Bài tập</span></a></div>
																{data1.BAITHI=='1' ? (
															       <div className="col-md-2 col-sm-3">
															       <i className="icon-clipboard2"></i>
															       <a  href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baikiemtra/"+data1.BAI}><span>Bài kiểm tra</span></a>
															       </div>															    
															       ) : (
															       null
														      	)}
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
															<h6 className="panel-title text-semibold no-margin"><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_chitiet/"+data1.BAI} className="text-default"><span className="text-primary">Bài {data1.BAI}:</span>  {data1.TIEUDE}</a></h6>
															<div className="heading-elements">
																<span className="heading-text">{data1.USERNAME} - {data1.to_char}</span>
																{data1.USERNAME==data.dataset.username ? (
															        <ul className="list-inline list-inline-separate heading-text pull-right">
																		<li><a id={data1.ID_TACGIA} name={data1.ID_BAIHOC} className="text-danger-400" data-popup="tooltip" data-toggle="modal" data-target="#confirm"><i className="icon-cross2 position-right"/></a></li>
																	</ul>) : (
															        null
														      	)}
										                	</div>
														</div>

														<div className="panel-body">
															
															<div className="row glyphs">
																<div className="col-md-2 col-sm-3"><i className="icon-book "></i><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_sgk/"+data1.BAI+"/"+data1.TRANGSACH} ><span>Sách giáo khoa</span></a></div>
																<div className="col-md-2 col-sm-3"><i className="icon-tree7"></i><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_tip_chitiet/"+data1.BAI+"/"+data1.ID_BAIHOC}><span>Tóm tắt kiến thức</span></a></div>
																<div className="col-md-2 col-sm-3"><i className="icon-book-play"></i><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_video/"+data1.BAI+"/"+data1.ID_BAIHOC}><span>Video</span></a></div>
																<div className="col-md-2 col-sm-3"><i className="icon-file-text"></i><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baitap_tracnghiem_chitiet/"+data1.BAI+"/"+data1.ID_BAIHOC}><span>Bài tập</span></a></div>
																{data1.BAITHI=='1' ? (
															       <div className="col-md-2 col-sm-3"><i className="icon-clipboard2"></i><a  href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baikiemtra/"+data1.BAI}><span>Bài kiểm tra</span></a></div>
															    ) : (
															       null
														      	)}
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
															<h6 className="panel-title text-semibold no-margin"><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_chitiet/"+data1.BAI} className="text-default"><span className="text-primary">Bài {data1.BAI}:</span>  {data1.TIEUDE}</a></h6>
															<div className="heading-elements">
																<span className="heading-text">{data1.USERNAME} - {data1.to_char}</span>
																{data1.USERNAME==data.dataset.username ? (
															        <ul className="list-inline list-inline-separate heading-text pull-right">
																		<li><a id={data1.ID_TACGIA} name={data1.ID_BAIHOC} className="text-danger-400" data-popup="tooltip" data-toggle="modal" data-target="#confirm"><i className="icon-cross2 position-right"/></a></li>
																	</ul>) : (
															        null
														      	)}
										                	</div>
														</div>

														<div className="panel-body">
															
															<div className="row glyphs">
																<div className="col-md-2 col-sm-3"><i className="icon-book "></i><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_sgk/"+data1.BAI+"/"+data1.TRANGSACH} ><span>Sách giáo khoa</span></a></div>
																<div className="col-md-2 col-sm-3"><i className="icon-tree7"></i><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_tip_chitiet/"+data1.BAI+"/"+data1.ID_BAIHOC}><span>Tóm tắt kiến thức</span></a></div>
																<div className="col-md-2 col-sm-3"><i className="icon-book-play"></i><a  href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_video/"+data1.BAI+"/"+data1.ID_BAIHOC}><span>Video</span></a></div>
																<div className="col-md-2 col-sm-3"><i className="icon-file-text"></i><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baitap_tracnghiem_chitiet/"+data1.BAI+"/"+data1.ID_BAIHOC}><span>Bài tập</span></a></div>
																{data1.BAITHI=='1' ? (
															       <div className="col-md-2 col-sm-3"><i className="icon-clipboard2"></i><a  href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baikiemtra/"+data1.BAI}><span>Bài kiểm tra</span></a></div>
															    ) : (
															      null
														      	)}

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
															<h6 className="panel-title text-semibold no-margin"><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_chitiet/"+data1.BAI} className="text-default"><span className="text-primary">Bài {data1.BAI}:</span>  {data1.TIEUDE}</a></h6>
															<div className="heading-elements">
																<span className="heading-text">{data1.USERNAME} - {data1.to_char}</span>
																{data1.USERNAME==data.dataset.username ? (
															        <ul className="list-inline list-inline-separate heading-text pull-right">
																		<li><a id={data1.ID_TACGIA} name={data1.ID_BAIHOC} className="text-danger-400" data-popup="tooltip" data-toggle="modal" data-target="#confirm"><i className="icon-cross2 position-right"/></a></li>
																	</ul>) : (
															        null
														      	)}
										                	</div>
														</div>

														<div className="panel-body">
															
															<div className="row glyphs">
																<div className="col-md-2 col-sm-3"><i className="icon-book "></i><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_sgk/"+data1.BAI+"/"+data1.TRANGSACH} ><span>Sách giáo khoa</span></a></div>
																<div className="col-md-2 col-sm-3"><i className="icon-tree7"></i><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_tip_chitiet/"+data1.BAI+"/"+data1.ID_BAIHOC}><span>Tóm tắt kiến thức</span></a></div>
																<div className="col-md-2 col-sm-3"><i className="icon-book-play"></i><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_video/"+data1.BAI+"/"+data1.ID_BAIHOC}><span>Video</span></a></div>
																<div className="col-md-2 col-sm-3"><i className="icon-file-text"></i><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baitap_tracnghiem_chitiet/"+data1.BAI+"/"+data1.ID_BAIHOC}><span>Bài tập</span></a></div>
																{data1.BAITHI=='1' ? (
															       <div className="col-md-2 col-sm-3"><i className="icon-clipboard2"></i><a  href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baikiemtra/"+data1.BAI}><span>Bài kiểm tra</span></a></div>
															    ) : (
															       null
														      	)}

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

							<div id="checkBaithi" className="timeline-row">

							</div>
						</div>
				    </div>

				</div>
				{/* /content area */}
				{/* confirm */}
				<div id="confirm" className="modal fade">
					<div className="modal-dialog modal-xs">
						<div className="modal-content">
							<div className="thumbnail no-border no-margin">								
						    	<div className="caption text-center">
						    		<h6 className="text-semibold no-margin-top content-group">Bạn có chắc muốn xoá bài học này!  Toàn bộ dữ liệu như bài tập, mindmap, bình luận của bài viết sẽ bị xoá hoàn toàn. </h6>
						    		<ul className="list-inline list-inline-condensed no-margin">
				                    	<li><a className="btn btn-success btn-float" data-dismiss="modal">Xoá</a></li>
				                    	<li><a className="btn btn-danger btn-float" data-dismiss="modal">Huỷ</a></li>
			                    	</ul>
						    	</div>
					    	</div>
						</div>
					</div>
				</div>
				{/* /confirm */}
				{/* confirm */}
				<div id="confirm2" className="modal fade">
					<div className="modal-dialog modal-xs">
						<div className="modal-content">
							<div className="thumbnail no-border no-margin">								
						    	<div className="caption text-center">
						    		<h6 id="uploadfile" className="text-semibold no-margin-top content-group">Thêm Sách Giáo Khoa </h6>
						    		
			                    	
						    	</div>
					    	</div>
						</div>
					</div>
				</div>
				{/* /confirm */}
			</div>
		)
	}
	componentDidMount(){
		var that= this;
		$("#uploadfile").append('<form class="fileupload" action="uploadSGK" method="post" enctype="multipart/form-data">'+
					                    		'<input type="file" id_user="5" name="upfile" class="file-styled"/>'+
					                    		'<br/>'+
					                    	'<button type="submit">Đăng Sách Giáo Khoa</button>'+
				                    	'</form>');

		url1=window.location.href;
		url1=url1.split('#');
		mon=url1[1].split('/');
		url2=window.location.href;
		url2=url2.split('lop');
		phanlop=url2[1].split('/');

		if (type_username!="trogiang") {
            $("#thembaihoc").hide();
            $("#themsgk").hide();
        }
        if (type_username=="admin") {
            $("#thembaihoc").show();
            $("#themsgk").show();
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
			if($("#sotrangsach").val()==""){
				alert("Bạn chưa nhập vị trí trang của bài học!");
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
				sotrang: $("#sotrangsach").val(),
				lop: phanlop[0],
				mon: mon[1],
				thoigian: datetime

			};
			//console.log(data);
	        $.post("themBaihoc", data, function(){
	        	$("#sobai").val("");
	        	$("#tieudebai").val("");
	        	$("#sotrangsach").val("");
	        	$("#formadd").hide();
	        	//window.location = "#/trangcanhan";
            	//Trangcanhan.dispatch(location.getCurrentPath(), null);
    		});
	    });

	     $('#listbaihoc').on('click', '.text-danger-400', function (e) {
	        var id_baihoc=$(this).attr('name');
  			console.log("click xoa");
  			//console.log("id bai hoc "+id_baihoc);
  			$('#confirm li').on('click', '.btn-success', function (e) {
	        	console.log("xac nhan xoa bai hoc");
	        	$.post("delete_baihoc",{id_baihoc: id_baihoc});
	        	return;
	    	});
	    });
	    var datax={
	        id:  id_user,
			lop: phanlop[0],
			mon: mon[1]
		};
	    $.post("checkBaithi", datax, function(data){
	    	if(data==true || type_username!="hocsinh"){
	    		$("#checkBaithi").append('<div class="timeline-icon">'+
										'<div class="bg-orange">'+
											'<i class="icon-graduation2"></i>'+
										'</div>'+
									'</div>'+
									'<div class="panel panel-flat timeline-content">'+
										'<div class="panel-heading">'+
											'<h6 class="panel-title text-semibold no-margin"><a href="#'+that.props.params.mon+'/lop'+that.props.params.lop+'/baithi/thi" className="text-default"><span class="text-primary">Bài thi:</span>  Bài thi cuối môn</a></h6>'+
										'</div>'+
										'<div class="panel-body">'+

										'</div>'+
									'</div>');
	    	}
	    	else
	    		$("#checkBaithi").append('<div class="timeline-icon">'+
										'<div class="bg-grey-300">'+
											'<i class="icon-graduation2"></i>'+
										'</div>'+
									'</div>'+
									'<div class="panel panel-flat timeline-content">'+
										'<div class="panel-heading">'+
											'<h6 class="panel-title text-semibold no-margin"><a class="text-grey"><span className="text-primary">Bài thi:</span>  Bài thi cuối môn</a></h6>'+
										'</div>'+
										'<div class="panel-body">'+

										'</div>'+
									'</div>');
	    });
	}
	componentWillMount(){
		console.log("componentWillMount");

		var that=this;

		url1=window.location.href;
		url1=url1.split('#');
		mon=url1[1].split('/');
		url2=window.location.href;
		url2=url2.split('lop');
		phanlop=url2[1].split('/');

		$.get("getUserInfo/"+id_user,function( data ){
			console.log("lay data");
			if(data.LOP<that.props.params.lop){
				console.log("khong duoc");
				$("#listbaihoc").hide();
				return;
			}
			else{
				$("#listbaihoc").show();
			}
			if(data.LOP==that.props.params.lop){
				console.log("bai hoc hien tai");
				that.setState({bai_ls: data.BAI_LICHSU});
				that.setState({bai_dl: data.BAI_DIALI});
			}
		});
		var data1={
			mon: this.props.params.mon,
			lop: this.props.params.lop,
			id: "all",
			id_user: "all"
		}
		console.log(data1);

		socket.emit('c2s_Baihoc',data1);
		socket.on('s2c_Baihoc', function(data){
			//console.log(data);
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
			if(data.LOP<that.props.params.lop){
				console.log("khong duoc");
				$("#listbaihoc").hide();
				return;
			}
			else{
				$("#listbaihoc").show();
			}
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
