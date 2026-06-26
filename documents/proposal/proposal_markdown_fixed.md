# BAB 1 PENDAHULUAN

## 1.1 Latar Belakang

%% Jelaskan latar belakang masalah yang diangkat pada proyek akhir. Fokus pada problem domain dari judul penelitian serta tingkat urgensinya. Latar belakang dapat berisi penjelasan mengenai kondisi, dampak, atau peningkatan kasus yang membuat masalah tersebut penting untuk diteliti. %%
Perkembangan Internet of Things (IoT) dan Industrial Internet of Things (IIoT) telah mendorong adopsi perangkat terhubung secara masif di berbagai sektor, mulai dari konsumen rumahan hingga infrastruktur industri kritis. Ekspansi ini membuka permukaan serangan yang luas bagi penyerang siber, sementara karakteristik domain yang berbeda — IoT yang bersifat consumer-focused dan IIoT yang bersifat industri-focused — menambahkan kompleksitas dalam perancangan sistem keamanan jaringan. Untuk menjawab tantangan ini, komunitas riset telah menghasilkan dataset benchmark seperti CICIoT2023 dan DataSense (CIC IIoT 2025) guna memfasilitasi pengembangan dan evaluasi IDS berbasis machine learning.

CICIoT2023 dirancang sebagai dataset serangan IoT berskala besar yang dibangun di atas topologi nyata dengan 105 perangkat dan 33 skenario serangan dalam tujuh kategori. Dataset ini telah menjadi benchmark utama bagi berbagai penelitian IDS berbasis machine learning yang menghasilkan berbagai model IDS terpublikasi dengan performa kompetitif [8], [10], [11]. Di sisi lain, DataSense sebagai CIC IIoT 2025 menghadirkan testbed IIoT yang realistis di laboratorium CIC-UNB, meliputi sensor industri berbasis Arduino MKR WiFi 1010 (cuaca, air, tanah, uap, gas, suara, getar, ultrasonik, cahaya, akselerometer, gerak, RFID, dan api), kamera pengawas, smart plug, serta MQTT broker berbasis Raspberry Pi, dan mengintegrasikan data sensor serta jaringan yang disinkronkan dengan pendekatan multi-objective feature selection [1]. Namun, seluruh penelitian yang memanfaatkan CICIoT2023 masih dilakukan secara *in-dataset*, dan belum ada studi yang secara eksplisit mengukur kemampuan generalisasi model IDS dari domain IoT konsumen ke domain IIoT industri. Celah inilah yang menjadikan kombinasi kedua dataset sebagai objek evaluasi *cross-dataset* yang relevan untuk diteliti.

Berdasarkan celah tersebut, penelitian ini bertujuan melakukan evaluasi cross-dataset terhadap generalisasi model deteksi intrusi IoT/IIoT, dengan menggunakan model-model yang telah dipublikasikan dari CICIoT2023 dan mengujinya pada dataset DataSense (CIC IIoT 2025). Penelitian ini akan menganalisis karakteristik kedua dataset secara mendalam, mengevaluasi performa berbagai keluarga algoritma machine learning — meliputi tree-based, ensemble, dan deep learning — lintas domain, mengidentifikasi fitur yang paling robust, serta menghasilkan rekomendasi praktis bagi peneliti yang ingin menerapkan machine learning pada dataset CIC IIoT 2025 sebagai rujukan foundational.


## 1.2 Permasalahan

%% Jelaskan secara jelas permasalahan yang ingin diteliti pada proyek akhir. Fokus pada problem dari judul penelitian dan uraikan secara deskriptif faktor-faktor yang menyebabkan masalah tersebut penting serta membutuhkan solusi melalui penelitian. %%
Penelitian ini berangkat dari permasalahan bahwa model intrusion detection berbasis machine learning yang dilatih pada dataset IoT sering kali menunjukkan performa tinggi secara in-dataset, namun belum terbukti mampu mempertahankan performa yang sama ketika diterapkan pada lingkungan IIoT yang memiliki karakteristik berbeda. Perbedaan jenis perangkat, protokol, pola trafik, dan kondisi operasional antara CICIoT2023 dan DataSense (CIC IIoT 2025) berpotensi menimbulkan domain shift yang signifikan sehingga menurunkan kemampuan generalisasi model [1], [2].

Perbedaan antara kedua domain ini bukan sekadar perbedaan dataset, melainkan cerminan dari perbedaan fundamental dalam karakteristik jaringan. CICIoT2023 dibangun dari trafik 105 perangkat IoT konsumen — kamera, router, dan speaker pintar — dalam topologi terkontrol dengan 33 skenario serangan [2]. DataSense sebaliknya mencerminkan lingkungan IIoT industri yang sesungguhnya: sensor Arduino berbasis MQTT untuk pemantauan suhu, kelembaban, getaran, dan gas, dengan skenario serangan yang dirancang untuk mengeksploitasi protokol dan topologi industri [1]. Perbedaan distribusi fitur trafik, volume rekaman, dan jenis serangan yang dominan di antara kedua domain berpotensi menyebabkan *distributional shift* yang signifikan pada model yang tidak dirancang dengan mempertimbangkan generalisasi lintas domain.

Dampak praktis dari kegagalan generalisasi ini cukup signifikan: sistem IDS yang dilatih dan divalidasi hanya pada dataset IoT konsumen berisiko memberikan akurasi yang menyesatkan ketika diterapkan pada infrastruktur IIoT industri. Tanpa pemahaman kuantitatif tentang *generalization gap*, peneliti dan praktisi tidak memiliki dasar empiris untuk memutuskan apakah model yang ada sudah layak diterapkan di lingkungan IIoT atau perlu dikembangkan ulang dengan data domain yang sesuai [1], [2].

## 1.3 Tujuan

%% Jelaskan tujuan penelitian proyek akhir secara jelas, singkat, dan menunjukkan orisinalitas solusi yang ditawarkan. Tujuan dapat diawali dengan penjelasan mengenai pendekatan, metode, atau teknik yang digunakan untuk menyelesaikan permasalahan, lalu dilanjutkan dengan uraian fitur atau keunggulan unik dari solusi tersebut. %%

Penelitian proyek akhir ini mengajukan suatu kerangka evaluasi baru untuk mengatasi permasalahan generalisasi model *intrusion detection* berbasis machine learning lintas domain IoT dan IIoT, dengan menggunakan pendekatan evaluasi *cross-dataset* yang secara sistematis menguji model-model yang dikembangkan pada CICIoT2023 terhadap dataset DataSense (CIC IIoT 2025).

