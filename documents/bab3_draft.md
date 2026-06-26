# BAB III METODOLOGI PENELITIAN

## 3.1 Gambaran Umum Metodologi

Penelitian ini menggunakan pendekatan **evaluasi lintas dataset (*cross-dataset evaluation*)** untuk mengukur kemampuan generalisasi model *machine learning* berbasis pohon keputusan dalam mendeteksi intrusi jaringan. Secara garis besar, model dilatih pada dataset CICIoT2023 yang merepresentasikan lingkungan IoT konsumen, kemudian diuji generalisasinya pada dataset DataSense (CIC IIoT 2025) yang merepresentasikan lingkungan IIoT industri. Kedua dataset tidak pernah bertumpang tindih selama proses pelatihan — DataSense murni digunakan sebagai data evaluasi generalisasi, bukan sebagai bagian dari proses pembelajaran model.

Pendekatan ini mengacu pada kerangka metodologi yang digunakan oleh Farah [26], Cantone et al. [27], dan Elangovan et al. [29], yang ketiganya secara empiris membuktikan bahwa evaluasi *in-dataset* (melatih dan menguji pada satu dataset yang sama) menghasilkan performa yang menyesatkan — akurasi mendekati sempurna yang langsung jatuh mendekati acak ketika model dihadapkan pada data dari jaringan berbeda. Desain *cross-dataset* dalam penelitian ini bertujuan untuk mengukur besaran *generalization gap* tersebut secara kuantitatif.

Alur penelitian secara keseluruhan mencakup tujuh tahap utama, yaitu: (1) pengumpulan dan pemahaman dataset, (2) praproses data, (3) seleksi fitur, (4) penyelarasan fitur lintas dataset, (5) pelatihan model, (6) evaluasi *in-dataset* dan *cross-dataset*, serta (7) analisis *generalization gap*. Setiap tahap dirancang agar dapat direproduksi dan bebas dari kebocoran informasi (*data leakage*) antara dataset pelatihan dan pengujian.

---

## 3.2 Dataset

### 3.2.1 CICIoT2023

CICIoT2023 adalah dataset *benchmark* real-time berskala besar untuk deteksi intrusi pada jaringan IoT, dikembangkan oleh Canadian Institute for Cybersecurity [2]. Dataset ini dibangun di atas testbed yang terdiri dari 105 perangkat IoT konsumen — meliputi kamera, termostat pintar, speaker, dan perangkat *smart home* lainnya — dengan simulasi 33 skenario serangan yang dikelompokkan ke dalam tujuh kategori utama: DDoS, DoS, Recon, *Web-based Attack*, *Brute Force*, *Spoofing*, dan Mirai.

Dataset ini mengandung lebih dari 46 juta *record* dengan 46 fitur numerik yang diekstraksi dari trafik jaringan bidireksional menggunakan CICFlowMeter. Distribusi kelasnya sangat tidak seimbang — kelas DDoS mendominasi dengan lebih dari 30 juta sampel sementara kelas *Brute Force* hanya sekitar 11 ribu sampel — sehingga penanganan ketidakseimbangan kelas menjadi bagian kritis dari praproses.

Dalam penelitian ini, CICIoT2023 digunakan sebagai **dataset pelatihan (*source domain*)**.

### 3.2.2 DataSense (CIC IIoT 2025)

DataSense adalah dataset *benchmark* IIoT yang dikembangkan oleh tim yang sama di Canadian Institute for Cybersecurity [1], dirilis pada 2025. Dataset ini merupakan generasi selanjutnya yang dirancang khusus untuk merepresentasikan lingkungan industri, dengan arsitektur testbed yang lebih kompleks — mencakup sensor Arduino industri, trafik jaringan IT/OT, serta integrasi data dari lapisan sensor, edge, dan cloud.

