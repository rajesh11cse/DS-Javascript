// Longest Common Substring
// Input : X = “GeeksforGeeks”, y = “GeeksQuiz”
// Output : 5
// The longest common substring is “Geeks” and is of length 5.

class longestCommonString {
    // Dynamic Programming METHOD ==> O(nxm)
    lcsDP(X, Y, m, n) {
    // Create a table to store lengths of longest common suffixes of substrings;
    let LCSuff = Array(m+1).fill(0).map(() => Array(n+1).fill(0));
    let result = 0;
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if(X.charAt(i-1) == Y.charAt(j-1)){
                LCSuff[i][j] = LCSuff[i-1][j-1] + 1;
                result = Math.max(result, LCSuff[i][j])
            }
        }
    }
    return result;
}


// Recursion Method  ==> O(n+m)
// Returns length of function for longest common  
// substring of X[0..m-1] and Y[0..n-1]  
lcsRec(X, Y, i, j, count) {
    // base case
    if(i == 0 || j == 0){
        return count;
    }
    if(X.charAt(i-1) == Y.charAt(j-1)){
        count = this.lcsRec(X, Y, i-1, j-1, count+1);
    }
    count = Math.max(count, (Math.max(
        this.lcsRec(X, Y, i, j-1, 0),
        this.lcsRec(X, Y, i-1, j, 0)
    )))
    return count;
}
// Time complexity: O(2^max(m,n))
// Auxiliary Space: O(1)

}

let X = "abcdxyz";
let Y = "xyzabcd";
let m = X.length;
let n = Y.length;
var lcs = new longestCommonString();


/* 
  s1 = [abcd]xyz
  s2 = xyz[abcd]
  
  Output = abcd
*/

console.log(lcs.lcsDP(X, Y, m, n, 0)); 
console.log(lcs.lcsRec(X, Y, m, n, 0)); 