import List "mo:core/List";
import ProjectTypes "../types/projects";
import Common "../types/common";

mixin (projects : List.List<ProjectTypes.Project>, projectCounter : Common.Counter) {
  public shared func createProject(data : ProjectTypes.ProjectInput) : async Common.ProjectId {
    let id = projectCounter.value;
    projects.add({
      id;
      title = data.title;
      category = data.category;
      description = data.description;
      imageUrls = data.imageUrls;
      scope = data.scope;
      materials = data.materials;
      outcomes = data.outcomes;
      featured = data.featured;
    });
    projectCounter.value += 1;
    id;
  };

  public shared func updateProject(id : Common.ProjectId, data : ProjectTypes.ProjectInput) : async { #ok; #err : Text } {
    switch (projects.findIndex(func(p) { p.id == id })) {
      case null { #err("Project not found") };
      case (?idx) {
        projects.put(idx, {
          id;
          title = data.title;
          category = data.category;
          description = data.description;
          imageUrls = data.imageUrls;
          scope = data.scope;
          materials = data.materials;
          outcomes = data.outcomes;
          featured = data.featured;
        });
        #ok;
      };
    };
  };

  public shared func deleteProject(id : Common.ProjectId) : async { #ok; #err : Text } {
    switch (projects.findIndex(func(p) { p.id == id })) {
      case null { #err("Project not found") };
      case (?_idx) {
        let arr = projects.toArray();
        projects.clear();
        for (p in arr.vals()) {
          if (p.id != id) { projects.add(p) };
        };
        #ok;
      };
    };
  };

  public shared func setProjectFeatured(id : Common.ProjectId, featured : Bool) : async { #ok; #err : Text } {
    switch (projects.findIndex(func(p) { p.id == id })) {
      case null { #err("Project not found") };
      case (?idx) {
        let existing = projects.at(idx);
        projects.put(idx, { existing with featured });
        #ok;
      };
    };
  };
};
