# Spesifikasi Produk — AC-CENTRA

**Nama tim:** AC-CENTRA  
**Nama produk:** AC-CENTRA — Sistem Monitoring dan Kendali AC Terpusat Berbasis IoT untuk Efisiensi Pengelolaan Energi di Industri  
**Alur inti versi pertama:** Petugas melihat daftar unit AC, memilih satu unit, mengubah status ON/OFF pada dashboard simulasi, lalu melihat riwayat perubahan dan rekap durasi serta estimasi energi/biaya.

## 1. Masalah

AC-CENTRA dirancang sebagai sistem monitoring dan kendali AC terpusat berbasis IoT untuk mendukung efisiensi pengelolaan energi di lingkungan industri. Dalam challenge ini, validasi awal dilakukan di SMK Negeri 1 Rejotangan karena keterbatasan waktu dan akses ke lokasi industri. Sekolah menjadi lingkungan uji awal karena memiliki masalah pengawasan operasional AC yang relevan dengan tujuan AC-CENTRA.

Berdasarkan wawancara dengan Wakil Kepala Sekolah bidang Sarana dan Prasarana (Waka Sarpras) SMK Negeri 1 Rejotangan (kode narasumber N1), terdapat 35 unit AC yang tersebar di 20 ruangan. Pengawasan masih mengandalkan pengecekan fisik untuk memastikan AC tidak tetap menyala setelah kegiatan belajar mengajar selesai atau ketika ruangan kosong maupun terkunci.

Pengguna membutuhkan cara yang lebih mudah untuk memantau status ON/OFF setiap unit, mengetahui lokasi AC, dan melihat durasi operasional tanpa harus mendatangi setiap ruangan. Pencatatan penggunaan serta rekap per ruangan juga dibutuhkan untuk membantu evaluasi konsumsi energi dan biaya listrik.

Dalam challenge ini, pengembangan difokuskan pada validasi kebutuhan pengguna dan pengujian alur kerja prototipe website. Status ON/OFF merupakan simulasi dan belum terhubung dengan perangkat AC fisik. Prototipe ini belum dapat diklaim mampu mengendalikan AC secara nyata atau membuktikan penghematan energi aktual.

## 2. Pengguna

**Pengguna utama:** Admin Sarana dan Prasarana (Waka Sarpras dan staf yang berwenang).

**Pengguna terkait yang disebut narasumber:**
- Penjaga sekolah/security yang diberi kewenangan.
- Teknisi pemeliharaan AC.
- Viewer/Kepala Sekolah yang membutuhkan akses rekap.

Kebutuhan utama pengguna adalah melihat daftar unit dan status simulasi ON/OFF, mengenali lokasi setiap unit, melihat durasi penggunaan, mengelola data unit, serta memperoleh rekap penggunaan dan estimasi energi/biaya. Narasumber menginginkan akses kendali dibatasi kepada petugas berwenang. Namun, autentikasi dan pembagian hak akses produksi tidak termasuk lingkup prototipe challenge.

## 3. Hasil wawancara calon pengguna

**Narasumber:** Waka Sarpras SMK Negeri 1 Rejotangan (kode N1; tanpa mencantumkan data pribadi).  
**Metode dan tanggal:** Wawancara tanya jawab, Jumat, 9 Oktober 2026.  
**Sumber:** Dokumen rangkuman hasil wawancara dan observasi yang disiapkan tim.

