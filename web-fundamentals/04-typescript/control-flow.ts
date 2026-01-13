/**
 * 📚 TYPESCRIPT CONTROL FLOW: TYPE-SAFE LOOPS & CONDITIONALS
 * 
 * PREREQUISITE: 03-javascript/control-flow.js and 04-typescript/fundamentals.ts
 * TIME TO COMPLETE: 1-2 hours
 * DIFFICULTY: Beginner to Intermediate
 * 
 * WHAT YOU'LL LEARN:
 * • Type-safe conditional statements
 * • Typed loops and iterations
 * • Type guards in conditionals
 * • Discriminated unions with switch
 * • Type narrowing in control flow
 * • Iteration over typed collections
 * 
 * KEY TYPESCRIPT FEATURES:
 * 1. Type narrowing in if statements
 * 2. Exhaustive switch checks
 * 3. Type guards for runtime type checking
 * 4. Typed iterations
 * 5. Union types with control flow
 * 
 * LEARNING PATH FOR THIS FILE:
 * 1. Review JavaScript control flow first
 * 2. Learn type narrowing
 * 3. Master type guards
 * 4. Practice discriminated unions
 * 5. Use exhaustive checks
 */

// ============================================================================
// 1️⃣ TYPE NARROWING IN CONDITIONAL STATEMENTS
// ============================================================================

// Basic type narrowing with typeof
function processValue(value: string | number): string {
  if (typeof value === "string") {
    // TypeScript knows value is string here
    return value.toUpperCase();
  } else {
    // TypeScript knows value is number here
    return value.toFixed(2);
  }
}

console.log(processValue("hello")); // "HELLO"
console.log(processValue(42.12345)); // "42.12"

// Type narrowing with instanceof
class Dog {
  bark(): string {
    return "Woof!";
  }
}

class Cat {
  meow(): string {
    return "Meow!";
  }
}

function makeSound(animal: Dog | Cat): string {
  if (animal instanceof Dog) {
    return animal.bark(); // TypeScript knows it's Dog
  } else {
    return animal.meow(); // TypeScript knows it's Cat
  }
}

// Truthiness narrowing
function greetUser(name: string | null | undefined): string {
  if (name) {
    // TypeScript knows name is string here
    return `Hello, ${name}!`;
  }
  return "Hello, Guest!";
}

// Array type narrowing
function processInput(input: string | string[]): number {
  if (Array.isArray(input)) {
    return input.length; // TypeScript knows it's string[]
  }
  return input.length; // TypeScript knows it's string
}

// ============================================================================
// 2️⃣ TYPE GUARDS - CUSTOM TYPE CHECKING
// ============================================================================

// Type predicate function
interface Fish {
  swim: () => void;
}

interface Bird {
  fly: () => void;
}

// Type guard function
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function moveAnimal(pet: Fish | Bird): void {
  if (isFish(pet)) {
    pet.swim(); // TypeScript knows it's Fish
  } else {
    pet.fly(); // TypeScript knows it's Bird
  }
}

// Type guard with classes
class Rectangle {
  constructor(public width: number, public height: number) {}
}

class Circle {
  constructor(public radius: number) {}
}

function isRectangle(shape: Rectangle | Circle): shape is Rectangle {
  return (shape as Rectangle).width !== undefined;
}

function calculateArea(shape: Rectangle | Circle): number {
  if (isRectangle(shape)) {
    return shape.width * shape.height;
  } else {
    return Math.PI * shape.radius ** 2;
  }
}

// in operator for type narrowing
type Admin = { name: string; privileges: string[] };
type User = { name: string; email: string };

function printInfo(person: Admin | User): void {
  console.log(`Name: ${person.name}`);
  
  if ("privileges" in person) {
    console.log(`Privileges: ${person.privileges.join(", ")}`);
  }
  
  if ("email" in person) {
    console.log(`Email: ${person.email}`);
  }
}

// ============================================================================
// 3️⃣ DISCRIMINATED UNIONS WITH SWITCH
// ============================================================================

