import React from 'react';

var data = document.querySelector('#maincontent');

var id_user=data.dataset.id;
var check=true;
var mon,phanlop;
var url1,url2;
var temp_username=data.dataset.username;
var type_username=data.dataset.type;
var baihoc;

export class baihoc_video extends React.Component{
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
						<ul className="breadcrumb-elements">
							<li ><a id="thembaihoc" ><i className="icon-plus-circle2 position-left"></i>Thêm video</a></li>
						</ul>
					</div>
				</div>
				{/* /page header */}


				{/* Content area */}
				<div className="content">
					<div id="formadd" className="panel panel-flat blog-horizontal blog-horizontal-2">
						<div className="panel-body">
							<div className="blog-preview">
								<div className="panel-body">
									<div className="form-group">
										<label className="control-label col-lg-2">Thông tin video mới</label>
										<div className="col-lg-12">
											<div className="row">
												<div className="col-md-5" style={{paddingRight: '0px'}}>
													<input id="add_tieude" type="text" placeholder="Tiêu đề" className="form-control"/>
													<span className="help-block"></span>
												</div>

												<div className="col-md-7" style={{paddingRight: '0px'}}>
													<input id="add_link" type="text" placeholder="Đường dẫn youtube video" className="form-control"/>
													<span className="help-block"></span>
												</div>
											</div>
										</div>
										<div className="col-md-12" style={{paddingRight: '0px'}}>
											<input id="add_noidung" type="text" placeholder="Mô tả video" className="form-control"/>
											<span className="help-block"></span>
										</div>
									</div>
									<div className="text-right">
										<button id="add_video" type="submit" className="btn bg-teal-400">Đăng video<i className="icon-arrow-right14 position-right"></i></button>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Main charts */}
					<div className="panel panel-flat">
						<div className="panel-heading">
							<h5 className="panel-title">Video bài học</h5>
						</div>

						<table id="table_video" className="table datatable-basic">
							<thead>
								<tr>
									<th>Mã</th>
									<th>Tiêu đề</th>
									<th>Mô tả</th>
									<th>video</th>
									<th>Người đăng</th>
									<th>Ngày đăng</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>	
					{/* /main charts */}

					{/* confirm */}
					<div id="confirm1" className="modal fade">
						<div className="modal-dialog modal-xs">
							<div className="modal-content">
								<div className="thumbnail no-border no-margin">								
							    	<div className="caption text-center">
							    		<h6 className="text-semibold no-margin-top content-group">Bạn có chắc muốn xoá video này! Dữ liệu sẽ không thể khôi phục. </h6>
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
				{/* /content area */}
			</div>
		)
	}
	componentDidMount(){
		url1=window.location.href;
		url1=url1.split('#');
		mon=url1[1].split('/');
		url2=window.location.href;
		url2=url2.split('lop');
		phanlop=url2[1].split('/');
		baihoc=this.props.params.bai;

		if (type_username!="trogiang") {
            $("#thembaihoc").hide();
        }
        if (type_username=="admin") {
            $("#thembaihoc").show();
        }
		$("#formadd").hide();
		$('#thembaihoc').click(function (event) {
			console.log("click");
	        if (check) {
	            check=false;
	            $("#formadd").show();
	        } else {
	            check=true;
	            $("#formadd").hide();
	        }
	    });
	    $('#add_video').click(function () {
	    	if($("#add_tieude").val()==""){
	    		alert("Bạn chưa nhập tiêu đề video!");
				return;
	    	}
			if($("#add_noidung").val()==""){
				alert("Bạn chưa nhập mô tả video!");
				return;
			}
			if($("#add_link").val()==""){
				alert("Bạn chưa nhập đường dẫn youtube video!");
				return;
			}
			var currentdate = new Date();
			var datetime =currentdate.getFullYear() + "-"
			    + (currentdate.getMonth()+1)  + "-" 
			    + currentdate.getDate() +" "
			    + currentdate.getHours() + ":"  
			    + currentdate.getMinutes() + ":" 
			    + currentdate.getSeconds();
			var link_video= $("#add_link").val();
			link_video=link_video.split('=');
			var data={
		        id:  id_user,
		        bai: baihoc,
				tieude: $("#add_tieude").val(),
				noidung: $("#add_noidung").val(),
				link:link_video[1],
				lop: phanlop[0],
				mon: mon[1],
				thoigian: datetime
			};
			console.log(data);
	        $.post("themVideo", data, function(){
	        	$("#add_tieude").val("");
	        	$("#add_noidung").val("");
	        	$("#add_link").val("");
	        	$("#formadd").hide();
	        	alert("Video đã được thêm, làm mới trang để xem kết quả");
	        	$("#formadd").hide();
	        	//window.location = "#/trangcanhan";
            	//Trangcanhan.dispatch(location.getCurrentPath(), null);
    		});
	    });
	    ///xoa video
	    $('#table_video').on('click', '.text-danger-400', function (e) {
	        var idVideo=$(this).attr('name');
	        console.log(idVideo);
	        $('#confirm1 li').on('click', '.btn-success', function (e) {
	        	console.log("xac nhan xoa video");
	        	$.post("delete_video",{id_video:idVideo });
	        	return;
	    	});
			
	    });
	}
	componentWillMount(){
		console.log("lay video");
		var that=this;
		var id_cauhoi=this.props.params.mon+this.props.params.lop+this.props.params.id;
		var mon1;
		if(this.props.params.mon=="lichsu")
			mon1="Lịch sử";
		if(this.props.params.mon=="diali")
			mon1="Địa lí";
		var name_link="Bài học "+mon1+" lớp "+this.props.params.lop+" bài "+this.props.params.bai; 
		var link_pre="#"+this.props.params.mon+"/lop"+this.props.params.lop+"/baihoc_chitiet/"+this.props.params.bai;
		var name_link1="Bài học video";
		
			    // Table setup
	    // ------------------------------

	    // Setting datatable defaults
	    $.extend( $.fn.dataTable.defaults, {
	        autoWidth: false,
	        columnDefs: [{ 
	            orderable: false,
	            width: '100px',
	            targets: [ 5 ]
	        }],
	        dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
	        language: {
	        	"emptyTable": "Chưa có video bài học nào",
	            search: '<span>Tìm kiếm:</span> _INPUT_',
	            lengthMenu: 'Hiển thị: _MENU_',
	            info: "<span>Hiển thị:</span> _START_ đến _END_ trong tổng _TOTAL_ video",
	            paginate: { 'first': 'First', 'last': 'Last', 'next': '&rarr;', 'previous': '&larr;' }
	        },
	        drawCallback: function () {
	            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');
	        },
	        preDrawCallback: function() {
	            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');
	        }
	    });

	    var userTable;
		$.post("/"+this.props.params.mon+"/lop"+this.props.params.lop+"/baihoc_video/"+this.props.params.bai, function(data){
			// Basic datatable
			console.log("lay du lieu baihoc_tip 1");
			console.log(data);
			$("#link_pre").text(name_link);
			$('#link_pre').attr('href', link_pre);
			$("#link_pre1").text(name_link1);
		    userTable=$('.datatable-basic').DataTable({
		    	bAutoWidth: false,
		    	"aaData": data,
		    	"aoColumnDefs": [
                    {"aTargets": [ 0 ], "bSortable": false },
                    {"aTargets": [ 1 ], "bSortable": true },
                    {"aTargets": [ 2 ], "bSortable": true },
                    {"aTargets": [ 3 ], "bSortable": false },
                    {"aTargets": [ 4 ], "bSortable": true },
                    {"aTargets": [ 5 ], "bSortable": true },
                    {"aTargets": [ 6 ], "bSortable": false }
                ],
		        "aoColumns": [
			        { "mDataProp": "ID_VIDEO" },
			        { "mDataProp": "TIEUDE" },
			        { "mDataProp": "NOIDUNG" },
			        { "mRender": function(data1, type, full, meta){
			        	console.log(full);
                        var tool_bar = '<div class="media-left">'+
											'<div class="thumb">'+
												'<a href="#/'+full.MON+'/lop'+full.PHANLOP+'/baihoc_video_chitiet/'+full.ID_BAIHOC+'/'+full.ID_VIDEO+'">'+
													'<img src="http://img.youtube.com/vi/'+full.LINK_VIDEO+'/0.jpg" class="img-responsive img-rounded media-preview" alt=""/>'+
													'<span class="zoom-image"><i class="icon-play3"></i></span>'+
												'</a>'+
											'</div>'+
										'</div>'
                        return tool_bar;
                        }
                    },
			        { "mDataProp": "USERNAME" },
			        { "mDataProp": "to_char" },
			        { "mRender": function(data, type, full, meta){
			        	if(full.USERNAME==temp_username || type_username=="admin"){
		                        var tool_bar = '<div class="hidden-sm hidden-xs action-buttons">'+
		                                        '<a name="'+full.ID_VIDEO+'" class="text-danger-400" data-popup="tooltip" data-toggle="modal" data-target="#confirm1">'+
		                                            '<i class="icon-x"></i>'+
		                                        '</a>'+
		                                    '</div>'
		                        return tool_bar;
                    	}
	                    else{
	                    		var tool_bar = '<div class="hidden-sm hidden-xs action-buttons">'+
		                                    '</div>'
		                        return tool_bar;
	                    	}
                        }
                    }
		    	]

		    });
		    return;
		});
	}
	componentWillReceiveProps(newProps)
	{
		
	}
}
