import React from 'react';
var data = document.querySelector('#maincontent');

var id_user=data.dataset.id;
var check=true;
var mon,phanlop;
var url1,url2;
var temp_username=data.dataset.username;

export class tuongtac_diali extends React.Component{
  	render(){
		return(
			<div>
				{/* Page header */}
				<div className="page-header page-header-default">
					<div className="breadcrumb-line">
						<ul className="breadcrumb">
							<li><a href="#"><i className="icon-home2 position-left"></i> Trang chủ</a></li>
							<li className="active">Tương tác môn Địa Lí</li>
							
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
								<li className="active"><a href="#quocgia" data-toggle="tab"><i className="icon-sphere3 position-left"></i>Bản đồ các quốc gia trên thế giới</a></li>
								<li><a href="#danso" data-toggle="tab"><i className="icon-people position-left"></i>Bản đồ dân số các quốc gia trên thế giới(2010)</a></li>
								<li><a href="#chauluc" data-toggle="tab"><i className="icon-earth position-left"></i>Bản đồ các châu lục trên trên thế giới</a></li>
								<li><a href="#danso_vn" data-toggle="tab"><i className="icon-earth position-left"></i>Bản đồ các tỉnh thành Việt Nam</a></li>
							
							</ul>
						</div>
					</div>
					{/* /toolbar */}

				</div>
				{/* Content area */}
				<div className="content">
					<div className="tab-content">
						<div className="tab-pane fade in active" id="quocgia">
							<div className="panel panel-flat">
								<iframe id="content1"  width="100%" height="450" allowFullScreen frameBorder="0"/>
							</div>
						</div>
						<div className="tab-pane fade" id="danso">
							<div className="panel panel-flat">
								<iframe id="content2"  width="100%" height="450" allowFullScreen frameBorder="0"/>
							</div>
						</div>
						<div className="tab-pane fade" id="chauluc">
							<div className="panel panel-flat">
								<iframe id="content3"  width="100%" height="450" allowFullScreen frameBorder="0"/>
							</div>
						</div>
						<div className="tab-pane fade" id="danso_vn">
							<div className="panel panel-flat">
								<iframe id="content4"  width="100%" height="800" scrolling="no" frameBorder="0"/>
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
		$("#content1").attr("src", "map/bandothegioi-quocgia.html");
		$("#content2").attr("src", "map/bandothegioi-danso.html");
		$("#content3").attr("src", "interactiveGlobe/index.html");
		$("#content4").attr("src", "Vietnam%20map/index.html");
		 // Initialize lightbox
	    $('[data-popup=lightbox]').fancybox({
	        padding: 3
	    });
	}
}
