import List "mo:core/List";
import Types "../types/projects";
import Common "../types/common";

module {
  public func listAll(projects : List.List<Types.Project>) : [Types.Project] {
    projects.toArray();
  };

  public func listByCategory(projects : List.List<Types.Project>, category : Types.ProjectCategory) : [Types.Project] {
    projects.filter(func(p) { p.category == category }).toArray();
  };

  public func listFeatured(projects : List.List<Types.Project>) : [Types.Project] {
    projects.filter(func(p) { p.featured }).toArray();
  };

  public func getById(projects : List.List<Types.Project>, id : Common.ProjectId) : ?Types.Project {
    projects.find(func(p) { p.id == id });
  };

  public func seedSampleData(projects : List.List<Types.Project>, nextId : Nat) : Nat {
    if (projects.size() > 0) { return nextId };

    let samples : [(Text, Types.ProjectCategory, Text, [Text], Text, [Text], Text, Bool)] = [
      (
        "The Luminary Penthouse",
        #Interior,
        "A 320sqm penthouse transformation in the heart of the city, blending bespoke millwork with curated art to create a residential sanctuary that lives as beautifully as it looks.",
        ["https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?w=1200", "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200", "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200"],
        "Full interior fit-out including custom furniture design, lighting design, material selection, and art curation across living, dining, kitchen, and four bedrooms.",
        ["Calacatta marble", "Brushed brass fixtures", "White oak joinery", "Handwoven wool textiles", "Venetian plaster"],
        "The completed penthouse won a regional interior design award and has been featured in two architectural publications. The client reported a 40% improvement in daily comfort and wellbeing.",
        true,
      ),
      (
        "Studio Verde — Commercial Fitout",
        #Interior,
        "A boutique wellness studio requiring a calming yet professional environment. d2u studio crafted a space where natural materials and soft lighting guide every client through their wellness journey.",
        ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200", "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1200"],
        "Commercial interior design covering reception, three treatment rooms, retail corner, and staff facilities across 180sqm.",
        ["Rattan panels", "Terrazzo flooring", "Linen upholstery", "Recycled timber shelving", "Sage-toned limewash"],
        "Occupancy reached full capacity within six weeks of opening. Client reported a 25% increase in retail sales attributed to the inviting display environment.",
        true,
      ),
      (
        "Residenza Bianca — Villa Renovation",
        #Renovation,
        "A complete renovation of a 1970s suburban villa, stripping decades of dated finishes to reveal a contemporary family home built for a new generation of living.",
        ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200", "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200", "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200"],
        "Full structural and cosmetic renovation including kitchen extension, master suite addition, façade reclad, and landscaping coordination.",
        ["Engineered hardwood", "Porcelain large-format tiles", "Colorbond roofing", "Aluminium-framed glazing", "Honed concrete benchtops"],
        "Home value increased by an estimated 35% post-renovation. Project completed two weeks ahead of schedule, enabling the family to move in before the school term.",
        false,
      ),
      (
        "The Atelier — Architectural New Build",
        #Architectural,
        "Conceived from a blank site, The Atelier is a 480sqm creative workspace for an advertising agency. The brief demanded a building that communicates innovation before a visitor even steps inside.",
        ["https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200", "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200", "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200"],
        "Full architectural services from concept through to construction administration, including structural coordination, council approvals, and interior shell design.",
        ["Exposed concrete board-form", "Corten steel cladding", "Structural glazing", "Polished concrete floors", "Recycled brick feature walls"],
        "The building received planning approval on first submission — a rare achievement in this council area. The client has since expanded headcount by 30%, citing the inspiring environment as a key recruitment tool.",
        true,
      ),
      (
        "Horizon Apartments — Space Planning",
        #SpacePlanning,
        "A developer brief to maximise livability across 48 apartment units while maintaining generous communal spaces. d2u studio's space planning reduced wasted circulation by 18% without compromising natural light.",
        ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200"],
        "Space planning and unit layout optimisation for a 12-storey residential tower, covering 48 units across 1BR, 2BR, and 3BR configurations plus lobby, gym, and rooftop terrace.",
        ["Engineered stone benchtops", "Hybrid plank flooring", "Powder-coated aluminium joinery", "Brushed nickel tapware"],
        "18% reduction in non-productive circulation space. All units met NCC liveability standards on first compliance review. The developer reported a 12% uplift in per-sqm sale price versus comparable projects.",
        false,
      ),
      (
        "Miya Residence — Interior and Landscape",
        #Interior,
        "A holistic interior and landscape commission for a young family in an inner-suburban semi-detached home. Every decision was guided by the question: how does this serve the way you actually live?",
        ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200", "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1200"],
        "Full interior design across ground and first floor including custom kitchen, integrated storage, children's bedrooms, and a rear courtyard landscape concept.",
        ["Shaker-profile cabinetry", "Subway tile splashback", "Wide-board spotted gum floors", "Concrete planter boxes", "Native drought-tolerant planting"],
        "The family reported that the redesigned kitchen and living zone has transformed daily routines. The project was delivered on a mid-range residential budget with no value-engineering compromises.",
        true,
      ),
    ];

    var id = nextId;
    for ((title, category, description, imageUrls, scope, materials, outcomes, featured) in samples.values()) {
      projects.add({
        id;
        title;
        category;
        description;
        imageUrls;
        scope;
        materials;
        outcomes;
        featured;
      });
      id += 1;
    };
    id;
  };
};
