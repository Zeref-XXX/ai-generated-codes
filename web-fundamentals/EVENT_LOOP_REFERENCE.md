╔════════════════════════════════════════════════════════════════════════════╗
║          EVENT LOOP & EXECUTION CONTEXT - QUICK REFERENCE CARD              ║
║                    Condensed Guide to Key Topics                            ║
╚════════════════════════════════════════════════════════════════════════════╝

═══════════════════════════════════════════════════════════════════════════════
THE EVENT LOOP - SIMPLIFIED
═══════════════════════════════════════════════════════════════════════════════

COMPONENTS:
────────────────────────────────────────────────────────────────────────────
1. CALL STACK - Where code executes
2. WEB APIS - Browser features (setTimeout, fetch, etc.)
3. CALLBACK QUEUE - Where macrotasks wait
4. MICROTASK QUEUE - Where promises wait
5. EVENT LOOP - Moves callbacks to stack


EXECUTION ORDER (THE GOLDEN RULE):
────────────────────────────────────────────────────────────────────────────
1. Execute all SYNCHRONOUS code (call stack)
   console.log("1");      // Executes immediately
   
2. When stack is empty, execute all MICROTASKS (promises, queueMicrotask)
   Promise.resolve().then(() => console.log("3"));  // Higher priority
   
3. Execute ONE MACROTASK (setTimeout, setInterval)
   setTimeout(() => console.log("2"), 0);  // Lower priority
   
4. Go back to step 2


THE FAMOUS EXAMPLE:
────────────────────────────────────────────────────────────────────────────
console.log("1");                          // 1 - Sync
setTimeout(() => console.log("2"), 0);     // 2 - Macrotask
Promise.resolve().then(() => console.log("3")); // 3 - Microtask
console.log("4");                          // 4 - Sync

OUTPUT: 1, 4, 3, 2

WHY?
  1. Console.log("1") → Sync, executes first
  2. setTimeout → Goes to callback queue (macrotask)
  3. Promise → Goes to microtask queue (higher priority!)
  4. console.log("4") → Sync, executes immediately
  5. Stack empty → Check microtask queue → Execute promise
  6. Microtask queue empty → Check callback queue → Execute setTimeout


PRIORITY VISUAL:
────────────────────────────────────────────────────────────────────────────
┌─────────────────────────────────────────┐
│ SYNCHRONOUS CODE (Highest Priority) ↓ 1 │
├─────────────────────────────────────────┤
│ MICROTASK QUEUE (2nd Priority)      ↓ 2 │
│ • Promises (.then, .catch, .finally)   │
│ • queueMicrotask()                      │
│ • MutationObserver                      │
├─────────────────────────────────────────┤
│ RENDER (UI update if needed)        ↓ 3 │
├─────────────────────────────────────────┤
│ MACROTASK QUEUE (Lowest Priority)   ↓ 4 │
│ • setTimeout / setInterval              │
│ • setImmediate (Node.js)                │
│ • I/O operations                        │
│ • UI events                             │
└─────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════════════
EXECUTION CONTEXT
═══════════════════════════════════════════════════════════════════════════════

WHAT IS IT?
────────────────────────────────────────────────────────────────────────────
An execution context is the environment where code runs. Each function call
creates its own context with:
  • Variables
  • Parameters
  • Scope
  • 'this' binding


TYPES OF EXECUTION CONTEXTS:
────────────────────────────────────────────────────────────────────────────
1. GLOBAL EXECUTION CONTEXT (GEC)
   • Created when JavaScript starts
   • window object (browser) / global object (Node.js)
   • Global variables stored here

2. FUNCTION EXECUTION CONTEXT (FEC)
   • Created when function is called
   • Has its own scope
   • Variables local to function
   • Access to global scope

3. BLOCK EXECUTION CONTEXT
   • Created by { } with let/const
   • Block scope (not function scope)
   • ReferenceError if accessed outside


EXECUTION CONTEXT STACK:
────────────────────────────────────────────────────────────────────────────
JavaScript uses a call stack to manage contexts:

function outer() {
  function inner() {
    console.log("inside");
  }
  inner();  // Stack: Global → outer → inner
}
outer();    // Stack: Global → outer

// Inner finishes, removed from stack
// Outer finishes, removed from stack
// Only Global remains


═══════════════════════════════════════════════════════════════════════════════
SCOPE & SCOPE CHAIN
═══════════════════════════════════════════════════════════════════════════════

