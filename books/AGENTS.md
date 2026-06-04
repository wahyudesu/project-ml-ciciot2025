# books/ — Folder Penulisan Buku dan Publikasi

## Purpose

Folder `books/` adalah folder untuk menyusun dan menulis hasil penelitian ke dalam bentuk publikasi ilmiah — termasuk buku, paper, proposal tugas akhir, brainstorming, dan presentasi. Folder ini berada di **alur hilir** проекта: menerima input dari `research/` (hasil eksperimen, model, metrik) dan `references/` (literatur, dasar teori) untuk menghasilkan dokumen yang siap dipublikasikan.

## Contents

### brainwriting/

Dokumen brainstorming awal proyek — eksplorasi ide dan directional thinking sebelum struktur penelitian terbentuk.

- `brainstorming-v1.md` — versi awal
- `brainstorming-v2.md` — versi berkembang

### documents/

Dokumen kerja utama penelitian.

- `PLAN.md` — rencana proyek
- `QNA.md` — pertanyaan dan jawaban (FAQ)
- `multistep-research.md` — langkah-langkah penelitian bertahap
- `diagram-systems.excalidraw` — diagram sistem dalam format Excalidraw
- `presentation.slides.md` — outline atau draft slide presentasi

### SPPA/

Subfolder spesifik — kemungkinan singkatan dari "Skripsi/Paper/Proposal/etc" atau topik tertentu. Isi: (folder kosong atau berisi dokumen tertentu).

### outputs/

Output akhir yang dihasilkan — dokumen jadi, bukan draft.

- `proposal-pa-1.pdf` — proposal tugas akhir versi 1
- `image.png` — gambar yang digunakan/dihasilkan (bisa berupa diagram, chart, atau visualisasi)
- `presentation.slides.md` — versi final slide presentasi

## Hubungan dengan Folder Lain

```
references/  ->  research/  ->  books/
(literatur)      (eksperimen)    (publikasi)
                    ↓
                  books/
              (model & hasil
               eksperimen
               mengalir ke
               publikasi)
```

- `research/` menyediakan **hasil empiris**: metrik model, visualisasi, temuan eksperimen
- `references/` menyediakan **dasar teori**: paper yang dikutip, metodologi yang diadopsi
- `books/` menyusun keduanya menjadi **narrative akademis** yang koheren

## Konvensi Penamaan

| Jenis | Pattern | Contoh |
|---|---|---|
| Brainstorm | `brainstorming-v{N}` | `brainstorming-v2.md` |
| Plan | `PLAN.md` | Huruf kapital semua |
| Slide | `presentation.slides.md` | Consistent suffix |
| Proposal | `proposal-{tipe}-{N}` | `proposal-pa-1.pdf` |

## Saran Perbaikan

1. **Tambah struktur output** — `proposal-pa-1.pdf` dan `presentation.slides.md` bisa dipindahkan ke subfolder `outputs/` agar memisahkan draft vs final.

2. **Standardisasi versi** — `brainstorming-v1.md` dan `brainstorming-v2.md` bagus, tapi pertimbangkan timestamp di nama file jika versi makin banyak (mis. `brainstorming-20260520.md`).

3. **Konsistensi penamaan** — `diagram-systems.excalidraw` pakai hyphen, `brainstorming-v*.md` pakai hyphen juga, tapi folder `SPPA/` pakai huruf kapital semua. Pertimbangkan satu konvensi: `sppa/` (lowercase) atau `SPPA/` konsisten di seluruh project.

4. **Aktifkan atau hapus `SPPA/`** — Jika folder belum digunakan, tambahkan `README.md` di dalamnya atau hapus sampai dibutuhkan.

5. **Pindahkan `presentation.slides.md`** — File ini muncul di root dan di `documents/`. Pilih satu lokasi dan symlink atau hapus duplikat.
