# AC-CENTRA

**AC-CENTRA (Sistem Monitoring dan Kendali AC Terpusat Berbasis IoT untuk Efisiensi Pengelolaan Energi di Industri)** adalah prototipe website untuk membantu pengguna memantau dan menyimulasikan perubahan status ON/OFF unit AC, mencatat riwayat perubahan, serta melihat estimasi durasi penggunaan, konsumsi energi, dan biaya listrik.

Prototipe ini dikembangkan untuk memvalidasi alur penggunaan dan kebutuhan pengelolaan AC. Pengujian awal menggunakan konteks SMK Negeri 1 Rejotangan sebagai lingkungan validasi, sementara sasaran penerapannya tetap pada kebutuhan pengelolaan AC di lingkungan industri.

> **Catatan penting:** Versi tantangan ini merupakan simulasi website. Website belum terhubung ke ESP8266, sensor, jaringan IoT, atau perangkat AC fisik. Status dan perhitungan yang ditampilkan bukan hasil pembacaan perangkat nyata dan tidak boleh dianggap sebagai bukti penghematan energi aktual.

## Alur Inti

1. Pengguna melihat daftar unit AC atau keadaan kosong jika belum ada data.
2. Pengguna menambahkan unit dengan ID unik, nama ruangan, dan daya yang valid.
3. Pengguna memilih satu unit dan mengubah status simulasi OFF/ON. Sistem mencatat waktu mulai dan waktu selesai; tindakan yang tidak mengubah status tidak membuat riwayat transisi palsu.
4. Sistem menampilkan riwayat, durasi untuk periode yang telah selesai, serta estimasi energi dan biaya berdasarkan daya, durasi, dan tarif.
5. Data unit dan riwayat disimpan secara lokal dan dapat ditampilkan kembali setelah halaman dimuat ulang pada browser yang sama.
6. Pengguna dapat mencari perangkat berdasarkan ID atau nama ruangan. Pencarian tidak membedakan huruf besar dan kecil.
7. Pengguna dapat memfilter daftar berdasarkan status Semua perangkat, ON, atau OFF. Pencarian dan filter status diterapkan secara bersamaan.
8. Jika tidak ada perangkat yang sesuai dengan pencarian dan filter, sistem menampilkan pesan `Data tidak ditemukan`.
9. Pengguna dapat mengunduh data yang sedang ditampilkan ke file CSV melalui tombol `Unduh CSV`. File memuat baris header dan mengikuti hasil pencarian serta filter yang aktif.

## Cara Menjalankan (How to Run)

### Prasyarat

- Git untuk mengambil repositori.
- Node.js dan npm jika proyek menggunakan toolchain Node.js.
- Browser modern, misalnya Google Chrome atau Mozilla Firefox.

### Langkah

1. Clone repositori GitHub AC-CENTRA:
   ```bash
   git clone https://github.com/Danang-ykn/steampreneur-ac-centra.git
   ```
2. Masuk ke folder hasil clone:
   ```bash
   cd steampreneur-ac-centra
   ```
3. Pasang dependensi proyek (jika belum terpasang):
   ```bash
   npm install
   ```
4. Jalankan aplikasi menggunakan skrip `dev` yang tersedia pada `package.json`:
   ```bash
   npm run dev
   ```
5. Buka URL lokal yang dicetak oleh terminal. Untuk konfigurasi Vite standar, alamatnya biasanya `http://localhost:5173`, tetapi gunakan alamat yang benar-benar ditampilkan oleh terminal.

### Akun atau Data Contoh

Contoh data untuk pengujian:

| Field | Data Contoh |
|---|---|
| ID Perangkat | AC-LAB-01 |
| Nama Ruangan | Lab Elektronika |
| Daya AC (kW) | 0.7 |
| Status Awal | OFF |
| Tarif Listrik | Rp1.500/kWh (asumsi pengujian) |

**Catatan:** Data di atas merupakan data simulasi untuk pengujian, bukan data pembacaan perangkat AC nyata. Sesuaikan tarif listrik apabila menggunakan asumsi lain. Data yang tersimpan menggunakan penyimpanan lokal browser dan dapat berbeda pada browser atau perangkat lain.

### Jika Terjadi Masalah

