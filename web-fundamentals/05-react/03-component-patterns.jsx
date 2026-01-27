/**
 * 📚 STEP 5️⃣C - REACT COMPONENT PATTERNS
 * 
 * PREREQUISITE: React hooks (05-react/hooks-essentials.jsx)
 * TIME TO COMPLETE: 2-3 days
 * DIFFICULTY: Intermediate-Advanced
 * 
 * WHAT YOU'LL LEARN:
 * • Composition patterns
 * • Props children pattern
 * • Render props pattern
 * • Higher-order components (HOCs)
 * • Compound components
 * • Custom hooks for logic reuse
 * • Props spreading and delegation
 * • State management patterns
 * 
 * KEY CONCEPTS TO UNDERSTAND:
 * 1. Composition: Building UIs from small pieces
 * 2. Children: Passing JSX as props
 * 3. Render props: Passing functions as props
 * 4. HOC: Function wrapping components
 * 5. Compound: Components that work together
 * 6. Slots: Named children areas
 * 7. Adapter: Changing component interfaces
 * 8. Provider: Global state pattern
 * 
 * WHY PATTERNS MATTER:
 * 1. Reusable components
 * 2. Flexible, composable code
 * 3. Shared logic between components
 * 4. Clean, maintainable code
 * 5. Easier to test
 * 6. Professional React development
 * 
 * LEARNING PATH FOR THIS FILE:
 * 1. Master composition and children
 * 2. Learn render props pattern
 * 3. Understand HOCs
 * 4. Learn compound components
 * 5. Understand slot pattern
 * 6. Learn context provider pattern
 * 7. Practice combining patterns
 * 
 * PATTERN SELECTION GUIDE:
 * • Simple reuse: Composition
 * • Share logic: Custom hooks
 * • Share behavior: Render props or HOC
 * • Complex interactions: Compound components
 * • Global state: Context or custom hook
 * 
 * IMPORTANT LEARNING NOTES:
 * • Composition is usually better than inheritance
 * • Children is the most React-like pattern
 * • Render props can be harder to read (use hooks instead)
 * • HOCs have limitations with hooks
 * • Compound components are powerful but complex
 * • Always consider custom hooks first
 * • Avoid prop drilling with Context
 * • Test components with different props
 * 
 * COMMON MISTAKES TO AVOID:
 * 1. Over-engineering with patterns
 * 2. Using render props when hooks are simpler
 * 3. Creating HOCs for simple logic (use custom hook)
 * 4. Not documenting component APIs
 * 5. Creating props that are too flexible
 * 6. Forgetting to memoize components
 * 7. Not handling edge cases
 * 
 * NEXT STEPS AFTER THIS FILE:
 * → Move to advanced-concepts.jsx
 * → Learn React.lazy and code splitting
 * → Learn error boundaries
 * → Learn Suspense
 */

import React, { useState, useCallback, useMemo, useContext, createContext } from "react";

// ===== COMPOSITION PATTERN =====

/**
 * Composition: Build complex UIs from simple pieces
 * Small components that do one thing well
 * Combine them to create larger components
 */

// Small, focused components
function Avatar({ src, alt, size = "medium" }) {
  const sizeMap = { small: 32, medium: 48, large: 64 };
  return (
    <img 
      src={src} 
      alt={alt} 
      style={{ width: sizeMap[size], height: sizeMap[size], borderRadius: "50%" }}
    />
  );
}

function UserName({ name, subtitle }) {
  return (
    <div>
      <h3 style={{ margin: 0 }}>{name}</h3>
      {subtitle && <p style={{ margin: 0, fontSize: "0.9em", color: "gray" }}>{subtitle}</p>}
    </div>
  );
}

function UserBio({ bio }) {
  return <p style={{ marginTop: 8 }}>{bio}</p>;
}

// Compose them together
function UserProfile({ user }) {
  return (
    <div style={{ display: "flex", gap: 16 }}>
      <Avatar src={user.avatar} alt={user.name} size="large" />
      <div>
        <UserName name={user.name} subtitle={user.title} />
        <UserBio bio={user.bio} />
      </div>
    </div>
  );
}

// Usage
function CompositionExample() {
  const user = {
    avatar: "https://via.placeholder.com/64",
    name: "Alice Johnson",
    title: "React Developer",
    bio: "Passionate about building amazing UIs"
  };
  
  return <UserProfile user={user} />;
}

// ===== CHILDREN PATTERN =====

/**
 * Pass JSX to components via children prop
 * Most React-like and flexible pattern
 * Used everywhere: Providers, Layouts, Wrappers
 */

// Container with children
function Card({ children, title, style }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8, ...style }}>
      {title && <h2>{title}</h2>}
      {children}
    </div>
  );
}

