/**
 * 📚 JAVASCRIPT - ASYNCHRONOUS PROGRAMMING & ADVANCED TOPICS
 * 
 * PREREQUISITE: advanced-concepts.js
 * TIME TO COMPLETE: 4-5 days
 * DIFFICULTY: Intermediate to Advanced
 * 
 * WHAT YOU'LL LEARN:
 * • Asynchronous JavaScript patterns
 * • Callbacks and callback hell
 * • Promises and promise chains
 * • Async/await syntax and patterns
 * • Error handling in async code
 * • The event loop and microtasks
 * • Fetch API and HTTP requests
 * • Web APIs (setTimeout, setInterval, requestAnimationFrame)
 * • XMLHttpRequest (older but important)
 * • Web Workers (multi-threading)
 * • Debugging async code
 * 
 * KEY CONCEPTS TO UNDERSTAND:
 * 1. Synchronous: Code runs line by line, blocks execution
 * 2. Asynchronous: Code runs without blocking
 * 3. Callbacks: Pass function to execute later
 * 4. Promises: Better abstraction over callbacks
 * 5. Async/await: Cleaner syntax for promises
 * 6. Event loop: How JavaScript handles async operations
 * 7. Microtasks: Higher priority than macrotasks
 * 8. Error handling: Try/catch with promises
 * 
 * LEARNING PATH FOR THIS FILE:
 * 1. Understand why async is needed
 * 2. Learn callbacks and their problems
 * 3. Learn Promise basics
 * 4. Learn Promise chains
 * 5. Learn async/await (modern way!)
 * 6. Understand the event loop
 * 7. Learn error handling
 * 8. Learn Fetch API
 * 9. Learn Web APIs
 * 10. Advanced patterns and optimization
 * 
 * IMPORTANT LEARNING NOTES:
 * • Async code is EVERYWHERE in modern JavaScript
 * • Understand event loop - it's crucial!
 * • Promises are still important - async/await uses them
 * • Always handle errors in async code
 * • Callbacks are old - prefer promises/async-await
 * • Network requests are the main async operation
 * 
 * COMMON MISTAKES TO AVOID:
 * 1. Not handling promise rejections (causes crashes)
 * 2. Forgetting await in async functions
 * 3. Not understanding the event loop
 * 4. Using callbacks when async/await is better
 * 5. Mixing callbacks and promises
 * 6. Not catching errors in async code
 * 7. Creating memory leaks with timers
 * 
 * NEXT STEPS AFTER THIS FILE:
 * → Study real-world API integrations
 * → Learn error handling patterns
 * → Practice with real API calls
 * → Move to TypeScript fundamentals
 */

// ===== THE EVENT LOOP =====
// Understanding the event loop is crucial for async JavaScript

/*
  HOW JAVASCRIPT EXECUTES CODE:
  
  1. CALL STACK: Where code is executed
  2. WEB APIS: Browser features (setTimeout, fetch, etc.)
  3. CALLBACK QUEUE: Where callbacks wait
  4. MICROTASK QUEUE: Where promises wait (higher priority!)
  5. EVENT LOOP: Moves callbacks to stack when stack is empty
  
  EXECUTION ORDER:
  1. Execute all synchronous code (call stack)
  2. When stack is empty, check microtask queue
  3. Execute all microtasks (promises, queueMicrotask)
  4. Render (if needed)
  5. Execute one macrotask (setTimeout, etc.)
  6. Go back to step 2
  
  EXAMPLE:
  console.log("1"); // Executes immediately
  
  setTimeout(() => {
    console.log("2"); // Macrotask - executes later
  }, 0);
  
  Promise.resolve().then(() => {
    console.log("3"); // Microtask - executes before setTimeout
  });
  
  console.log("4"); // Executes immediately
  
  OUTPUT: 1, 4, 3, 2
  WHY: 1 and 4 are sync, 3 is microtask (higher priority), 2 is macrotask
*/

// ===== CALLBACKS =====

// Callback: Function passed as argument to be called later
function loadData(callback) {
  setTimeout(() => {
    const data = { id: 1, name: "John" };
    callback(data);
  }, 1000);
}

loadData((data) => {
  console.log("Data received:", data); // OUTPUT: { id: 1, name: "John" }
});

