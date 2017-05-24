import React from 'react';

var data = document.querySelector('#maincontent');

export class Hoidap_lichsu_chitiet extends React.Component{
	constructor(props) {
	    super(props);
	  	this.state = {
	        listcauhoi: [],
	        listbinhluan: [],
	    	link_userImage: '"'+"assets/images/user_"+data.dataset.id+".jpg"+'"'
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
							<li><a href="#Lichsu_thaoluan/lop6">Thảo luận Lịch sử lớp 6</a></li>
							<li className="active">Hỏi & Đáp Lịch sử chi tiết</li>
						</ul>
					</div>
				</div>
				{/* /page header */}


				{/* Content area */}
				<div className="content">

					{/* Task overview */}
					<div className="panel panel-flat">
						<div className="panel-heading mt-5">
							<h5 className="panel-title">{this.state.listcauhoi.TIEUDE}</h5>
						</div>

						<div className="panel-body">
							<p className="content-group">{this.state.listcauhoi.NOIDUNG}</p>

						</div>

				    	<div className="panel-footer">
							<div className="heading-elements">
								<ul className="list-inline list-inline-condensed heading-text">
									<li><span className="status-mark border-blue position-left"></span> Status:</li>
									<li className="dropdown">
										<a href="#" className="text-default text-semibold dropdown-toggle" data-toggle="dropdown">Open <span className="caret"></span></a>
										<ul className="dropdown-menu">
											<li className="active"><a href="#">Open</a></li>
											<li><a href="#">On hold</a></li>
											<li><a href="#">Resolved</a></li>
											<li><a href="#">Closed</a></li>
											<li className="divider"></li>
											<li><a href="#">Dublicate</a></li>
											<li><a href="#">Invalid</a></li>
											<li><a href="#">Wontfix</a></li>
										</ul>
									</li>
								</ul>

								<ul className="list-inline list-inline-condensed heading-text pull-right">
									<li><a href="#" className="text-default"><i className="icon-compose"></i></a></li>
									<li><a href="#" className="text-default"><i className="icon-trash"></i></a></li>
									<li className="dropdown">
										<a href="#" className="text-default dropdown-toggle" data-toggle="dropdown"><i className="icon-grid-alt"></i> <span className="caret"></span></a>
										<ul className="dropdown-menu dropdown-menu-right">
											<li><a href="#"><i className="icon-alarm-add"></i> Check in</a></li>
											<li><a href="#"><i className="icon-attachment"></i> Attach screenshot</a></li>
											<li><a href="#"><i className="icon-user-plus"></i> Assign users</a></li>
											<li><a href="#"><i className="icon-warning2"></i> Report</a></li>
										</ul>
									</li>
								</ul>
							</div>
						</div>
					</div>
					{/* /task overview */}

					{/* Comments */}
					<div className="panel panel-flat">
						<div className="panel-heading">
							<h5 className="panel-title text-semiold"><i className="icon-bubbles4 position-left"></i> Trả lời</h5>
							<div className="heading-elements">
								<a href="#" className="btn bg-blue btn-xs btn-icon"><i className="icon-plus2"></i></a>
		                	</div>
						</div>

						<div className="panel-body">
							<ul className="media-list content-group-lg stack-media-on-mobile">
								{this.state.listbinhluan.map(function(data1,index1){
									return (
										<li key={index1} className="media">
											<div className="media-left">
												<a><img src={"assets/images/user_"+data1.ID_NGUOITRALOI+".jpg"} className="img-circle img-sm" alt=""/></a>
											</div>

											<div className="media-body">
												<div className="media-heading">
													<a className="text-semibold">{data1.USERNAME}</a>
													<span className="media-annotation dotted">{data1.THOIGIAN}</span>
												</div>

												<p>{data1.NOIDUNG}</p>

												<ul className="list-inline list-inline-separate text-size-small">
													<li>{data1.MUCDANHGIA} <a href="#"><i className="icon-arrow-up22 text-success"></i></a><a href="#"><i className="icon-arrow-down22 text-danger"></i></a></li>
													<li><a href="#">Reply</a></li>
													<li><a href="#">Edit</a></li>
												</ul>
											</div>
										</li>
									)
								})}
							</ul>

							<h6 className="text-semibold"><i className="icon-pencil7 position-left"></i> Your comment</h6>
							<div className="content-group">
								<div id="add-comment">Get his declared appetite distance his together now families. Friends am himself at on norland it viewing. Suspected elsewhere you belonging continued commanded she...</div>
							</div>
							
							<div className="text-right">
								<button type="button" className="btn bg-blue"><i className="icon-plus22"></i> Add comment</button>
							</div>
						</div>
					</div>
					{/* /comments */}
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
		console.log(this.props.params.lop);

		$.post("/Hoidap_lichsu/lop"+this.props.params.lop+"/id"+this.props.params.id, function(data){
			//that.setState({noidung: data})
			that.setState({listcauhoi: data});
			// console.log(that.state.listcauhoi[0]);
		});

		$.post("/Binhluan/id"+this.props.params.id, function(data1){
			//that.setState({noidung: data})
			that.setState({listbinhluan: data1});
			console.log(data1);
		});
	}
	componentWillReceiveProps(newProps)
	{
		var that=this;

		$.post("/Binhluan/id"+newProps.params.lop, function(data){
			//that.setState({noidung: data})
			that.setState({listbinhluan: data});
		});
	}
}
