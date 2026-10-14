# Penjelasan Kode AC-CENTRA

# Anggota 1 — Danang

### Penjelasan 1: Form tambah perangkat dan validasi
- **File dan fungsi:** `src/main.js` — `showAddModal()`
- **Apa yang dilakukan:** Fungsi ini menampilkan form tambah perangkat dengan isian ID, nama ruangan, dan daya AC (kW). Saat form dikirim, program membaca data dengan `FormData` dan memvalidasi isian. ID wajib diisi, ruangan wajib diisi, ID tidak boleh duplikat (pemeriksaan tidak membedakan huruf besar/kecil), dan daya harus berupa angka lebih besar dari 0.
- **Kenapa dibuat seperti ini:** Perangkat perlu memiliki identitas, lokasi, dan daya agar dapat ditampilkan dan dipakai dalam perhitungan estimasi energi.
- **Contoh:** ID `AC-001`, ruangan `Lab Elektronika`, daya `0.7` dapat disimpan jika ID belum digunakan. Status awal perangkat adalah `OFF`.
- **Jika input salah atau kosong:** ID kosong menampilkan `ID wajib diisi.`; ruangan kosong menampilkan `Nama ruangan wajib diisi.`; ID duplikat meminta ID lain; daya kosong, tidak valid, nol, atau negatif menampilkan `Daya AC harus berupa angka lebih besar dari 0 kW.`.

### Penjelasan 2: Penyimpanan data perangkat
- **File dan fungsi:** `src/main.js` — `saveDevices(devices)`
- **Apa yang dilakukan:** Fungsi mengubah array perangkat menjadi JSON menggunakan `JSON.stringify()` lalu menyimpannya di `localStorage` dengan kunci `accentra.devices.v1`. Fungsi `loadDevices()` membaca data tersebut saat aplikasi dimuat.
- **Kenapa dibuat seperti ini:** `localStorage` membuat data tetap tersedia setelah halaman dimuat ulang pada browser yang sama.
- **Contoh:** Setelah `AC-001` berhasil ditambahkan, daftar `devices` disimpan. Saat aplikasi dimuat ulang, `loadDevices()` mencoba membaca daftar itu kembali.
- **Jika input salah atau kosong:** Validasi form dilakukan di `showAddModal()`, bukan di `saveDevices()`. Pada kode yang ditinjau, `saveDevices()` belum menangani secara khusus kegagalan penulisan ke `localStorage`; hal ini bisa menjadi peningkatan berikutnya.

# Anggota 2 — Fahril

### Penjelasan 1: Pencarian dan filter perangkat
- **File dan fungsi:** `src/main.js` — `getVisibleDevices()`
- **Apa yang dilakukan:** Fungsi menghasilkan daftar perangkat yang cocok dengan kata kunci dan filter status. Kata kunci di-trim dan diubah menjadi huruf kecil; pencarian mencocokkan ID atau nama ruangan. Filter status dapat berupa `ALL`, `ON`, atau `OFF`. Hasil harus cocok dengan pencarian dan filter sekaligus.
- **Kenapa dibuat seperti ini:** Logika filter dipisahkan dari tampilan sehingga daftar dan ekspor CSV dapat menggunakan hasil penyaringan yang sama.
- **Contoh:** Kata kunci `lab` dan filter `OFF` hanya menampilkan perangkat yang ID atau ruangannya mengandung `lab` dan statusnya `OFF`.
- **Jika input salah atau kosong:** Kata kunci kosong dengan filter `ALL` mengembalikan semua perangkat. Jika tidak ada kecocokan, hasilnya array kosong.

