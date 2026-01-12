/**
 * 📚 TYPESCRIPT - UTILITY TYPES & ADVANCED TYPE SYSTEM
 * 
 * PREREQUISITE: advanced-patterns.ts
 * TIME TO COMPLETE: 2-3 days
 * DIFFICULTY: Advanced
 * 
 * WHAT YOU'LL LEARN:
 * • All built-in utility types
 * • How to create custom utility types
 * • Type transformations and mappings
 * • Advanced patterns for reusable types
 * • Real-world utility type examples
 * • Performance considerations for types
 * 
 * KEY CONCEPTS TO UNDERSTAND:
 * 1. Utility types: Transform existing types
 * 2. Mapped types: Loop through properties
 * 3. Conditional types: Type based on condition
 * 4. Infer keyword: Extract types from patterns
 * 5. Generics: Type parameters
 * 6. Constraints: Limit generic types
 * 7. Namespacing types: Organize complex types
 * 
 * WHY UTILITY TYPES MATTER:
 * • DRY principle (Don't Repeat Yourself)
 * • Maintain single source of truth
 * • Type transformations reduce errors
 * • Better IDE support and autocomplete
 * • Self-documenting code
 * • Reusable patterns
 * 
 * LEARNING PATH FOR THIS FILE:
 * 1. Understand each built-in utility type
 * 2. Understand when to use each one
 * 3. Learn to compose utility types
 * 4. Learn to create custom utilities
 * 5. Learn real-world patterns
 * 6. Practice with your own code
 * 
 * NEXT STEPS AFTER THIS FILE:
 * → Apply utility types in real projects
 * → Create library-specific utility types
 * → Learn framework-specific types (React, etc.)
 */

// ===== BUILT-IN UTILITY TYPES =====

// 1. PARTIAL<T> - Make all properties optional
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

type PartialUser = Partial<User>;
// Equivalent to: { id?: number; name?: string; email?: string; age?: number }

const user1: PartialUser = {}; // OK - all optional
const user2: PartialUser = { name: "John" }; // OK - partial data

// Practical: Update function accepts partial data
function updateUser(id: number, updates: Partial<User>) {
  // Can update any combination of fields
}

// 2. REQUIRED<T> - Make all properties required
type RequiredUser = Required<PartialUser>;
// Equivalent to: { id: number; name: string; email: string; age: number }

const user3: RequiredUser = {
  id: 1,
  name: "John",
  email: "john@example.com",
  age: 30,
}; // OK
// const user4: RequiredUser = { name: "Jane" }; // Error - missing fields

// 3. READONLY<T> - Make all properties readonly
type ReadonlyUser = Readonly<User>;
// Equivalent to: { readonly id: number; readonly name: string; ... }

const user5: ReadonlyUser = {
  id: 1,
  name: "John",
  email: "john@example.com",
  age: 30,
};

// user5.name = "Jane"; // Error - readonly

// 4. RECORD<K, T> - Create object with specific keys
type Color = "red" | "green" | "blue";
type ColorMap = Record<Color, string>;
// Equivalent to: { red: string; green: string; blue: string }

const colors: ColorMap = {
  red: "#FF0000",
  green: "#00FF00",
  blue: "#0000FF",
};

// Practical: Map of user roles to permissions
type Role = "admin" | "user" | "guest";
type Permissions = Record<Role, string[]>;

const permissions: Permissions = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"],
};

// 5. PICK<T, K> - Select specific properties
type UserPreview = Pick<User, "name" | "email">;
// Equivalent to: { name: string; email: string }

const preview: UserPreview = {
  name: "John",
  email: "john@example.com",
};

// Practical: API response might only have certain fields
type APIUserResponse = Pick<User, "id" | "name">;

// 6. OMIT<T, K> - Exclude specific properties
type UserWithoutEmail = Omit<User, "email">;
// Equivalent to: { id: number; name: string; age: number }

const userWithoutEmail: UserWithoutEmail = {
  id: 1,
  name: "John",
  age: 30,
};

// Practical: Hide sensitive fields
type PublicUser = Omit<User, "email">; // Don't expose email publicly

// 7. EXTRACT<T, U> - Get types that match
type EventType = "click" | "hover" | "scroll" | "resize";
type MouseEvent = Extract<EventType, "click" | "hover">; // "click" | "hover"

