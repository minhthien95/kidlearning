import React from 'react';

export class baihoc_tip_chitiet extends React.Component{
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
							<li ><a id="link_pre_all" ></a></li>
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
							<h6 className="panel-title">Tóm tắt kiến thức bài {this.props.params.bai}</h6>
						</div>
						{/* tip */}
						<div className="content" style={{paddingBottom: '0px'}}>
		 					<iframe id="contentSGK"  onError={() => {console.log("khong co bai")}} width="100%" height="850" allowFullScreen  />
						</div>
						{/* /tip */}

					</div>
					{/* /main charts */}

				</div>
				{/* /content area */}
			</div>
		)
	}
	componentDidMount(){
		//
		var timeout;
		$("#contentSGK").attr("src", "mindmap/"+this.props.params.mon+this.props.params.lop+"/bai"+this.props.params.bai+".html").on("load", function() {

			console.log("loaded !");
		});
		// timeout = setTimeout(function() {
		//     $("#contentSGK").off("load").remove();
		//     console.error("iframe loading failed");
		// }, 60000);

	}
	componentWillMount(){
		var that=this;

		var url1=window.location.href;
		url1=url1.split('#');
		var mon=url1[1].split('/');
		var url2=window.location.href;
		url2=url2.split('lop');
		var phanlop=url2[1].split('/');


		$("#contentSGK").attr("src", "mindmap/"+this.props.params.mon+this.props.params.lop+"/bai"+this.props.params.bai);

		var mon1;
		if(mon[1]=="lichsu")
				mon1="Lịch sử";
		if(mon[1]=="diali")
			mon1="Địa lí";
		$.post("laytenbaihoc",{mon: mon[1],lop:that.props.params.lop,bai:that.props.params.bai},function(data){
			var name_link_all="Bài học "+mon1+" lớp "+that.props.params.lop; 
			var link_pre_all="#"+that.props.params.mon+"/lop"+that.props.params.lop+"/baihoc";
			$("#link_pre_all").text(name_link_all);
			$('#link_pre_all').attr('href', link_pre_all);

			var name_link="Bài "+that.props.params.bai+": "+data[0].TIEUDE; 
			var link_pre="#"+that.props.params.mon+"/lop"+that.props.params.lop+"/baihoc_chitiet/"+that.props.params.bai;
			var name_link="Bài "+that.props.params.bai+": "+data[0].TIEUDE; 
			var link_pre="#"+that.props.params.mon+"/lop"+that.props.params.lop+"/baihoc_chitiet/"+that.props.params.bai;
			var name_link1="Tóm tắc bài học";
			$("#link_pre").text(name_link);
			$('#link_pre').attr('href', link_pre);
			$("#link_pre1").text(name_link1);
		})
	}

}
