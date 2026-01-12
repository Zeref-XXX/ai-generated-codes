/**
 * 📚 STEP 5️⃣  - TYPESCRIPT ADVANCED: PATTERNS & DESIGN
 * 
 * PREREQUISITE: TypeScript fundamentals.ts
 * TIME TO COMPLETE: 3-4 days
 * DIFFICULTY: Advanced
 * 
 * WHAT YOU'LL LEARN:
 * • Advanced utility types (Extract, Exclude, etc.)
 * • Conditional types (Conditional<T> syntax)
 * • Mapped types (transforming types)
 * • Generic constraints and wildcards
 * • Variadic tuple types
 * • Recursive types
 * • Design patterns with TypeScript
 * • Type-safe event emitters
 * 
 * KEY CONCEPTS TO UNDERSTAND:
 * 1. Conditional types: Type depends on condition
 * 2. Mapped types: Transform existing types
 * 3. Generic constraints: Restrict generic parameters
 * 4. Infer keyword: Extract types from expressions
 * 5. Recursive types: Types that reference themselves
 * 6. Design patterns: Solutions to common problems
 * 7. Type utilities: Reusable type transformations
 * 
 * WHY THESE ARE "ADVANCED":
 * • These are rarely needed for basic projects
 * • But they enable advanced library development
 * • Understanding them deepens TypeScript knowledge
 * • They're used in popular libraries (React, Vue, etc.)
 * • They solve real problems elegantly
 * 
 * LEARNING PATH FOR THIS FILE:
 * 1. Review utility types (Partial, Pick, Omit, etc.)
 * 2. Learn Extract and Exclude
 * 3. Learn conditional types (T extends U ? ... : ...)
 * 4. Learn infer keyword (extract from types)
 * 5. Learn mapped types (transform types)
 * 6. Learn generic constraints (extends)
 * 7. Learn design patterns (Observer, Strategy, etc.)
 * 8. Learn advanced patterns (event emitters, etc.)
 * 
 * CONDITIONAL TYPES: Powerful!
 * • Type depends on another type
 * • Example: T extends string ? string : number
 * • Use infer to extract nested types
 * • Use with utility types for transformations
 * 
 * MAPPED TYPES: Transform types
 * • Loop through properties and transform them
 * • Create getters, setters, readonly versions
 * • Use keyof and in operators
 * • Example: { [K in keyof T]: T[K][] } makes all values arrays
 * 
 * DESIGN PATTERNS YOU'LL LEARN:
 * 1. Observer: React to state changes
 * 2. Strategy: Swap algorithms
 * 3. Decorator: Add behavior to objects
 * 4. Factory: Create objects
 * 5. Singleton: One instance only
 * 6. Command: Encapsulate actions
 * 7. Iterator: Traverse collections
 * 
 * IMPORTANT LEARNING NOTES:
 * • Advanced types can be complex - that's normal!
 * • Start with mapped types before conditional types
 * • Use utility types first, create custom ones later
 * • Don't over-complicate - simple is usually better
 * • Learn when NOT to use advanced types
 * • These patterns exist in frameworks - recognize them
 * 
 * PRACTICAL SCENARIOS YOU'LL BUILD:
 * 1. Create generic API response handler
 * 2. Build type-safe event system
 * 3. Create getter/setter pairs from interface
 * 4. Build form validation system
 * 5. Create plugin system with types
 * 6. Build configuration loader
 * 7. Create ORM-like type system
 * 
 * COMMON MISTAKES TO AVOID:
 * 1. Over-engineering with complex types
 * 2. Not documenting complex type logic
 * 3. Making types harder to understand than benefits
 * 4. Not testing types (use type tests!)
 * 5. Ignoring readability for cleverness
 * 6. Not understanding when simplicity wins
 * 
 * WHEN TO USE ADVANCED TYPES:
 * ✓ Building libraries
 * ✓ Creating reusable utilities
 * ✓ Complex domain logic
 * ✗ Simple applications
 * ✗ When it reduces readability
 * ✗ When simple types work fine
 * 
 * NEXT STEPS AFTER THIS FILE:
 * → Move to best-practices.ts to apply everything
 * → Build real projects using TypeScript
 * → Learn frameworks (React, Vue, Next.js)
 * → Contribute to open source TypeScript projects
 * → Explore advanced patterns in popular libraries
 */

