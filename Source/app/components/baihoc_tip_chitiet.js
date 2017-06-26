import React from 'react';

export class baihoc_tip_chitiet extends React.Component{
	constructor(props) {
    super(props);
      this.state = {
        listtip: []
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
							<li className="active" id="link_pre1" ></li>
						</ul>
					</div>
				</div>
				{/* /page header */}


				{/* Content area */}
				<div className="content">

					{/* Main charts */}
					<div className="panel panel-flat">
						<div className="panel-heading">
							<h6 className="panel-title">Tóm tắt kiến thức bài {this.props.params.bai}</h6>
						</div>
						{/* tip */}
						<div className="content" style={{paddingBottom: '0px'}}>
		 					<iframe id="contentSGK"  width="100%" height="650" allowFullScreen/>
						</div>
						{/* /tip */}

					</div>
					{/* /main charts */}

				</div>
				{/* /content area */}
			</div>
		)
	}
	componentDidMount(){
		//
		$("#contentSGK").attr("src", "mindmap/"+this.props.params.mon+this.props.params.lop+"/bai"+this.props.params.bai+".html");

	}
	componentWillMount(){
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
		var name_link="Bài học "+mon1+" lớp "+this.props.params.lop+" bài "+this.props.params.bai; 
		var link_pre="#"+this.props.params.mon+"/lop"+this.props.params.lop+"/baihoc_chitiet/"+this.props.params.bai;
		var name_link1="Tóm tắc bài học";

		//
		$("#contentSGK").attr("src", "mindmap/"+this.props.params.mon+this.props.params.lop+"/bai"+this.props.params.bai);

		$.post("/"+mon[1]+"/lop"+this.props.params.lop+"/baihoc_tip", function(data){
			console.log("lay du lieu baihoc_tip 1");
			console.log(data);
			$("#link_pre").text(name_link);
			$('#link_pre').attr('href', link_pre);
			$("#link_pre1").text(name_link1);
			that.setState({listtip: data});
		});
	}
	componentWillReceiveProps(newProps)
	{
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
		var name_link="Bài học "+mon1+" lớp "+this.props.params.lop+" bài "+this.props.params.bai; 
		var link_pre="#"+this.props.params.mon+"/lop"+this.props.params.lop+"/baihoc_chitiet/"+this.props.params.bai;
		var name_link1="Tóm tắc bài học";

		$.post("/"+mon[1]+"/lop"+this.props.params.lop+"/baihoc_tip", function(data){
			console.log("lay du lieu baihoc_tip 1");
			console.log(data);
			$("#link_pre").text(name_link);
			$('#link_pre').attr('href', link_pre);
			$("#link_pre1").text(name_link1);
			that.setState({listtip: data});
		});
	}
}
