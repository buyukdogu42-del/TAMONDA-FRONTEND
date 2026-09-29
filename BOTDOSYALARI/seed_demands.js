const mongoose = require('mongoose');
require('dotenv').config();
const Demand = require('./models/demand'); 
const User = require('./models/user'); 

// --- 1. 84 ALT KATEGORİ LİSTESİ ---
const allCategories = [
  // Ağır Nakliye (6)
  { key: 'agir_kapali_tir', mainCat: 'agir_nakliye', title: 'Kapalı Kasa Tır / Kamyon Nakliye' },
  { key: 'agir_acik_tir', mainCat: 'agir_nakliye', title: 'Açık Kasa Tır / Platform Nakliye' },
  { key: 'agir_parsiyel_yuk', mainCat: 'agir_nakliye', title: 'Parsiyel (Parça) Ağır Yük Taşıma' },
  { key: 'agir_lowbed', mainCat: 'agir_nakliye', title: 'Lowbed & İş Makinesi Taşımacılığı' },
  { key: 'agir_frigo', mainCat: 'agir_nakliye', title: 'Frigo (Soğutuculu) Ağır Nakliye' },
  { key: 'agir_konteyner', mainCat: 'agir_nakliye', title: 'Konteyner Taşımacılığı' },

  // Nakliyat (6)
  { key: 'nakliyat_evden_eve', mainCat: 'nakliyat', title: 'Evden Eve Nakliyat' },
  { key: 'nakliyat_ofis', mainCat: 'nakliyat', title: 'Ofis & İş Yeri Taşıma' },
  { key: 'nakliyat_parca_esya', mainCat: 'nakliyat', title: 'Parça Eşya & Kargo Taşıma' },
  { key: 'nakliyat_kamyonet', mainCat: 'nakliyat', title: 'Şoförlü Kamyonet Kiralama' },
  { key: 'nakliyat_depolama', mainCat: 'nakliyat', title: 'Eşya Depolama' },
  { key: 'nakliyat_ozel_esya', mainCat: 'nakliyat', title: 'Özel & Ağır Eşya Taşıma' },

  // Temizlik (6)
  { key: 'temizlik_ev', mainCat: 'temizlik', title: 'Ev & Gündelik Temizlik' },
  { key: 'temizlik_bos_ev', mainCat: 'temizlik', title: 'Taşınma & İnşaat Sonrası' },
  { key: 'temizlik_koltuk_hali', mainCat: 'temizlik', title: 'Koltuk, Yatak & Halı Yıkama' },
  { key: 'temizlik_ofis', mainCat: 'temizlik', title: 'Ofis & İş Yeri Temizliği' },
  { key: 'temizlik_cam', mainCat: 'temizlik', title: 'Cam & Dış Cephe Temizliği' },
  { key: 'temizlik_ilaclama', mainCat: 'temizlik', title: 'Böcek & Haşere İlaçlama' },

  // Oto Servis (8)
  { key: 'oto_mekanik', mainCat: 'oto', title: 'Mekanik & Ağır Bakım' },
  { key: 'oto_periyodik', mainCat: 'oto', title: 'Periyodik Bakım & Hızlı Servis' },
  { key: 'oto_elektrik_klima', mainCat: 'oto', title: 'Oto Elektrik, Elektronik & Klima' },
  { key: 'oto_kaporta', mainCat: 'oto', title: 'Kaporta, Boya & Göçük Onarımı' },
  { key: 'oto_kaplama', mainCat: 'oto', title: 'Kaplama, Cam Filmi & Seramik' },
  { key: 'oto_kuafor', mainCat: 'oto', title: 'Oto Kuaför, Temizlik & Pasta Cila' },
  { key: 'oto_lastik', mainCat: 'oto', title: 'Oto Lastik, Jant & Balans' },
  { key: 'oto_ekspertiz', mainCat: 'oto', title: 'Oto Ekspertiz & Cam Servisi' },

  // Organizasyon (8)
  { key: 'org_dugun', mainCat: 'organizasyon', title: 'Düğün, Nişan & Söz' },
  { key: 'org_dogum', mainCat: 'organizasyon', title: 'Doğum Günü & Parti' },
  { key: 'org_catering', mainCat: 'organizasyon', title: 'Catering & Toplu Yemek' },
  { key: 'org_muzik', mainCat: 'organizasyon', title: 'Müzisyen, DJ & Eğlence' },
  { key: 'org_ekipman', mainCat: 'organizasyon', title: 'Ekipman, Masa & Ses Sistemi' },
  { key: 'org_pasta', mainCat: 'organizasyon', title: 'Butik Pasta, Çiçek & Hediyelik' },
  { key: 'org_arac', mainCat: 'organizasyon', title: 'Araç, Tekne & Yat Kiralama' },
  { key: 'org_dini', mainCat: 'organizasyon', title: 'Dini Tören, Nikah & Özel Dikim' },

  // Tamir & Servis (9)
  { key: 'tamir_beyaz_esya', mainCat: 'tamir', title: 'Beyaz Eşya & Ankastre Servisi' },
  { key: 'tamir_tesisat', mainCat: 'tamir', title: 'Su Tesisatı, Gider & Rezervuar' },
  { key: 'tamir_elektrik', mainCat: 'tamir', title: 'Elektrik, Aydınlatma & Kablo' },
  { key: 'tamir_mobilya', mainCat: 'tamir', title: 'Mobilya Montajı & Kurulum' },
  { key: 'tamir_kombi', mainCat: 'tamir', title: 'Kombi, Klima & Doğalgaz' },
  { key: 'tamir_cilingir', mainCat: 'tamir', title: 'Çilingir, Kapı & Pencere Servisi' },
  { key: 'tamir_bilgisayar', mainCat: 'tamir', title: 'Bilgisayar & Telefon Tamiri' },
  { key: 'tamir_guvenlik', mainCat: 'tamir', title: 'Kamera, Güvenlik, Uydu & Diafon' },
  { key: 'tamir_dusakabin', mainCat: 'tamir', title: 'Cam, Ayna & Duşakabin' },

  // Tadilat & Dekorasyon (8)
  { key: 'tadilat_anahtar', mainCat: 'tadilat', title: 'Anahtar Teslim Tadilat & İç Mimari' },
  { key: 'tadilat_boya', mainCat: 'tadilat', title: 'Boya, Badana & Alçıpan İşleri' },
  { key: 'tadilat_zemin', mainCat: 'tadilat', title: 'Zemin, Fayans & Mutfak Tezgahı' },
  { key: 'tadilat_cam_balkon', mainCat: 'tadilat', title: 'Cam Balkon, Kapı & Pencere' },
  { key: 'tadilat_cati', mainCat: 'tadilat', title: 'Çatı, Yalıtım & İzolasyon' },
  { key: 'tadilat_bahce', mainCat: 'tadilat', title: 'Bahçe, Peyzaj & Çevre' },
  { key: 'tadilat_marangoz', mainCat: 'tadilat', title: 'Marangoz & Özel Mobilya' },
  { key: 'tadilat_prefabrik', mainCat: 'tadilat', title: 'İnşaat, Prefabrik & Çelik Ev' },

  // Özel Ders (8)
  { key: 'ders_okul', mainCat: 'ders', title: 'Okul Takviye & Sınav Hazırlık' },
  { key: 'ders_dil', mainCat: 'ders', title: 'Yabancı Dil Eğitimi' },
  { key: 'ders_muzik', mainCat: 'ders', title: 'Müzik & Enstrüman Dersleri' },
  { key: 'ders_direksiyon', mainCat: 'ders', title: 'Direksiyon & Sürüş Eğitimi' },
  { key: 'ders_koc', mainCat: 'ders', title: 'Özel Eğitim, Oyun Ablası & Koçluk' },
  { key: 'ders_spor', mainCat: 'ders', title: 'Spor, Dans & Savunma Sanatları' },
  { key: 'ders_mesleki', mainCat: 'ders', title: 'Mesleki, Yazılım & Kişisel Gelişim' },
  { key: 'ders_dini', mainCat: 'ders', title: 'Kuran-ı Kerim & Dini Eğitim' },

  // Medya (3)
  { key: 'medya_dugun', mainCat: 'medya', title: 'Düğün, Özel Gün & Dış Çekim' },
  { key: 'medya_kurumsal', mainCat: 'medya', title: 'Kurumsal, Ürün & E-Ticaret' },
  { key: 'medya_sosyal', mainCat: 'medya', title: 'Sosyal Medya & Video Kurgu' },

  // Pet (4)
  { key: 'pet_kuafor', mainCat: 'pet', title: 'Pet Kuaför & Tıraş Hizmetleri' },
  { key: 'pet_pansiyon', mainCat: 'pet', title: 'Pansiyon, Otel & Konaklama' },
  { key: 'pet_egitim', mainCat: 'pet', title: 'Köpek Eğitimi & Tuvalet Eğitimi' },
  { key: 'pet_bakim', mainCat: 'pet', title: 'Günlük Evde Bakım & Gezdirme' },

  // Sağlık (3)
  { key: 'saglik_terapi', mainCat: 'saglik', title: 'Psikolojik Danışmanlık & Terapi' },
  { key: 'saglik_diyet', mainCat: 'saglik', title: 'Diyetisyen & Beslenme' },
  { key: 'saglik_fizyoterapi', mainCat: 'saglik', title: 'Fizyoterapi & Manuel Terapi' },

  // Spor (2)
  { key: 'spor_pt', mainCat: 'spor', title: 'Personal Trainer & Özel Antrenör' },
  { key: 'spor_pilates', mainCat: 'spor', title: 'Pilates & Reformer Stüdyo' },

  // Güzellik (5)
  { key: 'guzellik_kuafor', mainCat: 'guzellik', title: 'Kuaför, Saç Kesim & Kaynak' },
  { key: 'guzellik_gelin', mainCat: 'guzellik', title: 'Gelin, Nişan Saç & Makyaj' },
  { key: 'guzellik_tirnak', mainCat: 'guzellik', title: 'Protez Tırnak, Manikür & Nail Art' },
  { key: 'guzellik_epilasyon', mainCat: 'guzellik', title: 'Epilasyon & Cilt Bakımı' },
  { key: 'guzellik_dovme', mainCat: 'guzellik', title: 'Dövme (Tattoo) & Masaj' },

  // Dijital (6)
  { key: 'dijital_pazarlama', mainCat: 'dijital', title: 'Dijital Pazarlama, SEO & Reklam' },
  { key: 'dijital_yazilim', mainCat: 'dijital', title: 'Web Tasarım & Yazılım' },
  { key: 'dijital_grafik', mainCat: 'dijital', title: 'Grafik Tasarım, 3D Modelleme' },
  { key: 'dijital_danismanlik', mainCat: 'dijital', title: 'Kurumsal Danışmanlık & Şirket' },
  { key: 'dijital_tercume', mainCat: 'dijital', title: 'Tercüme & Metin Yazarlığı' },
  { key: 'dijital_matbaa', mainCat: 'dijital', title: 'Matbaa, Tabela, Promosyon & Baskı' },

  // Danışmanlık (2)
  { key: 'danismanlik_terzi', mainCat: 'danismanlik', title: 'Özel Dikim & Terzi Tadilatı' },
  { key: 'danismanlik_karavan', mainCat: 'danismanlik', title: 'Karavan İmalatı & Kiralama' }
];

