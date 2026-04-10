import type { backendInterface } from "../backend";
import { ProjectCategory, ServiceType } from "../backend";

const sampleProjects = [
  {
    id: BigInt(0),
    title: "The Luminary Penthouse",
    featured: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?w=1200",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200",
    ],
    description:
      "A 320sqm penthouse transformation in the heart of the city, blending bespoke millwork with curated art to create a residential sanctuary.",
    scope: "Full interior fit-out including custom furniture design, lighting design, material selection, and art curation.",
    outcomes: "The completed penthouse won a regional interior design award and has been featured in two architectural publications.",
    materials: ["Calacatta marble", "Brushed brass fixtures", "White oak joinery"],
    category: ProjectCategory.Interior,
  },
  {
    id: BigInt(1),
    title: "Studio Verde — Commercial Fitout",
    featured: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1200",
    ],
    description:
      "A boutique wellness studio requiring a calming yet professional environment. Natural materials and soft lighting guide every client.",
    scope: "Commercial interior design covering reception, three treatment rooms, retail corner, and staff facilities across 180sqm.",
    outcomes: "Occupancy reached full capacity within six weeks of opening.",
    materials: ["Rattan panels", "Terrazzo flooring", "Linen upholstery"],
    category: ProjectCategory.Interior,
  },
  {
    id: BigInt(2),
    title: "Residenza Bianca — Villa Renovation",
    featured: false,
    imageUrls: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200",
    ],
    description:
      "A complete renovation of a 1970s suburban villa, stripping decades of dated finishes to reveal a contemporary family home.",
    scope: "Full structural and cosmetic renovation including kitchen extension, master suite addition, and façade reclad.",
    outcomes: "Home value increased by an estimated 35% post-renovation.",
    materials: ["Engineered hardwood", "Porcelain large-format tiles", "Colorbond roofing"],
    category: ProjectCategory.Renovation,
  },
  {
    id: BigInt(3),
    title: "The Atelier — Architectural New Build",
    featured: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200",
    ],
    description:
      "Conceived from a blank site, The Atelier is a 480sqm creative workspace for an advertising agency.",
    scope: "Full architectural services from concept through to construction administration.",
    outcomes: "The building received planning approval on first submission.",
    materials: ["Exposed concrete board-form", "Corten steel cladding", "Structural glazing"],
    category: ProjectCategory.Architectural,
  },
  {
    id: BigInt(4),
    title: "Horizon Apartments — Space Planning",
    featured: false,
    imageUrls: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
    ],
    description:
      "A developer brief to maximise livability across 48 apartment units while maintaining generous communal spaces.",
    scope: "Space planning and unit layout optimisation for a 12-storey residential tower.",
    outcomes: "18% reduction in non-productive circulation space.",
    materials: ["Engineered stone benchtops", "Hybrid plank flooring"],
    category: ProjectCategory.SpacePlanning,
  },
  {
    id: BigInt(5),
    title: "Miya Residence — Interior and Landscape",
    featured: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1200",
    ],
    description:
      "A holistic interior and landscape commission for a young family in an inner-suburban semi-detached home.",
    scope: "Full interior design across ground and first floor including custom kitchen and integrated storage.",
    outcomes: "The family reported that the redesigned kitchen and living zone has transformed daily routines.",
    materials: ["Shaker-profile cabinetry", "Wide-board spotted gum floors"],
    category: ProjectCategory.Interior,
  },
];

export const mockBackend: backendInterface = {
  addHeroImage: async (_url: string) => BigInt(3),

  changeAdminCredentials: async (
    _currentPassword: string,
    _newUsername: string,
    _newPassword: string
  ) => ({ __kind__: "ok" as const, ok: null }),

  createProject: async (_data) => BigInt(6),

  deleteProject: async (_id: bigint) => ({ __kind__: "ok" as const, ok: null }),

  getFeaturedProjects: async () =>
    sampleProjects.filter((p) => p.featured),

  getHeroImages: async () => [
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c349d83?w=1920",
    "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1920",
  ],

  getInquiry: async (_id: bigint) => null,

  getProject: async (id: bigint) =>
    sampleProjects.find((p) => p.id === id) ?? null,

  listInquiries: async () => [
    {
      id: BigInt(0),
      name: "Aisha Karimi",
      email: "aisha@example.com",
      phone: "+61 400 123 456",
      projectDescription: "Looking to renovate our family home kitchen and living space.",
      serviceType: ServiceType.Renovation,
      timestamp: BigInt(Date.now()),
    },
  ],

  listProjects: async (category) =>
    category === null
      ? sampleProjects
      : sampleProjects.filter((p) => p.category === category),

  removeHeroImage: async (_index: bigint) => ({ __kind__: "ok" as const, ok: null }),

  reorderHeroImages: async (_newOrder: string[]) => undefined,

  setProjectFeatured: async (_id: bigint, _featured: boolean) => ({
    __kind__: "ok" as const,
    ok: null,
  }),

  submitInquiry: async (name, email, phone, projectDescription, serviceType) => ({
    id: BigInt(1),
    name,
    email,
    phone,
    projectDescription,
    serviceType,
    timestamp: BigInt(Date.now()),
  }),

  getStats: async () => [
    { title: "Projects Completed", value: "120+" },
    { title: "Years of Practice", value: "12" },
    { title: "Client Satisfaction", value: "98%" },
    { title: "Design Awards", value: "4" },
  ],

  updateStats: async (_stats) => undefined,

  updateProject: async (_id: bigint, _data) => ({ __kind__: "ok" as const, ok: null }),

  validateAdminCredentials: async (_username: string, _password: string) => true,
};
