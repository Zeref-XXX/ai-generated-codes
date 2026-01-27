/**
 * REACT FUNDAMENTALS - CODE ALONG WITH OUTPUT EXAMPLES
 * 
 * These are practical examples you can run and see the output
 * Copy these examples into a React project to see them in action
 */

// ===== BASIC COMPONENT & JSX =====

import React, { useState } from "react";

// Simple component that returns JSX
function Welcome() {
  return <h1>Hello, React!</h1>;
  // OUTPUT IN BROWSER:
  // <h1>Hello, React!</h1>
}

// Component with props
function Greeting({ name, age }) {
  return (
    <div>
      <p>Hello {name}, you are {age} years old!</p>
    </div>
  );
  // OUTPUT: Hello Alice, you are 25 years old!
}

// Using the component
function BasicExample() {
  return (
    <>
      <Welcome />
      <Greeting name="Alice" age={25} />
      <Greeting name="Bob" age={30} />
    </>
  );
}
// OUTPUT:
// Hello, React!
// Hello Alice, you are 25 years old!
// Hello Bob, you are 30 years old!

// ===== PROPS EXAMPLES =====

function Card({ title, description, color }) {
  return (
    <div style={{ 
      border: `2px solid ${color}`, 
      padding: "16px", 
      borderRadius: "8px",
      marginBottom: "16px"
    }}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function CardExample() {
  return (
    <>
      <Card 
        title="React" 
        description="A JavaScript library for building UIs"
        color="blue"
      />
      <Card 
        title="JavaScript" 
        description="The programming language of the web"
        color="red"
      />
    </>
  );
}
// OUTPUT (RENDERED):
// ┌─────────────────────────────────────────┐
// │ React                                   │
// │ A JavaScript library for building UIs   │
// └─────────────────────────────────────────┘
// 
// ┌─────────────────────────────────────────┐
// │ JavaScript                              │
// │ The programming language of the web     │
// └─────────────────────────────────────────┘

// ===== STATE WITH USESTATE =====

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
  
  // OUTPUT:
  // Count: 0
  // [Increment] [Decrement] [Reset]
  // 
  // When you click Increment:
  // Count: 1
  // When you click again:
  // Count: 2
}

// State with multiple values
function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Form submitted:", { name, email });
    // OUTPUT: Form submitted: { name: 'Alice', email: 'alice@example.com' }
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
      {submitted && <p>✓ Form submitted successfully!</p>}
    </form>
  );
  
  // OUTPUT:
  // [Enter name] [Enter email] [Submit]
  // 
  // User types:
  // [Alice] [alice@example.com] [Submit]
  // ✓ Form submitted successfully!
}

// State with objects
function UserProfile() {
  const [user, setUser] = useState({
    name: "Alice",
    email: "alice@example.com",
    age: 25
  });
  
  const updateName = (newName) => {
    setUser({ ...user, name: newName });
  };
  
  const incrementAge = () => {
    setUser({ ...user, age: user.age + 1 });
  };
  
  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Age: {user.age}</p>
      <button onClick={() => updateName("Bob")}>Change Name to Bob</button>
      <button onClick={incrementAge}>Birthday</button>
    </div>
  );
  
  // OUTPUT:
  // Name: Alice
  // Email: alice@example.com
  // Age: 25
  // [Change Name to Bob] [Birthday]
  //
  // After clicking "Change Name to Bob":
  // Name: Bob
  // Email: alice@example.com
  // Age: 25
  //
  // After clicking "Birthday":
  // Name: Bob
  // Email: alice@example.com
  // Age: 26
}

// ===== CONDITIONAL RENDERING =====

