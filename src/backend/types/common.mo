module {
  public type ProjectId = Nat;
  public type InquiryId = Nat;
  public type Timestamp = Int;

  public type Counter = {
    var value : Nat;
  };

  public type Stat = {
    title : Text;
    value : Text;
  };
};
