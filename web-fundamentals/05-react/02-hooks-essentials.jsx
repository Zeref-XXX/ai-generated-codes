/**
 * 📚 STEP 5️⃣B - REACT HOOKS: STATE & EFFECTS
 * 
 * PREREQUISITE: React fundamentals (05-react/fundamentals.jsx)
 * TIME TO COMPLETE: 2-3 days
 * DIFFICULTY: Intermediate
 * 
 * WHAT YOU'LL LEARN:
 * • What hooks are and why they exist
 * • useState in detail (we already saw basics)
 * • useEffect for side effects and data fetching
 * • useEffect cleanup and dependencies
 * • useContext for global state
 * • Creating custom hooks
 * • useCallback and useRef basics
 * • Rules of hooks
 * 
 * KEY CONCEPTS TO UNDERSTAND:
 * 1. Hooks: Functions that "hook into" React features
 * 2. useState: Add state to functional components
 * 3. useEffect: Run side effects in components
 * 4. Dependencies: What effect depends on
 * 5. Cleanup: Run code when effect unmounts
 * 6. Context: Share state across components
 * 7. Custom hooks: Extract component logic
 * 8. Ref: Direct access to DOM elements
 * 
 * WHY HOOKS?
 * 1. State without classes
 * 2. Reuse logic between components (custom hooks)
 * 3. Easier to understand code flow
 * 4. Smaller bundle size
 * 5. Better performance with dependencies
 * 6. Organize code by concern, not lifecycle
 * 
 * LEARNING PATH FOR THIS FILE:
 * 1. Review useState deeply
 * 2. Learn useEffect and its purpose
 * 3. Understand dependency arrays
 * 4. Learn cleanup functions
 * 5. Understand useContext
 * 6. Create your first custom hook
 * 7. Learn useCallback and useRef
 * 8. Learn the rules of hooks
 * 
 * RULES OF HOOKS (CRITICAL):
 * 1. Only call hooks at top level (not in loops, conditions)
 * 2. Only call hooks in React components or custom hooks
 * 3. Call hooks in the same order every render
 * 
 * COMMON MISTAKES TO AVOID:
 * 1. Calling hooks conditionally
 * 2. Calling hooks in loops
 * 3. Using wrong dependencies in useEffect
 * 4. Modifying state directly in effects
 * 5. Not cleaning up effects (memory leaks)
 * 6. Creating new objects in dependency arrays
 * 7. Infinite loops in useEffect
 * 
 * IMPORTANT LEARNING NOTES:
 * • Effects run AFTER render (not before)
 * • Include all external values in dependencies
 * • useEffect with no dependencies runs once (on mount)
 * • useEffect with empty array runs on mount and unmount
 * • useEffect with dependencies runs when dependencies change
 * • Closures in effects can cause stale state issues
 * • Each effect should do one thing
 * 
 * NEXT STEPS AFTER THIS FILE:
 * → Move to component-patterns.jsx for composition
 * → Learn more advanced patterns
 * → Build real applications with data fetching
 */

import { useState, useEffect, useContext, createContext, useCallback, useRef, useMemo } from "react";

// ===== USESTATE IN DEPTH =====

/**
 * useState adds state to functional components
 * Returns [currentValue, function to update value]
 * Calling setState triggers a re-render
 */

// Simple counter
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// setState with previous state (important for dependent updates)
function Counter2() {
  const [count, setCount] = useState(0);
  
  // Using updater function prevents stale closures
  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={() => setCount(prevCount => prevCount + 2)}>+2</button>
    </div>
  );
}

// Multiple state variables
function ProfileForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [bio, setBio] = useState("");
  
  return (
    <form>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} placeholder="Age" />
      <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Bio" />
      
      <button type="button">
        Save: {name && `${name} (${email})`}
      </button>
    </form>
  );
}

