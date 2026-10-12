// ==========================================
// DOSYA: categorySchemas.js (FORM SORULARI VE SEÇENEKLERİ)
// ==========================================

const categorySchemas = {
  // --- 1. AĞIR NAKLİYE ---
  'agir_kapali_tir': [
    { id: 'f_0', label: 'Yükün Cinsi', options: ['Paletli Ürün / Koli', 'Tekstil / Askılı', 'Kuru Gıda', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Tahmini Tonaj', options: ['1-5 Ton', '5-15 Ton', '15-24 Ton (Tam Tır)', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Forklift/Vinç İhtiyacı', options: ['Evet, gerekli', 'Hayır, gerekli değil'] },
    { id: 'f_3', label: 'Yük Sigortası', options: ['Evet, talep ediyorum', 'Hayır, istemiyorum'] }
  ],
  'agir_acik_tir': [
    { id: 'f_0', label: 'Yük Cinsi', options: ['Demir / Çelik Profil', 'İnşaat Malzemesi', 'Mermer / Kereste', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Tonaj', options: ['5-15 Ton', '15-25 Ton', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Forklift/Vinç İhtiyacı', options: ['Evet, gerekli', 'Hayır, gerekli değil'] },
    { id: 'f_3', label: 'Yük Sigortası', options: ['Evet, talep ediyorum', 'Hayır, istemiyorum'] }
  ],
  'agir_parsiyel_yuk': [
    { id: 'f_0', label: 'Palet / Parça Adedi', options: ['1-2 Palet', '3-5 Palet', 'Birkaç Koli', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'İstiflenebilirlik', options: ['Üzerine yük konulabilir', 'Hassas (Üzerine konulamaz)', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Forklift/Vinç İhtiyacı', options: ['Evet, gerekli', 'Hayır, gerekli değil'] },
    { id: 'f_3', label: 'Yük Sigortası', options: ['Evet, talep ediyorum', 'Hayır, istemiyorum'] }
  ],
  'agir_lowbed': [
    { id: 'f_0', label: 'Makine / Yük', options: ['Ekskavatör / Loder', 'Vinç / Sondaj', 'Sanayi Presi / Trafo', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Gabari Durumu', options: ['Standart Ölçü', 'Geniş / Yüksek (Proje Yükü)', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Forklift/Vinç İhtiyacı', options: ['Evet, gerekli', 'Hayır, gerekli değil'] },
    { id: 'f_3', label: 'Yük Sigortası', options: ['Evet, talep ediyorum', 'Hayır, istemiyorum'] }
  ],
  'agir_frigo': [
    { id: 'f_0', label: 'Isı Derecesi', options: ['Artı (+) Serin Zincir', 'Eksi (-) Derin Dondurucu', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Ürün Grubu', options: ['Taze Meyve/Sebze', 'Et ve Süt Ürünleri', 'İlaç/Medikal', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Forklift/Vinç İhtiyacı', options: ['Evet, gerekli', 'Hayır, gerekli değil'] },
    { id: 'f_3', label: 'Yük Sigortası', options: ['Evet, talep ediyorum', 'Hayır, istemiyorum'] }
  ],
  'agir_konteyner': [
    { id: 'f_0', label: 'Konteyner Boyutu', options: ["20'lik Konteyner", "40'lık Konteyner", 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Durum', options: ['Dolu (Liman-Fabrika)', 'Boş Konteyner', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Forklift/Vinç İhtiyacı', options: ['Evet, gerekli', 'Hayır, gerekli değil'] },
    { id: 'f_3', label: 'Yük Sigortası', options: ['Evet, talep ediyorum', 'Hayır, istemiyorum'] }
  ],
  'agir_damperli': [
    { id: 'f_0', label: 'Yük Cinsi', options: ['Hafriyat / Toprak', 'Kum / Çakıl / Mıcır', 'Kömür / Maden', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Tonaj / Sefer Sayısı', options: ['Tek Sefer', 'Günlük Kiralama', 'Düzenli Sefer', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Yük Sigortası', options: ['Evet, talep ediyorum', 'Hayır, istemiyorum'] }
  ],
  'agir_silobas': [
    { id: 'f_0', label: 'Ürün Cinsi', options: ['Çimento / Kum', 'Un / Gıda', 'Tahıl / Buğday', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Tahmini Tonaj', options: ['5-15 Ton', '15-25 Ton', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Yük Sigortası', options: ['Evet, talep ediyorum', 'Hayır, istemiyorum'] }
  ],
  'agir_tehlikeli': [
    { id: 'f_0', label: 'Madde Sınıfı', options: ['Yanıcı / Sıvı (Akaryakıt)', 'Kimyasal Madde', 'Basınçlı Gaz', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Taşıma Şekli', options: ['Tanker ile Taşıma', 'Varilli / Paletli', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Yük Sigortası', options: ['Evet, talep ediyorum', 'Hayır, istemiyorum'] }
  ],
  'agir_ototasiyici': [
    { id: 'f_0', label: 'Araç Sayısı', options: ['1-2 Araç', '3-5 Araç', '6-8 Araç (Tam Tır)', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Araç Tipi', options: ['Binek Otomobil', 'SUV / Pikap', 'Hafif Ticari', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Yük Sigortası', options: ['Evet, talep ediyorum', 'Hayır, istemiyorum'] }
  ],
  'agir_diger': [
    { id: 'f_0', label: 'Talep Ettiğiniz Hizmet', options: ['Diğer (Lütfen Belirtin)'] }
  ],

  // --- 2. NAKLİYAT ---
  'nakliyat_evden_eve': [
    { id: 'f_0', label: 'Evin Büyüklüğü', options: ['1+1 Daire', '2+1 Daire', '3+1 Daire', '4+1 veya Villa', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Paketleme ve Montaj', options: ['Anahtar Teslim (Her şeyi usta yapsın)', 'Sadece Büyük Mobilyalar', 'Sadece Taşıma (Biz koliledik)', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Çıkış Katı & Asansör', options: ['Zemin Kat / Giriş', '1-3. Kat Arası (Asansörsüz)', 'Yüksek Kat (Asansörlü)', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_3', label: 'Varış Katı & Asansör', options: ['Zemin Kat / Giriş', '1-3. Kat Arası (Asansörsüz)', 'Yüksek Kat (Asansörlü)', 'Diğer (Lütfen Belirtin)'] }
  ],
  'nakliyat_ofis': [
    { id: 'f_0', label: 'Ofis Büyüklüğü', options: ['1-5 Kişilik', '5-15 Kişilik', 'Komple Kat / Plaza', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Kurulum', options: ['Mobilyalar sökülüp kurulacak', 'Sadece nakliye', 'Diğer (Lütfen Belirtin)'] }
  ],
  'nakliyat_parca_esya': [
    { id: 'f_0', label: 'Eşya Miktarı', options: ['1-2 Parça (B.Eşya/Koltuk)', 'Birkaç Koli / Çuval', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Hamaliye', options: ['Usta Taşısın (İşçi Gerekli)', 'Şoför Yeterli', 'Diğer (Lütfen Belirtin)'] }
  ],
  'nakliyat_kamyonet': [
    { id: 'f_0', label: 'Süre', options: ['1-2 Saatlik', 'Yarım Gün', 'Tam Gün', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Kasa Tipi', options: ['Açık Kasa', 'Kapalı / Tenteli Kasa', 'Diğer (Lütfen Belirtin)'] }
  ],
  'nakliyat_depolama': [
    { id: 'f_0', label: 'Eşya Kapasitesi', options: ['1+1 Ev Eşyası', '2+1 Ev Eşyası', '3+1 ve Üzeri', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Süre', options: ['1-3 Ay', '3-6 Ay', '6+ Ay', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Nakliye Durumu', options: ['Eşyaları usta alıp depoya götürsün', 'Eşyaları depoya ben getireceğim', 'Diğer (Lütfen Belirtin)'] }
  ],
  'nakliyat_ozel_esya': [
    { id: 'f_0', label: 'Özel Eşya Türü', options: ['Piyano', 'Çelik Kasa', 'Antika / Sanat Eseri', 'Sanayi Cihazı', 'Diğer (Lütfen Belirtin)'] }
  ],
  'nakliyat_asansor': [
    { id: 'f_0', label: 'Kurulum Katı', options: ['1-5. Kat Arası', '5-10. Kat Arası', '10. Kat ve Üzeri', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Tahmini Süre', options: ['Saatlik', 'Yarım Gün', 'Tam Gün', 'Diğer (Lütfen Belirtin)'] }
  ],
  'nakliyat_diger': [
    { id: 'f_0', label: 'Talep Ettiğiniz Hizmet', options: ['Diğer (Lütfen Belirtin)'] }
  ],

  // --- 3. ULUSLARARASI TAŞIMACILIK ---
  'uluslararasi_zati': [
    { id: 'f_0', label: 'Eşya Hacmi', options: ['Sadece birkaç koli/parça', '1+1 Ev (Ort. 15m³)', '2+1 Ev (Ort. 25m³)', '3+1 ve üzeri', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Varış / Hedef Ülke', options: ['Almanya', 'Hollanda / Belçika', 'Fransa', 'İngiltere', 'Rusya / Türki Cumhuriyetler', 'Orta Doğu / Arap Yarımadası', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Gümrükleme İşlemleri', options: ['Firma/Usta İlgilensin', 'Kendim Halledeceğim'] }
  ],
  'uluslararasi_ticari': [
    { id: 'f_0', label: 'Taşıma Şekli', options: ['Komple Tır', 'Konteyner (Kara/Deniz/Tren)', 'Lowbed (Proje Yükü)', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Varış / Hedef Ülke', options: ['Avrupa Geneli', 'Rusya / Asya', 'Orta Doğu', 'Amerika / Uzak Doğu', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Gümrükleme İşlemleri', options: ['Firma/Usta İlgilensin', 'Kendim Halledeceğim'] }
  ],
  'uluslararasi_parsiyel': [
    { id: 'f_0', label: 'Yük Miktarı', options: ['1-2 Palet', '3-5 Palet', 'Koli / Sandık', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Varış / Hedef Ülke', options: ['Almanya', 'Hollanda / Belçika', 'Fransa', 'İngiltere', 'Rusya / Asya', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Gümrükleme İşlemleri', options: ['Firma/Usta İlgilensin', 'Kendim Halledeceğim'] }
  ],
  'uluslararasi_oto': [
    { id: 'f_0', label: 'Araç Tipi', options: ['Binek Otomobil', 'SUV / Pikap', 'Motosiklet', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Varış / Hedef Ülke', options: ['Almanya', 'Hollanda / Belçika', 'Diğer Avrupa Ülkeleri', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Gümrükleme İşlemleri', options: ['Firma/Usta İlgilensin', 'Kendim Halledeceğim'] }
  ],
  'uluslararasi_diger': [
    { id: 'f_0', label: 'Talep Ettiğiniz Hizmet', options: ['Diğer (Lütfen Belirtin)'] }
  ],

  // --- 4. TEMİZLİK ---
  'temizlik_ev': [
    { id: 'f_0', label: 'Oda Sayısı', options: ['1+1 / 1+0 Daire', '2+1 Daire', '3+1 Daire', 'Dubleks/Villa', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Hizmet Kapsamı', options: ['Yarım Gün (Yüzeysel)', 'Tam Gün (Detaylı)', 'Buharlı Dip Köşe', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Malzemeler', options: ['Temizlik Malzemelerini Ben Vereceğim', 'Personel Getirsin', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_3', label: 'Evcil Hayvan', options: ['Var', 'Yok'] }
  ],
  'temizlik_bos_ev': [
    { id: 'f_0', label: 'Oda Sayısı / Büyüklük', options: ['1+1 / 1+0 Daire', '2+1 Daire', '3+1 Daire', 'Dubleks/Villa', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Evin Durumu', options: ['İnşaat / Tadilat Sonrası', 'Sadece Eşyasız Boş Ev', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Cam Durumu', options: ['Standart Pencereler', 'Çok Sayıda Cam / Balkon', 'Diğer (Lütfen Belirtin)'] }
  ],
  'temizlik_koltuk_hali': [
    { id: 'f_0', label: 'Yıkanacak Ürün', options: ['Koltuk Takımı', 'Sadece Halı / Stor', 'Koltuk + Yatak', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Adet/Boyut', options: ['Standart Takım', 'Büyük L Koltuk', 'Çoklu Yatak', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Hizmet Yeri', options: ['Evde / Yerinde Yıkama', 'Alınıp Yıkanıp Getirilecek'] }
  ],
  'temizlik_ofis': [
    { id: 'f_0', label: 'Mekan m²', options: ['0-50 m²', '50-100 m²', '100-250 m²', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Sıklık', options: ['Tek Seferlik', 'Haftada 1 Gün', 'Haftada 3 Gün', 'Diğer (Lütfen Belirtin)'] }
  ],
  'temizlik_cam': [
    { id: 'f_0', label: 'Mekan Tipi', options: ['Ev Camları', 'Dükkan Vitrini', 'Plaza / Dış Cephe', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Ekipman İhtiyacı', options: ['Sepetli Vinç Gerekli', 'İçeriden Silinebilir', 'Diğer (Lütfen Belirtin)'] }
  ],
  'temizlik_ilaclama': [
    { id: 'f_0', label: 'Mekan', options: ['Ev / Daire', 'Apartman Ortak Alanı', 'İş Yeri / Depo', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Haşere Türü', options: ['Hamamböceği', 'Fare / Kemirgen', 'Pire / Tahtakurusu', 'Diğer (Lütfen Belirtin)'] }
  ],
  'temizlik_apartman': [
    { id: 'f_0', label: 'Kat Sayısı', options: ['1-3 Kat', '4-7 Kat', '8+ Kat / Site', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Sıklık', options: ['Haftada 1 Gün', 'Haftada 2 Gün', 'Tek Seferlik', 'Diğer (Lütfen Belirtin)'] }
  ],
  'temizlik_afet': [
    { id: 'f_0', label: 'Olay Türü', options: ['Su Baskını Sonrası', 'Yangın Sonrası', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Mekan Büyüklüğü', options: ['0-50 m²', '50-100 m²', '100+ m²', 'Diğer (Lütfen Belirtin)'] }
  ],
  'temizlik_diger': [
    { id: 'f_0', label: 'Talep Ettiğiniz Hizmet', options: ['Diğer (Lütfen Belirtin)'] }
  ],

  // --- 5. OTO SERVİS ---
  'oto_mekanik': [
    { id: 'f_0', label: 'Araç Marka/Model/Yıl', options: ['Açıklamaya Yazacağım'] },
    { id: 'f_1', label: 'Mekanik İhtiyaç', options: ['Motor Rektifiye & Conta', 'Triger Seti Değişimi', 'Şanzıman Tamiri', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Araç Durumu', options: ['Çalışıyor', 'Çalışmıyor (Çekici Lazım)', 'Diğer (Lütfen Belirtin)'] }
  ],
  'oto_periyodik': [
    { id: 'f_0', label: 'Araç Marka/Model/Yıl', options: ['Açıklamaya Yazacağım'] },
    { id: 'f_1', label: 'Yakıt Tipi', options: ['Dizel', 'Benzin', 'LPG', 'Elektrik/Hibrit'] },
    { id: 'f_2', label: 'Bakım', options: ['Yağ + Tüm Filtreler', 'Bakım + Balata Kontrolü', 'Diğer (Lütfen Belirtin)'] }
  ],
  'oto_elektrik_klima': [
    { id: 'f_0', label: 'Araç Marka/Model/Yıl', options: ['Açıklamaya Yazacağım'] },
    { id: 'f_1', label: 'Arıza', options: ['Akü / Marş Problemi', 'Klima Gazı / Soğutmuyor', 'Elektrik Arızası', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Araç Yürür Durumda mı?', options: ['Evet, servise gelebilirim', 'Hayır, mobil/çekici gerekli'] }
  ],
  'oto_kaporta': [
    { id: 'f_0', label: 'Araç Marka/Model/Yıl', options: ['Açıklamaya Yazacağım'] },
    { id: 'f_1', label: 'Hasar Türü', options: ['Boyasız Göçük (PDR)', 'Lokal / Parça Boya', 'Komple Boya / Kaporta', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Parça Sayısı', options: ['Tek Parça', '2-3 Parça', 'Komple Araç', 'Diğer (Lütfen Belirtin)'] }
  ],
  'oto_kaplama': [
    { id: 'f_0', label: 'Araç Marka/Model/Yıl', options: ['Açıklamaya Yazacağım'] },
    { id: 'f_1', label: 'Uygulama', options: ['Şeffaf PPF Koruma', 'Renkli Folyo', 'Seramik Kaplama', 'Cam Filmi', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Kapsam', options: ['Komple Araç', 'Sadece Ön Bölüm (Kaput/Çamurluk)', 'Sadece Camlar', 'Diğer (Lütfen Belirtin)'] }
  ],
  'oto_kuafor': [
    { id: 'f_0', label: 'Araç Marka/Model/Yıl', options: ['Açıklamaya Yazacağım'] },
    { id: 'f_1', label: 'İşlem', options: ['Detaylı İç & Dış Kuaför', 'Koltuk Yıkama', 'Pasta Cila', 'Diğer (Lütfen Belirtin)'] }
  ],
  'oto_lastik': [
    { id: 'f_0', label: 'Araç Marka/Model/Yıl', options: ['Açıklamaya Yazacağım'] },
    { id: 'f_1', label: 'İşlem', options: ['Lastik Değişimi & Balans', 'Patlak Tamiri', 'Mobil Lastikçi', 'Diğer (Lütfen Belirtin)'] }
  ],
  'oto_ekspertiz': [
    { id: 'f_0', label: 'Araç Marka/Model/Yıl', options: ['Açıklamaya Yazacağım'] },
    { id: 'f_1', label: 'Paket / İşlem', options: ['Standart Ekspertiz', 'Full Paket (Dyno Dahil)', 'Cam Değişimi / Tamiri', 'Diğer (Lütfen Belirtin)'] }
  ],
  'oto_cekici': [
    { id: 'f_0', label: 'Araç Marka/Model/Yıl', options: ['Açıklamaya Yazacağım'] },
    { id: 'f_1', label: 'Araç Tipi', options: ['Binek Otomobil', 'SUV / Minibüs', 'Kamyonet / Ticari', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Durum', options: ['Arıza (Çalışmıyor)', 'Kaza (Tekerlekler Kilitli)', 'Sadece Taşıma (Galeriden vb.)', 'Diğer (Lütfen Belirtin)'] }
  ],
  'oto_ses_multimedya': [
    { id: 'f_0', label: 'Araç Marka/Model/Yıl', options: ['Açıklamaya Yazacağım'] },
    { id: 'f_1', label: 'Cihaz/İşlem Türü', options: ['Ekran / Multimedya Montajı', 'Ses Sistemi / Amfi / Subwoofer', 'Geri Görüş Kamerası', 'Diğer (Lütfen Belirtin)'] }
  ],
  'oto_karavan_donusum': [
    { id: 'f_0', label: 'Araç Marka/Model/Yıl', options: ['Açıklamaya Yazacağım'] },
    { id: 'f_1', label: 'Araç Boyutu', options: ['10-13 m³ (Orta Kasa)', '15-17 m³ (Büyük Kasa)', 'Otobüs/Midibüs', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Kapsam', options: ['Tam Donanım (Anahtar Teslim)', 'Sadece Mobilya', 'Sadece Elektrik/Su Tesisatı', 'Diğer (Lütfen Belirtin)'] }
  ],
  'oto_karavan_imalat': [
    { id: 'f_0', label: 'Yapı Türü', options: ['O1/O2 Belgeli Çekme Karavan', 'Tiny House (Tekerlekli Ev)', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Kapasite', options: ['2 Kişilik', '4+ Kişilik Aile Tipi', 'Diğer (Lütfen Belirtin)'] }
  ],
  'oto_karavan_tamir': [
    { id: 'f_0', label: 'Arıza / İşlem Türü', options: ['Güneş Paneli & Akü Elektrik Arızası', 'Su Tesisatı & Isıtıcı (Webasto)', 'Mobilya Tadilatı', 'Diğer (Lütfen Belirtin)'] }
  ],
  'oto_diger': [
    { id: 'f_0', label: 'Talep Ettiğiniz Hizmet', options: ['Diğer (Lütfen Belirtin)'] }
  ],

  // --- 6. ORGANİZASYON ---
  'org_dugun': [
    { id: 'f_0', label: 'Etkinlik', options: ['Düğün', 'Nişan & Söz', 'Kına Gecesi', 'Evlilik Teklifi', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Kapsam', options: ['Her Şey Dahil', 'Sadece Süsleme', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Tahmini Kişi Sayısı', options: ['0-50 Kişi', '50-150 Kişi', '150-300 Kişi', '300+ Kişi'] },
    { id: 'f_3', label: 'Mekan Durumu', options: ['Mekan Ayarlandı', 'Mekan Önerisi İstiyorum', 'Evde Olacak', 'Diğer (Lütfen Belirtin)'] }
  ],
  'org_dogum': [
    { id: 'f_0', label: 'Parti Türü', options: ['Çocuk Doğum Günü', 'Yetişkin / Sürpriz Parti', 'Baby Shower', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Tahmini Kişi Sayısı', options: ['0-20 Kişi', '20-50 Kişi', '50+ Kişi'] },
    { id: 'f_2', label: 'Mekan Durumu', options: ['Mekan Ayarlandı', 'Mekan Önerisi İstiyorum', 'Evde Olacak', 'Diğer (Lütfen Belirtin)'] }
  ],
  'org_catering': [
    { id: 'f_0', label: 'Menü', options: ['Sıcak Yemek / Tabldot', 'Kokteyl & İkram', 'Lokma Döktürme', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Kişi Sayısı', options: ['0-50 Kişi', '50-150 Kişi', '150+ Kişi', 'Diğer (Lütfen Belirtin)'] }
  ],
  'org_muzik': [
    { id: 'f_0', label: 'Eğlence Ekibi', options: ['Canlı Müzik / Orkestra', 'DJ Performans', 'Bando / Davul Zurna', 'Diğer (Lütfen Belirtin)'] }
  ],
  'org_ekipman': [
    { id: 'f_0', label: 'Ekipman', options: ['Masa & Sandalye', 'Ses & Işık Sistemi', 'Hepsi Bir Arada', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Tahmini Kişi Sayısı', options: ['0-50 Kişi', '50-150 Kişi', '150+ Kişi', 'Diğer (Lütfen Belirtin)'] }
  ],
  'org_pasta': [
    { id: 'f_0', label: 'İhtiyaç', options: ['Butik Pasta', 'Nikah Şekeri / Hediyelik', 'Çiçek Aranjmanı', 'Diğer (Lütfen Belirtin)'] }
  ],
  'org_arac': [
    { id: 'f_0', label: 'Araç Türü', options: ['Lüks Gelin Arabası', 'VIP Minibüs (Vito)', 'Tekne / Yat', 'Tatil İçin Karavan', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Tahmini Kişi Sayısı', options: ['1-4 Kişi', '5-10 Kişi', '10+ Kişi'] }
  ],
  'org_dini': [
    { id: 'f_0', label: 'Hizmet', options: ['Dini Nikah & Mevlüt', 'Temsili Nikah Memuru', 'Gelinlik Özel Dikim', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Tahmini Kişi Sayısı', options: ['0-50 Kişi', '50-100 Kişi', '100+ Kişi'] },
    { id: 'f_2', label: 'Mekan Durumu', options: ['Mekan Ayarlandı', 'Evde / Camide Olacak', 'Diğer (Lütfen Belirtin)'] }
  ],
  'org_fuar': [
    { id: 'f_0', label: 'Etkinlik Türü', options: ['Açılış / Lansman', 'Fuar Hostesi / Görevli Temini', 'Kurumsal Şirket Yemeği', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Tahmini Kişi Sayısı', options: ['0-50 Kişi', '50-150 Kişi', '150+ Kişi'] }
  ],
  'org_palyaco': [
    { id: 'f_0', label: 'Gösteri Türü', options: ['Palyaço / Yüz Boyama', 'Sihirbaz / İllüzyonist', 'Maskot / Karakter', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Tahmini Süre', options: ['1-2 Saat', 'Yarım Gün', 'Tam Gün'] }
  ],
  'org_diger': [
    { id: 'f_0', label: 'Talep Ettiğiniz Hizmet', options: ['Diğer (Lütfen Belirtin)'] }
  ],

  // --- 7. TAMİR & SERVİS ---
  'tamir_beyaz_esya': [
    { id: 'f_0', label: 'Cihaz', options: ['Buzdolabı', 'Çamaşır Makinesi', 'Bulaşık Makinesi', 'Fırın/Ankastre', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Cihaz Markası', options: ['Açıklamaya Yazacağım'] },
    { id: 'f_2', label: 'Talep', options: ['Arıza & Tamir', 'Yeni Cihaz Montajı', 'Diğer (Lütfen Belirtin)'] }
  ],
  'tamir_tesisat': [
    { id: 'f_0', label: 'Sorun', options: ['Su Kaçağı Tespiti', 'Tıkanıklık Açma', 'Musluk / Batarya Montajı', 'Rezervuar Tamiri', 'Diğer (Lütfen Belirtin)'] }
  ],
  'tamir_elektrik': [
    { id: 'f_0', label: 'İşlem', options: ['Avize & Aydınlatma Montajı', 'İnternet & Fiber Kablo', 'Priz / Sigorta Arızası', 'Diğer (Lütfen Belirtin)'] }
  ],
  'tamir_mobilya': [
    { id: 'f_0', label: 'İşlem Türü', options: ['Yeni Mobilya Kurulumu', 'Söküm & Taşıma & Kurulum', 'Mobilya Tamiri / Kırık', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Mobilya Türü', options: ['Gardırop / Yatak Odası', 'TV Ünitesi / Konsol', 'Mutfak Dolabı', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Ürün Markası', options: ['IKEA', 'Koçtaş / Vivense', 'Özel Yapım / Diğer'] }
  ],
  'tamir_kombi': [
    { id: 'f_0', label: 'Cihaz / Sistem', options: ['Kombi', 'Klima', 'Doğalgaz Ocak Bağlantısı', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Cihaz Markası', options: ['Açıklamaya Yazacağım'] },
    { id: 'f_2', label: 'Talep', options: ['Periyodik Bakım', 'Arıza Tamiri', 'Petek Temizliği', 'Diğer (Lütfen Belirtin)'] }
  ],
  'tamir_cilingir': [
    { id: 'f_0', label: 'Talep', options: ['Acil Çilingir (Kapıda Kaldım)', 'Kilit Göbeği Değişimi', 'Panjur / Kepenk Tamiri', 'Diğer (Lütfen Belirtin)'] }
  ],
  'tamir_bilgisayar': [
    { id: 'f_0', label: 'Cihaz', options: ['Laptop (Dizüstü)', 'Masaüstü PC', 'Cep Telefonu / Tablet', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Sorun', options: ['Ekran / Batarya Değişimi', 'Format & Yazılım', 'Donanım Arızası', 'Diğer (Lütfen Belirtin)'] }
  ],
  'tamir_guvenlik': [
    { id: 'f_0', label: 'Sistem', options: ['Güvenlik Kamerası', 'Çanak Anten & Uydu', 'Görüntülü Diafon', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'İşlem', options: ['Yeni Kurulum', 'Arıza Onarımı', 'Diğer (Lütfen Belirtin)'] }
  ],
  'tamir_dusakabin': [
    { id: 'f_0', label: 'İşlem', options: ['Duşakabin Montajı', 'Su Sızdırma / Silikon Yenileme', 'Ayna Montajı', 'Diğer (Lütfen Belirtin)'] }
  ],
  'tamir_tv': [
    { id: 'f_0', label: 'Cihaz Boyutu / İnç', options: ['32 - 43 İnç', '50 - 55 İnç', '65 İnç ve Üzeri', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Arıza Türü', options: ['Ekran Kırık / Çatlak', 'Ses Var Görüntü Yok (LED Bar)', 'Hiç Açılmıyor', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Cihaz Markası', options: ['Açıklamaya Yazacağım'] }
  ],
  'tamir_kucuk_ev': [
    { id: 'f_0', label: 'Cihaz Türü', options: ['Elektrikli Süpürge / Robot', 'Ütü', 'Kahve / Çay Makinesi', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Arıza Durumu', options: ['Çalışmıyor', 'Performansı Düştü / Sesli Çalışıyor', 'Parça Kırık / Eksik', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Cihaz Markası', options: ['Açıklamaya Yazacağım'] }
  ],
  'tamir_terzi': [
    { id: 'f_0', label: 'İşlem Türü', options: ['Özel Tasarım Elbise / Abiye', 'Perde Dikimi & Kısaltma', 'Günlük Kıyafet Tadilatı (Paça, Fermuar)', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Kumaş Durumu', options: ['Kumaş Bende (Sadece İşçilik)', 'Kumaşı Terzi Temin Etsin', 'Diğer (Lütfen Belirtin)'] }
  ],
  'tamir_ayakkabi_canta': [
    { id: 'f_0', label: 'Ürün Türü', options: ['Deri Ayakkabı / Bot', 'Spor Ayakkabı', 'Kadın Çantası', 'Bavul / Valiz', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'İşlem', options: ['Taban / Topuk Değişimi', 'Fermuar / Tekerlek Tamiri', 'Boya ve Bakım', 'Diğer (Lütfen Belirtin)'] }
  ],
  'tamir_deri_mont': [
    { id: 'f_0', label: 'İşlem Türü', options: ['Deri Mont Boyama / Bakım', 'Yırtık Onarımı', 'Astar Değişimi', 'Diğer (Lütfen Belirtin)'] }
  ],
  'tamir_kuru_temizleme': [
    { id: 'f_0', label: 'Teslimat Durumu', options: ['Evden Alınıp Eve Bırakılsın', 'Kendim Götüreceğim'] },
    { id: 'f_1', label: 'Ürün', options: ['Takım Elbise / Gelinlik', 'Günlük Kıyafetler', 'Yorgan / Battaniye', 'Diğer (Lütfen Belirtin)'] }
  ],
  'tamir_diger': [
    { id: 'f_0', label: 'Talep Ettiğiniz Hizmet', options: ['Diğer (Lütfen Belirtin)'] }
  ],

  // --- 8. TADİLAT ---
  'tadilat_anahtar': [
    { id: 'f_0', label: 'Kapsam', options: ['Komple Ev Yenileme', 'Banyo & Mutfak Tadilatı', 'İş Yeri / Ofis Dekorasyonu', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Tasarım İhtiyacı', options: ['3D İç Mimari Çizim Dahil', 'Sadece Ustalık / Uygulama', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Mülkün Durumu', options: ['İçinde oturuluyor (Eşyalı)', 'Şu an boş', 'Yeni inşaat / Kaba teslim', 'Diğer (Lütfen Belirtin)'] }
  ],
  'tadilat_boya': [
    { id: 'f_0', label: 'Alan Büyüklüğü', options: ['Sadece 1-2 Oda', '2+1 / 3+1 Komple Daire', 'Komple Bina / Dış Cephe', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Eşya Durumu', options: ['Ev Boş', 'Ev Dolu (Eşyalar Örtülecek)', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Ekstra İşlem', options: ['Sadece Boya', 'Alçıpan / Asma Tavan Dahil', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_3', label: 'Malzeme Tedariği', options: ['Malzemeleri ben alacağım (Sadece işçilik)', 'Malzeme + İşçilik ustaya ait'] }
  ],
  'tadilat_zemin': [
    { id: 'f_0', label: 'İşlem Türü', options: ['Banyo/Tuvalet Fayans Döşeme', 'Laminant Parke Döşeme', 'Mutfak Tezgahı Değişimi', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Alan (m²)', options: ['0-20 m²', '20-50 m²', '50+ m²', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Malzeme Tedariği', options: ['Malzemeleri ben alacağım (Sadece işçilik)', 'Malzeme + İşçilik ustaya ait'] }
  ],
  'tadilat_cam_balkon': [
    { id: 'f_0', label: 'Sistem', options: ['Cam Balkon (Katlanır/Sürgülü)', 'Çelik Kapı Montajı', 'Alüminyum Korkuluk / Küpeşte', 'PVC Doğrama / Sineklik', 'Diğer (Lütfen Belirtin)'] }
  ],
  'tadilat_cati': [
    { id: 'f_0', label: 'Çatı İşlemi', options: ['Çatı Tamiri & Oluk Yenileme', 'Sıfırdan Çatı Yapımı', 'Su & Isı İzolasyonu (Mantolama)', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Yapı Türü', options: ['Apartman / Site', 'Müstakil Ev / Villa', 'Fabrika / Depo', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Malzeme Tedariği', options: ['Malzemeleri ben alacağım (Sadece işçilik)', 'Malzeme + İşçilik ustaya ait'] }
  ],
  'tadilat_bahce': [
    { id: 'f_0', label: 'Bahçe İşlemi', options: ['Peyzaj, Çim & Otomatik Sulama', 'Ağaç Budama & Kesme', 'Tel Çit / Panel Çit Çekimi', 'Diğer (Lütfen Belirtin)'] }
  ],
  'tadilat_marangoz': [
    { id: 'f_0', label: 'İmalat Türü', options: ['Özel Ölçü Mutfak / Banyo Dolabı', 'Giyinme Odası / Ray Dolap', 'Ahşap Merdiven / Deck Kaplama', 'Koltuk Döşeme / Yüz Değişimi', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Malzeme Tercihi', options: ['MDF Lam', 'Membran / Akrilik', 'Masif Ahşap', 'Usta Önersin', 'Diğer (Lütfen Belirtin)'] }
  ],
  'tadilat_prefabrik': [
    { id: 'f_0', label: 'Yapı Türü', options: ['Prefabrik / Çelik Ev Kurulumu', 'Ahşap Bungalov / Tiny House', 'Temel Atma / Kaba İnşaat', 'Bina Yıkım & Hafriyat', 'Diğer (Lütfen Belirtin)'] }
  ],
  'tadilat_havuz': [
    { id: 'f_0', label: 'İşlem Türü', options: ['Sıfırdan Havuz Yapımı', 'Havuz Motor / Filtre Bakımı', 'Havuz İzolasyon & Seramik Tamiri', 'Diğer (Lütfen Belirtin)'] }
  ],
  'tadilat_demir': [
    { id: 'f_0', label: 'İşlem Türü', options: ['Ferforje / Bahçe Kapısı', 'Demir Parmaklık / Korkuluk', 'Sundurma / Çelik Çatı Çerçevesi', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Uygulama Alanı', options: ['Ev / Villa', 'Apartman / Site', 'İş Yeri / Fabrika', 'Diğer (Lütfen Belirtin)'] }
  ],
  'tadilat_diger': [
    { id: 'f_0', label: 'Talep Ettiğiniz Hizmet', options: ['Diğer (Lütfen Belirtin)'] }
  ],

  // --- 9. ÖZEL DERS ---
  'ders_okul': [
    { id: 'f_0', label: 'Branş', options: ['Matematik & Geometri', 'Fen Bilimleri (Fizik/Kimya/Biyoloji)', 'Türkçe & Sözel Dersler', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Öğrenci Seviyesi', options: ['İlkokul / Ortaokul (LGS)', 'Lise (YKS)', 'KPSS / DGS / ALES', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Ders Şekli', options: ['Yüz Yüze (Öğrenci Evinde)', 'Yüz Yüze (Eğitmen Evinde)', 'Online', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_3', label: 'Planlanan Ders Sıklığı', options: ['Sadece birkaç ders', 'Haftada 1-2 Gün düzenli', 'Haftada 3+ Gün', 'Diğer (Lütfen Belirtin)'] }
  ],
  'ders_dil': [
    { id: 'f_0', label: 'Dil', options: ['İngilizce', 'Almanca', 'İspanyolca', 'Fransızca / Rusça', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Eğitim Amacı', options: ['Genel Dil Öğrenimi', 'Konuşma (Speaking) Pratiği', 'Sınav Hazırlık (IELTS/TOEFL/YDS)', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Ders Şekli', options: ['Yüz Yüze (Öğrenci Evinde)', 'Yüz Yüze (Eğitmen Evinde)', 'Online', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_3', label: 'Planlanan Ders Sıklığı', options: ['Sadece birkaç ders', 'Haftada 1-2 Gün düzenli', 'Haftada 3+ Gün', 'Diğer (Lütfen Belirtin)'] }
  ],
  'ders_muzik': [
    { id: 'f_0', label: 'Enstrüman / Alan', options: ['Gitar (Klasik/Akustik/Elektro)', 'Piyano', 'Keman', 'Şan (Vokal Eğitimi)', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Öğrenci Yaş Grubu', options: ['Çocuk', 'Yetişkin', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Ders Şekli', options: ['Yüz Yüze (Öğrenci Evinde)', 'Yüz Yüze (Eğitmen Evinde)', 'Online', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_3', label: 'Planlanan Ders Sıklığı', options: ['Sadece birkaç ders', 'Haftada 1-2 Gün düzenli', 'Haftada 3+ Gün', 'Diğer (Lütfen Belirtin)'] }
  ],
  'ders_direksiyon': [
    { id: 'f_0', label: 'Araç & Seviye', options: ['Otomatik Vites (Pratik)', 'Manuel Vites (Pratik)', 'Sıfırdan Ehliyet Sınavı Hazırlığı', 'Motosiklet Sürüş Eğitimi', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Araç Temini', options: ['Kendi Aracımla', 'Eğitmenin Aracıyla', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Ders Şekli', options: ['Yüz Yüze (Buluşma Noktasında)', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_3', label: 'Planlanan Ders Sıklığı', options: ['Sadece birkaç ders', 'Haftada 1-2 Gün düzenli', 'Haftada 3+ Gün', 'Diğer (Lütfen Belirtin)'] }
  ],
  'ders_koc': [
    { id: 'f_0', label: 'Hizmet Türü', options: ['Eğitim / Öğrenci Koçluğu', 'Oyun Ablası / Saatlik Bakım', 'Özel Eğitim (Disleksi/Otizm/DEHB vb.)', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Ders Şekli', options: ['Yüz Yüze (Öğrenci Evinde)', 'Yüz Yüze (Eğitmen Evinde)', 'Online', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Planlanan Ders Sıklığı', options: ['Sadece birkaç ders', 'Haftada 1-2 Gün düzenli', 'Haftada 3+ Gün', 'Diğer (Lütfen Belirtin)'] }
  ],
  'ders_spor': [
    { id: 'f_0', label: 'Branş', options: ['Yüzme (Özel Ders)', 'Kick Boks / Savunma Sanatları', 'Dans (Düğün Dansı/Salsa vb.)', 'Tenis / Kort Sporları', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Ders Şekli', options: ['Yüz Yüze (Öğrenci Evinde/Sitede)', 'Yüz Yüze (Eğitmen Tesisinde)', 'Online', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Planlanan Ders Sıklığı', options: ['Sadece birkaç ders', 'Haftada 1-2 Gün düzenli', 'Haftada 3+ Gün', 'Diğer (Lütfen Belirtin)'] }
  ],
  'ders_mesleki': [
    { id: 'f_0', label: 'Alan', options: ['Yazılım / Kodlama Eğitimi', 'AutoCAD / Grafik Tasarım', 'E-Ticaret & Dijital Pazarlama', 'Diksiyon & Hızlı Okuma', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Ders Şekli', options: ['Yüz Yüze (Öğrenci Evinde)', 'Yüz Yüze (Eğitmen Evinde)', 'Online', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Planlanan Ders Sıklığı', options: ['Sadece birkaç ders', 'Haftada 1-2 Gün düzenli', 'Haftada 3+ Gün', 'Diğer (Lütfen Belirtin)'] }
  ],
  'ders_dini': [
    { id: 'f_0', label: 'Eğitim Türü', options: ['Temel Kuran-ı Kerim Okuma', 'Tecvid ve Makam', 'Hafızlık Eğitimi', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Ders Şekli', options: ['Yüz Yüze (Öğrenci Evinde)', 'Yüz Yüze (Eğitmen Evinde)', 'Online', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Planlanan Ders Sıklığı', options: ['Sadece birkaç ders', 'Haftada 1-2 Gün düzenli', 'Haftada 3+ Gün', 'Diğer (Lütfen Belirtin)'] }
  ],
  'ders_sanat': [
    { id: 'f_0', label: 'Eğitim Amacı', options: ['Yetenek Sınavlarına Hazırlık (GSF vb.)', 'Hobi / Karakalem / Yağlı Boya', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Öğrenci Yaşı', options: ['Çocuk', 'Yetişkin', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Ders Şekli', options: ['Yüz Yüze (Öğrenci Evinde)', 'Yüz Yüze (Eğitmen Stüdyosunda)', 'Online', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_3', label: 'Planlanan Ders Sıklığı', options: ['Sadece birkaç ders', 'Haftada 1-2 Gün düzenli', 'Haftada 3+ Gün', 'Diğer (Lütfen Belirtin)'] }
  ],
  'ders_satranc': [
    { id: 'f_0', label: 'Yaş Grubu', options: ['Çocuk (Başlangıç)', 'Çocuk (Turnuva Hazırlık)', 'Yetişkin', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Ders Şekli', options: ['Yüz Yüze (Öğrenci Evinde)', 'Yüz Yüze (Eğitmen Evinde)', 'Online', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Planlanan Ders Sıklığı', options: ['Sadece birkaç ders', 'Haftada 1-2 Gün düzenli', 'Haftada 3+ Gün', 'Diğer (Lütfen Belirtin)'] }
  ],
  'ders_diger': [
    { id: 'f_0', label: 'Talep Ettiğiniz Hizmet', options: ['Diğer (Lütfen Belirtin)'] }
  ],

  // --- 10. MEDYA ---
  'medya_dugun': [
    { id: 'f_0', label: 'Çekim Türü', options: ['Düğün Dış Çekimi / Hikayesi', 'Nişan & Söz Töreni Çekimi', 'Doğum Günü / Özel Gün', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Paket Kapsamı', options: ['Sadece Dijital Teslim (Foto+Video)', 'Albüm Paketi Dahil', 'Drone Çekimi Dahil', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Tahmini Çekim Süresi', options: ['Sadece 2-3 saatlik dış çekim', 'Yarım gün', 'Tüm gün hikaye çekimi', 'Diğer (Lütfen Belirtin)'] }
  ],
  'medya_kurumsal': [
    { id: 'f_0', label: 'Proje Türü', options: ['Ürün / E-Ticaret (Katalog) Çekimi', 'Kurumsal Firma Tanıtım Filmi', 'Mekan / Mimari Fotoğrafçılık', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Çekim Yeri', options: ['Stüdyoda', 'Kendi İş Yerimizde / Dış Mekan', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Tahmini Ürün/Çekim Adedi', options: ['1-20 Ürün', '20-50 Ürün', '50+ Ürün', 'Diğer (Lütfen Belirtin)'] }
  ],
  'medya_sosyal': [
    { id: 'f_0', label: 'İhtiyaç', options: ['Sosyal Medya İçerik / Reels Çekimi', 'Video Editörlüğü (Kurgu / Montaj)', 'YouTube / Podcast Çekimi', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Mevcut Ham Video Durumu', options: ['Görüntüler hazır sadece montaj yapılacak', 'Çekimi de siz yapacaksınız', 'Diğer (Lütfen Belirtin)'] }
  ],
  'medya_drone': [
    { id: 'f_0', label: 'Çekim Amacı', options: ['Arsa / Arazi Çekimi', 'İnşaat Projesi / Emlak', 'Klip / Belgesel Ara Görüntü', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Tahmini Süre', options: ['1 Saat (1 Batarya)', 'Yarım Gün', 'Tam Gün', 'Diğer (Lütfen Belirtin)'] }
  ],
  'medya_seslendirme': [
    { id: 'f_0', label: 'Proje Türü', options: ['Reklam Seslendirmesi', 'Santral / IVR Anonsu', 'Jingle / Müzik Prodüksiyonu', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Süre / Kelime Sayısı', options: ['Çok kısa (1 dk altı)', '1-3 Dakika', 'Uzun Metin', 'Diğer (Lütfen Belirtin)'] }
  ],
  'medya_diger': [
    { id: 'f_0', label: 'Talep Ettiğiniz Hizmet', options: ['Diğer (Lütfen Belirtin)'] }
  ],

  // --- 11. PET ---
  'pet_kuafor': [
    { id: 'f_0', label: 'Evcil Hayvan', options: ['Kedi', 'Köpek (Küçük Irk)', 'Köpek (Büyük Irk)', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'İşlem', options: ['Makine Tıraşı + Banyo', 'Makas Tıraşı + Banyo', 'Sadece Yıkama & Tarama & Tırnak Kesimi', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Konum', options: ['Pet Kuaför Merkezinde', 'Evimde / Mobil Kuaför', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_3', label: 'Uysallık / Karakter Durumu', options: ['Uysal / Sakin', 'Agresif / Hırçın', 'Anestezi Gerekebilir', 'Diğer (Lütfen Belirtin)'] }
  ],
  'pet_pansiyon': [
    { id: 'f_0', label: 'Misafir Türü', options: ['Kedi', 'Köpek', 'Kuş (Muhabbet/Papağan) / Kemirgen', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Konaklama Süresi', options: ['1-3 Gün (Hafta Sonu)', '4-7 Gün', '1 Hafta ve Üzeri', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Ekstra İstek', options: ['Kafessiz Ev Ortamı İstiyorum', 'Standart Pansiyon Uygun', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_3', label: 'Aşı ve Sağlık Durumu', options: ['Aşı Karnesi Tam', 'Eksik Aşıları Var', 'Düzenli İlaç Kullanıyor', 'Diğer (Lütfen Belirtin)'] }
  ],
  'pet_egitim': [
    { id: 'f_0', label: 'Eğitim İhtiyacı', options: ['Yavru Köpek Tuvalet & Uyum Eğitimi', 'Temel İtaat Eğitimi (Tasmalı)', 'İleri İtaat & Sosyalleşme', 'Agresyon / Davranış Bozukluğu Çözümü', 'Diğer (Lütfen Belirtin)'] }
  ],
  'pet_bakim': [
    { id: 'f_0', label: 'Hizmet Türü', options: ['Günlük Köpek Gezdirme', 'Evde Kedi / Köpek Ziyareti (Mama/Kum/Oyun)', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Sıklık', options: ['Sadece Bir Kez', 'Haftanın Belirli Günleri', 'Her Gün', 'Diğer (Lütfen Belirtin)'] }
  ],
  'pet_taksi': [
    { id: 'f_0', label: 'Güzergah (Nereden/Nereye)', options: ['Açıklamaya Yazacağım'] },
    { id: 'f_1', label: 'Refakatçi Durumu', options: ['Sahibiyim, ben de geleceğim', 'Sadece pet taşınacak', 'Diğer (Lütfen Belirtin)'] }
  ],
  'pet_diger': [
    { id: 'f_0', label: 'Talep Ettiğiniz Hizmet', options: ['Diğer (Lütfen Belirtin)'] }
  ],

  // --- 12. SAĞLIK ---
  'saglik_terapi': [
    { id: 'f_0', label: 'Uzmanlık İhtiyacı', options: ['Bireysel Yetişkin Terapisi', 'Çift & Aile / İlişki Danışmanlığı', 'Çocuk / Ergen Psikolojisi', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Görüşme Şekli', options: ['Yüz Yüze (Klinik/Ofis)', 'Online Terapi', 'Diğer (Lütfen Belirtin)'] }
  ],
  'saglik_diyet': [
    { id: 'f_0', label: 'Danışmanlık Hedefi', options: ['Kilo Verme / Zayıflama', 'Kilo Alma', 'Sporcu Beslenmesi', 'Hastalıklarda Beslenme / Fonksiyonel Tıp', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Görüşme Şekli', options: ['Yüz Yüze', 'Online Takip', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Özel Beslenme Tercihi', options: ['Standart', 'Ketojenik Beslenme', 'Vegan / Vejetaryen', 'Aralıklı Oruç', 'Diğer (Lütfen Belirtin)'] }
  ],
  'saglik_fizyoterapi': [
    { id: 'f_0', label: 'Şikayet / İhtiyaç', options: ['Bel / Boyun Fıtığı ve Ağrılar', 'Ortopedik Rehabilitasyon (Ameliyat Sonrası)', 'Nörolojik Rehabilitasyon (İnme vb.)', 'Manuel Lenf Drenajı / Klinik Masaj', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Hizmet Yeri', options: ['Evde Fizik Tedavi', 'Klinikte / Merkezde Tedavi', 'Diğer (Lütfen Belirtin)'] }
  ],
  'saglik_cocuk_bakim': [
    { id: 'f_0', label: 'Çocuk Yaş Grubu', options: ['0-1 Yaş (Bebek)', '1-3 Yaş (Oyun Çocuğu)', '3+ Yaş', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Çalışma Şekli', options: ['Tam Zamanlı / Yatılı', 'Yarı Zamanlı / Gündüzlü', 'Sadece Saatlik / Hafta Sonu', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Ekstra Beklentiler', options: ['Sadece Çocuk Bakımı', 'Yemek & Hafif Ev İşlerine Destek', 'Yabancı Dil (İngilizce vb.) Bilsin', 'Diğer (Lütfen Belirtin)'] }
  ],
  'saglik_hemsire': [
    { id: 'f_0', label: 'İhtiyaç Türü', options: ['Enjeksiyon / Serum Takma', 'Yara Bakımı / Pansuman', 'Günlük / Yatılı Hasta Bakımı', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Hasta Yaşı ve Durumu', options: ['Açıklamaya Yazacağım'] }
  ],
  'saglik_dil_terapi': [
    { id: 'f_0', label: 'Danışan Yaş Grubu', options: ['Çocuk', 'Yetişkin', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Terapi İhtiyacı', options: ['Konuşma Gecikmesi', 'Artikülasyon / Pelteklik', 'Kekemelik', 'İnme Sonrası Konuşma Bozukluğu', 'Diğer (Lütfen Belirtin)'] }
  ],
  'saglik_diger': [
    { id: 'f_0', label: 'Talep Ettiğiniz Hizmet', options: ['Diğer (Lütfen Belirtin)'] }
  ],

  // --- 13. SPOR ---
  'spor_pt': [
    { id: 'f_0', label: 'Ana Hedef', options: ['Kilo Verme & Sıkılaşma', 'Kas Kazanımı (Hipertrofi) / Hacim', 'Fonksiyonel Antrenman / Kondisyon', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Antrenman Yeri', options: ['Eğitmenin Anlaşmalı Salonunda', 'Kendi Sitemin/Evimin Salonunda', 'Açık Alanda / Parkta', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Haftalık Antrenman Sıklığı', options: ['Haftada 2 Gün', 'Haftada 3+ Gün', 'Sadece Hafta Sonu', 'Diğer (Lütfen Belirtin)'] }
  ],
  'spor_pilates': [
    { id: 'f_0', label: 'Ders Formatı', options: ['Birebir Reformer (Aletli Pilates) Özel Ders', 'Düet (2 Kişilik) Reformer Dersi', 'Grup Mat Pilates', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Seviye', options: ['Yeni Başlayan', 'Orta / İleri Seviye', 'Hamile Pilatesi', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Haftalık Antrenman Sıklığı', options: ['Haftada 2 Gün', 'Haftada 3+ Gün', 'Sadece Hafta Sonu', 'Diğer (Lütfen Belirtin)'] }
  ],
  'spor_yoga': [
    { id: 'f_0', label: 'Ders Formatı', options: ['Birebir Özel Ders', 'Grup Dersi', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Yoga Türü', options: ['Hatha / Vinyasa', 'Hamile Yogası', 'Meditasyon Odaklı', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Haftalık Antrenman Sıklığı', options: ['Haftada 2 Gün', 'Haftada 3+ Gün', 'Sadece Hafta Sonu', 'Diğer (Lütfen Belirtin)'] }
  ],
  'spor_diyetisyen': [
    { id: 'f_0', label: 'Hedef', options: ['Yağ Yakımı', 'Kas Kazanımı', 'Sağlıklı Yaşam', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Spor Salonu Durumu', options: ['Salona gidiyorum program lazım', 'Evde kendi imkanlarımla çalışacağım', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Haftalık Antrenman Sıklığı', options: ['Haftada 2 Gün', 'Haftada 3+ Gün', 'Sadece Hafta Sonu', 'Diğer (Lütfen Belirtin)'] }
  ],
  'spor_diger': [
    { id: 'f_0', label: 'Talep Ettiğiniz Hizmet', options: ['Diğer (Lütfen Belirtin)'] }
  ],

  // --- 14. GÜZELLİK ---
  'guzellik_kuafor': [
    { id: 'f_0', label: 'İşlem Türü', options: ['Saç Kesimi & Şekillendirme', 'Saç Boyama / Ombre / Sombre', 'Mikro Kaynak / Saç Uzatma', 'Keratin Bakım / Brezilya Fönü', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Hizmet Yeri', options: ['Kuaför Salonunda', 'Kendi Evimde / Otelde', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Mevcut Saç Uzunluğu', options: ['Kısa / Erkek Tipi', 'Omuz Hizası', 'Uzun / Bel Hizası', 'Diğer (Lütfen Belirtin)'] }
  ],
  'guzellik_gelin': [
    { id: 'f_0', label: 'Etkinlik Türü', options: ['Gelin Saçı & Makyajı (Düğün)', 'Nişan / Söz / Kına Saç ve Makyajı', 'Özel Gün Mezuniyet Makyajı', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Kapsam', options: ['Sadece Kendim İçin', 'Kendim ve Yakınlarım (Grup İndirimi)', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Prova İstiyor musunuz?', options: ['Evet, etkinlik öncesi prova istiyorum', 'Hayır, provaya gerek yok'] }
  ],
  'guzellik_tirnak': [
    { id: 'f_0', label: 'İşlem', options: ['Yeni Protez Tırnak (Jel / Akrilik)', 'Kalıcı Oje & Kuru Manikür', 'Protez Tırnak Bakımı / Çıkarma İşlemi', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Süsleme', options: ['Klasik / Düz Renk', 'French / Detaylı Nail Art Tasarımı', 'Diğer (Lütfen Belirtin)'] }
  ],
  'guzellik_epilasyon': [
    { id: 'f_0', label: 'Hizmet Türü', options: ['Lazer Epilasyon', 'Medikal Cilt Bakımı / Hydrafacial', 'Bölgesel İncelme / G5 Masajı', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Epilasyon Bölgesi', options: ['Tüm Vücut', 'Sadece Belirli Bölgeler', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Cinsiyet', options: ['Kadın', 'Erkek', 'Diğer (Lütfen Belirtin)'] }
  ],
  'guzellik_dovme': [
    { id: 'f_0', label: 'Hizmet Türü', options: ['Profesyonel Dövme Yapımı / Tasarımı', 'Dövme Silme İşlemi (Lazer)', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Dövme Boyutu', options: ['Minimal (Çok Küçük)', 'Orta Boyut', 'Büyük / Kaplama', 'Diğer (Lütfen Belirtin)'] }
  ],
  'guzellik_spa': [
    { id: 'f_0', label: 'Masaj Türü', options: ['Medikal / Relax Vücut Masajı', 'Thai / Bali Masajı', 'Sporcu Masajı', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Hizmet Yeri', options: ['Spa / Masaj Salonunda', 'Kendi Evimde / Otelde', 'Diğer (Lütfen Belirtin)'] }
  ],
  'guzellik_kalici_makyaj': [
    { id: 'f_0', label: 'İşlem Türü', options: ['Microblading (Kaş)', 'Dudak Renklendirme', 'İpek Kirpik / Kirpik Lifting', 'Diğer (Lütfen Belirtin)'] }
  ],
  'guzellik_diger': [
    { id: 'f_0', label: 'Talep Ettiğiniz Hizmet', options: ['Diğer (Lütfen Belirtin)'] }
  ],

  // --- 15. DİJİTAL ---
  'dijital_pazarlama': [
    { id: 'f_0', label: 'İhtiyaç', options: ['Sosyal Medya Yönetimi (Instagram/TikTok)', 'Google Ads (AdWords) / Meta Reklam Yönetimi', 'SEO (Arama Motoru Optimizasyonu) Çalışması', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Şirket/Hedef Kitle', options: ['Yerel İşletme (Restoran/Kuaför vb.)', 'E-Ticaret Firması', 'Kurumsal Marka / B2B', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Hizmet Süresi', options: ['Tek Seferlik Kurulum', 'Aylık Düzenli Yönetim', 'Diğer (Lütfen Belirtin)'] }
  ],
  'dijital_yazilim': [
    { id: 'f_0', label: 'Proje Türü', options: ['Kurumsal Tanıtım Web Sitesi', 'E-Ticaret Sitesi (Ürün Satışı)', 'Özel Yazılım / Otomasyon Sistemi', 'Mobil Uygulama (iOS/Android)', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Tasarım İhtiyacı', options: ['Sıfırdan Özel Tasarım (UI/UX)', 'Hazır Şablon Üzerinden Hızlı Kurulum', 'Sadece Mevcut Sitede Revizyon', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Domain ve Hosting Durumu', options: ['Bende Var Yönlendirilecek', 'Fiyata/Pakete Dahil Olsun', 'Diğer (Lütfen Belirtin)'] }
  ],
  'dijital_grafik': [
    { id: 'f_0', label: 'Tasarım İhtiyacı', options: ['Logo & Kurumsal Kimlik Tasarımı', 'Sosyal Medya Gönderi / Banner Tasarımları', '3D Ürün Modelleme / Render Alma', 'Ambalaj / Etiket Tasarımı', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Kullanım Alanı', options: ['Dijital Platformlar İçin', 'Matbaa / Basılı Yayın İçin', 'Diğer (Lütfen Belirtin)'] }
  ],
  'dijital_danismanlik': [
    { id: 'f_0', label: 'Danışmanlık Türü', options: ['Şirket Kuruluşu (Şahıs / Ltd / A.Ş.)', 'Marka Tescili & Patent İşlemleri', 'KOSGEB / Devlet Destekleri Danışmanlığı', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Şirket Durumu', options: ['Yeni Girişimci (Henüz Kurulmadı)', 'Mevcut Şirket', 'Diğer (Lütfen Belirtin)'] }
  ],
  'dijital_tercume': [
    { id: 'f_0', label: 'Hizmet Türü', options: ['Yeminli / Noter Onaylı Tercüme', 'Standart Belge / Web Sitesi Çevirisi', 'Makale / Blog & SEO Uyumlu İçerik Yazarlığı', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Dil Çifti', options: ['Türkçe - İngilizce', 'Türkçe - Almanca', 'Türkçe - Arapça', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_2', label: 'Tahmini Hacim', options: ['1-5 Sayfa / 1000 Kelime altı', '5-20 Sayfa', 'Çok Kapsamlı Proje', 'Diğer (Lütfen Belirtin)'] }
  ],
  'dijital_matbaa': [
    { id: 'f_0', label: 'Baskı Türü', options: ['Kartvizit', 'El İlanı', 'Katalog / Broşür Baskısı', 'Işıklı / Kutu Harf Tabela ve Cephe Giydirme', 'Promosyon Ürünleri (Kalem, Kupa, Defter vb.)', 'Tişört / Forma / Tekstil Baskısı', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Adet / Miktar', options: ['0-500 Adet Arası', '500-2000 Adet Arası', 'Toptan / Çok Yüksek Adet', 'Diğer (Lütfen Belirtin)'] }
  ],
  'dijital_video': [
    { id: 'f_0', label: 'Animasyon Türü', options: ['2D Explainer (Açıklayıcı) Video', '3D Animasyon', 'Seslendirme (Dublaj)', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Süre', options: ['1 Dakikadan Az', '1-3 Dakika Arası', 'Daha Uzun', 'Diğer (Lütfen Belirtin)'] }
  ],
  'dijital_diger': [
    { id: 'f_0', label: 'Talep Ettiğiniz Hizmet', options: ['Diğer (Lütfen Belirtin)'] }
  ],

  // --- 16. DANIŞMANLIK ---
  'danismanlik_mali': [
    { id: 'f_0', label: 'Hizmet Kapsamı', options: ['Şirket Kuruluşu', 'Aylık Düzenli Defter Tutma', 'Vergi / KDV Danışmanlığı', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Şirket Türü', options: ['Şahıs Firması / E-Ticaret', 'Limited / A.Ş.', 'Diğer (Lütfen Belirtin)'] }
  ],
  'danismanlik_vize': [
    { id: 'f_0', label: 'Hedef Bölge', options: ['Avrupa (Schengen)', 'Amerika / Kanada', 'İngiltere', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Hizmet Türü', options: ['Turistik Vize Başvurusu', 'Çalışma / Oturum İzni Takibi', 'Dil Okulu / Üniversite Kaydı', 'Diğer (Lütfen Belirtin)'] }
  ],
  'danismanlik_hukuk': [
    { id: 'f_0', label: 'İhtiyaç Alanı', options: ['İş Hukuku (Tazminat vb.)', 'Aile / Boşanma Danışmanlığı', 'Sözleşme & İhtarname Hazırlama', 'Diğer (Lütfen Belirtin)'] }
  ],
  'danismanlik_kariyer': [
    { id: 'f_0', label: 'Hizmet Türü', options: ['Profesyonel CV & LinkedIn Hazırlama', 'Mülakat Koçluğu', 'İşe Alım Danışmanlığı (Firmalar için)', 'Diğer (Lütfen Belirtin)'] }
  ],
  'danismanlik_emlak': [
    { id: 'f_0', label: 'İşlem', options: ['Tapu Takibi & Devir İşlemleri', 'Gayrimenkul Değerleme (Ekspertiz)', 'Yabancıya Satış Danışmanlığı', 'Diğer (Lütfen Belirtin)'] }
  ],
  'danismanlik_sigorta': [
    { id: 'f_0', label: 'Poliçe Türü', options: ['Kasko & Trafik', 'Tamamlayıcı Özel Sağlık', 'Konut & DASK', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Talep', options: ['Yeni Poliçe Teklifi', 'Mevcut Hasar Dosyası Takibi', 'Diğer (Lütfen Belirtin)'] }
  ],
  'danismanlik_muhendislik': [
    { id: 'f_0', label: 'Mühendislik Dalı', options: ['İnşaat (Statik/Mimari)', 'Makine (Mekanik Tesisat)', 'Elektrik-Elektronik', 'Harita / Zemin Etüdü', 'Orman Mühendisliği', 'Çevre Mühendisliği', 'Diğer (Lütfen Belirtin)'] },
    { id: 'f_1', label: 'Hizmet İhtiyacı', options: ['Yeni Proje Çizimi / Ruhsatlandırma', 'Saha Kontrolörlüğü / Şantiye Şefliği', 'Danışmanlık / Raporlama', 'Diğer (Lütfen Belirtin)'] }
  ],
  'danismanlik_diger': [
    { id: 'f_0', label: 'Talep Ettiğiniz Hizmet', options: ['Diğer (Lütfen Belirtin)'] }
  ]
};