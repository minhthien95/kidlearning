$(document).ready(function() {
    var paper = new ScaleRaphael('vietnammap', '1100', '1913.021'); 

    var tmp = document.getElementById('mapHolder');

    paper.scaleAll(1);

    paper.setStart();

    for (var province in vietnam.shapes) {
        var p = paper.path(vietnam.shapes[province]);
        var details = vietnam.names[province];
        p.attr({
            stroke: "#FEFEFE",
            fill: "green",
            title: details,
            "stroke-width": .2,
            "stroke-linejoin": "round", 
            "stroke-opacity": 0.25
        });
        (function(p, province){
            p.onclick = function(){
                $("div#mapHolder").html("Tỉnh : " + vietnam.names[province] + '<br/>'
                    + "Vùng : " + vietnam.region[province] + '<br/>'
                    + "Diện tích (năm 2014) : " + vietnam.area[province] + " km²" + '<br/>' 
                    + "Dân số trung bình (năm 2014) : " + vietnam.population[province] + " nghìn người" + '<br/>');
            };
        })(p[0], province);
    }

    var vn = paper.setFinish();   

    var over = function () {
        this.c = this.c || this.attr("fill");
        this.stop().animate({fill: "red"}, 300);
    },
    out = function () {
        this.stop().animate({fill: this.c}, 300);
    };

    vn.hover(over, out);  
    paper.setSize( '1000', '500'); 
});