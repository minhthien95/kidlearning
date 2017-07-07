import React from 'react';

var data = document.querySelector('#maincontent');

var id_user=data.dataset.id;
var check=true;
var mon,phanlop;
var url1,url2;
var temp_username=data.dataset.username;
var type_username=data.dataset.type;
export class tuongtac_lichsu extends React.Component{
  	render(){
		return(
			<div>
				{/* Page header */}
				<div className="page-header page-header-default">
					<div className="breadcrumb-line">
						<ul className="breadcrumb">
							<li><a href="#"><i className="icon-home2 position-left"></i> Trang chủ</a></li>
							<li className="active" >Tương tác môn Lịch Sử</li>
						</ul>
						<ul className="breadcrumb-elements">
							<li ><a id="thembaihoc" ><i className="icon-plus-circle2 position-left"></i>Thêm sự kiện</a></li>
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
										<label className="control-label col-lg-2">Thông tin sự kiện</label>
										<div className="col-lg-12">
											<div className="row">
												<div className="col-md-3" style={{paddingRight: '0px'}}>
													<input id="add_thoigian" type="date" placeholder="Thời gian" className="form-control"/>
													<span className="help-block"></span>
												</div>

												<div className="col-md-9" style={{paddingRight: '0px'}}>
													<input id="add_tieude" type="text" placeholder="TIêu đề" className="form-control"/>
													<span className="help-block"></span>
												</div>
											</div>
										</div>
										<div className="col-lg-12">
											<div className="row">
												<div className="col-md-12" style={{paddingRight: '0px'}}>
													<textarea id="add_noidung" type="area" placeholder="Nội dung chi tiết" className="form-control"/>
													
													<span className="help-block"></span>
												</div>
											</div>
										</div>
									</div>
									<div className="text-right">
										<button id="add_video" type="submit" className="btn bg-teal-400">Đăng sự kiện<i className="icon-arrow-right14 position-right"></i></button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="panel panel-flat">
						<div className="content">
							<div className="page-title">
								<h4><span className="text-semibold">Dòng thời gian các sự kiện Lịch sử Việt Nam</span></h4>
								<a className="heading-elements-toggle"><i className="icon-more"></i></a>
							</div>
							<div id="timeline"/>
							<br/>
							<div id="noidung"/>
						</div>
					</div>

					<div className="panel panel-flat">
						<div className="content">
							<div className="page-title">
								<h4><span className="text-semibold">Triều đại các vị vua trong Lịch sử Việt Nam</span></h4>
								<a className="heading-elements-toggle"><i className="icon-more"></i></a>
							</div>
							<div id="timeline1"/>
							<br/>
							<div id="noidung1"/>
						</div>
					</div>
				</div>
				{/* /content area */}

			</div>
		)
	}
	componentDidMount()
	{
		console.log("componentDidMount");

		//su kien
		var container = document.getElementById('timeline');
		var timeline;
		var items;
		var dataset=[];

		//cac doi vua
		var container1 = document.getElementById('timeline1');
		var timeline1;
		var items1;
		var dataset1=[];
		
		$.post("dongsukien",function(data){
			console.log(data);
			for(var i=0;i<data.length;i++){
				if(data[i].END==null){
					dataset.push({id: data[i].ID, content: data[i].DATE+": "+data[i].TIEUDE, start: data[i].START});
				}
				else{
					dataset1.push({id: data[i].ID, content: data[i].DATE+": "+data[i].TIEUDE, start: data[i].START, end: data[i].END});
				}
			}
			console.log(dataset);
					  // Create a DataSet (allows two way data-binding)
			items = new vis.DataSet(dataset);
			items1 = new vis.DataSet(dataset1);
			// Configuration for the Timeline
			var options = {
			    margin: {
			      item: 20
			    },
			    format: {
			      minorLabels: {
			        millisecond:'SSS',
			        second:     's',
			        minute:     'HH:mm',
			        hour:       'HH:mm',
			        weekday:    'ddd DD',
			        day:        'DD',
			        week:       'w',
			        month:      'MM',
			        year:       'YYYY'
			      },
			      majorLabels: {
			        millisecond:'HH:mm:ss',
			        second:     'DD MM HH:mm',
			        minute:     'dd DD MM',
			        hour:       'dd DD MM',
			        weekday:    'MM YYYY',
			        day:        'MM YYYY',
			        week:       'MM YYYY',
			        month:      'YYYY',
			        year:       ''
			      }
			    }
			};
			var options1 = {
			    margin: {
			      item: 20
			    },
			    format: {
			      minorLabels: {
			        millisecond:'SSS',
			        second:     's',
			        minute:     'HH:mm',
			        hour:       'HH:mm',
			        weekday:    'ddd DD',
			        day:        'DD',
			        week:       'w',
			        month:      'MM',
			        year:       'YYYY'
			      },
			      majorLabels: {
			        millisecond:'HH:mm:ss',
			        second:     'DD MM HH:mm',
			        minute:     'dd DD MM',
			        hour:       'dd DD MM',
			        weekday:    'MM YYYY',
			        day:        'MM YYYY',
			        week:       'MM YYYY',
			        month:      'MM',
			        year:       'YYYY'
			      }
			    }
			};
			// Create a Timeline
		  	timeline = new vis.Timeline(container, items, options);
  			timeline.on('click', function (properties) {
			    console.log('click', properties.item);
			    if(properties.item=='null'){
			    	$("#noidung").empty();

			    }else{
				    $.post("laysukien",{id: properties.item},function(data){
				    	console.log('show ', data);
				    	$("#noidung").empty();
				    	$("#noidung").append('<div class="media stack-media-on-mobile">'+
				            					'<div class="media-body">'+
													'<h6 class="media-heading text-semibold text-primary-800">'+data[0].DATE+'-'+data[0].TIEUDE+'</a></h6>'+
													data[0].NOIDUNG+
												'</div>'+
											'</div>');
				    })
				}
			});

			timeline1 = new vis.Timeline(container1, items1, options1);
  			timeline1.on('click', function (properties) {
			    console.log('click', properties.item);
			    if(properties.item=='null'){
			    	$("#noidung").empty();

			    }else{
				    $.post("laysukien",{id: properties.item},function(data){
				    	console.log('show ', data);
				    	$("#noidung1").empty();
				    	$("#noidung1").append('<div class="media stack-media-on-mobile">'+
				            					'<div class="media-body">'+
													'<h6 class="media-heading text-semibold text-primary-800">'+data[0].DATE+'-'+data[0].TIEUDE+'</a></h6>'+
													data[0].NOIDUNG+
												'</div>'+
											'</div>');
				    })
				}
			});
		});

		// trieu dai vua
		// $.post("dongsukien",function(data){
		// 	console.log(data);
		// 	for(var i=0;i<data.length;i++){
		// 		dataset1.push({id: data[i].ID, content: data[i].DATE+": "+data[i].TIEUDE, start: data[i].START});
		// 	}
		// 	console.log(dataset1);
		// 			  // Create a DataSet (allows two way data-binding)
		// 	items1 = new vis.DataSet(dataset1);

		// 	// Configuration for the Timeline
		// 	var options = {
		// 	    margin: {
		// 	      item: 20
		// 	    },
		// 	    format: {
		// 	      minorLabels: {
		// 	        millisecond:'SSS',
		// 	        second:     's',
		// 	        minute:     'HH:mm',
		// 	        hour:       'HH:mm',
		// 	        weekday:    'ddd DD',
		// 	        day:        'DD',
		// 	        week:       'w',
		// 	        month:      'MM',
		// 	        year:       'YYYY'
		// 	      },
		// 	      majorLabels: {
		// 	        millisecond:'HH:mm:ss',
		// 	        second:     'DD MM HH:mm',
		// 	        minute:     'dd DD MM',
		// 	        hour:       'dd DD MM',
		// 	        weekday:    'MM YYYY',
		// 	        day:        'MM YYYY',
		// 	        week:       'MM YYYY',
		// 	        month:      'YYYY',
		// 	        year:       ''
		// 	      }
		// 	    }
		// 	};
		// 	// Create a Timeline
		//   	timeline1 = new vis.Timeline(container1, items1, options);
  // 			timeline1.on('click', function (properties) {
		// 	    console.log('click', properties.item);
		// 	    if(properties.item=='null'){
		// 	    	$("#noidung").empty();

		// 	    }else{
		// 		    $.post("laysukien",{id: properties.item},function(data){
		// 		    	console.log('show ', data);
		// 		    	$("#noidung").empty();
		// 		    	$("#noidung").append('<div class="media stack-media-on-mobile">'+
		// 		            					'<div class="media-body">'+
		// 											'<h6 class="media-heading text-semibold text-primary-800">'+data[0].DATE+'-'+data[0].TIEUDE+'</a></h6>'+
		// 											data[0].NOIDUNG+
		// 										'</div>'+
		// 									'</div>');
		// 		    })
		// 		}
		// 	});

		// });

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
	    		alert("Bạn chưa nhập tiêu đề sự kiện!");
				return;
	    	}
			if($("#add_thoigian").val()==""){
				alert("Bạn chưa nhập thời gian của sự kiện!");
				return;
			}
			if($("#add_noidung").val()==""){
				alert("Bạn chưa nhập nội dung của sự kiện!");
				return;
			}
			var data={
		        id:  id_user,
				tieude: $("#add_tieude").val(),
				thoigian: $("#add_thoigian").val(),
				noidung: $("#add_noidung").val()
			};
			console.log(data);
	        $.post("themsukien", data, function(){
	        	$("#add_tieude").val("");
	        	$("#add_thoigian").val("");
	        	$("#add_noidung").val("");
	        	alert("Sự kiện đã được thêm, làm mới trang để xem kết quả");
	        	$("#formadd").hide();
	        	//window.location = "#/tuongtac/lichsu";
            	//Trangcanhan.dispatch(location.getCurrentPath(), null);
    		});
	    });

		// $.timeliner({});
		// $.timeliner({
		// 	timelineContainer: '#timeline-js',
		// 	timelineSectionMarker: '.milestone',
		// 	oneOpen: true,
		// 	startState: 'flat',
		// 	expandAllText: '+ Show All',
		// 	collapseAllText: '- Hide All'
		// });
		// // Colorbox Modal
		// $(".CBmodal").colorbox({inline:true, initialWidth:100, maxWidth:682, initialHeight:100, transition:"elastic",speed:750});

	}
	componentWillMount()
	{
		console.log("componentWillMount");
		
		////
	}
	componentWillReceiveProps(newProps)
	{
		console.log("componentWillReceiveProps");
		// var that=this;

	}
}
