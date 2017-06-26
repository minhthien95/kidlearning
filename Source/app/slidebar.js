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


		$("#Trangchu").click(function(){
			$("li").removeClass("active");
			$("#Trangchu").addClass("active");
			$('#Lichsu').children('ul').get(0).style.display='none';
			$('#Diali').children('ul').get(0).style.display='none';
			$('#Hoidap').children('ul').get(0).style.display='none';
			$('#Tuongtac').children('ul').get(0).style.display='none';
		});
		$("#Gioithieu").click(function(){
			$("li").removeClass("active");
			$("#Gioithieu").addClass("active");
			$('#Lichsu').children('ul').get(0).style.display='none';
			$('#Diali').children('ul').get(0).style.display='none';
			$('#Hoidap').children('ul').get(0).style.display='none';
			$('#Tuongtac').children('ul').get(0).style.display='none';
		});
		$("#Lichsu").click(function(){
			$("#Trangchu").removeClass("active");
			$("#Gioithieu").removeClass("active");
		});
		$("#Diali").click(function(){
			$("#Trangchu").removeClass("active");
			$("#Gioithieu").removeClass("active");
		});
		$("#Hoidap").click(function(){
			$("#Trangchu").removeClass("active");
			$("#Gioithieu").removeClass("active");
		});
		$("#Tuongtac").click(function(){
			$("#Trangchu").removeClass("active");
			$("#Gioithieu").removeClass("active");
		});

		var url=window.location.href;
		url=url.split('#');
		var urla=url[1].split('/');
		console.log(urla[1]);
		var urlb=urla[1].split('?');
		if(urlb[0]=="gioithieu"){
			$("#Gioithieu").addClass("active");
		}
		else if(urla[1]=="lichsu"){
			console.log("Lich su");
			var url2=window.location.href;
			url2=url2.split('lop');
			var phanlop=url2[1].split('/');
			$("#Lichsu_lop"+phanlop[0]).addClass("active");
		}
		else if(urla[1]=="diali"){
			var url2=window.location.href;
			url2=url2.split('lop');
			var phanlop=url2[1].split('/');
			$("#Diali_lop"+phanlop[0]).addClass("active");
		}
		else if(urla[1]=="hoidap"){
			var url2=window.location.href;
			url2=url2.split('hoidap');
			var phanlop=url2[1].split('?');
			console.log(phanlop[0]);
			if(phanlop[0]=="/lichsu"){
				$("#Hoidap").addClass("active");
				//$("#Hoidap_lichsu").addClass("active");
			}
			if(phanlop[0]=="/diali"){
				$("#Hoidap").addClass("active");
				//$("#Hoidap_diali").addClass("active");
			}
		}else if(urla[1]=="tuongtac"){
			var url2=window.location.href;
			url2=url2.split('tuongtac');
			var phanlop=url2[1].split('?');
			console.log(phanlop[0]);
			if(phanlop[0]=="/lichsu"){
				$("#Tuongtac").addClass("active");
				//$("#Hoidap_lichsu").addClass("active");
			}
			if(phanlop[0]=="/diali"){
				$("#Tuongtac").addClass("active");
				//$("#Hoidap_diali").addClass("active");
			}
		}else {
			$("#Trangchu").addClass("active");
		}
	}
 	render() {
	    return (
	    	<div>
				<div className="sidebar-content">
					<div className="sidebar-user">
						<div className="category-content">
							<div className="media">
								<a href="#trangcanhan" className="media-left"><img src={this.state.id_user} onError={() => {this.setState({id_user : "assets/images/user.jpg"}) }} className="img-circle img-sm" alt=""/></a>
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
								<li className="navigation-header"><span></span> <i className="icon-menu" title="Main pages"></i></li>
								<li id="Trangchu"><a href="#"><i className="icon-home4"></i> <span>Trang chủ</span></a></li>
								<li id="Lichsu" >
									<a><i className="icon-library2"></i> <span>Lịch sử</span></a>
									<ul>
										<li id="Lichsu_lop6">
											<a><span>Lớp 6</span></a>
											<ul> 
												<li><a href="#lichsu/lop6/baihoc" className="active" ><i className="icon-books"></i> <span>Bài học</span></a></li>
												<li><a href="#lichsu/lop6/baitap" ><i className=" icon-file-text"></i> <span>Bài tập nâng cao</span></a></li>
												<li><a href="#lichsu/lop6/thaoluan" ><i className=" icon-bubbles6"></i> <span>Thảo luận</span></a></li>
											</ul>
										</li>
										<li id="Lichsu_lop7">
											<a><span>Lớp 7</span></a>
											<ul>
												<li><a href="#lichsu/lop7/baihoc" className="active" ><i className="icon-books"></i> <span>Bài học</span></a></li>
												<li><a href="#lichsu/lop7/baitap" ><i className=" icon-file-text"></i> <span>Bài tập nâng cao</span></a></li>
												<li><a href="#lichsu/lop7/thaoluan" ><i className=" icon-bubbles6"></i> <span>Thảo luận</span></a></li>
											</ul>
										</li>
										<li id="Lichsu_lop8">
											<a><span>Lớp 8</span></a>
											<ul>
												<li><a href="#lichsu/lop8/baihoc" className="active" ><i className="icon-books"></i> <span>Bài học</span></a></li>
												<li><a href="#lichsu/lop8/baitap" ><i className=" icon-file-text"></i> <span>Bài tập nâng cao</span></a></li>
												<li><a href="#lichsu/lop8/thaoluan" ><i className=" icon-bubbles6"></i> <span>Thảo luận</span></a></li>
											</ul>
										</li>
										<li id="Lichsu_lop9">
											<a><span>Lớp 9</span></a>
											<ul>
												<li><a href="#lichsu/lop9/baihoc" className="active" ><i className="icon-books"></i> <span>Bài học</span></a></li>
												<li><a href="#lichsu/lop9/baitap" ><i className=" icon-file-text"></i> <span>Bài tập nâng cao</span></a></li>
												<li><a href="#lichsu/lop9/thaoluan" ><i className=" icon-bubbles6"></i> <span>Thảo luận</span></a></li>
											</ul>
										</li>
									</ul>
								</li>
								<li id="Diali" >
									<a><i className="icon-earth"></i> <span>Địa lí</span></a>
									<ul>
										<li id="Diali_lop6">
											<a><span>Lớp 6</span></a>
											<ul> 
												<li><a href="#diali/lop6/baihoc" className="active" ><i className="icon-books"></i> <span>Bài học</span></a></li>
												<li><a href="#diali/lop6/baitap" ><i className=" icon-file-text"></i> <span>Bài tập nâng cao</span></a></li>
												<li><a href="#diali/lop6/thaoluan" ><i className=" icon-bubbles6"></i> <span>Thảo luận</span></a></li>
											</ul>
										</li>
										<li id="Diali_lop7">
											<a><span>Lớp 7</span></a>
											<ul>
												<li><a href="#diali/lop7/baihoc" className="active" ><i className="icon-books"></i> <span>Bài học</span></a></li>
												<li><a href="#diali/lop7/baitap" ><i className=" icon-file-text"></i> <span>Bài tập nâng cao</span></a></li>
												<li><a href="#diali/lop7/thaoluan" ><i className=" icon-bubbles6"></i> <span>Thảo luận</span></a></li>
											</ul>
										</li>
										<li id="Diali_lop8">
											<a><span>Lớp 8</span></a>
											<ul>
												<li><a href="#diali/lop8/baihoc" className="active" ><i className="icon-books"></i> <span>Bài học</span></a></li>
												<li><a href="#diali/lop8/baitap" ><i className=" icon-file-text"></i> <span>Bài tập nâng cao</span></a></li>
												<li><a href="#diali/lop8/thaoluan" ><i className=" icon-bubbles6"></i> <span>Thảo luận</span></a></li>
											</ul>
										</li>
										<li id="Diali_lop9">
											<a><span>Lớp 9</span></a>
											<ul>
												<li><a href="#diali/lop9/baihoc" className="active" ><i className="icon-books"></i> <span>Bài học</span></a></li>
												<li><a href="#diali/lop9/baitap" ><i className=" icon-file-text"></i> <span>Bài tập nâng cao</span></a></li>
												<li><a href="#diali/lop9/thaoluan" ><i className=" icon-bubbles6"></i> <span>Thảo luận</span></a></li>
											</ul>
										</li>
									</ul>
								</li>
								<li id="Hoidap">
									<a><i  className="icon-question3"></i> <span>Hỏi & đáp</span></a>
									<ul>
										<li id="Hoidap_lichsu"><a  href="#hoidap/lichsu"><i className="icon-library2"></i> <span>Lịch Sử</span></a></li>
										<li id="Hoidap_diali"><a href="#hoidap/diali" ><i className="icon-earth"></i> <span>Địa Lí</span></a></li>
									</ul>
								</li>
								<li id="Tuongtac">
									<a><i  className="icon-hand"></i> <span>Tương tác</span></a>
									<ul>
										<li id="Tuongtac_lichsu"><a  href="#tuongtac/lichsu"><i className="icon-library2"></i> <span>Lịch Sử</span></a></li>
										<li id="Tuongtac_diali"><a href="#tuongtac/diali" ><i className="icon-earth"></i> <span>Địa Lí</span></a></li>
									</ul>
								</li>
								<li id="Gioithieu"><a href="#gioithieu"><i className="icon-list-unordered"></i> <span>Giới thiệu</span></a></li>
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