/**
 * 📚 STEP 5️⃣  - BEST PRACTICES & INTEGRATION
 * 
 * PREREQUISITE: All previous steps
 * TIME TO COMPLETE: 2-3 days
 * DIFFICULTY: All levels
 * 
 * WHAT YOU'LL LEARN:
 * • Best practices across all technologies
 * • How to write clean, maintainable code
 * • Performance optimization strategies
 * • Security considerations
 * • Testing approaches
 * • Code organization and structure
 * • Common pitfalls and how to avoid them
 * 
 * KEY CONCEPTS TO UNDERSTAND:
 * 1. Code quality: Readability, maintainability, performance
 * 2. Best practices: Proven ways of doing things
 * 3. Anti-patterns: Common mistakes to avoid
 * 4. Security: Protecting your code and users
 * 5. Performance: Making code fast
 * 6. Testing: Ensuring code works correctly
 * 7. Architecture: Organizing code at scale
 * 
 * HOW TO USE THIS FILE:
 * 1. Review each section after learning that technology
 * 2. Keep patterns as reference while coding
 * 3. Check before submitting code for review
 * 4. Return often as you gain experience
 * 5. Apply the concepts in your projects
 * 
 * READING GUIDE:
 * • After HTML: Review HTML best practices section
 * • After CSS: Review CSS best practices section
 * • After JavaScript: Review JavaScript best practices section
 * • After TypeScript: Review TypeScript best practices section
 * • Finally: Review testing, security, performance sections
 * 
 * LEARNING PATH FOR THIS FILE:
 * 1. Understand why best practices matter
 * 2. Learn code organization patterns
 * 3. Study performance optimization
 * 4. Review security considerations
 * 5. Learn testing strategies
 * 6. Master debugging techniques
 * 7. Apply design patterns
 * 
 * WHY BEST PRACTICES MATTER:
 * • Teams read your code more than you do
 * • Future you won't remember why you wrote something
 * • Code is maintainability first, cleverness second
 * • Following patterns makes code predictable
 * • Bad practices lead to technical debt
 * • Good practices save time in long run
 * 
 * IMPORTANT LEARNING NOTES:
 * • Best practices evolve as technology changes
 * • Context matters - not all practices fit all situations
 * • Readability > Cleverness (always)
 * • Consistent > Perfect
 * • Document non-obvious decisions
 * • Automate what you can (linters, formatters)
 * 
 * FOLDER STRUCTURE BEST PRACTICE:
 * 
 * PROJECT/
 * ├── src/
 * │   ├── components/
 * │   ├── pages/
 * │   ├── utils/
 * │   ├── hooks/
 * │   ├── types/
 * │   └── App.tsx
 * ├── tests/
 * ├── public/
 * ├── package.json
 * ├── tsconfig.json
 * ├── .eslintrc.js
 * └── README.md
 * 
 * NEXT STEPS AFTER THIS FILE:
 * → Start building projects!
 * → Learn a framework (React, Vue, Angular, Svelte)
 * → Learn build tools (Webpack, Vite)
 * → Learn testing frameworks (Jest, Vitest, Cypress)
 * → Join developer communities
 * → Contribute to open source
 * → Keep learning and improving
 * 
 * YOUR LEARNING JOURNEY:
 * 
 * ✅ COMPLETED: Web Fundamentals
 * ├─ HTML: Semantic markup, forms, accessibility
 * ├─ CSS: Selectors, layouts, animations
 * ├─ JavaScript: Fundamentals, DOM, advanced concepts
 * └─ TypeScript: Types, advanced patterns
 * 
 * 📚 NEXT: Choose your path
 * ├─ Frontend Framework (React/Vue/Angular)
 * ├─ Backend (Node.js, Express, NestJS)
 * ├─ Full Stack (NextJS, Remix, SvelteKit)
 * └─ Specialization (Mobile, Desktop, CLI tools)
 * 
 * 🎯 RECOMMENDED NEXT LEARNING RESOURCES:
 * 1. Official documentation for chosen technology
 * 2. Practice by building projects
 * 3. Read other people's code
 * 4. Join communities and ask questions
 * 5. Contribute to open source
 * 6. Stay current with releases and updates
 */

// ===== FOLDER STRUCTURE =====

/*
web-fundamentals/
├── 01-html/
│   ├── semantic-html.html
│   ├── form-validation.html
│   └── accessibility.html
│
├── 02-css/
│   ├── selectors-specificity.css
│   ├── layout-systems.css
│   ├── animations-transforms.css
│   ├── responsive-design.css
│   └── variables-functions.css
│
├── 03-javascript/
│   ├── fundamentals.js
│   ├── dom-manipulation.js
│   ├── advanced-concepts.js
│   ├── fetch-api.js
│   └── async-patterns.js
│
├── 04-typescript/
│   ├── fundamentals.ts
│   ├── advanced-patterns.ts
│   ├── type-utilities.ts
│   └── decorators.ts
│
├── 05-modern-workflows/
│   ├── webpack-config.js
│   ├── vite-config.ts
│   ├── prettier-config.js
│   ├── eslint-config.js
│   └── tsconfig.json
│
└── 06-examples/
    ├── todo-app/
    ├── weather-app/
    └── portfolio-site/
*/

