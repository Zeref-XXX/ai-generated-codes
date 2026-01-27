/**
 * 📚 STEP 5️⃣D - REACT ADVANCED CONCEPTS
 * 
 * PREREQUISITE: React component patterns (05-react/component-patterns.jsx)
 * TIME TO COMPLETE: 2-3 days
 * DIFFICULTY: Advanced
 * 
 * WHAT YOU'LL LEARN:
 * • Error boundaries (catch React errors)
 * • Suspense and lazy loading
 * • Portals (render outside DOM tree)
 * • Fragments (group elements without wrapper)
 * • useReducer (complex state management)
 * • useLayoutEffect (before paint)
 * • Concurrent features basics
 * • Key drilling and anti-patterns
 * 
 * KEY CONCEPTS TO UNDERSTAND:
 * 1. Error boundaries: Component error catching
 * 2. Suspense: Code splitting and loading states
 * 3. Lazy: Dynamic component imports
 * 4. Portal: Render to different DOM node
 * 5. Fragment: Group without adding DOM node
 * 6. useReducer: Redux-like state management
 * 7. useLayoutEffect: Effects before paint
 * 8. Concurrent: Interruptible rendering
 * 
 * WHY ADVANCED PATTERNS?
 * 1. Better error handling
 * 2. Optimized bundle size
 * 3. Improved performance
 * 4. Cleaner code in complex apps
 * 5. Professional React development
 * 6. Production-ready applications
 * 
 * LEARNING PATH FOR THIS FILE:
 * 1. Learn error boundaries
 * 2. Learn lazy loading and Suspense
 * 3. Learn Portals
 * 4. Learn Fragments
 * 5. Learn useReducer
 * 6. Learn useLayoutEffect
 * 7. Understand Concurrent features
 * 
 * IMPORTANT LEARNING NOTES:
 * • Error boundaries only catch render errors
 * • Event handlers need try-catch
 * • Lazy loading requires Suspense
 * • Portals are useful for modals and dropdowns
 * • Fragments reduce wrapper divs
 * • useReducer is for complex state logic
 * • useLayoutEffect runs before paint (rarely needed)
 * • Understand key prop for list reconciliation
 * 
 * COMMON MISTAKES TO AVOID:
 * 1. Not handling errors in event handlers
 * 2. Forgetting Suspense fallback for lazy components
 * 3. Over-using useReducer (useState is often better)
 * 4. Misunderstanding Portal behavior (still in component tree)
 * 5. Not providing keys in lazy component lists
 * 6. useLayoutEffect for everything (use useEffect)
 * 7. Not testing error boundaries
 * 
 * NEXT STEPS AFTER THIS FILE:
 * → Move to performance.jsx for optimization
 * → Learn React DevTools profiler
 * → Build real applications
 * → Learn next.js or other frameworks
 */

import React, { useState, useReducer, Suspense, lazy, useLayoutEffect, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

// ===== ERROR BOUNDARIES =====

/**
 * Error boundaries catch JavaScript errors in components
 * Only work with class components (React limitation)
 * Don't catch: event handlers, async code, SSR
 * For those, use try-catch
 */

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error, errorInfo);
    // Log to error reporting service
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20, backgroundColor: "#fee", borderRadius: 8 }}>
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Component that throws error
function ProblematicComponent() {
  const [shouldError, setShouldError] = useState(false);
  
  if (shouldError) {
    throw new Error("Something went wrong in rendering!");
  }
  
  return (
    <button onClick={() => setShouldError(true)}>
      Trigger error
    </button>
  );
}

// Usage
function ErrorBoundaryExample() {
  return (
    <ErrorBoundary>
      <ProblematicComponent />
    </ErrorBoundary>
  );
}

// Error handling in event handlers
function EventHandlerErrorExample() {
  const handleClick = () => {
    try {
      throw new Error("Error in event handler");
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    }
  };
  
  return <button onClick={handleClick}>Click me</button>;
}

// ===== SUSPENSE & LAZY LOADING =====

/**
 * Code splitting: Load components only when needed
 * Reduces initial bundle size
 * Improves performance
 * Requires Suspense for loading state
 */

