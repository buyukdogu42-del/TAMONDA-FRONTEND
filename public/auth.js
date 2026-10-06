// ==========================================
// DOSYA 2: auth.js (VERİTABANI, USTA, ADMİN VE MÜŞTERİ GİRİŞ İŞLEMLERİ)
// ==========================================

var demands = JSON.parse(localStorage.getItem('tamonda_demands')) || [
  {
    id: 'REQ-101', category: 'nakliyat_evden_eve', mainCat: 'nakliyat', categoryTitle: 'Evden Eve Nakliyat',
    fromCity: 'Sakarya', fromDistrict: 'Adapazarı', toCity: 'Antalya', toDistrict: 'Kepez',
    destFloor: 'Giriş / Zemin Kat', destElevator: 'Bina Asansörü Var', estimatedKm: 595,
    summary: '2+1 Daire, Anahtar Teslim, Zemin Kat', description: 'Hassas eşyalar var, paketleme önemli.',
    contactPreference: "Sadece WhatsApp'tan Yazılsın", 
    time: 'Az önce', phoneUnlocked: false,
    customerName: 'Ahmet Yılmaz', customerPhone: '5321112233',
    offers: [
      { id: 'off_1', proName: 'Ahmet Lojistik', price: '25000', message: 'Hemen yarın taşıyalım.', date: 'Az önce' }
    ]
  }
];

var registeredPros = JSON.parse(localStorage.getItem('tamonda_pros')) || [
  
];

var storedPro = localStorage.getItem('tamonda_current_pro');
var currentProUser = (storedPro && storedPro !== "null") ? JSON.parse(storedPro) : null;

var proLoginStep = 1, proRegStep = 1, ownerLoginStep = 1;
var currentDemand = { categoryKey: 'nakliyat_evden_eve', mainCat: 'nakliyat', categoryTitle: 'Evden Eve Nakliyat', params: {} };
var activeOwnerPhone = null;
window.mySubmittedOffers = JSON.parse(localStorage.getItem('tamonda_my_offers')) || [];

function saveToStorage() {
  localStorage.setItem('tamonda_demands', JSON.stringify(demands));
  localStorage.setItem('tamonda_pros', JSON.stringify(registeredPros));
  localStorage.setItem('tamonda_current_pro', JSON.stringify(currentProUser));
  localStorage.setItem('tamonda_my_offers', JSON.stringify(window.mySubmittedOffers));
}
window.resetTargetType = '';
    