Dataset ini mencakup 50 skenario serangan yang meliputi DDoS, DoS, Recon, *Brute Force*, MitM (*Man-in-the-Middle*), dan Malware. Fitur-fiturnya diekstraksi dari dua sumber: data sensor Arduino dan trafik jaringan, menjadikannya secara struktural berbeda dari CICIoT2023 meskipun berasal dari ekosistem pengembang yang sama.

Dalam penelitian ini, DataSense digunakan sebagai **dataset pengujian (*target domain*)** untuk evaluasi *cross-dataset*. Model tidak pernah melihat data dari DataSense selama pelatihan.

---

## 3.3 Desain Sistem

Gambar 3.1 mengilustrasikan arsitektur sistem secara keseluruhan. Pipeline penelitian ini dibagi menjadi dua jalur paralel yang bertemu pada tahap evaluasi.

**Jalur 1 — Pipeline Pelatihan (CICIoT2023):**

```
CICIoT2023 (raw)
    → Data Cleaning (hapus duplikat, Inf, NaN)
    → Label Mapping (33 subkategori → 5 kelas bersama)
    → Random Undersampling (437.853 sampel/kelas)
    → Feature Selection Gini Impurity (48 → 10 fitur)
    → Min-Max Normalization (simpan parameter)
    → Train: Decision Tree / Random Forest / XGBoost
```

**Jalur 2 — Pipeline Pengujian (DataSense):**

```
DataSense (raw)
    → Data Cleaning
    → Label Mapping (→ 5 kelas bersama yang sama)
    → Feature Alignment (interseksi fitur dengan CICIoT2023)
    → Min-Max Normalization (pakai parameter dari CICIoT2023)
    → Test (tanpa pelatihan ulang)
```

**Tahap Evaluasi:**

```
Evaluasi In-Dataset:   Model → CICIoT2023 (test split 20%) → Macro F1_in
Evaluasi Cross-Dataset: Model → DataSense (seluruh data)  → Macro F1_cross
Generalization Gap:    ΔF1 = Macro F1_in − Macro F1_cross
```

Desain ini memastikan bahwa parameter normalisasi dan hasil seleksi fitur yang diperoleh dari CICIoT2023 diterapkan langsung ke DataSense tanpa *refitting*, mengikuti prinsip yang ditetapkan oleh Elangovan et al. [29]: *"unified preprocessing and normalization using statistics derived from the training dataset only"* — hal ini krusial untuk menghindari kebocoran distribusi data dari dataset target ke model.

---

## 3.4 Praproses Data

### 3.4.1 Data Cleaning

Tahap pertama praproses adalah pembersihan data pada kedua dataset. Proses ini mencakup:

- **Penghapusan duplikat**: *record* yang identik secara keseluruhan dihapus untuk mencegah bias evaluasi.
- **Penanganan nilai tak terhingga (*Infinity*)**: fitur-fitur dengan nilai `Inf` atau `-Inf` — yang umum muncul pada fitur *flow rate* hasil ekstraksi CICFlowMeter akibat pembagian dengan nol — diubah menjadi nilai NaN terlebih dahulu kemudian dihapus atau diimputasi.
- **Penanganan nilai kosong (*NaN*)**: baris yang mengandung nilai NaN dihapus dari dataset.
- **Penghapusan fitur non-informatif**: fitur yang bersifat pengenal aliran (*flow identifier*) seperti alamat IP sumber/tujuan, nomor port, dan *timestamp* dihapus karena nilainya spesifik terhadap testbed tertentu dan tidak dapat digeneralisasi ke dataset lain. Farah [26] secara eksplisit menyebut penggunaan fitur pengenal ini sebagai penyebab utama inflasi performa palsu pada banyak model IDS.

### 3.4.2 Label Mapping

Kedua dataset memiliki skema pelabelan yang berbeda. CICIoT2023 mendefinisikan serangan dalam 33 subkategori di bawah 7 kategori utama, sementara DataSense memiliki 50 skenario dengan beberapa kategori serangan yang tidak memiliki padanan di CICIoT2023 (MitM, Malware).

