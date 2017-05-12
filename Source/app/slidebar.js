import React from "react";
import {render} from "react-dom";
import PropTypes from 'prop-types'; 

var data = document.querySelector('#slidebar');

var root = window.document.getElementById("slidebar");

class Slidebar extends React.Component {
	// constructor(props) {
 //    super(props);
 //      this.state = {
 //        username: "abc"
 //      };
 //    }
	// componentWillMount(){
	// 	var that=this;
	// 	$.post("/trangchu", function(data){
	// 		//that.setState({noidung: data})
	// 		that.setState({username: data});
	// 		console.log(data);
	// 	})
	// }
	// componentWillMount(){
	// 	console.log("hihi slidebar");
	// 	//if(data.dataset.username==8)
	// 		$("#Lichsu_lop8").addClass("disabled");
	// }
	componentDidMount()
	{
		console.log("hihi slidebar");
		if(data.dataset.lop<6)
			$("#Lichsu_lop6").addClass("disabled");
		if(data.dataset.lop<7)
			$("#Lichsu_lop7").addClass("disabled");
		if(data.dataset.lop<8)
			$("#Lichsu_lop8").addClass("disabled");
		if(data.dataset.lop<9)
			$("#Lichsu_lop9").addClass("disabled");

		if(data.dataset.lop<6)
			$("#Dialy_lop6").addClass("disabled");
		if(data.dataset.lop<7)
			$("#Dialy_lop7").addClass("disabled");
		if(data.dataset.lop<8)
			$("#Dialy_lop8").addClass("disabled");
		if(data.dataset.lop<9)
			$("#Dialy_lop9").addClass("disabled");
	}
 	render() {
	    return (
	    	<div>
				<div className="sidebar-content">
					<div className="sidebar-user">
						<div className="category-content">
							<div className="media">
								<a className="media-left"><img src="assets/images/placeholder.jpg" className="img-circle img-sm" alt=""/></a>
								<div className="media-body">
									<span className="media-heading text-semibold">{data.dataset.username}</span>
									<div className="text-size-mini text-muted">
										<i className="icon-pen text-size-small"></i> &nbsp;Lớp {data.dataset.lop}
									</div>
								</div>

								<div className="media-right media-middle">
									<ul className="icons-list">
										<li>
											<a><i className="icon-cog3"></i></a>
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
								<li className="active"><a href="#"><i className="icon-home4"></i> <span>Trang chủ</span></a></li>
								<li>
									<a><i className="icon-stack2"></i> <span>Lịch sử</span></a>
									<ul>
										<li id="Lichsu_lop6">
											<a><span>Lớp 6</span></a>
											<ul> 
												<li><a href="#Lichsu_lop6_baihoc" className="active" >Bài học</a></li>
												<li><a href="#Lichsu_lop6_baitapnangcao" >Bài tập nâng cao</a></li>
												<li><a href="#Lichsu_lop6_thaoluan" >Thảo luận</a></li>
											</ul>
										</li>
										<li id="Lichsu_lop7">
											<a><span>Lớp 7</span></a>
											<ul>
												<li><a href="#Lichsu_lop7_baihoc" className="active" >Bài học</a></li>
												<li><a href="#Lichsu_lop7_baitapnangcao" >Bài tập nâng cao</a></li>
												<li><a href="#Lichsu_lop7_thaoluan" >Thảo luận</a></li>
											</ul>
										</li>
										<li id="Lichsu_lop8">
											<a><span>Lớp 8</span></a>
											<ul>
												<li><a href="#Lichsu_lop8_baihoc" className="active" >Bài học</a></li>
												<li><a href="#Lichsu_lop8_baitapnangcao" >Bài tập nâng cao</a></li>
												<li><a href="#Lichsu_lop8_thaoluan" >Thảo luận</a></li>
											</ul>
										</li>
										<li id="Lichsu_lop9">
											<a><span>Lớp 9</span></a>
											<ul>
												<li><a href="#Lichsu_lop9_baihoc" className="active" >Bài học</a></li>
												<li><a href="#Lichsu_lop9_baitapnangcao" >Bài tập nâng cao</a></li>
												<li><a href="#Lichsu_lop9_thaoluan" >Thảo luận</a></li>
											</ul>
										</li>
									</ul>
								</li>
								<li>
									<a><i className="icon-stack2"></i> <span>Địa lý</span></a>
									<ul>
										<li id="Dialy_lop6">
											<a><span>Lớp 6</span></a>
											<ul> 
												<li><a href="#Dialy_lop6_baihoc" className="active" >Bài học</a></li>
												<li><a href="#Dialy_lop6_baitapnangcao" >Bài tập nâng cao</a></li>
												<li><a href="#Dialy_lop6_thaoluan" >Thảo luận</a></li>
											</ul>
										</li>
										<li id="Dialy_lop7">
											<a><span>Lớp 7</span></a>
											<ul>
												<li><a href="#Dialy_lop7_baihoc" className="active" >Bài học</a></li>
												<li><a href="#Dialy_lop7_baitapnangcao" >Bài tập nâng cao</a></li>
												<li><a href="#Dialy_lop7_thaoluan" >Thảo luận</a></li>
											</ul>
										</li>
										<li id="Dialy_lop8">
											<a><span>Lớp 8</span></a>
											<ul>
												<li><a href="#Dialy_lop8_baihoc" className="active" >Bài học</a></li>
												<li><a href="#Dialy_lop8_baitapnangcao" >Bài tập nâng cao</a></li>
												<li><a href="#Dialy_lop8_thaoluan" >Thảo luận</a></li>
											</ul>
										</li>
										<li id="Dialy_lop9">
											<a><span>Lớp 9</span></a>
											<ul>
												<li><a href="#Dialy_lop9_baihoc" className="active" >Bài học</a></li>
												<li><a href="#Dialy_lop9_baitapnangcao" >Bài tập nâng cao</a></li>
												<li><a href="#Dialy_lop9_thaoluan" >Thảo luận</a></li>
											</ul>
										</li>
									</ul>
								</li>
								<li>
									<a><i className="icon-droplet2"></i> <span>Hỏi & đáp</span></a>
									<ul>
										<li><a href="#Hoidap_lichsu" id="layout1">Lịch Sử</a></li>
										<li><a href="#Hoidap_dialy" id="layout3">Địa Lý</a></li>
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
render(<Slidebar/>, root);