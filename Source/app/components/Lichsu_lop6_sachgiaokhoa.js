import React from 'react';

export class Lichsu_lop6_sachgiaokhoa extends React.Component{
		componentDidMount(){
	    	var embedCode = '<script src="mobile/javascript/bookmark_config.js"></script>'+
						'<script src="mobile/javascript/LoadingJS.js"></script>'+
						'<script src="mobile/javascript/main.js"></script>'+
						'<link rel="stylesheet" href="mobile/style/template.css" />'+
						'<script type="text/javascript">'+
							'var sendvisitinfo = function(type,page){};'+
						+
						'</script>"';
			var example="<h1> abc</h1>"
	    	$('#script').append(embedCode);
		}
		render(){
		return(
			<div>
				{/* Page header */}
				<div className="page-header page-header-default">
					<div className="breadcrumb-line">
						<ul className="breadcrumb">
							<li><a href="#"><i className="icon-home2 position-left"></i> Trang chủ</a></li>
							<li><a href="#Lichsu_lop6_baihoc">Bài học Lịch sử Lớp 6</a></li>
							<li className="active">Sách giáo khoa Lịch sử Lớp 6</li>
						</ul>

					</div>
				</div>
				{/* /page header */}


				{/* Content area */}
				<div className="content">

					{/* Main charts */}
					<div className="panel panel-flat">
						<div className="panel-heading">
							<h6 className="panel-title">Sác giáo khoa Lịch sử lớp 6</h6>
							<hr/>
						</div>
						{/* Nội dung */}
						<div className="content">
							<div id="script"></div>
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