Pemetaan label (*label mapping*) dilakukan untuk menyamakan ruang kelas lintas dataset, sehingga evaluasi *cross-dataset* hanya dilakukan pada kelas-kelas yang memiliki padanan semantik di kedua dataset. Kelas yang tidak memiliki padanan dieliminasi dari evaluasi lintas dataset. Hasil pemetaan menghasilkan **5 kelas bersama** (*shared label space*):

| Kelas Bersama | Subkategori di CICIoT2023 | Subkategori di DataSense |
|---|---|---|
| DDoS | DDoS-UDP, DDoS-TCP, DDoS-HTTP, DDoS-ICMP, dst. | DDoS-UDP, DDoS-TCP, dst. |
| DoS | DoS-UDP, DoS-TCP, DoS-HTTP, dst. | DoS-UDP, DoS-TCP, dst. |
| Recon | Recon-PingSweep, Recon-PortScan, dst. | Scanning, PortScan |
| Brute Force | BruteForce-SSH, BruteForce-FTP, dst. | BruteForce-SSH |
| Benign | BenignTraffic | Normal |

Pendekatan ini mengacu pada Farah [26] yang melakukan pemetaan kelas serupa saat mengevaluasi dataset Bot-IoT dan IoTID20, serta Elangovan et al. [29] yang menerapkan *dataset harmonization* sebagai tahap pertama dalam kerangka evaluasi generalisasinya.

### 3.4.3 Penanganan Ketidakseimbangan Kelas

Dataset CICIoT2023 memiliki distribusi kelas yang sangat tidak seimbang. Kelas DDoS mendominasi dengan lebih dari 30 juta sampel sementara kelas *Brute Force* hanya sekitar 11 ribu sampel. Ketidakseimbangan ekstrem ini akan membuat model cenderung mengabaikan kelas minoritas — dan justru kelas minoritas (serangan langka) yang paling penting untuk dideteksi dalam konteks keamanan jaringan.

Untuk menangani ketidakseimbangan ini, diterapkan **random undersampling** dengan menetapkan batas maksimum **437.853 sampel per kelas**. Nilai ini dipilih berdasarkan distribusi aktual kelas pada dataset setelah label mapping, mengikuti pendekatan yang diterapkan oleh Firdaus et al. [10] pada dataset CICIoT2023. Undersampling dilakukan hanya pada data pelatihan (CICIoT2023) dan tidak diterapkan pada DataSense — karena DataSense digunakan apa adanya sebagai cerminan kondisi deployment nyata.

### 3.4.4 Seleksi Fitur (*Feature Selection*)

Seleksi fitur dilakukan pada dataset pelatihan (CICIoT2023 yang telah dibersihkan dan di-*undersample*) menggunakan metode **Gini Impurity berbasis pohon keputusan**. Prinsipnya: sebuah fitur dianggap penting jika kontribusinya dalam mengurangi impuritas (ketidakmurnian) pada node-node pohon keputusan besar secara agregat di seluruh pohon dalam forest.

Dari total 48 fitur yang tersedia setelah data cleaning, seleksi ini menghasilkan **10 fitur terpenting** yang akan digunakan untuk pelatihan model. Pendekatan Gini-based feature selection ini mengikuti Dzaki et al. [11] yang menggunakannya pada dataset CICIoT2023 dan membuktikan bahwa reduksi fitur dari 48 ke 10 tidak menurunkan performa secara signifikan — bahkan mempercepat waktu inferensi.

Pemilihan 10 fitur ini kemudian menjadi acuan untuk tahap penyelarasan fitur (*feature alignment*) pada pipeline DataSense.

### 3.4.5 Penyelarasan Fitur Lintas Dataset (*Feature Alignment*)