// Callback with error handling
function loadDataWithError(callback) {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      callback(null, { id: 1, name: "John" });
    } else {
      callback(new Error("Failed to load"), null);
    }
  }, 1000);
}

loadDataWithError((error, data) => {
  if (error) {
    console.error("Error:", error.message); // OUTPUT: "Error: Failed to load" (if random > 0.5)
  } else {
    console.log("Data:", data); // OUTPUT: { id: 1, name: "John" }
  }
});

// CALLBACK HELL (Pyramid of Doom) - AVOID THIS!
/*
function processUser(userId, callback) {
  getUser(userId, (error, user) => {
    if (error) {
      callback(error);
    } else {
      getProfile(user.id, (error, profile) => {
        if (error) {
          callback(error);
        } else {
          getSettings(user.id, (error, settings) => {
            if (error) {
              callback(error);
            } else {
              callback(null, { user, profile, settings });
            }
          });
        }
      });
    }
  });
}

// This is hard to read and maintain! Use promises instead!
*/

// ===== PROMISES =====

// Creating a promise
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      resolve({ id: 1, name: "John" });
    } else {
      reject(new Error("Failed to load"));
    }
  }, 1000);
});

// Consuming a promise
promise
  .then((data) => {
    console.log("Success:", data); // OUTPUT: { id: 1, name: "John" }
    return data.id; // Can chain promises
  })
  .then((id) => {
    console.log("ID:", id); // OUTPUT: 1
    return id; // Continue chain
  })
  .catch((error) => {
    console.error("Error:", error.message); // OUTPUT: "Error: Failed to load" (if rejected)
  })
  .finally(() => {
    console.log("Done!"); // OUTPUT: "Done!" (always executes)
  });

// Promise states
const p1 = Promise.resolve("Success"); // Immediately resolved
const p2 = Promise.reject(new Error("Failure")); // Immediately rejected
const p3 = new Promise((resolve) => {
  // Pending until resolve or reject is called
  setTimeout(() => resolve("Done"), 1000);
});

// Promise.all - wait for all promises
Promise.all([p1, p3])
  .then((results) => {
    console.log("All resolved:", results); // OUTPUT: ["Success", "Done"]
  })
  .catch((error) => {
    console.error("One failed:", error);
  });

// Promise.allSettled - wait for all (ignore rejections)
Promise.allSettled([p1, p2, p3])
  .then((results) => {
    results.forEach((result) => {
      if (result.status === "fulfilled") {
        console.log("Resolved:", result.value); // OUTPUT: "Success", "Done"
      } else {
        console.log("Rejected:", result.reason); // OUTPUT: Error object
      }
    });
  });

// Promise.race - wait for first promise
Promise.race([p3, p1])
  .then((result) => {
    console.log("First completed:", result); // OUTPUT: "Success" (p1 usually wins unless p3 is faster)
  });

// Promise.any - wait for first fulfilled
Promise.any([p2, p1, p3])
  .then((result) => {
    console.log("First fulfilled:", result); // OUTPUT: "Success"
  })
  .catch((error) => {
    console.log("All rejected:", error); // If all promises reject
  });

// Chaining promises (sequential)
fetch("https://api.example.com/user")
  .then((response) => response.json())
  .then((user) => {
    console.log("User:", user); // OUTPUT: User object from API
    return fetch(`https://api.example.com/posts/${user.id}`);
  })
  .then((response) => response.json())
  .then((posts) => {
    console.log("Posts:", posts); // OUTPUT: Array of posts
  })
  .catch((error) => {
    console.error("Error in chain:", error);
  });
  });

// ===== ASYNC/AWAIT =====

// Async functions
async function getUserData() {
  return { id: 1, name: "John" };
}

// Async functions return promises
getUserData().then((data) => {
  console.log("Data:", data); // OUTPUT: { id: 1, name: "John" }
});

// Await pauses execution until promise resolves
async function getAndProcessUser() {
  try {
    // Waits for promise to resolve
    const response = await fetch("https://api.example.com/user");
    const user = await response.json();

    // Use result immediately (no .then needed!)
    console.log("User:", user); // OUTPUT: User object

    // Another async operation
    const postsResponse = await fetch(
      `https://api.example.com/posts/${user.id}`
    );
    const posts = await postsResponse.json();

    console.log("Posts:", posts); // OUTPUT: Array of posts

    return { user, posts };
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw if needed
  } finally {
    console.log("Request completed"); // OUTPUT: Cleanup code (always executes)
  }
}

