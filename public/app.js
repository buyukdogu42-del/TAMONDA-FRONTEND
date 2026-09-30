// ==========================================
// DOSYA 3: app.js (MÜŞTERİ AKIŞI, USTA LİSTELEME VE ARAÇLAR)
// ==========================================
window.API_BASE_URL = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ? 'http://localhost:3000'
  : 'https://tamonda-backend.onrender.com';// Kategori Çubuğu Sağa/Sola Kaydırma Motoru
function scrollCategories(amount) {
  var container = document.getElementById('categoryPillContainer');
  if (container) {
    container.scrollBy({ left: amount, behavior: 'smooth' });
  }
}
// YENİ: Formlarda "Diğer" seçilince gizli metin kutusunu açan fonksiyon
window.toggleCustomInput = function(selectEl, fieldId) {
    var customInput = document.getElementById('custom_' + fieldId);
    if (customInput) {
        if (selectEl.value === '__diger__') {
            customInput.classList.remove('hidden');
            customInput.focus();
        } else {
            customInput.classList.add('hidden');
            customInput.value = ''; // Farklı seçenek işaretlenirse kutuyu temizle
        }
    }
};

function handleUniversalSearch(inputId, resultsId) {
  var val = document.getElementById(inputId).value.trim().toLocaleLowerCase('tr');
  var box = document.getElementById(resultsId);
  box.innerHTML = '';
  if(val.length < 2) { box.classList.add('hidden'); return; }

  var matches = serviceCatalog.filter(function(s) {
    return s.title.toLocaleLowerCase('tr').indexOf(val) !== -1 || s.desc.toLocaleLowerCase('tr').indexOf(val) !== -1;
  });

  if(!matches.length) {
    box.innerHTML = '<div class="px-3 py-2 text-slate-400 italic">Eşleşen hizmet bulunamadı</div>';
    box.classList.remove('hidden');
    return;
  }

  matches.forEach(function(m) {
    var row = document.createElement('div');
    row.className = 'px-3 py-2 hover:bg-orange-50 cursor-pointer flex items-center gap-2 text-slate-800 transition';
    row.innerHTML = '<i class="fa-solid ' + m.icon + ' text-orange-500"></i><div><span class="font-bold">' + m.title + '</span> <span class="text-slate-400 text-[10px]">(' + m.desc + ')</span></div>';
    row.onclick = function() {
      selectCategory(m.key, m.title, m.mainCat);
      document.getElementById(inputId).value = '';
      box.classList.add('hidden');
    };
    box.appendChild(row);
  });
  box.classList.remove('hidden');
}

function renderServiceCards(group) {
  var grid = document.getElementById('serviceCardsGrid');
  // EKLENEN KORUMA: Eğer sayfa usta.html ise bu div olmayacağı için işlemi sessizce durdur
  if (!grid) return; 

  grid.innerHTML = '';
  var list = group === 'all' ? serviceCatalog : serviceCatalog.filter(function(i){ return i.group === group; });

  list.forEach(function(item) {
    var card = document.createElement('button');
    card.type = 'button';
    
    // YENİ EKLENEN: VIP "DİĞER" KARTI KONTROLÜ VE TASARIMI
    if (item.key.endsWith('_diger')) {
        // Sonraki adımlarda "Diğer" yerine daha profesyonel bir başlık görünsün
        var customTitle = 'Özel Hizmet Talebi'; 
        card.onclick = function() { selectCategory(item.key, customTitle, item.mainCat); };
        
        // Tam satır kaplayan (col-span-2) ve dikkat çekici renk tonlarına sahip özel tasarım
        card.className = 'col-span-2 p-3.5 rounded-xl border-2 border-orange-300 hover:border-orange-500 text-left bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 transition shadow-sm group flex items-center gap-3';
        card.innerHTML = '<div class="w-10 h-10 min-w-[40px] rounded-full bg-white shadow-sm group-hover:bg-orange-500 group-hover:text-white text-orange-500 flex items-center justify-center text-lg transition"><i class="fa-solid fa-wand-magic-sparkles"></i></div><div class="flex-1"><div class="font-black text-[13px] text-orange-900">🔍 Aradığınız Hizmeti Bulamadınız mı?</div><div class="text-[10px] text-orange-800/80 font-medium leading-tight mt-0.5">Hiç dert etmeyin! İhtiyacınız olan işi kısaca anlatın, en uygun uzmanlarımız size özel teklif versin.</div></div>';
    } else {
        // Standart Hizmet Kartları
        card.onclick = function() { selectCategory(item.key, item.title, item.mainCat); };
        card.className = 'p-3 rounded-xl border border-slate-200 hover:border-orange-500 text-left bg-slate-50 hover:bg-orange-50/40 transition flex flex-col gap-1.5 shadow-sm group';
        card.innerHTML = '<div class="w-7 h-7 rounded-lg bg-orange-100 group-hover:bg-orange-500 group-hover:text-white text-orange-600 flex items-center justify-center text-xs transition"><i class="fa-solid ' + item.icon + '"></i></div><div><div class="font-bold text-xs text-slate-900">' + item.title + '</div><div class="text-[10px] text-slate-500 line-clamp-1">' + item.desc + '</div></div>';
    }
    
    grid.appendChild(card);
  });
}function filterCustomerCatalog(group) {
  document.querySelectorAll('.cust-pill').forEach(function(b){
    var isTarget = (group==='all' && b.innerText.indexOf('Tümü') !== -1) || b.getAttribute('onclick').indexOf(group) !== -1;
    b.className = isTarget ? 'cust-pill px-3 py-1.5 rounded-lg whitespace-nowrap font-bold bg-slate-900 text-white' : 'cust-pill px-3 py-1.5 rounded-lg whitespace-nowrap font-bold bg-slate-100 text-slate-700 hover:bg-slate-200';
  });

  document.querySelectorAll('.featured-cat-btn').forEach(function(btn){
    var isTarget = btn.getAttribute('data-cat') === group;
    btn.className = isTarget
      ? 'featured-cat-btn flex flex-col items-center justify-center p-1.5 rounded-2xl border-2 border-orange-500 bg-orange-50/60 shadow-sm transition group'
      : 'featured-cat-btn flex flex-col items-center justify-center p-1.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-orange-50 hover:border-orange-500 transition group shadow-sm';
  });

  renderServiceCards(group);
}
function goToStep(s){
  for(var i=1;i<=4;i++) {
    var stepEl = document.getElementById('step'+i);
    if(stepEl) stepEl.classList.add('hidden');
  }
  var successEl = document.getElementById('stepSuccess');
  if(successEl) successEl.classList.add('hidden');

  var targetStep = document.getElementById('step'+s);
  if(targetStep) targetStep.classList.remove('hidden');

  var w = ['w-1/4', 'w-2/4', 'w-3/4', 'w-full'];
  var labels = ['Adım 1: Hizmet Seçimi', 'Adım 2: İş Detayları', 'Adım 3: Konum ve İletişim', 'Adım 4: Güvenlik Onayı'];
  var percents = ['25%', '50%', '75%', '100%'];

  // Ana sayfa barı
  var bar = document.getElementById('stepProgressBar');
  if(bar) bar.className = 'bg-orange-500 h-full transition-all duration-300 ' + w[s-1];
  var labelEl = document.getElementById('stepLabel');
  if(labelEl) labelEl.innerText = labels[s-1];
  var percentEl = document.getElementById('stepPercent');
  if(percentEl) percentEl.innerText = percents[s-1];
  
  // Popup içi bar senkronizasyonu
  var modalBar = document.getElementById('modalStepProgressBar');
  if(modalBar) modalBar.className = 'bg-orange-500 h-full transition-all duration-300 ' + w[s-1];
  var modalLabelEl = document.getElementById('modalStepLabel');
  if(modalLabelEl) modalLabelEl.innerText = labels[s-1];
  var modalPercentEl = document.getElementById('modalStepPercent');
  if(modalPercentEl) modalPercentEl.innerText = percents[s-1];
}

function selectCategory(k, t, mainCat){
  currentDemand.categoryKey = k;
  currentDemand.categoryTitle = t;
  currentDemand.mainCat = mainCat;
  document.getElementById('selectedCategoryBadge').innerText = t;

  var isTransport = (k.indexOf('nakliyat') !== -1) || (mainCat === 'agir_nakliye');

  var step2TitleEl = document.getElementById('step2Title');
  if(step2TitleEl) step2TitleEl.innerText = isTransport ? 'Yük ve Taşıma Detayları' : 'Hizmet ve İş Detayları';

  var step3TitleEl = document.getElementById('step3Title');
  var inpCityLabelEl = document.getElementById('inpCityLabel');
  var inpDescLabelEl = document.getElementById('inpDescLabel');

  if(step3TitleEl) step3TitleEl.innerText = isTransport ? 'Çıkış Lokasyonu ve İletişim' : 'Hizmet Lokasyonu ve İletişim';
  if(inpCityLabelEl) inpCityLabelEl.innerText = isTransport ? 'Yükleme / Çıkış İli' : 'Hizmetin Verileceği İl';
  if(inpDescLabelEl) inpDescLabelEl.innerText = isTransport ? 'Yük Açıklaması / İrsaliye vb.' : 'İş Detayı / Ustanın Bilmesi Gerekenler';

  var f = document.getElementById('dynamicFormFields');
  f.innerHTML = '';

  // YENİ: "Diğer" kategorisi seçildiyse formu pas geç ve uyarı bas
  if (k.endsWith('_diger')) {
    f.innerHTML = '<div class="p-4 bg-orange-50 border border-orange-200 rounded-xl text-orange-800 text-xs font-medium text-center shadow-sm"><i class="fa-solid fa-circle-info text-lg mb-2 block"></i>Bu alt hizmet için hazır form bulunmuyor. Lütfen talebinizin detaylarını bir sonraki adımda yer alan "İş Detayı / Ek Açıklamalar" kutusuna yazınız.</div>';
  } else {
    var fields = categorySchemas[k] || [
      { id:'gen_scope', label:'Hizmet Kapsamı', options:['Standart Servis', 'Kapsamlı Servis'] },
      { id:'gen_timing', label:'Zamanlama Tercihi', options:['En Kısa Zamanda', 'İleri Bir Tarihte'] }
    ];

    fields.forEach(function(field){
      var wrap=document.createElement('div'); wrap.className='space-y-1 relative';
      
      var optionsHtml = field.options.map(function(o){return '<option value="'+o+'">'+o+'</option>';}).join('');
      // Her menünün en altına Diğer seçeneği ekleniyor
      optionsHtml += '<option value="__diger__" class="font-bold text-orange-600">Diğer (Lütfen Belirtin) ✍️</option>';
      
      wrap.innerHTML = '<label class="text-xs font-semibold text-slate-700 block">'+field.label+'</label>' +
                       '<select id="dyn_'+field.id+'" onchange="toggleCustomInput(this, \''+field.id+'\')" class="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:border-orange-500 focus:outline-none">' + optionsHtml + '</select>' +
                       '<input type="text" id="custom_'+field.id+'" placeholder="Lütfen kendi ifadenizle yazınız..." class="w-full text-xs p-2.5 rounded-xl border-2 border-orange-400 bg-orange-50 focus:border-orange-500 focus:outline-none mt-2 hidden transition-all placeholder:text-orange-300 text-orange-900 font-bold shadow-inner">';
      f.appendChild(wrap);
    });
  }

  var nakliyatExtraFields = document.getElementById('nakliyatExtraFields');
  if (nakliyatExtraFields) nakliyatExtraFields.classList.toggle('hidden', !isTransport);

  var isEvNakliyat = (k === 'nakliyat_evden_eve') || (k === 'nakliyat_ofis') || (k === 'nakliyat_parca_esya') || (k === 'nakliyat_ozel_esya');
  var evNakliyatSpecificFields = document.getElementById('evNakliyatSpecificFields');
  if (evNakliyatSpecificFields) evNakliyatSpecificFields.classList.toggle('hidden', !isEvNakliyat);

  goToStep(2);
}

