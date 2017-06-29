import React from 'react';
import io from 'socket.io-client';
let socket = io('http://'+window.location.hostname+':3000');
//let socket = io('http://'+window.location.hostname);

var data = document.querySelector('#maincontent');
var url1,url2;
var id_cauhoi;
var urllop,urlmon,urlid;
var phanlop,mon,cauhoi;
var id_user=data.dataset.id;
var temp_username=data.dataset.username;
var type_user=data.dataset.type;

export class Trangcanhan extends React.Component{
	constructor(props) {
    	super(props);
      	this.state = {
        	id_user: "assets/images/user_"+data.dataset.id+".jpg",
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
							<li className="active">Trang cá nhân</li>
						</ul>

					</div>
				</div>
				{/* /page header */}

				{/* Page header */}
				<div className="page-header">
					{/* Toolbar */}
					<div className="navbar navbar-default navbar-component navbar-xs">
						<ul className="nav navbar-nav visible-xs-block">
							<li className="full-width text-center"><a data-toggle="collapse" data-target="#navbar-filter"><i className="icon-menu7"></i></a></li>
						</ul>

						<div className="navbar-collapse collapse" id="navbar-filter">
							<ul className="nav navbar-nav">
								<li className="active"><a href="#activity" data-toggle="tab"><i className="icon-menu7 position-left"></i> Hoạt động</a></li>
								<li><a id="scheduletab" href="#schedule" data-toggle="tab"><i className="icon-calendar3 position-left"></i> Quá trình </a></li>
								<li><a href="#settings" data-toggle="tab"><i className="icon-cog3 position-left"></i> Cài đặt</a></li>
								<li><a id="tag_listuser" href="#listuser" data-toggle="tab"><i className="icon-users4 position-left"></i> Quản lý học sinh</a></li>
								<li><a id="tag_listsup" href="#listsup" data-toggle="tab"><i className=" icon-users2 position-left"></i> Quản lý trợ giảng</a></li>
								<li><a id="tag_listadmin" href="#listadmin" data-toggle="tab"><i className="icon-user-tie position-left"></i>Admin</a></li>
							</ul>
						</div>
					</div>
					{/* /toolbar */}

				</div>
				{/* /page header */}

				{/* Content area */}
				<div className="content">

					{/* User profile */}
					<div className="row">
						<div className="col-lg-12">
							<div className="tabbable">
								<div className="tab-content">
									<div className="tab-pane fade in active" id="activity">

										{/* Timeline */}
										<div id="formCauhoi" className="timeline timeline-left content-group">
											<div className="timeline-container">

												{/* Blog post */}
												{this.state.listCauhoi.map(function(data1,index){
													return (
														<div key={index} className="timeline-row">
															<div className="timeline-icon">
																<div className="bg-info-400">
																	<i className="icon-question7"></i>
																</div>
															</div>

															<div className="panel panel-flat timeline-content">
																<div className="panel-heading">
																	<h6 className="panel-title text-semibold no-margin"><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/cauhoi"+data1.ID_CAUHOI} className="text-default"><a>{data1.MON=="lichsu" ? (
																																																					        <a className="text-success">Lịch sử {data1.PHANLOP} - </a>) : (
																																																					        <a>Địa lí {data1.PHANLOP} - </a>
																																																				      	)}</a>{data1.TIEUDE}</a></h6>
																	<div className="heading-elements">
																		<span className="heading-text">{data1.to_char}</span>
																		<ul className="list-inline list-inline-separate heading-text pull-right">
																			<li><a id={data1.USERNAME} name={data1.ID_CAUHOI} className="text-danger-400" data-popup="tooltip" data-toggle="modal" data-target="#confirm1"><i className="icon-cross2 position-right"/></a></li>
																		</ul>
												                	</div>
																</div>

																<div className="panel-body">
																	<blockquote>
																		<p>{data1.NOIDUNG}</p>
																	</blockquote>
																</div>

																<div className="panel-footer panel-footer-transparent">
																	<div className="heading-elements">
																		<ul className="list-inline list-inline-condensed heading-text">
																			<li><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/cauhoi"+data1.ID_CAUHOI} className="text-default"><i className="icon-comment-discussion position-left"></i> {data1.SOTRALOI}</a></li>
																			<li><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/cauhoi"+data1.ID_CAUHOI} className="text-default"><i className="icon-star-full2 text-warning-300 position-left"></i> {data1.DANHGIA}</a></li>
																		</ul>

																		<span className="heading-btn pull-right">
																			<a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/cauhoi"+data1.ID_CAUHOI} className="btn btn-link">Chi tiết <i className="icon-arrow-right14 position-right"></i></a>
																		</span>
																	</div>
																</div>
															</div>
														</div>
													)
												})}
												{/* /blog post */}