// State with objects - remember to spread/copy
function UserState() {
  const [user, setUser] = useState({
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    preferences: { theme: "dark", notifications: true }
  });
  
  // Wrong: user.name = "Bob"; // Don't mutate!
  
  // Right: Update entire object
  const updateName = (newName) => {
    setUser({ ...user, name: newName });
  };
  
  // Right: Update nested property
  const toggleTheme = () => {
    setUser({
      ...user,
      preferences: { ...user.preferences, theme: user.preferences.theme === "dark" ? "light" : "dark" }
    });
  };
  
  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Theme: {user.preferences.theme}</p>
      <button onClick={() => updateName("Charlie")}>Change Name</button>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

// ===== USEEFFECT: SIDE EFFECTS =====

/**
 * useEffect runs a function after rendering
 * Use for: data fetching, subscriptions, DOM updates, timers
 * Syntax: useEffect(() => { ... }, [dependencies])
 */

// Effect that runs after every render
function TitleUpdater() {
  const [count, setCount] = useState(0);
  
  // This runs after EVERY render
  useEffect(() => {
    document.title = `Count: ${count}`;
  });
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Effect with dependency array (runs only when dependencies change)
function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(1);
  
  // Effect runs only when userId changes
  useEffect(() => {
    let isMounted = true; // Prevent state update on unmounted component
    
    setLoading(true);
    
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (isMounted) {
          setData(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });
    
    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [userId]); // Dependency array - effect re-runs if userId changes
  
  return (
    <div>
      <input 
        type="number" 
        value={userId} 
        onChange={e => setUserId(Number(e.target.value))}
        min="1"
        max="10"
      />
      
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && <div><h2>{data.name}</h2><p>{data.email}</p></div>}
    </div>
  );
}

// Effect that runs once (on mount only)
function OnMountExample() {
  useEffect(() => {
    console.log("Component mounted");
    
    return () => {
      console.log("Component unmounted (cleanup)");
    };
  }, []); // Empty dependency array = run only on mount/unmount
  
  return <p>Open console to see mount/unmount messages</p>;
}

// ===== CLEANUP FUNCTION =====

/**
 * useEffect can return a cleanup function
 * Cleanup runs before next effect or when component unmounts
 * Use for: removing event listeners, canceling requests, clearing timers
 */

function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    // Set up interval
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    
    // Cleanup function - runs when component unmounts or before next effect
    return () => {
      clearInterval(interval); // Clean up the interval
    };
  }, []); // Run only on mount
  
  return <p>Seconds elapsed: {seconds}</p>;
}

function EventListenerExample() {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    
    window.addEventListener("resize", handleResize);
    
    // Cleanup: remove listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  return <p>Window width: {width}px</p>;
}

function SubscriptionExample() {
  const [status, setStatus] = useState("offline");
  
  useEffect(() => {
    const handleOnline = () => setStatus("online");
    const handleOffline = () => setStatus("offline");
    
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    
    // Cleanup: remove listeners
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  
  return <p>Status: {status}</p>;
}

// ===== USECONTEXT: GLOBAL STATE =====

/**
 * Context lets you pass data through component tree without prop drilling
 * Create context → Provider → useContext to access
 */

// Create a context
const ThemeContext = createContext();

// Provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  
  const toggleTheme = () => {
    setTheme(t => t === "light" ? "dark" : "light");
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Use context anywhere inside provider
function Button() {
  const { theme } = useContext(ThemeContext);
  
  return (
    <button style={{ backgroundColor: theme === "light" ? "white" : "black", color: theme === "light" ? "black" : "white" }}>
      Click me
    </button>
  );
}

function ThemeToggle() {
  const { toggleTheme } = useContext(ThemeContext);
  
  return <button onClick={toggleTheme}>Toggle Theme</button>;
}

// Complete example
function ContextExample() {
  return (
    <ThemeProvider>
      <div>
        <Button />
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
}

// ===== CUSTOM HOOKS =====

/**
 * Custom hooks are functions that use hooks
 * Extract reusable logic into custom hooks
 * Hooks names must start with "use"
 */

// Custom hook for form handling
function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };
  
  const reset = () => {
    setValues(initialValues);
  };
  
  return { values, handleChange, reset };
}

// Usage
function LoginForm() {
  const { values, handleChange, reset } = useForm({
    username: "",
    password: "",
    remember: false
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", values);
    reset();
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="username" value={values.username} onChange={handleChange} placeholder="Username" />
      <input name="password" type="password" value={values.password} onChange={handleChange} placeholder="Password" />
      <label>
        <input name="remember" type="checkbox" checked={values.remember} onChange={handleChange} />
        Remember me
      </label>
      <button type="submit">Login</button>
      <button type="button" onClick={reset}>Reset</button>
    </form>
  );
}

// Custom hook for localStorage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  
  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };
  
  return [storedValue, setValue];
}

// Usage
function PersistentCounter() {
  const [count, setCount] = useLocalStorage("count", 0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <p>This count persists across page refreshes!</p>
    </div>
  );
}

// Custom hook for fetch
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let isMounted = true;
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (isMounted) {
          setData(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      });
    
    return () => {
      isMounted = false;
    };
  }, [url]);
  
  return { data, loading, error };
}

