import React from 'react';

export class Trangchu extends React.Component{
  render(){
		return(
		<div>
			{/* Page header */}
			<div className="page-header page-header-default">
				<div className="breadcrumb-line">
					<ul className="breadcrumb">
						<li><a href="#"><i className="icon-home2 position-left"></i> Trang chủ</a></li>
					</ul>

				</div>
			</div>
			{/* /page header */}


			{/* Content area */}
			<div className="content">

				{/* Main charts */}
				<div className="panel panel-flat">
					<div className="panel-heading">
						<h6 className="panel-title">Trang chủ</h6>
						<hr/>
					</div>
					{/* Nội dung */}
					<div className="content">

					</div>
					
					{/* /Nội dung */}

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
