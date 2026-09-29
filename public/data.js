// ==========================================
// DOSYA 1: data.js (HİZMET KATALOĞU VE LOKASYON VERİLERİ)
// ==========================================

var serviceCatalog = [
  // 1. Ağır Nakliye
  { key: 'agir_kapali_tir', mainCat: 'agir_nakliye', group: 'agir_nakliye', title: 'Kapalı Kasa Tır / Kamyon Nakliye', desc: 'Paletli yük, tekstil, koli', icon: 'fa-truck-front' },
  { key: 'agir_acik_tir', mainCat: 'agir_nakliye', group: 'agir_nakliye', title: 'Açık Kasa Tır / Platform Nakliye', desc: 'Demir, profil, inşaat malzemesi', icon: 'fa-truck-plane' },
  { key: 'agir_parsiyel_yuk', mainCat: 'agir_nakliye', group: 'agir_nakliye', title: 'Parsiyel (Parça) Ağır Yük Taşıma', desc: '1-5 palet arası taşıma', icon: 'fa-boxes-packing' },
  { key: 'agir_lowbed', mainCat: 'agir_nakliye', group: 'agir_nakliye', title: 'Lowbed & İş Makinesi Taşımacılığı', desc: 'Ekskavatör, dozer, ağır sanayi', icon: 'fa-trailer' },
  { key: 'agir_frigo', mainCat: 'agir_nakliye', group: 'agir_nakliye', title: 'Frigo (Soğutuculu) Ağır Nakliye', desc: 'Soğuk zincir ve gıda taşıma', icon: 'fa-snowflake' },
  { key: 'agir_konteyner', mainCat: 'agir_nakliye', group: 'agir_nakliye', title: 'Konteyner Taşımacılığı', desc: 'Liman ve fabrika sevkiyatı', icon: 'fa-box' },

  // 2. Nakliyat & Taşımacılık
  { key: 'nakliyat_evden_eve', mainCat: 'nakliyat', group: 'nakliyat', title: 'Evden Eve Nakliyat', desc: 'Şehir içi & Şehirlerarası ev taşıma', icon: 'fa-truck-ramp-box' },
  { key: 'nakliyat_ofis', mainCat: 'nakliyat', group: 'nakliyat', title: 'Ofis & İş Yeri Taşıma', desc: 'Dükkan, ofis, şirket taşıma', icon: 'fa-building' },
  { key: 'nakliyat_parca_esya', mainCat: 'nakliyat', group: 'nakliyat', title: 'Parça Eşya & Kargo Taşıma', desc: '1-2 parça mobilya, beyaz eşya', icon: 'fa-box-open' },
  { key: 'nakliyat_kamyonet', mainCat: 'nakliyat', group: 'nakliyat', title: 'Şoförlü Kamyonet Kiralama', desc: 'Saatlik / günlük araç tahsisi', icon: 'fa-truck-pickup' },
  { key: 'nakliyat_depolama', mainCat: 'nakliyat', group: 'nakliyat', title: 'Eşya Depolama', desc: 'Güvenli aylık/yıllık depo', icon: 'fa-warehouse' },
  { key: 'nakliyat_ozel_esya', mainCat: 'nakliyat', group: 'nakliyat', title: 'Özel & Ağır Eşya Taşıma', desc: 'Piyano, çelik kasa, antika', icon: 'fa-dolly' },

  // 3. Temizlik & Yıkama
  { key: 'temizlik_ev', mainCat: 'temizlik', group: 'temizlik', title: 'Ev & Gündelik Temizlik', desc: 'Standart, yarım gün veya detaylı', icon: 'fa-broom' },
  { key: 'temizlik_bos_ev', mainCat: 'temizlik', group: 'temizlik', title: 'Taşınma & İnşaat Sonrası', desc: 'Boş ev, tadilat sonrası dip köşe', icon: 'fa-house-chimney-crack' },
  { key: 'temizlik_koltuk_hali', mainCat: 'temizlik', group: 'temizlik', title: 'Koltuk, Yatak & Halı Yıkama', desc: 'Yerinde buharlı ve vakumlu', icon: 'fa-couch' },
  { key: 'temizlik_ofis', mainCat: 'temizlik', group: 'temizlik', title: 'Ofis & İş Yeri Temizliği', desc: 'Periyodik ve kurumsal mekan', icon: 'fa-building-shield' },
  { key: 'temizlik_cam', mainCat: 'temizlik', group: 'temizlik', title: 'Cam & Dış Cephe Temizliği', desc: 'Balkon camı, plaza dış cephe', icon: 'fa-window-maximize' },
  { key: 'temizlik_ilaclama', mainCat: 'temizlik', group: 'temizlik', title: 'Böcek & Haşere İlaçlama', desc: 'Ev, apartman ve iş yeri ilaçlama', icon: 'fa-bug' },

  // 4. Oto & Araç Servisi
  { key: 'oto_mekanik', mainCat: 'oto', group: 'oto', title: 'Mekanik & Ağır Bakım', desc: 'Motor, şanzıman, rektifiye, triger', icon: 'fa-gears' },
  { key: 'oto_periyodik', mainCat: 'oto', group: 'oto', title: 'Periyodik Bakım & Hızlı Servis', desc: 'Motor yağı, filtreler, balata', icon: 'fa-droplet' },
  { key: 'oto_elektrik_klima', mainCat: 'oto', group: 'oto', title: 'Oto Elektrik, Elektronik & Klima', desc: 'Akü, marş, klima gazı dolumu', icon: 'fa-snowflake' },
  { key: 'oto_kaporta', mainCat: 'oto', group: 'oto', title: 'Kaporta, Boya & Göçük Onarımı', desc: 'Fırın boya, PDR göçük düzeltme', icon: 'fa-palette' },
  { key: 'oto_kaplama', mainCat: 'oto', group: 'oto', title: 'Kaplama, Cam Filmi & Seramik', desc: 'PPF koruma, renk değişimi', icon: 'fa-shield-halved' },
  { key: 'oto_kuafor', mainCat: 'oto', group: 'oto', title: 'Oto Kuaför, Temizlik & Pasta Cila', desc: 'Detaylı iç temizlik, boya koruma', icon: 'fa-spray-can-sparkles' },
  { key: 'oto_lastik', mainCat: 'oto', group: 'oto', title: 'Oto Lastik, Jant & Balans', desc: 'Lastik değişimi, mobil lastikçi', icon: 'fa-compact-disc' },
  { key: 'oto_ekspertiz', mainCat: 'oto', group: 'oto', title: 'Oto Ekspertiz & Cam Servisi', desc: 'TSE onaylı rapor ve cam tamiri', icon: 'fa-car-side' },

  // 5. Organizasyon & Etkinlik
  { key: 'org_dugun', mainCat: 'organizasyon', group: 'organizasyon', title: 'Düğün, Nişan & Söz', desc: 'Konsept süsleme, mekan planlama', icon: 'fa-champagne-glasses' },
  { key: 'org_dogum', mainCat: 'organizasyon', group: 'organizasyon', title: 'Doğum Günü & Parti', desc: 'Animatör, süsleme, catering', icon: 'fa-cake-candles' },
  { key: 'org_catering', mainCat: 'organizasyon', group: 'organizasyon', title: 'Catering & Toplu Yemek', desc: 'Sıcak yemek, kokteyl, lokma', icon: 'fa-utensils' },
  { key: 'org_muzik', mainCat: 'organizasyon', group: 'organizasyon', title: 'Müzisyen, DJ & Eğlence', desc: 'Canlı müzik, DJ, bando, davul zurna', icon: 'fa-music' },
  { key: 'org_ekipman', mainCat: 'organizasyon', group: 'organizasyon', title: 'Ekipman, Masa & Ses Sistemi', desc: 'Masa sandalye, ses, ışık kiralama', icon: 'fa-volume-high' },
  { key: 'org_pasta', mainCat: 'organizasyon', group: 'organizasyon', title: 'Butik Pasta, Çiçek & Hediyelik', desc: 'Özel tasarım pasta, nikah şekeri', icon: 'fa-gift' },
  { key: 'org_arac', mainCat: 'organizasyon', group: 'organizasyon', title: 'Araç, Tekne & Yat Kiralama', desc: 'Lüks gelin arabası, yat kiralama', icon: 'fa-car' },
  { key: 'org_dini', mainCat: 'organizasyon', group: 'organizasyon', title: 'Dini Tören, Nikah & Özel Dikim', desc: 'Dini nikah, mevlüt, gelinlik dikim', icon: 'fa-ring' },

  // 6. Tamir, Montaj & Servis
  { key: 'tamir_beyaz_esya', mainCat: 'tamir', group: 'tamir', title: 'Beyaz Eşya & Ankastre Servisi', desc: 'Buzdolabı, çamaşır makinesi tamiri', icon: 'fa-blender' },
  { key: 'tamir_tesisat', mainCat: 'tamir', group: 'tamir', title: 'Su Tesisatı, Gider & Rezervuar', desc: 'Su kaçağı, tıkalı gider açma', icon: 'fa-faucet-drip' },
  { key: 'tamir_elektrik', mainCat: 'tamir', group: 'tamir', title: 'Elektrik, Aydınlatma & Kablo', desc: 'Avize montajı, fiber internet', icon: 'fa-bolt' },
  { key: 'tamir_mobilya', mainCat: 'tamir', group: 'tamir', title: 'Mobilya Montajı & Kurulum', desc: 'IKEA montaj, dolap kurulum', icon: 'fa-screwdriver-wrench' },
  { key: 'tamir_kombi', mainCat: 'tamir', group: 'tamir', title: 'Kombi, Klima & Doğalgaz', desc: 'Kombi bakım, petek temizliği', icon: 'fa-temperature-arrow-up' },
  { key: 'tamir_cilingir', mainCat: 'tamir', group: 'tamir', title: 'Çilingir, Kapı & Pencere Servisi', desc: 'Kilit değiştirme, panjur tamiri', icon: 'fa-key' },
  { key: 'tamir_bilgisayar', mainCat: 'tamir', group: 'tamir', title: 'Bilgisayar & Telefon Tamiri', desc: 'Ekran değişimi, format, tamir', icon: 'fa-laptop' },
  { key: 'tamir_guvenlik', mainCat: 'tamir', group: 'tamir', title: 'Kamera, Güvenlik, Uydu & Diafon', desc: 'Kamera montajı, çanak anten', icon: 'fa-video' },
  { key: 'tamir_dusakabin', mainCat: 'tamir', group: 'tamir', title: 'Cam, Ayna & Duşakabin', desc: 'Duşakabin montaj, ayna montajı', icon: 'fa-shower' },

  // 7. Tadilat & Dekorasyon
  { key: 'tadilat_anahtar', mainCat: 'tadilat', group: 'tadilat', title: 'Anahtar Teslim Tadilat & İç Mimari', desc: 'Komple ev yenileme, 3D çizim', icon: 'fa-house-chimney' },
  { key: 'tadilat_boya', mainCat: 'tadilat', group: 'tadilat', title: 'Boya, Badana & Alçıpan İşleri', desc: 'Daire boyama, asma tavan', icon: 'fa-paint-roller' },
  { key: 'tadilat_zemin', mainCat: 'tadilat', group: 'tadilat', title: 'Zemin, Fayans & Mutfak Tezgahı', desc: 'Seramik döşeme, tezgah değişimi', icon: 'fa-border-all' },
  { key: 'tadilat_cam_balkon', mainCat: 'tadilat', group: 'tadilat', title: 'Cam Balkon, Kapı & Pencere', desc: 'Cam balkon, çelik kapı', icon: 'fa-door-open' },
  { key: 'tadilat_cati', mainCat: 'tadilat', group: 'tadilat', title: 'Çatı, Yalıtım & İzolasyon', desc: 'Çatı tamiri, su/ısı yalıtımı', icon: 'fa-house' },
  { key: 'tadilat_bahce', mainCat: 'tadilat', group: 'tadilat', title: 'Bahçe, Peyzaj & Çevre', desc: 'Ağaç budama, çim, çit sistemleri', icon: 'fa-seedling' },
  { key: 'tadilat_marangoz', mainCat: 'tadilat', group: 'tadilat', title: 'Marangoz & Özel Mobilya', desc: 'Özel dolap imalatı, merdiven', icon: 'fa-hammer' },
  { key: 'tadilat_prefabrik', mainCat: 'tadilat', group: 'tadilat', title: 'İnşaat, Prefabrik & Çelik Ev', desc: 'Prefabrik ev yapımı, bina yıkım', icon: 'fa-city' },

  // 8. Özel Ders & Eğitim
  { key: 'ders_okul', mainCat: 'ders', group: 'ders', title: 'Okul Takviye & Sınav Hazırlık', desc: 'LGS, YKS, Lise/Ortaokul dersleri', icon: 'fa-graduation-cap' },
  { key: 'ders_dil', mainCat: 'ders', group: 'ders', title: 'Yabancı Dil Eğitimi', desc: 'İngilizce, Almanca, IELTS', icon: 'fa-language' },
  { key: 'ders_muzik', mainCat: 'ders', group: 'ders', title: 'Müzik & Enstrüman Dersleri', desc: 'Gitar, piyano, keman, şan', icon: 'fa-guitar' },
  { key: 'ders_direksiyon', mainCat: 'ders', group: 'ders', title: 'Direksiyon & Sürüş Eğitimi', desc: 'Özel direksiyon, motor eğitimi', icon: 'fa-car' },
  { key: 'ders_koc', mainCat: 'ders', group: 'ders', title: 'Özel Eğitim, Oyun Ablası & Koçluk', desc: 'Eğitim koçu, oyun ablası, disleksi', icon: 'fa-children' },
  { key: 'ders_spor', mainCat: 'ders', group: 'ders', title: 'Spor, Dans & Savunma Sanatları', desc: 'Yüzme, kick boks, dans dersi', icon: 'fa-person-running' },
  { key: 'ders_mesleki', mainCat: 'ders', group: 'ders', title: 'Mesleki, Yazılım & Kişisel Gelişim', desc: 'AutoCAD, diksiyon, hızlı okuma', icon: 'fa-laptop-code' },
  { key: 'ders_dini', mainCat: 'ders', group: 'ders', title: 'Kuran-ı Kerim & Dini Eğitim', desc: 'Kuran okuma, hafızlık eğitimi', icon: 'fa-book-quran' },

  // 9. Fotoğraf, Video & Medya
  { key: 'medya_dugun', mainCat: 'medya', group: 'medya', title: 'Düğün, Özel Gün & Dış Çekim', desc: 'Dış çekim, nişan, hikaye klibi', icon: 'fa-camera-retro' },
  { key: 'medya_kurumsal', mainCat: 'medya', group: 'medya', title: 'Kurumsal, Ürün & E-Ticaret', desc: 'Ürün çekimi, tanıtım filmi, drone', icon: 'fa-clapperboard' },
  { key: 'medya_sosyal', mainCat: 'medya', group: 'medya', title: 'Sosyal Medya & Video Kurgu', desc: 'Reels çekimi, video edit/kurgu', icon: 'fa-video' },

  // 10. Evcil Hayvanlar (Pet)
  { key: 'pet_kuafor', mainCat: 'pet', group: 'pet', title: 'Pet Kuaför & Tıraş Hizmetleri', desc: 'Kedi/köpek tırnak, tıraş, banyo', icon: 'fa-scissors' },
  { key: 'pet_pansiyon', mainCat: 'pet', group: 'pet', title: 'Pansiyon, Otel & Konaklama', desc: 'Güvenli kedi ve köpek oteli', icon: 'fa-hotel' },
  { key: 'pet_egitim', mainCat: 'pet', group: 'pet', title: 'Köpek Eğitimi & Tuvalet Eğitimi', desc: 'İtaat, tuvalet, sosyalleşme', icon: 'fa-dog' },
  { key: 'pet_bakim', mainCat: 'pet', group: 'pet', title: 'Günlük Evde Bakım & Gezdirme', desc: 'Köpek gezdirme, evde gözetim', icon: 'fa-paw' },

  // 11. Sağlık, Terapi & Yaşam
  { key: 'saglik_terapi', mainCat: 'saglik', group: 'saglik', title: 'Psikolojik Danışmanlık & Terapi', desc: 'Klinik psikolog, çift terapisi', icon: 'fa-brain' },
  { key: 'saglik_diyet', mainCat: 'saglik', group: 'saglik', title: 'Diyetisyen & Beslenme', desc: 'Kilo kontrolü, sporcu beslenmesi', icon: 'fa-carrot' },
  { key: 'saglik_fizyoterapi', mainCat: 'saglik', group: 'saglik', title: 'Fizyoterapi & Manuel Terapi', desc: 'Evde fizik tedavi, fıtık bakımı', icon: 'fa-hand-holding-medical' },

  // 12. Spor & Fitness
  { key: 'spor_pt', mainCat: 'spor', group: 'spor', title: 'Personal Trainer & Özel Antrenör', desc: 'Kişiye özel fitness, kondisyon', icon: 'fa-dumbbell' },
  { key: 'spor_pilates', mainCat: 'spor', group: 'spor', title: 'Pilates & Reformer Stüdyo', desc: 'Birebir aletli pilates dersleri', icon: 'fa-child-reaching' },

  // 13. Güzellik & Kişisel Bakım
  { key: 'guzellik_kuafor', mainCat: 'guzellik', group: 'guzellik', title: 'Kuaför, Saç Kesim & Kaynak', desc: 'Saç kesim, boya, mikro kaynak', icon: 'fa-wand-magic-sparkles' },
  { key: 'guzellik_gelin', mainCat: 'guzellik', group: 'guzellik', title: 'Gelin, Nişan Saç & Makyaj', desc: 'Porselen makyaj, gelin başı', icon: 'fa-face-smile-beam' },
  { key: 'guzellik_tirnak', mainCat: 'guzellik', group: 'guzellik', title: 'Protez Tırnak, Manikür & Nail Art', desc: 'Jel tırnak, kalıcı oje', icon: 'fa-hand-sparkles' },
  { key: 'guzellik_epilasyon', mainCat: 'guzellik', group: 'guzellik', title: 'Epilasyon & Cilt Bakımı', desc: 'Lazer epilasyon, medikal cilt bakımı', icon: 'fa-spa' },
  { key: 'guzellik_dovme', mainCat: 'guzellik', group: 'guzellik', title: 'Dövme (Tattoo) & Masaj', desc: 'Profesyonel dövme ve relax masaj', icon: 'fa-hand-holding-heart' },

  // 14. Dijital, Yazılım & Kurumsal
  { key: 'dijital_pazarlama', mainCat: 'dijital', group: 'dijital', title: 'Dijital Pazarlama, SEO & Reklam', desc: 'Sosyal medya yönetimi, Google Ads', icon: 'fa-chart-line' },
  { key: 'dijital_yazilim', mainCat: 'dijital', group: 'dijital', title: 'Web Tasarım & Yazılım', desc: 'E-ticaret sitesi, mobil uygulama', icon: 'fa-code' },
  { key: 'dijital_grafik', mainCat: 'dijital', group: 'dijital', title: 'Grafik Tasarım, 3D Modelleme', desc: 'Logo, kurumsal kimlik, 3D çizim', icon: 'fa-pen-nib' },
  { key: 'dijital_danismanlik', mainCat: 'dijital', group: 'dijital', title: 'Kurumsal Danışmanlık & Şirket', desc: 'Şirket kuruluşu, marka tescil', icon: 'fa-briefcase' },
  { key: 'dijital_tercume', mainCat: 'dijital', group: 'dijital', title: 'Tercüme & Metin Yazarlığı', desc: 'Yeminli tercüme, makale yazarlığı', icon: 'fa-language' },
  { key: 'dijital_matbaa', mainCat: 'dijital', group: 'dijital', title: 'Matbaa, Tabela, Promosyon & Baskı', desc: 'Kartvizit, tabela, tekstil baskı', icon: 'fa-print' },

  // 15. Özel Danışmanlık & Butik
  { key: 'danismanlik_terzi', mainCat: 'danismanlik', group: 'danismanlik', title: 'Özel Dikim & Terzi Tadilatı', desc: 'Kıyafet, elbise ve perde dikimi', icon: 'fa-shirt' },
  { key: 'danismanlik_karavan', mainCat: 'danismanlik', group: 'danismanlik', title: 'Karavan İmalatı & Kiralama', desc: 'Karavan dönüşüm ve bakımı', icon: 'fa-van-shuttle' }
];
// --- TÜRKİYE İL VE İLÇE VERİTABANI (81 İL TAM LİSTE) ---
var rawTurkeyLocations = {
  "Adana": ["Seyhan", "Yüreğir", "Çukurova", "Sarıçam", "Ceyhan", "Kozan", "İmamoğlu", "Karataş", "Karaisalı", "Pozantı", "Yumurtalık", "Tufanbeyli", "Feke", "Aladağ", "Saimbeyli"],
  "Adıyaman": ["Merkez", "Besni", "Kahta", "Gölbaşı", "Gerger", "Sincik", "Çelikhan", "Tut", "Samsat"],
  "Afyonkarahisar": ["Merkez", "Sandıklı", "Dinar", "Bolvadin", "Emirdağ", "Çay", "İhsaniye", "İscehisar", "Şuhut", "Sultandağı", "Dazkırı", "Sinanpaşa", "Hocalar", "Bayat", "Evciler", "Başmakçı", "Kızılören"],
  "Ağrı": ["Merkez", "Patnos", "Doğubayazıt", "Diyadin", "Eleşkirt", "Tutak", "Taşlıçay", "Hamur"],
  "Amasya": ["Merkez", "Merzifon", "Suluova", "Taşova", "Gümüşhacıköy", "Göynücek", "Hamamözü"],
  "Ankara": ["Çankaya", "Keçiören", "Yenimahalle", "Mamak", "Etimesgut", "Sincan", "Altındağ", "Pursaklar", "Gölbaşı", "Polatlı", "Çubuk", "Kahramankazan", "Beypazarı", "Elmadağ", "Şereflikoçhisar", "Akyurt", "Nallıhan", "Haymana", "Kızılcahamam", "Bala", "Çamlıdere", "Ayaş", "Evren", "Güdül", "Kalecik"],
  "Antalya": ["Muratpaşa", "Kepez", "Konyaaltı", "Alanya", "Manavgat", "Serik", "Kumluca", "Kaş", "Kemer", "Gazipaşa", "Finike", "Korkuteli", "Elmalı", "Demre", "Akseki", "Gündoğmuş", "İbradı"],
  "Artvin": ["Merkez", "Hopa", "Borçka", "Arhavi", "Şavşat", "Yusufeli", "Ardanuç", "Murgul", "Kemalpaşa"],
  "Aydın": ["Efeler", "Nazilli", "Söke", "Kuşadası", "Didim", "Çine", "İncirliova", "Kuyucak", "Germencik", "Bozdoğan", "Koçarlı", "Köşk", "Karacasu", "Sultanhisar", "Yenipazar", "Buharkent", "Karpuzlu"],
  "Balıkesir": ["Altıeylül", "Karesi", "Bandırma", "Edremit", "Ayvalık", "Gönen", "Burhaniye", "Bigadiç", "Susurluk", "Dursunbey", "Sındırgı", "Erdek", "Havran", "İvrindi", "Manyas", "Savaştepe", "Gömeç", "Kepsut", "Balya", "Marmara"],
  "Bilecik": ["Merkez", "Bozüyük", "Osmaneli", "Söğüt", "Gölpazarı", "Pazaryeri", "Yenipazar", "İnhisar"],
  "Bingöl": ["Merkez", "Genç", "Solhan", "Karlıova", "Adaklı", "Kiğı", "Yedisu", "Yayladere"],
  "Bitlis": ["Merkez", "Tatvan", "Güroymak", "Ahlat", "Hizan", "Mutki", "Adilcevaz"],
  "Bolu": ["Merkez", "Gerede", "Mudurnu", "Göynük", "Mengen", "Yeniçağa", "Dörtdivan", "Seben", "Kıbrıscık"],
  "Burdur": ["Merkez", "Bucak", "Gölhisar", "Tefenni", "Yeşilova", "Karamanlı", "Ağlasun", "Çavdır", "Altınyayla", "Çeltikçi", "Kemer"],
  "Bursa": ["Osmangazi", "Yıldırım", "Nilüfer", "İnegöl", "Gemlik", "Mustafakemalpaşa", "Mudanya", "Gürsu", "Karacabey", "Orhangazi", "Kestel", "Yenişehir", "İznik", "Orhaneli", "Keles", "Büyükorhan", "Harmancık"],
  "Çanakkale": ["Merkez", "Biga", "Çan", "Gelibolu", "Yenice", "Ayvacık", "Ezine", "Bayramiç", "Lapseki", "Eceabat", "Gökçeada", "Bozcaada"],
  "Çankırı": ["Merkez", "Çerkeş", "Ilgaz", "Orta", "Şabanözü", "Kurşunlu", "Yapraklı", "Kızılırmak", "Eldivan", "Atkaracalar", "Korgun", "Bayramören"],
  "Çorum": ["Merkez", "Sungurlu", "Osmancık", "İskilip", "Alaca", "Bayat", "Mecitözü", "Kargı", "Ortaköy", "Uğurludağ", "Dodurga", "Oğuzlar", "Laçin", "Boğazkale"],
  "Denizli": ["Pamukkale", "Merkezefendi", "Çivril", "Acıpayam", "Tavas", "Honaz", "Sarayköy", "Buldan", "Kale", "Çal", "Çameli", "Serinhisar", "Bozkurt", "Güney", "Baklan", "Beyağaç", "Babadağ", "Bekilli"],
  "Diyarbakır": ["Kayapınar", "Bağlar", "Yenişehir", "Sur", "Ergani", "Bismil", "Silvan", "Çınar", "Çermik", "Dicle", "Kulp", "Hani", "Lice", "Eğil", "Hazro", "Kocaköy"],
  "Edirne": ["Merkez", "Keşan", "Uzunköprü", "İpsala", "Havsa", "Meriç", "Enez", "Süloğlu", "Lalapaşa"],
  "Elazığ": ["Merkez", "Kovancılar", "Karakoçan", "Palu", "Arıcak", "Baskil", "Maden", "Sivrice", "Alacakaya", "Keban", "Ağın"],
  "Erzincan": ["Merkez", "Tercan", "Üzümlü", "Refahiye", "Çayırlı", "İliç", "Kemah", "Kemaliye", "Otlukbeli"],
  "Erzurum": ["Yakutiye", "Palandöken", "Aziziye", "Horasan", "Oltu", "Pasinler", "Karayazı", "Hınıs", "Tekman", "Karaçoban", "Aşkale", "Şenkaya", "Çat", "Köprüköy", "İspir", "Tortum", "Narman", "Uzundere", "Olur", "Pazaryolu"],
  "Eskişehir": ["Odunpazarı", "Tepebaşı", "Sivrihisar", "Çifteler", "Seyitgazi", "Alpu", "Mihalıççık", "Mahmudiye", "Beylikova", "İnönü", "Günyüzü", "Sarıcakaya", "Mihalgazi", "Han"],
  "Gaziantep": ["Şahinbey", "Şehitkamil", "Nizip", "İslahiye", "Nurdağı", "Araban", "Oğuzeli", "Yavuzeli", "Karkamış"],
  "Giresun": ["Merkez", "Bulancak", "Görele", "Tirebolu", "Espiye", "Şebinkarahisar", "Keşap", "Dereli", "Yağlıdere", "Piraziz", "Eynesil", "Alucra", "Çanakçı", "Güce", "Doğankent", "Çamoluk"],
  "Gümüşhane": ["Merkez", "Kelkit", "Şiran", "Kürtün", "Torul", "Köse"],
  "Hakkari": ["Merkez", "Yüksekova", "Şemdinli", "Çukurca", "Derecik"],
  "Hatay": ["Antakya", "İskenderun", "Defne", "Dörtyol", "Samandağ", "Kırıkhan", "Reyhanlı", "Arsuz", "Altınözü", "Hassa", "Payas", "Erzin", "Yayladağı", "Belen", "Kumlu"],
  "Isparta": ["Merkez", "Yalvaç", "Eğirdir", "Şarkikaraağaç", "Gelendost", "Keçiborlu", "Senirkent", "Sütçüler", "Gönen", "Uluborlu", "Atabey", "Aksu", "Yenişarbademli"],
  "Mersin": ["Tarsus", "Toroslar", "Akdeniz", "Yenişehir", "Mezitli", "Erdemli", "Silifke", "Mut", "Gülnar", "Bozyazı", "Anamur", "Aydıncık", "Çamlıyayla"],
  "İstanbul": ["Esenyurt", "Küçükçekmece", "Bağcılar", "Ümraniye", "Pendik", "Bahçelievler", "Üsküdar", "Sultangazi", "Gaziosmanpaşa", "Maltepe", "Kartal", "Kadıköy", "Esenler", "Kağıthane", "Fatih", "Avcılar", "Başakşehir", "Ataşehir", "Sancaktepe", "Eyüpsultan", "Sarıyer", "Beylikdüzü", "Sultanbeyli", "Güngören", "Zeytinburnu", "Şişli", "Bayrampaşa", "Tuzla", "Büyükçekmece", "Çekmeköy", "Beykoz", "Beyoğlu", "Bakırköy", "Silivri", "Beşiktaş", "Çatalca", "Şile", "Adalar"],
  "İzmir": ["Buca", "Karabağlar", "Bornova", "Karşıyaka", "Konak", "Bayraklı", "Çiğli", "Torbalı", "Menemen", "Gaziemir", "Ödemiş", "Kemalpaşa", "Bergama", "Aliağa", "Menderes", "Tire", "Balçova", "Narlıdere", "Urla", "Dikili", "Kiraz", "Seferihisar", "Çeşme", "Bayındır", "Selçuk", "Foça", "Güzelbahçe", "Kınık", "Beydağ", "Karaburun"],
  "Kars": ["Merkez", "Kağızman", "Sarıkamış", "Selim", "Digor", "Arpaçay", "Akyaka", "Susuz"],
  "Kastamonu": ["Merkez", "Tosya", "Taşköprü", "Cide", "İnebolu", "Araç", "Devrekani", "Bozkurt", "Daday", "Azdavay", "Çatalzeytin", "Küre", "Doğanyurt", "İhsangazi", "Pınarbaşı", "Şenpazar", "Abana", "Hanönü", "Seydiler", "Ağlı"],
  "Kayseri": ["Melikgazi", "Kocasinan", "Talas", "Develi", "Yahyalı", "Bünyan", "İncesu", "Pınarbaşı", "Tomarza", "Yeşilhisar", "Sarıoğlan", "Hacılar", "Sarız", "Akkışla", "Felahiye", "Özvatan"],
  "Kırklareli": ["Merkez", "Lüleburgaz", "Babaeski", "Vize", "Pınarhisar", "Demirköy", "Pehlivanköy", "Kofçaz"],
  "Kırşehir": ["Merkez", "Kaman", "Mucur", "Çiçekdağı", "Akpınar", "Boztepe", "Akçakent"],
  "Kocaeli": ["İzmit", "Gebze", "Gölcük", "Darıca", "Körfez", "Derince", "Çayırova", "Kartepe", "Başiskele", "Karamürsel", "Kandıra", "Dilovası"],
  "Konya": ["Selçuklu", "Karatay", "Meram", "Ereğli", "Akşehir", "Beyşehir", "Çumra", "Seydişehir", "Ilgın", "Cihanbeyli", "Kulu", "Karapınar", "Kadınhanı", "Sarayönü", "Bozkır", "Yunak", "Doğanhisar", "Hüyük", "Altınekin", "Hadim", "Çeltik", "Güneysınır", "Emirgazi", "Taşkent", "Tuzlukçu", "Derbent", "Akören", "Halkapınar", "Yalıhüyük"],
  "Kütahya": ["Merkez", "Tavşanlı", "Simav", "Gediz", "Emet", "Altıntaş", "Domaniç", "Hisarcık", "Aslanapa", "Çavdarhisar", "Şaphane", "Pazarlar", "Dumlupınar"],
  "Malatya": ["Battalgazi", "Yeşilyurt", "Doğanşehir", "Akçadağ", "Darende", "Hekimhan", "Pütürge", "Yazıhan", "Arapgir", "Arguvan", "Kuluncak", "Kale", "Doğanyol"],
  "Manisa": ["Yunusemre", "Şehzadeler", "Akhisar", "Salihli", "Turgutlu", "Soma", "Alaşehir", "Saruhanlı", "Kula", "Kırkağaç", "Demirci", "Sarıgöl", "Gördes", "Selendi", "Ahmetli", "Gölmarmara"],
  "Kahramanmaraş": ["Onikişubat", "Dulkadiroğlu", "Elbistan", "Afşin", "Türkoğlu", "Pazarcık", "Göksun", "Andırın", "Çağlayancerit", "Nurhak", "Ekinözü"],
  "Mardin": ["Kızıltepe", "Artuklu", "Midyat", "Nusaybin", "Derik", "Mazıdağı", "Dargeçit", "Savur", "Yeşilli", "Ömerli"],
  "Muğla": ["Bodrum", "Fethiye", "Milas", "Menteşe", "Marmaris", "Seydikemer", "Ortaca", "Yatağan", "Dalaman", "Köyceğiz", "Ula", "Datça", "Kavaklıdere"],
  "Muş": ["Merkez", "Bulanık", "Malazgirt", "Varto", "Hasköy", "Korkut"],
  "Nevşehir": ["Merkez", "Ürgüp", "Avanos", "Gülşehir", "Derinkuyu", "Acıgöl", "Kozaklı", "Hacıbektaş"],
  "Niğde": ["Merkez", "Bor", "Çiftlik", "Ulukışla", "Altunhisar", "Çamardı"],
  "Ordu": ["Altınordu", "Ünye", "Fatsa", "Gölköy", "Perşembe", "Kumru", "Aybastı", "Korgan", "Akkuş", "Ulubey", "Mesudiye", "İkizce", "Gürgentepe", "Çatalpınar", "Çaybaşı", "Kabataş", "Kabadüz", "Gülyalı", "Çamaş", "Maden"],
  "Rize": ["Merkez", "Çayeli", "Ardeşen", "Pazar", "Fındıklı", "Güneysu", "Kalkandere", "İyidere", "Derepazarı", "Çamlıhemşin", "İkizdere", "Hemşin"],
  "Sakarya": ["Adapazarı", "Serdivan", "Erenler", "Hendek", "Akyazı", "Arifiye", "Sapanca", "Karasu", "Geyve", "Pamukova", "Ferizli", "Kaynarca", "Kocaali", "Söğütlü", "Karapürçek", "Taraklı"],
  "Samsun": ["İlkadım", "Atakum", "Bafra", "Çarşamba", "Canik", "Vezirköprü", "Terme", "Tekkeköy", "Havza", "Ondokuzmayıs", "Alaçam", "Ayvacık", "Salıpazarı", "Kavak", "Asarcık", "Yakakent", "Ladik"],
  "Siirt": ["Merkez", "Kurtalan", "Pervari", "Baykan", "Şirvan", "Eruh", "Tillo"],
  "Sinop": ["Merkez", "Boyabat", "Gerze", "Ayancık", "Durağan", "Türkeli", "Erfelek", "Dikmen", "Saraydüzü"],
  "Sivas": ["Merkez", "Yıldızeli", "Şarkışla", "Gemerek", "Suşehri", "Zara", "Gürün", "Divriği", "Kangal", "Hafik", "Şarkışla", "Altınyayla", "Ulaş", "İmranlı", "Akıncılar", "Gölova", "Doğanşar"],
  "Tekirdağ": ["Çorlu", "Süleymanpaşa", "Çerkezköy", "Kapaklı", "Ergene", "Malkara", "Saray", "Hayrabolu", "Şarköy", "Muratlı", "Marmaraereğlisi"],
  "Tokat": ["Merkez", "Erbaa", "Turhal", "Zile", "Niksar", "Reşadiye", "Almus", "Pazar", "Başçiftlik", "Sulusaray", "Artova", "Yeşilyurt"],
  "Trabzon": ["Ortahisar", "Akçaabat", "Araklı", "Of", "Yomra", "Arsin", "Vakfıkebir", "Sürmene", "Maçka", "Beşikdüzü", "Çarşıbaşı", "Tonya", "Düzköy", "Şalpazarı", "Çaykara", "Hayrat", "Köprübaşı", "Dernekpazarı"],
  "Tunceli": ["Merkez", "Pertek", "Mazgirt", "Çemişgezek", "Ovacık", "Hozat", "Pülümür", "Nazımiye"],
  "Şanlıurfa": ["Eyyübiye", "Haliliye", "Siverek", "Viranşehir", "Karaköprü", "Akçakale", "Suruç", "Birecik", "Ceylanpınar", "Harran", "Bozova", "Hilvan", "Halfeti"],
  "Uşak": ["Merkez", "Banaz", "Eşme", "Sivaslı", "Ulubey", "Karahallı"],
  "Van": ["İpekyolu", "Erciş", "Tuşba", "Edremit", "Özalp", "Çaldıran", "Muradiye", "Başkale", "Gürpınar", "Gevaş", "Saray", "Çatak", "Bahçesaray"],
  "Yozgat": ["Merkez", "Sorgun", "Akdağmadeni", "Yerköy", "Boğazlıyan", "Şefaatli", "Saraykent", "Çekerek", "Yenifakılı", "Kadışehri", "Aydıncık", "Çandır"],
  "Zonguldak": ["Merkez", "Ereğli", "Çaycuma", "Devrek", "Alaplı", "Kozlu", "Kilimli", "Gökçebey"],
  "Aksaray": ["Merkez", "Ortaköy", "Eskil", "Gülağaç", "Güzelyurt", "Ağaçören", "Sarıyahşi", "Sultanhanı"],
  "Bayburt": ["Merkez", "Demirözü", "Aydıntepe"],
  "Karaman": ["Merkez", "Ermenek", "Sarıveliler", "Ayrancı", "Kazımkarabekir", "Başyayla"],
  "Kırıkkale": ["Merkez", "Yahşihan", "Keskin", "Delice", "Bahşılı", "Sulakyurt", "Balışeyh", "Karakeçili", "Çelebi"],
  "Batman": ["Merkez", "Kozluk", "Sason", "Beşiri", "Gercüş", "Hasankeyf"],
  "Şırnak": ["Merkez", "Cizre", "Silopi", "İdil", "Uludere", "Beytüşşebap", "Güçlükonak"],
  "Bartın": ["Merkez", "Ulus", "Amasra", "Kurucaşile"],
  "Ardahan": ["Merkez", "Göle", "Çıldır", "Hanak", "Posof", "Damal"],
  "Iğdır": ["Merkez", "Tuzluca", "Aralık", "Karakoyunlu"],
  "Yalova": ["Merkez", "Çınarcık", "Çiftlikköy", "Altınova", "Armutlu", "Termal"],
  "Karabük": ["Merkez", "Safranbolu", "Yenice", "Eskipazar", "Eflani", "Ovacık"],
  "Kilis": ["Merkez", "Musabeyli", "Elbeyli", "Polateli"],
  "Osmaniye": ["Merkez", "Kadirli", "Düziçi", "Bahçe", "Sumbas", "Toprakkale", "Hasanbeyli"],
  "Düzce": ["Merkez", "Akçakoca", "Kaynaşlı", "Gölyaka", "Çilimli", "Yığılca", "Gümüşova", "Cumayeri"]
};

