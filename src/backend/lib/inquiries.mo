import List "mo:core/List";
import Types "../types/inquiries";
import Common "../types/common";

module {
  public func submit(
    inquiries : List.List<Types.Inquiry>,
    nextId : Nat,
    name : Text,
    email : Text,
    phone : Text,
    projectDescription : Text,
    serviceType : Types.ServiceType,
    timestamp : Common.Timestamp,
  ) : Types.Inquiry {
    let inquiry : Types.Inquiry = {
      id = nextId;
      name;
      email;
      phone;
      projectDescription;
      serviceType;
      timestamp;
    };
    inquiries.add(inquiry);
    inquiry;
  };

  public func listAll(inquiries : List.List<Types.Inquiry>) : [Types.Inquiry] {
    inquiries.toArray();
  };

  public func getById(inquiries : List.List<Types.Inquiry>, id : Common.InquiryId) : ?Types.Inquiry {
    inquiries.find(func(i) { i.id == id });
  };
};
