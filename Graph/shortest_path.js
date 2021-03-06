/* Find shortest path in undirected Graph */
// Dijkstra Algorithm

var util = require('util')

'use strict';

let graph = require('./weighted_graph.js');
console.log(util.inspect("======================================================="))
console.log(util.inspect(graph, { showHidden: false, depth: null, colors: true }))
console.log(util.inspect("======================================================="))

dijkstra('A', graph.root.AdjList);


function dijkstra(start, graph) {
    var result = {}; // Result object
    var i = 0;
    graph.forEach(function (value, key) {

        if (i == 0) {
            result[key] = 0;
            i++;
        } else {
            result[key] = Infinity;
        }
    })

    console.log('Dijikstra logs................')
    console.log('result', result)
    var freezed = {}; // Don't include these freezed values in sorting.

    graph.forEach(function (obj, k) {
        console.log('------------------------freezed', freezed)
        var temp_result = {}; // Make a temp object for result
        for (var key in result) {
            temp_result[key] = result[key];
        }
        // delete freezed values from temp_result
        for (var key in freezed) {
            delete temp_result[key];
        }

        // Find min value in array.
        var min = findMin(temp_result);

        console.log('min', min)
        console.log('temp_result', temp_result, obj, result)
        // Put min value in freezed object
        // So that we not include it in sorting;
        freezed[Object.keys(min)] = min[Object.keys(min)];;
        // Updates values in result
        for (o in obj) {
            var key = Object.keys(obj[o])[0]
            var value = obj[o][key] + min[Object.keys(min)];
            if (value < result[key]) {
                result[key] = value;
            }
        }
    })
    console.log(result) // From A to anywhere.
};


// FInd minimum
function findMin(data) {
    var min = Infinity;
    var obj = {};
    for (var k in data) {
        if (data[k] < min) {
            min = data[k];
            obj = {};
            obj[k] = min;
        }
    }
    return obj;
}




/// Logs
/* { root:
    Graph {
      AdjList:
       Map {
         'A' => [ { B: 2 }, { C: 4 } ],
         'B' => [ { C: 1 }, { D: 4 }, { E: 2 } ],
         'C' => [ { E: 3 } ],
         'D' => [ { F: 2 } ],
         'E' => [ { D: 3 }, { F: 2 } ],
         'F' => [] } } }
 '======================================================='
 Dijikstra logs................
 result { A: 0,
   B: Infinity,
   C: Infinity,
   D: Infinity,
   E: Infinity,
   F: Infinity }
 ------------------------freezed {}
 min { A: 0 }
 temp_result { A: 0,
   B: Infinity,
   C: Infinity,
   D: Infinity,
   E: Infinity,
   F: Infinity } [ { B: 2 }, { C: 4 } ] { A: 0,
   B: Infinity,
   C: Infinity,
   D: Infinity,
   E: Infinity,
   F: Infinity }
 ------------------------freezed { A: 0 }
 min { B: 2 }
 temp_result { B: 2, C: 4, D: Infinity, E: Infinity, F: Infinity } [ { C: 1 }, { D: 4 }, { E: 2 } ] { A: 0, B: 2, C: 4, D: Infinity, E: Infinity, F: Infinity }
 ------------------------freezed { A: 0, B: 2 }
 min { C: 3 }
 temp_result { C: 3, D: 6, E: 4, F: Infinity } [ { E: 3 } ] { A: 0, B: 2, C: 3, D: 6, E: 4, F: Infinity }
 ------------------------freezed { A: 0, B: 2, C: 3 }
 min { E: 4 }
 temp_result { D: 6, E: 4, F: Infinity } [ { F: 2 } ] { A: 0, B: 2, C: 3, D: 6, E: 4, F: Infinity }
 ------------------------freezed { A: 0, B: 2, C: 3, E: 4 }
 min { D: 6 }
 temp_result { D: 6, F: 6 } [ { D: 3 }, { F: 2 } ] { A: 0, B: 2, C: 3, D: 6, E: 4, F: 6 }
 ------------------------freezed { A: 0, B: 2, C: 3, E: 4, D: 6 }
 min { F: 6 }
 temp_result { F: 6 } [] { A: 0, B: 2, C: 3, D: 6, E: 4, F: 6 }
 { A: 0, B: 2, C: 3, D: 6, E: 4, F: 6 } */