// Call async function
getAndProcessUser()
  .then((result) => {
    console.log("Final result:", result); // OUTPUT: { user, posts }
  });

// ASYNC/AWAIT ADVANTAGES:
// 1. Reads like synchronous code
// 2. Easier error handling (try/catch)
// 3. Easier debugging (can breakpoint)
// 4. Cleaner than promise chains

// Parallel async operations (execute simultaneously)
async function getDataInParallel() {
  // All requests start at same time
  const [users, posts, comments] = await Promise.all([
    fetch("https://api.example.com/users").then((r) => r.json()),
    fetch("https://api.example.com/posts").then((r) => r.json()),
    fetch("https://api.example.com/comments").then((r) => r.json()),
  ]);

  return { users, posts, comments };
}

// Sequential vs Parallel
async function sequentialExample() {
  const user = await fetch("https://api.example.com/user").then((r) =>
    r.json()
  );
  const posts = await fetch(
    `https://api.example.com/posts/${user.id}`
  ).then((r) => r.json());
  // Takes: request1 + request2 time
  return { user, posts };
}

async function parallelExample() {
  const [user, posts] = await Promise.all([
    fetch("https://api.example.com/user").then((r) => r.json()),
    fetch("https://api.example.com/posts").then((r) => r.json()),
  ]);
  // Takes: max(request1, request2) time
  return { user, posts };
}

// ===== FETCH API =====

// Basic fetch
fetch("https://api.example.com/users")
  .then((response) => {
    // Check if response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json(); // Parse JSON
  })
  .then((data) => {
    console.log("Data:", data);
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });

// Fetch with options
async function postData(url, data) {
  const response = await fetch(url, {
    method: "POST", // GET, POST, PUT, DELETE, PATCH
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer token",
    },
    body: JSON.stringify(data), // Convert to JSON string
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Usage
postData("https://api.example.com/users", {
  name: "John",
  email: "john@example.com",
});

// Fetch with timeout
async function fetchWithTimeout(url, timeout = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("Request timeout");
    } else {
      console.error("Fetch error:", error);
    }
    throw error;
  }
}

// Fetch all HTTP methods
async function apiMethods(url) {
  // GET - retrieve data
  const get = await fetch(url);

  // POST - create data
  const post = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ name: "John" }),
  });

  // PUT - replace data
  const put = await fetch(url, {
    method: "PUT",
    body: JSON.stringify({ name: "Jane" }),
  });

  // PATCH - update data partially
  const patch = await fetch(url, {
    method: "PATCH",
    body: JSON.stringify({ name: "Jack" }),
  });

  // DELETE - remove data
  const delete_result = await fetch(url, {
    method: "DELETE",
  });
}

// ===== WEB APIS (TIMERS) =====

// setTimeout - execute once after delay
const timeoutId = setTimeout(() => {
  console.log("Executed after 1 second");
}, 1000);

// Cancel timeout
clearTimeout(timeoutId);

// setInterval - execute repeatedly
const intervalId = setInterval(() => {
  console.log("Executed every 1 second");
}, 1000);

// Cancel interval
clearInterval(intervalId);

// requestAnimationFrame - optimized for animations
let counter = 0;
function animate() {
  counter++;
  console.log("Frame", counter);

  if (counter < 60) {
    requestAnimationFrame(animate);
  }
}
// requestAnimationFrame(animate); // Uncomment to run

// queueMicrotask - queue function in microtask queue
queueMicrotask(() => {
  console.log("Microtask executed");
});

// Practical example: Retry with exponential backoff
async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return response.json();
      }
      throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error.message);

      if (i === maxRetries - 1) {
        throw error; // Give up
      }

      // Exponential backoff: 1s, 2s, 4s
      const delay = Math.pow(2, i) * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

// ===== XMLHTTPREQUEST (OLDER, BUT GOOD TO KNOW) =====

function makeRequest(url) {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", url);

  xhr.addEventListener("load", () => {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      console.log("Data:", data);
    }
  });

  xhr.addEventListener("error", () => {
    console.error("Request failed");
  });

  xhr.send();
}

