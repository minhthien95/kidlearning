import React from 'react';
import io from 'socket.io-client';
let socket = io('https://'+window.location.hostname+':3000');
//let socket = io('http://'+window.location.hostname);
var data = document.querySelector('#maincontent');

var id_user=data.dataset.id;
var check=true;
var mon,phanlop,baihoc;
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
							<li className="active" >Bài tập trắc nghiệm</li>
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
										<label className="text-semibold">Câu hỏi:</label>
										<div style={{paddingRight: '0px'}}>
											<input id="noidung" type="text" placeholder="Nhập câu hỏi..." className="form-control"/>
											<span className="help-block"></span>
										</div>
										<div id="formanh" style={{paddingRight: '0px'}}>

										</div>
									</div>
									<div id="list_dapan"className="form-group">
										<label className="text-semibold">Câu trả lời:</label>
										<div className="input-group">
											<span className="input-group-addon">
												<input id="rd_cau1" name="addon-radio"  type="radio" className="styled"/>
											</span>
											<input id="te_cau1" type="text" className="form-control" placeholder="Câu trả lời 1"/>
										</div>
										<div className="input-group">
											<span className="input-group-addon">
												<input id="rd_cau2" name="addon-radio"  type="radio" className="styled" />
											</span>
											<input id="te_cau2" type="text" className="form-control" placeholder="Câu trả lời 2"/>
										</div>
										<div className="input-group">
											<span className="input-group-addon">
												<input id="rd_cau3" name="addon-radio"  type="radio" className="styled"/>
											</span>
											<input id="te_cau3" type="text" className="form-control" placeholder="Câu trả lời 3"/>
										</div>
										<div className="input-group">
											<span className="input-group-addon">
												<input id="rd_cau4" name="addon-radio"  type="radio" className="styled"/>
											</span>
											<input id="te_cau4" type="text" className="form-control" placeholder="Câu trả lời 4"/>
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
		var id_cauhoi=this.props.params.mon+this.props.params.lop+this.props.params.id;
		var mon1;
		if(this.props.params.mon=="lichsu")
			mon1="Lịch sử";
		if(this.props.params.mon=="diali")
			mon1="Địa lí";
		var name_link="Bài học "+mon1+" lớp "+this.props.params.lop+" bài "+this.props.params.bai; 
		var link_pre="#"+this.props.params.mon+"/lop"+this.props.params.lop+"/baihoc_chitiet/"+this.props.params.id;

		mon=this.props.params.mon;
		phanlop=this.props.params.lop;
		baihoc=this.props.params.id;
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

	    //them bai tap
	    $('#add_baitap').click(function () {
			var checkChecked = $("input").parent("span").attr("class");
			var check_temp;
	    	if($("#noidung").val()==""){
	    		alert("Bạn chưa nhập câu hỏi!");
				return;
	    	}
			if($("#te_cau1").val()==""){
				alert("Bạn chưa nhập đáp án!");
				return;
			}
			if($("#te_cau2").val()==""){
				alert("Bạn chưa nhập đáp án!");
				return;
			}
			if($("#te_cau3").val()==""){
				alert("Bạn chưa nhập đáp án!");
				return;
			}
			if($("#te_cau4").val()==""){
				alert("Bạn chưa nhập đáp án!");
				return;
			}
			
			if($("#rd_cau1").parent().attr("class")!="checked" && $("#rd_cau2").parent().attr("class")!="checked" && $("#rd_cau3").parent().attr("class")!="checked" && $("#rd_cau4").parent().attr("class")!="checked"){
				alert("Bạn chưa chọn đáp án đúng!");
				return;
			}else{
				if($("#rd_cau1").parent().attr("class")=="checked")
					check_temp=1;
				if($("#rd_cau2").parent().attr("class")=="checked")
					check_temp=2;
				if($("#rd_cau3").parent().attr("class")=="checked")
					check_temp=3;
				if($("#rd_cau4").parent().attr("class")=="checked")
					check_temp=4;
				//console.log(check_temp);
			}
			var da1=0,da2=0,da3=0,da4=0;
			if(check_temp==1)
				da1=1;
			if(check_temp==2)
				da2=1;
			if(check_temp==3)
				da3=1;
			if(check_temp==4)
				da4=1;

			var currentdate = new Date(); 
			var datetime =currentdate.getFullYear() + "_" 
		            + (currentdate.getMonth()+1)  + "_" 
		            + currentdate.getDate() +"_" 
		            + currentdate.getHours() + "_"   
		            + currentdate.getMinutes() + "_"  
		            + currentdate.getSeconds();

		    $(".fileupload").append('<input hidden name="file_name" value="'+datetime+'"/>');
		    $("#themAnh").click();
			var data={
		        id:  id_user,
		        loai: 'baitap',
				lop: phanlop,
				mon: mon,
		        bai: baihoc,
				noidung: $("#noidung").val(),
				cau1: $("#te_cau1").val(),
				cau2: $("#te_cau2").val(),
				cau3: $("#te_cau3").val(),
				cau4: $("#te_cau4").val(),
				da1: da1,
				da2: da2,
				da3: da3,
				da4: da4,
				link_anh: datetime
			};

	        $.post("themTracnghiem", data, function(data){
				$("#noidung").val("");
				$("#te_cau1").val("");
				$("#te_cau2").val("");
				$("#te_cau3").val("");
				$("#te_cau4").val("");
				$("#rd_cau"+check_temp).parent().removeClass();
				$("#formadd").hide();
				//alert("Thêm bài tập hoàn tất!\nLàm mới trang để xem kết quả");
				window.location.reload(true);
	        	//window.location = window.location.href;
            	//Trangcanhan.dispatch(location.getCurrentPath(), null);
    		});
	    });
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
			//console.log(data);
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
			//console.log(data);
	        $.post("rate_binhluan", data, function(){
	        	
    		});
	    });
	    $("#formanh").append('<form class="fileupload" action="uploadCauhoi" method="post" enctype="multipart/form-data">'+
	    									'<label for="imgInp" class="btn btn-primary btn-block btn-outlined">Thêm ảnh</label>'+
					                    	'<input style="display:none" type="file" id="imgInp" name="upfile" class="file-styled"/>'+
					                    	'<button id="themAnh" hidden type="submit">Đăng ảnh</button>'+
				                    	'</form>'+
				                    	'<p style="text-align:center"><img id="blah" src="#" style="display:none"/></p>');

	    function readURL(input) {
	        if (input.files && input.files[0]) {
	            var reader = new FileReader();
	            
	            reader.onload = function (e) {
	                $('#blah').attr('src', e.target.result);
	               // $('#blah').attr('style', "height:150px");
	                $('#blah').attr('style', "display:0;height:150px");
	            }
	            
	            reader.readAsDataURL(input.files[0]);
	        }
	    }
	    
	    $("#imgInp").change(function(){
	        readURL(this);
	    });
	}
	componentWillMount(){
		var that=this;
		var ht_lop;
		var ht_bai;

		var id_cauhoi=this.props.params.mon+this.props.params.lop+this.props.params.id;

		var count1=1;
		$.post("/"+this.props.params.mon+"/lop"+this.props.params.lop+"/baitap_tracnghiem_chitiet_cauhoi/"+this.props.params.id,{loai: "baitap"}, function(data){
			console.log("lay trac nghiem");
			console.log(data);

			if(data.length==0)
			{
				console.log("chua co bai tap");
				$("#xxx").append('<center class="text-bold">Chưa có bài tập nào!.</center>'
								);
				// Default initialization Radió
				$(".styled, .multiselect-container input").uniform({
				    radioClass: 'choice'
				});
				return;
			}
			$.get("getUserInfo/"+id_user,function( data1 ){
				console.log("lay data");
			
				ht_lop=data1.LOP;
				if(that.props.params.mon=="lichsu")
					ht_bai=data1.BAI_LICHSU;
				else
					ht_bai=data1.BAI_DIALI;
				
				//hoc qua bai hoc roi
				if(that.props.params.lop<ht_lop || (that.props.params.lop==ht_lop && data[0].BAI<ht_bai)){
					$("#baitap_binhluan").show();
					for(var i=0;i<data.length;i++){
						var count=i+1;

						if(data[i].LINK_ANH!=null)
							$("#xxx").append('<h6>Câu '+count+'</h6>'+
												'<fieldset>'+
													'<p class="content-group text-semibold">'+data[i].NOIDUNG+'</p>'+
													'<p style="text-align:center"><img src="/assets/images/cauhoi/'+data[i].LINK_ANH+'.jpg" alt="Hình ảnh câu hỏi" style="width:autopx;height:300px;"/></p>'+
													'<div id="cau'+count+'"class="form-group pt-5">'+
														'<label class="text-semibold">Chọn câu trả lời:</label>'+
													'</div>'+
												'</fieldset>'
												);
						else
							$("#xxx").append('<h6>Câu '+count+'</h6>'+
												'<fieldset>'+
													'<p class="content-group text-semibold">'+data[i].NOIDUNG+'</p>'+
													'<div id="cau'+count+'"class="form-group pt-5">'+
														'<label class="text-semibold">Chọn câu trả lời:</label>'+
													'</div>'+
												'</fieldset>'
												);
						var idCauhoi=data[i].ID_BAIHOC;																
						$.post("/getDapan",{id: data[i].ID_TRACNGHIEM},function(data1){
							//console.log(data1);
							for(var j=0;j<data1.length;j++)
							{
								if(data1[j].CHECK==0){
									$("#cau"+count1).append('<div class="radio">'+
																'<label>'+
																	'<input type="radio" id="'+ data1[j].CHECK+'" alt="'+j+'" name="'+count1+'" class="styled" />'+
																	data1[j].DAPAN+
																'</label>'+
															'</div>'
															);
								}else{
									$("#cau"+count1).append('<div class="radio">'+
																'<label>'+
																		'<input type="radio" id="'+ data1[j].CHECK+'" alt="'+j+'" name="'+count1+'" class="styled" checked="checked"/>'+
																		data1[j].DAPAN+
																'</label>'+
															'</div>'
															);
								}
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
				        startIndex: data.length-1,
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

				        	var iddapan=$(temtem3).closest('.checked').children().attr("id");
				        	if(iddapan=="1"){
				        		return true;
				        	}
				        },
				        onFinishing: function (event, currentIndex) {
				            var test=currentIndex+1;
				        	var temtem3='input[name='+test+']';
				        	var iddapan=$(temtem3).closest('.checked').children().attr("id");
				        	
				        	if(iddapan=="1"){
				        		return true;
				        	}
				        },
				        onFinished: function (event, currentIndex) {
				        	alert("Bạn đã hoàn thành bài tập");
			        		$("#baitap_binhluan").show();
				            
				        }
				    });
				}
				else{
					for(var i=0;i<data.length;i++){
						var count=i+1;

						if(data[i].LINK_ANH!=null)
							$("#xxx").append('<h6>Câu '+count+'</h6>'+
												'<fieldset>'+
													'<p class="content-group text-semibold">'+data[i].NOIDUNG+'</p>'+
													'<p style="text-align:center"><img src="/assets/images/cauhoi/'+data[i].LINK_ANH+'.jpg" alt="Hình ảnh câu hỏi" style="width:autopx;height:300px;"/></p>'+
													'<div id="cau'+count+'"class="form-group pt-5">'+
														'<label class="text-semibold">Chọn câu trả lời:</label>'+
													'</div>'+
												'</fieldset>'
												);
						else
							$("#xxx").append('<h6>Câu '+count+'</h6>'+
												'<fieldset>'+
													'<p class="content-group text-semibold">'+data[i].NOIDUNG+'</p>'+
													'<div id="cau'+count+'"class="form-group pt-5">'+
														'<label class="text-semibold">Chọn câu trả lời:</label>'+
													'</div>'+
												'</fieldset>'
												);
						var idCauhoi=data[i].ID_BAIHOC;																
						$.post("/getDapan",{id: data[i].ID_TRACNGHIEM},function(data1){

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

				        	var iddapan=$(temtem3).closest('.checked').children().attr("id");
				        	
				        	if(iddapan=="1"){
				        		return true;
				        	}
				        },
				        onFinishing: function (event, currentIndex) {
				            var test=currentIndex+1;
				        	var temtem3='input[name='+test+']';

				        	var iddapan=$(temtem3).closest('.checked').children().attr("id");
				        	
				        	if(iddapan=="1"){
				        		return true;
				        	}
				        },
				        onFinished: function (event, currentIndex) {
				        	$.post("/quaBai",{id_user: id_user,mon: that.props.params.mon});
				        	alert("Bạn đã hoà thành bài tập và qua bài học");

			        		$("#baitap_binhluan").show();
				            
				        }
				    });
				}
			});
		    //lay binh luan
    		socket.emit('c2s_Binhluan',{id: id_cauhoi });
			socket.on('s2c_Binhluan', function(data){
				that.setState({listbinhluan: data});
			});

		});
		///
		function loop(){
			setTimeout(function () {
	            socket.emit('c2s_Binhluan',{id: id_cauhoi });
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
	componentWillReceiveProps(newProps)
	{
		
	}
}
