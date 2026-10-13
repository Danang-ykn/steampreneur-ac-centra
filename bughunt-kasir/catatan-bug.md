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

## Bug 2
- **Gejala:** Member dengan subtotal >100.000 dapat diskon 15% (contoh: 200.000 jadi 30.000). Non-member dengan subtotal pas 100.000 tidak dapat diskon sama sekali.
- **Langkah untuk memunculkan bug:** Panggil `hitungDiskon(200000, true)` → 30000 (harusnya 20000). Panggil `hitungDiskon(100000, false)` → 0 (harusnya 5000).
- **Aturan bisnis yang dilanggar:** No. 4 (diskon tidak boleh digabung; member 10%, non-member minimal Rp100.000 dapat 5%).
- **Penyebab:** `kasir.js:hitungDiskon` memakai dua `if` yang dijumlahkan (`+=`) sehingga member+besar digabung, dan memakai `>` bukan `>=` sehingga 100.000 pas lolos.
- **Perbaikan:** Ubah menjadi `if (member) ... else if (subtotal >= 100000) ...` dengan penugasan `=` bukan `+=`.
- **Test yang membuktikan:** `tes/bug2-diskon.test.js`.
- **Commit perbaikan:** `perbaikan: diskon eksklusif member 10 persen, non-member 5 persen minimal 100000`
- **Ditemukan oleh:** Fahril

## Bug 3
- **Gejala:** PPN selalu dibulatkan ke bawah sehingga total kurang Rp1 pada kasus pecahan 0,5 ke atas. Contoh: dasar 50 (PPN 5,5) dihitung 5, bukan 6. Dasar 13636 dihitung 1499, bukan 1500.
- **Langkah untuk memunculkan bug:** Panggil `hitungPPN(50)` → 5 (harusnya 6). Panggil `hitungPPN(13636)` → 1499 (harusnya 1500).
- **Aturan bisnis yang dilanggar:** No. 5 (PPN 11% dari subtotal dikurangi diskon, dibulatkan ke rupiah terdekat, 0,5 ke atas naik).
- **Penyebab:** `kasir.js:hitungPPN` memakai `Math.floor`, bukan `Math.round`.
- **Perbaikan:** Ganti menjadi `Math.round((dasar * 11) / 100)`.
- **Test yang membuktikan:** `tes/bug3-ppn.test.js`.
- **Commit perbaikan:** `perbaikan: PPN dibulatkan round bukan floor`
- **Ditemukan oleh:** AI