- **Perintah `npm` tidak dikenali:** pastikan Node.js beserta npm telah terpasang, lalu tutup dan buka kembali terminal.
- **Dependensi belum ditemukan:** jalankan `npm install` dari folder yang berisi `package.json`.
- **Perintah `npm run dev` tidak tersedia:** periksa bagian `scripts` di `package.json` dan gunakan perintah yang benar untuk proyek.
- **Port sedang digunakan:** ikuti alamat alternatif yang ditampilkan oleh terminal atau hentikan proses lain yang menggunakan port tersebut.
- **Perubahan data tidak terlihat setelah halaman dimuat ulang:** periksa apakah penyimpanan lokal browser aktif dan apakah aplikasi menggunakan origin/browser yang sama. Data `localStorage` bersifat lokal pada browser dan origin terkait, bukan basis data cloud.

## Tangkapan Layar Alur Inti

1. Daftar unit AC dan status: [image](./docs/bukti/langkah-1.png)
2. Perubahan status simulasi dan riwayat:[image](./src/docs/langkah-2.1.png) ,[image](./docs/bukti/langkah-2.2.png)
3. Rekap durasi, estimasi energi, dan estimasi biaya:[image](./docs/bukti/langkah-3.png)
4. Pencarian perangkat:[image](./docs/bukti/langkah-4.png)
5. Filter status dan reset ke Semua perangkat:[image](./docs/bukti/langkah-5.1.png) ,[image](./docs/bukti/langkah-5.2.png)
6. Hasil pencarian/filter kosong dengan pesan `Data tidak ditemukan`: [image](./docs/bukti/langkah-6.png)
7. Ekspor CSV dan isi file hasil unduhan: [file_csv](./docs/bukti/langkah-7.txt)

## Cara Menjalankan Pengujian

Pengujian dilakukan secara manual melalui browser untuk memastikan fitur utama AC-CENTRA berjalan sesuai spesifikasi.

### Persiapan

1. Pastikan Git, Node.js, dan npm sudah terpasang.
2. Buka terminal pada folder proyek `steampreneur-ac-centra`.
3. Jalankan perintah berikut jika dependensi belum dipasang:

   ```bash
   npm install
   ```

4. Jalankan aplikasi:

   ```bash
   npm run dev
   ```

5. Buka alamat lokal yang ditampilkan oleh terminal, biasanya `http://localhost:5173/`.

### Skenario Pengujian

| No. | Skenario | Hasil yang Diharapkan |
|---|---|---|
| 1 | Membuka halaman aplikasi | Dashboard AC-CENTRA tampil dengan benar. |
| 2 | Menambahkan perangkat AC dengan ID, ruangan, dan daya yang valid | Perangkat berhasil ditambahkan. |
| 3 | Mengosongkan data wajib atau memasukkan daya nol, negatif, maupun teks | Sistem menolak input yang tidak valid. |
| 4 | Menambahkan ID perangkat yang sudah digunakan | Sistem menolak ID duplikat. |
| 5 | Mengubah status AC dari OFF menjadi ON | Status berubah dan waktu mulai tercatat. |
| 6 | Mengubah status AC dari ON menjadi OFF | Status berubah dan periode pemakaian selesai tercatat. |
| 7 | Memeriksa estimasi energi dan biaya | Perhitungan sesuai dengan daya, durasi, dan tarif yang digunakan. |
| 8 | Memeriksa riwayat atau rekap | Data pemakaian ditampilkan sesuai hasil pengujian. |
| 9 | Memuat ulang halaman browser | Data yang telah disimpan tetap tersedia pada browser dan origin yang sama. |
| 10 | Mencari perangkat berdasarkan ID atau nama ruangan | Daftar menampilkan perangkat yang cocok dengan kata kunci. |
| 11 | Mencari dengan variasi huruf besar/kecil | Pencarian tetap menemukan perangkat yang cocok tanpa membedakan kapitalisasi. |
| 12 | Memasukkan kata kunci yang tidak cocok | Sistem menampilkan `Data tidak ditemukan` dan tidak mengubah data perangkat. |
| 13 | Memilih filter ON atau OFF | Daftar hanya menampilkan perangkat dengan status yang dipilih. |
| 14 | Memilih filter OFF, kemudian mengubahnya ke Semua perangkat | Awalnya hanya perangkat OFF yang tampil; setelah reset, semua perangkat yang sesuai dengan pencarian saat ini tampil kembali. |
| 15 | Menggunakan pencarian dan filter status secara bersamaan | Daftar hanya menampilkan perangkat yang memenuhi pencarian dan filter status. |
| 16 | Mengunduh CSV tanpa pencarian/filter khusus | File CSV dapat dibuka, memiliki baris header, dan memuat data perangkat yang ditampilkan. |
| 17 | Mengunduh CSV setelah pencarian atau filter diterapkan | Isi CSV mengikuti data yang sedang ditampilkan setelah pencarian dan filter. |
| 18 | Memeriksa nilai numerik dalam CSV | Nilai numerik tidak menggunakan simbol mata uang atau pemisah ribuan. |
| 19 | Menjalankan kembali pengujian alur inti setelah Tugas 3 | Fitur alur inti tetap berfungsi sesuai hasil yang diharapkan. |

