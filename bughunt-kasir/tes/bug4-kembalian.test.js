const test = require("node:test");
const assert = require("node:assert");
const kasir = require("../kasir.js");

test("bayar kurang ditolak dengan pesan Uang pembayaran kurang", () => {
  assert.throws(() => kasir.hitungKembalian(10000, 5000), /Uang pembayaran kurang/);
});

test("bayar kosong, nol, atau bukan angka ditolak", () => {
  for (const salah of ["", 0, NaN, "abc"]) {
    assert.throws(() => kasir.hitungKembalian(10000, salah), /Uang pembayaran kurang/);
  }
});

test("bayar pas kembaliannya nol", () => {
  assert.strictEqual(kasir.hitungKembalian(10000, 10000), 0);
});

test("bayar lebih kembaliannya selisih", () => {
  assert.strictEqual(kasir.hitungKembalian(10000, 15000), 5000);
});
