# BAB 1 PENDAHULUAN

## 1.1 Latar Belakang

%% Jelaskan latar belakang masalah yang diangkat pada proyek akhir. Fokus pada problem domain dari judul penelitian serta tingkat urgensinya. Latar belakang dapat berisi penjelasan mengenai kondisi, dampak, atau peningkatan kasus yang membuat masalah tersebut penting untuk diteliti. %%
Perkembangan Internet of Things (IoT) dan Industrial Internet of Things (IIoT) telah mendorong adopsi perangkat terhubung secara masif di berbagai sektor, mulai dari konsumen rumahan hingga infrastruktur industri kritis. Ekspansi ini membuka permukaan serangan yang luas bagi penyerang siber, sementara karakteristik domain yang berbeda — IoT yang bersifat consumer-focused dan IIoT yang bersifat industri-focused — menambahkan kompleksitas dalam perancangan sistem keamanan jaringan. Untuk menjawab tantangan ini, komunitas riset telah menghasilkan dataset benchmark seperti CICIoT2023 dan DataSense (CIC IIoT 2025) guna memfasilitasi pengembangan dan evaluasi IDS berbasis machine learning.

CICIoT2023 dirancang sebagai dataset serangan IoT berskala besar yang dibangun di atas topologi nyata dengan 105 perangkat dan 33 skenario serangan dalam tujuh kategori. Dataset ini telah menjadi benchmark utama bagi berbagai penelitian IDS berbasis machine learning yang menghasilkan berbagai model IDS terpublikasi dengan performa kompetitif [8], [10], [11]. Di sisi lain, DataSense sebagai CIC IIoT 2025 menghadirkan testbed IIoT yang realistis di laboratorium CIC-UNB, meliputi sensor industri berbasis Arduino MKR WiFi 1010 (cuaca, air, tanah, uap, gas, suara, getar, ultrasonik, cahaya, akselerometer, gerak, RFID, dan api), kamera pengawas, smart plug, serta MQTT broker berbasis Raspberry Pi, dan mengintegrasikan data sensor serta jaringan yang disinkronkan dengan pendekatan multi-objective feature selection [1]. Kombinasi kedua dataset ini menjadikan studi cross-dataset menarik untuk dieksplorasi lebih lanjut.

Berdasarkan celah tersebut, penelitian ini bertujuan melakukan evaluasi cross-dataset terhadap generalisasi model deteksi intrusi IoT/IIoT, dengan menggunakan model-model yang telah dipublikasikan dari CICIoT2023 dan mengujinya pada dataset DataSense (CIC IIoT 2025). Penelitian ini akan menganalisis karakteristik kedua dataset secara mendalam, mengevaluasi performa berbagai keluarga algoritma machine learning — meliputi tree-based, ensemble, dan deep learning — lintas domain, mengidentifikasi fitur yang paling robust, serta menghasilkan rekomendasi praktis bagi peneliti yang ingin menerapkan machine learning pada dataset CIC IIoT 2025 sebagai rujukan foundational.


## 1.2 Permasalahan

%% Jelaskan secara jelas permasalahan yang ingin diteliti pada proyek akhir. Fokus pada problem dari judul penelitian dan uraikan secara deskriptif faktor-faktor yang menyebabkan masalah tersebut penting serta membutuhkan solusi melalui penelitian. %%
Penelitian ini berangkat dari permasalahan bahwa model intrusion detection berbasis machine learning yang dilatih pada dataset IoT sering kali menunjukkan performa tinggi secara in-dataset, namun belum terbukti mampu mempertahankan performa yang sama ketika diterapkan pada lingkungan IIoT yang memiliki karakteristik berbeda. Perbedaan jenis perangkat, protokol, pola trafik, dan kondisi operasional antara CICIoT2023 dan DataSense (CIC IIoT 2025) berpotensi menimbulkan domain shift yang signifikan sehingga menurunkan kemampuan generalisasi model [1], [2].

## 1.3 Tujuan

%% Jelaskan tujuan penelitian proyek akhir secara jelas, singkat, dan menunjukkan orisinalitas solusi yang ditawarkan. Tujuan dapat diawali dengan penjelasan mengenai pendekatan, metode, atau teknik yang digunakan untuk menyelesaikan permasalahan, lalu dilanjutkan dengan uraian fitur atau keunggulan unik dari solusi tersebut. %%
==tujuan: kerangka evaluasi cross-dataset — menguji generalisasi model IDS berbasis ML dari IoT konsumen (CICIoT2023) ke IIoT industri (DataSense). 4 keunggulan: (1) pengukuran generalization gap CICIoT2023→DataSense secara kuantitatif; (2) komparasi DT/RF/XGBoost untuk melihat pengaruh kompleksitas ensemble terhadap generalisasi lintas domain; (3) analisis feature robustness — identifikasi subset fitur CICIoT2023 yang tetap prediktif di DataSense; (4) foundational reference untuk peneliti yang mulai bekerja dengan DataSense. Ref [1][2][8][10][11].==
Penelitian proyek akhir ini mengajukan suatu kerangka evaluasi baru untuk mengatasi permasalahan generalisasi model *intrusion detection* berbasis machine learning lintas domain IoT dan IIoT, dengan menggunakan pendekatan evaluasi *cross-dataset* yang secara sistematis menguji model-model yang dikembangkan pada CICIoT2023 terhadap dataset DataSense (CIC IIoT 2025).

