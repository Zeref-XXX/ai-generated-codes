/**
 * REACT PERFORMANCE - CODE ALONG WITH OUTPUT EXAMPLES
 */

import React, { useState, useCallback, useMemo, memo, useRef, useEffect } from "react";

// ===== REACT.MEMO EXAMPLES =====

function UserCard({ user, onDelete }) {
  console.log(`Rendering UserCard for ${user.name}`);
  // OUTPUT: Rendering UserCard for Alice
  // (only logs when user prop changes)
  
  return (
    <div style={{ padding: "8px", border: "1px solid #ddd" }}>
      <h4>{user.name}</h4>
      <button onClick={() => onDelete(user.id)}>Delete</button>
    </div>
  );
}

const MemoizedUserCard = memo(UserCard);

function MemoExample() {
  const [count, setCount] = useState(0);
  const [users] = useState([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
  ]);
  
  const handleDelete = useCallback((id) => {
    console.log("Deleting user", id);
  }, []);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      
      <h3>Users (Memoized)</h3>
      {users.map(user => (
        <MemoizedUserCard key={user.id} user={user} onDelete={handleDelete} />
      ))}
    </div>
  );
  
  // OUTPUT (initial render):
  // Rendering UserCard for Alice
  // Rendering UserCard for Bob
  // Count: 0
  // [Increment]
  //
  // After clicking Increment:
  // Count: 1
  // (UserCards NOT re-rendered!)
  //
  // If you didn't use memo, UserCards would re-render:
  // Rendering UserCard for Alice
  // Rendering UserCard for Bob
  // (every time parent re-renders)
}

// ===== USEMEMO EXAMPLES =====

function ExpensiveCalculation() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  
  // Without useMemo - recalculates every render
  const withoutMemo = (() => {
    console.log("Computing expensive value (without memo)");
    // OUTPUT: Computing expensive value (without memo)
    // (logs every render, even when name changes)
    let sum = 0;
    for (let i = 0; i < 1000000000; i++) {
      sum += i;
    }
    return sum;
  })();
  
  return (
    <div>
      <p>Without Memo: {withoutMemo}</p>
      <p>Count: {count}</p>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type something..."
      />
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
  
  // OUTPUT (initial):
  // Computing expensive value (without memo)
  // Without Memo: 499999500000
  // Count: 0
  // [Type something...]
  // [Increment]
  //
  // OUTPUT (after typing in input):
  // Computing expensive value (without memo)
  // Without Memo: 499999500000
  // (recalculates even though count didn't change!)
}

function OptimizedExpensiveCalculation() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  
  // With useMemo - only recalculates when count changes
  const withMemo = useMemo(() => {
    console.log("Computing expensive value (with memo)");
    // OUTPUT: Computing expensive value (with memo)
    // (only logs when count changes)
    let sum = 0;
    for (let i = 0; i < 1000000000; i++) {
      sum += i;
    }
    return sum;
  }, [count]); // Only depends on count
  
  return (
    <div>
      <p>With Memo: {withMemo}</p>
      <p>Count: {count}</p>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type something..."
      />
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
  
  // OUTPUT (initial):
  // Computing expensive value (with memo)
  // With Memo: 499999500000
  // Count: 0
  // [Type something...]
  // [Increment]
  //
  // OUTPUT (after typing in input):
  // With Memo: 499999500000
  // (doesn't recalculate! input is much faster)
  //
  // OUTPUT (after clicking Increment):
  // Computing expensive value (with memo)
  // With Memo: 499999500000
  // Count: 1
  // (recalculates only now)
}

// ===== USECALLBACK EXAMPLES =====

function ChildWithCallback({ onCallback }) {
  console.log("Child rendered with callback");
  // OUTPUT: Child rendered with callback (only when callback changes)
  
  return <button onClick={() => onCallback(1)}>Delete</button>;
}

