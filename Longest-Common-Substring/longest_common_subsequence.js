// Dynamic Programming

// Approach - Longest Common Subsequence (LCS) using Bottom-Up (Tabulation)

function lcs(X, Y, m, n) {
    var L = new Array(m + 1);
    for (var i = 0; i < L.length; i++) {
      L[i] = new Array(n + 1);
    }
    var i, j;
  
    for (i = 0; i <= m; i++) {
      for (j = 0; j <= n; j++) {
        if (i == 0 || j == 0) {
          L[i][j] = 0;
        } else if (X[i - 1] == Y[j - 1]) {
          L[i][j] = L[i - 1][j - 1] + 1;
        } else {
          L[i][j] = Math.max(L[i - 1][j], L[i][j - 1]);
        }
      }
    }
    return L[m][n];
    // printLCS(X, Y, L, m, n);
  }
  
  // Print longest common subsequence
  function printLCS(X, Y, lcs2D, m, n) {
    let result = [];
    while (m >= 0 && n >= 0) {
      // IF the character in both X and Y at position m and n are same then
      // current character is part of LCS
      if (X.charAt(m - 1) == Y.charAt(n - 1)) {
        result.unshift(X.charAt(m - 1));
        m--;
        n--;
      } else {
        // If not same, then find the larger of two and
        // go in the direction of larger value
        lcs2D[m - 1][n] > lcs2D[m][n - 1] ? m-- : n--;
      }
    }
    console.log(result.join("") ? result.join("") : "Not found");
  }
  
  // Driver code
  var S1 = "AGGTAB";
  var S2 = "GXTXAYB";
  
  var m = S1.length;
  var n = S2.length;
  
  console.log("Length of LCS is " + lcs(S1, S2, m, n)); // 4
  
  /* 
      s1 = A[G]G[T][A][B]
      s2 = [G]X[T]X[A]Y[B]

      Output = [G][T][A][B]
   */
  
  /* Follow the dynamic tables steps from here. */
  // https://www.geeksforgeeks.org/longest-common-subsequence-dp-4/

  // Time Complaxity - O(m * n)
  // Auxiliary Space: O(m * n)

  /* Space-Optimization */
  // Longest Common Subsequence (LCS) using Bottom-Up (Space-Optimization):
  // Auxiliary Space: O(m)
  