Kerangka evaluasi yang diajukan memiliki beberapa keunggulan unik. Pertama, penelitian ini merupakan studi pertama yang secara eksplisit mengukur *generalization gap* antara CICIoT2023 dan DataSense (CIC IIoT 2025) sebagai pasangan domain IoT konsumen dan IIoT industri yang belum pernah dievaluasi secara *cross-domain* dalam literatur sebelumnya [26], [27], sehingga menghasilkan pemahaman kuantitatif tentang seberapa jauh model yang bekerja baik secara *in-dataset* mampu bertahan di lingkungan yang berbeda. Kedua, evaluasi dilakukan secara komparatif terhadap tiga algoritma dengan tingkat kompleksitas ensemble yang berbeda — Decision Tree (model pohon tunggal yang interpretable), Random Forest (*ensemble bagging*), dan XGBoost (*ensemble boosting*) sehingga menghasilkan gambaran tentang bagaimana peningkatan kompleksitas ensemble memengaruhi kemampuan generalisasi lintas domain. Ketiga, penelitian ini menganalisis ketahanan fitur (*feature robustness*) secara lintas domain dengan mengidentifikasi subset fitur dari CICIoT2023 yang mempertahankan daya prediktif ketika diterapkan pada DataSense. Keempat, hasil penelitian dikemas sebagai rekomendasi praktis yang dapat langsung digunakan oleh peneliti yang ingin menjadikan DataSense sebagai titik awal pengembangan sistem IDS berbasis ML untuk lingkungan IIoT.

## 1.4 Manfaat

%% Jelaskan kontribusi proyek akhir terhadap pengembangan ilmu, teknologi, atau penyelesaian masalah tertentu. Uraikan secara spesifik pihak yang mendapatkan manfaat dari penelitian serta bentuk manfaat yang diberikan. %%

Penelitian ini memberikan kontribusi yang dapat dirasakan oleh beberapa pihak. Bagi komunitas riset keamanan jaringan IoT/IIoT, penelitian ini mengisi celah literatur yang selama ini belum ditangani, yaitu studi *cross-dataset* yang mengukur kemampuan generalisasi model IDS dari domain IoT konsumen ke domain IIoT industri. Hasil evaluasi kuantitatif yang dihasilkan dapat menjadi referensi dalam perancangan eksperimen penelitian sejenis di masa mendatang.

Bagi peneliti yang ingin bekerja dengan dataset DataSense (CIC IIoT 2025), penelitian ini berfungsi sebagai *foundational reference* — menyediakan pemahaman awal tentang karakteristik dataset, distribusi kelas, dan performa baseline berbagai algoritma, sehingga peneliti berikutnya tidak perlu memulai dari nol. Bagi praktisi dan pengembang sistem keamanan IoT/IIoT, penelitian ini memberikan panduan empiris tentang keluarga algoritma dan konfigurasi fitur yang paling layak dipertimbangkan untuk skenario deployment lintas domain, sekaligus mengingatkan risiko overfitting terhadap karakteristik satu dataset spesifik yang kerap terjadi dalam pengembangan IDS berbasis ML.

## 1.5 Sistematika Penulisan

Jelaskan tentang sistematika pembahasan dalam buku proyek akhir yang meliputi:

**BAB 1** Pendahuluan
Bab ini menguraikan latar belakang permasalahan terkait meningkatnya ancaman serangan siber pada jaringan IoT dan IIoT serta keterbatasan pendekatan Intrusion Detection System (IDS) konvensional dalam menghadapinya. Di dalam bab ini juga dirumuskan tujuan utama yang ingin dicapai serta manfaat penelitian, agar arah pengembangan sistem deteksi intrusi berbasis machine learning ini lebih terarah. Selain itu, bagian ini menjabarkan manfaat penelitian secara praktis maupun teoretis, sekaligus memberikan gambaran umum mengenai sistematika penulisan laporan dari awal hingga akhir.

**BAB 2** Kajian Pustaka
Bab ini membahas landasan teoretis yang menjadi fondasi utama dalam pengembangan sistem, meliputi konsep dasar IoT dan IIoT, karakteristik ancaman keamanan jaringan, serta prinsip kerja Intrusion Detection System berbasis anomali. Pembahasan teknis juga diuraikan secara mendalam, mencakup algoritma-algoritma machine learning yang digunakan yaitu Decision Tree, Random Forest, dan XGBoost, beserta karakteristik dataset CICIoT2023 dan DataSense (CIC IIoT 2025) sebagai sumber data penelitian. Selain itu, bab ini memuat tinjauan terhadap berbagai penelitian terdahulu yang relevan untuk menunjukkan posisi kebaruan serta memperkuat argumen ilmiah dari pendekatan yang diusulkan.

**BAB 3** Desain Sistem
Bab ini memaparkan rancangan alur penelitian secara komprehensif, mulai dari tahap pengumpulan dan eksplorasi data, prapemrosesan, seleksi fitur, pelatihan model, hingga evaluasi performa. Penjelasan mendetail diberikan mengenai setiap tahapan eksperimen, termasuk strategi penanganan ketidakseimbangan kelas, teknik validasi yang diterapkan, serta metrik evaluasi yang digunakan seperti akurasi, presisi, recall, dan F1-score. Pada bagian akhir bab ini juga dijabarkan lingkungan pengujian dan konfigurasi eksperimen yang menjadi acuan dalam proses implementasi.
# BAB 2 KAJIAN PUSTAKA

## 2.1 Deskripsi Permasalahan
%%
Deskripsikan dengan jelas dan detil dari permasalahan yang ingin diselesaikan pada proyek akhir. Permasalahan berisi penjelasan dari Problem yang termuat pada judul kegiatan. Deskripsi masalah sebaiknya dituliskan dengan gaya bahasa deskriptif. Deskripsi masalah boleh memuat gambar, tabel dan skema tertentu untuk mengilustrasikan permasalahan.
%%

Perkembangan ekosistem Internet of Things (IoT) dan Industrial Internet of Things (IIoT) menghadirkan tantangan keamanan yang fundamental. Perangkat IoT umumnya bersifat *resource-constrained* — memiliki daya komputasi, memori, dan kapasitas baterai yang terbatas — sehingga mekanisme keamanan konvensional yang dirancang untuk sistem komputasi umum tidak dapat diterapkan secara langsung [3], [11]. Di sisi IIoT, lingkungan industri menambahkan lapisan kompleksitas berupa heterogenitas perangkat, campuran protokol komunikasi yang sebagian terstandarisasi dan sebagian proprietary, serta tuntutan ketersediaan layanan yang tidak boleh terganggu oleh proses deteksi ancaman [1].

Permasalahan utama yang dihadapi dalam penelitian ini adalah kesenjangan generalisasi model deteksi intrusi lintas domain. Model machine learning yang dilatih dan diuji pada dataset IoT konsumen (CICIoT2023) kerap menunjukkan akurasi tinggi secara in-dataset, namun belum terbukti mampu mempertahankan performa yang setara ketika diterapkan pada lingkungan IIoT industri yang berbeda secara statistik maupun operasional. Perbedaan jenis perangkat, topologi jaringan, distribusi kelas serangan, dan karakteristik trafik antara kedua domain berpotensi menyebabkan domain shift yang signifikan sehingga menurunkan kemampuan generalisasi model [1], [2].

Secara konkret, CICIoT2023 mencakup 33 jenis serangan yang dibangkitkan oleh 105 perangkat IoT konsumen dalam topologi terkontrol dengan lebih dari 46 juta rekaman dan 48 fitur jaringan [2], [11]. Sementara itu, DataSense (CIC IIoT 2025) mencakup 50 skenario serangan pada sensor industri berbasis Arduino dan perangkat IoT komersial yang terhubung melalui MQTT broker, dengan data sensor yang tersinkronisasi dengan data trafik jaringan dalam pendekatan multi-objective feature selection [1]. Kombinasi perbedaan skala, ruang fitur, dan karakteristik domain ini menjadikan evaluasi cross-dataset sebagai tantangan teknis yang perlu dikaji secara sistematis.

