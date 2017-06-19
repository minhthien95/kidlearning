import React from 'react';
import io from 'socket.io-client';
let socket = io('http://localhost:3000');

var data = document.querySelector('#maincontent');

var id_user=data.dataset.id;
var check=true;
var temp_username=data.dataset.username;

export class baihoc_chitiet extends React.Component{
	constructor(props) {
    super(props);
      this.state = {
        listbaihoc: []
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
							<li ><a id="link_pre" ></a></li>
							<li className="active" >Bài {this.props.params.id}</li>
						</ul>
					</div>
				</div>	
				{/* /page header */}
				<div className="page-header">
					{/* Toolbar */}
					<div className="navbar navbar-default navbar-component navbar-xs">
						<ul className="nav navbar-nav visible-xs-block">
							<li className="full-width text-center"><a data-toggle="collapse" data-target="#navbar-filter"><i className="icon-menu7"></i></a></li>
						</ul>
						<div className="navbar-collapse collapse" id="navbar-filter">
							<ul className="nav navbar-nav">
								<li className="active"><h5 id="bai_tieude" className="text-primary-800"><i className="icon-menu7 position-left"></i> </h5></li>
							</ul>
						</div>
					</div>
					{/* /toolbar */}
				</div>

				{/* Content area */}
				<div className="content">

					<div id="formCauhoi" className="timeline timeline-left content-group">
						<div className="timeline-container">

							{/* List bai hoc */}
							{this.state.listbaihoc.map(function(data1,index){
								return (
									<div  key={index}>
									<div className="timeline-row">
										<div className="timeline-icon">
											<span className="form-wizard-count">1</span>
										</div>

										<div className="panel panel-flat timeline-content">
											<div className="panel-heading">
												<h6 className="panel-title text-semibold no-margin"> <a href={"/sachgiaokhoa/"+data1.MON+"/"+data1.PHANLOP} target="_blank" className="text-success">Sách giáo khoa</a></h6>
											</div>
										</div>
									</div>

									<div className="timeline-row">
										<div className="timeline-icon">
											<span className="form-wizard-count border-orange text-orange-800">2</span>
										</div>

										<div className="panel panel-flat timeline-content">
											<div className="panel-heading">
												<h6 className="panel-title text-semibold no-margin"><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_tip_chitiet/"+data1.ID_BAIHOC} className="text-orange-800">Tóm tắt kiến thức</a></h6>
											</div>
										</div>
									</div>

									<div className="timeline-row">
										<div className="timeline-icon">
											<span className="form-wizard-count border-violet text-violet-800">3</span>
										</div>

										<div className="panel panel-flat timeline-content">
											<div className="panel-heading">
												<h6 className="panel-title text-semibold no-margin"><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_video/"+data1.ID_BAIHOC} className="text-violet">Video</a></h6>
											</div>
										</div>
									</div>

									<div className="timeline-row">
										<div className="timeline-icon">
											<span className="form-wizard-count border-primary text-primary-800">4</span>
										</div>

										<div className="panel panel-flat timeline-content">
											<div className="panel-heading">
												<h6 className="panel-title text-semibold no-margin"><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baitap_tracnghiem_chitiet/"+data1.ID_BAIHOC} className="text-primary-800">Bài tập</a></h6>
											</div>
										</div>
									</div>
									</div>
								)
							})}
						</div>
				    </div>

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
		
		var mon1;
		if(this.props.params.mon=="lichsu")
			mon1="Lịch sử";
		if(this.props.params.mon=="diali")
			mon1="Địa lí";
		var name_link="Bài học "+mon1+" lớp "+this.props.params.lop; 
		var link_pre="#"+this.props.params.mon+"/lop"+this.props.params.lop+"/baihoc";

		var data1={
			mon: this.props.params.mon,
			lop: this.props.params.lop,
			id: this.props.params.id,
			id_user: "all"
		}
		console.log(data1);
		socket.emit('c2s_Baihoc',data1);
		socket.on('s2c_Baihoc', function(data){
			console.log(data);
			$("#link_pre").text(name_link);
			$('#link_pre').attr('href', link_pre);
			$("#bai_tieude").text("Bài "+data[0].BAI+": "+data[0].TIEUDE);
			that.setState({listbaihoc: data});
		});
	}
	// componentWillReceiveProps(newProps)
	// {
	// 	var that=this;

	// 	var url1=window.location.href;
	// 	url1=url1.split('#');
	// 	var mon=url1[1].split('/');
	// 	var url2=window.location.href;
	// 	url2=url2.split('lop');
	// 	var phanlop=url2[1].split('/');

	// 	var mon1;
	// 	if(mon[1]=="lichsu")
	// 			mon1="Lịch sử";
	// 		if(mon[1]=="diali")
	// 			mon1="Địa lí";
	// 	var name_link="Bài học "+mon1+" lớp "+phanlop[0]; 
	// 	var link_pre="#"+mon[1]+"/lop"+phanlop[0]+"/baihoc";

	// 	$.post("/"+mon[1]+"/lop"+this.props.params.lop+"/baihoc_tip", function(data){
	// 		console.log("lay du lieu baihoc");
	// 		console.log(data);
	// 		$("#link_pre").text(name_link);
	// 		$('#link_pre').attr('href', link_pre);
	// 		that.setState({listtip: data});
	// 	});
	// }
}
