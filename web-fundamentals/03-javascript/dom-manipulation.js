/**
 * 📚 STEP 3️⃣  - JAVASCRIPT FUNDAMENTALS: DOM MANIPULATION
 * 
 * PREREQUISITE: JavaScript fundamentals.js
 * TIME TO COMPLETE: 3-4 days
 * DIFFICULTY: Beginner to Intermediate
 * 
 * WHAT YOU'LL LEARN:
 * • Selecting HTML elements with JavaScript
 * • Traversing the DOM tree (parent, child, sibling)
 * • Creating, modifying, and removing elements
 * • Working with classes and styles
 * • Handling events (clicks, forms, keyboard, etc.)
 * • Event delegation for efficiency
 * • Modern DOM APIs (Observers)
 * 
 * KEY CONCEPTS TO UNDERSTAND:
 * 1. DOM: The programming interface to HTML
 * 2. Selection: How to find elements you want to work with
 * 3. Traversal: How to move around the DOM tree
 * 4. Manipulation: How to change HTML/CSS via JavaScript
 * 5. Events: How to respond to user interactions
 * 6. Event delegation: Efficient way to handle many elements
 * 7. Observers: Modern way to react to DOM/size/visibility changes
 * 
 * LEARNING PATH FOR THIS FILE:
 * 1. Learn selecting (getElementById, querySelector, etc.)
 * 2. Learn traversing (parent, children, siblings)
 * 3. Learn modifying content and attributes
 * 4. Learn managing classes (classList)
 * 5. Learn events and listeners
 * 6. Learn event delegation pattern
 * 7. Learn localStorage and observers
 * 
 * IMPORTANT LEARNING NOTES:
 * • querySelector and querySelectorAll are most flexible
 * • Use classList, not className for adding/removing classes
 * • addEventListener is preferred over onclick
 * • Event delegation avoids memory leaks
 * • Always remove event listeners when elements are destroyed
 * • Modern APIs (Intersection Observer, etc.) are better than old ways
 * 
 * PRACTICAL SCENARIOS YOU'LL BUILD:
 * 1. Toggle a menu on button click
 * 2. Add/remove items from a list
 * 3. Update form based on user input
 * 4. Create a modal/popup
 * 5. Handle form validation
 * 6. Save data to localStorage
 * 7. Lazy load images
 * 
 * COMMON MISTAKES TO AVOID:
 * 1. Using innerHTML with user input (security risk)
 * 2. Adding too many event listeners (use delegation)
 * 3. Not removing event listeners (memory leaks)
 * 4. Using on* attributes in HTML (old way)
 * 5. Not checking if element exists before using it
 * 6. Querying same element multiple times (cache it)
 * 
 * DOM PERFORMANCE TIPS:
 * • Minimize DOM queries (cache elements)
 * • Batch DOM updates together
 * • Use event delegation for dynamic elements
 * • Use textContent instead of innerHTML when possible
 * • Use DocumentFragment for multiple additions
 * 
 * NEXT STEPS AFTER THIS FILE:
 * → Move to advanced-concepts.js for complex patterns
 * → Learn about asynchronous JavaScript (fetch, promises, async/await)
 * → Then TypeScript for type-safe DOM manipulation
 */

// ===== SELECTING ELEMENTS =====

// Get single element
const element = document.getElementById("myId");
const element2 = document.querySelector("#myId"); // CSS selector
const element3 = document.querySelector(".myClass");
const element4 = document.querySelector("div > p");

// Get multiple elements
const elements = document.getElementsByClassName("myClass"); // Live HTMLCollection
const elements2 = document.querySelectorAll(".myClass"); // Static NodeList
const elements3 = document.getElementsByTagName("p");

// Query relative to element
const parent = document.querySelector(".parent");
const child = parent.querySelector(".child");
const children = parent.querySelectorAll(".child");

// ===== TRAVERSING THE DOM =====

const el = document.querySelector("div");

// Parent/Child relationships
el.parentElement; // Direct parent
el.parentNode; // Parent (could be other node types)
el.children; // HTMLCollection of direct children
el.childNodes; // All child nodes (includes text nodes)
el.firstChild; // First child node (might be text node)
el.firstElementChild; // First child element
el.lastChild;
el.lastElementChild;

// Sibling relationships
el.nextSibling; // Next node (might be text node)
el.nextElementSibling; // Next element sibling
el.previousSibling;
el.previousElementSibling;

// Closest ancestor (traverses up)
el.closest(".container"); // Finds nearest ancestor with class
el.closest("[data-role]"); // Finds ancestor with attribute

