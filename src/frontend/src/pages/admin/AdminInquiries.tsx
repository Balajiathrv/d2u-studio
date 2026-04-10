import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown, ChevronUp, Inbox } from "lucide-react";
import { useState } from "react";
import { AdminLayout } from "../../components/AdminLayout";
import { useAdminInquiries } from "../../hooks/useAdmin";
import type { Inquiry } from "../../types";
import { SERVICE_LABELS } from "../../types";

function formatDate(ts: bigint) {
  const ms = Number(ts / 1_000_000n);
  if (Number.isNaN(ms) || ms === 0) return "—";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(ms));
}

function InquiryRow({ inquiry }: { inquiry: Inquiry }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <tr
        className="border-b border-border hover:bg-muted/20 transition-smooth"
        data-ocid={`inquiry-row-${inquiry.id}`}
      >
        <td className="px-4 py-3 text-foreground font-medium truncate max-w-[140px]">
          {inquiry.name}
        </td>
        <td className="px-4 py-3 text-muted-foreground truncate max-w-[180px] hidden sm:table-cell">
          {inquiry.email}
        </td>
        <td className="px-4 py-3 hidden md:table-cell">
          <Badge variant="secondary" className="text-xs">
            {SERVICE_LABELS[inquiry.serviceType]}
          </Badge>
        </td>
        <td className="px-4 py-3 text-muted-foreground text-xs hidden lg:table-cell">
          {formatDate(inquiry.timestamp)}
        </td>
        <td className="px-4 py-3 text-right">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-label={expanded ? "Collapse details" : "Expand details"}
            aria-expanded={expanded}
            className="text-muted-foreground hover:text-foreground transition-smooth"
          >
            {expanded ? (
              <ChevronUp className="w-4 h-4" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        </td>
      </tr>
      {expanded && (
        <tr className="border-b border-border bg-muted/10">
          <td colSpan={5} className="px-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wider font-medium mb-1">
                  Contact
                </p>
                <p className="text-foreground">{inquiry.name}</p>
                <p className="text-muted-foreground">{inquiry.email}</p>
                {inquiry.phone && (
                  <p className="text-muted-foreground">{inquiry.phone}</p>
                )}
              </div>
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wider font-medium mb-1">
                  Service
                </p>
                <p className="text-foreground">
                  {SERVICE_LABELS[inquiry.serviceType]}
                </p>
                <p className="text-muted-foreground text-xs mt-1">
                  {formatDate(inquiry.timestamp)}
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-muted-foreground text-xs uppercase tracking-wider font-medium mb-1">
                  Project Description
                </p>
                <p className="text-foreground leading-relaxed">
                  {inquiry.projectDescription}
                </p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default function AdminInquiries() {
  const { data: inquiries, isLoading } = useAdminInquiries();

  return (
    <AdminLayout title="Inquiries">
      <div className="max-w-5xl space-y-4">
        <p className="text-muted-foreground text-sm">
          {inquiries?.length ?? 0} inquiry
          {inquiries?.length !== 1 ? "ies" : "y"} received
        </p>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {isLoading ? (
            <div className="p-4 space-y-3">
              {["sk-a", "sk-b", "sk-c", "sk-d", "sk-e"].map((k) => (
                <Skeleton key={k} className="h-12 w-full" />
              ))}
            </div>
          ) : !inquiries?.length ? (
            <div className="p-12 text-center" data-ocid="inquiries-empty">
              <Inbox
                className="w-8 h-8 text-muted-foreground mx-auto mb-3"
                aria-hidden="true"
              />
              <p className="text-muted-foreground text-sm">No inquiries yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left px-4 py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">
                      Name
                    </th>
                    <th className="text-left px-4 py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider hidden sm:table-cell">
                      Email
                    </th>
                    <th className="text-left px-4 py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider hidden md:table-cell">
                      Service
                    </th>
                    <th className="text-left px-4 py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider hidden lg:table-cell">
                      Date
                    </th>
                    <th className="w-8" />
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inq) => (
                    <InquiryRow key={inq.id.toString()} inquiry={inq} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
