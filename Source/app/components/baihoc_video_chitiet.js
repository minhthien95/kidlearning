import React from 'react';

export class baihoc_video_chitiet extends React.Component{
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
							<li ><a id="link_pre" ></a></li>
							<li ><a id="link_pre1" ></a></li>
							<li className="active" >Video {this.props.params.video}</li>
						</ul>
					</div>
				</div>
				{/* /page header */}


				{/* Content area */}
				<div className="content">

					{/* Main charts */}
					{this.state.listvideo.map(function(data,index){
						return (
							<div className="panel panel-flat">
								<div className="panel-heading">
									<h5 className="panel-title text-semibold text-primary-800">{data.TIEUDE}</h5>
								</div>
								{/* SGK */}
								<div className="content" style={{paddingBottom: '0px'}}>
									<iframe width="100%" height="500"  frameBorder="0" allowFullScreen
										src={"https://www.youtube.com/embed/"+data.LINK_VIDEO}>
									</iframe>
								</div>
								{/* /SGK */}
								<div className="panel-body">
									<a className="text-semibold">Mô tả:</a> {data.NOIDUNG}
									<br/>
									<a className="text-semibold">Đăng bởi:</a> {data.USERNAME}
									<br/>
									<a className="text-semibold">Ngày đăng:</a> {data.to_char}
								</div>
							</div>
						)
					})}
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
		var name_link="Bài học "+mon1+" lớp "+phanlop[0]+" bài "+this.props.params.id; 
		var name_link1="Bài học video";

		var link_pre="#"+mon[1]+"/lop"+phanlop[0]+"/baihoc_chitiet/"+this.props.params.id;
		var link_pre1="#"+mon[1]+"/lop"+phanlop[0]+"/baihoc_video/"+this.props.params.id+"/"+this.props.params.video;

		$.post("/"+mon[1]+"/lop"+this.props.params.lop+"/baihoc_video_chitiet/"+this.props.params.id+"/"+this.props.params.video, function(data){
			console.log("lay video");
			console.log(data);
			$("#link_pre").text(name_link);
			$('#link_pre').attr('href', link_pre);
			$("#link_pre1").text(name_link1);
			$('#link_pre1').attr('href', link_pre1);
			that.setState({listvideo: data});
		});
	}
}