// ===== ADVANCED UTILITY TYPES =====

// Extract
type EventType = "click" | "scroll" | "load";
type ScrollEvent = Extract<EventType, "scroll">; // "scroll"

// Exclude
type AllEvents = "click" | "scroll" | "load";
type ClickOrLoad = Exclude<AllEvents, "scroll">; // "click" | "load"

// NonNullable
type Nullable = string | null | undefined;
type NotNullable = NonNullable<Nullable>; // string

// ReturnType
function getUserId(): number {
  return 1;
}
type UserIdType = ReturnType<typeof getUserId>; // number

// Parameters
type GetUserParams = Parameters<typeof getUserId>; // []
function getUserByAge(age: number, active: boolean): User {
  return { name: "John", age };
}
type GetUserParams2 = Parameters<typeof getUserByAge>; // [age: number, active: boolean]

// InstanceType
class User {
  name: string = "John";
}
type UserInstance = InstanceType<typeof User>; // User

// ThisParameterType
function method(this: { value: number }, x: number) {
  return this.value + x;
}
type ThisType = ThisParameterType<typeof method>; // { value: number }

// Partial, Required, Readonly, Record
interface Config {
  host: string;
  port: number;
  timeout?: number;
}

type PartialConfig = Partial<Config>; // All properties optional
type RequiredConfig = Required<Config>; // All properties required
type ReadonlyConfig = Readonly<Config>; // All properties readonly
type ConfigDefaults = Record<"host" | "port" | "timeout", string | number>;

// ===== CONDITIONAL TYPES IN DEPTH =====

// Conditional type with infer
type Flatten<T> = T extends Array<infer U> ? U : T;

type Str = Flatten<string[]>; // string
type Num = Flatten<number>; // number

// Nested conditional
type ToPromise<T> = T extends Promise<infer U>
  ? Promise<U>
  : Promise<T>;

type A = ToPromise<number>; // Promise<number>
type B = ToPromise<Promise<string>>; // Promise<string>

// ===== MAPPED TYPES IN DEPTH =====

// Getters and setters
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type Setters<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (val: T[K]) => void;
};

interface User {
  name: string;
  age: number;
}

type UserGetters = Getters<User>; // { getName: () => string; getAge: () => number }
type UserSetters = Setters<User>; // { setName: (val: string) => void; setAge: (val: number) => void }

// Readonly mapping
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

// Nullable mapping
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

type NullableUser = Nullable<User>; // { name: string | null; age: number | null }

// ===== GENERIC CONSTRAINTS =====

// Constraint to specific type
function fillArray<T extends string | number>(value: T, count: number): T[] {
  return Array(count).fill(value);
}

fillArray("x", 3); // OK
fillArray(1, 3); // OK
// fillArray(true, 3); // Error

// Constraint to key of another type
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "John", age: 30 };
getProperty(user, "name"); // OK
// getProperty(user, "email"); // Error

// Constraint with function type
function process<T extends (x: unknown) => unknown>(fn: T): void {
  fn("anything");
}

// Constraint to constructor
function create<T>(constructor: new (...args: any[]) => T): T {
  return new constructor();
}

class MyClass {
  constructor() {
    console.log("Created");
  }
}

const instance = create(MyClass); // MyClass

// ===== VARIADIC TUPLE TYPES =====

// Tuple with rest element
type StringNumberBooleans = [string, number, ...boolean[]];

const a: StringNumberBooleans = ["hello", 42, true, false]; // OK

// Variadic label tuples
type StringNumberString = [...string[], number, ...string[]];

// Tail call helpers
type Tail<T extends unknown[]> = T extends [unknown, ...infer U] ? U : [];

type MyCons = Tail<[1, 2, 3, 4]>; // [2, 3, 4]

// ===== RECURSIVE TYPES =====

type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

const json: JSONValue = {
  name: "John",
  age: 30,
  hobbies: ["reading", "coding"],
  nested: {
    level: 2,
    data: [1, 2, 3]
  }
};

// Deep readonly
type DeepReadonly<T> = T extends object
  ? {
      readonly [K in keyof T]: DeepReadonly<T[K]>;
    }
  : T;

type ReadonlyUser = DeepReadonly<{
  name: string;
  address: { street: string; city: string };
}>;

// ===== DESIGN PATTERNS =====