Kerangka evaluasi yang diajukan memiliki beberapa keunggulan unik. Pertama, penelitian ini merupakan studi pertama yang secara eksplisit mengukur *generalization gap* antara domain IoT konsumen (CICIoT2023) dan domain IIoT industri (DataSense), sehingga menghasilkan pemahaman kuantitatif tentang seberapa jauh model yang bekerja baik secara *in-dataset* mampu bertahan di lingkungan yang berbeda. Kedua, evaluasi dilakukan secara komparatif terhadap tiga algoritma dengan tingkat kompleksitas ensemble yang berbeda — Decision Tree (model pohon tunggal yang interpretable), Random Forest (*ensemble bagging*), dan XGBoost (*ensemble boosting*) sehingga menghasilkan gambaran tentang bagaimana peningkatan kompleksitas ensemble memengaruhi kemampuan generalisasi lintas domain. Ketiga, penelitian ini menganalisis ketahanan fitur (*feature robustness*) secara lintas domain dengan mengidentifikasi subset fitur dari CICIoT2023 yang mempertahankan daya prediktif ketika diterapkan pada DataSense. Keempat, hasil penelitian dikemas sebagai rekomendasi praktis yang dapat langsung digunakan oleh peneliti yang ingin menjadikan DataSense sebagai titik awal pengembangan sistem IDS berbasis ML untuk lingkungan IIoT.

## 1.4 Manfaat

%% Jelaskan kontribusi proyek akhir terhadap pengembangan ilmu, teknologi, atau penyelesaian masalah tertentu. Uraikan secara spesifik pihak yang mendapatkan manfaat dari penelitian serta bentuk manfaat yang diberikan. %%
==manfaat penelitian ini menyasar tiga kelompok. Pertama, komunitas riset keamanan IoT/IIoT: penelitian mengisi celah literatur dengan studi cross-dataset yang mengukur generalisasi IDS lintas domain — sesuatu yang belum pernah dilakukan sebelumnya oleh [8], [10], maupun [11]; hasilnya menjadi referensi perancangan eksperimen sejenis. Kedua, peneliti yang ingin bekerja dengan DataSense (CIC IIoT 2025) yang baru dan sangat berpotensi: penelitian ini menjadi foundational reference yang menyediakan pemahaman awal tentang karakteristik dataset, distribusi kelas, dan baseline performa berbagai algoritma sehingga peneliti berikutnya tidak perlu mulai dari nol. Ketiga, praktisi dan developer sistem keamanan IoT/IIoT: mendapat panduan empiris tentang keluarga algoritma dan konfigurasi fitur yang paling layak untuk deployment lintas domain, sekaligus peringatan terhadap risiko overfitting yang kerap terjadi dalam pengembangan IDS berbasis ML.==
Penelitian ini memberikan kontribusi yang dapat dirasakan oleh beberapa pihak. Bagi komunitas riset keamanan jaringan IoT/IIoT, penelitian ini mengisi celah literatur yang selama ini belum ditangani, yaitu studi *cross-dataset* yang mengukur kemampuan generalisasi model IDS dari domain IoT konsumen ke domain IIoT industri. Hasil evaluasi kuantitatif yang dihasilkan dapat menjadi referensi dalam perancangan eksperimen penelitian sejenis di masa mendatang.

Bagi peneliti yang ingin bekerja dengan dataset DataSense (CIC IIoT 2025), penelitian ini berfungsi sebagai *foundational reference* — menyediakan pemahaman awal tentang karakteristik dataset, distribusi kelas, dan performa baseline berbagai algoritma, sehingga peneliti berikutnya tidak perlu memulai dari nol. Bagi praktisi dan pengembang sistem keamanan IoT/IIoT, penelitian ini memberikan panduan empiris tentang keluarga algoritma dan konfigurasi fitur yang paling layak dipertimbangkan untuk skenario deployment lintas domain, sekaligus mengingatkan risiko overfitting terhadap karakteristik satu dataset spesifik yang kerap terjadi dalam pengembangan IDS berbasis ML.

## 1.5 Sistematika Penulisan

