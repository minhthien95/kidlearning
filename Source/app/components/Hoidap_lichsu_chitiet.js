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
							<li><a id="link_pre" ></a></li>
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
							<h5 id="tieude" className="panel-title"></h5>							
						</div>

						<div className="panel-body">
							<p id="noidung" className="content-group"></p>

						</div>

				    	<div className="panel-footer">
							<div className="heading-elements">
								<ul className="list-inline list-inline-condensed heading-text">
									<li>Đánh giá:&nbsp; 
										<a  id="danhgia"></a>
										&nbsp;
										<i className="icon-star-full2 text-size-base text-warning-300"></i>
										<a id="up_cauhoi"><i className="icon-arrow-up22 text-success"></i></a>
										<a id="down_cauhoi"><i className="icon-arrow-down22 text-danger"></i></a>
									</li>
								</ul>
								<ul className="list-inline list-inline-separate heading-text pull-right">
									<li>Đăng bởi: <a id="nguoidang"></a></li>
									<li id="thoigian"></li>
								</ul>
						
							</div>
						</div>
					</div>
					{/* /task overview */}

					{/* Comments */}
					<div className="panel panel-flat">
						<div className="panel-heading">
							<h5 className="panel-title text-semiold"><i className="icon-bubbles4 position-left"></i> Trả lời</h5>
						</div>

						<div id="formBinhluan" className="panel-body">
							<ul className="media-list content-group-lg stack-media-on-mobile">
								{this.state.listbinhluan.map(function(data1,index1){
									return (
										<li key={index1} className="media">
											<div className="media-left">
												<a><img src={"assets/images/user_"+data1.ID_NGUOITRALOI+".jpg"}  onError={() => {src="assets/images/placeholder.jpg"}} className="img-circle img-sm" alt=""/></a>
											</div>

											<div className="media-body">
												<div className="media-heading">
													<a id="username" className="text-semibold">{data1.USERNAME}</a>
													<span className="media-annotation dotted">{data1.to_char}</span>
												</div>

												<p>{data1.NOIDUNG}</p>

												<ul className="list-inline list-inline-separate text-size-small">
													<li>Đánh giá:&nbsp; {data1.MUCDANHGIA} 
													<a id={data1.USERNAME} name={data1.ID_BINHLUAN}><i className="icon-arrow-up22 text-success"></i></a>
													<a id={data1.USERNAME} name={data1.ID_BINHLUAN}><i className="icon-arrow-down22 text-danger"></i></a></li>

												</ul>
											</div>
										</li>
									)
								})}
							</ul>

							<h6 className="text-semibold"><i className="icon-pencil7 position-left"></i> Câu trả lời của bạn</h6>
							<div className="input-group content-group">
								<div className="has-feedback has-feedback-left">
									<input id="binhluan_cauhoi" type="text" className="form-control input-xlg" placeholder="Nhập câu trả lời của bạn"/>
									<div className="form-control-feedback"><i className="icon-plus22 text-muted text-size-base"></i></div>
								</div>

								<div className="input-group-btn">
									<button id="gui_binhluan" type="submit" className="btn btn-primary btn-xlg"><i className="icon-plus22"></i>Trả lời</button>
								</div>
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
	componentDidMount()
	{
		var url1,url2;
		var id_cauhoi;
		var phanlop;
		var id_user=data.dataset.id;
		var temp_username=data.dataset.username;

		var currentdate = new Date(); 
	    var datetime =currentdate.getFullYear() + "-"
	                + (currentdate.getMonth()+1)  + "-" 
	                + currentdate.getDate() +" "
	                + currentdate.getHours() + ":"  
	                + currentdate.getMinutes() + ":" 
	                + currentdate.getSeconds();

		url1=window.location.href;
		url1=url1.split('id');
		id_cauhoi=url1[2].split('?');

		url2=window.location.href;
		url2=url2.split('lop');
		phanlop=url2[1].split('/');

		$('#gui_binhluan').click(function (event){
			if($("#binhluan_cauhoi").val()=="")
				return;
			var data={
		        id:       id_user,
		        id_cauhoi: id_cauhoi[0],
				noidung: $("#binhluan_cauhoi").val(),
				thoigian: datetime
			};
			console.log(data);
	        $.post("themBinhluan", data, function(){
	        	alert("Đã thêm bình luận thành công!");
	        	$("#binhluan_cauhoi").val("");
	        	//window.location = "#/trangcanhan";
            	//Trangcanhan.dispatch(location.getCurrentPath(), null);
    		});
		});

		// $('#like').on('click', function (e) {
		// 	console.log("like");
		// });
		$('#up_cauhoi,#down_cauhoi').click(function(){
		    // var temp_username=data.dataset.username;
		   	if(temp_username==$("#nguoidang").text())
		   		return;
		    var data={
		        id_cauhoi: id_cauhoi[0],
				type: $(this).attr('id')
			};
			console.log(data);
	        $.post("rate_cauhoi", data, function(){
	        	alert("Đã rate cau hoi thành công!");
	        	//window.location = "#/trangcanhan";
            	//Trangcanhan.dispatch(location.getCurrentPath(), null);
    		});
		});

	    $('#formBinhluan').on('click', '.text-success,.text-danger', function (e) {
	        var usernameClick = $(this).parent().attr('id');
	        var idBinhluanClick = $(this).parent().attr('name');
	        var type = $(this).attr('class');

	        if(usernameClick==temp_username)
	  			return;
	        console.log("click binh luan 2");
	        var data={
		        id_binhluan: idBinhluanClick,
		        type: type
			};
			console.log(data);
	        $.post("rate_binhluan", data, function(){
	        	alert("Đã rate bình luận thành công!");
    		});
	    });
	}
	componentWillMount(){
		var that=this;
		console.log(this.props.params.lop);

		$.post("/Hoidap_lichsu/lop"+this.props.params.lop+"/id"+this.props.params.id, function(data){
			//that.setState({noidung: data})
			that.setState({listcauhoi: data});

			var tieude=data[0].TIEUDE;
			var noidung=data[0].NOIDUNG;
			var nguoidang=data[0].USERNAME;
			var thoigian=data[0].to_char;
			var danhgia=data[0].DANHGIA;

			var name_link="Thảo luận Lịch sử lớp "+data[0].PHANLOP; 
			var link_pre="#Lichsu_thaoluan/lop"+data[0].PHANLOP; 

			$("#tieude").text(tieude);
			$("#noidung").text(noidung);
			$("#nguoidang").text(nguoidang);
			$("#thoigian").text(thoigian);
			$("#danhgia").text(danhgia);

			$('#link_pre').attr('href', link_pre);
			$("#link_pre").text(name_link); 
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