function Button({ children, variant = "primary", ...props }) {
  const styles = {
    primary: { backgroundColor: "blue", color: "white" },
    secondary: { backgroundColor: "gray", color: "white" },
    outline: { border: "2px solid blue", color: "blue", backgroundColor: "transparent" }
  };
  
  return (
    <button style={{ padding: "8px 16px", borderRadius: 4, ...styles[variant] }} {...props}>
      {children}
    </button>
  );
}

// Composable layout
function Layout({ children, header, footer, sidebar }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gridTemplateRows: "auto 1fr auto", height: "100vh" }}>
      {header && <header style={{ gridColumn: "1 / -1" }}>{header}</header>}
      {sidebar && <aside>{sidebar}</aside>}
      <main>{children}</main>
      {footer && <footer style={{ gridColumn: "1 / -1" }}>{footer}</footer>}
    </div>
  );
}

// Usage
function ChildrenExample() {
  return (
    <>
      <Card title="Welcome">
        <p>This is content inside the card</p>
        <Button variant="primary">Click me</Button>
      </Card>
      
      <Layout
        header={<h1>My App</h1>}
        sidebar={<nav>Navigation</nav>}
        footer={<p>© 2024</p>}
      >
        <p>Main content here</p>
      </Layout>
    </>
  );
}

// ===== NAMED CHILDREN / SLOTS PATTERN =====

/**
 * Pass multiple pieces of JSX as named props
 * Better than children when you have multiple content areas
 */

function Modal({ children, title, footer, onClose }) {
  return (
    <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ backgroundColor: "white", padding: 32, borderRadius: 8, maxWidth: 500, width: "90%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2>{title}</h2>
          <button onClick={onClose}>✕</button>
        </div>
        <div>{children}</div>
        {footer && <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #eee" }}>{footer}</div>}
      </div>
    </div>
  );
}

function Dialog({ children, title, buttons, onClose }) {
  return (
    <Modal 
      title={title} 
      footer={
        <div style={{ display: "flex", gap: 8 }}>
          {buttons}
        </div>
      }
      onClose={onClose}
    >
      {children}
    </Modal>
  );
}

// Usage
function SlotExample() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Dialog</button>
      {isOpen && (
        <Dialog
          title="Confirm Action"
          onClose={() => setIsOpen(false)}
          buttons={
            <>
              <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button onClick={() => setIsOpen(false)}>Confirm</button>
            </>
          }
        >
          <p>Are you sure you want to proceed?</p>
        </Dialog>
      )}
    </>
  );
}

// ===== RENDER PROPS PATTERN =====

/**
 * Pass a function as a prop that returns JSX
 * Useful for sharing logic but hooks are usually better
 * Pattern: render={(data) => <Component data={data} />}
 */

// Component that manages logic
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };
  
  return (
    <div onMouseMove={handleMouseMove} style={{ width: "100%", height: 300, backgroundColor: "#f0f0f0" }}>
      {render(position)}
    </div>
  );
}

// Usage - pass render function
function RenderPropsExample() {
  return (
    <MouseTracker
      render={(position) => (
        <p>Mouse at: {position.x}, {position.y}</p>
      )}
    />
  );
}

// Another example: Data fetching with render props
function DataFetcher({ url, render, loading = "Loading...", error = "Error" }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  React.useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setIsLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);
      });
  }, [url]);
  
  if (isLoading) return loading;
  if (hasError) return error;
  
  return render(data);
}

// Usage
function DataFetcherExample() {
  return (
    <DataFetcher
      url="https://jsonplaceholder.typicode.com/users/1"
      render={(user) => (
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      )}
    />
  );
}

// ===== HIGHER-ORDER COMPONENT (HOC) PATTERN =====

/**
 * Function that takes a component and returns a new component
 * Adds behavior or logic to existing components
 * Less common with hooks, but still useful
 * Pattern: const Enhanced = withBehavior(Component)
 */

// HOC that adds theme support
function withTheme(Component) {
  return function ThemedComponent(props) {
    const [theme, setTheme] = useState("light");
    
    const toggleTheme = () => {
      setTheme(t => t === "light" ? "dark" : "light");
    };
    
    return (
      <div style={{ backgroundColor: theme === "light" ? "white" : "#1e1e1e", color: theme === "light" ? "black" : "white", padding: 16 }}>
        <button onClick={toggleTheme}>Toggle Theme</button>
        <Component {...props} theme={theme} />
      </div>
    );
  };
}

function ThemedComponent({ theme }) {
  return <p>Current theme: {theme}</p>;
}

const ThemedComponentWithTheme = withTheme(ThemedComponent);

// HOC that adds data fetching
function withDataFetching(url) {
  return function DataFetchingComponent(Component) {
    return function WrappedComponent(props) {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(true);
      
      React.useEffect(() => {
        fetch(url)
          .then(res => res.json())
          .then(data => {
            setData(data);
            setLoading(false);
          });
      }, []);
      
      return <Component {...props} data={data} loading={loading} />;
    };
  };
}

