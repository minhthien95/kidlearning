import React from 'react';

var data = document.querySelector('#maincontent');

export class Lichsu_lop6_thaoluan extends React.Component{
	constructor(props) {
    	super(props);
  		this.state = {
        	listCauhoi: []
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
									<li><a href="/Lichsu_lop6_sachgiaokhoa" target="_blank"><i className="icon-book"></i> Sách giáo khoa</a></li>
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
					{this.state.listCauhoi.map(function(data,index){
						return (
							<div key={index} className="col-lg-12">
								<div className="panel panel-flat blog-horizontal blog-horizontal-2">
									<div className="panel-body">

										<div className="blog-preview">
											<div className="content-group-sm media blog-title stack-media-on-mobile text-left">
												<div className="media-body">
													<h5 className="text-semibold no-margin"><a href={"#Hoidap_lichsu/lop"+data.PHANLOP+"/id"+data.ID} className="text-default">{data.TIEUDE}</a></h5>

													<ul className="list-inline list-inline-separate no-margin text-muted">
														<li>Đăng bởi <a href="#">{data.USERNAME}</a></li>
														<li>{data.to_char}</li>
													</ul>
												</div>
											</div>

											<p>{data.NOIDUNG}</p>
											<a href={"#Hoidap_lichsu/lop"+data.PHANLOP+"/id"+data.ID} >[...]</a>
										</div>
									</div>

									<div className="panel-footer panel-footer-condensed"><a className="heading-elements-toggle"><i className="icon-more"></i></a>
										<div className="heading-elements">
											<ul className="list-inline list-inline-separate heading-text">
												<li><i className="icon-users position-left"></i> {data.SOTRALOI} trả lời</li>
												<li>
													Đánh giá:&nbsp;
													<i className="icon-star-full2 text-size-base text-warning-300"></i>
													<i className="icon-star-full2 text-size-base text-warning-300"></i>
													<i className="icon-star-full2 text-size-base text-warning-300"></i>
													<i className="icon-star-full2 text-size-base text-warning-300"></i>
													<i className="icon-star-full2 text-size-base text-warning-300"></i>
													<span className="text-muted position-right">({data.DANHGIA})</span>
												</li>
											</ul>

											<a href={"#Hoidap_lichsu/lop"+data.PHANLOP+"/id"+data.ID} className="heading-text pull-right">Chi tiết <i className="icon-arrow-right14 position-right"></i></a>
										</div>
									</div>
								</div>
							</div>
						)
					})}
				</div>
				{/* /content area */}
			</div>
		)
	}
	componentWillMount()
	{
		var that=this;
		$.post("Hoidap_lichsu/lopall/idall",function( data ){
			console.log("lay data");
			console.log(data);
			that.setState({listCauhoi: data});
		})
	}
}