Karena kedua dataset diekstraksi dengan tools yang berbeda atau konfigurasi yang sedikit berbeda, tidak semua nama fitur dari CICIoT2023 tersedia secara identik di DataSense. Penyelarasan fitur dilakukan dengan mengidentifikasi **interseksi fitur** — hanya fitur yang tersedia di kedua dataset yang digunakan untuk evaluasi *cross-dataset*.

Mengacu pada Elangovan et al. [29], pendekatan ini tidak hanya mengandalkan kesamaan nama fitur secara sintaktis, tetapi juga mempertimbangkan **kesamaan semantik** — fitur-fitur yang merepresentasikan perilaku jaringan yang sama meski mungkin dinamai berbeda (misalnya fitur terkait durasi aliran, ukuran paket, atau *inter-arrival time*). Fitur yang hanya ada di satu dataset, atau yang memerlukan asumsi spesifik dataset untuk dihitung, dikecualikan dari analisis lintas dataset.

Jika terdapat fitur dari 10 fitur terpilih yang tidak tersedia di DataSense, model dilatih ulang pada CICIoT2023 dengan subset fitur yang kompatibel. Besaran penurunan performa akibat pengurangan fitur ini sendiri dilaporkan sebagai temuan, karena merupakan bagian dari *generalization gap* yang lebih luas.

### 3.4.6 Normalisasi (*Min-Max Scaling*)

Normalisasi diterapkan menggunakan **Min-Max Scaling** untuk memetakan setiap fitur ke rentang \[0, 1\]. Parameter normalisasi (nilai minimum dan maksimum per fitur) dihitung **hanya dari dataset pelatihan (CICIoT2023)** dan kemudian diterapkan langsung ke DataSense tanpa perhitungan ulang.

Prinsip ini krusial untuk integritas evaluasi *cross-dataset*: menghitung parameter normalisasi dari DataSense berarti membocorkan informasi distribusi target ke dalam pipeline, yang akan menghasilkan estimasi generalisasi yang terlalu optimis. Cantone et al. [27] menerapkan prinsip yang sama: *"Before feeding the data to the model, we applied MinMax normalization on each feature"* dengan parameter yang diturunkan dari data pelatihan saja.

---

## 3.5 Model *Machine Learning*

Penelitian ini menggunakan tiga model berbasis pohon keputusan yang dipilih untuk merepresentasikan tingkat kompleksitas ensemble yang berbeda: pohon tunggal (*single tree*), bagging, dan boosting.

### 3.5.1 Decision Tree (DT)

*Decision Tree* adalah model pohon keputusan tunggal yang bersifat interpretabel [4][5][11]. Setiap node internal mewakili sebuah kondisi pada satu fitur, setiap cabang mewakili hasil kondisi tersebut, dan setiap node daun mewakili label kelas. Proses pembangunan pohon menggunakan kriteria **Gini Impurity** untuk menentukan fitur dan threshold terbaik di setiap pemisahan.

Dalam konteks penelitian ini, DT berfungsi sebagai **baseline** — model paling sederhana dalam hirarki kompleksitas. Kemampuan generalisasinya di skenario *cross-dataset* menjadi titik rujukan untuk menilai apakah peningkatan kompleksitas ke RF dan XGBoost menghasilkan generalisasi yang lebih baik.

### 3.5.2 Random Forest (RF)

*Random Forest* adalah ensemble dari sejumlah DT yang dibangun dengan teknik **bagging (*Bootstrap Aggregating*)** [3][4][15]. Setiap pohon dilatih pada subset data yang diambil secara acak dengan pengembalian (*bootstrap sample*), dan pada setiap pemisahan node hanya mempertimbangkan subset fitur acak. Prediksi akhir ditentukan melalui voting mayoritas dari seluruh pohon.

Mekanisme ini mengurangi varians model dan meningkatkan ketahanan terhadap *overfitting* — yang menjadi keunggulan kritis dalam skenario *cross-dataset* di mana distribusi data pelatihan dan pengujian berbeda. Elangovan et al. [29] membuktikan bahwa RF adalah model yang paling robust dalam evaluasi lintas domain, dengan degradasi performa 6–23% — jauh lebih kecil dibandingkan model non-ensemble.