// Discriminated union type
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "square"; size: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "square":
      return shape.size ** 2;
  }
}

// Usage
const circle: Shape = { kind: "circle", radius: 5 };
const rectangle: Shape = { kind: "rectangle", width: 10, height: 5 };
console.log(getArea(circle)); // 78.54
console.log(getArea(rectangle)); // 50

// Exhaustive check with never
type Action =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "RESET"; value: number };

function reducer(state: number, action: Action): number {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "RESET":
      return action.value;
    default:
      // Exhaustive check - ensures all cases are handled
      const exhaustiveCheck: never = action;
      return exhaustiveCheck;
  }
}

// Status handling with discriminated unions
type LoadingState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: string }
  | { status: "error"; error: Error };

function handleState(state: LoadingState): string {
  switch (state.status) {
    case "idle":
      return "Not started";
    case "loading":
      return "Loading...";
    case "success":
      return `Data: ${state.data}`;
    case "error":
      return `Error: ${state.error.message}`;
  }
}

// ============================================================================
// 4️⃣ TYPED LOOPS - ITERATING WITH TYPE SAFETY
// ============================================================================

// For loop with typed array
const numbers: number[] = [1, 2, 3, 4, 5];
for (let i = 0; i < numbers.length; i++) {
  const num: number = numbers[i];
  console.log(num * 2);
}

// For...of with typed arrays
const names: string[] = ["Alice", "Bob", "Charlie"];
for (const name of names) {
  console.log(name.toUpperCase()); // TypeScript knows name is string
}

// For...of with readonly arrays
const readonlyNumbers: ReadonlyArray<number> = [1, 2, 3];
for (const num of readonlyNumbers) {
  console.log(num);
  // num = 10; // Error: cannot assign to const
}

// Iterating over tuples
type Point = [number, number];
const points: Point[] = [[0, 0], [1, 1], [2, 2]];

for (const [x, y] of points) {
  console.log(`Point: (${x}, ${y})`);
}

// For...of with Set
const uniqueIds: Set<number> = new Set([1, 2, 3, 4, 5]);
for (const id of uniqueIds) {
  console.log(id); // TypeScript knows id is number
}

// For...of with Map
const userMap: Map<string, number> = new Map([
  ["Alice", 25],
  ["Bob", 30]
]);

for (const [name, age] of userMap) {
  console.log(`${name} is ${age} years old`);
}

// ============================================================================
// 5️⃣ TYPED OBJECTS ITERATION
// ============================================================================

// For...in with typed objects
interface Person {
  name: string;
  age: number;
  city: string;
}

const person: Person = {
  name: "John",
  age: 30,
  city: "New York"
};

// Type-safe object iteration
for (const key in person) {
  // key is string, need type assertion for safety
  const value = person[key as keyof Person];
  console.log(`${key}: ${value}`);
}

// Better approach: Object.entries
for (const [key, value] of Object.entries(person)) {
  console.log(`${key}: ${value}`);
}

// Type-safe object keys iteration
const keys = Object.keys(person) as Array<keyof Person>;
for (const key of keys) {
  const value: string | number = person[key];
  console.log(`${key}: ${value}`);
}

// Object.entries with type safety
type UserData = { [key: string]: string | number };
const userData: UserData = { name: "Alice", age: 25, score: 95 };

for (const [key, value] of Object.entries(userData)) {
  if (typeof value === "number") {
    console.log(`${key}: ${value.toFixed(2)}`);
  } else {
    console.log(`${key}: ${value.toUpperCase()}`);
  }
}

// ============================================================================
// 6️⃣ CONDITIONAL TYPES IN PRACTICE
// ============================================================================

// Generic function with type narrowing
function processItem<T>(item: T): string {
  if (typeof item === "string") {
    return item.toUpperCase();
  } else if (typeof item === "number") {
    return item.toFixed(2);
  } else if (Array.isArray(item)) {
    return `Array of ${item.length} items`;
  } else {
    return String(item);
  }
}

