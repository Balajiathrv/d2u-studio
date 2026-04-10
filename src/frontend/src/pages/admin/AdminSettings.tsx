import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AdminLayout } from "../../components/AdminLayout";
import { useChangeAdminCredentials } from "../../hooks/useAdmin";

export default function AdminSettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const changeCredentials = useChangeAdminCredentials();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }
    if (!newUsername.trim()) {
      setError("Username cannot be empty.");
      return;
    }

    try {
      const result = await changeCredentials.mutateAsync({
        currentPassword,
        newUsername: newUsername.trim(),
        newPassword,
      });
      if (result.__kind__ === "err") {
        setError(result.err);
        return;
      }
      toast.success("Credentials updated successfully. Please log in again.");
      setCurrentPassword("");
      setNewUsername("");
      setNewPassword("");
      setConfirmPassword("");
      // Force re-login
      setTimeout(() => {
        localStorage.removeItem("adminSession");
        window.location.href = "/admin/login";
      }, 1500);
    } catch {
      setError("Failed to update credentials. Please try again.");
    }
  };

  return (
    <AdminLayout title="Settings">
      <div className="max-w-md space-y-8">
        <div className="bg-card border border-border rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <ShieldCheck
                className="w-5 h-5 text-primary"
                aria-hidden="true"
              />
            </div>
            <div>
              <h2 className="font-display font-semibold text-foreground text-base">
                Change Credentials
              </h2>
              <p className="text-muted-foreground text-xs mt-0.5">
                Update your admin username and password
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            data-ocid="settings-credentials-form"
          >
            <div className="space-y-1.5">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Your current password"
                required
                autoComplete="current-password"
                className="bg-background border-input"
                data-ocid="settings-current-password"
              />
            </div>

            <hr className="border-border" />

            <div className="space-y-1.5">
              <Label htmlFor="new-username">New Username</Label>
              <Input
                id="new-username"
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="New admin username"
                required
                autoComplete="username"
                className="bg-background border-input"
                data-ocid="settings-new-username"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 8 characters"
                required
                minLength={8}
                autoComplete="new-password"
                className="bg-background border-input"
                data-ocid="settings-new-password"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
                required
                autoComplete="new-password"
                className="bg-background border-input"
                data-ocid="settings-confirm-password"
              />
            </div>

            {error && (
              <p
                className="text-destructive text-sm bg-destructive/10 border border-destructive/20 rounded-md px-3 py-2"
                role="alert"
                data-ocid="settings-error"
              >
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={changeCredentials.isPending}
              data-ocid="settings-save-btn"
            >
              {changeCredentials.isPending ? "Saving…" : "Update Credentials"}
            </Button>
          </form>
        </div>

        <div className="bg-muted/30 border border-border rounded-xl p-4 text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-1 text-xs uppercase tracking-wider">
            Security note
          </p>
          <p>
            After updating credentials, you will be automatically logged out and
            required to sign in again with the new credentials.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
