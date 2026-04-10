import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { AdminLayout } from "../../components/AdminLayout";
import { type Stat, getStats, saveStats } from "../../hooks/useStats";

export default function AdminStats() {
  const [stats, setStats] = useState<Stat[]>(getStats);
  const [saving, setSaving] = useState(false);

  const updateStat = (
    index: number,
    field: keyof Stat,
    value: string | number,
  ) => {
    setStats((prev) =>
      prev.map((s, i) =>
        i === index
          ? {
              ...s,
              [field]: field === "value" ? Number(value) : value,
            }
          : s,
      ),
    );
  };

  const handleSave = () => {
    setSaving(true);
    saveStats(stats);
    setTimeout(() => {
      setSaving(false);
      toast.success("Stats updated successfully");
    }, 400);
  };

  return (
    <AdminLayout title="Homepage Stats">
      <div className="max-w-2xl space-y-8">
        <p className="text-muted-foreground text-sm">
          Edit the four statistics shown on the homepage. Changes take effect
          immediately on save.
        </p>

        <div className="space-y-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-xl p-6 space-y-4"
              data-ocid={`stat-editor-${i}`}
            >
              <h3 className="font-display font-semibold text-foreground text-base">
                Stat {i + 1}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`stat-value-${i}`}>Number Value</Label>
                  <Input
                    id={`stat-value-${i}`}
                    type="number"
                    value={stat.value}
                    onChange={(e) => updateStat(i, "value", e.target.value)}
                    data-ocid={`stat-value-input-${i}`}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`stat-suffix-${i}`}>
                    Suffix{" "}
                    <span className="text-muted-foreground">(+, %, etc.)</span>
                  </Label>
                  <Input
                    id={`stat-suffix-${i}`}
                    value={stat.suffix}
                    onChange={(e) => updateStat(i, "suffix", e.target.value)}
                    placeholder="e.g. + or %"
                    maxLength={5}
                    data-ocid={`stat-suffix-input-${i}`}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`stat-label-${i}`}>Label</Label>
                  <Input
                    id={`stat-label-${i}`}
                    value={stat.label}
                    onChange={(e) => updateStat(i, "label", e.target.value)}
                    placeholder="e.g. Projects Completed"
                    data-ocid={`stat-label-input-${i}`}
                  />
                </div>
              </div>

              {/* Preview */}
              <div className="mt-2 pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                  Preview
                </p>
                <p
                  style={{
                    fontFamily:
                      "var(--font-display), 'Palatino Linotype', Georgia, serif",
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: "2.5rem",
                    color: "#c9a84c",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                  {stat.suffix}
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={handleSave}
          disabled={saving}
          data-ocid="save-stats-btn"
          className="w-full sm:w-auto"
        >
          {saving ? "Saving…" : "Save Stats"}
        </Button>
      </div>
    </AdminLayout>
  );
}
