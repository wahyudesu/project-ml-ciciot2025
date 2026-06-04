# AGENTS.md - Folder references/

## Tujuan Folder

Folder `references/` berfungsi sebagai perpustakaan dan bank referensi untuk proyek ML-based IoT intrusion detection. Folder ini menyimpan semua materi sitasi yang digunakan dalam penelitian, termasuk paper akademik (PDF), link repository kode, dan dokumentasi workflow yang mendukung penulisan publikasi di `books/` serta eksperimen di `research/`.

## Jenis Konten

### 1. Paper (PDF) - references/paper/

Koleksi PDF paper akademik yang menjadi rujukan utama. Setiap file PDF diberi prefix angka (01-15) sesuai urutan di references-paper.md.

Naming convention: {NN}_{Author}_{JudulSingkat}_{Conference}_{Tahun}.pdf

Contoh: 02_CICIoT2023_Neto_Sensors_2023.pdf

### 2. Code References - references/references-code.md

Link ke repository GitHub dan notebook referensi implementasi kode:
- XGBoost with Extra Trees (FarihaAnis)
- CICIoT2023 analysis workbooks (plumpmonkey)
- Ensemble IoT threat classification (jorgesandoval)

### 3. Paper References - references/references-paper.md

Bibliografi lengkap 15 paper dengan 8 kategori:
- Dataset Utama (DataSense, CICIoT2023)
- Penerapan ML pada IoT
- Survey IoT/IIoT Intrusion Detection
- Teori ML General/Classification
- Rare Class / Imbalance / Augmentation
- Feature Selection / Preprocessing
- Paper dengan Akurasi Tertinggi
- Ensemble Learning untuk IDS

### 4. Workflow Documentation - references/references-workflow.md

Dokumentasi visual (screenshot/ilustrasi) dari paper.

### 5. Gambar Proposal - references/references-proposal.png

## Hubungan dengan Folder Lain

- references/ ke books/: paper untuk bibliografi saat menulis publikasi
- references/ ke research/: code refs untuk notebook, paper refs untuk bibliografi
- Dataset (research/data/) bukan referensi paper, tapi data eksperimen

## Perbaikan yang Disarankan

1. Rename 15.pdf - belum informatif,建议: 15_Premalatha_Ensemble_CICIoT2023_JISEM_2025.pdf
2. Paper 06, 07, 14 belum ada PDF - perlu didownload atau ditandai
3. Folder code/ kosong - perlu fungsi atau dihapus
4. Struktur subfolder kategori jika paper bertambah
5. Workflow image ke references/figures/
