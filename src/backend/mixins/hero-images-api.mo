import List "mo:core/List";
import HeroLib "../lib/hero-images";

mixin (heroImages : List.List<Text>) {
  public query func getHeroImages() : async [Text] {
    HeroLib.list(heroImages);
  };

  public shared func addHeroImage(url : Text) : async Nat {
    HeroLib.add(heroImages, url);
  };

  public shared func removeHeroImage(index : Nat) : async { #ok; #err : Text } {
    HeroLib.remove(heroImages, index);
  };

  public shared func reorderHeroImages(newOrder : [Text]) : async () {
    HeroLib.reorder(heroImages, newOrder);
  };
};
