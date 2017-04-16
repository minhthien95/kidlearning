import React from "react";
import {render} from "react-dom";

class Slidebar extends React.Component {
	constructor(props) {
    super(props);
      this.state = {
        username: ""
      };
    }
	// componentWillMount(){
	// 	var that=this;
	// 	$.post("/trangchu", function(data){
	// 		//that.setState({noidung: data})
	// 		that.setState({username: data});
	// 		console.log(data);
	// 	})
	// }
 	render() {
	    return (
	    	<div>
				<div className="sidebar-content">
					{/* User menu */}
					<div className="sidebar-user">
						<div className="category-content">
							<div className="media">
								<a href="#" className="media-left"><img src="assets/images/placeholder.jpg" className="img-circle img-sm" alt=""/></a>
								<div className="media-body">
									<span className="media-heading text-semibold">Lê Minh Thiện</span>
									<div className="text-size-mini text-muted">
										<i className="icon-pin text-size-small"></i> &nbsp;Lớp 7
									</div>
								</div>

								<div className="media-right media-middle">
									<ul className="icons-list">
										<li>
											<a href="#"><i className="icon-cog3"></i></a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					{/* /user menu */}

					{/* Main navigation */}
					<div className="sidebar-category sidebar-category-visible">
						<div className="category-content no-padding">
							<ul className="navigation navigation-main navigation-accordion">

								{/* Main */}
								<li className="navigation-header"><span>Main</span> <i className="icon-menu" title="Main pages"></i></li>
								<li className="active"><a href="#" ><i className="icon-home4"></i> <span>Trang chủ</span></a></li>
								<li>
									<a><i className="icon-stack2"></i> <span>Lịch sử</span></a>
									<ul>
										<li>
											<a><span>Lớp 6</span></a>
											<ul> 
												<li><a href="Lichsu_lop6_baihoc" className="active" >Bài học</a></li>
												<li><a href="Lichsu_lop6_baitapnangcao" >Bài tập nâng cao</a></li>
												<li><a href="Lichsu_lop6_thaoluan" >Thảo luận</a></li>
											</ul>
										</li>
										<li>
											<a><span>Lớp 7</span></a>
											<ul>
												<li><a href="#Lichsu_lop7_baihoc" className="active" >Bài học</a></li>
												<li><a href="#Lichsu_lop7_baitapnangcao" >Bài tập nâng cao</a></li>
												<li><a href="#Lichsu_lop7_thaoluan" >Thảo luận</a></li>
											</ul>
										</li>
										<li className="disabled"><a href="../../../layout_6/LTR/index.html" id="layout6">Lớp 8 <span className="label label-transparent">Coming soon</span></a></li>
										<li className="disabled"><a href="../../../layout_6/LTR/index.html" id="layout6">Lớp 9 <span className="label label-transparent">Coming soon</span></a></li>
									</ul>
								</li>
								<li>
									<a href="#"><i className="icon-stack2"></i> <span>Địa lý</span></a>
									<ul>
										<li>
											<a href="#"><span>Lớp 6</span></a>
											<ul>
												<li><a href="../../../layout_1/LTR/index.html" id="layout1">Bài học</a></li>
												<li><a href="../../../layout_2/LTR/index.html" id="layout3">Bài tập nâng cao</a></li>
												<li><a href="../../../layout_1/LTR/index.html" id="layout1">Thảo luận</a></li>
											</ul>
										</li>
										<li>
											<a href="#"><span>Lớp 7</span></a>
											<ul>
												<li><a href="../../../layout_1/LTR/index.html" id="layout1">Bài học</a></li>
												<li><a href="../../../layout_2/LTR/index.html" id="layout3">Bài tập nâng cao</a></li>
												<li><a href="../../../layout_1/LTR/index.html" id="layout1">Thảo luận</a></li>
											</ul>
										</li>
										<li>
											<a href="#"><span>Lớp 8</span></a>
											<ul>
												<li><a href="../../../layout_1/LTR/index.html" id="layout1">Bài học</a></li>
												<li><a href="../../../layout_2/LTR/index.html" id="layout3">Bài tập nâng cao</a></li>
												<li><a href="../../../layout_1/LTR/index.html" id="layout1">Thảo luận</a></li>
											</ul>
										</li>
										<li>
											<a href="#"><span>Lớp 9</span></a>
											<ul>
												<li><a href="../../../layout_1/LTR/index.html" id="layout1">Bài học</a></li>
												<li><a href="../../../layout_2/LTR/index.html" id="layout3">Bài tập nâng cao</a></li>
												<li><a href="../../../layout_1/LTR/index.html" id="layout1">Thảo luận</a></li>
											</ul>
										</li>
									</ul>
								</li>
								<li>
									<a href="#"><i className="icon-droplet2"></i> <span>Hỏi & đáp</span></a>
									<ul>
										<li><a href="../../../layout_1/LTR/index.html" id="layout1">Lịch Sử</a></li>
										<li><a href="../../../layout_2/LTR/index.html" id="layout3">Địa Lý</a></li>
									</ul>
								</li>
								<li><a href="../../RTL/index.html"><i className="icon-list-unordered"></i> <span>Giới thiệu</span></a></li>
								{/* /main */}
							</ul>
						</div>
					</div>
					{/* /main navigation */}
				</div>
			</div>
    )
  }
}
render(<Slidebar/>, window.document.getElementById("slidebar"));