## 2.2 Teori Penunjang

aku sedang menunlis teori penunjang untuk penelitianku di bab 2.2 teori penunjang dan yang mau  iot, iiiot ml, llm  
==muat informasi dari references iot, iiot, ids, ml: random forest, decision tree, xgboost==

### 2.2.1 Internet of Things (IoT)

Internet of Things (IoT) adalah paradigma jaringan yang menghubungkan perangkat fisik maupun virtual — sensor, aktuator, kamera, dan berbagai perangkat cerdas lainnya — ke internet, memungkinkan komunikasi mesin-ke-mesin (M2M) tanpa intervensi manusia [3], [11]. Konsep ini sudah diterapkan luas di berbagai sektor, mulai dari pertanian, rumah tangga pintar, layanan kesehatan, transportasi, hingga otomasi industri [3], [4]. Menurut Dzaki et al. [11], pada akhir tahun 2020 terdapat 11,3 miliar perangkat IoT yang terhubung dan diperkirakan akan mencapai 27,1 miliar pada tahun 2025, didorong oleh kemudahan pengumpulan data dan otomasi proses yang ditawarkan teknologi ini.

Karakteristik utama perangkat IoT yang membedakannya dari perangkat komputasi konvensional adalah keterbatasan sumber daya: kapasitas penyimpanan rendah, daya komputasi terbatas, dan konsumsi energi minimal [3], [11]. Menurut Alsamiri dan Alsubhi [3], perangkat IoT umumnya terhubung tanpa intervensi manusia dalam jangka waktu panjang, sehingga dibutuhkan solusi keamanan berbasis jaringan yang cerdas — bukan solusi konvensional berkapasitas tinggi yang tidak cocok untuk lingkungan IoT. Perluasan ekosistem IoT inilah yang sekaligus memperbesar *attack surface* bagi pelaku ancaman siber.

### 2.2.2 Industrial Internet of Things (IIoT)

Industrial Internet of Things (IIoT) merupakan penerapan teknologi Internet of Things (IoT) pada lingkungan industri yang mengintegrasikan sensor, aktuator, dan sistem industri untuk dapat berkomunikasi serta bertukar data secara real-time [24]. IIoT berperan sebagai pendorong utama implementasi Industri 4.0 dengan menyediakan konektivitas global antar komponen industri yang tersebar di berbagai lokasi, sehingga memungkinkan pemantauan dan pengendalian proses produksi secara otomatis dan efisien [24].

Arsitektur IIoT secara umum terdiri atas tiga lapisan utama, yaitu *perception layer* yang mencakup perangkat sensor dan aktuator, *network layer* yang menangani transmisi data melalui protokol komunikasi industri seperti MQTT dan OPC-UA, serta *application layer* yang meliputi platform analitik dan antarmuka pengambilan keputusan berbasis data [24]. Pada perkembangannya, arsitektur ini diperkuat dengan integrasi komputasi *edge* untuk mereduksi latensi pemrosesan sebelum data diteruskan ke infrastruktur cloud.

Penerapan IIoT memberikan manfaat signifikan dalam berbagai sektor industri, di antaranya pemantauan kondisi mesin secara berkelanjutan (*predictive maintenance*), deteksi anomali pada lini produksi, serta optimasi konsumsi energi [24]. Tantangan utama implementasinya mencakup aspek interoperabilitas antarsistem, keamanan siber, dan kebutuhan analitik big data yang mampu memproses volume data sensor dalam skala besar secara efisien.

### 2.2.3 Intrusion Detection System (IDS)

Intrusion Detection System (IDS) adalah mekanisme pengawasan jaringan yang secara otomatis menganalisis trafik untuk mengidentifikasi aktivitas mencurigakan atau berbahaya yang berpotensi mengancam keamanan sistem. Secara umum, IDS diklasifikasikan ke dalam dua kategori utama berdasarkan pendekatan deteksinya: *signature-based detection* dan *anomaly-based detection* [16]. *Signature-based* IDS bekerja dengan mencocokkan pola trafik terhadap basis data *signature* serangan yang telah diketahui; pendekatan ini efektif untuk serangan terdokumentasi namun tidak mampu mendeteksi serangan *zero-day* yang belum memiliki *signature*. Sebaliknya, *anomaly-based* IDS membangun model perilaku trafik normal dan menandai setiap deviasi signifikan sebagai potensi ancaman, sehingga secara teoritis mampu mendeteksi serangan yang belum pernah ditemui sebelumnya [16].

Perkembangan machine learning telah mendorong pergeseran paradigma IDS dari pendekatan berbasis aturan ke pendekatan berbasis data. Saheed et al. [9] menegaskan bahwa algoritma machine learning mampu mempelajari pola trafik secara otomatis dari data historis dan menghasilkan model klasifikasi yang dapat membedakan trafik normal dari trafik serangan dengan akurasi kompetitif. Gutierrez [16] mengkonfirmasi bahwa IDS berbasis ML menjadi komponen fundamental dalam proteksi infrastruktur kritis karena kemampuannya menangani spektrum ancaman yang lebih luas dibandingkan sistem berbasis *signature*. Dalam konteks IoT dan IIoT, kebutuhan akan IDS berbasis ML semakin mendesak karena keterbatasan sumber daya perangkat dan heterogenitas protokol komunikasi membuat solusi keamanan konvensional tidak dapat diterapkan secara efektif [3], [7].

### 2.2.4 Machine Learning Models
Berbagai classifier berbasis machine learning digunakan untuk memprediksi dataset. Metode-metode machine learning yang dijelaskan berikut digunakan sebagai bagian dari penelitian ini.

### 2.2.4.1 Decision Tree

Decision Tree (DT) adalah algoritma pembelajaran terawasi non-parametrik yang membangun model klasifikasi dalam bentuk struktur pohon hierarkis, di mana setiap simpul internal merepresentasikan pengujian terhadap suatu atribut fitur, setiap cabang merepresentasikan hasil pengujian, dan setiap simpul daun (*leaf*) merepresentasikan label kelas [11]. Proses pembangunan pohon dilakukan secara rekursif menggunakan kriteria impuritas untuk memilih fitur pemisah terbaik di setiap langkah; dua kriteria yang paling umum digunakan adalah Gini Impurity dan Information Gain. Gini Impurity mengukur seberapa sering sampel yang dipilih secara acak dari suatu himpunan akan salah diklasifikasikan jika diberi label sesuai distribusi kelas pada himpunan tersebut, sehingga DT memilih pemisahan yang meminimalkan nilai Gini Impurity pada setiap simpul [11].

Karakteristik utama DT yang membuatnya relevan dalam konteks IDS adalah sifatnya yang sepenuhnya *interpretable* — setiap keputusan klasifikasi dapat dilacak kembali ke serangkaian aturan kondisional yang dapat dibaca manusia. Dzaki et al. [11] membuktikan bahwa DT dengan seleksi fitur berbasis Gini Impurity Tree-based berhasil mereduksi 48 fitur CICIoT2023 menjadi 10 fitur terpilih, menghasilkan pohon yang lebih dangkal (64 level dari 73 level *baseline*) dengan percepatan pelatihan 63,06% tanpa penurunan akurasi yang berarti. Dalam penelitian ini, DT difungsikan sebagai model *baseline* pohon tunggal yang menghasilkan batas keputusan eksplisit sekaligus sebagai fondasi komparatif terhadap algoritma *ensemble* yang lebih kompleks.

