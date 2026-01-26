/**
 * 📚 JAVASCRIPT CONTROL FLOW: LOOPS & CONDITIONAL STATEMENTS
 * 
 * PREREQUISITE: fundamentals.js (variables and functions)
 * TIME TO COMPLETE: 2-3 hours
 * DIFFICULTY: Beginner
 * 
 * WHAT YOU'LL LEARN:
 * • Conditional statements (if/else/else if)
 * • Switch statements
 * • Ternary operator
 * • All types of loops (for, while, do-while)
 * • Modern iteration (for...of, for...in)
 * • Loop control (break, continue)
 * • Nested loops and conditions
 * 
 * KEY CONCEPTS TO UNDERSTAND:
 * 1. Conditionals control the flow of execution based on conditions
 * 2. Loops repeat code blocks until a condition is met
 * 3. Choose the right loop for your use case
 * 4. Break and continue control loop execution
 * 
 * LEARNING PATH FOR THIS FILE:
 * 1. Master if/else statements first
 * 2. Learn switch for multiple conditions
 * 3. Practice for loops thoroughly
 * 4. Understand while and do-while
 * 5. Learn modern for...of and for...in
 * 6. Practice nested structures
 * 
 * COMMON MISTAKES TO AVOID:
 * 1. Using = (assignment) instead of === (comparison)
 * 2. Forgetting break in switch statements
 * 3. Infinite loops (always ensure exit condition)
 * 4. Using for...in on arrays (use for...of instead)
 * 5. Off-by-one errors in loop conditions
 */

// ============================================================================
// 1️⃣ CONDITIONAL STATEMENTS - IF/ELSE
// ============================================================================

// Basic if statement
function checkAge(age) {
  if (age >= 18) {
    return "Adult";
  }
  return "Minor";
}

console.log(checkAge(25)); // OUTPUT: "Adult"
console.log(checkAge(15)); // OUTPUT: "Minor"

// if...else statement
function checkTemperature(temp) {
  if (temp > 30) {
    return "Hot";
  } else {
    return "Cold or Normal";
  }
}

// if...else if...else statement
function gradeCalculator(score) {
  if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else if (score >= 60) {
    return "D";
  } else {
    return "F";
  }
}

console.log(gradeCalculator(95)); // OUTPUT: "A"
console.log(gradeCalculator(75)); // OUTPUT: "C"
console.log(gradeCalculator(55)); // OUTPUT: "F"

// Multiple conditions with logical operators
function canVote(age, isCitizen) {
  if (age >= 18 && isCitizen) {
    return "Can vote";
  } else {
    return "Cannot vote";
  }
}

console.log(canVote(20, true));  // OUTPUT: "Can vote"
console.log(canVote(20, false)); // OUTPUT: "Cannot vote"

// Complex conditions
function checkDiscount(age, isMember, purchaseAmount) {
  if ((age >= 65 || isMember) && purchaseAmount > 100) {
    return "20% discount applied";
  } else if (purchaseAmount > 100) {
    return "10% discount applied";
  } else {
    return "No discount";
  }
}

// Nested if statements
function checkAccess(role, isVerified, hasPermission) {
  if (role === "admin") {
    if (isVerified) {
      return "Full access granted";
    } else {
      return "Verification required";
    }
  } else if (role === "user") {
    if (hasPermission) {
      return "Limited access granted";
    } else {
      return "Permission denied";
    }
  } else {
    return "Invalid role";
  }
}

// ============================================================================
// 2️⃣ TERNARY OPERATOR - SHORTHAND IF/ELSE
// ============================================================================

// Basic ternary
const age = 20;
const status = age >= 18 ? "Adult" : "Minor";
console.log(status); // OUTPUT: "Adult"

// Ternary in function
function getTicketPrice(age) {
  return age < 12 ? 5 : age >= 65 ? 7 : 10;
}

console.log(getTicketPrice(10));  // OUTPUT: 5
console.log(getTicketPrice(30));  // OUTPUT: 10
console.log(getTicketPrice(70));  // OUTPUT: 7

// Ternary for assignment
const user = { name: "John", isAdmin: true };
const greeting = user.isAdmin ? "Welcome Admin!" : "Welcome User!";

// ============================================================================
// 3️⃣ SWITCH STATEMENTS - MULTIPLE CONDITIONS
// ============================================================================

// Basic switch statement
function getDayName(dayNumber) {
  switch (dayNumber) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "Invalid day";
  }
}

console.log(getDayName(0)); // OUTPUT: "Sunday"
console.log(getDayName(5)); // OUTPUT: "Friday"

