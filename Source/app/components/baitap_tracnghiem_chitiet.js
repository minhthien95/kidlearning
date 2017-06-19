import React from 'react';
import io from 'socket.io-client';
let socket = io('http://localhost:3000');
var data = document.querySelector('#maincontent');

var id_user=data.dataset.id;
var check=true;
var mon,phanlop;
var url1,url2;
var temp_username=data.dataset.username;
var type_username=data.dataset.type;
export class baitap_tracnghiem_chitiet extends React.Component{
	constructor(props) {
    super(props);
      this.state = {
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
							<li className="active" >Bài {this.props.params.id}</li>
						</ul>
						<ul className="breadcrumb-elements">
							<li ><a id="thembaitap" ><i className="icon-plus-circle2 position-left"></i>Thêm bài tập</a></li>
						</ul>
					</div>
				</div>
				{/* /page header */}
				<div className="content" style={{paddingBottom: '0px'}}>
					<div id="formadd"  className="panel panel-flat blog-horizontal blog-horizontal-2">
						<div className="panel-body">

							<div className="blog-preview">
								<div className="panel-body">
									<div className="form-group">
										<label className="control-label col-lg-2">Câu hỏi</label>
										<div style={{paddingRight: '0px'}}>
											<input id="tieudebai" type="text" placeholder="Nhập câu hỏi..." className="form-control"/>
											<span className="help-block"></span>
										</div>
									</div>
									<div id="list_dapan"className="form-group">
										<label class="text-semibold">Câu trả lời:</label>
										<div className="radio">
											<div className="col-lg-1 radio-inline control-label" >
												<input type="radio" name="stacked-radio-left" className="styled"/>
											</div>
											<div className="col-lg-11">
												<input type="text" className="form-control" placeholder="Enter your username..."/>
											</div>
										</div>
										<div className="radio">
											<label className="radio-inline control-label">
												<input type="radio" name="stacked-radio-left" className="styled"/>
												
											</label>
											<input type="text" className="form-control" placeholder="Enter your username..."/>
										</div>
										<div className="radio">
											<label>
												<input type="radio" name="stacked-radio-left" className="styled"/>
												Unselected styled
											</label>
										</div>
										<div className="radio">
											<label>
												<input type="radio" name="stacked-radio-left" className="styled"/>
												Unselected styled
											</label>
										</div>
									</div>
									<div className="text-right">
										<button id="add_baitap" type="submit" className="btn bg-teal-400">Đăng bài tập <i className="icon-arrow-right14 position-right"></i></button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>	
				{/* Content area */}
				<div className="content">

					{/*Basic setup */}
		            <div className="panel panel-white">
						<div className="panel-heading">
							<h6 className="panel-title">Bài tập </h6>
							<div className="heading-elements">
								<ul className="icons-list">
			                		<li><a data-action="collapse"></a></li>
			                	</ul>
		                	</div>
						</div>
	                	<form id="xxx" className="steps-basic" action="#">
							
						</form>
		            </div>
		            {/*/basic setup */}

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
												<a><img id="img_user" src={"assets/images/user_"+data1.ID_NGUOITRALOI+".jpg"} onError={() => { $("#img_user").attr('src',"assets/images/user.jpg") }} className="img-circle img-sm" alt=""/></a>
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
		var id_cauhoi=this.props.params.mon+this.props.params.lop+this.props.params.id;
		var mon1;
		if(this.props.params.mon=="lichsu")
			mon1="Lịch sử";
		if(this.props.params.mon=="diali")
			mon1="Địa lí";
		var name_link="Bài học "+mon1+" lớp "+this.props.params.lop; 
		var link_pre="#"+this.props.params.mon+"/lop"+this.props.params.lop+"/baihoc_chitiet/"+this.props.params.id;

		///them bai tap

		if (type_username!="trogiang") {
            $("#thembaitap").hide();
        }
        if (type_username=="admin") {
            $("#thembaitap").show();
        }
		$("#formadd").hide();
		$('#thembaitap').click(function (event) {
			console.log("click");
	        if (check) {
	            check=false;
	            $("#formadd").show();
	        } else {
	            check=true;
	            $("#formadd").hide();
	        }
	    });
	  //   $('#addcauhoi').click(function () {
	  //   	if($("#sobai").val()=="")
			// 	return;
			// if($("#tieudebai").val()=="")
			// 	return;
			// var currentdate = new Date();
			// var datetime =currentdate.getFullYear() + "-"
			//     + (currentdate.getMonth()+1)  + "-" 
			//     + currentdate.getDate() +" "
			//     + currentdate.getHours() + ":"  
			//     + currentdate.getMinutes() + ":" 
			//     + currentdate.getSeconds();

			// var data={
		 //        id:       id_user,
		 //        bai: $("#sobai").val(),
			// 	tieude: $("#tieudebai").val(),
			// 	lop: phanlop[0],
			// 	mon: mon[1],
			// 	thoigian: datetime

			// };
			// console.log(data);
	  //       $.post("themBaihoc", data, function(){
	  //       	$("#sobai").val("");
	  //       	$("#tieudebai").val("");
	  //       	$("#formadd").hide();
	  //       	//window.location = "#/trangcanhan";
   //          	//Trangcanhan.dispatch(location.getCurrentPath(), null);
   //  		});
	  //   });
	    //them bai tap


		$("#baitap_binhluan").hide();
		$("#link_pre").text(name_link);
		$('#link_pre').attr('href', link_pre);
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
			console.log(data);
	        $.post("themBinhluan", data, function(){
	        	$("#binhluan_cauhoi").val("");
	        	//window.location = "#/trangcanhan";
            	//Trangcanhan.dispatch(location.getCurrentPath(), null);
    		});
		});
	    $('#formBinhluan').on('click', '.text-success,.text-danger,.text-danger-400', function (e) {
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
			console.log(data);
	        $.post("rate_binhluan", data, function(){
	        	
    		});
	    });


	}
	componentWillMount(){
		var that= this;
		var id_cauhoi=this.props.params.mon+this.props.params.lop+this.props.params.id;

		var count1=1;
		$.post("/"+this.props.params.mon+"/lop"+this.props.params.lop+"/baitap_tracnghiem_chitiet_cauhoi/"+this.props.params.id, function(data){
			console.log("lay trac nghiem");
			console.log(data);
			for(var i=0;i<data.length;i++){
				var count=i+1;
				console.log("tren"+count);

				$("#xxx").append('<h6>Câu '+count+'</h6>'+
									'<fieldset>'+
										'<p class="content-group text-semibold">'+data[i].NOIDUNG+'</p>'+
										'<div id="cau'+count+'"class="form-group pt-5">'+
											'<label class="text-semibold">Chọn câu trả lời:</label>'+
										'</div>'+
									'</fieldset>'
									);
				var idCauhoi=data[i].ID_BAIHOC;																
				$.post("/getDapan",{id: data[i].ID},function(data1){
					console.log("duoi"+count);
					console.log(data1);
					for(var j=0;j<data1.length;j++)
					{
						$("#cau"+count1).append('<div class="radio">'+
													'<label>'+
														'<input type="radio" id="'+ data1[j].CHECK+'" alt="'+j+'" name="'+count1+'" class="styled" />'+
														data1[j].DAPAN+
													'</label>'+
												'</div>'
										);
					}
					count1++;
					// Default initialization Radió
					$(".styled, .multiselect-container input").uniform({
					    radioClass: 'choice'
					});
				});
			}

			// Basic wizard setup
		    $(".steps-basic").steps({
		        headerTag: "h6",
		        bodyTag: "fieldset",
		        transitionEffect: "fade",	
		        titleTemplate: '<span class="number">#index#</span> #title#',
		        labels: {
		            finish: 'Xong',
		            previous: 'Quay lại',
		            next: 'Tiếp theo'
		        },
		        onStepChanging: function (event, currentIndex, newIndex) {
		        	console.log("onStepChanging");
		        	var test=currentIndex+1;
		        	var temtem3='input[name='+test+']';
		        	console.log(test);

		        	var iddapan=$(temtem3).closest('.checked').children().attr("id");
		        	console.log(iddapan);
		        	
		        	if(iddapan=="1"){
		        		return true;
		        	}
		        },
		        onFinishing: function (event, currentIndex) {
		            var test=currentIndex+1;
		        	var temtem3='input[name='+test+']';
		        	console.log(test);

		        	var iddapan=$(temtem3).closest('.checked').children().attr("id");
		        	console.log(iddapan);
		        	
		        	if(iddapan=="1"){
		        		return true;
		        	}
		        },
		        onFinished: function (event, currentIndex) {
		        	alert("Bạn đã hoà thành bài tập");
	        		$("#baitap_binhluan").show();
		            
		        }
		    });

		    //lay binh luan
    		socket.emit('c2s_Binhluan',{id: id_cauhoi });
			socket.on('s2c_Binhluan', function(data){
				that.setState({listbinhluan: data});
			});

		});

	}
	componentWillReceiveProps(newProps)
	{
		
	}
}
