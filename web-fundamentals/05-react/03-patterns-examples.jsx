/**
 * REACT PATTERNS - CODE ALONG WITH OUTPUT EXAMPLES
 */

import React, { useState, useCallback, useContext, createContext, memo } from "react";

// ===== COMPOSITION PATTERN =====

function Avatar({ src, alt, size = 48 }) {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: size,
        height: size,
        borderRadius: "50%"
      }}
    />
  );
}

function UserName({ name, role }) {
  return (
    <div>
      <h3 style={{ margin: 0 }}>{name}</h3>
      <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "gray" }}>{role}</p>
    </div>
  );
}

function UserBio({ bio }) {
  return <p style={{ margin: "8px 0 0 0", fontSize: "14px" }}>{bio}</p>;
}

function ComposedUserCard({ user }) {
  return (
    <div style={{ display: "flex", gap: "16px", padding: "16px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <Avatar src={user.avatar} alt={user.name} size={64} />
      <div>
        <UserName name={user.name} role={user.role} />
        <UserBio bio={user.bio} />
      </div>
    </div>
  );
  
  // OUTPUT:
  // ┌─────────────────────────────────────────────────┐
  // │ [AVATAR] Alice Johnson                          │
  // │          React Developer                        │
  // │          Building awesome UIs                   │
  // └─────────────────────────────────────────────────┘
}

// ===== CHILDREN PATTERN =====

function Card({ children, title, padding = "16px" }) {
  return (
    <div style={{ border: "1px solid #ddd", padding, borderRadius: "8px" }}>
      {title && <h2 style={{ margin: "0 0 16px 0" }}>{title}</h2>}
      {children}
    </div>
  );
}

function ChildrenPatternExample() {
  return (
    <>
      <Card title="Welcome">
        <p>This is content inside the card</p>
        <p>You can put any JSX here!</p>
      </Card>
      
      <Card title="Features">
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </Card>
      
      <Card title="Custom Content">
        <button>Click me</button>
        <input placeholder="Type something" />
      </Card>
    </>
  );
  
  // OUTPUT:
  // ┌──────────────────────────────┐
  // │ Welcome                      │
  // │ This is content in the card  │
  // │ You can put any JSX here!    │
  // └──────────────────────────────┘
  //
  // ┌──────────────────────────────┐
  // │ Features                     │
  // │ • Item 1                     │
  // │ • Item 2                     │
  // │ • Item 3                     │
  // └──────────────────────────────┘
  //
  // ┌──────────────────────────────┐
  // │ Custom Content               │
  // │ [Click me] [Type something]  │
  // └──────────────────────────────┘
}

// ===== SLOTS PATTERN (Named Children) =====

function Modal({ title, children, footer, onClose }) {
  return (
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
        maxWidth: "500px",
        width: "90%"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ margin: 0 }}>{title}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer" }}>✕</button>
        </div>
        <div style={{ marginBottom: "16px" }}>{children}</div>
        {footer && <div style={{ borderTop: "1px solid #eee", paddingTop: "16px" }}>{footer}</div>}
      </div>
    </div>
  );
}

function SlotsPatternExample() {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setOpen(true)}>Open Dialog</button>
      
      {open && (
        <Modal
          title="Confirm Action"
          onClose={() => setOpen(false)}
          footer={
            <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
              <button onClick={() => setOpen(false)}>Cancel</button>
              <button onClick={() => setOpen(false)} style={{ backgroundColor: "blue", color: "white" }}>Confirm</button>
            </div>
          }
        >
          <p>Are you sure you want to proceed?</p>
          <p>This action cannot be undone.</p>
        </Modal>
      )}
    </>
  );
  
  // OUTPUT (closed):
  // [Open Dialog]
  //
  // OUTPUT (open):
  // ┌──────────────────────────────────────┐
  // │ Confirm Action                    ✕  │
  // ├──────────────────────────────────────┤
  // │ Are you sure you want to proceed?    │
  // │ This action cannot be undone.        │
  // ├──────────────────────────────────────┤
  // │                [Cancel] [Confirm]    │
  // └──────────────────────────────────────┘
}

// ===== CONTROLLED COMPONENTS =====

function ControlledInput() {
  const [value, setValue] = useState("");
  
  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something"
      />
      <p>You typed: {value}</p>
      <p>Character count: {value.length}</p>
    </div>
  );
  
  // OUTPUT (initial):
  // [Type something]
  // You typed:
  // Character count: 0
  //
  // OUTPUT (after typing "Hello"):
  // [Type something: Hello]
  // You typed: Hello
  // Character count: 5
}

// ===== RENDER PROPS PATTERN =====

function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };
  
  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        width: "100%",
        height: "300px",
        backgroundColor: "#f0f0f0",
        position: "relative",
        cursor: "none"
      }}
    >
      {render(position)}
    </div>
  );
}

function RenderPropsExample() {
  return (
    <MouseTracker
      render={(pos) => (
        <div style={{
          position: "absolute",
          left: pos.x,
          top: pos.y,
          transform: "translate(-50%, -50%)"
        }}>
          <div style={{
            width: "20px",
            height: "20px",
            backgroundColor: "red",
            borderRadius: "50%"
          }} />
          <p style={{ margin: 0, fontSize: "12px", color: "gray" }}>
            {pos.x}, {pos.y}
          </p>
        </div>
      )}
    />
  );
  
  // OUTPUT (visual):
  // ┌─────────────────────────────────────────┐
  // │                                         │
  // │     ● 450, 150                          │
  // │   (red dot follows cursor)              │
  // │                                         │
  // └─────────────────────────────────────────┘
}

