// ==========================================
// DOSYA: categorySchemas.js (FORM SORULARI VE SEÇENEKLERİ)
// ==========================================

const categorySchemas = {
  'agir_kapali_tir': [
    { id: 'f_0', label: 'Yükün Cinsi', options: ['Paletli Ürün / Koli', 'Tekstil / Askılı', 'Kuru Gıda'] },
    { id: 'f_1', label: 'Tahmini Tonaj', options: ['1-5 Ton', '5-15 Ton', '15-24 Ton (Tam Tır)'] },
  ],
  'agir_acik_tir': [
    { id: 'f_0', label: 'Yük Cinsi', options: ['Demir / Çelik Profil', 'İnşaat Malzemesi', 'Mermer / Kereste'] },
    { id: 'f_1', label: 'Tonaj', options: ['5-15 Ton', '15-25 Ton'] },
  ],
  'agir_parsiyel_yuk': [
    { id: 'f_0', label: 'Palet / Parça Adedi', options: ['1-2 Palet', '3-5 Palet', 'Birkaç Koli'] },
    { id: 'f_1', label: 'İstiflenebilirlik', options: ['Üzerine yük konulabilir', 'Hassas (Üzerine konulamaz)'] },
  ],
  'agir_lowbed': [
    { id: 'f_0', label: 'Makine / Yük', options: ['Ekskavatör / Loder', 'Vinç / Sondaj', 'Sanayi Presi / Trafo'] },
    { id: 'f_1', label: 'Gabari Durumu', options: ['Standart Ölçü', 'Geniş / Yüksek (Proje Yükü)'] },
  ],
  'agir_frigo': [
    { id: 'f_0', label: 'Isı Derecesi', options: ['Artı (+) Serin Zincir', 'Eksi (-) Derin Dondurucu'] },
    { id: 'f_1', label: 'Ürün Grubu', options: ['Taze Meyve/Sebze', 'Et ve Süt Ürünleri', 'İlaç/Medikal'] },
  ],
  'agir_konteyner': [
    { id: 'f_0', label: 'Konteyner Boyutu', options: ["20'lik Konteyner", "40'lık Konteyner"] },
    { id: 'f_1', label: 'Durum', options: ['Dolu (Liman-Fabrika)', 'Boş Konteyner'] },
  ],
  'nakliyat_evden_eve': [
    { id: 'f_0', label: 'Evin Büyüklüğü', options: ['1+1 Daire', '2+1 Daire', '3+1 Daire', '4+1 veya Villa'] },
    { id: 'f_1', label: 'Paketleme ve Montaj', options: ['Anahtar Teslim (Her şeyi usta yapsın)', 'Sadece Büyük Mobilyalar', 'Sadece Taşıma (Biz koliledik)'] },
    { id: 'f_2', label: 'Çıkış Katı & Asansör', options: ['Zemin Kat / Giriş', '1-3. Kat Arası', 'Yüksek Kat (Asansörlü)'] },
  ],
  'nakliyat_ofis': [
    { id: 'f_0', label: 'Ofis Büyüklüğü', options: ['1-5 Kişilik', '5-15 Kişilik', 'Komple Kat / Plaza'] },
    { id: 'f_1', label: 'Kurulum', options: ['Mobilyalar sökülüp kurulacak', 'Sadece nakliye'] },
  ],
  'nakliyat_parca_esya': [
    { id: 'f_0', label: 'Eşya Miktarı', options: ['1-2 Parça (B.Eşya/Koltuk)', 'Birkaç Koli / Çuval'] },
    { id: 'f_1', label: 'Hamaliye', options: ['Usta Taşısın (İşçi Gerekli)', 'Şoför Yeterli'] },
  ],
  'nakliyat_kamyonet': [
    { id: 'f_0', label: 'Süre', options: ['1-2 Saatlik', 'Yarım Gün', 'Tam Gün'] },
    { id: 'f_1', label: 'Kasa Tipi', options: ['Açık Kasa', 'Kapalı / Tenteli Kasa'] },
  ],
  'nakliyat_depolama': [
    { id: 'f_0', label: 'Eşya Kapasitesi', options: ['1+1 Ev Eşyası', '2+1 Ev Eşyası', '3+1 ve Üzeri'] },
    { id: 'f_1', label: 'Süre', options: ['1-3 Ay', '3-6 Ay', '6+ Ay'] },
  ],
  'nakliyat_ozel_esya': [
    { id: 'f_0', label: 'Özel Eşya Türü', options: ['Piyano', 'Çelik Kasa', 'Antika / Sanat Eseri', 'Sanayi Cihazı'] },
  ],
  'temizlik_ev': [
    { id: 'f_0', label: 'Oda Sayısı', options: ['1+1 / 1+0 Daire', '2+1 Daire', '3+1 Daire', 'Dubleks/Villa'] },
    { id: 'f_1', label: 'Hizmet Kapsamı', options: ['Yarım Gün (Yüzeysel)', 'Tam Gün (Detaylı)', 'Buharlı Dip Köşe'] },
    { id: 'f_2', label: 'Malzemeler', options: ['Temizlik Malzemelerini Ben Vereceğim', 'Personel Getirsin'] },
  ],
  'temizlik_bos_ev': [
    { id: 'f_0', label: 'Evin Durumu', options: ['İnşaat / Tadilat Sonrası', 'Sadece Eşyasız Boş Ev'] },
    { id: 'f_1', label: 'Cam Durumu', options: ['Standart Pencereler', 'Çok Sayıda Cam / Balkon'] },
  ],
  'temizlik_koltuk_hali': [
    { id: 'f_0', label: 'Yıkanacak Ürün', options: ['Koltuk Takımı', 'Sadece Halı / Stor', 'Koltuk + Yatak'] },
  ],
  'temizlik_ofis': [
    { id: 'f_0', label: 'Mekan m²', options: ['0-50 m²', '50-100 m²', '100-250 m²'] },
    { id: 'f_1', label: 'Sıklık', options: ['Tek Seferlik', 'Haftada 1 Gün', 'Haftada 3 Gün'] },
  ],
  'temizlik_cam': [
    { id: 'f_0', label: 'Mekan Tipi', options: ['Ev Camları', 'Dükkan Vitrini', 'Plaza / Dış Cephe'] },
  ],
  'temizlik_ilaclama': [
    { id: 'f_0', label: 'Mekan', options: ['Ev / Daire', 'Apartman Ortak Alanı', 'İş Yeri / Depo'] },
    { id: 'f_1', label: 'Haşere Türü', options: ['Hamamböceği', 'Fare / Kemirgen', 'Pire / Tahtakurusu'] },
  ],
  'oto_mekanik': [
    { id: 'f_0', label: 'Mekanik İhtiyaç', options: ['Motor Rektifiye & Conta', 'Triger Seti Değişimi', 'Şanzıman Tamiri'] },
    { id: 'f_1', label: 'Araç Durumu', options: ['Çalışıyor', 'Çalışmıyor (Çekici Lazım)'] },
  ],
  'oto_periyodik': [
    { id: 'f_0', label: 'Yakıt Tipi', options: ['Dizel', 'Benzin', 'LPG'] },
    { id: 'f_1', label: 'Bakım', options: ['Yağ + Tüm Filtreler', 'Bakım + Balata Kontrolü'] },
  ],
  'oto_elektrik_klima': [
    { id: 'f_0', label: 'Arıza', options: ['Akü / Marş Problemi', 'Klima Gazı / Soğutmuyor', 'Elektrik Arızası'] },
  ],
  'oto_kaporta': [
    { id: 'f_0', label: 'Hasar', options: ['Boyasız Göçük (PDR)', 'Lokal / Parça Boya', 'Komple Boya / Kaporta'] },
  ],
  'oto_kaplama': [
    { id: 'f_0', label: 'Uygulama', options: ['Şeffaf PPF Koruma', 'Renkli Folyo', 'Seramik Kaplama', 'Cam Filmi'] },
  ],
  'oto_kuafor': [
    { id: 'f_0', label: 'İşlem', options: ['Detaylı İç & Dış Kuaför', 'Koltuk Yıkama', 'Pasta Cila'] },
  ],
  'oto_lastik': [
    { id: 'f_0', label: 'İşlem', options: ['Lastik Değişimi & Balans', 'Patlak Tamiri', 'Mobil Lastikçi'] },
  ],
  'oto_ekspertiz': [
    { id: 'f_0', label: 'Paket', options: ['Standart Ekspertiz', 'Full Paket (Dyno Dahil)'] },
  ],
  'org_dugun': [
    { id: 'f_0', label: 'Etkinlik', options: ['Düğün', 'Nişan & Söz', 'Kına Gecesi', 'Evlilik Teklifi'] },
    { id: 'f_1', label: 'Kapsam', options: ['Her Şey Dahil', 'Sadece Süsleme'] },
  ],
  'org_dogum': [
    { id: 'f_0', label: 'Parti Türü', options: ['Çocuk Doğum Günü', 'Yetişkin / Sürpriz Parti', 'Baby Shower'] },
  ],
  'org_catering': [
    { id: 'f_0', label: 'Menü', options: ['Sıcak Yemek / Tabldot', 'Kokteyl & İkram', 'Lokma Döktürme'] },
    { id: 'f_1', label: 'Kişi Sayısı', options: ['0-50 Kişi', '50-150 Kişi', '150+ Kişi'] },
  ],
  'org_muzik': [
    { id: 'f_0', label: 'Eğlence Ekibi', options: ['Canlı Müzik / Orkestra', 'DJ Performans', 'Bando / Davul Zurna'] },
  ],
  'org_ekipman': [
    { id: 'f_0', label: 'Ekipman', options: ['Masa & Sandalye', 'Ses & Işık Sistemi', 'Hepsi Bir Arada'] },
  ],
  'org_pasta': [
    { id: 'f_0', label: 'İhtiyaç', options: ['Butik Pasta', 'Nikah Şekeri / Hediyelik', 'Çiçek Aranjmanı'] },
  ],
  'org_arac': [
    { id: 'f_0', label: 'Araç Türü', options: ['Lüks Gelin Arabası', 'VIP Minibüs (Vito)', 'Tekne / Yat'] },
  ],
  'org_dini': [
    { id: 'f_0', label: 'Hizmet', options: ['Dini Nikah & Mevlüt', 'Temsili Nikah Memuru', 'Gelinlik Özel Dikim'] },
  ],
  'tamir_beyaz_esya': [
    { id: 'f_0', label: 'Cihaz', options: ['Buzdolabı', 'Çamaşır Makinesi', 'Bulaşık Makinesi', 'Fırın'] },
    { id: 'f_1', label: 'Talep', options: ['Arıza & Tamir', 'Montaj'] },
  ],
  'tamir_tesisat': [
    { id: 'f_0', label: 'Sorun', options: ['Su Kaçağı Tespiti', 'Tıkanıklık Açma', 'Musluk / Batarya Montajı', 'Rezervuar Tamiri'] },
  ],
  'tamir_elektrik': [
    { id: 'f_0', label: 'İşlem', options: ['Avize & Aydınlatma Montajı', 'İnternet & Fiber Kablo', 'Priz / Sigorta Arızası'] },
  ],
  'tamir_mobilya': [
    { id: 'f_0', label: 'İşlem', options: ['Yeni Mobilya Kurulumu (IKEA vb.)', 'Söküm & Taşıma Kurulumu', 'Mobilya Tamiri'] },
  ],
  'tamir_kombi': [
    { id: 'f_0', label: 'Cihaz', options: ['Kombi', 'Klima', 'Doğalgaz Ocak Bağlantısı'] },
    { id: 'f_1', label: 'Talep', options: ['Periyodik Bakım', 'Arıza Tamiri', 'Petek Temizliği'] },
  ],
  'tamir_cilingir': [
    { id: 'f_0', label: 'Talep', options: ['Acil Çilingir (Kapıda Kaldım)', 'Kilit Göbeği Değişimi', 'Panjur Tamiri'] },
  ],
  'tamir_bilgisayar': [
    { id: 'f_0', label: 'Cihaz', options: ['Laptop (Dizüstü)', 'Masaüstü PC', 'Cep Telefonu'] },
    { id: 'f_1', label: 'Sorun', options: ['Ekran / Batarya Değişimi', 'Format & Yazılım', 'Donanım Arızası'] },
  ],
  'tamir_guvenlik': [
    { id: 'f_0', label: 'Sistem', options: ['Güvenlik Kamerası', 'Çanak Anten & Uydu', 'Görüntülü Diafon'] },
  ],
  'tamir_dusakabin': [
    { id: 'f_0', label: 'İşlem', options: ['Duşakabin Montajı', 'Su Sızdırma / Silikon Yenileme', 'Ayna Montajı'] },
  ],
  'tadilat_anahtar': [
    { id: 'f_0', label: 'Kapsam', options: ['Komple Ev Yenileme', 'Banyo & Mutfak Tadilatı', 'İş Yeri / Ofis'] },
    { id: 'f_1', label: 'Tasarım', options: ['3D İç Mimari Çizim Dahil', 'Sadece Ustalık'] },
  ],
  'tadilat_boya': [
    { id: 'f_0', label: 'Alan', options: ['Sadece 1 Oda', '2+1 / 3+1 Daire', 'Komple Bina'] },
    { id: 'f_1', label: 'Eşya', options: ['Ev Boş', 'Ev Dolu (Örtülecek)'] },
  ],
  'tadilat_zemin': [
    { id: 'f_0', label: 'İşlem', options: ['Banyo/Tuvalet Fayans', 'Mutfak Tezgahı', 'Parke Döşeme'] },
  ],
  'tadilat_cam_balkon': [
    { id: 'f_0', label: 'Sistem', options: ['Cam Balkon', 'Çelik Kapı', 'Alüminyum Korkuluk'] },
  ],
  'tadilat_cati': [
    { id: 'f_0', label: 'Çatı İşlemi', options: ['Çatı Tamiri & Oluk', 'Sıfırdan Çatı Yapımı', 'Su & Isı İzolasyonu'] },
  ],
  'tadilat_bahce': [
    { id: 'f_0', label: 'Bahçe İşlemi', options: ['Peyzaj & Çim', 'Ağaç Budama & Kesme', 'Tel Çit Çekimi'] },
  ],
  'tadilat_marangoz': [
    { id: 'f_0', label: 'İmalat', options: ['Özel Ölçü Dolap / Mutfak', 'Ahşap Merdiven / Deck', 'Koltuk Döşeme'] },
  ],
  'tadilat_prefabrik': [
    { id: 'f_0', label: 'Yapı Türü', options: ['Prefabrik / Çelik Ev', 'Ahşap Bungalov', 'Bina Yıkım & Hafriyat'] },
  ],
  'ders_okul': [
    { id: 'f_0', label: 'Branş', options: ['Matematik & Geometri', 'Fen Bilimleri (Fizik/Kimya)', 'Türkçe & Sözel'] },
    { id: 'f_1', label: 'Seviye', options: ['İlkokul / Ortaokul (LGS)', 'Lise (YKS)', 'KPSS / DGS'] },
    { id: 'f_2', label: 'Şekil', options: ['Yüz Yüze (Evimde)', 'Online'] },
  ],
  'ders_dil': [
    { id: 'f_0', label: 'Dil', options: ['İngilizce', 'Almanca', 'İspanyolca', 'IELTS/TOEFL'] },
  ],
  'ders_muzik': [
    { id: 'f_0', label: 'Enstrüman', options: ['Gitar', 'Piyano', 'Keman', 'Şan (Vokal)'] },
  ],
  'ders_direksiyon': [
    { id: 'f_0', label: 'Araç / Seviye', options: ['Otomatik Vites (Pratik)', 'Manuel Vites (Pratik)', 'Sıfırdan Ehliyet Eğitimi'] },
  ],
  'ders_koc': [
    { id: 'f_0', label: 'Hizmet', options: ['Eğitim / Öğrenci Koçluğu', 'Oyun & Ödev Ablası', 'Özel Eğitim (Disleksi)'] },
  ],
  'ders_spor': [
    { id: 'f_0', label: 'Branş', options: ['Yüzme', 'Kick Boks / Savunma', 'Pilates / Yoga'] },
  ],
  'ders_mesleki': [
    { id: 'f_0', label: 'Alan', options: ['AutoCAD & Tasarım', 'E-Ticaret & Muhasebe', 'Diksiyon & Hızlı Okuma'] },
  ],
  'ders_dini': [
    { id: 'f_0', label: 'Eğitim', options: ['Kuran-ı Kerim Okuma', 'Hafızlık Eğitimi'] },
  ],
  'medya_dugun': [
    { id: 'f_0', label: 'Çekim', options: ['Düğün & Dış Çekim', 'Nişan & Söz', 'Doğum Günü'] },
    { id: 'f_1', label: 'Kapsam', options: ['Fotoğraf Albümü', 'Fotoğraf + Video Klibi'] },
  ],
  'medya_kurumsal': [
    { id: 'f_0', label: 'Proje', options: ['Ürün / E-Ticaret Çekimi', 'Kurumsal Tanıtım Filmi', 'Drone Çekimi'] },
  ],
  'medya_sosyal': [
    { id: 'f_0', label: 'İhtiyaç', options: ['Sosyal Medya / Reels Çekimi', 'Video Edit & Kurgu'] },
  ],
  'pet_kuafor': [
    { id: 'f_0', label: 'Evcil Hayvan', options: ['Kedi', 'Köpek (Küçük Irk)', 'Köpek (Büyük Irk)'] },
    { id: 'f_1', label: 'İşlem', options: ['Tıraş + Banyo', 'Sadece Yıkama & Tarama'] },
  ],
  'pet_pansiyon': [
    { id: 'f_0', label: 'Konuk', options: ['Kedi Pansiyonu', 'Köpek Pansiyonu / Oteli'] },
  ],
  'pet_egitim': [
    { id: 'f_0', label: 'Eğitim', options: ['Tuvalet & Temel İtaat', 'İleri İtaat & Sosyalleşme'] },
  ],
  'pet_bakim': [
    { id: 'f_0', label: 'Hizmet', options: ['Köpek Gezdirme', 'Evde Gözetim & Bakım (Mama/Su)'] },
  ],
  'saglik_terapi': [
    { id: 'f_0', label: 'Uzmanlık', options: ['Bireysel Yetişkin Terapisi', 'Çift & Aile Danışmanlığı', 'Çocuk / Ergen Terapisi'] },
    { id: 'f_1', label: 'Görüşme', options: ['Yüz Yüze (Klinik)', 'Online'] },
  ],
  'saglik_diyet': [
    { id: 'f_0', label: 'Hedef', options: ['Kilo Verme', 'Sporcu Beslenmesi', 'Hastalıkta Beslenme'] },
  ],
  'saglik_fizyoterapi': [
    { id: 'f_0', label: 'Şikayet', options: ['Bel / Boyun Fıtığı', 'Ameliyat Sonrası Rehabilitasyon', 'Manuel Lenf Drenajı'] },
  ],
  'spor_pt': [
    { id: 'f_0', label: 'Hedef', options: ['Kilo Verme & Sıkılaşma', 'Kas Kazanımı / Hacim', 'Fonksiyonel Antrenman'] },
  ],
  'spor_pilates': [
    { id: 'f_0', label: 'Ders', options: ['Birebir Reformer (Aletli)', 'Grup Reformer'] },
  ],
  'guzellik_kuafor': [
    { id: 'f_0', label: 'İşlem', options: ['Saç Kesim & Fön', 'Saç Boya & Ombre', 'Mikro Kaynak'] },
  ],
  'guzellik_gelin': [
    { id: 'f_0', label: 'Etkinlik', options: ['Gelin Saç & Makyaj', 'Nişan / Söz Saç Makyajı'] },
  ],
  'guzellik_tirnak': [
    { id: 'f_0', label: 'İşlem', options: ['Yeni Protez Tırnak (Jel)', 'Kalıcı Oje & Manikür', 'Protez Bakım & Çıkarma'] },
  ],
  'guzellik_epilasyon': [
    { id: 'f_0', label: 'Hizmet', options: ['Lazer Epilasyon (Kadın/Erkek)', 'Medikal Cilt Bakımı'] },
  ],
  'guzellik_dovme': [
    { id: 'f_0', label: 'Hizmet', options: ['Profesyonel Dövme Yapımı', 'Dövme Silme (Lazer)', 'Relax / Medikal Masaj'] },
  ],
  'dijital_pazarlama': [
    { id: 'f_0', label: 'Hizmet', options: ['Sosyal Medya Yönetimi', 'Google Ads Reklamları', 'SEO Çalışması'] },
  ],
  'dijital_yazilim': [
    { id: 'f_0', label: 'Proje', options: ['E-Ticaret Sitesi', 'Kurumsal Web Sitesi', 'Mobil Uygulama'] },
  ],
  'dijital_grafik': [
    { id: 'f_0', label: 'Tasarım', options: ['Logo & Kurumsal Kimlik', '3D Ürün Modelleme', 'Sosyal Medya Görsel Tasarım'] },
  ],
  'dijital_danismanlik': [
    { id: 'f_0', label: 'Danışmanlık', options: ['Şirket Kuruluşu (Şahıs/Ltd)', 'Marka Tescil & Patent', 'KOSGEB Destekleri'] },
  ],
  'dijital_tercume': [
    { id: 'f_0', label: 'Hizmet', options: ['Yeminli / Normal Tercüme', 'Makale & Reklam Metni Yazarlığı', 'CV Hazırlama'] },
  ],
  'dijital_matbaa': [
    { id: 'f_0', label: 'Baskı', options: ['Kartvizit', 'Katalog', 'Broşür', 'Işıklı / Kutu Harf Tabela', 'Tişört / Tekstil Baskı'] },
  ],
  'danismanlik_terzi': [
    { id: 'f_0', label: 'İşlem', options: ['Özel Elbise / Kıyafet Dikimi', 'Perde Dikimi & Tadilat', 'Kıyafet Tadilatı'] },
  ],
  'danismanlik_karavan': [
    { id: 'f_0', label: 'Hizmet', options: ['Panelvan Karavan Dönüşümü', 'Karavan Kiralama', 'Karavan Tamir & Bakım'] },
  ],
};