// ===== MODIFYING THE DOM =====

// Create elements
const newDiv = document.createElement("div");
const newText = document.createTextNode("Hello");
const newComment = document.createComment("This is a comment");

// Add to DOM
parent.appendChild(newDiv); // Add as last child
parent.insertBefore(newDiv, parent.firstChild); // Add before reference
parent.prepend(newDiv); // Add as first child
parent.append(newDiv); // Add as last child
el.insertAdjacentElement("beforebegin", newDiv); // Insert relative to element
el.insertAdjacentHTML("afterend", "<p>New paragraph</p>");
el.insertAdjacentText("beforeend", "text content");

// Replace elements
parent.replaceChild(newDiv, oldDiv);
oldEl.replaceWith(newEl);

// Remove elements
parent.removeChild(el);
el.remove();

// Clone elements
const cloned = el.cloneNode(true); // true = deep clone (includes children)
const shallowClone = el.cloneNode(false); // false = shallow clone

// ===== TEXT AND CONTENT =====

const element = document.querySelector("div");

// Get/set text content
element.textContent = "New text"; // Plain text only
element.innerText = "New text"; // Similar to textContent but respects CSS display
const text = element.textContent;

// Get/set HTML content
element.innerHTML = "<p>Paragraph</p><span>Span</span>";
const html = element.innerHTML;

// Safer alternative to innerHTML - use with templates
element.insertAdjacentHTML("beforeend", "<p>Safe HTML</p>");

// ===== ATTRIBUTES =====

const el = document.querySelector("a");

// Get/set attributes
el.getAttribute("href");
el.setAttribute("href", "https://example.com");
el.removeAttribute("href");
el.hasAttribute("href"); // boolean

// Attribute methods
el.getAttributeNode("href");
el.setAttributeNode(attr);
el.removeAttributeNode(attr);

// Direct property access (for common attributes)
el.href = "https://example.com";
el.title = "Link title";
el.className = "class1 class2";

// Data attributes
el.getAttribute("data-id"); // Get data-id="value"
el.dataset.id; // Same as above
el.dataset.userId = "123"; // Creates data-user-id attribute

// ===== CLASSES =====

const el = document.querySelector("div");

// Add/remove classes
el.classList.add("active");
el.classList.add("class1", "class2", "class3"); // Multiple
el.classList.remove("active");
el.classList.remove("class1", "class2"); // Multiple
el.classList.toggle("active"); // Add if not present, remove if present
el.classList.toggle("active", condition); // Add if condition is true

// Check class
el.classList.contains("active"); // boolean
el.classList.value; // String of all classes

// Direct className (replaces all)
el.className = "new-class"; // This replaces, not adds

// ===== STYLES =====

const el = document.querySelector("div");

// Inline styles
el.style.color = "red";
el.style.backgroundColor = "blue";
el.style.display = "block";
el.style.fontSize = "16px";

// Get computed styles (including CSS rules)
const styles = window.getComputedStyle(el);
styles.color;
styles.backgroundColor;
styles.display;

// Get specific computed style
window.getComputedStyle(el).getPropertyValue("color");

// Set CSS custom properties (variables)
el.style.setProperty("--my-color", "red");
const cssVar = el.style.getPropertyValue("--my-color");

// Remove inline style
el.style.removeProperty("color");

// ===== EVENTS =====

// Add event listener
el.addEventListener("click", function(event) {
  console.log("Clicked!"); // OUTPUT: "Clicked!"
});

// Add with options
el.addEventListener("click", handler, true); // capture phase
el.addEventListener("click", handler, { 
  capture: false, 
  once: true,    // Remove after first trigger
  passive: true  // Won't call preventDefault
});

// Remove event listener
el.removeEventListener("click", handler);

// Event object properties
function handleClick(event) {
  event.type; // "click"
  event.target; // Element that triggered event
  event.currentTarget; // Element with listener
  event.clientX, event.clientY; // Mouse position relative to viewport
  event.pageX, event.pageY; // Mouse position relative to page
  event.screenX, event.screenY; // Mouse position relative to screen
  event.key; // Key pressed (for keyboard events)
  event.code; // Physical key code
  event.which; // Key code (legacy)
}

