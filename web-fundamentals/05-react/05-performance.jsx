/**
 * 📚 STEP 5️⃣E - REACT PERFORMANCE OPTIMIZATION
 * 
 * PREREQUISITE: React advanced concepts (05-react/advanced-concepts.jsx)
 * TIME TO COMPLETE: 2-3 days
 * DIFFICULTY: Advanced
 * 
 * WHAT YOU'LL LEARN:
 * • React.memo (prevent unnecessary re-renders)
 * • useMemo (memoize expensive calculations)
 * • useCallback (memoize functions)
 * • Code splitting and lazy loading
 * • Bundle analysis
 * • Virtual lists
 * • Image optimization
 * • Rendering performance profiling
 * 
 * KEY CONCEPTS TO UNDERSTAND:
 * 1. Re-render: When component's JSX is recalculated
 * 2. Reconciliation: How React updates the DOM
 * 3. Memoization: Caching computation results
 * 4. Code splitting: Loading code on demand
 * 5. Tree shaking: Removing unused code
 * 6. Bundle size: Total JavaScript sent to client
 * 7. TTI: Time to Interactive
 * 8. FCP: First Contentful Paint
 * 
 * WHY PERFORMANCE MATTERS:
 * 1. Faster page loads
 * 2. Better user experience
 * 3. SEO improvements
 * 4. Lower bandwidth costs
 * 5. Better mobile experience
 * 6. Accessibility improvements
 * 7. User retention
 * 
 * LEARNING PATH FOR THIS FILE:
 * 1. Understand React rendering
 * 2. Learn React.memo
 * 3. Learn useMemo
 * 4. Learn useCallback
 * 5. Learn code splitting
 * 6. Learn profiling tools
 * 7. Learn optimization checklist
 * 
 * IMPORTANT LEARNING NOTES:
 * • Not all re-renders are bad
 * • Don't optimize prematurely
 * • Profile before and after optimization
 * • Measure with real user data
 * • Mobile is usually slower (optimize for it)
 * • React.memo has overhead (only use if re-renders are expensive)
 * • Bundle size is critical for performance
 * • Images are usually the biggest problem
 * 
 * COMMON MISTAKES TO AVOID:
 * 1. Over-memoizing everything
 * 2. Creating new objects in dependency arrays
 * 3. Not profiling before optimizing
 * 4. Ignoring bundle size
 * 5. Not code splitting
 * 6. Using index as key (causes unnecessary re-renders)
 * 7. Not using Suspense boundaries
 * 8. Ignoring images optimization
 * 
 * OPTIMIZATION PRIORITY:
 * 1. Identify bottlenecks (profile)
 * 2. Fix rendering issues (React.memo, dependencies)
 * 3. Reduce bundle size (code splitting, tree shaking)
 * 4. Optimize assets (images, fonts)
 * 5. Add caching
 * 6. Monitor in production
 * 
 * NEXT STEPS AFTER THIS FILE:
 * → Learn Next.js for automatic optimizations
 * → Learn image optimization libraries
 * → Learn web vitals and monitoring
 * → Build production applications
 */

import React, { useState, useCallback, useMemo, memo, Suspense, lazy } from "react";

// ===== REACT RENDERING BASICS =====

/**
 * React renders (recalculates JSX) when:
 * 1. State changes
 * 2. Props change
 * 3. Parent re-renders
 * 4. Context value changes
 * 
 * Rendering ≠ DOM update
 * React may calculate JSX but not update DOM if nothing changed
 */

function RenderingExample() {
  const [count, setCount] = useState(0);
  
  console.log("RenderingExample rendered"); // Logs every render
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <ChildComponent />
    </div>
  );
}

function ChildComponent() {
  console.log("ChildComponent rendered"); // Also logs every time parent renders
  return <p>I'm a child</p>;
}

// ===== REACT.MEMO =====

/**
 * Prevent component from re-rendering if props haven't changed
 * Shallow comparison of props
 * Use when: expensive render, same props, parent re-renders often
 */

// Without memo - re-renders with parent
function UserCard({ user }) {
  console.log("UserCard rendered:", user.name);
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}

// With memo - only re-renders if user prop changes
const MemoizedUserCard = memo(UserCard);

