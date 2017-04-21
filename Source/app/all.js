import React from "react";
import {render} from "react-dom";
import {BrowserRouter as Router, Route, Link } from 'react-router-dom'

import {Trangchu} from "./components/Trangchu";
import {Lichsu_lop6_baihoc} from "./components/Lichsu_lop6_baihoc";
import {Lichsu_lop6_baitapnangcao} from './components/Lichsu_lop6_baitapnangcao';
import {Lichsu_lop6_thaoluan} from './components/Lichsu_lop6_thaoluan';

class All extends React.Component {
  render(){
    return (
    	<div>
    		<Router>
	    		<div>
	    			<div className="sidebar sidebar-main">
						<div className="sidebar-content">
							{/* User menu */}
							<div className="sidebar-user">
								<div className="category-content">
									<div className="media">
										<a className="media-left"><img src="assets/images/placeholder.jpg" className="img-circle img-sm" alt=""/></a>
										<div className="media-body">
											<span className="media-heading text-semibold">Lê Minh Thiện</span>
											<div className="text-size-mini text-muted">
												<i className="icon-pin text-size-small"></i> &nbsp;Lớp 7
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
										<li className="active"><a ><i className="icon-home4"></i> <span>Trang chủ</span></a></li>
										<li>
											<a><i className="icon-stack2"></i> <span>Lịch sử</span></a>
											<ul>
												<li>
													<a><span>Lớp 6</span></a>
													<ul> 
														<li><Link to="/Lichsu_lop6_baihoc"  >Bài học</Link></li>
														<li><Link to="/Lichsu_lop6_baitapnangcao" >Bài tập nâng cao</Link></li>
														<li><Link to="/Lichsu_lop6_thaoluan" >Thảo luận</Link></li>
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
											<a><i className="icon-stack2"></i> <span>Địa lý</span></a>
											<ul>
												<li>
													<a><span>Lớp 6</span></a>
													<ul>
														<li><a href="../../../layout_1/LTR/index.html" id="layout1">Bài học</a></li>
														<li><a href="../../../layout_2/LTR/index.html" id="layout3">Bài tập nâng cao</a></li>
														<li><a href="../../../layout_1/LTR/index.html" id="layout1">Thảo luận</a></li>
													</ul>
												</li>
												<li>
													<a><span>Lớp 7</span></a>
													<ul>
														<li><a href="../../../layout_1/LTR/index.html" id="layout1">Bài học</a></li>
														<li><a href="../../../layout_2/LTR/index.html" id="layout3">Bài tập nâng cao</a></li>
														<li><a href="../../../layout_1/LTR/index.html" id="layout1">Thảo luận</a></li>
													</ul>
												</li>
												<li>
													<a><span>Lớp 8</span></a>
													<ul>
														<li><a href="../../../layout_1/LTR/index.html" id="layout1">Bài học</a></li>
														<li><a href="../../../layout_2/LTR/index.html" id="layout3">Bài tập nâng cao</a></li>
														<li><a href="../../../layout_1/LTR/index.html" id="layout1">Thảo luận</a></li>
													</ul>
												</li>
												<li>
													<a><span>Lớp 9</span></a>
													<ul>
														<li><a href="../../../layout_1/LTR/index.html" id="layout1">Bài học</a></li>
														<li><a href="../../../layout_2/LTR/index.html" id="layout3">Bài tập nâng cao</a></li>
														<li><a href="../../../layout_1/LTR/index.html" id="layout1">Thảo luận</a></li>
													</ul>
												</li>
											</ul>
										</li>
										<li>
											<a><i className="icon-droplet2"></i> <span>Hỏi & đáp</span></a>
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
				    <div>
				    	<Link to="/">Home</Link>
				    	<Link to="/Lichsu_lop6_baihoc">Lichsu_lop6_baihoc</Link>
				    	
					  	<Route exact path="/" component={Trangchu}/>
					  	<Route path="/Lichsu_lop6_baihoc" component={Lichsu_lop6_baihoc}/>
					 	<Route path="/Lichsu_lop6_baitapnangcao" component={Lichsu_lop6_baitapnangcao} />
					 	<Route path="/Lichsu_lop6_thaoluan" component={Lichsu_lop6_thaoluan} />
					 </div>
				</div>
			</Router>
		</div>
    );
  }
}

render(<All/>, window.document.getElementById("all"));