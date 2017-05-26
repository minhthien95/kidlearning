import React from 'react';

var data = document.querySelector('#maincontent');

export class Lichsu_thaoluan extends React.Component{
	constructor(props) {
    	super(props);
  		this.state = {
        	listCauhoi: []
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
							<li className="active">Thảo luận lịch sử Lớp {this.props.params.lop}</li>
						</ul>

						<ul className="breadcrumb-elements">
							<li ><a id="themcauhoi" ><i className="icon-plus-circle2 position-left"></i>Thêm câu hỏi</a></li>
						</ul>
					</div>
				</div>
				{/* /page header */}


				{/* Content area */}
				<div className="content">
					<div id="formadd" className="col-lg-12">
						<div className="panel panel-flat blog-horizontal blog-horizontal-2">
							<div className="panel-body">

								<div className="blog-preview">
									<div className="panel-body">
										<div className="form-group">
											<label >Tiêu đề: </label>
											<input id="add_tieude" type="text" className="form-control" placeholder="Tiêu đề câu hỏi"/>
										</div>
										<div className="form-group">
											<label>Nội dung câu hỏi: </label>
											<textarea id="add_noidung" rows="3" cols="3" className="form-control" placeholder="Nội dung câu hỏi của bạn"></textarea>
										</div>

										<div className="text-right">
											<button id="addcauhoi" type="submit" className="btn bg-teal-400">Đăng câu hỏi <i className="icon-arrow-right14 position-right"></i></button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{this.state.listCauhoi.map(function(data,index){
						return (
							<div key={index} className="col-lg-12">
								<div className="panel panel-flat blog-horizontal blog-horizontal-2">
									<div className="panel-body">

										<div className="blog-preview">
											<div className="content-group-sm media blog-title stack-media-on-mobile text-left">
												<div className="media-body">
													<h5 className="text-semibold no-margin"><a href={"#Hoidap_lichsu_chitiet/lop"+data.PHANLOP+"/id"+data.ID_CAUHOI} className="text-default">{data.TIEUDE}</a></h5>

													<ul className="list-inline list-inline-separate no-margin text-muted">
														<li>Đăng bởi: <a >{data.USERNAME}</a></li>
														<li>{data.to_char}</li>
													</ul>
												</div>
											</div>

											<p>{data.NOIDUNG}</p>
											<a href={"#Hoidap_lichsu_chitiet/lop"+data.PHANLOP+"/id"+data.ID_CAUHOI} >[...]</a>
										</div>
									</div>

									<div className="panel-footer panel-footer-condensed"><a className="heading-elements-toggle"><i className="icon-more"></i></a>
										<div className="heading-elements">
											<ul className="list-inline list-inline-separate heading-text">
												<li><i className="icon-users position-left"></i> {data.SOTRALOI} trả lời</li>
												<li>
													Đánh giá:&nbsp;
													<span className="text-muted position-right">{data.DANHGIA}&nbsp;</span>
													<i className="icon-star-full2 text-size-base text-warning-300"></i>
													<a id="like"><i className="icon-arrow-up22 text-success"></i></a>
													<a id="dislike"><i className="icon-arrow-down22 text-danger"></i></a>
												</li>
											</ul>

											<a href={"#Hoidap_lichsu_chitiet/lop"+data.PHANLOP+"/id"+data.ID_CAUHOI} className="heading-text pull-right">Chi tiết <i className="icon-arrow-right14 position-right"></i></a>
										</div>
									</div>
								</div>
							</div>
						)
					})}
				</div>
				{/* /content area */}
			</div>
		)
	}
	componentDidMount()
	{

		var id_user=data.dataset.id;
		var check=true;
		var phanlop;
		var url2;
		var currentdate = new Date();
	    var datetime =currentdate.getFullYear() + "-"
            + (currentdate.getMonth()+1)  + "-" 
            + currentdate.getDate() +" "
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();

		url2=window.location.href;
		url2=url2.split('lop');
		phanlop=url2[1].split('?');

		$("#formadd").hide();
		$('#themcauhoi').click(function (event) {
	        if (check) {
	            check=false;
	            $("#formadd").show();
	        } else {
	            check=true;
	            $("#formadd").hide();
	        }
	    });

	    $('#addcauhoi').click(function () {
	    	if($("#add_tieude").val()=="")
				return;
			if($("#add_noidung").val()=="")
				return;
			var data={
		        id:       id_user,
		        tieude: $("#add_tieude").val(),
				noidung: $("#add_noidung").val(),
				lop: phanlop[0],
				thoigian: datetime

			};
			console.log(data);
	        $.post("themCauhoi", data, function(){
	        	alert("Đã thêm câu hỏi thành công!");
	        	$("#add_tieude").val("");
	        	$("#add_noidung").val("");

	        	//window.location = "#/trangcanhan";
            	//Trangcanhan.dispatch(location.getCurrentPath(), null);
    		});
	    });
	}
	componentWillMount()
	{
		var that=this;
		$.post("Hoidap_lichsu/lop"+this.props.params.lop+"/idall",function( data ){
			console.log("lay data");
			console.log(data);
			that.setState({listCauhoi: data});
		})
	}
	componentWillReceiveProps(newProps)
	{
		var that=this;

		$.post("Hoidap_lichsu/lop"+newProps.params.lop+"/idall", function(data){
			//that.setState({noidung: data})
			that.setState({listCauhoi: data});
		});
	}
}
