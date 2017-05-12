import React from 'react';

export class Hoidap_dialy extends React.Component{
		render(){
		return(
			<div>
				{/* Page header */}
				<div className="page-header page-header-default">
					<div className="breadcrumb-line">
						<ul className="breadcrumb">
							<li><a href="#"><i className="icon-home2 position-left"></i> Trang chủ</a></li>
							<li className="active">Hỏi và đáp Địa lý</li>
						</ul>

					</div>
				</div>
				{/* /page header */}


				{/* Content area */}
				<div className="content">

					{/* Main charts */}
					<div className="panel panel-flat">
						<div className="panel-heading">
							<h6 className="panel-title">Câu hỏi</h6>
							<hr/>
						</div>
						{/* Nội dung */}
						<div className="content">
								<div className="panel panel-success">
									<div className="panel-heading">
										<h6 className="panel-title">Success panel</h6>
										<div className="heading-elements">
											<ul className="icons-list">
						                		<li><a data-action="collapse"></a></li>
						                		<li><a data-action="reload"></a></li>
						                		<li><a data-action="close"></a></li>
						                	</ul>
					                	</div>
									</div>

									<div className="panel-body">
										Success panel using <code>.panel-success</code> className
									</div>
								</div>
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