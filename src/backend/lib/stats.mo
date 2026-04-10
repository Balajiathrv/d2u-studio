import List "mo:core/List";
import Common "../types/common";

module {
  public func defaultStats() : [Common.Stat] {
    [
      { title = "Projects Completed"; value = "120+" },
      { title = "Years of Practice"; value = "12" },
      { title = "Client Satisfaction"; value = "98%" },
      { title = "Design Awards"; value = "4" },
    ];
  };

  public func seed(stats : List.List<Common.Stat>) {
    if (stats.size() == 0) {
      for (s in defaultStats().vals()) {
        stats.add(s);
      };
    };
  };

  public func getAll(stats : List.List<Common.Stat>) : [Common.Stat] {
    stats.toArray();
  };

  public func replaceAll(stats : List.List<Common.Stat>, newStats : [Common.Stat]) {
    stats.clear();
    for (s in newStats.vals()) {
      stats.add(s);
    };
  };
};
