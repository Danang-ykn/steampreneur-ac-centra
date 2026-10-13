const test = require("node:test");
const assert = require("node:assert");
const kasir = require("../kasir.js");

test("PPN 5,5 dibulatkan naik ke 6", () => {
  assert.strictEqual(kasir.hitungPPN(50), 6);
});

test("PPN 1499,96 dibulatkan ke 1500", () => {
  assert.strictEqual(kasir.hitungPPN(13636), 1500);
});

test("PPN nilai bulat tetap tepat", () => {
  assert.strictEqual(kasir.hitungPPN(100000), 11000);
  assert.strictEqual(kasir.hitungPPN(0), 0);
});
