import AdminLib "../lib/admin";
import AdminTypes "../types/admin";

mixin (adminCredentials : AdminTypes.AdminCredentials) {
  public shared func validateAdminCredentials(username : Text, password : Text) : async Bool {
    username == adminCredentials.username and AdminLib.verifyPassword(password, adminCredentials.passwordHash);
  };

  public shared func changeAdminCredentials(
    currentPassword : Text,
    newUsername : Text,
    newPassword : Text,
  ) : async { #ok; #err : Text } {
    if (not AdminLib.verifyPassword(currentPassword, adminCredentials.passwordHash)) {
      return #err("Current password is incorrect");
    };
    if (newUsername.size() == 0) {
      return #err("Username cannot be empty");
    };
    if (newPassword.size() < 8) {
      return #err("Password must be at least 8 characters");
    };
    adminCredentials.username := newUsername;
    adminCredentials.passwordHash := AdminLib.hashPassword(newPassword);
    #ok;
  };
};
