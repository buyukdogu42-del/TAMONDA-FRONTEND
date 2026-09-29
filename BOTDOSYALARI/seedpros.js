const mongoose = require('mongoose');
const User = require('./models/User'); 

const MONGODB_URI = 'mongodb+srv://buyukdogu42_db_user:1453Tamonda@cluster0.wjqbz0o.mongodb.net/tamonda_db?appName=Cluster0';

const cities = [
  "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir",
  "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli",
  "Diyarbakır", "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari",
  "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir",
  "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir",
  "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat",
  "Trabzon", "Tunceli", "Şanlıurfa", "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman",
  "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"
];

const categories = [
  { key: "nakliyat", title: "Nakliyat" },
  { key: "agir_nakliye", title: "Ağır Nakliye" },
  { key: "temizlik", title: "Temizlik" },
  { key: "oto", title: "Oto Servis" },
  { key: "organizasyon", title: "Organizasyon" },
  { key: "tamir", title: "Tamir & Servis" },
  { key: "tadilat", title: "Tadilat" },
  { key: "ders", title: "Özel Ders" },
  { key: "medya", title: "Foto & Video" },
  { key: "pet", title: "Evcil Hayvan" },
  { key: "saglik", title: "Sağlık" },
  { key: "spor", title: "Spor & Fitness" },
  { key: "guzellik", title: "Güzellik" },
  { key: "dijital", title: "Dijital & Yazılım" },
  { key: "danismanlik", title: "Danışmanlık" }
];

const firstNames = ["Ahmet", "Mehmet", "Ali", "Veli", "Ayşe", "Fatma", "Hayriye", "Hüseyin", "Hasan", "Kemal", "Mustafa", "Can", "Burak", "Emre", "Murat"];
const lastNames = ["Yılmaz", "Kaya", "Demir", "Çelik", "Şahin", "Yıldız", "Öztürk", "Aydın", "Özdemir", "Arslan", "Doğan", "Kılıç", "Aslan", "Çetin", "Kara"];

async function seedPros() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB'ye bağlanıldı. Kayıt işlemi başlıyor...");

    const batchSize = 1000;
    let usersToInsert = [];
    let totalInserted = 0;
    
    let phoneNumberCounter = 5000000000; 
    let tcCounter = 10000000000; 

    for (const city of cities) {
      for (const category of categories) {
        for (let i = 0; i < 30; i++) {
          const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
          const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
          
          const phone = `${phoneNumberCounter++}`;
          const mockTcNo = String(tcCounter++); 

          const user = {
            phone: phone,
            fullName: `${randomFirstName} ${randomLastName}`,
            roles: ['pro'],
            isProVerified: true, 
            providerData: {
              tcKimlikNo: mockTcNo,
              categoryKey: category.key,
              categoryTitle: category.title,
              city: city,
              district: "Merkez", 
              packageType: Math.random() > 0.8 ? 'plus_single_city' : 'standard', 
              subscriptionStatus: true
            },
            status: 'active'
          };

          usersToInsert.push(user);

          if (usersToInsert.length === batchSize) {
            await User.insertMany(usersToInsert);
            totalInserted += usersToInsert.length;
            console.log(`${totalInserted} kayıt başarıyla eklendi...`);
            usersToInsert = [];
          }
        }
      }
    }

    if (usersToInsert.length > 0) {
      await User.insertMany(usersToInsert);
      totalInserted += usersToInsert.length;
    }

    console.log(`İşlem tamamlandı. Toplam ${totalInserted} usta profili veritabanına işlendi.`);
    mongoose.disconnect();
  } catch (error) {
    console.error("Hata oluştu:", error);
    mongoose.disconnect();
  }
}

seedPros();