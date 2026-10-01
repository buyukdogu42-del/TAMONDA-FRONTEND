// legal.js - TamOnda Yasal Metinler, SSS ve Dinamik Alt Bilgi Yöneticisi

const legalTexts = {
    hakkimizda: {
        title: "Hakkımızda",
        icon: "fa-info-circle",
        content: `
            <p class="mb-3">TamOnda Hizmet Platformu, alanında uzman ustalar ile hizmet arayan müşterileri hızlı, şeffaf ve güvenli bir ortamda buluşturmak amacıyla kurulmuş yeni nesil bir dijital hizmet ağıdır.</p>
            <p class="mb-3">Yenilikçi arayüzümüzle teklif süreçlerini dijitalleştiriyor, ustalara iş hacimlerini artırma fırsatı sunuyoruz.</p>
            <div class="bg-orange-50 border-l-4 border-orange-500 p-3 my-4 rounded-r-lg text-orange-900 font-medium">
                <strong>Önemli Bilgilendirme:</strong> TamOnda bir komisyoncu veya ödeme aracısı değildir. Platformumuz üzerinden hizmet alan son kullanıcılardan hiçbir ücret talep edilmez, kredi kartı ile hizmet bedeli tahsilatı yapılmaz. TamOnda'da yapılan ödemeler, yalnızca hizmet verenlerin (Ustaların) platform içi görünürlüklerini artıran <strong>"Plus Abonelik"</strong> dijital paketlerinin satın alımını kapsar.
            </div>
            <p class="font-bold text-orange-600 mt-4">"Artık usta aramak, iş bağlamak TamOnda!"</p>
        `
    },
    sss: {
        title: "Sıkça Sorulan Sorular (SSS)",
        icon: "fa-circle-question",
        content: `
            <h4 class="font-bold text-slate-800 mb-1"><i class="fa-solid fa-q mr-1 text-orange-500"></i> TamOnda üzerinden hizmet ödemesi (nakliye, boya vb.) yapabilir miyim?</h4>
            <p class="mb-4 text-slate-600">Hayır. TamOnda sadece müşteriyi ve ustayı buluşturan bir platformdur. Anlaştığınız işin ödemesini, iş bitiminde doğrudan ustaya (elden veya havale ile) yaparsınız. Sistemimizde hizmet bedeli tahsilatı yapılmaz.</p>

            <h4 class="font-bold text-slate-800 mb-1"><i class="fa-solid fa-q mr-1 text-orange-500"></i> TamOnda ilanlardan komisyon alıyor mu?</h4>
            <p class="mb-4 text-slate-600">Kesinlikle hayır. Müşteriler ilanlarını tamamen ücretsiz yayınlar, ustalar ise iş bağladıklarında platforma hiçbir yüzdelik komisyon veya kesinti ödemezler.</p>

            <h4 class="font-bold text-slate-800 mb-1"><i class="fa-solid fa-q mr-1 text-orange-500"></i> Kredi kartı ile platformda ne satın alınıyor?</h4>
            <p class="mb-4 text-slate-600">Sadece platforma üye olan "Hizmet Verenler (Ustalar)", ilanların iletişim detaylarını görmek ve farklı şehirlerde işlem yapabilmek için <strong>"Plus Abonelik" (Aylık/Yıllık dijital erişim paketi)</strong> satın alırlar. Sanal POS altyapımız yalnızca bu B2B abonelik paketlerinin şeffaf satışı içindir.</p>
        `
    },
    kvkk: {
        title: "Gizlilik ve KVKK Politikası",
        icon: "fa-shield-halved",
        content: `
            <p class="mb-3">TAMONDA HİZMET PLATFORMU olarak, platformumuzu kullanan usta ve müşterilerimizin kişisel verilerinin 6698 sayılı Kişisel Verilerin Korunması Kanunu'na ("KVKK") uygun olarak işlenmesine ve korunmasına büyük önem veriyoruz.</p>
            <h4 class="font-bold text-slate-800 mt-4 mb-2">1. İşlenen Veriler ve Amacı</h4>
            <p class="mb-3">Sisteme kayıt olan kullanıcılarımızın Ad-Soyad, Telefon Numarası, TC Kimlik Numarası (yalnızca yasal faturalandırma ve güvenlik doğrulama amaçlı), Hizmet Kategorisi ve Şehir bilgileri sistemde saklanmaktadır. Bu veriler; hizmetlerin güvenli bir şekilde sunulması, usta-müşteri eşleşmelerinin sağlanması ve Plus abonelik paketlerinin faturalandırılması amaçlarıyla işlenmektedir.</p>
            <h4 class="font-bold text-slate-800 mt-4 mb-2">2. Veri Güvenliği ve Paylaşım</h4>
            <p class="mb-3">Kredi kartı ve ödeme bilgileriniz platformumuzun sunucularında kesinlikle tutulmaz. Abonelik ödeme işlemleri, BDDK lisanslı güvenli ödeme altyapısı sağlayıcısı (PayTR) üzerinden doğrudan bankalara iletilir.</p>
            <h4 class="font-bold text-slate-800 mt-4 mb-2">3. Kullanıcı Hakları</h4>
            <p class="mb-3">KVKK'nın 11. maddesi uyarınca kullanıcılarımız; verilerinin işlenip işlenmediğini öğrenme, yanlış ise düzeltilmesini ve şartlar oluştuğunda silinmesini talep etme hakkına sahiptir. Talepleriniz için info@tamonda.com.tr adresi üzerinden bizimle iletişime geçebilirsiniz.</p>
        `
    },
    iptal: {
        title: "İptal ve İade Koşulları",
        icon: "fa-rotate-left",
        content: `
            <h4 class="font-bold text-slate-800 mb-2">Cayma Hakkı İstisnası ve İade Durumu</h4>
            <p class="mb-3">TamOnda üzerinden ustalara sunulan <strong>"Plus Abonelik"</strong> ücretli paketleri, ödeme işleminin başarıyla tamamlanmasının ardından sistemsel olarak anında aktif edilen ve kullanıma sunulan dijital hizmetlerdir.</p>
            <p class="mb-3">6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği’nin 15. maddesinin birinci fıkrasının (ğ) bendi ("Elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallara ilişkin sözleşmeler") uyarınca, anında ifa edilen bu dijital abonelik hizmetlerinde <strong>cayma hakkı bulunmamaktadır.</strong></p>
            <p class="mb-3">Kullanıcılar (Ustalar), ödeme ekranında işlemi onaylayarak bu dijital aboneliğin anında ifa edileceğini ve cayma hakkını kaybedeceklerini kabul ederler. İstisnai olarak, sistemsel bir hata nedeniyle mükerrer çekim yapılması durumunda, fazla çekilen tutar PayTR altyapısı üzerinden iade edilir.</p>
        `
    },
    mesafeli: {
        title: "Mesafeli Satış Sözleşmesi",
        icon: "fa-file-contract",
        content: `
            <h4 class="font-bold text-slate-800 mt-4 mb-2">MADDE 1 - TARAFLAR</h4>
            <p class="mb-2"><strong>SATICI:</strong><br>Ünvanı: TAMONDA HİZMET PLATFORMU<br>Adresi: Sakarya<br>Telefon: 0500 000 54 54<br>E-posta: info@tamonda.com.tr<br>Vergi No: 48613475570</p>
            <p class="mb-3"><strong>ALICI (KULLANICI):</strong><br>Platform üzerinden "Plus Abonelik" dijital hizmet paketini satın alan ve bilgileri üyelik profilinde yer alan hizmet veren (Usta) kişi/kurumdur.</p>
            <h4 class="font-bold text-slate-800 mt-4 mb-2">MADDE 2 - SÖZLEŞMENİN KONUSU</h4>
            <p class="mb-3">İşbu sözleşmenin konusu, Alıcı'nın Satıcı'ya ait platform üzerinden siparişini verdiği <strong>"Plus Abonelik (Aylık/Yıllık Erişim)"</strong> dijital hizmetinin satışı ile ilgili olarak tarafların hak ve yükümlülüklerinin saptanmasıdır.</p>
            <h4 class="font-bold text-slate-800 mt-4 mb-2">MADDE 3 - HİZMET BEDELİ VE ÖDEME</h4>
            <p class="mb-3">Abonelik hizmetinin nihai fiyatı, Alıcı'nın bulunduğu şehre ve paket kapsamına göre sistem tarafından dinamik hesaplanarak ödeme sayfasında açıkça gösterilir. İşlem, güvenli ödeme kuruluşu (PayTR) arayüzü üzerinden gerçekleşir.</p>
            <h4 class="font-bold text-slate-800 mt-4 mb-2">MADDE 4 - CAYMA HAKKI EKSİKLİĞİ</h4>
            <p class="mb-3">Hizmet, elektronik ortamda anında ifa edilen bir dijital abonelik paketi olduğundan, Alıcı işbu sözleşmeyi onayladığında mevzuat gereği cayma hakkının bulunmadığını peşinen kabul eder.</p>
        `
    }
};

