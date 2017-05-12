import React from 'react';

export class Trangcanhan extends React.Component{
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
							<li className="active"><a href="#activity" data-toggle="tab"><i className="icon-menu7 position-left"></i> Activity</a></li>
							<li><a href="#schedule" data-toggle="tab"><i className="icon-calendar3 position-left"></i> Schedule <span className="badge badge-success badge-inline position-right">32</span></a></li>
							<li><a href="#settings" data-toggle="tab"><i className="icon-cog3 position-left"></i> Settings</a></li>
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
									<div className=" content-group">
										<div className="timeline-container">
											{/* Blog post */}
											<div className="timeline-row">
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
															<img src="cover3.jpg" tppabs="http://demo.interface.club/limitless/layout_1/LTR/default/assets/images/demo/cover3.jpg" className="img-responsive content-group" alt=""/>
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

									{/* Profile info */}
									<div className="panel panel-flat">
										<div className="panel-heading">
											<h6 className="panel-title">Profile information</h6>
											<div className="heading-elements">
												<ul className="icons-list">
							                		<li><a data-action="collapse"></a></li>
							                		<li><a data-action="reload"></a></li>
							                		<li><a data-action="close"></a></li>
							                	</ul>
						                	</div>
										</div>

										<div className="panel-body">
											<form action="#">
												<div className="form-group">
													<div className="row">
														<div className="col-md-6">
															<label>Username</label>
															<input type="text" value="Eugene" className="form-control"/>
														</div>
														<div className="col-md-6">
															<label>Full name</label>
															<input type="text" value="Kopyov" className="form-control"/>
														</div>
													</div>
												</div>

												<div className="form-group">
													<div className="row">
														<div className="col-md-6">
															<label>Address line 1</label>
															<input type="text" value="Ring street 12" className="form-control"/>
														</div>
														<div className="col-md-6">
															<label>Address line 2</label>
															<input type="text" value="building D, flat #67" className="form-control"/>
														</div>
													</div>
												</div>

												<div className="form-group">
													<div className="row">
														<div className="col-md-4">
															<label>City</label>
															<input type="text" value="Munich" className="form-control"/>
														</div>
														<div className="col-md-4">
															<label>State/Province</label>
															<input type="text" value="Bayern" className="form-control"/>
														</div>
														<div className="col-md-4">
															<label>ZIP code</label>
															<input type="text" value="1031" className="form-control"/>
														</div>
													</div>
												</div>

												<div className="form-group">
													<div className="row">
														<div className="col-md-6">
															<label>Email</label>
															<input type="text" readonly="readonly" value="eugene@kopyov.com" className="form-control"/>
														</div>
														<div className="col-md-6">
								                            <label>Your country</label>
								                            <select className="select">
								                                <option value="germany" selected="selected">Germany</option> 
								                                <option value="france">France</option> 
								                                <option value="spain">Spain</option> 
								                                <option value="netherlands">Netherlands</option> 
								                                <option value="other">...</option> 
								                                <option value="uk">United Kingdom</option> 
								                            </select>
														</div>
													</div>
												</div>

						                        <div className="form-group">
						                        	<div className="row">
						                        		<div className="col-md-6">
															<label>Phone #</label>
															<input type="text" value="+99-99-9999-9999" className="form-control"/>
															<span className="help-block">+99-99-9999-9999</span>
						                        		</div>

														<div className="col-md-6">
															<label className="display-block">Upload profile image</label>
						                                    <input type="file" className="file-styled"/>
						                                    <span className="help-block">Accepted formats: gif, png, jpg. Max file size 2Mb</span>
														</div>
						                        	</div>
						                        </div>

						                        <div className="text-right">
						                        	<button type="submit" className="btn btn-primary">Save <i className="icon-arrow-right14 position-right"></i></button>
						                        </div>
											</form>
										</div>
									</div>
									{/* /profile info */}


									{/* Account settings */}
									<div className="panel panel-flat">
										<div className="panel-heading">
											<h6 className="panel-title">Account settings</h6>
											<div className="heading-elements">
												<ul className="icons-list">
							                		<li><a data-action="collapse"></a></li>
							                		<li><a data-action="reload"></a></li>
							                		<li><a data-action="close"></a></li>
							                	</ul>
						                	</div>
										</div>

										<div className="panel-body">
											<form action="#">
												<div className="form-group">
													<div className="row">
														<div className="col-md-6">
															<label>Username</label>
															<input type="text" value="Kopyov" readonly="readonly" className="form-control"/>
														</div>

														<div className="col-md-6">
															<label>Current password</label>
															<input type="password" value="password" readonly="readonly" className="form-control"/>
														</div>
													</div>
												</div>

												<div className="form-group">
													<div className="row">
														<div className="col-md-6">
															<label>New password</label>
															<input type="password" placeholder="Enter new password" className="form-control"/>
														</div>

														<div className="col-md-6">
															<label>Repeat password</label>
															<input type="password" placeholder="Repeat new password" className="form-control"/>
														</div>
													</div>
												</div>

												<div className="form-group">
													<div className="row">
														<div className="col-md-6">
															<label>Profile visibility</label>

															<div className="radio">
																<label>
																	<input type="radio" name="visibility" className="styled" checked="checked"/>
																	Visible to everyone
																</label>
															</div>

															<div className="radio">
																<label>
																	<input type="radio" name="visibility" className="styled"/>
																	Visible to friends only
																</label>
															</div>

															<div className="radio">
																<label>
																	<input type="radio" name="visibility" className="styled"/>
																	Visible to my connections only
																</label>
															</div>

															<div className="radio">
																<label>
																	<input type="radio" name="visibility" className="styled"/>
																	Visible to my colleagues only
																</label>
															</div>
														</div>

														<div className="col-md-6">
															<label>Notifications</label>

															<div className="checkbox">
																<label>
																	<input type="checkbox" className="styled" checked="checked"/>
																	Password expiration notification
																</label>
															</div>

															<div className="checkbox">
																<label>
																	<input type="checkbox" className="styled" checked="checked"/>
																	New message notification
																</label>
															</div>

															<div className="checkbox">
																<label>
																	<input type="checkbox" className="styled" checked="checked"/>
																	New task notification
																</label>
															</div>

															<div className="checkbox">
																<label>
																	<input type="checkbox" className="styled"/>
																	New contact request notification
																</label>
															</div>
														</div>
													</div>
												</div>

						                        <div className="text-right">
						                        	<button type="submit" className="btn btn-primary">Save <i className="icon-arrow-right14 position-right"></i></button>
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
								<img src="face11.jpg" tppabs="http://demo.interface.club/limitless/layout_1/LTR/default/assets/images/demo/users/face11.jpg" alt=""/>
								<div className="caption">
									<span>
										<a href="#" className="btn bg-success-400 btn-icon btn-xs" data-popup="lightbox"><i className="icon-plus2"></i></a>
										<a href="user_pages_profile.html" tppabs="http://demo.interface.club/limitless/layout_1/LTR/default/user_pages_profile.html" className="btn bg-success-400 btn-icon btn-xs"><i className="icon-link"></i></a>
									</span>
								</div>
							</div>
						
					    	<div className="caption text-center">
					    		<h6 className="text-semibold no-margin">Hanna Dorman <small className="display-block">UX/UI designer</small></h6>
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

				{/* Footer */}
				<div className="footer text-muted">
					&copy; 2015. <a href="#">Limitless Web App Kit</a> by <a href="http://themeforest.net/user/Kopyov" target="_blank">Eugene Kopyov</a>
				</div>
				{/* /footer */}

			</div>
			{/* /content area */}
		</div>
	)
	}
}