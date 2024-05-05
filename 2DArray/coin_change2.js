/* 
  Find minimum number of coins that make a given value
*/

// https://www.geeksforgeeks.org/find-minimum-number-of-coins-that-make-a-change/


var denominations = [9, 6, 5, 1];
var amount = 11;

console.log('Minumm no of coins => ', minCoins(denominations, amount))

// Diagram Ref : https://drive.google.com/file/d/18skaJg3Q_mLwfHYEHVI3RkZv9e1bdKkC/view?usp=sharing

// Time Complexity: O(mn)
// The auxiliary space required here is O(n)
function minCoins(arr, n) {
    let m = arr.length;
    let table = new Array(n + 1).fill(0);

    for (let i = 1; i <= n; i++) {
        table[i] = Infinity;
    }
    // Base case
    table[0] = 0;

    for (let i = 0; i <m; i++) {
        for (let j = 1; j <= n; j++) {
            var coin = arr[i];
            if (j >= coin) {
                if(table[j - coin] +1 < table[j]){
                    table[j] = table[j - coin] +1;
                }
            }
        }
    }
    return table[n] == Infinity ? -1 : table[n];
}







