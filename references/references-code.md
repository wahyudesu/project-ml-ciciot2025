1. XGBoost with Extra Trees - multiclass
https://github.com/FarihaAnis/An-IoT-Network-Intrusion-Detection-and-Classification-System-with-XGBoost-using-CICIoT2023-Dataset

---

## 2. Workbooks analisis CICIoT2023 (plumpmonkey)

Repo:  
https://github.com/plumpmonkey/CICIoT2023 [academia](https://www.academia.edu/130367996/Enhancing_IoT_Security_A_Deep_Learning_Approach_with_Feedforward_Neural_Network_for_Detecting_Cyber_Attacks_in_IoT)

**Inti repo**

- Deskripsi: “Workbooks to support the analysis of the CICIoT2023 dataset”. [academia](https://www.academia.edu/130367996/Enhancing_IoT_Security_A_Deep_Learning_Approach_with_Feedforward_Neural_Network_for_Detecting_Cyber_Attacks_in_IoT)
- Konten: kumpulan **Jupyter notebook** + Python untuk eksplorasi & analisis datas et CICIoT2023; README tidak menjelaskan detail model, tapi repo ini dibuat oleh co‑author/kontributor paper dataset. [academia](https://www.academia.edu/130367996/Enhancing_IoT_Security_A_Deep_Learning_Approach_with_Feedforward_Neural_Network_for_Detecting_Cyber_Attacks_in_IoT)

**Kenapa berguna**

- Lebih ke **reference EDA + cara “benar” membaca dan mengolah** CICIoT2023 (topologi, subset, dsb.) dibanding repo murni ML.  
- Kamu bisa pakai untuk:
  - Lihat cara mereka pilih subset / sampling dari 40+ juta record.  
  - Meniru cara mereka strukturkan flow/fitur sebelum masuk model ML kamu sendiri.  

Repo ini bagus dijadikan **“ground truth view”** tentang dataset sebelum kamu eksperimen dengan modelmu.

---

## 3. Ensemble IoT threat classification (jorgesandoval)

Repo:  
https://github.com/jorgesandoval/iotthreat-classification-ensemble [scribd](https://www.scribd.com/document/786053926/Multi-Class-Intrusion-Detection-Based-on-Transformer-for-IoT-Networks-Using-CIC-IoT-2023-Dataset)

**Inti repo**

- Deskripsi: notebook untuk **IoT threat detection** dengan berbagai model ML dan **ensemble**. [scribd](https://www.scribd.com/document/786053926/Multi-Class-Intrusion-Detection-Based-on-Transformer-for-IoT-Networks-Using-CIC-IoT-2023-Dataset)
- Dataset: file `iot_threat_data.csv` berisi fitur dari traffic IoT; README eksplisit berterima kasih ke **CIC IoT Dataset 2023** sebagai sumber utama dan benchmark. [scribd](https://www.scribd.com/document/786053926/Multi-Class-Intrusion-Detection-Based-on-Transformer-for-IoT-Networks-Using-CIC-IoT-2023-Dataset)

**Model dan temuan**

Notebook menguji beberapa model klasik: [scribd](https://www.scribd.com/document/786053926/Multi-Class-Intrusion-Detection-Based-on-Transformer-for-IoT-Networks-Using-CIC-IoT-2023-Dataset)

- Logistic Regression, Decision Tree, Random Forest, Extra Trees.  
- KNN, SVM, Gaussian Naive Bayes.  
- Neural Network (MLP).  
- Gradient Boosting, dan **ensemble model** (stacking / voting).  

Ringkasan hasil: [scribd](https://www.scribd.com/document/786053926/Multi-Class-Intrusion-Detection-Based-on-Transformer-for-IoT-Networks-Using-CIC-IoT-2023-Dataset)

- Ensemble: akurasi ≈ 88.43%, precision sedikit lebih tinggi dari accuracy.  
- KNN: akurasi hampir sama dengan ensemble, precision lebih tinggi.  
- NN: akurasi urutan ketiga, precision lebih rendah → indikasi over‑prediction.  
- Gradient Boosting: precision tertinggi, akurasi sedikit di bawah NN.  
- RF & ExtraTrees: akurasi dan precision hampir sama, lumayan tapi bukan yang terbaik.  
- LR & SVM: akurasi ok, precision lebih rendah → false positive lumayan.  
- Gaussian NB: akurasi terendah, precision tinggi (positif yang diprediksi cukup reliabel). [scribd](https://www.scribd.com/document/786053926/Multi-Class-Intrusion-Detection-Based-on-Transformer-for-IoT-Networks-Using-CIC-IoT-2023-Dataset)

**Kenapa menarik buatmu**

- Notebook ini memperlihatkan **landscape banyak model klasik sekaligus** di dataset IoT yang terkait CICIoT2023, termasuk ensemble vs single model. [scribd](https://www.scribd.com/document/786053926/Multi-Class-Intrusion-Detection-Based-on-Transformer-for-IoT-Networks-Using-CIC-IoT-2023-Dataset)
- Bagus sebagai:
  - Contoh **perbandingan multi‑model** yang bisa kamu kembangkan lanjut (misalnya tambahkan XGBoost, LightGBM, CatBoost).  
  - Template pipeline cepat untuk testing beberapa algoritma sekaligus sebelum masuk ke DL/ensemble canggih.

---

## Bagaimana memanfaatkan tiga repo ini untuk risetmu

Kalau disambungkan ke rencana kamu (CICIoT2023 → Asia IT 2023/2025):

- Pakai repo **FarihaAnis** sebagai:
  - **Baseline XGBoost multiclass** dengan feature selection yang jelas.  
  - Kamu bisa langsung duplikasi notebook, ganti loader ke Asia IT, dan bandingkan drop/shift performa (cross‑dataset).  

- Pakai **plumpmonkey/CICIoT2023** sebagai:
  - Referensi preprocessing / subsampling / EDA dataset CICIoT2023 yang “sesuai niat” pembuat dataset.  
  - Ini penting supaya ketika kamu bikin subset untuk eksperimen, kamu tidak menyimpang terlalu jauh dari setup benchmark di paper.  

- Pakai **iotthreat-classification-ensemble** sebagai:
  - Template **ensemble klasik multi‑algoritma**.  
  - Kamu bisa re‑run ensemble di CICIoT2023 dengan subset yang sama dengan XGBoost baseline, lalu port ke Asia IT 2023/2025 untuk melihat apakah boosting vs ensemble klasik punya pola generalisasi berbeda.  


https://www.kaggle.com/code/baderbotaiban/iiot-2025-eda-preprocessing/notebook


