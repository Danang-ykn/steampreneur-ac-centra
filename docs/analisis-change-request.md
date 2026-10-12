# Analisis Change Request

Isi bagian ini **sebelum** mengubah kode, lalu commit dan push (contoh pesan: `dokumen: analisis change request`). Juri memeriksa bahwa commit ini muncul sebelum commit perubahan kode.

**Change request:** pencarian, filter, dan ekspor CSV (lihat Tugas 3 di lembar challenge).

**Kriteria penerimaan yang akan dipenuhi dan cara kami memenuhinya:**

## 1. Dampak

| Bagian yang terdampak | File / fungsi | Perubahan yang diperlukan |
|---|---|---|
| Spesifikasi | Dokumen spesifikasi AC-CENTRA | Menambahkan kebutuhan pencarian langsung, filter, dan ekspor CSV sesuai enam kriteria penerimaan Tugas 3. |
| Kode | `src/main.js` | Menambahkan pencarian berdasarkan teks, filter status, serta ekspor CSV dari data yang sedang tampil setelah pencarian dan filter aktif. |
| Kasus uji / test | Dokumen kasus uji AC-CENTRA | Menambahkan kasus uji untuk pencarian, filter, pesan tanpa hasil, ekspor CSV, format angka, dan pengujian regresi. |
| README | `README.md` | Memperbarui daftar fitur dan petunjuk penggunaan pencarian, filter, serta ekspor CSV setelah fitur selesai dibuat dan diuji. |

## 2. Kasus uji baru

| ID | Langkah / input | Hasil yang diharapkan |
|---|---|---|
| U12 | Ketik ID perangkat atau nama ruangan yang tersedia pada kotak pencarian. | Daftar langsung tersaring berdasarkan teks yang diketik. |
| U13 | Cari ID atau nama ruangan menggunakan huruf besar dan huruf kecil yang berbeda dari data tersimpan. | Hasil pencarian tetap ditemukan tanpa membedakan huruf besar dan kecil. |
| U14 | Masukkan kata kunci yang tidak cocok dengan perangkat mana pun. | Aplikasi menampilkan pesan persis `Data tidak ditemukan`. |
| U15 | Pilih filter status ON, lalu pilih filter status OFF. | Daftar hanya menampilkan perangkat yang sesuai dengan status yang dipilih. |
| U16 | Masukkan kata kunci pencarian, lalu aktifkan filter status. | Pencarian dan filter bekerja bersamaan; hanya data yang memenuhi kedua kriteria yang ditampilkan. |
| U17 | Setelah pencarian dan/atau filter aktif, klik tombol Unduh CSV. | File CSV diunduh dengan data yang sedang tampil sesuai pencarian dan filter aktif, termasuk baris pertama yang berisi nama kolom. |
| U18 | Buka file CSV dan periksa nilai angka, termasuk daya atau nilai numerik lain yang diekspor. | Nilai angka tidak memakai simbol mata uang atau pemisah ribuan; contoh nilai lima belas ribu ditulis `15000`, bukan `Rp15.000`. File dapat dibuka di Excel. |
| U19 | Jalankan kembali seluruh kasus uji lama U01–U11 setelah perubahan. | Semua kasus uji lama tetap lulus dan alur inti tidak rusak. |

## 3. Setelah selesai

- [ ] Kasus uji lama tetap lulus
- [ ] Kasus uji baru lulus
- [ ] Spesifikasi diperbarui
- [ ] README diperbarui
