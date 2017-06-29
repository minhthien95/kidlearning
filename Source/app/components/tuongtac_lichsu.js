import React from 'react';

var data = document.querySelector('#maincontent');

var id_user=data.dataset.id;
var check=true;
var mon,phanlop;
var url1,url2;
var temp_username=data.dataset.username;

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
					</div>
				</div>
				{/* /page header */}


				{/* Content area */}
				<div className="content">
					<div className="panel panel-flat">
						<h1>Dòng sự kiện trong Lịch sử</h1>
							<div id="timeline" className="timeline-container1">

								<button className="timeline-toggle1">+ Hiển thị</button>

								<br className="clear1"/>

								<div className="timeline-wrapper1">
									<h3 className="timeline-time1"><span>1954</span></h3>
									<dl className="timeline-series1">
										<dt id="19540517" className="timeline-event1"><a>Brown v. Board of Education</a></dt>
										<dd className="timeline-event-content1" id="19540517EX">
											<h3>May 17, 1954</h3>
											<p>
												The U.S. Supreme Court hands down a unanimous 9-0 decision in the Brown v. Board of Education of Topeka case, opening the door for the civil rights movement and ultimately racial integration in all aspects of U.S. society. In overturning Plessy v. Ferguson (1896), the court rules that “separate educational facilities are inherently unequal.”
											</p>

											<br className="clear1"/>
										</dd>
									</dl>
									<dl className="timeline-series1">
										<dt id="195405172" className="timeline-event1"><a>Brown v. Board of Education</a></dt>
										<dd className="timeline-event-content1" id="195405172EX">
											<h3>May 17, 1954</h3>
											<p>
												The U.S. Supreme Court hands down a unanimous 9-0 decision in the Brown v. Board of Education of Topeka case, opening the door for the civil rights movement and ultimately racial integration in all aspects of U.S. society. In overturning Plessy v. Ferguson (1896), the court rules that “separate educational facilities are inherently unequal.”
											</p>

											<br className="clear1"/>
										</dd>
									</dl>
								</div>
								<div className="timeline-wrapper1">
									<h3 className="timeline-time1"><span>1954</span></h3>
									<dl className="timeline-series1">
										<dt id="195405171" className="timeline-event1"><a>Brown v. Board of Education</a></dt>
										<dd className="timeline-event-content1" id="195405171EX">
											<h3>May 17, 1954</h3>
											<p>
												The U.S. Supreme Court hands down a unanimous 9-0 decision in the Brown v. Board of Education of Topeka case, opening the door for the civil rights movement and ultimately racial integration in all aspects of U.S. society. In overturning Plessy v. Ferguson (1896), the court rules that “separate educational facilities are inherently unequal.”
											</p>

											<br className="clear1"/>
										</dd>
									</dl>
								</div>
								<br className="clear1"/>
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
		//$("#contentSGK1").attr("src", "timeliner-master/timeliner.html");

		$.timeliner({});
		$.timeliner({
			timelineContainer: '#timeline-js',
			timelineSectionMarker: '.milestone',
			oneOpen: true,
			startState: 'flat',
			expandAllText: '+ Show All',
			collapseAllText: '- Hide All'
		});
		// Colorbox Modal
		$(".CBmodal").colorbox({inline:true, initialWidth:100, maxWidth:682, initialHeight:100, transition:"elastic",speed:750});

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
