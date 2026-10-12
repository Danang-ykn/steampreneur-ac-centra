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

## Cara Menjalankan (How to Run)

**Catatan:** Petunjuk menjalankan aplikasi ini merupakan rancangan awal dan akan disesuaikan setelah kerangka aplikasi dibuat. Perintah serta versi perangkat lunak akan dikonfirmasi berdasarkan konfigurasi proyek yang sebenarnya.

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
3. Setelah `package.json` tersedia, pasang dependensi sesuai konfigurasi proyek:
   ```bash
   npm install
   ```
4. Jalankan aplikasi menggunakan skrip yang tercantum pada `package.json`. Jika proyek menggunakan Vite dan memiliki skrip `dev`, perintahnya biasanya:
   ```bash
   npm run dev
   ```
5. Buka URL lokal yang dicetak oleh terminal. Untuk konfigurasi Vite standar, alamatnya biasanya `http://localhost:5173`, tetapi gunakan alamat yang benar-benar ditampilkan oleh terminal.

### Akun atau Data Contoh

Versi awal direncanakan menggunakan data contoh dan tidak memerlukan akun pengguna sungguhan. Jika autentikasi atau akun demo ditambahkan kemudian, dokumentasikan hanya kredensial demo yang aman dan memang tersedia di aplikasi. Jangan masukkan kata sandi pribadi atau data sungguhan.

### Jika Terjadi Masalah

- **Perintah `npm` tidak dikenali:** pastikan Node.js beserta npm telah terpasang, lalu tutup dan buka kembali terminal.
- **Dependensi belum ditemukan:** jalankan `npm install` dari folder yang berisi `package.json`.
- **Perintah `npm run dev` tidak tersedia:** periksa bagian `scripts` di `package.json` dan gunakan perintah yang benar untuk proyek.
- **Port sedang digunakan:** ikuti alamat alternatif yang ditampilkan oleh terminal atau hentikan proses lain yang menggunakan port tersebut.
- **Perubahan data tidak terlihat setelah halaman dimuat ulang:** periksa apakah penyimpanan lokal browser aktif dan apakah aplikasi menggunakan origin/browser yang sama. Data `localStorage` bersifat lokal pada browser dan origin terkait, bukan basis data cloud.

## Tangkapan Layar Alur Inti

Simpan bukti tangkapan layar aktual di folder `docs/bukti/`. Ganti nama/path contoh di bawah setelah gambar tersedia. Jangan mencantumkan tangkapan layar yang belum benar-benar dibuat atau yang tidak sesuai dengan versi aplikasi.

1. Daftar unit AC dan status: `docs/bukti/langkah-1.png`
2. Perubahan status simulasi dan riwayat: `docs/bukti/langkah-2.png`
3. Rekap durasi, estimasi energi, dan estimasi biaya: `docs/bukti/langkah-3.png`
4. Hasil fitur Change Request setelah selesai diimplementasikan: tambahkan bukti aktual di bagian ini.

## Cara Menjalankan Pengujian

## Fitur

Fitur yang direncanakan untuk alur inti:

- Menampilkan daftar unit AC, informasi ruangan, daya, dan status simulasi.
- Menambahkan unit dengan validasi ID unik, nama ruangan wajib, dan daya berupa angka valid lebih besar dari nol.
- Menyimulasikan perubahan status ON/OFF.
- Mencatat riwayat perubahan status beserta waktu.
- Memvalidasi input agar data unit tidak kosong atau memiliki ID duplikat.
- Menghitung durasi periode ON yang telah selesai; periode dengan durasi nol atau negatif tidak dianggap sebagai periode selesai yang valid.
- Menampilkan estimasi konsumsi energi dan biaya listrik berdasarkan asumsi perhitungan.
- Menyimpan data di browser agar tetap tersedia setelah halaman dimuat ulang pada browser dan origin yang sama.
- Menampilkan rekap data yang telah disimpan.

## Batasan yang Diketahui

- Website belum mengendalikan AC fisik dan belum menerima telemetri dari perangkat IoT.
- Status ON/OFF merupakan data simulasi, bukan status aktual perangkat.
- Estimasi energi menggunakan asumsi daya dan durasi, bukan pengukuran langsung. Angka estimasi tidak membuktikan penghematan energi nyata.
- Penyimpanan direncanakan menggunakan `localStorage` browser dan harus diverifikasi setelah implementasi; data tidak otomatis tersinkron ke perangkat atau pengguna lain.
- Autentikasi produksi, basis data cloud, notifikasi perangkat nyata, dan kendali perangkat keras berada di luar cakupan versi awal.
- Jadwal otomatis dan kendali serentak seluruh unit bukan bagian dari alur inti versi pertama kecuali kelak diputuskan, diimplementasikan, dan diuji.

## Struktur Folder

Struktur berikut adalah struktur yang direncanakan dan perlu disesuaikan dengan folder yang benar-benar ada di repositori:

| File / folder                            | Isi                                                                                            |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `README.md`                              | Pengenalan proyek dan petunjuk menjalankan aplikasi                                            |
| `.gitignore`                             | Aturan file/folder yang diabaikan Git                                                          |
| `docs/`                                  | Dokumen proses kerja: spesifikasi, rencana, kasus uji, log prompt, review, refleksi, dan bukti |
| `src/`                                   | Kode sumber website, jika menggunakan struktur proyek tersebut                                 |
| `tests/` atau folder uji yang ditetapkan | Pengujian otomatis, jika dibuat                                                                |
| `bughunt-kasir/`                         | Dokumen atau proyek terpisah untuk tugas Bug Hunt Kasir, sesuai struktur yang dipakai tim      |
| `package.json`                           | Metadata proyek, dependensi, dan skrip perintah jika menggunakan Node.js                       |

## Link Demo (Opsional)

Belum tersedia.

## Sumber dan Lisensi

Proyek ini menggunakan lisensi MIT.

| Nama                      | Sumber                     | Lisensi |
| ------------------------- | -------------------------- | ------- |
| Vite                      | https://vite.dev           | MIT     |
| Ikon SVG (chevron, trash) | Dibuat tim, inline di kode | MIT     |

Tidak ada font, gambar, atau aset eksternal lain yang digunakan.

## Tim

| Nama          | Peran                                                                   |
| ------------- | ----------------------------------------------------------------------- |
| Danang        | Logika aplikasi, simulasi status, riwayat, perhitungan, dan penyimpanan |
| Fahril        | Antarmuka, daftar/formulir, dashboard/rekap, dan responsivitas          |
| Nadira        | Pengujian, dokumentasi, kasus uji, dan bukti pengujian                  |
| Semua anggota | Integrasi, review, dan memahami kode yang digunakan                     |
