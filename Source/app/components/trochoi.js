import React from 'react';
var data = document.querySelector('#maincontent');

export class trochoi extends React.Component{
  	render(){
		return(
			<div>
				{/* Page header */}
				<div className="page-header page-header-default">
					<div className="breadcrumb-line">
						<ul className="breadcrumb">
							<li><a href="#"><i className="icon-home2 position-left"></i> Trang chủ</a></li>
							<li className="active">Trò chơi xếp hình</li>
							
						</ul>
					</div>
				</div>
				{/* /page header */}

				<div className="page-header">
					{/* Toolbar */}
					<div className="navbar navbar-default navbar-component navbar-xs">
						<ul className="nav navbar-nav visible-xs-block">
							<li className="full-width text-center"><a data-toggle="collapse" data-target="#navbar-filter"><i className="icon-menu7"></i></a></li>
						</ul>

						<div className="navbar-collapse collapse" id="navbar-filter">
							<ul className="nav navbar-nav">
								<li className="active"><a href="#doanhnhan" data-toggle="tab"><i className=" icon-person position-left"></i>Nhân vật lịch sử</a></li>
								<li><a href="#kyquan" data-toggle="tab"><i className=" icon-image2 position-left"></i>Kỳ quan thế giới </a></li>
								<li><a href="#quocki" data-toggle="tab"><i className="icon-flag4 position-left"></i>Quốc kì trên thế giới</a></li>
							</ul>
						</div>
					</div>
					{/* /toolbar */}

				</div>
				{/* Content area */}
				<div className="content">
					<div className="tab-content">
						<div className="tab-pane fade in active" id="doanhnhan">
							<div className="panel panel-flat">
								<iframe id="content1"  width="100%" height="700" allowFullScreen frameBorder="0"/>
							</div>
						</div>
						<div className="tab-pane fade" id="kyquan">
							<div className="panel panel-flat">
								<iframe id="content2"  width="100%" height="700" allowFullScreen frameBorder="0"/>
							</div>
						</div>
						<div className="tab-pane fade" id="quocki">
							<div className="panel panel-flat">
								<iframe id="content3"  width="100%" height="700" allowFullScreen frameBorder="0"/>
							</div>
						</div>
					</div>
				</div>
				{/* /content area */}
			</div>
		)
	}
	componentDidMount()
	{
		console.log("componentDidMount");
		$("#content1").attr("src", "Game/danhnhan.html");
		$("#content2").attr("src", "Game/kyquan.html");
		$("#content3").attr("src", "Game/quocki.html");

	}
}
