/**
 * 📚 STEP 4️⃣  - TYPESCRIPT FUNDAMENTALS: TYPE SYSTEM
 * 
 * PREREQUISITE: JavaScript advanced-concepts.js
 * TIME TO COMPLETE: 3-4 days
 * DIFFICULTY: Intermediate
 * 
 * WHAT YOU'LL LEARN:
 * • Type annotations (how to add types to JavaScript)
 * • Basic types (string, number, boolean, etc.)
 * • Interfaces vs type aliases
 * • Classes with access modifiers
 * • Generics (type parameters)
 * • Union and intersection types
 * • Type guards and assertions
 * • Enums and literal types
 * 
 * KEY CONCEPTS TO UNDERSTAND:
 * 1. Types: Contracts that describe data structure
 * 2. Interfaces: Type definition using interface keyword
 * 3. Type aliases: Type definition using type keyword
 * 4. Generics: Reusable types with parameters
 * 5. Union types: Value can be one of several types
 * 6. Intersection types: Value must be all types
 * 7. Type guards: Narrowing types with checks
 * 8. Enums: Set of named constants
 * 
 * WHY TYPESCRIPT?
 * 1. Catch errors at compile time, not runtime
 * 2. Better IDE autocomplete and documentation
 * 3. Refactoring is safer
 * 4. Code is self-documenting
 * 5. Prevents entire classes of bugs
 * 6. TypeScript = JavaScript + Types
 * 
 * LEARNING PATH FOR THIS FILE:
 * 1. Learn basic type annotations
 * 2. Learn primitive types and arrays
 * 3. Learn objects and interfaces
 * 4. Learn union and intersection types
 * 5. Learn type aliases vs interfaces
 * 6. Learn classes with TypeScript
 * 7. Learn generics (very important!)
 * 8. Learn utility types
 * 
 * INTERFACES vs TYPE ALIASES:
 * • Interfaces: Better for objects, can extend/merge
 * • Type aliases: More flexible, can union, literals
 * • Use interfaces for public API contracts
 * • Use type aliases for unions and complex types
 * 
 * IMPORTANT LEARNING NOTES:
 * • TypeScript is JavaScript - all JS code is valid TS
 * • Types are erased at runtime (only compile-time benefit)
 * • Enable strict mode in tsconfig.json
 * • Start strict (strict: true), don't use any
 * • Learn generics - they're powerful and used everywhere
 * • Utility types make your life easier
 * 
 * GENERICS: The Most Important Concept
 * • Generics let you write reusable code
 * • Example: Array<T> works with any type T
 * • You can constrain generics with extends
 * • Generics are how you avoid any type
 * • Generics are used in React, frameworks, libraries
 * 
 * PRACTICAL SCENARIOS YOU'LL BUILD:
 * 1. Type a function's parameters and return
 * 2. Create interfaces for data structures
 * 3. Use generics for reusable functions
 * 4. Type API responses
 * 5. Create generic components
 * 6. Use utility types to transform types
 * 
 * COMMON MISTAKES TO AVOID:
 * 1. Using any instead of proper types
 * 2. Not enabling strict mode
 * 3. Over-complicating types
 * 4. Not understanding generics
 * 5. Mixing interfaces and types inconsistently
 * 6. Not using optional (?) and readonly properly
 * 
 * STRICT MODE CHECKLIST:
 * Enable these in tsconfig.json:
 * • "strict": true (enables all below)
 * • "noImplicitAny": true
 * • "strictNullChecks": true
 * • "strictFunctionTypes": true
 * • "alwaysStrict": true
 * 
 * NEXT STEPS AFTER THIS FILE:
 * → Move to advanced-patterns.ts for advanced types
 * → Learn conditional types and mapped types
 * → Learn design patterns with TypeScript
 * → Apply TypeScript in real projects
 */

// ===== BASIC TYPES =====

// Primitive types
const str: string = "Hello";
const num: number = 42;
const bool: boolean = true;
const big: bigint = 123n;
const sym: symbol = Symbol("id");
const undef: undefined = undefined;
const nil: null = null;

// Arrays
const numbers: number[] = [1, 2, 3];
const strings: Array<string> = ["a", "b"];
const mixed: (string | number)[] = [1, "two", 3];
const tuples: [string, number] = ["hello", 42];
const tupleRest: [string, ...number[]] = ["hello", 1, 2, 3];

