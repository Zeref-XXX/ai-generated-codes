/**
 * 📚 STEP 5️⃣  - REACT FUNDAMENTALS: COMPONENTS & JSX
 * 
 * PREREQUISITE: TypeScript fundamentals (04-typescript/fundamentals.ts)
 * TIME TO COMPLETE: 2-3 days
 * DIFFICULTY: Beginner-Intermediate
 * 
 * WHAT YOU'LL LEARN:
 * • What React is and why it matters
 * • Components as building blocks
 * • JSX syntax and how it compiles
 * • Functional vs Class components (we use functional)
 * • Props and component composition
 * • State with useState hook
 * • Event handling in React
 * • Conditional rendering
 * • Lists and keys
 * • Component lifecycle basics
 * 
 * KEY CONCEPTS TO UNDERSTAND:
 * 1. React: Library for building UIs with components
 * 2. Components: Reusable pieces of UI
 * 3. JSX: Syntax extension for writing HTML-like code in JS
 * 4. Props: Function arguments for components
 * 5. State: Component data that can change
 * 6. Rendering: React updating the DOM when state/props change
 * 7. Events: User interactions like clicks
 * 8. Keys: Identifiers for list items
 * 
 * WHY REACT?
 * 1. Declarative: Describe what UI should look like
 * 2. Component-based: Build with reusable pieces
 * 3. Reactive: Automatically update when data changes
 * 4. Large ecosystem: Tons of libraries and tools
 * 5. High demand: Used by most modern companies
 * 6. Developer experience: Great tooling and community
 * 
 * LEARNING PATH FOR THIS FILE:
 * 1. Understand what React is
 * 2. Learn JSX syntax and compilation
 * 3. Create your first component
 * 4. Learn about props
 * 5. Learn about state with useState
 * 6. Handle user events
 * 7. Render lists with keys
 * 8. Conditional rendering patterns
 * 
 * FUNCTIONAL COMPONENTS (what we use):
 * • Function that returns JSX
 * • Easier to understand and test
 * • Can use hooks
 * • Preferred in modern React
 * 
 * IMPORTANT LEARNING NOTES:
 * • Every React app starts with a root component
 * • Components are functions that return JSX
 * • JSX looks like HTML but it's JavaScript
 * • Props are read-only
 * • State changes trigger re-renders
 * • Always provide keys for lists
 * • Component names must start with uppercase
 * • JSX expressions go in curly braces {}
 * 
 * COMMON MISTAKES TO AVOID:
 * 1. Mutating props directly
 * 2. Forgetting keys in lists
 * 3. Modifying state directly instead of with setState
 * 4. Calling hooks outside of components
 * 5. Component names starting with lowercase
 * 6. Not passing keys uniquely for lists
 * 7. Using array index as key (anti-pattern)
 * 
 * SETUP CHECKLIST:
 * Before starting:
 * • Node.js installed
 * • npm or yarn installed
 * • VS Code with React extensions
 * • Understanding of JavaScript and TypeScript
 * • Basic understanding of DOM
 * 
 * NEXT STEPS AFTER THIS FILE:
 * → Move to hooks-essentials.jsx for useState/useEffect
 * → Learn about side effects and data fetching
 * → Build real components with external data
 */

// ===== WHAT IS REACT =====

/**
 * React is a JavaScript library for building user interfaces
 * with components that efficiently update when data changes.
 * 
 * Key idea: UI = f(state)
 * The UI is a function of your state/data
 * When data changes, React re-renders the UI
 */

// ===== JSX SYNTAX =====

/**
 * JSX is NOT valid JavaScript - it's compiled to function calls
 * <Component prop="value">content</Component>
 * becomes
 * React.createElement(Component, {prop: "value"}, "content")
 */

// Basic JSX element
const element = <h1>Hello, React!</h1>;
// ↑ This is JSX - looks like HTML

// JSX with expressions (use curly braces for JS)
const name = "Alice";
const greeting = <h1>Hello, {name}!</h1>;
// ↑ {name} inserts the variable value

// JSX with attributes
const button = <button className="primary" disabled={false}>Click me</button>;
// Note: className instead of class (class is reserved in JS)

