// Setup fetch interception for mock authentication
import * as mockAuth from "./mockAuth";

// Store original fetch
const originalFetch = window.fetch;

// Override fetch to intercept /api/auth/* calls
window.fetch = async (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> => {
  let urlPath: string;
  if (typeof input === "string") {
    try {
      const urlObj = new URL(input, window.location.origin);
      urlPath = urlObj.pathname;
    } catch {
      // If it's a relative path, use it directly
      urlPath = input;
    }
  } else if (input instanceof URL) {
    urlPath = input.pathname;
  } else {
    try {
      const urlObj = new URL(input.url, window.location.origin);
      urlPath = urlObj.pathname;
    } catch {
      urlPath = input.url;
    }
  }
  
  // Only intercept /api/auth/* calls
  if (urlPath.startsWith("/api/auth/")) {
    try {
      const method = init?.method || "GET";
      const body = init?.body ? JSON.parse(init.body as string) : {};

      if (url === "/api/auth/login" && method === "POST") {
        const { email, password } = body;
        
        if (!email || !password) {
          return new Response(
            JSON.stringify({ message: "Email and password are required" }),
            {
              status: 400,
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        const result = await mockAuth.login(email, password);
        
        if (result) {
          return new Response(
            JSON.stringify({
              token: result.token,
              user: result.user,
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            }
          );
        } else {
          return new Response(
            JSON.stringify({ message: "Invalid email or password" }),
            {
              status: 401,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      } else if (url === "/api/auth/signup" && method === "POST") {
        const { fullName, email, password } = body;
        
        if (!fullName || !email || !password) {
          return new Response(
            JSON.stringify({ message: "All fields are required" }),
            {
              status: 400,
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        try {
          const result = await mockAuth.signup(fullName, email, password);
          
          if (result) {
            return new Response(
              JSON.stringify({
                token: result.token,
                user: result.user,
              }),
              {
                status: 200,
                headers: { "Content-Type": "application/json" },
              }
            );
          } else {
            return new Response(
              JSON.stringify({ message: "Signup failed" }),
              {
                status: 500,
                headers: { "Content-Type": "application/json" },
              }
            );
          }
        } catch (error) {
          return new Response(
            JSON.stringify({
              message: error instanceof Error ? error.message : "Signup failed",
            }),
            {
              status: 400,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      }
    } catch (error) {
      return new Response(
        JSON.stringify({
          message: error instanceof Error ? error.message : "Request failed",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }

  // For all other requests, use original fetch
  return originalFetch(input, init);
};

