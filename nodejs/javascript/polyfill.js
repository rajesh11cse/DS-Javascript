// What is a Polyfill in JavaScript?
/* 

    A polyfill is a piece of code (typically JavaScript) used to provide modern functionality on older 
    browsers that do not natively support it. It essentially "fills in" the gap for missing features, 
    allowing developers to use modern JavaScript features without worrying about compatibility 
    issues in older environments.
*/





/* How Polyfills Work */
// Polyfills usually check if a particular feature is missing in the environment and, 
// if so, define it. For example, Array.prototype.includes is a method that was introduced in ECMAScript 2016 (ES7).
// To use it in older browsers, you can add a polyfill:

// Check if Array.prototype.myIncludes exists
if (!Array.prototype.myIncludes) {
    Array.prototype.myIncludes = function (searchElement) {
      // Iterate through each element in the array
      for (let i = 0; i < this.length; i++) {
        // Check if the current element is equal to the search element
        if (this[i] === searchElement) {
          return true;
        }
      }
      // Element not found
      return false;
    };
}

// Test cases
const array = [1, 2, 3, 4, 5];

console.log(array.myIncludes(3)); // Output: true
console.log(array.myIncludes(6)); // Output: false