window.triggerAdminReset = async function(type) {
    if (!confirm('DİKKAT: Veritabanındaki ' + (type === 'pros' ? 'TÜM USTALAR' : 'TÜM İLANLAR') + ' kalıcı olarak silinecek! Onaylıyor musunuz?')) return;
    
    window.resetTargetType = type;
    try {
        const res = await fetch(`${window.API_BASE_URL}/api/auth/send-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone: '5065456697', fullName: 'Admin' }) 
        });
        const data = await res.json();
        
        if (data.success) {
            document.getElementById('adminResetOtpModal').classList.remove('hidden');
            console.log("🔑 [ADMİN SİLME ONAY KODU]:", data.debugOtp);
        } else {
            alert("OTP gönderilemedi: " + data.message);
        }
    } catch(e) { 
        console.error(e);
        alert("Bağlantı hatası: Backend çalışıyor mu?"); 
    }
};

// EKSİK OLAN DOĞRULAMA VE SİLME FONKSİYONU BURAYA EKLENDİ
window.confirmAdminReset = async function() {
    var otp = document.getElementById('adminResetOtpInput').value.trim();
    if(!otp) { alert("Lütfen OTP kodunu giriniz."); return; }
    
    try {
        // 1. Adım: Admin Numarası ile OTP Doğrulama
        const verifyRes = await fetch(`${window.API_BASE_URL}/api/auth/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone: '5065456697', otpCode: otp })
        });
        const verifyData = await verifyRes.json();
        
        if(!verifyData.success) {
            alert("Hatalı SMS Kodu!"); 
            return;
        }
        
        // 2. Adım: OTP doğruysa Güvenlik Kalkanını (adminAuth) geçerek silme işlemini başlat
        const token = localStorage.getItem('tamonda_admin_token'); 
        const delRes = await fetch(`${window.API_BASE_URL}/api/demands/admin/reset-` + window.resetTargetType, {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const delData = await delRes.json();
        
        if(delData.success) {
            alert(delData.message);
            location.reload(); // Başarılıysa paneli yenile
        } else {
            alert("Silme hatası: " + delData.message);
        }
        
    } catch(e) { 
        console.error(e);
        alert("Bağlantı veya yetkilendirme hatası."); 
    }
};
function switchRole(r){
  var custSec = document.getElementById('customerSection');
  var proSec = document.getElementById('proSection');
  if(custSec) custSec.classList.toggle('hidden', r !== 'customer');
  if(proSec) proSec.classList.toggle('hidden', r === 'customer');
  
  var btnCust = document.getElementById('btnRoleCustomer');
  var btnPro = document.getElementById('btnRolePro');
  if(btnCust) btnCust.className = 'px-3 py-1 text-xs font-bold rounded-lg transition ' + (r === 'customer' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-400 hover:text-white');
  if(btnPro) btnPro.className = 'px-3 py-1 text-xs font-bold rounded-lg transition ' + (r === 'pro' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-400 hover:text-white');
  
  if(r === 'pro') checkProAuthState();
}

function switchAuthTab(t){
  var loginForm = document.getElementById('proLoginForm');
  var registerForm = document.getElementById('proRegisterForm');
  var btnLogin = document.getElementById('tabBtnLogin');
  var btnRegister = document.getElementById('tabBtnRegister');
  
  if(loginForm) loginForm.classList.toggle('hidden', t !== 'login');
  if(registerForm) registerForm.classList.toggle('hidden', t === 'login');
  if(btnLogin) btnLogin.className = 'w-1/2 py-2 text-xs font-bold ' + (t === 'login' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-slate-400');
  if(btnRegister) btnRegister.className = 'w-1/2 py-2 text-xs font-bold ' + (t === 'register' ? 'text-orange-600 border-b-2 border-orange-600' : 'text-slate-400');
}

function checkProAuthState(){
  // Güncel oturum verisini localStorage'dan tazele
  var storedPro = localStorage.getItem('tamonda_current_pro');
  if (storedPro) {
    try { currentProUser = JSON.parse(storedPro); } catch(e){}
  }

  var authContainer = document.getElementById('proAuthContainer');
  var dashContainer = document.getElementById('proDashboardContainer');
  
  if(authContainer) authContainer.classList.toggle('hidden', !!currentProUser);
  if(dashContainer) dashContainer.classList.toggle('hidden', !currentProUser);
  
  if(currentProUser){
    var nameDisp = document.getElementById('proNameDisplay');
    var catDisp = document.getElementById('proCategoryDisplay');
    var phoneDisp = document.getElementById('proPhoneDisplay'); // YENİ EKLENEN
    var tabsDiv = document.getElementById('tabBtnDemands') ? document.getElementById('tabBtnDemands').parentElement : null;
    
    // YENİ EKLENEN: Telefon numarasını ekrana bas
    if(phoneDisp) phoneDisp.innerText = currentProUser.phone;

    var tabDemands = document.getElementById('tabContentDemands');
    var tabOffers = document.getElementById('tabContentOffers');
    var btnDemands = document.getElementById('tabBtnDemands');
    var btnOffers = document.getElementById('tabBtnOffers');

    if(tabDemands) tabDemands.classList.remove('hidden');
    if(tabOffers) tabOffers.classList.add('hidden');
    if(btnDemands) btnDemands.className = "pb-3 font-bold text-sm text-orange-600 border-b-2 border-orange-600 transition flex items-center shrink-0";
    if(btnOffers) btnOffers.className = "pb-3 font-bold text-sm text-slate-500 hover:text-slate-800 transition shrink-0";

    if(currentProUser.categoryKey === 'admin') {
      if(nameDisp) {
          var starStr = (currentProUser.ratingCount && currentProUser.ratingCount > 0) 
             ? ' <span class="text-amber-500 text-[11px] font-black ml-2"><i class="fa-solid fa-star"></i> ' + currentProUser.ratingAvg + '</span>' 
             : '';
          nameDisp.innerHTML = currentProUser.name + starStr;
      }
      if(catDisp) catDisp.innerText = 'Tam Yetkili Sistem Yöneticisi';
      if(tabsDiv) tabsDiv.classList.add('hidden'); 
      
      renderAdminDashboard(); 
    } else {
      if(nameDisp) {
          var starStr = (currentProUser.ratingCount && currentProUser.ratingCount > 0) 
             ? ' <span class="text-amber-500 text-[11px] font-black ml-2"><i class="fa-solid fa-star"></i> ' + currentProUser.ratingAvg + '</span>' 
             : '';
          nameDisp.innerHTML = currentProUser.name + starStr;
      }
      if(tabsDiv) tabsDiv.classList.remove('hidden'); 
      
      var pkgName = 'Standart Paket';
      var coverage = currentProUser.city; 
      
      if (currentProUser.packageType === 'plus_single_city') {
        pkgName = 'Plus Sadece İl';
      } else if (currentProUser.packageType === 'plus_multi_city') {
        pkgName = 'Plus Çoklu İl';
        var extras = currentProUser.extraCities ? currentProUser.extraCities.join(', ') : '';
        if (extras) coverage += ', ' + extras;
      } else if (currentProUser.packageType === 'plus_all_turkey' || currentProUser.packageType === 'plus_turkiye') {
        pkgName = 'Plus Tüm Türkiye';
        coverage = 'Tüm Türkiye (81 İl)';
      }

      if(catDisp) {
        catDisp.innerText = 'Kapsam: ' + coverage + ' | Sektör: ' + currentProUser.categoryTitle + ' (' + pkgName + ')';
      }

      var plusDisp = document.getElementById('proPlusDisplay');
      if (plusDisp) {
        if (currentProUser.subscriptionStatus && currentProUser.packageType && currentProUser.packageType.includes('plus')) {
          var endDate = currentProUser.subscriptionEndDate ? new Date(currentProUser.subscriptionEndDate) : null;
          var endStr = '-';
          if (endDate && !isNaN(endDate.getTime())) {
            endStr = endDate.toLocaleDateString('tr-TR');
          }
          
          var actionButtonHtml = '';
          if (currentProUser.subscriptionDays >= 360) {
            actionButtonHtml = '<button type="button" onclick="openPlusModal(true)" class="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-xl shadow-md font-bold text-[11px] transition transform hover:scale-105">🎁 %50 İndirimle Uzat</button>';
          } else {
            actionButtonHtml = '<button type="button" onclick="openPlusModal(false)" class="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl shadow-md font-bold text-[11px] transition transform hover:scale-105">Süreyi Uzat</button>';
          }
          
          plusDisp.innerHTML = '<div class="w-full bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-200/60 rounded-xl p-4 flex justify-between items-center shadow-sm">' +
             '<div class="text-orange-900 font-black text-sm flex items-center gap-2.5"><i class="fa-solid fa-crown text-orange-500 text-lg drop-shadow-sm"></i> <span>Plus Bitiş Tarihi: <span class="font-bold text-orange-600">' + endStr + '</span></span></div>' +
             actionButtonHtml +
          '</div>';
          plusDisp.classList.remove('hidden');
        } else {
          plusDisp.innerHTML = '';
          plusDisp.classList.add('hidden');
        }
      }

      if(typeof renderProDemands === 'function') renderProDemands(); 
    }
  }
}

window.requestPhoneUpdate = async function() {
    var newPhone = document.getElementById('profNewPhone').value.trim();
    var cleanPhone = newPhone.replace(/\D/g, '');
    if (cleanPhone.startsWith('0')) cleanPhone = cleanPhone.substring(1);

    if (!/^5\d{9}$/.test(cleanPhone)) { 
        alert('Lütfen yeni numaranızı başında sıfır olmadan, 10 haneli giriniz.'); 
        return; 
    }

    if (cleanPhone === String(currentProUser.phone).replace(/\D/g, '')) {
        alert('Girdiğiniz numara zaten mevcut numaranız.');
        return;
    }

    var btn = document.getElementById('btnRequestPhoneOtp');
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Bekleniyor...';
    btn.disabled = true;

    try {
        var token = localStorage.getItem('tamonda_token');
        const res = await fetch(`${window.API_BASE_URL}/api/auth/pro/update-phone/send-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
            body: JSON.stringify({ newPhone: cleanPhone })
        });
        const data = await res.json();
        
        if (data.success) {
            document.getElementById('profPhoneOtpArea').classList.remove('hidden');
            btn.innerText = 'SMS Gönderildi';
            console.log("🔑 [TELEFON GÜNCELLEME SMS TEST]:", data.debugOtp);
        } else {
            alert(data.message);
            btn.innerText = 'SMS Kodu Gönder';
            btn.disabled = false;
        }
    } catch(err) {
        alert('Sunucuya bağlanılamadı.');
        btn.innerText = 'SMS Kodu Gönder';
        btn.disabled = false;
    }
};

window.confirmPhoneUpdate = async function() {
    var newPhone = document.getElementById('profNewPhone').value.trim();
    var cleanPhone = newPhone.replace(/\D/g, '');
    if (cleanPhone.startsWith('0')) cleanPhone = cleanPhone.substring(1);
    var otpCode = document.getElementById('profPhoneOtpInput').value.trim();

    if (!otpCode) { alert("Lütfen SMS kodunu giriniz."); return; }

    try {
        var token = localStorage.getItem('tamonda_token');
        const res = await fetch(`${window.API_BASE_URL}/api/auth/pro/update-phone/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
            body: JSON.stringify({ newPhone: cleanPhone, otpCode: otpCode })
        });
        const data = await res.json();

        if (data.success) {
            alert(data.message); 
            // İşlem başarılı olduğunda oturumu güvenli şekilde sonlandırıp çıkışa yönlendir
            handleProLogout();   
        } else {
            alert(data.message);
        }
    } catch(err) {
        alert('Doğrulama sırasında hata oluştu.');
    }
};
// Sekmeler arası anlık senkronizasyon dinleyicisi
window.addEventListener('storage', function(e) {
  if (e.key === 'tamonda_current_pro' || e.key === 'tamonda_sync_trigger') {
    if (typeof checkProAuthState === 'function') {
      checkProAuthState();
    }
  }
});// ==========================================
// YENİ: Sayfalamalı ve Parametreli Admin Usta Yükleme
window.currentAdminProPage = 1;

window.loadAdminProsFromDB = async function(page = 1) {
  window.currentAdminProPage = page;
  
  var phone = document.getElementById('adminSearchPhone') ? document.getElementById('adminSearchPhone').value.trim() : '';
  var tcNo = document.getElementById('adminSearchTcNo') ? document.getElementById('adminSearchTcNo').value.trim() : '';
  var city = document.getElementById('adminSearchCity') ? document.getElementById('adminSearchCity').value.trim() : '';
  var cat = document.getElementById('adminSearchCat') ? document.getElementById('adminSearchCat').value : '';
  var packageType = document.getElementById('adminSearchPackage') ? document.getElementById('adminSearchPackage').value : '';

  var token = localStorage.getItem('tamonda_admin_token');
  
  var queryParams = new URLSearchParams({ page: page, limit: 50 });
  if (phone) queryParams.append('phone', phone);
  if (tcNo) queryParams.append('tcNo', tcNo);
  if (city) queryParams.append('city', city);
  if (cat) queryParams.append('category', cat);
  if (packageType) queryParams.append('packageType', packageType);

  var listContainer = document.getElementById('adminProListContainer');
  if (listContainer) listContainer.innerHTML = '<div class="text-center text-slate-500 py-4"><i class="fa-solid fa-spinner fa-spin text-2xl text-orange-500"></i><br>Ustalar yükleniyor...</div>';

  try {
    const response = await fetch(`${window.API_BASE_URL}/api/auth/pros?` + queryParams.toString(), {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const data = await response.json();
    
    if (data.success) {
      registeredPros = data.pros.map(p => ({
        id: p._id,
        name: p.fullName,
        phone: p.phone,
        tcNo: p.providerData?.tcKimlikNo || '-',
        categoryKey: p.providerData?.categoryKey || '',
        categoryTitle: p.providerData?.categoryTitle || '',
        city: p.providerData?.city || '',
        district: p.providerData?.district || '',
        packageType: p.providerData?.packageType || 'standard',
        subscriptionStatus: p.providerData?.subscriptionStatus || false,
        subscriptionEndDate: p.providerData?.subscriptionEndDate || null,
        ratingAvg: p.providerData?.ratingAvg || 0,
        ratingCount: p.providerData?.ratingCount || 0
      }));
      
      var countBadge = document.getElementById('adminTotalProCount');
      if (countBadge) countBadge.innerText = 'Toplam Usta: ' + data.total;
      
      renderAdminPros();      
      // Pagination Çizimi
      renderAdminProPagination(data.totalPages, data.currentPage);
    }
  } catch (error) {
    console.error("Admin verileri çekilemedi:", error);
    if (listContainer) listContainer.innerHTML = '<div class="text-center text-red-500 py-4">Veri çekme hatası!</div>';
  }
};
window.renderAdminPros = function() {
  var container = document.getElementById('adminProListContainer');
  if (!container) return;

  if (!registeredPros || registeredPros.length === 0) {
    container.innerHTML = '<div class="text-center text-slate-500 py-4 font-medium">Kriterlere uygun usta bulunamadı.</div>';
    return;
  }

  var html = '';
  registeredPros.forEach(function(pro) {
    var pkgBadge = pro.packageType !== 'standard' 
      ? '<span class="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-[10px] font-bold border border-orange-200"><i class="fa-solid fa-crown mr-1"></i>PLUS</span>' 
      : '<span class="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold border border-slate-200">Standart</span>';

    html += `
      <div class="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:border-orange-300 transition group">
        <div>
          <div class="flex items-center gap-2">
            <!-- YENİ: Usta ismine tıklama özelliği eklendi -->
            <button type="button" onclick="openAdminReviewsModal('${pro.phone}', '${pro.name}')" class="font-bold text-slate-800 hover:text-orange-600 text-sm transition text-left underline decoration-dotted underline-offset-4" title="Ustanın Yorumlarını Yönet">${pro.name}</button>
            ${pkgBadge}
          </div>
          <div class="text-xs text-slate-500 mt-1.5 flex flex-wrap gap-3">
            <span><i class="fa-solid fa-phone text-slate-400 mr-1"></i>${pro.phone}</span>
            <span><i class="fa-solid fa-id-card text-slate-400 mr-1"></i>${pro.tcNo || '-'}</span>
            <span><i class="fa-solid fa-map-location-dot text-slate-400 mr-1"></i>${pro.city} / ${pro.district}</span>
            <span><i class="fa-solid fa-briefcase text-slate-400 mr-1"></i>${pro.categoryTitle || pro.categoryKey}</span>
          </div>
        </div>
        <div class="flex gap-2">
          <button type="button" onclick="openAdminEditProModal('${pro.phone}')" class="px-4 py-1.5 bg-slate-100 hover:bg-orange-50 text-slate-700 hover:text-orange-600 rounded-lg text-xs font-bold transition shadow-sm border border-slate-200">Düzenle</button>
          <button type="button" onclick="deletePro('${pro.phone}')" class="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-xs font-bold transition shadow-sm border border-rose-100">Sil</button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
};
// YENİ: Usta Düzenleme Modalını Dolduran ve Açan Fonksiyon
window.openAdminEditProModal = function(phone) {
  var pro = registeredPros.find(p => p.phone === phone);
  if (!pro) return;

  var catOptions = [
    {k:'nakliyat', t:'Nakliyat'}, {k:'agir_nakliye', t:'Ağır Nakliye'}, {k:'temizlik', t:'Temizlik'},
    {k:'oto', t:'Oto Servis'}, {k:'organizasyon', t:'Organizasyon'}, {k:'tamir', t:'Tamir & Servis'},
    {k:'tadilat', t:'Tadilat'}, {k:'ders', t:'Özel Ders'}, {k:'medya', t:'Foto & Video'},
    {k:'pet', t:'Evcil Hayvan'}, {k:'saglik', t:'Sağlık'}, {k:'spor', t:'Spor & Fitness'},
    {k:'guzellik', t:'Güzellik'}, {k:'dijital', t:'Dijital & Yazılım'}, {k:'danismanlik', t:'Danışmanlık'}
  ];

  var selectHTML = '<select id="admin_cat_' + phone + '" class="text-xs bg-white border border-slate-300 rounded-lg p-2 w-full focus:outline-none focus:border-orange-500">';
  catOptions.forEach(co => {
      selectHTML += '<option value="' + co.k + '" ' + (pro.categoryKey === co.k ? 'selected' : '') + '>' + co.t + '</option>';
  });
  selectHTML += '</select>';

  var plusInfoHtml = '';
  if (pro.subscriptionStatus && pro.packageType && pro.packageType.includes('plus')) {
    var endDate = pro.subscriptionEndDate ? new Date(pro.subscriptionEndDate) : null;
    var remainingDays = '-';
    var endStr = 'Süresiz / Belirsiz';
    
    if (endDate && !isNaN(endDate.getTime())) {
      var diffTime = endDate.getTime() - new Date().getTime();
      remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      endStr = endDate.toLocaleDateString('tr-TR');
    }

    var scopeText = pro.packageType.replace('plus_', '');
    if(scopeText === 'single_city') scopeText = 'Sadece İl';
    if(scopeText === 'multi_city') scopeText = 'Çoklu İl';
    if(scopeText === 'all_turkey' || scopeText === 'turkiye') scopeText = 'Tüm Türkiye';

    if (remainingDays === '-' || remainingDays > 0) {
      plusInfoHtml = `
        <div class="bg-orange-50 border border-orange-200 rounded-xl p-3 mb-4 flex justify-between items-center shadow-sm">
          <div>
            <div class="text-xs text-orange-800 font-bold"><i class="fa-solid fa-crown mr-1"></i>Aktif Plus: ${scopeText}</div>
            <div class="text-[10px] text-orange-600 font-medium mt-1">Bitiş: ${endStr} (${remainingDays} Gün Kaldı)</div>
          </div>
          <button type="button" onclick="revokePlus('${phone}')" class="px-3 py-1.5 bg-white text-red-500 border border-red-200 hover:bg-red-50 hover:border-red-300 rounded-lg text-[10px] font-bold transition shadow-sm">Plus'ı İptal Et</button>
        </div>`;
    } else {
      plusInfoHtml = `<div class="bg-slate-100 border border-slate-200 rounded-xl p-3 mb-4 text-xs text-slate-500 font-bold"><i class="fa-solid fa-clock-rotate-left mr-1"></i>Plus Süresi Dolmuş (${endStr})</div>`;
    }
  }

  var contentHtml = `
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label class="text-[10px] font-bold text-slate-500 block mb-1">Usta Adı Soyadı</label>
          <input type="text" id="admin_name_${phone}" value="${pro.name}" class="text-xs bg-white border border-slate-300 rounded-lg p-2 w-full focus:outline-none focus:border-orange-500 font-bold text-slate-800">
        </div>
        <div>
          <!-- YENİ: Düzenlenebilir Telefon Alanı -->
          <label class="text-[10px] font-bold text-slate-500 block mb-1">Telefon Numarası</label>
          <input type="text" id="admin_phone_${phone}" value="${pro.phone}" class="text-xs bg-white border border-slate-300 rounded-lg p-2 w-full focus:outline-none focus:border-orange-500 font-bold text-slate-800 font-mono">
        </div>
        <div>
          <label class="text-[10px] font-bold text-slate-500 block mb-1">TC Kimlik No (Sabit)</label>
          <div class="text-xs p-2 bg-slate-100 rounded-lg border border-slate-200 text-slate-600 font-mono">${pro.tcNo || '-'}</div>
        </div>
      </div>

      ${plusInfoHtml}

      <div class="grid grid-cols-3 gap-3 bg-white p-3 border border-slate-200 rounded-xl shadow-sm">
        <div><label class="text-[10px] font-bold text-slate-500 block mb-1">Sektör</label>${selectHTML}</div>
        
        <div class="relative">
          <label class="text-[10px] font-bold text-slate-500 block mb-1">İl</label>
          <input type="text" id="admin_city_${phone}" value="${pro.city}" oninput="handleCityInput('admin_city_${phone}', 'admin_city_dropdown_${phone}', 'admin_dist_${phone}', 'admin_city_sel_${phone}')" autocomplete="off" class="text-xs bg-white border border-slate-300 rounded-lg p-2 w-full focus:outline-none focus:border-orange-500">
          <input type="hidden" id="admin_city_sel_${phone}" value="${pro.city}">
          <div id="admin_city_dropdown_${phone}" class="hidden absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl max-h-40 overflow-y-auto z-50 text-xs py-1"></div>
        </div>
        
        <div>
          <label class="text-[10px] font-bold text-slate-500 block mb-1">İlçe</label>
          <select id="admin_dist_${phone}" class="text-xs bg-white border border-slate-300 rounded-lg p-2 w-full focus:outline-none focus:border-orange-500">
            <option value="${pro.district}" selected>${pro.district}</option>
          </select>
        </div>
      </div>

      <!-- Plus Tanımlama Alanı (Mevcut) -->
      <div class="bg-indigo-50 border border-indigo-100 rounded-xl p-3 shadow-sm mt-3">
        <label class="text-xs font-black text-indigo-900 block mb-2"><i class="fa-solid fa-gift mr-1"></i>Yeni Plus Paket Tanımla</label>
        <div class="grid grid-cols-3 gap-2 items-end">
          <div>
            <label class="text-[10px] text-indigo-700 block mb-1 font-bold">Kapsam</label>
            <select id="admin_plus_scope_${phone}" class="w-full text-xs p-2 rounded-lg border border-indigo-200 bg-white focus:outline-none">
              <option value="single_city">Sadece İli</option>
              <option value="multi_city">Bölgesel (Çoklu)</option>
              <option value="all_turkey">Tüm Türkiye</option>
            </select>
          </div>
          <div>
            <label class="text-[10px] text-indigo-700 block mb-1 font-bold">Süre (Gün)</label>
            <input type="number" id="admin_plus_days_${phone}" placeholder="Örn: 30" class="w-full text-xs p-2 rounded-lg border border-indigo-200 bg-white focus:outline-none">
          </div>
          <button type="button" onclick="assignPlusToPro('${phone}')" class="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-md transition">Tanımla</button>
        </div>
      </div>

      <!-- YENİ EKLENEN: Saha Personeli Atama Kutusu -->
      <div class="bg-emerald-50 border border-emerald-100 rounded-xl p-3 shadow-sm mt-3 flex justify-between items-center">
        <div>
            <label class="text-xs font-black text-emerald-900 block"><i class="fa-solid fa-briefcase mr-1"></i>Saha Personeli (Promoter) Yetkisi</label>
            <div class="text-[10px] text-emerald-700 mt-0.5">Bu ustaya referans kodu üretip kayıt yetkisi verin.</div>
        </div>
        <button type="button" onclick="assignAdminPromoter('${phone}')" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold shadow-md transition">Personel Yap</button>
      </div>
      </div>

      <!-- İşlem Butonları -->
      <div class="flex justify-end gap-3 pt-2">
        <button type="button" onclick="document.getElementById('adminEditProModal').classList.add('hidden')" class="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition shadow-sm">İptal</button>
        <button type="button" onclick="updateProInfo('${phone}')" class="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition shadow-md"><i class="fa-solid fa-check mr-2"></i>Değişiklikleri Kaydet</button>
      </div>
    </div>
  `;

  document.getElementById('adminEditProModalContent').innerHTML = contentHtml;
  document.getElementById('adminEditProModal').classList.remove('hidden');
};
window.renderAdminProPagination = function(totalPages, currentPage) {
  var paginationBox = document.getElementById('adminProPagination');
  if (!paginationBox || totalPages <= 1) {
    if(paginationBox) paginationBox.innerHTML = '';
    return;
  }
  
  var pagHtml = '';
  if (currentPage > 1) {
    pagHtml += `<button onclick="loadAdminProsFromDB(${currentPage - 1})" class="px-3 py-1 bg-white border border-slate-300 rounded text-xs font-bold text-slate-600 hover:bg-slate-100"><i class="fa-solid fa-chevron-left"></i></button>`;
  }
  
  for (var i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      pagHtml += `<button class="px-3 py-1 bg-orange-500 border border-orange-500 rounded text-xs font-bold text-white">${i}</button>`;
    } else if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pagHtml += `<button onclick="loadAdminProsFromDB(${i})" class="px-3 py-1 bg-white border border-slate-300 rounded text-xs font-bold text-slate-600 hover:bg-slate-100">${i}</button>`;
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      pagHtml += `<span class="px-2 text-slate-400">...</span>`;
    }
  }
  
  if (currentPage < totalPages) {
    pagHtml += `<button onclick="loadAdminProsFromDB(${currentPage + 1})" class="px-3 py-1 bg-white border border-slate-300 rounded text-xs font-bold text-slate-600 hover:bg-slate-100"><i class="fa-solid fa-chevron-right"></i></button>`;
  }
  
  paginationBox.innerHTML = pagHtml;
};
window.renderAdminDashboard = function() {
  var c = document.getElementById('demandListContainer');
  if (!c) return;
  c.innerHTML = '';

  var adminBox = document.createElement('div');
  adminBox.className = 'bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-left';

  // --- SEKMELER (TABS) ÜST KISMI (3. Sekme Eklendi) ---
  var tabsHTML = '<div class="flex border-b border-slate-200 mb-4">' +
                 '<button id="adminTabProsBtn" onclick="switchAdminTab(\'pros\')" class="px-4 py-2 text-sm font-bold text-orange-600 border-b-2 border-orange-600 transition">Usta Yönetimi</button>' +
                 '<button id="adminTabDemandsBtn" onclick="switchAdminTab(\'demands\')" class="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition">İlan Yönetimi</button>' +
                 '<button id="adminTabPromoterBtn" onclick="switchAdminTab(\'promoter\')" class="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition">Saha Personelleri</button>' +
                 '</div>' +
                 '<div id="adminTabContentPros"></div>' +
                 '<div id="adminTabContentDemands" class="hidden"></div>' +
                 '<div id="adminTabContentPromoter" class="hidden"></div>';

  adminBox.innerHTML = tabsHTML;
  c.appendChild(adminBox);

  // Kategori Listesi (Ortak Kullanım İçin)
  var catOptionsHTML = '<option value="">Tüm Sektörler</option>';
  var catOptions = [
    {k:'nakliyat', t:'Nakliyat'}, {k:'agir_nakliye', t:'Ağır Nakliye'}, {k:'temizlik', t:'Temizlik'}, 
    {k:'oto', t:'Oto Servis'}, {k:'organizasyon', t:'Organizasyon'}, {k:'tamir', t:'Tamir & Servis'},
    {k:'tadilat', t:'Tadilat'}, {k:'ders', t:'Özel Ders'}, {k:'medya', t:'Foto & Video'}, 
    {k:'pet', t:'Evcil Hayvan'}, {k:'saglik', t:'Sağlık'}, {k:'spor', t:'Spor & Fitness'},
    {k:'guzellik', t:'Güzellik'}, {k:'dijital', t:'Dijital & Yazılım'}, {k:'danismanlik', t:'Danışmanlık'}
  ];
  catOptions.forEach(function(co) { catOptionsHTML += '<option value="' + co.k + '">' + co.t + '</option>'; });

  // 1. USTA YÖNETİMİ
  var proHtmlContent = '<div class="flex justify-between items-center border-b border-slate-100 pb-3">' +
                       '<h3 class="text-sm font-black text-slate-900"><i class="fa-solid fa-users-gear text-orange-600 mr-2"></i>Kayıtlı Usta Yönetim Paneli</h3>' +
                       '<div class="flex items-center gap-2">' +
                       '<button type="button" onclick="openBulkWaModal()" class="bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded-md text-[10px] font-bold shadow transition flex items-center gap-1"><i class="fa-brands fa-whatsapp"></i>Toplu Mesaj</button>' +
                       '<button type="button" onclick="window.location.href=\`${window.API_BASE_URL}/api/auth/export-pros-csv\`" class="bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded-md text-[10px] font-bold shadow transition flex items-center gap-1"><i class="fa-solid fa-file-excel"></i>Excel İndir</button>' +
                       '<button type="button" onclick="triggerAdminReset(\'pros\')" class="bg-red-500 hover:bg-red-600 text-white px-2.5 py-1 rounded-md text-[10px] font-bold shadow transition"><i class="fa-solid fa-trash mr-1"></i>Sıfırla</button>' +
                       '<span id="adminTotalProCount" class="text-xs bg-slate-900 text-white px-2.5 py-1 rounded-full font-bold">Toplam Usta: 0</span>' +
                       '</div></div>' +
                       '<div class="bg-slate-50 p-3 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-5 gap-3 mb-4 mt-3">' + // grid-cols-5 olarak güncellendi
                       '<div><label class="text-[10px] font-bold text-slate-500 block mb-1">Telefon ile Ara</label><div class="relative"><input type="text" id="adminSearchPhone" placeholder="Örn: 532..." oninput="loadAdminProsFromDB(1)" class="w-full text-xs p-2 pl-7 rounded-lg border border-slate-300 focus:border-orange-500 focus:outline-none bg-white"><i class="fa-solid fa-phone absolute left-2 top-2.5 text-slate-400 text-[10px]"></i></div></div>' +
                       '<div><label class="text-[10px] font-bold text-slate-500 block mb-1">TC Kimlik No</label><div class="relative"><input type="text" id="adminSearchTcNo" placeholder="Örn: 123456..." oninput="loadAdminProsFromDB(1)" class="w-full text-xs p-2 pl-7 rounded-lg border border-slate-300 focus:border-orange-500 focus:outline-none bg-white"><i class="fa-solid fa-id-card absolute left-2 top-2.5 text-slate-400 text-[10px]"></i></div></div>' + // TC Filtresi eklendi
                       '<div><label class="text-[10px] font-bold text-slate-500 block mb-1">İl ile Filtrele</label><div class="relative"><input type="text" id="adminSearchCity" placeholder="Örn: İstanbul" oninput="handleAdminCityAutocomplete()" class="w-full text-xs p-2 pl-7 rounded-lg border border-slate-300 focus:border-orange-500 focus:outline-none bg-white"><i class="fa-solid fa-map-location-dot absolute left-2 top-2.5 text-slate-400 text-[10px]"></i><div id="adminCityDropdown" class="hidden absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl max-h-48 overflow-y-auto"></div></div></div>' +
                       '<div><label class="text-[10px] font-bold text-slate-500 block mb-1">Sektör Filtresi</label><select id="adminSearchCat" onchange="loadAdminProsFromDB(1)" class="w-full text-xs p-2 rounded-lg border border-slate-300 focus:border-orange-500 focus:outline-none bg-white">' + catOptionsHTML + '</select></div>' +
                       '<div><label class="text-[10px] font-bold text-slate-500 block mb-1">Üyelik Tipi</label><select id="adminSearchPackage" onchange="loadAdminProsFromDB(1)" class="w-full text-xs p-2 rounded-lg border border-slate-300 focus:border-orange-500 focus:outline-none bg-white"><option value="">Tümü</option><option value="plus">Plus Ustalar</option><option value="normal">Standart Ustalar</option></select></div>' + // Üyelik Tipi Filtresi eklendi
                       '</div><div id="adminProListContainer" class="space-y-3 max-h-[600px] overflow-y-auto pr-1"></div><div id="adminProPagination" class="flex justify-center items-center gap-1 mt-4 pb-2"></div>';                       
  document.getElementById('adminTabContentPros').innerHTML = proHtmlContent;

  // 2. İLAN YÖNETİMİ
  var demandHtmlContent = '<div class="flex justify-between items-center border-b border-slate-100 pb-3">' +
                          '<h3 class="text-sm font-black text-slate-900"><i class="fa-solid fa-list-check text-orange-600 mr-2"></i>İlan Yönetim & Moderasyon</h3>' +
                          '<div class="flex items-center gap-2">' +
                          '<button type="button" onclick="downloadFilteredDemandsCSV()" class="bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 rounded-md text-[10px] font-bold shadow transition flex items-center gap-1"><i class="fa-solid fa-file-csv"></i> Excel/CSV İndir</button>' +
                          '<button type="button" onclick="triggerAdminReset(\'demands\')" class="bg-red-500 hover:bg-red-600 text-white px-2.5 py-1 rounded-md text-[10px] font-bold shadow transition"><i class="fa-solid fa-bomb mr-1"></i>Tümünü Sıfırla</button>' +
                          '<button id="btnAdminDeleteDemands" onclick="deleteSelectedAdminDemands()" class="bg-red-500 hover:bg-red-600 text-white px-2.5 py-1 rounded-md text-xs font-bold shadow transition opacity-50 cursor-not-allowed" disabled><i class="fa-solid fa-trash mr-1"></i>Seçilenleri Sil (0)</button>' +
                          '<span id="adminDemandTotalCount" class="text-xs bg-slate-900 text-white px-2.5 py-1 rounded-full font-bold">Toplam İlan: 0</span>' +
                          '</div></div>' +
                          '<div class="bg-slate-50 p-3 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-6 gap-3 mb-4 mt-3">' + // grid-cols-6 olarak güncellendi
                          '<div><label class="text-[10px] font-bold text-slate-500 block mb-1">Müşteri Tel</label><input type="text" id="adminFilterDemandPhone" placeholder="Örn: 532..." class="w-full text-xs p-2 rounded-lg border border-slate-300 focus:border-orange-500 focus:outline-none bg-white"></div>' +
                          '<div><label class="text-[10px] font-bold text-slate-500 block mb-1">Sektör</label><select id="adminFilterDemandCat" class="w-full text-xs p-2 rounded-lg border border-slate-300 focus:border-orange-500 focus:outline-none bg-white">' + catOptionsHTML + '</select></div>' +
                          '<div class="relative"><label class="text-[10px] font-bold text-slate-500 block mb-1">İl</label><input type="text" id="adminFilterDemandCity" placeholder="Örn: Sakarya" autocomplete="off" onkeyup="handleDemandCityAutocomplete()" class="w-full text-xs p-2 rounded-lg border border-slate-300 focus:border-orange-500 focus:outline-none bg-white"><div id="demandCityDropdown" class="absolute z-50 w-full bg-white border border-slate-200 shadow-lg rounded-lg mt-1 hidden max-h-48 overflow-y-auto"></div></div>' + // İl Filtresi eklendi
                          '<div><label class="text-[10px] font-bold text-slate-500 block mb-1">İlçe</label><select id="adminFilterDemandDistrict" class="w-full text-xs p-2 rounded-lg border border-slate-300 focus:border-orange-500 focus:outline-none bg-white cursor-pointer"><option value="">Tüm İlçeler</option></select></div>' + // İlçe Filtresi eklendi
                          '<div><label class="text-[10px] font-bold text-slate-500 block mb-1">Başlangıç Tarihi</label><input type="date" id="adminFilterDemandStart" class="w-full text-xs p-2 rounded-lg border border-slate-300 focus:border-orange-500 focus:outline-none bg-white"></div>' +
                          '<div><label class="text-[10px] font-bold text-slate-500 block mb-1">Bitiş Tarihi</label><div class="flex gap-2"><input type="date" id="adminFilterDemandEnd" class="w-full text-xs p-2 rounded-lg border border-slate-300 focus:border-orange-500 focus:outline-none bg-white"><button onclick="loadAdminDemandsFromDB()" class="bg-slate-800 hover:bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-sm">Filtrele</button></div></div>' +
                          '</div>' +
                          '<div class="w-full overflow-x-auto"><table class="w-full text-left text-xs text-slate-600"><thead class="bg-slate-100 text-[10px] uppercase text-slate-500 font-black"><tr><th class="p-3 w-10"><input type="checkbox" id="adminDemandSelectAll" onchange="toggleAllAdminDemands(this)"></th><th class="p-3">Tarih</th><th class="p-3">Kategori</th><th class="p-3">Müşteri / Tel</th><th class="p-3">Konum</th><th class="p-3 w-12 text-center">İşlem</th></tr></thead><tbody id="adminDemandTableBody"></tbody></table></div>';
  document.getElementById('adminTabContentDemands').innerHTML = demandHtmlContent;

  // 3. YENİ: SAHA PERSONELİ (PROMOTER) YÖNETİMİ
  var promoterHtmlContent = '<div class="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">' +
                            '<h3 class="text-sm font-black text-slate-900"><i class="fa-solid fa-briefcase text-orange-600 mr-2"></i>Saha Personelleri (Promoter) & Referans Takibi</h3>' +
                            '</div>' +
                            '<div class="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-4 flex gap-2 items-end">' +
                            '<div class="flex-1"><label class="text-[10px] font-bold text-indigo-800 block mb-1">Mevcut Ustayı Saha Personeli (Promoter) Yap</label><input type="text" id="adminNewPromoterPhone" placeholder="Telefon (Örn: 532...)" class="w-full text-xs p-2 rounded-lg border border-indigo-200 focus:border-indigo-500 focus:outline-none bg-white font-mono"></div>' +
                            '<button type="button" onclick="assignAdminPromoter()" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs font-bold shadow transition flex items-center gap-1"><i class="fa-solid fa-user-plus"></i> Ata ve Kod Üret</button>' +
                            '</div>' +
                            '<div class="bg-slate-50 p-3 rounded-xl border border-slate-200 mb-4">' +
                            '<div class="relative"><input type="text" id="adminFilterPromoter" placeholder="İsim, Telefon veya Koda göre filtrele... (Örn: K298)" oninput="filterPromoterTable()" class="w-full text-xs p-2.5 pl-9 rounded-lg border border-slate-300 focus:border-orange-500 focus:outline-none bg-white"><i class="fa-solid fa-search absolute left-3 top-3 text-slate-400"></i></div>' +
                            '</div>' +
                            '<div class="w-full overflow-x-auto"><table class="w-full text-left text-xs text-slate-600"><thead class="bg-slate-100 text-[10px] uppercase text-slate-500 font-black"><tr><th class="p-3">Adı / Telefon</th><th class="p-3 text-center">Referans Kodu</th><th class="p-3 text-center">Getirdiği Usta</th><th class="p-3 text-center">Plus\'a Geçen</th><th class="p-3 text-center">İşlem</th></tr></thead><tbody id="adminPromoterTableBody"><tr><td colspan="5" class="p-4 text-center text-slate-400 italic text-xs">Veriler yükleniyor...</td></tr></tbody></table></div>';
  document.getElementById('adminTabContentPromoter').innerHTML = promoterHtmlContent;

  loadAdminProsFromDB(1);
}
// ADMİN İŞLEMLERİ (Artık Telefon Numarası Üzerinden Sorguluyor)
async function deletePro(phone) {
  if (confirm('DİKKAT: Bu ustayı veritabanından kalıcı olarak silmek istediğinize emin misiniz? Bu işlem geri alınamaz!')) {
    try {
      const response = await fetch(`${window.API_BASE_URL}/api/auth/pro/` + phone, {
        method: 'DELETE'
      });
      const data = await response.json();
      
      if (data.success) {
        alert('Usta kaydı veritabanından başarıyla silindi.');
        loadAdminProsFromDB(); // DB'den güncel listeyi tekrar yükle
      } else {
        alert(data.message || 'Silme işlemi başarısız oldu.');
      }
    } catch (err) {
      console.error(err);
      alert('Sunucu bağlantı hatası.');
    }
  }
}
// ==========================================
// ADMİN İLAN YÖNETİMİ & MODERASYONU
// ==========================================
var adminLoadedDemands = [];

window.switchAdminTab = function(tab) {
  var btnPros = document.getElementById('adminTabProsBtn');
  var btnDemands = document.getElementById('adminTabDemandsBtn');
  var btnPromoter = document.getElementById('adminTabPromoterBtn'); 
  var contentPros = document.getElementById('adminTabContentPros');
  var contentDemands = document.getElementById('adminTabContentDemands');
  var contentPromoter = document.getElementById('adminTabContentPromoter'); 

  const activeBtnClass = 'px-4 py-2 text-sm font-bold text-orange-600 border-b-2 border-orange-600 transition';
  const passiveBtnClass = 'px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition';

  if(btnPros) btnPros.className = passiveBtnClass;
  if(btnDemands) btnDemands.className = passiveBtnClass;
  if(btnPromoter) btnPromoter.className = passiveBtnClass;
  
  if(contentPros) contentPros.classList.add('hidden');
  if(contentDemands) contentDemands.classList.add('hidden');
  if(contentPromoter) contentPromoter.classList.add('hidden');

  if (tab === 'pros') {
    if(btnPros) btnPros.className = activeBtnClass;
    if(contentPros) contentPros.classList.remove('hidden');
  } else if (tab === 'demands') {
    if(btnDemands) btnDemands.className = activeBtnClass;
    if(contentDemands) contentDemands.classList.remove('hidden');
    loadAdminDemandsFromDB(); 
  } else if (tab === 'promoter') { 
    if(btnPromoter) btnPromoter.className = activeBtnClass;
    if(contentPromoter) contentPromoter.classList.remove('hidden');
    loadAdminPromoterReport(); // Sekme açıldığında verileri otomatik çeker
  }
};
async function loadAdminDemandsFromDB(page = 1) {
  var phone = document.getElementById('adminFilterDemandPhone') ? document.getElementById('adminFilterDemandPhone').value.trim() : '';
  var cat = document.getElementById('adminFilterDemandCat') ? document.getElementById('adminFilterDemandCat').value : '';
  var start = document.getElementById('adminFilterDemandStart') ? document.getElementById('adminFilterDemandStart').value : '';
  var end = document.getElementById('adminFilterDemandEnd') ? document.getElementById('adminFilterDemandEnd').value : '';
  
  // YENİ: İl ve İlçe değerlerini yakala
  var city = document.getElementById('adminFilterDemandCity') ? document.getElementById('adminFilterDemandCity').value.trim() : '';
  var district = document.getElementById('adminFilterDemandDistrict') ? document.getElementById('adminFilterDemandDistrict').value.trim() : '';

  var token = localStorage.getItem('tamonda_admin_token');
  var queryParams = new URLSearchParams();
  if(phone) queryParams.append('phone', phone);
  if(start) queryParams.append('startDate', start);
  if(end) queryParams.append('endDate', end);
  if(cat) queryParams.append('category', cat);
  if(city) queryParams.append('city', city);
  if(district) queryParams.append('district', district);
  
  // Sayfalama parametrelerini yolla
  queryParams.append('page', page);
  queryParams.append('limit', 50);

  try {
    const res = await fetch(`${window.API_BASE_URL}/api/demands/admin/list?` + queryParams.toString(), {
        headers: { 'Authorization': 'Bearer ' + token }
    }); 
    const data = await res.json();
    
    if (data.success) {
      // Backend'den gelen saf veriyi ekrana bas (Frontend'de tekrar filtrelemeye gerek yok)
      adminLoadedDemands = data.demands; 
      
      // SAYACI GÜNCELLE (Toplam filtrelenen sayıyı gösterir, sayfadaki 50'yi değil)
      var totalCounterEl = document.getElementById('adminDemandTotalCount');
      if (totalCounterEl) {
          totalCounterEl.innerText = 'Toplam İlan: ' + data.total;
      }

      renderAdminDemandTable();
    } else {
      alert('İlanlar yüklenirken hata oluştu: ' + data.message);
    }
  } catch (err) {
    console.error(err);
  }
}
function renderAdminDemandTable() {
  var tbody = document.getElementById('adminDemandTableBody');
  var countEl = document.getElementById('adminTotalDemandCount');
  var selectAllCb = document.getElementById('adminDemandSelectAll');
  if(selectAllCb) selectAllCb.checked = false;
  updateAdminDemandDeleteBtn();

  if (adminLoadedDemands.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="p-6 text-center text-slate-400 text-xs italic">Kriterlere uygun ilan bulunamadı.</td></tr>';
    return;
  }

  // Ana kategori kodlarını şık Türkçe isimlere çeviren sözlük
  var mainCatNames = {
    'nakliyat': 'Nakliyat',
    'agir_nakliye': 'Ağır Nakliye',
    'temizlik': 'Temizlik',
    'oto': 'Oto Servis',
    'organizasyon': 'Organizasyon',
    'tamir': 'Tamir & Servis',
    'tadilat': 'Tadilat',
    'ders': 'Özel Ders',
    'medya': 'Foto & Video',
    'pet': 'Evcil Hayvan',
    'saglik': 'Sağlık',
    'spor': 'Spor & Fitness',
    'guzellik': 'Güzellik',
    'dijital': 'Dijital & Yazılım',
    'danismanlik': 'Danışmanlık'
  };

  var html = '';
  adminLoadedDemands.forEach(function(d) {
    var dateStr = new Date(d.createdAt).toLocaleDateString('tr-TR');
    
    // Ana kategori adını çöz (Bulunamazsa kodun kendisini ilk harfi büyük göster)
    var rawMainCat = d.mainCat || 'Diğer';
    var formattedMainCat = mainCatNames[rawMainCat] || (rawMainCat.charAt(0).toUpperCase() + rawMainCat.slice(1));

    html += '<tr class="border-b border-slate-100 hover:bg-slate-50 transition">' +
            '<td class="p-3"><input type="checkbox" class="admin-demand-cb" value="' + d._id + '" onchange="updateAdminDemandDeleteBtn()"></td>' +
            '<td class="p-3 text-[11px] text-slate-500">' + dateStr + '</td>' +
            '<td class="p-3"><span class="bg-orange-100 text-orange-800 px-2 py-0.5 rounded font-black text-[10px]">' + formattedMainCat + '</span></td>' +
            '<td class="p-3 font-bold text-slate-700">' + d.categoryTitle + '</td>' +
            '<td class="p-3">' + d.customerName + '<br><span class="text-[10px] text-orange-600 font-bold">' + d.customerPhone + '</span></td>' +
            '<td class="p-3">' + d.fromCity + ' / ' + d.fromDistrict + '</td>' +
            '<td class="p-3 text-center"><button onclick="deleteSingleAdminDemand(\'' + d._id + '\')" class="bg-rose-100 text-rose-600 hover:bg-rose-500 hover:text-white px-2 py-1 rounded shadow-sm font-bold text-[10px] transition"><i class="fa-solid fa-trash"></i></button></td>' +
            '</tr>';
  });
  tbody.innerHTML = html;
}
function toggleAllAdminDemands(source) {
  var checkboxes = document.querySelectorAll('.admin-demand-cb');
  checkboxes.forEach(function(cb) { cb.checked = source.checked; });
  updateAdminDemandDeleteBtn();
}

function updateAdminDemandDeleteBtn() {
  var selected = document.querySelectorAll('.admin-demand-cb:checked').length;
  var btn = document.getElementById('btnAdminDeleteDemands');
  btn.innerHTML = '<i class="fa-solid fa-trash mr-1"></i>Seçilenleri Sil (' + selected + ')';
  if (selected > 0) {
    btn.disabled = false;
    btn.classList.remove('opacity-50', 'cursor-not-allowed');
  } else {
    btn.disabled = true;
    btn.classList.add('opacity-50', 'cursor-not-allowed');
  }
}

async function deleteSingleAdminDemand(id) {
  if(confirm('Bu ilanı silmek istediğinize emin misiniz?')) {
    await executeDemandDelete([id]);
  }
}

async function deleteSelectedAdminDemands() {
  var selected = document.querySelectorAll('.admin-demand-cb:checked');
  if (selected.length === 0) return;
  var ids = Array.from(selected).map(cb => cb.value);
  
  if(confirm('Seçilen ' + ids.length + ' ilanı silmek istediğinize emin misiniz?')) {
    await executeDemandDelete(ids);
  }
}

async function executeDemandDelete(ids) {
  var token = localStorage.getItem('tamonda_admin_token');
  try {
    const res = await fetch(`${window.API_BASE_URL}/api/demands/admin/delete-batch`, {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ demandIds: ids })
    });
    const data = await res.json();
    if(data.success) {
      alert(data.message);
      loadAdminDemandsFromDB(); // İşlem bittikten sonra listeyi otomatik yenile
    } else {
      alert('Silme işlemi başarısız: ' + data.message);
    }
  } catch(err) {
    console.error(err);
    alert('Sunucuya bağlanırken bir hata oluştu.');
  }
}
window.updateProInfo = async function(oldPhone) {
  var newName = document.getElementById('admin_name_' + oldPhone).value.trim();
  var newPhoneVal = document.getElementById('admin_phone_' + oldPhone).value.trim(); 
  var city = document.getElementById('admin_city_sel_' + oldPhone).value.trim();
  var dist = document.getElementById('admin_dist_' + oldPhone).value.trim();
  var catSelect = document.getElementById('admin_cat_' + oldPhone);
  var categoryKey = catSelect.value;
  var categoryTitle = catSelect.options[catSelect.selectedIndex].text;

  var token = localStorage.getItem('tamonda_admin_token');
  var btn = event.currentTarget;
  var originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Kaydediliyor...';
  btn.disabled = true;

  try {
    // DÜZELTME: /api/auth/pros/ yerine /api/auth/pro/ yapıldı (Backend ile tam uyumlu)
    const res = await fetch(`${window.API_BASE_URL}/api/auth/pro/` + oldPhone, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token 
      },
      body: JSON.stringify({ 
        fullName: newName, 
        newPhone: newPhoneVal, 
        city: city, 
        district: dist, 
        categoryKey: categoryKey, 
        categoryTitle: categoryTitle 
      })
    });
    
    const data = await res.json();
    if (data.success) {
      document.getElementById('adminEditProModal').classList.add('hidden');
      loadAdminProsFromDB(window.currentAdminProPage || 1); // Listeyi yenile
      alert('Usta bilgileri başarıyla güncellendi.'); // Başarı mesajı eklendi
    } else {
      alert('Hata: ' + data.message);
    }
  } catch(err) {
    console.error(err);
    alert('Güncelleme sırasında bir hata oluştu.');
  } finally {
    btn.innerHTML = originalText;
    btn.disabled = false;
  }
}
async function assignPlusToPro(phone) {
  try {
    var scope = document.getElementById('admin_plus_scope_' + phone).value;
    var daysStr = document.getElementById('admin_plus_days_' + phone).value;
    var days = parseInt(daysStr, 10);

    if (!days || days <= 0) { alert('Lütfen geçerli bir gün sayısı giriniz (Örn: 30).'); return; }

    const response = await fetch(`${window.API_BASE_URL}/api/auth/pro/` + phone + '/plus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scope: scope, days: days })
    });

    const data = await response.json();
    if (data.success) {
      var expDateStr = new Date(data.subscriptionEndDate).toLocaleDateString('tr-TR');
      alert('Başarılı!\nUstaya ' + days + ' günlük [' + scope + '] Plus tanımlandı.\nBitiş: ' + expDateStr);
      
      // ANINDA SENKRONİZASYON: Sadece LocalStorage güncellenir, admin oturumu bozulmaz.
      var storedStr = localStorage.getItem('tamonda_current_pro');
      if (storedStr) {
        try {
          var storedPro = JSON.parse(storedStr);
          if (String(storedPro.phone) === String(phone)) {
            storedPro.packageType = 'plus_' + scope;
            storedPro.subscriptionStatus = true;
            storedPro.subscriptionEndDate = data.subscriptionEndDate;
            storedPro.subscriptionDays = data.subscriptionDays || days;
            if (scope === 'all_turkey') {
              storedPro.extraCities = ['Tüm Türkiye'];
            }
            localStorage.setItem('tamonda_current_pro', JSON.stringify(storedPro));
          }
        } catch(e) {}
      }

      loadAdminProsFromDB();
    } else {
      alert(data.message || 'Plus tanımlama başarısız.');
    }
  } catch (err) {
    alert("Hata oluştu: " + err.message);
  }
}

async function revokePlus(phone) {
  if (confirm('DİKKAT: Bu ustanın Plus aboneliğini iptal etmek istediğinize emin misiniz?')) {
    try {
      const response = await fetch(`${window.API_BASE_URL}/api/auth/pro/` + phone + '/plus', {
        method: 'DELETE'
      });
      const data = await response.json();
      
      if (data.success) {
        alert('Ustanın Plus üyeliği veritabanından başarıyla iptal edildi.');
        
        // ANINDA SENKRONİZASYON: Sadece LocalStorage güncellenir, admin oturumu bozulmaz.
        var storedStr = localStorage.getItem('tamonda_current_pro');
        if (storedStr) {
          try {
            var storedPro = JSON.parse(storedStr);
            if (String(storedPro.phone) === String(phone)) {
              storedPro.packageType = 'standard';
              storedPro.subscriptionStatus = false;
              storedPro.subscriptionEndDate = null;
              storedPro.extraCities = [];
              localStorage.setItem('tamonda_current_pro', JSON.stringify(storedPro));
            }
          } catch(e) {}
        }
        
        loadAdminProsFromDB(); // DB'den listeyi yenile
      } else {
        alert(data.message || 'İptal işlemi başarısız oldu.');
      }
    } catch (err) {
      console.error(err);
      alert('Sunucu bağlantı hatası.');
    }
  }
}
// USTA GİRİŞ VE KAYIT
// ==========================================
async function handleProLogin() {
  var loginPhoneVal = document.getElementById('loginPhone').value.trim();

  var cleanLoginPhone = loginPhoneVal.replace(/\D/g, ''); 
  if (cleanLoginPhone.startsWith('0')) cleanLoginPhone = cleanLoginPhone.substring(1);

  if (!/^5\d{9}$/.test(cleanLoginPhone)) { 
    alert('Lütfen telefon numaranızı başında sıfır (0) olmadan, 10 haneli olarak giriniz. (Örn: 5321112233)'); 
    return; 
  }

  if (proLoginStep === 1) { 
    try {
      const response = await fetch(`${window.API_BASE_URL}/api/auth/send-login-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanLoginPhone })
      });
      
      const data = await response.json();
      
      if (data.success) {
        document.getElementById('loginOtpArea').classList.remove('hidden'); 
        document.getElementById('btnLoginAction').innerText = 'Doğrula & Giriş Yap'; 
        proLoginStep = 2; 
        console.log("🔑 [GİRİŞ TEST OTP Kodu]:", data.debugOtp);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Sunucuya bağlanılamadı. Backend çalışıyor mu?");
      console.error(error);
    }
  } 
  else { 
    var otpVal = document.getElementById('loginOtp').value.trim();
    
    try {
      const response = await fetch(`${window.API_BASE_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanLoginPhone, otpCode: otpVal })
      });
      
      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('tamonda_token', data.token);

        // YENİ: ADMİN KONTROLÜ VE YÖNLENDİRMESİ
        if (cleanLoginPhone === '5065456697') {
            window.location.href = 'admin.html';
            return;
        }
        
        currentProUser = { 
          name: data.user.fullName, 
          phone: data.user.phone, 
          city: data.user.providerData?.city || 'Sakarya', 
          district: data.user.providerData?.district || 'Adapazarı', 
          categoryKey: data.user.providerData?.categoryKey || 'nakliyat', 
          categoryTitle: data.user.providerData?.categoryTitle || 'Nakliyat', 
          packageType: data.user.providerData?.packageType || 'standard', 
          subscriptionStatus: data.user.providerData?.subscriptionStatus || false, 
          subscriptionEndDate: data.user.providerData?.subscriptionEndDate || null, 
          subscriptionDays: data.user.providerData?.subscriptionDays || 0,
          ratingAvg: data.user.providerData?.ratingAvg || 0,
          ratingCount: data.user.providerData?.ratingCount || 0,
          extraCities: data.user.providerData?.extraCities || []
        }; 
        
        saveToStorage(); 
        checkProAuthState(); 

        // YENİ EKLENEN: Giriş yapıldığı anda taze veriyi çek, eski önbellekteki listeleri temizle
        if (typeof loadMyOffersFromDB === 'function') {
            loadMyOffersFromDB();
        }

        // YENİ EKLENEN: Giriş yapıldığı anda ilan listesini ve sayacı canlı güncelle
        if (typeof renderProDemands === 'function') {
            renderProDemands();
        }

        // Karşılama Pop-up Tetikleyicisi
        showProWelcomePopup(currentProUser.categoryKey, currentProUser.name);

      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Giriş doğrulama işlemi sırasında sunucu hatası oluştu.");
      console.error(error);
    }
  }
}
async function handleProRegister() {
  var mainCatSelect = document.getElementById('regMainCategory');
  var catTitle = mainCatSelect.options[mainCatSelect.selectedIndex].text;
  var catKey = mainCatSelect.value;
  var c = document.getElementById('regCitySelected').value || 'Sakarya';
  var d = document.getElementById('regDistrict').value || 'Adapazarı';
  
  // YENİ: NVİ Doğrulaması İçin Gerekli 4 Alan
  var fName = document.getElementById('regFirstName').value.trim();
  var lName = document.getElementById('regLastName').value.trim();
  var tc = document.getElementById('regTcNo').value.trim();
  var bYear = document.getElementById('regBirthYear').value.trim();
  
  var bPhone = document.getElementById('regPhone').value.trim();

  // YENİ EKLENEN: Referans Kodu (Opsiyonel olduğu için boş ise hata vermeyecek şekilde alıyoruz)
  var refCodeInput = document.getElementById('regReferralCode');
  var refCode = refCodeInput ? refCodeInput.value.trim() : '';

  if (!fName || !lName || !tc || !bYear) {
    alert('Lütfen Ad, Soyad, TC Kimlik No ve Doğum Yılı alanlarını eksiksiz doldurun.');
    return;
  }
  
  if (tc.length !== 11) {
    alert('TC Kimlik Numaranız 11 haneli olmalıdır.');
    return;
  }

  var cleanPhone = bPhone.replace(/\D/g, '');
  if (cleanPhone.startsWith('0')) cleanPhone = cleanPhone.substring(1);

  if (!/^5\d{9}$/.test(cleanPhone)) { 
    alert('Lütfen kayıt için telefon numaranızı başında sıfır (0) olmadan, tam 10 haneli giriniz.'); 
    return; 
  }

  // 1. AŞAMA: Backend'den OTP İsteği ve NVİ Doğrulaması
  if (proRegStep === 1) { 
    try {
      const response = await fetch(`${window.API_BASE_URL}/api/auth/send-pro-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: cleanPhone,
          firstName: fName,     // Yeni eklenen alan
          lastName: lName,      // Yeni eklenen alan
          tcNo: tc,             // Yeni eklenen alan
          birthYear: bYear,     // Yeni eklenen alan
          categoryKey: catKey,
          categoryTitle: catTitle,
          city: c,
          district: d,
          referralCode: refCode // YENİ EKLENEN: Referans kodunu backend'e gönderiyoruz
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        document.getElementById('regOtpArea').classList.remove('hidden'); 
        document.getElementById('btnRegAction').innerText = 'Doğrula & Kaydı Tamamla'; 
        proRegStep = 2; 
        console.log("Test OTP Kodu:", data.debugOtp);
      } else {
        // NVİ'den dönen hatalar veya diğer uyarılar burada ustaya gösterilir
        alert(data.message);
      }
    } catch (error) {
      alert("Sunucuya bağlanılamadı. Backend çalışıyor mu?");
      console.error(error);
    }
  } 
  // 2. AŞAMA: Backend'e OTP Gönderip Doğrulama
  else { 
    var otpVal = document.getElementById('regOtp').value.trim();
    
    try {
      const response = await fetch(`${window.API_BASE_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanPhone, otpCode: otpVal })
      });
      
      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('tamonda_token', data.token);
        
        currentProUser = { 
          name: data.user.fullName, 
          phone: data.user.phone, 
          city: c, 
          district: d, 
          categoryKey: catKey, 
          categoryTitle: catTitle, 
          packageType: 'standard', 
          subscriptionStatus: false, 
          ratingAvg: data.user.providerData?.ratingAvg || 0,
          ratingCount: data.user.providerData?.ratingCount || 0,
          extraCities: data.user.providerData?.extraCities || []
        }; 
        
        saveToStorage(); 
        checkProAuthState(); 
        alert("Kayıt başarılı! Bilgileriniz doğrulandı.");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Doğrulama işlemi sırasında sunucu hatası oluştu.");
      console.error(error);
    }
  }
}
function getRandomWelcomeMessage(categoryKey, ustaFullName) {
  const tamIsim = ustaFullName || 'Büyük Usta';

  // Sol taraf: Veritabanındaki kısa kategori anahtarları (categoryKey)
  // Sağ taraf: welcomeMessages.js içindeki const dizi adları (Birebir aynı ve window takısı olmadan)
  const messagePools = {
    'nakliyat': nakliyatMesajlari,               
    'agir_nakliye': agirNakliyeMesajlari,        
    'temizlik': temizlikMesajlari,               
    'oto': otoServisMesajlari,             
    'organizasyon': organizasyonMesajlari,       
    'tamir': tamirServisMesajlari,         
    'tadilat': tadilatDekorasyonMesajlari, 
    'ders': ozelDersMesajlari,             
    'medya': medyaMesajlari,                     
    'pet': petHizmetleriMesajlari,         
    'saglik': saglikTerapiMesajlari,       
    'spor': sporFitnessMesajlari,          
    'guzellik': guzelikBakimMesajlari,     
    'dijital': dijitalYazilimMesajlari,    
    'danismanlik': danismanlikDigerMesajlari 
  };

  if (messagePools[categoryKey] && messagePools[categoryKey].length > 0) {
    let selectedPool = messagePools[categoryKey];
    let randomIndex = Math.floor(Math.random() * selectedPool.length);
    let rawMessage = selectedPool[randomIndex];
    return rawMessage.replace(/\{isim\}/g, tamIsim);
  }

  return `${tamIsim} büyük usta aradığın herşey TAMONDA!! www.tamonda.tr www.tamonda.com.tr`;
}

// Şık Pop-up (Modal) Gösterici
function showProWelcomePopup(categoryKey, fullName) {
  const message = getRandomWelcomeMessage(categoryKey, fullName);

  let modalEl = document.getElementById('proWelcomeModal');
  if (!modalEl) {
    modalEl = document.createElement('div');
    modalEl.id = 'proWelcomeModal';
    modalEl.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); z-index:9999; display:flex; align-items:center; justify-content:center; padding:20px;";
    modalEl.innerHTML = `
    <style>
      .tamonda-welcome-card {
        display: flex;
        background: #ffffff;
        max-width: 750px;
        width: 95%;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 25px 50px rgba(0,0,0,0.3);
        font-family: 'Segoe UI', system-ui, sans-serif;
      }
      
      /* Sol Panel: Açılı Kesim (Clip-Path) ve Turuncu Fon */
      .tamonda-welcome-graphic {
        flex: 0 0 45%;
        background: linear-gradient(135deg, #ff7b00 0%, #e65c00 100%);
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        /* Sağ tarafı hafif çapraz keserek dinamizm katıyoruz */
        clip-path: polygon(0 0, 100% 0, 85% 100%, 0% 100%);
      }
      
      /* Rozet: Temiz ve Parlak Beyaz Glow (Karanlık gölge kaldırıldı) */
      .tamonda-welcome-icon {
        font-size: 130px;
        color: #1e3a8a; /* Premium koyu lacivert */
        filter: drop-shadow(0 0 35px rgba(255, 255, 255, 0.85));
        transform: rotate(-5deg);
        transition: transform 0.5s ease;
        margin-right: 15px; /* Eğik kesimden dolayı ortalamayı dengelemek için */
      }

      .tamonda-welcome-graphic:hover .tamonda-welcome-icon {
        transform: rotate(0deg) scale(1.05);
      }
      
      /* Sağ Panel: İçerik */
      .tamonda-welcome-content {
        flex: 1;
        padding: 45px 40px 45px 15px; /* Sol boşluğu azalttık (kesimden alan geldi) */
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: left;
      }
      
      .tamonda-welcome-title {
        color: #1e293b;
        font-size: 26px;
        font-weight: 900;
        margin-top: 0;
        margin-bottom: 20px;
        line-height: 1.2;
      }
      
      .tamonda-welcome-title span {
        color: #ff6600;
        display: block;
        font-size: 34px;
      }
      
      .tamonda-welcome-text {
        color: #475569;
        font-size: 16px;
        line-height: 1.7;
        margin-bottom: 35px;
        font-weight: 500;
      }

      /* Web Adresleri İçin Ayrıştırılmış Lacivert Stil */
      .tamonda-web-link {
        display: block; /* Alt satıra indirir */
        color: #1e3a8a;
        font-weight: 800;
        font-size: 15px;
        margin-top: 6px;
        letter-spacing: 0.5px;
      }
      
      /* Dışa Parlayan Premium Buton */
      .tamonda-welcome-btn {
        background: #ff6600;
        color: white;
        border: none;
        padding: 15px 35px;
        font-size: 16px;
        font-weight: bold;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 8px 20px rgba(255, 102, 0, 0.3);
        align-self: flex-start;
      }
      
      .tamonda-welcome-btn:hover {
        background: #e65c00;
        transform: translateY(-3px);
        box-shadow: 0 12px 25px rgba(255, 102, 0, 0.4);
      }
      
      /* Mobil Uyumluluk */
      @media (max-width: 640px) {
        .tamonda-welcome-card {
          flex-direction: column;
        }
        .tamonda-welcome-graphic {
          padding: 50px 20px;
          /* Mobilde alt kısmı çapraz keser */
          clip-path: polygon(0 0, 100% 0, 100% 88%, 0 100%);
          width: 100%;
        }
        .tamonda-welcome-icon {
          font-size: 100px;
          margin-right: 0;
        }
        .tamonda-welcome-content {
          padding: 30px 25px;
          text-align: center;
        }
        .tamonda-welcome-btn {
          align-self: center;
          width: 100%;
        }
        .tamonda-web-link {
          display: inline-block;
          margin-top: 10px;
        }
      }
    </style>

    <div class="tamonda-welcome-card">
      <div class="tamonda-welcome-graphic">
        <i class="fa-solid fa-award tamonda-welcome-icon"></i>
      </div>
      <div class="tamonda-welcome-content">
        <h3 class="tamonda-welcome-title">TamOnda Ailesine <span>Hoş Geldin!</span></h3>
        <p id="proWelcomeText" class="tamonda-welcome-text"></p>
        <button onclick="document.getElementById('proWelcomeModal').style.display='none';" class="tamonda-welcome-btn">
          Hadi Başlayalım 🚀
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modalEl);
} // Bu süslü parantez, modal oluşturma (if) bloğunu kapatır

// Mesajı al, web adreslerini lacivert yapacak şekilde formatla ve ekrana bas
const formattedMessage = message.replace(/(www\.tamonda\.com\.tr|www\.tamonda\.tr)/g, '<span class="tamonda-web-link">$1</span>');
document.getElementById('proWelcomeText').innerHTML = formattedMessage;

// Modalı ekranda göster
modalEl.style.display = 'flex';

} // Bu süslü parantez, showProWelcomePopup fonksiyonunu tamamen kapatır

function handleProLogout() { 
  currentProUser=null; proLoginStep=1; proRegStep=1; 
  var loginArea = document.getElementById('loginOtpArea');
  var regArea = document.getElementById('regOtpArea');
  var btnLogin = document.getElementById('btnLoginAction');
  var btnReg = document.getElementById('btnRegAction');
  if(loginArea) { loginArea.classList.add('hidden'); document.getElementById('loginOtp').value = ''; }
  if(regArea) { regArea.classList.add('hidden'); document.getElementById('regOtp').value = ''; }
  if(btnLogin) btnLogin.innerText = 'SMS Kodu Gönder';
  if(btnReg) btnReg.innerText = 'KAYIT OL';
  saveToStorage(); checkProAuthState(); 
}

function openPlusModal(isRenewal) {
  // Eğer parametre true gelirse %50 indirimi hafızada tutuyoruz
  window.isPlusRenewal = (isRenewal === true); 
  
  var modal = document.getElementById('plusModal');
  if(modal) modal.classList.remove('hidden');
  updatePlusCalculation();
}
function closePlusModal() {
  var modal = document.getElementById('plusModal');
  if(modal) modal.classList.add('hidden');
}

function updatePlusCalculation() {
  if (!currentProUser) return;
  var basePrice = 400; 
  var scope = document.getElementById('plusScope').value;
  var months = parseInt(document.getElementById('plusMonths').value, 10);
  
  var multiCityBox = document.getElementById('multiCityContainer');
  if (multiCityBox) {
    if (scope === 'multi_city') multiCityBox.classList.remove('hidden');
    else multiCityBox.classList.add('hidden');
  }
  
  var sectorKey = currentProUser.categoryKey;
  var sectorMultiplier = sectorScores[sectorKey] || sectorScores['default'];
  
  var city = currentProUser.city || 'Sakarya';
  var cityMultiplier = cityTierMultipliers[city] || 1.0;
  if (scope === 'all_turkey') cityMultiplier = 1.4; 
  
  var providerCount = registeredPros.filter(function(p){ return scope === 'all_turkey' || p.city === city; }).length;
  var competitionFactor = Math.max(0.7, 1 / (1 + 0.04 * providerCount));
  
  var scopeMultiplier = 1.0;
  if (scope === 'multi_city') scopeMultiplier = 1.6;
  if (scope === 'all_turkey') scopeMultiplier = 2.5;
  
  var durationMultiplier = 1.0;
  if (months === 3) durationMultiplier = 2.7;   
  if (months === 12) durationMultiplier = 9.0;  
  
  var finalFee = basePrice * sectorMultiplier * cityMultiplier * competitionFactor * scopeMultiplier * (durationMultiplier / (months === 1 ? 1 : months));
  finalFee = Math.round(finalFee * months);
  var originalFee = finalFee;
  
  // Kota sayımı
  var activePlusInSector = registeredPros.filter(function(p) {
      return p.city === city && p.categoryKey === sectorKey && p.packageType && p.packageType.includes('plus'); 
  }).length;

  var isLaunchEligible = activePlusInSector < 20; 
  var isHeavyTransport = (sectorKey === 'nakliyat' || sectorKey === 'agir_nakliye');
  var isLaunchApplied = false;

  // İndirim Uyarı Satırı DOM Elementleri
  var elDiscountRow = document.getElementById('launchDiscountRow');
  var elDiscountText = document.getElementById('launchDiscountText');
  if(elDiscountRow) elDiscountRow.classList.add('hidden'); // Her hesaplamada önce gizle

  if (months === 12 && isLaunchEligible) {
      if (scope === 'single_city') {
          finalFee = isHeavyTransport ? 3000 : 1000;
          isLaunchApplied = true;
          if(elDiscountRow && elDiscountText) {
              elDiscountText.innerText = "🎁 Lansman Fırsatı: İlinize Özel Sabit Fiyat!";
              elDiscountRow.classList.remove('hidden');
          }
      } else if (scope === 'multi_city' || scope === 'all_turkey') {
          finalFee = Math.round(originalFee * 0.5); 
          isLaunchApplied = true;
          if(elDiscountRow && elDiscountText) {
              elDiscountText.innerText = "🎁 İlk 20 Kotası: Ekstra %50 İndirim!";
              elDiscountRow.classList.remove('hidden');
          }
      }
  } else if (window.isPlusRenewal) {
      finalFee = Math.round(originalFee * 0.5);
      if(elDiscountRow && elDiscountText) {
          elDiscountText.innerText = "🎁 Yenilemeye Özel: %50 İndirim!";
          elDiscountRow.classList.remove('hidden');
      }
  }
  
  if (months === 12 && finalFee < 1000) {
      finalFee = 1000;
  }
  
  var elSec = document.getElementById('summarySector');
  var elFac = document.getElementById('summaryFactor');
  var elTot = document.getElementById('summaryTotalFee');
  
  if(elSec) elSec.innerText = currentProUser.categoryTitle + ' (Çarpan: ' + sectorMultiplier + ')';
  if(elFac) elFac.innerText = city + ' / Rekabet: ' + competitionFactor.toFixed(2);
  
  if(elTot) {
      if (isLaunchApplied || window.isPlusRenewal || originalFee !== finalFee) {
          elTot.innerHTML = '<span class="line-through text-slate-400 text-sm mr-2">' + originalFee.toLocaleString('tr-TR') + ' TL</span><span class="text-green-600">' + finalFee.toLocaleString('tr-TR') + ' TL</span>';
      } else {
          elTot.innerText = finalFee.toLocaleString('tr-TR') + ' TL';
      }
  }
  // YENİ EKLENEN SATIR: Hesaplanan son fiyatı ödeme fonksiyonuna aktarmak için hafızada tutuyoruz
  window.currentPlusFee = finalFee;
}
async function completePlusSubscription(packageId, price) {
    try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        
        if (!token || !userId) {
            alert("Oturum süreniz dolmuş, lütfen tekrar giriş yapın.");
            return;
        }

        const modal = document.getElementById('paymentModal');
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        // 1. Aşama: Yükleniyor Ekranı
        modal.innerHTML = `
            <div class="bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl relative text-center">
                <button onclick="closePaymentModal()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-xl font-bold">&times;</button>
                <i class="fa-solid fa-circle-notch fa-spin text-4xl text-orange-500 mb-4 inline-block"></i>
                <h3 class="text-xl font-bold text-slate-800">Güvenli Ödeme Ekranı Hazırlanıyor...</h3>
                <p class="text-sm text-slate-500 mt-2">iyzico altyapısı ile şifrelenmiş bağlantı kuruluyor.</p>
            </div>
        `;

        // 2. Aşama: Backend'e iyzico formu oluşturması için istek atıyoruz
        const response = await fetch('https://tamonda-backend.onrender.com/api/payment/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ packageId, price, userId })
        });

        const data = await response.json();

        if (data.success && data.checkoutFormContent) {
            // 3. Aşama: iyzico formunun çizileceği alanı oluşturuyoruz
            modal.innerHTML = `
                <div class="relative bg-white/95 rounded-2xl w-full max-w-2xl p-4 shadow-2xl flex flex-col h-[90vh] md:h-auto overflow-y-auto">
                    <button onclick="closePaymentModal()" class="absolute top-4 right-4 z-50 text-slate-500 hover:text-slate-800 text-2xl font-bold bg-white rounded-full w-8 h-8 flex items-center justify-center shadow">&times;</button>
                    <!-- İYZİCO FORMUNUN OTOMATİK ÇİZİLECEĞİ DİV -->
                    <div id="iyzipay-checkout-form" class="responsive w-full mt-6"></div>
                </div>
            `;
            
            // iyzico API'sinden gelen script'i sayfaya ekleyip çalışmasını (render edilmesini) sağlıyoruz
            const scriptContainer = document.createElement('div');
            scriptContainer.innerHTML = data.checkoutFormContent;
            
            // Vanilla JS'de innerHTML ile gelen <script> tagleri otomatik çalışmaz, manuel tetikliyoruz
            const scripts = scriptContainer.getElementsByTagName('script');
            for (let i = 0; i < scripts.length; i++) {
                const newScript = document.createElement('script');
                newScript.text = scripts[i].text;
                // Eğer src özelliği varsa (harici script), onu da kopyala
                if(scripts[i].src) {
                    newScript.src = scripts[i].src;
                }
                document.body.appendChild(newScript);
            }

        } else {
            alert("Ödeme başlatılamadı: " + (data.message || "Bilinmeyen bir hata oluştu."));
            closePaymentModal();
        }

    } catch (error) {
        console.error("Ödeme İşlemi Hatası:", error);
        alert("Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edin.");
        closePaymentModal();
    }
}

// YENİ EKLENEN: PayTR iFrame'inden Dönen "Başarılı / Başarısız" Sinyallerini Dinleme
window.addEventListener('message', function(event) {
    // Güvenlik: Sadece beklediğimiz sinyalleri yakala
    if (event.data.status === 'success') {
        document.getElementById('paymentModal').classList.add('hidden');
        alert("Tebrikler! Ödemeniz başarıyla tamamlandı. Plus yetkileriniz hesabınıza tanımlandı.");
        
        // Veritabanı arkaplanda (Webhook ile) güncellendiği için, güncel paketi sunucudan almak adına sayfayı yeniliyoruz
        window.location.reload(); 
    } 
    else if (event.data.status === 'fail') {
        document.getElementById('paymentModal').classList.add('hidden');
        alert("Ödeme işlemi başarısız oldu veya tarafınızca iptal edildi. Lütfen tekrar deneyiniz.");
    }
});
// --- YENİ EKLENEN SAHA PERSONELİ FRONTEND FONKSİYONLARI ---

window.assignAdminPromoter = async function(phoneArg) {
    var phoneInput = document.getElementById('adminNewPromoterPhone');
    var phone = phoneArg || (phoneInput ? phoneInput.value.trim() : '');
    
    if(!phone || phone.length < 10) {
        alert("Lütfen geçerli bir telefon numarası giriniz.");
        return;
    }

    try {
        var token = localStorage.getItem('tamonda_admin_token');
        // DÜZELTME: /api/admin/ yerine /api/auth/admin/ olarak güncellendi
        const res = await fetch(`${window.API_BASE_URL}/api/auth/admin/promoter/assign`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ targetPhone: phone })
        });
        
        const data = await res.json();
        if(data.success) {
            alert(`Saha personeli başarıyla atandı!\nÜretilen Referans Kodu: ${data.referralCode}`);
            if(phoneInput) phoneInput.value = '';
            
            var editModal = document.getElementById('adminEditProModal');
            if (editModal && !editModal.classList.contains('hidden')) {
                editModal.classList.add('hidden');
            }
            
            switchAdminTab('promoter');
        } else {
            alert("Hata: " + data.message);
        }
    } catch(err) {
        alert("Sunucu bağlantı hatası.");
        console.error(err);
    }
};

