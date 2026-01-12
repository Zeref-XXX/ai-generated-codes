/**
 * 📚 STEP 3️⃣  - JAVASCRIPT FUNDAMENTALS: ADVANCED CONCEPTS
 * 
 * PREREQUISITE: DOM manipulation.js
 * TIME TO COMPLETE: 3-4 days
 * DIFFICULTY: Intermediate to Advanced
 * 
 * WHAT YOU'LL LEARN:
 * • Prototypes and prototype chain
 * • Constructor functions and ES6 classes
 * • Inheritance patterns
 * • Closures in depth
 * • Higher-order functions
 * • Functional programming concepts
 * • Generators and iterators
 * • Advanced operators and keywords
 * • Design patterns
 * 
 * KEY CONCEPTS TO UNDERSTAND:
 * 1. Prototypes: How inheritance works in JavaScript
 * 2. Classes: Modern syntax for object creation
 * 3. Closures: Functions with access to outer scope
 * 4. Higher-order functions: Functions that take/return functions
 * 5. Functional programming: Data transformation approach
 * 6. Generators: Functions that can pause and resume
 * 7. Symbols: Unique, immutable values
 * 8. Proxy: Intercept and customize object operations
 * 
 * LEARNING PATH FOR THIS FILE:
 * 1. Understand prototypes (hard concept, take time!)
 * 2. Learn constructor functions
 * 3. Compare to ES6 classes (classes are preferred)
 * 4. Learn inheritance patterns
 * 5. Master closures (they're everywhere)
 * 6. Learn higher-order functions
 * 7. Understand functional programming
 * 8. Learn generators if you're ready
 * 
 * WHY THESE ARE "ADVANCED":
 * • Prototypes are how JavaScript really works
 * • Classes are syntactic sugar over prototypes
 * • Closures require mental model of scope
 * • Higher-order functions are powerful but not obvious
 * • Generators can be complex to understand
 * • These patterns are used in libraries/frameworks
 * 
 * IMPORTANT LEARNING NOTES:
 * • ES6 classes are modern way - constructor functions are old
 * • Use class syntax in your code (cleaner, easier to understand)
 * • Prototypes are still important to understand why classes work
 * • Closures are core to JavaScript - understand them deeply
 * • Higher-order functions are how functional programming works
 * • You'll see these patterns in React, Vue, frameworks
 * 
 * THIS KEYWORD RULES:
 * 1. In function: depends on how called (call/apply/bind)
 * 2. In method: the object it's called on
 * 3. In arrow function: the surrounding scope
 * 4. In class: the instance
 * 5. Standalone: undefined (strict) or global (non-strict)
 * 
 * PRACTICAL SCENARIOS YOU'LL BUILD:
 * 1. Create reusable classes for objects
 * 2. Create inheritance hierarchies
 * 3. Use closures for private variables
 * 4. Create higher-order functions like debounce, throttle
 * 5. Write functional code with compose, pipe
 * 6. Create custom iterators
 * 7. Use Proxy for validation or caching
 * 
 * COMMON MISTAKES TO AVOID:
 * 1. Not understanding this binding
 * 2. Confusing prototype chain
 * 3. Creating memory leaks with closures
 * 4. Overusing complex patterns when simple works
 * 5. Not understanding when functions are called
 * 6. Forgetting arrow functions have different this
 * 
 * NEXT STEPS AFTER THIS FILE:
 * → Move to TypeScript fundamentals.ts for type-safe patterns
 * → Then TypeScript advanced-patterns.ts for design patterns
 * → Apply these concepts in frameworks (React, Vue, etc.)
 */

// ===== PROTOTYPES AND PROTOTYPE CHAIN =====

// Every object has a prototype (prototype chain)
const obj = {};
Object.getPrototypeOf(obj); // Object.prototype

// Constructor function (old way of creating "classes")
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(`${this.name} makes a sound`);
};

const dog = new Animal("Dog");
dog.speak(); // "Dog makes a sound"

// Prototype chain: dog -> Animal.prototype -> Object.prototype -> null
Object.getPrototypeOf(dog); // Animal.prototype
Object.getPrototypeOf(Object.getPrototypeOf(dog)); // Object.prototype

// Inheritance via prototype
function Dog(name, breed) {
  Animal.call(this, name); // Call parent constructor
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype); // Set up inheritance
Dog.prototype.constructor = Dog; // Fix constructor reference