// ===== JAVASCRIPT BEST PRACTICES =====

// 1. Use const by default, let when reassignment needed
const immutable = "Never changes";
let mutable = "Can change";

// 2. Use strict equality
const a = 5;
const b = "5";
if (a === b) {
  // Won't execute - prevents type coercion bugs
}

// 3. Use meaningful variable names
// Bad
const d = new Date(); // Too generic
const x = user.getAge(); // Unclear

// Good
const currentDate = new Date();
const userAge = user.getAge();

// 4. Keep functions small and focused
// Bad
function processUserData(user: any) {
  // Validation
  if (!user.name) throw new Error("Name required");
  
  // Transformation
  user.name = user.name.trim().toUpperCase();
  
  // Database operations
  saveToDatabase(user);
  
  // Logging
  console.log("User saved");
}

// Good
function validateUser(user: User): void {
  if (!user.name) throw new Error("Name required");
}

function normalizeUser(user: User): User {
  return { ...user, name: user.name.trim().toUpperCase() };
}

function saveUser(user: User): void {
  saveToDatabase(user);
  console.log("User saved");
}

// 5. Error handling
try {
  // Code that might throw
  riskyOperation();
} catch (error) {
  // Handle error
  if (error instanceof ValidationError) {
    console.error("Validation failed:", error.message);
  } else if (error instanceof Error) {
    console.error("Error:", error.message);
  } else {
    console.error("Unknown error:", error);
  }
} finally {
  // Cleanup
  closeConnection();
}

// 6. Use optional chaining and nullish coalescing
const user: any = null;
const name = user?.name ?? "Anonymous";
const age = user?.profile?.age ?? 0;

// 7. Avoid callback hell - use async/await
// Bad
function loadData(callback: (data: any) => void) {
  fetch("/api/data").then(response => {
    response.json().then(data => {
      callback(data);
    });
  });
}

// Good
async function loadData(): Promise<any> {
  const response = await fetch("/api/data");
  return await response.json();
}

// ===== TYPESCRIPT BEST PRACTICES =====

// 1. Avoid any - use unknown or proper typing
// Bad
function process(data: any): any {
  return data.something;
}

// Good
interface DataStructure {
  something: string;
  value: number;
}

function process(data: DataStructure): string {
  return data.something;
}

// 2. Use strict mode in tsconfig.json
/*
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
*/

// 3. Use generics for reusability
// Bad
function getFirstString(arr: string[]): string {
  return arr[0];
}

function getFirstNumber(arr: number[]): number {
  return arr[0];
}

// Good
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

// 4. Use discriminated unions for type safety
type Result<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: string }
  | { status: "loading" };

function handleResult<T>(result: Result<T>): void {
  if (result.status === "success") {
    console.log(result.data); // Properly typed
  } else if (result.status === "error") {
    console.error(result.error);
  }
}

// 5. Use utility types
interface User {
  id: number;
  name: string;
  email: string;
}

// Partial - all optional
type PartialUser = Partial<User>;

// Pick - select specific properties
type UserPreview = Pick<User, "name" | "email">;

// Omit - exclude properties
type UserWithoutId = Omit<User, "id">;

// Record - map keys to type
type UserStatus = Record<"active" | "inactive" | "pending", boolean>;

// ===== CSS BEST PRACTICES =====

// 1. Use semantic CSS class names
// Bad
const badCSS = `
  .red-box {
    background-color: red;
    padding: 10px;
  }
`;

// Good
const goodCSS = `
  .alert-container {
    background-color: var(--alert-bg);
    padding: var(--spacing-base);
  }
`;

// 2. Use CSS custom properties (variables)
const cssVariables = `
  :root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --spacing-base: 1rem;
    --spacing-large: 2rem;
    --border-radius: 4px;
    --transition: all 0.3s ease;
  }

  button {
    background-color: var(--primary-color);
    padding: var(--spacing-base);
    border-radius: var(--border-radius);
    transition: var(--transition);
  }
`;

// 3. Mobile-first responsive design
const mobileFirst = `
  /* Mobile styles (default) */
  .container {
    padding: 1rem;
    font-size: 16px;
  }

  /* Tablet and up */
  @media (min-width: 768px) {
    .container {
      padding: 2rem;
      font-size: 18px;
    }
  }

  /* Desktop and up */
  @media (min-width: 1024px) {
    .container {
      padding: 3rem;
      max-width: 1200px;
      margin: 0 auto;
    }
  }
`;

