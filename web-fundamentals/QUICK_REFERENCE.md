╔════════════════════════════════════════════════════════════════════════════╗
║              QUICK REFERENCE - JAVASCRIPT & TYPESCRIPT ESSENTIALS           ║
║                    Most-Used Patterns & Code Snippets                       ║
╚════════════════════════════════════════════════════════════════════════════╝

═══════════════════════════════════════════════════════════════════════════════
🔥 JAVASCRIPT - TOP 10 PATTERNS YOU'LL USE DAILY
═══════════════════════════════════════════════════════════════════════════════

1. ARRAY METHODS - Use these constantly!
────────────────────────────────────────────────────────────────────────────
const users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 }
];

// Transform: map()
const names = users.map(u => u.name); // ["Alice", "Bob"]

// Filter: filter()
const adults = users.filter(u => u.age >= 18);

// Aggregate: reduce()
const totalAge = users.reduce((sum, u) => sum + u.age, 0); // 55

// Find: find()
const alice = users.find(u => u.name === "Alice");

// Check: some(), every()
const hasOldPerson = users.some(u => u.age > 40); // false
const allAdults = users.every(u => u.age >= 18); // true


2. ASYNC/AWAIT - Modern way to handle async
────────────────────────────────────────────────────────────────────────────
// ❌ DON'T DO THIS (Callback Hell):
function getUser(id, callback) {
  setTimeout(() => {
    callback({ id, name: "Alice" });
  }, 1000);
}

// ✅ DO THIS (Async/Await):
async function getUser(id) {
  const response = await fetch(`/api/users/${id}`);
  const user = await response.json();
  return user;
}

// Use it:
try {
  const user = await getUser(1);
  console.log(user);
} catch (error) {
  console.error("Failed to get user:", error);
}


3. FETCH API - Make HTTP requests
────────────────────────────────────────────────────────────────────────────
// GET request
const user = await fetch('/api/users/1')
  .then(res => res.json());

// POST request
const newUser = await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: "Charlie", age: 25 })
}).then(res => res.json());

// With timeout (don't wait forever!)
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5000);
try {
  const response = await fetch('/api/data', { signal: controller.signal });
} catch (error) {
  console.error("Request timeout or failed");
} finally {
  clearTimeout(timeoutId);
}


4. PROMISES - When you need more control
────────────────────────────────────────────────────────────────────────────
// Create a promise
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Success!");
    // or: reject("Error!");
  }, 1000);
});

// Chain promises
promise
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log("Done"));

// Promise.all - wait for ALL (fail if one fails)
Promise.all([
  fetch('/api/users'),
  fetch('/api/posts'),
  fetch('/api/comments')
]).then(responses => console.log("All loaded!"));

// Promise.allSettled - wait for ALL (don't fail)
Promise.allSettled([
  fetch('/api/a'),
  fetch('/api/b')
]).then(results => {
  results.forEach(r => {
    if (r.status === 'fulfilled') {
      console.log("Success:", r.value);
    } else {
      console.log("Failed:", r.reason);
    }
  });
});


5. DOM MANIPULATION - Most common tasks
────────────────────────────────────────────────────────────────────────────
// Select elements
const button = document.querySelector('#myButton');
const items = document.querySelectorAll('.item');

// Listen to events
button.addEventListener('click', (event) => {
  console.log("Clicked!", event.target);
});

// Modify elements
button.textContent = "Click me!";
button.classList.add('active');
button.style.backgroundColor = "blue";

// Create & add elements
const div = document.createElement('div');
div.textContent = "Hello";
document.body.appendChild(div);

// Remove elements
div.remove();

// Event delegation (listen on parent)
document.addEventListener('click', (e) => {
  if (e.target.matches('.delete-btn')) {
    console.log("Delete clicked");
  }
});


6. CLOSURES - Functions remembering variables
────────────────────────────────────────────────────────────────────────────
// Closure: function remembers outer scope
function makeCounter() {
  let count = 0; // This is remembered!
  return function() {
    count++;
    return count;
  };
}

const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// Real use case: Private variables
function createUser(name) {
  let _balance = 0; // Private (not accessible directly)
  
  return {
    getName: () => name,
    deposit: (amount) => { _balance += amount; return _balance; },
    withdraw: (amount) => { _balance -= amount; return _balance; }
  };
}

const user = createUser("Alice");
user.deposit(100); // 100
user.withdraw(30); // 70
// Can't access _balance directly - it's private!


7. CLASSES - Object-oriented code
────────────────────────────────────────────────────────────────────────────
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  // Instance method
  greet() {
    return `Hello, I'm ${this.name}`;
  }
  
  // Static method
  static isAdult(age) {
    return age >= 18;
  }
  
  // Getter
  get description() {
    return `${this.name} is ${this.age} years old`;
  }
  
  // Setter
  set birthday(newAge) {
    this.age = newAge;
  }
}

