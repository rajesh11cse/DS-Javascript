/////       AMAZON
// Dynamic Programming | Set 3 (Longest Increasing Subsequence
// https://www.geeksforgeeks.org/longest-increasing-subsequence/

function lisDP(arr, m) {
    let lis = Array(m).fill(1);
    for (let i = 1; i < m; i++) {
      for (let j = 0; j < i; j++) {
        if (arr[j] < arr[i] && lis[i] < lis[j] + 1) {
          lis[i] = lis[j] + 1;
        }
      }
    }
  
    // Pick maximum of all LIS values
    let max = 0;
    for (i = 0; i < lis.length; i++) {
      if (max < lis[i]) {
        max = lis[i];
      }
    }
    console.log("Length of LIS is", max);
  }
  
  var arr = [10, 22, 9, 33, 21, 50, 41, 60];
  lisDP(arr, arr.length);
  
  // Step 1 - Initialize LIS array with 1
  // lis = [ 1, 1, 1, 1, 1, 1, 1, 1 ]
  
  // Step2 -> i = 1, j = 0 to 1
  // lis = [ 1, (2), 1, 1, 1, 1, 1, 1 ]
  // j=0
  // 22 > 10 or arr[1] > arr[0] and also 1+1 > 1 or lis[1]+1 > lis[0] so update lis[1] = list[1]+1 = 1+1 = 2
  
  // Step3 -> i = 2, j = 0 to 2
  // lis = [ 1, 2, (1), 1, 1, 1, 1, 1 ]
  
  // Step4 -> i = 3, j = 0 to 3
  // lis = [ 1, 2, 1, (3), 1, 1, 1, 1 ]
  // j=0
  // 33 > 10 or arr[3] > arr[0] and also 1+1 > 1 or lis[3]+1 > lis[0] so update lis[3] = list[3]+1 = 1+1 = 2
  // j=1
  // 33 > 22 or arr[3] > arr[1] and also 2+1 > 2 or lis[3]+1 > lis[1] so update lis[3] = list[3]+1 = 1+1 = 3
  // j = 2, 3 -> does not satisfy the condition
  
  // Step5 -> i = 4, j = 0 to 4
  // lis = [ 1, 2, 1, 3, (2), 1, 1, 1 ]
  
  // Step6 -> i = 5, j = 0 to 5
  // lis = [ 1, 2, 1, 3, 2, (4), 1, 1 ]
  
  // Step7 -> i = 6, j = 0 to 6
  // lis = [ 1, 2, 1, 3, 2, 4, (4), 1 ]
  
  // Step8-> i = 7, j = 0 to 7
  // lis = [ 1, 2, 1, 3, 2, 4, 4, (5) ]
  
  // Get max from lis ==> 5 [Output:]
  