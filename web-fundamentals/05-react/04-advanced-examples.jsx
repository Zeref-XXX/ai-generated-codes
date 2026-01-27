/**
 * REACT ADVANCED CONCEPTS - CODE ALONG WITH OUTPUT EXAMPLES
 */

import React, { useState, useReducer, Suspense, lazy, useRef, useEffect } from "react";

// ===== ERROR BOUNDARIES =====

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error("Caught error:", error.message);
    // OUTPUT: Caught error: Something went wrong
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: "16px",
          backgroundColor: "#fee",
          border: "1px solid #f00",
          borderRadius: "4px"
        }}>
          <h2>❌ Something went wrong</h2>
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

function ProblematicComponent({ shouldError }) {
  if (shouldError) {
    throw new Error("Component crashed!");
  }
  return <p>This component is working fine</p>;
}

function ErrorBoundaryExample() {
  const [error, setError] = useState(false);
  
  return (
    <ErrorBoundary>
      <div>
        <button onClick={() => setError(!error)}>
          {error ? "Fix error" : "Trigger error"}
        </button>
        <ProblematicComponent shouldError={error} />
      </div>
    </ErrorBoundary>
  );
  
  // OUTPUT (no error):
  // [Trigger error]
  // This component is working fine
  //
  // OUTPUT (after clicking):
  // [Fix error]
  // ❌ Something went wrong
  // Component crashed!
  // [Try again]
}

// ===== LAZY LOADING & SUSPENSE =====

// Simulate lazy component
const HeavyChart = lazy(() =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        default: () => (
          <div style={{ padding: "20px", backgroundColor: "#f0f0f0" }}>
            <p>📊 Heavy Chart Component</p>
            <p>(Only loads when you view it!)</p>
          </div>
        )
      });
    }, 2000);
  })
);

function LazyLoadingExample() {
  const [showChart, setShowChart] = useState(false);
  
  return (
    <div>
      <button onClick={() => setShowChart(!showChart)}>
        {showChart ? "Hide Chart" : "Show Chart"}
      </button>
      
      {showChart && (
        <Suspense fallback={<p>Loading chart...</p>}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
  
  // OUTPUT (initial):
  // [Show Chart]
  //
  // OUTPUT (after clicking, loading):
  // [Hide Chart]
  // Loading chart...
  //
  // OUTPUT (after 2 seconds):
  // [Hide Chart]
  // 📊 Heavy Chart Component
  // (Only loads when you view it!)
}

// ===== USEREDUCER =====

function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + action.payload };
    case "DECREMENT":
      return { ...state, count: state.count - action.payload };
    case "RESET":
      return { ...state, count: 0 };
    case "SET_STEP":
      return { ...state, step: action.payload };
    default:
      return state;
  }
}

function UseReducerExample() {
  const [state, dispatch] = useReducer(counterReducer, {
    count: 0,
    step: 1
  });
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <p>Step: {state.step}</p>
      
      <div style={{ marginBottom: "8px" }}>
        <button onClick={() => dispatch({ type: "INCREMENT", payload: state.step })}>
          +{state.step}
        </button>
        <button onClick={() => dispatch({ type: "DECREMENT", payload: state.step })}>
          -{state.step}
        </button>
        <button onClick={() => dispatch({ type: "RESET" })}>
          Reset
        </button>
      </div>
      
      <div>
        <label>
          Step:
          <input
            type="number"
            value={state.step}
            onChange={(e) => dispatch({ type: "SET_STEP", payload: Number(e.target.value) })}
            min="1"
          />
        </label>
      </div>
    </div>
  );
  
  // OUTPUT (initial):
  // Count: 0
  // Step: 1
  // [+1] [-1] [Reset]
  // Step: [1]
  //
  // OUTPUT (after clicking +1 three times):
  // Count: 3
  // Step: 1
  //
  // OUTPUT (after setting step to 5 and clicking +5):
  // Count: 8
  // Step: 5
}

// ===== FORM REDUCER =====

function formReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value
      };
    case "RESET":
      return { email: "", password: "", remember: false };
    case "SET_ERROR":
      return { ...state, error: action.error };
    default:
      return state;
  }
}

function FormWithReducerExample() {
  const [form, dispatch] = useReducer(formReducer, {
    email: "",
    password: "",
    remember: false,
    error: null
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", { email: form.email, password: form.password, remember: form.remember });
    // OUTPUT: Submitting: { email: 'alice@example.com', password: 'pass123', remember: true }
    
    if (!form.email.includes("@")) {
      dispatch({ type: "SET_ERROR", error: "Invalid email" });
      return;
    }
    
    dispatch({ type: "SET_ERROR", error: null });
    alert("Login successful!");
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={form.email}
        onChange={(e) => dispatch({ type: "SET_FIELD", field: "email", value: e.target.value })}
        placeholder="Email"
      />
      <input
        type="password"
        value={form.password}
        onChange={(e) => dispatch({ type: "SET_FIELD", field: "password", value: e.target.value })}
        placeholder="Password"
      />
      <label>
        <input
          type="checkbox"
          checked={form.remember}
          onChange={(e) => dispatch({ type: "SET_FIELD", field: "remember", value: e.target.checked })}
        />
        Remember me
      </label>
      
      {form.error && <p style={{ color: "red" }}>Error: {form.error}</p>}
      
      <button type="submit">Login</button>
      <button type="button" onClick={() => dispatch({ type: "RESET" })}>Clear</button>
    </form>
  );
  
  // OUTPUT:
  // [Email] [Password] [✓ Remember me]
  // [Login] [Clear]
  //
  // After entering "alice" and clicking Login:
  // Error: Invalid email
  //
  // After entering "alice@example.com" and clicking Login:
  // (success alert)
}

// ===== FRAGMENTS =====

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
          <li style={{ fontSize: "12px", color: "gray", fontStyle: "italic" }}>ID: {item.id}</li>
        </React.Fragment>
      ))}
    </ul>
  );
  
  // OUTPUT:
  // • Item 1
  //   ID: 1 (smaller, gray, italic)
  // • Item 2
  //   ID: 2 (smaller, gray, italic)
}

