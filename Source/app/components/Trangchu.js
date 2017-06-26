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
						<h6 className="panel-title ">Bài học<a className="heading-elements-toggle"><i className="icon-more"></i></a></h6>
						
						<div className="heading-elements">
							<ul className="icons-list">
		                		<li><a data-action="collapse"></a></li>
		                	</ul>
	                	</div>
	            	</div>

	            	<div className="panel-body">
	            	<h7 className="content-group">Bạn có thể học trực tiếp môn <code>Lịch Sử</code> và <code>Địa Lí</code> thông qua trang web của chúng tôi. Các bài học được thiết kế dựa trên Sách Giáo Khoa bám sát với kiến thức trong lớp, các bài học được phân thành ba dạng sách giáo khoa, video, bài viết học thuật.</h7>
	            	</div>
	            	<div className="row">
	            		<div className="col-md-3"/>
	            		<div className="col-md-3">
							<div className="panel-body text-center">
								<div className="icon-object border-violet text-violet"><i className=" icon-hour-glass2"></i></div>
								<h5 className="text-semibold">Hoc Lịch Sử Online</h5>
								<a href={"#lichsu/lop"+data.dataset.lop+"/baihoc"} className="btn bg-violet">Học ngay</a>
							</div>
						</div>
		            	<div className="col-md-3">
							<div className="panel-body text-center">
								<div className="icon-object border-orange text-orange"><i className="icon-earth"></i></div>
								<h5 className="text-semibold">Học Địa Lí Online</h5>
								<a href={"#diali/lop"+data.dataset.lop+"/baihoc"} className="btn bg-orange">Học ngay</a>
							</div>
						</div>
						<div className="col-md-3"/>
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
