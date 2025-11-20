import React, { JSX, useState } from "react";

type LoginResponse = {
  token?: string;
  user?: { id: string; fullName?: string; email?: string };
  message?: string;
};

export default function Login(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    if (!email || !password) {
      setError("Please provide email and password.");
      return false;
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data: LoginResponse = await res
        .json()
        .catch(() => ({} as LoginResponse));

      if (!res.ok) {
        setError(data?.message || `Login failed (${res.status})`);
        setLoading(false);
        return;
      }

      if (data.token) {
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem("injaz_token", data.token);
        storage.setItem("injaz_user", JSON.stringify(data.user ?? {}));
        window.location.href = "/dashboard";
      } else {
        setError("Login succeeded but no token returned by server.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-page px-4">
      <div className="max-w-md w-full card">
        <h1 className="text-2xl font-bold text-brand mb-2">Sign in to Injaz</h1>
        <p className="text-sm muted mb-6">
          Enter your school account to access lessons and exercises.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-field"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <div className="input-with-button mt-1 relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-field"
                placeholder="••••••••"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="input-button"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 text-accent rounded border-gray-300"
              />
              <span className="text-sm muted">Remember me</span>
            </label>
            <a href="#" className="text-sm text-accent hover:underline">
              Forgot password?
            </a>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn-accent w-full"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <div className="text-center text-sm muted">
            Don't have an account?{" "}
            <a href="/signup" className="text-accent hover:underline">
              Request access
            </a>
          </div>
        </form>

        <div role="status" aria-live="polite" className="mt-4">
          {error && <p className="alert alert-error">{error}</p>}
        </div>
      </div>
    </div>
  );
}
