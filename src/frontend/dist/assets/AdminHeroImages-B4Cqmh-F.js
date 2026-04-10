import { r as reactExports, j as jsxRuntimeExports, S as Skeleton } from "./index-DzRidtFL.js";
import { d as useHeroImages, e as useAddHeroImage, f as useRemoveHeroImage, B as Button } from "./useAdmin-BUScDUrx.js";
import { I as Input } from "./input-DnwcznmG.js";
import { u as ue } from "./index-GTnfYr97.js";
import { A as AdminLayout, I as Image } from "./AdminLayout-DK9m942z.js";
import { P as Plus, T as Trash2 } from "./trash-2-_oW2OiLj.js";
import { c as createLucideIcon } from "./createLucideIcon-CojMkoLo.js";
import "./index-CPwCoacN.js";
import "./useActor-CcxsRM0y.js";
import "./useMutation-DWs1NcrZ.js";
import "./backend-DlF2G3t0.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
function AdminHeroImages() {
  const { data: images, isLoading } = useHeroImages();
  const addImage = useAddHeroImage();
  const removeImage = useRemoveHeroImage();
  const [urlInput, setUrlInput] = reactExports.useState("");
  const [uploading, setUploading] = reactExports.useState(false);
  const fileRef = reactExports.useRef(null);
  const handleAddUrl = async () => {
    const url = urlInput.trim();
    if (!url) return;
    try {
      await addImage.mutateAsync(url);
      setUrlInput("");
      ue.success("Hero image added.");
    } catch {
      ue.error("Failed to add image.");
    }
  };
  const handleFileUpload = async (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const dataUrl = reader.result;
        await addImage.mutateAsync(dataUrl);
        ue.success("Image uploaded and added.");
        setUploading(false);
      };
      reader.onerror = () => {
        ue.error("Failed to read file.");
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch {
      ue.error("Upload failed.");
      setUploading(false);
    }
    if (fileRef.current) fileRef.current.value = "";
  };
  const handleRemove = async (index) => {
    try {
      const result = await removeImage.mutateAsync(BigInt(index));
      if (result.__kind__ === "err") {
        ue.error(result.err);
      } else {
        ue.success("Image removed.");
      }
    } catch {
      ue.error("Failed to remove image.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { title: "Hero Images", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-base", children: "Add Image by URL" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Paste any image URL (e.g. Unsplash) to add it to the hero slideshow." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "url",
            value: urlInput,
            onChange: (e) => setUrlInput(e.target.value),
            placeholder: "https://images.unsplash.com/...",
            className: "flex-1 bg-background border-input",
            "data-ocid": "hero-url-input",
            onKeyDown: (e) => e.key === "Enter" && handleAddUrl()
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: handleAddUrl,
            disabled: addImage.isPending || !urlInput.trim(),
            "data-ocid": "hero-url-add",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-1.5", "aria-hidden": "true" }),
              "Add URL"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-6 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-base", children: "Upload from Device" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Upload an image file directly from your device." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: fileRef,
            type: "file",
            accept: "image/*",
            onChange: handleFileUpload,
            className: "hidden",
            id: "hero-file-upload",
            "aria-label": "Upload hero image file",
            "data-ocid": "hero-file-input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            onClick: () => {
              var _a;
              return (_a = fileRef.current) == null ? void 0 : _a.click();
            },
            disabled: uploading,
            "data-ocid": "hero-file-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4 mr-1.5", "aria-hidden": "true" }),
              uploading ? "Uploading…" : "Choose File"
            ]
          }
        ),
        uploading && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm animate-pulse", children: "Uploading image…" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-base mb-4", children: "Current Hero Images" }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: ["sk-a", "sk-b", "sk-c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 rounded-xl" }, k)) }) : !(images == null ? void 0 : images.length) ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl p-10 text-center",
          "data-ocid": "hero-empty",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Image,
              {
                className: "w-8 h-8 text-muted-foreground mx-auto mb-3",
                "aria-hidden": "true"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No hero images yet. Add one above." })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: images.map((url, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "group relative bg-card border border-border rounded-xl overflow-hidden",
          "data-ocid": `hero-image-${index}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: url,
                alt: `Hero slideshow slide ${index + 1}`,
                className: "w-full h-full object-cover",
                loading: "lazy"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "p-2 rounded-lg bg-card border border-border text-foreground hover:bg-muted transition-smooth",
                  "aria-label": "View image",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4", "aria-hidden": "true" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => handleRemove(index),
                  disabled: removeImage.isPending,
                  className: "p-2 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive hover:bg-destructive/20 transition-smooth",
                  "aria-label": `Remove hero image ${index + 1}`,
                  "data-ocid": `hero-remove-${index}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4", "aria-hidden": "true" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-2 left-2 bg-background/80 text-foreground text-xs px-2 py-0.5 rounded-md", children: [
              "#",
              index + 1
            ] })
          ]
        },
        url
      )) })
    ] })
  ] }) });
}
export {
  AdminHeroImages as default
};