											</div>
									    </div>
									    {/* /timeline */}

									</div>

									<div className="tab-pane fade" id="schedule">

										{/* Ket qua diem */}
										<div className="panel panel-flat">
											<div className="panel-heading">
												<h5 className="panel-title">Kết quả học tập</h5>
												<div className="heading-elements">
													<ul className="icons-list">
								                		<li><a data-action="collapse"></a></li>
								                	</ul>
							                	</div>
											</div>

											<div className="panel-body">
												<div className="chart-container">
													<div className="chart has-fixed-height" id="stacked_lines"></div>	
												</div>
											</div>
										</div>
										{/* /available hours */}

										{/* Calendar */}
										<div className="panel panel-flat">
											<div className="panel-heading">
												<h6 className="panel-title">Điểm</h6>
												<div className="heading-elements">
													<ul className="icons-list">
								                		<li><a data-action="collapse"></a></li>
								                	</ul>
							                	</div>
											</div>

											<div className="panel-body">
												<div className="schedule"></div>
											</div>
										</div>
										{/* /calendar */}
									</div>

									<div className="tab-pane fade" id="settings">

										{/* Account settings */}
										<div className="col-lg-9" style={{paddingLeft: 0}} >
											<div className="panel panel-flat">
												<div className="panel-heading">
													<h5 className="panel-title">Cài đặt tài khoản</h5>
													<div className="heading-elements">
														<ul className="icons-list">
									                		<li><a data-action="collapse"></a></li>
									                		<li><a data-action="reload"></a></li>
									                		{/*<li><a data-action="close"></a></li>*/}
									                	</ul>
								                	</div>
												</div>

												<div className="panel-body">
													<form action="#" id="editInfo_form">
														<div className="form-group  has-feedback">
															<div className="row">
																<div className="col-md-6 form-group">
																	<label>Tên đăng nhập:</label>
																	<input id="username" name="username" type="text" placeholder="Tên đăng nhập của bạn" className="form-control"/>
																</div>

																<div className="col-md-6 form-group">
																	<label>Mật khẩu hiện tại:</label>
																	<input id="password" name="password" type="password"  placeholder="Nhập lại mật khẩu cũ" className="form-control"/>
																</div>
															</div>
														</div>
														<div className="form-group">
															<div className="checkbox">
																<label>
																	<input id="check_changePassword" type="checkbox" className="styled"/>
																	Đổi mật khẩu
																</label>
															</div>
														</div>
														<div id="password_new"></div>
														<div className="form-group">
															<div className="row">
																<div className="col-md-12">
																	<label>Họ và Tên:</label>
																	<input id="fullname" name="fullname" type="text" placeholder="Họ và tên của bạn" className="form-control"/>
																</div>
															</div>
														</div>
														<div className="form-group">
															<div className="row">
																<div className="col-md-6 form-group">
																	<label>Ngày sinh:</label>
																	<input id="birthday" name="birthday" type="date"  className="form-control"/>
																</div>

																<div className="col-md-6 form-group">
																	<label>Địa chỉ Email:</label>
																	<input id="email" name="email" type="email" placeholder="Địa chỉ Email của bạn"  className="form-control"/>
																</div>
															</div>
														</div>
														<div className="form-group">
															<div className="row">
																<div className="col-md-6 form-group">
																	<label>Trường:</label>
																	<input id="truong" name="truong" type="text" placeholder="Tên trường của bạn"  className="form-control"/>
																</div>

																<div className="col-md-6 form-group">
																	<label>Lớp:</label>
																	<input id="lop" name="lop" type="text" placeholder="Cấp lớp hiện tại của bạn"  className="form-control" disabled/>
																</div>
															</div>
														</div>

