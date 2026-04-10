import List "mo:core/List";

module {
  public let defaultUrls : [Text] = [
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c349d83?w=1920",
    "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1920",
  ];

  public func seed(images : List.List<Text>) {
    if (images.size() > 0) { return };
    for (url in defaultUrls.vals()) {
      images.add(url);
    };
  };

  public func list(images : List.List<Text>) : [Text] {
    images.toArray();
  };

  public func add(images : List.List<Text>, url : Text) : Nat {
    images.add(url);
    images.size() - 1;
  };

  public func remove(images : List.List<Text>, index : Nat) : { #ok; #err : Text } {
    if (index >= images.size()) {
      return #err("Index out of bounds");
    };
    let arr = images.toArray();
    images.clear();
    var i : Nat = 0;
    for (url in arr.vals()) {
      if (i != index) { images.add(url) };
      i += 1;
    };
    #ok;
  };

  public func reorder(images : List.List<Text>, newOrder : [Text]) {
    images.clear();
    for (url in newOrder.vals()) {
      images.add(url);
    };
  };
};
