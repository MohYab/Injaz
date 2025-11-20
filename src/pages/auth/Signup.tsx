import React, { JSX, useState } from "react";
import { useNavigate } from "react-router-dom";

type SignupResponse = {
  user?: { id: string; fullName?: string; email?: string };
  message?: string;
  token?: string;
};

export default function Signup(): JSX.Element {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const validate = (): boolean => {
    setError(null);
    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return false;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    if (password !== confirmPwd) {
      setError("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data: SignupResponse = await res
        .json()
        .catch(() => ({} as SignupResponse));

      if (!res.ok) {
        setError(data?.message || `Signup failed (${res.status})`);
        setLoading(false);
        return;
      }

      if (data?.token) {
        sessionStorage.setItem("injaz_token", data.token);
        if (data.user)
          sessionStorage.setItem("injaz_user", JSON.stringify(data.user));
        navigate("/dashboard", { replace: true });
        return;
      }

      setSuccess(data?.message || "Account created. Redirecting to login...");
      setTimeout(() => navigate("/login"), 1200);
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
        <h1 className="text-2xl font-bold text-brand mb-2">
          Create your account
        </h1>
        <p className="text-sm muted mb-6">
          Sign up to access Injaz lessons and exercises. Already have an
          account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-accent hover:underline inline"
          >
            Sign in
          </button>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-slate-700"
            >
              Full name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="form-field"
              placeholder="Your name"
              required
            />
          </div>

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
                placeholder="At least 6 characters"
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

          <div>
            <label
              htmlFor="confirmPwd"
              className="block text-sm font-medium text-slate-700"
            >
              Confirm password
            </label>
            <input
              id="confirmPwd"
              type={showPassword ? "text" : "password"}
              value={confirmPwd}
              onChange={(e) => setConfirmPwd(e.target.value)}
              className="form-field"
              placeholder="Repeat your password"
              required
              minLength={6}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </div>

          <div className="text-center text-sm muted">
            By signing up you agree to our{" "}
            <a className="text-accent hover:underline" href="#">
              terms
            </a>
            .
          </div>
        </form>

        <div role="status" aria-live="polite" className="mt-4">
          {error && <p className="alert alert-error">{error}</p>}
          {success && <p className="alert alert-success">{success}</p>}
        </div>
      </div>
    </div>
  );
}