Jelaskan tentang sistematika pembahasan dalam buku proyek akhir yang meliputi:

**BAB 1** Pendahuluan
Bab ini menguraikan latar belakang permasalahan terkait meningkatnya ancaman serangan siber pada jaringan IoT dan IIoT serta keterbatasan pendekatan Intrusion Detection System (IDS) konvensional dalam menghadapinya. Di dalam bab ini juga dirumuskan pertanyaan penelitian, tujuan utama yang ingin dicapai, serta batasan masalah agar pengembangan sistem deteksi intrusi berbasis machine learning ini lebih terarah. Selain itu, bagian ini menjabarkan manfaat penelitian secara praktis maupun teoretis, sekaligus memberikan gambaran umum mengenai sistematika penulisan laporan dari awal hingga akhir.

**BAB 2** Kajian Pustaka
Bab ini membahas landasan teoretis yang menjadi fondasi utama dalam pengembangan sistem, meliputi konsep dasar IoT dan IIoT, karakteristik ancaman keamanan jaringan, serta prinsip kerja Intrusion Detection System berbasis anomali. Pembahasan teknis juga diuraikan secara mendalam, mencakup algoritma-algoritma machine learning yang digunakan seperti Decision Tree, Random Forest, k-NN, Naive Bayes, SVM, dan Logistic Regression, beserta karakteristik dataset CICIoT2023 sebagai sumber data penelitian. Selain itu, bab ini memuat tinjauan terhadap berbagai penelitian terdahulu yang relevan untuk menunjukkan posisi kebaruan serta memperkuat argumen ilmiah dari pendekatan yang diusulkan.

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

==IoT bersifat resource-constrained (komputasi, memori, baterai terbatas) sementara IIoT menambah kompleksitas berupa heterogenitas perangkat, campuran protokol terstandarisasi dan proprietary, serta tuntutan latensi dan keandalan ekstrem — keduanya tidak bisa diamankan dengan solusi keamanan konvensional. Inti permasalahan: model ML yang dilatih pada satu dataset IoT sering mencapai akurasi tinggi secara in-dataset, namun belum terbukti mampu mempertahankan performa ketika diterapkan ke domain yang berbeda secara statistik dan operasional (domain shift). Konkretnya: CICIoT2023 mewakili IoT konsumen (105 perangkat, 33 serangan, 46 juta baris, 48 fitur) sedangkan DataSense mewakili IIoT industri (50 skenario serangan, sensor Arduino via MQTT broker tersinkronisasi dengan trafik jaringan, multi-objective feature selection) — dua karakteristik domain yang sangat berbeda. Ref [1][2][3][11].==

## 2.2 Teori Penunjang

### 2.2.1 Internet of Things (IoT)

Internet of Things (IoT) adalah paradigma jaringan yang menghubungkan perangkat fisik maupun virtual — sensor, aktuator, kamera, dan berbagai perangkat cerdas lainnya — ke internet, memungkinkan komunikasi mesin-ke-mesin (M2M) tanpa intervensi manusia [3], [11]. Konsep ini sudah diterapkan luas di berbagai sektor, mulai dari pertanian, rumah tangga pintar, layanan kesehatan, transportasi, hingga otomasi industri [3], [4]. Menurut Dzaki et al. [11], pada akhir tahun 2020 terdapat 11,3 miliar perangkat IoT yang terhubung dan diperkirakan akan mencapai 27,1 miliar pada tahun 2025, didorong oleh kemudahan pengumpulan data dan otomasi proses yang ditawarkan teknologi ini.

Karakteristik utama perangkat IoT yang membedakannya dari perangkat komputasi konvensional adalah keterbatasan sumber daya: kapasitas penyimpanan rendah, daya komputasi terbatas, dan konsumsi energi minimal [3], [11]. Menurut Alsamiri dan Alsubhi [3], perangkat IoT umumnya terhubung tanpa intervensi manusia dalam jangka waktu panjang, sehingga dibutuhkan solusi keamanan berbasis jaringan yang cerdas — bukan solusi konvensional berkapasitas tinggi yang tidak cocok untuk lingkungan IoT. Perluasan ekosistem IoT inilah yang sekaligus memperbesar *attack surface* bagi pelaku ancaman siber.

==IoT adalah paradigma jaringan yang memungkinkan perangkat fisik berkomunikasi secara machine-to-machine tanpa intervensi manusia; diterapkan luas di sektor pertanian, rumah tangga pintar, layanan kesehatan, transportasi, hingga otomasi industri. Skala adopsinya masif: 11,3 miliar perangkat pada tahun 2020 dan diproyeksikan mencapai 27,1 miliar pada 2025. Karena perangkat IoT bersifat resource-constrained — kapasitas penyimpanan rendah, komputasi terbatas, konsumsi energi minimal — solusi keamanan konvensional tidak cocok; dibutuhkan solusi berbasis jaringan yang ringan. Semakin besar ekosistem IoT, semakin luas pula attack surface bagi pelaku ancaman siber. Ref [3][4][6][11].==