| Pertanyaan | Jawaban/rangkuman narasumber |
|---|---|
| Pekerjaan apa yang ingin dipermudah? | Pengawasan harian agar AC tidak tetap menyala di ruangan kosong atau setelah jam KBM tanpa harus melakukan pengecekan fisik. |
| Informasi apa yang paling penting? | Status ON/OFF, lokasi ruangan, dan durasi AC menyala setiap hari. |
| Siapa pengguna website? | Tim Sarpras (Waka dan staf), penjaga sekolah/security, serta teknisi pemeliharaan. |
| Bagaimana status AC sebaiknya ditampilkan? | Indikator warna pada kartu ruangan/dashboard; usulan warna hijau untuk ON, merah/abu-abu untuk OFF, serta Offline/kuning jika koneksi IoT terputus. Status Offline berbasis koneksi nyata tidak diterapkan pada prototipe simulasi. |
| Kapan kendali jarak jauh dibutuhkan? | Saat jam sekolah selesai tetapi AC masih menyala di ruangan kosong atau terkunci. Narasumber mengusulkan toggle per unit dan tombol “Matikan Semua AC” per gedung/sekolah. |
| Apakah penjadwalan otomatis dibutuhkan? | Ya, untuk menyesuaikan jam KBM. Usulan jadwal Senin–Jumat, ON pukul 06.45 WIB dan OFF pukul 15.30 WIB, dengan Mode Libur dan override manual untuk kegiatan khusus. |
| Data apa yang perlu dikelola? | ID perangkat, nama ruangan, merek, kapasitas PK, daya listrik, blok ruangan/gedung, serta riwayat servis/perbaikan dan teknisi. |
| Data penggunaan apa yang diperlukan? | Tanggal, waktu mulai, waktu selesai, durasi menyala, durasi harian/bulanan, estimasi kWh, dan estimasi biaya listrik. Narasumber menyebut asumsi daya rata-rata 0,7 kW dan tarif Rp1.500/kWh. |
| Rekap dan akses seperti apa yang dibutuhkan? | Laporan bulanan jam operasi, estimasi kWh dan biaya per ruangan; filter tanggal dan nama ruangan; unduhan PDF/Excel; akses smartphone dan laptop/PC; serta penyimpanan cloud dengan hak akses Admin dan Viewer. |
| Apa tiga fitur terpenting? | Monitoring ON/OFF, kendali ON/OFF jarak jauh, dan penjadwalan otomatis. Untuk versi awal, monitoring dan kendali ON/OFF jarak jauh diprioritaskan. |
| Apakah prototipe simulasi tetap berguna? | Ya, untuk pengujian UI/UX dan mempelajari alur kerja sebelum perangkat keras dipasang. |
| Apa kriteria keberhasilan dan kebutuhan tambahan? | Pengoperasian responsif, berkurangnya waktu patroli fisik, potensi penurunan tagihan listrik, serta antarmuka ringan, mudah dibaca, dan responsif di smartphone. |

## 4. Fitur wajib untuk alur inti versi pertama

1. **Daftar unit AC:** menampilkan ID unit, nama ruangan, daya, dan status simulasi ON/OFF. Jika belum ada unit tersimpan, tampilkan keadaan kosong atau sediakan data contoh yang dijelaskan di README.
2. **Tambah unit dan validasi:** pengguna dapat menambahkan unit dengan ID unik, nama ruangan, dan daya. ID dan nama ruangan wajib diisi; daya harus berupa angka yang valid dan lebih besar dari nol. Data seperti merek, kapasitas PK, dan blok/gedung boleh ditampilkan jika diimplementasikan, tetapi bukan syarat minimum alur inti.
3. **Perubahan status simulasi:** pengguna dapat mengubah status satu unit dari dashboard. Perubahan status dicatat sebagai riwayat waktu mulai dan waktu selesai. Tidak ada kendali AC fisik.
4. **Perhitungan:** sistem menghitung durasi untuk periode ON yang telah selesai, serta estimasi energi dan biaya berdasarkan daya, durasi, dan tarif.
5. **Penyimpanan persisten:** data unit dan riwayat disimpan di `localStorage` dan tetap tersedia setelah halaman dimuat ulang pada browser yang sama.
6. **Rekap penggunaan:** menampilkan riwayat/status unit, durasi penggunaan yang telah selesai, serta estimasi energi dan biaya berdasarkan data tersimpan.

Pencarian, filter, dan ekspor CSV ditambahkan setelah Checkpoint 2 sebagai Change Request. Ketiganya bukan syarat bahwa alur inti versi pertama telah selesai. Setelah Change Request diimplementasikan dan diuji, fitur tersebut menjadi bagian dari kemampuan prototipe pada versi yang diperbarui.

### 4.1 Fitur Change Request — Tugas 3