### 2.2.4.2 Random Forest

Random Forest (RF) adalah algoritma *ensemble* berbasis *bagging* yang membangun sejumlah pohon keputusan secara paralel, masing-masing dilatih pada subset data dan subset fitur yang dipilih secara acak, kemudian menggabungkan prediksi seluruh pohon melalui mekanisme *majority voting* untuk menghasilkan keputusan akhir [4]. Pengacakan ganda — pada level sampel data (*bootstrap sampling*) maupun pada level pemilihan fitur di setiap simpul (*random feature subspace*) — mereduksi korelasi antar pohon secara signifikan sehingga meningkatkan generalisasi model dan mengurangi risiko *overfitting* dibandingkan pohon keputusan tunggal. Sebagai efek samping dari proses pelatihan berbasis pohon, RF juga menghasilkan *feature importance score* yang dapat dimanfaatkan untuk seleksi fitur dalam pipeline IDS [10].

Dalam literatur IDS berbasis machine learning, Random Forest secara konsisten muncul sebagai model dengan performa tertinggi. Ntayagabiri et al. [8] melaporkan bahwa RF mencapai akurasi 99,29% pada CICIoT2023, melampaui seluruh model non-*ensemble* maupun *deep learning* yang dievaluasi. Premalatha dan Ramanujam [15] mengkonfirmasi dominansi RF dalam studi serupa pada dataset yang sama. Firdaus et al. [10] memanfaatkan *Random Forest Feature Importance* (RFFI) sebagai komponen dalam seleksi fitur hibrida, menunjukkan bahwa RF tidak hanya unggul sebagai model klasifikasi tetapi juga berperan dalam tahap seleksi fitur pada pipeline IDS secara keseluruhan.

### 2.2.4.3 XGBoost

XGBoost (*Extreme Gradient Boosting*) adalah algoritma *ensemble* berbasis *boosting* sekuensial yang membangun model secara iteratif, di mana setiap pohon keputusan baru dilatih untuk memperbaiki kesalahan residu dari pohon-pohon sebelumnya menggunakan optimasi gradien orde kedua [8]. Berbeda dari Random Forest yang membangun pohon secara paralel dan independen, XGBoost membangun pohon secara berurutan sehingga setiap iterasi langsung menargetkan titik-titik kesalahan prediksi sebelumnya. Proses optimasi menggunakan pendekatan *regularized learning objective* yang menggabungkan fungsi loss dengan term regularisasi L1 dan L2 untuk mengontrol kompleksitas model dan mencegah *overfitting*.

XGBoost memiliki sejumlah keunggulan teknis yang relevan dalam konteks IDS berbasis machine learning. Pertama, mekanisme *sparsity-aware split finding* memungkinkan penanganan nilai yang hilang secara otomatis tanpa imputasi eksplisit. Kedua, dukungan komputasi paralel pada level pencarian titik pemisahan (*split finding*) — meskipun struktur boosting tetap sekuensial — menjadikannya efisien untuk dataset berskala besar seperti CICIoT2023. Ketiga, *built-in feature importance* yang dihasilkan dari frekuensi penggunaan fitur sebagai pemisah memberikan insight seleksi fitur yang dapat dibandingkan langsung dengan hasil Random Forest Feature Importance [10].

Dalam literatur IDS berbasis CICIoT2023, XGBoost secara konsisten muncul sebagai model dengan *macro F1-score* tertinggi. Ntayagabiri et al. [8] melaporkan XGBoost mencapai akurasi 99,26% dengan presisi 74,05%, bersaing ketat dengan Random Forest di posisi teratas. Firdaus et al. [10] mengkonfirmasi bahwa XGBoost menghasilkan *macro F1-score* rata-rata 0,8891 ± 0,0008 — tertinggi di antara seluruh model yang dievaluasi, termasuk Random Forest — ketika dikombinasikan dengan seleksi fitur hibrida dan strategi *undersampling*. Dalam penelitian ini, XGBoost difungsikan sebagai representasi *ensemble boosting* yang melengkapi DT dan RF dalam evaluasi *cross-dataset*, dengan hipotesis bahwa mekanisme koreksi residual sekuensialnya berpotensi menghasilkan representasi fitur yang lebih adaptif terhadap distribusi data lintas domain.

### 2.2.5 Evaluation Metric

Pemilihan metrik evaluasi yang tepat sangat krusial dalam menilai performa model machine learning. Apabila metrik yang digunakan tidak sesuai, model yang tampak baik selama pelatihan dapat menunjukkan performa buruk ketika diterapkan di dunia nyata [19]. Berikut adalah metrik-metrik evaluasi standar yang digunakan dalam penelitian ini.

**Confusion Matrix** adalah tabel berukuran N×N yang digunakan untuk menentukan performa model machine learning pada N kelas. Dari *confusion matrix* dapat diturunkan empat komponen dasar berikut:

- *True Positive* (TP): Nilai aktual adalah positif dan model memprediksi positif.
- *False Positive* (FP): Disebut juga *Type I Error*; nilai aktual adalah negatif namun model memprediksi positif.
- *True Negative* (TN): Nilai aktual adalah negatif dan model memprediksi negatif.
- *False Negative* (FN): Disebut juga *Type II Error*; nilai aktual adalah positif namun model memprediksi negatif.

**ROC-AUC** — ROC (*Receiver Operating Characteristics*) adalah kurva yang memetakan hubungan antara *sensitivity* model terhadap *false positive rate*-nya. Nilai-nilai ini dihitung menggunakan formula berikut:

- *Sensitivity* (*True Positive Rate*): Merupakan proporsi instance positif yang diklasifikasikan dengan benar sebagai positif oleh model.

$$\text{TPR} = \frac{TP}{FN + TP}$$

- *Specificity* (*True Negative Rate*): Merupakan proporsi instance negatif yang diklasifikasikan dengan benar sebagai negatif oleh model.

$$\text{TNR} = \frac{TN}{TN + FP}$$

- *False Positive Rate*: Merupakan proporsi instance negatif yang salah diklasifikasikan sebagai positif oleh model. FPR juga dapat dipandang sebagai 1 − *specificity*.

$$\text{FPR} = \frac{FP}{TN + FP}$$

Kurva ROC tidak terpengaruh oleh ketidakseimbangan kelas. AUC (*Area Under the Curve*) adalah nilai tunggal yang menghitung luas area di bawah kurva ROC, dengan rentang nilai 0 hingga 1,0. Semakin tinggi nilai AUC, semakin baik performa model. AUC sebesar 1,0 menunjukkan bahwa model mengklasifikasikan seluruh instance dengan benar, sedangkan AUC sebesar 0,5 setara dengan klasifikasi acak (*random classification*) [19].

**Accuracy** adalah proporsi total prediksi yang benar dari seluruh prediksi yang dilakukan model [22].

$$\text{Accuracy} = \frac{TP + TN}{TP + TN + FP + FN}$$

**Precision** adalah proporsi prediksi positif yang benar dari seluruh prediksi positif yang dihasilkan model [22].

$$\text{Precision} = \frac{TP}{TP + FP}$$