### 2.2.2 Industrial Internet of Things (IIoT)

Industrial Internet of Things (IIoT) merupakan perluasan konsep IoT pada lingkungan industri, mengintegrasikan sensor industri, mesin, dan infrastruktur jaringan untuk mengoptimalkan proses produksi serta mendukung pengambilan keputusan berbasis data secara real-time [1]. Firouzi et al. [1] menjabarkan penerapan IIoT di berbagai sektor kritis:

- **Manufaktur**: sistem perawatan prediktif (*predictive maintenance*) yang meminimalkan waktu henti dan mengaktifkan model produksi *just-in-time*.
- **Energi**: pemantauan jaringan listrik secara real-time, optimasi integrasi energi terbarukan, dan manajemen beban canggih.
- **Kesehatan**: monitoring pasien kontinu melalui perangkat medis cerdas dan diagnostik jarak jauh.
- **Transportasi**: manajemen armada cerdas dan optimasi lalu lintas real-time.
- **Pertanian**: *precision farming* termasuk monitoring tanah, irigasi otomatis, dan pelacakan ternak.

Gambar 2.1 mengilustrasikan arsitektur testbed IIoT yang digunakan Firouzi et al. [1] dalam membangun dataset DataSense, yang terdiri dari lima lapisan utama: IIoT/IoT Layer, Network Infrastructure, Edge Layer, Cloud Layer, dan Attacker Layer.

Sumber: Firouzi et al., DataSense, Electronics 2025 [1]

Gambar 2.1. Arsitektur testbed IIoT DataSense di CIC-UNB

Tantangan keamanan IIoT jauh lebih kompleks dari IoT konsumen. IDS konvensional yang dirancang untuk jaringan IT tradisional tidak mampu menangani heterogenitas perangkat, volume data real-time yang masif, serta tuntutan latensi dan keandalan ekstrem pada lingkungan industri [1]. Perbedaan protokol komunikasi (sebagian standar, sebagian proprietary) dan konteks operasional yang sangat spesifik menyebabkan IDS konvensional sulit membedakan variasi operasional normal dari ancaman nyata [1].

==IIoT adalah perluasan IoT ke lingkungan industri, menghubungkan sensor industri, mesin, dan infrastruktur jaringan untuk mendukung pengambilan keputusan berbasis data secara real-time di sektor manufaktur, energi, kesehatan, transportasi, dan pertanian. Gambar 2.1 mengilustrasikan arsitektur testbed IIoT DataSense yang terdiri dari lima lapisan: IIoT/IoT Layer (sensor Arduino + kamera + smart plug via MQTT), Network Infrastructure (router, switch, AP), Edge Layer (Raspberry Pi + RADM), Cloud Layer (Elasticsearch + Kafka + GADM), Attacker Layer (Raspberry Pi Kali Linux). Tantangan keamanannya jauh lebih kompleks dari IoT konsumen: heterogenitas perangkat, volume data masif, tuntutan latensi ekstrem, serta campuran protokol standar dan proprietary membuat IDS konvensional tidak mampu membedakan variasi operasional normal dari ancaman nyata. Ref [1].==

### 2.2.3 Intrusion Detection System (IDS)

Intrusion Detection System (IDS) adalah mekanisme pengawasan jaringan yang secara otomatis menganalisis trafik untuk mengidentifikasi aktivitas mencurigakan atau berbahaya yang berpotensi mengancam keamanan sistem. Secara umum, IDS diklasifikasikan ke dalam dua kategori utama berdasarkan pendekatan deteksinya: *signature-based detection* dan *anomaly-based detection* [16]. *Signature-based* IDS bekerja dengan mencocokkan pola trafik terhadap basis data *signature* serangan yang telah diketahui; pendekatan ini efektif untuk serangan terdokumentasi namun tidak mampu mendeteksi serangan *zero-day* yang belum memiliki *signature*. Sebaliknya, *anomaly-based* IDS membangun model perilaku trafik normal dan menandai setiap deviasi signifikan sebagai potensi ancaman, sehingga secara teoritis mampu mendeteksi serangan yang belum pernah ditemui sebelumnya [16].

