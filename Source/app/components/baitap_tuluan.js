import React from 'react';

export class baitap_tuluan extends React.Component{
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
					</div>
				</div>
				{/* /page header */}


				{/* Content area */}
				<div className="content">

					{/* Main charts */}
					<div className="panel panel-flat">
						<div className="panel-heading">
							<h5 className="panel-title">Video bài học</h5>
						</div>

						<table id="table_video" className="table datatable-basic">
							<thead>
								<tr>
									<th>Bài</th>
									<th>Tiêu đề</th>
									<th>Nội dung</th>
									<th>video</th>
									<th>Người đăng</th>
									<th>Ngày đăng</th>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>	
					{/* /main charts */}

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
	componentWillMount(){
		console.log("lay video");
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
		var name_link="Bài tập "+mon1+" lớp "+phanlop[0]; 
		var name_link1="Bài tập tự luận "+mon1+" lớp "+phanlop[0];
		var link_pre="#"+mon[1]+"/lop"+phanlop[0]+"/baitap";

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
		$.post("/"+mon[1]+"/lop"+this.props.params.lop+"/baihoc_video", function(data){
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
                    {"aTargets": [ 0 ], "bSortable": true },
                    {"aTargets": [ 1 ], "bSortable": true },
                    {"aTargets": [ 2 ], "bSortable": true },
                    {"aTargets": [ 3 ], "bSortable": false },
                    {"aTargets": [ 4 ], "bSortable": true },
                    {"aTargets": [ 5 ], "bSortable": true }
                ],
		        "aoColumns": [
			        { "mDataProp": "ID_BAIHOC" },
			        { "mDataProp": "TIEUDE" },
			        { "mDataProp": "NOIDUNG" },
			        { "mRender": function(data1, type, full, meta){
			        	console.log(full);
                        var tool_bar = '<div class="media-left">'+
											'<div class="thumb">'+
												'<a href="#/'+full.MON+'/lop'+full.PHANLOP+'/baihoc_video_chitiet/'+full.ID+'">'+
													'<img src="http://img.youtube.com/vi/'+full.LINK_VIDEO+'/0.jpg" class="img-responsive img-rounded media-preview" alt=""/>'+
													'<span class="zoom-image"><i class="icon-play3"></i></span>'+
												'</a>'+
											'</div>'+
										'</div>'
                        return tool_bar;
                        }
                    },
			        { "mDataProp": "USERNAME" },
			        { "mDataProp": "to_char" }
		    	]

		    });
		    return;
		});
	}
	componentWillReceiveProps(newProps)
	{
		
	}
}