**Recall** adalah proporsi instance positif yang berhasil diidentifikasi dengan benar oleh model [22].

$$\text{Recall} = \frac{TP}{TP + FN}$$

**F1-score** adalah rata-rata harmonik dari Precision dan Recall yang memberikan keseimbangan antara keduanya, terutama berguna dalam skenario ketidakseimbangan kelas [22].

$$\text{F1-score} = 2 \times \frac{\text{Precision} \times \text{Recall}}{\text{Precision} + \text{Recall}}$$

Untuk evaluasi multikelas, terdapat dua pendekatan perataan: *macro-averaging* menghitung rata-rata metrik secara setara untuk setiap kelas sehingga kelas minoritas mendapat bobot yang sama, sementara *weighted averaging* menghitung rata-rata berbobot berdasarkan jumlah sampel per kelas [19]. Dalam konteks *cross-dataset* dengan distribusi kelas yang tidak seimbang, **Weighted AUC** digunakan sebagai metrik utama mengikuti metodologi Farah [26], karena nilai ini tidak dipengaruhi ketidakseimbangan kelas dan merangkum performa model secara keseluruhan dalam satu nilai agregat.


## 2.3 Penelitian Terkait

==paper dgn keterkaitan paling tinggi aku mau pakai untuk dipake ke penelitian ku ini, diantanya nya topik  yang mkau aku pakai sebagai identitas untuk saya kutip tu
1 cic iot 2025
1 cic iot 2023
1 tentang cross dataset
**Cross-dataset** → [26] Farah 2020 atau [27] Cantone 2024
**IDS ML pakai CICIoT2023** → [10] Firdaus 2026, [15] Premalatha 2025, atau [8] Ntayagabiri 2025
**IDS ML pakai DataSense (CIC IIoT 2025)** → nah ini masalahnya, dari 27 references yang ada **belum ada** yang eksplisit pakai DataSense sebagai dataset penelitian. [1] itu paper dataset-nya sendiri, bukan penelitian yang menggunakannya.
riset lagi utk deteksi model prlu ambil 


### 2.3.1 A Comparative Analysis of Supervised Machine Learning Algorithms for IoT Attack Detection and Classification [8]

Ntayagabiri et al. [8] melakukan analisis komparatif sepuluh algoritma *supervised learning* pada dataset CICIoT2023, mencakup tiga keluarga model: algoritma klasik (Naive Bayes, Logistic Regression, k-NN), *ensemble* (Random Forest, XGBoost, LightGBM), dan *deep learning* (ANN, CNN, LSTM, GRU). Random Forest mencapai akurasi tertinggi sebesar 99,29% dengan presisi 82,30%, diikuti XGBoost sebesar 99,26%. Di antara model *deep learning*, CNN unggul dengan akurasi 98,33%, sementara LSTM dan GRU masing-masing mencapai 97,60% dan 96,87%. Penelitian ini menyoroti bahwa nilai recall yang bervariasi antar algoritma — Random Forest 72,19%, XGBoost 71,69%, CNN 64,72% — mengindikasikan bahwa akurasi agregat yang tinggi belum tentu mencerminkan kemampuan deteksi yang merata pada seluruh kelas serangan, terutama kelas minoritas. Seluruh evaluasi dilakukan secara *in-dataset* pada CICIoT2023 tanpa pengujian lintas domain.

### 2.3.2 Evaluating Ensemble Versus Non-Ensemble Machine Learning Performance with Preprocessing Techniques for IoT Intrusion Detection on CICIoT2023 [10]

Firdaus et al. [10] mengevaluasi performa model *ensemble* dibandingkan non-*ensemble* dengan penekanan pada peran teknik *preprocessing* dalam meningkatkan stabilitas model pada CICIoT2023. Penelitian ini menerapkan *random undersampling* untuk mengatasi ketidakseimbangan kelas yang ekstrem, dikombinasikan dengan seleksi fitur hibrida yang memadukan *Mutual Information* (MI) dan *Random Forest Feature Importance* (RFFI). Lima model diuji — Naive Bayes, Logistic Regression, SVM, Random Forest, dan XGBoost — menggunakan *stratified 5-fold cross-validation*. XGBoost tampil sebagai model terbaik dengan *macro F1-score* rata-rata 0,8891 ± 0,0008. Kontribusi penting penelitian ini adalah pembuktian kuantitatif bahwa normalisasi bukan langkah opsional: Logistic Regression tanpa *scaling* menghasilkan F1-score tidak stabil sebesar 0,6280, namun melonjak menjadi 0,7691 setelah normalisasi Min-Max diterapkan. Sama seperti penelitian sebelumnya, eksperimen dilakukan sepenuhnya pada satu domain dataset yang sama.

### 2.3.3 Accelerating Classification for IoT Attack Detection Using Decision Tree Model with Gini Impurity Tree-Based Feature Selection Technique [11]

Dzaki et al. [11] mengembangkan pendekatan akselerasi klasifikasi serangan IoT berbasis seleksi fitur *Gini Impurity Tree-based* pada CICIoT2023. Penelitian ini membandingkan enam teknik seleksi fitur dari tiga kategori — *filter* (Fisher Score, Mutual Information), *wrapper* (Recursive Feature Elimination, Genetic Algorithm), dan *embedded* (Gini Impurity Tree-based, Lasso-based). *Gini Impurity Tree-based* terbukti paling efisien: menghasilkan subset 10 fitur dengan waktu pemrosesan hanya 40 detik, mempercepat pelatihan sebesar 63,06% dibandingkan baseline 48 fitur, dan menghasilkan pohon keputusan lebih dangkal (64 level dari 73 level) — semua tanpa penurunan akurasi yang berarti. Penelitian ini memfokuskan kontribusinya pada efisiensi komputasi dalam satu dataset, tanpa mengkaji apakah subset fitur yang dipilih bersifat robust ketika diterapkan pada domain dataset yang berbeda.

Ketiga penelitian di atas secara konsisten menghasilkan model dengan performa tinggi pada CICIoT2023, namun seluruhnya hanya melakukan evaluasi *in-dataset*. Tidak ada satu pun yang menguji apakah model atau fitur yang dihasilkan mampu mempertahankan performa ketika diterapkan pada domain IIoT industri yang berbeda secara statistik maupun operasional. Celah inilah yang menjadi motivasi penelitian ini: mengevaluasi kemampuan generalisasi *cross-dataset* dari model-model yang dikembangkan pada CICIoT2023 terhadap DataSense (CIC IIoT 2025), sekaligus mengidentifikasi fitur yang paling robust lintas kedua domain.


Tabel 2.1 Gap penelitian

==gap nya kudu dipilah lagi dari paper yg deteksi ids, ml dari references paper dan dama dri highlight di bab 2