function WithoutUseCallback() {
  const [count, setCount] = useState(0);
  
  // New function created every render
  const handleDelete = (id) => {
    console.log("Deleting", id);
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <ChildWithCallback onCallback={handleDelete} />
    </div>
  );
  
  // OUTPUT (initial):
  // Child rendered with callback
  // Count: 0
  // [Increment] [Delete]
  //
  // OUTPUT (after clicking Increment):
  // Child rendered with callback
  // Count: 1
  // (child re-rendered because handleDelete is new!)
}

function WithUseCallback() {
  const [count, setCount] = useState(0);
  
  // Same function reference across renders
  const handleDelete = useCallback((id) => {
    console.log("Deleting", id);
  }, []); // Empty dependencies = never changes
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <ChildWithCallback onCallback={handleDelete} />
    </div>
  );
  
  // OUTPUT (initial):
  // Child rendered with callback
  // Count: 0
  // [Increment] [Delete]
  //
  // OUTPUT (after clicking Increment):
  // Count: 1
  // (child NOT re-rendered! callback is same)
}

// ===== USECALLBACK WITH DEPENDENCIES =====

function SearchWithCallback() {
  const [count, setCount] = useState(0);
  const [query, setQuery] = useState("");
  
  const handleSearch = useCallback((q) => {
    console.log("Searching for:", q);
    // Fetch from API
  }, [query]); // Recalculate when query changes
  
  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={() => handleSearch(query)}>Search</button>
      
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
  
  // OUTPUT:
  // [Search...] [Search]
  // Count: 0
  // [Increment]
  //
  // After typing "react":
  // [react] [Search]
  // (handleSearch updated because query changed)
  //
  // After clicking Increment:
  // Count: 1
  // (handleSearch NOT updated, still depends only on query)
}

// ===== MEMOIZING OBJECTS & ARRAYS =====

function ItemWithMemoObject() {
  const [count, setCount] = useState(0);
  
  // Without useMemo - new object every render
  const user = {
    id: 1,
    name: "Alice",
    email: "alice@example.com"
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <ChildUserCard user={user} />
    </div>
  );
}

function ItemWithMemoizedObject() {
  const [count, setCount] = useState(0);
  
  // With useMemo - same object reference
  const user = useMemo(() => ({
    id: 1,
    name: "Alice",
    email: "alice@example.com"
  }), []); // Only created once
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <ChildUserCard user={user} />
    </div>
  );
}

const MemoizedChildUserCard = memo(function ChildUserCard({ user }) {
  console.log("ChildUserCard rendered");
  return <p>{user.name}</p>;
});

// ===== VIRTUAL LISTS / WINDOWING =====