								                        <div className="text-right">
								                        	<button type="submit" className="btn btn-primary">Lưu lại <i className="icon-arrow-right14 position-right"></i></button>
								                        </div>
							                        </form>
												</div>
											</div>
										</div>
										{/* /account settings */}
										<div className="col-lg-3" style={{paddingRight: 0}}>
											{/* User thumbnail */}
											<div className="thumbnail">
												<div className="thumb thumb-rounded thumb-slide">
													<img src={this.state.id_user} onError={() => {this.setState({id_user : "assets/images/user.jpg"}) }} alt=""/>
													<div className="caption">
														<span>
															<a data-popup="tooltip" data-toggle="modal" data-target="#confirm2" className="btn bg-success-400 btn-icon btn-xs" ><i className="icon-plus2"></i></a>
													    </span>
													</div>
												</div>
											
										    	<div className="caption text-center">
										    		<h6 className="text-semibold no-margin">{data.dataset.username} <small className="display-block">Lớp {data.dataset.lop}</small></h6>
										    	</div>
									    	</div>
									    	{/* /user thumbnail */}


											{/* Navigation */}
									    	<div className="panel panel-flat">
												<div className="panel-heading">
													<h6 className="panel-title">Bài học hiện tại</h6>
												</div>

												<div className="list-group no-border no-padding-top">
													<a href={"#lichsu/lop"+data.dataset.lop+"/baihoc"} className="list-group-item"><i className="icon-library2"></i>Lịch Sử</a>
													<a href={"#diali/lop"+data.dataset.lop+"/baihoc"} className="list-group-item"><i className="icon-earth"></i>Địa Lí</a>
												</div>
											</div>
											{/* /navigation */}
										</div>
									</div>

									<div className="tab-pane fade" id="listuser">

										{/* List user */}
										{/* Basic datatable */}
										<div className="panel panel-flat">
											<div className="panel-heading">
												<h5 className="panel-title">Danh sách học sinh</h5>
											</div>

											<table id="table_user" className="table datatable-basic">
												<thead>
													<tr>
														<th>ID</th>
														<th>Username</th>
														<th>Họ tên</th>
														<th>Ngày sinh</th>
														<th>Email</th>
														<th>Lớp</th>
														<th>Xoá</th>
													</tr>
												</thead>
												<tbody>
												</tbody>
											</table>
										</div>
										{/* /basic datatable */}
										{/* /list user */}
									</div>
									<div className="tab-pane fade" id="listsup">

										{/* List user */}
										{/* Basic datatable */}
										<div className="panel panel-flat">
											<div className="panel-heading">
												<h5 className="panel-title">Danh sách trợ giảng</h5>
											</div>

											<table id="table_user" className="table datatable-sup">
												<thead>
													<tr>
														<th>ID</th>
														<th>Username</th>
														<th>Họ tên</th>
														<th>Ngày sinh</th>
														<th>Email</th>
														<th>Lớp</th>
														<th>Xoá</th>
													</tr>
												</thead>
												<tbody>
												</tbody>
											</table>
										</div>
										{/* /basic datatable */}
										{/* /list user */}
									</div>
									<div className="tab-pane fade" id="listadmin">

										{/* List user */}
										{/* Basic datatable */}
										<div className="panel panel-flat">
											<div className="panel-heading">
												<h5 className="panel-title">Danh sách Admin</h5>
											</div>

