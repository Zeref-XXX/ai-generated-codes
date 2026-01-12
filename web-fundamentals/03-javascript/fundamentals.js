/**
 * 📚 STEP 3️⃣  - JAVASCRIPT FUNDAMENTALS: CORE CONCEPTS
 * 
 * PREREQUISITE: All CSS files (selectors, layouts, animations)
 * TIME TO COMPLETE: 3-4 days
 * DIFFICULTY: Beginner to Intermediate
 * 
 * WHAT YOU'LL LEARN:
 * • Core JavaScript language features
 * • Variables and data types
 * • Functions and function scope
 * • Objects and arrays
 * • Array methods (map, filter, reduce)
 * • Closures and the scope chain
 * • Hoisting and temporal dead zone
 * 
 * KEY CONCEPTS TO UNDERSTAND:
 * 1. Variables: const (preferred), let, var (avoid)
 * 2. Types: string, number, boolean, null, undefined, object, symbol
 * 3. Functions: How code is organized and reused
 * 4. Scope: What variables are accessible where
 * 5. Closures: Functions that have access to outer scope
 * 6. Hoisting: How declarations are moved to top
 * 7. Array methods: Functional way to transform data
 * 
 * LEARNING PATH FOR THIS FILE:
 * 1. Start with variables and types
 * 2. Learn functions (most important!)
 * 3. Understand scope and hoisting
 * 4. Master objects and arrays
 * 5. Practice array methods repeatedly
 * 6. Understand closures deeply
 * 7. Learn destructuring
 * 
 * IMPORTANT LEARNING NOTES:
 * • Use const by default, let when reassignment needed
 * • Always use strict equality (===) not loose (==)
 * • Functions are first-class objects - you can pass them around
 * • Array methods are powerful - understand map/filter/reduce well
 * • Closures are used everywhere - understand them!
 * • Hoisting can be confusing - that's why we use let/const
 * 
 * COMMON MISTAKES TO AVOID:
 * 1. Using var instead of const/let
 * 2. Using == instead of ===
 * 3. Not understanding scope
 * 4. Forgetting that functions create a new scope
 * 5. Not understanding how this keyword works
 * 6. Callback hell (we'll learn async/await to fix this)
 * 
 * PRACTICE EXERCISES:
 * 1. Write functions to solve problems
 * 2. Use array methods to transform data
 * 3. Create closures for private variables
 * 4. Understand scope by console.logging values
 * 5. Use destructuring in your code
 * 
 * NEXT STEPS AFTER THIS FILE:
 * → Move to dom-manipulation.js to use JavaScript with HTML/CSS
 * → Then advanced-concepts.js for complex patterns
 * → Finally TypeScript to add type safety
 */

// ===== VARIABLES AND DATA TYPES =====

// Variable declaration
var oldWay = "avoid using var"; // Function-scoped (legacy)
let blockScoped = "use let"; // Block-scoped, can be reassigned
const constant = "use const"; // Block-scoped, cannot be reassigned

// Primitive data types
const string = "Hello, World!";
const number = 42;
const bigInt = 123456789012345678901234567890n; // BigInt
const boolean = true;
const undefined_var = undefined;
const null_var = null;
const symbol = Symbol("unique");

// Type coercion
console.log("5" + 3); // "53" (string concatenation)
console.log("5" - 3); // 2 (numeric conversion)
console.log(true + 1); // 2 (true converts to 1)
console.log(Boolean(0)); // false
console.log(Boolean("text")); // true

// ===== OBJECTS AND ARRAYS =====

// Object literal
const person = {
  name: "John",
  age: 30,
  city: "New York",
  greet: function() {
    return `Hello, I'm ${this.name}`;
  }
};

// Array
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, "two", true, { key: "value" }];

// ===== FUNCTIONS =====

// Function declaration
function add(a, b) {
  return a + b;
}

// Function expression
const multiply = function(a, b) {
  return a * b;
};

// Arrow function
const subtract = (a, b) => a - b;

// Arrow function with multiple statements
const divide = (a, b) => {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
};

// Default parameters
function greet(name = "Guest") {
  return `Hello, ${name}!`;
}

// Rest parameters
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}

// Spread operator
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }

// Destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
const { name, age } = person;
const { x = 0, y = 0 } = { x: 10 }; // Default values

// ===== CLOSURES =====
// Function that returns another function with access to outer scope

function outer(x) {
  return function inner(y) {
    return x + y; // Accesses x from outer function
  };
}

const addFive = outer(5);
console.log(addFive(3)); // 8

// Counter example
function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2

// ===== HIGHER-ORDER FUNCTIONS =====
// Functions that take or return other functions

function map(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i]));
  }
  return result;
}

const doubled = map([1, 2, 3], x => x * 2); // [2, 4, 6]

// Function composition
const compose = (f, g) => x => f(g(x));
const addOne = x => x + 1;
const double = x => x * 2;
const addOneThenDouble = compose(double, addOne);
console.log(addOneThenDouble(5)); // (5 + 1) * 2 = 12

// ===== ARRAY METHODS =====

const nums = [1, 2, 3, 4, 5];

// Map - transform each element
const squared = nums.map(n => n * n); // [1, 4, 9, 16, 25]

// Filter - keep elements matching condition
const evens = nums.filter(n => n % 2 === 0); // [2, 4]

// Reduce - accumulate values
const sum_result = nums.reduce((acc, n) => acc + n, 0); // 15