// Usage
function Posts() {
  const { data: posts, loading, error } = useFetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts</p>;
  
  return (
    <ul>
      {posts?.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

// ===== USECALLBACK =====

/**
 * useMemo returns a memoized value
 * useCallback returns a memoized function
 * Use when passing functions to optimized child components
 */

function useCallback_Example() {
  const [count, setCount] = useState(0);
  
  // Without useCallback, this function is recreated every render
  const handleClick = useCallback(() => {
    console.log(`Count is ${count}`);
  }, [count]); // Recreate only when count changes
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <ChildComponent onCallback={handleClick} />
    </div>
  );
}

function ChildComponent({ onCallback }) {
  return <button onClick={onCallback}>Call parent function</button>;
}

// ===== USEREF =====

/**
 * useRef creates a reference to a DOM element or value
 * Doesn't cause re-render when value changes
 * Use for: accessing DOM directly, storing previous values, timers
 */

function TextInput() {
  const inputRef = useRef(null);
  
  const focusInput = () => {
    inputRef.current?.focus();
  };
  
  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Type something..." />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}

function Video() {
  const videoRef = useRef(null);
  
  const play = () => {
    videoRef.current?.play();
  };
  
  const pause = () => {
    videoRef.current?.pause();
  };
  
  return (
    <div>
      <video ref={videoRef} width="400" controls>
        <source src="movie.mp4" type="video/mp4" />
      </video>
      <button onClick={play}>Play</button>
      <button onClick={pause}>Pause</button>
    </div>
  );
}

// Store previous value with useRef
function PreviousValue() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();
  
  useEffect(() => {
    prevCountRef.current = count;
  }, [count]);
  
  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCountRef.current}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// ===== DEPENDENCY ARRAY GOTCHAS =====

/**
 * Include ALL external values used in the effect
 * Objects/arrays created inside effect don't need to be included
 */

// ❌ Common mistake: missing dependencies
function BadEffect() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // count is used but not in dependencies!
    console.log(count);
    // This will always log 0 (stale closure)
  }, []); // Bad: missing count dependency
  
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}

// ✅ Correct: include all dependencies
function GoodEffect() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log(count); // Logs actual current count
  }, [count]); // Correct: count is in dependencies
  
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}

// ===== RULES OF HOOKS CHECKLIST =====

/**
 * ✓ Only call hooks at the top level
 *   ✗ Not in if statements: if (condition) useState(...)
 *   ✗ Not in loops: for (let i = 0; ...) useState(...)
 *   ✗ Not in nested functions
 * ✓ Only call hooks in React components or custom hooks
 * ✓ Use the ESLint plugin: eslint-plugin-react-hooks
 */

// ❌ Bad: hooks in conditional
function BadHookUsage({ condition }) {
  if (condition) {
    const [state, setState] = useState(0); // WRONG!
  }
  return <div>...</div>;
}

// ✓ Good: hooks always called
function GoodHookUsage() {
  const [state, setState] = useState(0); // Always called
  // Then use conditional logic
  return state > 0 ? <div>Positive</div> : <div>Zero or negative</div>;
}

// ===== USEMEMO =====

/**
 * useMemo memoizes a value
 * Prevents expensive calculations on every render
 */

function ExpensiveCalculation() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  
  // This calculation only runs when count changes
  const expensiveValue = useMemo(() => {
    console.log("Calculating...");
    return count * 2 + count * 3; // Expensive calculation
  }, [count]); // Recalculate only when count changes
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Expensive value: {expensiveValue}</p>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Type name..." />
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

/**
 * NEXT STEPS:
 * 1. Practice: Build a component that fetches data
 * 2. Practice: Create a custom hook for something useful
 * 3. Learn: More about Context and global state
 * 4. Move to: component-patterns.jsx
 */
