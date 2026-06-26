# QNA — Pertanyaan dan Jawaban

Dokumen ini berisi pertanyaan kritis penelitian dan jawaban yang telah dibahas. Setiap jawaban didukung oleh referensi dari paper terkait.

apa urgensi melakukan generalisasi model
saya melakukan generalisasi terhadap dataset baru karena dataset baru ini 

apa aja model yang dipakai dan mengapa harus model itu?

- **Linear Discriminant Analysis (LDA):** Dipilih karena merupakan salah satu metode klasifikasi **paling sederhana**. Penggunaannya bertujuan untuk memfasilitasi perbandingan yang bermakna dengan model lain yang lebih kuat serta untuk membantu memahami tingkat kesulitan dari tugas pembelajaran tersebut.
- **Decision Tree (DT):** Digunakan karena merupakan model hierarkis yang membuat keputusan berdasarkan nilai fitur melalui pembagian data secara rekursif.
- **Random Forest (RF):** Dipilih karena merupakan metode _bagging ensemble_ yang membangun banyak pohon keputusan untuk meningkatkan akurasi prediksi dan **mengontrol overfitting**. Model ini telah diadopsi secara luas dalam konteks NIDS untuk pemilihan fitur maupun klasifikasi.
- **XGBoost (XGB):** Singkatan dari _eXtreme Gradient Boosting_, model ini dipilih karena kemampuannya dalam mencapai **akurasi yang unggul**, efisiensi, serta skalabilitas. XGBoost sangat baik dalam menangani dataset besar dan mampu menangkap hubungan kompleks di dalam data.
