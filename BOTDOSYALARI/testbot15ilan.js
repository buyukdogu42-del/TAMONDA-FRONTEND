// seed_test_demands.js
const mongoose = require('mongoose');
require('dotenv').config();
const Demand = require('./models/demand');
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

// Numara formatı: 510 ile başlar, 7 rastgele rakam eklenir
const generateCustomerPhone = (index) => '510' + String(1000000 + index).padStart(7, '0');

const seedTestDemands = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB bağlandı. 15 Test İlanı oluşturuluyor...');

        let demandsToInsert = [];
        let usersToInsert = [];
        const baseDemandId = Math.floor(1000 + Math.random() * 9000);

        for (let i = 0; i < allCategories.length; i++) {
            const cat = allCategories[i];
            const loc = getRandomLocation();
            const phone = generateCustomerPhone(i);
            const customerName = `Test Müşteri ${i + 1}`;
            const demandIdStr = `TESTREQ-${baseDemandId + i}`;

            const generatedUserId = new mongoose.Types.ObjectId();

            usersToInsert.push({
                _id: generatedUserId,
                phone: phone,
                fullName: customerName,
                roles: ['customer']
            });

            demandsToInsert.push({
                demandId: demandIdStr,
                userId: generatedUserId,
                
                categoryKey: cat.key,
                mainCat: cat.mainCat,
                categoryTitle: cat.title,
                
                fromCity: loc.city,
                fromDistrict: loc.district,
                
                summary: `${loc.city} / ${loc.district} bölgesinde örnek ${cat.title} testi.`,
                description: `Test botu tarafından ${cat.mainCat} kategorisi için oluşturuldu.`,
                
                params: { "Test İçeriği": "Sistem fonksiyon testleri" },
                
                customerName: customerName,
                customerPhone: phone,
                contactPreference: "Fark Etmez (Her Zaman Aranabilir)",
                status: 'active',
                offers: [],
                hiddenOffers: []
            });
        }

        await User.insertMany(usersToInsert, { ordered: false }).catch(() => {});
        await Demand.insertMany(demandsToInsert);

        console.log(`✅ ${demandsToInsert.length} adet test ilanı başarıyla oluşturuldu!`);
        process.exit(0);

    } catch (error) {
        console.error('İlan bot hatası:', error);
        process.exit(1);
    }
};

seedTestDemands();