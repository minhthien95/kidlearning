import React from 'react';

export class baihoc extends React.Component{
	constructor(props) {
    super(props);
      this.state = {
        listbaihoc: []
      };
    }
	render(){
		return(
			<div>
				{/* Page header */}
				<div className="page-header page-header-default">
					<div className="breadcrumb-line">
						<ul className="breadcrumb">
							<li><a href="#"><i className="icon-home2 position-left"></i> Trang chủ</a></li>
							<li className="active" id="link_pre" ></li>
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
									<li><a href={"/sachgiaokhoa/"+this.props.params.lop+"/"+this.props.params.lop} target="_blank" href="#abc"><i className="icon-book"></i> Sách giáo khoa</a></li>
									<li><a href="#Lichsu_lop6_video"><i className="icon-book-play"></i> Video </a></li>
									<li><a href="#Lichsu_lop6_tuongtac"><i className="icon-reading"></i> Tương tác</a></li>
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
						<div className="panel-heading">
							<h6 className="panel-title">Bài học</h6>
							<hr/>
						</div>
						{/* SGK */}
						<div className="content">
							<div className="panel-heading">
								<h6 className="panel-title">Sách giáo khoa<a className="heading-elements-toggle"><i className="icon-more"></i></a></h6>
								<div className="heading-elements">
									<ul className="icons-list">
				                		<li><a data-action="collapse"></a></li>
				                		<li><a data-action="reload"></a></li>
				                		<li><a data-action="close"></a></li>
				                	</ul>
			                	</div>
			            	</div>

							<div className="panel-body text-center">
								<div className="icon-object border-success text-success"><i className="icon-book"></i></div>
								<h5 className="text-semibold">Sách giáo khoa lớp 6</h5>
								<a href={"/sachgiaokhoa/lichsu/"+this.props.params.lop} target="_blank" className="btn bg-success-400">Học ngay</a>
							</div>
						</div>
						{/* /SGK */}

						{/* Video */}
						<div className="content">
							<div className="panel-heading">
								<h6 className="panel-title">Videos<a className="heading-elements-toggle"><i className="icon-more"></i></a></h6>
								<div className="heading-elements">
									<ul className="icons-list">
				                		<li><a data-action="collapse"></a></li>
				                		<li><a data-action="reload"></a></li>
				                		<li><a data-action="close"></a></li>
				                	</ul>
			                	</div>
			            	</div>

							<div className="panel-body">
								<ul className="media-list content-group">
									{this.state.listbaihoc.map(function(abc,index){
										return (
											<li key={index} className="media stack-media-on-mobile">
			                					<div className="media-left">
													<div className="thumb">
														<a href="#">
															<img src="assets/images/placeholder.jpg" className="img-responsive img-rounded media-preview" alt=""/>
															<span className="zoom-image"><i className="icon-play3"></i></span>
														</a>
													</div>
												</div>

			                					<div className="media-body">
													<h6 className="media-heading" ><a href={"#/bai" + abc.ID} target="_blank">Bai {abc.ID} - {abc.LOAIBAIHOC}</a></h6>
						                    		<ul className="list-inline list-inline-separate text-muted mb-5">
						                    			<li><i className="icon-book-play position-left"></i> Video tutorials</li>
						                    			<li>14 minutes ago</li>
						                    		</ul>
													The him father parish looked has sooner. Attachment frequently gay terminated son...
												</div>
											</li>
										)
									})}
								</ul>
							</div>
						</div>
						{/* /video */}

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
	// componentWillUpdate(){
	// 	console.log("lay du lieu bai hoc 0");
	// 	var that=this;

	// 	$.post("/Lichsu_baihoc/lop"+this.props.params.lop, function(data){
	// 		//that.setState({noidung: data})
	// 		console.log("lay du lieu bai hoc 1");
	// 		that.setState({listbaihoc: data});
	// 	});
	// }
	componentWillMount(){
		var that=this;

		var url1=window.location.href;
		url1=url1.split('#');
		var mon=url1[1].split('/');
		var url2=window.location.href;
		url2=url2.split('lop');
		var phanlop=url2[1].split('/');

		var mon1;
		if(mon[1]=="lichsu")
				mon1="Lịch sử";
			if(mon[1]=="diali")
				mon1="Địa lí";
		var name_link="Thảo luận "+mon1+" lớp "+phanlop[0]; 

		$.post("/Lichsu_baihoc/lop"+this.props.params.lop, function(data){
			//that.setState({noidung: data})
			console.log("lay du lieu bai hoc 1");
			$("#link_pre").text(name_link);
			that.setState({listbaihoc: data});
		});
	}
	componentWillReceiveProps(newProps)
	{
		var that=this;

		var url1=window.location.href;
		url1=url1.split('#');
		var mon=url1[1].split('/');
		var url2=window.location.href;
		url2=url2.split('lop');
		var phanlop=url2[1].split('/');

		var mon1;
		if(mon[1]=="lichsu")
				mon1="Lịch sử";
		if(mon[1]=="diali")
				mon1="Địa lí";
		var name_link="Thảo luận "+mon1+" lớp "+phanlop[0]; 

		$.post("/Lichsu_baihoc/lop"+newProps.params.lop, function(data){
			//that.setState({noidung: data})
			console.log("lay du lieu bai hoc 2");
			$("#link_pre").text(name_link);
			that.setState({listbaihoc: data});
		});
	}
}