console.log(processItem("hello")); // "HELLO"
console.log(processItem(42.123)); // "42.12"
console.log(processItem([1, 2, 3])); // "Array of 3 items"

// Type guard with generics
function isArrayOf<T>(value: unknown, check: (item: any) => item is T): value is T[] {
  return Array.isArray(value) && value.every(check);
}

function isString(value: any): value is string {
  return typeof value === "string";
}

function isNumber(value: any): value is number {
  return typeof value === "number";
}

const mixedArray: unknown = ["a", "b", "c"];
if (isArrayOf(mixedArray, isString)) {
  // TypeScript knows mixedArray is string[]
  console.log(mixedArray.map(s => s.toUpperCase()));
}

// ============================================================================
// 7️⃣ NULLABLE TYPES AND CONTROL FLOW
// ============================================================================

// Handling nullable types
function getUserName(user: { name?: string } | null | undefined): string {
  if (!user) {
    return "Guest";
  }
  
  if (!user.name) {
    return "Anonymous";
  }
  
  return user.name;
}

// Optional chaining with conditions
interface Company {
  name: string;
  address?: {
    street?: string;
    city?: string;
  };
}

function getCity(company: Company | null): string {
  if (company?.address?.city) {
    return company.address.city;
  }
  return "Unknown";
}

// Nullish coalescing with conditions
function processConfig(config?: { timeout?: number }): number {
  const timeout = config?.timeout ?? 5000;
  
  if (timeout > 10000) {
    return 10000; // Cap at 10 seconds
  }
  
  return timeout;
}

// ============================================================================
// 8️⃣ PRACTICAL TYPED EXAMPLES
// ============================================================================

// Example 1: Type-safe status checker
type TaskStatus = "pending" | "in-progress" | "completed" | "failed";

interface Task {
  id: number;
  name: string;
  status: TaskStatus;
}

function filterTasksByStatus(tasks: Task[], status: TaskStatus): Task[] {
  const filtered: Task[] = [];
  
  for (const task of tasks) {
    if (task.status === status) {
      filtered.push(task);
    }
  }
  
  return filtered;
}

// Example 2: Type-safe validation
interface FormData {
  username: string;
  email: string;
  age: number;
}

type ValidationError = {
  field: keyof FormData;
  message: string;
};

function validateForm(data: FormData): ValidationError[] {
  const errors: ValidationError[] = [];
  
  if (data.username.length < 3) {
    errors.push({ field: "username", message: "Too short" });
  }
  
  if (!data.email.includes("@")) {
    errors.push({ field: "email", message: "Invalid email" });
  }
  
  if (data.age < 18) {
    errors.push({ field: "age", message: "Must be 18+" });
  }
  
  return errors;
}

// Example 3: Type-safe search and filter
interface Product {
  id: number;
  name: string;
  price: number;
  category: "electronics" | "clothing" | "food";
}

function searchProducts(
  products: Product[],
  query: string,
  category?: Product["category"]
): Product[] {
  const results: Product[] = [];
  
  for (const product of products) {
    // Filter by category if specified
    if (category && product.category !== category) {
      continue;
    }
    
    // Filter by search query
    if (product.name.toLowerCase().includes(query.toLowerCase())) {
      results.push(product);
    }
  }
  
  return results;
}

const products: Product[] = [
  { id: 1, name: "iPhone", price: 999, category: "electronics" },
  { id: 2, name: "T-Shirt", price: 29, category: "clothing" },
  { id: 3, name: "Pizza", price: 15, category: "food" }
];

console.log(searchProducts(products, "i", "electronics"));

// Example 4: Type-safe state machine
type State = "idle" | "loading" | "success" | "error";
type Event = "FETCH" | "SUCCESS" | "FAILURE" | "RESET";

function transition(currentState: State, event: Event): State {
  switch (currentState) {
    case "idle":
      if (event === "FETCH") return "loading";
      break;
    case "loading":
      if (event === "SUCCESS") return "success";
      if (event === "FAILURE") return "error";
      break;
    case "success":
    case "error":
      if (event === "RESET") return "idle";
      break;
  }
  return currentState; // No transition
}