Dog.prototype.bark = function() {
  console.log(`${this.name} barks!`);
};

const myDog = new Dog("Rex", "Golden Retriever");
myDog.speak(); // Inherited from Animal
myDog.bark(); // Own method

// ===== ES6 CLASSES =====

class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound`);
  }

  static info() {
    console.log("This is the Animal class");
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Call parent constructor
    this.breed = breed;
  }

  speak() {
    console.log(`${this.name} barks!`);
  }

  getInfo() {
    return `${this.name} is a ${this.breed}`;
  }
}

const dog = new Dog("Rex", "Golden");
dog.speak(); // "Rex barks!"
Dog.info(); // "This is the Animal class"

// Private fields (ES2022)
class Person {
  #age; // Private field
  #socialSecurity; // Private field

  constructor(name, age) {
    this.name = name;
    this.#age = age;
  }

  getAge() {
    return this.#age; // Can access inside class
  }
}

const person = new Person("John", 30);
// person.#age; // SyntaxError
person.getAge(); // 30

// Getters and Setters
class Rectangle {
  constructor(width, height) {
    this._width = width;
    this._height = height;
  }

  get area() {
    return this._width * this._height;
  }

  set width(value) {
    if (value <= 0) throw new Error("Width must be positive");
    this._width = value;
  }

  get width() {
    return this._width;
  }
}

const rect = new Rectangle(10, 5);
rect.area; // 50
rect.width = 20; // Uses setter
rect.width; // 20

// ===== OBJECT-ORIENTED PATTERNS =====

// Encapsulation
class BankAccount {
  #balance = 0;

  deposit(amount) {
    if (amount <= 0) throw new Error("Amount must be positive");
    this.#balance += amount;
  }

  withdraw(amount) {
    if (amount > this.#balance) throw new Error("Insufficient funds");
    this.#balance -= amount;
  }

  getBalance() {
    return this.#balance;
  }
}

// Polymorphism
class Shape {
  getArea() {
    throw new Error("getArea must be implemented");
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  getArea() {
    return Math.PI * this.radius ** 2;
  }
}

class Square extends Shape {
  constructor(side) {
    super();
    this.side = side;
  }

  getArea() {
    return this.side ** 2;
  }
}

// Abstraction
function calculateTotalArea(shapes) {
  return shapes.reduce((sum, shape) => sum + shape.getArea(), 0);
}

calculateTotalArea([
  new Circle(5),
  new Square(4)
]);

// ===== OPERATORS =====

// Arithmetic operators
const a = 10;
const b = 3;
a + b; // 13
a - b; // 7
a * b; // 30
a / b; // 3.33...
a % b; // 1 (modulo)
a ** b; // 1000 (exponentiation)
++a; // Increment
--a; // Decrement

// Assignment operators
let x = 10;
x += 5; // x = 15
x -= 3; // x = 12
x *= 2; // x = 24
x /= 4; // x = 6
x %= 2; // x = 0
x **= 2; // x = 0
x ||= 10; // x = 10 (assign if falsy)
x &&= 5; // x = 5 (assign if truthy)
x ??= 0; // x = 5 (assign if null/undefined)

// Comparison operators
5 == "5"; // true (loose equality)
5 === "5"; // false (strict equality)
5 != "5"; // false
5 !== "5"; // true
5 < 10; // true
5 <= 5; // true
5 > 3; // true
5 >= 5; // true

// Logical operators
true && false; // false
true || false; // true
!true; // false

// Nullish coalescing operator
null ?? "default"; // "default"
undefined ?? "default"; // "default"
0 ?? "default"; // 0
"" ?? "default"; // ""

// Optional chaining operator
const obj = { a: { b: { c: 5 } } };
obj?.a?.b?.c; // 5
obj?.d?.e?.f; // undefined (no error)

// Ternary operator
condition ? valueIfTrue : valueIfFalse;

// typeof operator
typeof 5; // "number"
typeof "text"; // "string"
typeof true; // "boolean"
typeof undefined; // "undefined"
typeof {}; // "object"
typeof []; // "object"
typeof (() => {}); // "function"
typeof Symbol(); // "symbol"
typeof 5n; // "bigint"

// instanceof operator
[] instanceof Array; // true
{} instanceof Object; // true
new Date() instanceof Date; // true

// in operator
"name" in { name: "John" }; // true

// ===== FUNCTIONAL PROGRAMMING =====

// Pure functions (no side effects)
const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

// Currying
const curry = (fn) => {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(null, args);
    } else {
      return (...nextArgs) => curried.apply(null, args.concat(nextArgs));
    }
  };
};

const curriedAdd = curry((a, b, c) => a + b + c);
curriedAdd(1)(2)(3); // 6
curriedAdd(1, 2)(3); // 6

// Partial application
const addFive = add.bind(null, 5);
addFive(3); // 8

// Memoization
const memoize = (fn) => {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    if (key in cache) {
      return cache[key];
    }
    const result = fn.apply(null, args);
    cache[key] = result;
    return result;
  };
};

const expensiveFunc = memoize((n) => {
  console.log("Computing...");
  return n * 2;
});

expensiveFunc(5); // Computing... 10
expensiveFunc(5); // 10 (from cache, no log)

// ===== GENERATOR FUNCTIONS =====

function* simpleGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = simpleGenerator();
gen.next(); // { value: 1, done: false }
gen.next(); // { value: 2, done: false }
gen.next(); // { value: 3, done: false }
gen.next(); // { value: undefined, done: true }

// Using generators with for...of
for (const value of simpleGenerator()) {
  console.log(value); // 1, 2, 3
}

// Generator with logic
function* rangeGenerator(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

[...rangeGenerator(1, 5)]; // [1, 2, 3, 4, 5]

// Async generator
async function* asyncGenerator() {
  yield 1;
  await new Promise(resolve => setTimeout(resolve, 100));
  yield 2;
}

// ===== PROXY AND REFLECT =====

// Proxy - intercept object operations
const handler = {
  get(target, prop) {
    console.log(`Getting ${prop}`);
    return target[prop];
  },
  set(target, prop, value) {
    console.log(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const obj = {};
const proxy = new Proxy(obj, handler);
proxy.name = "John"; // "Setting name to John"
proxy.name; // "Getting name"

// Reflect - programmatic object operations
Reflect.get(obj, "name"); // Same as obj.name
Reflect.set(obj, "name", "Alice"); // Same as obj.name = "Alice"
Reflect.has(obj, "name"); // Same as "name" in obj
Reflect.deleteProperty(obj, "name"); // Same as delete obj.name
Reflect.keys(obj); // Same as Object.keys(obj)

// ===== WEAK MAPS AND WEAK SETS =====

// WeakMap - holds weak references (keys must be objects)
const weakMap = new WeakMap();
const obj1 = {};
weakMap.set(obj1, "value");
weakMap.get(obj1); // "value"
weakMap.has(obj1); // true
weakMap.delete(obj1); // true

// WeakSet - weak references
const weakSet = new WeakSet();
weakSet.add(obj1);
weakSet.has(obj1); // true
weakSet.delete(obj1); // true

// ===== SYMBOL =====

const symbol1 = Symbol("id");
const symbol2 = Symbol("id");
symbol1 === symbol2; // false (unique)

const obj = {};
obj[symbol1] = "value1";
obj[symbol2] = "value2";
Object.keys(obj); // [] (symbols are not enumerable)

// Well-known symbols
Symbol.iterator; // For making objects iterable
Symbol.hasInstance; // For instanceof
Symbol.toStringTag; // For Object.prototype.toString

// Custom iterable
const myIterable = {
  [Symbol.iterator]() {
    let count = 0;
    return {
      next: () => ({
        value: count++,
        done: count > 3
      })
    };
  }
};

[...myIterable]; // [0, 1, 2]

// ===== THIS BINDING IN DEPTH =====

const person = {
  name: "John",
  age: 30,
  getInfo() {
    return `${this.name} is ${this.age}`;
  },
  greetWithArrow: () => {
    return `Hello, ${this.name}`; // 'this' from surrounding scope
  },
  nested: {
    getName() {
      return this.name; // 'this' is nested object, not person
    }
  }
};

person.getInfo(); // "John is 30"
person.nested.getName(); // undefined (this.name doesn't exist in nested)

// Explicit binding
const unboundGetInfo = person.getInfo;
unboundGetInfo.call(person); // "John is 30"
unboundGetInfo.apply(person, []); // "John is 30"
const boundGetInfo = unboundGetInfo.bind(person);
boundGetInfo(); // "John is 30"
