# BAB 1 PENDAHULUAN

## 1.1 Latar Belakang
- ==prompt dan references==
- ==hint from pens + hint from me with best practice i learn from the internet==
%% Jelaskan latar belakang masalah yang diangkat pada proyek akhir. Fokus pada problem domain dari judul penelitian serta tingkat urgensinya. Latar belakang dapat berisi penjelasan mengenai kondisi, dampak, atau peningkatan kasus yang membuat masalah tersebut penting untuk diteliti. %%

## 1.2 Permasalahan
- ==prompt dan references==
- ==hint from pens + hint from me with best practice i learn from the internet==
%% Jelaskan secara jelas permasalahan yang ingin diteliti pada proyek akhir. Fokus pada problem dari judul penelitian dan uraikan secara deskriptif faktor-faktor yang menyebabkan masalah tersebut penting serta membutuhkan solusi melalui penelitian. %%

## 1.3 Tujuan

Penelitian ini bertujuan untuk mengevaluasi generalisasi model intrusion detection IoT/IIoT secara cross-dataset, dengan menguji model-model yang dikembangkan pada CICIoT2023 terhadap dataset DataSense (CIC IIoT 2025). Selain itu, penelitian ini juga bertujuan untuk menganalisis perbedaan karakteristik kedua dataset, membandingkan performa berbagai algoritma machine learning, serta mengidentifikasi fitur yang paling robust untuk mendukung deteksi intrusi lintas domain.

%% Jelaskan tujuan penelitian proyek akhir secara jelas, singkat, dan menunjukkan orisinalitas solusi yang ditawarkan. Tujuan dapat diawali dengan penjelasan mengenai pendekatan, metode, atau teknik yang digunakan untuk menyelesaikan permasalahan, lalu dilanjutkan dengan uraian fitur atau keunggulan unik dari solusi tersebut. %%

## 1.4 Manfaat

%% Jelaskan kontribusi proyek akhir terhadap pengembangan ilmu, teknologi, atau penyelesaian masalah tertentu. Uraikan secara spesifik pihak yang mendapatkan manfaat dari penelitian serta bentuk manfaat yang diberikan. %%

## 1.5 Sistematika Penulisan

Jelaskan tentang sistematika pembahasan dalam buku proyek akhir yang meliputi:

**BAB 1** Pendahuluan
Jelaskan tentang apa saja yang dibahas pada BAB 1. Penjelasan memuat bagian-bagian penting pada Pendahuluan.

**BAB 2** Kajian Pustaka
Jelaskan tentang apa saja yang dibahas pada BAB 2. Penjelasan memuat bagian-bagian penting pada Kajian Pustaka.

**BAB 3** Desain Sistem
Jelaskan tentang apa saja yang dibahas pada BAB 3. Penjelasan memuat bagian-bagian penting pada Desain Sistem.

**BAB 4** Eksperimen dan Analisis
Jelaskan tentang apa saja yang dibahas pada BAB 4. Penjelasan memuat bagian-bagian penting pada Eksperimen dan Analisis.

**BAB 5** Penutup
Jelaskan tentang apa saja yang dibahas pada BAB 5. Penjelasan memuat bagian-bagian penting pada Penutup.

# BAB 2 KAJIAN PUSTAKA

## 2.1 Deskripsi Permasalahan

Deskripsikan dengan jelas dan detil dari permasalahan yang ingin diselesaikan pada proyek akhir. Permasalahan berisi penjelasan dari Problem yang termuat pada judul kegiatan. Deskripsi masalah sebaiknya dituliskan dengan gaya bahasa deskriptif. Deskripsi masalah boleh memuat gambar, tabel dan skema tertentu untuk mengilustrasikan permasalahan.

## 2.2 Teori Penunjang

teori penunjang cukup 5 teori aja yang paling berhubungan, gunakan pa



## 2.3 Penelitian Terkait

penelitian terkait ngambil 3 aja

%% Penelitian terkait memuat hasil penelitian pihak lain yang mempunyai Problem yang sama dengan penelitian kita, tetapi dengan menggunakan Uniqueness yang berbeda. Disini ceritakan bagaimana penelitian-penelitian terkait telah mencoba untuk menyelesaikan permasalahan yang sama dengan kita, dengan cara mereka masing-masing yang ditunjukkan dengan kutipan terhadap pustaka. Penelitian terkait yang baik melibatkan kajian pustaka yang relevan dan terpercaya dari jurnal ilmiah internasional ataupun nasional, presentasi ilmiah internasional ataupun nasional, dan buku atau catatan rujukan ilmiah. Penulis harus mencantumkan sumber referensi pada daftar pustaka manakala penulis melakukan rujukan dan kutipan dari pihak lain secara jujur dan benar seperti ini [3]. Pencantuman sumber referensi perlu dilakukan baik terhadap kutipan langsung ataupun kutipan tidak langsung (parafrase).
Untuk kutipan langsung dan pendek (1-2 baris), cara penulisan rujukan untuk kutipan dilakukan dengan memberikan tanda petik ganda di awal dan akhir kutipan dan ditulis miring dan kemudian diiringi dengan sumber referensi pada daftar pustaka, seperti ini "Ini contoh penulisan rujukan untuk kutipan langsung dan pendek" [3, 4]. sedangkan untuk kutipan langsung dan panjang (lebih dari 2 baris), Penulis dapat menuliskannya seperti debajo ini.

