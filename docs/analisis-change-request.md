# Analisis Change Request — AC-CENTRA

**Proyek:** AC-CENTRA — Sistem Monitoring dan Kendali AC Terpusat Berbasis IoT untuk Efisiensi Pengelolaan Energi di Industri  
**Tahap:** Change Request / Tugas 3  
**Status dokumen:** Analisis sebelum perubahan kode

## Tujuan

Change Request ini menambahkan fitur **pencarian perangkat, filter perangkat, dan ekspor CSV** pada website AC-CENTRA yang sudah memiliki alur inti. Perubahan dilakukan pada aplikasi yang sudah ada, bukan dengan membuat aplikasi baru.

Fitur alur inti Checkpoint 2 harus tetap berfungsi setelah perubahan. Status ON/OFF masih merupakan simulasi website; data energi dan biaya tetap berupa estimasi berdasarkan daya dan durasi, bukan pembacaan sensor atau pengukuran listrik aktual.

## 1. Ruang Lingkup dan Kriteria Penerimaan

### 1.1 Pencarian perangkat

**Tujuan:** Membantu pengguna menemukan perangkat berdasarkan ID perangkat atau nama ruangan.

**Kriteria penerimaan:**
- Pengguna dapat memasukkan kata kunci pencarian.
- Daftar menampilkan perangkat yang cocok dengan ID atau nama ruangannya.
- Pencarian tidak mengubah data perangkat yang tersimpan.
- Jika tidak ada hasil yang cocok, aplikasi menampilkan keadaan kosong atau pesan yang jelas.
- Pengguna dapat menghapus kata kunci untuk kembali melihat daftar sesuai filter yang aktif.

### 1.2 Filter perangkat

**Tujuan:** Membantu pengguna menyaring daftar berdasarkan status simulasi perangkat.

**Kriteria penerimaan:**
- Pengguna dapat memilih semua perangkat, status ON, atau status OFF.
- Daftar menampilkan perangkat yang sesuai dengan pilihan filter.
- Pengguna dapat mengembalikan filter ke pilihan semua perangkat.
- Filter tidak mengubah status perangkat maupun data riwayat.
- Jika pencarian dan filter digunakan bersamaan, daftar mengikuti kedua kriteria tersebut.

### 1.3 Ekspor CSV

**Tujuan:** Memungkinkan pengguna mengunduh data perangkat dalam format CSV yang dapat dibuka menggunakan aplikasi spreadsheet.

**Kriteria penerimaan:**
- Pengguna dapat menjalankan ekspor melalui kontrol yang jelas pada antarmuka.
- File CSV memiliki nama file yang jelas dan kolom yang dapat dikenali, sekurang-kurangnya ID perangkat, nama ruangan, daya AC (kW), dan status simulasi.
- Isi file sesuai dengan data yang tersedia pada aplikasi dan tidak mengarang data sensor atau pengukuran energi aktual.
- Nilai teks yang mengandung koma, tanda kutip, atau karakter khusus ditangani agar struktur CSV tetap terbaca.
- Jika tidak ada data yang dapat diekspor, aplikasi memberi umpan balik yang jelas dan tidak menghasilkan file yang menyesatkan.

## 2. Analisis Dampak

| Bagian yang terdampak | File / fungsi | Perubahan yang diperlukan |
|---|---|---|
| Spesifikasi | Dokumen spesifikasi AC-CENTRA | Menambahkan kebutuhan pencarian, filter, dan ekspor CSV setelah kriteria resmi Tugas 3 dikonfirmasi. |
| Kode | `src/main.js` | Menambahkan logika pencarian, filter, dan pembuatan serta pengunduhan CSV dengan mengikuti struktur kode yang sudah ada. |
| Kode tampilan | `src/style.css` | Menata kolom pencarian, kontrol filter, tombol ekspor, dan tampilan keadaan tanpa hasil bila diperlukan. |
| Kasus uji | Dokumen kasus uji AC-CENTRA | Menambahkan kasus uji untuk ketiga fitur dan mencatat hasil aktual setelah implementasi. |
| README | `README.md` | Memperbarui daftar fitur dan petunjuk penggunaan setelah fitur selesai dibuat dan diuji. |

## 3. Kasus Uji Tambahan yang Direncanakan

| ID | Langkah / input | Hasil yang diharapkan |
|---|---|---|
| U12 — Pencarian cocok | Masukkan ID perangkat yang ada pada kolom pencarian. | Perangkat dengan ID yang cocok ditampilkan. |
| U13 — Pencarian nama ruangan | Masukkan kata kunci nama ruangan yang ada. | Perangkat dengan nama ruangan yang cocok ditampilkan. |
| U14 — Pencarian tanpa hasil | Masukkan kata kunci yang tidak cocok dengan perangkat mana pun. | Daftar hasil kosong atau pesan tanpa hasil ditampilkan dengan jelas; data perangkat tidak berubah. |
| U15 — Filter status ON | Pilih filter ON. | Hanya perangkat dengan status simulasi ON yang ditampilkan. |
| U16 — Filter status OFF dan reset | Pilih filter OFF, kemudian pilih semua perangkat. | Pertama hanya perangkat OFF yang tampil; setelah reset, semua perangkat yang sesuai pencarian tampil kembali. |
| U17 — Pencarian dan filter bersamaan | Masukkan kata kunci, lalu pilih status. | Hanya perangkat yang memenuhi kriteria pencarian dan status yang tampil. |
| U18 — Ekspor CSV | Jalankan ekspor ketika tersedia perangkat. Buka file yang dihasilkan. | File dapat diunduh dan dibuka; header serta nilai kolom sesuai data aplikasi. |
| U19 — Ekspor tanpa data yang sesuai | Atur pencarian/filter hingga tidak ada hasil, lalu coba ekspor. | Aplikasi memberi umpan balik yang jelas dan perilaku ekspor sesuai kriteria resmi Tugas 3. |
| U20 — Isi CSV dan karakter khusus | Ekspor perangkat dengan nilai teks yang mengandung koma, tanda kutip, atau karakter khusus jika dapat dimasukkan melalui aplikasi. | Struktur CSV tetap terbaca dan nilai kolom tidak bergeser karena pemisah atau tanda kutip. |
| U21 — Regresi alur inti | Jalankan kembali kasus uji alur inti U01–U11 setelah fitur baru selesai. | Fitur lama tetap bekerja sesuai hasil yang diharapkan, termasuk validasi input, ON/OFF, pencatatan waktu, perhitungan, riwayat, penyimpanan setelah refresh, dan tampilan responsif. |

## 4. Checklist Setelah Selesai

- [ ] Kriteria resmi Change Request sudah dikonfirmasi.
- [ ] Fitur pencarian telah diimplementasikan dan diuji.
- [ ] Fitur filter telah diimplementasikan dan diuji.
- [ ] Fitur ekspor CSV telah diimplementasikan dan isi file diperiksa.
- [ ] Kasus uji lama telah dijalankan kembali dan hasil aktual dicatat.
- [ ] Kasus uji baru telah dijalankan dan hasil aktual dicatat.
- [ ] Spesifikasi diperbarui.
- [ ] README diperbarui.
- [ ] Bukti pengujian disimpan.
- [ ] Analisis Change Request di-commit dan di-push sebelum perubahan kode.
- [ ] Perubahan kode di-commit setelah pengujian dan review.
