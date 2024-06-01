/* 
    A callback is a function that is passed as an argument to another function and
    is executed after some operation has been completed.
    Callbacks are often used to continue execution of code after an asynchronous operation has completed,
    without blocking the main execution thread. 
*/


/* 1. Synchronous Callbacks */
// The code executes sequentially - synchronous programming.

// Without callback ----------------------------------------
console.log("start")
function devide(a, b){
    return a/b
}
function operation (a, b) {
    return devide(a, b)
}
console.log(operation(10, 5))
console.log("end")

// With callback ---------------------------------------------
console.log('Start')
function divide(a, b) {
  console.log(a / b)
}
function operation(val1, val2, callback) {
  callback(val1, val2)
}
operation(16, 4, divide)
console.log('End')

/* Benefits of callback */
// 1. Increased Flexibility --> pass any function to operation, making it highly flexible
// 2. Reduced Complexity --> The operation function doesn’t need to include logic for each possible operation. It only needs to execute the callback, making the code simpler and easier to read.
// 3. Code Reusability: --> Functions like devide, multiply, and subtract can be reused in different contexts without being tied to the operation function, enhancing code reusability.


/* 2. Asynchronous Callbacks */

// Without callback ----------------------------------------
console.log('Start');
function loginUserServer(email) {
  let user;
  setTimeout(() => {
    console.log('We have the data');
    user = { userEmail: email };
  }, 5000);
  return user;
}

const user = loginUserServer('abc@gmail.com');
console.log(user); // This will log undefined because the setTimeout has not executed yet
console.log('End');

// With callback ---------------------------------------------
console.log('Start');
function loginUserServer(email, callback) {
  setTimeout(() => {
    console.log('We have the data');
    callback({ userEmail: email });
  }, 5000);
}
const user = loginUserServerr('abc@gmail.com', (user) => {
  console.log(user); // This will log the user object after 5 seconds
});
console.log('End');


/* 3. Error-First Callbacks */
// Event callbacks are used in event-driven programming
// these callbacks take an error object as their first argument and
// the result of the operation as subsequent arguments.
// This pattern allows for straightforward error handling in asynchronous code.


/* 4. Event Callbacks */
// Event callbacks are used in event-driven programming


/* 5. Completion Callbacks */
// Completion callbacks are used to signal that a particular task has been completed.
// These are often used in scenarios where a series of operations must be performed in sequence.
function processData(data, callback) {
    // Simulate processing data
    console.log('Processing data:', data);
    // Call the callback to signal completion
    callback();
}
  
processData('sample data', function() {
    console.log('Data processing complete');
});

  


/* 5. Transform Callbacks */
// Transform callbacks are used to transform data from one form to another.
// These are often used in functional programming and data transformation pipelines.