// Lazy load a component
const HeavyComponent = lazy(() => import("./HeavyComponent"));
const AdminPanel = lazy(() => import("./AdminPanel"));

function Fallback() {
  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <p>Loading component...</p>
    </div>
  );
}

// Use Suspense to handle loading
function SuspenseExample() {
  const [show, setShow] = useState(false);
  
  return (
    <div>
      <button onClick={() => setShow(!show)}>
        {show ? "Hide" : "Show"} Heavy Component
      </button>
      
      {show && (
        <Suspense fallback={<Fallback />}>
          <HeavyComponent />
        </Suspense>
      )}
    </div>
  );
}

// Multiple lazy components
function MultiSuspenseExample() {
  const [tab, setTab] = useState(0);
  
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={() => setTab(0)} style={{ fontWeight: tab === 0 ? "bold" : "normal" }}>Home</button>
        <button onClick={() => setTab(1)} style={{ fontWeight: tab === 1 ? "bold" : "normal" }}>Admin</button>
      </div>
      
      <Suspense fallback={<Fallback />}>
        {tab === 0 && <div>Home page</div>}
        {tab === 1 && <AdminPanel />}
      </Suspense>
    </div>
  );
}

// ===== PORTALS =====

/**
 * Render component to different DOM node
 * Useful for: modals, tooltips, dropdowns, popovers
 * Still in React component tree (events bubble up)
 */

function Modal({ onClose, children }) {
  // Render to a different DOM node (#modal-root)
  return ReactDOM.createPortal(
    (
      <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
        <div style={{ backgroundColor: "white", padding: 32, borderRadius: 8, maxWidth: 500, position: "relative" }}>
          <button onClick={onClose} style={{ position: "absolute", top: 8, right: 8 }}>✕</button>
          {children}
        </div>
      </div>
    ),
    document.getElementById("modal-root") || document.body
  );
}

function Dropdown({ children }) {
  return ReactDOM.createPortal(
    <div style={{ position: "fixed", top: 100, left: 100, backgroundColor: "white", border: "1px solid #ddd", borderRadius: 4, padding: 8, zIndex: 999 }}>
      {children}
    </div>,
    document.body
  );
}

// Usage
function PortalExample() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <button onClick={() => setShowModal(true)}>Open Modal</button>
      
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2>Modal Content</h2>
          <p>This is rendered in a different DOM node!</p>
        </Modal>
      )}
    </>
  );
}

// ===== FRAGMENTS =====

/**
 * Group elements without adding wrapper div
 * Useful for lists and conditional rendering
 * Syntax: <>...</> or <React.Fragment>...</React.Fragment>
 */

function FragmentExample() {
  const items = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" }
  ];
  
  return (
    <ul>
      {items.map(item => (
        <React.Fragment key={item.id}>
          <li>{item.name}</li>
          <li style={{ fontSize: "0.8em", color: "gray" }}>ID: {item.id}</li>
        </React.Fragment>
      ))}
    </ul>
  );
}

// Shorthand syntax
function ShorthandFragment() {
  return (
    <>
      <h1>Title</h1>
      <p>Content</p>
    </>
  );
}

// ===== USEREDUCER =====

/**
 * Like useState but for complex state logic
 * Similar to Redux reducers
 * State: current state
 * Action: what happened (type + payload)
 * Reducer: function(state, action) => newState
 */

// Define reducer function
function todoReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, { id: Date.now(), text: action.payload, completed: false }]
      };
    
    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter(t => t.id !== action.payload)
      };
    
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        )
      };
    
    case "CLEAR_COMPLETED":
      return {
        ...state,
        todos: state.todos.filter(t => !t.completed)
      };
    
    default:
      return state;
  }
}