1. **Pencarian perangkat:** pengguna dapat mencari perangkat berdasarkan ID unit atau nama ruangan. Hasil diperbarui saat pengguna mengetik dan pencarian tidak membedakan huruf besar/kecil.
2. **Filter status:** pengguna dapat memilih `Semua perangkat`, `ON`, atau `OFF`.
3. **Kombinasi pencarian dan filter:** ketika pencarian dan filter status digunakan bersamaan, perangkat yang ditampilkan harus memenuhi kedua kriteria.
4. **Reset filter status:** ketika filter diubah dari `ON` atau `OFF` menjadi `Semua perangkat`, filter status dihapus. Kata kunci pencarian yang masih terisi tetap berlaku. Jika pencarian kosong, semua perangkat ditampilkan.
5. **Hasil kosong:** jika tidak ada perangkat yang cocok dengan pencarian dan filter aktif, aplikasi menampilkan pesan persis `Data tidak ditemukan`.
6. **Ekspor CSV:** tombol `Unduh CSV` mengunduh data perangkat yang sedang ditampilkan setelah pencarian dan filter diterapkan, bukan seluruh data tanpa memedulikan tampilan.
7. **Header CSV:** file CSV memiliki baris header untuk kolom data yang diekspor. Kolom minimum mencakup ID perangkat, nama ruangan, daya AC, dan status simulasi, sesuai nama field pada implementasi.
8. **Format nilai numerik:** nilai numerik pada CSV tidak menggunakan simbol mata uang atau pemisah ribuan. Contoh: `15000`, bukan `Rp15.000`.
9. **Keamanan data dan batasan simulasi:** pencarian, filter, dan ekspor hanya mengubah tampilan atau menghasilkan salinan data untuk diunduh. Fitur tersebut tidak boleh mengubah data perangkat, status simulasi, riwayat, atau data `localStorage`. CSV tidak boleh menyatakan data simulasi/estimasi sebagai pembacaan sensor atau pengukuran listrik aktual.
10. **Pengujian regresi:** setelah Change Request diterapkan, alur inti versi pertama harus diuji ulang agar penambahan fitur tidak merusak fungsi sebelumnya.

## 5. Di luar cakupan alur inti versi pertama

- Koneksi IoT nyata ke ESP8266 atau perangkat AC.
- Pembacaan status ON/OFF real-time dari perangkat fisik.
- Perintah yang benar-benar menyalakan atau mematikan AC fisik.
- Penjadwalan otomatis yang dieksekusi perangkat keras.
- Tombol “Matikan Semua AC”.
- Mode Libur dan override jadwal.
- Integrasi cloud database, sinkronisasi antarperangkat, autentikasi, dan sistem hak akses produksi.
- Notifikasi nyata ketika koneksi IoT terputus.

## 6. Aturan bisnis dan perhitungan

- Setiap unit AC memiliki ID unik. ID unit dan nama ruangan wajib diisi.
- Daya harus berupa angka yang valid dan lebih besar dari nol. Jika dimasukkan dalam watt, ubah ke kW dengan membagi 1.000 sebelum menghitung energi.
- Status prototipe hanya `ON` atau `OFF`. Website tidak boleh menyatakan status `Offline` sebagai hasil koneksi IoT karena tidak ada koneksi perangkat nyata.
- Ketika status simulasi berubah dari `OFF` ke `ON`, sistem mencatat waktu mulai periode penggunaan.
- Ketika status berubah dari `ON` ke `OFF`, sistem mencatat waktu selesai dan menghitung durasi periode tersebut.
- Waktu selesai harus lebih akhir daripada waktu mulai. Periode dengan durasi nol atau negatif tidak boleh dianggap sebagai periode penggunaan selesai yang valid.
- Jika tindakan pengguna tidak mengubah status, sistem tidak membuat catatan transisi atau riwayat duplikat.
- Durasi penggunaan (jam) = (waktu selesai − waktu mulai) dalam satuan jam.
- Estimasi energi (kWh) = daya AC (kW) × durasi penggunaan (jam).
- Estimasi biaya (Rp) = estimasi energi (kWh) × tarif listrik (Rp/kWh).
- Asumsi wawancara adalah daya rata-rata 0,7 kW dan tarif Rp1.500/kWh. Nilai ini dapat dipakai untuk data contoh/perhitungan acuan jika data spesifik tidak tersedia. Hasil harus diberi label **estimasi**, bukan hasil pengukuran aktual.
- Tombol “Matikan Semua AC”, penjadwalan, override jadwal, serta hak akses pengguna merupakan kebutuhan wawancara, tetapi tidak termasuk alur inti versi pertama.

## 7. Data yang disimpan