Perkembangan machine learning telah mendorong pergeseran paradigma IDS dari pendekatan berbasis aturan ke pendekatan berbasis data. Saheed et al. [9] menegaskan bahwa algoritma machine learning mampu mempelajari pola trafik secara otomatis dari data historis dan menghasilkan model klasifikasi yang dapat membedakan trafik normal dari trafik serangan dengan akurasi kompetitif. Gutierrez [16] mengkonfirmasi bahwa IDS berbasis ML menjadi komponen fundamental dalam proteksi infrastruktur kritis karena kemampuannya menangani spektrum ancaman yang lebih luas dibandingkan sistem berbasis *signature*. Dalam konteks IoT dan IIoT, kebutuhan akan IDS berbasis ML semakin mendesak karena keterbatasan sumber daya perangkat dan heterogenitas protokol komunikasi membuat solusi keamanan konvensional tidak dapat diterapkan secara efektif [3], [7].

### 2.2.4 Decision Tree

Decision Tree (DT) adalah algoritma pembelajaran terawasi non-parametrik yang membangun model klasifikasi dalam bentuk struktur pohon hierarkis, di mana setiap simpul internal merepresentasikan pengujian terhadap suatu atribut fitur, setiap cabang merepresentasikan hasil pengujian, dan setiap simpul daun (*leaf*) merepresentasikan label kelas [11]. Proses pembangunan pohon dilakukan secara rekursif menggunakan kriteria impuritas untuk memilih fitur pemisah terbaik di setiap langkah; dua kriteria yang paling umum digunakan adalah Gini Impurity dan Information Gain. Gini Impurity mengukur seberapa sering sampel yang dipilih secara acak dari suatu himpunan akan salah diklasifikasikan jika diberi label sesuai distribusi kelas pada himpunan tersebut, sehingga DT memilih pemisahan yang meminimalkan nilai Gini Impurity pada setiap simpul [11].

Karakteristik utama DT yang membuatnya relevan dalam konteks IDS adalah sifatnya yang sepenuhnya *interpretable* — setiap keputusan klasifikasi dapat dilacak kembali ke serangkaian aturan kondisional yang dapat dibaca manusia. Dzaki et al. [11] membuktikan bahwa DT dengan seleksi fitur berbasis Gini Impurity Tree-based berhasil mereduksi 48 fitur CICIoT2023 menjadi 10 fitur terpilih, menghasilkan pohon yang lebih dangkal (64 level dari 73 level *baseline*) dengan percepatan pelatihan 63,06% tanpa penurunan akurasi yang berarti. Dalam penelitian ini, DT difungsikan sebagai model *baseline* pohon tunggal yang menghasilkan batas keputusan eksplisit sekaligus sebagai fondasi komparatif terhadap algoritma *ensemble* yang lebih kompleks.

### 2.2.5 Random Forest

Random Forest (RF) adalah algoritma *ensemble* berbasis *bagging* yang membangun sejumlah pohon keputusan secara paralel, masing-masing dilatih pada subset data dan subset fitur yang dipilih secara acak, kemudian menggabungkan prediksi seluruh pohon melalui mekanisme *majority voting* untuk menghasilkan keputusan akhir [4]. Pengacakan ganda — pada level sampel data (*bootstrap sampling*) maupun pada level pemilihan fitur di setiap simpul (*random feature subspace*) — mereduksi korelasi antar pohon secara signifikan sehingga meningkatkan generalisasi model dan mengurangi risiko *overfitting* dibandingkan pohon keputusan tunggal. Sebagai efek samping dari proses pelatihan berbasis pohon, RF juga menghasilkan *feature importance score* yang dapat dimanfaatkan untuk seleksi fitur dalam pipeline IDS [10].

Dalam literatur IDS berbasis machine learning, Random Forest secara konsisten muncul sebagai model dengan performa tertinggi. Ntayagabiri et al. [8] melaporkan bahwa RF mencapai akurasi 99,29% pada CICIoT2023, melampaui seluruh model non-*ensemble* maupun *deep learning* yang dievaluasi. Premalatha dan Ramanujam [15] mengkonfirmasi dominansi RF dalam studi serupa pada dataset yang sama. Firdaus et al. [10] memanfaatkan *Random Forest Feature Importance* (RFFI) sebagai komponen dalam seleksi fitur hibrida, menunjukkan bahwa RF tidak hanya unggul sebagai model klasifikasi tetapi juga berperan dalam tahap seleksi fitur pada pipeline IDS secara keseluruhan.

### 2.2.6 Support Vector Machine (SVM)

Support Vector Machine (SVM) adalah algoritma pembelajaran terawasi yang bekerja dengan menemukan *hyperplane* optimal dalam ruang fitur berdimensi tinggi yang memisahkan kelas-kelas dengan *margin* maksimum [10]. Untuk data yang tidak dapat dipisahkan secara linear, SVM menggunakan fungsi kernel — seperti kernel RBF (*Radial Basis Function*), *polynomial*, atau *sigmoid* — untuk memetakan data ke ruang dimensi lebih tinggi di mana pemisahan linear menjadi dimungkinkan [17]. Konsep *margin* maksimum inilah yang memberikan SVM sifat generalisasi yang baik secara teoritis, karena *hyperplane* yang dipilih adalah yang paling jauh dari titik data terdekat dari masing-masing kelas (*support vectors*).