### 3.5.3 XGBoost

XGBoost (*Extreme Gradient Boosting*) adalah model ensemble berbasis **boosting** yang membangun pohon-pohon secara sekuensial [8][10]. Setiap pohon baru dibangun untuk memperbaiki kesalahan residual dari pohon-pohon sebelumnya, menggunakan gradient descent pada fungsi loss. XGBoost memiliki regularisasi L1 dan L2 bawaan yang membantu mencegah *overfitting*.

Sebagai model paling kompleks dalam penelitian ini, XGBoost mewakili ujung spektrum boosting dari perbandingan DT → RF → XGBoost. Pertanyaan penelitian yang relevan: apakah kompleksitas boosting yang lebih tinggi menghasilkan generalisasi yang lebih baik di skenario *cross-dataset*, atau justru menyebabkan *overfitting* terhadap distribusi spesifik CICIoT2023?

---

## 3.6 Skema Evaluasi *Cross-Dataset*

Skema evaluasi dalam penelitian ini mengikuti desain yang diformulasikan oleh Cantone et al. [27] dan Elangovan et al. [29]: membandingkan performa model pada kondisi *in-dataset* dan *cross-dataset* untuk mengukur degradasi generalisasi secara kuantitatif.

### 3.6.1 Evaluasi *In-Dataset* (Baseline)

Evaluasi *in-dataset* dilakukan pada dataset CICIoT2023. Dataset dibagi dengan rasio **80:20** — 80% untuk pelatihan dan 20% untuk pengujian — dengan pemisahan stratifikasi (*stratified split*) untuk memastikan proporsi kelas terjaga di kedua subset. Model dilatih pada training split dan dievaluasi pada test split.

Hasil evaluasi *in-dataset* berfungsi sebagai **baseline performa** — gambaran performa model di kondisi distribusi yang konsisten antara data latih dan uji. Angka ini merepresentasikan "batas atas" performa yang realistis untuk dikembalikan dari model saat digunakan di lingkungan yang sama dengan data latihannya.

### 3.6.2 Evaluasi *Cross-Dataset*

Evaluasi *cross-dataset* menggunakan model yang telah dilatih pada CICIoT2023 untuk memprediksi label pada **seluruh DataSense** (tanpa pelatihan ulang apapun). Hanya kelas-kelas yang telah dipetakan ke ruang label bersama yang diikutsertakan dalam evaluasi ini.

Proses ini mensimulasikan kondisi *deployment* nyata: model yang dikembangkan di satu lingkungan jaringan IoT dihadapkan pada lingkungan IIoT industri yang berbeda distribusinya. Perbedaan yang signifikan antara hasil *in-dataset* dan *cross-dataset* mengindikasikan kurangnya kemampuan generalisasi model terhadap perbedaan domain.

### 3.6.3 *Generalization Gap*

*Generalization gap* didefinisikan sebagai selisih antara performa *in-dataset* dan performa *cross-dataset*, dihitung per model:

$$\Delta F1_{\text{model}} = \text{Macro } F1_{in} - \text{Macro } F1_{cross}$$

Nilai positif mengindikasikan penurunan performa ketika berhadapan dengan data dari domain yang berbeda. Semakin kecil nilai ini, semakin baik kemampuan generalisasi model.

Dengan menghitung *generalization gap* untuk DT, RF, dan XGBoost, penelitian ini dapat menjawab pertanyaan: apakah peningkatan kompleksitas ensemble secara konsisten menghasilkan generalisasi yang lebih baik di skenario IoT → IIoT? Temuan Elangovan et al. [29] menyebutkan bahwa RF memiliki degradasi paling kecil (6–23%), namun apakah pola yang sama berlaku untuk pasangan dataset CICIoT2023–DataSense yang memiliki karakteristik berbeda.

