# Catatan Bug Hunt: Kasir Kantin STEAM

**Nama tim: AC CENTRA**

## Bug 1
- **Gejala:** Jumlah 0, negatif, pecahan, kosong, atau lebih dari 99 tetap masuk keranjang tanpa pesan kesalahan. Tambah produk yang sama dengan input form (string) menghasilkan `qty` gabungan string, contoh: `"2" + "3" = "23"` sehingga subtotal salah (Rp92.000 bukan Rp20.000). Total per produk bisa melebihi 99 (contoh: 90 + 20 = 110).
- **Langkah untuk memunculkan bug:** 1) Pilih Es Teh, isi jumlah `0` / `-2` / `2.5` / kosongkan, klik Tambah — tidak ada error. 2) Tambah Es Teh `"2"` lalu `"3"` (nilai dari `input` selalu string) — keranjang tertulis 23. 3) Tambah 90 lalu 20 untuk produk yang sama — diterima.
- **Aturan bisnis yang dilanggar:** No. 1 (jumlah harus bilangan bulat 1–99, selain itu ditolak) dan No. 2 (penjumlahan produk sama, total tetap maksimal 99).
- **Penyebab:** `kasir.js:tambahItem` tidak memvalidasi dan tidak mengonversi `qty`. Nilai dari `app.js` (`elQty.value`) berupa string langsung disimpan (`qty: qty`) dan dijumlahkan dengan `+=` sehingga terjadi konkatenasi string. Tidak ada pengecekan `1–99` maupun batas total 99.
- **Perbaikan:** Di `tambahItem`, konversi `qty` dengan `Number(qty)`, tolak jika bukan bilangan bulat 1–99 (`Number.isInteger`, `< 1`, `> 99`) dengan error `Jumlah harus bilangan bulat 1-99`. Simpan hasil konversi (angka), dan saat produk sudah ada cek `qty lama + qty baru > 99` lalu tolak.
- **Test yang membuktikan:** `tes/bug1-qty.test.js` (qty salah ditolak; string `"2"` diterima sebagai angka 2; `"2"+"3"=5` dan subtotal 20000; 90+20 ditolak).
- **Commit perbaikan:** `perbaikan: validasi jumlah 1-99 dan konversi string di tambahItem`
- **Ditemukan oleh:** Danang