Vassiliou [17] mengevaluasi dua varian SVM — C-SVM dan OC-SVM — untuk deteksi serangan jaringan pada perangkat IoT berdaya rendah dan menemukan bahwa C-SVM mencapai akurasi 100% pada topologi jaringan yang dikenal, namun menurun menjadi 81% pada topologi yang belum pernah dilihat sebelumnya, mengindikasikan sensitivitas SVM terhadap pergeseran distribusi data. Firdaus et al. [10] mengevaluasi SVM dalam komparasi dengan model *ensemble* pada CICIoT2023 dan menemukan bahwa performa SVM sangat bergantung pada kualitas *preprocessing* — khususnya normalisasi fitur — karena sensitivitasnya terhadap skala fitur dalam perhitungan jarak kernel. Karakteristik ini menjadikan SVM sebagai algoritma yang relevan untuk dikaji dalam skenario *cross-dataset*, di mana konsistensi distribusi fitur lintas domain menjadi faktor penentu.

## 2.3 Penelitian Terkait

### 2.3.1 A Comparative Analysis of Supervised Machine Learning Algorithms for IoT Attack Detection and Classification [8]

Ntayagabiri et al. [8] melakukan analisis komparatif sepuluh algoritma *supervised learning* pada dataset CICIoT2023, mencakup tiga keluarga model: algoritma klasik (Naive Bayes, Logistic Regression, k-NN), *ensemble* (Random Forest, XGBoost, LightGBM), dan *deep learning* (ANN, CNN, LSTM, GRU). Random Forest mencapai akurasi tertinggi sebesar 99,29% dengan presisi 82,30%, diikuti XGBoost sebesar 99,26%. Di antara model *deep learning*, CNN unggul dengan akurasi 98,33%, sementara LSTM dan GRU masing-masing mencapai 97,60% dan 96,87%. Penelitian ini menyoroti bahwa nilai recall yang bervariasi antar algoritma — Random Forest 72,19%, XGBoost 71,69%, CNN 64,72% — mengindikasikan bahwa akurasi agregat yang tinggi belum tentu mencerminkan kemampuan deteksi yang merata pada seluruh kelas serangan, terutama kelas minoritas. Seluruh evaluasi dilakukan secara *in-dataset* pada CICIoT2023 tanpa pengujian lintas domain.

### 2.3.2 Evaluating Ensemble Versus Non-Ensemble Machine Learning Performance with Preprocessing Techniques for IoT Intrusion Detection on CICIoT2023 [10]

Firdaus et al. [10] mengevaluasi performa model *ensemble* dibandingkan non-*ensemble* dengan penekanan pada peran teknik *preprocessing* dalam meningkatkan stabilitas model pada CICIoT2023. Penelitian ini menerapkan *random undersampling* untuk mengatasi ketidakseimbangan kelas yang ekstrem, dikombinasikan dengan seleksi fitur hibrida yang memadukan *Mutual Information* (MI) dan *Random Forest Feature Importance* (RFFI). Lima model diuji — Naive Bayes, Logistic Regression, SVM, Random Forest, dan XGBoost — menggunakan *stratified 5-fold cross-validation*. XGBoost tampil sebagai model terbaik dengan *macro F1-score* rata-rata 0,8891 ± 0,0008. Kontribusi penting penelitian ini adalah pembuktian kuantitatif bahwa normalisasi bukan langkah opsional: Logistic Regression tanpa *scaling* menghasilkan F1-score tidak stabil sebesar 0,6280, namun melonjak menjadi 0,7691 setelah normalisasi Min-Max diterapkan. Sama seperti penelitian sebelumnya, eksperimen dilakukan sepenuhnya pada satu domain dataset yang sama.

### 2.3.3 Accelerating Classification for IoT Attack Detection Using Decision Tree Model with Gini Impurity Tree-Based Feature Selection Technique [11]

Dzaki et al. [11] mengembangkan pendekatan akselerasi klasifikasi serangan IoT berbasis seleksi fitur *Gini Impurity Tree-based* pada CICIoT2023. Penelitian ini membandingkan enam teknik seleksi fitur dari tiga kategori — *filter* (Fisher Score, Mutual Information), *wrapper* (Recursive Feature Elimination, Genetic Algorithm), dan *embedded* (Gini Impurity Tree-based, Lasso-based). *Gini Impurity Tree-based* terbukti paling efisien: menghasilkan subset 10 fitur dengan waktu pemrosesan hanya 40 detik, mempercepat pelatihan sebesar 63,06% dibandingkan baseline 48 fitur, dan menghasilkan pohon keputusan lebih dangkal (64 level dari 73 level) — semua tanpa penurunan akurasi yang berarti. Penelitian ini memfokuskan kontribusinya pada efisiensi komputasi dalam satu dataset, tanpa mengkaji apakah subset fitur yang dipilih bersifat robust ketika diterapkan pada domain dataset yang berbeda.