// --- TÜRKİYE İL KOORDİNATLARI (ÖRNEKLEMLİ) ---
// --- TÜRKİYE İL KOORDİNATLARI (81 İL TAM LİSTE) ---
var cityCoords = {
  "Adana": [37.0, 35.32], "Adıyaman": [37.76, 38.27], "Afyonkarahisar": [38.75, 30.55], "Ağrı": [39.71, 43.05],
  "Amasya": [40.65, 35.83], "Ankara": [39.93, 32.85], "Antalya": [36.89, 30.71], "Artvin": [41.18, 41.81],
  "Aydın": [37.83, 27.84], "Balıkesir": [39.64, 27.88], "Bilecik": [40.14, 29.97], "Bingöl": [38.88, 40.49],
  "Bitlis": [38.4, 42.1], "Bolu": [40.73, 31.6], "Burdur": [37.71, 30.28], "Bursa": [40.18, 29.06],
  "Çanakkale": [40.15, 26.4], "Çankırı": [40.6, 33.61], "Çorum": [40.54, 34.95], "Denizli": [37.77, 29.08],
  "Diyarbakır": [37.91, 40.23], "Edirne": [41.67, 26.55], "Elazığ": [38.68, 39.22], "Erzincan": [39.75, 39.49],
  "Erzurum": [39.9, 41.27], "Eskişehir": [39.77, 30.52], "Gaziantep": [37.06, 37.38], "Giresun": [40.91, 38.38],
  "Gümüşhane": [40.45, 39.48], "Hakkari": [37.57, 43.73], "Hatay": [36.2, 36.16], "Isparta": [37.76, 30.55],
  "Mersin": [36.81, 34.64], "İstanbul": [41.0, 28.97], "İzmir": [38.41, 27.12], "Kars": [40.6, 43.09],
  "Kastamonu": [41.37, 33.77], "Kayseri": [38.72, 35.48], "Kırklareli": [41.73, 27.22], "Kırşehir": [39.14, 34.16],
  "Kocaeli": [40.76, 29.91], "Konya": [37.87, 32.48], "Kütahya": [39.42, 29.98], "Malatya": [38.35, 38.33],
  "Manisa": [38.61, 27.42], "Kahramanmaraş": [37.57, 36.92], "Mardin": [37.31, 40.74], "Muğla": [37.21, 28.36],
  "Muş": [38.73, 41.49], "Nevşehir": [38.62, 34.71], "Niğde": [37.96, 34.67], "Ordu": [40.98, 37.87],
  "Rize": [41.02, 40.52], "Sakarya": [40.75, 30.37], "Samsun": [41.28, 36.33], "Siirt": [37.93, 41.94],
  "Sinop": [42.02, 35.15], "Sivas": [39.75, 37.01], "Tekirdağ": [40.98, 27.51], "Tokat": [40.31, 36.55],
  "Trabzon": [41.0, 39.71], "Tunceli": [39.1, 39.54], "Şanlıurfa": [37.16, 38.79], "Uşak": [38.67, 29.4],
  "Van": [38.5, 43.37], "Yozgat": [39.82, 34.8], "Zonguldak": [41.45, 31.79], "Aksaray": [38.36, 34.02],
  "Bayburt": [40.26, 40.22], "Karaman": [37.18, 33.22], "Kırıkkale": [39.83, 33.51], "Batman": [37.88, 41.13],
  "Şırnak": [37.51, 42.45], "Bartın": [41.63, 32.33], "Ardahan": [41.11, 42.7], "Iğdır": [39.92, 44.04],
  "Yalova": [40.65, 29.27], "Karabük": [41.19, 32.62], "Kilis": [36.71, 37.11], "Osmaniye": [37.07, 36.24],
  "Düzce": [40.83, 31.15]
};