SCOPE TYPES:
────────────────────────────────────────────────────────────────────────────
1. GLOBAL SCOPE
   // Variables accessible everywhere
   const globalVar = "visible everywhere";

2. FUNCTION SCOPE (Function creates new scope)
   function myFunc() {
     const localVar = "only here"; // Not accessible outside
   }

3. BLOCK SCOPE (let/const have block scope)
   {
     let blockVar = "only in block";
     const blockConst = "only in block";
   }
   // blockVar not accessible here!
   
   // Var does NOT have block scope (use let/const instead!)
   {
     var oldWay = "accessible outside"; // Bad!
   }


SCOPE CHAIN:
────────────────────────────────────────────────────────────────────────────
When looking for a variable:
1. Check current scope
2. If not found, check parent scope
3. Continue up to global scope
4. If still not found: ReferenceError

Example:
  const global = "global";
  
  function outer() {
    const outerVar = "outer";
    
    function inner() {
      const innerVar = "inner";
      console.log(innerVar);  // Found in inner scope
      console.log(outerVar);  // Found in outer scope (via chain)
      console.log(global);    // Found in global scope (via chain)
    }
    inner();
  }


═══════════════════════════════════════════════════════════════════════════════
CLOSURES - FUNCTIONS THAT REMEMBER SCOPE
═══════════════════════════════════════════════════════════════════════════════

WHAT IS A CLOSURE?
────────────────────────────────────────────────────────────────────────────
A function that has access to variables from its outer scope,
even after the outer function has returned.


SIMPLE EXAMPLE:
────────────────────────────────────────────────────────────────────────────
function makeCounter() {
  let count = 0;  // Outer variable
  
  return function() {
    count++;
    return count;
  };
}

const counter = makeCounter();
console.log(counter());  // 1
console.log(counter());  // 2
console.log(counter());  // 3

// The returned function "closes over" the count variable
// Even though makeCounter finished, count is still accessible!


REAL-WORLD PATTERN - PRIVATE VARIABLES:
────────────────────────────────────────────────────────────────────────────
function createBankAccount(initialBalance) {
  let balance = initialBalance;  // Private variable
  
  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      balance -= amount;
      return balance;
    },
    getBalance() {
      return balance;
    }
  };
}

const account = createBankAccount(1000);
account.deposit(500);    // 1500
account.withdraw(200);   // 1300
// Can't access balance directly - it's private!


═══════════════════════════════════════════════════════════════════════════════
HOISTING - DECLARATIONS MOVED TO TOP
═══════════════════════════════════════════════════════════════════════════════

VAR HOISTING:
────────────────────────────────────────────────────────────────────────────
console.log(x);  // undefined (not an error!)
var x = 5;
console.log(x);  // 5

// JavaScript interprets this as:
// var x;
// console.log(x);  // undefined
// x = 5;
// console.log(x);  // 5


LET/CONST HOISTING (Temporal Dead Zone):
────────────────────────────────────────────────────────────────────────────
console.log(y);  // ReferenceError! (not undefined)
let y = 5;

// let is hoisted but NOT initialized
// Period from block entry to declaration = Temporal Dead Zone
// Accessing variable in TDZ = ReferenceError


FUNCTION HOISTING:
────────────────────────────────────────────────────────────────────────────
sayHello();  // Works! "Hello"
function sayHello() {
  console.log("Hello");
}

// Function declarations fully hoisted


FUNCTION EXPRESSION NOT HOISTED:
────────────────────────────────────────────────────────────────────────────
sayBye();  // TypeError: sayBye is not a function
const sayBye = function() {
  console.log("Bye");
};

// Only the variable is hoisted (as let/const)
// Function assignment happens later


TAKEAWAY: Use let/const, avoid var!
────────────────────────────────────────────────────────────────────────────
✓ Use const by default
✓ Use let when you need to reassign
✗ Avoid var (legacy, confusing)


═══════════════════════════════════════════════════════════════════════════════
THIS BINDING - WHAT DOES 'THIS' REFER TO?
═══════════════════════════════════════════════════════════════════════════════

1. GLOBAL CONTEXT:
   console.log(this);  // window (browser) or global (Node.js)


2. METHOD (Function as object property):
   const obj = {
     name: "Alice",
     greet: function() {
       console.log(this.name);  // "Alice" - 'this' = obj
     }
   };
   obj.greet();


3. CONSTRUCTOR (new keyword):
   function User(name) {
     this.name = name;  // 'this' = new instance
   }
   const user = new User("Bob");