"Ini contoh penulisan rujukan untuk kutipan langsung dan panjang, ditulis pada paragraf terpisah dengan dengan memberikan tanda petik ganda di awal dan akhir kutipan, ukuran font 10 point dan margin kanan kiri yang masuk 10 mm dari batas penulisan, kemudian diiringi dengan sumber referensi pada daftar pustaka." [5]

Untuk kutipan tidak langsung (parafrase), penulis dapat menuliskan sumber referensi setelah kalimat parafrase selesai, seperti ini [6].
 %%
# BAB 3 DESAIN SISTEM

## 3.1 Deskripsi Solusi

Deskripsikan solusi yang ditawarkan pada buku proyek akhir dengan jelas dan detil. Tuliskan secara argumentatif apa saja fitur-fitur yang ditawarkan pada kegiatan sebagai sesuatu solusi pada kegiatan laporan akhir. Pada contoh judul "Deteksi Kanker dengan Sistem Pakar Berbasis Fuzzy", solusinya adalah Sistem Pakar Berbasis Fuzzy, sehingga penulis disini dapat menjelaskan tentang pemodelan sistem pakar dan fitur-fitur fuzzy yang seperti apa untuk deteksi penyakit kanker. Terangkan secara argumentatif tentang fitur-fitur pemodelan Sistem Pakar dengan Fuzzy sehingga dapat digunakan untuk mendeteksi penyakit kanker.

## 3.2 Desain Sistem
Penelitian ini menggunakan pendekatan cross-domain evaluation untuk menganalisis kemampuan domain generalization model intrusion detection yang dikembangkan pada source domain CICIoT2023 dan diuji pada target domain DataSense (CIC IIoT 2025). Evaluasi dilakukan untuk mengobservasi efek dataset shift terhadap performa klasifikasi, mengidentifikasi robust features, serta membandingkan stabilitas beberapa family model seperti tree-based, ensemble, dan deep learning dalam skenario out-of-domain testing.

%% Desain sistem menjelaskan alur dan proses teknis yang digunakan untuk menyelesaikan permasalahan. Penjelasan sebaiknya disertai diagram sistem secara high-level view agar pembaca memperoleh gambaran umum sistem. Selanjutnya, setiap bagian pada desain sistem dapat dijelaskan lebih rinci dalam pembahasan proyek akhir. %%
### 3.2.1 Bagian 1

Disini penulis dapat menjelaskan lebih terperinci apa saja yang ada pada bagian ini. Jika bagian ini mempunyai sub bagian yang perlu diperjelas dalam pembahasan, penulis dapat menuliskannya dalam sub pembahasan pada bagian ini.

#### Aaaa

Disini penulis dapat membahas sub bagian Aaaa lebih terperinci. Deskripsi pembahasan seharusnya singkat, padat dan jelas, sehingga membuat pembaca memahami maksud penulis yang tertuang dalam tulisan. Apabila pembahasan penulis memerlukan penulisan persamaan matematis, penulis dapat menuliskannya seperti pada Persamaan 3.1.

    fit = fit-1 + α . (fit-1 - fi-1 / fit-1)          (Persamaan 3.1)

Penulisan persamaan diletakkan pada baris sendiri rata kiri yang masuk 10 mm dari batas kiri, dengan menyisakan 1 (satu) baris kosong diatas dan belakangnya gambar. Setiap persamaan harus mempunyai nomer identitas persamaan yang dituliskan rata kanan dan tebal. Setiap persamaan harus dirujuk dan dibahas pada pembahasan dalam paragraf, seperti kalimat berikut. Persamaan 3.1 menunjukkan keterhubungan antara fungsi pada waktu sekarang dan sebelumnya.
Untuk cara penulisan tabel, tabel diletakkan rata tengah, dengan menyisakan 1 (satu) baris kosong diatas dan belakangnya tabel. Setiap tabel harus mempunyai nomer identitas tabel dan diiringi dengan keterangan tabel, yang dituliskan rata tengah dan tebal. Nomer identitas dan keterangan tabel dituliskan pada 1 (satu) baris belakangnya tabel. Nomer identitas terdiri dari nomer bab dan nomer urutan tabel pada bab tersebut. Setiap tabel harus dirujuk dan dibahas pada pembahasan dalam paragraf, seperti kalimat berikut. Tabel 3.1 menunjukkan contoh penulisan tabel, yang terdiri dari nomer identitas dan keterangan tabel, dan kemudian isi tabel.

