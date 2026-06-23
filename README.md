---
type: Document
title: Cross-Dataset Evaluation of IoT/IIoT Intrusion Detection
description: Evaluasi generalisasi model IDS berbasis ML dari CICIoT2023 ke DataSense CIC IIoT 2025
tags: [ciciot, iiot, machine-learning, intrusion-detection, cross-dataset]
timestamp: 2026-06-23T00:00:00Z
---

# Cross-Dataset Evaluation of IoT/IIoT Intrusion Detection

Evaluasi generalisasi model *intrusion detection* berbasis machine learning yang dilatih pada **CICIoT2023** dan diuji pada **DataSense (CIC IIoT 2025)**.

## Latar Belakang

Model IDS berbasis ML di CICIoT2023 umumnya hanya dievaluasi secara *in-dataset* — dilatih dan diuji pada distribusi data yang sama. Belum ada studi yang secara sistematis menguji apakah model tersebut tetap performan ketika dihadapkan pada lingkungan IIoT industri yang berbeda secara fundamental (protokol, skala, pola trafik, attack surface).

Penelitian ini menjawab: **seberapa besar generalization gap antara domain IoT consumer dan IIoT industri?**

## Dataset

| Dataset | Keterangan |
|---|---|
| [CICIoT2023](https://www.mdpi.com/1424-8220/23/13/5941) | 105 perangkat IoT, 33 skenario serangan, 7 kategori |
| [DataSense / CIC IIoT 2025](https://www.mdpi.com/2079-9292/14/20/4095) | Testbed IIoT industri, sensor + trafik jaringan, 50 skenario serangan |

## Metode

```
CICIoT2023 ──► Preprocessing ──► Feature Engineering ──► Training
                                                              │
DataSense ───► Feature Harmonization ──────────────────► Evaluation
                                                              │
                                                    Generalization Analysis
```

**Model:** Decision Tree, Random Forest, XGBoost
— dipilih untuk membandingkan kompleksitas ensemble: single tree → bagging → boosting.

**Metrik:** Precision, Recall, F1-Score (Macro) — akurasi saja tidak cukup karena distribusi kelas sangat tidak seimbang.

## Struktur Repo

```
├── books/          # Draft penulisan, rencana, proposal
├── references/     # Paper, kode referensi, gap penelitian
├── research/
│   ├── notebook/   # Jupyter notebooks eksperimen
│   ├── data/       # Dataset raw dan processed
│   └── tools/      # Skrip bantu
├── assets/         # Gambar dan diagram
├── logbook.md      # Catatan progres harian
└── PROJECT_INDEX.md
```

## Navigasi Cepat

1. [PROJECT_INDEX.md](PROJECT_INDEX.md) — peta repo
2. [books/PLAN.md](books/PLAN.md) — rencana dan prioritas
3. [references/gap-penelitian.md](references/gap-penelitian.md) — alasan penelitian
4. [books/QNA.md](books/QNA.md) — Q&A metodologi
5. [logbook.md](logbook.md) — progres harian
