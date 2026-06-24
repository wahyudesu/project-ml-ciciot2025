# QNA — Pertanyaan dan Jawaban

Dokumen ini berisi pertanyaan kritis حول penelitian dan jawaban yang telah dibahas. Setiap jawaban didukung oleh referensi dari paper terkait.

---

## Q1: Mengapa penelitian ini harus pakai cross-dataset?

**Jawaban:**

Saya tidak mengklaim bahwa pendekatan cross-dataset ini adalah yang paling sempurna untuk semua kasus IDS. Namun, untuk pertanyaan penelitian saya — yaitu apakah model yang dilatih pada dataset IoT generasi sebelumnya tetap relevan ketika menghadapkan pada dataset IIoT yang lebih baru — desain cross-dataset antara CICIoT2023 dan CIC IIoT 2025 adalah pilihan yang paling langsung, sejalan dengan rekomendasi studi generalisasi NIDS terbaru, dan masih realistis dikerjakan dalam skala tesis.

**Referensi pendukung:**

- Al-Riyami et al. (2022) — Cross-Datasets Evaluation of ML Models for IDS
  > Mereka melatih dan menguji berbagai model ML di beberapa dataset jaringan berbeda dan menunjukkan performa bisa turun drastis ketika training–testing dilakukan secara cross-dataset.
  > [livepository.liverpool.ac](https://liverepository.liverpool.ac.uk)

- Cantone et al. (2024) — On the Cross-Dataset Generalization of ML for NIDS
  > Empat classifier dalam skenario within-dataset vs cross-dataset; akurasi hampir sempurna di within-dataset bisa turun hingga mendekati random pada cross-dataset.
  > [arXiv:2402.10974](https://arxiv.org/abs/2402.10974)

- Explainable Cross-domain Evaluation of ML-based NIDS (Computers & Electrical Engineering, 2023)
  > Delapan model supervised dan unsupervised di empat benchmark NIDS dataset; tidak ada model yang benar-benar bisa generalize ke semua dataset.
  > [ScienceDirect](https://www.sciencedirect.com/science/article/pii/S2351978923005612)

- Cross-Dataset Transformer-IDS with Calibration and AUC Optimization (Journal of Cyber Security, 2025)
  > Transformer dengan kalibrasi dan optimasi AUC lebih stabil dibanding baseline deep model pada skenario cross-dataset.
  > [TechScience](https://www.techscience.com)

---

## Q2: Contoh related paper yang memakai pendekatan cross-dataset?

**Jawaban:**

Contoh yang **tidak spesifik IoT** (general NIDS):

| Paper | Topik |
|-------|-------|
| Al-Riyami et al. (2022) | Cross-datasets evaluation ML untuk IDS — performa turun drastis secara cross-dataset |
| Cantone et al. (2024) | Empat classifier, empat dataset — within-dataset vs cross-dataset |
| Explainable Cross-domain Evaluation (2023) | Delapan model, empat dataset NIDS, menggunakan SHAP |

Contoh yang **relevan dengan IoT/IIoT**:

| Paper | Topik |
|-------|-------|
| Farah (2020) — Master Thesis | Cross-dataset evaluation pada IoTID20 dan Bot-IoT |
| Studi FL-based IDS (Scientific Reports, 2026) | Generalisasi federated IDS di tiga dataset IoT/IIoT modern (Edge-IIoTset) |
| Cross-dataset harmonized IDS framework (2026) | Framework terharmonisasi untuk evaluasi cross-dataset yang fair |

---

## Q3: Kenapa CICIoT2023 + CIC IIoT 2025, bukan BoT-IoT / Edge-IIoT-2022?

**Jawaban:**

> "Saya sengaja memilih kombinasi CICIoT2023 dan CIC IIoT 2025 karena keduanya berasal dari ekosistem yang sama, dikembangkan oleh Canadian Institute for Cybersecurity, dan dirancang sebagai benchmark serangan IoT dan IIoT yang real-time dan berskala besar."

**Referensi:**

- [PubMed/UNB](https://pubmed.ncbi.nlm.nih.gov) — CICIoT2023 fokus pada 33 jenis serangan di 105 perangkat IoT
- Dataset CIC IIoT 2025 memperluas ke skenario IIoT dengan layer sensor–network–edge–cloud yang lebih kompleks

> "Dataset lain seperti BoT-IoT atau Edge-IIoTset juga sangat bagus, tetapi arsitektur testbed, fitur, dan skema serangannya cukup berbeda sehingga pertanyaan 'apakah model dari CICIoT2023 masih relevan di dataset penerusnya' justru paling tepat dijawab dengan pasangan CICIoT2023 → CIC IIoT 2025."

## Q4: Apa urgensi dari penelitian ini?

**Jawaban:**

Ada dua lapis urgensi. Pertama, urgensi praktis: ancaman siber terhadap perangkat IoT dan IIoT terus meningkat — proliferasi perangkat IoT diproyeksikan mencapai 27,1 miliar unit pada 2025, dan setiap perangkat yang terhubung adalah titik masuk potensial bagi penyerang. Serangan Mirai 2016 adalah bukti nyata skala dampaknya: botnet yang menginfeksi jutaan perangkat IoT berhasil melumpuhkan sebagian besar infrastruktur internet global. Sementara di sisi IIoT, serangan ke infrastruktur industri bisa menghentikan produksi, merusak peralatan, atau membahayakan keselamatan fisik.

Kedua, urgensi riset: komunitas penelitian sudah menghasilkan banyak model IDS berbasis ML dengan performa tinggi di in-dataset — RF 99,29%, XGBoost 99,26% [8]. Tapi angka-angka itu menjawab pertanyaan yang salah. Model yang bagus di dataset training belum tentu berguna di lingkungan deployment yang berbeda. Studi cross-dataset pada NIDS umum (Cantone et al., 2024) sudah membuktikan bahwa akurasi hampir sempurna secara within-dataset bisa jatuh mendekati random secara cross-dataset. Pertanyaan "apakah model IoT bisa generalize ke IIoT?" belum pernah dijawab secara sistematis — padahal jawabannya penting untuk menentukan apakah model-model yang ada layak dipertimbangkan untuk deployment di lingkungan industri nyata.

---

## Q5: Apa motivasi ngambil judul penelitian ini?

**Jawaban:**

Titik awalnya adalah gap yang sangat jelas di literatur. Tiga studi paling relevan di CICIoT2023 — Ntayagabiri et al. [8], Firdaus et al. [10], dan Dzaki et al. [11] — semuanya menghasilkan model dengan performa kompetitif, tapi semuanya hanya evaluasi in-dataset. Tidak ada yang menanyakan: "oke, kalau model ini kita pakai di domain yang berbeda, hasilnya bagaimana?" Gap itu terlalu nyata untuk diabaikan.

Di sisi lain, DataSense (CIC IIoT 2025) muncul sebagai dataset IIoT industri paling realistis yang tersedia — testbed nyata dengan sensor industri Arduino, integrasi data sensor dan trafik jaringan, 50 skenario serangan. Tapi karena baru dirilis 2025, belum ada yang jadikan foundational reference: belum ada yang tahu baseline performanya, distribusi kelasnya, atau fitur mana yang bekerja di dalamnya.

Jadi penelitian ini menjawab dua hal sekaligus: mengukur generalization gap lintas domain (IoT konsumen → IIoT industri) sekaligus membangun baseline awal untuk DataSense supaya peneliti berikutnya tidak mulai dari nol.

---

## Q6: Model apa yang akan dipakai dan kenapa?

**Tabel kemunculan di literatur:**

| Model | Muncul di | Performa di Referensi |
|---|---|---|
| **Random Forest** | [3][4][5][8][10][14][15] → **7 paper** | Top performer di [4][8][14]; akurasi 99% di [4] |
| **Decision Tree** | [4][5][8][11][15] → **5 paper** | Best di [5] (98,34%), dipakai sebagai baseline kuat |
| **SVM** | [3][4][5][8][10][15] → **6 paper** | Jarang menang, tapi selalu dipakai sebagai pembanding |
| **XGBoost** | [8][10] → **2 paper** | Best overall di [10] (F1 0,8891), ke-2 terbaik di [8] (99,26%) |
| **CNN** | [8][13] → **2 paper** | Best DL untuk tabular di [8] (98,33%) |
| **ANN/DNN** | [4][8][13] → **3 paper** | Konsisten di atas 95%, kalah dari RF/XGBoost |
| **Hybrid DL** | [13] → **1 paper** | Akurasi 99,99% tapi sangat kompleks |

**Pilihan akhir: Decision Tree, Random Forest, XGBoost.**

Alasannya by design — ketiganya dipilih karena representasi kompleksitas ensemble yang berbeda: DT adalah model pohon tunggal (baseline interpretable), RF adalah ensemble bagging (paralel, reduksi varians), XGBoost adalah ensemble boosting (sekuensial, reduksi bias, dengan regularisasi L1/L2 bawaan). Dengan memilih ketiganya, penelitian ini bisa menjawab apakah peningkatan kompleksitas ensemble menghasilkan generalisasi lintas domain yang lebih baik — atau justru sebaliknya karena model lebih kompleks cenderung overfit ke karakteristik spesifik dataset asalnya.

Deep learning tidak dimasukkan bukan karena performanya buruk, tapi karena tujuan penelitian ini adalah mengukur generalization gap dan feature robustness, bukan mencari arsitektur terbaik. DT/RF/XGBoost juga lebih interpretable sehingga analisis fitur lebih mudah dilakukan.

---

## Q7: Bagaimana skema train/test cross-dataset yang dirancang?

**Jawaban:**

Skema dasarnya: model dilatih di CICIoT2023, lalu diuji di DataSense. Berbeda dari train/test split biasa yang masih berada dalam satu distribusi data yang sama, di sini model tidak pernah "melihat" DataSense selama pelatihan — DataSense murni digunakan sebagai evaluasi generalisasi.

Tahapan yang diperlukan sebelum bisa dijalankan:
1. **Label mapping** — menyesuaikan kategori serangan yang overlap antara kedua dataset (keduanya punya DDoS, DoS, Recon, Brute Force; DataSense punya tambahan MitM dan Malware yang tidak ada di CICIoT2023)
2. **Feature alignment** — mengidentifikasi fitur yang secara semantik tersedia di kedua dataset, karena kedua dataset sama-sama mengekstraksi fitur dari trafik jaringan (IAT, Protocol Type, Header Length, flow duration, flag counts kemungkinan overlap)
3. **Preprocessing konsisten** — normalisasi dan handling imbalance diterapkan dengan pipeline yang kompatibel di kedua dataset

Generalization gap diukur sebagai selisih performa model antara evaluasi in-dataset (CICIoT2023) dan cross-dataset (DataSense).

---

## Q8: Metrik apa yang dipakai dan kenapa tidak cukup akurasi saja?

**Jawaban:**

Akurasi menyesatkan pada data tidak seimbang. Di CICIoT2023, kelas DDoS mendominasi lebih dari 30 juta sampel sementara Brute Force hanya ~11 ribu. Model yang selalu memprediksi "DDoS" akan punya akurasi tinggi tapi tidak berguna sama sekali. Dalam konteks keamanan, yang lebih kritis adalah **recall** — kemampuan mendeteksi semua serangan nyata. False negative (serangan tidak terdeteksi) jauh lebih berbahaya dari false positive.

Metrik yang digunakan:
- **Precision** — kemampuan menghindari false positive
- **Recall** — kemampuan mendeteksi semua serangan nyata (metrik paling kritis)
- **F1-Score** — rata-rata harmonik precision dan recall, berguna untuk data tidak seimbang
- **Macro F1** — rata-rata F1 di semua kelas dengan bobot setara, sehingga kelas serangan minoritas tetap dievaluasi dengan adil

Macro F1 dipilih atas weighted F1 karena weighted F1 akan didominasi kelas mayoritas dan menutupi performa buruk di kelas minoritas.

---

## Q9: Apa keterbatasan penelitian ini?

**Jawaban:**

Beberapa keterbatasan yang sudah disadari sejak awal:

- **Label mapping tidak sempurna** — ada kategori serangan di DataSense (MitM, Malware) yang tidak ada di CICIoT2023, sehingga evaluasi pada kategori tersebut terbatas
- **Evaluasi satu arah** — train di CICIoT2023, test di DataSense. Evaluasi dua arah bisa lebih informatif tapi di luar scope penelitian ini
- **Scope eksperimental** — penelitian ini menghasilkan rekomendasi akademis, bukan sistem IDS siap deployment
- **Feature overlap tidak dijamin** — kalau ada fitur yang ada di CICIoT2023 tapi tidak di DataSense, model perlu dilatih ulang dengan subset fitur yang kompatibel; gap akibat fitur yang hilang itu sendiri dilaporkan sebagai temuan

---

## Q10: Kalau penguji tanya "kenapa tidak pakai SVM atau LightGBM?"

**Jawaban:**

SVM memang sering muncul di literatur [3][4][5][8][10][15], tapi performa di CICIoT2023 tidak kompetitif dibanding RF dan XGBoost — dan SVM sangat bergantung pada feature scaling; Firdaus et al. [10] membuktikan performanya turun signifikan tanpa normalisasi. Lebih penting lagi, SVM tidak masuk dalam kerangka perbandingan ensemble complexity yang menjadi rationale utama pemilihan algoritma.

LightGBM muncul di [8] dengan hasil anomali — akurasi hanya 36,01% yang mengindikasikan masalah konfigurasi, bukan kelemahan algoritmanya. Sebagai varian boosting, LightGBM secara konseptual serupa dengan XGBoost; memasukkan keduanya akan redundan untuk pertanyaan penelitian ini.