const user = new User("Alice", 25);
console.log(user.greet()); // "Hello, I'm Alice"
console.log(User.isAdult(25)); // true
console.log(user.description); // "Alice is 25 years old"


8. DESTRUCTURING - Cleaner code
────────────────────────────────────────────────────────────────────────────
// Array destructuring
const [first, second] = [1, 2, 3];
const [head, ...tail] = [1, 2, 3]; // head=1, tail=[2,3]

// Object destructuring
const { name, age } = { name: "Alice", age: 25, city: "NYC" };

// With defaults
const { name = "Unknown" } = {};

// Nested destructuring
const { user: { name, address: { city } } } = response;

// In function parameters
function greet({ name, age = 18 }) {
  console.log(`${name} is ${age} years old`);
}

greet({ name: "Bob" }); // "Bob is 18 years old"


9. SPREAD OPERATOR - Copy & combine data
────────────────────────────────────────────────────────────────────────────
// Arrays
const arr1 = [1, 2];
const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]

// Objects
const user = { name: "Alice", age: 25 };
const updated = { ...user, age: 26 }; // { name: "Alice", age: 26 }

// Function arguments
const numbers = [1, 2, 3];
Math.max(...numbers); // 3

// Immutability (don't mutate original)
const newArray = [...oldArray]; // Creates copy
const newObject = { ...oldObject }; // Creates copy


10. ERROR HANDLING - Don't crash!
────────────────────────────────────────────────────────────────────────────
// Try/catch for synchronous code
try {
  const result = JSON.parse(invalidJson);
} catch (error) {
  console.error("Parse failed:", error.message);
} finally {
  console.log("Cleanup code");
}

// For async code
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch:", error);
    // Return fallback or re-throw
    throw error;
  }
}

// Custom errors
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

try {
  if (!email.includes("@")) {
    throw new ValidationError("Invalid email");
  }
} catch (error) {
  if (error instanceof ValidationError) {
    console.error("Validation failed:", error.message);
  }
}


═══════════════════════════════════════════════════════════════════════════════
🔥 TYPESCRIPT - TOP 10 PATTERNS YOU'LL USE DAILY
═══════════════════════════════════════════════════════════════════════════════

1. BASIC TYPES - Type your variables
────────────────────────────────────────────────────────────────────────────
// Primitives
const name: string = "Alice";
const age: number = 25;
const isActive: boolean = true;

// Arrays
const numbers: number[] = [1, 2, 3];
const names: Array<string> = ["Alice", "Bob"];

// Union types (can be multiple types)
const id: string | number = 123; // or "abc-123"
const status: "active" | "inactive" = "active";

// Optional (can be undefined)
const middleName?: string = undefined;

// Any (avoid if possible!)
const unknown: any = "could be anything";


2. INTERFACES - Define object shapes
────────────────────────────────────────────────────────────────────────────
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional property
  readonly createdAt: Date; // Can't change after creation
}

const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  createdAt: new Date()
};

// Extending interfaces (inheritance)
interface Admin extends User {
  permissions: string[];
}


3. GENERICS - Reusable, flexible types
────────────────────────────────────────────────────────────────────────────
// Generic function
function getById<T>(items: T[], id: number): T | undefined {
  return items.find((item: any) => item.id === id);
}

const users: User[] = [...];
const user = getById<User>(users, 1); // ✅ Typed as User | undefined

// Generic interface
interface Box<T> {
  value: T;
  getValue(): T;
}

const numberBox: Box<number> = {
  value: 42,
  getValue() { return this.value; }
};

// Generic with constraints (T must extend something)
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

getProperty(user, "name"); // ✅ OK
getProperty(user, "invalid"); // ❌ TypeScript error!


4. UTILITY TYPES - Transform existing types
────────────────────────────────────────────────────────────────────────────
// Partial<T> - Make all properties optional
type UpdateUser = Partial<User>; // All fields optional

// Required<T> - Make all properties required
type StrictUser = Required<User>; // No optional fields

// Readonly<T> - Make all properties readonly
type ImmutableUser = Readonly<User>;

// Pick<T, K> - Select specific properties
type UserPreview = Pick<User, 'id' | 'name'>; // Only id and name

// Omit<T, K> - Exclude specific properties
type UserWithoutPassword = Omit<User, 'password'>;

// Record<K, T> - Create object with specific keys
type UsersByRole = Record<'admin' | 'user' | 'guest', User[]>;
// { admin: User[], user: User[], guest: User[] }

// Extract<T, U> - Get matching types from union
type StringOrNumber = string | number | boolean;
type StringOnly = Extract<StringOrNumber, string>; // string

// Exclude<T, U> - Remove matching types from union
type WithoutString = Exclude<StringOrNumber, string>; // number | boolean

// ReturnType<F> - Get function return type
type UserResponse = ReturnType<typeof fetchUser>; // Whatever fetchUser returns