var sectorScores = {
  'nakliyat': 1.2,
  'agir_nakliye': 1.5,
  'temizlik': 1.0,
  'oto': 1.3,
  'tadilat': 1.4,
  'default': 1.0
};

// --- ŞEHİR BAZLI FİYAT ÇARPANLARI (81 İL TAM LİSTE) ---
var cityTierMultipliers = {
  "Adana": 1.1, "Adıyaman": 1.0, "Afyonkarahisar": 1.0, "Ağrı": 1.0, "Amasya": 1.0, "Ankara": 1.3,
  "Antalya": 1.2, "Artvin": 1.0, "Aydın": 1.0, "Balıkesir": 1.0, "Bilecik": 1.0, "Bingöl": 1.0,
  "Bitlis": 1.0, "Bolu": 1.0, "Burdur": 1.0, "Bursa": 1.2, "Çanakkale": 1.0, "Çankırı": 1.0,
  "Çorum": 1.0, "Denizli": 1.0, "Diyarbakır": 1.1, "Edirne": 1.0, "Elazığ": 1.0, "Erzincan": 1.0,
  "Erzurum": 1.0, "Eskişehir": 1.1, "Gaziantep": 1.1, "Giresun": 1.0, "Gümüşhane": 1.0, "Hakkari": 1.0,
  "Hatay": 1.0, "Isparta": 1.0, "Mersin": 1.1, "İstanbul": 1.5, "İzmir": 1.3, "Kars": 1.0,
  "Kastamonu": 1.0, "Kayseri": 1.1, "Kırklareli": 1.0, "Kırşehir": 1.0, "Kocaeli": 1.2, "Konya": 1.1,
  "Kütahya": 1.0, "Malatya": 1.0, "Manisa": 1.0, "Kahramanmaraş": 1.0, "Mardin": 1.0, "Muğla": 1.2,
  "Muş": 1.0, "Nevşehir": 1.0, "Niğde": 1.0, "Ordu": 1.0, "Rize": 1.0, "Sakarya": 1.1,
  "Samsun": 1.1, "Siirt": 1.0, "Sinop": 1.0, "Sivas": 1.0, "Tekirdağ": 1.1, "Tokat": 1.0,
  "Trabzon": 1.0, "Tunceli": 1.0, "Şanlıurfa": 1.0, "Uşak": 1.0, "Van": 1.0, "Yozgat": 1.0,
  "Zonguldak": 1.0, "Aksaray": 1.0, "Bayburt": 1.0, "Karaman": 1.0, "Kırıkkale": 1.0, "Batman": 1.0,
  "Şırnak": 1.0, "Bartın": 1.0, "Ardahan": 1.0, "Iğdır": 1.0, "Yalova": 1.0, "Karabük": 1.0,
  "Kilis": 1.0, "Osmaniye": 1.0, "Düzce": 1.0
};