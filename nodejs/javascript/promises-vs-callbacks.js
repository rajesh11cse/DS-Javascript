/* Promises vs Callbacks */

https://www.geeksforgeeks.org/callbacks-vs-promises-vs-async-await/

+----------------------------+---------------------------------------------------------------+---------------------------------------------------------------+---------------------------------------------+
| Aspect                     | Callbacks                                                     | Promises                                                      | Async/Await                                 |
+----------------------------+---------------------------------------------------------------+---------------------------------------------------------------+---------------------------------------------+
| Syntax and Readability     | Leads to nested code, known as 'callback hell'.               | Cleaner and more readable, with chaining.                     | Synchronous-like code, easier to read.      |
+----------------------------+---------------------------------------------------------------+---------------------------------------------------------------+---------------------------------------------+
| Error Handling             | Errors must be handled at each level.                         | Errors can be handled in one place using .catch().             | Try/catch for synchronous-like error handling. |
+----------------------------+---------------------------------------------------------------+---------------------------------------------------------------+---------------------------------------------+
| Chaining                   | Difficult to chain, leading to deeply nested code.            | Designed for chaining, allowing sequential async operations.  | Sequential flow, easy to chain async calls. |
+----------------------------+---------------------------------------------------------------+---------------------------------------------------------------+---------------------------------------------+
| Returning Values           | Values must be passed through multiple levels.                | Values are passed through the chain.                          | Directly returns values like synchronous code. |
+----------------------------+---------------------------------------------------------------+---------------------------------------------------------------+---------------------------------------------+
| Composability              | Harder to compose multiple async operations.                  | Easily composed using Promise.all(), Promise.race(), etc.     | Easily composed with Promise.all(), Promise.race(), etc. |
+----------------------------+---------------------------------------------------------------+---------------------------------------------------------------+---------------------------------------------+
| State Management           | No built-in state management.                                 | Built-in states and methods to handle them.                   | Built-in states and methods to handle them. |
+----------------------------+---------------------------------------------------------------+---------------------------------------------------------------+---------------------------------------------+
| Error Handling Propagation | Errors must be manually propagated.                           | Errors automatically propagate through the chain.             | Errors automatically propagate and can be caught using try/catch. |
+----------------------------+---------------------------------------------------------------+---------------------------------------------------------------+---------------------------------------------+
| Inversion of Control       | Inverted control, callback is passed to async function.       | Better control by chaining and composing promises.            | Direct control flow, similar to synchronous code. |
+----------------------------+---------------------------------------------------------------+---------------------------------------------------------------+---------------------------------------------+
| Async/Await Compatibility  | Not directly compatible with async/await.                     | Work seamlessly with async/await.                             | Native support for async/await.             |
+----------------------------+---------------------------------------------------------------+---------------------------------------------------------------+---------------------------------------------+
| Built-in Methods           | Lacks built-in methods for async operations.                  | Provides methods like Promise.resolve(), Promise.reject().    | Works with Promise methods.                 |
+----------------------------+---------------------------------------------------------------+---------------------------------------------------------------+---------------------------------------------+
