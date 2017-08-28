import React from 'react';
import io from 'socket.io-client';
var urlsocket;
if(window.location.hostname=="localhost")
	urlsocket='http://'+window.location.hostname+':3000';
else
	urlsocket='http://'+window.location.hostname;
let socket = io(urlsocket);

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
        	id_user: "assets/images/user/user_"+data.dataset.id+".jpg",
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
								<li className="active"><a id="hoatdong" href="#activity" data-toggle="tab"><i className="icon-menu7 position-left"></i> Hoạt động</a></li>
								<li><a id="scheduletab" href="#schedule" data-toggle="tab"><i className="icon-calendar3 position-left"></i> Thống kê </a></li>
								<li><a id="caidat" href="#settings" data-toggle="tab"><i className="icon-cog3 position-left"></i> Cài đặt</a></li>
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
																	<h6 className="panel-title text-semibold no-margin"><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/cauhoi"+data1.ID_CAUHOI} className="text-default">{data1.MON=="lichsu" ? (
																																																					        <span className="text-success">Lịch sử {data1.PHANLOP} - </span>) : (
																																																					        <span className="text-primary">Địa lí {data1.PHANLOP} - </span>
																																																				      	)}{data1.TIEUDE}</a></h6>
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
										<div id="hoctapkq" className="row">
											<div className="col-md-6">
												<div className="panel panel-flat">
													<div className="panel-heading">
														<h5 className="panel-title">Kết quả học tập môn Lịch Sử</h5>
														<div className="heading-elements">
															<ul className="icons-list">
										                		<li><a data-action="collapse"></a></li>
										                	</ul>
									                	</div>
													</div>

													<div className="panel-body">
														<div className="chart-container">
															<div className="chart has-fixed-height" id="stacked_lines_ls"></div>	
														</div>
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="panel panel-flat">
													<div className="panel-heading">
														<h5 className="panel-title">Kết quả học tập môn Địa Lí</h5>
														<div className="heading-elements">
															<ul className="icons-list">
										                		<li><a data-action="collapse"></a></li>
										                	</ul>
									                	</div>
													</div>

													<div className="panel-body">
														<div className="chart-container">
															<div className="chart has-fixed-height" id="stacked_lines_dl"></div>	
														</div>
													</div>
												</div>
											</div>
										</div>	
										{/* /available hours */}
										<div id="bieudokq"  className="row">
											<div className="col-md-6">
												<div className="panel panel-flat">
													<div className="panel-heading">
														<h5 className="panel-title">Tổng hợp số học sinh đạt điểm môn Lịch Sử</h5>
														<div className="heading-elements">
															<ul className="icons-list">
										                		<li><a data-action="collapse"></a></li>
										                	</ul>
									                	</div>
													</div>

													<div className="panel-body">
														<div className="chart-container">
															<div className="chart has-fixed-height" id="columns_kq_ls"></div>	
														</div>
													</div>
												</div>
											</div>
											<div className="col-md-6">
												<div className="panel panel-flat">
													<div className="panel-heading">
														<h5 className="panel-title">Tổng hợp số học sinh đạt điểm môn Địa Lí</h5>
														<div className="heading-elements">
															<ul className="icons-list">
										                		<li><a data-action="collapse"></a></li>
										                	</ul>
									                	</div>
													</div>

													<div className="panel-body">
														<div className="chart-container">
															<div className="chart has-fixed-height" id="columns_kq_dl"></div>	
														</div>
													</div>
												</div>
											</div>
										</div>
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
																	<input id="fullname1" name="fullname" type="text" placeholder="Họ và tên của bạn" className="form-control"/>
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
																	<input id="lop" name="lop" type="text" placeholder="Cấp lớp hiện tại của bạn"  className="form-control"/>
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
													<img src={this.state.id_user} onError={() => {this.setState({id_user : "assets/images/user/user.jpg"}) }} alt=""/>
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
														<th>Chức năng</th>
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
					{/* confirm */}
					<div id="confirm3" className="modal fade">
						<div className="modal-dialog modal-xs">
							<div className="modal-content">
								<div className="thumbnail no-border no-margin">								
							    	<div className="caption text-center">
							    		<h6 className="text-semibold no-margin-top content-group">Bạn có chắc muốn chuyển người dùng này thành loại người dùng 'Giáo Viên'</h6>
							    		<ul className="list-inline list-inline-condensed no-margin">
					                    	<li><a className="btn btn-success btn-float" data-dismiss="modal">Đồng ý</a></li>
					                    	<li><a className="btn btn-danger btn-float" data-dismiss="modal">Huỷ</a></li>
				                    	</ul>
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
		//chuyen tab
		console.log("tag "+this.props.params.tab)
		if(this.props.params.tab=="caidat"){
			$("#caidat").click();
		}
		else if(this.props.params.tab=="hoatdong"){
				$("#hoatdong").click();
		}
		else if(this.props.params.tab=="quatrinh"){
				$("#scheduletab").click();
		}
		else if(this.props.params.tab=="quanlyuser"){
				$("#tag_listuser").click();
		}
		else if(this.props.params.tab=="quanlygiaovien"){
				$("#tag_listsup").click();
		}
		else if(this.props.params.tab=="quanlyadmin"){
				$("#tag_listadmin").click();
		}
		var id_user=data.dataset.id;
		var check=false;

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
		if(type_user=="trogiang"){
			$('#tag_listuser').show();
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
			//console.log(data);
			$("#username").val(data.USERNAME),
			$("#fullname1").val(data.HOTEN),
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
	            	required: "Xin nhập mật khẩu hiện tại (Mật khẩu mặc định là '0000' cho tài khoản chưa kích hoạt)",
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
						fullname: $("#fullname1").val(),
						password: $("#password").val(),
						email: 	  $("#email").val(),
			            lop:      $("#lop").val(),
			            truong:   $("#truong").val(),
			            birthday: $("#birthday").val(),
			            type: "hocsinh"
					};
					//console.log(data);
			        $.post("updateUserInfo", data, function(){
			        	alert("Đã thay đổi thông tin thành công!");
			        	window.location.reload(true);
	                	//Trangcanhan.dispatch(location.getCurrentPath(), null);
            		});
	        	}
	        	else{
	        		console.log("vao check");
					var data={
				        id:       id_user,
						username: $("#username").val(),
						fullname: $("#fullname1").val(),
						password: $("#password1").val(),
						email: 	  $("#email").val(),
			            lop:      $("#lop").val(),
			            truong:   $("#truong").val(),
			            birthday: $("#birthday").val(),
			            type: "hocsinh"
					};
					//console.log(data);
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
                                        '</a>';
                        if(type_user=="admin"){
                        	tool_bar+='&nbsp;&nbsp;'+
                                        '<a class="text-success-400" data-popup="tooltip" data-toggle="modal" data-target="#confirm3">'+
                                            '<i class="icon-arrow-right16"></i>'+
                                        '</a>';
                        }
                                    	
                        tool_bar+='</div>';
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
                    {"aTargets": [ 5 ], "bSortable": false }
                ],
		        "aoColumns": [
			        { "mDataProp": "ID" },
			        { "mDataProp": "USERNAME" },
			        { "mDataProp": "HOTEN" },
			        { "mDataProp": "to_char" },
			        { "mDataProp": "EMAIL" },
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
	        	$.post("delete_user",{id: id},function(){
	        		window.location.reload(true);
	        	});
	        	//userTable.ajax.reload();
	        	//userTable.clear();
				//userTable.fnAddData(data);
				//userTable.draw();
	        	return;
	    	});
	    });
	    ///chuyen hoc sinh -> giao vien
	    $('#table_user tbody').on('click', '.icon-arrow-right16', function (e) {
	        var id = $(this).closest('tr').children('td:first').text();
	        console.log("chuyen user");
	        $('#confirm3 li').on('click', '.btn-success', function (e) {
	        	console.log("xac nhan xoa user");
	        	$.post("chuyen_user",{id: id},function(){
	        		window.location.reload(true);
	        	});
	        	return;
	    	});
	    });
		//chart setup
	    var echarts = require('echarts');
        // var datals=[8,7.5,9];
        // var datals6=[4,,8];
        // var datadl=[8,6.5];
        // var dataxls=['Bài 1', 'Bài 2', 'Bài 3'];
        // var dataxdl=['Bài 1', 'Bài 2'];
        var dataxlsfull=[''];
        var dataxdlfull=[''];
        var dataxls=[''];
        var dataxdl=[''];
        var datals6=[];
        var datals7=[];
        var datals8=[];
        var datals9=[];
        var datadl6=[];
        var datadl7=[];
        var datadl8=[];
        var datadl9=[];

        var cdatals6=[];
        var cdatals7=[];
        var cdatals8=[];
        var cdatals9=[];
        var cdatadl6=[];
        var cdatadl7=[];
        var cdatadl8=[];
        var cdatadl9=[];

        var stacked_lines_ls = echarts.init(document.getElementById('stacked_lines_ls'));
        var stacked_lines_dl = echarts.init(document.getElementById('stacked_lines_dl'));
        var basic_columns_ls = echarts.init(document.getElementById('columns_kq_ls'));
        var basic_columns_dl = echarts.init(document.getElementById('columns_kq_dl'));
        if(type_user=="hocsinh"){
        	$('#bieudokq').hide();
        }
        else{
        	$('#hoctapkq').hide();
        }
        $.post("layKetqua",{id: id_user},function(dataa){
        	console.log("ket qua ");
        	console.log(dataa);
        	for(var i=0;i<dataa.length;i++){
        		//datay.push(dataa[i].ID_BAIHOC)
        		
        		if(dataa[i].MON=="lichsu")
        		{
        			dataxlsfull.push("Bài "+dataa[i].ID_BAIHOC);
        			if(dataa[i].LOP=='6')
        				datals6.push(['Bài '+dataa[i].ID_BAIHOC,dataa[i].DIEM]);
        			if(dataa[i].LOP=='7')
        				datals7.push(['Bài '+dataa[i].ID_BAIHOC,dataa[i].DIEM]);
        			if(dataa[i].LOP=='8')
        				datals8.push(['Bài '+dataa[i].ID_BAIHOC,dataa[i].DIEM]);
        			if(dataa[i].LOP=='9')
        				datals9.push(['Bài '+dataa[i].ID_BAIHOC,dataa[i].DIEM]);
        			// dataxls.push("Bài "+dataa[i].ID_BAIHOC);
        			// datals.push(dataa[i].DIEM);
        		}
        		if(dataa[i].MON=="diali")
        		{
        			dataxdlfull.push("Bài "+dataa[i].ID_BAIHOC);
        			if(dataa[i].LOP=='6')
        				datadl6.push(['Bài '+dataa[i].ID_BAIHOC,dataa[i].DIEM]);
        			if(dataa[i].LOP=='7')
        				datadl7.push(['Bài '+dataa[i].ID_BAIHOC,dataa[i].DIEM]);
        			if(dataa[i].LOP=='8')
        				datadl8.push(['Bài '+dataa[i].ID_BAIHOC,dataa[i].DIEM]);
        			if(dataa[i].LOP=='9')
        				datadl9.push(['Bài '+dataa[i].ID_BAIHOC,dataa[i].DIEM]);
        		}
        	}

		    $.each(dataxlsfull, function(i, e) {
		        if ($.inArray(e, dataxls) == -1) dataxls.push(e);
		    });
			$.each(dataxdlfull, function(i, e) {
		        if ($.inArray(e, dataxdl) == -1) dataxdl.push(e);
		    });

        	console.log(datals6);
	        stacked_lines_ls.setOption({

                // Setup grid
                // grid: {
                //     x: 40,
                //     x2: 20,
                //     y: 35,
                //     y2: 25
                // },

                // Add tooltip
                tooltip: {
                    trigger: 'axis'
                },

                // Add legend
                legend: {
                    data: ['Lịch Sử 6', 'Lịch Sử 7','Lịch Sử 8', 'Lịch Sử 9']
                },

                // Enable drag recalculate
                calculable: true,
                // Display toolbox
                toolbox: {
                    show: true,
                    left: '20',
                    bottom: '20',
                    feature: {
                        dataView: {
                            show: true,
                            readOnly: false,
                            title: 'Xem dữ liệu',
                            lang: ['View chart data', 'Close', 'Update']
                        },
                        magicType: {
                            show: true,
                            title: {
                                line: 'Chuyển dạng đường',
                                bar: 'Chuyển dạng cột',
                            },
                            type: ['line', 'bar']
                        },
                        saveAsImage: {
                            show: true,
                            title: 'Lưu hình',
                            lang: ['Save']
                        }
                    }
                },
                // Hirozontal xAxis
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: dataxls
                }],

                // Vertical axis
                yAxis: [{
                    type: 'value',
                    name: 'Điểm số'
                }],

                // Add series
                series: [
                    {
                        name: 'Lịch Sử 6',
                        type: 'line',
                        data: datals6,
                        markLine: {
                            data: [{
                                type: 'average',
                                name: 'Điểm trung bình'
                            }]
                        }
                    },
                    {
                        name: 'Lịch Sử 7',
                        type: 'line',
                        data: datals7,
                        markLine: {
                            data: [{
                                type: 'average',
                                name: 'Điểm trung bình'
                            }]
                        }
                    },
                    {
                        name: 'Lịch Sử 8',
                        type: 'line',
                        data: datals8,
                        markLine: {
                            data: [{
                                type: 'average',
                                name: 'Điểm trung bình'
                            }]
                        }
                    },
                    {
                        name: 'Lịch Sử 9',
                        type: 'line',
                        data: datals9,
                        markLine: {
                            data: [{
                                type: 'average',
                                name: 'Điểm trung bình'
                            }]
                        }
                    }
                ]
	       	});
	       	stacked_lines_dl.setOption({

                // Setup grid
                // grid: {
                //     x: 40,
                //     x2: 20,
                //     y: 35,
                //     y2: 25
                // },

                // Add tooltip
                tooltip: {
                    trigger: 'axis'
                },

                // Add legend
                legend: {
                    data: ['Địa lí 6','Địa lí 7','Địa lí 8','Địa lí 9']
                },

                // Enable drag recalculate
                calculable: true,
                // Display toolbox
                toolbox: {
                    show: true,
                    left: '20',
                    bottom: '20',
                    feature: {
                        dataView: {
                            show: true,
                            readOnly: false,
                            title: 'Xem dữ liệu',
                            lang: ['View chart data', 'Close', 'Update']
                        },
                        magicType: {
                            show: true,
                            title: {
                                line: 'Chuyển dạng đường',
                                bar: 'Chuyển dạng cột',
                            },
                            type: ['line', 'bar']
                        },
                        saveAsImage: {
                            show: true,
                            title: 'Lưu hình',
                            lang: ['Save']
                        }
                    }
                },
                // Hirozontal axis
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: dataxdl
                }],

                // Vertical axis
                yAxis: [{
                    type: 'value',
                    name: 'Điểm số'
                }],

                // Add series
                series: [
                    {
                        name: 'Địa lí 6',
                        type: 'line',
                        data: datadl6,
                        markLine: {
                            data: [{
                                type: 'average',
                                name: 'Điểm trung bình'
                            }]
                        }
                    },
                    {
                        name: 'Địa lí 7',
                        type: 'line',
                        data: datadl7,
                        markLine: {
                            data: [{
                                type: 'average',
                                name: 'Điểm trung bình'
                            }]
                        }
                    },
                    {
                        name: 'Địa lí 8',
                        type: 'line',
                        data: datadl8,
                        markLine: {
                            data: [{
                                type: 'average',
                                name: 'Điểm trung bình'
                            }]
                        }
                    },
                    {
                        name: 'Địa lí 9',
                        type: 'line',
                        data: datadl9,
                        markLine: {
                            data: [{
                                type: 'average',
                                name: 'Điểm trung bình'
                            }]
                        }
                    }
                ]
	       	});
	       	setTimeout(function () {
	            stacked_lines_ls.resize();
	            stacked_lines_dl.resize();
	        }, 2000);
    	    window.onresize = function () {
	            setTimeout(function () {
	                stacked_lines_ls.resize();
	                stacked_lines_dl.resize();
	            }, 2000);
	        }
        });
        $.post("tonghopKetqua",function(dataa){
        	console.log("ket qua tong hop");
        	console.log(dataa);

	 		basic_columns_ls.setOption({

	            // Setup grid
	            grid: {
	                x: 40,
	                x2: 40,
	                y: 35,
	                y2: 25
	            },

	            // Add tooltip
	            tooltip: {
	                trigger: 'axis'
	            },

	            // Add legend
	            legend: {
	                data: ['Sử 6', 'Sử 7','Sử 8', 'Sử 9']
	            },

	            // Enable drag recalculate
	            calculable: true,

	            // Horizontal axis
	            xAxis: [{
	                type: 'category',
	                data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
	                name: 'Điểm số'
	            }],

	            // Vertical axis
	            yAxis: [{
	                type: 'value',
	                name: 'Số học sinh'
	            }],

	            // Add series
	            series: [
	                {
	                    name: 'Sử 6',
	                    type: 'bar',
	                    data: [dataa[0].diemls60, dataa[0].diemls61, dataa[0].diemls62, dataa[0].diemls63, dataa[0].diemls64, dataa[0].diemls65, dataa[0].diemls66, dataa[0].diemls67, dataa[0].diemls68, dataa[0].diemls69, dataa[0].diemls610],
	                    itemStyle: {
	                        normal: {
	                            label: {
	                                show: true,
	                                textStyle: {
	                                    fontWeight: 500
	                                }
	                            }
	                        }
	                    }
	                },
	                {
	                    name: 'Sử 7',
	                    type: 'bar',
	                    data: [dataa[0].diemls70, dataa[0].diemls71, dataa[0].diemls72, dataa[0].diemls73, dataa[0].diemls74, dataa[0].diemls75, dataa[0].diemls76, dataa[0].diemls77, dataa[0].diemls78, dataa[0].diemls79, dataa[0].diemls710],
	                    itemStyle: {
	                        normal: {
	                            label: {
	                                show: true,
	                                textStyle: {
	                                    fontWeight: 500
	                                }
	                            }
	                        }
	                    }
	                },
	                {
	                    name: 'Sử 8',
	                    type: 'bar',
	                    data: [dataa[0].diemls80, dataa[0].diemls81, dataa[0].diemls82, dataa[0].diemls83, dataa[0].diemls84, dataa[0].diemls85, dataa[0].diemls86, dataa[0].diemls87, dataa[0].diemls88, dataa[0].diemls89, dataa[0].diemls810],
	                    itemStyle: {
	                        normal: {
	                            label: {
	                                show: true,
	                                textStyle: {
	                                    fontWeight: 500
	                                }
	                            }
	                        }
	                    }
	                },
	                {
	                    name: 'Sử 9',
	                    type: 'bar',
	                    data: [dataa[0].diemls90, dataa[0].diemls91, dataa[0].diemls92, dataa[0].diemls93, dataa[0].diemls94, dataa[0].diemls95, dataa[0].diemls96, dataa[0].diemls97, dataa[0].diemls98, dataa[0].diemls99, dataa[0].diemls910],
	                    itemStyle: {
	                        normal: {
	                            label: {
	                                show: true,
	                                textStyle: {
	                                    fontWeight: 500
	                                }
	                            }
	                        }
	                    }
	                }
	            ]
	        });
	 		basic_columns_dl.setOption({

	            // Setup grid
	            grid: {
	                x: 40,
	                x2: 40,
	                y: 35,
	                y2: 25
	            },

	            // Add tooltip
	            tooltip: {
	                trigger: 'axis'
	            },

	            // Add legend
	            legend: {
	                data: ['Địa 6', 'Địa 7','Địa 8', 'Địa 9']
	            },

	            // Enable drag recalculate
	            calculable: true,

	            // Horizontal axis
	            xAxis: [{
	                type: 'category',
	                data: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
	                name: 'Điểm số'
	            }],

	            // Vertical axis
	            yAxis: [{
	                type: 'value',
	                name: 'Số học sinh'
	            }],

	            // Add series
	            series: [
	                {
	                    name: 'Địa 6',
	                    type: 'bar',
	                    data: [dataa[0].diemdl60, dataa[0].diemdl61, dataa[0].diemdl62, dataa[0].diemdl63, dataa[0].diemdl64, dataa[0].diemdl65, dataa[0].diemdl66, dataa[0].diemdl67, dataa[0].diemdl68, dataa[0].diemdl69, dataa[0].diemdl610],
	                    itemStyle: {
	                        normal: {
	                            label: {
	                                show: true,
	                                textStyle: {
	                                    fontWeight: 500
	                                }
	                            }
	                        }
	                    }
	                },
	                {
	                    name: 'Địa 7',
	                    type: 'bar',
	                    data: [dataa[0].diemdl70, dataa[0].diemdl71, dataa[0].diemdl72, dataa[0].diemdl73, dataa[0].diemdl74, dataa[0].diemdl75, dataa[0].diemdl76, dataa[0].diemdl77, dataa[0].diemdl78, dataa[0].diemdl79, dataa[0].diemdl710],
	                    itemStyle: {
	                        normal: {
	                            label: {
	                                show: true,
	                                textStyle: {
	                                    fontWeight: 500
	                                }
	                            }
	                        }
	                    }
	                },
	                {
	                    name: 'Địa 8',
	                    type: 'bar',
	                    data: [dataa[0].diemdl80, dataa[0].diemdl81, dataa[0].diemdl82, dataa[0].diemdl83, dataa[0].diemdl84, dataa[0].diemdl85, dataa[0].diemdl86, dataa[0].diemdl87, dataa[0].diemdl88, dataa[0].diemdl89, dataa[0].diemdl810],
	                    itemStyle: {
	                        normal: {
	                            label: {
	                                show: true,
	                                textStyle: {
	                                    fontWeight: 500
	                                }
	                            }
	                        }
	                    }
	                },
	                {
	                    name: 'Địa 9',
	                    type: 'bar',
	                    data: [dataa[0].diemdl90, dataa[0].diemdl91, dataa[0].diemdl92, dataa[0].diemdl93, dataa[0].diemdl94, dataa[0].diemdl95, dataa[0].diemdl96, dataa[0].diemdl97, dataa[0].diemdl98, dataa[0].diemdl99, dataa[0].diemdl910],
	                    itemStyle: {
	                        normal: {
	                            label: {
	                                show: true,
	                                textStyle: {
	                                    fontWeight: 500
	                                }
	                            }
	                        }
	                    }
	                }
	            ]
	        });
	       	setTimeout(function () {
	            basic_columns_ls.resize();
	            basic_columns_dl.resize();
	        }, 2000);
    	    window.onresize = function () {
            setTimeout(function () {
                basic_columns_ls.resize();
                basic_columns_dl.resize();
            }, 2000);
        }
        });
        ///
   		$('#scheduletab').on('click', function () {
       		stacked_lines_ls.resize();
            stacked_lines_dl.resize();
            basic_columns_ls.resize();
            basic_columns_dl.resize();
       	});
       	$('#scheduletab').hover( function () {
       		stacked_lines_ls.resize();
            stacked_lines_dl.resize();
            basic_columns_ls.resize();
            basic_columns_dl.resize();
       	});
	    window.onresize = function () {
            setTimeout(function () {
                stacked_lines_ls.resize();
                stacked_lines_dl.resize();
                basic_columns_ls.resize();
            	basic_columns_dl.resize();
            }, 2000);
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
		//console.log(data1);
		socket.emit('c2s_Thaoluan',data1);
		socket.on('s2c_Thaoluan', function(data){
			//console.log(data);
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
	componentWillReceiveProps(newProps){
		//chuyen tab caidat
		if(newProps.params.tab=="caidat"){
			$("#caidat").click();
		}
		else if(newProps.params.tab=="hoatdong"){
				$("#hoatdong").click();
		}
		else if(newProps.params.tab=="quatrinh"){
				$("#scheduletab").click();
		}
		else if(newProps.params.tab=="quanlyuser"){
				$("#tag_listuser").click();
		}
		else if(newProps.params.tab=="quanlygiaovien"){
				$("#tag_listsup").click();
		}
		else if(newProps.params.tab=="quanlyadmin"){
				$("#tag_listadmin").click();
		}

	}
}