### Pencarian, Filter, dan Ekspor CSV

1. Ketik ID perangkat atau nama ruangan pada kolom pencarian untuk menyaring daftar secara langsung.
2. Pilih status **Semua perangkat**, **ON**, atau **OFF** untuk memfilter daftar.
3. Pencarian dan filter status dapat digunakan bersamaan. Memilih **Semua perangkat** menghapus filter status, tetapi kata kunci pencarian yang masih terisi tetap berlaku.
4. Jika tidak ada data yang cocok, aplikasi menampilkan `Data tidak ditemukan`.
5. Pilih **Unduh CSV** untuk mengunduh data yang sedang ditampilkan. Ekspor mengikuti hasil pencarian dan filter yang aktif, serta menyertakan baris header.
6. Nilai numerik pada CSV tidak menggunakan simbol mata uang atau pemisah ribuan. Status dan angka pada berkas tetap merupakan data simulasi/estimasi aplikasi, bukan pembacaan sensor atau pengukuran listrik aktual.

### Acuan Perhitungan

Estimasi konsumsi energi dihitung menggunakan rumus:

**Energi (kWh) = Daya AC (kW) × Durasi (jam)**

**Biaya (Rp) = Energi (kWh) × Tarif listrik (Rp/kWh)**

Contoh pengujian dengan daya AC 0,7 kW, durasi 1 jam, dan tarif Rp1.500/kWh:

- Energi: 0,7 × 1 = 0,7 kWh.
- Biaya: 0,7 × Rp1.500 = Rp1.050.

Angka tersebut merupakan estimasi berdasarkan asumsi pengujian, bukan hasil pengukuran listrik aktual.

### Pencatatan Hasil

Catat hasil aktual setiap skenario dengan status **Lulus** atau **Gagal**. Jika hasil tidak sesuai dengan yang diharapkan, masalah didokumentasikan dan melakukan perbaikan sebelum pengujian diulang. Pengujian dianggap selesai apabila seluruh persyaratan alur inti telah diperiksa dan hasil aktualnya terdokumentasi.

## Fitur

Fitur yang tersedia pada prototipe ini (pastikan setiap butir sudah diverifikasi pada versi kode yang akan dikumpulkan):

- Menampilkan daftar unit AC, informasi ruangan, daya, dan status simulasi.
- Menambahkan unit dengan validasi ID unik, nama ruangan wajib, dan daya berupa angka valid lebih besar dari nol.
- Menyimulasikan perubahan status ON/OFF.
- Mencatat riwayat perubahan status beserta waktu.
- Menghitung durasi periode ON yang telah selesai; periode dengan durasi nol atau negatif tidak dianggap sebagai periode selesai yang valid.
- Menampilkan estimasi konsumsi energi dan biaya listrik berdasarkan asumsi perhitungan.
- Menyimpan data di browser agar tetap tersedia setelah halaman dimuat ulang pada browser dan origin yang sama.
- Menampilkan rekap data yang telah disimpan.
- Mencari perangkat berdasarkan ID atau nama ruangan secara langsung, tanpa membedakan huruf besar dan kecil.
- Memfilter daftar perangkat berdasarkan status Semua perangkat, ON, atau OFF.
- Menggabungkan pencarian dan filter status sehingga hasil memenuhi kedua kriteria.
- Menampilkan pesan `Data tidak ditemukan` ketika tidak ada perangkat yang sesuai.
- Mengunduh data yang sedang ditampilkan ke CSV melalui tombol `Unduh CSV`, termasuk header dan hasil pencarian/filter yang aktif.
- Mengekspor nilai numerik ke CSV tanpa simbol mata uang atau pemisah ribuan.

