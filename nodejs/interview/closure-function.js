/* 
Closures are a powerful and fundamental concept in JavaScript. They allow inner functions to access variables from their outer scope, 
even after the outer function has completed execution */

// Example: Using closure to maintain state
function counter() {
    let count = 0;
    return function() {
        return ++count;
    };
}

const increment = counter();
console.log(increment()); // Output: 1
console.log(increment()); // Output: 2



/* The closure has access to variables in three scopes; specifically: 
  (1) variable in its own scope (Inner function)
  (2) variables in the enclosing function’s scope (Outer function)
  (3) Global variables.
 */



  /* Without Closure */

// You might expect the output to be 0, 1, 2, 4 since each iteration of the loop increments i by 1. 
// However, due to the asynchronous nature of setTimeout, by the time the callback function inside setTimeout executes, 
// the loop has already finished executing and the value of i has become 5. 
// So, each callback function references the same variable i, which holds the final value of 5 after the loop has completed, resulting in 5, 5, 5, 5, 5 being logged.
for (var i = 0; i < 5; i++) {
	setTimeout(function() { console.log(i); }, i * 1000 );
}

// With Closure -- Timeout Function

// To fix this issue, we can create a closure by immediately invoking a function inside each iteration of the loop, capturing the current value of i:
// In this solution, each iteration of the loop creates its own `lexical environment` due to the immediately invoked function expression (IIFE), 

// Case 1
for (var i = 0; i < 5; i++) {
    (function(x) {
        setTimeout(function() { console.log(x); }, x * 1000 );
    })(i);
}

// Even can be resolved if use let instead of var like
for (let i = 0; i < 5; i++) {
	setTimeout(function() { console.log(i); }, i * 1000 );
}


// Case 2 - Event handler - Examples
var clickButton = (function() {
    var counter = 0;
    return function() {
      counter += 1;
      return counter;
    }
  })();// <== anonymous (nameles)  function 
  
  console.log(clickButton());
  console.log(clickButton());
  console.log(clickButton());
  console.log(clickButton());
  console.log(clickButton());


// Case 3 - Functional programming
  function multiply(a) {
    return function executeMultiply(b) {
      return a * b;
    }
  }
  
  const double = multiply(2);
  console.log(double(3)); // => 6
  console.log(double(5)); // => 10

/*  ==== Lexical Scope ====

  How does JavaScript understand that outerVar inside innerFunc() is delared in outerFunc function

  It’s because JavaScript implements a scoping mechanism named lexical scoping (or static scoping). 

  The lexical scoping means that inside the inner scope you can access variables of its outer scopes.

  It’s called lexical (or static) because the engine determines (at lexing time) mean just looking by the source code and wirhout excuting it.

  Lexical scoping also implies static binding, meaning that the scope of a variable is determined at compile time and remains fixed throughout the program's execution

*/



// Interview quesion
const sum = (x) => {
    let currentSum = x

    const innerSum = (y) => {
        if (typeof y === 'undefined') {
            return currentSum;
        }
        currentSum += y;
        return innerSum;
    };

    // It sets a custom valueOf method on the innerSum function to allow it to be treated as a primitive value.
    innerSum.valueOf = function(){
        return currentSum;
    };
    return innerSum;
};

// Example usage:
const result = sum(5)(6)(7)(8)(9)();
console.log(result); // Output: 35



// Q2 - closure function

function outerFunc() {
    // the outer scope
    let outerVar = 'I am outside!';
  
    function innerFunc() {
      // the inner scope
      console.log(outerVar); // => logs "I am outside!"
    }
    innerFunc();
  }
outerFunc();