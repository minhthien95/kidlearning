import React from 'react';

export class baihoc_tip extends React.Component{
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
							<h6 className="panel-title">Tóm tắt kiến thức từng bài</h6>
						</div>
						{/* SGK */}
						<div className="content">
						<table className="table text-nowrap">
								<thead>
								</thead>
								<tbody>
									{this.state.listtip.map(function(data1,index){
										return (
											<tr>
												<td>
													<div className="media-left media-middle">
														<a href="#" className="btn bg-teal-400 btn-rounded btn-icon btn-xs">
															<span className="letter-icon">{data1.BAI}</span>
														</a>
													</div>

													<div className="media-body">
														<a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_tip/bai"+data1.BAI} className="display-inline-block text-default text-semibold letter-icon-title">Bài {data1.BAI}: {data1.TIEUDE}</a>
														<div className="text-muted text-size-small"><span className="status-mark border-blue position-left"></span>Người đăng: <a>{data1.USERNAME}</a></div>
													</div>
												</td>
												<td>
													<a href="#" className="text-default display-inline-block">
														
														<span className="display-block text-muted">Ngày cập nhật: {data1.to_char}</span>
													</a>
												</td>
											</tr>
										)
									})}
								</tbody>
							</table>
						</div>
						{/* /SGK */}

					</div>
					{/* /main charts */}

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
		var name_link="Bài học "+mon1+" lớp "+phanlop[0]; 
		var name_link1="Tóm tắt nội dung "+mon1+" lớp "+phanlop[0];
		var link_pre="#"+mon[1]+"/lop"+phanlop[0]+"/baihoc";
		$.post("/"+mon[1]+"/lop"+phanlop[0]+"/baihoc_tip", function(data){
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
		var name_link="Thảo luận "+mon1+" lớp "+phanlop[0]; 
		var name_link1="Tóm tắt nội dung "+mon1+" lớp "+phanlop[0];
		var link_pre="#"+mon[1]+"/lop"+phanlop[0]+"/baihoc";

		$.post("/"+mon[1]+"/lop"+phanlop[0]+"/baihoc_tip", function(data){
			console.log("lay du lieu baihoc_tip 1");
			console.log(data);
			that.setState({listtip: data});
		});
	}
}
