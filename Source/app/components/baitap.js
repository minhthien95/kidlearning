import React from 'react';

export class baitap extends React.Component{
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
							<li className="active" id="link_pre" ></li>
						</ul>
					</div>
				</div>
				{/* /page header */}

				{/* Content area */}
				<div className="content">
					<div className="panel panel-flat">
						{/* Bai viet */}
						<div className=" alert text-info-600 alpha-info no-border">
							<h6 className="panel-title "><a>Bài tập</a><a className="heading-elements-toggle"><i className="icon-more"></i></a></h6>
							
							<div className="heading-elements">
								<ul className="icons-list">
			                		<li><a data-action="collapse"></a></li>
			                	</ul>
		                	</div>
		            	</div>
		            	<div className="row">
		            		<div className="col-md-3"></div>
			            	<div className="col-md-3">
								<div className="panel-body text-center">
									<div className="icon-object border-info-600 text-info-600"><i className=" icon-clipboard5"></i></div>
									<h5 className="text-semibold">Bài tập trắc nghiệm lớp {this.props.params.lop}</h5>
									<a href={"#"+this.props.params.mon+"/lop"+this.props.params.lop+"/baitap_tracnghiem"} className="btn bg-info-600">Xem ngay</a>
								</div>
							</div>
							<div className="col-md-3">
								<div className="panel-body text-center ">
									<div className="icon-object border-info-600 text-info-600"><i className=" icon-clipboard6"></i></div>
									<h5 className="text-semibold">Bài tập tự luận lớp {this.props.params.lop}</h5>
									<a href={"#"+this.props.params.mon+"/lop"+this.props.params.lop+"/baitap_tuluan"} className="btn bg-info-600">Xem ngay</a>
								</div>
							</div>
							<div className="col-md-3"></div>
						</div>
						{/* /Bai viet */}

					</div>

				</div>
				{/* /content area */}
			</div>
		)
	}
	componentWillMount(){
		console.log("componentWillMount");
		var that=this;

		var url1=window.location.href;
		url1=url1.split('#');
		var mon=url1[1].split('/');
		var url2=window.location.href;
		url2=url2.split('lop');
		var phanlop=url2[1].split('/');

		var mon1;
		if(mon[1]=="lichsu")
				mon1="Lịch sử";
			if(mon[1]=="diali")
				mon1="Địa lí";
		var name_link="Bài tập "+mon1+" lớp "+phanlop[0]; 
			
		$.post("/"+mon[1]+"/lop"+phanlop[0]+"/baihoc_video", function(data){
			//that.setState({noidung: data})
			$("#link_pre").text(name_link);
			that.setState({listvideo: data});
			console.log(data);
		});
	}
	componentWillReceiveProps(newProps)
	{
		console.log("componentWillReceiveProps");
		var that=this;

		var url1=window.location.href;
		url1=url1.split('#');
		var mon=url1[1].split('/');
		var url2=window.location.href;
		url2=url2.split('lop');
		var phanlop=url2[1].split('/');

		var mon1;
		if(mon[1]=="lichsu")
				mon1="Lịch sử";
		if(mon[1]=="diali")
				mon1="Địa lí";
		var name_link="Bài tập "+mon1+" lớp "+phanlop[0]; 

		$.post("/"+mon[1]+"/lop"+phanlop[0]+"/baihoc_video", function(data){
			//that.setState({noidung: data})
			$("#link_pre").text(name_link);
			that.setState({listvideo: data});
			console.log(data);
		});
	}
}