async function validateAndGoStep3() {
  currentDemand.params = {};
  
  // YENİ: Diğer ilanları için parametreleri manuel tanımla (Ana Kategorideki "Özel Hizmet Talebi" butonu için)
  if (currentDemand.categoryKey.endsWith('_diger')) {
     currentDemand.params["Talep Türü"] = "Özel İhtiyaç (Detaylar Açıklama Kısmında)";
  } else {
     var fields = categorySchemas[currentDemand.categoryKey] || [{ id:'gen_scope', label:'Hizmet Kapsamı' }];
     fields.forEach(function(field){ 
       var el = document.getElementById('dyn_'+field.id); 
       var customEl = document.getElementById('custom_'+field.id); // Gizli açılan kutuyu yakala
       
       if(el) {
           // Eğer açılır listeden "Diğer" seçildiyse ve gizli kutu boş değilse, ustanın önüne kutudaki yazıyı gönder
           if (el.value === '__diger__' && customEl && customEl.value.trim() !== '') {
               currentDemand.params[field.label] = customEl.value.trim();
           } 
           // Diğer seçeneği haricinde normal bir madde seçildiyse kendi orijinal değerini al
           else if (el.value !== '__diger__') {
               currentDemand.params[field.label] = el.value;
           }
       }
     });
  }

  var isTransport = (currentDemand.categoryKey.indexOf('nakliyat') !== -1) || (currentDemand.mainCat === 'agir_nakliye');
  if(isTransport){
    var toCityEl = document.getElementById('destCitySelected');
    var toDistEl = document.getElementById('destDistrict');
    currentDemand.toCity = toCityEl ? (toCityEl.value || 'İstanbul') : 'İstanbul';
    currentDemand.toDistrict = toDistEl ? (toDistEl.value || 'Belli Değil') : 'Belli Değil';
    currentDemand.destFloor = document.getElementById('destFloor') ? document.getElementById('destFloor').value : 'Zemin';
    currentDemand.destElevator = document.getElementById('destElevator') ? document.getElementById('destElevator').value : 'Yok';
  }
  
  goToStep(3);

  var token = localStorage.getItem('tamonda_token');
  var inpNameEl = document.getElementById('inpName');
  var inpPhoneEl = document.getElementById('inpPhone');
  var inpContactPrefEl = document.getElementById('inpContactPref');
  
  var submitBtn = document.querySelector('button[onclick="sendOtpCode()"]');

  if (token && inpNameEl && inpPhoneEl) {
    try {
      const res = await fetch(`${window.API_BASE_URL}/api/auth/profile`, {
        headers: { 'Authorization': 'Bearer ' + token }
      });
      const data = await res.json();
      
      if (data.success && data.user) {
        inpNameEl.value = data.user.fullName || '';
        inpPhoneEl.value = data.user.phone || '';
        
        if (data.user.contactPreference && inpContactPrefEl) {
            inpContactPrefEl.value = data.user.contactPreference;
        }
        
        inpNameEl.setAttribute('readonly', true);
        inpNameEl.classList.add('bg-slate-200', 'text-slate-500', 'cursor-not-allowed', 'opacity-70');
        
        inpPhoneEl.setAttribute('readonly', true);
        inpPhoneEl.classList.add('bg-slate-200', 'text-slate-500', 'cursor-not-allowed', 'opacity-70');
        
        if (submitBtn) {
            submitBtn.innerText = "İlanı Ücretsiz Yayınla";
        }
      }
    } catch (err) {
      console.error("Müşteri profil bilgileri çekilemedi:", err);
    }
  } else if (inpNameEl && inpPhoneEl) {
    inpNameEl.removeAttribute('readonly');
    inpNameEl.classList.remove('bg-slate-200', 'text-slate-500', 'cursor-not-allowed', 'opacity-70');
    inpNameEl.value = ''; 

    inpPhoneEl.removeAttribute('readonly');
    inpPhoneEl.classList.remove('bg-slate-200', 'text-slate-500', 'cursor-not-allowed', 'opacity-70');
    inpPhoneEl.value = ''; 
    
    if (submitBtn) {
        submitBtn.innerText = "SMS Onayı Al";
    }
  }
}
async function sendOtpCode(){
  var inpNameEl = document.getElementById('inpName');
  var inpPhoneEl = document.getElementById('inpPhone');
  var inpCitySelEl = document.getElementById('inpCitySelected');
  var inpDistEl = document.getElementById('inpDistrict');
  var inpDescEl = document.getElementById('inpDescription');
  var inpContactPrefEl = document.getElementById('inpContactPref');

  var rawPhone = inpPhoneEl ? inpPhoneEl.value.trim() : '';
  
  // YAKLAŞIM A: Tüm harf, boşluk ve sembolleri temizle, sadece rakam kalsın
  var cleanPhone = rawPhone.replace(/\D/g, '');
  
  // Eğer kullanıcı 11 hane girdiyse ve 0 ile başlıyorsa (Örn: 05351112233), 0'ı at
  if (cleanPhone.length === 11 && cleanPhone.startsWith('05')) { 
      cleanPhone = cleanPhone.substring(1); 
  }

  // Son kontroller: Numara tam olarak 10 hane mi ve 5 ile mi başlıyor?
  if (cleanPhone.length !== 10 || !cleanPhone.startsWith('5')) {
    alert('Lütfen geçerli bir cep telefonu numarası giriniz. (Örn: 05321112233 veya 5321112233)');
    return;
  }

  // Frontend geçici belleğini güncelle
  currentDemand.name = inpNameEl ? (inpNameEl.value.trim() || 'İş Sahibi') : 'İş Sahibi';
  currentDemand.phone = cleanPhone; 
  currentDemand.fromCity = inpCitySelEl ? (inpCitySelEl.value || 'Sakarya') : 'Sakarya';
  currentDemand.fromDistrict = inpDistEl ? (inpDistEl.value || 'Adapazarı') : 'Adapazarı';
  currentDemand.description = inpDescEl ? (inpDescEl.value || 'Özel açıklama girilmedi.') : 'Özel açıklama girilmedi.';
  currentDemand.contactPreference = inpContactPrefEl ? inpContactPrefEl.value : "Fark Etmez (Her Zaman Aranabilir)";

  // Oturum (Token) Kontrolü (Aynen korundu)
  const token = localStorage.getItem('tamonda_token');
  if (token) {
    try {
      var generatedDemandId = 'REQ-' + Math.floor(100 + Math.random() * 900);
      
      const demandRes = await fetch(`${window.API_BASE_URL}/api/demands/create`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          demandId: generatedDemandId,
          customerName: currentDemand.name,
          customerPhone: currentDemand.phone,
          categoryTitle: currentDemand.categoryTitle,
          mainCat: currentDemand.mainCat,
          categoryKey: currentDemand.categoryKey,
          fromCity: currentDemand.fromCity,
          fromDistrict: currentDemand.fromDistrict,
          toCity: currentDemand.toCity,
          toDistrict: currentDemand.toDistrict,
          params: currentDemand.params,
          description: currentDemand.description,
          contactPreference: currentDemand.contactPreference
        })
      });
      
      const demandData = await demandRes.json();
      if (demandData.success) {
        var currentStepEl = document.getElementById('step3'); 
        var stepSuccessEl = document.getElementById('stepSuccess');
        if (currentStepEl) currentStepEl.classList.add('hidden');
        if (stepSuccessEl) stepSuccessEl.classList.remove('hidden');
        
        var resCatEl = document.getElementById('resCat');
        var resRouteEl = document.getElementById('resRoute');
        var resSummaryEl = document.getElementById('resSummary');
        
        if (resCatEl) resCatEl.innerText = currentDemand.categoryTitle;
        var isTransport = (currentDemand.categoryKey.indexOf('nakliyat') !== -1) || (currentDemand.mainCat === 'agir_nakliye');
        if (resRouteEl) {
           resRouteEl.innerText = isTransport 
              ? (currentDemand.fromCity+'/'+currentDemand.fromDistrict+' ➔ '+currentDemand.toCity+'/'+currentDemand.toDistrict) 
              : (currentDemand.fromCity+' / '+currentDemand.fromDistrict);
        }
        if (resSummaryEl) resSummaryEl.innerText = Object.values(currentDemand.params).join(', ');
        
        return; 
      } else if(demandData.message.includes('Token') || demandRes.status === 401) {
        localStorage.removeItem('tamonda_token');
      } else {
        alert(demandData.message);
        return;
      }
    } catch (err) {
      console.error("Doğrudan ilan oluşturma hatası:", err);
    }
  }

  // --- MEVCUT SMS GÖNDERME AKIŞI ---
  try {
    const response = await fetch(`${window.API_BASE_URL}/api/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        phone: cleanPhone,
        fullName: currentDemand.name 
      })
    });
    const data = await response.json();

    if (data.success) {
      console.log("İlan Verme OTP Kodu (Test):", data.debugOtp);
      var targetPhoneDisplay = document.getElementById('targetPhoneDisplay');
      if (targetPhoneDisplay) targetPhoneDisplay.innerText = currentDemand.phone;
      
      goToStep(4);
      startOtpTimer(); // YENİ EKLENDİ: Butonu kilitler ve 60 sn sayacı başlatır
    } else {
      alert(data.message || 'SMS kodu gönderilemedi.');
    }
  } catch (error) {
    console.error('OTP Gönderim Hatası:', error);
    alert('Sunucuya bağlanılamadı. Backend çalışıyor mu?');
  }
}
async function completeDemand(){
  // 1. Inputtan kullanıcının girdiği OTP kodunu al
  var otpInput = document.getElementById('demandOtpInput');
  var otpVal = otpInput ? otpInput.value.trim() : '';

  if (!otpVal) {
    alert('Lütfen telefonunuza gelen onay kodunu giriniz.');
    return;
  }

  try {
    // 2. Girilen OTP kodunu backend üzerinde doğrula
    const verifyRes = await fetch(`${window.API_BASE_URL}/api/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: currentDemand.phone, otpCode: otpVal })
    });
    const verifyData = await verifyRes.json();

    if (!verifyData.success) {
      alert('Hatalı SMS Kodu! Lütfen test kodunu (konsoldaki) giriniz.');
      return;
    }

    // OTP Doğrulandıysa dönen token'ı alıyoruz
    var token = verifyData.token;
    localStorage.setItem('tamonda_token', token);

    // İlan için benzersiz bir ID oluşturuyoruz (Örn: REQ-482)
    var generatedDemandId = 'REQ-' + Math.floor(100 + Math.random() * 900);

    // 3. Doğrulanmış Token ve EKSİKSİZ Veriler ile İlanı Veritabanına Kaydet
    const demandRes = await fetch(`${window.API_BASE_URL}/api/demands/create`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        demandId: generatedDemandId,               // EKLENDİ
        customerName: currentDemand.name,          // EKLENDİ
        customerPhone: currentDemand.phone,        // EKLENDİ
        categoryTitle: currentDemand.categoryTitle,// EKLENDİ
        mainCat: currentDemand.mainCat,
        categoryKey: currentDemand.categoryKey,
        fromCity: currentDemand.fromCity,
        fromDistrict: currentDemand.fromDistrict,
        toCity: currentDemand.toCity,
        toDistrict: currentDemand.toDistrict,
        params: currentDemand.params,
        description: currentDemand.description,
        contactPreference: currentDemand.contactPreference
      })
    });
    
    const demandData = await demandRes.json();

    if (demandData.success) {
      // İşlem başarılıysa ekrandaki bileşenleri güncelle ve başarı ekranına geç
      var step4El = document.getElementById('step4');
      var stepSuccessEl = document.getElementById('stepSuccess');
      if (step4El) step4El.classList.add('hidden');
      if (stepSuccessEl) stepSuccessEl.classList.remove('hidden');

      var resCatEl = document.getElementById('resCat');
      var resRouteEl = document.getElementById('resRoute');
      var resSummaryEl = document.getElementById('resSummary');

      if (resCatEl) resCatEl.innerText = currentDemand.categoryTitle;
      var isTransport = (currentDemand.categoryKey.indexOf('nakliyat') !== -1) || (currentDemand.mainCat === 'agir_nakliye');
      if (resRouteEl) {
         resRouteEl.innerText = isTransport 
            ? (currentDemand.fromCity+'/'+currentDemand.fromDistrict+' ➔ '+currentDemand.toCity+'/'+currentDemand.toDistrict) 
            : (currentDemand.fromCity+' / '+currentDemand.fromDistrict);
      }
      if (resSummaryEl) resSummaryEl.innerText = Object.values(currentDemand.params).join(', ');
      
    } else {
      alert(demandData.message || 'İlan oluşturulurken bir hata oluştu.');
    }
  } catch (err) {
    console.error("İlan oluşturma hatası:", err);
    alert('Sunucu hatası oluştu, ilan verilemedi.');
  }
}
function toggleMap(mapContainerId) {
  var mapBox = document.getElementById(mapContainerId);
  if (mapBox) {
    mapBox.classList.toggle('hidden');
  }
}
// 3. Tüm Alanları Sıfırlama
    window.resetProFilters = function() {
        if(document.getElementById('proFilterKeyword')) document.getElementById('proFilterKeyword').value = '';
        if(document.getElementById('proFilterCity')) document.getElementById('proFilterCity').value = '';
        if(document.getElementById('proFilterDistrict')) document.getElementById('proFilterDistrict').innerHTML = '<option value="">İlçe Seç (Tümü)</option>';
        if(document.getElementById('proFilterFromCity')) document.getElementById('proFilterFromCity').value = '';
        if(document.getElementById('proFilterFromDistrict')) document.getElementById('proFilterFromDistrict').innerHTML = '<option value="">Çıkış İlçesi (Tümü)</option>';
        if(document.getElementById('proFilterToCity')) document.getElementById('proFilterToCity').value = '';
        if(document.getElementById('proFilterToDistrict')) document.getElementById('proFilterToDistrict').innerHTML = '<option value="">Varış İlçesi (Tümü)</option>';
        
        window.currentProPage = 1;
        if(typeof renderProDemands === 'function') renderProDemands();
    };

