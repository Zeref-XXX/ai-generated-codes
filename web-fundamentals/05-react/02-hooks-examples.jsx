/**
 * REACT HOOKS - CODE ALONG WITH OUTPUT EXAMPLES
 */

import React, { useState, useEffect, useContext, createContext, useCallback, useRef, useMemo } from "react";

// ===== USESTATE EXAMPLES =====

function CounterWithPreviousState() {
  const [count, setCount] = useState(0);
  
  // Using updater function
  const incrementBy = (amount) => {
    setCount(prevCount => prevCount + amount);
    console.log("Incremented by", amount);
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => incrementBy(1)}>+1</button>
      <button onClick={() => incrementBy(5)}>+5</button>
      <button onClick={() => incrementBy(10)}>+10</button>
    </div>
  );
  
  // OUTPUT:
  // Count: 0
  // [+1] [+5] [+10]
  //
  // After clicking +1, +5, +1:
  // Count: 7
}

function ComplexStateExample() {
  const [user, setUser] = useState({
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    address: {
      city: "New York",
      country: "USA"
    },
    hobbies: ["Reading", "Coding"]
  });
  
  const updateName = (newName) => {
    setUser({ ...user, name: newName });
  };
  
  const updateCity = (newCity) => {
    setUser({
      ...user,
      address: { ...user.address, city: newCity }
    });
  };
  
  const addHobby = (hobby) => {
    setUser({
      ...user,
      hobbies: [...user.hobbies, hobby]
    });
  };
  
  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>City: {user.address.city}</p>
      <p>Hobbies: {user.hobbies.join(", ")}</p>
      
      <button onClick={() => updateName("Bob")}>Change Name</button>
      <button onClick={() => updateCity("Boston")}>Move to Boston</button>
      <button onClick={() => addHobby("Gaming")}>Add Gaming Hobby</button>
    </div>
  );
  
  // OUTPUT (initial):
  // Name: Alice
  // Email: alice@example.com
  // City: New York
  // Hobbies: Reading, Coding
  //
  // After clicking "Change Name":
  // Name: Bob
  //
  // After clicking "Move to Boston":
  // City: Boston
  //
  // After clicking "Add Gaming Hobby":
  // Hobbies: Reading, Coding, Gaming
}

// ===== USEEFFECT EXAMPLES =====

function DataFetcherExample() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(1);
  
  useEffect(() => {
    setLoading(true);
    
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
        console.log("Fetched user:", data.name);
        // OUTPUT: Fetched user: Leanne Graham
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [userId]); // Re-fetch when userId changes
  
  return (
    <div>
      <div>
        <label>User ID:</label>
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
          min="1"
          max="10"
        />
      </div>
      
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {user && (
        <div>
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
        </div>
      )}
    </div>
  );
  
  // OUTPUT (initial, userId=1):
  // User ID: [1]
  // Loading...
  // (after fetch completes):
  // Leanne Graham
  // Email: Sincere@april.biz
  // Phone: 1-770-736-8031
  //
  // OUTPUT (after changing userId to 2):
  // User ID: [2]
  // Loading...
  // Erwin Howell
  // Email: Shanna@melissa.tv
  // Phone: 010-692-6593
}

function TimerExample() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    let interval = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
      console.log("Timer started");
      // OUTPUT: Timer started
    } else {
      if (interval) clearInterval(interval);
      console.log("Timer paused");
      // OUTPUT: Timer paused
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);
  
  return (
    <div>
      <p>Seconds: {seconds}</p>
      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? "Pause" : "Start"}
      </button>
      <button onClick={() => setSeconds(0)}>Reset</button>
    </div>
  );
  
  // OUTPUT (running):
  // Seconds: 0
  // [Pause] [Reset]
  // (wait 1 second)
  // Seconds: 1
  // (wait 1 second)
  // Seconds: 2
}

function ResizeListenerExample() {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      console.log("Window resized to:", window.innerWidth);
      // OUTPUT: Window resized to: 1200
      // OUTPUT: Window resized to: 1150
      // (and so on as you resize)
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      console.log("Cleanup: removed resize listener");
    };
  }, []);
  
  return <p>Window width: {width}px</p>;
  
  // OUTPUT: Window width: 1024px
  // (changes as you resize browser)
}

// ===== USEEFFECT CLEANUP =====

function SubscriptionExample() {
  const [status, setStatus] = useState("online");
  
  useEffect(() => {
    const handleOnline = () => {
      setStatus("online");
      console.log("You are online");
      // OUTPUT: You are online
    };
    
    const handleOffline = () => {
      setStatus("offline");
      console.log("You are offline");
      // OUTPUT: You are offline
    };
    
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      console.log("Cleanup: removed event listeners");
    };
  }, []);
  
  return <p>Status: {status}</p>;
  
  // OUTPUT: Status: online
  // (changes if internet connection is lost/restored)
}

// ===== USECONTEXT EXAMPLES =====

const ThemeContext = createContext();

function ThemedComponent() {
  const theme = useContext(ThemeContext);
  
  return (
    <div style={{
      backgroundColor: theme === "dark" ? "#1e1e1e" : "#ffffff",
      color: theme === "dark" ? "#ffffff" : "#000000",
      padding: "20px"
    }}>
      <p>Current theme: {theme}</p>
    </div>
  );
}