| Ref  | Peneliti           | Tahun | Dataset       | Kelas      | Metode                                 | Hasil Terbaik  | Gap                                                                                                                      |
| ---- | ------------------ | ----- | ------------- | ---------- | -------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| [8]  | Ntayagabiri et al. | 2025  | CICIoT2023    | Multiclass | RF, XGBoost, LightGBM, CNN, LSTM, dll. | RF: 99.29%     | In-dataset only; recall rendah (72.19%); tidak uji generalisasi ke IIoT                                                  |
| [11] | Dzaki et al.       | 2025  | CICIoT2023    | Multiclass | DT + Gini Impurity FS                  | DT: 99.4%      | In-dataset only; 10 fitur terpilih tidak divalidasi di dataset lain; robustness fitur lintas domain tidak dieksplorasi   |
| [13] | Bensaoud & Kalita  | 2025  | CICIoT2023    | Multiclass | SOM + DBN + Autoencoder + PSO          | 99.99%         | In-dataset only; arsitektur DL berat tidak cocok edge IoT; tidak ada cross-dataset                                       |
| [22] | Al-Shibly et al.   | 2026  | CIC IIoT 2025 | **Binary** | CNN-BiLSTM + Permutation Importance    | DT+DFS: 97.20% | **Binary only** — tidak uji multiclass; in-dataset DataSense only; tidak ada evaluasi model dari CICIoT2023 ke DataSense |

# BAB 3 DESAIN SISTEM

## 3.1 Deskripsi Solusi

%% Deskripsikan solusi yang ditawarkan pada buku proyek akhir dengan jelas dan detil. Tuliskan secara argumentatif apa saja fitur-fitur yang ditawarkan pada kegiatan sebagai sesuatu solusi pada kegiatan laporan akhir. Pada contoh judul "Deteksi Kanker dengan Sistem Pakar Berbasis Fuzzy", solusinya adalah Sistem Pakar Berbasis Fuzzy, sehingga penulis disini dapat menjelaskan tentang pemodelan sistem pakar dan fitur-fitur fuzzy yang seperti apa untuk deteksi penyakit kanker. Terangkan secara argumentatif tentang fitur-fitur pemodelan Sistem Pakar dengan Fuzzy sehingga dapat digunakan untuk mendeteksi penyakit kanker. %%

==fomat narasinya tuh dari kebutuhan sistem dan ruang lingkup soolusi, cara kerja sistem, sumber data dan pendekatan yang digunakan, lalu terakhir validasi, evaluasi, keterbatasan dan peran manusia jika diperlukan==

Penelitian ini mengajukan kerangka evaluasi _cross-dataset_ sebagai solusi terhadap permasalahan yang belum banyak diteliti dalam literatur: sejauh mana model _intrusion detection_ berbasis machine learning yang dilatih pada dataset IoT konsumen (CICIoT2023) mampu mempertahankan performanya ketika diterapkan pada lingkungan IIoT industri (DataSense). Berbeda dari penelitian terdahulu yang mengevaluasi model dalam satu domain dataset yang sama, kerangka ini secara eksplisit mengukur _generalization gap_ — selisih performa model antara evaluasi _in-dataset_ dan evaluasi lintas domain — sebagai luaran analitik utamanya.

Tiga algoritma dipilih untuk merepresentasikan spektrum kompleksitas ensemble yang berbeda: Decision Tree sebagai model pohon tunggal yang sepenuhnya _interpretable_, Random Forest sebagai ensemble berbasis _bagging_, dan XGBoost sebagai ensemble berbasis _boosting_ sekuensial. Pemilihan ini didukung oleh konsistensi performa ketiganya dalam literatur terkait, di mana Random Forest muncul sebagai _top performer_ di sebagian besar studi [4][8][15], XGBoost mengungguli seluruh model dalam macro F1-score pada dua studi berbasis CICIoT2023 [8][10], dan Decision Tree terbukti paling efisien dengan akurasi 98,34% serta waktu seleksi fitur tercepat [5][11]. Dengan membandingkan ketiga algoritma pada level kompleksitas yang berbeda, penelitian ini dapat menjawab apakah kompleksitas ensemble memberikan keunggulan tambahan saat model harus digeneralisasikan ke domain baru.

Data CICIoT2023 diproses melalui pipeline empat tahap secara berurutan: _data cleaning_ untuk menghapus duplikat dan nilai hilang, _random undersampling_ untuk menyeimbangkan distribusi kelas [10][11], _Gini Impurity Tree-based feature selection_ untuk mereduksi 48 fitur menjadi subset minimal [11], dan _Min-Max normalization_ ke rentang [0,1] sebagai prasyarat konsistensi skala fitur lintas domain [10][11]. Evaluasi lintas domain dilakukan dengan membangun interseksi fitur — hanya fitur yang tersedia di kedua dataset yang dipertahankan sebagai input model — sekaligus menyelaraskan label ke lima kelas bersama yang ada di kedua domain: DDoS, DoS, Reconnaissance, Brute Force, dan Benign. _Generalization gap_ dihitung sebagai selisih Macro F1 antara evaluasi _in-dataset_ dan _cross-dataset_ untuk masing-masing algoritma, sehingga model dengan degradasi performa terkecil dapat diidentifikasi sebagai algoritma paling _robust_ untuk skenario deteksi lintas domain IoT ke IIoT.
## 3.2 Desain Sistem

==1. dataset 2023 dataset 2025, 2. data preprocessing, 3. feature selection, ==

Desain sistem dari kerangka evaluasi *cross-dataset* yang diajukan diilustrasikan pada Gambar 3.1. Sistem terdiri dari dua pipeline paralel yang berasal dari dua sumber data berbeda — CICIoT2023 sebagai domain IoT konsumen dan DataSense (CIC IIoT 2025) sebagai domain IIoT industri — yang keduanya bermuara pada satu node evaluasi bersama.

Gambar 3.1.
Desain sistem kerangka evaluasi cross-dataset IoT-IIoT

Secara garis besar, pipeline CICIoT2023 mengalirkan data melalui tahap pemrosesan data, seleksi fitur, dan pelatihan model menggunakan tiga algoritma ML. Model yang telah terlatih kemudian diuji secara bersamaan pada *test set* CICIoT2023 (evaluasi *in-dataset*) dan pada DataSense yang telah menjalani pemrosesan dan penyelarasan fitur secara paralel (evaluasi *cross-dataset*). Node *cross dataset evaluation* menghasilkan laporan *generalization gap* yang menjadi keluaran utama penelitian. Umpan balik dari node evaluasi ke tahap seleksi fitur DataSense menunjukkan bahwa analisis fitur mana yang *robust* lintas domain menginformasikan pemahaman karakteristik DataSense secara iteratif.

### 3.2.1 Tahap Pemrosesan Data

Pemrosesan data merupakan tahap pertama pada kedua pipeline dan bertujuan mengubah data mentah dari masing-masing dataset ke bentuk yang siap diproses model ML.

Pada pipeline **CICIoT2023**, pemrosesan data mencakup empat langkah berurutan. Pertama, *data cleaning*: menghapus baris duplikat, menangani nilai hilang (*missing values*) dengan strategi *drop-row*, dan menghapus fitur non-informatif seperti alamat IP sumber/tujuan, nomor *port*, dan *timestamp* yang tidak berkontribusi pada deteksi pola serangan. Kedua, *random undersampling*: mendistribusikan ulang kelas dengan mengambil sejumlah sampel yang sama dari setiap kelas — mengacu pada distribusi Dzaki et al. [11] yang menggunakan 437.853 sampel per kelas untuk 8 kelas, menurunkan total data dari 46 juta baris menjadi sekitar 3,5 juta baris. Undersampling dilakukan terhadap seluruh 8 kelas CICIoT2023; tiga kelas yang tidak memiliki padanan di DataSense (Mirai, Spoofing, Web-based) baru dieliminasi pada tahap pemetaan label sebelum evaluasi *cross-dataset*. Ketiga, *Gini Impurity Tree-based feature selection*: memilih subset fitur paling relevan dari 48 fitur awal menggunakan algoritma Decision Tree dengan kriteria Gini Impurity, menghasilkan 10 fitur terpilih [11]. Keempat, *Min-Max normalization*: menskalakan semua nilai fitur ke rentang [0,1] menggunakan parameter minimum dan maksimum yang dihitung eksklusif dari data *training*.

