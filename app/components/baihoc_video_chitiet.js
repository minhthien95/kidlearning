import React from 'react';
import io from 'socket.io-client';
var urlsocket;
if(window.location.hostname=="localhost")
	urlsocket='http://'+window.location.hostname+':3000';
else
	urlsocket='http://'+window.location.hostname;
let socket = io(urlsocket);

var data = document.querySelector('#maincontent');

var id_user=data.dataset.id;
var check=true;
var mon,phanlop,baihoc;
var temp_username=data.dataset.username;
var type_username=data.dataset.type;
export class baihoc_video_chitiet extends React.Component{
	constructor(props) {
    super(props);
      this.state = {
        listvideo: [],
        listbinhluan: []
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
							<div key={index} className="panel panel-flat">
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

					{/* Comments */}
					<div id="baitap_binhluan" className="panel panel-flat">
						<div className="panel-heading">
							<h5 className="panel-title text-semiold"><i className="icon-bubbles4 position-left"></i> Thảo luận</h5>
						</div>

						<div id="formBinhluan" className="panel-body">
							<ul className="media-list content-group-lg stack-media-on-mobile">
								{this.state.listbinhluan.map(function(data1,index1){
									return (
										<li key={index1} className="media">
											<div className="media-left">
												<a><img id="img_user" src={"assets/images/user/user_"+data1.ID_NGUOITRALOI+".jpg"} onError={(e)=>{e.target.src="assets/images/user/user.jpg"}} className="img-circle img-sm" alt=""/></a>
											</div>

											<div className="media-body">
												{data1.USERNAME==data.dataset.username ? (
											        <ul className="list-inline list-inline-separate heading-text pull-right">
													<li><a id={data1.USERNAME} name={data1.ID_BINHLUAN} className="text-danger-400">Xoá</a></li>
												</ul>) : (
											        <div/>
										      	)}
												
												<div className="media-heading">
													<a id="username" className="text-semibold">{data1.USERNAME}</a>
													<span className="media-annotation dotted">{data1.to_char}</span>
												</div>

												<p>{data1.NOIDUNG}</p>

												{data1.USERNAME==data.dataset.username ? (
											        <ul className="list-inline list-inline-separate text-size-small">
														<li>Đánh giá:&nbsp; {data1.MUCDANHGIA}
														</li>
													</ul>) : (
											        <ul className="list-inline list-inline-separate text-size-small">
														<li>Đánh giá:&nbsp; {data1.MUCDANHGIA} 
														<a id={data1.USERNAME} name={data1.ID_BINHLUAN}><i className="icon-arrow-up22 text-success"></i></a>
														<a id={data1.USERNAME} name={data1.ID_BINHLUAN}><i className="icon-arrow-down22 text-danger"></i></a>
														
														</li>
													</ul>
										      	)}
							
											</div>
											<hr/>
										</li>
									)
								})}
							</ul>

							<h6 className="text-semibold"><i className="icon-pencil7 position-left"></i> Bình luận của bạn</h6>
							<div className="input-group content-group">
								<div className="has-feedback has-feedback-left">
									<input id="binhluan_cauhoi" type="text" className="form-control input-xlg" placeholder="Nhập bình luận của bạn"/>
									<div className="form-control-feedback"><i className="icon-plus22 text-muted text-size-base"></i></div>
								</div>

								<div className="input-group-btn">
									<button id="gui_binhluan" type="submit" className="btn btn-primary btn-xlg"><i className="icon-plus22"></i>Bình luận</button>
								</div>
							</div>
						</div>
					</div>
					{/* /comments */}

				</div>
				{/* /content area */}
			</div>
		)
	}
	componentDidMount(){
		var that=this;
				var monkh;
		if(this.props.params.mon=="lichsu")
			monkh="ls";
		if(this.props.params.mon=="diali")
			monkh="dl";
		//id_cauhoi v+ls+idvideo
		var id_cauhoi="v"+monkh+this.props.params.video;

		mon=this.props.params.mon;
		phanlop=this.props.params.lop;
		baihoc=this.props.params.id;
				///binh luan
		$('#gui_binhluan').click(function (event){
			var currentdate = new Date(); 
			var datetime =currentdate.getFullYear() + "-"
		            + (currentdate.getMonth()+1)  + "-" 
		            + currentdate.getDate() +" "
		            + currentdate.getHours() + ":"  
		            + currentdate.getMinutes() + ":" 
		            + currentdate.getSeconds();

			if($("#binhluan_cauhoi").val()=="")
				return;
			var data={
		        id:       id_user,
		        id_cauhoi: id_cauhoi,
				noidung: $("#binhluan_cauhoi").val(),
				thoigian: datetime
			};
			//console.log(data);
	        $.post("themBinhluan", data, function(){
	        	$("#binhluan_cauhoi").val("");
	        	//window.location = "#/trangcanhan";
            	//Trangcanhan.dispatch(location.getCurrentPath(), null);
    		});
		});
	    $('#formBinhluan').on('click', '.text-success,.text-danger,.text-danger-400', function (e) {
	    	var thatt=this;
	        var usernameClick = $(this).parent().attr('id');
	        var idBinhluanClick = $(this).parent().attr('name');
	        var type = $(this).attr('class');

	        if(type=="text-danger-400"){
	        	console.log("click xoa");
				$.post("delete_binhluan",{id_binhluan: $(this).attr('name'),id_cauhoi: id_cauhoi});
				return;
	        }	
	        if(usernameClick==temp_username)
	  			return;
	        console.log("click binh luan 2");
	        var data={
		        id_binhluan: idBinhluanClick,
		        type: type
			};
			//console.log(data);
	        $.post("rate_binhluan", data, function(){
	        	var xyz=$(thatt).parent().parent();
	        	if(type=="icon-arrow-up22 text-success"){
	        		xyz.children().children(".text-grey-300").addClass("text-danger");
	        		xyz.children().children(".text-grey-300").removeClass("text-grey-300");
	        		xyz.children().children(".text-success").addClass("text-grey-300");
	        		xyz.children().children(".text-success").removeClass("text-success");
	        	}
	        	else{
	        		xyz.children().children(".text-grey-300").addClass("text-success");
	        		xyz.children().children(".text-grey-300").removeClass("text-grey-300");
	        		xyz.children().children(".text-danger").addClass("text-grey-300");
	        		xyz.children().children(".text-danger").removeClass("text-danger");
	        	}
    		});
	    });


	}
	componentWillMount(){
		var that=this;

		var monkh;
		if(this.props.params.mon=="lichsu")
			monkh="ls";
		if(this.props.params.mon=="diali")
			monkh="dl";
		//id_cauhoi v+ls+idvideo
		var id_cauhoi="v"+monkh+this.props.params.video;

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
			//console.log(data);
			$("#link_pre").text(name_link);
			$('#link_pre').attr('href', link_pre);
			$("#link_pre1").text(name_link1);
			$('#link_pre1').attr('href', link_pre1);
			that.setState({listvideo: data});
		});

			    //lay binh luan
		socket.emit('c2s_Binhluan',{id: id_cauhoi });
		socket.on('s2c_Binhluan', function(data){
			that.setState({listbinhluan: data});
		});
		///
		function loop(){
			setTimeout(function () {
	            socket.emit('c2s_Binhluan',{id: id_cauhoi});
	            loop();
	        }, 30000);
		}
		loop();
	}
	onChange(state) {
	   	if(this.refs.root) {
	     	this.setState(state);
	    }
	}
}
