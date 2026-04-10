import Common "common";

module {
  public type ProjectCategory = {
    #Interior;
    #Architectural;
    #SpacePlanning;
    #Renovation;
  };

  public type Project = {
    id : Common.ProjectId;
    title : Text;
    category : ProjectCategory;
    description : Text;
    imageUrls : [Text];
    scope : Text;
    materials : [Text];
    outcomes : Text;
    featured : Bool;
  };

  public type ProjectInput = {
    title : Text;
    category : ProjectCategory;
    description : Text;
    imageUrls : [Text];
    scope : Text;
    materials : [Text];
    outcomes : Text;
    featured : Bool;
  };
};