// Practical: Filter string literal types
type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type WriteMethods = Extract<Method, "POST" | "PUT" | "PATCH">; // Mutation methods

// 8. EXCLUDE<T, U> - Get types that don't match
type NonMouseEvent = Exclude<EventType, "click" | "hover">; // "scroll" | "resize"

// Practical: Exclude undefined from union
type Nullable = string | null | undefined;
type NotNull = Exclude<Nullable, null | undefined>; // string

// 9. NONNULLABLE<T> - Exclude null and undefined
type Result = string | null | undefined;
type ValidResult = NonNullable<Result>; // string

// 10. RETURNTYPE<T> - Get function return type
function getUserById(id: number): User {
  return { id: 1, name: "John", email: "john@example.com", age: 30 };
}

type UserResult = ReturnType<typeof getUserById>; // User

// Practical: Type based on function return
type APIResponse = ReturnType<() => Promise<User>>; // Promise<User>

// 11. PARAMETERS<T> - Get function parameter types
function createUser(name: string, email: string, age: number): void {}

type CreateUserParams = Parameters<typeof createUser>; // [name: string, email: string, age: number]

// Practical: Extract params for validation
const validateCreateUser = (params: Parameters<typeof createUser>) => {
  const [name, email, age] = params;
  // Validate...
};

// 12. CONSTRUCTORPARAMETERS<T> - Get constructor parameters
class User_Class {
  constructor(public name: string, public email: string) {}
}

type UserConstructorParams = ConstructorParameters<typeof User_Class>; // [name: string, email: string]

// 13. INSTANCETYPE<T> - Get instance type from constructor
type UserInstance = InstanceType<typeof User_Class>; // User_Class

// 14. THISPARAMETERTYPE<T> - Get 'this' type
function formatUser(this: User) {
  return `${this.name} <${this.email}>`;
}

type ThisType = ThisParameterType<typeof formatUser>; // User

// 15. OMITTHISPARAMETER<T> - Remove 'this' parameter
type FormattedFunction = OmitThisParameter<typeof formatUser>; // (this: void) => string

// 16. AWAITED<T> - Get type inside Promise
type PromiseString = Promise<string>;
type UnwrappedString = Awaited<PromiseString>; // string

// Works with nested promises
type NestedPromise = Promise<Promise<User>>;
type UnwrappedUser = Awaited<NestedPromise>; // User

// ===== CUSTOM UTILITY TYPES =====

// Create custom utilities for your domain

// 1. Make properties optional by key
type PartialByKey<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type UserPartialAge = PartialByKey<User, "age">;
// Equivalent to: { id: number; name: string; email: string; age?: number }

// 2. Make properties readonly by key
type ReadonlyByKey<T, K extends keyof T> = Omit<T, K> &
  Readonly<Pick<T, K>>;

type UserReadonlyId = ReadonlyByKey<User, "id">;
// id is readonly, others are normal

// 3. Get keys of specific type
type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

type StringKeys = KeysOfType<User, string>; // "name" | "email"
type NumberKeys = KeysOfType<User, number>; // "id" | "age"

// 4. Get properties of specific type
type PropertiesOfType<T, U> = Pick<T, KeysOfType<T, U>>;

type StringProperties = PropertiesOfType<User, string>; // { name: string; email: string }
type NumberProperties = PropertiesOfType<User, number>; // { id: number; age: number }

// 5. Getters object type
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type UserGetters = Getters<User>;
// {
//   getId: () => number;
//   getName: () => string;
//   getEmail: () => string;
//   getAge: () => number;
// }

// 6. Setters object type
type Setters<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

type UserSetters = Setters<User>;

// 7. Add prefix and suffix
type WithPrefix<T, Prefix extends string> = {
  [K in keyof T as `${Prefix}${string & K}`]: T[K];
};

type PrefixedUser = WithPrefix<User, "user_">;
// { user_id: number; user_name: string; ... }

// 8. Nullable properties
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

type NullableUser = Nullable<User>;
// { id: number | null; name: string | null; ... }

// 9. Optional properties
type Optional<T> = {
  [K in keyof T]?: T[K];
};

type OptionalUser = Optional<User>; // Same as Partial<User>

// 10. Deep readonly
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object
    ? DeepReadonly<T[K]>
    : T[K];
};

interface Profile {
  user: User;
  settings: {
    theme: string;
    notifications: boolean;
  };
}

