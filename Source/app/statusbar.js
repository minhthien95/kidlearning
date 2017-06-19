import React from "react";
import {render} from "react-dom";
import PropTypes from 'prop-types'; 

var data = document.querySelector('#statusbar');

var root = window.document.getElementById("statusbar");

class Statusbar extends React.Component {
	constructor(props) {
    super(props);
      this.state = {
        id_user: "assets/images/user_"+data.dataset.id+".jpg"
      };
    }
 	render() {
	    return (
		    <div>
				<div className="navbar-header">
					<a className="navbar-brand" href="index.html"><img src="assets/images/logo_light.png" alt=""/></a>

					<ul className="nav navbar-nav visible-xs-block">
						<li><a data-toggle="collapse" data-target="#navbar-mobile"><i className="icon-tree5"></i></a></li>
						<li><a className="sidebar-mobile-main-toggle"><i className="icon-paragraph-justify3"></i></a></li>
					</ul>
				</div>

				<div className="navbar-collapse collapse" id="navbar-mobile">
					<ul className="nav navbar-nav">
						<li><a className="sidebar-control sidebar-main-toggle hidden-xs"><i className="icon-paragraph-justify3"></i></a></li>
					</ul>
					<div className="col-sm-4 text-right">								
						<div className="input-group content-group">
							<div className="has-feedback has-feedback-left">
								<input type="text" className="form-control input-xlg" value="" placeholder="Nhập nội dung tìm kiếm"/>
								<div className="form-control-feedback">
									<i className="icon-search4 text-muted text-size-base"></i>
								</div>
							</div>

							<div className="input-group-btn">
								<button type="submit" className="btn btn-primary btn-xlg">Tìm kiếm</button>
							</div>
						</div>
					</div>
					<ul className="nav navbar-nav navbar-right">
						<li className="dropdown">
							<a href="#" className="dropdown-toggle" data-toggle="dropdown">
								<i className="glyphicon glyphicon-bell"></i>
								<span className="visible-xs-inline-block position-right">Thông báo</span>
								<span className="badge bg-warning-400">9</span>						
							</a>
							
							<div className="dropdown-menu dropdown-content width-350">
								<div className="dropdown-content-heading">
									Thông báo
									<ul className="icons-list">
										<li><a href="#"><i className="icon-compose"></i></a></li>
									</ul>
								</div>

								<ul className="media-list dropdown-content-body">
									<li className="media">
										<div className="media-left">
											<img src="assets/images/placeholder.jpg" className="img-circle img-sm" alt=""/>
											<span className="badge bg-danger-400 media-badge">5</span>
										</div>

										<div className="media-body">
											<a href="#" className="media-heading">
												<span className="text-semibold">James Alexander</span>
												<span className="media-annotation pull-right">04:58</span>
											</a>

											<span className="text-muted">who knows, maybe that would be the best thing for me...</span>
										</div>
									</li>

									<li className="media">
										<div className="media-left">
											<img src="assets/images/placeholder.jpg" className="img-circle img-sm" alt=""/>
											<span className="badge bg-danger-400 media-badge">4</span>
										</div>

										<div className="media-body">
											<a href="#" className="media-heading">
												<span className="text-semibold">Margo Baker</span>
												<span className="media-annotation pull-right">12:16</span>
											</a>

											<span className="text-muted">That was something he was unable to do because...</span>
										</div>
									</li>

									<li className="media">
										<div className="media-left"><img src="assets/images/placeholder.jpg" className="img-circle img-sm" alt=""/></div>
										<div className="media-body">
											<a href="#" className="media-heading">
												<span className="text-semibold">Jeremy Victorino</span>
												<span className="media-annotation pull-right">22:48</span>
											</a>

											<span className="text-muted">But that would be extremely strained and suspicious...</span>
										</div>
									</li>

									<li className="media">
										<div className="media-left"><img src="assets/images/placeholder.jpg" className="img-circle img-sm" alt=""/></div>
										<div className="media-body">
											<a href="#" className="media-heading">
												<span className="text-semibold">Beatrix Diaz</span>
												<span className="media-annotation pull-right">Tue</span>
											</a>

											<span className="text-muted">What a strenuous career it is that I've chosen...</span>
										</div>
									</li>

									<li className="media">
										<div className="media-left"><img src="assets/images/placeholder.jpg" className="img-circle img-sm" alt=""/></div>
										<div className="media-body">
											<a href="#" className="media-heading">
												<span className="text-semibold">Richard Vango</span>
												<span className="media-annotation pull-right">Mon</span>
											</a>
											
											<span className="text-muted">Other travelling salesmen live a life of luxury...</span>
										</div>
									</li>
								</ul>

								<div className="dropdown-content-footer">
									<a href="#" data-popup="tooltip" title="All messages"><i className="icon-menu display-block"></i></a>
								</div>
							</div>
						</li>

						<li className="dropdown dropdown-user">
							<a className="dropdown-toggle" data-toggle="dropdown">
								<img src={this.state.id_user} onError={() => {this.setState({id_user : "assets/images/user.jpg"}) }} alt=""/>
								<span>{data.dataset.username}</span>
								<i className="caret"></i>
							</a>

							<ul className="dropdown-menu dropdown-menu-right">
								<li><a href="#trangcanhan"><i className="icon-user-plus"></i> Trang cá nhân</a></li>
								<li><a href="#"><i className="icon-coins"></i> My balance</a></li>
								<li><a href="#"><span className="badge bg-teal-400 pull-right">58</span> <i className="icon-comment-discussion"></i> Messages</a></li>
								<li className="divider"></li>
								<li><a href="#"><i className="icon-cog5"></i> Cài đặt tài khoản</a></li>
								<li><a href="/dangxuat"><i className="icon-switch2"></i> Đăng xuất</a></li>
							</ul>
						</li>
					</ul>
				</div>
		    </div>
    	);
  }
}
render(<Statusbar/>, root);