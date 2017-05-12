import React from 'react';

export class Lichsu_lop6_video extends React.Component{
	constructor(props) {
    super(props);
      this.state = {
        listvideo: []
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
							<li><a href="#Lichsu_lop6_baihoc">Bài học Lịch sử Lớp 6</a></li>
							<li className="active">Bài học Video lịch sử Lớp 6</li>
						</ul>
					</div>
				</div>
				{/* /page header */}


				{/* Content area */}
				<div className="content">

					{/* Main charts */}
					<div className="panel panel-flat">
						<div className="panel-heading">
							<h6 className="panel-title">Videos</h6>
							<hr/>
						</div>
						{/* Nội dung */}
						<div className="content">
							<div className="panel-body">
								<ul className="media-list content-group">
									{this.state.listvideo.map(function(abc,index){
										return (
											<li key={index} className="media stack-media-on-mobile">
			                					<div className="media-left">
													<div className="thumb">
														<a href={"#/Lichsu_lop6_video_bai" + abc.ID}>
															<img src={"http://img.youtube.com/vi/"+abc.LINK_VIDEO+"/0.jpg"} className="img-responsive img-rounded media-preview" alt=""/>
															<span className="zoom-image"><i className="icon-play3"></i></span>
														</a>
													</div>
												</div>

			                					<div className="media-body">
													<h6 className="media-heading" ><a href={"#/Lichsu_lop6_video_bai" + abc.ID} target="_blank">Bai {abc.ID} - {abc.TIEUDE}</a></h6>
						                    		<ul className="list-inline list-inline-separate text-muted mb-5">
						                    			<li><i className="icon-book-play position-left"></i> {abc.LOAIBAIHOC}</li>
						                    			<li>Tác giá: {abc.ID_TACGIA}</li>
						                    		</ul>
													{abc.NOIDUNG}
												</div>
											</li>
										)
									})}
								</ul>
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
	componentWillMount(){
		var that=this;
		$.post("/Lichsu_lop6_video", function(data){
			//that.setState({noidung: data})
			that.setState({listvideo: data});
			console.log(data);
		});
	}
}
