import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, ImageIcon, Plus, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { AdminLayout } from "../../components/AdminLayout";
import {
  useAddHeroImage,
  useHeroImages,
  useRemoveHeroImage,
} from "../../hooks/useAdmin";

export default function AdminHeroImages() {
  const { data: images, isLoading } = useHeroImages();
  const addImage = useAddHeroImage();
  const removeImage = useRemoveHeroImage();
  const [urlInput, setUrlInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleAddUrl = async () => {
    const url = urlInput.trim();
    if (!url) return;
    try {
      await addImage.mutateAsync(url);
      setUrlInput("");
      toast.success("Hero image added.");
    } catch {
      toast.error("Failed to add image.");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      // Convert file to a data URL as a simple object-storage stand-in
      const reader = new FileReader();
      reader.onload = async () => {
        const dataUrl = reader.result as string;
        await addImage.mutateAsync(dataUrl);
        toast.success("Image uploaded and added.");
        setUploading(false);
      };
      reader.onerror = () => {
        toast.error("Failed to read file.");
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch {
      toast.error("Upload failed.");
      setUploading(false);
    }
    // Reset file input
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleRemove = async (index: number) => {
    try {
      const result = await removeImage.mutateAsync(BigInt(index));
      if (result.__kind__ === "err") {
        toast.error(result.err);
      } else {
        toast.success("Image removed.");
      }
    } catch {
      toast.error("Failed to remove image.");
    }
  };

  return (
    <AdminLayout title="Hero Images">
      <div className="max-w-3xl space-y-8">
        {/* Add via URL */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h2 className="font-display font-semibold text-foreground text-base">
            Add Image by URL
          </h2>
          <p className="text-muted-foreground text-sm">
            Paste any image URL (e.g. Unsplash) to add it to the hero slideshow.
          </p>
          <div className="flex gap-2">
            <Input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="flex-1 bg-background border-input"
              data-ocid="hero-url-input"
              onKeyDown={(e) => e.key === "Enter" && handleAddUrl()}
            />
            <Button
              onClick={handleAddUrl}
              disabled={addImage.isPending || !urlInput.trim()}
              data-ocid="hero-url-add"
            >
              <Plus className="w-4 h-4 mr-1.5" aria-hidden="true" />
              Add URL
            </Button>
          </div>
        </div>

        {/* Upload file */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h2 className="font-display font-semibold text-foreground text-base">
            Upload from Device
          </h2>
          <p className="text-muted-foreground text-sm">
            Upload an image file directly from your device.
          </p>
          <div className="flex items-center gap-3">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="hero-file-upload"
              aria-label="Upload hero image file"
              data-ocid="hero-file-input"
            />
            <Button
              variant="outline"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              data-ocid="hero-file-btn"
            >
              <Upload className="w-4 h-4 mr-1.5" aria-hidden="true" />
              {uploading ? "Uploading…" : "Choose File"}
            </Button>
            {uploading && (
              <span className="text-muted-foreground text-sm animate-pulse">
                Uploading image…
              </span>
            )}
          </div>
        </div>

        {/* Current images */}
        <div>
          <h2 className="font-display font-semibold text-foreground text-base mb-4">
            Current Hero Images
          </h2>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["sk-a", "sk-b", "sk-c"].map((k) => (
                <Skeleton key={k} className="h-40 rounded-xl" />
              ))}
            </div>
          ) : !images?.length ? (
            <div
              className="bg-card border border-border rounded-xl p-10 text-center"
              data-ocid="hero-empty"
            >
              <ImageIcon
                className="w-8 h-8 text-muted-foreground mx-auto mb-3"
                aria-hidden="true"
              />
              <p className="text-muted-foreground text-sm">
                No hero images yet. Add one above.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {images.map((url, index) => (
                <div
                  key={url}
                  className="group relative bg-card border border-border rounded-xl overflow-hidden"
                  data-ocid={`hero-image-${index}`}
                >
                  <div className="aspect-video bg-muted">
                    <img
                      src={url}
                      alt={`Hero slideshow slide ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center gap-2">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-card border border-border text-foreground hover:bg-muted transition-smooth"
                      aria-label="View image"
                    >
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    </a>
                    <button
                      type="button"
                      onClick={() => handleRemove(index)}
                      disabled={removeImage.isPending}
                      className="p-2 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive hover:bg-destructive/20 transition-smooth"
                      aria-label={`Remove hero image ${index + 1}`}
                      data-ocid={`hero-remove-${index}`}
                    >
                      <Trash2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-background/80 text-foreground text-xs px-2 py-0.5 rounded-md">
                    #{index + 1}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
