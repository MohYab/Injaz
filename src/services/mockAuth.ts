// Password hashing utilities using Web Crypto API
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
}

// Token generation
export function generateToken(): string {
  return crypto.randomUUID() + "-" + Date.now().toString(36);
}

// In-memory token storage (for mock validation)
const tokenStore = new Map<string, { userId: string; expiresAt: number }>();
const TOKEN_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export function storeToken(token: string, userId: string): void {
  tokenStore.set(token, {
    userId,
    expiresAt: Date.now() + TOKEN_EXPIRY_MS,
  });
}

export function validateToken(token: string): string | null {
  const tokenData = tokenStore.get(token);
  if (!tokenData) return null;
  if (Date.now() > tokenData.expiresAt) {
    tokenStore.delete(token);
    return null;
  }
  return tokenData.userId;
}

// User data type
export interface User {
  id: string;
  email: string;
  fullName: string;
  passwordHash: string;
}

// Read users from JSON file
export async function readUsers(): Promise<User[]> {
  try {
    const response = await fetch("/data/users.json");
    if (!response.ok) {
      console.error("Failed to read users.json");
      return [];
    }
    return await response.json();
  } catch (error) {
    console.error("Error reading users.json:", error);
    return [];
  }
}

// Write users to JSON file (for signup)
// Note: In a real app, this would be a server-side operation
// For mock, we'll use localStorage as a workaround since we can't write to public files
const USERS_STORAGE_KEY = "injaz_mock_users";

export async function writeUsers(users: User[]): Promise<void> {
  try {
    // Store in localStorage as fallback
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    
    // Also try to update the in-memory cache
    // Note: This won't persist across page reloads for the JSON file itself
    // but localStorage will persist
  } catch (error) {
    console.error("Error writing users:", error);
    throw error;
  }
}

// Get users (check localStorage first, then fetch from JSON)
export async function getUsers(): Promise<User[]> {
  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // If no localStorage, fetch from JSON and cache it
    const users = await readUsers();
    if (users.length > 0) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    }
    return users;
  } catch (error) {
    console.error("Error getting users:", error);
    return [];
  }
}

// Login function
export async function login(
  email: string,
  password: string
): Promise<{ token: string; user: Omit<User, "passwordHash"> } | null> {
  const users = await getUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    return null;
  }

  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) {
    return null;
  }

  const token = generateToken();
  storeToken(token, user.id);

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    },
  };
}

// Signup function
export async function signup(
  fullName: string,
  email: string,
  password: string
): Promise<{ token: string; user: Omit<User, "passwordHash"> } | null> {
  const users = await getUsers();

  // Check if email already exists
  const existingUser = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (existingUser) {
    throw new Error("Email already registered");
  }

  // Create new user
  const passwordHash = await hashPassword(password);
  const newUser: User = {
    id: crypto.randomUUID(),
    email: email.toLowerCase(),
    fullName,
    passwordHash,
  };

  // Add to users array
  const updatedUsers = [...users, newUser];
  await writeUsers(updatedUsers);

  // Generate token
  const token = generateToken();
  storeToken(token, newUser.id);

  return {
    token,
    user: {
      id: newUser.id,
      email: newUser.email,
      fullName: newUser.fullName,
    },
  };
}

