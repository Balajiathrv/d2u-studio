import Common "common";

module {
  public type ServiceType = {
    #Interior;
    #Architectural;
    #SpacePlanning;
    #Renovation;
    #Consultation;
  };

  public type Inquiry = {
    id : Common.InquiryId;
    name : Text;
    email : Text;
    phone : Text;
    projectDescription : Text;
    serviceType : ServiceType;
    timestamp : Common.Timestamp;
  };
};