### Penjelasan 2: Tampilan daftar perangkat
- **File dan fungsi:** `src/main.js` — `renderNav()`
- **Apa yang dilakukan:** Fungsi memperbarui elemen `#device-nav` berdasarkan hasil `getVisibleDevices()`. Fungsi menampilkan item perangkat, memasang event klik untuk memilih perangkat dan menghapus perangkat, serta menampilkan `Data tidak ditemukan` jika perangkat tersedia tetapi tidak ada yang cocok dengan pencarian/filter.
- **Kenapa dibuat seperti ini:** Daftar harus diperbarui ketika pengguna mengetik, memilih filter, atau mengubah data. Pesan hasil kosong membantu pengguna memahami hasil pencarian.
- **Contoh:** Jika perangkat `AC-001` berada di `Lab Elektronika` lalu pengguna mencari `kantin`, daftar menampilkan `Data tidak ditemukan`.
- **Jika input salah atau kosong:** Jika belum ada perangkat sama sekali, elemen daftar dikosongkan. Jika perangkat ada tetapi tidak cocok dengan pencarian/filter, pesan `Data tidak ditemukan` ditampilkan.

# Anggota 3 — Nadira

### Penjelasan 1: Ekspor CSV
- **File dan fungsi:** `src/main.js` — `exportCSV()` dan `csvCell()`
- **Apa yang dilakukan:** `exportCSV()` mengekspor hasil `getVisibleDevices()`, jadi data yang diekspor mengikuti pencarian dan filter aktif. Kolomnya adalah ID, Ruangan, Daya (kW), Status (simulasi), dan Estimasi Biaya (Rp). Berkas diunduh sebagai `accentra-perangkat.csv`. `csvCell()` menangani nilai yang mengandung koma, tanda kutip, atau baris baru agar struktur CSV tetap terbaca.
- **Kenapa dibuat seperti ini:** Pengguna dapat menyimpan data yang sedang dilihat untuk diperiksa di aplikasi spreadsheet.
- **Contoh:** Jika hanya `AC-001` yang terlihat, data yang diekspor mengikuti hasil itu. Nilai biaya ditulis sebagai angka seperti `15000`, bukan `Rp15.000`.
- **Jika input salah atau kosong:** Jika tidak ada perangkat yang terlihat, program menampilkan `Tidak ada data yang tampil untuk diunduh.` dan tidak mengunduh berkas.

### Penjelasan 2: Simulasi status dan estimasi energi
- **File dan fungsi:** `src/main.js` — `toggleStatus(id)` dan `calcRekap(device)`
- **Apa yang dilakukan:** `toggleStatus()` mengubah status `OFF` menjadi `ON` dan mencatat `currentStart`. Saat diubah dari `ON` menjadi `OFF`, program menghitung durasi dalam jam, energi (`powerKw × durationH`), dan biaya (`energyKwh × TARIF_RP_PER_KWH`), lalu menyimpan sesi ke riwayat. `calcRekap()` menjumlahkan durasi, energi, dan biaya dari riwayat.
- **Kenapa dibuat seperti ini:** Lama penggunaan dapat digunakan untuk membuat estimasi konsumsi energi dan biaya yang ditampilkan pada dashboard.
- **Contoh:** AC `0.7` kW yang disimulasikan menyala selama 2 jam menghasilkan estimasi `1.4 kWh`. Dengan tarif Rp1.500/kWh, estimasi biaya adalah Rp2.100. Ini contoh hitungan, bukan pengukuran listrik aktual.
- **Jika input salah atau kosong:** Jika ID tidak ditemukan, fungsi berhenti. Jika waktu selesai tidak lebih akhir daripada waktu mulai, program menampilkan peringatan dan tidak menyimpan sesi tersebut. Fitur ini tetap berupa simulasi, bukan kendali AC fisik.

## Bagian B: Pertanyaan yang dijawab bersama

