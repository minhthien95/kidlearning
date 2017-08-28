import React from 'react';
import io from 'socket.io-client';

var data = document.querySelector('#maincontent');

var id_user=data.dataset.id;
var check=true;
var mon,phanlop;
var url1,url2;
var temp_username=data.dataset.username;
var type_username=data.dataset.type;

var socaude;
var demnguoc;
var timeout;
export class baikiemtra extends React.Component{
	constructor(props) {
    super(props);
      this.state = {
      	phut: 0,
      	giay: 0,
        listdapan: []
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
				<div id="doixuly"/>
				<div id="contentBaitap" className="content">
					<ul className="fab-menu fab-menu-absolute fab-menu-top-right" data-fab-toggle="hover" id="fab-menu-affixed-demo-right">
						<h5 className="form-control bg-primary-800">
						&nbsp;Thời gian làm bài còn: {this.state.phut} phút {this.state.giay} giây&nbsp;
						</h5>
					</ul>
	            	<div className="panel panel-flat">
						<div className="panel-heading">
							<div className="text-center">
								<div className="panel-heading bg-orange-400">
									<h4 className="panel-title">Bài kiểm tra
									</h4>
									<small className="display-block">(Chọn phương án đúng nhất cho từng câu hỏi)</small>
								</div>
							</div>
							{type_username=="hocsinh" ? (
						        null) : (
						        <ul className="list-inline list-inline-separate heading-text pull-right">
									<li><a id="delete_kiemtra" className="text-danger-400" data-popup="tooltip" data-toggle="modal" data-target="#confirm2"><i className="icon-cross2 position-right"/>Xoá bài kiểm tra</a></li>
								</ul>
					      	)}
						</div>

	                	<div className="panel-body">
            				<div id="xxx" className="form-group pt-15">
										

							</div>
						</div>
						<div className="text-right">
							<button  id="nopbai" type="submit" className="btn bg-orange-800">Nộp bài <i className="icon-arrow-right14 position-right"></i></button>
						</div>
					</div>

				</div>
				{/* /content area */}
	            {/* confirm */}
				<div id="confirm" className="modal fade">
					<div className="modal-dialog modal-xs">
						<div className="modal-content">
							<div className="thumbnail no-border no-margin">								
						    	<div className="caption text-center">
						    		<h6 id="hienkq" className="text-semibold no-margin-top content-group"></h6>
						    		<ul className="list-inline list-inline-condensed no-margin">
				                    	<li><a className="btn btn-success btn-float" data-dismiss="modal">Xem đáp án</a></li>
			                    	</ul>
						    	</div>
					    	</div>
						</div>
					</div>
				</div>
				{/* /confirm */}
				{/* confirm */}
				<div id="confirm2" className="modal fade">
					<div className="modal-dialog modal-xs">
						<div className="modal-content">
							<div className="thumbnail no-border no-margin">								
						    	<div className="caption text-center">
						    		<h6 className="text-semibold no-margin-top content-group">Bạn có chắc muốn xoá toàn bộ bài kiểm tra này! </h6>
						    		<ul className="list-inline list-inline-condensed no-margin">
				                    	<li><a className="btn btn-success btn-float" data-dismiss="modal">Xoá</a></li>
				                    	<li><a className="btn btn-danger btn-float" data-dismiss="modal">Huỷ</a></li>
			                    	</ul>
						    	</div>
					    	</div>
						</div>
					</div>
				</div>
				{/* /confirm */}
			</div>
		)
	}
	componentDidMount(){

		$("#doixuly").append('<center class="text-bold"><i class="icon-spinner2 spinner"/> &nbsp;Đang xử lý...</center>');
		$("#contentBaitap").hide();

		var that=this;
		var url1=window.location.href;
		url1=url1.split('#');
		var mon=url1[1].split('/');
		var url2=window.location.href;
		url2=url2.split('lop');
		var phanlop=url2[1].split('/');
		var bai=this.props.params.id;
		var mon1;
		if(mon[1]=="lichsu")
				mon1="Lịch sử";
		if(mon[1]=="diali")
			mon1="Địa lí";
		var name_link="Bài học "+mon1+" lớp "+this.props.params.lop; 
		var link_pre="#"+this.props.params.mon+"/lop"+this.props.params.lop+"/baihoc";
		var name_link1="Kiểm tra bài "+this.props.params.id;
		$("#link_pre").text(name_link);
		$('#link_pre').attr('href', link_pre);
		$("#link_pre1").text(name_link1);

		//show dap an
		$('#nopbai').click(function (event){
			if(timeout==true){
				$('#nopbai').attr("data-popup","tooltip" );
				$('#nopbai').attr("data-toggle","modal" );
				$('#nopbai').attr("data-target","#confirm" );
				var socaudung=0;
				clearInterval(demnguoc);
				$("#fab-menu-affixed-demo-right").children().remove();

				for(var i=1;i<=socaude;i++){
					var temtem3='input[name='+i+']';
					var iddapan=$(temtem3).closest('.checked').children().attr("id");
					if(iddapan=='1')
						socaudung++;
					//var iddapan=$("span").closest('.checked').children().attr("id");
		       	}
				
		        //console.log("xet ket qua "+socaudung);

				var currentdate = new Date();
				var datetime =currentdate.getFullYear() + "-"
				    + (currentdate.getMonth()+1)  + "-" 
				    + currentdate.getDate() +" "
				    + currentdate.getHours() + ":"  
				    + currentdate.getMinutes() + ":" 
				    + currentdate.getSeconds();
				var data={
			        id:  id_user,
			        lop: phanlop[0],
					diem: (Math.round(parseFloat(socaudung*10/socaude) * 4) / 4).toFixed(2),
					heso: '1',
					mon: mon[1],
					bai: bai,
					thoigian: datetime
				};
				console.log(data);
		        $.post("themKetquahoctap", data, function(data1){
		        	$("#fab-menu-affixed-demo-right").append('<h5 class="form-control bg-danger-600">&nbsp;Bạn đạt được: '+(Math.round(parseFloat(socaudung*10/socaude) * 4) / 4).toFixed(2)+' điểm&nbsp;</h5>');
		        	if(data1.text=="dalam")
		        	{
		        		$('#hienkq').text("Bạn đã hoàn thành bài kiểm tra với số điểm: "+(Math.round(parseFloat(socaudung*10/socaude) * 4) / 4).toFixed(2)+" điểm. Tuy nhiên bài kiểm tra này bạn đã làm trước đó nên kết quả không được ghi nhận thêm" );
				        socaudung=0;
				        $('#nopbai').hide();
					    $("div").closest("#uniform-1").parent().parent().addClass("alpha-info no-border");
		        	}
		        	else{
				        $('#hienkq').text("Bạn đã hoàn thành bài kiểm tra với số điểm: "+(Math.round(parseFloat(socaudung*10/socaude) * 4) / 4).toFixed(2)+" điểm" );
				        socaudung=0;
				        $('#nopbai').hide();
					    $("div").closest("#uniform-1").parent().parent().addClass("alpha-info no-border");
					}
	    		});
			}
			else{
			    var r = confirm("Bạn có chắc muốn nộp bài!");
			    if (r == true) {
					$('#nopbai').attr("data-popup","tooltip" );
					$('#nopbai').attr("data-toggle","modal" );
					$('#nopbai').attr("data-target","#confirm" );
					var socaudung=0;
					clearInterval(demnguoc);
					$("#fab-menu-affixed-demo-right").children().remove();

					for(var i=1;i<=socaude;i++){
						var temtem3='input[name='+i+']';
						var iddapan=$(temtem3).closest('.checked').children().attr("id");
						if(iddapan=='1')
							socaudung++;
						//var iddapan=$("span").closest('.checked').children().attr("id");
			       	}
					
			        //console.log("xet ket qua "+socaudung);

					var currentdate = new Date();
					var datetime =currentdate.getFullYear() + "-"
					    + (currentdate.getMonth()+1)  + "-" 
					    + currentdate.getDate() +" "
					    + currentdate.getHours() + ":"  
					    + currentdate.getMinutes() + ":" 
					    + currentdate.getSeconds();
					var data={
				        id:  id_user,
				        lop: phanlop[0],
						diem: (Math.round(parseFloat(socaudung*10/socaude) * 4) / 4).toFixed(2),
						heso: '1',
						mon: mon[1],
						bai: bai,
						thoigian: datetime
					};
					console.log(data);
			        $.post("themKetquahoctap", data, function(data1){
			        	$("#fab-menu-affixed-demo-right").append('<h5 class="form-control bg-danger-600">&nbsp;Bạn đạt được: '+(Math.round(parseFloat(socaudung*10/socaude) * 4) / 4).toFixed(2)+' điểm&nbsp;</h5>');
			        	if(data1.text=="dalam")
			        	{
			        		$('#hienkq').text("Bạn đã hoàn thành bài kiểm tra với số điểm: "+(Math.round(parseFloat(socaudung*10/socaude) * 4) / 4).toFixed(2)+" điểm. Tuy nhiên bài kiểm tra này bạn đã làm trước đó nên kết quả không được ghi nhận thêm" );
					        socaudung=0;
					        $('#nopbai').hide();
						    $("div").closest("#uniform-1").parent().parent().addClass("alpha-info no-border");
			        	}
			        	else{
					        $('#hienkq').text("Bạn đã hoàn thành bài kiểm tra với số điểm: "+(Math.round(parseFloat(socaudung*10/socaude) * 4) / 4).toFixed(2)+" điểm" );
					        socaudung=0;
					        $('#nopbai').hide();
						    $("div").closest("#uniform-1").parent().parent().addClass("alpha-info no-border");
						}
		    		});
			    }
			}
		});
		
		$('#delete_kiemtra').click(function (event){
			var data={
		        lop: phanlop[0],
				mon: mon[1],
				bai: bai
			};
			$('#confirm2 li').on('click', '.btn-success', function (e) {
				$.post("deleteKiemtra", data, function(data1){
					var linkreload=window.location.href;
					var linkreload2 = linkreload.replace("baikiemtra", "baihoc_chitiet");
					window.location.href =linkreload2;
				});
	    	});
		});

		///////////////////////xu ly thoi gian/////////////////
		$(window).scroll(function() {
	        if($(window).scrollTop() + $(window).height() > $(document).height() - 40) {
	            $('.fab-menu-bottom-left, .fab-menu-bottom-right').addClass('reached-bottom');
	        }
	        else {
	            $('.fab-menu-bottom-left, .fab-menu-bottom-right').removeClass('reached-bottom');
	        }
	    });
	    // Affix
	    var nar1=$('#fab-menu-affixed-demo-right')
	    var conn=nar1.offset().top - 20
	    // Right alignment
	    $('#fab-menu-affixed-demo-right').affix({

	        offset: {
	            top: conn
	        }
	    });
	}
	componentWillMount(){
		console.log("componentWillMount");
		var that=this;
		var ketqua=[];
		var count1=1;
		$.post("/"+this.props.params.mon+"/lop"+this.props.params.lop+"/baitap_tracnghiem_chitiet_cauhoi/"+this.props.params.id,{loai: "kiemtra"}, function(data){
			console.log("lay kiem tra");
			//console.log(data);
			socaude=data.length;
			if(data.length==0)
			{
				console.log("chua co bai tap");
				$("#xxx").append('<center class="text-bold">Chưa có câu hỏi nào!.</center>'
								);
				// Default initialization Radió
				$(".styled, .multiselect-container input").uniform({
				    radioClass: 'choice'
				});
				return;
			}
			var i=0;
			function looploop(){
			//for(var i=0;i<data.length;i++){
				var count=i+1;

				$("#xxx").append('<div>'+
										'<p class=" text-semibold" style="margin-bottom: 0">'+'Câu '+count+': '+data[i].NOIDUNG+'</p>'+
										'<div id="cau'+count+'"class="form-group pt-5">'+

										'</div>'+
									'</div>'+
									'<br/>'
									);

				var idCauhoi=data[i].ID_BAIHOC;																
				$.post("/getDapan",{id: data[i].ID_TRACNGHIEM},function(data1){
					//console.log("duoi"+count);
					//console.log(data1);
					for(var j=0;j<data1.length;j++)
					{
						if(data1[j].CHECK==1){
							//console.log("cau "+count1+" ket qua "+(j+1));
							var kqtemp={cau: count1,dapan: (j+1)};
							ketqua.push(kqtemp);
							//console.log(kqtemp);
						}
						$("#cau"+count1).append('<div class="radio">'+
													'<label>'+
														'<input type="radio" id="'+ data1[j].CHECK+'" alt="'+j+'" name="'+count1+'" class="styled" />'+
														data1[j].DAPAN+
													'</label>'+
												'</div>'
												);
					}
					count1++;
					i++;
					if(i<data.length)
						looploop();
					else{
						// Default initialization Radió
						$(".styled, .multiselect-container input").uniform({
						    radioClass: 'choice'
						});
						$(".icon-spinner2").parent().remove();
						$("#contentBaitap").show();

						var time=15*60;
					    var tmp=time;
						demnguoc=setInterval(function(){
							var c=tmp--, m=(c/60)>>0,s=(c-m*60)+'';
							that.setState((state) => ({phut : m}));
							that.setState((state) => ({giay : s}));
							if(tmp==-1){
								console.log("hetgio");
								that.setState((state) => ({phut : 0}));
								that.setState((state) => ({giay : 0}));
								clearInterval(demnguoc);
								$("#fab-menu-affixed-demo-right").children().remove();
								alert("Bạn đã hết thời gian làm bài!");
								timeout=true;
								$("#nopbai").click();
								
							}
						},1000);
					}
				});
			};
			looploop();
			//console.log(ketqua);
		});
		
	}
}
