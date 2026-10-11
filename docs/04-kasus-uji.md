# Kasus Uji — AC-CENTRA

**Nama produk:** AC-CENTRA — Sistem Monitoring dan Kendali AC Terpusat Berbasis IoT untuk Efisiensi Pengelolaan Energi di Industri

## Tabel Rencana kasus uji (diisi sebelum coding) dan Hasil pengujian (diisi setelah website dijalankan)

| ID | Kriteria yang diuji | Langkah / input | Hasil yang diharapkan | Hasil sebenarnya | Lulus? | Bukti (nama file tangkapan layar/log) |
|---|---|---|---|---|---|---|
| U01 | Daftar unit AC ditampilkan | Buka website dan lihat daftar unit AC. | Daftar menampilkan ID unit, nama ruangan, daya, dan status simulasi ON/OFF. Jika belum ada unit, tampilkan keadaan kosong yang jelas atau data contoh yang dijelaskan di README. | Belum diuji | Belum diuji | Belum ada |
| U02 | Validasi input wajib | Buka formulir tambah unit. Kosongkan ID unit atau nama ruangan, lalu tekan Simpan. Uji juga daya kosong/tidak valid jika kolom daya disediakan. | Data tidak disimpan jika ID atau nama ruangan kosong. Daya harus berupa angka valid lebih besar dari nol. Pesan validasi jelas dan pengguna dapat memperbaiki input. | Belum diuji | Belum diuji | Belum ada |
| U03 | ID unit harus unik | Tambahkan unit dengan ID `AC-001`, kemudian coba tambahkan unit kedua dengan ID `AC-001`. | Unit kedua ditolak atau pengguna diminta menggunakan ID lain. Tidak ada dua unit dengan ID sama. | Belum diuji | Belum diuji | Belum ada |
| U04 | Batas aturan waktu | Uji fungsi logika/perhitungan dengan waktu mulai dan waktu selesai yang sama, lalu pastikan kasus waktu selesai lebih awal juga ditolak. Jika pengujian tidak tersedia melalui UI, lakukan melalui unit test atau cara pengujian logika yang sesuai dengan implementasi. | Periode dengan durasi nol atau negatif tidak dianggap sebagai periode penggunaan selesai yang valid. Tidak muncul durasi negatif atau catatan pemakaian keliru. | Belum diuji | Belum diuji | Belum ada |
| U05 | Perubahan status OFF ke ON dicatat | Pilih satu unit berstatus OFF, lalu ubah menjadi ON. | Status simulasi menjadi ON dan waktu mulai dicatat. Tidak ada klaim bahwa AC fisik benar-benar menyala. | Belum diuji | Belum diuji | Belum ada |
| U06 | Perubahan status ON ke OFF menghasilkan durasi | Setelah U05, ubah unit yang sama dari ON menjadi OFF, lalu periksa riwayat. | Status simulasi menjadi OFF; waktu selesai dicatat; durasi dihitung dari waktu mulai hingga waktu selesai dan ditampilkan secara konsisten. | Belum diuji | Belum diuji | Belum ada |
| U07 | Perhitungan energi dan biaya dengan nilai acuan | Uji fungsi perhitungan dengan daya 0,7 kW, durasi tepat 1 jam, dan tarif asumsi Rp1.500/kWh. Bandingkan dengan perhitungan acuan di bawah. | Energi = 0,7 kW × 1 jam = **0,7 kWh**. Biaya = 0,7 kWh × Rp1.500/kWh = **Rp1.050**. Hasil diberi label estimasi. | Belum diuji | Belum diuji | Belum ada |
| U08 | Status yang sama tidak membuat riwayat duplikat | Pilih unit berstatus ON dan lakukan tindakan yang meminta status ON lagi, jika antarmuka memungkinkan. Jika UI mencegah tindakan itu, catat perilaku pencegahan tersebut. | Tidak ada catatan transisi atau periode penggunaan palsu ketika status tidak berubah. | Belum diuji | Belum diuji | Belum ada |
| U09 | Data bertahan setelah halaman dimuat ulang | Tambahkan unit dan selesaikan satu perubahan status. Muat ulang halaman pada browser yang sama. | Data unit dan riwayat yang sudah disimpan tetap tersedia. | Belum diuji | Belum diuji | Belum ada |
| U10 | Rekap sesuai data dan label estimasi | Selesaikan satu periode ON/OFF, lalu buka rekap. Periksa durasi, energi, dan biaya. | Rekap konsisten dengan riwayat dan rumus. Energi/biaya ditandai sebagai estimasi, bukan data sensor atau AC fisik. | Belum diuji | Belum diuji | Belum ada |
| U11 | Tampilan responsif | Buka website pada ukuran layar laptop/PC dan smartphone, atau gunakan mode responsif browser. | Informasi utama, tombol, status, dan rekap terbaca dan dapat digunakan tanpa elemen penting terpotong. | Belum diuji | Belum diuji | Belum ada |

## Perhitungan acuan

Untuk U07:
- Daya: 0,7 kW
- Durasi: 1 jam
- Energi: 0,7 × 1 = **0,7 kWh**
- Tarif asumsi: Rp1.500/kWh
- Biaya: 0,7 × Rp1.500 = **Rp1.050**

Angka tersebut adalah nilai acuan untuk menguji rumus aplikasi. Daya 0,7 kW dan tarif Rp1.500/kWh merupakan asumsi yang disebutkan dalam wawancara, bukan hasil pengukuran setiap unit AC.

## Unit test otomatis (jika dibuat)

- **Nama file test:** 
- **Jumlah test:** 
- **Hasil:** 