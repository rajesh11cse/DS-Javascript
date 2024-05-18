// https://www.geeksforgeeks.org/knapsack-problem/



// Brute- Force method

let solveKnapsack = function(profits, weights, capacity){

    function knapsackRecursive(profits, weights, capacity, currentInddex){
        // base case
        if(capacity <= 0 || currentInddex >= profits.length){
            return 0;
        }

        let profit1 = 0;

        if(weights[currentInddex] <= capacity){

            profit1 = profits[currentInddex] + knapsackRecursive(profits, weights, capacity-weights[currentInddex], currentInddex+1)
        }

        const profit2 = knapsackRecursive(profits, weights, capacity, currentInddex+1);

        return Math.max(profit1, profit2)
    }

    return knapsackRecursive(profits, weights, capacity, 0)
}

var profits = [1, 6, 10, 16];
var weights = [1, 2, 3, 5];
console.log(`Brute-force => Total knapsack profit: ---> ${solveKnapsack(profits, weights, 7)}`);
console.log(`Brute-force => Total knapsack profit: ---> ${solveKnapsack(profits, weights, 6)}`);


// Dynamic Programming | Set 10 ( 0-1 Knapsack Problem)

// 1. Exclude the item at index ‘i’. In this case, we will take whatever profit we get from the 
//    sub-array excluding this item => dp[i-1][c]
// 2. Include the item at index ‘i’ if its weight is not more than the capacity. In this case, we 
//    include its profit plus whatever profit we get from the remaining capacity and from remaining 
//    items => profit[i] + dp[i-1][c-weight[i]]
// 3. Finally, our optimal solution will be maximum of the above two values:
//    dp[i][c] = max (dp[i-1][c], profit[i] + dp[i-1][c-weight[i]])

// https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/?ref=lbp

let solveKnapsackDP = function(profits, weights, capacity) {
  const n = profits.length;
  if (capacity <= 0 || n == 0 || weights.length != n) return 0;

  const dp = Array(profits.length)
    .fill(0)
    .map(() => Array(capacity + 1).fill(0));


  // populate the capacity=0 columns; with '0' capacity we have '0' profit
  for (let i = 0; i < n; i++) dp[i][0] = 0;

  // if we have only one weight, we will take it if it is not more than the capacity
  for (let c = 0; c <= capacity; c++) {
    if (weights[0] <= c) dp[0][c] = profits[0];
  }

  // process all sub-arrays for all the capacities
  for (let i = 1; i < n; i++) {
    for (let c = 1; c <= capacity; c++) {
      let profit1 = 0,
        profit2 = 0;
      // include the item, if it is not more than the capacity
      if (weights[i] <= c) profit1 = profits[i] + dp[i - 1][c - weights[i]];
      // exclude the item
      profit2 = dp[i - 1][c];
      // take maximum
      dp[i][c] = Math.max(profit1, profit2);
    }
  }

  // maximum profit will be at the bottom-right corner.
  return dp[n - 1][capacity];
};

var profits = [1, 6, 10, 16];
var weights = [1, 2, 3, 5];
console.log(`DP => Total knapsack profit: ---> ${solveKnapsackDP(profits, weights, 7)}`);
console.log(`DP => Total knapsack profit: ---> ${solveKnapsackDP(profits, weights, 6)}`);

// Time Complexity -- O(nW), where n-- length of values array;