| Data | Contoh/keterangan | Penyimpanan atau sumber |
|---|---|---|
| ID unit AC | `AC-001` | `localStorage` |
| Nama ruangan | Laboratorium Elektronika | `localStorage` |
| Blok/gedung | Blok A, jika digunakan | `localStorage` |
| Merek AC | Diisi jika tersedia dan terverifikasi | `localStorage`, opsional |
| Kapasitas AC | Misalnya 1 PK, jika terverifikasi | `localStorage`, opsional |
| Daya AC | Nilai dalam watt atau kW dengan satuan yang jelas | `localStorage`; nilai contoh harus diberi label asumsi |
| Status simulasi | `ON` / `OFF` | `localStorage` |
| Waktu mulai dan selesai | Timestamp transisi status | `localStorage` sebagai riwayat |
| Durasi penggunaan | Selisih waktu mulai dan selesai | Dihitung dari riwayat; nilai turunan tidak wajib disimpan |
| Estimasi energi | Daya (kW) × durasi (jam) | Dihitung dari data unit dan riwayat |
| Estimasi biaya | Energi (kWh) × tarif (Rp/kWh) | Dihitung dari data unit, riwayat, dan tarif |
| Tarif listrik | Rp1.500/kWh sebagai asumsi | Konstanta konfigurasi atau pengaturan lokal |
| Riwayat pemeliharaan | Kebutuhan lanjutan, bukan alur inti | Tidak wajib disimpan pada versi awal |

## 8. Kriteria selesai untuk alur inti versi pertama

- [x] Daftar unit menampilkan ID, nama ruangan, daya, dan status simulasi ON/OFF, atau keadaan kosong yang jelas jika belum ada data.
- [x] Pengguna dapat menambahkan unit; ID dan nama ruangan wajib diisi, daya divalidasi, dan ID duplikat ditolak.
- [x] Pengguna dapat mengubah status simulasi satu unit dari OFF ke ON dan dari ON ke OFF.
- [x] Sistem mencatat waktu mulai dan waktu selesai serta menghitung durasi periode yang telah selesai.
- [x] Periode dengan waktu selesai sama dengan atau lebih awal daripada waktu mulai tidak diterima sebagai periode selesai yang valid.
- [x] Tindakan yang tidak mengubah status tidak menghasilkan riwayat transisi duplikat.
- [x] Data unit dan riwayat tetap tersedia setelah halaman dimuat ulang pada browser yang sama.
- [x] Rekap menampilkan durasi serta estimasi energi dan biaya berdasarkan rumus yang ditetapkan.
- [x] Estimasi diberi label jelas dan tidak diklaim sebagai pengukuran IoT atau bukti penghematan aktual.
- [x] Alur dari daftar unit, perubahan status, riwayat, hingga rekap dapat dijalankan.
- [x] Antarmuka dapat digunakan pada laptop/PC dan smartphone tanpa elemen utama terpotong.
- [x] README menjelaskan cara menjalankan prototipe dan batasan simulasi secara akurat.

## 9. Kriteria selesai untuk Change Request Tugas 3

- [x] Pencarian berdasarkan ID perangkat atau nama ruangan bekerja saat pengguna mengetik.
- [x] Pencarian tidak membedakan huruf besar dan kecil.
- [x] Filter `ON`, `OFF`, dan `Semua perangkat` bekerja sesuai pilihan.
- [x] Filter `OFF` dapat direset ke `Semua perangkat`; seluruh perangkat yang sesuai pencarian saat ini kembali ditampilkan.
- [x] Pencarian dan filter status dapat digunakan bersamaan.
- [x] Pesan `Data tidak ditemukan` ditampilkan jika tidak ada hasil.
- [x] Tombol `Unduh CSV` menghasilkan file CSV yang dapat dibuka dan memiliki baris header.
- [x] CSV memuat data yang sedang ditampilkan setelah pencarian dan filter diterapkan.
- [x] Nilai numerik CSV tidak menggunakan simbol mata uang atau pemisah ribuan.
- [x] Ekspor CSV tidak mengubah data perangkat, status simulasi, riwayat, atau `localStorage`.
- [x] Pengujian regresi alur inti versi pertama telah dijalankan kembali dan hasil aktualnya dicatat.
- [x] README dan dokumen kasus uji diperbarui agar sesuai dengan fitur yang benar-benar diimplementasikan.
