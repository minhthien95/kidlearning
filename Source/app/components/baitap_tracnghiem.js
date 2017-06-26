import React from 'react';

export class baitap_tracnghiem extends React.Component{
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
	                	<form className="steps-basic" action="#">
							<h6>Câu 1</h6>
							<fieldset>
								<p className="content-group text-semibold">Besides default color, both checkboxes an options.</p>
								<div className="form-group pt-5">
									<label className="text-semibold">Chọn câu trả lời:</label>
									<div className="radio">
										<label>
											<input type="radio" name="stacked-radio-left" className="styled" checked="checked"/>
											Selected styled
										</label>
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
									<div className="radio">
										<label>
											<input type="radio" name="stacked-radio-left" className="styled"/>
											Unselected styled
										</label>
									</div>
								</div>
							</fieldset>
							<h6>Câu 2</h6>
							<fieldset>
								<p className="content-group text-semibold">Besides default color, both checkboxes an options.</p>
								<div className="form-group pt-5">
									<label className="text-semibold">Chọn câu trả lời:</label>
									<div className="radio">
										<label>
											<input type="radio" name="stacked-radio-left" className="styled" checked="checked"/>
											Selected styled
										</label>
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
									<div className="radio">
										<label>
											<input type="radio" name="stacked-radio-left" className="styled"/>
											Unselected styled
										</label>
									</div>
								</div>
							</fieldset>
							<h6>Câu 3</h6>
							<fieldset>
								<p className="content-group text-semibold">Besides default color, both checkboxes an options.</p>
								<div className="form-group pt-5">
									<label className="text-semibold">Chọn câu trả lời:</label>
									<div className="radio">
										<label>
											<input type="radio" name="stacked-radio-left" className="styled" checked="checked"/>
											Selected styled
										</label>
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
									<div className="radio">
										<label>
											<input type="radio" name="stacked-radio-left" className="styled"/>
											Unselected styled
										</label>
									</div>
								</div>
							</fieldset>
						</form>
		            </div>
		            {/*/basic setup */}
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
	componentDidMount(){
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
		var name_link="Bài học "+mon1+" lớp "+phanlop[0]; 
		var name_link1="Bài tập trắc nghiệm "+mon1+" lớp "+phanlop[0];
		var link_pre="#"+mon[1]+"/lop"+phanlop[0]+"/baihoc_chitiet/";

		$("#link_pre").text(name_link);
		$('#link_pre').attr('href', link_pre);
		$("#link_pre1").text(name_link1);

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
	        onFinished: function (event, currentIndex) {
	            alert("Form submitted.");
	        }
	    });
		// Default initialization Radió
		$(".styled, .multiselect-container input").uniform({
		    radioClass: 'choice'
		});
	}
	componentWillMount(){
		console.log("lay video");
		
	}
	componentWillReceiveProps(newProps)
	{
		
	}
}