function TodoApp() {
  const initialState = {
    todos: [
      { id: 1, text: "Learn React", completed: false },
      { id: 2, text: "Build a project", completed: false }
    ]
  };
  
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [input, setInput] = useState("");
  
  const handleAddTodo = () => {
    dispatch({ type: "ADD_TODO", payload: input });
    setInput("");
  };
  
  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_TODO", payload: id });
  };
  
  const handleToggle = (id) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };
  
  return (
    <div>
      <h2>Todo List</h2>
      
      <div style={{ marginBottom: 16 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a todo"
          onKeyPress={(e) => e.key === "Enter" && handleAddTodo()}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      
      <ul>
        {state.todos.map(todo => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
            />
            {todo.text}
            <button onClick={() => handleRemove(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
      
      <button onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}>
        Clear completed
      </button>
      
      <p>Remaining: {state.todos.filter(t => !t.completed).length}</p>
    </div>
  );
}

// useReducer with context for global state management
const TodoContext = React.createContext();

function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, { todos: [] });
  
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

function useTodos() {
  const context = React.useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used inside TodoProvider");
  }
  return context;
}

// ===== USELAYOUTEFFECT =====

/**
 * Like useEffect but runs synchronously before paint
 * Rarely needed
 * Use for: measuring DOM, synchronous DOM mutations
 */

function LayoutEffectExample() {
  const ref = useRef();
  const [text, setText] = useState("Measure me");
  
  useLayoutEffect(() => {
    // Runs before paint, so we get accurate measurements
    console.log("Width:", ref.current?.offsetWidth);
  }, [text]);
  
  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <p ref={ref}>{text}</p>
    </div>
  );
}

// ===== KEY PROP IN RECONCILIATION =====

/**
 * Keys help React identify which items have changed
 * Without key, React re-renders everything
 * Important for performance and correctness
 */

function KeyExample() {
  const [items, setItems] = useState([
    { id: 1, name: "Item A" },
    { id: 2, name: "Item B" },
    { id: 3, name: "Item C" }
  ]);
  
  const reorder = () => {
    setItems([items[2], items[0], items[1]]);
  };
  
  const add = () => {
    setItems([...items, { id: Date.now(), name: `Item ${items.length + 1}` }]);
  };
  
  return (
    <div>
      <button onClick={reorder}>Reorder</button>
      <button onClick={add}>Add</button>
      
      <ul>
        {items.map(item => (
          <ItemWithKey key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

function ItemWithKey({ item }) {
  const [input, setInput] = useState("");
  
  return (
    <li>
      {item.name}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="type something"
      />
    </li>
  );
}

// ===== CONCURRENT FEATURES (PREVIEW) =====

/**
 * Concurrent features allow React to:
 * • Interruptible rendering
 * • Prioritize updates
 * • Suspend and resume rendering
 * 
 * useDeferredValue: Low priority update
 * useTransition: Mark update as non-urgent
 */

function useDeferredValueExample() {
  const [input, setInput] = useState("");
  const deferredInput = React.useDeferredValue(input);
  
  // Filtering happens with deferredInput (lower priority)
  const items = ["Apple", "Apricot", "Banana", "Blueberry", "Cherry"].filter(item =>
    item.toLowerCase().includes(deferredInput.toLowerCase())
  );
  
  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {items.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

// useTransition example
function useTransitionExample() {
  const [input, setInput] = useState("");
  const [isPending, startTransition] = React.useTransition();
  const [data, setData] = useState([]);
  
  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    
    startTransition(() => {
      // This is low priority
      const filtered = generateData(value);
      setData(filtered);
    });
  };
  
  return (
    <div>
      <input value={input} onChange={handleChange} placeholder="Search..." />
      {isPending && <p>Loading...</p>}
      <ul>
        {data.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function generateData(query) {
  // Simulate expensive operation
  const start = Date.now();
  while (Date.now() - start < 100) {}
  return ["Result 1", "Result 2"];
}

// ===== BEST PRACTICES CHECKLIST =====

/**
 * ✓ Use error boundaries for error handling
 * ✓ Use Suspense for code splitting
 * ✓ Use Portals for modals and overlays
 * ✓ Use Fragments to avoid wrapper divs
 * ✓ Use useReducer for complex state
 * ✓ Provide keys for dynamic lists
 * ✓ Use useEffect for side effects
 * ✓ Handle errors in event handlers
 * ✓ Test error boundaries
 * ✓ Monitor bundle size
 */

/**
 * NEXT STEPS:
 * 1. Learn performance optimization
 * 2. Learn React DevTools profiler
 * 3. Build production applications
 * 4. Move to: performance.jsx
 */
