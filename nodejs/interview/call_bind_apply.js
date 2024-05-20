// All are used primarily to control the context (the value of this) when invoking functions.

// The call and apply methods set `this` to a function and call the function.
// The bind method will only set `this` to a function. We will need to separately invoke the function.

// Polyfill => 
https://www.geeksforgeeks.org/explain-call-apply-and-bind-methods-in-javascript/



/* call */
/* 
    1. Setting the this Value: 
    2. Passing Arguments:
    3. Function Borrowing: Borrow methods from one object and use them in the context of another object. 
*/

// Case 1 -> Setting the this Value
function greet(name) {
    console.log(`Hello, ${name}! My name is ${this.name}.`);
}
  
let person = { name: "John" };
greet.call(person, "Alice"); // Output: Hello, Alice! My name is John.

// Case 2 -> Function Borrowing. Let's borrow the sayHello method from person1 and use it with person2:
let person1 = {
    name: "Bob",
    sayHello: function(age) { // parameter too
        console.log(`Hello, my name is ${this.name} and I am ${age} year old`);
    }
};

let person2 = {
    name : "Charlie"
}
person1.sayHello.call(person2, 30)







  
/* apply */
/* 
    1. Setting the this Value:
    2. Passing Arguments as an Array: apply allows you to pass a variable number of arguments to a function in the form of an array.
    3. Function Borrowing with Variable Arguments: It enables you to borrow functions with variable-length argument lists from one object and use them in the context of another.
*/
function greet(name) {
    console.log(`Hello, ${name}! My name is ${this.name}.`);
}
  
let person = { name: "John" };

// Case 1 -> Setting the this Value
greet.apply(person, ["Alice"]); // Output: Hello, Alice! My name is John.


// Case 2 -> Function Borrowing
function calculate(callback, args) {
    // Lets borrow the callback and pass your args, result will give you the sum
    return callback.apply(null, args)
}
  
function sum(a, b){
    return a+b;
}
const args = [2, 3, 6];
let result = calculate(sum, args)

console.log("result: ", result)

/*  Let check this in javascript */
// Non- array
console.log(Math.max(2,7,3)) // 7
/* OR array with apply - real-life example*/
console.log(Math.max.apply(null, [2,7,3])) // 7









/* bind */
/* 
    1. Preserving Context: It allows you to ensure that a function always executes in a specific context, regardless of how it’s called.
    2. Partial Function Application: bind enables you to create new functions by pre-filling some of the function's arguments. 
       This is particularly useful when you need to reuse a function with certain arguments fixed.
*/

// Case 1 -> Preserving Context
function greet() {
    console.log(`Hello, ${this.name}!`);
}

let person = { name: "John" };
const printMessage =  greet.bind(person);
printMessage() // Output: Hello, John!
/* 
    In this example, we create a bound function printMessage that always runs in the context of the person object, ensuring that `this` refers to person:
    The bind method allows us to "fix" the context of the greet function to person, making it context-independent.
 */


// Case 2 -> Partial Function Application

function multiply(factor, number) {
    return factor*number;
}

const double = multiply.bind(null, 2)
console.log(double(5)) // 10
console.log(double(6)) // 12

/* 
    bind is also valuable for creating new functions with preset arguments. In this example, we create a multiplyBy function that multiplies numbers by a preset factor:
    In this case, we’ve created a new function, double, by binding multiply with a factor argument preset to 2. This results in a reusable function that effectively doubles any number passed to it.
*/



/* Use Cases */
/* 
    call:
    1. Use call when you want to invoke a function immediately with a specific this value and individual arguments.
    2. Suitable for scenarios where you need to borrow a method from one object and execute it in the context of another.
    3. Helpful for functions with a fixed number of arguments.

    apply:
    1. Choose apply when you need to invoke a function immediately but want to pass a variable number of arguments in the form of an array.
    2. Useful when working with functions that accept variable-length argument lists.
    3. Especially handy when dealing with arrays or array-like objects.
    
    bind:
    1. Opt for bind when you want to create a new function with a preset this value and, optionally, preset arguments.
    2. Ideal for preserving context, ensuring that a function always runs in a specific context, regardless of how it’s called.
    3. Useful for partial function application, where you create specialized functions by fixing some arguments.

*/
