import React from 'react';
import io from 'socket.io-client';
let socket = io('http://'+window.location.hostname+':3000');
//let socket = io('http://'+window.location.hostname);
var data = document.querySelector('#maincontent');

var id_user=data.dataset.id;
var check=true;
var temp_username=data.dataset.username;
var type_username=data.dataset.type;
export class baihoc_chitiet extends React.Component{
	constructor(props) {
    super(props);
      this.state = {
        listbaihoc: []
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
							<li ><a id="thembaithi" data-popup="tooltip" data-toggle="modal" data-target="#confirm"><i className="icon-plus-circle2 position-left"></i>Thêm bài kiểm tra</a></li>
						</ul>
					</div>
				</div>	
				{/* /page header */}
				<div className="page-header">
					{/* Toolbar */}
					<div className="navbar navbar-default navbar-component navbar-xs">
						<ul className="nav navbar-nav visible-xs-block">
							<li className="full-width text-center"><a data-toggle="collapse" data-target="#navbar-filter"><i className="icon-menu7"></i></a></li>
						</ul>
						<div className="navbar-collapse collapse" id="navbar-filter">
							<ul className="nav navbar-nav">
								<li className="active"><h5 id="bai_tieude" className="text-primary-800"><i className="icon-menu7 position-left"></i> </h5></li>
							</ul>
						</div>
					</div>
					{/* /toolbar */}
				</div>

				{/* Content area */}
				<div className="content">
					<div id="formCauhoi" className="timeline timeline-left content-group">
						<div className="timeline-container">
							{/* List bai hoc */}
							{this.state.listbaihoc.map(function(data1,index){
								return (
									<div  key={index}>
										<div className="timeline-row">
											<div className="timeline-icon">
												<span className="form-wizard-count">1</span>
											</div>

											<div className="panel panel-flat timeline-content">
												<div className="panel-heading">
													<h6 className="panel-title text-semibold no-margin"> <a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_sgk/"+data1.BAI+"/"+data1.TRANGSACH} className="text-success">Sách giáo khoa</a></h6>
												</div>
											</div>
										</div>

										<div className="timeline-row">
											<div className="timeline-icon">
												<span className="form-wizard-count border-orange text-orange-800">2</span>
											</div>

											<div className="panel panel-flat timeline-content">
												<div className="panel-heading">
													<h6 className="panel-title text-semibold no-margin"><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_tip_chitiet/"+data1.BAI+"/"+data1.ID_BAIHOC} className="text-orange-800">Tóm tắt kiến thức</a></h6>
												</div>
											</div>
										</div>

										<div className="timeline-row">
											<div className="timeline-icon">
												<span className="form-wizard-count border-violet text-violet-800">3</span>
											</div>

											<div className="panel panel-flat timeline-content">
												<div className="panel-heading">
													<h6 className="panel-title text-semibold no-margin"><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baihoc_video/"+data1.BAI+"/"+data1.ID_BAIHOC} className="text-violet">Video</a></h6>
												</div>
											</div>
										</div>

										<div className="timeline-row">
											<div className="timeline-icon">
												<span className="form-wizard-count border-primary text-primary-800">4</span>
											</div>

											<div className="panel panel-flat timeline-content">
												<div className="panel-heading">
													<h6 className="panel-title text-semibold no-margin"><a href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baitap_tracnghiem_chitiet/"+data1.BAI+"/"+data1.ID_BAIHOC} className="text-primary-800">Bài tập</a></h6>
												</div>
											</div>
										</div>
										{data1.BAITHI=='1' ? (
									        <div className="timeline-row">
												<div className="timeline-icon">
													<span className="form-wizard-count border-danger text-danger-800">5</span>
												</div>

												<div className="panel panel-flat timeline-content">
													<div className="panel-heading">
														<h6 className="panel-title text-semibold no-margin"><a  href={"#"+data1.MON+"/lop"+data1.PHANLOP+"/baikiemtra/"+data1.BAI} className="text-danger-800">Bài kiểm tra</a></h6>
													</div>
												</div>
											</div>
									    ) : (
										       <div/>
								      	)}
									</div>
								)
							})}
						</div>
				    </div>
				</div>
				{/* /content area */}
				<div id="confirm" className="modal fade">
					<div className="modal-dialog modal-lg">
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal">&times;</button>
								<div className="text-center">
									<h6 className="modal-title text-semibold">Thêm câu hỏi bài kiểm tra</h6>
								</div>
							</div>

							<div className="modal-body">
								<div id="listcauhoi" className="panel-body">
									
								</div>
		                    	<div className="row">
		                    		<div className="text-right">
			                            <button id="xong" type="button" className="btn bg-teal-400 btn-labeled btn-labeled-right"><b><i className="icon-circle-right2"></i></b>Xong</button>
		                    		</div>
		                    	</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
	componentDidMount(){
		var that=this;
		var cauhoi=[];
		if (type_username!="trogiang") {
            $("#thembaithi").hide();
        }
        if (type_username=="admin") {
            $("#thembaithi").show();
        }

	    for(var i=1;i<=10;i++)
	    {
	    	$("#listcauhoi").append('<div class="form-group">'+
										'<h4 class="text-semibold">Câu hỏi '+i+':</h4>'+
										'<div style={{paddingRight: "0px"}}>'+
											'<input id="noidung'+i+'" type="text" placeholder="Nhập câu hỏi..." class="form-control"/>'+
											'<span class="help-block"></span>'+
										'</div>'+
									'</div>'+
									'<div class="form-group">'+
										'<label class="text-semibold">Câu trả lời:</label>'+
										'<div class="input-group">'+
											'<span class="input-group-addon">'+
												'<input id="ra_cau'+i+'_1" name="addon-radio-'+i+'"  type="radio" class="styled"/>'+
											'</span>'+
											'<input id="te_cau'+i+'_1" type="text" class="form-control" placeholder="Câu trả lời 1"/>'+
										'</div>'+
										'<div class="input-group">'+
											'<span class="input-group-addon">'+
												'<input id="ra_cau'+i+'_2" name="addon-radio-'+i+'"  type="radio" class="styled" />'+
											'</span>'+
											'<input  id="te_cau'+i+'_2" type="text" class="form-control" placeholder="Câu trả lời 2"/>'+
										'</div>'+
										'<div class="input-group">'+
											'<span class="input-group-addon">'+
												'<input id="ra_cau'+i+'_3" name="addon-radio-'+i+'"  type="radio" class="styled"/>'+
											'</span>'+
											'<input  id="te_cau'+i+'_3" type="text" class="form-control" placeholder="Câu trả lời 3"/>'+
										'</div>'+
										'<div class="input-group">'+
											'<span class="input-group-addon">'+
												'<input id="ra_cau'+i+'_4" name="addon-radio-'+i+'" type="radio" class="styled"/>'+
											'</span>'+
											'<input  id="te_cau'+i+'_4" type="text" class="form-control" placeholder="Câu trả lời 4"/>'+
										'</div>'+
									'</div>'+
									'<hr/>');
	    }

	    //them bai tap
	    $('#xong').click(function () {
	    	var listtracnghiem=[];
			for(var i=1;i<=10;i++)
	    	{
	    		console.log($("#ra_cau"+i+"_1").is(':checked'))
				var check_temp;
	    		if($("#ra_cau"+i+"_1").is(':checked'))
					check_temp=1;
				if($("#ra_cau"+i+"_2").is(':checked'))
					check_temp=2;
				if($("#ra_cau"+i+"_3").is(':checked'))
					check_temp=3;
				if($("#ra_cau"+i+"_4").is(':checked'))
					check_temp=4;
				var da1=0,da2=0,da3=0,da4=0;
				if(check_temp==1)
					da1=1;
				if(check_temp==2)
					da2=1;
				if(check_temp==3)
					da3=1;
				if(check_temp==4)
					da4=1;
	    		var datax={
	    			id:  id_user,
	    			loai: "kiemtra",
	    			bai: that.props.params.id,
	    			mon: that.props.params.mon,
	    			lop: that.props.params.lop,
	    			noidung: $("#noidung"+i).val(),
	    			cau1: $("#te_cau"+i+"_1").val(),
					cau2: $("#te_cau"+i+"_2").val(),
					cau3: $("#te_cau"+i+"_3").val(),
					cau4: $("#te_cau"+i+"_4").val(),
					da1: da1,
					da2: da2,
					da3: da3,
					da4: da4,
					link_anh: null
	    		};
	    		listtracnghiem.push(datax);
	    		// console.log(datax);
	    		// $.post("themTracnghiem",datax,function(){
	    		// 	//alert(" them kiem tra xong");
	    		// });
	    	}
	    	console.log("listtracnghiem");
	    	//console.log(listtracnghiem);
    		$.post("themTracnghiemKiemtra",{ list: JSON.stringify(listtracnghiem)},function(){
				window.location.reload(true);
			});
	    });
	    //them bai tap

	}
	componentWillMount(){
		var that=this;
		
		var mon1;
		if(this.props.params.mon=="lichsu")
			mon1="Lịch sử";
		if(this.props.params.mon=="diali")
			mon1="Địa lí";
		var name_link="Bài học "+mon1+" lớp "+this.props.params.lop; 
		var link_pre="#"+this.props.params.mon+"/lop"+this.props.params.lop+"/baihoc";

		var data1={
			mon: this.props.params.mon,
			lop: this.props.params.lop,
			id: this.props.params.id,
			id_user: "all"
		}
		//console.log(data1);
		socket.emit('c2s_Baihoc',data1);
		socket.on('s2c_Baihoc', function(data){
			console.log(data);
			$("#link_pre").text(name_link);
			$('#link_pre').attr('href', link_pre);
			$("#bai_tieude").text("Bài "+data[0].BAI+": "+data[0].TIEUDE);
			that.setState({listbaihoc: data});
		});
	}
	// componentWillReceiveProps(newProps)
	// {
	// 	console.log("componentWillReceiveProps");
	// 	var mon1;
	// 	if(newProps.params.mon=="lichsu")
	// 		mon1="Lịch sử";
	// 	if(newProps.params.mon=="diali")
	// 		mon1="Địa lí";
	// 	var name_link="Bài học "+mon1+" lớp "+newProps.params.lop; 
	// 	var data1={
	// 		mon: newProps.params.mon,
	// 		lop: newProps.params.lop,
	// 		id: newProps.params.id,
	// 		id_user: "all"
	// 	}
	// 	socket.emit('c2s_Baihoc',data1);
	// }
}
