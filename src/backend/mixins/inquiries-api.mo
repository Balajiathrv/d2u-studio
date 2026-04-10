import List "mo:core/List";
import Time "mo:core/Time";
import InquiryTypes "../types/inquiries";
import Common "../types/common";
import InquiryLib "../lib/inquiries";

mixin (inquiries : List.List<InquiryTypes.Inquiry>) {
  var nextInquiryId : Nat = 0;

  public shared func submitInquiry(
    name : Text,
    email : Text,
    phone : Text,
    projectDescription : Text,
    serviceType : InquiryTypes.ServiceType,
  ) : async InquiryTypes.Inquiry {
    let inquiry = InquiryLib.submit(
      inquiries,
      nextInquiryId,
      name,
      email,
      phone,
      projectDescription,
      serviceType,
      Time.now(),
    );
    nextInquiryId += 1;
    inquiry;
  };

  public query func listInquiries() : async [InquiryTypes.Inquiry] {
    InquiryLib.listAll(inquiries);
  };

  public query func getInquiry(id : Common.InquiryId) : async ?InquiryTypes.Inquiry {
    InquiryLib.getById(inquiries, id);
  };
};