Pada pipeline **DataSense**, pemrosesan data mengikuti langkah yang serupa dalam hal *cleaning* dan normalisasi, namun tidak melibatkan *undersampling* karena DataSense digunakan seluruhnya sebagai *test set*. Parameter normalisasi (nilai min dan max per fitur) yang digunakan adalah parameter yang sama yang dihitung dari data *training* CICIoT2023 — bukan dihitung ulang dari DataSense — untuk memastikan konsistensi transformasi lintas domain dan menghindari kebocoran informasi dari *test set* ke *training*.

### 3.2.2 Seleksi Fitur dan Pemetaan Label

Setelah tahap *preprocessing*, *Gini Impurity Tree-based feature selection* diterapkan pada pipeline CICIoT2023 untuk memilih subset fitur paling informatif dari 48 fitur awal. Algoritma Decision Tree dengan kriteria Gini Impurity digunakan sebagai selektor, menghasilkan 10 fitur terpilih yang digunakan sebagai input bersama ketiga model [11]. Subset fitur yang sama — tanpa seleksi ulang — diterapkan langsung pada DataSense saat evaluasi *cross-dataset*, sehingga model menerima ruang fitur yang identik di kedua domain.

Sebelum evaluasi *cross-dataset*, pemetaan label dilakukan untuk menyamakan basis kelas antar domain. Delapan kelas CICIoT2023 — DDoS, DoS, Mirai, Benign, Spoofing, Recon, Web, dan Brute Force — dipetakan ke **lima kelas bersama** yang tersedia di kedua dataset: DDoS, DoS, Reconnaissance, Brute Force, dan Benign. Kelas Mirai, Spoofing, dan Web-based pada CICIoT2023, serta kelas Man-in-the-Middle dan Malware pada DataSense, dieliminasi dari evaluasi *cross-dataset* karena tidak memiliki padanan langsung di dataset yang berlawanan. Pemetaan ini memastikan bahwa perbandingan performa model antar domain dilakukan pada basis kelas yang identik.

### 3.2.3 Pelatihan Model dan Evaluasi Cross-Dataset

Pelatihan model dilakukan pada data CICIoT2023 yang telah melewati seluruh tahap *preprocessing* dan seleksi fitur. Data CICIoT2023 yang telah bersih dibagi menggunakan *stratified split* 80:20, di mana 80% digunakan untuk *training* dan 20% digunakan untuk evaluasi *in-dataset*. *Stratified split* diterapkan untuk memastikan distribusi kelas yang proporsional di kedua partisi, mengingat data yang dipakai telah melalui *random undersampling* namun tetap perlu dijaga konsistensi distribusi kelasnya.

Tiga model dilatih secara independen menggunakan data *training* yang sama. **Decision Tree** dilatih dengan kriteria Gini Impurity sebagai model *baseline* pohon tunggal yang menghasilkan aturan klasifikasi yang sepenuhnya *interpretable*. **Random Forest** dilatih menggunakan mekanisme *bootstrap aggregating* di mana sejumlah pohon keputusan dibangun secara paralel pada subset data dan fitur yang berbeda, kemudian prediksi digabung melalui *majority voting*. **XGBoost** dilatih menggunakan *gradient boosting* sekuensial dengan regularisasi L1 dan L2 bawaan untuk mencegah *overfitting*, di mana setiap pohon baru difokuskan memperbaiki kesalahan residual model sebelumnya.

Evaluasi dilakukan dalam dua tahap mengikuti metodologi Farah [26]. Metrik-metrik yang digunakan — Weighted AUC, Macro F1, Accuracy, Precision, Recall, F1-score per kelas, dan FPR — didefinisikan secara matematis pada Subbab 2.2.5; bagian ini menjelaskan cara penerapannya dalam eksperimen.

**Tahap 1 — Evaluasi *in-dataset*:** Ketiga model diaplikasikan pada 20% *test set* CICIoT2023. Untuk setiap model, dihasilkan: (1) *classification report* per kelas (Precision, Recall, F1-score) sebagai profil deteksi per jenis serangan; (2) *confusion matrix* 8×8 untuk mengidentifikasi pola kesalahan klasifikasi antar kelas; (3) *Weighted AUC* sebagai metrik agregat utama yang tidak terpengaruh ketidakseimbangan kelas [26]; (4) *Macro F1* sebagai metrik sekunder yang memberi bobot setara pada kelas minoritas [10]; serta (5) *False Positive Rate* (FPR) per kelas sebagai ukuran alarm palsu yang ditoleransi sistem.

**Tahap 2 — Evaluasi *cross-dataset*:** Model yang sama diaplikasikan pada seluruh DataSense setelah pemetaan label ke 5 kelas bersama — tanpa modifikasi atau *retraining* apapun [26]. Output yang dihasilkan identik dengan Tahap 1 namun pada skala 5 kelas, menghasilkan pasangan nilai (*AUC*_cross, *F1*_cross) yang dapat dibandingkan langsung dengan hasil *in-dataset* pada kelas yang sama.

**Perhitungan *Generalization Gap*:** Selisih performa antara kedua tahap dihitung untuk masing-masing model menggunakan dua ukuran komplementer:

$$\Delta \text{AUC} = \text{AUC}_{\text{in}} - \text{AUC}_{\text{cross}} \tag{Pers. 3.1}$$

$$\Delta \text{Macro F1} = \text{F1}_{\text{in}} - \text{F1}_{\text{cross}} \tag{Pers. 3.2}$$

Nilai Δ mendekati nol menunjukkan generalisasi tinggi; nilai besar mengindikasikan *domain shift* signifikan [26], [29]. Ketiga model dibandingkan berdasarkan nilai Δ-nya — model dengan Δ terkecil ditetapkan sebagai algoritma paling *robust* untuk skenario lintas domain IoT ke IIoT.

## 3.3 Timeline Pengerjaan

| Aktivitas | Jul | Agt | Sep | Okt | Nov | Des |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| Penyusunan metodologi dan rancangan eksperimen | ◼ | | | | | |
| Persiapan, *cleaning*, dan *preprocessing* data CICIoT2023 | ◼ | ◼ | | | | |
| Persiapan, *cleaning*, dan *preprocessing* data DataSense | | ◼ | ◼ | | | |
| Integrasi data, *feature engineering*, dan penyiapan skenario eksperimen | | | ◼ | ◼ | | |
| Implementasi *baseline* dan model utama | | | | ◼ | ◼ | |
| Evaluasi, *tuning*, dan analisis hasil | | | | | ◼ | ◼ |
| Pengujian & Evaluasi Sistem | | | | | | ◼ |


# DAFTAR PUSTAKA

