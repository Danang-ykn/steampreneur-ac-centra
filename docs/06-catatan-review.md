# Catatan Code Review

**Prompt review yang dipakai:**

> Lakukan review kode AC-CENTRA pada `src/main.js`, `src/style.css`, dan `index.html`. Periksa kesesuaian elemen HTML, selector CSS, perilaku fitur, responsivitas, fitur pencarian, filter status, ekspor CSV, serta potensi masalah pada penyimpanan data. Berikan saran perbaikan beserta alasan dan bagian kode yang terkait.

| No | Saran dari AI | Diterima / ditolak | Alasan | Bagian kode yang berubah |
|---|---|---|---|---|
| 1 | Memastikan pencarian, filter status ON/OFF, reset, dan ekspor CSV bekerja sesuai kebutuhan. | Diterima | Fitur telah diperiksa dan diuji. Pencarian dan filter dapat digunakan bersamaan, sedangkan CSV mengikuti data yang sedang ditampilkan. | `src/main.js` — `getVisibleDevices()`, `renderNav()`, `exportCSV()`, dan event listener. |
| 2 | Memeriksa dan menyesuaikan tampilan responsif pada desktop dan perangkat seluler. | Diterima | Pengujian manual telah dilakukan dan seluruh pemeriksaan tampilan yang direncanakan dinyatakan lulus. | `src/style.css` — aturan sidebar, navigasi, konten utama, modal, dan media query. |
| 3 | Memvalidasi struktur setiap perangkat yang dibaca dari `localStorage`. | Ditolak untuk lingkup pengerjaan saat ini | Fitur utama telah diuji menggunakan data aplikasi yang normal. Validasi tambahan untuk data tersimpan yang tidak sesuai struktur belum menjadi kebutuhan utama Change Request Tugas 3 dan dapat dipertimbangkan sebagai pengembangan berikutnya. | Belum ada perubahan kode. |
| 4 | Menambahkan penanganan error jika penyimpanan `localStorage` gagal. | Ditolak untuk lingkup pengerjaan saat ini | Penanganan error penyimpanan merupakan peningkatan ketahanan aplikasi, tetapi bukan bagian utama dari kebutuhan pencarian, filter, dan ekspor CSV pada Tugas 3. | Belum ada perubahan kode. |