// ===== COMPOUND COMPONENTS =====

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
  return (
    <div style={{
      display: "flex",
      borderBottom: "2px solid #ddd"
    }}>
      {children}
    </div>
  );
}

function Tab({ children, index }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  
  return (
    <button
      onClick={() => setActiveTab(index)}
      style={{
        padding: "12px 16px",
        border: "none",
        backgroundColor: "transparent",
        borderBottom: activeTab === index ? "2px solid blue" : "none",
        color: activeTab === index ? "blue" : "black",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: activeTab === index ? "bold" : "normal"
      }}
    >
      {children}
    </button>
  );
}

function TabPanels({ children }) {
  return <div style={{ padding: "16px" }}>{children}</div>;
}

function TabPanel({ children, index }) {
  const { activeTab } = useContext(TabsContext);
  return activeTab === index ? children : null;
}

Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;

function CompoundComponentExample() {
  return (
    <Tabs defaultTab={0}>
      <Tabs.List>
        <Tabs.Tab index={0}>Home</Tabs.Tab>
        <Tabs.Tab index={1}>About</Tabs.Tab>
        <Tabs.Tab index={2}>Contact</Tabs.Tab>
      </Tabs.List>
      
      <Tabs.Panels>
        <Tabs.Panel index={0}>
          <h3>Welcome to Home</h3>
          <p>This is the home page content</p>
        </Tabs.Panel>
        <Tabs.Panel index={1}>
          <h3>About Us</h3>
          <p>Learn more about our company</p>
        </Tabs.Panel>
        <Tabs.Panel index={2}>
          <h3>Contact Us</h3>
          <p>Get in touch with us</p>
        </Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  );
  
  // OUTPUT (initial):
  // Home | About | Contact (Home is underlined)
  // ───────────────────────────────────────────
  // Welcome to Home
  // This is the home page content
  //
  // OUTPUT (after clicking About):
  // Home | About | Contact (About is underlined)
  // ───────────────────────────────────────────
  // About Us
  // Learn more about our company
}

// ===== HIGHER-ORDER COMPONENT PATTERN =====

function withLoading(Component) {
  return function LoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <p>Loading...</p>;
    }
    return <Component {...props} />;
  };
}

function DataDisplay({ data }) {
  return (
    <div>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
    </div>
  );
}

const DataDisplayWithLoading = withLoading(DataDisplay);

function HOCPatternExample() {
  const [loading, setLoading] = useState(true);
  
  setTimeout(() => setLoading(false), 2000);
  
  return (
    <div>
      <DataDisplayWithLoading
        isLoading={loading}
        data={{ title: "React", content: "A JavaScript library for building UIs" }}
      />
    </div>
  );
  
  // OUTPUT (first 2 seconds):
  // Loading...
  //
  // OUTPUT (after 2 seconds):
  // React
  // A JavaScript library for building UIs
}

// ===== MEMOIZATION WITH REACT.MEMO =====

const UserListItem = memo(function UserListItem({ user, onDelete }) {
  console.log(`Rendering user: ${user.name}`);
  
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #eee" }}>
      <span>{user.name}</span>
      <button onClick={() => onDelete(user.id)}>Delete</button>
    </div>
  );
});

function MemoizationExample() {
  const [count, setCount] = useState(0);
  const [users] = useState([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" }
  ]);
  
  const handleDelete = useCallback((id) => {
    console.log("Deleting user:", id);
  }, []);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      
      <h3>Users</h3>
      {users.map(user => (
        <UserListItem key={user.id} user={user} onDelete={handleDelete} />
      ))}
    </div>
  );
  
  // OUTPUT (initial):
  // Rendering user: Alice
  // Rendering user: Bob
  // Rendering user: Charlie
  // Count: 0
  // [Increment]
  //
  // (click Increment)
  // Count: 1
  // (Users NOT re-rendered because props are stable!)
}

// ===== ADAPTER PATTERN =====

function CustomDatePicker({ value, onChange }) {
  return (
    <input
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function AdapterPatternExample() {
  const [date, setDate] = useState("2024-01-27");
  
  return (
    <div>
      <label>Select Date:</label>
      <CustomDatePicker value={date} onChange={setDate} />
      <p>Selected: {date}</p>
    </div>
  );
  
  // OUTPUT:
  // Select Date: [2024-01-27]
  // Selected: 2024-01-27
  //
  // After selecting 2024-02-15:
  // Selected: 2024-02-15
}

// ===== CONTEXT FOR GLOBAL STATE =====

const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");
  
  return (
    <AppContext.Provider value={{ user, setUser, theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
}

function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used inside AppProvider");
  }
  return context;
}

function UserGreeting() {
  const { user, setUser } = useApp();
  
  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.name}!</p>
          <button onClick={() => setUser(null)}>Logout</button>
        </>
      ) : (
        <button onClick={() => setUser({ name: "Alice" })}>Login</button>
      )}
    </div>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useApp();
  
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Theme: {theme}
    </button>
  );
}

function ContextPatternExample() {
  return (
    <AppProvider>
      <div>
        <ThemeToggle />
        <UserGreeting />
      </div>
    </AppProvider>
  );
  
  // OUTPUT (initial):
  // [Theme: light] [Login]
  //
  // After clicking Login:
  // [Theme: light] Welcome, Alice!
  //               [Logout]
  //
  // After clicking Theme button:
  // [Theme: dark] Welcome, Alice!
}

export default CompoundComponentExample;
// To run other examples, change the export:
// export default ComposedUserCard;
// export default ChildrenPatternExample;
// export default SlotsPatternExample;
// etc.