// Example showing benefit
function UserListWithMemo() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" }
  ]);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment (triggers parent re-render)</button>
      
      {users.map(user => (
        <MemoizedUserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

// Custom comparison function
function CustomComparisonUserCard({ user, onDelete }) {
  return (
    <div>
      <h3>{user.name}</h3>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

const MemoizedWithComparison = memo(CustomComparisonUserCard, (prevProps, nextProps) => {
  // Return true if props are equal (don't re-render)
  // Return false if props changed (re-render)
  return prevProps.user.id === nextProps.user.id;
});

// ===== USEMEMO =====

/**
 * Memoize expensive calculation results
 * Only recalculate when dependencies change
 * Use when: expensive calculation, returned to child, used in effect
 */

function ExpensiveCalculation() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  
  // Without useMemo - recalculates every render
  const expensiveResult = (() => {
    console.log("Calculating...");
    let sum = 0;
    for (let i = 0; i < 1000000000; i++) {
      sum += i;
    }
    return sum;
  })();
  
  return (
    <div>
      <p>Result: {expensiveResult}</p>
      <p>Count: {count}</p>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Type something..." />
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

function OptimizedExpensiveCalculation() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  
  // With useMemo - only recalculates when count changes
  const expensiveResult = useMemo(() => {
    console.log("Calculating (memoized)...");
    let sum = 0;
    for (let i = 0; i < 1000000000; i++) {
      sum += i;
    }
    return sum;
  }, [count]); // Only depends on count
  
  return (
    <div>
      <p>Result: {expensiveResult}</p>
      <p>Count: {count}</p>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Type something..." />
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Memoizing object/array to pass to child
function ParentWithMemo() {
  const [count, setCount] = useState(0);
  
  // Without useMemo, new object created every render
  // Child would re-render even though user data is same
  const user = useMemo(() => ({
    id: 1,
    name: "Alice",
    email: "alice@example.com"
  }), []); // Empty dependencies = only created once
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <MemoizedUserCard user={user} />
    </div>
  );
}

// ===== USECALLBACK =====

/**
 * Memoize function reference
 * Prevents child from re-rendering
 * Use when: passing function to memoized child
 */

function ParentWithCallback() {
  const [count, setCount] = useState(0);
  
  // Without useCallback - new function every render
  const handleDelete = (id) => {
    console.log("Deleting", id);
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      {/* Child would re-render because handleDelete reference changed */}
      {/* <MemoizedChild onDelete={handleDelete} /> */}
    </div>
  );
}

function ParentWithOptimizedCallback() {
  const [count, setCount] = useState(0);
  
  // With useCallback - same function reference if dependencies don't change
  const handleDelete = useCallback((id) => {
    console.log("Deleting", id);
  }, []); // No dependencies = function never changes
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      {/* Child won't re-render unless user prop changes */}
      {/* <MemoizedChild onDelete={handleDelete} /> */}
    </div>
  );
}

// Callback with dependencies
function FilteredList() {
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
  ]);
  
  // Callback depends on searchTerm
  const filterUsers = useCallback(() => {
    return users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [users, searchTerm]); // Recalculate when these change
  
  return (
    <div>
      <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." />
      <p>Found: {filterUsers().length}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// ===== CODE SPLITTING WITH LAZY & SUSPENSE =====

/**
 * Load components only when needed
 * Reduces initial bundle size
 * Common for routes and heavy components
 */

// Large component loaded lazily
const HeavyChartComponent = lazy(() => import("./HeavyChart"));
const AdminDashboard = lazy(() => import("./AdminDashboard"));

function LoadingFallback() {
  return <div style={{ padding: 20, textAlign: "center" }}>Loading...</div>;
}

function CodeSplittingExample() {
  const [page, setPage] = useState("home");
  
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <button onClick={() => setPage("home")} style={{ fontWeight: page === "home" ? "bold" : "normal" }}>
          Home
        </button>
        <button onClick={() => setPage("chart")} style={{ fontWeight: page === "chart" ? "bold" : "normal" }}>
          Chart
        </button>
        <button onClick={() => setPage("admin")} style={{ fontWeight: page === "admin" ? "bold" : "normal" }}>
          Admin
        </button>
      </div>
      
      <Suspense fallback={<LoadingFallback />}>
        {page === "home" && <div>Home page - no split</div>}
        {page === "chart" && <HeavyChartComponent />}
        {page === "admin" && <AdminDashboard />}
      </Suspense>
    </div>
  );
}

// ===== VIRTUAL LISTS (WINDOWING) =====

/**
 * Only render visible items in long lists
 * Drastically improves performance for large lists
 * Use libraries: react-window, react-virtualized
 */

function VirtualListSimple({ items }) {
  const itemHeight = 50;
  const visibleCount = 10;
  const [scrollTop, setScrollTop] = useState(0);
  
  const startIndex = Math.floor(scrollTop / itemHeight);
  const visibleItems = items.slice(startIndex, startIndex + visibleCount);
  
  return (
    <div
      style={{ height: 500, overflow: "auto" }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: items.length * itemHeight, position: "relative" }}>
        {visibleItems.map((item, i) => (
          <div
            key={startIndex + i}
            style={{
              position: "absolute",
              top: (startIndex + i) * itemHeight,
              height: itemHeight,
              width: "100%"
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

// Usage
function VirtualListExample() {
  const items = Array.from({ length: 10000 }, (_, i) => `Item ${i + 1}`);
  
  return <VirtualListSimple items={items} />;
}

// ===== IMAGE OPTIMIZATION =====

/**
 * Images are often 50-80% of page size
 * Optimization has huge impact on performance
 * Strategies: lazy loading, responsive, format
 */

function OptimizedImage({ src, alt, width, height }) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy" // Lazy load images
      decoding="async" // Async decode
      style={{ maxWidth: "100%", height: "auto" }}
    />
  );
}

function ResponsiveImage({ src, alt, sizes = "100vw" }) {
  // In real app, you'd have multiple image sizes
  const srcSet = `
    ${src}?w=400 400w,
    ${src}?w=800 800w,
    ${src}?w=1200 1200w
  `;
  
  return (
    <img
      srcSet={srcSet}
      sizes={sizes}
      src={src}
      alt={alt}
      loading="lazy"
      style={{ maxWidth: "100%", height: "auto" }}
    />
  );
}

// Modern format with fallback
function ModernImageFormat({ src, alt }) {
  return (
    <picture>
      <source srcSet={`${src}.webp`} type="image/webp" />
      <source srcSet={`${src}.jpg`} type="image/jpeg" />
      <img src={`${src}.jpg`} alt={alt} loading="lazy" />
    </picture>
  );
}

// ===== PROFILING PERFORMANCE =====

/**
 * React DevTools Profiler
 * Chrome DevTools Performance tab
 * Lighthouse
 * Web Vitals
 */

function ProfileExample() {
  const [items, setItems] = useState(Array.from({ length: 1000 }, (_, i) => i));
  const [filter, setFilter] = useState("");
  
  const filtered = useMemo(() => {
    // Simulate expensive filter
    return items.filter(item =>
      item.toString().includes(filter)
    );
  }, [items, filter]);
  
  return (
    <div>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter items..."
      />
      <p>Found: {filtered.length}</p>
      <button onClick={() => setItems(Array.from({ length: 2000 }, (_, i) => i))}>
        Add more items
      </button>
    </div>
  );
}

// ===== PERFORMANCE OPTIMIZATION CHECKLIST =====

/**
 * RENDERING PERFORMANCE:
 * ✓ Use React DevTools Profiler to identify slow components
 * ✓ Memoize expensive calculations with useMemo
 * ✓ Use React.memo for components that re-render unnecessarily
 * ✓ Use useCallback for functions passed to children
 * ✓ Provide correct key prop for lists
 * ✓ Avoid creating objects/arrays in render
 * 
 * BUNDLE SIZE:
 * ✓ Use code splitting for routes and heavy components
 * ✓ Lazy load components with Suspense
 * ✓ Check bundle size with webpack-bundle-analyzer
 * ✓ Remove unused dependencies
 * ✓ Use tree shaking (ES modules)
 * ✓ Minify and compress
 * 
 * ASSETS:
 * ✓ Optimize images (compress, resize, modern formats)
 * ✓ Use lazy loading for images
 * ✓ Use responsive images with srcSet
 * ✓ Optimize fonts (use system fonts if possible)
 * ✓ Use CDN for static assets
 * 
 * GENERAL:
 * ✓ Profile before and after optimization
 * ✓ Monitor real user metrics
 * ✓ Test on slow devices/networks
 * ✓ Don't optimize prematurely
 * ✓ Focus on user experience
 * ✓ Use Lighthouse to audit
 */

/**
 * PERFORMANCE METRICS:
 * • FCP (First Contentful Paint): First content appears
 * • LCP (Largest Contentful Paint): Main content appears
 * • CLS (Cumulative Layout Shift): Visual stability
 * • FID (First Input Delay): Responsiveness
 * • TTFB (Time To First Byte): Server response
 */

/**
 * NEXT STEPS:
 * 1. Learn Next.js for automatic optimizations
 * 2. Learn image optimization libraries
 * 3. Monitor production metrics
 * 4. Build and launch applications
 */