4. EXPLICIT BINDING (call, apply, bind):
   function greet() {
     console.log(this.name);
   }
   const person = { name: "Charlie" };
   greet.call(person);      // "Charlie"
   greet.apply(person);     // "Charlie"
   const boundFunc = greet.bind(person);
   boundFunc();            // "Charlie"


5. ARROW FUNCTIONS (Different!):
   const obj = {
     name: "David",
     greet: () => {
       console.log(this);  // NOT obj! Inherits from parent scope
     }
   };
   // Don't use arrow functions for object methods!
   
   // Use regular functions for methods:
   const obj2 = {
     name: "Eve",
     greet: function() {
       console.log(this.name);  // "Eve" - correct!
     }
   };


═══════════════════════════════════════════════════════════════════════════════
QUICK COMPARISON TABLE
═══════════════════════════════════════════════════════════════════════════════

FEATURE           VAR      LET      CONST
────────────────────────────────────────────────────────────────────────────
Scope             Function Block   Block
Hoisting          Yes*     Yes**   Yes**
Can reassign      Yes      Yes     No
Can redeclare     Yes      No      No
Temporal Dead Zone No       Yes     Yes
Use by default    ✗        ✓       ✓✓

* Hoisted and initialized to undefined
** Hoisted but not initialized (TDZ)


═══════════════════════════════════════════════════════════════════════════════
INTERVIEW QUESTIONS YOU'LL GET
═══════════════════════════════════════════════════════════════════════════════

1. WHAT IS THE EVENT LOOP?
   → How JavaScript handles async operations
   → Order of execution (sync → microtask → macrotask)

2. WHY DOES PROMISE EXECUTE BEFORE SETTIMEOUT?
   → Promises use microtask queue (higher priority)
   → setTimeout uses callback queue (lower priority)

3. WHAT IS A CLOSURE?
   → Function with access to outer scope
   → Even after outer function returns

4. WHAT IS HOISTING?
   → Declarations moved to top of scope
   → var initialized to undefined, let/const not initialized

5. WHAT IS TEMPORAL DEAD ZONE?
   → Period from scope entry to variable declaration
   → Accessing variable throws ReferenceError

6. WHAT IS EXECUTION CONTEXT?
   → Environment where code runs
   → Each function call creates new context

7. EXPLAIN 'THIS' BINDING
   → Depends on how function is called
   → 5 different cases

8. DIFFERENCE BETWEEN VAR, LET, CONST?
   → Scope: var (function), let/const (block)
   → Hoisting: Different behaviors
   → Reassignment: var/let (yes), const (no)


═══════════════════════════════════════════════════════════════════════════════
DEBUGGING TIPS
═══════════════════════════════════════════════════════════════════════════════

EVENT LOOP DEBUGGING:
────────────────────────────────────────────────────────────────────────────
console.log("Start");
setTimeout(() => console.log("Timeout"), 0);
Promise.resolve().then(() => console.log("Promise"));
console.log("End");

// Output: Start, End, Promise, Timeout
// Add console.logs to see order!

// Use loupe.tools to visualize event loop


CLOSURE DEBUGGING:
────────────────────────────────────────────────────────────────────────────
function createCounter() {
  let count = 0;
  
  return function() {
    count++;
    console.log("Count:", count);  // See if closure works
    return count;
  };
}

const counter = createCounter();
counter();  // Check if count increases


HOISTING DEBUGGING:
────────────────────────────────────────────────────────────────────────────
// Use strict mode to catch errors
"use strict";

console.log(x);  // ReferenceError (better than undefined)
var x = 5;

// Always declare variables before using them!


THIS BINDING DEBUGGING:
────────────────────────────────────────────────────────────────────────────
function show() {
  console.log("This is:", this);
}

show();                      // this = global (or undefined in strict)
const obj = { show: show };
obj.show();                  // this = obj
show.call({ name: "test" }); // this = { name: "test" }


═══════════════════════════════════════════════════════════════════════════════
MEMORY GUIDE
═══════════════════════════════════════════════════════════════════════════════

Remember these 5 words:
1. SYNC - Executes immediately
2. MICRO - Promises (higher priority)
3. MACRO - setTimeout (lower priority)
4. CONTEXT - Environment where code runs
5. CLOSURE - Function remembers scope

Everything else follows from these!


═══════════════════════════════════════════════════════════════════════════════
Bookmark this page and reference it while studying! 📚
