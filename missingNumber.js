const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//rl.question('Please Enter a number : ', (answer) => {
    console.log(findMissing())
//});


function findMissing() {
    console.log("___________________  Output  ____________________")
    var arr = [1, 3, 2, 5, 4, 6, 7, 10, 8, 11]


    var n = arr.length;
    var sum = 0;
    for(var i = 0; i<n-1; i++){
        //sum += arr[i];
        if(arr.indexOf(i+1) == -1){
            return i+1;
        }
    }

   // var total = n*(n+1)/2;
  //  return total - sum;
} 


// Misssing in AP (Arithmetic Progression)
// https://www.geeksforgeeks.org/find-missing-number-arithmetic-progression/
 function findMissingUtil(arr, low, high, diff){
    // There must be two elements
    // to find the missing
    if (high <= low)
        return Number.MAX_VALUE;

    // Find index of
    // middle element
    let mid = low + parseInt((high - low) / 2, 10);


    if (arr[mid + 1] - arr[mid] != diff)
        return (arr[mid] + diff);

    if (mid > 0 && arr[mid] -
                arr[mid - 1] != diff)
        return (arr[mid - 1] + diff);

    // If the elements till mid follow
    // AP, then recur for right half
    // The position of element (eg. 3rd)-> arr[0] + 3 * diff
    if (arr[mid] == arr[0] + mid * diff)
        return findMissingUtil(arr, mid + 1, high, diff);

    // Else recur for left half
    return findMissingUtil(arr, low, mid - 1, diff);
}