// Find - get first matching element
const firstEven = nums.find(n => n % 2 === 0); // 2

// Some/Every - boolean checks
const hasEven = nums.some(n => n % 2 === 0); // true
const allPositive = nums.every(n => n > 0); // true

// ForEach - execute function for each element
nums.forEach((n, i) => console.log(`Index ${i}: ${n}`));

// Includes - check if element exists
const hasFive = nums.includes(5); // true

// ===== OBJECTS =====

// Object methods
const obj = { a: 1, b: 2, c: 3 };

Object.keys(obj); // ["a", "b", "c"]
Object.values(obj); // [1, 2, 3]
Object.entries(obj); // [["a", 1], ["b", 2], ["c", 3]]

// Object.assign - merge objects
const merged = Object.assign({}, obj, { d: 4 });

// Object.freeze - prevent modifications
const frozen = Object.freeze(obj);
// frozen.a = 10; // TypeError

// Object.seal - prevent adding/removing properties
const sealed = Object.seal(obj);
// sealed.d = 4; // TypeError

// ===== THIS KEYWORD =====

const user = {
  name: "Alice",
  age: 25,
  getInfo: function() {
    return `${this.name} is ${this.age}`;
  },
  // Arrow function doesn't have own 'this'
  getInfoArrow: () => {
    return `${this.name}`; // 'this' refers to outer scope
  }
};

console.log(user.getInfo()); // "Alice is 25"

// Explicit context binding
const getInfo = user.getInfo;
console.log(getInfo.call(user)); // "Alice is 25"
console.log(getInfo.apply(user, [])); // "Alice is 25"
const boundGetInfo = getInfo.bind(user);
console.log(boundGetInfo()); // "Alice is 25"

// ===== CALLBACKS AND PROMISES =====

// Callback function
function fetchData(callback) {
  setTimeout(() => {
    callback(null, { id: 1, name: "John" });
  }, 1000);
}

fetchData((error, data) => {
  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }
});

// Promise - better alternative to callbacks
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      resolve("Success!");
    } else {
      reject("Error!");
    }
  }, 1000);
});

promise
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log("Done"));

// Promise.all - wait for all promises
Promise.all([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3)
]).then(results => console.log(results)); // [1, 2, 3]

// Promise.race - wait for first promise
Promise.race([
  Promise.resolve(1),
  Promise.resolve(2)
]).then(result => console.log(result)); // 1

// ===== ASYNC/AWAIT =====
// Syntactic sugar over promises

async function getData() {
  try {
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

// Async function always returns a promise
getData().then(data => console.log(data));

// Parallel async operations
async function getMultiple() {
  const [data1, data2, data3] = await Promise.all([
    fetch("url1").then(r => r.json()),
    fetch("url2").then(r => r.json()),
    fetch("url3").then(r => r.json())
  ]);
  return { data1, data2, data3 };
}

// ===== SCOPE AND HOISTING =====

// Hoisting - var and function declarations are hoisted
console.log(hoistedVar); // undefined (declaration hoisted, not assignment)
var hoistedVar = "value";

// let and const are hoisted but not initialized (temporal dead zone)
// console.log(hoistedLet); // ReferenceError
let hoistedLet = "value";

hoistedFunction(); // Works! Function declarations are fully hoisted
function hoistedFunction() {
  console.log("Function hoisted");
}

// Function expressions are not hoisted
// notHoisted(); // TypeError
const notHoisted = function() {
  console.log("Not hoisted");
};

// Scope chain
const globalVar = "global";

{
  const blockVar = "block";
  
  function innerFunc() {
    const funcVar = "function";
    console.log(globalVar); // Accesses global scope
    console.log(blockVar); // Accesses block scope
  }
}

// ===== MODULES (ES6) =====
// export const myExport = "value";
// export function myFunction() {}
// export class MyClass {}
// export default MyComponent;

// import MyComponent from "./module.js";
// import { myExport, myFunction } from "./module.js";
// import * as Module from "./module.js";

// ===== ERROR HANDLING =====

try {
  throw new Error("Something went wrong");
} catch (error) {
  console.error(error.message);
  console.error(error.stack);
} finally {
  console.log("Cleanup code");
}

// Custom error class
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

try {
  throw new ValidationError("Invalid input");
} catch (error) {
  if (error instanceof ValidationError) {
    console.log("Validation failed:", error.message);
  }
}

// ===== REGULAR EXPRESSIONS =====

const regex = /hello/i; // case-insensitive
const regex2 = new RegExp("hello", "i");

"Hello World".match(/hello/i); // Matches
"Hello World".test(/hello/i); // true
"Hello World".replace(/hello/i, "Hi"); // "Hi World"
"a,b,c".split(","); // ["a", "b", "c"]

// Pattern examples
/\d+/; // One or more digits
/[a-z]+/; // One or more lowercase letters
/^start/; // Starts with "start"
/end$/; // Ends with "end"
/\w+/; // One or more word characters
/.+/; // Any character one or more times
/(a|b|c)/; // a or b or c

// ===== JSON =====

const jsonString = '{"name":"John","age":30}';
const parsed = JSON.parse(jsonString); // Convert to object
const stringified = JSON.stringify(parsed); // Convert to JSON string

// With replacer and spaces
JSON.stringify(parsed, null, 2); // Pretty-printed with 2 spaces