// Switch with fall-through (intentional, no break)
function getSeason(month) {
  switch (month) {
    case "December":
    case "January":
    case "February":
      return "Winter";
    case "March":
    case "April":
    case "May":
      return "Spring";
    case "June":
    case "July":
    case "August":
      return "Summer";
    case "September":
    case "October":
    case "November":
      return "Fall";
    default:
      return "Invalid month";
  }
}

console.log(getSeason("January")); // OUTPUT: "Winter"
console.log(getSeason("July"));    // OUTPUT: "Summer"

// Switch with expressions
function calculate(operator, a, b) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b !== 0 ? a / b : "Division by zero";
    default:
      return "Invalid operator";
  }
}

console.log(calculate("+", 5, 3)); // OUTPUT: 8
console.log(calculate("*", 4, 7)); // OUTPUT: 28

// ============================================================================
// 4️⃣ FOR LOOPS - MOST COMMON LOOP
// ============================================================================

// Basic for loop
console.log("Count from 1 to 5:");
for (let i = 1; i <= 5; i++) {
  console.log(i); // OUTPUT: 1, 2, 3, 4, 5 (each on new line)
}

// Loop through array
const fruits = ["apple", "banana", "cherry"];
for (let i = 0; i < fruits.length; i++) {
  console.log(`Index ${i}: ${fruits[i]}`);
  // OUTPUT: Index 0: apple, Index 1: banana, Index 2: cherry
}

// Loop in reverse
console.log("Countdown:");
for (let i = 5; i >= 1; i--) {
  console.log(i); // OUTPUT: 5, 4, 3, 2, 1
}
console.log("Blast off!"); // OUTPUT: "Blast off!"

// Loop with step
console.log("Even numbers from 0 to 10:");
for (let i = 0; i <= 10; i += 2) {
  console.log(i); // OUTPUT: 0, 2, 4, 6, 8, 10
}

// Nested for loops
console.log("Multiplication table (1-5):");
for (let i = 1; i <= 5; i++) {
  let row = "";
  for (let j = 1; j <= 5; j++) {
    row += `${i * j}\t`;
  }
  console.log(row);
  // OUTPUT: 1 2 3 4 5 / 2 4 6 8 10 / 3 6 9 12 15 / etc.
}

// Loop with array methods
const numbers = [1, 2, 3, 4, 5];
let sum = 0;
for (let i = 0; i < numbers.length; i++) {
  sum += numbers[i];
}
console.log(`Sum: ${sum}`); // OUTPUT: "Sum: 15"

// ============================================================================
// 5️⃣ WHILE LOOPS - CONDITION-BASED ITERATION
// ============================================================================

// Basic while loop
let count = 1;
while (count <= 5) {
  console.log(`Count: ${count}`); // OUTPUT: Count: 1, Count: 2, ... Count: 5
  count++;
}

// While loop with array
const items = ["a", "b", "c"];
let index = 0;
while (index < items.length) {
  console.log(items[index]); // OUTPUT: a, b, c
  index++;
}

// While loop for unknown iterations
function findFirstEven(numbers) {
  let i = 0;
  while (i < numbers.length) {
    if (numbers[i] % 2 === 0) {
      return numbers[i];
    }
    i++;
  }
  return null;
}

console.log(findFirstEven([1, 3, 7, 8, 9])); // OUTPUT: 8

// While loop with complex condition
function readUntilEmpty(arr) {
  let i = 0;
  while (i < arr.length && arr[i] !== "") {
    console.log(arr[i]);
    i++;
  }
}

// ============================================================================
// 6️⃣ DO-WHILE LOOPS - EXECUTE AT LEAST ONCE
// ============================================================================

// Basic do-while (executes at least once)
let num = 1;
do {
  console.log(num); // OUTPUT: 1, 2, 3, 4, 5
  num++;
} while (num <= 5);

// Do-while vs while (important difference)
let x = 10;
// This while loop won't execute
while (x < 5) {
  console.log("Won't print");
  x++;
}

// This do-while executes once even though condition is false
let y = 10;
do {
  console.log("Will print once"); // OUTPUT: "Will print once"
  y++;
} while (y < 5);

// Practical use: input validation
function getValidInput() {
  let input;
  do {
    input = prompt("Enter a number greater than 10:");
  } while (input <= 10);
  return input;
}

// ============================================================================
// 7️⃣ FOR...OF LOOP - ITERATE OVER ITERABLES (Arrays, Strings, etc.)
// ============================================================================

// For...of with arrays (PREFERRED for arrays)
const colors = ["red", "green", "blue"];
for (const color of colors) {
  console.log(color); // OUTPUT: red, green, blue
}