// Common events
element.addEventListener("click", handler);
element.addEventListener("dblclick", handler);
element.addEventListener("mouseenter", handler);
element.addEventListener("mouseleave", handler);
element.addEventListener("mousemove", handler);
element.addEventListener("mousedown", handler);
element.addEventListener("mouseup", handler);
element.addEventListener("focus", handler);
element.addEventListener("blur", handler);
element.addEventListener("change", handler); // Form input changed
element.addEventListener("input", handler); // While typing
element.addEventListener("submit", handler); // Form submitted
element.addEventListener("keydown", handler);
element.addEventListener("keyup", handler);
element.addEventListener("keypress", handler);
element.addEventListener("scroll", handler);
element.addEventListener("resize", handler);
element.addEventListener("load", handler);
element.addEventListener("error", handler);
element.addEventListener("touchstart", handler);
element.addEventListener("touchend", handler);
element.addEventListener("touchmove", handler);

// Event delegation (handling events on parent)
const list = document.querySelector("ul");
list.addEventListener("click", function(event) {
  if (event.target.tagName === "LI") {
    console.log("Clicked list item:", event.target); // OUTPUT: Clicked list item: <li>...</li>
  }
});

// Prevent default behavior
form.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission
  // Custom form handling
});

// Stop event propagation
element.addEventListener("click", function(event) {
  event.stopPropagation(); // Prevent bubbling up
  event.stopImmediatePropagation(); // Prevent other handlers
});

// ===== DOCUMENT AND WINDOW OBJECTS =====

// Document properties
document.title = "New Title";
document.body; // Body element
document.head; // Head element
document.documentElement; // Root HTML element
document.forms; // All forms
document.images; // All images
document.links; // All links
document.URL; // Current URL
document.domain; // Domain

// Window properties
window.innerWidth; // Viewport width
window.innerHeight; // Viewport height
window.scrollX; // Horizontal scroll
window.scrollY; // Vertical scroll
window.location.href; // Current URL
window.location.pathname; // Path
window.location.search; // Query string
window.localStorage; // Persistent storage
window.sessionStorage; // Session storage
window.history; // Browser history

// ===== TIMING FUNCTIONS =====

// setTimeout - execute after delay
const timeoutId = setTimeout(() => {
  console.log("After 1 second"); // OUTPUT: "After 1 second"
}, 1000);
clearTimeout(timeoutId); // Cancel

// setInterval - execute repeatedly
const intervalId = setInterval(() => {
  console.log("Every 2 seconds"); // OUTPUT: "Every 2 seconds" (repeats every 2s)
}, 2000);
clearInterval(intervalId); // Cancel

// requestAnimationFrame - optimized animation
function animate() {
  // Update animation frame
  element.style.transform = "translateX(10px)";
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// ===== FORMS =====

const form = document.querySelector("form");
const input = document.querySelector("input[type='text']");

// Form properties
form.elements; // FormControlCollection
form.elements["fieldName"]; // Access by name
form[0]; // Access by index
form.length; // Number of controls
form.method; // GET or POST
form.action; // Form action URL

// Form methods
form.submit(); // Submit form programmatically
form.reset(); // Reset all fields
form.checkValidity(); // Check form validation

// Input properties
input.value; // Get/set input value
input.checked; // For checkboxes/radios
input.disabled = true; // Enable/disable
input.required = true; // Make required
input.focus(); // Focus input
input.blur(); // Remove focus
input.select(); // Select all text

// Form events
form.addEventListener("submit", function(e) {
  e.preventDefault();
  // Handle form submission
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
});

input.addEventListener("input", function(e) {
  console.log("Input value:", e.target.value);
});

// ===== LOCAL AND SESSION STORAGE =====

// localStorage - persistent
localStorage.setItem("key", "value");
const value = localStorage.getItem("key");
localStorage.removeItem("key");
localStorage.clear(); // Remove all
localStorage.key(0); // Get key by index
localStorage.length; // Number of items

// sessionStorage - same API, cleared on tab close
sessionStorage.setItem("key", "value");

// Storage events (listen for changes from other tabs)
window.addEventListener("storage", function(event) {
  console.log("Storage changed:", event.key);
});

// ===== MODERN DOM METHODS =====

// Intersection Observer - detect visibility
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log("Element is visible!");
    }
  });
});
observer.observe(element);

// Mutation Observer - detect DOM changes
const mutationObserver = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    console.log("DOM changed!", mutation);
  });
});
mutationObserver.observe(element, {
  childList: true,
  subtree: true,
  attributes: true
});

// ResizeObserver - detect element resizing
const resizeObserver = new ResizeObserver((entries) => {
  entries.forEach(entry => {
    console.log("Size:", entry.contentRect);
  });
});
resizeObserver.observe(element);
