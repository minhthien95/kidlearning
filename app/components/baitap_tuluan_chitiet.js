import React from 'react';

export class baitap_tuluan_chitiet extends React.Component{
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
							<li ><a id="link_pre1" ></a></li>
							<li className="active" >Bài {this.props.params.id}</li>
						</ul>
					</div>
				</div>
				{/* /page header */}


				{/* Content area */}
				<div className="content">

					{/* Main charts */}
					<div className="panel panel-flat">
						<div className="panel-heading">
							<h6 className="panel-title">Tự luận bài {this.props.params.id}</h6>
						</div>
						{/* bai tap */}
						<div className="content">
							<div className="panel panel-flat">
								<div className="panel-heading">
									<h6 className="panel-title">With placeholder</h6>
									<div className="heading-elements">
										<ul className="icons-list">
					                		<li><a data-action="collapse"></a></li>
					                		<li><a data-action="reload"></a></li>
					                		<li><a data-action="close"></a></li>
					                	</ul>
				                	</div>
								</div>
							
								<div className="panel-body">
									<p className="content-group">The following example uses the <code>placeholder</code> option to set up the placeholder text for a text area field. This basic option is available in all input types: text, number, search, url, email, textarea etc.</p>
									<div id="alpaca-textarea-placeholder"></div>
									<a href="#alpaca-textarea-placeholder-source" data-toggle="collapse"><i className="icon-embed2 position-left"></i> Show source code &rarr;</a>
									<div className="collapse mt-10" id="alpaca-textarea-placeholder-source">
									
									</div>
								</div>
							</div>
						</div>
						{/* /bai tap */}

					</div>
					{/* /main charts */}

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
		var name_link1="Bài tập tự luận "+mon1+" lớp "+phanlop[0];

		var link_pre="#"+mon[1]+"/lop"+phanlop[0]+"/baitap";
		var link_pre1="#"+mon[1]+"/lop"+phanlop[0]+"/baitap_tuluan";

		$.post("/"+mon[1]+"/lop"+this.props.params.lop+"/baihoc_tip", function(data){
			console.log("lay du lieu baihoc_tip 1");
			console.log(data);
			$("#link_pre").text(name_link);
			$('#link_pre').attr('href', link_pre);
			$("#link_pre1").text(name_link1);
			$('#link_pre1').attr('href', link_pre1);
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
		var name_link="Bài học "+mon1+" lớp "+phanlop[0]; 
		var name_link1="Tóm tắt nội dung "+mon1+" lớp "+phanlop[0];

		var link_pre="#"+mon[1]+"/lop"+phanlop[0]+"/baihoc";
		var link_pre1="#"+mon[1]+"/lop"+phanlop[0]+"/baihoc_tip";

		$.post("/"+mon[1]+"/lop"+this.props.params.lop+"/baihoc_tip", function(data){
			console.log("lay du lieu baihoc_tip 1");
			console.log(data);
			$("#link_pre").text(name_link);
			$('#link_pre').attr('href', link_pre);
			$("#link_pre1").text(name_link1);
			$('#link_pre1').attr('href', link_pre1);
			that.setState({listtip: data});
		});
	}
}