// Example 5: Type-safe range iteration
function* range(start: number, end: number, step: number = 1): Generator<number> {
  for (let i = start; i <= end; i += step) {
    yield i;
  }
}

// Usage with type inference
for (const num of range(1, 10, 2)) {
  console.log(num); // TypeScript knows num is number
}

// Example 6: Type-safe batch processing
async function processBatch<T, R>(
  items: T[],
  processor: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = [];
  
  for (const item of items) {
    try {
      const result = await processor(item);
      results.push(result);
    } catch (error) {
      console.error("Processing failed:", error);
    }
  }
  
  return results;
}

// Example 7: Type-safe matrix operations
type Matrix = number[][];

function traverseMatrix(matrix: Matrix): void {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const value: number = matrix[i][j];
      console.log(`[${i}][${j}] = ${value}`);
    }
  }
}

// ============================================================================
// 9️⃣ ADVANCED PATTERNS
// ============================================================================

// Pattern 1: Type guards with complex conditions
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

function isSuccessResponse<T>(
  response: ApiResponse<T>
): response is ApiResponse<T> & { success: true; data: T } {
  return response.success && response.data !== undefined;
}

function handleResponse<T>(response: ApiResponse<T>): T | null {
  if (isSuccessResponse(response)) {
    // TypeScript knows response.data exists
    return response.data;
  } else {
    console.error(response.error);
    return null;
  }
}

// Pattern 2: Exhaustive switch with never
type Color = "red" | "green" | "blue";

function getColorCode(color: Color): string {
  switch (color) {
    case "red":
      return "#FF0000";
    case "green":
      return "#00FF00";
    case "blue":
      return "#0000FF";
    default:
      // If we add a new color, TypeScript will error here
      const exhaustive: never = color;
      throw new Error(`Unhandled color: ${exhaustive}`);
  }
}

// Pattern 3: Type-safe enum iteration
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}

function getAllDirections(): Direction[] {
  return Object.values(Direction);
}

for (const direction of getAllDirections()) {
  console.log(direction); // TypeScript knows it's Direction
}

// Pattern 4: Conditional execution with readonly
function processReadonlyArray(arr: readonly number[]): number {
  let sum = 0;
  
  for (const num of arr) {
    sum += num;
    // arr[0] = 10; // Error: cannot modify readonly array
  }
  
  return sum;
}

// ============================================================================
// 📝 TYPESCRIPT BEST PRACTICES FOR CONTROL FLOW
// ============================================================================

/**
 * TYPE NARROWING BEST PRACTICES:
 * 
 * 1. Use typeof for primitives (string, number, boolean)
 * 2. Use instanceof for class instances
 * 3. Use 'in' operator for object properties
 * 4. Create type guards for complex types
 * 5. Use discriminated unions for related types
 * 6. Leverage exhaustive checks with never
 */

/**
 * LOOP TYPE SAFETY:
 * 
 * 1. Prefer for...of for arrays (maintains type safety)
 * 2. Use Object.entries() for type-safe object iteration
 * 3. Annotate loop variables when TypeScript can't infer
 * 4. Use readonly for immutable iterations
 * 5. Type guard inside loops for union types
 */

/**
 * DISCRIMINATED UNIONS:
 * 
 * 1. Always include a discriminant property (kind, type, status)
 * 2. Use exhaustive checks in switch statements
 * 3. Leverage type narrowing in each case
 * 4. Combine with never for compile-time guarantees
 */

/**
 * NEXT STEPS:
 * → Practice type guards in real scenarios
 * → Learn advanced type utilities (in type-utilities.ts)
 * → Study conditional types
 * → Master mapped types and template literals
 */

console.log("\n✅ TypeScript Control Flow concepts covered!");
console.log("📚 Next: type-utilities.ts for advanced type patterns");
