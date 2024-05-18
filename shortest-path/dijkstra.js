// https://www.geeksforgeeks.org/greedy-algorithms-set-6-dijkstras-shortest-path-algorithm/

// Greedy Algorithms | Set 7 (Dijkstra’s shortest path algorithm)


'use strict';


          // A  B  C  D  E  F
var arr =  [[0, 2, 4, 0, 0, 0], // A
            [0, 0, 1, 4, 2, 0], // B
            [0, 0, 0, 0, 3, 0], // C
            [0, 0, 0, 0, 3, 2], // D
            [0, 0, 0, 0, 0, 2], // E
            [0, 0, 0, 0, 0, 0]] // F



function dijkstra(graph, src) {

    var n = 6; //size of graph

    var dist = [];
    var visitedNodes = [];

    for (let i = 0; i < n; i++) {
        dist.push(Infinity);
        visitedNodes.push(false);
    }

    dist[src] = 0;


    for (let count = 0; count < n-1; count++) {
        var u = minDistance(dist, visitedNodes, n);// min value in dist array
        visitedNodes[u] = true;

        for (let v = 0; v < n; v++) {
            if (!visitedNodes[v] && graph[u][v] && dist[u] + graph[u][v] < dist[v]) {
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }
    console.log(dist)
}

dijkstra(arr, 0);






function minDistance(dist, visitedNodes, n) {
    // Initialize min value
    var min = Infinity;
    var min_index = null;

    for (let v = 0; v < n; v++) {
        if (!visitedNodes[v] && dist[v] <= min) {
            min = dist[v];
            min_index = v;
        }
    }
    return min_index;
}

// Output : [0, 2, 3, 6, 4, 6]


//          A  B  C  D  E  F
/* 
    step 1
    dist = [0, ∞, ∞, ∞, ∞, ∞]
    dist = [F, F, F, F, F, F] 
*/

/* 
    step 2 - Find min from Unvisited(0, ∞, ∞, ∞, ∞, ∞) min = A, Mark A visited and update neightbours(B, C) if value is less then the previous one 
    dist = [0, 2, 4, ∞, ∞, ∞]
    dist = [T, F, F, F, F, F] 
*/

/* 
    step 3 - Find min from Unvisited(2, 4, ∞, ∞, ∞) min = B, Mark B visited and update neightbours(C, E, D) if value is less then the previous one 
    dist = [0, 2, 3, 6, 4, ∞]
    dist = [T, T, F, F, F, F] 
*/

/* 
    step 4 - Find min from Unvisited(3, 6, 4, ∞) min = C, Mark C visited and update neightbours(E) if value is less then the previous one
    dist = [0, 2, 3, 6, 4, ∞]
    dist = [T, T, T, F, F, F] 
*/

/* 
    step 5 - Find min from Unvisited(6, 4, ∞) min = E, Mark E visited and update neightbours(E) if value is less then the previous one
    dist = [0, 2, 4, 6, 4, 6]
    dist = [T, T, T, F, T, F] 
*/

/* 
    step 6 - Unvisited(6, 6) min = D, Mark D visited and update neightbours(F) if value is less then the previous one
    dist = [0, 2, 4, 6, 4, 6]
    dist = [T, T, T, T, T, F] 
*/

/* 
    step 7 - Unvisited(6, 6) min = F, Mark F visited and update neightbours() if value is less then the previous one
    dist = [0, 2, 4, 6, 4, 6]
    dist = [T, T, T, T, T, T] 
*/

/* Final output --> dist = [0, 2, 4, 6, 4, 6] */