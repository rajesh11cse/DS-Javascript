/* 

Prototype in JavaScript

    JavaScript is a prototype based language, so, whenever we create a function using JavaScript, 
    JavaScript engine adds a prototype property inside a function, Prototype property is basically an object (also known as Prototype object), 
    where we can attach methods and properties in a prototype object, 
    which enables all the other objects to inherit these methods and properties. 
    
    1. Everything in Javascript is an object (except the primitive types)
    2. Every object has a prototype
    3. The default prototype of an object is Object.prototype
    4. When a property is accessed on an object, the object looks at its own properties.
    If not found then it looks at its prototype’s properties. And it continues to do so unless either the property is found
    or it reached the Object.prototype. If the property is not found in the Object.prototype, undefined is returned.

*/

/* 
    The difference between `__proto__` and `prototype` is simple: `__proto__` is a property of an object instance,
    while `prototype` is a property of a constructor function.
*/

/* __proto__ vs prototype */

/* prtotype */
/* 
    1. prototype is a property of constructor functions. It is used to define properties and methods 
       that should be inherited by all instances created from that constructor.
*/

// Constructor function
function Person(name) {
    this.name = name;
}

// Adding a method to the prototype
Person.prototype.sayHello = function() {
    console.log("Hello, my name is " + this.name);
};

// Creating an instance of Person
const john = new Person("John");

// Using the inherited method
john.sayHello(); // Output: "Hello, my name is John"

// Verifying the prototype
console.log(john.__proto__ === Person.prototype); // true


/* __proto_ */
/* 
    1. __proto__ is a property of all objects (except Object.prototype) that points to its prototype. 
       It represents the actual link to the prototype object from which the object inherits properties.
*/
// Example


/* 
    So if animal has a lot of useful properties and methods, then they become automatically available in rabbit. 
    Such properties are called “inherited”.
*/
// Create an object with some properties
const animal = {
    eats: true,
    walk() {
        alert("Animal walk");
    }
};

// Create another object and set its prototype to the first object
const rabbit = {
    jumps: true
    // OR __proto__ = animal
};
rabbit.__proto__ = animal;


// Accessing properties from the prototype
console.log(rabbit.eats); // Output: true
console.log(rabbit.jumps); // Output: true
// walk is taken from the prototype chain
rabbit.walk(); // Animal walk

// Verifying the prototype
console.log(rabbit.__proto__ === animal); // true





/* prtotype - Setting and Getting */
/* 
    2. prototype: Automatically set on function objects when they are created.
       You typically don't change this reference directly but rather add properties to it.
*/

const obj = {};
const proto = { greeting: "Hello" };

Object.setPrototypeOf(obj, proto);

Object.getPrototypeOf(proto); // Object { }
console.log(obj.greeting); // "Hello"


/* __proto_ */
/* 
    2. __proto__: Can be set and changed directly, although it's not recommended to modify it directly due to performance reasons. 
       It can also be accessed using Object.getPrototypeOf and Object.setPrototypeOf.
    
       __proto__ is a property of an object that points to its prototype. 
       This property is used internally by the JavaScript engine to search for properties and methods
       on an object's prototype chain.

*/



/* Object.prototype || Native prototypes */

let obj = {};
alert( obj ); // "[object Object]" ?

/// short notation obj = {} is the same as obj = new Object() 



let obj = {};

alert(obj.__proto__ === Object.prototype); // true

alert(obj.toString === obj.__proto__.toString); //true
alert(obj.toString === Object.prototype.toString); //true

alert(Object.prototype.__proto__); // null


// Example
let arr = [1, 2, 3];

// it inherits from Array.prototype?
alert( arr.__proto__ === Array.prototype ); // true

// then from Object.prototype?
alert( arr.__proto__.__proto__ === Object.prototype ); // true

// and null on the top.
alert( arr.__proto__.__proto__.__proto__ ); // null