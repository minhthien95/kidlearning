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
export class baikiemtra extends React.Component{
	constructor(props) {
    super(props);
      this.state = {
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
				<div className="content">

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
							<button data-popup="tooltip" data-toggle="modal" data-target="#confirm" id="nopbai" type="submit" className="btn bg-orange-800">Nộp bài <i className="icon-arrow-right14 position-right"></i></button>
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
			var socaudung=0;
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
	        	if(data1==true)
	        	{
	        		$('#hienkq').text("Bạn đã hoàn thành bài thi với số điểm: "+(Math.round(parseFloat(socaudung*10/socaude) * 4) / 4).toFixed(2)+" điểm. Tuy nhiên bài kiểm tra này bạn đã làm trước đó nên kết quả không được ghi nhận thêm" );
			        socaudung=0;
			        $('#nopbai').hide();
				    $("div").closest("#uniform-1").parent().parent().addClass("alpha-info no-border");
	        	}
	        	else{
			        $('#hienkq').text("Bạn đã hoàn thành bài thi với số điểm: "+(Math.round(parseFloat(socaudung*10/socaude) * 4) / 4).toFixed(2)+" điểm" );
			        socaudung=0;
			        $('#nopbai').hide();
				    $("div").closest("#uniform-1").parent().parent().addClass("alpha-info no-border");
				}
    		});
		});
		
		$('#delete_kiemtra').click(function (event){
			var data={
		        lop: phanlop[0],
				mon: mon[1],
				bai: bai
			};
			$('#confirm2 li').on('click', '.btn-success', function (e) {
				$.post("deleteKiemtra", data, function(data1){
					window.location.reload(true);
				});
	    	});
		});
	}
	componentWillMount(){
		console.log("componentWillMount");
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

			for(var i=0;i<data.length;i++){
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
					// Default initialization Radió
					$(".styled, .multiselect-container input").uniform({
					    radioClass: 'choice'
					});
				});
			};
			//console.log(ketqua);
		});
		
	}
}