Ketiga penelitian di atas secara konsisten menghasilkan model dengan performa tinggi pada CICIoT2023, namun seluruhnya hanya melakukan evaluasi *in-dataset*. Tidak ada satu pun yang menguji apakah model atau fitur yang dihasilkan mampu mempertahankan performa ketika diterapkan pada domain IIoT industri yang berbeda secara statistik maupun operasional. Celah inilah yang menjadi motivasi penelitian ini: mengevaluasi kemampuan generalisasi *cross-dataset* dari model-model yang dikembangkan pada CICIoT2023 terhadap DataSense (CIC IIoT 2025), sekaligus mengidentifikasi fitur yang paling robust lintas kedua domain.


Tabel 2.1 Gap penelitian

| Ref  | Peneliti           | Tahun | Dataset       | Kelas      | Metode                                 | Hasil Terbaik  | Gap                                                                                                                      |
| ---- | ------------------ | ----- | ------------- | ---------- | -------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| [8]  | Ntayagabiri et al. | 2025  | CICIoT2023    | Multiclass | RF, XGBoost, LightGBM, CNN, LSTM, dll. | RF: 99.29%     | In-dataset only; recall rendah (72.19%); tidak uji generalisasi ke IIoT                                                  |
| [11] | Dzaki et al.       | 2025  | CICIoT2023    | Multiclass | DT + Gini Impurity FS                  | DT: 99.4%      | In-dataset only; 10 fitur terpilih tidak divalidasi di dataset lain; robustness fitur lintas domain tidak dieksplorasi   |
| [13] | Bensaoud & Kalita  | 2025  | CICIoT2023    | Multiclass | SOM + DBN + Autoencoder + PSO          | 99.99%         | In-dataset only; arsitektur DL berat tidak cocok edge IoT; tidak ada cross-dataset                                       |
| [22] | Al-Shibly et al.   | 2026  | CIC IIoT 2025 | **Binary** | CNN-BiLSTM + Permutation Importance    | DT+DFS: 97.20% | **Binary only** — tidak uji multiclass; in-dataset DataSense only; tidak ada evaluasi model dari CICIoT2023 ke DataSense |

Mau langsung sisipkan ke proposal Bab 2.3?

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

Pada pipeline **CICIoT2023**, pemrosesan data mencakup empat langkah berurutan. Pertama, *data cleaning*: menghapus baris duplikat, menangani nilai hilang (*missing values*) dengan strategi *drop-row*, dan menghapus fitur non-informatif seperti alamat IP sumber/tujuan, nomor *port*, dan *timestamp* yang tidak berkontribusi pada deteksi pola serangan. Kedua, *random undersampling*: mendistribusikan ulang kelas dengan mengambil sejumlah sampel yang sama dari setiap kelas — mengacu pada distribusi Dzaki et al. [11] yang menggunakan 437.853 sampel per kelas untuk 8 kelas, menurunkan total data dari 46 juta baris menjadi sekitar 3,5 juta baris. Ketiga, *Gini Impurity Tree-based feature selection*: memilih subset fitur paling relevan dari 48 fitur awal menggunakan algoritma Decision Tree dengan kriteria Gini Impurity, menghasilkan 10 fitur terpilih [11]. Keempat, *Min-Max normalization*: menskalakan semua nilai fitur ke rentang [0,1] menggunakan parameter minimum dan maksimum yang dihitung eksklusif dari data *training*.

Pada pipeline **DataSense**, pemrosesan data mengikuti langkah yang serupa dalam hal *cleaning* dan normalisasi, namun tidak melibatkan *undersampling* karena DataSense digunakan seluruhnya sebagai *test set*. Parameter normalisasi (nilai min dan max per fitur) yang digunakan adalah parameter yang sama yang dihitung dari data *training* CICIoT2023 — bukan dihitung ulang dari DataSense — untuk memastikan konsistensi transformasi lintas domain dan menghindari kebocoran informasi dari *test set* ke *training*.

### 3.2.2 Seleksi Fitur dan Penyelarasan Domain

Setelah tahap preprocessing, seleksi fitur pada pipeline CICIoT2023 menghasilkan subset fitur terpilih yang kemudian dicocokkan dengan fitur yang tersedia di DataSense melalui proses *feature alignment*.