// Any - avoid using
let anything: any = "can be anything";
anything = 42;
anything = true;

// Unknown - safer than any
let value: unknown = "unknown";
// value.toUpperCase(); // Error - must check type first
if (typeof value === "string") {
  value.toUpperCase(); // OK
}

// Never - function never returns
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {}
}

// Void - function returns nothing
function logMessage(msg: string): void {
  console.log(msg);
}

// ===== UNION AND INTERSECTION TYPES =====

// Union - value can be one of multiple types
let value: string | number | boolean;
value = "text"; // OK
value = 42; // OK
value = true; // OK
// value = {}; // Error

// Intersection - value must be all types
interface A {
  a: string;
}

interface B {
  b: number;
}

type C = A & B;
const c: C = { a: "hello", b: 42 }; // Must have both

// Literal types
let direction: "up" | "down" | "left" | "right";
direction = "up"; // OK
// direction = "forward"; // Error

let status: 200 | 404 | 500;
status = 200; // OK

// ===== INTERFACES =====

// Basic interface
interface User {
  name: string;
  age: number;
  email?: string; // Optional property
  readonly id: number; // Readonly property
}

const user: User = {
  name: "John",
  age: 30,
  id: 1
};

// user.id = 2; // Error - readonly

// Interface with methods
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

// Extending interfaces
interface Admin extends User {
  role: "admin" | "moderator";
  permissions: string[];
}

// Merging interfaces (declaration merging)
interface Window {
  myCustomProperty: string;
}

// ===== TYPES =====

// Type alias
type Status = "active" | "inactive" | "pending";

type StringOrNumber = string | number;

type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

// Object type
type Person = {
  name: string;
  age: number;
  greet: (greeting: string) => string;
};

// ===== CLASSES =====

// Basic class
class Animal {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  speak(): void {
    console.log(`${this.name} makes a sound`);
  }
}

// Access modifiers
class Dog extends Animal {
  public breed: string; // Public (default)
  protected species: string; // Protected - accessible in subclasses
  private id: number; // Private - only in this class

  constructor(name: string, age: number, breed: string) {
    super(name, age);
    this.breed = breed;
    this.species = "Canine";
    this.id = Math.random();
  }

  private getId(): number {
    return this.id;
  }

  protected getSpecies(): string {
    return this.species;
  }

  public bark(): void {
    console.log(`${this.name} barks!`);
  }
}

// Readonly class properties
class User {
  readonly id: number;
  readonly name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  // this.id = 2; // Error
}

// Parameter properties
class Point {
  constructor(
    public x: number,
    public y: number,
    private z: number = 0
  ) {}
}

// Getters and setters
class Circle {
  private _radius: number = 0;

  get radius(): number {
    return this._radius;
  }

  set radius(value: number) {
    if (value <= 0) {
      throw new Error("Radius must be positive");
    }
    this._radius = value;
  }

  get area(): number {
    return Math.PI * this._radius ** 2;
  }
}

// Static members
class MathUtils {
  static readonly PI = Math.PI;

  static add(a: number, b: number): number {
    return a + b;
  }
}

MathUtils.add(5, 3); // 8

// Abstract classes
abstract class Shape {
  abstract getArea(): number;

  describe(): void {
    console.log(`This shape has area: ${this.getArea()}`);
  }
}

class Square extends Shape {
  constructor(private side: number) {
    super();
  }

  getArea(): number {
    return this.side ** 2;
  }
}

// ===== GENERICS =====

// Generic function
function getFirstElement<T>(arr: T[]): T {
  return arr[0];
}

getFirstElement([1, 2, 3]); // 1
getFirstElement(["a", "b", "c"]); // "a"

// Generic with constraints
function merge<T extends { name: string }>(obj: T): T {
  return obj;
}

merge({ name: "John", age: 30 }); // OK
// merge({ age: 30 }); // Error - missing name

// Generic class
class Container<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  get(index: number): T {
    return this.items[index];
  }

  getAll(): T[] {
    return this.items;
  }
}

const stringContainer = new Container<string>();
stringContainer.add("hello");
const str = stringContainer.get(0); // string

// Multiple generic parameters
function pair<T, U>(a: T, b: U): [T, U] {
  return [a, b];
}

pair("hello", 42); // ["hello", 42]