// JSX with children
const container = (
  <div className="card">
    <h2>Title</h2>
    <p>Description</p>
  </div>
);

// ===== FUNCTIONAL COMPONENTS =====

/**
 * A component is a function that returns JSX
 * Component names must start with uppercase
 * Props are parameters passed to the component
 */

// Simple component
function Welcome() {
  return <h1>Welcome to React!</h1>;
}

// Component with props
function Greeting({ name, age }) {
  return <p>Hello {name}, you are {age} years old!</p>;
}

// Using components
export default function App() {
  return (
    <div>
      <Welcome />
      <Greeting name="Alice" age={25} />
    </div>
  );
}

// ===== PROPS (PROPERTIES) =====

/**
 * Props are how you pass data to components
 * Props are read-only - components should not modify them
 * Props flow down from parent to child
 */

// Basic props
function Card({ title, description, color }) {
  return (
    <div style={{ borderColor: color, borderWidth: 2 }}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

// Using the Card component
function CardExample() {
  return (
    <div>
      <Card 
        title="First Card" 
        description="This is the first card"
        color="blue"
      />
      <Card 
        title="Second Card" 
        description="This is the second card"
        color="red"
      />
    </div>
  );
}

// Props with default values
function Button({ text = "Click me", size = "medium" }) {
  const sizeClass = size === "large" ? "btn-large" : "btn-small";
  return <button className={sizeClass}>{text}</button>;
}

// Props with children
function Container({ children, backgroundColor }) {
  return (
    <div style={{ backgroundColor }}>
      {children}
    </div>
  );
}

// Using Container component
function ContainerExample() {
  return (
    <Container backgroundColor="lightblue">
      <h1>Content inside container</h1>
      <p>This can be any JSX</p>
    </Container>
  );
}

// ===== STATE WITH USESTATE =====

/**
 * State is data that can change over time
 * useState is a hook that adds state to functional components
 * When state changes, React re-renders the component
 */

import { useState } from "react";

// Simple counter example
function Counter() {
  // useState returns [currentValue, functionToUpdateValue]
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

// Multiple state variables
function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log({ name, email });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
      />
      <button type="submit">Submit</button>
      {submitted && <p>Form submitted!</p>}
    </form>
  );
}

// State with complex data
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build a component", completed: false }
  ]);
  
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };
  
  const addTodo = (text) => {
    setTodos([
      ...todos,
      { id: Date.now(), text, completed: false }
    ]);
  };
  
  return (
    <div>
      <ul>
        {todos.map(todo => (
          <li 
            key={todo.id}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.text}
          </li>
        ))}
      </ul>
      <button onClick={() => addTodo("New task")}>Add Todo</button>
    </div>
  );
}

// ===== EVENT HANDLING =====

/**
 * React events are similar to DOM events
 * Event handlers are camelCase: onClick, onChange, onSubmit, etc.
 * Event handlers receive a SyntheticEvent object
 */

// Click handler
function ClickExample() {
  const handleClick = () => {
    console.log("Button clicked!");
  };
  
  return <button onClick={handleClick}>Click me</button>;
}

// With parameters
function DeleteButton({ id }) {
  const handleDelete = () => {
    console.log("Deleting item", id);
  };
  
  return <button onClick={handleDelete}>Delete</button>;
}

// Inline handler (less common)
function InlineHandler() {
  return (
    <button onClick={() => alert("Clicked!")}>
      Click me
    </button>
  );
}

// Change handler
function InputExample() {
  const [value, setValue] = useState("");
  
  const handleChange = (e) => {
    // e.target.value is the input value
    setValue(e.target.value);
  };
  
  return (
    <div>
      <input 
        type="text" 
        value={value}
        onChange={handleChange}
      />
      <p>You typed: {value}</p>
    </div>
  );
}

// ===== CONDITIONAL RENDERING =====

/**
 * Render different JSX based on conditions
 * Methods: if statements, ternary operator, logical AND
 */

// Using if statement (outside JSX)
function LoginStatus({ isLoggedIn }) {
  if (isLoggedIn) {
    return <p>Welcome back!</p>;
  } else {
    return <p>Please log in</p>;
  }
}