// For...of with strings
const word = "Hello";
for (const char of word) {
  console.log(char); // OUTPUT: H, e, l, l, o
}

// For...of with array of objects
const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 }
];

for (const user of users) {
  console.log(`${user.name} is ${user.age} years old`);
  // OUTPUT: Alice is 25 years old, Bob is 30 years old, Charlie is 35 years old
}

// For...of with destructuring
const people = [
  { name: "Alice", role: "Developer" },
  { name: "Bob", role: "Designer" }
];

for (const { name, role } of people) {
  console.log(`${name} - ${role}`);
  // OUTPUT: Alice - Developer, Bob - Designer
}

// For...of with Sets
const uniqueNumbers = new Set([1, 2, 3, 4, 5]);
for (const num of uniqueNumbers) {
  console.log(num); // OUTPUT: 1, 2, 3, 4, 5
}

// For...of with Maps
const userMap = new Map([
  ["user1", "Alice"],
  ["user2", "Bob"]
]);

for (const [key, value] of userMap) {
  console.log(`${key}: ${value}`); // OUTPUT: user1: Alice, user2: Bob
}

// ============================================================================
// 8️⃣ FOR...IN LOOP - ITERATE OVER OBJECT PROPERTIES
// ============================================================================

// For...in with objects (CORRECT usage)
const person = {
  name: "John",
  age: 30,
  city: "New York"
};

for (const key in person) {
  console.log(`${key}: ${person[key]}`);
  // OUTPUT: name: John, age: 30, city: New York
}

// For...in with own properties check
const obj = { a: 1, b: 2 };
Object.prototype.inherited = "I'm inherited";

for (const key in obj) {
  if (obj.hasOwnProperty(key)) {
    console.log(`${key}: ${obj[key]}`); // OUTPUT: a: 1, b: 2
  }
}

// ⚠️ WARNING: Don't use for...in with arrays (use for...of instead)
const arr = ["a", "b", "c"];
// BAD - iterates over indices as strings
for (const index in arr) {
  console.log(typeof index); // "string"
  console.log(arr[index]);
}
// GOOD - use for...of instead
for (const value of arr) {
  console.log(value);
}

// ============================================================================
// 9️⃣ BREAK AND CONTINUE - LOOP CONTROL
// ============================================================================

// Break - exit loop immediately
function findNumber(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      console.log(`Found ${target} at index ${i}`);
      break; // Stop searching
    }
  }
}

findNumber([1, 2, 3, 4, 5], 3); // OUTPUT: "Found 3 at index 2"

// Continue - skip current iteration
console.log("Print only odd numbers:");
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    continue; // Skip even numbers
  }
  console.log(i); // OUTPUT: 1, 3, 5, 7, 9
}

// Break in nested loops
function findInMatrix(matrix, target) {
  let found = false;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === target) {
        console.log(`Found at [${i}][${j}]`);
        found = true;
        break; // Breaks inner loop only
      }
    }
    if (found) break; // Break outer loop
  }
}

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
findInMatrix(matrix, 5); // OUTPUT: "Found at [1][1]"

// Continue with condition
const scores = [45, 67, 89, 34, 92, 78];
console.log("Passing scores:");
for (const score of scores) {
  if (score < 50) {
    continue; // Skip failing scores
  }
  console.log(score); // OUTPUT: 67, 89, 92, 78
}

// ============================================================================
// 🔟 LABELED STATEMENTS - BREAK/CONTINUE WITH LABELS
// ============================================================================

// Labeled break to exit outer loop
outerLoop: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      console.log("Breaking outer loop");
      break outerLoop; // Breaks outer loop
    }
    console.log(`i=${i}, j=${j}`);
  }
}

// Labeled continue
outerLoop2: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (j === 1) {
      continue outerLoop2; // Continue outer loop
    }
    console.log(`i=${i}, j=${j}`);
  }
}

// ============================================================================
// 1️⃣1️⃣ PRACTICAL EXAMPLES
// ============================================================================

// Example 1: FizzBuzz
console.log("FizzBuzz:");
for (let i = 1; i <= 20; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
    console.log("FizzBuzz"); // 15
  } else if (i % 3 === 0) {
    console.log("Fizz"); // 3, 6, 9, 12, 18
  } else if (i % 5 === 0) {
    console.log("Buzz"); // 5, 10, 20
  } else {
    console.log(i); // 1, 2, 4, 7, 8, 11, 13, 14, 16, 17, 19
  }
}