function openLegalModal(type) {
    const modal = document.getElementById('legalModal');
    const titleEl = document.getElementById('legalModalTitle');
    const contentEl = document.getElementById('legalModalContent');
    const iconEl = document.getElementById('legalModalIcon');
    
    if (legalTexts[type]) {
        titleEl.innerText = legalTexts[type].title;
        contentEl.innerHTML = legalTexts[type].content;
        iconEl.className = 'fa-solid text-orange-500 mr-2 ' + legalTexts[type].icon;
        
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeLegalModal() {
    const modal = document.getElementById('legalModal');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

function initLegalUI() {
    // SSS Linki eklendi
    const footerHtml = `
        <footer class="bg-slate-900 border-t border-slate-800 mt-8 pt-6 pb-8 px-4 text-center">
            <div class="max-w-2xl mx-auto">
                <div class="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4">
                    <button onclick="openLegalModal('hakkimizda')" class="text-xs font-medium text-slate-400 hover:text-orange-400 transition">Hakkımızda</button>
                    <span class="text-slate-700">|</span>
                    <button onclick="openLegalModal('sss')" class="text-xs font-bold text-orange-500 hover:text-orange-400 transition">Sıkça Sorulan Sorular</button>
                    <span class="text-slate-700">|</span>
                    <button onclick="openLegalModal('kvkk')" class="text-xs font-medium text-slate-400 hover:text-orange-400 transition">KVKK & Gizlilik</button>
                    <span class="text-slate-700">|</span>
                    <button onclick="openLegalModal('iptal')" class="text-xs font-medium text-slate-400 hover:text-orange-400 transition">İade Koşulları</button>
                    <span class="text-slate-700">|</span>
                    <button onclick="openLegalModal('mesafeli')" class="text-xs font-medium text-slate-400 hover:text-orange-400 transition">Mesafeli Satış Sözleşmesi</button>
                </div>
                <div class="text-[10px] text-slate-500">
                    &copy; 2026 TamOnda Hizmet Platformu. Tüm hakları saklıdır.<br>
                    <span class="opacity-75">BDDK lisanslı PayTR altyapısı ile güvenli abonelik ödemesi.</span>
                </div>
            </div>
        </footer>
    `;

    const modalHtml = `
        <div id="legalModal" class="fixed inset-0 bg-black/70 hidden z-[90] flex items-center justify-center p-4">
            <div class="bg-white rounded-2xl max-w-lg w-full p-5 shadow-2xl relative text-left flex flex-col max-h-[85vh]">
                <button onclick="closeLegalModal()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-xl font-bold">&times;</button>
                
                <h3 class="text-base font-black text-slate-900 border-b border-slate-100 pb-3 mb-3 flex items-center">
                    <i id="legalModalIcon" class="fa-solid text-orange-500 mr-2"></i>
                    <span id="legalModalTitle">Başlık</span>
                </h3>
                
                <div id="legalModalContent" class="flex-1 overflow-y-auto pr-2 text-xs text-slate-600 leading-relaxed custom-scrollbar">
                </div>
                
                <div class="pt-4 border-t border-slate-100 mt-2">
                    <button onclick="closeLegalModal()" class="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition shadow-sm">Anladım, Kapat</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', footerHtml);
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLegalUI);
} else {
    initLegalUI();
}