// Usage
function UserDisplay({ data, loading }) {
  if (loading) return <p>Loading...</p>;
  return <p>{data.name}</p>;
}

const UserWithData = withDataFetching("https://jsonplaceholder.typicode.com/users/1")(UserDisplay);

// ===== COMPOUND COMPONENTS PATTERN =====

/**
 * Components that work together as a system
 * Share state through context
 * Flexible and powerful, but more complex
 * Pattern: <Compound><Compound.Item/><Compound.Other/></Compound>
 */

// Create context for compound component
const TabsContext = createContext();

function Tabs({ children, defaultTab = 0 }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }) {
  return <div style={{ display: "flex", borderBottom: "2px solid #ddd" }}>{children}</div>;
}

function Tab({ children, index }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  
  return (
    <button
      onClick={() => setActiveTab(index)}
      style={{
        padding: "12px 16px",
        borderBottom: activeTab === index ? "2px solid blue" : "none",
        backgroundColor: "transparent",
        cursor: "pointer"
      }}
    >
      {children}
    </button>
  );
}

function TabPanels({ children }) {
  return <div style={{ padding: 16 }}>{children}</div>;
}

function TabPanel({ children, index }) {
  const { activeTab } = useContext(TabsContext);
  
  return activeTab === index ? children : null;
}

// Attach to Tabs for convenient API
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;

// Usage
function CompoundComponentExample() {
  return (
    <Tabs defaultTab={0}>
      <Tabs.List>
        <Tabs.Tab index={0}>Tab 1</Tabs.Tab>
        <Tabs.Tab index={1}>Tab 2</Tabs.Tab>
        <Tabs.Tab index={2}>Tab 3</Tabs.Tab>
      </Tabs.List>
      
      <Tabs.Panels>
        <Tabs.Panel index={0}>Content 1</Tabs.Panel>
        <Tabs.Panel index={1}>Content 2</Tabs.Panel>
        <Tabs.Panel index={2}>Content 3</Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  );
}

// ===== CONTROLLED vs UNCONTROLLED COMPONENTS =====

/**
 * Controlled: React controls the component value (via state)
 * Uncontrolled: Component controls its own value (ref)
 * Usually prefer controlled components
 */

// Controlled component
function ControlledInput() {
  const [value, setValue] = useState("");
  
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Controlled input"
    />
  );
}

// Uncontrolled component
function UncontrolledInput() {
  const inputRef = React.useRef();
  
  const handleClick = () => {
    console.log(inputRef.current.value);
  };
  
  return (
    <>
      <input ref={inputRef} placeholder="Uncontrolled input" />
      <button onClick={handleClick}>Get value</button>
    </>
  );
}

// ===== PROVIDER PATTERN FOR GLOBAL STATE =====

/**
 * Use context and custom hook for clean global state
 * Better than prop drilling
 */

const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState([]);
  
  const value = {
    user,
    setUser,
    theme,
    setTheme,
    notifications,
    addNotification: (msg) => setNotifications([...notifications, msg])
  };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook to use context
function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }
  return context;
}

// Usage anywhere inside provider
function UserGreeting() {
  const { user, setUser } = useApp();
  
  return (
    <div>
      {user ? <p>Hello {user.name}</p> : <p>Not logged in</p>}
      <button onClick={() => setUser({ name: "Alice" })}>Login</button>
    </div>
  );
}

// ===== ADAPTER PATTERN =====

/**
 * Adapt one component's interface to another
 * Useful for using third-party components
 */

// Imagine this is a third-party component with different API
function ThirdPartyDatePicker({ onDateSelected, selectedDate, showTime }) {
  return (
    <input
      type="datetime-local"
      value={selectedDate}
      onChange={(e) => onDateSelected(e.target.value)}
    />
  );
}

// Adapt it to our app's interface
function DatePicker({ value, onChange, placeholder }) {
  return (
    <ThirdPartyDatePicker
      selectedDate={value}
      onDateSelected={onChange}
      showTime={false}
    />
  );
}

// ===== PATTERN SELECTION CHEATSHEET =====

/**
 * Need to share logic?
 * → Custom hook (preferred)
 *
 * Need flexible layout?
 * → Children pattern
 *
 * Need shared behavior across components?
 * → Custom hook or Render Props
 *
 * Need global state?
 * → Context + useContext + custom hook
 *
 * Need complex component interactions?
 * → Compound components
 *
 * Need to wrap existing component?
 * → HOC (but consider custom hook first)
 *
 * Need to adapt third-party component?
 * → Adapter pattern
 */

/**
 * NEXT STEPS:
 * 1. Practice: Create your own compound component
 * 2. Practice: Extract logic to a custom hook
 * 3. Learn: Performance optimization patterns
 * 4. Move to: advanced-concepts.jsx
 */