// XMLHttpRequest with timeout
function makeRequestWithTimeout(url, timeout = 5000) {
  const xhr = new XMLHttpRequest();

  xhr.timeout = timeout;
  xhr.open("GET", url);

  xhr.addEventListener("loadend", () => {
    console.log("Request completed");
  });

  xhr.addEventListener("timeout", () => {
    console.error("Request timeout");
  });

  xhr.send();
}

// ===== ABORT CONTROLLER =====

// Cancel fetch requests
const controller = new AbortController();

const id = setTimeout(() => {
  controller.abort(); // Cancel request after 5 seconds
}, 5000);

fetch("https://api.example.com/data", {
  signal: controller.signal,
})
  .then((response) => response.json())
  .catch((error) => {
    if (error.name === "AbortError") {
      console.log("Request was cancelled");
    }
  })
  .finally(() => clearTimeout(id));

// ===== WEB WORKERS =====

/*
// Main thread
const worker = new Worker("worker.js");

// Send data to worker
worker.postMessage({ data: "Hello from main" });

// Receive data from worker
worker.onmessage = (event) => {
  console.log("Worker says:", event.data);
};

// Terminate worker
worker.terminate();

// In worker.js:
self.onmessage = (event) => {
  const result = expensiveCalculation(event.data);
  self.postMessage(result);
};
*/

// ===== ERROR HANDLING IN ASYNC CODE =====

// Using try/catch with async/await
async function safeOperation() {
  try {
    const response = await fetch("https://api.example.com/users");

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      console.error("Network error:", error);
    } else {
      console.error("Unexpected error:", error);
    }
    // Re-throw or handle
    throw error;
  } finally {
    // Cleanup (close connections, etc.)
    console.log("Operation finished");
  }
}

// Using .catch with promises
function safePromiseOperation() {
  return fetch("https://api.example.com/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
      // Return fallback value
      return [];
    });
}

// ===== ADVANCED PATTERNS =====

// Debounce - delay execution until action stops
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle - limit execution frequency
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Practical: Search with debounce
const searchInput = document.querySelector("#search");
const debouncedSearch = debounce(async (query) => {
  const results = await fetch(
    `https://api.example.com/search?q=${query}`
  ).then((r) => r.json());
  displayResults(results);
}, 300);

// searchInput.addEventListener("input", (e) => {
//   debouncedSearch(e.target.value);
// });

// Rate limiting: Execute at most N times per second
function rateLimit(func, calls, interval) {
  let count = 0;
  setInterval(() => {
    count = 0;
  }, interval);

  return function (...args) {
    if (count < calls) {
      count++;
      func.apply(this, args);
    }
  };
}

// Promise timeout wrapper
function promiseTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), ms)
    ),
  ]);
}

// Sequential async map (execute promises one by one)
async function mapSequential(array, asyncFn) {
  const results = [];
  for (const item of array) {
    results.push(await asyncFn(item));
  }
  return results;
}

// Parallel async map (execute promises simultaneously)
async function mapParallel(array, asyncFn) {
  return Promise.all(array.map(asyncFn));
}

// Pool async operations (limit concurrent)
async function mapWithPool(array, asyncFn, poolSize = 3) {
  const results = [];
  for (let i = 0; i < array.length; i += poolSize) {
    const chunk = array.slice(i, i + poolSize);
    const chunkResults = await Promise.all(chunk.map(asyncFn));
    results.push(...chunkResults);
  }
  return results;
}

// Retry helper
async function retry(fn, { retries = 3, delay = 1000 } = {}) {
  let lastError;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  throw lastError;
}

// Usage
retry(
  () => fetch("https://api.example.com/data").then((r) => r.json()),
  { retries: 3, delay: 1000 }
);

// ===== DEBUGGING ASYNC CODE =====

/*
DEBUGGING TIPS:
1. Use breakpoints in async functions
2. Use "Step into" to step through await
3. Check Network tab in DevTools for API calls
4. Use console.time/console.timeEnd for timing
5. Log before and after await to see execution order
6. Use async stack traces (DevTools setting)
7. Watch for unhandled promise rejections
8. Check Performance tab for bottlenecks

COMMON BUGS:
1. Forgetting await - returns Promise instead of value
2. Not catching errors - unhandled rejection
3. Race conditions - async operations interfering
4. Memory leaks - timers or listeners not cleaned up
5. Callback hell - too many nested callbacks
6. Dead code - code after return/throw
*/

console.log("Async JavaScript mastery achieved! 🚀");
