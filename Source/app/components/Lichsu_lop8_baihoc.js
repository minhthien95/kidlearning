import React from 'react';

export class Lichsu_lop8_baihoc extends React.Component{
	render(){
		return(
			<div>
				{/* Page header */}
				<div className="page-header page-header-default">
					<div className="breadcrumb-line">
						<ul className="breadcrumb">
							<li><a href="#"><i className="icon-home2 position-left"></i> Trang chủ</a></li>
							<li className="active">Bài học lịch sử Lớp 8</li>
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
					{/* Main charts */}
					<div className="panel panel-flat">
					</div>
					{/* /main charts */}

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
