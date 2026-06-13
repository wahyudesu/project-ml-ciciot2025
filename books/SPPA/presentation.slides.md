---
transition: slide
marp: false
---
<!--
slide cover-->

Progress Final Project
# Cross-Dataset Evaluation of IoT/IIoT Intrusion Detection Model Generalization on CIC IoT 2023 and CIC IIoT 2025

Wahyu Ikbal Maulana / 3 SDT B
3323600056

Lecturer Advisor
Ferry Astika Saputra
NIP

Tita Karlita ,S.Kom, M.Kom
NIP

---

<!--
slide 5 why, darimana judul ini terbentuk pakai 5 kotak yang salibng terhubung dari why 1 hingga why ke 5, ide awalnya berasal dari dataset yang baru, kemudian dataset baru ini saya eksplorasi dan gimana cara saya bisa merumuskan project implemntasi ml di cyber security
-->

1. new dataset - cic iot 2025 [https://www.unb.ca/cic/datasets/iiot-dataset-2025.html]
Kehadiran CIC IIoT 2025 menjadi titik awal penelitian ini karena menawarkan lingkungan IIoT yang lebih realistis. Dataset ini menggabungkan sensor time-series dan network traffic yang tersinkron, serta merekam 50 jenis serangan dalam 7 kategori, sehingga memberi representasi yang lebih kaya untuk analisis keamanan IIoT.


<!--mengapa dataset ini penting/diperlukan?-->

2. Serangan siber dan lingkungan IoT yang terus berkembang. [data yg nunjukin itu]
Kebutuhan akan dataset baru semakin penting karena ekosistem IoT terus berkembang dan ancamannya ikut meningkat. ORDR melaporkan rata-rata 820.000 serangan IoT per hari, atau naik 46% dibanding tahun sebelumnya, sehingga perubahan lanskap ini menuntut data yang lebih mutakhir dan representatif.

https://ordr.net/blog/iot-security-statistics

<!--mengapa serangan siber dan lingkunbgan diperlukan dataset baru-->

3. cic iot 2023 outdated [penjelasan detailnya]
CICIoT2023 masih berguna sebagai baseline, tetapi banyak studi menunjukkan adanya class imbalance yang sangat berat, bahkan salah satu analisis menyebut dominasi traffic serangan bisa mencapai 97.7%, sehingga hasil akurasi sering terlihat tinggi tetapi tidak benar-benar mencerminkan performa pada kelas minoritas. Dari sini, logikanya bergeser ke pertanyaan praktis: kalau dataset baru lebih representatif, bagaimana dataset itu bisa dimanfaatkan untuk tujuan nyata, misalnya membangun model deteksi serangan berbasis machine learning.


<!--Bagaimana dataset ini bisa dipakai untuk tujuan tersebut? -->

4. dataset digunaskan untuk dilakukan prediksi ml
Dataset seperti CIC IIoT 2025 relevan untuk prediksi ML karena dirancang sebagai benchmark deteksi anomali dan serangan pada lingkungan IIoT yang lebih dekat ke kondisi nyata. Memang tugas ini tidak mudah, sebab data keamanan IoT umumnya kompleks, tidak seimbang, dan multi-class performance biasanya turun cukup jauh dibanding binary classification, sehingga tantangan berikutnya adalah memastikan model yang dibangun tidak hanya bagus di satu dataset saja.


<!--bukankah sulit?-->

5. dgn cross dataset [penjelasan detail di slide selanjutnya] 
Karena performa model bisa bias terhadap karakteristik satu dataset tertentu, pendekatan cross-dataset menjadi penting untuk menguji apakah model benar-benar belajar pola serangan yang umum, bukan sekadar hafal pola pada dataset latih. Jadi, titik akhirnya bukan hanya membangun model ML dari dataset baru, tetapi merumuskan project cybersecurity yang lebih kuat secara ilmiah melalui evaluasi generalisasi di lebih dari satu dataset.

---

| Aspek                          | CIC IoT 2023                                                                 | CIC IIoT 2025 (DataSense)                                                                                     |
| ------------------------------ | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Fokus utama                    | Keamanan jaringan IoT umum (smart environment)                               | Keamanan Industrial IoT (IIoT) dengan fokus sensor + jaringan                                                 |
| Lingkungan uji                 | Topologi IoT dengan 105 perangkat IoT nyata                                  | Testbed IIoT dengan 40 perangkat (beragam sensor industri, IoT, edge, dll.)                                   |
| Modalitas data                 | Trafik jaringan (flow/packet ke CSV)                                         | Data sensor time‑series + trafik jaringan tersinkron                                                          |
| Jumlah jenis serangan          | 33 jenis serangan                                                            | 50 jenis serangan                                                                                             |
| Kategori serangan              | 7 kategori (DDoS, DoS, Recon, Web, Brute Force, Spoofing, Mirai)             | 7 kategori serangan (dengan cakupan skenario IIoT yang lebih luas)                                            |
| Label utama                    | Benign vs 33 attack labels                                                   | Benign vs 50 attack types + dukungan task multi‑kelas dan analisis resource use                               |
| Jumlah fitur (baseline publik) | ±48 fitur per flow dalam banyak shytudi                                        | Tidak satu angka baku; menyediakan banyak fitur sensor dan jaringan + subset hasil feature selection          |
| Tujuan desain                  | Benchmark realistik untuk deteksi & klasifikasi serangan IoT berbasis trafik | Benchmark realistik untuk deteksi serangan IIoT dengan feature selection multi‑objektif (akurasi vs resource) |

<!--
note
- informasi tambahan yang bisa jadi notes unuk pembicara di depan penguji

-->

---

detail dataset dari cic iot 2025
nantinya berisi gambar dan penjelasan penjelasan terhadap hal itu

---

gambar propose workflow lama dari 

---

gambar workflow baru yang diterapkan 

hasil akurasi cic iot 2025 dgn feature selection tertentu
hasil akurasi cic iot 2025 dgn feature selection tertentu

---
sdfsdf

