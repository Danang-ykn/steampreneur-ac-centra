const test = require("node:test");
const assert = require("node:assert");
const kasir = require("../kasir.js");

test("diskon member 10 persen tanpa gabung", () => {
  assert.strictEqual(kasir.hitungDiskon(200000, true), 20000);
});

test("diskon non-member minimal 100000 inklusif", () => {
  assert.strictEqual(kasir.hitungDiskon(100000, false), 5000);
});

test("non-member di bawah 100000 tanpa diskon", () => {
  assert.strictEqual(kasir.hitungDiskon(99999, false), 0);
});

test("non-member besar 5 persen, member kecil tetap 10 persen", () => {
  assert.strictEqual(kasir.hitungDiskon(200000, false), 10000);
  assert.strictEqual(kasir.hitungDiskon(50000, true), 5000);
});