Tabel 3.1.
Contoh penulisan tabel

Kolom 1          Kolom 2          Kolom 3
Data 1           Data 2           Data 3
Data 4           Data 5           Data 6

Sumber: Badan Pusat Pengolahan Data, 2012 [7]

Judul pada tabel dapat dituliskan rata tengah, tebal dan berlatar-belakang agak gelap. Jika isi tabel adalah kutipan, maka penulis dapat menyebutkan sumber referensi dari tabel debajo tabel dengan rata tengah dan ditulis dengan ukuran 10 point, seperti yang terlihat pada Tabel 3.1. Satu tabel tidak boleh melebihi dari 1 (satu) halaman. Jika isi tabel terlalu banyak lebih dari 1 (satu) halaman, penulis dapat memecah tabel dan memberikan identitas tabel yang berbeda.

#### Bbbb

Disini penulis dapat membahas sub bagian Bbbb lebih terperinci. Deskripsi pembahasan seharusnya singkat, padat dan jelas, sehingga membuat pembaca memahami maksud penulis yang tertuang dalam tulisan.

### 3.2.2 Bagian 2

Disini penulis dapat menjelaskan lebih terperinci apa saja yang ada pada Bagian 2 ini. Jika bagian ini mempunyai sub bagian yang perlu diperjelas dalam pembahasan, penulis dapat menuliskannya dalam sub pembahasan pada bagian ini.

#### Cccc

Disini penulis dapat membahas sub bagian Cccc lebih terperinci. Deskripsi pembahasan seharusnya singkat, padat dan jelas, sehingga membuat pembaca memahami maksud penulis yang tertuang dalam tulisan.

#### Dddd

Disini penulis dapat membahas sub bagian Dddd lebih terperinci. Deskripsi pembahasan seharusnya singkat, padat dan jelas, sehingga membuat pembaca memahami maksud penulis yang tertuang dalam tulisan.

### 3.2.3 Bagian 3

Disini penulis dapat menjelaskan lebih terperinci apa saja yang ada pada Bagian 3 ini. Jika bagian ini mempunyai sub bagian yang perlu diperjelas dalam pembahasan, penulis dapat menuliskannya dalam sub pembahasan pada bagian ini.

#### Eeee

Disini penulis dapat membahas sub bagian Eeee lebih terperinci. Deskripsi pembahasan seharusnya singkat, padat dan jelas, sehingga membuat pembaca memahami maksud penulis yang tertuang dalam tulisan.

#### Ffff

Disini penulis dapat membahas sub bagian Ffff lebih terperinci. Deskripsi pembahasan seharusnya singkat, padat dan jelas, sehingga membuat pembaca memahami maksud penulis yang tertuang dalam tulisan.

# BAB 4 EKSPERIMEN DAN ANALISIS

## 4.1 Eksperimen

Uraikan secara detil eksperimen yang dilakukan untuk menguji solusi yang ditawarkan. Bagian ini memuat deskripsi tentang dataset yang digunakan, setup eksperimen, dan parameter yang digunakan. Jelaskan juga baseline atau pembanding yang digunakan untuk mengevaluasi performa solusi.

## 4.2 Analisis Hasil

Analisis hasil eksperimen secara komprehensif. Bandingkan hasil yang diperoleh dengan baseline atau metode lain. Gunakan visualisasi data seperti grafik atau tabel untuk memudahkan pemahaman. Kritik dan interpretasi hasil secara objektif sangat diperlukan pada bagian ini.

## 4.3 Pembahasan

Pembahasan memuat interpretasi lebih dalam dari hasil eksperimen. Jelaskan apa yang menyebabkan hasil tertentu, hubungkan dengan teori yang sudah dibahas, dan jelaskan implikasi dari temuan penelitian. Bagian ini juga membahas keterbatasan penelitian dan saran untuk pengembangan lebih lanjut.

# BAB 5 PENUTUP

## 5.1 Kesimpulan

Tuliskan kesimpulan dari penelitian yang dilakukan. Kesimpulan harus menjawab tujuan penelitian dan memberikan temuan utama dari penelitian. Hindari pengulangan hasil secara detail, melainkan fokus pada sintesis dan makna lebih luas dari temuan.

## 5.2 Saran

Saran memuat rekomendasi untuk penelitian selanjutnya atau pengembangan lebih lanjut dari solusi yang ditawarkan. Saran sebaiknya bersifat spesifik dan actionable, berdasarkan pada keterbatasan yang ditemukan selama penelitian.