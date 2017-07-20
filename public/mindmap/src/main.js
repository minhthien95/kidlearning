// Inializing objects from serialized string

var nodes = [];
var connectors = [];
var root = null;
generateNodes(objects[0]);

// Initialize nodes
function generateNodes(obj) {
    var node = addNode(obj.type, obj.text, obj.fill);
    nodes.push(node);
    if (obj.type == "root")
        root = node;
    for (var i = 0; i < obj.branches.length; i++) {
        var child = generateNodes(obj.branches[i]);
        connectors.push(connect(node, child));
    }
    return node;
}

// Adding  node
function addNode(type, text, fill) {
    var name = ej.datavisualization.Diagram.Util.randomId();
    var margin = { "left": 5, "top": 5, "right": 5, "bottom": 5 };
    var constraints = ej.datavisualization.Diagram.NodeConstraints.Default & ~(ej.datavisualization.Diagram.NodeConstraints.Rotate);
    if (type == "root") {
        constraints = constraints & ~ej.datavisualization.Diagram.NodeConstraints.Delete;
    }
    var node = {
        name: name, 
        constraints: constraints, 
        fillColor: fill || "white", 
        borderColor: "transparent" 
    };
    node.minWidth = 50;
    node.minHeight = 30;
    node.labels = [{
        "text": text, 
        "name": name + "_label", 
        "wrapping": "nowrap", 
        "margin": margin, 
        "fontFamily": "Segoe UI", 
        "bold": true
    }];
    node.branch = type;
    node.ports = [];
    if (type == "right" || type == "left" || type == "root") {
        node.ports.push(getport(0, 0.5));
        node.ports.push(getport(1, 0.5));
        node.shape = "rectangle";
        node.cornerRadius = 5;
    }
    else {
        node.ports.push(getport(0, 1));
        node.ports.push(getport(1, 1));
        node.type = "native";
        node.templateId = "svgTemplate";
    }
    return node;
}

//Adding a connection
function connect(tail, head, name) {
    var conn = {};
    conn.segments = [{ "type": "bezier" }];
    conn.constraints = ej.datavisualization.Diagram.ConnectorConstraints.Default & ~(ej.datavisualization.Diagram.ConnectorConstraints.Select);
    conn.name = ej.datavisualization.Diagram.Util.randomId();
    conn.targetNode = head.name;
    conn.sourceNode = tail.name;
    conn.targetDecorator = { "shape": "none" };
    if (head.branch == "right" || head.branch == "subright") {
        conn.sourcePort = tail.ports[1].name;
        conn.targetPort = head.ports[0].name;
    }
    else if (head.branch == "left" || head.branch == "subleft") {
        conn.sourcePort = tail.ports[0].name;
        conn.targetPort = head.ports[1].name;
    }
    return conn;
}

//creating port
function getport(offsetx, offsety) {
    var offset = { x: offsetx, y: offsety };

    var port = { "offset": offset, "name": ej.datavisualization.Diagram.Util.randomId(), visibility: ej.datavisualization.Diagram.PortVisibility.Hidden };
    return port;
}

function updateLabels() {
    var diagram = $("#diagram").ejDiagram("instance");
    for (var i = 0; i < diagram.nodes().length; i++) {
        var node = diagram.nodes()[i];
        applyBackground(node.fillColor, node);
    }
}

//layout updates
function updateRightSideMap(diagram) {
    if (diagram) {
        if (diagram.model.layout) {
            //right side layout
            for (var i = 0; i < diagram.nodes().length; i++) {
                var node = diagram.nodes()[i];
                if (node.branch == "right" || node.branch == "subright" || node.branch == "root") { 
                    console.log(node.branch);
                    node.excludeFromLayout = false; 
                }
                else { 
                    node.excludeFromLayout = true; 
                }
            }
            diagram.model.layout.orientation = "lefttoright";
            diagram.layout();
        }
    }
}

function updateLeftSideMap(diagram) {
    if (diagram) {
        if (diagram.model.layout) {
            //left side layout
            for (var i = 0; i < diagram.nodes().length; i++) {
                var node = diagram.nodes()[i];
                if (node.branch == "left" || node.branch == "subleft" || node.branch == "root") { 
                    console.log(node.branch);
                    node.excludeFromLayout = false;
                }
                else
                { node.excludeFromLayout = true; }
            }
            diagram.model.layout.orientation = "righttoleft";
            diagram.layout();
        }
    }
}

// User handles
var userHandles = [];

// Layout details
var layoutdetails = {
    type: "hierarchicaltree",
    orientation: "lefttoright",
    horizontalSpacing: 30,
    verticalSpacing: 60,
    fixedNode: root.name
};

root.offsetX = $(window).width() / 2; // original : 475
root.offsetY = 300;

// console.log(root.offsetX);
console.log('before loading');
if (!(ej.browserInfo().name === "msie" && Number(ej.browserInfo().version) < 9)) {
    var diagram = $("#diagram").ejDiagram({
        connectors: connectors, 
        nodes: nodes, 
        width: "100%",
        height: "700px", 
        layout: layoutdetails,
        selectedItems: {
            userHandles: userHandles,
            constraints: ej.datavisualization.Diagram.SelectorConstraints.UserHandles,
        },
        pageSettings: { scrollLimit: "diagram" },
        snapSettings: { "snapConstraints": ej.datavisualization.Diagram.SnapConstraints.None },
        enableContextMenu: false,
        click:nodeclick,
    });

    var diagram = $("#diagram").ejDiagram("instance");
    updateLeftSideMap(diagram);
    updateRightSideMap(diagram);
    updateLabels();
}
else {
    alert("Diagram will not be supported in IE Version < 9");
}

function nodeclick(args) {
    var diagram = $("#diagram").ejDiagram("instance");
    if (args.element && args.elementType === "node") {
        var node = args.element;
        processNode(node);
        console.log('clicked');
    }
}

function processNode(node) {
    var diagram = $("#diagram").ejDiagram("instance");
    
    if (node.outEdges) {
        for (var i = 0; i < node.outEdges.length; i++) {
            var connector = diagram.getNode(node.outEdges[i]);
            diagram.updateConnector(connector.name, { visible: !connector.visible });
            console.log(" NO more node");
            var targetNode = diagram.getNode(connector.targetNode);
            diagram.updateNode(targetNode.name, { visible: !targetNode.visible });
            console.log(" NO more node");
            if (targetNode.outEdges) {  
                processNode(targetNode);
                console.log("we have target nodes");
            }
        }
    }
}

// function click_palette(evt) {
//     var color = evt.target.style.backgroundColor;
//     var diagram = $("#diagram").ejDiagram("instance");
//     applyBackground(color, diagram.selectionList[0]);
// }

function applyBackground(color, target) {
    var diagram = $("#diagram").ejDiagram("instance");
    if (!target.segments) {
        var fontcolor;
        if (target.type != "native") {

            var values = color.split(",");
            values[0] = values[0].replace("rgb(", "");
            values[2] = values[2].replace(")", "");
            var sum = 0;
            for (var i = 0; i < values.length - 1; i++) {
                sum += parseInt(values[i]);
            }
            if ((sum / 3) < 125) {
                if (target.labels[0])
                    fontColor = "white";
            }
            document.getElementById("colorpalette").style.display = "none";
        } else {
            if (target.labels[0]) {
                fontColor = color;
            }
        }
        target.labels[0].fontColor = fontColor;
        diagram.updateLabel(target.name, target.labels[0], { "fontColor": fontColor });
        diagram.updateNode(target.name, {
            "fillColor": color,
            "borderColor": "none"
        });
        document.getElementById("colorpalette").style.display = "none";
    }
}