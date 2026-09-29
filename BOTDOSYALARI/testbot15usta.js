// seed_test_pros.js
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/user');

const allCategories = [
    { key: 'agir_kapali_tir', mainCat: 'agir_nakliye', title: 'Kapalı Kasa Tır / Kamyon Nakliye' },
    { key: 'nakliyat_evden_eve', mainCat: 'nakliyat', title: 'Evden Eve Nakliyat' },
    { key: 'temizlik_ev', mainCat: 'temizlik', title: 'Ev & Gündelik Temizlik' },
    { key: 'oto_mekanik', mainCat: 'oto', title: 'Mekanik & Ağır Bakım' },
    { key: 'org_dugun', mainCat: 'organizasyon', title: 'Düğün, Nişan & Söz' },
    { key: 'tamir_beyaz_esya', mainCat: 'tamir', title: 'Beyaz Eşya & Ankastre Servisi' },
    { key: 'tadilat_anahtar', mainCat: 'tadilat', title: 'Anahtar Teslim Tadilat & İç Mimari' },
    { key: 'ders_okul', mainCat: 'ders', title: 'Okul Takviye & Sınav Hazırlık' },
    { key: 'medya_dugun', mainCat: 'medya', title: 'Düğün, Özel Gün & Dış Çekim' },
    { key: 'pet_kuafor', mainCat: 'pet', title: 'Pet Kuaför & Tıraş Hizmetleri' },
    { key: 'saglik_terapi', mainCat: 'saglik', title: 'Psikolojik Danışmanlık & Terapi' },
    { key: 'spor_pt', mainCat: 'spor', title: 'Personal Trainer & Özel Antrenör' },
    { key: 'guzellik_kuafor', mainCat: 'guzellik', title: 'Kuaför, Saç Kesim & Kaynak' },
    { key: 'dijital_pazarlama', mainCat: 'dijital', title: 'Dijital Pazarlama, SEO & Reklam' },
    { key: 'danismanlik_terzi', mainCat: 'danismanlik', title: 'Özel Dikim & Terzi Tadilatı' }
];

const turkeyLocations = {
    "İstanbul": ["Kadıköy", "Beşiktaş", "Şişli", "Üsküdar"],
    "Ankara": ["Çankaya", "Keçiören", "Yenimahalle"],
    "İzmir": ["Bornova", "Karşıyaka", "Konak"],
    "Bursa": ["Nilüfer", "Osmangazi", "Yıldırım"],
    "Antalya": ["Muratpaşa", "Kepez", "Alanya"]
};

const getRandomLocation = () => {
    const cities = Object.keys(turkeyLocations);
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const districts = turkeyLocations[randomCity];
    const randomDistrict = districts[Math.floor(Math.random() * districts.length)];
    return { city: randomCity, district: randomDistrict };
};

// Numara formatı: 500 ile başlar, 7 rastgele rakam eklenir
const generateProPhone = (index) => '500' + String(1000000 + index).padStart(7, '0');

const seedPros = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB bağlandı. 15 Test Ustası oluşturuluyor...');

        let usersToInsert = [];

        for (let i = 0; i < allCategories.length; i++) {
            const cat = allCategories[i];
            const loc = getRandomLocation();
            const phone = generateProPhone(i);
            const proName = `Test Usta ${i + 1} (${cat.mainCat})`;

            usersToInsert.push({
                phone: phone,
                fullName: proName,
                roles: ['customer', 'pro'],
                isProVerified: true, // Direkt onaylı usta
                providerData: {
                    tcKimlikNo: '11111111110',
                    categoryKey: cat.mainCat, // Usta panelinde arama motoruna takılması için
                    categoryTitle: cat.title,
                    city: loc.city,
                    district: loc.district,
                    packageType: 'standard', // Standart paketli test usta
                    subscriptionStatus: false,
                    extraCities: [],
                    ratingAvg: Math.floor(Math.random() * (5 - 3 + 1) + 3), // 3 ile 5 arası rastgele başlangıç puanı
                    ratingCount: Math.floor(Math.random() * 20),
                    reviews: []
                }
            });
        }

        await User.insertMany(usersToInsert);
        console.log(`✅ ${usersToInsert.length} adet test ustası başarıyla oluşturuldu!`);
        console.log(`🔑 Örnek Giriş Numarası: ${usersToInsert[0].phone}`);
        process.exit(0);

    } catch (error) {
        console.error('Usta bot hatası:', error);
        process.exit(1);
    }
};

seedPros();