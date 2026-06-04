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