// 4. İlanları Sunucudan Çekerken Parametreleri Yakalama
async function renderProDemands() {
    if (currentProUser && currentProUser.categoryKey === 'admin') return;

    var c = document.getElementById('demandListContainer');
    var paginationBox = document.getElementById('proPaginationContainer');
    if (!c) return;

    // Ustanın kategorisine göre 3. satırı gizle/göster
    var isTransportPro = currentProUser && (currentProUser.categoryKey === 'nakliyat' || currentProUser.categoryKey === 'agir_nakliye');
    var transportArea = document.getElementById('transportFiltersArea');
    if (transportArea) {
        if (isTransportPro) transportArea.classList.remove('hidden');
        else transportArea.classList.add('hidden');
    }

    var keywordFilter = document.getElementById('proFilterKeyword') ? document.getElementById('proFilterKeyword').value.trim() : '';
    var cityFilter = document.getElementById('proFilterCity') ? document.getElementById('proFilterCity').value.trim() : '';
    var distFilter = document.getElementById('proFilterDistrict') ? document.getElementById('proFilterDistrict').value.trim() : '';
    var fromCityFilter = document.getElementById('proFilterFromCity') ? document.getElementById('proFilterFromCity').value.trim() : '';
    var fromDistFilter = document.getElementById('proFilterFromDistrict') ? document.getElementById('proFilterFromDistrict').value.trim() : '';
    var toCityFilter = document.getElementById('proFilterToCity') ? document.getElementById('proFilterToCity').value.trim() : '';
    var toDistFilter = document.getElementById('proFilterToDistrict') ? document.getElementById('proFilterToDistrict').value.trim() : '';
    var page = window.currentProPage || 1;

    c.innerHTML = '<div class="px-4 py-8 bg-white border border-slate-200 rounded-2xl text-center flex flex-col items-center justify-center shadow-sm space-y-3"><i class="fa-solid fa-spinner fa-spin text-3xl text-orange-500"></i><div class="text-xs text-slate-500 font-medium">Aktif iş ilanları aranıyor...</div></div>';
    if(paginationBox) paginationBox.innerHTML = '';

    try {
        var token = localStorage.getItem('tamonda_token');
        if(!token) throw new Error("Oturum süresi dolmuş.");

        const response = await fetch(`${window.API_BASE_URL}/api/demands/pro/list?page=${page}&limit=20&city=${cityFilter}&district=${distFilter}&fromCity=${fromCityFilter}&fromDistrict=${fromDistFilter}&toCity=${toCityFilter}&toDistrict=${toDistFilter}&keyword=${encodeURIComponent(keywordFilter)}`, {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        
        const data = await response.json();        
        // Yeşil Sayacı Güncelleme
        var badge = document.getElementById('proTotalDemandsBadge');
        if (badge && data.success) {
            badge.innerText = data.total || 0;
            badge.classList.remove('hidden');
        }
        if (!data.success) {
            c.innerHTML = '<div class="px-4 py-8 bg-white border border-slate-200 rounded-2xl text-center text-xs text-red-500 italic shadow-sm">İlanlar çekilirken bir hata oluştu.</div>';
            return;
        }

        if (data.proPackage && currentProUser) {
            currentProUser.packageType = data.proPackage;
            currentProUser.ratingAvg = data.ratingAvg;
            currentProUser.ratingCount = data.ratingCount;
            localStorage.setItem('tamonda_current_pro', JSON.stringify(currentProUser));
            
            var nameDisp = document.getElementById('proNameDisplay');
            if(nameDisp && data.ratingCount > 0) {
                var starStr = ' <span class="text-amber-500 text-[11px] font-black ml-2"><i class="fa-solid fa-star"></i> ' + data.ratingAvg + '</span>';
                if(!nameDisp.innerHTML.includes('fa-star')) nameDisp.innerHTML = currentProUser.name + starStr;
            }
        }

        var dbDemands = data.demands || [];
        window.demands = dbDemands;

        if (dbDemands.length === 0) {
            c.innerHTML = '<div class="px-4 py-8 bg-white border border-slate-200 rounded-2xl text-center flex flex-col items-center justify-center shadow-sm space-y-3"><div class="w-14 h-14 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center text-2xl"><i class="fa-solid fa-folder-open"></i></div><div class="text-xs text-slate-500 font-medium">Bu kriterlere uygun aktif talep bulunamadı.</div></div>';
            return;
        }

        c.innerHTML = ''; 

        // İlan Kartlarını Ekrana Basma
        dbDemands.forEach(function(item){
            var isTransport = (item.categoryKey && item.categoryKey.indexOf('nakliyat') !== -1 || item.mainCat === 'agir_nakliye') && item.toCity;
            
            var proCity = currentProUser ? currentProUser.city : 'Sakarya';
            var proDist = currentProUser ? currentProUser.district : 'Adapazarı';

            var ustaToPickupKm = isTransport ? calculateEstimatedDistance(proCity, proDist, item.fromCity, item.fromDistrict) : 0;
            var estKm = isTransport ? calculateEstimatedDistance(item.fromCity, item.fromDistrict, item.toCity, item.toDistrict) : 0;
            var totalRoundTripKm = isTransport ? (ustaToPickupKm + estKm) : 0;

            var timeStr = item.createdAt ? new Date(item.createdAt).toLocaleDateString('tr-TR') : 'Az önce';
            
            var isMasked = String(item.customerPhone).includes('*');

            var contactAreaHtml = '';
            if (isMasked) {
                contactAreaHtml = '<div class="w-full mt-2.5 flex flex-col gap-2">' +
                                  '<div class="text-center font-mono text-sm text-slate-400 bg-slate-50 py-1.5 rounded-lg border border-slate-200">Müşteri Tel: ' + item.customerPhone + '</div>' + 
                                  '<button type="button" onclick="document.getElementById(\'plusModal\').classList.remove(\'hidden\');" class="w-full py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl text-xs font-black shadow-md transition hover:scale-[1.02] flex items-center justify-center gap-1.5"><i class="fa-solid fa-lock text-orange-200"></i> Bu İlanı Aç (Plus\'a Geç)</button>' +
                                  '</div>';
            } else {
                var cPhone = String(item.customerPhone).replace(/\D/g, '');
                if(cPhone.startsWith('0')) cPhone = cPhone.substring(1);
                var prefBadge = item.contactPreference && item.contactPreference !== 'Fark Etmez (Her Zaman Aranabilir)' ? '<div class="text-[10px] text-center font-bold text-emerald-700 mb-1.5 bg-emerald-50 py-1 rounded-md border border-emerald-200"><i class="fa-solid fa-circle-info mr-1"></i>İş Sahibi Tercihi: ' + item.contactPreference + '</div>' : '';
             
                var formattedPhone = cPhone.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');

                var actionBtn = '<div class="flex gap-2">' +
                    '<a href="tel:+90' + cPhone + '" class="group relative w-1/2 overflow-hidden py-2.5 bg-slate-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all hover:bg-slate-700 flex items-center justify-center">' +
                        '<span class="flex items-center gap-1.5 transition-transform duration-300 group-hover:-translate-y-8"><i class="fa-solid fa-phone"></i> Ara</span>' +
                        '<span class="absolute inset-0 flex items-center justify-center text-[11px] tracking-wider translate-y-8 transition-transform duration-300 group-hover:translate-y-0 text-slate-200">0' + formattedPhone + '</span>' +
                    '</a>' +
                    '<a href="https://wa.me/90' + cPhone + '" target="_blank" class="group relative w-1/2 overflow-hidden py-2.5 bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-sm transition-all hover:bg-emerald-600 flex items-center justify-center">' +
                        '<span class="flex items-center gap-1.5 transition-transform duration-300 group-hover:-translate-y-8"><i class="fa-brands fa-whatsapp text-[14px]"></i> WhatsApp</span>' +
                        '<span class="absolute inset-0 flex items-center justify-center text-[11px] tracking-wider translate-y-8 transition-transform duration-300 group-hover:translate-y-0 text-emerald-100">0' + formattedPhone + '</span>' +
                    '</a>' +
                    '</div>';
                
                var offerHtml = '<div class="mt-3 pt-3 border-t border-slate-100 space-y-2"><div class="grid grid-cols-2 gap-2">' +
                                '<div><input type="text" inputmode="numeric" id="offer_price_' + item._id + '" oninput="window.convertNumberToWords(this.value, \'' + item._id + '\')" placeholder="Teklif (TL)" class="text-xs bg-slate-50 border border-slate-300 rounded-lg p-1.5 w-full"></div>' +
                                '<div><input type="text" id="offer_msg_' + item._id + '" placeholder="Mesajınız..." class="text-xs bg-slate-50 border border-slate-300 rounded-lg p-1.5 w-full"></div>' +
                                '</div>' + 
                                '<div id="offer_words_' + item._id + '" class="hidden text-[10px] font-black text-orange-600 uppercase text-center bg-orange-50 border border-orange-200 rounded py-1 px-2 mt-1"></div>' +
                                '<button type="button" onclick="submitOffer(\'' + item._id + '\')" class="w-full py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-lg transition shadow-sm">Teklif Gönder</button></div>';
                
                contactAreaHtml = '<div class="w-full mt-2.5 flex flex-col">' + prefBadge + actionBtn + offerHtml + '</div>';
            }

            var summaryText = item.params ? (typeof item.params === 'object' ? Object.values(item.params).join(', ') : item.params) : 'Özet bulunmuyor';

            // Ekstra varış detayı varsa (Kat/Asansör) hazırlıyoruz
            var destExtra = (item.destFloor && item.destElevator) ? ' <span class="text-[10px] text-slate-500 font-medium">(' + item.destFloor + ' - ' + item.destElevator + ')</span>' : '';

            var el = document.createElement('div');
            el.className = 'w-full bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3';
            
            el.innerHTML =
                '<div class="flex justify-between items-center">' +
                '<span class="text-[11px] font-bold bg-orange-50 text-orange-800 px-2 py-0.5 rounded-md border border-orange-200">' + item.categoryTitle + '</span>' +
                '<span class="text-[11px] text-slate-400 font-medium">' + timeStr + '</span>' +
                '</div>' +
                
                // --- YENİDEN ENTEGRE EDİLEN ZENGİN GÜZERGAH VE HARİTA ALANI ---
                (isTransport ?
                '<div class="bg-white rounded-xl border border-slate-200 overflow-hidden mt-1">' +
                    '<div class="p-3 flex justify-between items-center border-b border-slate-100">' +
                        '<div class="text-sm font-bold text-slate-900"><i class="fa-solid fa-truck text-orange-600 mr-1.5"></i>' + item.fromCity + '/' + item.fromDistrict + ' ➔ ' + item.toCity + '/' + item.toDistrict + '</div>' +
                        '<div class="text-[11px] font-black text-orange-700 bg-orange-100 px-2 py-1 rounded-lg">~' + estKm + ' KM</div>' +
                    '</div>' +
                    '<div class="p-3 bg-slate-50 space-y-3">' +
                        '<div class="text-[10px] text-slate-500 flex gap-1"><span>Taşınma Hattı: <strong>~' + estKm + ' KM</strong></span> <span class="text-slate-300">|</span> <span>Toplam Sefer: <strong>~' + totalRoundTripKm + ' KM</strong></span></div>' +
                        '<div class="flex flex-col gap-2 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">' +
                            '<div class="flex items-center gap-2 text-xs text-slate-700"><span class="w-5 h-5 min-w-[20px] rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[10px]">1</span> <div><strong>Usta Konumunuz:</strong> ' + proCity + ' / ' + proDist + '</div></div>' +
                            '<div class="flex items-center gap-2 text-xs text-slate-700"><span class="w-5 h-5 min-w-[20px] rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-[10px]">2</span> <div><strong>Eşya Alınış:</strong> ' + item.fromCity + ' / ' + item.fromDistrict + '</div></div>' +
                            '<div class="flex items-center gap-2 text-xs text-slate-700"><span class="w-5 h-5 min-w-[20px] rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-[10px]">3</span> <div><strong>Varış & Teslimat:</strong> ' + item.toCity + ' / ' + item.toDistrict + destExtra + '</div></div>' +
                        '</div>' +
                        '<div class="flex gap-2">' +
                            '<button type="button" onclick="toggleMap(\'map_' + item._id + '\')" class="flex-1 py-2 bg-slate-900 text-white text-[11px] font-bold rounded-lg transition hover:bg-slate-800 flex items-center justify-center"><i class="fa-solid fa-map mr-1.5"></i> Haritayı Aç / Kapat</button>' +
                            '<a href="https://www.google.com/maps/dir/' + proCity + ',' + proDist + '/' + item.fromCity + ',' + item.fromDistrict + '/' + item.toCity + ',' + item.toDistrict + '" target="_blank" class="flex-1 py-2 bg-white border border-slate-200 text-orange-600 text-[11px] font-bold rounded-lg transition hover:border-orange-500 flex items-center justify-center"><i class="fa-solid fa-location-arrow mr-1.5"></i> Google Maps Rotası</a>' +
                        '</div>' +
                        // YENİDEN EKLENEN GERÇEK IFRAME ALANI
                        '<div id="map_' + item._id + '" class="hidden w-full h-64 bg-slate-200 rounded-lg border border-slate-300 overflow-hidden mt-2">' +
                            '<iframe width="100%" height="100%" frameborder="0" style="border:0;" src="https://maps.google.com/maps?q=' + encodeURIComponent(item.fromCity + ' ' + item.fromDistrict + ' ' + item.toCity + ' ' + item.toDistrict) + '&hl=tr&z=6&output=embed"></iframe>' +
                        '</div>' +
                '</div>'
                :
                '<div class="font-bold text-sm text-slate-900"><i class="fa-solid fa-location-dot text-orange-500 mr-1.5"></i>' + item.fromCity + ' / ' + item.fromDistrict + '</div>'
                ) +
                '<div class="text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100 font-medium mt-2">' + summaryText + '</div>' +
                (item.description ? '<div class="text-[11px] text-slate-500 italic mt-1">"' + item.description + '"</div>' : '') +
                '<div class="pt-3 border-t border-slate-100 flex flex-col mt-2">' +
                '<span class="text-xs font-bold text-slate-800">' + item.customerName + '</span>' +
                contactAreaHtml +
                '</div>';

            c.appendChild(el);
        });

        if (paginationBox && data.totalPages > 1) {
            var pagHtml = '';
            if (data.currentPage > 1) {
                pagHtml += `<button onclick="window.currentProPage=${data.currentPage - 1}; renderProDemands();" class="px-3 py-1 bg-white border border-slate-300 rounded text-xs font-bold text-slate-600 hover:bg-slate-100"><i class="fa-solid fa-chevron-left"></i></button>`;
            }
            for (var i = 1; i <= data.totalPages; i++) {
                if (i === data.currentPage) {
                    pagHtml += `<button class="px-3 py-1 bg-orange-500 border border-orange-500 rounded text-xs font-bold text-white">${i}</button>`;
                } else if (i === 1 || i === data.totalPages || (i >= data.currentPage - 1 && i <= data.currentPage + 1)) {
                    pagHtml += `<button onclick="window.currentProPage=${i}; renderProDemands();" class="px-3 py-1 bg-white border border-slate-300 rounded text-xs font-bold text-slate-600 hover:bg-slate-100">${i}</button>`;
                } else if (i === data.currentPage - 2 || i === data.currentPage + 2) {
                    pagHtml += `<span class="px-2 text-slate-400">...</span>`;
                }
            }
            if (data.currentPage < data.totalPages) {
                pagHtml += `<button onclick="window.currentProPage=${data.currentPage + 1}; renderProDemands();" class="px-3 py-1 bg-white border border-slate-300 rounded text-xs font-bold text-slate-600 hover:bg-slate-100"><i class="fa-solid fa-chevron-right"></i></button>`;
            }
            paginationBox.innerHTML = pagHtml;
        }

    } catch (error) {
        console.error("Usta ilanları çekilemedi:", error);
        c.innerHTML = '<div class="px-4 py-8 bg-white border border-slate-200 rounded-2xl text-center text-xs text-red-500 italic shadow-sm">Sunucu bağlantı hatası.</div>';
    }
}
async function submitOffer(demandId) {
  var priceInput = document.getElementById('offer_price_' + demandId);
  var msgInput = document.getElementById('offer_msg_' + demandId);

  var priceVal = priceInput ? priceInput.value : '';
  var msgVal = msgInput ? msgInput.value : '';

  if (!priceVal) {
    alert('Lütfen geçerli bir teklif fiyatı giriniz.');
    return;
  }

  var demand = (typeof demands !== 'undefined' ? demands : []).find(function(d){ 
    return String(d._id) === String(demandId) || String(d.id) === String(demandId) || String(d.demandId) === String(demandId); 
  });

  if (!demand) {
    alert('Talep bulunamadı.');
    return;
  }

  var proInfo = (typeof currentProUser !== 'undefined' && currentProUser) ? currentProUser : { name: 'Usta' };

  var newOffer = {
    id: 'offer_' + Date.now(),
    demandId: demandId,
    proName: proInfo.name || 'Usta',
    proPhone: proInfo.phone || '', // YENİ EKLENEN SATIR: Ustanın telefonu WhatsApp için kaydediliyor
    price: priceVal,
    message: msgVal || 'Belirtilmemiş',
    date: 'Az önce',
    categoryTitle: demand.categoryTitle || 'Hizmet',
    fromCity: demand.fromCity || '',
    fromDistrict: demand.fromDistrict || '',
    customerName: demand.customerName || 'İş Sahibi',
    customerPhone: demand.customerPhone || 'Gizli',
    summary: demand.summary || 'Özet bulunmuyor'
  };

  try {
    const token = localStorage.getItem('tamonda_token');
    
    const response = await fetch(`${window.API_BASE_URL}/api/demands/${demand._id}/offer`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(newOffer)
    });

    const data = await response.json();
    if (!data.success) {
      alert('Teklif veritabanına gönderilirken bir hata oluştu: ' + data.message);
      return; 
    }
  } catch (error) {
    console.error("Teklif gönderme hatası:", error);
    alert('Sunucu ile iletişim kurulamadı, teklif kaydedilemedi.');
    return; 
  }

  if (!demand.offers) demand.offers = [];
  demand.offers.push(newOffer);

  if (typeof window.mySubmittedOffers === 'undefined') window.mySubmittedOffers = [];
  window.mySubmittedOffers.push(newOffer);

  saveToStorage();

  alert('Teklifiniz başarıyla kaydedildi ve iş sahibine iletildi!\nTutar: ' + priceVal + ' TL');

  if (priceInput) priceInput.value = '';
  if (msgInput) msgInput.value = '';

  var wordDiv = document.getElementById('offer_words_' + demandId);
  if (wordDiv) {
    wordDiv.innerText = '';
    wordDiv.classList.add('hidden');
  }

  // submitOffer fonksiyonunun en alt satırları:
  if (typeof renderProDemands === 'function') renderProDemands();
  if (typeof loadMyOffersFromDB === 'function') loadMyOffersFromDB();
}
// ==========================================
// YENİ: VERİTABANI DESTEKLİ TEKLİF LİSTELEME
// ==========================================

window.myOffersFilters = { status: 'Aktif', city: '', cat: '' };

window.loadMyOffersFromDB = async function() {
    var container = document.getElementById('myOffersContainer');
    if (!container) return;

    container.innerHTML = '<div class="text-xs text-slate-400 italic text-center py-6 bg-slate-50 rounded-xl border border-slate-200"><i class="fa-solid fa-spinner fa-spin mr-2"></i>Teklifleriniz güncelleniyor...</div>';

    try {
        var token = localStorage.getItem('tamonda_token');
        const res = await fetch(`${window.API_BASE_URL}/api/demands/pro/my-offers`, {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const data = await res.json();
        
        if (data.success) {
            window.mySubmittedOffersLive = data.offers || [];
            renderMyOffersLive();
        } else {
            container.innerHTML = '<div class="text-xs text-red-500 italic text-center py-6">Teklifler çekilemedi: ' + data.message + '</div>';
        }
    } catch (e) {
        console.error(e);
        container.innerHTML = '<div class="text-xs text-red-500 italic text-center py-6">Sunucu bağlantı hatası.</div>';
    }
};

window.renderMyOffersLive = function() {
    var container = document.getElementById('myOffersContainer');
    if (!container) return;

    var offers = window.mySubmittedOffersLive || [];
    
    var cities = [...new Set(offers.map(o => o.fromCity))].filter(Boolean);
    var categories = [...new Set(offers.map(o => o.categoryTitle))].filter(Boolean);

    var countBekleyen = 0, countOnaylanan = 0, countKabulEdilmeyen = 0, countGizli = 0;
    offers.forEach(function(o) {
        if (o.isHidden) {
            countGizli++;
        } else {
            if (o.bidStatus === 'Bekleyen') countBekleyen++;
            else if (o.bidStatus === 'Onaylanan') countOnaylanan++;
            else countKabulEdilmeyen++; 
        }
    });

    var filteredOffers = offers.filter(function(offer) {
        if (window.myOffersFilters.status === 'Gizlenenler') {
            if (!offer.isHidden) return false;
        } else {
            if (offer.isHidden) return false;
            if (window.myOffersFilters.status === 'Onaylanan' && offer.bidStatus !== 'Onaylanan') return false;
            if (window.myOffersFilters.status === 'Kabul Edilmeyen' && (offer.bidStatus !== 'Kaçırılan' && offer.bidStatus !== 'İptal')) return false;
            if (window.myOffersFilters.status === 'Aktif' && offer.bidStatus !== 'Bekleyen') return false;
        }
        if (window.myOffersFilters.city && offer.fromCity !== window.myOffersFilters.city) return false;
        if (window.myOffersFilters.cat && offer.categoryTitle !== window.myOffersFilters.cat) return false;
        return true;
    });

    var filterHtml = '<div class="bg-slate-50 p-2 rounded-xl border border-slate-200 mb-4 space-y-2">' +
        '<div class="flex gap-1 overflow-x-auto no-scrollbar">' +
            '<button onclick="setMyOfferFilter(\'status\', \'Aktif\')" class="flex-1 min-w-[80px] py-1.5 text-[10px] font-bold rounded-lg transition ' + (window.myOffersFilters.status === 'Aktif' ? 'bg-orange-500 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200') + '">Bekleyen (' + countBekleyen + ')</button>' +
            '<button onclick="setMyOfferFilter(\'status\', \'Onaylanan\')" class="flex-1 min-w-[80px] py-1.5 text-[10px] font-bold rounded-lg transition ' + (window.myOffersFilters.status === 'Onaylanan' ? 'bg-emerald-500 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200') + '">Onaylanan (' + countOnaylanan + ')</button>' +
            '<button onclick="setMyOfferFilter(\'status\', \'Kabul Edilmeyen\')" class="flex-1 min-w-[80px] py-1.5 text-[10px] font-bold rounded-lg transition ' + (window.myOffersFilters.status === 'Kabul Edilmeyen' ? 'bg-slate-700 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200') + '">Kabul Edilmeyen (' + countKabulEdilmeyen + ')</button>' +
            '<button onclick="setMyOfferFilter(\'status\', \'Gizlenenler\')" class="flex-1 min-w-[80px] py-1.5 text-[10px] font-bold rounded-lg transition ' + (window.myOffersFilters.status === 'Gizlenenler' ? 'bg-rose-500 text-white shadow-sm' : 'bg-white text-slate-600 border border-slate-200') + '"><i class="fa-solid fa-eye-slash"></i> Gizli (' + countGizli + ')</button>' +
        '</div>' +
        '<div class="flex gap-2">' +
            '<select onchange="setMyOfferFilter(\'city\', this.value)" class="flex-1 text-[10px] p-1.5 rounded-lg border border-slate-300 bg-white outline-none">' +
                '<option value="">Tüm Şehirler</option>' +
                cities.map(c => '<option value="'+c+'" '+(window.myOffersFilters.city===c?'selected':'')+'>'+c+'</option>').join('') +
            '</select>' +
            '<select onchange="setMyOfferFilter(\'cat\', this.value)" class="flex-1 text-[10px] p-1.5 rounded-lg border border-slate-300 bg-white outline-none">' +
                '<option value="">Tüm Kategoriler</option>' +
                categories.map(c => '<option value="'+c+'" '+(window.myOffersFilters.cat===c?'selected':'')+'>'+c+'</option>').join('') +
            '</select>' +
        '</div>' +
    '</div>';

    var contentHtml = '';

    if (filteredOffers.length === 0) {
        contentHtml = '<div class="text-xs text-slate-400 italic text-center py-4 bg-slate-50 border border-slate-100 rounded-xl">Bu kriterlere uygun teklifiniz bulunmuyor.</div>';
    } else {
        filteredOffers.forEach(function(info) {
            var cPhone = String(info.customerPhone).replace(/\D/g, '');
            if(cPhone.startsWith('0')) cPhone = cPhone.substring(1);
            
            var statusBadge = '';
            if(info.bidStatus === 'Bekleyen') statusBadge = '<span class="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-[9px] font-black"><i class="fa-solid fa-clock mr-1"></i>Bekliyor</span>';
            if(info.bidStatus === 'Onaylanan') statusBadge = '<span class="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[9px] font-black"><i class="fa-solid fa-check mr-1"></i>Sizinle Anlaşıldı</span>';
            if(info.bidStatus === 'Kaçırılan' || info.bidStatus === 'İptal') statusBadge = '<span class="bg-slate-200 text-slate-600 px-2 py-0.5 rounded text-[9px] font-black"><i class="fa-solid fa-xmark mr-1"></i>Kabul Edilmedi</span>';

            var bidsHtml = '';
            if (info.myBids && info.myBids.length > 0) {
                info.myBids.forEach(function(bid) {
                    bidsHtml += '<div class="flex justify-between items-center text-[10px] py-1 border-b border-orange-100/50 last:border-0">' +
                        '<span class="italic text-slate-600">"' + bid.message + '"</span>' +
                        '<div class="flex flex-col items-end">' +
                            '<span class="font-bold text-orange-700">' + bid.price + ' TL</span>' +
                            // DÜZELTME: Kaybolan yazı ile tutar yapısı buraya eklendi
                            '<span class="text-[8px] text-orange-500/80">' + numberToTextTR(parseInt(String(bid.price).replace(/\D/g, ''), 10) || 0) + ' TÜRK LİRASI</span>' +
                        '</div>' +
                    '</div>';
                });
            }

            var actionBtn = '';
            if (info.isHidden) {
                actionBtn = '<div class="flex gap-1">' + 
                    '<button onclick="deleteMyOfferPermanently(\'' + info._id + '\')" class="text-[10px] text-red-600 hover:text-white bg-red-50 hover:bg-red-600 px-2 py-1 rounded transition flex items-center shadow-sm"><i class="fa-solid fa-trash-can"></i></button>' +
                    '<button onclick="unhideMyOffer(\'' + info._id + '\')" class="text-[10px] text-slate-600 hover:text-white bg-slate-200 hover:bg-slate-800 px-2 py-1 rounded transition flex items-center shadow-sm"><i class="fa-solid fa-eye mr-1"></i> Görünür Yap</button>' +
                '</div>';
            } else {
                actionBtn = '<button onclick="hideMyOffer(\'' + info._id + '\')" class="text-[10px] text-red-500 hover:text-white bg-red-50 hover:bg-red-500 px-2 py-1 rounded transition flex items-center shadow-sm"><i class="fa-solid fa-eye-slash mr-1"></i> Gizle</button>';
            }

            var contactHtml = (info.bidStatus === 'Kaçırılan' || info.bidStatus === 'İptal') 
                ? '<span class="text-[10px] text-slate-400 italic">İletişim kapalı</span>'
                : '<div class="flex items-center gap-2">' +
                    '<a href="tel:+90' + cPhone + '" class="text-slate-600 hover:text-slate-900 font-bold bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg transition"><i class="fa-solid fa-phone"></i></a>' +
                    '<a href="https://wa.me/90' + cPhone + '" target="_blank" class="bg-emerald-100 text-emerald-700 hover:bg-emerald-500 hover:text-white px-2.5 py-1.5 rounded-lg transition"><i class="fa-brands fa-whatsapp text-sm"></i></a>' +
                  '</div>';

            contentHtml += '<div class="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm text-xs space-y-2.5 mb-3 relative ' + (info.isHidden ? 'opacity-70 border-rose-100' : '') + '">' +
                '<div class="flex justify-between items-start border-b border-slate-100 pb-2">' +
                    '<div class="flex flex-col gap-1">' +
                        '<span class="font-bold bg-orange-50 text-orange-800 px-2 py-0.5 rounded-md border border-orange-200 self-start">' + info.categoryTitle + '</span>' +
                        statusBadge +
                    '</div>' +
                    actionBtn +
                '</div>' +
                '<div class="text-slate-700 font-medium"><i class="fa-solid fa-location-dot text-orange-500 mr-1"></i> ' + info.fromCity + ' / ' + info.fromDistrict + '</div>' +
                '<div class="text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 font-medium leading-relaxed"><strong>Özet:</strong> ' + (info.summary || 'Özet bulunmuyor') + '</div>' +
                '<div class="flex justify-between items-center text-slate-500 pt-1">' +
                    '<span>İş Sahibi: <strong>' + info.customerName + '</strong></span>' +
                    contactHtml +
                '</div>' +
                '<div class="bg-orange-50/50 p-2 rounded-lg border border-orange-100 mt-1">' +
                    '<div class="text-[10px] font-bold text-orange-800 mb-1 flex items-center"><i class="fa-solid fa-clock-rotate-left mr-1"></i> Verdiğiniz Teklifler:</div>' +
                    bidsHtml +
                '</div>' +
            '</div>';
        });
        
        if (window.myOffersFilters.status === 'Gizlenenler' && countGizli > 0) {
            contentHtml += '<button onclick="clearAllHiddenOffers()" class="w-full py-2 bg-red-100 hover:bg-red-500 text-red-600 hover:text-white rounded-xl text-xs font-bold transition shadow-sm mt-2"><i class="fa-solid fa-trash-can mr-1"></i> Gizli Tekliflerin Tümünü Kalıcı Olarak Sil</button>';
        }
    }

    container.innerHTML = filterHtml + contentHtml;
};

window.setMyOfferFilter = function(key, value) {
    window.myOffersFilters[key] = value;
    renderMyOffersLive();
};

window.hideMyOffer = async function(demandId) {
    if (!confirm("Bu teklifi aktif listenizden gizlemek istediğinize emin misiniz?")) return;
    try {
        var token = localStorage.getItem('tamonda_token');
        await fetch(`${window.API_BASE_URL}/api/demands/pro/hide-offer/` + demandId, {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + token }
        });
        var offer = window.mySubmittedOffersLive.find(o => o._id === demandId);
        if (offer) offer.isHidden = true;
        renderMyOffersLive();
    } catch (e) { alert("Bağlantı hatası"); }
};

window.unhideMyOffer = async function(demandId) {
    try {
        var token = localStorage.getItem('tamonda_token');
        await fetch(`${window.API_BASE_URL}/api/demands/pro/unhide-offer/` + demandId, {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + token }
        });
        var offer = window.mySubmittedOffersLive.find(o => o._id === demandId);
        if (offer) offer.isHidden = false;
        renderMyOffersLive();
    } catch (e) { alert("Bağlantı hatası"); }
};

function convertNumberToWords(val, itemId) {
  var wordDiv = document.getElementById('offer_words_' + itemId);
  var cleanVal = val.replace(/\D/g, '');

  if (!cleanVal || cleanVal == '0') {
    if(wordDiv) {
      wordDiv.innerText = '';
      wordDiv.classList.add('hidden');
    }
    return;
  }

  var number = parseInt(cleanVal, 10);
  var text = numberToTextTR(number) + ' TÜRK LİRASI';

  if(wordDiv) {
    wordDiv.innerText = 'TEKLİFİNİZ: ' + text;
    wordDiv.classList.remove('hidden');
  }
}

function numberToTextTR(num) {
  if (num === 0) return 'SIFIR';

  var birler = ['', 'BİR', 'İKİ', 'ÜÇ', 'DÖRT', 'BEŞ', 'ALTI', 'YEDİ', 'SEKİZ', 'DOKUZ'];
  var onlar = ['', 'ON', 'YİRMİ', 'OTUZ', 'KIRK', 'ELLİ', 'ALTMIŞ', 'YETMİŞ', 'SEKİZ', 'DOKSAN'];

  function cevir3Basamak(n) {
    var sonuc = '';
    var yuz = Math.floor(n / 100);
    var on = Math.floor((n % 100) / 10);
    var bir = n % 10;

    if (yuz > 0) {
      if (yuz > 1) sonuc += birler[yuz] + ' YÜZ';
      else sonuc += 'YÜZ';
    }
    if (on > 0) {
      sonuc += (sonuc ? ' ' : '') + onlar[on];
    }
    if (bir > 0) {
      sonuc += (sonuc ? ' ' : '') + birler[bir];
    }
    return sonuc;
  }

  var binlerBasamagi = ['', 'BİN', 'MİLYON', 'MİLYAR', 'TRİLYON'];
  var parcalar = [];
  var basamakIndex = 0;

  while (num > 0) {
    var basamakDegeri = num % 1000;
    if (basamakDegeri > 0) {
      var basamakMetni = cevir3Basamak(basamakDegeri);
      if (basamakIndex === 1 && basamakDegeri === 1) {
        parcalar.unshift('BİN');
      } else {
        parcalar.unshift(basamakMetni + (binlerBasamagi[basamakIndex] ? ' ' + binlerBasamagi[basamakIndex] : ''));
      }
    }
    num = Math.floor(num / 1000);
    basamakIndex++;
  }

  return parcalar.join(' ');
}

window.openProTab = function(tabName) {
    // 1. Tüm sekme içeriklerini ve butonlarını seç
    var demandsTab = document.getElementById('tabContentDemands');
    var offersTab = document.getElementById('tabContentOffers');
    var profileTab = document.getElementById('tabContentProfile');
    var reviewsTab = document.getElementById('tabContentReviews');
    
    var btnDemands = document.getElementById('tabBtnDemands');
    var btnOffers = document.getElementById('tabBtnOffers');
    var btnProfile = document.getElementById('tabBtnProfile');
    var btnReviews = document.getElementById('tabBtnReviews');

    // 2. Hepsini gizle ve butonları pasif duruma getir
    [demandsTab, offersTab, profileTab, reviewsTab].forEach(t => t && t.classList.add('hidden'));
    
    const activeClass = "pb-3 font-bold text-sm text-orange-600 border-b-2 border-orange-600 transition shrink-0 flex items-center";
    const passiveClass = "pb-3 font-bold text-sm text-slate-500 hover:text-slate-800 transition shrink-0 flex items-center";
    
    if(btnDemands) btnDemands.className = passiveClass;
    if(btnOffers) btnOffers.className = passiveClass;
    if(btnProfile) btnProfile.className = passiveClass;
    if(btnReviews) btnReviews.className = passiveClass;

    // Küçük/büyük harf duyarlılığını ortadan kaldır
    const normalizedTab = tabName.toLowerCase();

    // 3. Seçilen sekmeyi aktif et
    if (normalizedTab === 'demands') {
        if(demandsTab) demandsTab.classList.remove('hidden');
        if(btnDemands) btnDemands.className = activeClass;
        
        // YENİ EKLENEN: Sekmeye tıklandığında ilanları ve sayacı canlı olarak tazeleyecektir
        if (typeof renderProDemands === 'function') {
            window.renderProDemands();
        }
    } 
    else if (normalizedTab === 'offers') {
        if(offersTab) offersTab.classList.remove('hidden');
        if(btnOffers) btnOffers.className = activeClass;
        if (typeof loadMyOffersFromDB === 'function') {
            window.loadMyOffersFromDB();
        }
    }
    else if (normalizedTab === 'profile') {
        if(profileTab) profileTab.classList.remove('hidden');
        if(btnProfile) btnProfile.className = activeClass;
        
        // auth.js'den kurtarılan Profil Verisi Doldurma İşlemi
        if (typeof currentProUser !== 'undefined' && currentProUser) {
            document.getElementById('profNameStatic').innerText = currentProUser.name;
            document.getElementById('profCategoryStatic').innerText = currentProUser.categoryTitle;
            document.getElementById('profCityStatic').innerText = currentProUser.city;
            document.getElementById('profDistStatic').innerText = currentProUser.district;
            
            document.getElementById('profNewPhone').value = '';
            document.getElementById('profPhoneOtpInput').value = '';
            document.getElementById('profPhoneOtpArea').classList.add('hidden');
            document.getElementById('btnRequestPhoneOtp').innerText = 'SMS Kodu Gönder';
        }
    }
    else if (normalizedTab === 'reviews') { 
        if(reviewsTab) reviewsTab.classList.remove('hidden');
        if(btnReviews) btnReviews.className = activeClass;
        
        // YENİ DÜZENLEME: Numara doğrudan aktif oturum değişkeninden (currentProUser) çekiliyor
        if (typeof currentProUser !== 'undefined' && currentProUser && currentProUser.phone) {
            window.currentProOwnReviewPhone = currentProUser.phone;
            window.currentProOwnReviewPage = 1;
            fetchProOwnReviews();
        } else {
            document.getElementById('proOwnReviewsListContainer').innerHTML = '<div class="text-center py-4 text-xs text-red-500">Oturum bilgisi bulunamadı, lütfen tekrar giriş yapın.</div>';
        }
    }
};
window.currentProOwnReviewPhone = '';
window.currentProOwnReviewPage = 1;

window.fetchProOwnReviews = async function() {
    var container = document.getElementById('proOwnReviewsListContainer');
    var paginationBox = document.getElementById('proOwnReviewsPagination');
    var filterVal = document.getElementById('proOwnReviewFilter').value;
    
    if (!window.currentProOwnReviewPhone) return;

    container.innerHTML = '<div class="text-center py-4 text-xs text-slate-400"><i class="fa-solid fa-spinner fa-spin mr-1"></i> Yorumlarınız yükleniyor...</div>';
    
    try {
        var token = localStorage.getItem('tamonda_token');
        // Limit parametresini 10 gönderiyoruz (Backend'de limit parametresini alacak şekilde ayarlandıysa 10'arlı gelir)
        const res = await fetch(`${window.API_BASE_URL}/api/demands/pro/reviews?phone=${window.currentProOwnReviewPhone}&page=${window.currentProOwnReviewPage}&starFilter=${filterVal}&limit=10`, {
             headers: { 'Authorization': 'Bearer ' + token }
        });
        const data = await res.json();
        
        if (data.success) {
            container.innerHTML = '';
            if (data.reviews.length === 0) {
                container.innerHTML = '<div class="text-center py-6 text-xs text-slate-500 bg-slate-50 rounded-xl border border-slate-100"><i class="fa-regular fa-folder-open text-3xl text-slate-300 mb-2 block"></i>Bu kritere uygun değerlendirme bulunamadı.</div>';
            } else {
                data.reviews.forEach(r => {
                    var stars = Array(5).fill(0).map((_, i) => i < r.rating ? '<i class="fa-solid fa-star text-amber-400"></i>' : '<i class="fa-solid fa-star text-slate-200"></i>').join('');
                    var dateStr = new Date(r.date).toLocaleDateString('tr-TR');
                    
                    container.innerHTML += `
                        <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col gap-2 transition hover:bg-white hover:shadow-sm">
                            <div class="flex justify-between items-center">
                                <span class="text-xs font-bold text-slate-800"><i class="fa-solid fa-user-circle text-slate-400 mr-1.5"></i>${r.customerName}</span>
                                <span class="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">${dateStr}</span>
                            </div>
                            <div class="text-sm tracking-widest">${stars}</div>
                            <div class="text-xs text-slate-600 italic">"${r.comment || 'Puan verildi, metin yazılmadı.'}"</div>
                        </div>`;
                });
            }
            
            var prevBtn = data.currentPage > 1 ? `<button onclick="window.currentProOwnReviewPage--; fetchProOwnReviews();" class="text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition shadow-sm"><i class="fa-solid fa-chevron-left mr-1"></i>Önceki Sayfa</button>` : `<div></div>`;
            var nextBtn = data.currentPage < data.totalPages ? `<button onclick="window.currentProOwnReviewPage++; fetchProOwnReviews();" class="text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition shadow-sm">Sonraki Sayfa<i class="fa-solid fa-chevron-right ml-1"></i></button>` : `<div></div>`;
            
            paginationBox.innerHTML = `${prevBtn}<span class="text-[10px] text-slate-400 font-bold bg-slate-50 px-3 py-1 rounded-full border border-slate-100">Sayfa ${data.currentPage} / ${data.totalPages || 1}</span>${nextBtn}`;
        } else {
            container.innerHTML = `<div class="text-center py-4 text-xs text-red-500">Değerlendirmeler yüklenemedi: ${data.message}</div>`;
        }
    } catch (e) {
        container.innerHTML = '<div class="text-center py-4 text-xs text-red-500">Bağlantı hatası veya sunucu yanıt vermedi.</div>';
    }
};
function calculateEstimatedDistance(c1, d1, c2, d2) {
  if (!c1 || !c2) return 25;
  if (c1 === c2) return (d1 && d2 && d1 !== d2) ? 25 : 15;
  
  var p1 = cityCoords[c1] || [39.0, 35.0];
  var p2 = cityCoords[c2] || [39.0, 35.0];
  var lat1 = p1[0] * Math.PI / 180, lon1 = p1[1] * Math.PI / 180;
  var lat2 = p2[0] * Math.PI / 180, lon2 = p2[1] * Math.PI / 180;
  var dlat = lat2 - lat1, dlon = lon2 - lon1;
  var a = Math.sin(dlat / 2) * Math.sin(dlat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) * Math.sin(dlon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  var birdFlightKm = 6371 * c; // Gerçek kuş uçuşu mesafe
  
  // Türkiye karayolları sapma payı: Mesafe uzadıkça yol kıvrımları artar
  var multiplier = 1.30; 
  if (birdFlightKm > 50) multiplier = 1.35; // Orta mesafe
  if (birdFlightKm > 200) multiplier = 1.36; // Uzun mesafe (Otoyol/Dağ)
  
  // Otoyol giriş-çıkış payı olarak sabit +15 KM ekleniyor
  return Math.round(birdFlightKm * multiplier) + 15;
}
// İL VE İLÇE ARAMA / DİNAMİK SEÇİM MOTORU
function getSortedCityList() {
  if (typeof rawTurkeyLocations !== 'undefined') {
    return Object.keys(rawTurkeyLocations).sort(function(a,b){return a.localeCompare(b,'tr');});
  }
  return [];
}

function handleCityInput(inputId, dropdownId, districtSelectId, hiddenInputId) {
  var inputEl = document.getElementById(inputId);
  if (!inputEl) return;
  var searchVal = inputEl.value.trim().toLocaleLowerCase('tr');
  var dropdown = document.getElementById(dropdownId);
  if (!dropdown) return;
  dropdown.innerHTML = '';

  if(searchVal.length < 2) {
    dropdown.classList.add('hidden');
    return;
  }

  var sortedCityList = getSortedCityList();
  var filtered = sortedCityList.filter(function(c){
    return c.toLocaleLowerCase('tr').indexOf(searchVal) !== -1;
  });

  if(!filtered.length) {
    dropdown.innerHTML = '<div class="px-3 py-1.5 text-slate-400">İl bulunamadı</div>';
    dropdown.classList.remove('hidden');
    return;
  }

  filtered.forEach(function(city){
    var item = document.createElement('div');
    item.className = 'px-3 py-1.5 hover:bg-orange-50 hover:text-orange-700 cursor-pointer font-medium bg-white';
    item.innerText = city;
    item.onclick = function(){
      document.getElementById(inputId).value = city;
      if(document.getElementById(hiddenInputId)) {
        document.getElementById(hiddenInputId).value = city;
      }
      dropdown.classList.add('hidden');

      var distSelect = document.getElementById(districtSelectId);
      if(distSelect && typeof rawTurkeyLocations !== 'undefined' && rawTurkeyLocations[city]) {
        distSelect.innerHTML = '<option value="">İlçe Seçin</option>';
        rawTurkeyLocations[city].forEach(function(d){
          var opt = document.createElement('option');
          opt.value = d;
          opt.innerText = d;
          distSelect.appendChild(opt);
        });
      }
    };
    dropdown.appendChild(item);
  });
  dropdown.classList.remove('hidden');
}

window.onload = function() {
  // Sayfa yüklendiğinde fonksiyonlar kendi içindeki if (!element) korumalarıyla çalışacak
  filterCustomerCatalog('nakliyat');
  if (document.getElementById('proFilterCity')) initProCityDropdown();
  if(typeof checkProAuthState === 'function') checkProAuthState();
  
  if (!currentProUser || currentProUser.categoryKey !== 'admin') {
      if (typeof renderProDemands === 'function') renderProDemands();
      if (typeof loadMyOffersFromDB === 'function') loadMyOffersFromDB();
  }
};
window.switchCustomerTab = async function(tabName) {
    var tabBtnDemands = document.getElementById('tabBtnDemands');
    var tabBtnProfile = document.getElementById('tabBtnProfile');
    var containerDemands = document.getElementById('ownerDemandsContainer');
    var containerProfile = document.getElementById('ownerProfileContainer');

    if (tabName === 'demands') {
        tabBtnDemands.className = "flex-1 py-3 text-sm font-bold border-b-2 border-orange-500 text-orange-600 transition";
        tabBtnProfile.className = "flex-1 py-3 text-sm font-bold border-b-2 border-transparent text-slate-500 hover:text-slate-700 transition";
        containerDemands.classList.remove('hidden');
        containerProfile.classList.add('hidden');
    } else {
        tabBtnProfile.className = "flex-1 py-3 text-sm font-bold border-b-2 border-orange-500 text-orange-600 transition";
        tabBtnDemands.className = "flex-1 py-3 text-sm font-bold border-b-2 border-transparent text-slate-500 hover:text-slate-700 transition";
        containerProfile.classList.remove('hidden');
        containerDemands.classList.add('hidden');
        
        // Backend'den profili çekip form elemanlarına bas
        try {
            var token = localStorage.getItem('tamonda_token');
            const res = await fetch(`${window.API_BASE_URL}/api/auth/profile`, {
                headers: { 'Authorization': 'Bearer ' + token }
            });
            const data = await res.json();
            if(data.success) {
                document.getElementById('profFullName').value = data.user.fullName || '';
                document.getElementById('profEmail').value = data.user.email || '';
                
                var pref = data.user.contactPreference;
                if(pref) { document.getElementById('profContactPref').value = pref; }
            }
        } catch(e) { console.error("Profil çekilemedi:", e); }
    }
};

window.updateCustomerProfile = async function() {
    var fullName = document.getElementById('profFullName').value.trim();
    var email = document.getElementById('profEmail').value.trim();
    var contactPref = document.getElementById('profContactPref').value;
    
    if(!fullName) { alert('Ad Soyad alanı boş bırakılamaz.'); return; }
    
    try {
        var token = localStorage.getItem('tamonda_token');
        const res = await fetch(`${window.API_BASE_URL}/api/auth/profile`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token 
            },
            body: JSON.stringify({ fullName, email, contactPreference: contactPref })
        });
        const data = await res.json();
        
        if(data.success) {
            alert('Profil bilgileriniz başarıyla güncellendi.');
        } else {
            alert(data.message || 'Güncelleme başarısız.');
        }
    } catch (e) {
        alert('Sunucu hatası. Kaydedilemedi.');
    }
};
window.deleteMyOfferPermanently = async function(demandId) {
    if (!confirm("Bu teklifi veritabanından kalıcı olarak silmek istediğinize emin misiniz? (Bu işlem geri alınamaz)")) return;
    
    try {
        var token = localStorage.getItem('tamonda_token');
        const res = await fetch(`${window.API_BASE_URL}/api/demands/pro/offer/` + demandId, {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const data = await res.json();
        
        if (data.success) {
            // Silinen teklifi canlı listeden filtrele ve ekranı yeniden çiz
            window.mySubmittedOffersLive = window.mySubmittedOffersLive.filter(o => String(o._id) !== String(demandId));
            renderMyOffersLive();
        } else {
            alert(data.message || "Silme işlemi başarısız.");
        }
    } catch (e) { 
        alert("Sunucuya bağlanılamadı."); 
    }
};

window.clearAllHiddenOffers = async function() {
    if (!confirm("Gizli sekmesindeki TÜM tekliflerinizi kalıcı olarak silmek istediğinize emin misiniz? (Bu işlem geri alınamaz)")) return;
    
    try {
        var token = localStorage.getItem('tamonda_token');
        const res = await fetch(`${window.API_BASE_URL}/api/demands/pro/hidden-offers/clear`, {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const data = await res.json();
        
        if (data.success) {
            // Gizli olan tüm teklifleri canlı listeden temizle ve ekranı yeniden çiz
            window.mySubmittedOffersLive = window.mySubmittedOffersLive.filter(o => !o.isHidden);
            renderMyOffersLive();
        } else {
            alert(data.message || "Toplu silme başarısız.");
        }
    } catch (e) { 
        alert("Sunucuya bağlanılamadı."); 
    }
};
// ==========================================
// YENİ: KARŞILAMA MODALI VE DOM TAŞIMA MOTORU
// ==========================================

// Formları Popup'ın içine ışınla ve süreci başlat
function startFlowFromModal(key, title, mainCat) {
    var modalFormBody = document.getElementById('modalFormBody');
    if(modalFormBody) {
        // İlan form adımlarını ana sayfadan koparıp popup'ın içine taşıyoruz
        modalFormBody.appendChild(document.getElementById('step2'));
        modalFormBody.appendChild(document.getElementById('step3'));
        modalFormBody.appendChild(document.getElementById('step4'));
        modalFormBody.appendChild(document.getElementById('stepSuccess'));
    }
    
    // Popup içindeki aşamaları gizle, form ekranını aç
    document.getElementById('welcomeStep1').classList.add('hidden');
    document.getElementById('welcomeStep2').classList.add('hidden');
    document.getElementById('welcomeStep3').classList.add('hidden');
    document.getElementById('welcomeStepForm').classList.remove('hidden');
    
    // Orijinal form üretim sürecini başlat
    selectCategory(key, title, mainCat);
}

// Modalı Kapatma ve Arayüzü Sıfırlama
function closeWelcomeModal() {
    var modal = document.getElementById('welcomeModal');
    var content = document.getElementById('welcomeModalContent');
    if (modal && content) {
        modal.classList.remove('opacity-100', 'pointer-events-auto');
        modal.classList.add('opacity-0', 'pointer-events-none');
        content.classList.remove('scale-100');
        content.classList.add('scale-95');
        document.body.style.overflow = '';
        
        var mainFormContainer = document.getElementById('mainFormContainer');
        var s2 = document.getElementById('step2');
        if (mainFormContainer && s2 && s2.parentElement && s2.parentElement.id === 'modalFormBody') {
            mainFormContainer.appendChild(document.getElementById('step2'));
            mainFormContainer.appendChild(document.getElementById('step3'));
            mainFormContainer.appendChild(document.getElementById('step4'));
            mainFormContainer.appendChild(document.getElementById('stepSuccess'));
            
            if(typeof goToStep === 'function') goToStep(1);
        }
        
        var elForm = document.getElementById('welcomeStepForm');
        var el1 = document.getElementById('welcomeStep1');
        var el2 = document.getElementById('welcomeStep2');
        var el3 = document.getElementById('welcomeStep3');
        var elSub = document.getElementById('welcomeStepSub');
        
        if (elForm) elForm.classList.add('hidden');
        if (el2) el2.classList.add('hidden');
        if (el3) el3.classList.add('hidden');
        if (elSub) elSub.classList.add('hidden');
        if (el1) el1.classList.remove('hidden');
    }
}
// 1. Ekrandan 2. Ekrana Geçiş
function showWelcomeStep2() {
    document.getElementById('welcomeStep1').classList.add('hidden');
    document.getElementById('welcomeStep2').classList.remove('hidden');
    setTimeout(() => { document.getElementById('modalQuickSearch').focus(); }, 100);
}

// 2. Ekrandan 3. Ekrana Geçiş (Listede Yok mu Butonu)
function openModalStep3() {
    document.getElementById('welcomeStep2').classList.add('hidden');
    document.getElementById('welcomeStep3').classList.remove('hidden');
}

// 3. Ekrandan 2. Ekrana Geri Dönüş
function backToModalStep2() {
    document.getElementById('welcomeStep3').classList.add('hidden');
    document.getElementById('welcomeStep2').classList.remove('hidden');
}
// YENİ: Alt Kategori Ekranından (Aşama 2.5) Ana Kategoriye Geri Dönüş
function backToWelcomeStep2() {
    var subStep = document.getElementById('welcomeStepSub');
    if (subStep) subStep.classList.add('hidden');
    document.getElementById('welcomeStep2').classList.remove('hidden');
}
// YENİ: Alt Kategori Ekranından (Aşama 2.5) Ana Kategoriye Geri Dönüş
function backToWelcomeStep2() {
    document.getElementById('welcomeStepSub').classList.add('hidden');
    document.getElementById('welcomeStep2').classList.remove('hidden');
}
// Modal içi Hızlı Kategori Seçimi (DÜZELTİLDİ: Artık popup içinde alt kategorileri açar)
function filterFromModal(catKey) {
    // İlgili ana kategoriye ait 84 maddelik asıl listeden alt hizmetleri bul
    var subCats = serviceCatalog.filter(function(s) { return s.mainCat === catKey; });
    
    if (subCats.length === 0) {
        startFlowFromModal(catKey + '_diger', 'Özel Hizmet Talebi', catKey);
        return;
    }

    // Alt kategorileri popup (modalSubGrid) içine çizdir
    var grid = document.getElementById('modalSubGrid');
    if (!grid) {
        console.error("Alt kategorilerin çizileceği modalSubGrid HTML içinde bulunamadı!");
        return;
    }
    grid.innerHTML = '';
    
    subCats.forEach(function(item) {
        var btn = document.createElement('button');
        
        // "Diğer" seçeneği ise VIP tasarım uygula
        if (item.key.endsWith('_diger')) {
            btn.className = 'col-span-1 sm:col-span-2 p-3 rounded-xl border-2 border-orange-300 hover:border-orange-500 text-left bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 transition shadow-sm group flex items-center gap-3 mt-1';
            btn.innerHTML = '<div class="w-9 h-9 min-w-[36px] rounded-full bg-white shadow-sm text-orange-500 flex items-center justify-center text-sm transition"><i class="fa-solid fa-wand-magic-sparkles"></i></div><div class="flex-1"><div class="font-black text-xs text-orange-900">Aradığınızı Bulamadınız mı?</div><div class="text-[10px] text-orange-800/80 font-medium">Bize yazın, size özel teklif sunalım.</div></div>';
            btn.onclick = function() {
                document.getElementById('welcomeStepSub').classList.add('hidden');
                startFlowFromModal(item.key, 'Özel Hizmet Talebi', item.mainCat);
            };
        } else {
            // Standart alt hizmet kartı
            btn.className = 'p-3 rounded-xl border border-slate-200 hover:border-orange-500 text-left bg-slate-50 hover:bg-orange-50/40 transition flex flex-col gap-1.5 shadow-sm group';
            btn.innerHTML = '<div class="w-8 h-8 rounded-lg bg-orange-100 group-hover:bg-orange-500 group-hover:text-white text-orange-600 flex items-center justify-center text-sm transition"><i class="fa-solid ' + item.icon + '"></i></div><div><div class="font-bold text-xs text-slate-900">' + item.title + '</div><div class="text-[10px] text-slate-500 line-clamp-1">' + item.desc + '</div></div>';
            btn.onclick = function() {
                document.getElementById('welcomeStepSub').classList.add('hidden');
                startFlowFromModal(item.key, item.title, item.mainCat);
            };
        }
        grid.appendChild(btn);
    });

    // Popup Üst Başlığını Seçilen Kategoriye Göre Ayarla
    var titleEl = document.getElementById('modalSubTitle');
    if (titleEl) {
        var catNames = { 
            'agir_nakliye':'Ağır Nakliye', 'nakliyat':'Nakliyat', 'temizlik':'Temizlik', 
            'oto':'Oto Servis', 'organizasyon':'Organizasyon', 'tamir':'Tamir & Servis', 
            'tadilat':'Tadilat', 'ders':'Özel Ders', 'medya':'Foto & Video', 
            'pet':'Evcil Hayvan', 'saglik':'Sağlık & Terapi', 'spor':'Spor & Fitness', 
            'guzellik':'Güzellik & Bakım', 'dijital':'Dijital & Yazılım', 'danismanlik':'Danışmanlık' 
        };
        titleEl.innerText = catNames[catKey] || 'Hizmet Seçin';
    }

    // Ana Ekranı Kapat, Alt Kategori Ekranını Aç
    document.getElementById('welcomeStep2').classList.add('hidden');
    document.getElementById('welcomeStepSub').classList.remove('hidden');
}

    // 3. Kullanıcıyı seçtiği kategori listesinin olduğu alana yumuşakça kaydır
    var targetEl = document.getElementById('step1');
    if(targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }


// Modal Adım 3'ten gelen Özel (Serbest) Talep Seçimi (Bu kısım aynen kalmalı, çünkü burada amaç özel form oluşturmaktır)
function startCustomDemandFromModal(mainCatKey, mainCatTitle) {
    // Özel talep mantığını seçilen ana kategori ile tetikliyoruz.
    // _diger ile bittiği için form ekranı atlanıp açıklama kutusu otomatik açılır!
    startFlowFromModal(mainCatKey + '_diger', 'Özel Hizmet Talebi', mainCatKey);
}
// Kusursuz Arama Motoru (Pop-up içi)
function handleModalQuickSearch(val) {
    var cleanVal = val.trim().toLocaleLowerCase('tr');
    var box = document.getElementById('modalQuickSearchResults');
    if(!box) return;
    
    if(cleanVal.length < 2) {
        box.innerHTML = '';
        box.classList.add('hidden');
        return;
    }

    var matches = serviceCatalog.filter(function(s) {
        return s.title.toLocaleLowerCase('tr').indexOf(cleanVal) !== -1 || s.desc.toLocaleLowerCase('tr').indexOf(cleanVal) !== -1;
    }).slice(0, 6);

    if(!matches.length) {
        box.innerHTML = '<div class="px-3 py-4 text-slate-500 font-medium text-center">Eşleşen hizmet bulunamadı.<br>Lütfen "Özel Talep Oluştur" butonunu kullanın.</div>';
        box.classList.remove('hidden');
        return;
    }

    box.innerHTML = '';
    matches.forEach(function(m) {
        var row = document.createElement('div');
        row.className = 'px-4 py-3 hover:bg-orange-50 cursor-pointer flex items-center gap-3 text-slate-800 transition border-b border-slate-50 last:border-0';
        // İkon rengini dinamik eşleştiriyoruz
        row.innerHTML = '<div class="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-sm text-orange-600"><i class="fa-solid ' + m.icon + '"></i></div><div class="flex-1"><div class="font-bold text-sm text-slate-800">' + m.title + '</div></div><i class="fa-solid fa-chevron-right text-xs text-slate-300"></i>';
        
        row.onclick = function() {
            // Arama sonucundan tıklandığında süreci form ekranına taşıyarak başlatır
            startFlowFromModal(m.key, m.title, m.mainCat);
        };
        box.appendChild(row);
    });
    box.classList.remove('hidden');
}

// Sayfa yüklemesi ve Arka Plan Kilitlemesi
window.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById('welcomeModal');
    if (modal) {
        setTimeout(function() {
            var content = document.getElementById('welcomeModalContent');
            if (content) {
                modal.classList.remove('opacity-0', 'pointer-events-none');
                modal.classList.add('opacity-100', 'pointer-events-auto');
                content.classList.remove('scale-95');
                content.classList.add('scale-100');
                // Popup açıkken ana sayfanın kaymasını durdur (Scroll Bleed Fix)
                document.body.style.overflow = 'hidden';
            }
        }, 800); 
    }
});

   // 1. Şehirleri Tüm Kutulara Doldurma
    window.initProCityDropdown = function() {
        var citySelect = document.getElementById('proFilterCity');
        var fromCitySelect = document.getElementById('proFilterFromCity');
        var toCitySelect = document.getElementById('proFilterToCity');
        
        var sortedCityList = typeof getSortedCityList === 'function' ? getSortedCityList() : Object.keys(typeof rawTurkeyLocations !== 'undefined' ? rawTurkeyLocations : {});
        
        if (citySelect) citySelect.innerHTML = '<option value="">İl Seç (Tümü)</option>';
        if (fromCitySelect) fromCitySelect.innerHTML = '<option value="">Çıkış İli (Tümü)</option>';
        if (toCitySelect) toCitySelect.innerHTML = '<option value="">Varış İli (Tümü)</option>';
        
        sortedCityList.forEach(function(city) {
            if (citySelect) citySelect.appendChild(new Option(city, city));
            if (fromCitySelect) fromCitySelect.appendChild(new Option(city, city));
            if (toCitySelect) toCitySelect.appendChild(new Option(city, city));
        });
    };
    // 2. İlçeleri Hedef Kutuya Doldurma
    window.populateProFilterDistrict = function(selectedCity, targetId) {
        var districtSelect = document.getElementById(targetId);
        if (!districtSelect) return;
        
        var defaultLabel = 'İlçe Seç (Tümü)';
        if (targetId === 'proFilterFromDistrict') defaultLabel = 'Çıkış İlçesi (Tümü)';
        if (targetId === 'proFilterToDistrict') defaultLabel = 'Varış İlçesi (Tümü)';
        
        districtSelect.innerHTML = '<option value="">' + defaultLabel + '</option>';
        if (!selectedCity) return;

        var locationsObj = (typeof rawTurkeyLocations !== 'undefined') ? rawTurkeyLocations : {};
        var exactCity = Object.keys(locationsObj).find(c => c.toLocaleLowerCase('tr') === selectedCity.toLocaleLowerCase('tr'));

        if (exactCity) {
            locationsObj[exactCity].forEach(function(district) {
                districtSelect.appendChild(new Option(district, district));
            });
        }
    };
   
    window.populateProFilterDistrict = function(selectedCity) {
        var districtSelect = document.getElementById('proFilterDistrict');
        if (!districtSelect) return;
        
        districtSelect.innerHTML = '<option value="">Tüm İlçeler</option>';
        if (!selectedCity) return;

        var locationsObj = (typeof rawTurkeyLocations !== 'undefined') ? rawTurkeyLocations : (typeof turkeyLocations !== 'undefined' ? turkeyLocations : {});
        var exactCity = Object.keys(locationsObj).find(c => c.toLocaleLowerCase('tr') === selectedCity.toLocaleLowerCase('tr'));

        if (exactCity) {
            locationsObj[exactCity].forEach(function(district) {
                var opt = document.createElement('option');
                opt.value = district;
                opt.innerText = district;
                districtSelect.appendChild(opt);
            });
        }
    };

    // Filtre menülerini dışa tıklayınca kapatma
    document.addEventListener('click', function(e) {
        var cityDrop = document.getElementById('proFilterCityDropdown');
        if (cityDrop && !e.target.closest('#proFilterCity') && !e.target.closest('#proFilterCityDropdown')) {
            cityDrop.classList.add('hidden');
        }
    });
    // ==========================================
// ADMİN PANELİ: YORUM MODERASYONU (LİSTELEME VE SİLME)
// ==========================================

// Aktif incelenen ustanın telefon numarası ve tüm yorumları (Filtreleme için)
window.currentAdminReviewPhone = null;
window.currentAdminRawReviews = [];

// Yorum Modalını Açma ve Veri Çekme
window.openAdminReviewsModal = async function(proPhone, proName) {
    window.currentAdminReviewPhone = proPhone;
    document.getElementById('adminReviewProName').innerText = proName;
    document.getElementById('adminReviewKeyword').value = '';
    document.getElementById('adminReviewStarFilter').value = '0';
    document.getElementById('adminReviewsModal').classList.remove('hidden');
    
    var container = document.getElementById('adminReviewsListContainer');
    container.innerHTML = '<div class="text-center py-4 text-xs text-slate-400"><i class="fa-solid fa-spinner fa-spin mr-1"></i> Yorumlar yükleniyor...</div>';
    
    try {
        var token = localStorage.getItem('tamonda_admin_token');
        // Limit olmadan (veya çok yüksek bir limitle) tüm yorumları çekmek için api çağrısı
        // Not: getProReviews backend'de sayfalama yapıyor, admin için limit'i 100 olarak gönderiyoruz
        const res = await fetch(`${window.API_BASE_URL}/api/demands/pro/reviews?phone=${proPhone}&page=1&limit=100`, {
             headers: { 'Authorization': 'Bearer ' + token }
        });
        const data = await res.json();
        
        if (data.success) {
            window.currentAdminRawReviews = data.reviews || [];
            renderAdminReviews(window.currentAdminRawReviews);
        } else {
            container.innerHTML = `<div class="text-center py-4 text-xs text-red-500">Hata: ${data.message}</div>`;
        }
    } catch (e) {
        container.innerHTML = '<div class="text-center py-4 text-xs text-red-500">Bağlantı hatası.</div>';
    }
};

// Yorumları Ekrana Çizme
window.renderAdminReviews = function(reviewsArray) {
    var container = document.getElementById('adminReviewsListContainer');
    container.innerHTML = '';
    
    if (reviewsArray.length === 0) {
        container.innerHTML = '<div class="text-center py-6 text-xs text-slate-500 bg-white rounded-xl border border-slate-200">Kritere uygun yorum bulunamadı.</div>';
        return;
    }
    
    reviewsArray.forEach(r => {
        var stars = Array(5).fill(0).map((_, i) => i < r.rating ? '<i class="fa-solid fa-star text-amber-400"></i>' : '<i class="fa-solid fa-star text-slate-200"></i>').join('');
        var dateStr = new Date(r.date).toLocaleDateString('tr-TR');
        
        // Telefon numarası backend'den geliyorsa göster, gelmiyorsa boş bırak
        var phoneBadge = r.customerPhone 
            ? `<span class="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 ml-2"><i class="fa-solid fa-phone text-slate-400 mr-1"></i>${r.customerPhone}</span>` 
            : '';
        
        container.innerHTML += `
            <div class="bg-white p-4 rounded-xl border border-slate-200 flex flex-col gap-2 relative group hover:border-orange-200 transition">
                <div class="flex justify-between items-start pr-8">
                    <div>
                       <div class="flex items-center">
                           <span class="text-xs font-bold text-slate-800"><i class="fa-solid fa-user-circle text-slate-400 mr-1.5"></i>${r.customerName}</span>
                           ${phoneBadge}
                       </div>
                       <div class="text-sm tracking-widest mt-1">${stars}</div>
                    </div>
                    <span class="text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">${dateStr}</span>
                </div>
                <div class="text-xs text-slate-600 italic border-l-2 border-orange-200 pl-2 mt-1">"${r.comment || 'Puan verildi, metin yazılmadı.'}"</div>
                
                <!-- Silme Butonu -->
                <button onclick="deleteAdminReview('${r.demandId}')" class="absolute top-3 right-3 w-7 h-7 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded-lg flex items-center justify-center transition opacity-50 group-hover:opacity-100" title="Yorumu Sil">
                    <i class="fa-solid fa-trash-can text-[10px]"></i>
                </button>
            </div>`;
    });
};

// Ön Yüzde Kelime ve Yıldız Filtresi Uygulama
window.filterAdminReviews = function() {
    var keyword = document.getElementById('adminReviewKeyword').value.toLowerCase('tr');
    var starFilter = parseInt(document.getElementById('adminReviewStarFilter').value);
    
    var filtered = window.currentAdminRawReviews.filter(r => {
        var matchKeyword = keyword === '' || (r.comment && r.comment.toLowerCase('tr').includes(keyword)) || (r.customerName && r.customerName.toLowerCase('tr').includes(keyword));
        var matchStar = starFilter === 0 || r.rating === starFilter;
        return matchKeyword && matchStar;
    });
    
    renderAdminReviews(filtered);
};

// Admin Yorum Silme İstediği Gönderme
window.deleteAdminReview = async function(demandId) {
    if(!confirm("Bu yorumu tamamen silmek istediğinize emin misiniz? Ustanın ortalama puanı yeniden hesaplanacaktır.")) return;
    
    try {
        var token = localStorage.getItem('tamonda_admin_token');
        const response = await fetch(`${window.API_BASE_URL}/api/demands/admin/reviews/delete`, {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token 
            },
            body: JSON.stringify({ 
                proPhone: window.currentAdminReviewPhone,
                reviewDemandId: demandId
            })
        });
        
        const data = await response.json();
        if(data.success) {
            // Silinen yorumu diziden çıkar ve ekranı yenile
            window.currentAdminRawReviews = window.currentAdminRawReviews.filter(r => String(r.demandId) !== String(demandId));
            filterAdminReviews(); // Ekranı güncelle
            
            // Eğer istersen arkada usta listesini de tazeleyebilirsin
            if(typeof loadAdminProsFromDB === 'function') loadAdminProsFromDB(window.currentAdminProsPage || 1);
        } else {
            alert("Silme başarısız: " + data.message);
        }
    } catch(err) {
        alert("Sunucu ile iletişim koptu.");
    }
};
// PWA ve Bildirim İzni İsteme Fonksiyonu
const publicVapidKey = 'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuB-5qMEGA12uX_OviXpEwdoUI'; // Test amaçlı public key

async function enablePushNotifications() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        try {
            // Service Worker'ı kaydet
            const register = await navigator.serviceWorker.register('/service-worker.js');
            
            // Bildirim İzni İste
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') {
                alert('Bildirim izni verilmedi.');
                return;
            }

            // Abone ol
            const subscription = await register.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
            });

            // Aboneliği Backend'e Gönder (İleride bunu giriş yapan ustanın userId'si ile eşleştireceğiz)
            await fetch(`${window.API_BASE_URL}/api/push/subscribe`, {
                method: 'POST',
                body: JSON.stringify(subscription),
                headers: { 'Content-Type': 'application/json' }
            });

            alert('Bildirimler başarıyla aktif edildi! Artık site kapalıyken bile anlık mesaj alabilirsiniz.');
            
        } catch (error) {
            console.error('Bildirim aboneliği hatası:', error);
        }
    } else {
        alert('Tarayıcınız anlık bildirimleri (Web Push) desteklemiyor.');
    }
}

