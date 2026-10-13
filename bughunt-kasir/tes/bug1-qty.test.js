/*
 * Test Bug 1: validasi jumlah pesanan (aturan bisnis no. 1 dan 2).
 * Gagal pada kode asli, lulus setelah perbaikan tambahItem.
 */

const test = require("node:test");
const assert = require("node:assert");
const kasir = require("../kasir.js");

test("qty 0, negatif, pecahan, kosong, dan >99 ditolak", () => {
  for (const salah of [0, -2, 2.5, "", NaN, 100, "abc"]) {
    assert.throws(() => kasir.tambahItem([], "K04", salah), /Jumlah harus bilangan bulat 1-99/);
  }
});

test("qty string angka diterima sebagai angka", () => {
  const keranjang = [];
  kasir.tambahItem(keranjang, "K04", "2");
  assert.strictEqual(keranjang[0].qty, 2);
});

test("tambah produk yang sama dijumlahkan, bukan concat string", () => {
  const keranjang = [];
  kasir.tambahItem(keranjang, "K04", "2");
  kasir.tambahItem(keranjang, "K04", "3");
  assert.strictEqual(keranjang[0].qty, 5);
  assert.strictEqual(kasir.hitungSubtotal(keranjang), 20000);
});

test("total per produk tidak boleh lebih dari 99", () => {
  const keranjang = [];
  kasir.tambahItem(keranjang, "K04", 90);
  assert.throws(() => kasir.tambahItem(keranjang, "K04", 20), /Jumlah harus bilangan bulat 1-99/);
});