*Feature alignment* dilakukan dengan membangun **interseksi fitur** — hanya fitur yang secara eksplisit tersedia di kedua CICIoT2023 dan DataSense yang dipertahankan sebagai input model saat evaluasi *cross-dataset*. Fitur CICIoT2023 yang tidak memiliki padanan semantik di DataSense dieliminasi dari pipeline evaluasi lintas domain. Jumlah fitur dalam interseksi ini menjadi salah satu variabel analisis utama: semakin kecil interseksi relatif terhadap jumlah fitur awal, semakin besar perbedaan ruang fitur yang harus dihadapi model.

Penyelarasan label kelas dilakukan bersamaan dengan penyelarasan fitur. Delapan kelas CICIoT2023, DDoS, DoS, Mirai, Benign, Spoofing, Recon, Web, dan Brute Force dipetakan ke **lima kelas bersama** yang tersedia di kedua dataset: DDoS, DoS, Reconnaissance, Brute Force, dan Benign. Kelas Mirai, Spoofing, dan Web-based pada CICIoT2023, serta kelas Man-in-the-Middle dan Malware pada DataSense, dieliminasi dari evaluasi *cross-dataset* karena tidak memiliki padanan langsung di dataset yang berlawanan. Pemetaan ini memastikan bahwa perbandingan performa model antar domain dilakukan pada basis kelas yang identik.

### 3.2.3 Pelatihan Model dan Evaluasi Cross-Dataset

Pelatihan model dilakukan pada data CICIoT2023 yang telah melewati seluruh tahap *preprocessing* dan seleksi fitur. Data CICIoT2023 yang telah bersih dibagi menggunakan *stratified split* 80:20, di mana 80% digunakan untuk *training* dan 20% digunakan untuk evaluasi *in-dataset*. *Stratified split* diterapkan untuk memastikan distribusi kelas yang proporsional di kedua partisi, mengingat data yang dipakai telah melalui *random undersampling* namun tetap perlu dijaga konsistensi distribusi kelasnya.

Tiga model dilatih secara independen menggunakan data *training* yang sama. **Decision Tree** dilatih dengan kriteria Gini Impurity sebagai model *baseline* pohon tunggal yang menghasilkan aturan klasifikasi yang sepenuhnya *interpretable*. **Random Forest** dilatih menggunakan mekanisme *bootstrap aggregating* di mana sejumlah pohon keputusan dibangun secara paralel pada subset data dan fitur yang berbeda, kemudian prediksi digabung melalui *majority voting*. **XGBoost** dilatih menggunakan *gradient boosting* sekuensial dengan regularisasi L1 dan L2 bawaan untuk mencegah *overfitting*, di mana setiap pohon baru difokuskan memperbaiki kesalahan residual model sebelumnya.

Evaluasi dilakukan dalam dua tahap yang menghasilkan dua set metrik berbeda. **Evaluasi *in-dataset*** mengaplikasikan ketiga model yang telah terlatih pada 20% *test set* CICIoT2023 untuk menghasilkan Macro F1, Accuracy, dan Recall per kelas pada domain asal (*F1*_in, *Acc*_in, *Rec*_in). **Evaluasi *cross-dataset*** mengaplikasikan model yang sama — tanpa modifikasi atau *retraining* apapun — pada seluruh DataSense yang telah diselaraskan fitur dan kelasnya, menghasilkan metrik yang setara pada domain target (*F1*_cross, *Acc*_cross, *Rec*_cross).

*Generalization gap* kemudian dihitung untuk masing-masing model sebagai:

$$\Delta \text{Macro F1} = \text{F1}_{\text{in}} - \text{F1}_{\text{cross}} \tag{Pers. 3.1}$$

Nilai Δ Macro F1 yang mendekati nol mengindikasikan kemampuan generalisasi yang tinggi, sementara nilai yang besar mengindikasikan adanya *domain shift* yang signifikan antara CICIoT2023 dan DataSense. Persamaan 3.1 dihitung untuk ketiga model secara terpisah, sehingga menghasilkan perbandingan langsung antara Decision Tree, Random Forest, dan XGBoost dalam hal ketahanan terhadap pergeseran domain. Model dengan Δ Macro F1 terkecil ditetapkan sebagai algoritma yang paling *robust* untuk skenario evaluasi lintas domain IoT ke IIoT.

## 3.3 Timeline Pengerjaan

==timeline

Studi Literatur & Analisis Kebutuhan
Penyusunan metodologi dan rancangan eksperimen
Persiapan, cleaning, dan preprocessing data cic iot 2023
Persiapan, cleaning, dan preprocessing data cic iot 2025
Implementasi baseline dan model utama
Evaluasi, tuning, dan analisis hasil
Pengujian & Evaluasi Sistem


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