[1] Firouzi, A., Dadkhah, S., Maret, S. A., Ghorbani, A. A., DataSense: A Real-Time Sensor-Based Benchmark Dataset for Attack Analysis in IIoT with Multi-Objective Feature Selection, Electronics, Vol. 14, No. 20, Art. No. 4095, 2025.

[2] Neto, E. C. P., Dadkhah, S., Ferreira, R., Zohourian, A., Lu, R., Ghorbani, A. A., CICIoT2023: A Real-Time Dataset and Benchmark for Large-Scale Attacks in IoT Environment, Sensors, Vol. 23, No. 13, Art. No. 5941, 2023.

[3] Alsamiri, J., Alsubhi, K., Internet of Things Cyber Attacks Detection Using Machine Learning, International Journal of Advanced Computer Science and Applications (IJACSA), Vol. 10, No. 12, 2019.

[4] Churcher, A., Razdan, R., Ahmad, I., Tachtatzis, C., Sherwood, D., Weir, G., Andonovic, I., Michie, C., Tan, W. S., An Experimental Analysis of Attack Classification Using Machine Learning in IoT Networks, Sensors, Vol. 21, No. 2, Art. No. 446, 2021.

[5] Abebe, A., Gebeyehu, S., Alem, A., Internet of Things Attack Detection Using Machine Learning Algorithms, F1000Research, Vol. 14, Art. No. 230, 2026.

[6] Bzai, J., Alam, F., Dhafer, A., Bojovic, M., Altowaijri, S. M., Niazi, I. K., Mehmood, R., Machine Learning-Enabled Internet of Things (IoT): Data, Applications, and Industry Perspective, Electronics, Vol. 11, No. 17, Art. No. 2676, 2022.

[7] Blali, A., Dargaoui, S., Azrour, M., Guezzaz, A., Amounas, F., Alabdulatif, A., Analysis of Deep Learning-Based Intrusion Detection Systems in IoT Environments, EDPACS, Vol. 70, No. 11, Hal. 18–52, 2025.

[8] Ntayagabiri, J. P., Bentaleb, Y., Ndikumagenge, J., El Makhtoum, H., A Comparative Analysis of Supervised Machine Learning Algorithms for IoT Attack Detection and Classification, Journal of Computing Theories and Applications, Vol. 2, No. 3, Hal. 395–409, 2025.

[9] Saheed, Y. K., Abiodun, A. I., Misra, S., Holone, M. K., Colomo-Palacios, R., A Machine Learning-Based Intrusion Detection for Detecting Internet of Things Network Attacks, Alexandria Engineering Journal, Vol. 61, No. 12, Hal. 9395–9409, 2022.

[10] Firdaus, F. S., Hatta, P., Basori, B., Evaluating Ensemble Versus Non-Ensemble Machine Learning Performance with Preprocessing Techniques for IoT Intrusion Detection on CICIoT2023, Jurnal Teknik Informatika (JUTIF), Vol. 7, No. 1, Hal. 606–618, 2026.

[11] Dzaki, M. H., Nugraha, A., Luthfiarta, A., Riyanto, A. A. R., Novandian, Y. D., Accelerating Classification for IoT Attack Detection Using Decision Tree Model with Gini Impurity Tree-Based Feature Selection Technique, Jurnal Teknik Informatika (JUTIF), Vol. 6, No. 5, Hal. 3405–3418, 2025.

[12] Sarhan, M., Layeghy, S., Portmann, M., Feature Analysis for Machine Learning-Based IoT Intrusion Detection, arXiv preprint arXiv:2108.12732, 2022.

[13] Bensaoud, A., Kalita, J., Optimized Detection of Cyber-Attacks on IoT Networks via Hybrid Deep Learning Models, arXiv preprint arXiv:2502.11470, 2025.

[14] Nourildean, S. W., Ahmed, W. K., Sabri, A. A., Aziz, M., Intrusion Detection System Based Ensemble Machine Learning Model in AIoT Against Cyber Attacks, in Prosiding ASET 2025, Dubai, 2025, Hal. 1–7.

[15] Premalatha, D. V., Ramanujam, S., Ensemble-Based Intrusion Detection for IoT Networks Using the CICIoT2023 Dataset, Journal of Information Systems Engineering and Management (JISEM), Vol. 10, No. 21s, 2025.

[16] Gutierrez, J. A., Survey on Intrusion Detection Systems Based on Machine Learning Techniques for the Protection of Critical Infrastructure, Sensors, Vol. 23, No. 5, Art. No. 2415, 2023.

[17] Vassiliou, V., Network Attack Classification in IoT Using Support Vector Machines, Journal of Sensor and Actuator Networks, Vol. 10, No. 3, Art. No. 58, 2021.

[18] Chawla, N. V., Bowyer, K. W., Hall, L. O., Kegelmeyer, W. P., SMOTE: Synthetic Minority Over-sampling Technique, Journal of Artificial Intelligence Research, Vol. 16, Hal. 321–357, 2002.

[19] Sokolova, M., Lapalme, G., A Systematic Analysis of Performance Measures for Classification Tasks, Information Processing & Management, Vol. 45, No. 4, Hal. 427–437, 2009.

[20] Khraisat, A., Gondal, I., Vamplew, P., Kamruzzaman, J., Survey of Intrusion Detection Systems: Techniques, Datasets and Challenges, Cybersecurity, Vol. 2, Art. No. 20, 2019.

[21] Lundberg, S. M., Lee, S. I., A Unified Approach to Interpreting Model Predictions, Advances in Neural Information Processing Systems (NeurIPS), Vol. 30, Hal. 4765–4774, 2017.

[22] Al-Shibly, I., Burgas, L., Massana, J., Interpretable Intrusion Detection for IoT: A CNN-BiLSTM Permutation Importance Framework for Deep Feature Selection, Frontiers in Big Data, Vol. 9, Art. No. 1813265, 2026.

[23] Alahmari, S., Aleisa, N., Enhancing the CIC IoT Dataset 2023 for Improved Attack Detection through GANs Augmentation and Federated Learning, Journal of Computer Science, Hal. 1688–1704, 2025.

[24] Alabadi, M., Habbal, A., Wei, X., Industrial Internet of Things: Requirements, Architecture, Challenges, and Future Research Directions, IEEE Access, Vol. 10, Hal. 66374–66400, 2022.

[25] Gaber, T., Awotunde, J. B., Folorunso, S. O., Ajagbe, S. A., Eldesouky, E., Industrial Internet of Things Intrusion Detection Method Using Machine Learning and Optimization Techniques, Wireless Communications and Mobile Computing, Vol. 2023, Art. No. 3939895, Hal. 1–15, 2023.

[26] Farah, A., Cross-Dataset Evaluation for IoT Network Intrusion Detection, Master's Thesis, University of Wisconsin-Milwaukee, 2020.

[27] Cantone, M., Marrocco, C., Bria, A., On the Cross-Dataset Generalization of Machine Learning for Network Intrusion Detection, IEEE Access, Vol. 12, Hal. 144489–144508, 2024.

[29] Elangovan, R., Parthasarathy, D. D., Jawahar, M., Kaliyaperumal, P., Balusamy, B., Yogarajan, S., Venkatesan, V., Cross-Dataset Temporal and Semantic Generalization of Intrusion Detection Models for the Future Internet, 2026.