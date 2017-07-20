import React from 'react';
import io from 'socket.io-client';
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

export class thaoluan extends React.Component{
	constructor(props) {
    	super(props);
  		this.state = {
        	listCauhoi: []
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
							<li className="active" id="link_pre"></li>
							
						</ul>

						<ul className="breadcrumb-elements">
							<li ><a id="themcauhoi" ><i className="icon-plus-circle2 position-left"></i>Thêm câu hỏi</a></li>
						</ul>
					</div>
				</div>
				{/* /page header */}


				{/* Content area */}
				<div id="formCauhoi" className="content">
					<div id="formadd" className="col-lg-12">
						<div className="panel panel-flat blog-horizontal blog-horizontal-2">
							<div className="panel-body">

								<div className="blog-preview">
									<div className="panel-body">
										<div className="form-group">
											<label >Tiêu đề: </label>
											<input id="add_tieude" type="text" className="form-control" placeholder="Tiêu đề câu hỏi"/>
										</div>
										<div className="form-group">
											<label>Nội dung câu hỏi: </label>
											<textarea id="add_noidung" rows="3" cols="3" className="form-control" placeholder="Nội dung câu hỏi của bạn"></textarea>
										</div>

										<div className="text-right">
											<button id="addcauhoi" type="submit" className="btn bg-teal-400">Đăng câu hỏi <i className="icon-arrow-right14 position-right"></i></button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>	
					{this.state.listCauhoi.map(function(data1,index){
						return (
							<div key={index} className="col-lg-12">
								<div className="panel panel-flat blog-horizontal blog-horizontal-2">
									<div className="panel-body">

										<div className="blog-preview">
											<div className="content-group-sm media blog-title stack-media-on-mobile text-left">
												<div className="media-body">
													{data1.USERNAME==data.dataset.username ? (
												        <ul className="list-inline list-inline-separate heading-text pull-right">
															<li><a id={data1.USERNAME} name={data1.ID_CAUHOI} className="text-danger-400" data-popup="tooltip" data-toggle="modal" data-target="#confirm"><i className="icon-cross2 position-right"/></a></li>
														</ul>) : (
												        <div/>
											      	)}
													<h5 className="text-semibold no-margin"><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/cauhoi"+data1.ID_CAUHOI} className="text-default">{data1.TIEUDE}</a></h5>

													<ul className="list-inline list-inline-separate no-margin text-muted">
														<li>Đăng bởi: <a >{data1.USERNAME}</a></li>
														<li>{data1.to_char}</li>
													</ul>
												</div>
											</div>

											<p>{data1.NOIDUNG}</p>
											
										</div>
									</div>

									<div className="panel-footer panel-footer-condensed"><a className="heading-elements-toggle"><i className="icon-more"></i></a>
										<div className="heading-elements">
											{data1.USERNAME==data.dataset.username ? (
										        <ul className="list-inline list-inline-separate heading-text">
													<li><i className="icon-comment-discussion position-left"></i> {data1.SOTRALOI} trả lời</li>
													<li>
														Đánh giá:&nbsp;
														<span className="text-muted position-right">{data1.DANHGIA}&nbsp;</span>
														<i className="icon-star-full2 text-size-base text-warning-300"></i>
													
													</li>
												</ul>) : (
										        <ul className="list-inline list-inline-separate heading-text">
													<li><i className="icon-comment-discussion position-left"></i> {data1.SOTRALOI} trả lời</li>
													<li>
														Đánh giá:&nbsp;
														<span className="text-muted position-right">{data1.DANHGIA}&nbsp;</span>
														<i className="icon-star-full2 text-size-base text-warning-300"></i>
														<a id="up_cauhoi" name={data1.ID_CAUHOI} alt={data1.USERNAME}><i className="icon-arrow-up22 text-success"></i></a>
														<a id="down_cauhoi" name={data1.ID_CAUHOI} alt={data1.USERNAME}><i className="icon-arrow-down22 text-danger"></i></a>
													</li>
												</ul>
									      	)}
																						
											<a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/cauhoi"+data1.ID_CAUHOI} className="heading-text pull-right">Chi tiết <i className="icon-arrow-right14 position-right"></i></a>
										</div>
									</div>
								</div>
							</div>
						)
					})}
				</div>
				{/* /content area */}
				{/* confirm */}
				<div id="confirm" className="modal fade">
					<div className="modal-dialog modal-xs">
						<div className="modal-content">
							<div className="thumbnail no-border no-margin">								
						    	<div className="caption text-center">
						    		<h6 className="text-semibold no-margin-top content-group">Bạn có chắc muốn xoá câu hỏi này!  Dữ liệu sẽ không thể khôi phục. </h6>
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
			</div>
		)
	}
	componentDidMount()
	{
		console.log("componentDidMount");
		
		url1=window.location.href;
		url1=url1.split('#');
		mon=url1[1].split('/');

		url2=window.location.href;
		url2=url2.split('lop');
		phanlop=url2[1].split('/');

		$("#formadd").hide();
		$('#themcauhoi').click(function (event) {
			console.log("io click");
	        if (check) {
	            check=false;
	            $("#formadd").show();
	        } else {
	            check=true;
	            $("#formadd").hide();
	        }
	    });

	    $('#addcauhoi').click(function () {
	    	if($("#add_tieude").val()=="")
				return;
			if($("#add_noidung").val()=="")
				return;
			var currentdate = new Date();
			var datetime =currentdate.getFullYear() + "-"
			    + (currentdate.getMonth()+1)  + "-" 
			    + currentdate.getDate() +" "
			    + currentdate.getHours() + ":"  
			    + currentdate.getMinutes() + ":" 
			    + currentdate.getSeconds();

			var data={
		        id:       id_user,
		        tieude: $("#add_tieude").val(),
				noidung: $("#add_noidung").val(),
				lop: phanlop[0],
				mon: mon[1],
				thoigian: datetime

			};
			//console.log(data);
	        $.post("themCauhoi", data, function(){
	        	$("#add_tieude").val("");
	        	$("#add_noidung").val("");
	        	$("#formadd").hide();
	        	//window.location = "#/trangcanhan";
            	//Trangcanhan.dispatch(location.getCurrentPath(), null);
    		});
	    });
	    $('#formCauhoi').on('click', '.text-success,.text-danger,.text-danger-400', function (e) {
	        var usernameClick = $(this).attr('id');
	        var type = $(this).parent().attr('id');
	        var id_cauhoi1=$(this).attr('name');

	        if($(this).attr('class')=="text-danger-400" )
	  		{
	  			console.log("click xoa");
	  			$('#confirm li').on('click', '.btn-success', function (e) {
		        	console.log("xac nhan xoa user");
		        	$.post("delete_cauhoi",{id_cauhoi: id_cauhoi1});
		        	return;
		    	});
	  		}
	  		else{
		  		if($(this).parent().attr('alt')==temp_username)
		  			return;
		        var data={
			        id_cauhoi: $(this).parent().attr('name'),
			        type: type
				};
		        $.post("rate_cauhoi", data, function(){
		        	return;
	    		});
		    }
	    });
	}
	componentWillMount()
	{
		console.log("componentWillMount");
		url1=window.location.href;
		url1=url1.split('#');
		mon=url1[1].split('/');

		url2=window.location.href;
		url2=url2.split('lop');
		phanlop=url2[1].split('/');

	

		var that=this;

		var data1={
			mon: mon[1],
			lop: phanlop[0],
			id: "all",
			id_user: "all"
		}
		//console.log(data1);
		socket.emit('c2s_Thaoluan',data1);
		socket.on('s2c_Thaoluan', function(data){
			//console.log(data);
			var mon1;
			if(mon[1]=="lichsu")
				mon1="Lịch sử";
			if(mon[1]=="diali")
				mon1="Địa lí";

			var name_link="Thảo luận "+mon1+" lớp "+phanlop[0]; 
			$("#link_pre").text(name_link);
			$(".timeline-row").remove();
			if(data.length==0 && $(".timeline-row").length==0){
				console.log("chua co bai biet");
				$("#formadd").parent().append(
					'<div id="note_emty" class="timeline-row">'+
						'<div class="panel panel-flat timeline-content">'+
							'<div class="panel-heading">'+
								'<h6 class="panel-title text-semibold no-margin"><a class="text-default">Không có câu hỏi nào!</a></h6>'+
							'</div>'+

							'<div class="panel-body">'+
								'<blockquote>'+
									'<p>Hiện tại chưa có câu hỏi nào</p>'+
								'</blockquote>'+
							'</div>'+
						'</div>'+
					'</div>'
					);
			}
			else{
				$("#note_emty").remove();
			} 

			that.setState({listCauhoi: data});
		});
		////
	}
	componentWillReceiveProps(newProps)
	{
		console.log("componentWillReceiveProps");
		// var that=this;

		url1=window.location.href;
		url1=url1.split('#');
		mon=url1[1].split('/');

		url2=window.location.href;
		url2=url2.split('lop');
		phanlop=url2[1].split('/');
		
		var data1={
			mon: mon[1],
			lop: phanlop[0],
			id: "all",
			id_user: "all"
		}
		socket.emit('c2s_Thaoluan',data1);
		// $.post("Hoidap_lichsu/lop"+newProps.params.lop+"/idall", function(data){
		// 	//that.setState({noidung: data})
		// 	that.setState({listCauhoi: data});
		// });
	}
}