5. TYPE NARROWING - Be specific about types
────────────────────────────────────────────────────────────────────────────
function processData(data: string | number) {
  // Narrow using typeof
  if (typeof data === 'string') {
    console.log(data.toUpperCase()); // ✅ data is string here
  } else {
    console.log(data.toFixed(2)); // ✅ data is number here
  }
}

// Custom type guard
function isUser(obj: any): obj is User {
  return obj && typeof obj.id === 'number' && typeof obj.name === 'string';
}

const data: unknown = someData;
if (isUser(data)) {
  console.log(data.name); // ✅ data is User here
}


6. CONDITIONAL TYPES - Types that depend on other types
────────────────────────────────────────────────────────────────────────────
// If T is string, return number; otherwise return T
type ToNumber<T> = T extends string ? number : T;

type A = ToNumber<string>; // number
type B = ToNumber<boolean>; // boolean

// Extract return type from function
type MyFunc = () => string;
type ReturnOfMyFunc = MyFunc extends () => infer R ? R : never; // string

// Practical: API response wrapper
type ApiResponse<T> = T extends { success: true }
  ? { data: T['data'], error: null }
  : { data: null, error: string };


7. MAPPED TYPES - Transform all properties
────────────────────────────────────────────────────────────────────────────
// Make all properties readonly
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

// Make all properties nullable
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

// Create getters for all properties
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

// Make specific properties readonly
type ReadonlyByKeys<T, K extends keyof T> = {
  readonly [P in K]: T[P];
} & {
  [P in Exclude<keyof T, K>]: T[P];
};


8. CLASSES WITH TYPES - OOP with type safety
────────────────────────────────────────────────────────────────────────────
interface Repository<T> {
  getById(id: number): Promise<T | null>;
  save(item: T): Promise<T>;
  delete(id: number): Promise<void>;
}

class UserRepository implements Repository<User> {
  async getById(id: number): Promise<User | null> {
    // Implementation
    return null;
  }
  
  async save(user: User): Promise<User> {
    // Implementation
    return user;
  }
  
  async delete(id: number): Promise<void> {
    // Implementation
  }
}

// Private property (not accessible outside class)
class SecretKeeper {
  private secret = "hidden";
  
  // Public method
  public reveal() {
    return this.secret;
  }
}


9. ENUMS - Define allowed values
────────────────────────────────────────────────────────────────────────────
// String enum
enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Pending = "PENDING"
}

const myStatus: Status = Status.Active;

// Numeric enum (default)
enum Priority {
  Low = 0,
  Medium = 1,
  High = 2
}

const taskPriority: Priority = Priority.High;

// Better: Use type or const as object instead of enum
type StatusType = 'active' | 'inactive' | 'pending';

const StatusValues = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending'
} as const;

type Status = typeof StatusValues[keyof typeof StatusValues];


10. STRICT MODE - Better type checking
────────────────────────────────────────────────────────────────────────────
// Turn on in tsconfig.json:
// "strict": true

// This enables:
// ✅ noImplicitAny - No untyped 'any' allowed
// ✅ strictNullChecks - null/undefined must be explicit
// ✅ strictFunctionTypes - Strict checking of function types
// ✅ strictBindCallApply - Strict checking of bind, call, apply

// With strict mode ON:
function greet(name: string): void {
  console.log(`Hello, ${name}`);
}

greet("Alice"); // ✅ OK
greet(null); // ❌ ERROR: Argument of type 'null' is not assignable

// Without strict mode, this would be allowed (bad!)


═══════════════════════════════════════════════════════════════════════════════

BONUS: COMMON MISTAKES TO AVOID
═══════════════════════════════════════════════════════════════════════════════

❌ Forgetting await with async functions
async function getData() {
  return "data";
}
const data = getData(); // Wrong! data is Promise, not data
const data = await getData(); // Correct!

❌ Mutating arrays/objects (causes bugs!)
const users = [...];
users.push(newUser); // ❌ Mutation
const newUsers = [...users, newUser]; // ✅ Creates new array

❌ Not handling errors in async code
const data = await fetch('/api/data');
// What if fetch fails? Add try/catch!

❌ Type any (defeats the purpose of TypeScript)
const data: any = fetchData(); // ❌ Loses all type checking
const data: unknown = fetchData(); // ✅ Better - forces type checking

❌ Not using optional chaining
const name = user.profile.name; // Crashes if profile is null!
const name = user?.profile?.name; // ✅ Safe - returns undefined if any step fails

❌ Not using nullish coalescing
const count = 0 || 10; // Returns 10 (wrong! 0 is falsy)
const count = 0 ?? 10; // Returns 0 (correct! ?? checks for null/undefined only)

═══════════════════════════════════════════════════════════════════════════════

🎯 Practice these patterns daily and you'll be a professional JavaScript/TypeScript developer!

Save this file for quick reference while coding. 🚀
