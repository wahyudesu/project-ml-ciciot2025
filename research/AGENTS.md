# research/ — Research Implementation Folder

## Purpose

Folder `research/` adalah sisi implementasi dari proyek ML-based IoT intrusion detection. Folder ini menyimpan dataset, notebook eksperimen, dan tools pemrosesan data yang menjadi sumber aktivitas utama penelitian. Hasil dari folder ini (model, hasil eksperimen, visualisasi) mengalir ke folder `books/` untuk publikasi ilmiah, dan folder ini bergantung pada `references/` untuk literatur dan dasar teori.

## Contents

### data/

Dataset CICIoT2023 hasil capture dari testbed IoT.

#### data/raw_files/

Data mentah hasil capture jaringan dan sensor dari testbed — PCAP dan JSON sinkronisasi waktu.

- `attack_data/` — traffic jaringan dan data sensor selama skenario serangan
  - Subdirektori per kategori: `bruteforce/`, `malware/`, `mitm/`, `recon/`, `web/`
  - File: `{data_type}{attack_category}{attack_name}_{target_device}.pcap` dan `.json` yang cocok
  - Contoh: `attack_web_backdoor-upload_edge1.pcap` + `.json`
- `benign_data/` — traffic jaringan dan data sensor selama operasi normal testbed

#### data/processed_files/

Data yang sudah diproses dan diekstrak fiturnya dalam format CSV. Dibagi per waktu window (1-10 detik) dan label (attack/benign).

- `attack_data/attack_samples_{N}sec.csv` — sampel serangan dengan window N detik
- `benign_data/benign_samples_{N}sec.csv` — sampel benign dengan window N detik
- File CRC/checksum untuk integritas data

#### Batch files

- `all_attack_benign_samples.tar.xz` — arsip lengkap semua data (attack + benign)
- `batch.zip`, `batch (1).zip` — arsip tambahan atau backup

### notebook/

Jupyter notebook untuk eksperimen dan pemrosesan data.

- `data_processsing.ipynb` — notebook utama untuk eksplorasi data, preprocessing, dan feature engineering
- `AGENTS.md` — dokumentasi internal notebook (CICIoT2023: binary=attack/benign, multiclass=34 kelas, 8 kelas)

### tools/

Script dan tools pendukung eksperimen.

- `unpack_dataset.py` — script untuk mengekstrak dan memverifikasi arsip `.tar.xz` (dengan validasi checksum SHA-256 dan proteksi path traversal)
- `feature_selection.tar.xz` — arsip tools atau hasil pemilihan fitur
- `.gitkeep` — placeholder untuk menjaga direktori di version control

## Konvensi Penamaan

| Jenis | Pattern | Contoh |
|---|---|---|
| Raw PCAP | `{data_type}_{category}_{attack}_{device}` | `attack_web_backdoor-upload_edge1` |
| Processed CSV | `{label}_samples_{N}sec` | `attack_samples_1sec.csv` |
| Category | lower-case, underscore | `bruteforce`, `mitm`, `recon` |

- Waktu window: `1sec` - `10sec`
- Label utama: `attack`, `benign`

## Hubungan dengan Folder Lain

```
references/  ->  research/  ->  books/
(literatur)      (eksperimen)    (publikasi)
```

- `references/` menyediakan landasan teori dan paper acuan yang digunakan dalam eksperimen
- `research/` menghasilkan model, metrik, dan visualisasi yang kemudian disusun menjadi publikasi di `books/`

## Saran Perbaikan

1. **Hapus file duplikat** — `batch.zip` dan `batch (1).zip` perlu ditinjau apakah keduanya diperlukan atau hanya salah satu yang aktual.
2. **Dokumentasi tools terpisah** — `unpack_dataset.py` sudah cukup terdokumentasi secara inline, tapi sebaiknya juga ada `README.md` di `tools/` yang menjelaskan usage dan dependensi.
3. **Naming batch file** — `batch (1).zip` dengan spasi dan kurung akan menyulitkan di CLI; pertimbangkan rename ke `batch_001.zip`.
4. **Dataset versioning** — pertimbangkan menambahkan folder versi (mis. `v1/`, `v2/`) jika dataset akan mengalami revisi signifikan.