// 4. Use CSS Grid and Flexbox
// Prefer modern layout over floats and absolute positioning

// 5. BEM naming convention (Block-Element-Modifier)
const bem = `
  /* Block */
  .card {
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  /* Element */
  .card__header {
    background-color: #f5f5f5;
    padding: 1rem;
  }

  .card__body {
    padding: 1rem;
  }

  /* Modifier */
  .card--featured {
    border: 2px solid gold;
  }
`;

// ===== HTML BEST PRACTICES =====

// 1. Semantic HTML
// Bad
const badHTML = `
  <div class="header">
    <div class="nav">
      <div class="logo">Logo</div>
      <div class="menu">Menu items</div>
    </div>
  </div>
`;

// Good
const goodHTML = `
  <header>
    <nav>
      <h1>Logo</h1>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  </header>
`;

// 2. Accessibility
const accessibleHTML = `
  <!-- Use proper heading hierarchy -->
  <h1>Page Title</h1>
  <h2>Section Title</h2>

  <!-- Use labels for form inputs -->
  <label for="username">Username:</label>
  <input id="username" type="text" />

  <!-- Use alt text for images -->
  <img src="photo.jpg" alt="Description of photo" />

  <!-- Use aria attributes when needed -->
  <button aria-label="Close menu" aria-expanded="false">×</button>

  <!-- Use role attribute for landmarks -->
  <div role="main">Main content</div>
`;

// 3. SEO best practices
const seoHTML = `
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Page description for search engines" />
    <title>Descriptive Page Title</title>
    <link rel="canonical" href="https://example.com/page" />
  </head>

  <body>
    <h1>Main Page Heading</h1>
    <p>Content with relevant keywords</p>
    
    <!-- Structured data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Article Title",
      "author": "Author Name"
    }
    </script>
  </body>
`;

// ===== PERFORMANCE BEST PRACTICES =====

// 1. Lazy loading
const lazyLoading = `
  <!-- Images -->
  <img loading="lazy" src="image.jpg" alt="Description" />

  <!-- Components -->
  const LazyComponent = lazy(() => import('./Component'));
`;

// 2. Code splitting
import("./heavy-module").then(module => {
  // Use module
});

// 3. Memoization
const expensiveComputation = (n: number): number => {
  // Expensive calculation
  return n * n * n;
};

const memoized = new Map<number, number>();

function memoizedComputation(n: number): number {
  if (memoized.has(n)) {
    return memoized.get(n)!;
  }
  const result = expensiveComputation(n);
  memoized.set(n, result);
  return result;
}

// 4. Debounce and throttle
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T {
  let timeout: NodeJS.Timeout;

  return ((...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
}

function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): T {
  let inThrottle: boolean;

  return ((...args: any[]) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  }) as T;
}

// 5. Use tree shaking
// Only import what you need
import { debounce } from "lodash-es"; // Good - tree-shakeable
// import _ from "lodash"; // Bad - imports everything

// ===== TESTING BEST PRACTICES =====

// 1. Write testable code
// Bad
class User {
  saveToDatabase() {
    // Direct database dependency
    database.save(this);
  }
}

// Good
class User {
  constructor(private repository: UserRepository) {}

  save(): void {
    this.repository.save(this);
  }
}

// 2. Unit tests
function add(a: number, b: number): number {
  return a + b;
}

// Test
function testAdd() {
  console.assert(add(2, 3) === 5, "add(2, 3) should be 5");
  console.assert(add(-1, 1) === 0, "add(-1, 1) should be 0");
}

// 3. Test coverage
// Aim for 80% coverage, not 100%
// Focus on critical paths and edge cases

// ===== VERSION CONTROL BEST PRACTICES =====

/*
// .gitignore
node_modules/
dist/
build/
.env
.env.local
*.log
.DS_Store

// Commit message convention
feat: Add user authentication
fix: Resolve navigation bug
docs: Update installation guide
style: Format code
refactor: Simplify form validation
test: Add unit tests for utils
chore: Update dependencies
*/

// ===== SECURITY BEST PRACTICES =====

// 1. Validate and sanitize input
function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

// 2. Use HTTPS
// Always use HTTPS in production

// 3. Protect sensitive data
// Never expose secrets in client-side code
// Use environment variables for configuration

// 4. CSRF protection
// Use tokens for state-changing operations

// 5. Content Security Policy (CSP)
const cspHeader = `
  Content-Security-Policy: 
    default-src 'self'; 
    script-src 'self' 'unsafe-inline'; 
    style-src 'self' 'unsafe-inline'; 
    img-src 'self' data: https:;
`;
