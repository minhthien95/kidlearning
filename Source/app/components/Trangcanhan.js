import React from 'react';

var data = document.querySelector('#maincontent');

export class Trangcanhan extends React.Component{
	constructor(props) {
    	super(props);
      	this.state = {
        	id_user: "assets/images/user_"+data.dataset.id+".jpg"
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
								<li><a href="#schedule" data-toggle="tab"><i className="icon-calendar3 position-left"></i> Quá trình <span className="badge badge-success badge-inline position-right">32</span></a></li>
								<li><a href="#settings" data-toggle="tab"><i className="icon-cog3 position-left"></i> Cài đặt</a></li>
							</ul>

							<div className="navbar-right">
								<ul className="nav navbar-nav">
									<li><a href="#"><i className="icon-stack-text position-left"></i> Notes</a></li>
									<li><a href="#"><i className="icon-collaboration position-left"></i> Friends</a></li>
									<li><a href="#"><i className="icon-images3 position-left"></i> Photos</a></li>
									<li className="dropdown">
										<a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="icon-gear"></i> <span className="visible-xs-inline-block position-right"> Options</span> <span className="caret"></span></a>
										<ul className="dropdown-menu dropdown-menu-right">
											<li><a href="#"><i className="icon-image2"></i> Update cover</a></li>
											<li><a href="#"><i className="icon-clippy"></i> Update info</a></li>
											<li><a href="#"><i className="icon-make-group"></i> Manage sections</a></li>
											<li className="divider"></li>
											<li><a href="#"><i className="icon-three-bars"></i> Activity log</a></li>
											<li><a href="#"><i className="icon-cog5"></i> Profile settings</a></li>
										</ul>
									</li>
								</ul>
							</div>
						</div>
					</div>
					{/* /toolbar */}

				</div>
				{/* /page header */}

				{/* Content area */}
				<div className="content">

					{/* User profile */}
					<div className="row">
						<div className="col-lg-9">
							<div className="tabbable">
								<div className="tab-content">
									<div className="tab-pane fade in active" id="activity">

										{/* Timeline */}
										<div className="timeline timeline-left content-group">
											<div className="timeline-container">

												{/* Blog post */}
												<div className="timeline-row">
													<div className="timeline-icon">
														<img src="assets/images/placeholder.jpg" alt=""/>
													</div>

													<div className="panel panel-flat timeline-content">
														<div className="panel-heading">
															<h6 className="panel-title">Himalayan sunset</h6>
															<div className="heading-elements">
																<span className="heading-text"><i className="icon-checkmark-circle position-left text-success"></i> 49 minutes ago</span>
																<ul className="icons-list">
																	<li className="dropdown">
																		<a href="#" className="dropdown-toggle" data-toggle="dropdown">
																			<i className="icon-arrow-down12"></i>
																		</a>

																		<ul className="dropdown-menu dropdown-menu-right">
																			<li><a href="#"><i className="icon-user-lock"></i> Hide user posts</a></li>
																			<li><a href="#"><i className="icon-user-block"></i> Block user</a></li>
																			<li><a href="#"><i className="icon-user-minus"></i> Unfollow user</a></li>
																			<li className="divider"></li>
																			<li><a href="#"><i className="icon-embed"></i> Embed post</a></li>
																			<li><a href="#"><i className="icon-blocked"></i> Report this post</a></li>
																		</ul>
																	</li>
											                	</ul>
										                	</div>
														</div>

														<div className="panel-body">
															<a href="#" className="display-block content-group">
																<img src="assets/images/cover.jpg" className="img-responsive content-group" alt=""/>
															</a>

															<h6 className="content-group">
																<i className="icon-comment-discussion position-left"></i>
																Comment from <a href="#">Jason Ansley</a>:
															</h6>

															<blockquote>
																<p>When suspiciously goodness labrador understood rethought yawned grew piously endearingly inarticulate oh goodness jeez trout distinct hence cobra despite taped laughed the much audacious less inside tiger groaned darn stuffily metaphoric unihibitedly inside cobra.</p>
																<footer>Jason, <cite title="Source Title">10:39 am</cite></footer>
															</blockquote>
														</div>

														<div className="panel-footer panel-footer-transparent">
															<div className="heading-elements">
																<ul className="list-inline list-inline-condensed heading-text">
																	<li><a href="#" className="text-default"><i className="icon-eye4 position-left"></i> 438</a></li>
																	<li><a href="#" className="text-default"><i className="icon-comment-discussion position-left"></i> 71</a></li>
																</ul>

																<span className="heading-btn pull-right">
																	<a href="#" className="btn btn-link">Read post <i className="icon-arrow-right14 position-right"></i></a>
																</span>
															</div>
														</div>
													</div>
												</div>
												{/* /blog post */}
											</div>
									    </div>
									    {/* /timeline */}

									</div>


									<div className="tab-pane fade" id="schedule">

										{/* Available hours */}
										<div className="panel panel-flat">
											<div className="panel-heading">
												<h6 className="panel-title">Available hours</h6>
												<div className="heading-elements">
													<ul className="icons-list">
								                		<li><a data-action="collapse"></a></li>
								                		<li><a data-action="reload"></a></li>
								                		<li><a data-action="close"></a></li>
								                	</ul>
							                	</div>
											</div>

											<div className="panel-body">
												<div className="chart-container">
													<div className="chart has-fixed-height" id="plans"></div>
												</div>
											</div>
										</div>
										{/* /available hours */}

										{/* Calendar */}
										<div className="panel panel-flat">
											<div className="panel-heading">
												<h6 className="panel-title">My schedule</h6>
												<div className="heading-elements">
													<ul className="icons-list">
								                		<li><a data-action="collapse"></a></li>
								                		<li><a data-action="reload"></a></li>
								                		<li><a data-action="close"></a></li>
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
										<div className="panel panel-flat">
											<div className="panel-heading">
												<h6 className="panel-title">Cài đặt</h6>
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
										{/* /account settings */}

									</div>
								</div>
							</div>
						</div>

						<div className="col-lg-3">

							{/* User thumbnail */}
							<div className="thumbnail">
								<div className="thumb thumb-rounded thumb-slide">
									<img src={this.state.id_user} onError={() => {this.setState({id_user : "assets/images/placeholder.jpg"}) }} alt=""/>
									<div className="caption">
										<span>
											<a href="#" className="btn bg-success-400 btn-icon btn-xs" data-popup="lightbox"><i className="icon-plus2"></i></a>
											<a href="user_pages_profile.html" className="btn bg-success-400 btn-icon btn-xs"><i className="icon-link"></i></a>
										</span>
									</div>
								</div>
							
						    	<div className="caption text-center">
						    		<h6 className="text-semibold no-margin">{data.dataset.username} <small className="display-block">Lớp {data.dataset.lop}</small></h6>
					    			<ul className="icons-list mt-15">
				                    	<li><a href="#" data-popup="tooltip" title="Google Drive"><i className="icon-google-drive"></i></a></li>
				                    	<li><a href="#" data-popup="tooltip" title="Twitter"><i className="icon-twitter"></i></a></li>
				                    	<li><a href="#" data-popup="tooltip" title="Github"><i className="icon-github"></i></a></li>
			                    	</ul>
						    	</div>
					    	</div>
					    	{/* /user thumbnail */}


							{/* Navigation */}
					    	<div className="panel panel-flat">
								<div className="panel-heading">
									<h6 className="panel-title">Navigation</h6>
									<div className="heading-elements">
										<a href="#" className="heading-text">See all &rarr;</a>
				                	</div>
								</div>

								<div className="list-group no-border no-padding-top">
									<a href="#" className="list-group-item"><i className="icon-user"></i> My profile</a>
									<a href="#" className="list-group-item"><i className="icon-cash3"></i> Balance</a>
									<a href="#" className="list-group-item"><i className="icon-tree7"></i> Connections <span className="badge bg-danger pull-right">29</span></a>
									<a href="#" className="list-group-item"><i className="icon-users"></i> Friends</a>
									<div className="list-group-divider"></div>
									<a href="#" className="list-group-item"><i className="icon-calendar3"></i> Events <span className="badge bg-teal-400 pull-right">48</span></a>
									<a href="#" className="list-group-item"><i className="icon-cog3"></i> Account settings</a>
								</div>
							</div>
							{/* /navigation */}

						</div>
					</div>
					{/* /user profile */}


				</div>
				{/* /content area */}
			</div>
		)
	}
	componentDidMount()
	{

		var id_user=data.dataset.id;
		var check=false;
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
	}
}