# Rencana Kerja — AC-CENTRA

**Waktu mulai yang direncanakan:** 12 Oktober 2026, pukul 08.00 WIB  
**Batas akhir pengumpulan:** 15 Oktober 2026, pukul 16.00 WIB  
**Nama produk:** AC-CENTRA — Sistem Monitoring dan Kendali AC Terpusat Berbasis IoT untuk Efisiensi Pengelolaan Energi di Industri

## Prinsip pengerjaan

### Pembagian perantrgtdrff

- **Danang — logika aplikasi:** aturan bisnis, status simulasi, riwayat, perhitungan, dan penyimpanan.
- **Fahril — antarmuka (UI):** struktur halaman, daftar unit, formulir tambah unit, dashboard/rekap, dan tampilan responsif.
- **Nadira — pengujian dan dokumentasi:** kasus uji, bukti pengujian, README, dan dokumen challenge.
- **Semua anggota:** integrasi, review, pengujian bersama, dan memahami kode yang dikumpulkan.

## Rencana kerja

| No. | Langkah | Penanggung jawab | Kriteria selesai | Estimasi | Waktu aktual | Status |
|---:|---|---|---|---:|---|---|
| 1 | Finalisasi dokumen awal dan commit persiapan | Nadira; ditinjau semua anggota | `01-spesifikasi.md`, rencana kerja, dan Bagian A `04-kasus-uji.md` konsisten; `README.md` awal dan `.gitignore` tersedia; commit awal mengikuti instruksi challenge | 45 menit | Diisi saat dikerjakan | Belum mulai |
| 2 | Checkpoint 1: spesifikasi siap | Semua anggota; Nadira memeriksa dokumen | Spesifikasi, rencana, dan rencana kasus uji selesai; commit dengan pesan persis `checkpoint: spesifikasi, kasus uji, dan rencana selesai` telah dibuat dan di-push. Belum ada commit kode website sebelum checkpoint ini. | Termasuk langkah 1 | Diisi saat dikerjakan | Belum mulai |
| 3 | Membuat kerangka proyek (scaffolding) | Fahril + Danang | Proyek dapat dijalankan dan dibuka di browser; struktur folder jelas; tidak ada rahasia/API key dalam repositori | 45 menit | Diisi saat dikerjakan | Belum mulai |
| 4 | Membuat UI daftar unit dan formulir tambah unit | Fahril | Daftar menampilkan ID, ruangan, daya, dan status simulasi; formulir tambah unit dapat digunakan; keadaan kosong jelas | 60 menit | Diisi saat dikerjakan | Belum mulai |
| 5 | Validasi data unit | Danang; UI oleh Fahril | ID dan nama ruangan wajib diisi; ID duplikat ditolak; daya harus angka valid lebih besar dari nol | 45 menit | Diisi saat dikerjakan | Belum mulai |
| 6 | Simulasi ON/OFF dan riwayat | Danang | OFF→ON mencatat waktu mulai; ON→OFF mencatat waktu selesai; status yang sama tidak membuat riwayat transisi palsu | 60 menit | Diisi saat dikerjakan | Belum mulai |
| 7 | Perhitungan durasi, energi, dan biaya | Danang | Durasi dihitung dari waktu mulai/selesai; uji acuan 0,7 kW × 1 jam menghasilkan 0,7 kWh dan Rp1.050 pada tarif Rp1.500/kWh; hasil diberi label estimasi | 60 menit | Diisi saat dikerjakan | Belum mulai |
| 8 | Penyimpanan dan rekap | Danang + Fahril | Data unit dan riwayat tersimpan di `localStorage`, bertahan setelah reload, dan rekap sesuai data tersimpan | 60 menit | Diisi saat dikerjakan | Belum mulai |
| 9 | Integrasi UI dan responsivitas | Fahril + Danang | Alur daftar → perubahan status → riwayat/rekap berfungsi; diperiksa pada laptop/PC dan smartphone | 45 menit | Diisi saat dikerjakan | Belum mulai |
| 10 | Pengujian alur inti (U01–U11) | Nadira; perbaikan oleh Danang/Fahril | Semua kasus yang direncanakan dijalankan; hasil sebenarnya, status lulus/gagal, dan bukti diisi berdasarkan hasil nyata | 60 menit | Diisi saat dikerjakan | Belum mulai |
| 11 | Perbaikan bug dan pengujian ulang | Danang + Fahril; verifikasi Nadira | Temuan diperbaiki; kasus terkait dijalankan ulang; status lulus didukung bukti | 60 menit | Diisi saat dikerjakan | Belum mulai |
| 12 | Checkpoint 2 dan analisis Change Request | Semua anggota; Nadira memeriksa dokumen | Alur inti versi pertama berfungsi; commit dengan pesan persis `checkpoint: versi pertama alur inti berjalan` dibuat dan di-push. Dokumen `docs/analisis-change-request.md` menjelaskan pencarian, filter, ekspor CSV, dampak, dan rencana pengujian. | 45 menit | Diisi saat dikerjakan | Belum mulai |
| 13 | Change Request: pencarian, filter, ekspor CSV | Fahril (UI), Danang (logika), Nadira (uji) | Pencarian dan filter berfungsi; ekspor CSV sesuai data dan filter yang dipilih | 90 menit | Diisi saat dikerjakan | Belum mulai |
| 14 | Pengujian Change Request dan regresi | Nadira; perbaikan Danang/Fahril | Kasus uji fitur baru ditambahkan; kasus inti terdampak diuji ulang; hasil dan bukti dicatat | 60 menit | Diisi saat dikerjakan | Belum mulai |
| 15 | Bug Hunt Web Kasir (aplikasi terpisah) | Semua anggota | Dikerjakan selama 60 menit pada aplikasi Web Kasir yang terpisah dari AC-CENTRA; bug dicatat, diperbaiki, diuji, penyebab ditulis, dan tiap bug memiliki commit terpisah sesuai instruksi. Commit `bughunt: kode asli` dibuat paling lambat 60 menit sebelum tenggat. | 60 menit | Diisi saat dikerjakan | Belum mulai |
| 16 | Dokumentasi, refleksi, dan penjelasan kode | Nadira; kontribusi semua anggota | README dapat diikuti; log prompt, catatan review, kesalahan AI, refleksi, dan penjelasan kode dilengkapi; setiap anggota siap menjelaskan minimal dua bagian kode berbeda | 75 menit | Diisi saat dikerjakan | Belum mulai |
| 17 | Pemeriksaan akhir dan pengumpulan | Semua anggota; Nadira memeriksa | Dokumen/commit wajib tersedia; tidak ada rahasia; aplikasi dapat dijalankan mengikuti README; bukti pengujian siap sebelum tenggat | 30 menit | Diisi saat dikerjakan | Belum mulai |

## Ruang lingkup alur inti versi pertama

Alur inti mencakup:
1. Menampilkan daftar unit AC atau keadaan kosong.
2. Menambahkan unit dengan validasi ID unik, nama ruangan, dan daya.
3. Mengubah status ON/OFF simulasi pada satu unit.
4. Mencatat waktu mulai/selesai dan menghitung durasi periode yang selesai.
5. Menghitung estimasi energi/biaya.
6. Menyimpan data menggunakan `localStorage` dan menampilkan rekap.

Batasan yang dijaga:
- Website tidak terhubung ke ESP8266 atau AC fisik.
- Status ON/OFF adalah simulasi, bukan bukti kendali AC fisik.
- Penjadwalan otomatis dan tombol “Matikan Semua AC” bukan bagian dari alur inti.
- Pencarian, filter, dan ekspor CSV baru dikerjakan setelah Checkpoint 2 sebagai Change Request.