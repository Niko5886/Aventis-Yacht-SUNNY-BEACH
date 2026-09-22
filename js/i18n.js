/* =====================================================================
   AVENTIS — i18n (BG / EN)
   Dictionary + language switch. Default: BG (persisted in localStorage).
   Hero stage text is rendered here and re-rendered on scroll-stage change
   (event 'aventis:herostage' dispatched by canvas-hero.js) and on lang change.
   ===================================================================== */
(function () {
  'use strict';

  var DICT = {
    en: {
      /* nav */
      nav_home: 'Home', nav_yachts: 'Yachts', nav_destinations: 'Destinations',
      nav_experience: 'Experience', nav_about: 'About', nav_contact: 'Contact',
      nav_book: 'Book a Yacht',

      /* about */
      about_eyebrow: 'OUR HERITAGE',
      about_title: 'A Legacy of Pure Maritime Luxury',
      about_lead: "For more than three decades, Aventis has set the gold standard in private yacht charters. Combining discreet five-star hospitality with the world's most prestigious maritime fleet, we craft voyages that live long in memory.",
      about_body: 'Every itinerary is composed by hand — from secluded anchorages and Michelin-trained galleys to certified master crews who anticipate your every desire.',
      stat_vessels: 'Fleet Vessels', stat_destinations: 'Global Destinations',
      stat_satisfaction: 'Client Satisfaction', stat_years: 'Years of Excellence',

      /* fleet */
      fleet_eyebrow: 'THE FLEET',
      fleet_title: 'Handpicked Signature Vessels',
      fleet_sub: 'A curated selection from our private fleet — each yacht a masterpiece of design, comfort and seamanship.',
      tab_all: 'All', tab_motor: 'Motor Yachts', tab_sail: 'Sailing Yachts', tab_cat: 'Catamarans',
      tag_motor: 'MOTOR YACHT', tag_sail: 'SAILING YACHT', tag_cat: 'LUXURY CATAMARAN',
      specs_meridian: '164 FT / 50M • 12 GUESTS • 6 CABINS • CREW OF 11',
      specs_breeze: '120 FT / 36M • 8 GUESTS • 4 CABINS • CREW OF 6',
      specs_aqua: '82 FT / 25M • 10 GUESTS • 5 CABINS • CREW OF 4',
      rate_meridian: 'From $145,000 <em>/ week</em>',
      rate_breeze: 'From $85,000 <em>/ week</em>',
      rate_aqua: 'From $65,000 <em>/ week</em>',

      /* experience */
      exp_eyebrow: 'TAILORED VOYAGES',
      exp_title: 'Crafted Moments on Open Water',
      exp_sub: 'The art of bespoke yachting lies in the details — every voyage composed around your rhythm, your palate and your sense of wonder.',
      feat1_title: 'Bespoke Itineraries', feat1_desc: 'Custom routing to secluded bays, untouched anchorages and private harbors.',
      feat2_title: 'Michelin-Trained Private Chefs', feat2_desc: 'World-class culinary experiences tailored to your dietary palate.',
      feat3_title: 'Curated Water Toys & Tenders', feat3_desc: 'Seabobs, hydrofoils, jetskis, deep-sea diving gear and high-speed chase tenders.',
      feat4_title: 'Certified Master Captains', feat4_desc: 'Highly credentialed navigators ensuring supreme safety and access.',

      /* destinations */
      dest_eyebrow: 'TOP DESTINATIONS',
      dest_title: 'Iconic Places, Extraordinary Journeys',
      dest_sub: 'From the historic coastline of Sunny Beach to endlessly beautiful hidden Bulgarian beaches, discover breathtaking destinations by sea.',
      dest_btn: 'Explore Destinations',
      dest1_sub: 'Black Sea Coast, Bulgaria', dest1_title: 'Sunny Beach',
      dest2_sub: 'Historic Old Town', dest2_title: 'Sozopol',
      dest3_sub: 'Golden Beaches', dest3_title: 'Primorsko',

      /* cta */
      cta_eyebrow: 'YOUR PERSONAL SANCTUARY',
      cta_title: 'The Sea Awaits.<br />Plan Your Bespoke Escape.',
      cta_btn: 'Inquire With A Charter Broker',

      /* testimonials */
      testi1: "Sailing the Mediterranean with Aventis surpassed every expectation. The crew's discretion, the culinary artistry, and the vessel's immaculate finish made it an unforgettable journey.",
      testi1_role: 'Monaco Charter Client',
      testi2: 'From the first call to the final sunset, every detail was anticipated. Aventis turned a family holiday into the most cherished week of our year.',
      testi2_role: 'Sunny Beach Charter Client',
      testi3: 'Impeccable taste and flawless execution. The private chef alone was worth the voyage — and the anchorages they found were pure magic.',
      testi3_role: 'Amalfi Charter Client',

      /* footer */
      footer_bio: 'Crafting extraordinary maritime journeys with bespoke itineraries and world-class hospitality since 1988.',
      footer_fleet: 'Fleet', footer_cat: 'Luxury Catamarans', footer_mega: 'Mega Yachts', footer_new: 'New Additions',
      footer_dest1: 'Sunny Beach & Black Sea Coast', footer_dest3: 'French Riviera', footer_dest4: 'Amalfi Coast', footer_dest5: 'Greek Cyclades',
      footer_concierge: 'Charter Concierge', footer_news: 'Receive curated seasonal itineraries.', footer_email: 'Your email address',
      footer_thanks: 'Thank you — curated itineraries are on their way.',
      footer_copy: '© 2026 Aventis Yacht SUNNY BEACH | All rights reserved.',
      footer_privacy: 'Privacy Policy', footer_terms: 'Terms of Charter', footer_safety: 'Maritime Safety',

      /* search modal */
      search_ph: 'Search yachts, destinations, experiences…',
      chip1: 'Sozopol', chip2: '50m+ Motor Yachts', chip3: 'Summer in Greece', chip4: 'Catamarans',

      /* booking modal */
      book_eyebrow: 'CHARTER ENQUIRY', book_title: 'Begin Your Bespoke Voyage',
      book_dest: 'Destination', book_dest_ph: 'e.g. The Mediterranean',
      book_pref: 'Yacht Preference', opt_motor: 'Motor Yacht', opt_sail: 'Sailing Yacht', opt_cat: 'Luxury Catamaran', opt_mega: 'Mega Yacht',
      book_dates: 'Charter Dates', book_dates_ph: 'Select your dates',
      book_guests: 'Number of Guests',
      book_requests: 'Special Requests', book_requests_ph: 'Tell us about your ideal voyage…',
      book_send: 'Send Enquiry',
      book_thanks: 'Thank you — a charter broker will contact you within 24 hours.',

      /* yacht modal */
      ym_desc: 'A flagship of the Aventis private fleet — appointed with sumptuous staterooms, expansive sun decks and a full suite of water toys, supported by a discreet professional crew.',
      ym_btn: 'Enquire About This Yacht',

      hero: [
        { eyebrow: 'BESPOKE PRIVATE CHARTERS', title: 'Extraordinary Journeys', desc: 'Curated maritime voyages handcrafted for those who demand the finest in luxury yachting.', btn1: 'Explore The Fleet', btn2: 'Watch Story' },
        { eyebrow: 'MARINE EXCELLENCE', title: 'Unrivaled Freedom', desc: 'Chart your own horizon across pristine archipelagos with Michelin-trained private crews.', btn1: 'View Destinations', btn2: 'Inquire Now' },
        { eyebrow: 'THE PINNACLE OF LUXURY', title: 'Endless Horizons', desc: 'Immerse yourself in timeless coastal elegance where world-class service meets absolute serenity.', btn1: 'Begin Journey', btn2: 'Charter Guide' }
      ]
    },

    bg: {
      /* nav */
      nav_home: 'Начало', nav_yachts: 'Яхти', nav_destinations: 'Дестинации',
      nav_experience: 'Изживяване', nav_about: 'За нас', nav_contact: 'Контакти',
      nav_book: 'Резервирай яхта',

      /* about */
      about_eyebrow: 'НАШЕТО НАСЛЕДСТВО',
      about_title: 'Наследство от чист морски лукс',
      about_lead: 'Повече от три десетилетия Aventis задава златния стандарт в частните яхтени чартъри. Съчетавайки дискретно петзвездно гостоприемство с най-престижния морски флот в света, ние създаваме пътешествия, които остават в паметта завинаги.',
      about_body: 'Всеки маршрут е съставен на ръка — от усамотени заливи и камбузи с мишленова подготовка до сертифицирани капитани, които предугаждат всяко ваше желание.',
      stat_vessels: 'Кораба във флота', stat_destinations: 'Световни дестинации',
      stat_satisfaction: 'Удовлетворени клиенти', stat_years: 'Години съвършенство',

      /* fleet */
      fleet_eyebrow: 'ФЛОТЪТ',
      fleet_title: 'Селектирани знакови кораби',
      fleet_sub: 'Подбрана селекция от нашия частен флот — всяка яхта е шедьовър на дизайна, комфорта и мореплаването.',
      tab_all: 'Всички', tab_motor: 'Моторни яхти', tab_sail: 'Ветроходни яхти', tab_cat: 'Катамарани',
      tag_motor: 'МОТОРНА ЯХТА', tag_sail: 'ВЕТРОХОДНА ЯХТА', tag_cat: 'ЛУКСОЗЕН КАТАМАРАН',
      specs_meridian: '164 FT / 50M • 12 ГОСТИ • 6 КАЮТИ • ЕКИПАЖ ОТ 11',
      specs_breeze: '120 FT / 36M • 8 ГОСТИ • 4 КАЮТИ • ЕКИПАЖ ОТ 6',
      specs_aqua: '82 FT / 25M • 10 ГОСТИ • 5 КАЮТИ • ЕКИПАЖ ОТ 4',
      rate_meridian: 'От $145,000 <em>/ седмица</em>',
      rate_breeze: 'От $85,000 <em>/ седмица</em>',
      rate_aqua: 'От $65,000 <em>/ седмица</em>',

      /* experience */
      exp_eyebrow: 'ИНДИВИДУАЛНИ ПЪТЕШЕСТВИЯ',
      exp_title: 'Сътворени мигове в открити води',
      exp_sub: 'Изкуството на поръчковия яхтинг е в детайлите — всяко пътешествие е изградено около вашия ритъм, вкус и усет за красота.',
      feat1_title: 'Индивидуални маршрути', feat1_desc: 'Персонализирани маршрути до усамотени заливи, недокоснати котвени места и частни пристанища.',
      feat2_title: 'Частни готвачи с мишленова подготовка', feat2_desc: 'Кулинарни изживявания на световно ниво, съобразени с вашия вкус.',
      feat3_title: 'Подбрани водни играчки и тендери', feat3_desc: 'Seabob-ове, хидрофойли, джетове, оборудване за дълбоко гмуркане и бързи тендери.',
      feat4_title: 'Сертифицирани капитани', feat4_desc: 'Висококвалифицирани навигатори, гарантиращи върхова безопасност и достъп.',

      /* destinations */
      dest_eyebrow: 'ТОП ДЕСТИНАЦИИ',
      dest_title: 'Емблематични места, изключителни пътешествия',
      dest_sub: 'От историческото крайбрежие на Слънчев бряг до скрити безкрайно красиви български плажове — открийте зашеметяващи дестинации по вода.',
      dest_btn: 'Разгледай дестинациите',
      dest1_sub: 'Черноморие, България', dest1_title: 'Слънчев бряг',
      dest2_sub: 'Старият град', dest2_title: 'Созопол',
      dest3_sub: 'Златни плажове', dest3_title: 'Приморско',

      /* cta */
      cta_eyebrow: 'ВАШЕТО ЛИЧНО УБЕЖИЩЕ',
      cta_title: 'Морето ви очаква.<br />Планирайте вашето бягство по поръчка.',
      cta_btn: 'Свържете се с чартър брокер',

      /* testimonials */
      testi1: 'Плаването из Средиземно море с Aventis надмина всяко очакване. Дискретността на екипажа, кулинарното майсторство и безупречната изработка на кораба го превърнаха в незабравимо пътешествие.',
      testi1_role: 'Чартър клиент, Монако',
      testi2: 'От първото обаждане до последния залез всеки детайл беше предвиден. Aventis превърна семейната ни почивка в най-скъпата седмица от годината.',
      testi2_role: 'Чартър клиент, Слънчев бряг',
      testi3: 'Безупречен вкус и съвършено изпълнение. Само частният готвач си заслужаваше пътуването — а заливите, които откриха, бяха истинска магия.',
      testi3_role: 'Чартър клиент, Амалфи',

      /* footer */
      footer_bio: 'Създаваме изключителни морски пътешествия с индивидуални маршрути и гостоприемство на световно ниво от 1988 г.',
      footer_fleet: 'Флот', footer_cat: 'Луксозни катамарани', footer_mega: 'Мега яхти', footer_new: 'Нови попълнения',
      footer_dest1: 'Слънчев бряг и Черноморие', footer_dest3: 'Френската ривиера', footer_dest4: 'Амалфийското крайбрежие', footer_dest5: 'Гръцките Циклади',
      footer_concierge: 'Чартър консиерж', footer_news: 'Получавайте подбрани сезонни маршрути.', footer_email: 'Вашият имейл адрес',
      footer_thanks: 'Благодарим — подбрани маршрути са на път към вас.',
      footer_copy: '© 2026 Aventis Yacht SUNNY BEACH | Всички права запазени.',
      footer_privacy: 'Поверителност', footer_terms: 'Условия за чартър', footer_safety: 'Морска безопасност',

      /* search modal */
      search_ph: 'Търсете яхти, дестинации, изживявания…',
      chip1: 'Созопол', chip2: 'Моторни яхти 50м+', chip3: 'Лято в Гърция', chip4: 'Катамарани',

      /* booking modal */
      book_eyebrow: 'ЧАРТЪРНО ЗАПИТВАНЕ', book_title: 'Започнете вашето пътешествие по поръчка',
      book_dest: 'Дестинация', book_dest_ph: 'напр. Средиземно море',
      book_pref: 'Предпочитана яхта', opt_motor: 'Моторна яхта', opt_sail: 'Ветроходна яхта', opt_cat: 'Луксозен катамаран', opt_mega: 'Мега яхта',
      book_dates: 'Дати на чартъра', book_dates_ph: 'Изберете дати',
      book_guests: 'Брой гости',
      book_requests: 'Специални изисквания', book_requests_ph: 'Разкажете ни за идеалното си пътуване…',
      book_send: 'Изпрати запитване',
      book_thanks: 'Благодарим — чартър брокер ще се свърже с вас до 24 часа.',

      /* yacht modal */
      ym_desc: 'Флагман на частния флот на Aventis — с разкошни каюти, просторни слънчеви палуби и пълен набор водни играчки, обслужван от дискретен професионален екипаж.',
      ym_btn: 'Запитване за тази яхта',

      hero: [
        { eyebrow: 'ПОРЪЧКОВИ ЧАСТНИ ЧАРТЪРИ', title: 'Изключителни Пътешествия', desc: 'Подбрани морски пътешествия, създадени за тези, които търсят най-финото в луксозния яхтинг.', btn1: 'Разгледай флота', btn2: 'Гледай историята' },
        { eyebrow: 'МОРСКО СЪВЪРШЕНСТВО', title: 'Ненадмината Свобода', desc: 'Начертайте собствения си хоризонт сред девствени архипелази с екипажи с мишленова подготовка.', btn1: 'Виж дестинациите', btn2: 'Запитване сега' },
        { eyebrow: 'ВЪРХЪТ НА ЛУКСА', title: 'Безкрайни Хоризонти', desc: 'Потопете се в безвременна крайбрежна елегантност, където първокласното обслужване среща абсолютното спокойствие.', btn1: 'Започни пътуване', btn2: 'Чартър гид' }
      ]
    }
  };

  var currentLang = (function () { try { return localStorage.getItem('aventis_lang') || 'bg'; } catch (e) { return 'bg'; } })();
  var currentStage = 0;

  function renderHeroStage(s) {
    currentStage = s;
    var d = DICT[currentLang]; if (!d || !d.hero[s]) return;
    var h = d.hero[s];
    var eb = document.querySelector('[data-hero="eyebrow"]');
    var ti = document.querySelector('[data-hero="title"]');
    var de = document.querySelector('[data-hero="desc"]');
    var b1 = document.querySelector('[data-hero="btn1"]');
    var b2 = document.querySelector('[data-hero="btn2"]');
    if (eb) eb.textContent = h.eyebrow;
    if (ti) ti.textContent = h.title;
    if (de) de.textContent = h.desc;
    if (b1) b1.innerHTML = h.btn1 + ' <span class="arr">&rarr;</span>';
    if (b2) b2.textContent = h.btn2;
  }

  function applyLang(lang) {
    if (!DICT[lang]) return;
    var d = DICT[lang];
    currentLang = lang;
    try { localStorage.setItem('aventis_lang', lang); } catch (e) {}
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n'); if (d[k] != null) el.textContent = d[k];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-html'); if (d[k] != null) el.innerHTML = d[k];
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-ph'); if (d[k] != null) el.setAttribute('placeholder', d[k]);
    });
    document.querySelectorAll('.lang-opt').forEach(function (b) {
      var on = b.getAttribute('data-lang') === lang;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });

    renderHeroStage(currentStage);
  }

  // Re-render hero text when the scroll scrubber changes stage
  document.addEventListener('aventis:herostage', function (e) {
    if (e.detail && typeof e.detail.stage === 'number') renderHeroStage(e.detail.stage);
  });

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.lang-opt').forEach(function (b) {
      b.addEventListener('click', function () { applyLang(b.getAttribute('data-lang')); });
    });
    applyLang(currentLang);
  });

  // Expose for other modules if needed
  window.AventisI18N = {
    applyLang: applyLang,
    renderHeroStage: renderHeroStage,
    get lang() { return currentLang; }
  };
})();