// Yardımcı Fonksiyon (VAPID key dönüştürücü)
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
// --- YENİ UX KURGU FONKSİYONLARI ---

// 1. Yeni OTP İsteme Fonksiyonu (Sadece kodu tekrar ister, form işlemlerini atlar)
async function resendOtpCode() {
    try {
        const response = await fetch(`${window.API_BASE_URL}/api/auth/send-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                phone: currentDemand.phone,
                fullName: currentDemand.name 
            })
        });
        const data = await response.json();
        
        if (data.success) {
            console.log("Yeni OTP Kodu (Test):", data.debugOtp);
            alert('Yeni onay kodu telefonunuza gönderildi.');
            startOtpTimer(); // Sayacı tekrar sıfırla ve başlat
        } else {
            alert(data.message || 'SMS kodu gönderilemedi.');
        }
    } catch (error) {
        console.error('OTP Tekrar Gönderim Hatası:', error);
        alert('Sunucuya bağlanılamadı.');
    }
}

// 2. OTP 60 Saniye Geri Sayım Sayacı
window.startOtpTimer = function() {
    const btn = document.getElementById('resendOtpBtn');
    if(!btn) return;
    
    let timeLeft = 60;
    btn.disabled = true;
    btn.classList.replace('text-orange-500', 'text-slate-400');
    btn.classList.add('cursor-not-allowed');
    btn.innerText = `Tekrar Gönder (${timeLeft}s)`;

    // Varsa eski sayacı temizle (üst üste binmeyi önler)
    if(window.otpTimerInterval) clearInterval(window.otpTimerInterval);

    window.otpTimerInterval = setInterval(() => {
        timeLeft--;
        btn.innerText = `Tekrar Gönder (${timeLeft}s)`;
        
        if (timeLeft <= 0) {
            clearInterval(window.otpTimerInterval);
            btn.disabled = false;
            btn.innerText = "Kodu Tekrar Gönder";
            btn.classList.replace('text-slate-400', 'text-orange-500');
            btn.classList.remove('cursor-not-allowed');
        }
    }, 1000);
};

// 3. Numarayı Düzenle (Geri Dön) Fonksiyonu
window.goBackToPhoneStep = function() {
    var step4El = document.getElementById('step4');
    var step3El = document.getElementById('step3');
    if (step4El) step4El.classList.add('hidden');
    if (step3El) step3El.classList.remove('hidden');
    
    // Geri dönüldüğünde sayacı temizle
    if(window.otpTimerInterval) clearInterval(window.otpTimerInterval);
};

// 4. İlanı İptal Et ve Vazgeç Fonksiyonu
window.cancelDemandProcess = function() {
    const isConfirmed = confirm("İlanınıza ait tüm veri girişi silinecektir. Onaylıyor musunuz?");
    if (isConfirmed) {
        window.location.reload(); // İlan verilerini silmenin ve ana sayfaya dönmenin en güvenli yoludur
    }
};