/* Dynamic Programming | Set 7 (Coin Change)
*/
// https://www.geeksforgeeks.org/dynamic-programming-set-7-coin-change/

// https://www.youtube.com/watch?v=PafJOaMzstY





var denominations = [1, 2, 4, 3];
var amount = 5;

console.log('count ways=> ', countWays(denominations, amount))

// Diagram Ref : https://drive.google.com/file/d/18ekIn5h6kfX2G58vEiPXkzuVzHM-SOis/view?usp=sharing

// Time Complexity: O(mn)
// The auxiliary space required here is O(mn)
function countWays(arr, n) {
    let m = arr.length;
    let table = [];
    for (let i = 0; i <= m; i++) {
        table.push(new Array(n + 1).fill(0));
    }
    // Base case
    table[0][0] = 1;

    for (let i = 1; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            var coin = arr[i - 1];
            if (j < coin) {
                table[i][j] = table[i - 1][j]
            } else {
                table[i][j] = table[i][j - coin] + table[i - 1][j];
            }
        }

    }
    return table[m][n];
}



// Time Complexity: O(mn)
// The auxiliary space required here is O(n) only
function countWays2(arr, n) {
    let m = arr.length;
    // table[i] will be storing the number of solutions for value i. We need n+1 rows as the table
    // Initialize all table values as 0 
    let table = new Array(n + 1).fill(0);

    // Base case (If given value is 0) 
    table[0] = 1;
    // Pick all coins one by one and update the table[] 
    // values after the index greater than or equal to 
    // the value of the picked coin 
    for (var i = 0; i < m; i++) {
        for (var j = arr[i]; j <= n; j++) {
            table[j] += table[j - arr[i]];
        }
    }
    return table[n];
}