window.adminLoadedPromoters = []; // Verileri filtrelemek için hafızada tutuyoruz

window.loadAdminPromoterReport = async function() {
    var tbody = document.getElementById('adminPromoterTableBody');
    if(!tbody) return;
    tbody.innerHTML = '<tr><td colspan="4" class="p-4 text-center text-slate-400 italic text-xs"><i class="fa-solid fa-spinner fa-spin mr-2"></i>Rapor çekiliyor...</td></tr>';

    try {
        var token = localStorage.getItem('tamonda_admin_token');
        const res = await fetch(`${window.API_BASE_URL}/api/auth/admin/promoter/report`, {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        
        const data = await res.json();
        if(data.success) {
            window.adminLoadedPromoters = data.report || [];
            renderPromoterTable(window.adminLoadedPromoters);
        } else {
            tbody.innerHTML = '<tr><td colspan="4" class="p-4 text-center text-red-500 text-xs">Rapor çekilemedi.</td></tr>';
        }
    } catch(err) {
        tbody.innerHTML = '<tr><td colspan="4" class="p-4 text-center text-red-500 text-xs">Bağlantı hatası.</td></tr>';
    }
};

window.renderPromoterTable = function(dataArray) {
    var tbody = document.getElementById('adminPromoterTableBody');
    if(!tbody) return;

    if(!dataArray || dataArray.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="p-4 text-center text-slate-400 italic text-xs">Kriterlere uygun saha personeli bulunamadı.</td></tr>';
        return;
    }

    var html = '';
    dataArray.forEach(function(p) {
        html += `
            <tr class="border-b border-slate-100 hover:bg-slate-50 transition">
                <td class="p-3">
                    <div class="font-bold text-slate-700">${p.name}</div>
                    <div class="text-[10px] text-slate-400">${p.phone}</div>
                </td>
                <td class="p-3 text-center">
                    <span class="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-lg font-black text-sm tracking-widest">${p.referralCode}</span>
                </td>
                <td class="p-3 text-center">
                    <span class="font-bold text-slate-700 text-sm">${p.totalPros}</span>
                </td>
                <td class="p-3 text-center">
                    <span class="font-bold text-emerald-600 text-sm">${p.plusPros}</span>
                </td>
                <td class="p-3 text-center">
                    <button type="button" onclick="openEarningsModal('${p.id}')" class="bg-slate-800 hover:bg-slate-900 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold shadow transition flex items-center justify-center gap-1 mx-auto">
                        <i class="fa-solid fa-wallet"></i> Detay / Öde
                    </button>
                </td>
            </tr>
        `;
    });
    tbody.innerHTML = html;
};

// Klavyeden her tuşa basıldığında anında filtreleyen fonksiyon
window.filterPromoterTable = function() {
    var keyword = document.getElementById('adminFilterPromoter').value.trim().toLocaleLowerCase('tr');
    
    if(!keyword) {
        renderPromoterTable(window.adminLoadedPromoters);
        return;
    }

    var filtered = window.adminLoadedPromoters.filter(function(p) {
        var matchName = p.name && p.name.toLocaleLowerCase('tr').includes(keyword);
        var matchPhone = p.phone && p.phone.includes(keyword);
        var matchCode = p.referralCode && p.referralCode.toLocaleLowerCase('tr').includes(keyword);
        
        return matchName || matchPhone || matchCode;
    });

    renderPromoterTable(filtered);
};
// MÜŞTERİ PANELİ GİRİŞ İŞLEMLERİ
// ==========================================
async function openOwnerLoginModal() {
  var modal = document.getElementById('ownerModal');
  if (modal) modal.classList.remove('hidden');

  var token = localStorage.getItem('tamonda_token');

  // Token veya halihazırda bellekte olan bir telefon numarası varsa doğrudan paneli aç
  if (token || activeOwnerPhone) {
    var elArea = document.getElementById('ownerLoginArea');
    var elDash = document.getElementById('ownerDashboardArea');
    var elDisp = document.getElementById('ownerActivePhoneDisplay');

    if(elArea) elArea.classList.add('hidden');
    if(elDash) elDash.classList.remove('hidden');

    // Token var ama activeOwnerPhone henüz bellekte yoksa backend'den çek
    if (token && !activeOwnerPhone) {
        try {
            const res = await fetch(`${window.API_BASE_URL}/api/auth/profile`, {
                headers: { 'Authorization': 'Bearer ' + token }
            });
            const data = await res.json();
            if(data.success && data.user) {
                activeOwnerPhone = data.user.phone;
            }
        } catch(e) { 
            console.error("Profil bilgisi çekilemedi, token geçersiz olabilir:", e); 
        }
    }

    if(elDisp && activeOwnerPhone) elDisp.innerText = activeOwnerPhone;
    if(typeof renderOwnerDemands === 'function') renderOwnerDemands(activeOwnerPhone);

  } else {
    // Oturum yoksa SMS doğrulama ekranını (Login Area) göster
    var elArea = document.getElementById('ownerLoginArea');
    var elDash = document.getElementById('ownerDashboardArea');
    var elOtp = document.getElementById('ownerOtpArea');
    var btnAction = document.getElementById('btnOwnerLoginAction');
    var phoneInp = document.getElementById('ownerPhoneInput');
    
    ownerLoginStep = 1;
    if(phoneInp) phoneInp.value = '';
    if(elOtp) { elOtp.classList.add('hidden'); document.getElementById('ownerOtpInput').value = ''; }
    if(btnAction) btnAction.innerText = 'SMS Kodu Gönder';
    
    if(elArea) elArea.classList.remove('hidden');
    if(elDash) elDash.classList.add('hidden');
  }
}
window.openOwnerDashboardForPhone = function(phone) {
    // İlan verme adımında kullanılan telefonu aktif kullanıcı olarak belirle
    activeOwnerPhone = phone;
    
    // İlan formunu arka planda ilk adıma (Hizmet Seçimi) döndür
    if (typeof goToStep === 'function') {
        goToStep(1);
    }
    
    // --- YENİ EKLENEN KISIM: İlan Verme Modalını Kapat ---
    // (Projedeki genel standart demandModal ID'sidir, eğer farklıysa güncelleyebilirsin)
    var demandModal = document.getElementById('demandModal'); 
    if (demandModal) {
        demandModal.classList.add('hidden');
    } else if (typeof closeDemandModal === 'function') {
        closeDemandModal(); // Eğer projende özel bir kapatma fonksiyonu varsa onu tetikler
    }
    // --- YENİ EKLENEN KISIM SONU ---

    // Doğrudan Müşteri panelini aç (Token olduğu için SMS atlanacak)
    openOwnerLoginModal();
};
function closeOwnerModal() {
  var modal = document.getElementById('ownerModal');
  if (modal) modal.classList.add('hidden');
}

async function handleOwnerLogin() {
  var phoneInput = document.getElementById('ownerPhoneInput');
  var phone = phoneInput ? phoneInput.value.trim() : '';
  
  var cleanOwnerPhone = phone.replace(/\D/g, '');
  if (cleanOwnerPhone.startsWith('0')) { cleanOwnerPhone = cleanOwnerPhone.substring(1); }

  if (!/^5\d{9}$/.test(cleanOwnerPhone)) {
    alert('Lütfen geçerli telefon numaranızı başında sıfır (0) olmadan, 10 haneli giriniz (Örn: 5321112233).');
    return;
  }
  
  if (ownerLoginStep === 1) {
    try {
      const response = await fetch(`${window.API_BASE_URL}/api/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanOwnerPhone })
      });
      const data = await response.json();
      
      if (data.success) {
        document.getElementById('ownerOtpArea').classList.remove('hidden');
        document.getElementById('btnOwnerLoginAction').innerText = 'Doğrula & İlanlarımı Gör';
        ownerLoginStep = 2;
        // Test aşaması için konsolda OTP kodunu gösteriyoruz
        console.log("Müşteri OTP Kodu (Test):", data.debugOtp);
      } else {
        alert(data.message || 'SMS kodu gönderilemedi.');
      }
    } catch (error) {
      console.error('OTP Gönderim Hatası:', error);
      alert('Sunucuya bağlanılamadı. Backend çalışıyor mu?');
    }
  } else {
    var otpVal = document.getElementById('ownerOtpInput').value.trim();
    if (!otpVal) { alert('Lütfen SMS kodunu giriniz.'); return; }

    try {
      const response = await fetch(`${window.API_BASE_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanOwnerPhone, otpCode: otpVal })
      });
      const data = await response.json();

      if (data.success) {
        // Backend'den dönen token'ı API isteklerinde kullanmak üzere kaydediyoruz
        localStorage.setItem('tamonda_token', data.token);
        
        activeOwnerPhone = cleanOwnerPhone;
        var elArea = document.getElementById('ownerLoginArea');
        var elDash = document.getElementById('ownerDashboardArea');
        var elDisp = document.getElementById('ownerActivePhoneDisplay');
        if(elArea) elArea.classList.add('hidden');
        if(elDash) elDash.classList.remove('hidden');
        if(elDisp) elDisp.innerText = activeOwnerPhone;
        
        if(typeof renderOwnerDemands === 'function') renderOwnerDemands(activeOwnerPhone);
        
        ownerLoginStep = 1;
        document.getElementById('ownerOtpArea').classList.add('hidden');
        document.getElementById('btnOwnerLoginAction').innerText = 'SMS Kodu Gönder';
        document.getElementById('ownerOtpInput').value = '';
      } else {
        alert(data.message || 'Hatalı SMS kodu!');
      }
    } catch (error) {
      console.error('OTP Doğrulama Hatası:', error);
      alert('Doğrulama sırasında sunucuya bağlanılamadı.');
    }
  }
}
// GÜNCELLENMİŞ: Çıkış Yapma ve Form Temizleme İşlemi
function logoutOwner() {
  activeOwnerPhone = null; 
  ownerLoginStep = 1;

  // 1. Kritik Temizlik: Token'ı sil ki sistem çıkış yapıldığını anlasın
  localStorage.removeItem('tamonda_token');

  // 2. Müşteri Panelindeki Arayüz Temizliği
  var phoneInput = document.getElementById('ownerPhoneInput');
  var elArea = document.getElementById('ownerLoginArea');
  var elDash = document.getElementById('ownerDashboardArea');
  var elOtp = document.getElementById('ownerOtpArea');
  var btnAction = document.getElementById('btnOwnerLoginAction');
  
  if(phoneInput) phoneInput.value = '';
  if(elOtp) { elOtp.classList.add('hidden'); document.getElementById('ownerOtpInput').value = ''; }
  if(btnAction) btnAction.innerText = 'SMS Kodu Gönder';
  
  if(elArea) elArea.classList.remove('hidden');
  if(elDash) elDash.classList.add('hidden');

  // 3. İlan Verme Formundaki Kilitleri ve Değerleri Zorla Temizleme
  var inpNameEl = document.getElementById('inpName');
  var inpPhoneEl = document.getElementById('inpPhone');
  var submitBtn = document.querySelector('button[onclick="sendOtpCode()"]');

  if (inpNameEl && inpPhoneEl) {
      // Kilitleri ve grileşmiş görünümleri kaldır
      inpNameEl.removeAttribute('readonly');
      inpNameEl.classList.remove('bg-slate-200', 'text-slate-500', 'cursor-not-allowed', 'opacity-70');
      inpNameEl.value = ''; 

      inpPhoneEl.removeAttribute('readonly');
      inpPhoneEl.classList.remove('bg-slate-200', 'text-slate-500', 'cursor-not-allowed', 'opacity-70');
      inpPhoneEl.value = ''; 
  }
  
  if (submitBtn) {
      submitBtn.innerText = "SMS Onayı Al";
  }

  // 4. Müşteriyi tam olarak ana ekrana (1. Adıma) döndür ki her şey sıfırlansın
  if(typeof goToStep === 'function') {
      goToStep(1);
  }
}
window.ownerCurrentTab = 'active';