// Example 2: Find prime numbers
function isPrime(num) {
  if (num <= 1) return false;
  if (num === 2) return true;
  
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  return true;
}

console.log("Prime numbers from 1 to 20:");
for (let i = 1; i <= 20; i++) {
  if (isPrime(i)) {
    console.log(i); // OUTPUT: 2, 3, 5, 7, 11, 13, 17, 19
  }
}

// Example 3: Sum of array elements with condition
function sumEvenNumbers(arr) {
  let sum = 0;
  for (const num of arr) {
    if (num % 2 === 0) {
      sum += num;
    }
  }
  return sum;
}

console.log(sumEvenNumbers([1, 2, 3, 4, 5, 6])); // OUTPUT: 12

// Example 4: Nested loops - Pattern printing
console.log("Right triangle pattern:");
for (let i = 1; i <= 5; i++) {
  let pattern = "";
  for (let j = 1; j <= i; j++) {
    pattern += "* ";
  }
  console.log(pattern);
  // OUTPUT: *, *, *, *, *, *, *, *, *, *, *, *, *, *, *
}

// Example 5: Object validation
function validateUser(user) {
  const requiredFields = ["name", "email", "age"];
  
  for (const field of requiredFields) {
    if (!user[field]) {
      return `Missing required field: ${field}`;
    }
  }
  
  if (user.age < 18) {
    return "User must be 18 or older";
  }
  
  return "Valid user";
}

console.log(validateUser({ name: "John", email: "john@example.com", age: 25 })); // OUTPUT: "Valid user"

// Example 6: Search and filter
function searchProducts(products, query) {
  const results = [];
  
  for (const product of products) {
    if (product.name.toLowerCase().includes(query.toLowerCase())) {
      results.push(product);
    }
  }
  
  return results;
}

const products = [
  { name: "iPhone", price: 999 },
  { name: "iPad", price: 799 },
  { name: "MacBook", price: 1299 }
];

console.log(searchProducts(products, "iP")); // OUTPUT: [{ name: "iPhone", price: 999 }, { name: "iPad", price: 799 }]

// Example 7: Factorial with while loop
function factorial(n) {
  if (n < 0) return null;
  if (n === 0 || n === 1) return 1;
  
  let result = 1;
  let counter = n;
  
  while (counter > 1) {
    result *= counter;
    counter--;
  }
  
  return result;
}

console.log(`5! = ${factorial(5)}`); // OUTPUT: "5! = 120"

// Example 8: Count occurrences
function countOccurrences(arr, target) {
  let count = 0;
  
  for (const item of arr) {
    if (item === target) {
      count++;
    }
  }
  
  return count;
}

console.log(countOccurrences([1, 2, 3, 2, 4, 2], 2)); // OUTPUT: 3

// ============================================================================
// 📝 BEST PRACTICES SUMMARY
// ============================================================================

/**
 * CHOOSING THE RIGHT LOOP:
 * 
 * 1. for...of → Iterate over array values (MOST COMMON)
 *    Use when: You need each value from an array
 * 
 * 2. forEach → Array method for side effects
 *    Use when: You want to execute a function for each element
 * 
 * 3. for loop → Traditional indexed loop
 *    Use when: You need precise control over iteration or indices
 * 
 * 4. while loop → Condition-based loop
 *    Use when: You don't know how many iterations needed
 * 
 * 5. do-while → Execute at least once
 *    Use when: Code must run before checking condition
 * 
 * 6. for...in → Iterate over object keys
 *    Use when: You need to loop through object properties
 *    WARNING: Don't use with arrays!
 * 
 * 7. map/filter/reduce → Functional array methods
 *    Use when: You're transforming data (covered in fundamentals.js)
 */

/**
 * PERFORMANCE TIPS:
 * 1. Cache array length: for (let i = 0, len = arr.length; i < len; i++)
 * 2. Use for...of for arrays (cleaner and often faster)
 * 3. Break early when possible
 * 4. Avoid modifying arrays during iteration
 */

/**
 * COMMON PITFALLS:
 * 1. Infinite loops - always ensure exit condition
 * 2. Off-by-one errors - check your < vs <= conditions
 * 3. Using for...in with arrays - use for...of instead
 * 4. Forgetting break in switch - causes fall-through
 * 5. Using = instead of === in conditions
 */

/**
 * NEXT STEPS:
 * → Practice these patterns with real problems
 * → Move to fundamentals.js for array methods (map, filter, reduce)
 * → Learn about functional alternatives to loops
 * → Study recursion as an alternative to loops
 */

console.log("\n✅ Control Flow concepts covered!");
console.log("📚 Next: fundamentals.js for array methods and closures");