// Using ternary operator (inside JSX)
function Toggle({ isOn }) {
  return <p>{isOn ? "Light is ON" : "Light is OFF"}</p>;
}

// Using logical AND operator
function Notification({ hasMessages }) {
  return (
    <div>
      {hasMessages && <p>You have new messages!</p>}
    </div>
  );
}

// Complex conditional rendering
function UserProfile({ user, isLoading, error }) {
  if (isLoading) {
    return <p>Loading...</p>;
  }
  
  if (error) {
    return <p>Error: {error}</p>;
  }
  
  if (!user) {
    return <p>No user found</p>;
  }
  
  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
}

// ===== RENDERING LISTS =====

/**
 * Use .map() to render lists in React
 * Always provide a unique 'key' for each list item
 * Keys help React identify which items have changed
 */

// Simple list
function SimpleList() {
  const items = ["Apple", "Banana", "Cherry"];
  
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

// List of objects (better with proper keys)
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name} ({user.email})
        </li>
      ))}
    </ul>
  );
}

// Example usage
function UserListExample() {
  const users = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com" }
  ];
  
  return <UserList users={users} />;
}

// List with interactive items
function SelectableList() {
  const [selected, setSelected] = useState(null);
  
  const items = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" }
  ];
  
  return (
    <ul>
      {items.map(item => (
        <li 
          key={item.id}
          onClick={() => setSelected(item.id)}
          style={{ backgroundColor: selected === item.id ? "lightblue" : "white" }}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}

// ===== COMPONENT COMPOSITION =====

/**
 * Build complex UIs by combining simple components
 * Each component should have a single responsibility
 * Pass data through props, down the component tree
 */

// Small reusable components
function Avatar({ src, alt, size = "medium" }) {
  const sizeClass = `avatar-${size}`;
  return <img src={src} alt={alt} className={sizeClass} />;
}

function UserInfo({ name, role }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  );
}

// Composed component using smaller ones
function UserCard({ user }) {
  return (
    <div className="card">
      <Avatar src={user.avatar} alt={user.name} size="large" />
      <UserInfo name={user.name} role={user.role} />
    </div>
  );
}

// Usage
function UserCardExample() {
  const user = {
    id: 1,
    name: "Alice Johnson",
    role: "React Developer",
    avatar: "https://example.com/alice.jpg"
  };
  
  return <UserCard user={user} />;
}

// ===== KEYS IN LISTS - IMPORTANT! =====

/**
 * Keys tell React which items have changed
 * Use unique identifiers, not array indices
 * Index as key only works if list never reorders/filters/adds/removes
 */

// ❌ BAD: Using index as key
function BadKeyExample({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item.name}</li>
      ))}
    </ul>
  );
}

// ✅ GOOD: Using unique ID as key
function GoodKeyExample({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

// ===== LIFTING STATE UP =====

/**
 * When multiple components need the same state,
 * move the state up to the nearest common parent
 */

function TemperatureConverter() {
  const [celsius, setCelsius] = useState(0);
  
  const fahrenheit = (celsius * 9/5) + 32;
  
  return (
    <div>
      <div>
        <h3>Celsius</h3>
        <input 
          type="number"
          value={celsius}
          onChange={(e) => setCelsius(Number(e.target.value))}
        />
      </div>
      <div>
        <h3>Fahrenheit</h3>
        <p>{fahrenheit.toFixed(2)}°F</p>
      </div>
    </div>
  );
}

// ===== BEST PRACTICES CHECKLIST =====

/**
 * ✓ Component names start with uppercase
 * ✓ Props are read-only
 * ✓ State is updated with setState, never mutated directly
 * ✓ Keys are unique for list items (not indices)
 * ✓ Each component has a single responsibility
 * ✓ Props are passed down, events bubble up
 * ✓ Components are pure (same props = same output)
 * ✓ Use meaningful prop and variable names
 * ✓ Keep components small and focused
 * ✓ Separate concerns (state, display, logic)
 */

/**
 * NEXT STEPS:
 * 1. Practice: Build a simple todo app
 * 2. Learn: useEffect for side effects
 * 3. Learn: useState with complex state
 * 4. Move to: hooks-essentials.jsx
 */