// ===== PORTALS =====

function PortalExample() {
  const [showModal, setShowModal] = useState(false);
  
  const modal = showModal ? (
    React.createPortal(
      (
        <div style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "8px",
            maxWidth: "500px"
          }}>
            <h2>Portal Modal</h2>
            <p>This renders outside the normal DOM hierarchy!</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      ),
      document.body
    )
  ) : null;
  
  return (
    <>
      <button onClick={() => setShowModal(true)}>Open Modal</button>
      {modal}
    </>
  );
  
  // OUTPUT (closed):
  // [Open Modal]
  //
  // OUTPUT (open):
  // ┌─────────────────────────────────────┐
  // │ Portal Modal                        │
  // │ This renders outside the DOM!       │
  // │ [Close]                             │
  // └─────────────────────────────────────┘
}

// ===== CONDITIONAL RENDERING WITH SHOW/HIDE =====

function ConditionalRenderingExample() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  return (
    <div>
      <button onClick={() => setVisible(!visible)}>
        {visible ? "Hide" : "Show"} (CSS)
      </button>
      <button onClick={() => setMounted(!mounted)}>
        {mounted ? "Unmount" : "Mount"} (JS)
      </button>
      
      {/* CSS approach - component still in DOM */}
      <div style={{ display: visible ? "block" : "none", border: "1px solid blue", padding: "8px" }}>
        <p>CSS Hidden (still in DOM)</p>
      </div>
      
      {/* JS approach - component removed from DOM */}
      {mounted && (
        <div style={{ border: "1px solid green", padding: "8px" }}>
          <p>JS Hidden (removed from DOM)</p>
        </div>
      )}
    </div>
  );
  
  // OUTPUT (initial):
  // [Show (CSS)] [Mount (JS)]
  // (nothing visible)
  //
  // OUTPUT (after clicking "Show"):
  // [Hide (CSS)] [Mount (JS)]
  // ┌─────────────────────────────────┐
  // │ CSS Hidden (still in DOM)       │
  // └─────────────────────────────────┘
  //
  // OUTPUT (after clicking "Mount"):
  // [Hide (CSS)] [Unmount (JS)]
  // ┌─────────────────────────────────┐
  // │ CSS Hidden (still in DOM)       │
  // ├─────────────────────────────────┤
  // │ JS Hidden (removed from DOM)    │
  // └─────────────────────────────────┘
}

// ===== REF FOR SCROLL AND FOCUS =====

function ScrollAndFocusExample() {
  const inputRef = useRef(null);
  const boxRef = useRef(null);
  
  const focusInput = () => {
    inputRef.current?.focus();
    console.log("Input focused");
  };
  
  const scrollToBox = () => {
    boxRef.current?.scrollIntoView({ behavior: "smooth" });
    console.log("Scrolled to box");
  };
  
  return (
    <div>
      <button onClick={focusInput}>Focus Input</button>
      <button onClick={scrollToBox}>Scroll to Box</button>
      
      <input ref={inputRef} placeholder="Click 'Focus Input' to focus me" />
      
      <div style={{ height: "300px", backgroundColor: "#f0f0f0", margin: "20px 0" }} />
      
      <div
        ref={boxRef}
        style={{
          padding: "20px",
          backgroundColor: "lightblue",
          borderRadius: "8px"
        }}
      >
        <p>Scroll to me!</p>
      </div>
    </div>
  );
  
  // OUTPUT:
  // [Focus Input] [Scroll to Box]
  // [Click 'Focus Input' to focus me]
  // (empty space)
  // ┌──────────────────┐
  // │ Scroll to me!    │
  // └──────────────────┘
}

// ===== CLEANUP PATTERNS =====

function CleanupExample() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);
  
  const startCounter = () => {
    if (intervalRef.current) return; // Already running
    
    intervalRef.current = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    console.log("Counter started");
    // OUTPUT: Counter started
  };
  
  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      console.log("Counter stopped");
      // OUTPUT: Counter stopped
    }
  };
  
  useEffect(() => {
    return () => {
      stopCounter();
      console.log("Cleanup: stopped counter");
    };
  }, []);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={startCounter}>Start</button>
      <button onClick={stopCounter}>Stop</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
  
  // OUTPUT:
  // Count: 0
  // [Start] [Stop] [Reset]
  //
  // After clicking Start:
  // Count: 1
  // (waits 1 second)
  // Count: 2
  // (waits 1 second)
  // Count: 3
  //
  // After clicking Stop:
  // (counter stops)
}

export default ErrorBoundaryExample;
// To run other examples, change the export:
// export default LazyLoadingExample;
// export default UseReducerExample;
// export default FragmentExample;
// etc.
