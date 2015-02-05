var connections = [
  { sourceName: 'one', targetName: 'three'},
  { sourceName: 'two', targetName: 'three'},
  { sourceName: 'three', targetName: 'four'},
  { sourceName: 'three', targetName: 'five'},
  { sourceName: 'four', targetName: 'six'},
  { sourceName: 'five', targetName: 'six'},
  { sourceName: 'six', targetName: 'seven'},
  { sourceName: 'err', targetName: 'seven'},
  { sourceName: 'whew', targetName: 'seven'},

];


// getting list of sources
var pair = {};

for (var i = 0; i<connections.length; i++) {
  if (!pair[connections[i].targetName]) {
    pair[connections[i].targetName] = [];
  }
  pair[connections[i].targetName].push(connections[i].sourceName);
}

var keys = _.keys(pair);

jsPlumb.bind("ready", function() {

  var unique = []; // storing unique nodes

  // jsPlumb.Defaults.Connector = "Straight";

  var arrowCommon = { foldback: 0.8, fillStyle: "grey", width: 10 };

  jsPlumb.importDefaults({
    Connector: ["Straight"],
    Endpoints : [ [ "Dot", { radius:5 } ], [ "Dot", { radius:2 } ] ],
    ConnectionOverlays: [[ "Arrow", { location:1 }, arrowCommon]],
    PaintStyle: { lineWidth: 2, strokeStyle: 'rgba(10,0,0,0.5' }
  });

  var container = document.getElementById("container");

  for (var i = 0; i < keys.length; i++) {
    var out = document.createElement('div');
    out.className = "col-xs-2";

    for (var j = 0; j < pair[keys[i]].length; j++) {

      // if the node exist, skip
      if (unique.indexOf(pair[keys[i]][j]) < 0) {
        unique.push( pair[keys[i]][j] );

        var e = document.createElement('div');
        e.id = pair[keys[i]][j];
        e.className = 'box text-center';
        e.innerHTML = pair[keys[i]][j];
        out.appendChild(e);
      }
      
    }

    // insert to DOM iff there is a node
    if (out.childNodes.length !== 0) {
      container.appendChild(out);

      if (out.childNodes.length === 1) {
        out.className = "col-xs-2 outer-box";
      }
    }
  }
  
  // need to get the last element on the DOM
  var out = document.createElement('div');
  out.className = "col-xs-2";

  var e = document.createElement('div');
  e.id = keys[keys.length-1];
  e.className = 'box text-center';
  e.innerHTML = keys[keys.length-1];
  out.appendChild(e);

  container.appendChild(out);
  out.className = "col-xs-2 outer-box";
  out.style.margin = '57px 0';
  console.log(out.style);


  jsPlumb.setContainer(container);

  for (var i = 0; i<connections.length; i++) {
    var sourceDiv = document.getElementById(connections[i].sourceName);
    var targetDiv = document.getElementById(connections[i].targetName);

    jsPlumb.connect({ source: sourceDiv, target: targetDiv, anchor: "AutoDefault" });
  }

});