// Generic with defaults
type Result<T = any> = {
  success: boolean;
  data: T;
};

// Generic with keyof
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "John", age: 30 };
getProperty(person, "name"); // "John"
// getProperty(person, "email"); // Error

// ===== ADVANCED TYPES =====

// Conditional types
type IsString<T> = T extends string ? true : false;

type A = IsString<"hello">; // true
type B = IsString<number>; // false

// Mapped types
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type User = { name: string; age: number };
type UserGetters = Getters<User>; // { getName: () => string; getAge: () => number }

// Utility types
type Partial<T> = {
  [K in keyof T]?: T[K];
};

type Required<T> = {
  [K in keyof T]-?: T[K];
};

type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

type Record<K extends string | number | symbol, T> = {
  [P in K]: T;
};

type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

// Built-in utility types
type UserPartial = Partial<User>; // All properties optional
type UserReadonly = Readonly<User>; // All readonly
type UserPick = Pick<User, "name">; // Only name property
type UserOmit = Omit<User, "age">; // Exclude age

type UserKeys = keyof User; // "name" | "age"
type UserValues = User[keyof User]; // string | number

// ===== ENUMS =====

// Numeric enum
enum Direction {
  Up = 0,
  Down = 1,
  Left = 2,
  Right = 3
}

Direction.Up; // 0

// String enum
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE"
}

Color.Red; // "RED"

// Heterogeneous enum (mixed)
enum BooleanLike {
  No = 0,
  Yes = "YES"
}

// Const enum (optimized)
const enum Size {
  Small = 1,
  Medium = 2,
  Large = 3
}

// ===== DECORATORS =====

// Function decorator
function logMethod(target: any, key: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function(...args: any[]) {
    console.log(`Calling ${key} with args:`, args);
    return originalMethod.apply(this, args);
  };

  return descriptor;
}

// Class decorator
function Sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@Sealed
class MyClass {
  @logMethod
  myMethod(a: number, b: number) {
    return a + b;
  }
}

// Property decorator
function Validate(target: any, key: string) {
  let value = target[key];

  Object.defineProperty(target, key, {
    get() {
      return value;
    },
    set(newValue) {
      if (typeof newValue !== "string") {
        throw new Error(`${key} must be a string`);
      }
      value = newValue;
    }
  });
}

// ===== NAMESPACES AND MODULES =====

// Namespace
namespace MathOperations {
  export function add(a: number, b: number): number {
    return a + b;
  }

  export function subtract(a: number, b: number): number {
    return a - b;
  }
}

MathOperations.add(5, 3); // 8

// Module
export interface User {
  name: string;
  age: number;
}

export class UserService {
  getUser(id: number): User {
    return { name: "John", age: 30 };
  }
}

// Import
// import { User, UserService } from "./module";
// import * as Module from "./module";

// ===== DECLARATION MERGING =====

interface Window {
  myApp: MyApp;
}

interface MyApp {
  version: string;
  start(): void;
}

// ===== STRICT MODE =====

// tsconfig.json: "strict": true enables:
// - noImplicitAny
// - noImplicitThis
// - alwaysStrict
// - strictBindCallApply
// - strictNullChecks
// - strictFunctionTypes
// - strictPropertyInitialization

// With strictNullChecks:
let nullable: string | null = null;
nullable = "string"; // OK

// ===== TYPE GUARDS =====

function processValue(value: string | number): void {
  // Type guard with typeof
  if (typeof value === "string") {
    value.toUpperCase();
  } else {
    value.toFixed(2);
  }
}

// Custom type guard
function isUser(value: any): value is User {
  return value && typeof value.name === "string" && typeof value.age === "number";
}

// ===== AS AND NON-NULL ASSERTIONS =====

// Type assertion
const element = document.querySelector("div") as HTMLDivElement;

// Non-null assertion
let value: string | null = "hello";
const length = value!.length; // ! tells TypeScript not null

// ===== FUNCTION OVERLOADING =====

function greet(person: User): string;
function greet(people: User[]): string;
function greet(person: User | User[]): string {
  if (Array.isArray(person)) {
    return person.map(p => `Hello ${p.name}`).join(", ");
  }
  return `Hello ${person.name}`;
}

greet({ name: "John", age: 30 });
greet([{ name: "John", age: 30 }, { name: "Jane", age: 25 }]);
