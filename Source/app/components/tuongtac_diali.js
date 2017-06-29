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


				{/* Content area */}
				<div className="content">

					{/* Main charts */}
					<div className="panel panel-flat">
						{/* tuong tac */}


						<div className="content" style={{paddingBottom: '0px'}}>
							<div className="page-title">
								<h4><span className="text-semibold">Bản đồ các quốc gia trên thế giới</span></h4>
								<a className="heading-elements-toggle"><i className="icon-more"></i></a>
							</div>
		 					<iframe id="contentSGK1"  width="100%" height="450" allowFullScreen frameBorder="0"/>
		 					<br/>
		 					<div className="page-title">
								<h4><span className="text-semibold">Bản đồ dân số của các quốc gia trên thế giới(2010)</span></h4>
								<a className="heading-elements-toggle"><i className="icon-more"></i></a>
							</div>
		 					<iframe id="contentSGK2"  width="100%" height="450" allowFullScreen frameBorder="0"/>
						</div>
						{/* /tuon tac */}

					</div>
					{/* /main charts */}

				</div>
				{/* /content area */}

			</div>
		)
	}
	componentDidMount()
	{
		console.log("componentDidMount");
		$("#contentSGK1").attr("src", "map/bandothegioi-quocgia.html");
		$("#contentSGK2").attr("src", "map/bandothegioi-danso.html");
		 // Initialize lightbox
	    $('[data-popup=lightbox]').fancybox({
	        padding: 3
	    });
	}
	componentWillMount()
	{
		console.log("componentWillMount");
		
		////
	}
	componentWillReceiveProps(newProps)
	{
		console.log("componentWillReceiveProps");
		// var that=this;

	}
}
