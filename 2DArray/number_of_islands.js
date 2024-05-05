

var grid  =[[0,1,0,0],
            [1,0,1,0],
            [0,1,0,0],
            [1,1,0,0]];

console.log("Number of islands -- ", getNumberOfIslands(grid)); // Output : 4



function getNumberOfIslands(grid){

    if(grid == null || grid.length == 0) {
        return 0;
    }
    var numIslands = 0;

    for(var i = 0; i < grid.length; i++) {
        for(var j = 0; j < grid[i].length; j++) {
            if(grid[i][j] == 1) {
                numIslands += numNeighbors(grid, i, j);
            }
        }
    };

    return numIslands;
}

function numNeighbors(grid, x, y) {
    if(x < 0 || x >= grid.length || y < 0 || y >= grid[x].length || grid[x][y] == 0) {
        return 0;
    }

    grid[x][y] = 0;

    numNeighbors(grid, x + 1, y);
    numNeighbors(grid, x - 1, y); 
    numNeighbors(grid, x, y + 1); 
    numNeighbors(grid, x, y - 1);
    return 1;
}