---

## 3.7 Metrik Evaluasi

Metrik evaluasi dipilih dengan mempertimbangkan karakteristik distribusi kelas yang tidak seimbang pada kedua dataset [19].

### 3.7.1 *Confusion Matrix*

*Confusion matrix* adalah tabel N×N yang merangkum distribusi prediksi model terhadap label aktual untuk setiap kombinasi kelas. Dari confusion matrix dapat diturunkan nilai True Positive (TP), False Positive (FP), True Negative (TN), dan False Negative (FN) per kelas. Dalam konteks deteksi intrusi, False Negative (serangan nyata yang tidak terdeteksi) memiliki konsekuensi lebih berat dibandingkan False Positive (lalu lintas normal yang salah diklasifikasikan sebagai serangan).

### 3.7.2 Precision, Recall, dan F1-Score

Untuk setiap kelas $c$:

- **Precision** mengukur proporsi prediksi positif yang benar: $\text{Precision}_c = \frac{TP_c}{TP_c + FP_c}$

- **Recall** mengukur proporsi instans positif yang berhasil dideteksi: $\text{Recall}_c = \frac{TP_c}{TP_c + FN_c}$

- **F1-Score** adalah rata-rata harmonik precision dan recall: $F1_c = 2 \cdot \frac{\text{Precision}_c \cdot \text{Recall}_c}{\text{Precision}_c + \text{Recall}_c}$

### 3.7.3 Macro F1 (Metrik Utama)

**Macro F1** adalah rata-rata F1-Score dari seluruh kelas dengan **bobot setara** (tidak mempertimbangkan jumlah sampel per kelas):

$$\text{Macro } F1 = \frac{1}{|C|} \sum_{c \in C} F1_c$$

Macro F1 dipilih sebagai metrik utama penelitian ini karena:

1. **Tidak terpengaruh ketidakseimbangan kelas**: berbeda dengan *weighted* F1 yang didominasi kelas mayoritas, Macro F1 memberikan bobot setara pada kelas minoritas sehingga performa deteksi serangan langka tidak tersembunyi oleh kelas yang dominan [19].

2. **Konsisten dengan penelitian terkait**: Elangovan et al. [29] menggunakan Macro F1 sebagai metrik utama dalam evaluasi generalisasi *cross-dataset*, memungkinkan perbandingan langsung dengan temuan mereka.

3. **Relevan untuk konteks keamanan**: dalam sistem IDS, kegagalan mendeteksi satu jenis serangan langka sama berbahayanya dengan kegagalan mendeteksi serangan umum — Macro F1 mencerminkan filosofi ini.

Akurasi tidak digunakan sebagai metrik utama karena pada distribusi yang sangat tidak seimbang, model yang selalu memprediksi kelas mayoritas (DDoS) akan mendapatkan akurasi tinggi tanpa mampu mendeteksi serangan lainnya sama sekali [19].

---

## Ringkasan Desain Penelitian

| Aspek | Keputusan Desain |
|---|---|
| Dataset pelatihan | CICIoT2023 (IoT konsumen, 105 perangkat, 33 serangan) |
| Dataset pengujian | DataSense/CIC IIoT 2025 (IIoT industri, sensor Arduino) |
| Ruang label | 5 kelas bersama: DDoS, DoS, Recon, Brute Force, Benign |
| Penanganan imbalance | Random undersampling (437.853/kelas, hanya training) |
| Seleksi fitur | Gini Impurity (48 → 10 fitur, dari training set) |
| Penyelarasan fitur | Interseksi fitur CICIoT2023 ∩ DataSense |
| Normalisasi | Min-Max Scaling (parameter dari training set saja) |
| Model | Decision Tree, Random Forest, XGBoost |
| Metrik utama | Macro F1-Score |
| Ukuran generalisasi | Generalization gap: ΔF1 = Macro F1_in − Macro F1_cross |
