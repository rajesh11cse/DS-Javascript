let grid  =[[0,1,0,0],
            [1,0,1,0],
            [0,1,0,0],
            [1,1,0,0]];

console.log("Max area of island -- ", findArea(grid));  // Output : 3


function findArea(grid){

    if(grid == null || grid.length == 0) {
        return 0;
    }
    var ans = 0;
    for(var i = 0; i < grid.length; i++) {
        for(var j = 0; j < grid[i].length; j++) {
            if(grid[i][j] == 1) {
                ans = Math.max(ans, maxAreaOfIsland(grid, i, j))
            }
        }
    };

    return ans;
}

function maxAreaOfIsland(grid, x, y) {
    if(x < 0 || x >= grid.length || y < 0 || y >= grid[x].length || grid[x][y] == 0) {
        return 0;
    }

    grid[x][y] = 0;

    let count = 1
    count += maxAreaOfIsland(grid, x + 1, y);
    count += maxAreaOfIsland(grid, x - 1, y); 
    count += maxAreaOfIsland(grid, x, y + 1); 
    count += maxAreaOfIsland(grid, x, y - 1);
    return count;
}
