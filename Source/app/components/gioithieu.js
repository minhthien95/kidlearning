import React from 'react';

export class gioithieu extends React.Component{
	render(){
		return(
			<div>
				{/* Page header */}
				<div className="page-header page-header-default">
					<div className="breadcrumb-line">
						<ul className="breadcrumb">
							<li><a href="#"><i className="icon-home2 position-left"></i> Trang chủ</a></li>
							<li className="active" >Giới thiệu chung</li>
						</ul>
					</div>
				</div>
				{/* /page header */}


				{/* Content area */}
				<div className="content">
					{/* Main charts */}
					<div className="panel panel-flat">
						<div className="panel-heading ">
							<h6 className="panel-title text-semibold">Về dự án</h6>
						</div>
						{/* gioi thieu */}
						<div className="content">
							<p className="content-group">&emsp;&emsp;Đề tài của nhóm sẽ tập trung vào việc khảo sát các phương pháp học tập truyền thống của học sinh cấp II (từ lớp 6 đến lớp 9) tại lớp học với 2 môn Lịch sử và Địa lý, từ đó tạo ra một hệ thống về giảng dạy Lịch sử và Địa lý một cách trực quan sinh động dựa trên nội dung của Sách giao khoa cho học sinh cấp II. Với hệ thống này học sinh có thể học tập nghiên cứu và tương tác với nhau, tiếp cận bài giảng dễ dàng hơn. Nội dung giảng dạy vẫn dựa trên kiến thức nền tảng trong sách giáo khoa mà các em được học ở trường, lồng ghép vào đó những câu hỏi, trò chơi và kết hợp khả năng tương tác với nhau, từ đó giúp cho học sinh dễ dàng hơn trong quá trình học tập và tạo cho người học được sự hứng thú với hai môn học này.
							</p>
						</div>
						{/* /SGK */}

					</div>
					{/* /main charts */}
					{/* Main charts */}
					<div className="panel panel-flat">
						<div className="panel-heading">
							<h6 className="panel-title text-semibold">Về chúng tôi</h6>
						</div>
						{/* gioi thieu */}
						<div className="content">
							{/* Square thumbs */}
							<div className="row">
								<div className="col-lg-3 col-md-6">
									<div className="thumbnail no-padding">
										<div className="thumbnail">
											<img src="assets/images/user_1.jpg" alt=""/>
										</div>
									
								    	<div className="caption text-center">
								    		<h6 className="text-semibold no-margin">Lê Minh Thiện <small className="display-block">Developer</small></h6>
							    			<ul className="icons-list mt-15">
						                    	<li><a href="https://plus.google.com/u/0/116798315574237710462" target="_blank" data-popup="tooltip" title="Google+" data-container="body"><i className=" icon-google-plus2"></i></a></li>
						                    	<li><a href="https://www.facebook.com/leminhthien95" target="_blank" data-popup="tooltip" title="Facebook" data-container="body"><i className="icon-facebook2"></i></a></li>
						                    	<li><a href="https://github.com/minhthien95/kidlearning/" target="_blank" data-popup="tooltip" title="Github" data-container="body"><i className="icon-github"></i></a></li>
					                    	</ul>
								    	</div>
							    	</div>
								</div>

								<div className="col-lg-3 col-md-6">
									<div className="thumbnail no-padding">
										<div className="thumbnail">
											<img src="assets/images/user_2.jpg" alt=""/>
										</div>
									
								    	<div className="caption text-center">
								    		<h6 className="text-semibold no-margin">Đinh Trang Thanh Giang <small className="display-block">Developer</small></h6>
							    			<ul className="icons-list mt-15">
						                    	<li><a href="https://plus.google.com/" target="_blank" data-popup="tooltip" title="Google+" data-container="body"><i className=" icon-google-plus2"></i></a></li>
						                    	<li><a href="https://www.facebook.com/thanhgiang.hcmus" target="_blank" data-popup="tooltip" title="Facebook" data-container="body"><i className="icon-facebook2"></i></a></li>
						                    	<li><a href="https://github.com/" target="_blank" data-popup="tooltip" title="Github" data-container="body"><i className="icon-github"></i></a></li>
					                    	</ul>
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