async function renderOwnerDemands(phone) {
  var container = document.getElementById('ownerDemandsContainer');
  if (!container) return;
  
  container.innerHTML = '<div class="text-xs text-slate-400 italic text-center py-6 bg-slate-50 rounded-xl border border-slate-200"><i class="fa-solid fa-spinner fa-spin mr-2"></i>İlanlarınız yükleniyor...</div>';

  try {
    var token = localStorage.getItem('tamonda_token');
    const response = await fetch(`${window.API_BASE_URL}/api/demands/owner/list`, {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const data = await response.json();

    if (!data.success) {
      container.innerHTML = '<div class="text-xs text-red-500 italic text-center py-6 bg-red-50 rounded-xl border border-red-200">İlanlar çekilirken hata oluştu. Lütfen tekrar giriş yapın.</div>';
      return;
    }

    var userDemands = data.demands || [];
    var activeDemands = userDemands.filter(d => d.status === 'active');
    var passiveDemands = userDemands.filter(d => d.status === 'passive');
    var completedDemands = userDemands.filter(d => d.status === 'completed');

    var displayDemands = window.ownerCurrentTab === 'active' ? activeDemands : 
                         (window.ownerCurrentTab === 'passive' ? passiveDemands : completedDemands);

    // 3'LÜ SEKME YAPISI
    var html = '<div class="flex bg-slate-100 p-1 rounded-xl mb-4 overflow-x-auto no-scrollbar gap-1">' +
                 '<button onclick="window.ownerCurrentTab=\'active\'; renderOwnerDemands();" class="flex-1 min-w-[90px] py-2 text-[11px] font-bold rounded-lg transition ' + (window.ownerCurrentTab === 'active' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700') + '">Aktif (' + activeDemands.length + ')</button>' +
                 '<button onclick="window.ownerCurrentTab=\'passive\'; renderOwnerDemands();" class="flex-1 min-w-[90px] py-2 text-[11px] font-bold rounded-lg transition ' + (window.ownerCurrentTab === 'passive' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700') + '">Pasif (' + passiveDemands.length + ')</button>' +
                 '<button onclick="window.ownerCurrentTab=\'completed\'; renderOwnerDemands();" class="flex-1 min-w-[90px] py-2 text-[11px] font-bold rounded-lg transition ' + (window.ownerCurrentTab === 'completed' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700') + '">Tamamlanan (' + completedDemands.length + ')</button>' +
               '</div>';

    if (displayDemands.length === 0) {
      html += '<div class="text-xs text-slate-400 italic text-center py-6 bg-slate-50 rounded-xl border border-slate-200">Bu bölümde ilan bulunamadı.</div>';
      container.innerHTML = html;
      return;
    }

    var listHtml = '';
    displayDemands.forEach(function(demand) {
      var offersHtml = '';
      var hiddenOffersHtml = '';
      var hiddenArray = demand.hiddenOffers || [];
      
      var visibleOffers = (demand.offers || []).filter(o => !hiddenArray.includes(o.id));
      var hiddenOffersList = (demand.offers || []).filter(o => hiddenArray.includes(o.id));

      // YENİ EKLENEN: Anlaşılan Ustanın Genel Puanını Hesaplama
      var agreedOffer = null;
      if (demand.agreedPro) {
          agreedOffer = (demand.offers || []).find(o => o.proPhone === demand.agreedPro.proPhone);
      }
      var agreedAvg = agreedOffer && agreedOffer.ratingAvg ? agreedOffer.ratingAvg : 0;
var agreedCount = agreedOffer && agreedOffer.ratingCount ? agreedOffer.ratingCount : 0;
var agreedStarsHtml = agreedCount > 0 
    ? ' <button onclick="window.openProReviews(\'' + demand.agreedPro.proPhone + '\')" class="ml-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-2 py-0.5 rounded text-[11px] font-black inline-flex items-center hover:bg-emerald-100 transition shadow-sm" title="Yorumları Oku"><i class="fa-solid fa-star mr-1"></i>' + agreedAvg + ' <span class="text-emerald-600 font-medium ml-1">(' + agreedCount + ' İş)</span></button>' 
    : ' <span class="text-slate-400 text-[9px] font-normal ml-2 bg-slate-200 px-1.5 py-0.5 rounded whitespace-nowrap">Yeni Usta</span>';
      if (window.ownerCurrentTab === 'active') {
          // GÖRÜNÜR TEKLİFLER
          if (visibleOffers.length === 0) {
            offersHtml = '<div class="text-slate-400 text-[11px] italic text-center py-3 bg-slate-50 rounded-xl border border-slate-100">Henüz yeni teklif yok.</div>';
          } else {
            visibleOffers.forEach(function(offer) {
              // YENİ EKLENEN: Teklif Veren Ustanın Puanı
              var offerAvg = offer.ratingAvg || 0;
var offerCount = offer.ratingCount || 0;
var offerStars = offerCount > 0 
    ? ' <button onclick="window.openProReviews(\'' + offer.proPhone + '\')" class="ml-2 bg-amber-50 border border-amber-200 text-amber-600 px-1.5 py-0.5 rounded text-[10px] font-black flex items-center hover:bg-amber-100 transition shadow-sm" title="Yorumları Oku"><i class="fa-solid fa-star mr-1"></i>' + offerAvg + ' <span class="text-slate-500 font-medium ml-1">(' + offerCount + ')</span></button>' 
    : ' <span class="text-slate-400 text-[9px] font-normal ml-2 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 whitespace-nowrap">Yeni</span>'; 
              offersHtml += '<div class="bg-white p-3 rounded-xl border border-orange-100 shadow-sm space-y-2 mb-2">' +
                              '<div class="flex justify-between items-start font-bold text-slate-900">' +
                                '<div class="flex flex-col">' +
                                  '<span class="flex items-center text-sm font-black uppercase text-slate-800"><i class="fa-solid fa-user-gear text-orange-500 mr-1.5"></i>' + offer.proName + offerStars + '</span>' +
                                  '<span class="text-[9px] text-slate-400/80 italic ml-5 font-serif tracking-wide">büyük usta, aradığın her şey TamOnda</span>' +
                                '</div>' +
                                '<span class="text-orange-600 font-black text-sm whitespace-nowrap">' + offer.price + ' TL</span>' +
                              '</div>' +
                              '<div class="text-slate-600 italic text-[11px]">"' + offer.message + '"</div>' +
                              '<div class="flex gap-2 pt-2 mt-1 border-t border-slate-50">' +
                                '<button onclick="openAcceptModal(\'' + demand._id + '\', \'' + offer.id + '\', \'' + (offer.proPhone || '') + '\')" class="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg text-[10px] font-bold transition shadow-sm"><i class="fa-solid fa-check mr-1"></i> Kabul Et</button>' +
                                '<button onclick="hideProOffer(\'' + demand._id + '\', \'' + offer.id + '\')" class="flex-1 bg-slate-100 hover:bg-rose-500 hover:text-white text-slate-500 py-2 rounded-lg text-[10px] font-bold transition"><i class="fa-solid fa-eye-slash mr-1"></i> Gizle</button>' +
                              '</div>' +
                            '</div>';
            });
          }

          // GİZLENEN TEKLİFLER
          if (hiddenOffersList.length > 0) {
            hiddenOffersList.forEach(function(offer) {
              // YENİ EKLENEN: Gizlenen Teklif Veren Ustanın Puanı
var offerAvg = offer.ratingAvg || 0;
var offerCount = offer.ratingCount || 0;
var offerStars = offerCount > 0 
    ? ' <button onclick="window.openProReviews(\'' + offer.proPhone + '\')" class="ml-2 bg-slate-100 border border-slate-300 text-amber-500 px-1.5 py-0.5 rounded text-[10px] font-black flex items-center hover:bg-slate-200 transition shadow-sm" title="Yorumları Oku"><i class="fa-solid fa-star mr-1"></i>' + offerAvg + '</button>' 
    : ' <span class="text-slate-400 text-[9px] font-normal ml-1 whitespace-nowrap">Yeni</span>';
              hiddenOffersHtml += '<div class="bg-slate-50 p-3 rounded-xl border border-slate-200 shadow-sm space-y-2 mb-2 opacity-80">' +
                                    '<div class="flex justify-between items-start font-bold text-slate-500">' +
                                      '<div class="flex flex-col">' +
                                        '<span class="flex items-center text-sm font-black uppercase"><i class="fa-solid fa-user-gear text-slate-400 mr-1.5"></i>' + offer.proName + offerStars + '</span>' +
                                        '<span class="text-[9px] text-slate-400/60 italic ml-5 font-serif tracking-wide">büyük usta, aradığın her şey TamOnda</span>' +
                                      '</div>' +
                                      '<span class="text-slate-500 font-black text-sm whitespace-nowrap">' + offer.price + ' TL</span>' +
                                    '</div>' +
                                    '<div class="text-slate-500 italic text-[11px]">"' + offer.message + '"</div>' +
                                    '<div class="pt-2 mt-1 border-t border-slate-200">' +
                                      '<button onclick="unhideProOffer(\'' + demand._id + '\', \'' + offer.id + '\')" class="w-full bg-slate-800 hover:bg-slate-900 text-white py-2 rounded-lg text-[10px] font-bold transition shadow-sm"><i class="fa-solid fa-eye mr-1"></i> Görünür Yap (Geri Al)</button>' +
                                    '</div>' +
                                  '</div>';
            });
          }
      }

      var timeStr = demand.createdAt ? new Date(demand.createdAt).toLocaleDateString('tr-TR') : 'Az önce';
      var summaryText = "";
if (demand.params && typeof demand.params === 'object') {
    summaryText = Object.values(demand.params).join(' • ');
} else if (demand.summary) {
    summaryText = demand.summary; // Eski veriler için geriye dönük uyumluluk
} else {
    summaryText = 'Detaylar açıklamadadır.';
}
      var toggleContentId = 'offers_content_' + demand._id; 
      var toggleHiddenId = 'hidden_content_' + demand._id; 
      
      var headerBadge = window.ownerCurrentTab === 'active' 
        ? '<span class="font-bold bg-orange-100 text-orange-800 px-2 py-0.5 rounded-md">' + demand.categoryTitle + '</span>'
        : (window.ownerCurrentTab === 'passive' 
            ? '<span class="font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-md flex items-center"><i class="fa-solid fa-lock mr-1"></i> Pasif: ' + demand.categoryTitle + '</span>'
            : '<span class="font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md flex items-center"><i class="fa-solid fa-check-circle mr-1"></i> Tamamlandı: ' + demand.categoryTitle + '</span>');

      listHtml += 
        '<div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3 text-xs mb-4">' +
          '<div class="flex justify-between items-center border-b border-slate-200 pb-2">' +
            headerBadge +
            '<div class="flex items-center gap-2">' +
              '<span class="text-slate-400">' + timeStr + '</span>' +
              '<button onclick="deleteCustomerDemand(\'' + demand._id + '\')" class="text-red-500 hover:text-white bg-red-50 hover:bg-red-500 px-2 py-1 rounded text-[10px] font-bold transition shadow-sm" title="Tamamen Sil"><i class="fa-solid fa-trash"></i></button>' +
            '</div>' +
          '</div>' +
          '<div class="font-medium text-slate-700 mt-2"><i class="fa-solid fa-location-dot text-orange-500 mr-1"></i> ' + demand.fromCity + ' / ' + demand.fromDistrict + '</div>' +
          '<div class="bg-white p-2.5 rounded-xl border border-slate-100 font-medium text-slate-800 mt-2"><strong>Özet:</strong> ' + summaryText + '</div>' +
          
          (window.ownerCurrentTab === 'active' ? 
            '<div class="pt-2">' +
              '<button onclick="document.getElementById(\'' + toggleContentId + '\').classList.toggle(\'hidden\')" class="w-full flex items-center justify-between bg-white border border-slate-200 hover:bg-orange-50 p-2.5 rounded-lg transition font-bold text-slate-800 shadow-sm">' +
                '<span>Gelen Teklifleri Gör</span>' +
                '<div class="flex items-center gap-2">' +
                  '<span class="bg-orange-500 text-white px-2 py-0.5 rounded-full text-[10px]">' + visibleOffers.length + ' Yeni</span>' +
                  '<i class="fa-solid fa-chevron-down text-slate-500"></i>' +
                '</div>' +
              '</button>' +
              '<div id="' + toggleContentId + '" class="space-y-2 mt-2 hidden">' + offersHtml + '</div>' +
              
              (hiddenOffersList.length > 0 ? 
                '<button onclick="document.getElementById(\'' + toggleHiddenId + '\').classList.toggle(\'hidden\')" class="w-full flex items-center justify-between bg-slate-100 border border-slate-200 hover:bg-slate-200 p-2 rounded-lg transition font-bold text-slate-600 shadow-sm mt-3">' +
                  '<span><i class="fa-solid fa-eye-slash mr-1"></i> Gizlenen Teklifler</span>' +
                  '<div class="flex items-center gap-2">' +
                    '<span class="bg-slate-300 text-slate-700 px-2 py-0.5 rounded-full text-[10px]">' + hiddenOffersList.length + ' Gizli</span>' +
                    '<i class="fa-solid fa-chevron-down text-slate-400"></i>' +
                  '</div>' +
                '</button>' +
                '<div id="' + toggleHiddenId + '" class="space-y-2 mt-2 hidden">' + hiddenOffersHtml + '</div>' 
              : '') +
            '</div>'
          : (window.ownerCurrentTab === 'passive' ? 
            '<div class="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">' +
               '<div class="font-bold text-emerald-800 text-[11px] mb-2 flex items-center flex-wrap"><i class="fa-solid fa-handshake mr-1"></i> Anlaşılan Usta: ' + (demand.agreedPro ? demand.agreedPro.proName : 'Bilinmiyor') + agreedStarsHtml + '</div>' +
               '<button onclick="openCompleteJobModal(\'' + demand._id + '\')" class="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-[10px] font-bold shadow transition mb-1"><i class="fa-solid fa-star-half-stroke mr-1"></i> İşi Tamamla & Ustayı Değerlendir</button>' +
               '<button onclick="republishPassiveDemand(\'' + demand._id + '\')" class="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-[10px] font-bold shadow transition"><i class="fa-solid fa-rotate-right mr-1"></i> İlanı Tekrar Aktif Et (Yeniden Yayınla)</button>' +
            '</div>'
          : 
            '<div class="mt-3 p-3 bg-slate-100 border border-slate-200 rounded-xl space-y-2">' +
               '<div class="font-bold text-slate-800 text-[11px] mb-1 flex items-center flex-wrap"><i class="fa-solid fa-check-double text-emerald-500 mr-1"></i> İşi Yapan Usta: ' + (demand.agreedPro ? demand.agreedPro.proName : 'Bilinmiyor') + agreedStarsHtml + '</div>' +
               '<div class="text-[10px] text-slate-600 font-medium flex justify-between items-center"><span>Verdiğiniz Puan:</span> <strong class="' + (demand.rating > 0 ? 'text-amber-500 text-xs' : 'text-slate-500') + '">' + (demand.rating > 0 ? demand.rating + ' <i class="fa-solid fa-star"></i>' : (demand.rating === -1 ? 'Bekliyor (WhatsApp Yanıtı Bekleniyor)' : 'Puan Verilmedi')) + '</strong></div>' +
               '<button onclick="renderOwnerDemands(activeOwnerPhone)" class="w-full mt-1 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-[10px] font-bold transition"><i class="fa-solid fa-rotate mr-1"></i> Puan Durumunu Yenile</button>' +
            '</div>'
          )) +
        '</div>';
    });
    
    container.innerHTML = html + listHtml;
  } catch (err) {
    console.error("Hata:", err);
    container.innerHTML = '<div class="text-xs text-red-500 italic text-center py-6">Bağlantı hatası.</div>';
  }
}

// TEKLİFİ GİZLE
async function hideProOffer(demandId, offerId) {
  try {
    var token = localStorage.getItem('tamonda_token');
    await fetch(`${window.API_BASE_URL}/api/demands/owner/hide-offer/` + demandId, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify({ offerId: offerId })
    });
    renderOwnerDemands(); 
  } catch (e) { console.error(e); }
}

// TEKLİFİ GÖRÜNÜR YAP (GERİ AL) - YENİ EKLENEN
window.unhideProOffer = async function(demandId, offerId) {
  try {
    var token = localStorage.getItem('tamonda_token');
    await fetch(`${window.API_BASE_URL}/api/demands/owner/unhide-offer/` + demandId, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify({ offerId: offerId })
    });
    renderOwnerDemands(); 
  } catch (e) { console.error(e); }
};

// (Buradan sonraki openAcceptModal, submitAcceptOffer ve republishPassiveDemand fonksiyonları daha öncekiyle aynı kalacak)
// 1. TEKLİFİ GİZLEME (SESSİZ REDDET)
async function hideProOffer(demandId, offerId) {
  try {
    var token = localStorage.getItem('tamonda_token');
    await fetch(`${window.API_BASE_URL}/api/demands/owner/hide-offer/` + demandId, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify({ offerId: offerId })
    });
    renderOwnerDemands(); // UI'ı yenile, teklif kaybolsun
  } catch (e) { console.error(e); }
}

// 2. KABUL ET MODALINI AÇ
function openAcceptModal(demandId, offerId, proPhone) {
  document.getElementById('acceptDemandId').value = demandId;
  document.getElementById('acceptOfferId').value = offerId;
  document.getElementById('acceptProPhone').value = proPhone;
  document.getElementById('acceptJobDate').value = '';
  document.getElementById('acceptOfferModal').classList.remove('hidden');
}
// 3. TARİHİ SEÇİP KABUL ET VE İLETİŞİME GEÇ (3 Butonlu Güncel Versiyon)
window.submitAcceptOffer = async function(actionType) {
  var demandId = document.getElementById('acceptDemandId').value;
  var offerId = document.getElementById('acceptOfferId').value;
  var proPhone = document.getElementById('acceptProPhone').value;
  var jobDate = document.getElementById('acceptJobDate').value;

  if(!jobDate) { alert("Lütfen işin yapılacağı tarihi seçiniz."); return; }

  try {
    var token = localStorage.getItem('tamonda_token');
    const res = await fetch(`${window.API_BASE_URL}/api/demands/owner/accept-offer/` + demandId, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify({ offerId: offerId, jobDate: jobDate })
    });
    const data = await res.json();
    
    if(data.success) {
      document.getElementById('acceptOfferModal').classList.add('hidden');
      
      // Arayüzü canlı olarak güncelle
      if (typeof renderOwnerDemands === 'function') renderOwnerDemands(); 
      
      var cleanPhone = String(proPhone).replace(/\D/g, '');
      if(cleanPhone.startsWith('0')) cleanPhone = cleanPhone.substring(1);
      
      // Tıklanan butona göre yönlendirme yap
      if(actionType === 'wa') {
          var waText = "Merhaba, TamOnda üzerinden verdiğiniz teklifi kabul ettim. Seçtiğim işlem tarihi: " + new Date(jobDate).toLocaleDateString('tr-TR') + ". Detayları görüşebiliriz.";
          window.location.href = "https://wa.me/90" + cleanPhone + "?text=" + encodeURIComponent(waText);
      } else if(actionType === 'call') {
          window.location.href = "tel:+90" + cleanPhone; 
      } else {
          // 'only' aksiyonu: Sadece Anlaşmayı Onayla butonuna basıldıysa
          alert("Anlaşma sağlandı! İlanınız diğer ustalara kapatıldı.");
      }
    } else {
      alert(data.message || "İşlem başarısız oldu. Lütfen tekrar deneyin.");
    }
  } catch (e) { 
      alert("Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edin."); 
  }
};

// 4. PASİF İLANI TEKRAR YAYINLA
window.republishPassiveDemand = async function(demandId) {
  if(!confirm("İlanınız mevcut bilgileriyle aktif pazar yeri havuzuna tekrar eklenecektir. Onaylıyor musunuz?")) return;
  try {
    var token = localStorage.getItem('tamonda_token');
    const res = await fetch(`${window.API_BASE_URL}/api/demands/owner/republish/` + demandId, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + token }
    });
    if(res.ok) {
      window.ownerCurrentTab = 'active'; // Başarılıysa aktif sekmesine geçiş yap
      renderOwnerDemands();
    }
  } catch (e) { console.error(e); }
};
window.deleteCustomerDemand = async function(demandId) {
  if(!confirm("Bu ilanı tamamen silmek istediğinize emin misiniz? (Bu işlem geri alınamaz ve usta ekranlarından da kalkar)")) return;
  
  try {
    var token = localStorage.getItem('tamonda_token'); // İZOLASYON DÜZELTMESİ (Admin değil)
    const response = await fetch(`${window.API_BASE_URL}/api/demands/owner/delete/` + demandId, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + token }
    });
    
    const data = await response.json();
    if(data.success) {
      renderOwnerDemands(); // Silme başarılıysa listeyi yenile
    } else {
      alert("Hata: " + data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Sunucuya ulaşılamadı.");
  }
};
// Modal'ı açar ve o anki arama filtrelerini okur
window.openBulkWaModal = function() {
    const cityVal = document.getElementById('adminSearchCity').value.trim();
    const catSelect = document.getElementById('adminSearchCat');
    const catVal = catSelect.value;
    const catText = catSelect.options[catSelect.selectedIndex].text;

    document.getElementById('bulkWaCityLabel').innerText = cityVal ? cityVal : 'Tüm Şehirler';
    document.getElementById('bulkWaCatLabel').innerText = catVal ? catText : 'Tüm Sektörler';

    document.getElementById('bulkWaModal').classList.remove('hidden');
};