function LoginStatus({ isLoggedIn, userName }) {
  return (
    <div>
      {isLoggedIn ? (
        <p>Welcome back, {userName}!</p>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
  
  // OUTPUT when isLoggedIn=true:
  // Welcome back, Alice!
  //
  // OUTPUT when isLoggedIn=false:
  // Please log in
}

function NotificationBox({ hasMessages, hasErrors }) {
  return (
    <div>
      {hasMessages && <p>📧 You have new messages</p>}
      {hasErrors && <p>⚠️ There are errors to fix</p>}
      {!hasMessages && !hasErrors && <p>✓ All clear!</p>}
    </div>
  );
  
  // OUTPUT example 1:
  // 📧 You have new messages
  // ⚠️ There are errors to fix
  //
  // OUTPUT example 2:
  // ✓ All clear!
}

// ===== RENDERING LISTS =====

function SimpleList() {
  const items = ["Apple", "Banana", "Cherry", "Date"];
  
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
  
  // OUTPUT:
  // • Apple
  // • Banana
  // • Cherry
  // • Date
}

function UserList() {
  const users = [
    { id: 1, name: "Alice", role: "Developer" },
    { id: 2, name: "Bob", role: "Designer" },
    { id: 3, name: "Charlie", role: "Manager" }
  ];
  
  return (
    <div>
      <h2>Team Members</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
  
  // OUTPUT:
  // Team Members
  // • Alice - Developer
  // • Bob - Designer
  // • Charlie - Manager
}

function InteractiveTodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build a project", completed: false },
    { id: 3, text: "Deploy to web", completed: false }
  ]);
  
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };
  
  return (
    <div>
      <h2>My Todos</h2>
      <ul>
        {todos.map(todo => (
          <li 
            key={todo.id}
            style={{ 
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "pointer"
            }}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.completed ? "✓" : "○"} {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
  
  // OUTPUT (initial):
  // My Todos
  // ○ Learn React
  // ○ Build a project
  // ○ Deploy to web
  //
  // OUTPUT (after clicking "Learn React"):
  // My Todos
  // ✓ Learn React
  // ○ Build a project
  // ○ Deploy to web
}

// ===== COMPONENT COMPOSITION =====

function Avatar({ src, size = "medium", alt = "User" }) {
  const sizePixels = { small: 32, medium: 48, large: 64 };
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: sizePixels[size],
        height: sizePixels[size],
        borderRadius: "50%"
      }}
    />
  );
}

function UserInfo({ name, title }) {
  return (
    <div>
      <h3>{name}</h3>
      <p style={{ color: "gray" }}>{title}</p>
    </div>
  );
}

function UserProfile_Composed() {
  return (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Avatar src="https://via.placeholder.com/64" size="large" />
      <UserInfo name="Alice Johnson" title="React Developer" />
    </div>
  );
  
  // OUTPUT (VISUAL):
  // [AVATAR] Alice Johnson
  //          React Developer
}

// ===== EVENT HANDLING =====

function EventHandlingExample() {
  const [clicks, setClicks] = useState(0);
  const [inputValue, setInputValue] = useState("");
  
  const handleClick = () => {
    setClicks(clicks + 1);
    console.log("Button clicked!");
    // OUTPUT: Button clicked!
  };
  
  const handleChange = (e) => {
    setInputValue(e.target.value);
    console.log("You typed:", e.target.value);
    // OUTPUT (as you type):
    // You typed: A
    // You typed: Al
    // You typed: Ali
  };
  
  return (
    <div>
      <button onClick={handleClick}>Click me!</button>
      <p>Clicks: {clicks}</p>
      
      <input 
        value={inputValue}
        onChange={handleChange}
        placeholder="Type something..."
      />
      <p>You typed: {inputValue}</p>
    </div>
  );
  
  // OUTPUT:
  // [Click me!]
  // Clicks: 0
  // [Type something...]
  // You typed:
  //
  // After clicking button:
  // [Click me!]
  // Clicks: 1
  //
  // After typing "Hello":
  // [Type something...]
  // You typed: Hello
}

// ===== CONDITIONAL STYLING =====

function StatusIndicator({ status }) {
  const statusColors = {
    online: "green",
    away: "orange",
    offline: "gray"
  };
  
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div
        style={{
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          backgroundColor: statusColors[status]
        }}
      />
      <span>{status}</span>
    </div>
  );
  
  // OUTPUT (visual):
  // ● online    (green dot)
  // ● away      (orange dot)
  // ● offline   (gray dot)
}

// ===== FILTERS AND SORTING =====

function FilterableList() {
  const allItems = ["Apple", "Apricot", "Banana", "Blueberry", "Cherry"];
  const [filter, setFilter] = useState("");
  
  const filtered = allItems.filter(item =>
    item.toLowerCase().includes(filter.toLowerCase())
  );
  
  return (
    <div>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search..."
      />
      <p>Found: {filtered.length}</p>
      <ul>
        {filtered.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
  
  // OUTPUT (initial):
  // [Search...]
  // Found: 5
  // • Apple
  // • Apricot
  // • Banana
  // • Blueberry
  // • Cherry
  //
  // OUTPUT (after typing "a"):
  // [Search...a]
  // Found: 3
  // • Apple
  // • Apricot
  // • Banana
}

// ===== LIFTING STATE UP =====

function TemperatureConverter() {
  const [celsius, setCelsius] = useState(0);
  
  const fahrenheit = (celsius * 9/5) + 32;
  const kelvin = celsius + 273.15;
  
  return (
    <div>
      <div>
        <label>Celsius:</label>
        <input
          type="number"
          value={celsius}
          onChange={(e) => setCelsius(Number(e.target.value))}
        />
      </div>
      <div>
        <p>Fahrenheit: {fahrenheit.toFixed(2)}°F</p>
        <p>Kelvin: {kelvin.toFixed(2)}K</p>
      </div>
    </div>
  );
  
  // OUTPUT (initial):
  // Celsius: [0]
  // Fahrenheit: 32.00°F
  // Kelvin: 273.15K
  //
  // OUTPUT (after entering 100):
  // Celsius: [100]
  // Fahrenheit: 212.00°F
  // Kelvin: 373.15K
}

// ===== COMPOUND DATA STRUCTURE =====

function ShoppingCart() {
  const [cart, setCart] = useState([
    { id: 1, name: "Laptop", price: 999, quantity: 1 },
    { id: 2, name: "Mouse", price: 29, quantity: 2 },
    { id: 3, name: "Keyboard", price: 79, quantity: 1 }
  ]);
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const updateQuantity = (id, newQuantity) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(0, newQuantity) }
        : item
    ));
  };
  
  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };
  
  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.map(item => (
        <div key={item.id} style={{ borderBottom: "1px solid #ddd", padding: "8px 0" }}>
          <p><strong>{item.name}</strong> - ${item.price}</p>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
            min="0"
          />
          <button onClick={() => removeItem(item.id)}>Remove</button>
          <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      ))}
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
  
  // OUTPUT:
  // Shopping Cart
  // Laptop - $999
  // [1] [Remove] Subtotal: $999.00
  // Mouse - $29
  // [2] [Remove] Subtotal: $58.00
  // Keyboard - $79
  // [1] [Remove] Subtotal: $79.00
  // Total: $1136.00
  //
  // After changing Mouse quantity to 5:
  // Total: $1292.00
}

export default BasicExample;
// To run other examples, change the export:
// export default Counter;
// export default Form;
// export default UserList;
// etc.
