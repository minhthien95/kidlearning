import React from 'react';

var data = document.querySelector('#maincontent');

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
					{/* SGK */}
					<div className=" alert alert-success no-border">
						<h6 className="panel-title ">Bài học hiện tại<a className="heading-elements-toggle"><i className="icon-more"></i></a></h6>
						
						<div className="heading-elements">
							<ul className="icons-list">
		                		<li><a data-action="collapse"></a></li>
		                	</ul>
	                	</div>
	            	</div>

	            	<div className="panel-body">
	            	<h7 className="content-group">Bạn có thể học trực tiếp môn <code>Lịch Sử</code> và <code>Địa Lí</code> thông qua trang web của chúng tôi. Các bài học được thiết kế dựa trên Sách Giáo Khoa bám sát với kiến thức trong lớp, các bài học được phân thành ba dạng sách giáo khoa, mindmap, video.</h7>
	            	</div>
	            	<div className="row">
	            		<div className="col-md-3"/>
	            		<div className="col-md-3">
							<div className="panel-body text-center">
								<div className="icon-object border-violet text-violet"><i className="icon-library2"></i></div>
								<h5 className="text-semibold">Môn Lịch Sử</h5>
								<a href={"#lichsu/lop"+data.dataset.lop+"/baihoc"} className="btn bg-violet">Học ngay</a>
							</div>
						</div>
		            	<div className="col-md-3">
							<div className="panel-body text-center">
								<div className="icon-object border-orange text-orange"><i className="icon-earth"></i></div>
								<h5 className="text-semibold">Môn Địa Lí</h5>
								<a href={"#diali/lop"+data.dataset.lop+"/baihoc"} className="btn bg-orange">Học ngay</a>
							</div>
						</div>
						<div className="col-md-3"/>
					</div>
					{/* /SGK */}

				</div>
				{/* /main charts */}

				{/* Main charts */}
				<div className="panel panel-flat">
					{/* SGK */}
					<div className=" alert alert-primary no-border">
						<h6 className="panel-title ">Sách giáo khoa<a className="heading-elements-toggle"><i className="icon-more"></i></a></h6>
						
						<div className="heading-elements">
							<ul className="icons-list">
		                		<li><a data-action="collapse"></a></li>
		                	</ul>
	                	</div>
	            	</div>

	            	<div className="panel-body">
	            		<div className="row">
							<div className="col-lg-3 col-md-3">
								<div className="thumbnail alert-success">
									<div className="thumb thumb-slide">
										<img src="assets/images/biasach/im_su6.jpg" alt=""/>
										<div className="caption">
											<span>
												<a href="#/lichsu/lop6/baihoc_sgk/0/0" className="btn bg-success-400 btn-icon btn-xs" data-popup="lightbox"><i className="icon-eye"></i></a>
											</span>
										</div>
									</div>
								
							    	<div className="caption text-center">
							    		<h6 className="text-semibold no-margin">Lịch sử lớp 6</h6>
							    	</div>
						    	</div>
							</div>

							<div className="col-lg-3 col-md-3">
								<div className="thumbnail alert-success">
									<div className="thumb thumb-slide">
										<img src="assets/images/biasach/im_su7.jpg" alt=""/>
										<div className="caption">
											<span>
												<a href="#/lichsu/lop7/baihoc_sgk/0/0" className="btn bg-success-400 btn-icon btn-xs" data-popup="lightbox"><i className="icon-eye"></i></a>
											</span>
										</div>
									</div>
								
							    	<div className="caption text-center">
							    		<h6 className="text-semibold no-margin">Lịch sử lớp 7</h6>
							    	</div>
						    	</div>
							</div>

							<div className="col-lg-3 col-md-3">
								<div className="thumbnail alert-success">
									<div className="thumb thumb-slide">
										<img src="assets/images/biasach/im_su8.jpg" alt=""/>
										<div className="caption">
											<span>
												<a href="#/lichsu/lop8/baihoc_sgk/0/0" className="btn bg-success-400 btn-icon btn-xs" data-popup="lightbox"><i className="icon-eye"></i></a>
											</span>
										</div>
									</div>
								
							    	<div className="caption text-center">
							    		<h6 className="text-semibold no-margin">Lịch sử lớp 8</h6>
							    	</div>
						    	</div>
							</div>

							<div className="col-lg-3 col-md-3">
								<div className="thumbnail alert-success">
									<div className="thumb thumb-slide">
										<img src="assets/images/biasach/im_su9.jpg" alt=""/>
										<div className="caption">
											<span>
												<a href="#/lichsu/lop9/baihoc_sgk/0/0" className="btn bg-success-400 btn-icon btn-xs" data-popup="lightbox"><i className="icon-eye"></i></a>
											</span>
										</div>
									</div>
								
							    	<div className="caption text-center">
							    		<h6 className="text-semibold no-margin">Lịch sử lớp 9</h6>
							    	</div>
						    	</div>
							</div>
						</div>
						<div className="row">
							<div className="col-lg-3 col-md-3">
								<div className="thumbnail alert-primary">
									<div className="thumb thumb-slide">
										<img src="assets/images/biasach/im_dia6.jpg" alt=""/>
										<div className="caption">
											<span>
												<a href="#/diali/lop6/baihoc_sgk/0/0" className="btn bg-success-400 btn-icon btn-xs" data-popup="lightbox"><i className="icon-eye"></i></a>
											</span>
										</div>
									</div>
								
							    	<div className="caption text-center">
							    		<h6 className="text-semibold no-margin">Địa lí lớp 6</h6>
							    	</div>
						    	</div>
							</div>

							<div className="col-lg-3 col-md-3">
								<div className="thumbnail alert-primary">
									<div className="thumb thumb-slide">
										<img src="assets/images/biasach/im_dia7.jpg" alt=""/>
										<div className="caption">
											<span>
												<a href="#/diali/lop7/baihoc_sgk/0/0" className="btn bg-success-400 btn-icon btn-xs" data-popup="lightbox"><i className="icon-eye"></i></a>
											</span>
										</div>
									</div>
								
							    	<div className="caption text-center">
							    		<h6 className="text-semibold no-margin">Địa lí lớp 7</h6>
							    	</div>
						    	</div>
							</div>

							<div className="col-lg-3 col-md-3">
								<div className="thumbnail alert-primary">
									<div className="thumb thumb-slide">
										<img src="assets/images/biasach/im_dia8.jpg" alt=""/>
										<div className="caption">
											<span>
												<a href="#/diali/lop8/baihoc_sgk/0/0" className="btn bg-success-400 btn-icon btn-xs" data-popup="lightbox"><i className="icon-eye"></i></a>
											</span>
										</div>
									</div>
								
							    	<div className="caption text-center">
							    		<h6 className="text-semibold no-margin">Địa lí lớp 8</h6>
							    	</div>
						    	</div>
							</div>

							<div className="col-lg-3 col-md-3">
								<div className="thumbnail alert-primary">
									<div className="thumb thumb-slide">
										<img src="assets/images/biasach/im_dia9.jpg" alt=""/>
										<div className="caption">
											<span>
												<a href="#/diali/lop9/baihoc_sgk/0/0" className="btn bg-success-400 btn-icon btn-xs" data-popup="lightbox"><i className="icon-eye"></i></a>
											</span>
										</div>
									</div>
								
							    	<div className="caption text-center">
							    		<h6 className="text-semibold no-margin">Địa lí lớp 9</h6>
							    	</div>
						    	</div>
							</div>
						</div>
					</div>
					{/* /SGK */}

				</div>
				{/* /main charts */}
			</div>
			{/* /content area */}
		</div>
	)
  }
}
