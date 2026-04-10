module {
  // Stored credentials — password is kept as a hashed Blob
  public type AdminCredentials = {
    var username : Text;
    var passwordHash : Blob;
  };
};