function VirtualListSimple({ items, itemHeight = 50 }) {
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);
  
  const visibleCount = Math.ceil(300 / itemHeight); // Container height 300px
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleCount, items.length);
  
  const visibleItems = items.slice(startIndex, endIndex);
  
  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };
  
  return (
    <div
      ref={containerRef}
      style={{
        height: "300px",
        overflow: "auto",
        border: "1px solid #ddd",
        position: "relative"
      }}
      onScroll={handleScroll}
    >
      <div style={{ height: items.length * itemHeight, position: "relative" }}>
        {visibleItems.map((item, i) => (
          <div
            key={startIndex + i}
            style={{
              position: "absolute",
              top: (startIndex + i) * itemHeight,
              height: itemHeight,
              width: "100%",
              padding: "8px",
              borderBottom: "1px solid #eee"
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function VirtualListExample() {
  const [items] = useState(
    Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`)
  );
  
  return (
    <div>
      <h3>Virtual List (10,000 items)</h3>
      <p style={{ fontSize: "12px", color: "gray" }}>
        Only visible items are rendered for performance
      </p>
      <VirtualListSimple items={items} itemHeight={50} />
    </div>
  );
  
  // OUTPUT:
  // Virtual List (10,000 items)
  // ┌──────────────────────────┐
  // │ Item 1                   │
  // │ Item 2                   │
  // │ Item 3                   │
  // │ Item 4                   │
  // │ Item 5                   │
  // │ Item 6                   │
  // └──────────────────────────┘
  // (scroll)
  // ┌──────────────────────────┐
  // │ Item 500                 │
  // │ Item 501                 │
  // │ Item 502                 │
  // │ Item 503                 │
  // │ Item 504                 │
  // │ Item 505                 │
  // └──────────────────────────┘
  // (only ~6-7 items rendered at a time!)
}

// ===== LAZY IMAGE LOADING =====

function LazyImage({ src, alt, placeholder = "Loading..." }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = src;
          img.onload = () => setLoaded(true);
          observer.unobserve(img);
        }
      },
      { threshold: 0.1 }
    );
    
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    
    return () => observer.disconnect();
  }, [src]);
  
  return (
    <div style={{ height: "200px", backgroundColor: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <img
        ref={imgRef}
        alt={alt}
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          opacity: loaded ? 1 : 0.5
        }}
      />
      {!loaded && <p>{placeholder}</p>}
    </div>
  );
}

function LazyImageExample() {
  return (
    <div>
      <h3>Lazy Loading Images</h3>
      <p>Images load only when scrolled into view</p>
      <LazyImage
        src="https://via.placeholder.com/400x200"
        alt="Placeholder 1"
      />
      <div style={{ height: "400px", backgroundColor: "#f9f9f9", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p>Scroll down to load more images</p>
      </div>
      <LazyImage
        src="https://via.placeholder.com/400x200"
        alt="Placeholder 2"
      />
    </div>
  );
  
  // OUTPUT:
  // Lazy Loading Images
  // ┌────────────────────┐
  // │ Loading...         │
  // └────────────────────┘
  //
  // Scroll down to load more images
  // (scroll)
  // ┌────────────────────┐
  // │ [Image loaded]     │
  // └────────────────────┘
}

// ===== DEBOUNCING OPTIMIZATION =====

function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
}

function SearchWithDebounce() {
  const [input, setInput] = useState("");
  const debouncedSearch = useDebounce(input, 500);
  
  useEffect(() => {
    if (debouncedSearch) {
      console.log("Searching for:", debouncedSearch);
      // Fetch from API
    }
  }, [debouncedSearch]);
  
  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search (waits 500ms after typing stops)..."
      />
      <p>Latest search: {debouncedSearch}</p>
    </div>
  );
  
  // OUTPUT (initial):
  // [Search...]
  // Latest search:
  //
  // OUTPUT (as you type "react"):
  // [react]
  // Latest search:
  // (still searching for empty)
  //
  // OUTPUT (after you stop typing for 500ms):
  // [react]
  // Latest search: react
  // (now searches)
}

// ===== PERFORMANCE COMPARISON =====

function PerformanceComparison() {
  const [items, setItems] = useState(Array.from({ length: 100 }, (_, i) => i));
  const [renderCount, setRenderCount] = useState(0);
  
  return (
    <div>
      <p>Render count: {renderCount}</p>
      <button onClick={() => setRenderCount(renderCount + 1)}>Trigger Re-render</button>
      <button onClick={() => setItems([...items, items.length])}>Add Item</button>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px" }}>
        <div>
          <h4>Without Optimization</h4>
          <p>All children re-render</p>
          <div style={{ height: "200px", overflow: "auto", border: "1px solid #ddd" }}>
            {items.map(item => (
              <UnoptimizedItem key={item} value={item} />
            ))}
          </div>
        </div>
        
        <div>
          <h4>With Memo</h4>
          <p>Only new children render</p>
          <div style={{ height: "200px", overflow: "auto", border: "1px solid #ddd" }}>
            {items.map(item => (
              <OptimizedItem key={item} value={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function UnoptimizedItem({ value }) {
  // Renders every time parent renders
  return <div style={{ padding: "4px" }}>Item {value}</div>;
}

const OptimizedItem = memo(function OptimizedItem({ value }) {
  // Only renders when value prop changes
  return <div style={{ padding: "4px" }}>Item {value}</div>;
});

export default MemoExample;
// To run other examples, change the export:
// export default OptimizedExpensiveCalculation;
// export default WithUseCallback;
// export default VirtualListExample;
// export default LazyImageExample;
// export default SearchWithDebounce;
// export default PerformanceComparison;