// API'ye hedef kitleyi ve mesajı gönderir
window.executeBulkWhatsApp = async function() {
    const message = document.getElementById('bulkWaMessage').value.trim();
    if (!message) return alert("Lütfen gönderilecek mesajı yazın.");

    const city = document.getElementById('adminSearchCity').value.trim();
    const category = document.getElementById('adminSearchCat').value;

    const btn = document.getElementById('btnSendBulkWa');
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> İşleniyor...';
    btn.disabled = true;

    try {
        const response = await fetch(`${window.API_BASE_URL}/api/admin/bulk-whatsapp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ city, category, message })
        });
        const data = await response.json();
        
        alert(data.message);
        
        if (data.success) {
            document.getElementById('bulkWaModal').classList.add('hidden');
            document.getElementById('bulkWaMessage').value = '';
        }
    } catch (error) {
        alert("Bağlantı hatası oluştu.");
    } finally {
        btn.innerHTML = '<i class="fa-brands fa-whatsapp text-lg"></i> Gönderimi Başlat';
        btn.disabled = false;
    }
};
// --- YENİ: İŞ TAMAMLANDI VE DEĞERLENDİRME İŞLEMLERİ ---
window.openCompleteJobModal = function(demandId) {
    document.getElementById('completeDemandId').value = demandId;
    document.getElementById('completeJobRating').value = 0; // Sıfırla
    
    // Yıldızları gri yap
    let stars = document.getElementById('starRatingContainer').children;
    for(let i=0; i<stars.length; i++) {
        stars[i].classList.remove('text-orange-400');
        stars[i].classList.add('text-slate-300');
    }
    
    document.getElementById('completeJobModal').classList.remove('hidden');
};

window.setJobRating = function(rating) {
    document.getElementById('completeJobRating').value = rating;
    let stars = document.getElementById('starRatingContainer').children;
    for(let i=0; i<stars.length; i++) {
        if(i < rating) {
            stars[i].classList.add('text-orange-400');
            stars[i].classList.remove('text-slate-300');
        } else {
            stars[i].classList.remove('text-orange-400');
            stars[i].classList.add('text-slate-300');
        }
    }
};
window.currentReviewPhone = '';
window.currentReviewPage = 1;

window.openProReviews = function(phone) {
    window.currentReviewPhone = phone;
    window.currentReviewPage = 1;
    document.getElementById('reviewStarFilter').value = "0";
    document.getElementById('reviewsModal').classList.remove('hidden');
    fetchProReviews();
};

window.fetchProReviews = async function() {
    var container = document.getElementById('reviewsListContainer');
    var paginationBox = document.getElementById('reviewsPagination');
    var filterVal = document.getElementById('reviewStarFilter').value;
    
    container.innerHTML = '<div class="text-center py-4 text-xs text-slate-400"><i class="fa-solid fa-spinner fa-spin mr-1"></i> Yorumlar yükleniyor...</div>';
    
    try {
        // YENİ EKLENEN: Token'ı localStorage'dan alıyoruz
        var token = localStorage.getItem('tamonda_token'); 
        
        // YENİ EKLENEN: Token'ı Authorization başlığı (headers) olarak sunucuya gönderiyoruz
        const res = await fetch(`${window.API_BASE_URL}/api/demands/pro/reviews?phone=${window.currentReviewPhone}&page=${window.currentReviewPage}&starFilter=${filterVal}`, {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        
        const data = await res.json();
        
        if (data.success) {
            container.innerHTML = '';
            if (data.reviews.length === 0) {
                container.innerHTML = '<div class="text-center py-4 text-xs text-slate-500 bg-slate-50 rounded-lg">Bu kritere uygun yorum bulunamadı.</div>';
            } else {
                data.reviews.forEach(r => {
                    var stars = Array(5).fill(0).map((_, i) => i < r.rating ? '<i class="fa-solid fa-star text-amber-400"></i>' : '<i class="fa-solid fa-star text-slate-200"></i>').join('');
                    var dateStr = new Date(r.date).toLocaleDateString('tr-TR');
                    
                    container.innerHTML += `
                        <div class="bg-slate-50 p-3 rounded-xl border border-slate-200">
                            <div class="flex justify-between items-center mb-1">
                                <span class="text-[10px] font-bold text-slate-700">${r.customerName}</span>
                                <span class="text-[9px] text-slate-400">${dateStr}</span>
                            </div>
                            <div class="text-xs mb-1">${stars}</div>
                            <div class="text-[11px] text-slate-600 italic">"${r.comment || 'Puan verildi, metin yazılmadı.'}"</div>
                        </div>`;
                });
            }
            
            // Sayfalama Okları
            var prevBtn = data.currentPage > 1 ? `<button onclick="window.currentReviewPage--; fetchProReviews();" class="text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg"><i class="fa-solid fa-chevron-left mr-1"></i>Önceki</button>` : `<div></div>`;
            var nextBtn = data.currentPage < data.totalPages ? `<button onclick="window.currentReviewPage++; fetchProReviews();" class="text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg">Sonraki<i class="fa-solid fa-chevron-right ml-1"></i></button>` : `<div></div>`;
            
            paginationBox.innerHTML = `${prevBtn}<span class="text-[10px] text-slate-400 font-bold">${data.currentPage} / ${data.totalPages || 1}</span>${nextBtn}`;
            
        } else {
            // YENİ EKLENEN: Sunucu tarafında bir hata dönerse ekrana bas (Örn: Token geçersiz)
            container.innerHTML = `<div class="text-center py-4 text-xs text-red-500">Yorumlar yüklenemedi: ${data.message}</div>`;
        }
    } catch (e) {
        container.innerHTML = '<div class="text-center py-4 text-xs text-red-500">Bağlantı hatası.</div>';
    }
};
window.submitCompleteJob = async function() {
    var demandId = document.getElementById('completeDemandId').value;
    var rating = parseInt(document.getElementById('completeJobRating').value);
    var comment = document.getElementById('completeJobComment').value.trim(); // YENİ
    
    try {
        var token = localStorage.getItem('tamonda_token');
        const res = await fetch(`${window.API_BASE_URL}/api/demands/owner/complete/` + demandId, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
            body: JSON.stringify({ rating: rating, comment: comment }) // YENİ EKLENDİ
        });
        const data = await res.json();
        
        if(data.success) {
            alert(data.message);
            document.getElementById('completeJobModal').classList.add('hidden');
            document.getElementById('completeJobComment').value = ''; // Alanı temizle
            renderOwnerDemands(); 
        } else {
            alert("Hata: " + data.message);
        }
    } catch (e) { console.error(e); }
};
window.openRecoveryModal = function() {
    document.getElementById('recOldPhone').value = '';
    document.getElementById('recTcNo').value = '';
    document.getElementById('recNewPhone').value = '';
    document.getElementById('recOtpInput').value = '';
    document.getElementById('recOtpArea').classList.add('hidden');
    document.getElementById('btnRequestRecoveryOtp').innerText = 'Yeni Numarama SMS Gönder';
    document.getElementById('recoveryModal').classList.remove('hidden');
};

window.closeRecoveryModal = function() {
    document.getElementById('recoveryModal').classList.add('hidden');
};

window.sendRecoveryOtp = async function() {
    var oldPhone = document.getElementById('recOldPhone').value.trim();
    var tcNo = document.getElementById('recTcNo').value.trim();
    var newPhone = document.getElementById('recNewPhone').value.trim();

    if (!oldPhone || !tcNo || !newPhone) {
        alert("Lütfen tüm alanları doldurun.");
        return;
    }

    var btn = document.getElementById('btnRequestRecoveryOtp');
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Bilgiler Kontrol Ediliyor...';
    btn.disabled = true;

    try {
        const res = await fetch(`${window.API_BASE_URL}/api/auth/pro/recover-phone/send-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ oldPhone: oldPhone, tcNo: tcNo, newPhone: newPhone })
        });
        const data = await res.json();
        
        if (data.success) {
            document.getElementById('recOtpArea').classList.remove('hidden');
            btn.innerText = 'SMS Gönderildi';
            console.log("🔑 [HESAP KURTARMA SMS TEST]:", data.debugOtp);
        } else {
            alert(data.message);
            btn.innerText = 'Yeni Numarama SMS Gönder';
            btn.disabled = false;
        }
    } catch(err) {
        alert("Sunucuya bağlanılamadı.");
        btn.innerText = 'Yeni Numarama SMS Gönder';
        btn.disabled = false;
    }
};

window.confirmRecoveryOtp = async function() {
    var oldPhone = document.getElementById('recOldPhone').value.trim();
    var newPhone = document.getElementById('recNewPhone').value.trim();
    var otpCode = document.getElementById('recOtpInput').value.trim();

    if (!otpCode) { alert("Lütfen SMS kodunu giriniz."); return; }

    try {
        const res = await fetch(`${window.API_BASE_URL}/api/auth/pro/recover-phone/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ oldPhone: oldPhone, newPhone: newPhone, otpCode: otpCode })
        });
        const data = await res.json();

        if (data.success) {
            alert(data.message);
            closeRecoveryModal();
            // Kurtarılan yeni numara ile giriş yapabilmesi için inputa otomatik numarayı yerleştir
            var loginPhoneInput = document.getElementById('loginPhone');
            if(loginPhoneInput) loginPhoneInput.value = newPhone;
        } else {
            alert(data.message);
        }
    } catch(err) {
        alert("Doğrulama sırasında hata oluştu.");
    }
};