type DeepReadonlyProfile = DeepReadonly<Profile>;

// 11. Flatten union types
type Flatten<T> = T extends Array<infer U> ? U : T;

type FlattenedArray = Flatten<string[]>; // string
type FlattenedString = Flatten<string>; // string

// 12. Union to intersection
type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

type Combined = UnionToIntersection<{ a: 1 } | { b: 2 }>; // { a: 1; b: 2 }

// 13. Array flatten
type FlatArray<T> = T extends Array<infer U>
  ? U extends Array<any>
    ? FlatArray<U>
    : U
  : T;

type Flattened = FlatArray<[1, [2, [3]]]>; // 1 | 2 | 3

// ===== CONDITIONAL TYPES WITH UTILITIES =====

// 1. Check if type is union
type IsUnion<T> = [T] extends [infer U]
  ? [U] extends [T]
    ? false
    : true
  : false;

type Test1 = IsUnion<string | number>; // true
type Test2 = IsUnion<string>; // false

// 2. Check if type is any
type IsAny<T> = 0 extends 1 & T ? true : false;

type Test3 = IsAny<any>; // true
type Test4 = IsAny<string>; // false

// 3. Check if type is never
type IsNever<T> = [T] extends [never] ? true : false;

type Test5 = IsNever<never>; // true
type Test6 = IsNever<string>; // false

// 4. Infer array element type
type ArrayElement<T extends any[]> = T extends (infer E)[] ? E : never;

type Element = ArrayElement<[string, number, boolean]>; // string | number | boolean

// 5. Infer function return
type FunctionReturnType<T> = T extends (...args: any[]) => infer R
  ? R
  : never;

type Return = FunctionReturnType<(a: string) => number>; // number

// ===== REAL-WORLD EXAMPLES =====

// API Response wrapper
interface APIResponse<T> {
  status: "success" | "error";
  data: T;
  error?: Error;
}

// Extract success type
type SuccessData<T> = T extends APIResponse<infer U> ? U : never;

type UserData = SuccessData<APIResponse<User>>; // User

// Form state builder
type FormState<T> = {
  [K in keyof T]: {
    value: T[K];
    error?: string;
    isDirty: boolean;
    isTouched: boolean;
  };
};

type UserFormState = FormState<User>;
// {
//   id: { value: number; error?: string; isDirty: boolean; isTouched: boolean };
//   name: { value: string; error?: string; isDirty: boolean; isTouched: boolean };
//   ...
// }

// Observer pattern with type safety
type Listeners<T> = {
  [K in keyof T]: Set<(value: T[K]) => void>;
};

class Observable<T> {
  private listeners: Listeners<T> = {} as Listeners<T>;

  on<K extends keyof T>(event: K, handler: (value: T[K]) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = new Set();
    }
    this.listeners[event].add(handler);
  }

  emit<K extends keyof T>(event: K, value: T[K]) {
    this.listeners[event]?.forEach((handler) => handler(value));
  }
}

type UserEvents = {
  nameChanged: string;
  emailChanged: string;
  ageChanged: number;
};

const userObservable = new Observable<UserEvents>();
userObservable.on("nameChanged", (newName) => {
  // newName is typed as string
  console.log("Name changed to:", newName);
});

// Redux-like store
type State = { count: number; name: string };

type Action =
  | { type: "INCREMENT"; payload: number }
  | { type: "SET_NAME"; payload: string };

type Reducer<S, A> = (state: S, action: A) => S;

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + action.payload };
    case "SET_NAME":
      return { ...state, name: action.payload };
    default:
      return state;
  }
};

// Tuple manipulation
type Head<T extends any[]> = T extends [infer H, ...any[]] ? H : never;
type Tail<T extends any[]> = T extends [any, ...infer T] ? T : never;
type Concat<T extends any[], U extends any[]> = [...T, ...U];

type First = Head<[string, number, boolean]>; // string
type Rest = Tail<[string, number, boolean]>; // [number, boolean]
type Combined2 = Concat<[string], [number, boolean]>; // [string, number, boolean]

// Path-based type access
type Get<T, P> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? Get<T[K], Rest>
    : never
  : P extends keyof T
  ? T[P]
  : never;

type Setting = Get<Profile, "settings.theme">; // string

console.log("TypeScript utility types mastery achieved! 🎯");