// Observer Pattern
interface Observer {
  update(data: unknown): void;
}

class Subject {
  private observers: Observer[] = [];

  attach(observer: Observer): void {
    this.observers.push(observer);
  }

  detach(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(data: unknown): void {
    this.observers.forEach(observer => observer.update(data));
  }
}

class ConcreteObserver implements Observer {
  update(data: unknown): void {
    console.log("Updated:", data);
  }
}

// Strategy Pattern
interface Strategy {
  execute(data: string[]): string;
}

class SortStrategy implements Strategy {
  execute(data: string[]): string {
    return data.sort().join(", ");
  }
}

class ReverseStrategy implements Strategy {
  execute(data: string[]): string {
    return data.reverse().join(", ");
  }
}

class Context {
  private strategy: Strategy;

  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: Strategy): void {
    this.strategy = strategy;
  }

  execute(data: string[]): string {
    return this.strategy.execute(data);
  }
}

// Decorator Pattern
interface Component {
  operation(): string;
}

class ConcreteComponent implements Component {
  operation(): string {
    return "ConcreteComponent";
  }
}

abstract class Decorator implements Component {
  protected component: Component;

  constructor(component: Component) {
    this.component = component;
  }

  operation(): string {
    return this.component.operation();
  }
}

class ConcreteDecorator extends Decorator {
  operation(): string {
    return `ConcreteDecorator(${super.operation()})`;
  }
}

// Factory Pattern
interface Animal {
  speak(): void;
}

class Dog implements Animal {
  speak(): void {
    console.log("Woof");
  }
}

class Cat implements Animal {
  speak(): void {
    console.log("Meow");
  }
}

class AnimalFactory {
  static create(type: "dog" | "cat"): Animal {
    switch (type) {
      case "dog":
        return new Dog();
      case "cat":
        return new Cat();
    }
  }
}

// Singleton Pattern
class Database {
  private static instance: Database;
  private data: string[] = [];

  private constructor() {}

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  getData(): string[] {
    return this.data;
  }

  addData(item: string): void {
    this.data.push(item);
  }
}

const db1 = Database.getInstance();
const db2 = Database.getInstance();
console.log(db1 === db2); // true

// ===== TYPE-SAFE EVENT EMITTER =====

type EventMap = {
  "user:created": { id: number; name: string };
  "user:deleted": { id: number };
  "post:updated": { postId: number; content: string };
};

class TypedEventEmitter<T extends Record<string, unknown>> {
  private listeners: Map<string, Function[]> = new Map();

  on<E extends keyof T>(event: E, handler: (data: T[E]) => void): void {
    if (!this.listeners.has(String(event))) {
      this.listeners.set(String(event), []);
    }
    this.listeners.get(String(event))!.push(handler);
  }

  emit<E extends keyof T>(event: E, data: T[E]): void {
    const handlers = this.listeners.get(String(event)) || [];
    handlers.forEach(handler => handler(data));
  }
}

const emitter = new TypedEventEmitter<EventMap>();

emitter.on("user:created", (data) => {
  console.log(data.id, data.name); // Type-safe
});

emitter.emit("user:created", { id: 1, name: "John" }); // Type-safe

// ===== ASYNC ITERATORS =====

async function* asyncGenerator(): AsyncGenerator<number> {
  yield 1;
  await new Promise(resolve => setTimeout(resolve, 100));
  yield 2;
  yield 3;
}

async function consumeAsync() {
  for await (const value of asyncGenerator()) {
    console.log(value);
  }
}

// ===== PROMISE UTILITY TYPE =====

type Awaited<T> = T extends Promise<infer U> ? U : T;

type A = Awaited<Promise<string>>; // string
type B = Awaited<string>; // string

// ===== CONST TYPE PARAMETERS =====

function createConstArray<const T extends readonly any[]>(arr: T): T {
  return arr;
}

const result = createConstArray(["a", "b", "c"]); // ["a", "b", "c"]
// Without const, it would be string[]

// ===== SATISFIES OPERATOR =====

type Config = {
  dev: { db: string; port: number };
  prod: { db: string; port: number };
};

const config = {
  dev: { db: "localhost", port: 3000 },
  prod: { db: "example.com", port: 5432 }
} satisfies Config;

// config is still type { dev: { db: string; port: number }; ... }
// not Config, so you can still access properties with auto-completion
