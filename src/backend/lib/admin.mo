import Blob "mo:core/Blob";
import Array "mo:core/Array";
import Nat8 "mo:core/Nat8";

module {
  // Simple deterministic hash mixing UTF-8 bytes into a 32-byte state.
  // Not cryptographically strong, but avoids plaintext storage.
  public func hashPassword(password : Text) : Blob {
    let bytes = password.encodeUtf8().toArray();
    let state : [var Nat8] = [var
      0xd2, 0x4b, 0x1a, 0x9f, 0x3c, 0x87, 0x56, 0xe1,
      0x0a, 0xf3, 0x72, 0xcd, 0x45, 0x9e, 0x28, 0x6b,
      0xb7, 0x13, 0x5f, 0x80, 0xe4, 0x37, 0x91, 0xcc,
      0x2d, 0x68, 0xa5, 0x1e, 0x4f, 0x93, 0x07, 0xd6,
    ];
    var idx : Nat = 0;
    for (b in bytes.vals()) {
      let slot = idx % 32;
      let slot2 = (idx + 7) % 32;
      state[slot] ^= b;
      state[slot2] ^= Nat8.fromNat((b.toNat() + idx) % 256);
      idx += 1;
    };
    // Mix in length to prevent trivially equal short passwords
    let len = Nat8.fromNat(idx % 256);
    state[0] ^= len;
    state[16] ^= len;
    Blob.fromArray(Array.tabulate<Nat8>(32, func(i) { state[i] }));
  };

  public func verifyPassword(password : Text, storedHash : Blob) : Bool {
    hashPassword(password) == storedHash;
  };
};
