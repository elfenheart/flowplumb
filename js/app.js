var connections = [
  { sourceName: 'one', targetName: 'three'},
  { sourceName: 'two', targetName: 'three'},
  { sourceName: 'three', targetName: 'four'},
  { sourceName: 'three', targetName: 'five'},
  { sourceName: 'four', targetName: 'six'},
  { sourceName: 'five', targetName: 'six'}
];


// getting list of sources
var pair = {};

for (var i = 0; i<connections.length; i++) {
  if (!pair[connections[i].targetName]) {
    pair[connections[i].targetName] = [];
  }
  pair[connections[i].targetName].push(connections[i].sourceName);
}

console.log(pair);

var keys = _.keys(pair);

// getting unique nodes
// var nodes = [];

// for (var i = 0; i<connections.length; i++) {
//   if (nodes.indexOf(connections[i].sourceName) < 0) {
//     nodes.push(connections[i].sourceName);
//   }

//   if (nodes.indexOf(connections[i].targetName) < 0) {
//     nodes.push(connections[i].targetName);
//   }
// }




jsPlumb.bind("ready", function() {

  var container = document.getElementById("container");

  for (var i = 0; i < keys.length; i++) {
    var out = document.createElement('div');
    out.className = "col-xs-2";

    for (var j = 0; j < pair[keys[i]].length; j++) {
      var e = document.createElement('div');
      e.id = pair[keys[i]][j];
      e.className = 'box text-center';
      e.innerHTML = pair[keys[i]][j];
      out.appendChild(e);
    }

    container.appendChild(out);
  }

  var out = document.createElement('div');
  out.className = "col-xs-2";

  var e = document.createElement('div');
  e.id = keys[keys.length-1];
  e.className = 'box text-center';
  e.innerHTML = keys[keys.length-1];
  out.appendChild(e);

  container.appendChild(out);



  jsPlumb.setContainer(container);

  for (var i = 0; i<connections.length; i++) {
    var sourceDiv = document.getElementById(connections[i].sourceName);
    var targetDiv = document.getElementById(connections[i].targetName);

    jsPlumb.connect({ source: sourceDiv, target: targetDiv });
  }

});