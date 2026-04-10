import List "mo:core/List";
import ProjectTypes "../types/projects";
import Common "../types/common";
import ProjectLib "../lib/projects";

mixin (projects : List.List<ProjectTypes.Project>, projectCounter : Common.Counter) {
  public query func listProjects(category : ?ProjectTypes.ProjectCategory) : async [ProjectTypes.Project] {
    switch (category) {
      case (?cat) { ProjectLib.listByCategory(projects, cat) };
      case null { ProjectLib.listAll(projects) };
    };
  };

  public query func getFeaturedProjects() : async [ProjectTypes.Project] {
    ProjectLib.listFeatured(projects);
  };

  public query func getProject(id : Common.ProjectId) : async ?ProjectTypes.Project {
    ProjectLib.getById(projects, id);
  };
};
