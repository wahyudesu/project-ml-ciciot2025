# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tentang Proyek

Penelitian Proyek Akhir (Sarjana Terapan) tentang **cross-dataset evaluation** model deteksi intrusi berbasis machine learning: model dilatih pada **CICIoT2023** (IoT konsumen, 105 perangkat, 33 skenario serangan) lalu diuji generalisasinya pada **DataSense / CIC IIoT 2025** (IIoT industri, sensor Arduino + trafik jaringan). Pertanyaan inti: seberapa besar *generalization gap* antara domain IoT konsumen dan IIoT industri?

**Model yang digunakan:** Decision Tree → Random Forest → XGBoost (dipilih untuk membandingkan kompleksitas ensemble: pohon tunggal → bagging → boosting).

**Metrik utama:** Macro F1 (bukan akurasi, karena distribusi kelas sangat tidak seimbang).

## Sistem Anotasi di Markdown

Konvensi ini digunakan di semua dokumen penulisan (proposal, buku, dll.):

| Penanda | Makna |
|---------|-------|
| `%%[...]%%` | Constraint wajib dari institusi — jadikan acuan saat generate konten dari bagian ini |
| `==...==` | Prompt, konteks, dan inti poin dari penulis — gunakan sebagai dasar sebelum generate |
| Teks biasa | Konten asli/final — pertahankan apa adanya |

## Navigasi Repo

```
documents/
├── proposal/
│   └── proposal markdown.md   ← dokumen utama yang sedang dikerjakan
├── PLAN.md                    ← rencana dan prioritas penelitian
├── QNA.md                     ← FAQ metodologi + rationale keputusan penelitian
└── TODO.md                    ← task list aktif

references/
├── references-paper.md        ← bibliografi 29 paper (kategorisasi + notes per paper)
├── references-code.md         ← 3 repo GitHub referensi implementasi
├── gap-penelitian.md          ← alasan penelitian & celah literatur
└── paper/                     ← PDF paper (naming: {nomor}_{Author}_{Keywords}_{Journal}_{Year}.pdf)
```

**Bacaan pertama yang disarankan:** `documents/QNA.md` → berisi rationale metodologi yang sudah divalidasi (kenapa cross-dataset, kenapa DT/RF/XGBoost, kenapa Macro F1, dsb.).

## Konteks Proposal

`documents/proposal/proposal markdown.md` adalah sumber kebenaran tunggal untuk proposal. Dokumen `.docx` di folder yang sama adalah export — jangan edit manual, selalu generate ulang dari markdown.

Referensi dikutip dengan nomor `[N]` yang merujuk ke `references/references-paper.md`. Paper fisiknya ada di `references/paper/` dengan nama `{N}_{Author}_...pdf`. Beberapa paper (no. 7, 14, 18, 24, 25, 27) belum punya file PDF — hanya ada entri di references-paper.md. File 16 dan 17 ada tapi kosong (0 bytes), perlu di-download ulang.

## Desain Sistem (Ringkas)

```
CICIoT2023 → cleaning → random undersampling (437.853/kelas) → Gini feature selection (48→10 fitur) → Min-Max norm → Train DT/RF/XGBoost
DataSense  → cleaning → feature alignment (interseksi fitur) → Min-Max norm (pakai param dari CICIoT2023) → Test
```

Label mapping: 8 kelas CICIoT2023 × DataSense → 5 kelas bersama (DDoS, DoS, Recon, Brute Force, Benign). Kelas tanpa padanan lintas dataset dieliminasi dari evaluasi cross-dataset.

*Generalization gap* = Macro F1_in − Macro F1_cross, dihitung per model.

