import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Plus, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { ProjectInput } from "../../backend.d";
import { AdminLayout } from "../../components/AdminLayout";
import {
  useAdminProjects,
  useCreateProject,
  useDeleteProject,
  useToggleFeatured,
  useUpdateProject,
} from "../../hooks/useAdmin";
import type { Project } from "../../types";
import { ProjectCategory } from "../../types";

const EMPTY_FORM: ProjectInput = {
  title: "",
  category: ProjectCategory.Interior,
  description: "",
  imageUrls: [],
  scope: "",
  materials: [],
  outcomes: "",
  featured: false,
};

const CATEGORY_OPTIONS: ProjectCategory[] = [
  ProjectCategory.Interior,
  ProjectCategory.Architectural,
  ProjectCategory.SpacePlanning,
  ProjectCategory.Renovation,
];

function ProjectFormDialog({
  open,
  onClose,
  project,
}: {
  open: boolean;
  onClose: () => void;
  project: Project | null;
}) {
  const [form, setForm] = useState<ProjectInput>(
    project
      ? {
          title: project.title,
          category: project.category,
          description: project.description,
          imageUrls: project.imageUrls,
          scope: project.scope,
          materials: project.materials,
          outcomes: project.outcomes,
          featured: project.featured,
        }
      : EMPTY_FORM,
  );
  const [imageUrlInput, setImageUrlInput] = useState("");
  const create = useCreateProject();
  const update = useUpdateProject();

  const set = (
    key: keyof ProjectInput,
    value: ProjectInput[keyof ProjectInput],
  ) => setForm((f) => ({ ...f, [key]: value }));

  const addImageUrl = () => {
    const url = imageUrlInput.trim();
    if (!url) return;
    set("imageUrls", [...form.imageUrls, url]);
    setImageUrlInput("");
  };

  const removeImageUrl = (i: number) =>
    set(
      "imageUrls",
      form.imageUrls.filter((_, idx) => idx !== i),
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (project) {
        const result = await update.mutateAsync({ id: project.id, data: form });
        if (result.__kind__ === "err") {
          toast.error(result.err);
          return;
        }
        toast.success("Project updated.");
      } else {
        await create.mutateAsync(form);
        toast.success("Project created.");
      }
      onClose();
    } catch {
      toast.error("Failed to save project.");
    }
  };

  const isPending = create.isPending || update.isPending;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="bg-card border-border max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display">
            {project ? "Edit Project" : "New Project"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="proj-title">Title</Label>
            <Input
              id="proj-title"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              required
              className="bg-background border-input"
              data-ocid="project-title-input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="proj-category">Category</Label>
            <Select
              value={form.category}
              onValueChange={(v) => set("category", v as ProjectCategory)}
            >
              <SelectTrigger
                id="proj-category"
                className="bg-background border-input"
                data-ocid="project-category-select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {CATEGORY_OPTIONS.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="proj-desc">Description</Label>
            <Textarea
              id="proj-desc"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              required
              rows={3}
              className="bg-background border-input resize-none"
              data-ocid="project-desc-input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="proj-scope">Scope</Label>
            <Input
              id="proj-scope"
              value={form.scope}
              onChange={(e) => set("scope", e.target.value)}
              className="bg-background border-input"
              data-ocid="project-scope-input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="proj-outcomes">Outcomes</Label>
            <Input
              id="proj-outcomes"
              value={form.outcomes}
              onChange={(e) => set("outcomes", e.target.value)}
              className="bg-background border-input"
              data-ocid="project-outcomes-input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="proj-materials">Materials (comma-separated)</Label>
            <Input
              id="proj-materials"
              value={form.materials.join(", ")}
              onChange={(e) =>
                set(
                  "materials",
                  e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                )
              }
              className="bg-background border-input"
              data-ocid="project-materials-input"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Image URLs</Label>
            <div className="flex gap-2">
              <Input
                type="url"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                placeholder="https://..."
                className="flex-1 bg-background border-input"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addImageUrl();
                  }
                }}
                data-ocid="project-image-url-input"
              />
              <Button type="button" variant="outline" onClick={addImageUrl}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {form.imageUrls.length > 0 && (
              <ul className="space-y-1 mt-1">
                {form.imageUrls.map((url, i) => (
                  <li
                    key={url}
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    <span className="flex-1 truncate">{url}</span>
                    <button
                      type="button"
                      onClick={() => removeImageUrl(i)}
                      className="text-destructive hover:text-destructive/80"
                      aria-label="Remove image URL"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Switch
              id="proj-featured"
              checked={form.featured}
              onCheckedChange={(v) => set("featured", v)}
              data-ocid="project-featured-toggle"
            />
            <Label htmlFor="proj-featured">Featured project</Label>
          </div>
          <div className="flex gap-2 pt-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              data-ocid="project-save-btn"
            >
              {isPending ? "Saving…" : "Save Project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminProjects() {
  const { data: projects, isLoading } = useAdminProjects();
  const deleteProject = useDeleteProject();
  const toggleFeatured = useToggleFeatured();
  const [dialogProject, setDialogProject] = useState<
    Project | null | undefined
  >(undefined);

  const handleDelete = async (id: bigint, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;
    try {
      const result = await deleteProject.mutateAsync(id);
      if (result.__kind__ === "err") {
        toast.error(result.err);
        return;
      }
      toast.success("Project deleted.");
    } catch {
      toast.error("Failed to delete project.");
    }
  };

  const handleToggle = async (project: Project) => {
    try {
      const result = await toggleFeatured.mutateAsync({
        id: project.id,
        featured: !project.featured,
      });
      if (result.__kind__ === "err") {
        toast.error(result.err);
        return;
      }
      toast.success(
        project.featured ? "Removed from featured." : "Marked as featured.",
      );
    } catch {
      toast.error("Failed to update featured status.");
    }
  };

  return (
    <AdminLayout title="Projects">
      <div className="max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-sm">
            {projects?.length ?? 0} project{projects?.length !== 1 ? "s" : ""}
          </p>
          <Button
            onClick={() => setDialogProject(null)}
            data-ocid="project-add-btn"
          >
            <Plus className="w-4 h-4 mr-1.5" aria-hidden="true" />
            Add Project
          </Button>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {isLoading ? (
            <div className="p-4 space-y-3">
              {["sk-a", "sk-b", "sk-c", "sk-d"].map((k) => (
                <Skeleton key={k} className="h-14 w-full" />
              ))}
            </div>
          ) : !projects?.length ? (
            <div className="p-10 text-center" data-ocid="projects-empty">
              <p className="text-muted-foreground text-sm">No projects yet.</p>
              <Button className="mt-4" onClick={() => setDialogProject(null)}>
                Add your first project
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left px-4 py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">
                      Title
                    </th>
                    <th className="text-left px-4 py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider hidden sm:table-cell">
                      Category
                    </th>
                    <th className="text-center px-4 py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">
                      Featured
                    </th>
                    <th className="text-right px-4 py-3 text-muted-foreground font-medium text-xs uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr
                      key={project.id.toString()}
                      className="border-b border-border last:border-0 hover:bg-muted/20 transition-smooth"
                      data-ocid={`project-row-${project.id}`}
                    >
                      <td className="px-4 py-3 text-foreground font-medium truncate max-w-[200px]">
                        {project.title}
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <Badge variant="secondary" className="text-xs">
                          {project.category}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggle(project)}
                          aria-label={
                            project.featured
                              ? "Remove from featured"
                              : "Mark as featured"
                          }
                          className={`transition-smooth ${project.featured ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
                          data-ocid={`project-featured-${project.id}`}
                        >
                          <Star
                            className="w-4 h-4"
                            fill={project.featured ? "currentColor" : "none"}
                            aria-hidden="true"
                          />
                        </button>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDialogProject(project)}
                            aria-label={`Edit ${project.title}`}
                            data-ocid={`project-edit-${project.id}`}
                          >
                            <Pencil
                              className="w-3.5 h-3.5"
                              aria-hidden="true"
                            />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              handleDelete(project.id, project.title)
                            }
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            aria-label={`Delete ${project.title}`}
                            data-ocid={`project-delete-${project.id}`}
                          >
                            <Trash2
                              className="w-3.5 h-3.5"
                              aria-hidden="true"
                            />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {dialogProject !== undefined && (
        <ProjectFormDialog
          open
          project={dialogProject}
          onClose={() => setDialogProject(undefined)}
        />
      )}
    </AdminLayout>
  );
}
