import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAdminSession, useValidateAdmin } from "../../hooks/useAdmin";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const validate = useValidateAdmin();
  const { setAuthenticated } = useAdminSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const ok = await validate.mutateAsync({ username, password });
      if (ok) {
        setAuthenticated();
        window.location.href = "/admin";
      } else {
        setError("Invalid username or password.");
      }
    } catch {
      setError("Authentication failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo / brand */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <svg
              className="w-7 h-7 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
              role="img"
            >
              <title>House icon</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"
              />
            </svg>
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground tracking-tight">
            d2u studio
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Admin Portal</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-xl p-8 shadow-editorial space-y-5"
          data-ocid="admin-login-form"
        >
          <div className="space-y-2">
            <Label
              htmlFor="username"
              className="text-foreground text-sm font-medium"
            >
              Username
            </Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              autoComplete="username"
              required
              data-ocid="admin-username-input"
              className="bg-background border-input"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-foreground text-sm font-medium"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoComplete="current-password"
              required
              data-ocid="admin-password-input"
              className="bg-background border-input"
            />
          </div>

          {error && (
            <p
              className="text-destructive text-sm bg-destructive/10 border border-destructive/20 rounded-md px-3 py-2"
              role="alert"
              data-ocid="admin-login-error"
            >
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={validate.isPending}
            data-ocid="admin-login-submit"
          >
            {validate.isPending ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <p className="text-center text-muted-foreground text-xs mt-6">
          d2u studio © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
