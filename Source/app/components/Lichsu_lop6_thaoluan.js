import React from 'react';

export class Lichsu_lop6_thaoluan extends React.Component{
  render(){
    return (
    	<div>
			{/* Page header */}
			<div className="page-header page-header-default">
				<div className="breadcrumb-line">
					<ul className="breadcrumb">
						<li><a href="#"><i className="icon-home2 position-left"></i> Trang chủ</a></li>
						<li className="active">Thảo luận lịch sử Lớp 6</li>
					</ul>

					<ul className="breadcrumb-elements">
						<li><a href="#"><i className="icon-comment-discussion position-left"></i> Support</a></li>
						<li className="dropdown">
							<a href="#" className="dropdown-toggle" data-toggle="dropdown">
								<i className="icon-gear position-left"></i>
								Loại bài học
								<span className="caret"></span>
							</a>

							<ul className="dropdown-menu dropdown-menu-right">
								<li><a href="#"><i className="icon-user-lock"></i> Sách giáo khoa</a></li>
								<li><a href="#"><i className="icon-statistics"></i> Video </a></li>
								<li><a href="#"><i className="icon-accessibility"></i> Tương tác</a></li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
			{/* /page header */}

			{/* Content area */}
			<div className="content">
		    	<div className="table-responsive">
					<table className="table text-nowrap">
						<thead>
							<tr>
								<th >Due</th>
								<th >User</th>
								<th>Description</th>
								<th className="text-center" ><i className="icon-arrow-down12"></i></th>
							</tr>
						</thead>
						<tbody>
							<tr className="active border-double">
								<td colspan="3">Active tickets</td>
								<td className="text-right">
									<span className="badge bg-blue">24</span>
								</td>
							</tr>

							<tr>
								<td className="text-center">
									<h6 className="no-margin">12 <small className="display-block text-size-small no-margin">hours</small></h6>
								</td>
								<td>
									<div className="media-left media-middle">
										<a href="#" className="btn bg-teal-400 btn-rounded btn-icon btn-xs">
											<span className="letter-icon"></span>
										</a>
									</div>

									<div className="media-body">
										<a href="#" className="display-inline-block text-default text-semibold letter-icon-title">Annabelle Doney</a>
										<div className="text-muted text-size-small"><span className="status-mark border-blue position-left"></span> Active</div>
									</div>
								</td>
								<td>
									<a href="#" className="text-default display-inline-block">
										<span className="text-semibold">[#1183] Workaround for OS X selects printing bug</span>
										<span className="display-block text-muted">Chrome fixed the bug several versions ago, thus rendering this...</span>
									</a>
								</td>
								<td className="text-center">
									<ul className="icons-list">
										<li className="dropdown">
											<a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="icon-menu7"></i></a>
											<ul className="dropdown-menu dropdown-menu-right">
												<li><a href="#"><i className="icon-undo"></i> Quick reply</a></li>
												<li><a href="#"><i className="icon-history"></i> Full history</a></li>
												<li className="divider"></li>
												<li><a href="#"><i className="icon-checkmark3 text-success"></i> Resolve issue</a></li>
												<li><a href="#"><i className="icon-cross2 text-danger"></i> Close issue</a></li>
											</ul>
										</li>
									</ul>
								</td>
							</tr>

							<tr>
								<td className="text-center">
									<h6 className="no-margin">16 <small className="display-block text-size-small no-margin">hours</small></h6>
								</td>
								<td>
									<div className="media-left media-middle">
										<a href="#"><img src="assets/images/placeholder.jpg" className="img-circle img-xs" alt=""/></a>
									</div>

									<div className="media-body">
										<a href="#" className="display-inline-block text-default text-semibold letter-icon-title">Chris Macintyre</a>
										<div className="text-muted text-size-small"><span className="status-mark border-blue position-left"></span> Active</div>
									</div>
								</td>
								<td>
									<a href="#" className="text-default display-inline-block">
										<span className="text-semibold">[#1249] Vertically center carousel controls</span>
										<span className="display-block text-muted">Try any carousel control and reduce the screen width below...</span>
									</a>
								</td>
								<td className="text-center">
									<ul className="icons-list">
										<li className="dropdown">
											<a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="icon-menu7"></i></a>
											<ul className="dropdown-menu dropdown-menu-right">
												<li><a href="#"><i className="icon-undo"></i> Quick reply</a></li>
												<li><a href="#"><i className="icon-history"></i> Full history</a></li>
												<li className="divider"></li>
												<li><a href="#"><i className="icon-checkmark3 text-success"></i> Resolve issue</a></li>
												<li><a href="#"><i className="icon-cross2 text-danger"></i> Close issue</a></li>
											</ul>
										</li>
									</ul>
								</td>
							</tr>

							<tr>
								<td className="text-center">
									<h6 className="no-margin">20 <small className="display-block text-size-small no-margin">hours</small></h6>
								</td>
								<td>
									<div className="media-left media-middle">
										<a href="#" className="btn bg-blue btn-rounded btn-icon btn-xs">
											<span className="letter-icon"></span>
										</a>
									</div>

									<div className="media-body">
										<a href="#" className="display-inline-block text-default text-semibold letter-icon-title">Robert Hauber</a>
										<div className="text-muted text-size-small"><span className="status-mark border-blue position-left"></span> Active</div>
									</div>
								</td>
								<td>
									<a href="#" className="text-default display-inline-block">
										<span className="text-semibold">[#1254] Inaccurate small pagination height</span>
										<span className="display-block text-muted">The height of pagination elements is not consistent with...</span>
									</a>
								</td>
								<td className="text-center">
									<ul className="icons-list">
										<li className="dropdown">
											<a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="icon-menu7"></i></a>
											<ul className="dropdown-menu dropdown-menu-right">
												<li><a href="#"><i className="icon-undo"></i> Quick reply</a></li>
												<li><a href="#"><i className="icon-history"></i> Full history</a></li>
												<li className="divider"></li>
												<li><a href="#"><i className="icon-checkmark3 text-success"></i> Resolve issue</a></li>
												<li><a href="#"><i className="icon-cross2 text-danger"></i> Close issue</a></li>
											</ul>
										</li>
									</ul>
								</td>
							</tr>

							<tr>
								<td className="text-center">
									<h6 className="no-margin">40 <small className="display-block text-size-small no-margin">hours</small></h6>
								</td>
								<td>
									<div className="media-left media-middle">
										<a href="#" className="btn bg-warning-400 btn-rounded btn-icon btn-xs">
											<span className="letter-icon"></span>
										</a>
									</div>

									<div className="media-body">
										<a href="#" className="display-inline-block text-default text-semibold letter-icon-title">Dex Sponheim</a>
										<div className="text-muted text-size-small"><span className="status-mark border-blue position-left"></span> Active</div>
									</div>
								</td>
								<td>
									<a href="#" className="text-default display-inline-block">
										<span className="text-semibold">[#1184] Round grid column gutter operations</span>
										<span className="display-block text-muted">Left rounds up, right rounds down. should keep everything...</span>
									</a>
								</td>
								<td className="text-center">
									<ul className="icons-list">
										<li className="dropdown">
											<a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="icon-menu7"></i></a>
											<ul className="dropdown-menu dropdown-menu-right">
												<li><a href="#"><i className="icon-undo"></i> Quick reply</a></li>
												<li><a href="#"><i className="icon-history"></i> Full history</a></li>
												<li className="divider"></li>
												<li><a href="#"><i className="icon-checkmark3 text-success"></i> Resolve issue</a></li>
												<li><a href="#"><i className="icon-cross2 text-danger"></i> Close issue</a></li>
											</ul>
										</li>
									</ul>
								</td>
							</tr>

							<tr className="active border-double">
								<td colspan="3">Resolved tickets</td>
								<td className="text-right">
									<span className="badge bg-success">42</span>
								</td>
							</tr>

							<tr>
								<td className="text-center">
									<i className="icon-checkmark3 text-success"></i>
								</td>
								<td>
									<div className="media-left media-middle">
										<a href="#" className="btn bg-success-400 btn-rounded btn-icon btn-xs">
											<span className="letter-icon"></span>
										</a>
									</div>

									<div className="media-body">
										<a href="#" className="display-inline-block text-default letter-icon-title">Alan Macedo</a>
										<div className="text-muted text-size-small"><span className="status-mark border-success position-left"></span> Resolved</div>
									</div>
								</td>
								<td>
									<a href="#" className="text-default display-inline-block">
										[#1046] Avoid some unnecessary HTML string
										<span className="display-block text-muted">Rather than building a string of HTML and then parsing it...</span>
									</a>
								</td>
								<td className="text-center">
									<ul className="icons-list">
										<li className="dropdown">
											<a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="icon-menu7"></i></a>
											<ul className="dropdown-menu dropdown-menu-right">
												<li><a href="#"><i className="icon-undo"></i> Quick reply</a></li>
												<li><a href="#"><i className="icon-history"></i> Full history</a></li>
												<li className="divider"></li>
												<li><a href="#"><i className="icon-plus3 text-blue"></i> Unresolve issue</a></li>
												<li><a href="#"><i className="icon-cross2 text-danger"></i> Close issue</a></li>
											</ul>
										</li>
									</ul>
								</td>
							</tr>

							<tr>
								<td className="text-center">
									<i className="icon-checkmark3 text-success"></i>
								</td>
								<td>
									<div className="media-left media-middle">
										<a href="#" className="btn bg-pink-400 btn-rounded btn-icon btn-xs">
											<span className="letter-icon"></span>
										</a>
									</div>

									<div className="media-body">
										<a href="#" className="display-inline-block text-default letter-icon-title">Brett Castellano</a>
										<div className="text-muted text-size-small"><span className="status-mark border-success position-left"></span> Resolved</div>
									</div>
								</td>
								<td>
									<a href="#" className="text-default display-inline-block">
										[#1038] Update json configuration
										<span className="display-block text-muted">The <code>files</code> property is necessary to override the files property...</span>
									</a>
								</td>
								<td className="text-center">
									<ul className="icons-list">
										<li className="dropdown">
											<a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="icon-menu7"></i></a>
											<ul className="dropdown-menu dropdown-menu-right">
												<li><a href="#"><i className="icon-undo"></i> Quick reply</a></li>
												<li><a href="#"><i className="icon-history"></i> Full history</a></li>
												<li className="divider"></li>
												<li><a href="#"><i className="icon-plus3 text-blue"></i> Unresolve issue</a></li>
												<li><a href="#"><i className="icon-cross2 text-danger"></i> Close issue</a></li>
											</ul>
										</li>
									</ul>
								</td>
							</tr>

							<tr>
								<td className="text-center">
									<i className="icon-checkmark3 text-success"></i>
								</td>
								<td>
									<div className="media-left media-middle">
										<a href="#"><img src="assets/images/placeholder.jpg" className="img-circle img-xs" alt=""/></a>
									</div>

									<div className="media-body">
										<a href="#" className="display-inline-block text-default">Roxanne Forbes</a>
										<div className="text-muted text-size-small"><span className="status-mark border-success position-left"></span> Resolved</div>
									</div>
								</td>
								<td>
									<a href="#" className="text-default display-inline-block">
										[#1034] Tooltip multiple event
										<span className="display-block text-muted">Fix behavior when using tooltips and popovers that are...</span>
									</a>
								</td>
								<td className="text-center">
									<ul className="icons-list">
										<li className="dropdown">
											<a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="icon-menu7"></i></a>
											<ul className="dropdown-menu dropdown-menu-right">
												<li><a href="#"><i className="icon-undo"></i> Quick reply</a></li>
												<li><a href="#"><i className="icon-history"></i> Full history</a></li>
												<li className="divider"></li>
												<li><a href="#"><i className="icon-plus3 text-blue"></i> Unresolve issue</a></li>
												<li><a href="#"><i className="icon-cross2 text-danger"></i> Close issue</a></li>
											</ul>
										</li>
									</ul>
								</td>
							</tr>

							<tr className="active border-double">
								<td colspan="3">Closed tickets</td>
								<td className="text-right">
									<span className="badge bg-danger">37</span>
								</td>
							</tr>

							<tr>
								<td className="text-center">
									<i className="icon-cross2 text-danger-400"></i>
								</td>
								<td>
									<div className="media-left media-middle">
										<a href="#"><img src="assets/images/placeholder.jpg" className="img-circle img-xs" alt=""/></a>
									</div>

									<div className="media-body">
										<a href="#" className="display-inline-block text-default">Mitchell Sitkin</a>
										<div className="text-muted text-size-small"><span className="status-mark border-danger position-left"></span> Closed</div>
									</div>
								</td>
								<td>
									<a href="#" className="text-default display-inline-block">
										[#1040] Account for static form controls in form group
										<span className="display-block text-muted">Resizes control label's font-size and account for the standard...</span>
									</a>
								</td>
								<td className="text-center">
									<ul className="icons-list">
										<li className="dropup">
											<a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="icon-menu7"></i></a>
											<ul className="dropdown-menu dropdown-menu-right">
												<li><a href="#"><i className="icon-undo"></i> Quick reply</a></li>
												<li><a href="#"><i className="icon-history"></i> Full history</a></li>
												<li className="divider"></li>
												<li><a href="#"><i className="icon-reload-alt text-blue"></i> Reopen issue</a></li>
												<li><a href="#"><i className="icon-cross2 text-danger"></i> Close issue</a></li>
											</ul>
										</li>
									</ul>
								</td>
							</tr>

							<tr>
								<td className="text-center">
									<i className="icon-cross2 text-danger"></i>
								</td>
								<td>
									<div className="media-left media-middle">
										<a href="#" className="btn bg-brown-400 btn-rounded btn-icon btn-xs">
											<span className="letter-icon"></span>
										</a>
									</div>

									<div className="media-body">
										<a href="#" className="display-inline-block text-default letter-icon-title">Katleen Jensen</a>
										<div className="text-muted text-size-small"><span className="status-mark border-danger position-left"></span> Closed</div>
									</div>
								</td>
								<td>
									<a href="#" className="text-default display-inline-block">
										[#1038] Proper sizing of form control feedback
										<span className="display-block text-muted">Feedback icon sizing inside a larger/smaller form-group...</span>
									</a>
								</td>
								<td className="text-center">
									<ul className="icons-list">
										<li className="dropup">
											<a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="icon-menu7"></i></a>
											<ul className="dropdown-menu dropdown-menu-right">
												<li><a href="#"><i className="icon-undo"></i> Quick reply</a></li>
												<li><a href="#"><i className="icon-history"></i> Full history</a></li>
												<li className="divider"></li>
												<li><a href="#"><i className="icon-plus3 text-blue"></i> Unresolve issue</a></li>
												<li><a href="#"><i className="icon-cross2 text-danger"></i> Close issue</a></li>
											</ul>
										</li>
									</ul>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
    )
  }
}