// --- 2. 81 İL VE TÜM İLÇELERİ (Aynı liste korunuyor) ---
const turkeyLocations = {
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
  "Sivas": ["Merkez", "Yıldızeli", "Şarkışla", "Gemerek", "Suşehri", "Zara", "Gürün", "Divriği", "Kangal", "Hafik", "Altınyayla", "Ulaş", "İmranlı", "Akıncılar", "Gölova", "Doğanşar"],
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

const getRandomPhone = () => '5' + Math.floor(100000000 + Math.random() * 900000000);

const seedAllDistrictsAndCategories = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB bağlantısı başarılı. ~80.000 test ilanı ve kullanıcı üretimi başlatılıyor...');

    let demandsToInsert = [];
    let usersToInsert = []; 
    let counter = 100000;

    for (const [city, districts] of Object.entries(turkeyLocations)) {
      for (const district of districts) {
        for (const cat of allCategories) {
          counter++;
          const demandId = `BULK-${counter}`;
          const phone = getRandomPhone();
          const customerName = `Müşteri ${counter}`;

          // Benzersiz bir User ID üretip hem kullanıcıya hem ilana bağlıyoruz
          const generatedUserId = new mongoose.Types.ObjectId();

          usersToInsert.push({
            _id: generatedUserId,
            phone: phone,
            fullName: customerName,
            roles: ['customer']
          });

          demandsToInsert.push({
            demandId: demandId,
            userId: generatedUserId, // Sabit ID yerine her müşterinin kendi gerçek ID'si atanıyor
            
            categoryKey: cat.key,
            mainCat: cat.mainCat,
            categoryTitle: cat.title,
            
            fromCity: city,
            fromDistrict: district,
            
            summary: `${city} / ${district} bölgesinde ${cat.title} talebi.`,
            description: `Toplu test botu ile ${city} - ${district} için otomatik oluşturulmuştur.`,
            
            params: { "Test Kapsamı": "İlçe Bazlı Tam Kapsam" },
            
            customerName: customerName,
            customerPhone: phone,
            contactPreference: "Fark Etmez (Her Zaman Aranabilir)",
            status: 'active'
          });

          if (demandsToInsert.length >= 1000) {
            await User.insertMany(usersToInsert, { ordered: false }).catch(() => {}); 
            await Demand.insertMany(demandsToInsert);
            console.log(`${demandsToInsert.length} adet ilan ve müşteri veritabanına yazıldı. Güncel İlçe: ${city} / ${district}`);
            
            demandsToInsert = []; 
            usersToInsert = [];
          }
        }
      }
    }

    if (demandsToInsert.length > 0) {
      await User.insertMany(usersToInsert, { ordered: false }).catch(() => {});
      await Demand.insertMany(demandsToInsert);
    }

    console.log('Tüm ilçe, alt kategoriler ve test kullanıcıları başarıyla oluşturuldu! 🚀');
    process.exit(0);
  } catch (error) {
    console.error('Test verileri üretilirken hata oluştu:', error);
    process.exit(1);
  }
};

seedAllDistrictsAndCategories();