											<table id="table_user" className="table datatable-admin">
												<thead>
													<tr>
														<th>ID</th>
														<th>Username</th>
														<th>Họ tên</th>
														<th>Ngày sinh</th>
														<th>Email</th>
													</tr>
												</thead>
												<tbody>
												</tbody>
											</table>
										</div>
										{/* /basic datatable */}
										{/* /list user */}
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* /user profile */}

		            {/* confirm */}
					<div id="confirm" className="modal fade">
						<div className="modal-dialog modal-xs">
							<div className="modal-content">
								<div className="thumbnail no-border no-margin">								
							    	<div className="caption text-center">
							    		<h6 className="text-semibold no-margin-top content-group">Bạn có chắc muốn xoá người dùng này! Dữ liệu sẽ không thể khôi phục. </h6>
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
					<div id="confirm1" className="modal fade">
						<div className="modal-dialog modal-xs">
							<div className="modal-content">
								<div className="thumbnail no-border no-margin">								
							    	<div className="caption text-center">
							    		<h6 className="text-semibold no-margin-top content-group">Bạn có chắc muốn xoá câu hỏi này! Dữ liệu sẽ không thể khôi phục. </h6>
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
							    		<h6 id="uploadfile" className="text-semibold no-margin-top content-group">Thêm ảnh đại diện </h6>
							    		
				                    	
							    	</div>
						    	</div>
							</div>
						</div>
					</div>
					{/* /confirm */}
				</div>
				{/* /content area */}
			</div>
		)
	}
	componentDidMount()
	{

		var id_user=data.dataset.id;
		var check=false;

		// $("#uploadfile").append('<form class="fileupload" action="upload" method="post" enctype="multipart/form-data">'+
		// 							      '<input type="file" name="upfile" value=""/>'+
		// 							     '<input type="submit" />'+
		// 							    '</form>');
		$("#uploadfile").append('<form class="fileupload" action="uploadAnh" method="post" enctype="multipart/form-data">'+
					                    		'<input type="file" id_user="5" name="upfile" class="file-styled"/>'+
					                    		'<input hidden name="file_name" value="'+id_user+'"/>'+
					                    		'<br/>'+
					                    	'<button type="submit">Đăng ảnh</button>'+
				                    	'</form>');

		$('#tag_listuser').hide();
		$('#tag_listsup').hide();
		$('#tag_listadmin').hide();
		if(type_user=="admin"){
			$('#tag_listuser').show();
			$('#tag_listsup').show();
			$('#tag_listadmin').show();
		}

		console.log("validate edit info form");
		if(this.state.id_user)
		{
			console.log("co hinh");
		}
		else{
			console.log("khong hinh");
		}
		//set default value
		$.get("getUserInfo/"+id_user,function( data ){
			console.log("lay data");
			console.log(data);
			$("#username").val(data.USERNAME),
			$("#fullname").val(data.HOTEN),
			$("#email").val(data.EMAIL),
		    $("#lop").val(data.LOP),
		    $("#truong").val(data.TRUONG),
		    $("#birthday").val(data.to_char)
		})

		//hide change password
		$('#check_changePassword').click(function (event) {
	        if (this.checked) {
	            console.log("check");
	            check=true;
	            $("#password_new").append('<div id="password_new" class="form-group has-feedback">'+
									'<div class="row">'+
										'<div class="col-md-6 form-group">'+
											'<label>Mật khẩu mới:</label>'+
											'<input id="password1" name="password1" type="password" placeholder="Mật khẩu mới của bạn" class="form-control"/ >'+
										'</div>'+

										'<div class="col-md-6 form-group">'+
											'<label>Xác nhận lại mật khẩu:</label>'+
											'<input id="password2" name="password2" type="password" placeholder="Xác nhận lại mật khẩu" class="form-control"/>'+
										'</div>'+
									'</div>'+
								'</div>');
	        } else {
	            console.log("uncheck");
	            check=false;
	            $("#password_new").children().remove();
	        }
	    });
		

	    jQuery.validator.addMethod("noSpace", function(value, element) { 
        	return value.indexOf(" ") < 0 && value != ""; 
	    }, "No space please and don't leave it empty");

	    $("#editInfo_form").validate({
	    	errorElement: 'div',
	        errorClass: 'help-block',
	        focusInvalid: false,
	        ignore: "",
	        rules: {
	            'username':{
	                required: true,
	                noSpace: true,
	                minlength: 2,
	                maxlength: 20,
	                remote: {
	                    url: "checkLoginUsername",
	                    type: "post",
	                    data: {
	                    	id: function() {
	                        	return data.dataset.id;
	                        },
	                      	username: function() {
	                        	return $("#username").val();
	                        }
	                    }
	                }        
	            },
	            'fullname': {
	                required: true,
	                minlength: 2,
	                maxlength: 50
	            },
	            'birthday': {
	            	required: true
	            },
	            'email': {
	                required: true,
	                email: true,
	                remote: {
	                    url: "checkLoginEmail",
	                    type: "post",
	                    data: {
	                    	id: function() {
	                        	return data.dataset.id;
	                        },
	                      	email: function() {
	                        	return $("#email").val();
	                        }
	                    }
	                }
	            },
	            'truong': {
	                required: true
	            },
	            'lop': {
	                required: true,
	                max: 9,
	                min: 6
	            },
	            'password': {
	                required: true,
	                remote: {
	                    url: "checkPassword",
	                    type: "post",
	                    data: {
	                    	id: function() {
	                        	return data.dataset.id;
	                        },
	                      	password: function() {
	                        	return $("#password").val();
	                        }
	                    }
	                }
	            },
	            'password1': {
	                required: true,
	                minlength: 8
	            },
	            'password2': {
	                required: true,
	                equalTo: "#password1"
	            }

	        },
	        messages: {
	            'username':{
	                required: "Xin điền tên đăng nhập",
	                noSpace: "Tên đăng nhập không thể có ký tự khoảng cách",
	                minlength: "Tên đăng nhập phải nhiều hơn 2 ký tự",
	                maxlength: "Tên đăng nhập phải ít hơn 20 ký tự",
	                remote: "Tên đăng nhập đã được sử dụng. Xin thử tên khác!"
	            },
	            'fullname': {
	                required: "Xin điền họ tên đầy đủ của bạn",
	                minlength: "Họ tên phải nhiều hơn 2 ký tự",
	                maxlength: "Họ tên phải ít hơn 50 ký tự"
	            },
	            'birthday':{
	            	required: "Xin nhập ngày sinh của bạn"
	            },
	            'email': {
	                required: "Xin nhập địa chỉ email",
	                email: "Đây không phải là định dạng email",
	                remote: "Email này đã được sử dụng. Xin thử email khác!"
	            },
	            'truong': {
	                required: "Xin nhập tên trường học của bạn. Nếu không hay điền 'Không'"
	            },
	            'lop': {
	                required: "Xin nhập lớp học của bạn",
	                max: "Lớp học phải thuộc các lớp 6, 7, 8, 9",
	                min: "Lớp học phải thuộc các lớp 6, 7, 8, 9"
	            },
	            'password': {
	            	required: "Xin nhập mật khẩu hiện tại",
	                remote: "Mật khẩu chưa đúng"
	            },
	            'password1': {
	                required: "Xin nhập mật khẩu mới",
	                minlength: "Mật khẩu ít nhất 8 ký tự"
	            },
	            'password2': {
	                required: "Xác nhận lại mật khẩu",
	                equalTo: "Mật khẩu chưa trùng khớp"
	            }

	        },
	        highlight: function (e) {
	            $(e).closest('.form-group').removeClass('has-info').addClass('has-error');
	        },

	        success: function (e) {
	            $(e).closest('.form-group').removeClass('has-error');//.addClass('has-info');
	            $(e).remove();
	        },
	        submitHandler: function (form) {
	        	if(check==false)
	        	{
	        		console.log("vao uncheck");
	        		var data={
				        id:       id_user,
						username: $("#username").val(),
						fullname: $("#fullname").val(),
						password: $("#password").val(),
						email: 	  $("#email").val(),
			            lop:      $("#lop").val(),
			            truong:   $("#truong").val(),
			            birthday: $("#birthday").val(),
			            type: "hocsinh"
					};
					console.log(data);
			        $.post("updateUserInfo", data, function(){
			        	alert("Đã thay đổi thông tin thành công!");
			        	window.location = "#/trangcanhan";
	                	//Trangcanhan.dispatch(location.getCurrentPath(), null);
            		});
	        	}
	        	else{
	        		console.log("vao check");
					var data={
				        id:       id_user,
						username: $("#username").val(),
						fullname: $("#fullname").val(),
						password: $("#password1").val(),
						email: 	  $("#email").val(),
			            lop:      $("#lop").val(),
			            truong:   $("#truong").val(),
			            birthday: $("#birthday").val(),
			            type: "hocsinh"
					};
					console.log(data);
			        $.post("updateUserInfo", data, function(){
			        	window.location = "/dangxuat";
			        	alert("Đã thay đổi mật khẩu. Xin đăng nhập lại!");
	                	//Trangcanhan.dispatch(location.getCurrentPath(), null);
	            	});
				}

	        }
	    });
	    $('#formCauhoi').on('click', '.text-danger-400', function (e) {
	        var usernameClick = $(this).attr('id');
	        var type = $(this).parent().attr('id');
	        var idCauhoi=$(this).attr('name');
	        $('#confirm1 li').on('click', '.btn-success', function (e) {
	        	console.log("xac nhan xoa user");
	        	$.post("delete_cauhoi",{id_cauhoi:idCauhoi });
	        	return;
	    	});
			
	    });

	    // Table setup
	    // ------------------------------

	    // Setting datatable defaults
	    $.extend( $.fn.dataTable.defaults, {
	        autoWidth: false,
	        columnDefs: [{ 
	            orderable: false,
	            width: '100px',
	            targets: [ 5 ]
	        }],
	        dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
	        language: {
	            search: '<span>Tìm kiếm:</span> _INPUT_',
	            lengthMenu: 'Hiển thị: _MENU_',
	            info: "<span>Hiển thị:</span> _START_ đến _END_ trong tổng _TOTAL_ người dùng",
	            paginate: { 'first': 'First', 'last': 'Last', 'next': '&rarr;', 'previous': '&larr;' }
	        },
	        drawCallback: function () {
	            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');
	        },
	        preDrawCallback: function() {
	            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');
	        }
	    });

	    var userTable;
		$.post( "/list_user/typehocsinh", function( data ) {
			// Basic datatable
		    userTable=$('.datatable-basic').DataTable({
		    	bAutoWidth: false,
		    	"aaData": data,
		    	"aoColumnDefs": [
                    {"aTargets": [ 0 ], "bSortable": true },
                    {"aTargets": [ 1 ], "bSortable": true },
                    {"aTargets": [ 2 ], "bSortable": true },
                    {"aTargets": [ 3 ], "bSortable": true },    
                    {"aTargets": [ 4 ], "bSortable": true },
                    {"aTargets": [ 5 ], "bSortable": true },
                    {"aTargets": [ 6 ], "bSortable": false }
                ],
		        "aoColumns": [
			        { "mDataProp": "ID" },
			        { "mDataProp": "USERNAME" },
			        { "mDataProp": "HOTEN" },
			        { "mDataProp": "to_char" },
			        { "mDataProp": "EMAIL" },
			        { "mDataProp": "LOP" },
			        { "render": function(data, type, full, meta){
                        var tool_bar = '<div class="hidden-sm hidden-xs action-buttons">'+
                                        '<a class="text-danger-400" data-popup="tooltip" data-toggle="modal" data-target="#confirm">'+
                                            '<i class="icon-x"></i>'+
                                        '</a>'+
                                    '</div>'
                        return tool_bar;
                        }
                    }
		    	]

		    });
		    return;
		});
		$.post( "/list_user/typetrogiang", function( data ) {
			// Basic datatable
		    $('.datatable-sup').DataTable({
		    	bAutoWidth: false,
		    	"aaData": data,
		    	"aoColumnDefs": [
                    {"aTargets": [ 0 ], "bSortable": true },
                    {"aTargets": [ 1 ], "bSortable": true },
                    {"aTargets": [ 2 ], "bSortable": true },
                    {"aTargets": [ 3 ], "bSortable": true },    
                    {"aTargets": [ 4 ], "bSortable": true },
                    {"aTargets": [ 5 ], "bSortable": true },
                    {"aTargets": [ 6 ], "bSortable": false }
                ],
		        "aoColumns": [
			        { "mDataProp": "ID" },
			        { "mDataProp": "USERNAME" },
			        { "mDataProp": "HOTEN" },
			        { "mDataProp": "to_char" },
			        { "mDataProp": "EMAIL" },
			        { "mDataProp": "LOP" },
			        { "render": function(data, type, full, meta){
                        var tool_bar = '<div class="hidden-sm hidden-xs action-buttons">'+
                                        '<a class="text-danger-400" data-popup="tooltip" data-toggle="modal" data-target="#call">'+
                                            '<i class="icon-x"></i>'+
                                        '</a>'+
                                    '</div>'
                        return tool_bar;
                        }
                    }
		    	]

		    });
		    return;
		});
		$.post( "/list_user/typeadmin", function( data ) {
			// Basic datatable
		    $('.datatable-admin').DataTable({
		    	bAutoWidth: false,
		    	"aaData": data,
		    	"aoColumnDefs": [
                    {"aTargets": [ 0 ], "bSortable": true },
                    {"aTargets": [ 1 ], "bSortable": true },
                    {"aTargets": [ 2 ], "bSortable": true },
                    {"aTargets": [ 3 ], "bSortable": true },    
                    {"aTargets": [ 4 ], "bSortable": true }
                ],
		        "aoColumns": [
			        { "mDataProp": "ID" },
			        { "mDataProp": "USERNAME" },
			        { "mDataProp": "HOTEN" },
			        { "mDataProp": "to_char" },
			        { "mDataProp": "EMAIL" }
		    	]

		    });
		    return;
		});

	    // Alternative pagination
	    $('.datatable-pagination').DataTable({
	        pagingType: "simple",
	        language: {
	            paginate: {'next': 'Next &rarr;', 'previous': '&larr; Prev'}
	        }
	    });


	    // Datatable with saving state
	    $('.datatable-save-state').DataTable({
	        stateSave: true
	    });


	    // Scrollable datatable
	    $('.datatable-scroll-y').DataTable({
	        autoWidth: true,
	        scrollY: 300
	    });



	    // External table additions
	    // ------------------------------

	    // Add placeholder to the datatable filter option
	    $('.dataTables_filter input[type=search]').attr('placeholder','Fuck...');


	    // Enable Select2 select for the length option
	    $('.dataTables_length select').select2({
	        minimumResultsForSearch: Infinity,
	        width: 'auto'
	    });

	    $('#table_user tbody').on('click', '.icon-x', function (e) {
	        var id = $(this).closest('tr').children('td:first').text();
	        console.log("xoa user");
	        console.log(id);
	        $('#confirm li').on('click', '.btn-success', function (e) {
	        	console.log("xac nhan xoa user");
	        	$.post("delete_user",{id: id});
	        	//userTable.ajax.reload();
	        	//userTable.clear();
				//userTable.fnAddData(data);
				//userTable.draw();
	        	return;
	    	});
	    });

	    //chart setup
	    var echarts = require('echarts');

        var stacked_lines = echarts.init(document.getElementById('stacked_lines'));
        var datax=[
                        'LS-Bai 1', 'LS-Bai 2', 'LS-Bai 3', 'LS-Bai 4', 'LS-Bai 5', 'LS-Bai 6', 'LS-Bai 7'
                    ];
        stacked_lines.setOption({

                // Setup grid
                grid: {
                    x: 40,
                    x2: 20,
                    y: 35,
                    y2: 25
                },

                // Add tooltip
                tooltip: {
                    trigger: 'axis'
                },

                // Add legend
                legend: {
                    data: ['Lịch Sử', 'Địa Lí']
                },

                // Enable drag recalculate
                calculable: true,

                // Hirozontal axis
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: datax
                }],

                // Vertical axis
                yAxis: [{
                    type: 'value'
                }],

                // Add series
                series: [
                    {
                        name: 'Lịch Sử',
                        type: 'line',
                        data: [8, 9, 7, 5]
                    },
                    {
                        name: 'Địa Lí',
                        type: 'line',
  
                        data: [3, 5, 3, 6, 7, 8, 8]
                    }
                ]
       	});
       	$('#scheduletab').on('click', function () {
       		stacked_lines.resize();
       	});
       	setTimeout(function () {
            stacked_lines.resize();
        }, 2000);
	    window.onresize = function () {
            setTimeout(function () {
                stacked_lines.resize();
            }, 200);
        }
	}
	componentWillMount()
	{
		console.log("componentWillMount");

		var that=this;

		var data1={
			mon: "all",
			lop: "all",
			id: "all",
			id_user: id_user
		}
		console.log(data1);
		socket.emit('c2s_Thaoluan',data1);
		socket.on('s2c_Thaoluan', function(data){
			console.log(data);
			if(data.length==0 && $(".timeline-row").length==0){
				console.log("chua co bai biet");
				$("#formCauhoi").children().append(
					'<div class="timeline-row">'+
						'<div class="timeline-icon">'+
							'<img src="assets/images/placeholder.jpg" alt=""/>'+
						'</div>'+

						'<div class="panel panel-flat timeline-content">'+
							'<div class="panel-heading">'+
								'<h6 class="panel-title text-semibold no-margin"><a class="text-default">Không có hoạt động nào!</a></h6>'+
							'</div>'+

							'<div class="panel-body">'+
								'<blockquote>'+
									'<p>Hiện tại bạn chưa có hoạt động nào</p>'+
								'</blockquote>'+
							'</div>'+
						'</div>'+
					'</div>'
					);

			}
			that.setState({listCauhoi: data});
		});
		////
	}
}