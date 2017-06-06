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
	constructor(props) {
    super(props);
      this.state = {
        id_user: "assets/images/user_"+data.dataset.id+".jpg"
      };
    }
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
			$("#Diali_lop6").addClass("disabled");
		if(data.dataset.lop<7)
			$("#Diali_lop7").addClass("disabled");
		if(data.dataset.lop<8)
			$("#Diali_lop8").addClass("disabled");
		if(data.dataset.lop<9)
			$("#Diali_lop9").addClass("disabled");
	}
 	render() {
	    return (
	    	<div>
				<div className="sidebar-content">
					<div className="sidebar-user">
						<div className="category-content">
							<div className="media">
								<a href="#trangcanhan" className="media-left"><img src={this.state.id_user} onError={() => {this.setState({id_user : "assets/images/placeholder.jpg"}) }} className="img-circle img-sm" alt=""/></a>
								<div className="media-body">
									<span className="media-heading text-semibold">{data.dataset.username}</span>
									<div className="text-size-mini text-muted">
										<i className="icon-pen text-size-small"></i> &nbsp;Lớp {data.dataset.lop}
									</div>
								</div>

								<div className="media-right media-middle">
									<ul className="icons-list">
										<li>
											<a href="#trangcanhan"><i className="icon-cog3"></i></a>
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
												<li><a href="#lichsu/lop6/baihoc" className="active" >Bài học</a></li>
												<li><a href="#lichsu/lop6/baitap" >Bài tập nâng cao</a></li>
												<li><a href="#lichsu/lop6/thaoluan" >Thảo luận</a></li>
											</ul>
										</li>
										<li id="Lichsu_lop7">
											<a><span>Lớp 7</span></a>
											<ul>
												<li><a href="#lichsu/lop7/baihoc" className="active" >Bài học</a></li>
												<li><a href="#lichsu/lop7/baitap" >Bài tập nâng cao</a></li>
												<li><a href="#lichsu/lop7/thaoluan" >Thảo luận</a></li>
											</ul>
										</li>
										<li id="Lichsu_lop8">
											<a><span>Lớp 8</span></a>
											<ul>
												<li><a href="#lichsu/lop8/baihoc" className="active" >Bài học</a></li>
												<li><a href="#lichsu/lop8/baitap" >Bài tập nâng cao</a></li>
												<li><a href="#lichsu/lop8/thaoluan" >Thảo luận</a></li>
											</ul>
										</li>
										<li id="Lichsu_lop9">
											<a><span>Lớp 9</span></a>
											<ul>
												<li><a href="#lichsu/lop9/baihoc" className="active" >Bài học</a></li>
												<li><a href="#lichsu/lop9/baitap" >Bài tập nâng cao</a></li>
												<li><a href="#lichsu/lop9/thaoluan" >Thảo luận</a></li>
											</ul>
										</li>
									</ul>
								</li>
								<li>
									<a><i className="icon-stack2"></i> <span>Địa lí</span></a>
									<ul>
										<li id="Diali_lop6">
											<a><span>Lớp 6</span></a>
											<ul> 
												<li><a href="#diali/lop6/baihoc" className="active" >Bài học</a></li>
												<li><a href="#diali/lop6/baitap" >Bài tập nâng cao</a></li>
												<li><a href="#diali/lop6/thaoluan" >Thảo luận</a></li>
											</ul>
										</li>
										<li id="Diali_lop7">
											<a><span>Lớp 7</span></a>
											<ul>
												<li><a href="#diali/lop7/baihoc" className="active" >Bài học</a></li>
												<li><a href="#diali/lop7/baitap" >Bài tập nâng cao</a></li>
												<li><a href="#diali/lop7/thaoluan" >Thảo luận</a></li>
											</ul>
										</li>
										<li id="Diali_lop8">
											<a><span>Lớp 8</span></a>
											<ul>
												<li><a href="#diali/lop8/baihoc" className="active" >Bài học</a></li>
												<li><a href="#diali/lop8/baitap" >Bài tập nâng cao</a></li>
												<li><a href="#diali/lop8/thaoluan" >Thảo luận</a></li>
											</ul>
										</li>
										<li id="Diali_lop9">
											<a><span>Lớp 9</span></a>
											<ul>
												<li><a href="#diali/lop9/baihoc" className="active" >Bài học</a></li>
												<li><a href="#diali/lop9/baitap" >Bài tập nâng cao</a></li>
												<li><a href="#diali/lop9/thaoluan" >Thảo luận</a></li>
											</ul>
										</li>
									</ul>
								</li>
								<li>
									<a><i className="icon-droplet2"></i> <span>Hỏi & đáp</span></a>
									<ul>
										<li><a href="#hoidap/lichsu">Lịch Sử</a></li>
										<li><a href="#hoidap/diali" >Địa lí</a></li>
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