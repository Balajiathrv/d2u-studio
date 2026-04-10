import List "mo:core/List";
import Common "../types/common";
import StatsLib "../lib/stats";

mixin (stats : List.List<Common.Stat>) {
  public query func getStats() : async [Common.Stat] {
    StatsLib.getAll(stats);
  };

  public shared func updateStats(newStats : [Common.Stat]) : async () {
    StatsLib.replaceAll(stats, newStats);
  };
};