### 1. Jika aturan bisnis berubah, file dan fungsi mana yang harus diubah?
Contoh: tarif berubah dari Rp1.500/kWh menjadi Rp1.700/kWh. Di `src/main.js`, konstanta `TARIF_RP_PER_KWH` perlu diperiksa. `toggleStatus()` memakai tarif untuk menghitung biaya sesi baru. `calcRekap()` menjumlahkan biaya yang tersimpan di riwayat; mengganti konstanta saja tidak menghitung ulang biaya lama karena setiap sesi sudah menyimpan `costRp`. Tim perlu menentukan apakah tarif baru berlaku untuk sesi berikutnya saja atau juga untuk riwayat lama.

### 2. Bagaimana data mengalir dari form sampai tampil di layar?
1. `index.html` menyediakan `#app` dan memuat `src/main.js`.
2. `src/main.js` membangun antarmuka, termasuk tombol `#add-device`.
3. Klik tombol memanggil `showAddModal()`.
4. Saat form dikirim, `showAddModal()` membaca `FormData` dan memvalidasi ID, ruangan, serta daya.
5. Jika valid, perangkat ditambahkan ke array `devices` dengan status awal `OFF`.
6. `saveDevices(devices)` menyimpan daftar ke `localStorage`; `saveSelectedId(selectedId)` menyimpan pilihan perangkat.
7. `renderNav()` memperbarui daftar, dan `renderMain()` menampilkan detail perangkat yang dipilih.
8. `src/style.css` mengatur tampilan dan tata letak; CSS tidak melakukan validasi atau perhitungan.

### 3. Pilih satu unit test. Apa yang diuji dan kapan gagal?
**Kondisi saat ini:** pengujian yang dilakukan tim adalah manual; dokumen ini tidak mengklaim bahwa unit test otomatis sudah tersedia.

Contoh kasus uji manual untuk validasi daya:
- **Langkah:** buka form tambah perangkat, isi ID `AC-002`, ruangan `Lab Elektronika`, dan daya `0`.
- **Hasil yang diharapkan:** perangkat tidak disimpan dan pesan `Daya AC harus berupa angka lebih besar dari 0 kW.` muncul.
- **Pengujian gagal jika:** perangkat dengan daya `0` tetap tersimpan atau pesan validasi tidak muncul.

### 4. Pilih satu saran AI yang ditolak. Apa sarannya dan mengapa?
Salah satu saran dari peninjauan kode adalah menambahkan penanganan khusus jika penyimpanan data ke localStorage gagal, misalnya ketika browser tidak mengizinkan penyimpanan atau kapasitas penyimpanan tidak tersedia. Pada versi kode yang kami tinjau, fungsi saveDevices() masih langsung menjalankan localStorage.setItem() dan belum memiliki penanganan khusus untuk kondisi tersebut.

Saran itu belum kami terapkan pada tahap pengerjaan ini karena fokus utama kami adalah menyelesaikan dan menguji fitur yang diminta, terutama tambah perangkat, pencarian, filter, dan ekspor CSV. Kami melakukan pengujian manual pada alur utama aplikasi. Namun, kami memahami bahwa penanganan kegagalan penyimpanan tetap penting untuk meningkatkan ketahanan aplikasi dan dapat menjadi pengembangan berikutnya.

### 5. Bagian kode mana yang paling sulit dipahami dan bagaimana akhirnya dipahami?
Bagian yang paling sulit dipahami adalah hubungan HTML, JavaScript, dan CSS:
- **HTML** menyediakan elemen/struktur antarmuka.
- **JavaScript** membangun atau memperbarui elemen, menangani klik dan input, memvalidasi serta menyimpan data, dan menghitung estimasi.
- **CSS** mengatur warna, jarak, ukuran, dan tata letak.

Contohnya, event listener pada tombol `#add-device` memanggil `showAddModal()`. Fungsi tersebut membuat form; setelah data valid, JavaScript menyimpan perangkat lalu memanggil `renderNav()` dan `renderMain()` untuk memperbarui tampilan. CSS mengatur bagaimana elemen itu terlihat. Alur ini dipahami dengan menelusuri elemen antarmuka, event listener, fungsi, perubahan data, dan hasil di browser.