function ContextExample() {
  const [theme, setTheme] = useState("light");
  
  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          Toggle Theme
        </button>
        <ThemedComponent />
      </div>
    </ThemeContext.Provider>
  );
  
  // OUTPUT (light mode):
  // [Toggle Theme]
  // ┌─────────────────────┐
  // │ Current theme: light│
  // └─────────────────────┘
  //
  // OUTPUT (dark mode):
  // [Toggle Theme]
  // ┌─────────────────────┐
  // │ Current theme: dark │
  // └─────────────────────┘
}

// ===== CUSTOM HOOKS =====

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

function LoginFormExample() {
  const { values, handleChange, reset } = useForm({
    username: "",
    password: "",
    remember: false
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", values);
    // OUTPUT: Login attempt: { username: 'alice', password: 'pass123', remember: true }
    alert(`Logged in as ${values.username}`);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={values.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <label>
        <input
          name="remember"
          type="checkbox"
          checked={values.remember}
          onChange={handleChange}
        />
        Remember me
      </label>
      <button type="submit">Login</button>
      <button type="button" onClick={reset}>Clear</button>
    </form>
  );
  
  // OUTPUT (after entering alice/pass123):
  // [alice] [••••••••] [✓ Remember me] [Login] [Clear]
  // (click Login)
  // Alert: "Logged in as alice"
}

// Custom hook for localStorage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });
  
  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
      console.log(`Saved ${key} to localStorage:`, value);
      // OUTPUT: Saved theme to localStorage: dark
    } catch {
      console.error("Error saving to localStorage");
    }
  };
  
  return [storedValue, setValue];
}

function PersistentThemeExample() {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  
  return (
    <div style={{
      backgroundColor: theme === "dark" ? "#1e1e1e" : "#ffffff",
      color: theme === "dark" ? "#ffffff" : "#000000",
      padding: "20px"
    }}>
      <p>Theme: {theme}</p>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
      <p style={{ fontSize: "12px", color: "gray" }}>
        Persists across page refreshes!
      </p>
    </div>
  );
  
  // OUTPUT (first load):
  // Theme: light
  // [Toggle Theme]
  // Persists across page refreshes!
  //
  // After clicking toggle:
  // Theme: dark
  // (localStorage updated)
  //
  // After page refresh:
  // Theme: dark
  // (loaded from localStorage!)
}

// ===== USECALLBACK OPTIMIZATION =====

function OptimizedChildComponent({ onDelete }) {
  console.log("Child rendered");
  // OUTPUT: Child rendered (only once if props stable)
  
  return <button onClick={() => onDelete(1)}>Delete</button>;
}

function UseCallbackExample() {
  const [count, setCount] = useState(0);
  
  // Without useCallback, new function every render
  // With useCallback, same function reference
  const handleDelete = useCallback((id) => {
    console.log("Deleting item:", id);
    // OUTPUT: Deleting item: 1
  }, []);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <OptimizedChildComponent onDelete={handleDelete} />
    </div>
  );
  
  // OUTPUT:
  // Child rendered (once on mount)
  // Count: 0
  // [Increment] [Delete]
  // (click Increment)
  // Count: 1
  // (Child NOT re-rendered because callback is stable)
}

// ===== USEREF EXAMPLES =====

function TextInputWithRef() {
  const inputRef = useRef(null);
  
  const focusInput = () => {
    inputRef.current?.focus();
    console.log("Input focused");
    // OUTPUT: Input focused
  };
  
  return (
    <div>
      <input ref={inputRef} placeholder="Click to focus" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
  
  // OUTPUT:
  // [Click to focus] [Focus Input]
  // (click "Focus Input" and input gets focused)
}

function CounterWithRefExample() {
  const [count, setCount] = useState(0);
  const previousCountRef = useRef();
  
  useEffect(() => {
    previousCountRef.current = count;
  }, [count]);
  
  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {previousCountRef.current}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
  
  // OUTPUT (initial):
  // Current: 0
  // Previous: undefined
  //
  // After clicking once:
  // Current: 1
  // Previous: 0
  //
  // After clicking again:
  // Current: 2
  // Previous: 1
}

// ===== USEMEMO OPTIMIZATION =====

function ExpensiveCalculationExample() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  
  const expensiveResult = useMemo(() => {
    console.log("Calculating expensive value...");
    // OUTPUT: Calculating expensive value... (only when count changes)
    let sum = 0;
    for (let i = 0; i < 1000000; i++) {
      sum += i;
    }
    return sum;
  }, [count]); // Only recalculate when count changes
  
  return (
    <div>
      <p>Result: {expensiveResult}</p>
      <p>Count: {count}</p>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type something..."
      />
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
  
  // OUTPUT:
  // Result: 499999500000
  // Count: 0
  // [Type something...]
  //
  // (type in input - result doesn't recalculate)
  // (click Increment - result recalculates)
}

// ===== MULTIPLE HOOKS TOGETHER =====

function CompleteHooksExample() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);
  const countRef = useRef(0);
  
  const fetchData = useCallback(async () => {
    console.log("Fetching data...");
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const json = await response.json();
    setData(json);
    console.log("Data fetched:", json.title);
  }, []);
  
  useEffect(() => {
    countRef.current = count;
    console.log("Count updated to:", count);
  }, [count]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Ref value: {countRef.current}</p>
      {data && <p>Post: {data.title}</p>}
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
  
  // OUTPUT:
  // Fetching data...
  // Count: 0
  // Ref value: 0
  // Data fetched: sunt aut facere repellat provident...
  // Post: sunt aut facere repellat provident...
  //
  // After clicking Increment:
  // Count: 1
  // Ref value: 1
}

export default TimerExample;
// To run other examples, change the export:
// export default DataFetcherExample;
// export default ContextExample;
// export default LoginFormExample;
// etc.