## Batasan yang Diketahui

- Website belum mengendalikan AC fisik dan belum menerima telemetri dari perangkat IoT.
- Status ON/OFF merupakan data simulasi, bukan status aktual perangkat.
- Estimasi energi menggunakan asumsi daya dan durasi, bukan pengukuran langsung. Angka estimasi tidak membuktikan penghematan energi nyata.
- Penyimpanan direncanakan menggunakan `localStorage` browser dan harus diverifikasi setelah implementasi; data tidak otomatis tersinkron ke perangkat atau pengguna lain.
- Autentikasi produksi, basis data cloud, notifikasi perangkat nyata, dan kendali perangkat keras berada di luar cakupan versi awal.
- Jadwal otomatis dan kendali serentak seluruh unit bukan bagian dari alur inti versi pertama kecuali kelak diputuskan, diimplementasikan, dan diuji.

## Struktur Folder

Struktur berikut merupakan gambaran lokasi berkas yang digunakan atau direncanakan. Pastikan nama dan lokasi setiap berkas sesuai dengan struktur repositori aktual:

| File / folder | Isi |
|---|---|
| `README.md` | Pengenalan proyek dan petunjuk menjalankan aplikasi |
| `.gitignore` | Aturan file/folder yang diabaikan Git |
| `docs/` | Dokumen proses kerja: spesifikasi, rencana, kasus uji, log prompt, review, refleksi, dan bukti |
| `src/` | Kode sumber website, jika menggunakan struktur proyek tersebut |
| `tests/` atau folder uji yang ditetapkan | Pengujian otomatis, jika dibuat |
| `bughunt-kasir/` | Dokumen atau proyek terpisah untuk tugas Bug Hunt Kasir, sesuai struktur yang dipakai tim |
| `package.json` | Metadata proyek, dependensi, dan skrip perintah jika menggunakan Node.js |

## Link Demo

- **Repositori GitHub:** https://github.com/Danang-ykn/steampreneur-ac-centra
- **Demo website:** -

Sementara demo publik belum tersedia, aplikasi dapat dijalankan secara lokal dengan mengikuti petunjuk pada bagian *Cara Menjalankan (How to Run)*.

## Sumber dan Lisensi
Proyek ini menggunakan lisensi MIT.

| Nama                      | Sumber                     | Lisensi |
| ------------------------- | -------------------------- | ------- |
| Vite                      | https://vite.dev           | MIT     |
| Ikon SVG (chevron, trash) | Dibuat tim, inline di kode | MIT     |

Tidak ada font, gambar, atau aset eksternal lain yang digunakan.

### Sumber

- **Repositori proyek AC-CENTRA:** https://github.com/Danang-ykn/steampreneur-ac-centra
- **Teknologi pengembangan:** HTML, CSS, JavaScript, Node.js, npm, dan Vite sesuai konfigurasi proyek.
- **Acuan kebutuhan:** Proses validasi kebutuhan pengelolaan AC di SMK Negeri 1 Rejotangan serta spesifikasi dan kasus uji yang disusun untuk pengembangan prototipe.

### Lisensi

Proyek AC-CENTRA menggunakan MIT License. Lisensi ini mengizinkan penggunaan, penyalinan, modifikasi, penggabungan, publikasi, distribusi, pemberian sublisensi, dan penjualan salinan perangkat lunak, dengan tetap memenuhi ketentuan lisensi, termasuk mempertahankan pemberitahuan hak cipta dan lisensi.

Lihat berkas LICENSE pada repositori untuk ketentuan lengkap.

Copyright (c) 2026 Tim AC-CENTRA.

## Tim

| Nama | Peran |
|---|---|
| Danang | Logika aplikasi, simulasi status, riwayat, perhitungan, dan penyimpanan |
| Fahril | Antarmuka, daftar/formulir, dashboard/rekap, dan responsivitas |
| Nadira | Pengujian, dokumentasi, kasus uji, dan bukti pengujian |
| Semua anggota | Integrasi, review, dan memahami kode yang digunakan |
