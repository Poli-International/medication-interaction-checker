'use strict';

function escHtml(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

const CATEGORIES = [
  {
    id: 'pain',
    label: 'Painkillers & Anti-inflammatories (NSAIDs)',
    meds: [
      {
        id: 'ibuprofen',
        name: 'Ibuprofen',
        sub: 'Advil / Nurofen / Motrin / Brufen / Ibuprom / Alivium / Cuprofen / Spidifen / Antalgic / Algiasdin / Neobrufen / Ibu-Ratiopharm / Espidifen / Dalsy',
        cat: 'pain',
        sev: 'mod',
        riskBadges: ['🩸 Bleeding Risk', '💧 Plasma Oozing'],
        tattoo: 'Inhibits COX-1/2 enzymes, reducing platelet aggregation. Taking ibuprofen before a session increases procedural bleeding and plasma oozing, and heavier scabbing follows from that. Whether it affects ink retention itself has not been studied. Paracetamol/Acetaminophen is the better choice before a session.',
        piercing: 'Increases local bleeding and initial bruising at the piercing site. Not a total contraindication, but can cause prolonged oozing during tissue perforation.',
        wait: 'Avoid taking non-prescribed NSAIDs 24–48 hours prior to a session. Paracetamol is a safer alternative if approved by your doctor.',
        tags: 'pain, nsaid, advil, nurofen, motrin, brufen, ibuprom, alivium, cuprofen, spidifen, antalgic, algiasdin, neobrufen, espidifen, dalsy, headache, fever, inflammation, uk, us, eu, au, ca, fr, es, de, it, pt'
      },
      {
        id: 'naproxen',
        name: 'Naproxen',
        sub: 'Aleve / Anaprox / Naprosyn / Synflex / Feminax Ultra / Apranax / Momendol / Antalgin / Naproxeno Ratiopharm / Feldene',
        cat: 'pain',
        sev: 'mod',
        riskBadges: ['🩸 Bleeding Risk', '💧 Plasma Oozing'],
        tattoo: 'Longer-acting NSAID with significant platelet-inhibiting effects lasting up to 24–36 hours. Increased risk of prolonged bleeding and scab formation. As with other NSAIDs, the effect on ink retention itself has not been studied.',
        piercing: 'Increased bleeding and localized hematoma formation at fresh piercing sites.',
        wait: 'Avoid 48 hours pre-procedure if taken casually for pain. If prescribed, consult your doctor before pausing.',
        tags: 'aleve, naprosyn, anaprox, synflex, feminax, apranax, momendol, antalgin, feldene, pain, nsaid, joint pain, period pain, uk, us, eu, au, fr, es, it, de'
      },
      {
        id: 'paracetamol',
        name: 'Acetaminophen / Paracetamol',
        sub: 'Tylenol / Panadol / Calpol / Hedex / Mapap / Dolo / Disprol / Efferalgan / Doliprane / Dafalgan / Tachipirina / Gelocatil / Ben-u-ron / Apotel / Termalgin / Paralen',
        cat: 'pain',
        sev: 'low',
        riskBadges: ['✅ Safe Analgesic', '🩸 No Extra Bleeding'],
        tattoo: 'Does NOT inhibit platelet function or increase bleeding. Safe and preferred analgesic for pre-procedure nervous tension or post-procedure soreness when taken at therapeutic doses.',
        piercing: 'Ideal over-the-counter pain reliever for post-piercing swelling or soreness as it does not promote bleeding or bruising.',
        wait: 'No pre-procedure wait required. Stay within recommended daily dosage limits.',
        tags: 'tylenol, panadol, calpol, hedex, mapap, dolo, disprol, efferalgan, doliprane, dafalgan, tachipirina, gelocatil, benuron, apotel, termalgin, paralen, pain, fever, safe, headache, uk, us, eu, au, ca, fr, es, it, de, pt, in'
      },
      {
        id: 'opioids',
        name: 'Opioids & Narcotic Analgesics',
        sub: 'Codeine / Tramadol / Oxycodone (OxyContin) / Hydrocodone (Vicodin) / Morphine / Fentanyl / Tramal / Contramal / Adolonta / Skenan / Oxygesic / Targin / Subutex / Co-Codamol / Klipal / Izalgi / Zaldiar',
        cat: 'pain',
        sev: 'high',
        riskBadges: ['💫 Fainting Risk', '⚠️ Sedation Risk'],
        tattoo: 'Alters pain perception and central nervous system response. Causes sedation, lowered blood pressure, nausea, and increased risk of vasovagal syncope (fainting). Most professional studios will decline clients under active narcotic influence.',
        piercing: 'High risk of dizziness, nausea, and fainting during or after the procedure. Impaired consent issues if taking acute high-dose narcotics.',
        wait: 'Do not attend a session under the acute influence of narcotic painkillers. If taking chronic prescription pain medication, obtain physician clearance.',
        tags: 'tramadol, oxycontin, oxycodone, codeine, vicodin, hydrocodone, morphine, percocet, fentanyl, tramal, contramal, adolonta, skenan, oxygesic, targin, subutex, cocodamol, klipal, izalgi, zaldiar, nurofen plus, pain, prescription, us, uk, ca, au, eu, fr, es, de, it'
      }
    ]
  },
  {
    id: 'numbing',
    label: 'Topical Numbing Creams & Local Anaesthetics',
    meds: [
      {
        id: 'lidocaine_cream',
        name: 'Topical Lidocaine / Prilocaine',
        sub: 'EMLA / TKTX / Mithra / J-Pro / LMX4 / Numb-It / Deep Numb / Anesten',
        cat: 'numbing',
        sev: 'mod',
        riskBadges: ['🩹 Skin Texture Alteration', '⚡ Rebound Shock'],
        tattoo: 'Alters skin texture by causing localized edema (swelling) and spongy/rubbery skin density. Can hinder clean needle penetration and line precision. When the cream wears off mid-session, sudden intense pain shock can occur. Unregulated high-concentration creams carry toxicity risks.',
        piercing: 'Topical creams only numb the superficial epidermis, not the deeper cartilage or subcutaneous tissue pierced. May cause localized skin blanching and swelling.',
        wait: 'Always inform your artist prior to applying numbing cream. Many studios prohibit client-applied numbing cream due to chemical burn and skin texture risks.',
        tags: 'emla, tktx, mithra, jpro, lmx4, numbit, deepnumb, anesten, numbing, lidocaine, prilocaine, pain relief, cream, us, uk, eu, au'
      },
      {
        id: 'epinephrine_numbing',
        name: 'Numbing Creams with Epinephrine',
        sub: 'Adrenaline / Vascular Constrictor Additives',
        cat: 'numbing',
        sev: 'high',
        riskBadges: ['🩸 Rebound Bleeding', '⚠️ Vasoconstriction'],
        tattoo: 'Epinephrine causes strong vasoconstriction (narrowing blood vessels) to reduce bleeding. When it wears off, severe "rebound hyperemia" occurs — rapid vascular dilation, intense bleeding, and heavy plasma exudate that damages fresh ink setting.',
        piercing: 'Blanches skin during piercing marking, making accurate alignment difficult. Rebound bleeding and intense throbbing occur post-procedure.',
        wait: 'Avoid vasoconstrictive numbing agents unless administered directly by a medical professional or approved by your artist.',
        tags: 'adrenaline, epinephrine, vasoconstrictor, bleeding, rebound, numbing'
      }
    ]
  },
  {
    id: 'blood',
    label: 'Blood Thinners & Anticoagulants',
    meds: [
      {
        id: 'warfarin',
        name: 'Warfarin',
        sub: 'Coumadin / Jantoven / Marevan / Uniwarfin',
        cat: 'blood',
        sev: 'high',
        riskBadges: ['🩸 High Bleeding Risk', '⏳ Delayed Healing'],
        tattoo: 'Significant bleeding during tattooing — prolonged oozing impairs ink setting. Colour saturation and linework clarity are affected. Most professional studios require medical clearance or decline clients on active therapeutic anticoagulation.',
        piercing: 'Excessive bleeding during piercing and prolonged healing phase. Any haematoma at a new piercing site delays fistula formation significantly.',
        wait: 'Discuss stopping or bridging with your prescribing physician — do not discontinue without medical guidance.',
        tags: 'coumadin, jantoven, marevan, uniwarfin, blood thinner, anticoagulant, heart, stroke, uk, us, eu, au'
      },
      {
        id: 'apixaban',
        name: 'Apixaban / Rivaroxaban / Dabigatran',
        sub: 'Eliquis / Xarelto / Pradaxa / Savaysa / Lixiana',
        cat: 'blood',
        sev: 'high',
        riskBadges: ['🩸 High Bleeding Risk', '⏳ Delayed Healing'],
        tattoo: 'Same bleeding profile as warfarin. Direct oral anticoagulants (DOACs) have shorter half-lives but effects are still significant during skin-breaking procedures.',
        piercing: 'Elevated bleeding and bruising at piercing site. Jewellery pressure on a haematoma increases rejection risk.',
        wait: 'Half-life 8–12 hours — discuss a supervised pause with your physician. Do not pause without medical approval.',
        tags: 'eliquis, xarelto, pradaxa, savaysa, lixiana, doac, blood thinner, clot, stroke, us, uk, eu, au'
      },
      {
        id: 'aspirin',
        name: 'Aspirin (therapeutic dose)',
        sub: 'Bayer / Disprin / Anacin / Ecotrin / Bufferin / Asaphen (75–300 mg daily)',
        cat: 'blood',
        sev: 'mod',
        riskBadges: ['🩸 Mild Bleeding Risk'],
        tattoo: 'Low-dose aspirin increases procedural bleeding and minor bruising. Does not typically prevent tattooing but your artist should be informed to adjust wiping technique.',
        piercing: 'Increased bruising and minor bleeding. Not usually a contraindication at low doses, but inform your piercer.',
        wait: 'Aspirin irreversibly inhibits platelets — effects last 7–10 days after last dose. Discuss temporary pause with your doctor if appropriate.',
        tags: 'bayer, disprin, anacin, ecotrin, bufferin, asaphen, blood thinner, cardiac, heart, stroke, us, uk, au, ca'
      },
      {
        id: 'clopidogrel',
        name: 'Clopidogrel / Prasugrel / Ticagrelor',
        sub: 'Plavix / Effient / Brilinta / Brilique',
        cat: 'blood',
        sev: 'high',
        riskBadges: ['🩸 High Bleeding Risk', '⏳ Delayed Healing'],
        tattoo: 'Significant platelet inhibition — similar bleeding profile to aspirin but often combined with other anticoagulants. Most studios will request medical clearance.',
        piercing: 'Significant bleeding risk. Haematoma formation at piercing site is a real concern.',
        wait: 'Do not stop clopidogrel without cardiologist approval — prescribed for cardiac protection.',
        tags: 'plavix, effient, brilinta, brilique, stent, cardiac, blood thinner, heart, us, uk, eu, au'
      },
      {
        id: 'heparin',
        name: 'Heparin / Enoxaparin',
        sub: 'Lovenox / Clexane / Fragmin / Injections',
        cat: 'blood',
        sev: 'high',
        riskBadges: ['🩸 High Bleeding Risk', '⏳ Delayed Healing'],
        tattoo: 'Injectable low-molecular-weight heparin causes strong anticoagulation. Very high bleeding risk during skin puncture. Elective tattooing should be deferred.',
        piercing: 'High bleeding risk and hematoma formation. Defer elective piercings while on therapeutic LMWH.',
        wait: 'Consult your prescribing doctor. Never miss doses without medical supervision.',
        tags: 'lovenox, clexane, fragmin, injection, clot, dvt, pe, us, uk, eu, au'
      }
    ]
  },
  {
    id: 'retinoid',
    label: 'Retinoids (Acne / Anti-ageing)',
    meds: [
      {
        id: 'isotretinoin',
        name: 'Isotretinoin',
        sub: 'Accutane / Roaccutane / Oratane / Curatane / Claravis / Amnesteem / Sotret / Myorisan',
        cat: 'retinoid',
        sev: 'high',
        riskBadges: ['❌ Severe Scarring', '⏳ Healing Delay', '🩹 Fragile Skin'],
        tattoo: 'Isotretinoin fundamentally alters epidermal cell turnover, thins the skin, and suppresses sebum production. Tattooing during treatment causes severe scarring, unpredictable ink loss, and impaired healing. Universal contraindication.',
        piercing: 'Skin is fragile and slow to heal. Fistula formation is severely impaired. High risk of hypertrophic scarring or piercing rejection.',
        wait: 'Standard professional guidance: wait 6–12 months after finishing isotretinoin treatment before tattooing or getting new piercings.',
        tags: 'accutane, roaccutane, oratane, curatane, claravis, amnesteem, sotret, myorisan, acne, skin, pimples, us, uk, eu, au, ca'
      },
      {
        id: 'tretinoin',
        name: 'Tretinoin (topical)',
        sub: 'Retin-A / Stieva-A / Rejuva-A / Treclin / Aretin',
        cat: 'retinoid',
        sev: 'mod',
        riskBadges: ['🩹 Skin Sensitivity', '☀️ Photosensitivity'],
        tattoo: 'Topical retinoids at the tattoo site thin the upper skin layers and increase sensitivity. Stop applying to the target area 2–4 weeks prior. Systemic absorption from topical use is minimal.',
        piercing: 'Avoid applying topical retinoids to or near a new piercing site during healing to prevent chemical irritation.',
        wait: 'Discontinue topical tretinoin at the specific site 2–4 weeks pre-tattoo.',
        tags: 'retin-a, stieva-a, rejuva-a, treclin, aretin, anti aging, wrinkle, topical, acne, us, uk, au, ca'
      },
      {
        id: 'adapalene',
        name: 'Adapalene',
        sub: 'Differin / Epiduo',
        cat: 'retinoid',
        sev: 'mod',
        riskBadges: ['🩹 Skin Sensitivity'],
        tattoo: 'Topical retinoid causing localized skin sensitivity and peeling. Discontinue at the target site before tattooing.',
        piercing: 'Keep away from fresh piercing sites to prevent severe irritation or delayed epithelialization.',
        wait: 'Discontinue topical application at the target site 2 weeks prior to procedure.',
        tags: 'differin, epiduo, acne, topical, skin, us, uk, eu'
      }
    ]
  },
  {
    id: 'anxiety',
    label: 'Anti-Anxiety, Sedatives & Blood Pressure',
    meds: [
      {
        id: 'xanax',
        name: 'Benzodiazepines',
        sub: 'Xanax / Valium / Ativan / Klonopin / Diazepam / Alprazolam / Lorazepam / Clonazepam / Temazepam / Lexotan',
        cat: 'anxiety',
        sev: 'mod',
        riskBadges: ['💫 Fainting Risk', '⬇️ Low Blood Pressure'],
        tattoo: 'Causes central nervous system depression, drowsiness, and lowered blood pressure. Combined with pain or anxiety, can trigger sudden blood pressure drops or fainting. Inform your artist.',
        piercing: 'Increases risk of vasovagal syncope (fainting) post-procedure. Ensure you stay seated or reclined for 15 minutes after piercing.',
        wait: 'Inform your artist if taken pre-procedure for anxiety. Do not drive to or from your appointment if sedated.',
        tags: 'valium, xanax, ativan, klonopin, diazepam, alprazolam, lorazepam, clonazepam, temazepam, lexotan, anxiety, panic, nerves, sedatives, us, uk, eu, au, ca'
      },
      {
        id: 'propranolol',
        name: 'Beta Blockers',
        sub: 'Propranolol (Inderal) / Metoprolol (Lopressor) / Atenolol (Tenormin) / Bisoprolol',
        cat: 'anxiety',
        sev: 'mod',
        riskBadges: ['💫 Fainting Risk', '❤️ Bradycardia'],
        tattoo: 'Lowers heart rate and blunts normal epinephrine stress response. During long sessions or pain, clients are at higher risk of orthostatic hypotension and vasovagal fainting.',
        piercing: 'Higher fainting risk during rapid needle insertion. Piercer should perform procedure with client lying down.',
        wait: 'Do not skip prescribed cardiac medications. Inform your artist/piercer so they can adjust seating position.',
        tags: 'propranolol, inderal, metoprolol, lopressor, atenolol, tenormin, bisoprolol, blood pressure, cardiac, stage fright, us, uk, au, ca'
      },
      {
        id: 'hydroxyzine',
        name: 'Sedating Antihistamines',
        sub: 'Hydroxyzine (Vistaril / Atarax) / Diphenhydramine (Benadryl)',
        cat: 'anxiety',
        sev: 'low',
        riskBadges: ['😴 Drowsiness'],
        tattoo: 'Used for mild anxiety or hives. Causes mild drowsiness and dry mouth. Minimal direct interaction with tattooing.',
        piercing: 'Mild sedative effect. Stay hydrated during session.',
        wait: 'No washout required.',
        tags: 'vistaril, atarax, benadryl, hydroxyzine, anxiety, allergy, sleep, us, uk, ca'
      }
    ]
  },
  {
    id: 'hormone',
    label: 'Hormones, Contraceptives & HRT',
    meds: [
      {
        id: 'birth_control',
        name: 'Oral Contraceptives & Hormonal Contraception',
        sub: 'Pill / Patch / Ring / Depo-Provera / Hormonal IUD (Mirena / Jaydess)',
        cat: 'hormone',
        sev: 'low',
        riskBadges: ['☀️ Minor Pigmentation Risk'],
        tattoo: 'Estrogen-containing contraceptives slightly increase baseline hyperpigmentation risk (melasma) when exposed to sun during healing. Minimal impact on tattooing.',
        piercing: 'Progestin or estrogen can cause minor fluid retention or localized swelling sensitivity.',
        wait: 'No pre-procedure changes required.',
        tags: 'contraceptive, pill, mirena, jaydess, depo, estrogen, iud, progesterone, us, uk, au'
      },
      {
        id: 'hrt_testosterone',
        name: 'Gender-Affirming HRT (Testosterone)',
        sub: 'Nebido / Sustanon / Testim / AndroGel / Testosterone Enanthate',
        cat: 'hormone',
        sev: 'low',
        riskBadges: ['🩸 Slightly Thicker Blood'],
        tattoo: 'Testosterone therapy can increase skin oiliness, thickness, and hematocrit (red blood cell density), which may cause slightly thicker blood flow during sessions. Generally safe for tattooing.',
        piercing: 'Testosterone can cause skin thickening and increased sebum production near facial or body piercings. Maintain good hygiene.',
        wait: 'No pre-procedure changes required. Continue regular medical HRT dosing.',
        tags: 'testosterone, nebido, sustanon, testim, androgel, hrt, gender affirming, trans, hormone, us, uk, eu, au'
      },
      {
        id: 'hrt_estrogen',
        name: 'Gender-Affirming HRT (Estrogen / Anti-androgens)',
        sub: 'Estradiol / Spironolactone (Aldactone) / Cyproterone (Androcur)',
        cat: 'hormone',
        sev: 'low',
        riskBadges: ['💧 Dehydration Sensitivity'],
        tattoo: 'Estrogen therapy thins the dermal layer slightly over time and increases skin softness. Spironolactone has mild diuretic and blood-pressure lowering properties; ensure full hydration.',
        piercing: 'Spironolactone increases urination and dehydrates tissue slightly — drink extra fluids before piercing.',
        wait: 'No pre-procedure changes required. Stay well-hydrated.',
        tags: 'estradiol, spironolactone, aldactone, cyproterone, androcur, hrt, trans, hormone, us, uk, eu'
      }
    ]
  },
  {
    id: 'stimulant',
    label: 'ADHD & Stimulants',
    meds: [
      {
        id: 'adhd_stimulants',
        name: 'ADHD Stimulants',
        sub: 'Adderall / Vyvanse (Elvanse / Tyvense) / Ritalin / Concerta / Foquest / Dexedrine / Focalin',
        cat: 'stimulant',
        sev: 'mod',
        riskBadges: ['⚡ Heart Rate Increase', '💫 Fainting Risk'],
        tattoo: 'Stimulants elevate heart rate, blood pressure, and central nervous arousal. Can make clients jittery, lower pain tolerance during long sessions, and increase dehydration. Blood sugar drops faster.',
        piercing: 'Higher nervous tension and muscle tightness during piercing. Increased risk of sudden lightheadedness when adrenaline drops.',
        wait: 'Ensure you eat a heavy meal and drink plenty of water before your appointment. Inform your artist.',
        tags: 'adderall, vyvanse, elvanse, tyvense, ritalin, concerta, foquest, dexedrine, focalin, adhd, stimulant, focus, us, uk, ca, au, eu'
      }
    ]
  },
  {
    id: 'metabolic',
    label: 'Diabetes, Metabolic & GLP-1 Agonists',
    meds: [
      {
        id: 'glp1_agonists',
        name: 'GLP-1 Receptor Agonists',
        sub: 'Ozempic / Wegovy / Mounjaro / Zepbound / Trulicity / Saxenda / Victoza / Rybelsus',
        cat: 'metabolic',
        sev: 'mod',
        riskBadges: ['💫 Hypoglycemia Risk', '💫 Fainting Risk'],
        tattoo: 'GLP-1 drugs delay gastric emptying and alter blood glucose regulation. Clients undergoing long tattoo sessions are at risk for sudden hypoglycemia, nausea, and vasovagal fainting if they haven\'t consumed adequate calories.',
        piercing: 'Increased risk of nausea, lightheadedness, or fainting during piercing if blood sugar drops.',
        wait: 'Eat a small, easily digestible meal 1–2 hours before the session and bring sugary drinks (juice, soda) to maintain glucose levels.',
        tags: 'ozempic, wegovy, mounjaro, zepbound, trulicity, saxenda, victoza, rybelsus, semaglutide, tirzepatide, weight loss, diabetes, us, uk, eu, ca, au'
      },
      {
        id: 'insulin',
        name: 'Insulin & Diabetes Medications',
        sub: 'Metformin (Glucophage) / Januvia / Jardiance / Insulin (Lantus / Humalog / Novolog)',
        cat: 'metabolic',
        sev: 'mod',
        riskBadges: ['⏳ Delayed Healing', '🦠 Infection Risk'],
        tattoo: 'Diabetes impairs microvascular circulation and wound healing. Poorer immune response increases infection risk and delays scab resolution. Well-controlled diabetes is low risk; poorly controlled increases infection risk.',
        piercing: 'Higher infection risk and slower fistula formation in poorly controlled diabetes. Lower extremity piercings (e.g. ankles) heal very slowly in diabetic clients.',
        wait: 'Ensure blood glucose is stable before session. Bring glucose tablets or snacks.',
        tags: 'insulin, metformin, glucophage, januvia, jardiance, lantus, humalog, novolog, diabetes, blood sugar, us, uk, eu, au'
      }
    ]
  },
  {
    id: 'corticosteroid',
    label: 'Corticosteroids',
    meds: [
      {
        id: 'prednisone',
        name: 'Oral Corticosteroids',
        sub: 'Prednisone (Deltasone) / Prednisolone (Panafcort) / Dexamethasone / Medrol',
        cat: 'corticosteroid',
        sev: 'mod',
        riskBadges: ['🦠 Infection Risk', '⏳ Delayed Healing'],
        tattoo: 'Systemic steroids suppress the immune response required for proper wound healing. Higher infection risk and altered inflammatory phase. Skin fragile on chronic doses.',
        piercing: 'Immunosuppression significantly increases infection risk during piercing healing. Fistula formation delayed.',
        wait: 'Short courses (<2 weeks): wait until course ends. Long-term steroid therapy: obtain physician clearance.',
        tags: 'prednisone, deltasone, panafcort, dexamethasone, medrol, steroid, immune, inflammation, asthma, us, uk, au, ca'
      },
      {
        id: 'inhaled_steroids',
        name: 'Inhaled / Topical Steroids',
        sub: 'Fluticasone (Flonase) / Hydrocortisone / Betamethasone',
        cat: 'corticosteroid',
        sev: 'low',
        riskBadges: ['🩹 Skin Fragility at Site'],
        tattoo: 'Inhaled steroids have minimal systemic impact. Topical steroids applied at the tattoo site thin the skin and should be discontinued 2 weeks prior.',
        piercing: 'Standard risk unless topical steroid is applied directly to the piercing site.',
        wait: 'Discontinue topical steroids at the target area 2 weeks pre-procedure.',
        tags: 'flonase, hydrocortisone, betamethasone, cream, inhaler, eczema, us, uk'
      }
    ]
  },
  {
    id: 'immuno',
    label: 'Immunosuppressants & Biologics',
    meds: [
      {
        id: 'methotrexate',
        name: 'Methotrexate',
        sub: 'Rheumatrex / Maxtrex / Trexall / Metoject',
        cat: 'immuno',
        sev: 'high',
        riskBadges: ['🦠 High Infection Risk', '⏳ Delayed Healing'],
        tattoo: 'Significant immune suppression means tattoo healing is unpredictable — increased infection risk, impaired inflammatory phase, and potential for opportunistic skin infection. Medical clearance required.',
        piercing: 'High infection risk. Elective piercings during methotrexate therapy are strongly inadvisable without specialist approval.',
        wait: 'Discuss with rheumatologist/dermatologist before booking. Do not pause without doctor guidance.',
        tags: 'rheumatrex, maxtrex, trexall, metoject, methotrexate, rheumatoid, arthritis, psoriasis, immune, us, uk, eu'
      },
      {
        id: 'biologics',
        name: 'Biologics & TNF Inhibitors',
        sub: 'Adalimumab (Humira) / Enbrel / Stelara / Skyrizi / Tremfya / Cosentyx / Dupixent',
        cat: 'immuno',
        sev: 'high',
        riskBadges: ['🦠 High Infection Risk', '⏳ Delayed Healing'],
        tattoo: 'Biologics suppress specific immune pathways (TNF-alpha, IL-17/23). Significantly elevated risk of bacterial skin infections and delayed wound closure.',
        piercing: 'High infection risk. Elective piercings should be discussed with your prescribing specialist.',
        wait: 'Do not interrupt biologic therapy. Schedule sessions relative to injection cycles after specialist consultation.',
        tags: 'humira, enbrel, stelara, skyrizi, tremfya, cosentyx, dupixent, crohns, psoriasis, biologic, us, uk, eu, au'
      },
      {
        id: 'ciclosporin',
        name: 'Calcineurin Inhibitors',
        sub: 'Ciclosporin / Tacrolimus (Neoral / Prograf)',
        cat: 'immuno',
        sev: 'high',
        riskBadges: ['🦠 High Infection Risk', '⏳ Delayed Healing'],
        tattoo: 'Systemic immunosuppressants used in transplant medicine and severe autoimmune disease. Suppressing the immune system raises infection risk generally, and that is the reason for caution here. The effect on tattoo healing specifically has not been studied, so treat this entry as precautionary rather than evidence-based.',
        piercing: 'Elective piercings during active therapy are best deferred until your specialist has weighed in. This is a precaution, not a measured risk.',
        wait: 'Obtain clearance from transplant team or specialist.',
        tags: 'prograf, neoral, ciclosporin, tacrolimus, transplant, autoimmune, us, uk, eu'
      }
    ]
  },
  {
    id: 'supplement',
    label: 'Herbal Supplements & Vitamins',
    meds: [
      {
        id: 'fish_oil',
        name: 'Fish Oil & Omega-3 Fatty Acids',
        sub: 'EPA / DHA High-Dose Supplements',
        cat: 'supplement',
        sev: 'mod',
        riskBadges: ['🩸 Mild Bleeding Risk'],
        tattoo: 'High doses (>2000mg/day) mildly inhibit platelet aggregation and thin blood. Often causes increased plasma oozing during tattooing.',
        piercing: 'Mildly increased bleeding and initial bruising.',
        wait: 'Consider pausing high-dose fish oil 5–7 days before session if approved by your doctor.',
        tags: 'fish oil, omega 3, epa, dha, supplement, blood thinner, heart, us, uk, au'
      },
      {
        id: 'vitamin_e',
        name: 'Vitamin E (High Dose)',
        sub: 'Tocopherol Supplements',
        cat: 'supplement',
        sev: 'mod',
        riskBadges: ['🩸 Mild Bleeding Risk'],
        tattoo: 'Vitamin E antagonizes Vitamin K dependent clotting factors. High doses increase bleeding and bruising during tattooing.',
        piercing: 'Increased bruising at piercing site.',
        wait: 'Pause high-dose Vitamin E supplements 7 days prior to procedure.',
        tags: 'vitamin e, tocopherol, supplement, skin, antioxidant'
      },
      {
        id: 'ginkgo_stjohns',
        name: 'Ginkgo Biloba & St. John\'s Wort',
        sub: 'Herbal Blood Thinners / Mood Supplements',
        cat: 'supplement',
        sev: 'mod',
        riskBadges: ['🩸 Bleeding Risk', '☀️ Photosensitivity'],
        tattoo: 'Ginkgo biloba inhibits PAF (platelet-activating factor) and causes excessive procedural bleeding. St. John\'s Wort induces liver enzymes and increases photosensitivity.',
        piercing: 'Increased bleeding risk from Ginkgo; photosensitivity from St. John\'s Wort.',
        wait: 'Pause herbal supplements 7–10 days before procedure.',
        tags: 'ginkgo, st johns wort, herbal, mood, blood thinner, us, uk, eu'
      },
      {
        id: 'turmeric_garlic',
        name: 'Turmeric / Curcumin & Concentrated Garlic',
        sub: 'High-Potency Extract Pills',
        cat: 'supplement',
        sev: 'mod',
        riskBadges: ['🩸 Mild Bleeding Risk'],
        tattoo: 'High-dose curcumin and garlic extracts have antiplatelet effects. Can cause noticeable extra bleeding and plasma weeping.',
        piercing: 'Minor increase in bleeding during tissue perforation.',
        wait: 'Pause high-potency extracts 5–7 days before procedure. Culinary garlic/turmeric in food is completely safe.',
        tags: 'turmeric, curcumin, garlic, herbal, inflammation'
      }
    ]
  },
  {
    id: 'antibiotic',
    label: 'Antibiotics & Antivirals',
    meds: [
      {
        id: 'tetracyclines',
        name: 'Tetracyclines',
        sub: 'Doxycycline / Minocycline',
        cat: 'antibiotic',
        sev: 'mod',
        riskBadges: ['☀️ Photosensitivity', '🎨 Ink Staining Risk'],
        tattoo: 'Causes significant photosensitivity — UV exposure on new tattoos during treatment can trigger painful allergic reactions and ink fading. Minocycline can rarely cause blue-grey skin pigmentation.',
        piercing: 'No direct healing interaction, but protect fresh piercing site from sun exposure.',
        wait: 'Avoid sun/UV exposure on target area while taking tetracyclines.',
        tags: 'doxycycline, minocycline, acne, antibiotic, sun, us, uk, eu'
      },
      {
        id: 'antivirals_herpes',
        name: 'Antivirals (Oral / Lip Piercing Care)',
        sub: 'Acyclovir / Valacyclovir (Zovirax / Valtrex / Famvir)',
        cat: 'antibiotic',
        sev: 'low',
        riskBadges: ['👄 Outbreak Prevention'],
        tattoo: 'CRUCIAL FOR LIP TATTOOS / PERMANENT MAKEUP: Permanent lip blushing can trigger severe HSV-1 (cold sore) flare-ups. Prophylactic antivirals are strongly recommended before lip tattooing.',
        piercing: 'Lip or oral piercings can trigger cold sore outbreaks in HSV-positive clients. Taking prophylactic antivirals prevents painful herpes lesions on new piercings.',
        wait: 'Start prophylactic antiviral 2 days before lip tattooing or oral piercing as directed by your doctor.',
        tags: 'valtrex, acyclovir, zovirax, famvir, valacyclovir, cold sore, herpes, lip tattoo, lip blush, lip piercing, us, uk, eu, au'
      }
    ]
  },
  {
    id: 'substance',
    label: 'Substances, Alcohol, Nicotine & Lifestyle',
    meds: [
      {
        id: 'cannabis',
        name: 'Cannabis / THC / CBD / Marijuana',
        sub: 'Weed / Joint / Hash / Edibles / Medical Cannabis / Vapes',
        cat: 'substance',
        sev: 'mod',
        riskBadges: ['⚡ Vasodilation', '💫 Fainting Risk', '🧠 Heightened Sensitivity'],
        tattoo: 'THC increases baseline heart rate, dilates blood vessels (increasing plasma weeping), and can significantly heighten anxiety or paranoia during skin puncture. Many artists will decline clients under acute influence.',
        piercing: 'Increases risk of vasovagal syncope or sudden panic during piercing insertion. Alters pain perception unexpectedly.',
        wait: 'Avoid smoking or consuming THC edibles 12–24 hours before your appointment.',
        tags: 'cannabis, thc, cbd, weed, marijuana, joint, hash, edible, vape, mariguana, cannabis sativa, us, uk, eu, ca, au'
      },
      {
        id: 'alcohol',
        name: 'Alcohol & Hangovers',
        sub: 'Beer / Wine / Spirits / Hangover / Binge Drinking',
        cat: 'substance',
        sev: 'high',
        riskBadges: ['🩸 High Bleeding Risk', '💧 Severe Dehydration', '💫 Hypoglycemia Risk'],
        tattoo: 'Alcohol affects platelet function and coagulation, suppresses vasopressin (which promotes dehydration), and can lower blood glucose. The practical concern is more bleeding and oozing during a session, and a lower pain threshold when hungover. How much that affects ink retention has not been studied - treat claims about ink being "pushed out" with caution.',
        piercing: 'More bleeding and prolonged oozing. Dehydration increases fainting risk.',
        wait: 'Do NOT consume alcohol for 24–48 hours before or after your procedure.',
        tags: 'alcohol, beer, wine, vodka, whiskey, hangover, alcohol, bière, vino, cerveza, bier, us, uk, eu, au, ca'
      },
      {
        id: 'nicotine',
        name: 'Nicotine / Tobacco / Vaping',
        sub: 'Cigarettes / Vapes / Nicotine Pouches (Zyn) / Snus / Cigars',
        cat: 'substance',
        sev: 'mod',
        riskBadges: ['⚠️ Vasoconstriction', '⏳ Delayed Healing'],
        tattoo: 'Nicotine is a potent microvascular vasoconstrictor. It shrinks capillary blood vessels, reducing oxygenated blood delivery to fresh tattoo wounds and delaying dermal closure.',
        piercing: 'Dramatically slows down piercing fistula formation, especially for oral, ear cartilage, and nipple piercings.',
        wait: 'Avoid heavy vaping or smoking immediately before and during initial healing phase.',
        tags: 'nicotine, tobacco, cigarettes, vape, vaping, zyn, snus, smoking, tabac, tabacco, us, uk, eu'
      },
      {
        id: 'recreational_stimulants',
        name: 'Recreational Stimulants & Kratom',
        sub: 'Cocaine / MDMA (Ecstasy) / Amphetamines / Kratom / Speed',
        cat: 'substance',
        sev: 'high',
        riskBadges: ['⚡ Cardiac Stress', '💫 Fainting Risk', '🩸 Severe Vasoconstriction'],
        tattoo: 'Stimulants raise sympathetic activity: elevated blood pressure, tachycardia and tremor are well documented. That makes someone a poor candidate for sitting still through a session and raises the stakes if anything goes wrong. Whether stimulants change the outcome of a tattoo has not been studied, so the concern here is your cardiovascular state during the procedure, not the ink.',
        piercing: 'Piercers will normally refuse to work on someone under the influence. Staying still and giving informed consent both matter, and neither is reliable in that state.',
        wait: 'Do not undergo any body modification procedure with active recreational stimulants in your system.',
        tags: 'cocaine, mdma, ecstasy, kratom, amphetamine, speed, party drugs, us, uk, eu'
      }
    ]
  }
];

// DOM References
const medListEl       = document.getElementById('med-list');
const resultEl        = document.getElementById('result');
const medSearchEl     = document.getElementById('med-search');
const clearSearchBtn  = document.getElementById('clear-search');
const filterTagsEl    = document.getElementById('filter-tags');
const toolTabsEl      = document.getElementById('tool-tabs');
const briefCountEl    = document.getElementById('brief-count');

// Modal DOM References
const doctorModalEl   = document.getElementById('doctor-modal');
const openDocModalBtn = document.getElementById('open-doctor-modal-btn');
const closeDocModalBtn= document.getElementById('close-doctor-modal-btn');
const cancelDocModalBtn= document.getElementById('cancel-doc-modal-btn');
const docNameInput    = document.getElementById('doc-name');
const patientNameInput= document.getElementById('patient-name');
const procTypeInput   = document.getElementById('procedure-type');
const procDateInput   = document.getElementById('procedure-date');
const modalMedPillsEl = document.getElementById('modal-med-pills');
const modalDraftArea  = document.getElementById('modal-draft-preview');
const copyDocMsgBtn   = document.getElementById('copy-doc-msg-btn');
const emailDocBtn     = document.getElementById('email-doc-btn');

// Flatten lookup map
const medMap = {};
CATEGORIES.forEach(cat => cat.meds.forEach(m => { medMap[m.id] = m; }));

let activeCategoryFilter = 'all';
let searchQuery = '';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Set default appointment date to 1 week from today
  if (procDateInput) {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    procDateInput.value = nextWeek.toISOString().split('T')[0];
  }

  renderMedList();
  setupEventListeners();
  initCalculators();
  initQuiz();
  initTrendingSearches();
  initRecentSearches();
  initReadingProgress();
  initEmergencyModal();
  initHealingJourney();
  initDeepLinkFromUrl();
  initServiceWorker();
});

let currentLang = 'en';

const TRANSLATIONS = {
  en: {
    translationNotice: 'This page has been translated from English. We cannot guarantee the translation is exact. We do our best so that everyone can understand, but the English version is the one we consider correct - please check anything important against it.',
    waitLabel: 'Wait / Washout Recommendation:',
    medUntranslated: 'Some medication details above are shown in English - translation into this language is still in progress.',
    medSourcesLabel: 'Published sources',
    tabSupplements: '🌿 Supplements',
    suppHeading: 'Supplement & Medication Interaction Checker',
    suppIntro: 'Most people do not think of fish oil, garlic capsules or ginkgo as "medication", so they never mention them. Taken alongside a blood thinner or a painkiller, some supplements add to bleeding and oozing during a session. Add what you take below to see what the published evidence says.',
    suppSearchPlaceholder: 'Search a supplement (e.g. fish oil, vitamin E, turmeric, ginseng)...',
    suppEmpty: 'Add a supplement to see whether it has been studied alongside your medication.',
    suppStudied: 'has been studied for effects on bleeding and clotting. Based on',
    suppStudies: 'human or clinical studies.',
    suppCardFooter: 'This does not mean you must stop either one. Tell your artist or piercer what you take, and raise anything you are unsure about with the doctor who prescribed your medication.',
    suppNoPairs: 'We hold no published human studies linking this supplement to the medications this tool covers. That is not the same as "no interaction" - it means the research is not there to quote. Mention it to your artist anyway.',
    suppUnknownTitle: 'We do not hold data on',
    suppUnknownBody: 'This is a gap in our library, not a clean result. Do not read it as safe. Bring it up with your artist or piercer, and with your doctor if you are also on prescribed medication.',
    suppClinical: 'Clinical evidence',
    suppHuman: 'Human studies',
    suppCredit: 'Interaction evidence from SUPP.AI (Allen Institute for AI). Only human and clinical studies are shown; retracted papers are excluded.',
    geoLangLabel: 'Search in:',
    geoFindStudio: '🎨 Find a studio nearby',
    geoFindDoctor: '🩺 Find a doctor nearby',
    geoFindPharmacy: '💊 Nearest pharmacy',
    geoFindHospital: '🏥 Nearest hospital',
    geoNote: 'These open Google Maps and search in the local language of where you are, which finds far more than an English search does abroad. Your location is never sent to us - only a search word goes to Google. Change the language above if it guessed wrong.',
    emergHeadSub: 'Immediate step-by-step action guides for studio staff during procedural complications.',
    emergCallLabel: 'Call emergency services first:',
    emergCallConfirm: 'This number is guessed from your device time zone and can be wrong, for example on a VPN. Confirm the correct number for your country and keep it written on the studio wall.',
    emergDisclaimer: 'This guide is a memory aid for people who are already trained in first aid. It is not first-aid training, and it does not replace it. Call emergency services first, do nothing you are not trained and permitted to do where you work, and stay with the person until help arrives.',
    disclaimerTitle: 'Important Disclaimer:',
    disclaimerBody: 'This tool is an educational reference only and does not constitute medical advice. Never stop or adjust prescribed medication without consulting your prescribing physician. Always inform your tattoo artist and piercer of any medications, health conditions, or supplements you are taking before the procedure.',
    langLabel: '🌐 Language:',
    headerBadge: '💊 Medication & Safety Reference',
    headerTitle: 'Medication Interaction Checker',
    headerSubtitle: 'Check how prescription medications, OTC painkillers, numbing creams, and supplements affect bleeding risk, ink setting, and piercing healing for tattoos & piercings.',
    draftDoctorBtn: '✉️ Draft Message to Doctor',
    tabChecker: '🔍 Checker',
    tabBrief: '📄 Artist Brief',
    tabSafety: '🛡️ Studio Safety',
    tabFaq: '❓ FAQs & Tips',
    tabReminders: '⏰ Reminders & Washout',
    searchPlaceholder: 'Search medication or brand (e.g. Advil, Accutane, Xanax, EMLA, Ozempic)...',
    filterAll: 'All',
    filterPain: 'Painkillers & NSAIDs',
    filterNumbing: 'Numbing Creams',
    filterBlood: 'Blood Thinners',
    filterRetinoid: 'Acne / Retinoids',
    filterAnxiety: 'Anti-Anxiety / Sedatives',
    filterHormone: 'Hormones & HRT',
    filterStimulant: 'ADHD & Stimulants',
    filterMetabolic: 'Diabetes & GLP-1',
    filterCorticosteroid: 'Corticosteroids',
    filterImmuno: 'Immunosuppressants',
    filterSupplement: 'Supplements',
    filterAntibiotic: 'Antibiotics & Antivirals',
    filterSubstance: 'Substances & Lifestyle',
    infoNote: '💡 Select all medications and supplements you take. Results will automatically highlight procedural risks, wait times, and recommended artist precautions.',
    clearAll: 'Clear all',
    draftDoctorNoteBtn: '✉️ Draft Doctor Note',
    viewBriefBtn: '📄 View Artist Brief',
    backToTopBtn: '⬆️ Back to Top',
    backToMedListBtn: '⬆️ Back to Med List'
  },
  fr: {
    translationNotice: 'Cette page a été traduite de l\'anglais. Nous ne pouvons pas garantir que la traduction soit exacte. Nous faisons de notre mieux pour que chacun puisse comprendre, mais la version anglaise est celle que nous considérons comme correcte : vérifiez-y tout point important.',
    waitLabel: 'Recommandation de délai / élimination :',
    medUntranslated: 'Certains détails sur les médicaments ci-dessus sont affichés en anglais : la traduction dans cette langue est encore en cours.',
    medSourcesLabel: 'Sources publiées',
    tabSupplements: '🌿 Compléments',
    suppHeading: 'Vérificateur d\'interactions compléments et médicaments',
    suppIntro: 'La plupart des gens ne considèrent pas l\'huile de poisson, les gélules d\'ail ou le ginkgo comme des « médicaments », et ne les mentionnent donc jamais. Pris avec un anticoagulant ou un antidouleur, certains compléments augmentent le saignement et le suintement pendant la séance. Ajoutez ce que vous prenez ci-dessous pour voir ce que dit la littérature publiée.',
    suppSearchPlaceholder: 'Rechercher un complément (ex. huile de poisson, vitamine E, curcuma, ginseng)...',
    suppEmpty: 'Ajoutez un complément pour voir s\'il a été étudié avec votre médicament.',
    suppStudied: 'a fait l\'objet d\'études sur les effets liés au saignement et à la coagulation. D\'après',
    suppStudies: 'études humaines ou cliniques.',
    suppCardFooter: 'Cela ne veut pas dire que vous devez arrêter l\'un ou l\'autre. Dites à votre tatoueur ou perceur ce que vous prenez, et posez toute question au médecin qui vous a prescrit votre traitement.',
    suppNoPairs: 'Nous n\'avons aucune étude humaine publiée reliant ce complément aux médicaments couverts par cet outil. Ce n\'est pas la même chose que « aucune interaction » : cela signifie que la recherche n\'existe pas pour l\'affirmer. Mentionnez-le quand même à votre praticien.',
    suppUnknownTitle: 'Nous n\'avons pas de données sur',
    suppUnknownBody: 'C\'est une lacune de notre bibliothèque, pas un résultat rassurant. Ne le prenez pas pour une absence de risque. Parlez-en à votre tatoueur ou perceur, et à votre médecin si vous prenez aussi un traitement prescrit.',
    suppClinical: 'Preuves cliniques',
    suppHuman: 'Études humaines',
    suppCredit: 'Données d\'interaction issues de SUPP.AI (Allen Institute for AI). Seules les études humaines et cliniques sont affichées ; les articles rétractés sont exclus.',
    geoLangLabel: 'Rechercher en :',
    geoFindStudio: '🎨 Trouver un studio à proximité',
    geoFindDoctor: '🩺 Trouver un médecin à proximité',
    geoFindPharmacy: '💊 Pharmacie la plus proche',
    geoFindHospital: '🏥 Hôpital le plus proche',
    geoNote: 'Ces liens ouvrent Google Maps et lancent la recherche dans la langue du pays où vous vous trouvez, ce qui donne bien plus de résultats qu\'une recherche en anglais à l\'étranger. Votre position ne nous est jamais transmise : seul un mot de recherche est envoyé à Google. Changez la langue ci-dessus si la détection est incorrecte.',
    emergHeadSub: 'Guides d\'action immédiats, étape par étape, pour le personnel du studio en cas de complication pendant une seance.',
    emergCallLabel: 'Appelez d\'abord les secours :',
    emergCallConfirm: 'Ce numéro est déduit du fuseau horaire de votre appareil et peut être faux, par exemple derriere un VPN. Vérifiez le numéro correct pour votre pays et gardez-le écrit au mur du studio.',
    emergDisclaimer: 'Ce guide est un aide-mémoire destiné à des personnes déjà formées aux premiers secours. Ce n\'est pas une formation aux premiers secours et cela ne la remplace pas. Appelez d\'abord les secours, ne faites rien pour quoi vous n\'êtes ni formé ni autorisé là où vous exercez, et restez auprès de la personne jusqu\'à l\'arrivée des secours.',
    disclaimerTitle: 'Avertissement important :',
    disclaimerBody: 'Cet outil est une référence éducative uniquement et ne constitue pas un avis médical. N\'arrêtez et ne modifiez jamais un médicament prescrit sans consulter le médecin qui vous l\'a prescrit. Informez toujours votre tatoueur et votre perceur de tout médicament, problème de santé ou complément alimentaire que vous prenez avant l\'intervention.',
    langLabel: '🌐 Langue:',
    headerBadge: '💊 Référence Médicaments et Sécurité',
    headerTitle: 'Vérificateur d\'Interactions Médicamenteuses',
    headerSubtitle: 'Vérifiez l\'impact des médicaments sur les saignements, la prise d\'encre et la cicatrisation des tatouages et piercings.',
    draftDoctorBtn: '✉️ Rédiger un message pour le médecin',
    tabChecker: '🔍 Vérificateur',
    tabBrief: '📄 Rapport Artiste',
    tabSafety: '🛡️ Sécurité Studio',
    tabFaq: '❓ FAQ & Conseils',
    tabReminders: '⏰ Rappels & Sevrage',
    searchPlaceholder: 'Rechercher un médicament (ex. Ibuprofène, Accutane, Xanax, EMLA)...',
    filterAll: 'Tous',
    filterPain: 'Anti-douleurs & AINS',
    filterNumbing: 'Crèmes anesthésiantes',
    filterBlood: 'Anticoagulants',
    filterRetinoid: 'Acné / Rétinoïdes',
    filterAnxiety: 'Anxiolytiques / Sédatifs',
    filterHormone: 'Hormones & THS',
    filterStimulant: 'TDAH & Stimulants',
    filterMetabolic: 'Diabète & GLP-1',
    filterCorticosteroid: 'Corticostéroïdes',
    filterImmuno: 'Immunosuppresseurs',
    filterSupplement: 'Compléments alimentaires',
    filterAntibiotic: 'Antibiotiques & Antiviraux',
    filterSubstance: 'Substances & Mode de vie',
    infoNote: '💡 Sélectionnez vos médicaments. Les résultats afficheront les risques et précautions recommandées.',
    clearAll: 'Tout effacer',
    draftDoctorNoteBtn: '✉️ Note pour le médecin',
    viewBriefBtn: '📄 Voir le rapport',
    backToTopBtn: '⬆️ Haut de page',
    backToMedListBtn: '⬆️ Retour à la liste'
  },
  it: {
    translationNotice: 'Questa pagina è stata tradotta dall\'inglese. Non possiamo garantire che la traduzione sia esatta. Facciamo del nostro meglio perché tutti possano capire, ma la versione inglese è quella che consideriamo corretta: verificate lì qualsiasi punto importante.',
    waitLabel: 'Raccomandazione di attesa / washout:',
    medUntranslated: 'Alcuni dettagli sui farmaci qui sopra sono mostrati in inglese: la traduzione in questa lingua è ancora in corso.',
    medSourcesLabel: 'Fonti pubblicate',
    tabSupplements: '🌿 Integratori',
    suppHeading: 'Verifica interazioni integratori e farmaci',
    suppIntro: 'La maggior parte delle persone non considera l\'olio di pesce, le capsule di aglio o il ginkgo come "farmaci", quindi non li menziona mai. Assunti insieme a un anticoagulante o a un antidolorifico, alcuni integratori aumentano il sanguinamento e l\'essudato durante la seduta. Aggiungi qui sotto quello che prendi per vedere cosa dice la letteratura pubblicata.',
    suppSearchPlaceholder: 'Cerca un integratore (es. olio di pesce, vitamina E, curcuma, ginseng)...',
    suppEmpty: 'Aggiungi un integratore per vedere se è stato studiato insieme al tuo farmaco.',
    suppStudied: 'è stato studiato per gli effetti su sanguinamento e coagulazione. Sulla base di',
    suppStudies: 'studi umani o clinici.',
    suppCardFooter: 'Questo non significa che devi sospendere l\'uno o l\'altro. Dì al tuo tatuatore o piercer cosa prendi e chiarisci ogni dubbio con il medico che ti ha prescritto la terapia.',
    suppNoPairs: 'Non disponiamo di studi umani pubblicati che colleghino questo integratore ai farmaci coperti da questo strumento. Non è lo stesso che dire "nessuna interazione": significa che la ricerca non esiste per affermarlo. Segnalalo comunque al tuo professionista.',
    suppUnknownTitle: 'Non abbiamo dati su',
    suppUnknownBody: 'È una lacuna della nostra libreria, non un risultato rassicurante. Non interpretarlo come sicuro. Parlane con il tuo tatuatore o piercer e con il tuo medico se assumi anche farmaci prescritti.',
    suppClinical: 'Evidenze cliniche',
    suppHuman: 'Studi sull\'uomo',
    suppCredit: 'Dati sulle interazioni da SUPP.AI (Allen Institute for AI). Sono mostrati solo studi umani e clinici; gli articoli ritirati sono esclusi.',
    geoLangLabel: 'Cerca in:',
    geoFindStudio: '🎨 Trova uno studio vicino',
    geoFindDoctor: '🩺 Trova un medico vicino',
    geoFindPharmacy: '💊 Farmacia più vicina',
    geoFindHospital: '🏥 Ospedale più vicino',
    geoNote: 'Questi link aprono Google Maps e cercano nella lingua del posto in cui ti trovi: all\'estero trova molto più di una ricerca in inglese. La tua posizione non arriva mai a noi: a Google va solo una parola di ricerca. Cambia la lingua qui sopra se il rilevamento è sbagliato.',
    emergHeadSub: 'Guide di intervento immediato, passo per passo, per il personale dello studio in caso di complicazioni durante una seduta.',
    emergCallLabel: 'Chiami prima i soccorsi:',
    emergCallConfirm: 'Questo numero è dedotto dal fuso orario del suo dispositivo e può essere sbagliato, per esempio dietro una VPN. Verifichi il numero corretto per il suo paese e lo tenga scritto sul muro dello studio.',
    emergDisclaimer: 'Questa guida è un promemoria per chi ha già una formazione di primo soccorso. Non è un corso di primo soccorso e non lo sostituisce. Chiami prima i soccorsi, non faccia nulla per cui non è formato e autorizzato dove lavora, e resti accanto alla persona fino all\'arrivo dei soccorsi.',
    disclaimerTitle: 'Avvertenza importante:',
    disclaimerBody: 'Questo strumento è solo un riferimento educativo e non costituisce un parere medico. Non interrompere né modificare mai un farmaco prescritto senza consultare il medico che lo ha prescritto. Informa sempre il tuo tatuatore e il tuo piercer di qualsiasi farmaco, condizione di salute o integratore che stai assumendo prima della procedura.',
    langLabel: '🌐 Lingua:',
    headerBadge: '💊 Riferimento Farmaci e Sicurezza',
    headerTitle: 'Verifica Interazioni Farmacologiche',
    headerSubtitle: 'Scopri come i farmaci influiscono sul rischio di sanguinamento e sulla guarigione di tatuaggi e piercing.',
    draftDoctorBtn: '✉️ Bozza per il medico',
    tabChecker: '🔍 Verifica',
    tabBrief: '📄 Report Artista',
    tabSafety: '🛡️ Sicurezza Studio',
    tabFaq: '❓ FAQ & Consigli',
    tabReminders: '⏰ Promemoria & Sospensione',
    searchPlaceholder: 'Cerca farmaco o marca (es. Aspirina, Accutane, Xanax, EMLA)...',
    filterAll: 'Tutti',
    filterPain: 'Antidolorifici & FANS',
    filterNumbing: 'Creme Anestetiche',
    filterBlood: 'Fluidificanti del sangue',
    filterRetinoid: 'Acne / Retinoidi',
    filterAnxiety: 'Ansia / Ansiolitici',
    filterHormone: 'Ormoni & TOC',
    filterStimulant: 'ADHD & Stimolanti',
    filterMetabolic: 'Diabete & GLP-1',
    filterCorticosteroid: 'Corticosteroidi',
    filterImmuno: 'Immunosoppressori',
    filterSupplement: 'Integratori',
    filterAntibiotic: 'Antibiotici & Antivirali',
    filterSubstance: 'Sostanze & Stile di vita',
    infoNote: '💡 Seleziona i tuoi farmaci per visualizzare i rischi procedurali e le precauzioni.',
    clearAll: 'Cancella tutto',
    draftDoctorNoteBtn: '✉️ Bozza per il medico',
    viewBriefBtn: '📄 Vedi Report',
    backToTopBtn: '⬆️ Torna Su',
    backToMedListBtn: '⬆️ Torna alla Lista'
  },
  es: {
    translationNotice: 'Esta página ha sido traducida del inglés. No podemos garantizar que la traducción sea exacta. Hacemos todo lo posible para que todos puedan entender, pero la versión en inglés es la que consideramos correcta: compruebe en ella cualquier punto importante.',
    waitLabel: 'Recomendación de espera / lavado:',
    medUntranslated: 'Algunos detalles sobre los medicamentos anteriores se muestran en inglés: la traducción a este idioma todavía está en curso.',
    medSourcesLabel: 'Fuentes publicadas',
    tabSupplements: '🌿 Suplementos',
    suppHeading: 'Verificador de interacciones entre suplementos y medicamentos',
    suppIntro: 'La mayoría de la gente no considera el aceite de pescado, las cápsulas de ajo o el ginkgo como «medicación», así que nunca los menciona. Tomados junto a un anticoagulante o un analgésico, algunos suplementos aumentan el sangrado y el exudado durante la sesión. Añade lo que tomas para ver qué dice la literatura publicada.',
    suppSearchPlaceholder: 'Buscar un suplemento (p. ej. aceite de pescado, vitamina E, cúrcuma, ginseng)...',
    suppEmpty: 'Añade un suplemento para ver si se ha estudiado junto con tu medicamento.',
    suppStudied: 'se ha estudiado por sus efectos sobre el sangrado y la coagulación. Según',
    suppStudies: 'estudios humanos o clínicos.',
    suppCardFooter: 'Esto no significa que debas suspender ninguno de los dos. Dile a tu tatuador o perforador qué tomas, y consulta cualquier duda con el médico que te recetó la medicación.',
    suppNoPairs: 'No disponemos de estudios humanos publicados que relacionen este suplemento con los medicamentos que cubre esta herramienta. Eso no es lo mismo que «ninguna interacción»: significa que no existe investigación que citar. Menciónalo igualmente a tu profesional.',
    suppUnknownTitle: 'No tenemos datos sobre',
    suppUnknownBody: 'Es una laguna de nuestra biblioteca, no un resultado tranquilizador. No lo interpretes como seguro. Coméntalo con tu tatuador o perforador, y con tu médico si además tomas medicación recetada.',
    suppClinical: 'Evidencia clínica',
    suppHuman: 'Estudios en humanos',
    suppCredit: 'Datos de interacciones de SUPP.AI (Allen Institute for AI). Solo se muestran estudios humanos y clínicos; se excluyen los artículos retractados.',
    geoLangLabel: 'Buscar en:',
    geoFindStudio: '🎨 Buscar un estudio cerca',
    geoFindDoctor: '🩺 Buscar un médico cerca',
    geoFindPharmacy: '💊 Farmacia más cercana',
    geoFindHospital: '🏥 Hospital más cercano',
    geoNote: 'Estos enlaces abren Google Maps y buscan en el idioma del lugar donde está, lo que encuentra mucho más que una búsqueda en inglés en el extranjero. Su ubicación nunca llega hasta nosotros: a Google solo va una palabra de búsqueda. Cambie el idioma de arriba si la detección no es correcta.',
    emergHeadSub: 'Guías de actuación inmediata, paso a paso, para el personal del estudio ante complicaciones durante una sesion.',
    emergCallLabel: 'Llame primero a los servicios de emergencia:',
    emergCallConfirm: 'Este número se deduce de la zona horaria de su dispositivo y puede ser incorrecto, por ejemplo con una VPN. Confirme el número correcto de su país y téngalo escrito en la pared del estudio.',
    emergDisclaimer: 'Esta guía es un recordatorio para personas que ya tienen formación en primeros auxilios. No es formación en primeros auxilios ni la sustituye. Llame primero a emergencias, no haga nada para lo que no esté formado y autorizado donde trabaja, y quédese con la persona hasta que llegue la ayuda.',
    disclaimerTitle: 'Aviso importante:',
    disclaimerBody: 'Esta herramienta es solo una referencia educativa y no constituye asesoramiento médico. Nunca suspenda ni modifique un medicamento recetado sin consultar al médico que se lo recetó. Informe siempre a su tatuador y a su perforador de cualquier medicamento, problema de salud o suplemento que esté tomando antes del procedimiento.',
    langLabel: '🌐 Idioma:',
    headerBadge: '💊 Referencia de Medicamentos y Seguridad',
    headerTitle: 'Comprobador de Interacciones de Medicamentos',
    headerSubtitle: 'Consulta cómo los medicamentos afectan el riesgo de sangrado, la fijación de tinta y la cicatrización de tatuajes y piercings.',
    draftDoctorBtn: '✉️ Redactar nota para el médico',
    tabChecker: '🔍 Buscador',
    tabBrief: '📄 Informe para el Artista',
    tabSafety: '🛡️ Seguridad en el Estudio',
    tabFaq: '❓ Preguntas Frecuentes',
    tabReminders: '⏰ Recordatorios & Suspensión',
    searchPlaceholder: 'Buscar medicamento (ej. Ibuprofeno, Accutane, Xanax, EMLA)...',
    filterAll: 'Todos',
    filterPain: 'Analgésicos y AINEs',
    filterNumbing: 'Cremas Anestésicas',
    filterBlood: 'Anticoagulantes',
    filterRetinoid: 'Acné / Retinoides',
    filterAnxiety: 'Ansiolíticos / Sedantes',
    filterHormone: 'Hormonas y TRH',
    filterStimulant: 'TDAH y Estimulantes',
    filterMetabolic: 'Diabetes y GLP-1',
    filterCorticosteroid: 'Corticosteroides',
    filterImmuno: 'Inmunosupresores',
    filterSupplement: 'Suplementos',
    filterAntibiotic: 'Antibióticos y Antivirales',
    filterSubstance: 'Sustancias y Estilo de vida',
    infoNote: '💡 Selecciona tus medicamentos para verificar precauciones e interacciones.',
    clearAll: 'Borrar todo',
    draftDoctorNoteBtn: '✉️ Nota médica',
    viewBriefBtn: '📄 Ver Informe',
    backToTopBtn: '⬆️ Volver Arriba',
    backToMedListBtn: '⬆️ Volver a la Lista'
  },
  de: {
    translationNotice: 'Diese Seite wurde aus dem Englischen übersetzt. Wir können nicht garantieren, dass die Übersetzung exakt ist. Wir geben unser Bestes, damit alle sie verstehen können, aber die englische Fassung ist diejenige, die wir als korrekt ansehen - bitte prüfen Sie dort alles Wichtige nach.',
    waitLabel: 'Warte- / Auswaschempfehlung:',
    medUntranslated: 'Einige Angaben zu den Medikamenten oben werden auf Englisch angezeigt - die Übersetzung in diese Sprache ist noch in Arbeit.',
    medSourcesLabel: 'Veröffentlichte Quellen',
    tabSupplements: '🌿 Nahrungsergänzung',
    suppHeading: 'Interaktions-Check für Nahrungsergänzung und Medikamente',
    suppIntro: 'Die meisten Menschen halten Fischöl, Knoblauchkapseln oder Ginkgo nicht für „Medikamente" und erwähnen sie deshalb nie. Zusammen mit einem Blutverdünner oder einem Schmerzmittel erhöhen manche Präparate Blutung und Nässen während der Sitzung. Tragen Sie unten ein, was Sie einnehmen, um zu sehen, was die veröffentlichte Literatur sagt.',
    suppSearchPlaceholder: 'Präparat suchen (z. B. Fischöl, Vitamin E, Kurkuma, Ginseng)...',
    suppEmpty: 'Fügen Sie ein Präparat hinzu, um zu sehen, ob es zusammen mit Ihrem Medikament untersucht wurde.',
    suppStudied: 'wurde auf Wirkungen auf Blutung und Gerinnung untersucht. Auf Grundlage von',
    suppStudies: 'Human- oder klinischen Studien.',
    suppCardFooter: 'Das bedeutet nicht, dass Sie eines von beiden absetzen müssen. Sagen Sie Ihrem Tätowierer oder Piercer, was Sie einnehmen, und klären Sie Unklarheiten mit dem Arzt, der Ihre Medikamente verschrieben hat.',
    suppNoPairs: 'Uns liegen keine veröffentlichten Humanstudien vor, die dieses Präparat mit den hier abgedeckten Medikamenten verbinden. Das ist nicht dasselbe wie „keine Wechselwirkung" - es heißt, dass die Forschung dazu fehlt. Erwähnen Sie es trotzdem.',
    suppUnknownTitle: 'Wir haben keine Daten zu',
    suppUnknownBody: 'Das ist eine Lücke in unserer Datenbank, kein unbedenkliches Ergebnis. Werten Sie es nicht als sicher. Sprechen Sie es bei Ihrem Tätowierer oder Piercer an und bei Ihrem Arzt, wenn Sie zusätzlich verschriebene Medikamente einnehmen.',
    suppClinical: 'Klinische Evidenz',
    suppHuman: 'Humanstudien',
    suppCredit: 'Interaktionsdaten von SUPP.AI (Allen Institute for AI). Es werden nur Human- und klinische Studien gezeigt; zurückgezogene Arbeiten sind ausgeschlossen.',
    geoLangLabel: 'Suchen auf:',
    geoFindStudio: '🎨 Studio in der Nähe finden',
    geoFindDoctor: '🩺 Arzt in der Nähe finden',
    geoFindPharmacy: '💊 Nächste Apotheke',
    geoFindHospital: '🏥 Nächstes Krankenhaus',
    geoNote: 'Diese Links öffnen Google Maps und suchen in der Landessprache Ihres Aufenthaltsorts, was im Ausland weit mehr findet als eine englische Suche. Ihr Standort erreicht uns nie: an Google geht nur ein Suchwort. Ändern Sie oben die Sprache, falls die Erkennung falsch liegt.',
    emergHeadSub: 'Sofortige Schritt-für-Schritt-Anleitungen für das Studiopersonal bei Komplikationen während einer Sitzung.',
    emergCallLabel: 'Rufen Sie zuerst den Rettungsdienst:',
    emergCallConfirm: 'Diese Nummer wird aus der Zeitzone Ihres Geräts abgeleitet und kann falsch sein, etwa hinter einem VPN. Prüfen Sie die richtige Nummer für Ihr Land und halten Sie sie im Studio an der Wand fest.',
    emergDisclaimer: 'Dieser Leitfaden ist eine Gedächtnisstütze für Menschen, die bereits in Erster Hilfe ausgebildet sind. Er ist keine Erste-Hilfe-Ausbildung und ersetzt sie nicht. Rufen Sie zuerst den Rettungsdienst, tun Sie nichts, wofür Sie an Ihrem Arbeitsort nicht ausgebildet und befugt sind, und bleiben Sie bei der Person, bis Hilfe eintrifft.',
    disclaimerTitle: 'Wichtiger Hinweis:',
    disclaimerBody: 'Dieses Tool ist nur eine Bildungsreferenz und stellt keine medizinische Beratung dar. Setzen Sie verschriebene Medikamente niemals ohne Rücksprache mit Ihrem verschreibenden Arzt ab und ändern Sie sie nicht. Informieren Sie Ihren Tätowierer und Piercer immer über alle Medikamente, Gesundheitszustände oder Nahrungsergänzungsmittel, die Sie vor dem Eingriff einnehmen.',
    langLabel: '🌐 Sprache:',
    headerBadge: '💊 Medikamente & Sicherheitsreferenz',
    headerTitle: 'Medikamenten-Interaktions-Checker',
    headerSubtitle: 'Prüfen Sie, wie Medikamente das Blutungsrisiko und die Heilung von Tattoos & Piercings beeinflussen.',
    draftDoctorBtn: '✉️ Nachricht an Arzt entwerfen',
    tabChecker: '🔍 Checker',
    tabBrief: '📄 Künstler-Briefing',
    tabSafety: '🛡️ Studio-Sicherheit',
    tabFaq: '❓ FAQ & Tipps',
    tabReminders: '⏰ Erinnerungen & Karenzzeit',
    searchPlaceholder: 'Medikament suchen (z.B. Ibuprofen, Accutane, Xanax, EMLA)...',
    filterAll: 'Alle',
    filterPain: 'Schmerzmittel & NSAID',
    filterNumbing: 'Betäubungscremes',
    filterBlood: 'Blutverdünner',
    filterRetinoid: 'Akne / Retinoide',
    filterAnxiety: 'Beruhigungsmittel',
    filterHormone: 'Hormone & HRT',
    filterStimulant: 'ADHS & Stimulanzien',
    filterMetabolic: 'Diabetes & GLP-1',
    filterCorticosteroid: 'Kortikosteroide',
    filterImmuno: 'Immunsuppressiva',
    filterSupplement: 'Nahrungsergänzung',
    filterAntibiotic: 'Antibiotika & Antivirale',
    filterSubstance: 'Substanzen & Lebensstil',
    infoNote: '💡 Wählen Sie Ihre Medikamente aus, um Risiken und Vorsichtsmaßnahmen zu sehen.',
    clearAll: 'Alles löschen',
    draftDoctorNoteBtn: '✉️ Arzt-Nachricht',
    viewBriefBtn: '📄 Briefing anzeigen',
    backToTopBtn: '⬆️ Nach Oben',
    backToMedListBtn: '⬆️ Zurück zur Liste'
  },
  nl: {
    translationNotice: 'Deze pagina is uit het Engels vertaald. Wij kunnen niet garanderen dat de vertaling exact is. Wij doen ons best zodat iedereen het kan begrijpen, maar de Engelse versie is degene die wij als juist beschouwen - controleer daar alles wat belangrijk is.',
    waitLabel: 'Wacht- / uitwasadvies:',
    medUntranslated: 'Sommige medicatiegegevens hierboven worden in het Engels getoond - de vertaling naar deze taal is nog bezig.',
    medSourcesLabel: 'Gepubliceerde bronnen',
    tabSupplements: '🌿 Supplementen',
    suppHeading: 'Interactiecheck voor supplementen en medicijnen',
    suppIntro: 'De meeste mensen zien visolie, knoflookcapsules of ginkgo niet als "medicijn" en noemen ze daarom nooit. Samen met een bloedverdunner of een pijnstiller verhogen sommige supplementen bloeding en vochtafscheiding tijdens de sessie. Voeg hieronder toe wat u gebruikt om te zien wat de gepubliceerde literatuur zegt.',
    suppSearchPlaceholder: 'Zoek een supplement (bijv. visolie, vitamine E, kurkuma, ginseng)...',
    suppEmpty: 'Voeg een supplement toe om te zien of het samen met uw medicijn is onderzocht.',
    suppStudied: 'is onderzocht op effecten op bloeding en stolling. Op basis van',
    suppStudies: 'humane of klinische studies.',
    suppCardFooter: 'Dit betekent niet dat u met een van beide moet stoppen. Vertel uw tatoeëerder of piercer wat u gebruikt, en bespreek twijfels met de arts die uw medicatie heeft voorgeschreven.',
    suppNoPairs: 'Wij hebben geen gepubliceerde humane studies die dit supplement koppelen aan de medicijnen die deze tool behandelt. Dat is niet hetzelfde als "geen interactie" - het betekent dat het onderzoek ontbreekt. Noem het toch bij uw specialist.',
    suppUnknownTitle: 'Wij hebben geen gegevens over',
    suppUnknownBody: 'Dit is een hiaat in onze bibliotheek, geen schone uitslag. Lees het niet als veilig. Bespreek het met uw tatoeëerder of piercer, en met uw arts als u ook voorgeschreven medicatie gebruikt.',
    suppClinical: 'Klinisch bewijs',
    suppHuman: 'Humane studies',
    suppCredit: 'Interactiegegevens van SUPP.AI (Allen Institute for AI). Alleen humane en klinische studies worden getoond; teruggetrokken artikelen zijn uitgesloten.',
    geoLangLabel: 'Zoeken in:',
    geoFindStudio: '🎨 Studio in de buurt zoeken',
    geoFindDoctor: '🩺 Arts in de buurt zoeken',
    geoFindPharmacy: '💊 Dichtstbijzijnde apotheek',
    geoFindHospital: '🏥 Dichtstbijzijnde ziekenhuis',
    geoNote: 'Deze links openen Google Maps en zoeken in de taal van het land waar je bent. Dat levert in het buitenland veel meer op dan een Engelse zoekopdracht. Je locatie bereikt ons nooit: naar Google gaat alleen een zoekwoord. Wijzig hierboven de taal als de detectie ernaast zit.',
    emergHeadSub: 'Directe stap-voor-stap handelingsgidsen voor studiomedewerkers bij complicaties tijdens een sessie.',
    emergCallLabel: 'Bel eerst de hulpdiensten:',
    emergCallConfirm: 'Dit nummer is afgeleid van de tijdzone van je apparaat en kan verkeerd zijn, bijvoorbeeld achter een VPN. Controleer het juiste nummer voor jouw land en hang het in de studio aan de muur.',
    emergDisclaimer: 'Deze gids is een geheugensteun voor mensen die al EHBO-geschoold zijn. Het is geen EHBO-opleiding en vervangt die niet. Bel eerst de hulpdiensten, doe niets waarvoor je op je werkplek niet geschoold en bevoegd bent, en blijf bij de persoon tot er hulp is.',
    disclaimerTitle: 'Belangrijke disclaimer:',
    disclaimerBody: 'Deze tool is alleen een educatieve referentie en vormt geen medisch advies. Stop of wijzig voorgeschreven medicatie nooit zonder overleg met uw voorschrijvend arts. Informeer uw tatoeëerder en piercer altijd over alle medicijnen, gezondheidsproblemen of supplementen die u gebruikt vóór de behandeling.',
    langLabel: '🌐 Taal:',
    headerBadge: '💊 Medicatie & Veiligheidsreferentie',
    headerTitle: 'Medicatie Interactie Checker',
    headerSubtitle: 'Controleer hoe medicijnen de bloedingsrisico\'s en genezing van tatoeages en piercings beïnvloeden.',
    draftDoctorBtn: '✉️ Bericht voor arts opstellen',
    tabChecker: '🔍 Checker',
    tabBrief: '📄 Artiest Briefing',
    tabSafety: '🛡️ Studio Veiligheid',
    tabFaq: '❓ Veelgestelde Vragen',
    tabReminders: '⏰ Herinneringen & Stopperiode',
    searchPlaceholder: 'Zoek medicijn (bijv. Ibuprofen, Accutane, Xanax, EMLA)...',
    filterAll: 'Alles',
    filterPain: 'Pijnstillers & NSAID\'s',
    filterNumbing: 'Verdovingscremes',
    filterBlood: 'Bloedverdunners',
    filterRetinoid: 'Acne / Retinoïden',
    filterAnxiety: 'Kalmeringsmiddelen',
    filterHormone: 'Hormonen & HST',
    filterStimulant: 'ADHD & Stimulantia',
    filterMetabolic: 'Diabetes & GLP-1',
    filterCorticosteroid: 'Corticosteroïden',
    filterImmuno: 'Immunosuppressiva',
    filterSupplement: 'Supplementen',
    filterAntibiotic: 'Antibiotica & Antiviraal',
    filterSubstance: 'Middelen & Levensstijl',
    infoNote: '💡 Selecteer uw medicijnen om risico\'s en adviezen te bekijken.',
    clearAll: 'Alles wissen',
    draftDoctorNoteBtn: '✉️ Bericht voor arts',
    viewBriefBtn: '📄 Bekijk Briefing',
    backToTopBtn: '⬆️ Naar Boven',
    backToMedListBtn: '⬆️ Terug naar Lijst'
  },
  pt: {
    translationNotice: 'Esta página foi traduzida do inglês. Não podemos garantir que a tradução seja exata. Fazemos o nosso melhor para que todos possam compreender, mas a versão inglesa é aquela que consideramos correta: verifique nela qualquer ponto importante.',
    waitLabel: 'Recomendação de espera / eliminação:',
    medUntranslated: 'Alguns detalhes sobre os medicamentos acima são mostrados em inglês: a tradução para este idioma ainda está em curso.',
    medSourcesLabel: 'Fontes publicadas',
    tabSupplements: '🌿 Suplementos',
    suppHeading: 'Verificador de interações entre suplementos e medicamentos',
    suppIntro: 'A maioria das pessoas não considera o óleo de peixe, as cápsulas de alho ou o ginkgo como «medicação», por isso nunca os menciona. Tomados com um anticoagulante ou um analgésico, alguns suplementos aumentam a hemorragia e o exsudado durante a sessão. Adicione o que toma para ver o que diz a literatura publicada.',
    suppSearchPlaceholder: 'Procurar um suplemento (ex. óleo de peixe, vitamina E, curcuma, ginseng)...',
    suppEmpty: 'Adicione um suplemento para ver se foi estudado juntamente com o seu medicamento.',
    suppStudied: 'foi estudado quanto a efeitos na hemorragia e na coagulação. Com base em',
    suppStudies: 'estudos humanos ou clínicos.',
    suppCardFooter: 'Isto não significa que tenha de parar qualquer um deles. Diga ao seu tatuador ou body piercer o que toma e esclareça qualquer dúvida com o médico que lhe prescreveu a medicação.',
    suppNoPairs: 'Não dispomos de estudos humanos publicados que liguem este suplemento aos medicamentos abrangidos por esta ferramenta. Isso não é o mesmo que «nenhuma interação» - significa que não há investigação para citar. Mencione-o na mesma.',
    suppUnknownTitle: 'Não temos dados sobre',
    suppUnknownBody: 'Isto é uma lacuna da nossa biblioteca, não um resultado tranquilizador. Não o interprete como seguro. Fale disso com o seu tatuador ou body piercer, e com o seu médico se também toma medicação prescrita.',
    suppClinical: 'Evidência clínica',
    suppHuman: 'Estudos humanos',
    suppCredit: 'Dados de interação da SUPP.AI (Allen Institute for AI). São mostrados apenas estudos humanos e clínicos; artigos retratados são excluídos.',
    geoLangLabel: 'Pesquisar em:',
    geoFindStudio: '🎨 Encontrar um estúdio perto',
    geoFindDoctor: '🩺 Encontrar um médico perto',
    geoFindPharmacy: '💊 Farmácia mais próxima',
    geoFindHospital: '🏥 Hospital mais próximo',
    geoNote: 'Estas ligações abrem o Google Maps e pesquisam na língua do local onde está, o que encontra muito mais do que uma pesquisa em inglês no estrangeiro. A sua localização nunca chega até nós: para a Google vai apenas uma palavra de pesquisa. Mude a língua acima se a deteção estiver errada.',
    emergHeadSub: 'Guias de atuação imediata, passo a passo, para o pessoal do estudio perante complicações durante uma sessão.',
    emergCallLabel: 'Ligue primeiro para a emergência:',
    emergCallConfirm: 'Este número é deduzido do fuso horário do seu dispositivo e pode estar errado, por exemplo atrás de uma VPN. Confirme o número correto do seu país e mantenha-o escrito na parede do estúdio.',
    emergDisclaimer: 'Este guia é um lembrete para quem já tem formação em primeiros socorros. Não é formação em primeiros socorros nem a substitui. Ligue primeiro para a emergência, não faça nada para que não esteja formado e autorizado onde trabalha, e fique junto da pessoa até a ajuda chegar.',
    disclaimerTitle: 'Aviso importante:',
    disclaimerBody: 'Esta ferramenta é apenas uma referência educativa e não constitui aconselhamento médico. Nunca pare nem ajuste medicamentos prescritos sem consultar o médico que os prescreveu. Informe sempre o seu tatuador e o seu body piercer sobre quaisquer medicamentos, problemas de saúde ou suplementos que esteja a tomar antes do procedimento.',
    langLabel: '🌐 Idioma:',
    headerBadge: '💊 Referência de Medicamentos e Segurança',
    headerTitle: 'Verificador de Interação Medicamentosa',
    headerSubtitle: 'Verifique como medicamentos afetam o risco de sangramento e a cicatrização de tatuagens e piercings.',
    draftDoctorBtn: '✉️ Rascunhar mensagem para o médico',
    tabChecker: '🔍 Verificador',
    tabBrief: '📄 Relatório para o Artista',
    tabSafety: '🛡️ Segurança no Estúdio',
    tabFaq: '❓ Perguntas Frecuentes',
    tabReminders: '⏰ Lembretes & Suspensão',
    searchPlaceholder: 'Buscar medicamento (ex. Ibuprofeno, Accutane, Xanax, EMLA)...',
    filterAll: 'Todos',
    filterPain: 'Analgésicos e AINEs',
    filterNumbing: 'Cremes Anestésicos',
    filterBlood: 'Anticoagulantes',
    filterRetinoid: 'Acne / Retinoides',
    filterAnxiety: 'Ansiolíticos / Sedativos',
    filterHormone: 'Hormônios e TRH',
    filterStimulant: 'TDAH e Estimulantes',
    filterMetabolic: 'Diabetes e GLP-1',
    filterCorticosteroid: 'Corticosteroides',
    filterImmuno: 'Imunossupressores',
    filterSupplement: 'Suplementos',
    filterAntibiotic: 'Antibióticos e Antivirais',
    filterSubstance: 'Substâncias e Estilo de Vida',
    infoNote: '💡 Selecione seus medicamentos para visualizar riscos e recomendações.',
    clearAll: 'Limpar tudo',
    draftDoctorNoteBtn: '✉️ Nota médica',
    viewBriefBtn: '📄 Ver Relatório',
    backToTopBtn: '⬆️ Voltar ao Topo',
    backToMedListBtn: '⬆️ Voltar à Lista'
  }
};

const RISK_EXPLANATIONS = {
  'Bleeding Risk': 'NSAIDs and blood thinners inhibit platelet aggregation (clotting factors) or thin blood, preventing rapid scab formation during skin perforation.',
  'High Bleeding Risk': 'Strong anticoagulants severely inhibit clotting cascades, causing steady arterial or capillary bleeding during skin puncture.',
  'Mild Bleeding Risk': 'Slight decrease in platelet stickiness or minor blood thinning leading to mild extra oozing.',
  'No Extra Bleeding': 'Does not affect blood clotting or vascular constriction.',
  'Plasma Oozing': 'When blood clotting is delayed, blood vessel walls leak clear plasma onto skin, diluting tattoo ink and pushing pigment out of dermal layers.',
  'Safe Analgesic': 'Acetaminophen/Paracetamol works on central nervous system pain receptors without inhibiting platelet aggregation.',
  'Fainting Risk': 'Vasovagal syncope occurs when pain, stress, or medications trigger a sudden reflex drop in heart rate and blood pressure.',
  'Sedation Risk': 'Central nervous system depressants reduce alertness, lowering blood pressure and raising risk of lightheadedness or nausea.',
  'Skin Texture Alteration': 'Topical anesthetics cause localized edema (fluid swelling in skin cells), making skin rubbery and harder for needles to deposit ink evenly.',
  'Rebound Shock': 'When topical numbing wears off mid-session, pain receptors suddenly flood the brain without gradual adaptation, causing intense pain shock.',
  'Rebound Bleeding': 'Epinephrine temporarily shrinks blood vessels. When it wears off, blood vessels dilate rapidly (rebound hyperemia), producing heavy bleeding.',
  'Vasoconstriction': 'Narrowing of blood vessels blanches skin, making alignment difficult and temporarily restricting blood flow.',
  'Delayed Healing': 'Anticoagulants and steroids slow down fibrin formation and cell proliferation required for wound closure.',
  'Severe Scarring': 'Isotretinoin (Accutane) suppresses sebum and alters skin cell regeneration, causing fragile skin to form keloid or hypertrophic scars.',
  'Healing Delay': 'Impaired skin cell turnover delays epithelialization of fresh tattoo ink or piercing fistula walls.',
  'Fragile Skin': 'Dermal layers are thinned, making skin easily torn by friction or adhesive bandage removal.',
  'Skin Sensitivity': 'Accelerated exfoliation makes skin hyper-reactive to needle friction and aftercare products.',
  'Photosensitivity': 'Certain drugs make skin cells absorb UV rays rapidly, causing severe sunburn-like allergic reactions on fresh tattoos.',
  'Low Blood Pressure': 'Sedatives and anti-anxiety drugs lower vascular tone, increasing fainting risk upon standing or pain stimulation.',
  'Bradycardia': 'Beta-blockers slow heart rate, preventing normal cardiac response to pain and triggering dizziness.',
  'Drowsiness': 'Antihistamines cause central sedation, making you sleepy during long procedures.',
  'Minor Pigmentation Risk': 'Hormonal fluctuations sensitize melanocytes, increasing melasma risk when exposed to sun during healing.',
  'Slightly Thicker Blood': 'Testosterone increases red blood cell count (hematocrit), making blood slightly denser during heavy linework.',
  'Dehydration Sensitivity': 'Diuretic effects increase fluid loss, requiring double the normal water intake to prevent blood pressure drops.',
  'Heart Rate Increase': 'Stimulants raise baseline heart rate and sympathetic arousal, increasing jitteriness and pain sensitivity.',
  'Hypoglycemia Risk': 'GLP-1 drugs delay stomach emptying and drop blood glucose, causing sudden nausea or weakness if sugar levels drop.',
  'Infection Risk': 'Suppressed immune response reduces white blood cell activity, increasing vulnerability to bacterial skin infection.',
  'High Infection Risk': 'Immunosuppressive medications significantly impair bacterial defense, making sterile aftercare critical.',
  'Skin Fragility at Site': 'Topical corticosteroids thin local dermal collagen fibers.',
  'Outbreak Prevention': 'Lip trauma triggers dormant HSV-1 herpes cold sores; prophylactic antivirals suppress viral replication.'
};

function renderRiskBadgeHtml(rb) {
  // Strip emojis for key matching
  const cleanKey = rb.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}\u{2B50}\u{2B06}\u{2194}\u{2B05}\u{2934}\u{2935}\u{25AA}\u{25AB}\u{25FE}\u{25FD}\u{25FC}\u{25FB}\u{25FA}\u{25B6}\u{25C0}\u{1F1E6}-\u{1F1FF}]/gu, '').trim();
  const exp = RISK_EXPLANATIONS[cleanKey] || RISK_EXPLANATIONS[rb] || 'Mechanism related to tissue repair, blood clotting, or autonomic nervous system response during skin puncture.';
  
  return `
    <span class="risk-badge-wrapper" data-risk-name="${escHtml(rb)}" data-risk-exp="${escHtml(exp)}">
      <span class="list-risk-badge">${escHtml(rb)}</span>
    </span>`;
}

function updateUILanguage(lang) {
  currentLang = lang || 'en';
  // <html lang> drives screen-reader pronunciation; without it French text is
  // read with English phonetics. Persist so a reload does not snap back to EN.
  document.documentElement.setAttribute('lang', currentLang);
  try { localStorage.setItem('ui_lang_v1', currentLang); } catch (e) {}
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Generic placeholder translation. The medication search box had a one-off
  // line below for exactly this; a second input needing the same thing is the
  // point to make it general rather than write the special case twice.
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) el.placeholder = dict[key];
  });

  // English readers are reading the source, so the notice would be noise.
  const tn = document.getElementById('translation-notice');
  if (tn) tn.style.display = currentLang === 'en' ? 'none' : '';

  // The results already on screen are built from dict strings, so they have to
  // be rebuilt when the language changes or they stay in the old one.
  if (typeof renderSupplementResults === 'function') renderSupplementResults();

  if (medSearchEl && dict.searchPlaceholder) {
    medSearchEl.placeholder = dict.searchPlaceholder;
  }

  // Update tabs if text present
  const tabBtnMap = {
    checker: dict.tabChecker,
    brief: dict.tabBrief,
    safety: dict.tabSafety,
    faq: dict.tabFaq,
    reminders: dict.tabReminders
  };

  document.querySelectorAll('.tab-btn').forEach(btn => {
    const tabName = btn.dataset.tab;
    if (tabBtnMap[tabName]) {
      if (tabName === 'brief') {
        const countSpan = btn.querySelector('.badge-count');
        btn.innerHTML = `${dict.tabBrief} <span class="badge-count" id="brief-count">${countSpan ? countSpan.textContent : '0'}</span>`;
      } else {
        btn.textContent = tabBtnMap[tabName];
      }
    }
  });

  renderMedList();
  renderResults();
}

function triggerBadgePulse() {
  const briefCount = document.getElementById('brief-count');
  if (!briefCount) return;
  briefCount.classList.remove('pulse');
  void briefCount.offsetWidth; // Force reflow
  briefCount.classList.add('pulse');
  setTimeout(() => {
    briefCount.classList.remove('pulse');
  }, 500);
}

function setupEventListeners() {
  // Language Switcher
  const langSelect = document.getElementById('lang-select');
  if (langSelect) {
    langSelect.addEventListener('change', (e) => {
      updateUILanguage(e.target.value);
    });
    var savedLang = '';
    try { savedLang = localStorage.getItem('ui_lang_v1') || ''; } catch (e) {}
    if (savedLang && TRANSLATIONS[savedLang]) {
      langSelect.value = savedLang;
      updateUILanguage(savedLang);
    }
  }

  // Risk Badge Popover Bubble Event Delegation
  document.addEventListener('click', (e) => {
    const wrapper = e.target.closest('.risk-badge-wrapper');
    const existingPopover = document.querySelector('.risk-popover-bubble');
    
    if (existingPopover) {
      existingPopover.remove();
    }

    if (wrapper) {
      e.stopPropagation();
      const riskName = wrapper.dataset.riskName || 'Risk Factors';
      const riskExp = wrapper.dataset.riskExp || 'Procedural risk mechanism.';

      const popover = document.createElement('div');
      popover.className = 'risk-popover-bubble';
      popover.innerHTML = `
        <div class="risk-popover-title">
          <span>${escHtml(riskName)}</span>
          <span style="cursor:pointer; font-size:1rem; opacity:0.7;" onclick="this.parentElement.parentElement.remove()">✕</span>
        </div>
        <div>${escHtml(riskExp)}</div>
      `;

      wrapper.appendChild(popover);
    }
  });

  // Tab switching
  toolTabsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;
    const tabName = btn.dataset.tab;
    
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
    
    btn.classList.add('active');
    const targetTab = document.getElementById(`tab-${tabName}`);
    if (targetTab) targetTab.style.display = 'block';

    if (tabName === 'brief') {
      updateBriefTab();
    } else if (tabName === 'reminders') {
      renderRemindersTab();
    }
  });

  // Share Intake Deep Link Listeners
  document.getElementById('header-share-link-btn')?.addEventListener('click', copyShareableDeepLink);
  document.getElementById('share-deep-link-checker-btn')?.addEventListener('click', copyShareableDeepLink);
  document.getElementById('share-brief-link-btn')?.addEventListener('click', copyShareableDeepLink);

  // Quick Print Listener
  document.getElementById('header-quick-print-btn')?.addEventListener('click', triggerQuickPrint);

  // Reminders & Washout Tab Listeners
  document.getElementById('save-appointment-btn')?.addEventListener('click', saveAppointmentDate);
  document.getElementById('enable-notifications-btn')?.addEventListener('click', enableBrowserNotifications);
  document.getElementById('export-gcal-ics-btn')?.addEventListener('click', exportGoogleCalendarIcs);
  document.getElementById('open-gcal-web-btn')?.addEventListener('click', openGoogleCalendarWeb);
  document.getElementById('export-ics-btn')?.addEventListener('click', exportCalendarEvent);

  // Switch to checker link from empty brief / empty reminders
  document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'go-to-checker') {
      e.preventDefault();
      document.querySelector('[data-tab="checker"]').click();
    }
  });

  // Category filter tags
  filterTagsEl.addEventListener('click', (e) => {
    const tag = e.target.closest('.filter-tag');
    if (!tag) return;
    document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
    tag.classList.add('active');
    activeCategoryFilter = tag.dataset.cat;
    renderMedList();
  });

  // Live search
  medSearchEl.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    clearSearchBtn.style.display = searchQuery.length > 0 ? 'block' : 'none';
    renderMedList();
  });

  clearSearchBtn.addEventListener('click', () => {
    medSearchEl.value = '';
    searchQuery = '';
    clearSearchBtn.style.display = 'none';
    renderMedList();
  });

  // Med list selection change
  medListEl.addEventListener('change', () => {
    renderResults();
    updateBriefCount();
  });

  // FAQ accordions
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      item.classList.toggle('open');
      const icon = btn.querySelector('.faq-icon');
      if (icon) icon.textContent = item.classList.contains('open') ? '−' : '+';
    });
  });

  // Brief actions
  document.getElementById('copy-brief-btn').addEventListener('click', copyBriefText);
  document.getElementById('print-brief-btn').addEventListener('click', () => window.print());
  
  const downloadPdfBtn = document.getElementById('download-pdf-btn');
  if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener('click', generateBriefPDF);
  }

  const exportJsonBtn = document.getElementById('export-json-btn');
  if (exportJsonBtn) {
    exportJsonBtn.addEventListener('click', exportBriefAsJson);
  }

  const exportTxtBtn = document.getElementById('export-txt-btn');
  if (exportTxtBtn) {
    exportTxtBtn.addEventListener('click', exportBriefAsTxt);
  }

  const printPacketBtn = document.getElementById('print-full-packet-btn');
  if (printPacketBtn) {
    printPacketBtn.addEventListener('click', printFullClinicPacket);
  }

  // Modal event listeners
  if (openDocModalBtn) {
    openDocModalBtn.addEventListener('click', openDoctorModal);
  }
  if (closeDocModalBtn) {
    closeDocModalBtn.addEventListener('click', closeDoctorModal);
  }
  if (cancelDocModalBtn) {
    cancelDocModalBtn.addEventListener('click', closeDoctorModal);
  }
  
  [docNameInput, patientNameInput, procTypeInput, procDateInput].forEach(inp => {
    if (inp) inp.addEventListener('input', updateDoctorMessageDraft);
  });

  if (copyDocMsgBtn) {
    copyDocMsgBtn.addEventListener('click', copyDoctorMessage);
  }
  if (emailDocBtn) {
    emailDocBtn.addEventListener('click', openDoctorEmailClient);
  }
  const printDocMsgBtn = document.getElementById('print-doc-msg-btn');
  if (printDocMsgBtn) {
    printDocMsgBtn.addEventListener('click', printDoctorMessage);
  }

  // Floating Back to Top button - smooth scroll jump to search bar
  const floatTopBtn = document.getElementById('floating-top-btn');
  if (floatTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 280) {
        floatTopBtn.classList.add('visible');
      } else {
        floatTopBtn.classList.remove('visible');
      }
    });
    floatTopBtn.addEventListener('click', () => {
      const searchBox = document.querySelector('.search-box') || document.getElementById('med-search');
      if (searchBox) {
        searchBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (medSearchEl) {
          setTimeout(() => {
            try { medSearchEl.focus({ preventScroll: true }); } catch (e) {}
          }, 350);
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // Risk Badge & Med item jump handler and Card Back button handler
  document.addEventListener('click', (e) => {
    // 1. Check if clicking a card back button
    const backBtn = e.target.closest('.card-back-btn');
    if (backBtn) {
      const medId = backBtn.dataset.medId;
      const targetItem = document.querySelector(`input[data-med-id="${medId}"]`)?.closest('.med-item');
      if (targetItem) {
        targetItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetItem.classList.add('highlight-flash');
        setTimeout(() => targetItem.classList.remove('highlight-flash'), 1600);
      } else {
        const searchBox = document.querySelector('.search-box') || document.getElementById('med-search');
        if (searchBox) {
          searchBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
      return;
    }

    // 2. Check if clicking a risk badge or med item label to jump down to result card explanation section
    const riskBadge = e.target.closest('.risk-badge-wrapper, .med-item-label');
    if (riskBadge && !e.target.closest('input[type="checkbox"]') && !e.target.closest('.risk-popover-bubble')) {
      const medItem = riskBadge.closest('.med-item');
      if (!medItem) return;
      const chk = medItem.querySelector('input[data-med-id]');
      if (!chk) return;
      const medId = chk.dataset.medId;

      // Ensure checkbox is checked
      if (!chk.checked) {
        chk.checked = true;
        medItem.classList.add('selected');
        renderResults();
        updateBriefCount();
      }

      // Smooth scroll to result card explanation
      setTimeout(() => {
        const cardEl = document.getElementById(`result-card-${medId}`);
        if (cardEl) {
          cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          cardEl.classList.add('highlight-flash');
          setTimeout(() => cardEl.classList.remove('highlight-flash'), 1600);
        }
      }, 50);
    }
  });
}

function getSelectedMedIds() {
  return Array.from(document.querySelectorAll('input[data-med-id]:checked')).map(el => el.dataset.medId);
}

function updateBriefCount() {
  const count = getSelectedMedIds().length;
  const countEl = document.getElementById('brief-count');
  if (countEl) {
    countEl.textContent = count;
    countEl.style.display = count > 0 ? 'inline-block' : 'none';
  }
  triggerBadgePulse();
}

/* Levenshtein Distance & Fuzzy Matcher Engine */
function levenshteinDistance(a, b) {
  if (!a || !b) return (a || b).length;
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

function getFuzzySuggestion(query) {
  if (!query || query.length < 3) return null;
  const cleanQ = query.toLowerCase().trim();

  let bestMatch = null;
  let minDistance = Infinity;

  CATEGORIES.forEach(cat => {
    cat.meds.forEach(m => {
      // Test drug name
      const name = m.name.trim();
      const distName = levenshteinDistance(cleanQ, name.toLowerCase());

      if (distName > 0 && distName < minDistance && distName <= (cleanQ.length > 5 ? 3 : 2)) {
        minDistance = distName;
        bestMatch = name;
      }

      // Test brand names in sub
      if (m.sub) {
        const brands = m.sub.split('/').map(b => b.trim());
        brands.forEach(b => {
          const distBrand = levenshteinDistance(cleanQ, b.toLowerCase());
          if (distBrand > 0 && distBrand < minDistance && distBrand <= (cleanQ.length > 5 ? 3 : 2)) {
            minDistance = distBrand;
            bestMatch = b;
          }
        });
      }
    });
  });

  return bestMatch;
}

function renderMedList() {
  medListEl.innerHTML = '';
  let totalVisible = 0;

  CATEGORIES.forEach(cat => {
    if (activeCategoryFilter !== 'all' && cat.id !== activeCategoryFilter) {
      return;
    }

    const matchingMeds = cat.meds.filter(m => {
      if (!searchQuery) return true;
      const riskTagsStr = (m.riskBadges || []).join(' ');
      const haystack = `${m.name} ${m.sub} ${m.tags} ${m.cat} ${riskTagsStr}`.toLowerCase();
      return haystack.includes(searchQuery);
    });

    if (matchingMeds.length === 0) return;

    totalVisible += matchingMeds.length;

    const block = document.createElement('div');
    block.className = 'med-category';

    const itemsHtml = matchingMeds.map(m => {
      const isChecked = document.querySelector(`input[data-med-id="${m.id}"]`)?.checked ? 'checked' : '';
      
      const riskBadgesHtml = (m.riskBadges || []).map(rb => renderRiskBadgeHtml(rb)).join('');
      const riskLabel = m.sev === 'high' ? 'High Concern' : m.sev === 'mod' ? 'Moderate Concern' : 'Low Concern';

      return `
        <label class="med-item ${isChecked ? 'selected' : ''}">
          <input type="checkbox" value="${escHtml(m.id)}" data-med-id="${escHtml(m.id)}" ${isChecked}>
          <div class="med-item-info">
            <span class="med-item-label">
              ${escHtml(m.name)} 
              <small>${escHtml(m.sub)}</small>
            </span>
            <div class="med-risk-badges-row">
              ${riskBadgesHtml}
            </div>
            <div class="med-risk-bar-container">
              <div class="med-risk-bar-label">
                <span>Healing Risk:</span>
                <strong class="risk-label-${escHtml(m.sev)}">${escHtml(riskLabel)}</strong>
              </div>
              <div class="med-risk-bar-track" title="Healing Risk Level: ${escHtml(m.sev)}">
                <div class="med-risk-bar-fill ${escHtml(m.sev)}"></div>
              </div>
            </div>
          </div>
          <span class="mini-sev-dot ${escHtml(m.sev)}" title="${m.sev} risk"></span>
        </label>`;
    }).join('');

    block.innerHTML = `
      <div class="med-category-title">${escHtml(cat.label)} <span class="cat-count">(${matchingMeds.length})</span></div>
      <div class="med-items">${itemsHtml}</div>`;

    medListEl.appendChild(block);
  });

  // Handle "Did you mean?" suggestions
  const dymBox = document.getElementById('did-you-mean-box');
  if (dymBox) {
    if (searchQuery.length >= 3) {
      const suggestion = getFuzzySuggestion(searchQuery);
      if (suggestion && suggestion.toLowerCase() !== searchQuery) {
        dymBox.style.display = 'flex';
        dymBox.innerHTML = `
          <span>💡 Did you mean:</span>
          <button class="dym-btn" id="dym-apply-btn" data-term="${escHtml(suggestion)}">${escHtml(suggestion)} 🔍</button>
        `;

        document.getElementById('dym-apply-btn')?.addEventListener('click', () => {
          if (!medSearchEl) return;
          medSearchEl.value = suggestion;
          searchQuery = suggestion.toLowerCase().trim();
          if (clearSearchBtn) clearSearchBtn.style.display = 'block';
          saveRecentSearch(suggestion);
          renderMedList();
        });
      } else {
        dymBox.style.display = 'none';
      }
    } else {
      dymBox.style.display = 'none';
    }
  }

  if (totalVisible === 0) {
    medListEl.innerHTML = `
      <div class="no-search-results">
        <div class="no-results-icon">🔍</div>
        <p class="no-results-title">No medications found matching "<strong>${escHtml(searchQuery)}</strong>"</p>
        <div class="no-results-box">
          <p><strong>Suggestions to find your medication:</strong></p>
          <ul class="no-results-list">
            <li>• Check spelling or try searching by generic chemical name (e.g., <em>Ibuprofen, Paracetamol, Isotretinoin, Alprazolam</em>).</li>
            <li>• Search by regional brand name (e.g., <em>Advil, Doliprane, Tachipirina, Gelocatil, Spidifen, Ben-u-ron, Accutane, Xanax, TKTX</em>).</li>
            <li>• Filter by drug category using the tabs above (e.g., <em>Painkillers, Blood Thinners, Numbing Creams</em>).</li>
          </ul>
        </div>
        <button class="reset-search-btn" id="clear-search-no-results">Reset Filter / Clear Search</button>
      </div>`;
    
    document.getElementById('clear-search-no-results')?.addEventListener('click', () => {
      const clearBtn = document.getElementById('clear-search');
      if (clearBtn) clearBtn.click();
    });
  }
}

/**
 * The published sources behind one medication entry, when there are any.
 *
 * Data comes from js/medication-sources.js, generated by
 * scripts/build-tool-sources.js from ONLY the citations Patrick approved at
 * /cr/<code>. Nothing here proposes or infers a source.
 *
 * Returning '' when there is nothing is deliberate and covers two different
 * situations that both mean "we are not showing you a paper": the citation is
 * queued but not yet approved, or Europe PMC returned nothing on-claim for that
 * drug at all (calcineurin inhibitors, opioids, alcohol and stimulants). An
 * empty sources line is honest; an invented one is the defect this whole
 * exercise exists to prevent.
 */
/**
 * Translated medication prose, with an English fallback.
 *
 * The 38 medication entries carry ~1,942 words across tattoo/piercing/wait and
 * every word of it is English, in all seven languages. The chrome was
 * translated; the substance never was. A German user reads German buttons and
 * English pharmacology, and nothing tells them that is what is happening.
 *
 * medText() returns the translated string when js/med-content-i18n.js has one
 * and the English otherwise - but it records the miss, so the card can say so.
 * Silently serving English under a French flag is the failure mode here: the
 * reader cannot tell whether they are reading our words or a translation, on a
 * page about their medication.
 */
let medTextFellBack = false;

function medText(med, field) {
  const en = med[field] || '';
  if (currentLang === 'en') return en;
  const all = (typeof MED_CONTENT_I18N !== 'undefined' && MED_CONTENT_I18N) || {};
  const t = (all[med.id] || {})[currentLang];
  if (t && t[field]) return t[field];
  medTextFellBack = true;
  return en;
}

function renderMedSources(medId) {
  const all = (typeof MEDICATION_SOURCES !== 'undefined' && MEDICATION_SOURCES) || {};
  const srcs = all[medId];
  if (!srcs || !srcs.length) return '';
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const items = srcs.map((s) => {
    const label = escHtml(s.claim || '') || (s.pmid ? 'PMID ' + escHtml(s.pmid) : escHtml(s.url));
    return '<li><a href="' + escHtml(s.url) + '" target="_blank" rel="noopener noreferrer">'
      + label + (s.pmid ? ' (PMID ' + escHtml(s.pmid) + ')' : '') + '</a></li>';
  }).join('');
  return '<div class="med-sources"><strong>' + escHtml(dict.medSourcesLabel || 'Published sources')
    + '</strong><ul>' + items + '</ul></div>';
}

/* "Find X nearby" row.
   The button LABELS are in the reader's UI language; the Maps QUERY is in the
   language of where they physically are - see js/geo-search.js for why those
   are deliberately different, and why we never ask for geolocation. */
function geoSearchLang() {
  try {
    const saved = localStorage.getItem('geo_search_lang_v1');
    if (saved && GEO_SEARCH_TERMS[saved]) return saved;
  } catch (e) {}
  return geoSearchDetectLang();
}

function renderGeoRow(highCount) {
  if (typeof GEO_SEARCH_TERMS === 'undefined') return '';
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const gl = geoSearchLang();
  const kinds = [
    ['studio', dict.geoFindStudio || '\ud83c\udfa8 Find a studio nearby', ''],
    ['doctor', dict.geoFindDoctor || '\ud83e\ude7a Find a doctor nearby', ''],
    ['pharmacy', dict.geoFindPharmacy || '\ud83d\udc8a Nearest pharmacy', ''],
    ['hospital', dict.geoFindHospital || '\ud83c\udfe5 Nearest hospital', highCount > 0 ? ' urgent' : ''],
  ];
  const btns = kinds.map(([kind, label, extra]) =>
    `<a class="geo-btn${extra}" data-geo-kind="${kind}" target="_blank" rel="noopener noreferrer"
        href="${escHtml(geoSearchUrl(kind, gl))}">${escHtml(label)}</a>`).join('');

  const opts = Object.keys(GEO_SEARCH_TERMS)
    .sort((a, b) => GEO_SEARCH_LANG_NAMES[a].localeCompare(GEO_SEARCH_LANG_NAMES[b]))
    .map(l => `<option value="${l}"${l === gl ? ' selected' : ''}>${escHtml(GEO_SEARCH_LANG_NAMES[l])}</option>`)
    .join('');

  return `
    <div class="geo-row">
      <div class="geo-btns">${btns}</div>
      <div class="geo-lang">
        <label for="geo-lang-select">${escHtml(dict.geoLangLabel || 'Search in:')}</label>
        <select id="geo-lang-select">${opts}</select>
      </div>
      <p class="geo-note">${escHtml(dict.geoNote || '')}</p>
    </div>`;
}

/* Re-points the four links when the reader overrides the detected language. */
function initGeoRow() {
  const sel = document.getElementById('geo-lang-select');
  if (!sel) return;
  sel.addEventListener('change', () => {
    const l = sel.value;
    try { localStorage.setItem('geo_search_lang_v1', l); } catch (e) {}
    document.querySelectorAll('.geo-btn[data-geo-kind]').forEach((a) => {
      a.setAttribute('href', geoSearchUrl(a.getAttribute('data-geo-kind'), l));
    });
  });
}

function renderResults() {
  medTextFellBack = false;
  const checked = getSelectedMedIds();
  if (checked.length === 0) { 
    resultEl.innerHTML = ''; 
    return; 
  }

  const sevOrder = { high: 0, mod: 1, low: 2 };
  const sorted = [...checked].sort((a, b) => sevOrder[medMap[a].sev] - sevOrder[medMap[b].sev]);

  const highCount = sorted.filter(id => medMap[id].sev === 'high').length;
  const modCount  = sorted.filter(id => medMap[id].sev === 'mod').length;

  const cardsHtml = sorted.map(id => {
    const m = medMap[id];
    const sevLabel = m.sev === 'high' ? 'High concern' : m.sev === 'mod' ? 'Moderate concern' : 'Low concern';
    
    const riskBadgesHtml = (m.riskBadges || []).map(rb => renderRiskBadgeHtml(rb)).join('');

    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

    return `
      <div class="interaction-card ${escHtml(m.sev)}" id="result-card-${escHtml(m.id)}">
        <div class="interaction-head">
          <div class="interaction-title-group">
            <span class="interaction-name">${escHtml(m.name)}</span>
            <span class="interaction-sub">${escHtml(m.sub)}</span>
            <div class="card-risk-row">${riskBadgesHtml}</div>
          </div>
          <span class="sev-badge ${escHtml(m.sev)}">${escHtml(sevLabel)}</span>
        </div>
        <div class="interaction-body">
          <div class="effect-row">
            <span class="effect-type tattoo-badge">🎨 Tattoo</span>
            <span class="effect-text">${escHtml(medText(m, 'tattoo'))}</span>
          </div>
          <div class="effect-row">
            <span class="effect-type piercing-badge">💎 Piercing</span>
            <span class="effect-text">${escHtml(medText(m, 'piercing'))}</span>
          </div>
          ${m.wait ? `<div class="wait-note">⏱️ <strong>${escHtml(dict.waitLabel || 'Wait / Washout Recommendation:')}</strong> ${escHtml(medText(m, 'wait'))}</div>` : ''}
          ${renderMedSources(m.id)}
          <div style="margin-top:0.75rem; text-align:right;">
            <button class="card-back-btn" data-med-id="${escHtml(m.id)}">${dict.backToMedListBtn || '⬆️ Back to Med List'}</button>
          </div>
        </div>
      </div>`;
  }).join('');

  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  resultEl.innerHTML = `
    <div class="result-header-box">
      <div class="result-summary">
        <span class="result-count">
          <strong>${checked.length}</strong> medication${checked.length !== 1 ? 's' : ''} selected:
          ${highCount > 0 ? `<span class="badge-high">${highCount} High Concern</span>` : ''}
          ${modCount > 0 ? `<span class="badge-mod">${modCount} Moderate Concern</span>` : ''}
          ${highCount === 0 && modCount === 0 ? `<span class="badge-low">Low Concern Overall</span>` : ''}
        </span>
      </div>
      <div class="result-actions">
        <button class="brief-jump-btn" onclick="openDoctorModal()">${dict.draftDoctorNoteBtn || '✉️ Draft Doctor Note'}</button>
        <button class="brief-jump-btn" onclick="document.querySelector('[data-tab=\\'brief\\']').click()">${dict.viewBriefBtn || '📄 View Artist Brief'}</button>
        <button class="clear-btn" id="clear-btn">${dict.clearAll || 'Clear all'}</button>
      </div>
      ${renderGeoRow(highCount)}
    </div>
    ${cardsHtml}`;

  initGeoRow();

  document.getElementById('clear-btn').addEventListener('click', () => {
    document.querySelectorAll('input[data-med-id]:checked').forEach(el => { el.checked = false; });
    renderResults();
    renderMedList();
    updateBriefCount();
  });
}

/* Auto-Save Functionality for Readiness Assessment & Prep Calculator */
function saveReadinessAutoSave() {
  const allIds = [
    'calc-weight', 'calc-weight-unit', 'calc-hours', 'calc-proc-type', 'calc-rhr', 'calc-bp',
    'check-stimulant', 'check-beta', 'check-glp1', 'check-anxiety',
    'q-proc-select', 'q-history-select', 'q-med-nsaid', 'q-med-numbing', 'q-med-retinoid', 'q-med-bp', 'q-med-none'
  ];
  const data = {};
  allIds.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.type === 'checkbox') {
      data[id] = el.checked;
    } else {
      data[id] = el.value;
    }
  });
  try {
    localStorage.setItem('readiness_assessment_autosave_v1', JSON.stringify(data));
  } catch(e) {}
}

function loadReadinessAutoSave() {
  try {
    const raw = localStorage.getItem('readiness_assessment_autosave_v1');
    if (!raw) return;
    const data = JSON.parse(raw);
    Object.keys(data).forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      if (el.type === 'checkbox') {
        el.checked = !!data[id];
      } else {
        el.value = data[id];
      }
    });
  } catch(e) {}
}

/* Calculator & Readiness Assessment Logic */
function initCalculators() {
  // Restore auto-saved form selections
  loadReadinessAutoSave();

  // Pre-Session Prep Calculator Listener
  const calcInputs = ['calc-weight', 'calc-weight-unit', 'calc-hours', 'calc-proc-type', 'calc-rhr', 'calc-bp', 'check-stimulant', 'check-beta', 'check-glp1', 'check-anxiety'];
  calcInputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => {
        updatePrepCalculator();
        saveReadinessAutoSave();
      });
      el.addEventListener('change', () => {
        updatePrepCalculator();
        saveReadinessAutoSave();
      });
    }
  });

  // Artist Readiness Assessment Listener
  const readinessInputs = ['q-proc-select', 'q-history-select', 'q-med-nsaid', 'q-med-numbing', 'q-med-retinoid', 'q-med-bp', 'q-med-none'];
  readinessInputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('change', () => {
        updateArtistReadiness();
        saveReadinessAutoSave();
      });
    }
  });

  updatePrepCalculator();
  updateArtistReadiness();
}

function updatePrepCalculator() {
  const weightInput = document.getElementById('calc-weight');
  const unitSelect  = document.getElementById('calc-weight-unit');
  const hoursSelect = document.getElementById('calc-hours');
  const procSelect  = document.getElementById('calc-proc-type');
  const resultsEl   = document.getElementById('prep-calc-results');

  if (!weightInput || !resultsEl) return;

  let weightVal = parseFloat(weightInput.value) || 70;
  if (unitSelect && unitSelect.value === 'lbs') {
    weightVal = weightVal * 0.453592; // convert to kg
  }

  const hours = parseInt(hoursSelect ? hoursSelect.value : '3', 10) || 3;

  const rhrInput = document.getElementById('calc-rhr');
  const bpInput  = document.getElementById('calc-bp');

  const rhrVal = rhrInput && rhrInput.value ? parseInt(rhrInput.value, 10) : null;
  const bpVal  = bpInput && bpInput.value ? bpInput.value.trim() : '';

  const chkStimulant = document.getElementById('check-stimulant')?.checked;
  const chkBeta      = document.getElementById('check-beta')?.checked;
  const chkGlp1      = document.getElementById('check-glp1')?.checked;
  const chkAnxiety   = document.getElementById('check-anxiety')?.checked;

  let syncopeScore = 0;
  if (chkStimulant) syncopeScore += 2;
  if (chkBeta) syncopeScore += 2;
  if (chkGlp1) syncopeScore += 3;
  if (chkAnxiety) syncopeScore += 2;
  if (hours >= 4) syncopeScore += 1;

  let vitalsAdvice = '';

  if (rhrVal && !isNaN(rhrVal)) {
    if (rhrVal < 60) {
      syncopeScore += 1;
      vitalsAdvice += `• <strong>Resting HR ${rhrVal} bpm (Bradycardia):</strong> Lower baseline pulse can increase vasovagal susceptibility when pain or fear occurs. Ensure you are fully reclined.<br>`;
    } else if (rhrVal > 100) {
      syncopeScore += 1;
      vitalsAdvice += `• <strong>Resting HR ${rhrVal} bpm (Tachycardia):</strong> Elevated pulse indicates high sympathetic arousal, anxiety, or caffeine/stimulant intake. Avoid extra coffee/energy drinks; practice 4-4-4 box breathing before needle contact.<br>`;
    } else {
      vitalsAdvice += `• <strong>Resting HR ${rhrVal} bpm:</strong> Normal baseline heart rate (60–100 bpm). Good cardiovascular stability for session.<br>`;
    }
  }

  if (bpVal) {
    const parts = bpVal.split(/[\/\\]/).map(p => parseInt(p.trim(), 10));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      const sys = parts[0];
      const dia = parts[1];
      if (sys < 90 || dia < 60) {
        syncopeScore += 3;
        vitalsAdvice += `• <strong>Blood Pressure ${sys}/${dia} mmHg (Hypotension Alert):</strong> HIGH RISK OF VASOVAGAL SYNCOPE! Low blood pressure easily drops further during pain shock. <em>Mandatory Action:</em> Consume 500ml water + electrolyte mix 30 mins before seating; lie completely flat during session; keep glucose juice nearby.<br>`;
      } else if (sys >= 140 || dia >= 90) {
        syncopeScore += 1;
        vitalsAdvice += `• <strong>Blood Pressure ${sys}/${dia} mmHg (Elevated BP):</strong> Higher blood pressure increases microvascular bleeding and throbbing sensation during skin puncture. Ensure prescribed antihypertensives are taken as directed.<br>`;
      } else {
        vitalsAdvice += `• <strong>Blood Pressure ${sys}/${dia} mmHg:</strong> Optimal blood pressure range (90–120 / 60–80 mmHg).<br>`;
      }
    }
  }

  let riskTag = '<span class="syncope-risk-tag low">Low Syncope Risk</span>';
  if (syncopeScore >= 4) {
    riskTag = '<span class="syncope-risk-tag high">⚠️ Elevated Syncope Risk</span>';
  } else if (syncopeScore >= 2) {
    riskTag = '<span class="syncope-risk-tag mod">Moderate Syncope Risk</span>';
  }

  const totalWaterMl = Math.round((weightVal * 35) + (hours * 250));
  const totalWaterOz = Math.round(totalWaterMl * 0.033814);
  const hourlyMl = Math.round(250 + (weightVal > 80 ? 50 : 0));

  resultsEl.innerHTML = `
    <div class="calc-result-box">
      <div class="calc-result-title">
        <span>💧 Target Hydration Plan</span>
        <span style="font-size:0.75rem; color:var(--primary); font-weight:700;">${totalWaterMl} ml (${totalWaterOz} oz)</span>
      </div>
      <div class="calc-result-desc">
        • <strong>24 Hours Before:</strong> Drink ~${Math.round(totalWaterMl * 0.6)} ml throughout the day.<br>
        • <strong>2 Hours Before:</strong> Drink ~${Math.round(totalWaterMl * 0.25)} ml with electrolytes.<br>
        • <strong>During Session:</strong> Sip ~${hourlyMl} ml every 45–60 minutes.
      </div>
    </div>

    <div class="calc-result-box">
      <div class="calc-result-title">
        <span>🍌 Blood Sugar & Fuel Schedule</span>
        <span style="font-size:0.75rem; color:var(--primary); font-weight:700;">Glucose Target</span>
      </div>
      <div class="calc-result-desc">
        • <strong>Pre-Appointment Meal (1.5–2h pre):</strong> Eat complex carbs + protein (oatmeal, chicken rice bowl, or whole-grain toast).<br>
        • <strong>Session Glucose Boost:</strong> Consume 15–20g simple carbs (fruit juice, gummy candies, or sports drink) every ${hours >= 4 ? '90 minutes' : '2 hours'} to keep blood sugar >90 mg/dL.
      </div>
    </div>

    <div class="calc-result-box">
      <div class="calc-result-title">
        <span>💫 Vasovagal Syncope & Vitals Analysis</span>
        ${riskTag}
      </div>
      <div class="calc-result-desc">
        ${vitalsAdvice ? `<div style="margin-bottom:0.5rem; padding-bottom:0.4rem; border-bottom:1px dashed var(--border);">${vitalsAdvice}</div>` : ''}
        ${syncopeScore >= 2 
          ? '• <strong>Recommended Protocol:</strong> Request a reclined/lying position for your session. Keep fruit juice at your side. Yawning, cold sweats, or tunnel vision are early warnings — inform your artist immediately to pause and elevate your legs 30°.' 
          : '• <strong>Recommended Protocol:</strong> Standard ergonomic seating. Stay seated for 10 minutes after procedure before standing up rapidly.'}
      </div>
    </div>
  `;
}

function updateArtistReadiness() {
  const procVal = document.getElementById('q-proc-select')?.value || 'tattoo_body';
  const historyVal = document.getElementById('q-history-select')?.value || 'none';
  const box = document.getElementById('readiness-output-box');

  if (!box) return;

  const nsaidChecked    = document.getElementById('q-med-nsaid')?.checked;
  const numbingChecked  = document.getElementById('q-med-numbing')?.checked;
  const retinoidChecked  = document.getElementById('q-med-retinoid')?.checked;
  const bpChecked       = document.getElementById('q-med-bp')?.checked;

  let checklistItems = [];

  if (procVal.includes('tattoo')) {
    checklistItems.push('<strong>Station Setup:</strong> Prepare clean barrier film, extra paper towels, and sterile cold wash solution.');
  } else {
    checklistItems.push('<strong>Station Setup:</strong> Prepare sterile receiving tubes, surgical forceps, and appropriate needle gauge.');
  }

  if (nsaidChecked) {
    checklistItems.push('<strong>Bleeding Protocol:</strong> Client takes NSAIDs/blood thinners. Expect elevated plasma weeping. Use gentle dab wiping with witch hazel/green soap instead of dry scrubbing to protect ink setting.');
  }

  if (numbingChecked) {
    checklistItems.push('<strong>Skin Density Caution:</strong> Client applied numbing cream. Check for skin edema/rubbery texture before outlining. Be prepared for sudden pain shock when cream wears off.');
  }

  if (retinoidChecked) {
    checklistItems.push('<strong>Skin Fragility Warning:</strong> Client has retinoid or steroid exposure. DO NOT use aggressive adhesive second-skin bandages (Saniderm/Tegaderm). Use non-stick sterile absorbent pads with gentle paper tape.');
  }

  if (bpChecked || historyVal === 'fainting') {
    checklistItems.push('<strong>Vasovagal Position:</strong> Recline chair 30° with leg rest slightly raised. Keep fruit juice/glucose tabs at station before starting.');
  }

  if (procVal === 'tattoo_cosmetic' || procVal === 'piercing_oral') {
    checklistItems.push('<strong>Antiviral Check:</strong> Confirm client disclosed any history of lip herpes/cold sores; recommend prophylactic antivirals to prevent post-procedure outbreak.');
  }

  if (historyVal === 'sensitive_skin') {
    checklistItems.push('<strong>Dermal Sensitivity:</strong> Perform 5-minute patch test or use hypoallergenic ink/cleaning agents; avoid fragranced soaps.');
  }

  if (checklistItems.length === 0) {
    checklistItems.push('Standard studio intake and sterile procedure protocols applicable.');
  }

  box.innerHTML = `
    <div class="readiness-checklist-title">
      <span>📋 Studio Precautions & Checklist</span>
      <span style="font-size:0.75rem; color:var(--text-muted); font-weight:normal;">Tailored for Artist Intake</span>
    </div>
    <ul class="readiness-list">
      ${checklistItems.map(item => `<li>${item}</li>`).join('')}
    </ul>
    <div class="readiness-actions">
      <button class="action-btn secondary" id="copy-readiness-btn" style="font-size:0.78rem; padding:0.4rem 0.8rem;">📋 Copy Artist Checklist</button>
    </div>
  `;

  document.getElementById('copy-readiness-btn')?.addEventListener('click', () => {
    const text = checklistItems.map(i => i.replace(/<[^>]*>/g, '')).join('\n• ');
    navigator.clipboard.writeText('ARTIST SAFETY CHECKLIST:\n• ' + text).then(() => {
      const btn = document.getElementById('copy-readiness-btn');
      if (btn) {
        btn.textContent = '✅ Copied!';
        setTimeout(() => { btn.textContent = '📋 Copy Artist Checklist'; }, 2000);
      }
    });
  });
}

function updateBriefTab() {
  const checked = getSelectedMedIds();
  const briefContentEl = document.getElementById('brief-content');
  const briefActionsEl = document.getElementById('brief-actions');

  if (checked.length === 0) {
    briefContentEl.innerHTML = `
      <div class="empty-brief-notice">
        <p>⚠️ No medications selected yet.</p>
        <p><a href="#" id="go-to-checker">Switch to the Interaction Checker</a> and select your medications to generate your custom consultation brief.</p>
      </div>`;
    briefActionsEl.style.display = 'none';
    return;
  }

  const sorted = [...checked].sort((a, b) => {
    const sevOrder = { high: 0, mod: 1, low: 2 };
    return sevOrder[medMap[a].sev] - sevOrder[medMap[b].sev];
  });

  const highCount = sorted.filter(id => medMap[id].sev === 'high').length;
  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  let briefTextHtml = `
    <div class="printable-brief">
      <div class="brief-stamp">Poli International - Client Medication & Safety Brief</div>
      <div class="brief-meta">
        <div><strong>Date Generated:</strong> ${dateStr}</div>
        <div><strong>Total Disclosed Medications:</strong> ${checked.length}</div>
        <div><strong>Risk Profile:</strong> ${highCount > 0 ? '⚠️ High Concern Items Present (Medical Clearance Recommended)' : '✅ Standard Care & Disclosure'}</div>
      </div>

      <div class="brief-section-title">Disclosed Medications & Procedural Impact</div>
      <div class="brief-med-table">
  `;

  sorted.forEach(id => {
    const m = medMap[id];
    const riskPills = (m.riskBadges || []).map(rb => `<span class="card-risk-pill">${escHtml(rb)}</span>`).join(' ');

    briefTextHtml += `
      <div class="brief-med-row ${escHtml(m.sev)}">
        <div class="brief-med-name">
          <strong>${escHtml(m.name)}</strong>
          <small>(${escHtml(m.sub)})</small>
          <span class="sev-badge ${escHtml(m.sev)}">${m.sev.toUpperCase()}</span>
        </div>
        <div class="brief-risk-pills-container">${riskPills}</div>
        <div class="brief-med-details">
          <p><strong>Tattoo Impact:</strong> ${escHtml(m.tattoo)}</p>
          <p><strong>Piercing Impact:</strong> ${escHtml(m.piercing)}</p>
          ${m.wait ? `<p><strong>Recommended Action:</strong> ${escHtml(m.wait)}</p>` : ''}
        </div>
      </div>`;
  });

  briefTextHtml += `
      </div>

      <div class="brief-section-title">Recommended Studio Protocol</div>
      <ul class="brief-protocol-list">
        <li><strong>Hydration & Calories:</strong> Client should eat a full complex carb meal 1-2 hours pre-session and maintain active hydration.</li>
        <li><strong>Client Positioning:</strong> ${highCount > 0 ? 'Recline client during procedure to manage potential vasovagal fainting or lightheadedness.' : 'Standard studio ergonomic seating.'}</li>
        <li><strong>Bleeding & Plasma Management:</strong> ${sorted.some(id => ['pain', 'blood', 'supplement'].includes(medMap[id].cat)) ? 'Expect elevated plasma weeping. Gentle dab wiping recommended to preserve ink setting.' : 'Standard wiping protocol.'}</li>
        <li><strong>Aftercare Bandage Selection:</strong> ${sorted.some(id => ['retinoid', 'corticosteroid'].includes(medMap[id].cat)) ? '⚠️ Skin may be fragile. Avoid aggressive adhesive second-skin bandages (Saniderm/Tegaderm). Use non-stick pads or breathable cling wrap.' : 'Standard aftercare wrap applicable.'}</li>
      </ul>

      <div class="brief-footer-note">
        <em>Notice to Artist / Piercer: This brief is compiled by the client for educational disclosure. It is not a substitute for formal medical clearance from a licensed physician.</em>
      </div>
    </div>
  `;

  briefContentEl.innerHTML = briefTextHtml;
  briefActionsEl.style.display = 'flex';

  renderHealingJourneyTimeline();
}

function copyBriefText() {
  const checked = getSelectedMedIds();
  if (checked.length === 0) return;

  let text = `=== TATTOO & PIERCING MEDICATION CONSULTATION BRIEF ===\n`;
  text += `Date: ${new Date().toLocaleDateString()}\n\n`;
  text += `Selected Medications (${checked.length}):\n`;

  checked.forEach(id => {
    const m = medMap[id];
    text += `- ${m.name} (${m.sub}) [Risk: ${m.sev.toUpperCase()}]\n`;
    text += `  Risks: ${(m.riskBadges || []).join(', ')}\n`;
    text += `  Tattoo: ${m.tattoo}\n`;
    text += `  Piercing: ${m.piercing}\n`;
    if (m.wait) text += `  Action: ${m.wait}\n`;
    text += `\n`;
  });

  text += `Generated via Poli International Medication Reference.\n`;

  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('copy-brief-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '✅ Copied!';
    setTimeout(() => { btn.innerHTML = originalText; }, 2000);
  }).catch(() => {
    alert('Brief copied to clipboard!');
  });
}

// PDF Document Generation using jsPDF
function generateBriefPDF() {
  const checked = getSelectedMedIds();
  if (checked.length === 0) {
    alert('Please select at least one medication first.');
    return;
  }

  if (!window.jspdf || !window.jspdf.jsPDF) {
    window.print();
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });

  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  let y = 15;

  // Title & Header
  doc.setFillColor(13, 17, 23);
  doc.rect(0, 0, 210, 28, 'F');
  
  doc.setTextColor(68, 147, 248);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('POLI INTERNATIONAL - STUDIO SAFETY REFERENCE', 14, 11);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.text('Client Medication & Safety Consultation Brief', 14, 20);

  y = 36;

  // Metadata Box
  doc.setFillColor(240, 243, 246);
  doc.setDrawColor(200, 205, 210);
  doc.roundedRect(14, y, 182, 20, 3, 3, 'FD');

  doc.setTextColor(40, 40, 40);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Date Generated: ${dateStr}`, 18, y + 6);
  doc.text(`Total Disclosed Medications: ${checked.length}`, 18, y + 12);

  const highCount = checked.filter(id => medMap[id].sev === 'high').length;
  doc.setFont('helvetica', 'bold');
  if (highCount > 0) {
    doc.setTextColor(200, 40, 40);
    doc.text(`Risk Assessment: HIGH CONCERN ITEMS PRESENT (Medical clearance advised)`, 18, y + 17);
  } else {
    doc.setTextColor(0, 130, 50);
    doc.text(`Risk Assessment: Standard Disclosure & Routine Caution`, 18, y + 17);
  }

  y += 28;

  // Section Header
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(9, 105, 218);
  doc.text('Disclosed Medications & Procedural Effects', 14, y);
  doc.setLineWidth(0.5);
  doc.setDrawColor(9, 105, 218);
  doc.line(14, y + 2, 196, y + 2);

  y += 8;

  const sorted = [...checked].sort((a, b) => {
    const sevOrder = { high: 0, mod: 1, low: 2 };
    return sevOrder[medMap[a].sev] - sevOrder[medMap[b].sev];
  });

  sorted.forEach((id) => {
    const m = medMap[id];

    // Check page space
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    doc.setFillColor(250, 250, 250);
    doc.setDrawColor(220, 220, 220);
    
    // Severity side border
    if (m.sev === 'high') doc.setDrawColor(230, 50, 50);
    else if (m.sev === 'mod') doc.setDrawColor(210, 140, 20);
    else doc.setDrawColor(60, 180, 80);

    doc.roundedRect(14, y, 182, 32, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(20, 20, 20);
    doc.text(`${m.name} (${m.sub})`, 18, y + 6);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    if (m.sev === 'high') doc.setTextColor(200, 30, 30);
    else if (m.sev === 'mod') doc.setTextColor(180, 110, 0);
    else doc.setTextColor(30, 140, 50);
    doc.text(`[${m.sev.toUpperCase()} RISK]`, 160, y + 6);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(8);

    const tattooLines = doc.splitTextToSize(`• Tattoo Impact: ${m.tattoo}`, 170);
    doc.text(tattooLines, 18, y + 12);

    const piercingLines = doc.splitTextToSize(`• Piercing Impact: ${m.piercing}`, 170);
    doc.text(piercingLines, 18, y + 19);

    if (m.wait) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(180, 80, 0);
      const waitLines = doc.splitTextToSize(`• Action: ${m.wait}`, 170);
      doc.text(waitLines, 18, y + 26);
    }

    y += 36;
  });

  // Recommended Protocols Section
  if (y > 220) {
    doc.addPage();
    y = 20;
  }

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(9, 105, 218);
  doc.text('Recommended Studio Protocols', 14, y);
  doc.line(14, y + 2, 196, y + 2);

  y += 8;

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(40, 40, 40);

  const protocols = [
    '1. Meal & Hydration: Client should eat a full complex-carb meal 1-2 hours pre-session and maintain active hydration.',
    '2. Positioning: Recline client if taking blood pressure, anxiety, or GLP-1 medications to prevent syncope.',
    '3. Plasma & Bleeding: Expect extra weeping for NSAIDs/blood thinners. Gentle dab wiping is recommended.',
    '4. Aftercare Wrap: Avoid aggressive second-skin adhesives if client takes retinoids or steroids. Use non-stick pads.'
  ];

  protocols.forEach(p => {
    doc.text(p, 16, y);
    y += 5.5;
  });

  y += 6;
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(120, 120, 120);
  const footerMsg = 'Disclaimer: Educational reference compiled by client for studio disclosure. Not a substitute for formal medical clearance.';
  doc.text(footerMsg, 14, y);

  doc.save(`Tattoo_Piercing_Medication_Brief_${new Date().toISOString().split('T')[0]}.pdf`);
}

// Doctor Consultation Modal Logic
function openDoctorModal() {
  doctorModalEl.style.display = 'flex';
  renderModalMedPills();
  updateDoctorMessageDraft();
}

function closeDoctorModal() {
  doctorModalEl.style.display = 'none';
}

function renderModalMedPills() {
  const checked = getSelectedMedIds();
  if (checked.length === 0) {
    modalMedPillsEl.innerHTML = `<span class="no-meds-pill">No medications currently selected in checker.</span>`;
    return;
  }

  modalMedPillsEl.innerHTML = checked.map(id => {
    const m = medMap[id];
    return `<span class="modal-pill ${escHtml(m.sev)}">${escHtml(m.name)}</span>`;
  }).join(' ');
}

function getLocalizedBrands(med, lang) {
  if (!med || !med.sub) return med ? med.name : '';
  const rawBrands = med.sub.split('/').map(s => s.trim());

  const regionalMap = {
    fr: ['Doliprane', 'Dafalgan', 'Efferalgan', 'Spidifen', 'Apranax', 'Subutex', 'Valium', 'Xanax', 'Curacne', 'TKTX', 'Advil', 'Nurofen'],
    es: ['Gelocatil', 'Termalgin', 'Espidifen', 'Neobrufen', 'Nolotil', 'Antalgin', 'Orfidal', 'Valium', 'Accutane', 'TKTX', 'Advil'],
    it: ['Tachipirina', 'Momendol', 'Contramal', 'TKTX', 'Brufen', 'Roaccutane', 'Xanax', 'Ascriptin', 'Advil', 'Nurofen'],
    de: ['Ratiopharm', 'Ibu-Ratiopharm', 'Paralen', 'Ben-u-ron', 'Voltaren', 'Aspirin', 'Roaccutan', 'Xanax', 'Advil'],
    pt: ['Ben-u-ron', 'Alivium', 'Dorflex', 'Anador', 'Xanax', 'TKTX', 'Advil'],
    nl: ['Calpol', 'Panadol', 'Brufen', 'Nurofen', 'Advil', 'Aspirin']
  };

  const targeted = regionalMap[lang] || ['Advil', 'Nurofen', 'Tylenol', 'Panadol', 'Accutane', 'Xanax', 'Ozempic', 'EMLA', 'TKTX'];
  
  const matched = rawBrands.filter(b => 
    targeted.some(t => b.toLowerCase().includes(t.toLowerCase()))
  );

  if (matched.length > 0) {
    return matched.slice(0, 2).join(' / ');
  }

  return rawBrands.slice(0, 2).join(' / ');
}

function updateDoctorMessageDraft() {
  const docName     = docNameInput.value.trim() || 'Dr. [Doctor Name]';
  const patientName = patientNameInput.value.trim() || '[Your Name]';
  const procType    = procTypeInput.value.trim() || '[Tattoo / Piercing Procedure]';
  const procDate    = procDateInput.value ? new Date(procDateInput.value).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '[Appointment Date]';

  const checked = getSelectedMedIds();
  let medListFormatted = '';

  if (checked.length > 0) {
    medListFormatted = checked.map(id => {
      const m = medMap[id];
      const localizedBrand = getLocalizedBrands(m, currentLang);
      const brandSuffix = localizedBrand && localizedBrand !== m.name ? ` (e.g., ${localizedBrand})` : '';

      let riskSummary = 'Requires procedural awareness and precautions.';
      if (m.tattoo) {
        const sentence = m.tattoo.split('.')[0].trim();
        if (sentence) riskSummary = sentence + '.';
      }

      return `• ${m.name}${brandSuffix}: ${riskSummary}`;
    }).join('\n\n');
  } else {
    medListFormatted = '• [List of medications currently taking]';
  }

  const draftText = `Dear ${docName},

I hope this message finds you well.

I am reaching out to inform you that I have an upcoming ${procType} scheduled for ${procDate}. 

Because body modification procedures involve localized skin puncture and mild trauma, I want to ensure my current medication routine is safe. I am currently taking the following medication(s):

${medListFormatted}

Could you please advise if:
1. It is safe for me to proceed with this procedure while taking these medications.
2. I should temporarily adjust or pause any of these medications prior to or after the appointment.
3. You have any specific precautions or medical guidance I should share with my tattoo artist or piercer.

Thank you very much for your time and guidance.

Sincerely,
${patientName}`;

  if (modalDraftArea) {
    modalDraftArea.value = draftText;
  }
}

function copyDoctorMessage() {
  if (!modalDraftArea.value) return;
  navigator.clipboard.writeText(modalDraftArea.value).then(() => {
    copyDocMsgBtn.innerHTML = '✅ Copied to Clipboard!';
    setTimeout(() => { copyDocMsgBtn.innerHTML = '📋 Copy Draft Message'; }, 2000);
  }).catch(() => {
    alert('Message copied to clipboard!');
  });
}

function openDoctorEmailClient() {
  const docName  = docNameInput.value.trim() || 'Doctor';
  const subject  = encodeURIComponent(`Medical Inquiry regarding upcoming ${procTypeInput.value.trim() || 'Tattoo/Piercing'} procedure`);
  const bodyText = encodeURIComponent(modalDraftArea.value);
  window.location.href = `mailto:?subject=${subject}&body=${bodyText}`;
}

function printDoctorMessage() {
  document.body.classList.add('printing-doctor-note');
  window.print();
  setTimeout(() => {
    document.body.classList.remove('printing-doctor-note');
  }, 1000);
}

/* Interactive Studio Safety & Lifestyle Quiz Engine */
let quizCurrentIndex = 0;
let quizScore = 0;
let quizAnswered = false;

const QUIZ_QUESTIONS = [
  {
    q: "Can I smoke cannabis or consume THC edibles right before my tattoo appointment to relax?",
    options: [
      "A) Yes, it completely numbs physical pain and makes the session effortless.",
      "B) No! THC causes vasodilation, increases heart rate, and can heighten anxiety or pain sensitivity.",
      "C) Only if combined with alcohol."
    ],
    correct: 1,
    explanation: "THC dilates blood vessels (increasing plasma weeping) and triggers sympathetic nervous arousal, often heightening pain perception or triggering panic/fainting during skin puncture."
  },
  {
    q: "What happens if you get tattooed with a severe alcohol hangover?",
    options: [
      "A) Nothing, hangovers don't affect skin or blood.",
      "B) Severe dehydration, blood thinning, heavy plasma weeping pushing ink out, and increased pain sensitivity.",
      "C) Tattoo ink sets faster because alcohol sterilizes skin from inside."
    ],
    correct: 1,
    explanation: "Alcohol suppresses antidiuretic hormone (causing dehydration), thins blood, drops blood sugar, and causes heavy plasma weeping that dilutes tattoo ink and increases scab formation."
  },
  {
    q: "Does vaping or smoking cigarettes affect how a fresh piercing or tattoo heals?",
    options: [
      "A) No, nicotine only affects lungs.",
      "B) Yes! Nicotine causes microvascular vasoconstriction, starving fresh skin wounds of oxygen and delaying healing.",
      "C) It speeds up skin healing by keeping blood pressure high."
    ],
    correct: 1,
    explanation: "Nicotine shrinks tiny skin capillaries, restricting oxygenated blood supply required for dermal cellular repair and piercing fistula formation."
  },
  {
    q: "Is it safe to slather half a tub of TKTX or EMLA numbing cream under plastic wrap for 4 hours?",
    options: [
      "A) Yes, the thicker the layer, the safer it is.",
      "B) No! Covering large body areas can cause systemic lidocaine toxicity, chemical skin burns, and severe rebound pain shock.",
      "C) It turns skin into leather permanently."
    ],
    correct: 1,
    explanation: "High-potency local anesthetics absorbed over large surfaces risk systemic cardiovascular toxicity, localized swelling, and extreme rebound pain when the numbness wears off."
  },
  {
    q: "You have a headache 1 hour before your tattoo session. Which OTC painkiller is safer to take?",
    options: [
      "A) Ibuprofen (Advil/Nurofen), because it reduces inflammation.",
      "B) Paracetamol / Acetaminophen (Tylenol/Panadol), because it does NOT thin blood or increase procedural bleeding.",
      "C) High-dose Aspirin."
    ],
    correct: 1,
    explanation: "Ibuprofen and NSAIDs inhibit COX-1 and platelet aggregation, increasing bleeding. Paracetamol works centrally without affecting blood clotting or bleeding."
  },
  {
    q: "A client taking Accutane (Isotretinoin) wants a small tattoo or piercing. What should you advise?",
    options: [
      "A) Go ahead! Small tattoos don't bleed.",
      "B) Stop! Accutane thins skin and alters cell turnover, causing severe scarring and non-healing wounds. They must wait 6–12 months post-treatment.",
      "C) Just apply extra moisturizer after."
    ],
    correct: 1,
    explanation: "Accutane fundamentally impairs dermal wound healing and stratum corneum integrity, risking hypertrophic scarring, ink blowout, and non-healing piercing fistulas."
  },
  {
    q: "During a long tattoo session, you feel sudden cold sweats, yawning, and blurred vision. What is the best immediate action?",
    options: [
      "A) Hold your breath and stay quiet so the artist finishes faster.",
      "B) Tell your artist immediately to pause, lay flat on your back, elevate legs 30°, and sip fruit juice.",
      "C) Stand up rapidly and run outside."
    ],
    correct: 1,
    explanation: "These are classic prodromal symptoms of vasovagal syncope. Laying flat with elevated legs immediately restores blood flow to the brain and aborts fainting."
  }
];

function initQuiz() {
  quizCurrentIndex = 0;
  quizScore = 0;
  quizAnswered = false;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const container = document.getElementById('quiz-body');
  if (!container) return;

  if (quizCurrentIndex >= QUIZ_QUESTIONS.length) {
    let rankTitle = '🏆 Master Studio Safety Expert!';
    let rankDesc = 'Incredible job! You have an outstanding understanding of medication interactions, alcohol/substance risks, and studio aftercare safety.';
    if (quizScore < 5) {
      rankTitle = '🩹 Studio Safety Apprentice';
      rankDesc = 'Good effort! Review the Studio Safety guide and FAQs to sharpen your knowledge on painkillers, alcohol, and syncope prevention.';
    }

    container.innerHTML = `
      <div class="quiz-summary-box">
        <div class="quiz-score-badge">${quizScore} / ${QUIZ_QUESTIONS.length}</div>
        <div class="quiz-rank-title">${rankTitle}</div>
        <div class="quiz-rank-desc">${rankDesc}</div>
        <button class="quiz-next-btn" onclick="initQuiz()">🔄 Retake Quiz</button>
      </div>`;
    return;
  }

  const item = QUIZ_QUESTIONS[quizCurrentIndex];
  const optionsHtml = item.options.map((opt, idx) => `
    <button class="quiz-option-btn" data-opt-idx="${idx}">
      ${escHtml(opt)}
    </button>
  `).join('');

  container.innerHTML = `
    <div class="quiz-q-box">
      <div class="quiz-q-header">
        <span class="quiz-q-num">Question ${quizCurrentIndex + 1} of ${QUIZ_QUESTIONS.length}</span>
        <span class="quiz-q-score">Score: ${quizScore}</span>
      </div>
      <div class="quiz-q-text">${escHtml(item.q)}</div>
      <div class="quiz-options-list" id="quiz-options-list">
        ${optionsHtml}
      </div>
      <div id="quiz-feedback" style="display:none;"></div>
      <button class="quiz-next-btn" id="quiz-next-btn" style="display:none;">Next Question ➔</button>
    </div>`;

  const optionBtns = container.querySelectorAll('.quiz-option-btn');
  optionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (quizAnswered) return;
      quizAnswered = true;

      const selectedIdx = parseInt(btn.dataset.optIdx, 10);
      const isCorrect = selectedIdx === item.correct;

      if (isCorrect) quizScore++;

      optionBtns.forEach((b, idx) => {
        b.disabled = true;
        if (idx === item.correct) b.classList.add('correct');
        else if (idx === selectedIdx && !isCorrect) b.classList.add('incorrect');
      });

      const feedbackEl = document.getElementById('quiz-feedback');
      feedbackEl.style.display = 'block';
      feedbackEl.className = `quiz-feedback-box ${isCorrect ? 'correct' : 'incorrect'}`;
      feedbackEl.innerHTML = `
        <strong>${isCorrect ? '✅ Correct!' : '❌ Incorrect!'}</strong> ${escHtml(item.explanation)}
      `;

      const nextBtn = document.getElementById('quiz-next-btn');
      nextBtn.style.display = 'inline-block';
      nextBtn.addEventListener('click', () => {
        quizCurrentIndex++;
        quizAnswered = false;
        renderQuizQuestion();
      });
    });
  });
}

function initTrendingSearches() {
  const chips = document.querySelectorAll('.trending-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const term = chip.dataset.term;
      if (!term || !medSearchEl) return;
      medSearchEl.value = term;
      searchQuery = term.toLowerCase().trim();
      if (clearSearchBtn) clearSearchBtn.style.display = 'block';
      renderMedList();
      const medListEl = document.getElementById('med-list');
      if (medListEl) {
        medListEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function initReadingProgress() {
  const safetySections = document.querySelectorAll('#tab-safety .guide-section');
  const safetyFill = document.getElementById('safety-progress-fill');
  const safetyText = document.getElementById('safety-progress-text');

  const faqItems = document.querySelectorAll('#tab-faq .faq-item');
  const faqFill = document.getElementById('faq-progress-fill');
  const faqText = document.getElementById('faq-progress-text');

  const readSafetySet = new Set();
  const readFaqSet = new Set();

  function updateSafetyProgress() {
    if (!safetySections.length) return;
    const triggerBottom = window.innerHeight * 0.85;

    safetySections.forEach((sec, idx) => {
      const rect = sec.getBoundingClientRect();
      if (rect.top < triggerBottom && rect.bottom > 0) {
        readSafetySet.add(idx);
      }
    });

    const count = readSafetySet.size;
    const total = safetySections.length;
    const pct = Math.round((count / total) * 100);

    if (safetyFill) safetyFill.style.width = `${pct}%`;
    if (safetyText) safetyText.textContent = `${count} / ${total} Sections Read (${pct}%)`;
  }

  function updateFaqProgress() {
    if (!faqItems.length) return;

    faqItems.forEach((item, idx) => {
      if (item.classList.contains('active') || item.dataset.read === 'true') {
        readFaqSet.add(idx);
      }
    });

    const count = readFaqSet.size;
    const total = faqItems.length;
    const pct = Math.round((count / total) * 100);

    if (faqFill) faqFill.style.width = `${pct}%`;
    if (faqText) faqText.textContent = `${count} / ${total} FAQs Read (${pct}%)`;
  }

  faqItems.forEach((item, idx) => {
    const btn = item.querySelector('.faq-question');
    if (btn) {
      btn.addEventListener('click', () => {
        item.dataset.read = 'true';
        readFaqSet.add(idx);
        updateFaqProgress();
      });
    }
  });

  window.addEventListener('scroll', () => {
    updateSafetyProgress();
    updateFaqProgress();
  });

  updateSafetyProgress();
  updateFaqProgress();
}

/* Recent Searches Engine (LocalStorage) */
function saveRecentSearch(term) {
  if (!term || term.trim().length < 2) return;
  const clean = term.trim();
  let searches = [];
  try {
    searches = JSON.parse(localStorage.getItem('recent_searches_v1') || '[]');
  } catch (e) { searches = []; }
  
  searches = searches.filter(s => s.toLowerCase() !== clean.toLowerCase());
  searches.unshift(clean);
  if (searches.length > 5) searches = searches.slice(0, 5);

  try {
    localStorage.setItem('recent_searches_v1', JSON.stringify(searches));
  } catch (e) {}

  renderRecentSearches();
}

function renderRecentSearches() {
  const box = document.getElementById('recent-searches-box');
  const container = document.getElementById('recent-chips');
  if (!box || !container) return;

  let searches = [];
  try {
    searches = JSON.parse(localStorage.getItem('recent_searches_v1') || '[]');
  } catch (e) { searches = []; }

  if (searches.length === 0) {
    box.style.display = 'none';
    return;
  }

  box.style.display = 'block';
  container.innerHTML = searches.map(s => `
    <button class="recent-chip" data-term="${escHtml(s)}">🕒 ${escHtml(s)}</button>
  `).join('');

  container.querySelectorAll('.recent-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const term = btn.dataset.term;
      if (!term || !medSearchEl) return;
      medSearchEl.value = term;
      searchQuery = term.toLowerCase().trim();
      if (clearSearchBtn) clearSearchBtn.style.display = 'block';
      renderMedList();
      const medListEl = document.getElementById('med-list');
      if (medListEl) {
        medListEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function clearRecentSearches() {
  try {
    localStorage.removeItem('recent_searches_v1');
  } catch (e) {}
  renderRecentSearches();
}

function initRecentSearches() {
  renderRecentSearches();

  const clearBtn = document.getElementById('clear-recent-searches');
  if (clearBtn) {
    clearBtn.addEventListener('click', clearRecentSearches);
  }

  if (medSearchEl) {
    medSearchEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && medSearchEl.value.trim().length >= 2) {
        saveRecentSearch(medSearchEl.value.trim());
      }
    });
    medSearchEl.addEventListener('change', () => {
      if (medSearchEl.value.trim().length >= 2) {
        saveRecentSearch(medSearchEl.value.trim());
      }
    });
  }
}

/* Export Functions & Full Clinic Packet Generation */
function exportBriefAsJson() {
  const checked = getSelectedMedIds();
  const patientName = patientNameInput?.value.trim() || 'Client';
  const procType = procTypeInput?.value.trim() || 'Tattoo / Piercing';
  const procDate = procDateInput?.value || '';

  const data = {
    appTitle: "Poli International - Studio Safety & Medication Reference",
    exportDate: new Date().toISOString(),
    clientDetails: {
      patientName,
      procedureType: procType,
      appointmentDate: procDate
    },
    disclosedMedications: checked.map(id => {
      const m = medMap[id];
      return {
        id: m.id,
        name: m.name,
        brandNames: m.sub,
        category: m.cat,
        severity: m.sev,
        riskBadges: m.riskBadges || [],
        tattooImpact: m.tattoo,
        piercingImpact: m.piercing,
        actionRecommendation: m.wait || ""
      };
    }),
    disclaimer: "Educational reference brief. Not formal medical clearance."
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `studio_medication_brief_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function exportBriefAsTxt() {
  const checked = getSelectedMedIds();
  const patientName = patientNameInput?.value.trim() || 'Client';
  const procType = procTypeInput?.value.trim() || 'Tattoo / Piercing';
  const procDate = procDateInput?.value || '';

  let txt = `========================================================\n`;
  txt += ` POLI INTERNATIONAL - CONSULTATION BRIEF & DISCLOSURE\n`;
  txt += `========================================================\n\n`;
  txt += `Date Generated: ${new Date().toLocaleDateString()}\n`;
  txt += `Client Name: ${patientName}\n`;
  txt += `Procedure Type: ${procType}\n`;
  txt += `Appointment Date: ${procDate || 'Not specified'}\n\n`;

  txt += `DISCLOSED MEDICATIONS (${checked.length}):\n`;
  txt += `--------------------------------------------------------\n`;

  if (checked.length === 0) {
    txt += `(No medications currently selected)\n`;
  } else {
    checked.forEach(id => {
      const m = medMap[id];
      txt += `• ${m.name} (${m.sub})\n`;
      txt += `  Risk Level: ${m.sev.toUpperCase()}\n`;
      txt += `  Risk Factors: ${(m.riskBadges || []).join(', ')}\n`;
      txt += `  Tattoo Impact: ${m.tattoo}\n`;
      txt += `  Piercing Impact: ${m.piercing}\n`;
      if (m.wait) txt += `  Recommended Action: ${m.wait}\n`;
      txt += `\n`;
    });
  }

  txt += `--------------------------------------------------------\n`;
  txt += `RECOMMENDED STUDIO PROTOCOLS:\n`;
  txt += `1. Meal & Hydration: Complex carbs 1.5h pre-session + active electrolyte hydration.\n`;
  txt += `2. Client Position: Recline if taking blood pressure or GLP-1 meds to mitigate syncope.\n`;
  txt += `3. Bandage Selection: Avoid aggressive second-skin adhesives for thin or fragile skin.\n\n`;

  txt += `Notice: Compiled for artist/piercer disclosure. Not a substitute for medical clearance.\n`;

  const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `studio_medication_brief_${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* Interactive Healing Journey Timeline Component */
let currentJourneyProc = 'tattoo';

function renderHealingJourneyTimeline(procType) {
  if (procType) currentJourneyProc = procType;
  const container = document.getElementById('timeline-wrapper');
  if (!container) return;

  const checkedMeds = getSelectedMedIds();
  const selectedCats = checkedMeds.map(id => medMap[id]?.cat);

  const isTattoo = currentJourneyProc === 'tattoo';

  // Tattoo Timeline Data
  const tattooStages = [
    {
      num: 1,
      title: 'Hemostasis, Acute Inflammation & Plasma Exudate',
      days: 'Days 1 – 3',
      desc: 'Immediate physiological wound response following dermal needle punctures. Blood vessels constrict then dilate, releasing clear plasma weeping, mild swelling, localized heat, and initial pigment trapping.',
      alerts: []
    },
    {
      num: 2,
      title: 'Epidermal Re-Epithelialization & Flaking',
      days: 'Days 4 – 10',
      desc: 'Top epidermal skin layer begins shedding damaged cells. Surface scabbing and fine peeling/flaking occur as new epithelial cells migrate underneath to close micro-wounds.',
      alerts: []
    },
    {
      num: 3,
      title: 'Dermal Maturation & "Milky Skin" Layer',
      days: 'Weeks 2 – 4',
      desc: 'Surface peeling resolves, revealing a silvery/milky translucent skin layer over the settling ink. Dermal collagen fibers restructure around pigment particles inside macrophages.',
      alerts: []
    },
    {
      num: 4,
      title: 'Complete Dermal Consolidation & Barrier Restoration',
      days: 'Month 1 – 3+',
      desc: 'Dermal layer is fully stabilized and stratum corneum thickness returns to baseline. Tattoo color depth reaches final clarity and long-term vibrancy.',
      alerts: []
    }
  ];

  if (isTattoo) {
    if (selectedCats.some(c => ['pain', 'blood', 'substance'].includes(c))) {
      tattooStages[0].alerts.push('🩸 <strong>Bleeding & Plasma Risk:</strong> Disclosed NSAIDs, Anticoagulants, or Alcohol delay platelet aggregation. Expect elevated plasma weeping during Days 1–3. Dab gently with clean paper towel.');
    }
    if (selectedCats.includes('numbing')) {
      tattooStages[0].alerts.push('⚡ <strong>Rebound Edema Alert:</strong> Localized numbing cream wearing off causes rebound vasodilation, increasing throbbing and plasma outflow in Stage 1.');
    }
    if (selectedCats.some(c => ['retinoid', 'corticosteroid'].includes(c))) {
      tattooStages[1].alerts.push('⚡ <strong>Skin Fragility Warning:</strong> Isotretinoin (Accutane) or Corticosteroids impair epidermal cell turnover. Avoid aggressive adhesive second-skin bandages (Saniderm/Tegaderm). Use non-stick pads.');
    }
    if (selectedCats.some(c => ['immuno', 'metabolic'].includes(c))) {
      tattooStages[2].alerts.push('🛡️ <strong>Delayed Dermal Repair:</strong> Disclosed Immunosuppressants or GLP-1/Diabetes medications slow collagen synthesis and cellular repair during Stage 3. Maintain strict hygiene.');
    }
    if (selectedCats.includes('hormone')) {
      tattooStages[2].alerts.push('☀️ <strong>Hyperpigmentation Risk:</strong> Estrogen/HRT fluctuations increase melanocyte sensitivity. Apply daily SPF 50+ broad spectrum sunscreen once skin is scab-free.');
    }
  }

  // Piercing Timeline Data
  const piercingStages = [
    {
      num: 1,
      title: 'Hemostatic Plug & Initial Inflammatory Swelling',
      days: 'Days 1 – 3',
      desc: 'Needle creates a tubular channel through dermal or cartilage tissue. Localized edema swells tissue around the metal post, releasing lymph exudate as blood clotting forms the initial seal.',
      alerts: []
    },
    {
      num: 2,
      title: 'Fistula Channel Epithelialization & Crusting',
      days: 'Days 4 – 14',
      desc: 'Epithelial cells migrate inwards from outer entry/exit holes to form a delicate skin tube (fistula) around jewelry. Lymph fluid dries into yellow crusting on metal ends.',
      alerts: []
    },
    {
      num: 3,
      title: 'Fistula Canal Maturation & Tissue Tightening',
      days: 'Weeks 3 – 12',
      desc: 'Internal fistula canal walls thicken, smooth out, and gain structural integrity. Swelling recedes completely and discharge decreases significantly.',
      alerts: []
    },
    {
      num: 4,
      title: 'Complete Fistula Consolidation & Safe Downsizing',
      days: 'Months 3 – 12',
      desc: 'Fistula tube is fully lined with tough, flexible epithelium. Safe for professional jewelry downsizing, style swapping, and daily friction exposure.',
      alerts: []
    }
  ];

  if (!isTattoo) {
    if (selectedCats.some(c => ['pain', 'blood', 'substance'].includes(c))) {
      piercingStages[0].alerts.push('🩸 <strong>Prolonged Channel Oozing:</strong> NSAIDs or Anticoagulants prolong capillary weeping around metal posts during Days 1–3. Do NOT rotate or twist jewelry.');
    }
    if (selectedCats.includes('numbing')) {
      piercingStages[0].alerts.push('⚡ <strong>Post-Numbing Swelling:</strong> Swelling from topical anesthetic may cause jewelry posts to press tight against tissue as numbing wears off.');
    }
    if (selectedCats.includes('retinoid')) {
      piercingStages[1].alerts.push('⚡ <strong>Severe Fistula Impairment:</strong> Isotretinoin (Accutane) halts normal epithelial cell migration. Ear/nose piercing fistulas may remain raw, crusty, and unhealed for months.');
    }
    if (selectedCats.some(c => ['immuno', 'corticosteroid'].includes(c))) {
      piercingStages[2].alerts.push('🛡️ <strong>High Cartilage Infection Risk:</strong> Immunosuppressive therapy impairs localized bacterial defenses. Apply sterile 0.9% saline spray twice daily.');
    }
    if (selectedCats.includes('stimulant')) {
      piercingStages[1].alerts.push('🫀 <strong>Microvascular Constriction:</strong> ADHD stimulants constrict skin capillaries. Ensure hydration and avoid over-cleansing with harsh soaps.');
    }
  }

  const stages = isTattoo ? tattooStages : piercingStages;

  const html = `
    <div class="timeline-track">
      ${stages.map(s => {
        const hasWarning = s.alerts.length > 0;
        return `
          <div class="timeline-stage ${hasWarning ? 'has-warning' : ''}">
            <div class="timeline-node">${s.num}</div>
            <div class="stage-header">
              <span class="stage-title">${escHtml(s.title)}</span>
              <span class="stage-days">${escHtml(s.days)}</span>
            </div>
            <div class="stage-desc">${escHtml(s.desc)}</div>
            ${s.alerts.map(a => `<div class="stage-med-alert">${a}</div>`).join('')}
          </div>
        `;
      }).join('')}
    </div>
  `;

  container.innerHTML = html;

  const tattooBtn = document.getElementById('journey-toggle-tattoo');
  const piercingBtn = document.getElementById('journey-toggle-piercing');
  if (tattooBtn && piercingBtn) {
    tattooBtn.classList.toggle('active', isTattoo);
    piercingBtn.classList.toggle('active', !isTattoo);
  }
}

function initHealingJourney() {
  const tattooBtn = document.getElementById('journey-toggle-tattoo');
  const piercingBtn = document.getElementById('journey-toggle-piercing');

  if (tattooBtn) {
    tattooBtn.addEventListener('click', () => renderHealingJourneyTimeline('tattoo'));
  }
  if (piercingBtn) {
    piercingBtn.addEventListener('click', () => renderHealingJourneyTimeline('piercing'));
  }

  renderHealingJourneyTimeline('tattoo');
}

/* Printable Medical Cover Page Generator */
function generatePrintCoverPage() {
  const coverEl = document.getElementById('print-cover-page');
  if (!coverEl) return;

  const checked = getSelectedMedIds();
  const patientName = patientNameInput?.value.trim() || 'Client / Patient Name';
  const procType = procTypeInput?.value.trim() || 'Tattoo / Body Piercing Procedure';
  const procDate = procDateInput?.value ? new Date(procDateInput.value).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : new Date().toLocaleDateString();
  const dateGenerated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const sorted = [...checked].sort((a, b) => {
    const sevOrder = { high: 0, mod: 1, low: 2 };
    return sevOrder[medMap[a].sev] - sevOrder[medMap[b].sev];
  });

  const highCount = sorted.filter(id => medMap[id].sev === 'high').length;

  let html = `
    <div class="cover-header">
      <div class="cover-stamp" style="font-size:0.85rem; font-weight:800; color:#0f172a; margin-bottom:0.5rem; text-transform:uppercase; letter-spacing:1px;">POLI INTERNATIONAL - STUDIO CLINIC PACKET</div>
      <h1 class="cover-title">Full Medical & Procedural Disclosure Report</h1>
    </div>

    <div class="cover-meta-grid">
      <div class="cover-meta-item">
        <strong>Client / Patient Name:</strong>
        <span>${escHtml(patientName)}</span>
      </div>
      <div class="cover-meta-item">
        <strong>Procedure Type:</strong>
        <span>${escHtml(procType)}</span>
      </div>
      <div class="cover-meta-item">
        <strong>Appointment Date:</strong>
        <span>${escHtml(procDate)}</span>
      </div>
      <div class="cover-meta-item">
        <strong>Report Generated:</strong>
        <span>${dateGenerated}</span>
      </div>
      <div class="cover-meta-item" style="grid-column: span 2;">
        <strong>Procedural Risk Profile:</strong>
        <span style="font-weight:bold; color: ${highCount > 0 ? '#dc2626' : '#16a34a'};">
          ${highCount > 0 ? `⚠️ High Concern Items Present (${highCount} High Risk Item${highCount > 1 ? 's' : ''})` : '✅ Standard Care & Disclosure (Low / Moderate Risk Profile)'}
        </span>
      </div>
    </div>

    <h2 style="font-size:1.1rem; font-weight:800; color:#0f172a; margin-bottom:0.75rem; text-transform:uppercase;">Summary of Disclosed Medications (${checked.length})</h2>
    
    <table class="cover-meds-table">
      <thead>
        <tr>
          <th>Medication / Brand</th>
          <th>Risk Level</th>
          <th>Key Procedural Impact Badges</th>
          <th>Action / Wait Advice</th>
        </tr>
      </thead>
      <tbody>
  `;

  if (checked.length === 0) {
    html += `
      <tr>
        <td colspan="4" style="text-align:center; padding:1.5rem; color:#64748b;">No medications selected prior to generating this clinic packet.</td>
      </tr>`;
  } else {
    sorted.forEach(id => {
      const m = medMap[id];
      const badges = (m.riskBadges || []).join(', ') || 'General Procedural Awareness';
      html += `
        <tr>
          <td><strong>${escHtml(m.name)}</strong><br><small style="color:#64748b;">${escHtml(m.sub)}</small></td>
          <td><strong style="color:${m.sev === 'high' ? '#dc2626' : m.sev === 'mod' ? '#d97706' : '#16a34a'};">${m.sev.toUpperCase()}</strong></td>
          <td>${escHtml(badges)}</td>
          <td>${escHtml(m.wait || 'Standard Studio Protocol')}</td>
        </tr>`;
    });
  }

  html += `
      </tbody>
    </table>

    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:1.25rem; margin-top:1.5rem;">
      <h3 style="font-size:0.9rem; font-weight:800; color:#1e293b; margin-bottom:0.5rem; text-transform:uppercase;">Packet Contents Overview</h3>
      <ul style="margin:0; padding-left:1.2rem; font-size:0.83rem; color:#334155; line-height:1.6;">
        <li><strong>Page 2:</strong> Client Consultation Brief & Procedural Protocol Guidelines</li>
        <li><strong>Page 3:</strong> Studio Safety, First Aid & Syncope Prevention Guidelines</li>
        <li><strong>Page 4:</strong> Frequently Asked Questions & Aftercare Reference</li>
      </ul>
    </div>

    <div class="cover-signatures-box">
      <div>
        <div class="cover-sig-line"></div>
        <div class="cover-sig-label">Client Signature & Date</div>
      </div>
      <div>
        <div class="cover-sig-line"></div>
        <div class="cover-sig-label">Artist / Studio Technician Signature & Date</div>
      </div>
    </div>
  `;

  coverEl.innerHTML = html;
}

function printFullClinicPacket() {
  generatePrintCoverPage();
  document.body.classList.add('printing-full-packet');
  window.print();
  setTimeout(() => {
    document.body.classList.remove('printing-full-packet');
  }, 1200);
}

/* Immediate Action Emergency Modal Logic */
function initEmergencyModal() {
  const modal = document.getElementById('emergency-modal');
  const openBtn = document.getElementById('floating-emergency-btn');
  const closeBtnTop = document.getElementById('close-emergency-modal-btn');
  const closeBtnBottom = document.getElementById('close-emergency-modal-bottom');
  const tabBtns = document.querySelectorAll('.emergency-tab');
  const contents = document.querySelectorAll('.emergency-content');

  if (!modal || !openBtn) return;

  openBtn.addEventListener('click', () => {
    // Filled on open rather than at load, so a device that changes time zone
    // mid-session (a phone landing in another country) shows the new number.
    const numEl = document.getElementById('emergency-local-number');
    if (numEl && typeof geoEmergencyNumber === 'function') {
      numEl.textContent = geoEmergencyNumber();
    }
    modal.style.display = 'flex';
    document.body.classList.add('modal-open');
  });

  function closeModal() {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
  }

  if (closeBtnTop) closeBtnTop.addEventListener('click', closeModal);
  if (closeBtnBottom) closeBtnBottom.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.emergency;
      tabBtns.forEach(b => b.classList.remove('active'));
      contents.forEach(c => {
        c.classList.remove('active');
        c.style.display = 'none';
      });

      btn.classList.add('active');
      const targetContent = document.getElementById(`emergency-${targetTab}`);
      if (targetContent) {
        targetContent.classList.add('active');
        targetContent.style.display = 'block';
      }
    });
  });
}

/* No service worker: the tool runs inside an iframe on poliinternational.com and
   a SW scoped there would cache site assets outside this tool's control. The
   AI Studio sw.js is deliberately not shipped. */
function initServiceWorker() {}

/* Toast Notification Engine */
function showToast(msg) {
  const toast = document.getElementById('toast-notification');
  if (!toast) return;
  toast.innerHTML = `<span>${escHtml(msg)}</span>`;
  toast.style.display = 'flex';
  clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => {
    toast.style.display = 'none';
  }, 3400);
}

/* Deep Link / Share Intake Functionality */
function generateShareableDeepLink() {
  const checked = getSelectedMedIds();
  // The tool is served inside an iframe at /tools/<folder>/index.html; share the
  // public page, not the frame URL, or the recipient gets a bare iframe.
  const baseUrl = window.location.origin.indexOf('http') === 0
    ? window.location.origin + '/medication-interaction-checker/'
    : 'https://poliinternational.com/medication-interaction-checker/';
  if (checked.length === 0) return baseUrl;
  return baseUrl + '?meds=' + encodeURIComponent(checked.join(','));
}

function copyShareableDeepLink() {
  const link = generateShareableDeepLink();
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(link).then(() => {
      showToast('📲 Shareable intake deep link copied to clipboard!');
    }).catch(() => {
      fallbackCopyText(link);
      showToast('📲 Shareable intake deep link copied to clipboard!');
    });
  } else {
    fallbackCopyText(link);
    showToast('📲 Shareable intake deep link copied to clipboard!');
  }
}

function fallbackCopyText(text) {
  const temp = document.createElement('textarea');
  temp.value = text;
  document.body.appendChild(temp);
  temp.select();
  document.execCommand('copy');
  document.body.removeChild(temp);
}

function initDeepLinkFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  let medsParam = urlParams.get('meds');
  if (!medsParam && window.location.hash.includes('meds=')) {
    medsParam = window.location.hash.split('meds=')[1];
  }
  if (!medsParam) return;

  // Ids go straight into a querySelector below; anything with a quote or bracket
  // throws a SyntaxError and kills the rest of init. Only real id shapes pass.
  const medIds = medsParam
    .split(',')
    .map(s => s.trim().toLowerCase())
    .filter(s => /^[a-z0-9_-]+$/.test(s));
  if (medIds.length === 0) return;

  let loadedCount = 0;
  medIds.forEach(id => {
    const chk = document.querySelector(`input[data-med-id="${id}"]`);
    if (chk) {
      chk.checked = true;
      chk.closest('.med-item')?.classList.add('selected');
      loadedCount++;
    }
  });

  if (loadedCount > 0) {
    renderResults();
    updateBriefCount();
    showToast(`📲 Shared intake link loaded: ${loadedCount} medication${loadedCount > 1 ? 's' : ''} pre-selected.`);
  }
}

/* Reminders & Washout Countdown Engine */
function renderRemindersTab() {
  const container = document.getElementById('washout-cards-container');
  const inputEl = document.getElementById('appointment-datetime-input');
  if (!container) return;

  const savedAppt = localStorage.getItem('appointment_datetime');
  if (savedAppt && inputEl && !inputEl.value) {
    inputEl.value = savedAppt;
  }

  const checked = getSelectedMedIds();
  const apptDate = inputEl && inputEl.value ? new Date(inputEl.value) : null;

  if (checked.length === 0) {
    container.innerHTML = `
      <div class="empty-brief-notice">
        <p>⏰ No medications selected for washout calculation.</p>
        <p><a href="#" id="go-to-checker">Switch to the Interaction Checker</a> to select your medications and view specific pre-procedure discontinuation deadlines.</p>
      </div>`;
    return;
  }

  const washoutMeds = checked.map(id => medMap[id]).filter(m => {
    return m.wait || ['pain', 'blood', 'retinoid', 'substance', 'numbing', 'corticosteroid', 'immuno'].includes(m.cat);
  });

  if (washoutMeds.length === 0) {
    container.innerHTML = `
      <div class="empty-brief-notice" style="background:rgba(63, 185, 80, 0.08); border-color:#3fb950;">
        <p>✅ All selected items have standard procedural safety.</p>
        <p>Maintain routine daily dosing unless explicitly directed by your prescribing physician.</p>
      </div>`;
    return;
  }

  let html = '';
  washoutMeds.forEach(m => {
    let countdownStr = 'Set scheduled appointment date & time above to calculate live countdown';

    if (apptDate && !isNaN(apptDate.getTime())) {
      let waitHours = 24;
      const waitText = (m.wait || '').toLowerCase();
      if (waitText.includes('48 hours') || waitText.includes('48h')) waitHours = 48;
      else if (waitText.includes('24 hours') || waitText.includes('24h')) waitHours = 24;
      else if (waitText.includes('72 hours') || waitText.includes('72h')) waitHours = 72;
      else if (waitText.includes('7 days') || waitText.includes('1 week')) waitHours = 168;
      else if (waitText.includes('6 months')) waitHours = 4320;
      else if (waitText.includes('14 days') || waitText.includes('2 weeks')) waitHours = 336;

      const stopDeadline = new Date(apptDate.getTime() - waitHours * 60 * 60 * 1000);
      const now = new Date();
      const diffMs = stopDeadline.getTime() - now.getTime();

      if (diffMs <= 0) {
        countdownStr = '⚠️ STOP IMMEDIATELY (Discontinuation deadline passed or imminent)';
      } else {
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        
        const parts = [];
        if (days > 0) parts.push(`${days}d`);
        if (hours > 0 || days > 0) parts.push(`${hours}h`);
        parts.push(`${mins}m`);

        const formattedDeadline = stopDeadline.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        countdownStr = `⏱️ Stop Intake Deadline: <strong>${formattedDeadline}</strong> (${parts.join(' ')} remaining)`;
      }
    }

    const isHigh = m.sev === 'high';
    html += `
      <div class="washout-card ${isHigh ? 'high-risk-washout' : 'mod-risk-washout'}">
        <div class="washout-card-header">
          <div>
            <span class="washout-drug-title">${escHtml(m.name)}</span>
            <span class="washout-drug-sub">(${escHtml(m.sub)})</span>
          </div>
          <span class="washout-time-badge">${escHtml(m.wait || 'Pre-procedure Pause')}</span>
        </div>
        <div class="washout-desc">
          <strong>Recommended Guidance:</strong> ${escHtml(m.wait || 'Discuss pre-procedure discontinuation with artist/doctor.')}
        </div>
        <div class="washout-countdown-box">
          <span>${countdownStr}</span>
        </div>
        <div class="reminder-card-actions">
          <button class="reminder-action-btn" onclick="scheduleIndividualAlert('${escHtml(m.name)}')">🔔 Set 24h Alert</button>
          <button class="reminder-action-btn" onclick="exportMedIcsEvent('${escHtml(m.name)}', '${escHtml(m.wait || 'Discontinue medication prior to appointment')}')">📅 Add to Calendar (.ics)</button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function saveAppointmentDate() {
  const inputEl = document.getElementById('appointment-datetime-input');
  if (!inputEl || !inputEl.value) {
    alert('Please choose a valid appointment date and time.');
    return;
  }
  localStorage.setItem('appointment_datetime', inputEl.value);
  showToast('📅 Appointment date saved! Live washout countdowns calculated.');
  renderRemindersTab();
}

function enableBrowserNotifications() {
  if (!('Notification' in window)) {
    alert('Browser notifications are not supported in your browser.');
    return;
  }

  if (Notification.permission === 'granted') {
    showToast('🔔 Browser notifications active! Alerts will fire before your session.');
    new Notification('Poli Safety Reference', {
      body: 'Browser alerts active for your pre-procedure medication washout deadlines!',
      icon: '/favicon.ico'
    });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        showToast('🔔 Browser notifications enabled!');
        new Notification('Poli Safety Reference', {
          body: 'Notifications active! We will remind you when to stop taking specific medications.',
          icon: '/favicon.ico'
        });
      }
    });
  } else {
    alert('Browser notifications are currently blocked in your browser settings. Enable permissions in your browser URL bar.');
  }
}

function scheduleIndividualAlert(medName) {
  enableBrowserNotifications();
  showToast(`🔔 Notification reminder scheduled for ${medName}!`);
}

function exportMedIcsEvent(medName, waitText) {
  const inputEl = document.getElementById('appointment-datetime-input');
  if (!inputEl || !inputEl.value) {
    alert('Please select your scheduled appointment date and time first in the box above.');
    return;
  }

  const apptDate = new Date(inputEl.value);
  const title = `Stop Taking ${medName} - Tattoo/Piercing Pre-Procedure Washout`;
  const description = `Pre-procedure medication reminder: Pause taking ${medName} before your tattoo or piercing appointment. Guidance: ${waitText}`;

  const formatIcsDate = (d) => d.toISOString().replace(/-|:|\.\d+/g, '');
  const startIso = formatIcsDate(apptDate);

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Poli International//Medication Checker//EN',
    'BEGIN:VEVENT',
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `DTSTART:${startIso}`,
    `DTEND:${startIso}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT24H',
    'ACTION:DISPLAY',
    `DESCRIPTION:Reminder: Discontinue ${medName} prior to your scheduled session!`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Washout_Reminder_${medName.replace(/\s+/g, '_')}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast(`📅 Calendar event (.ics) for ${medName} exported!`);
}

function exportCalendarEvent() {
  const inputEl = document.getElementById('appointment-datetime-input');
  const checked = getSelectedMedIds();
  if (!inputEl || !inputEl.value) {
    alert('Please select your scheduled appointment date and time first!');
    return;
  }

  const apptDate = new Date(inputEl.value);
  const title = 'Tattoo / Piercing Session & Medication Washout Reminder';
  const medsListStr = checked.map(id => medMap[id].name).join(', ') || 'Disclosed medications';
  const description = `Appointment scheduled at studio. Selected medications: ${medsListStr}. Check your Poli Medication Checker brief for pre-procedure instructions!`;

  const formatIcsDate = (d) => d.toISOString().replace(/-|:|\.\d+/g, '');

  const startIso = formatIcsDate(apptDate);
  const endDate = new Date(apptDate.getTime() + 2 * 60 * 60 * 1000);
  const endIso = formatIcsDate(endDate);

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Poli International//Medication Checker//EN',
    'BEGIN:VEVENT',
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `DTSTART:${startIso}`,
    `DTEND:${endIso}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT24H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: 24 hours until tattoo/piercing session! Review medication washout state.',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Poli_Studio_Session_Calendar_Reminder.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast('📅 Full session calendar reminder (.ics) exported!');
}

/* Quick Print Functionality */
function triggerQuickPrint() {
  updateBriefTab();
  showToast('🖨️ Opening print dialog...');
  setTimeout(() => {
    window.print();
  }, 150);
}

/* Google Calendar .ics Export (Pre-filled Washout Deadlines) */
function exportGoogleCalendarIcs() {
  const inputEl = document.getElementById('appointment-datetime-input');
  const checked = getSelectedMedIds();
  
  if (!inputEl || !inputEl.value) {
    alert('Please select your scheduled appointment date and time first in the box above.');
    return;
  }
  if (checked.length === 0) {
    alert('No medications selected. Please select your medications in the Interaction Checker first.');
    return;
  }

  const apptDate = new Date(inputEl.value);
  const formatIcsDate = (d) => d.toISOString().replace(/-|:|\.\d+/g, '');
  const events = [];

  const washoutMeds = checked.map(id => medMap[id]).filter(m => Boolean(m));

  washoutMeds.forEach(m => {
    let waitHours = 24;
    const waitText = (m.wait || '').toLowerCase();
    if (waitText.includes('48 hours') || waitText.includes('48h')) waitHours = 48;
    else if (waitText.includes('24 hours') || waitText.includes('24h')) waitHours = 24;
    else if (waitText.includes('72 hours') || waitText.includes('72h')) waitHours = 72;
    else if (waitText.includes('7 days') || waitText.includes('1 week')) waitHours = 168;
    else if (waitText.includes('6 months')) waitHours = 4320;
    else if (waitText.includes('14 days') || waitText.includes('2 weeks')) waitHours = 336;

    const stopDeadline = new Date(apptDate.getTime() - waitHours * 60 * 60 * 1000);
    const stopIso = formatIcsDate(stopDeadline);

    const title = `STOP TAKING ${m.name.toUpperCase()} (Pre-Procedure Washout)`;
    const desc = `DISCONTINUATION DEADLINE: Stop taking ${m.name} (${m.sub}).\\nGuidance: ${m.wait || 'Pause prior to procedure.'}\\nScheduled Appointment: ${apptDate.toLocaleString()}`;

    events.push([
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${desc}`,
      `DTSTART:${stopIso}`,
      `DTEND:${stopIso}`,
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-PT12H',
      'ACTION:DISPLAY',
      `DESCRIPTION:Reminder: Pause ${m.name} now for your upcoming session!`,
      'END:VALARM',
      'END:VEVENT'
    ].join('\r\n'));
  });

  // Also add appointment event itself
  const apptStartIso = formatIcsDate(apptDate);
  const apptEndIso = formatIcsDate(new Date(apptDate.getTime() + 2 * 60 * 60 * 1000));
  const medsSummary = washoutMeds.map(m => `${m.name} (${m.wait || 'Standard Pause'})`).join('; ');

  events.push([
    'BEGIN:VEVENT',
    'SUMMARY:🎨 Tattoo / Piercing Studio Appointment',
    `DESCRIPTION:Scheduled appointment at studio.\\nDisclosed Medications & Washouts: ${medsSummary}`,
    `DTSTART:${apptStartIso}`,
    `DTEND:${apptEndIso}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT24H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Tomorrow is your tattoo/piercing appointment! Ensure all medication washouts were completed.',
    'END:VALARM',
    'END:VEVENT'
  ].join('\r\n'));

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Poli International//Google Calendar Washout Integration//EN',
    'X-WR-CALNAME:Medication Washout Deadlines (Google Calendar)',
    ...events,
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Google_Calendar_Washout_Deadlines.ics';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast('📅 Google Calendar .ics file pre-filled & downloaded!');
}

/* Direct Google Calendar Web Event Opener */
function openGoogleCalendarWeb() {
  const inputEl = document.getElementById('appointment-datetime-input');
  const checked = getSelectedMedIds();
  
  if (!inputEl || !inputEl.value) {
    alert('Please select your scheduled appointment date and time first in the box above.');
    return;
  }

  const apptDate = new Date(inputEl.value);
  const isoUtcFormat = (d) => d.toISOString().replace(/-|:|\.\d+/g, '');
  
  const startStr = isoUtcFormat(apptDate);
  const endStr = isoUtcFormat(new Date(apptDate.getTime() + 2 * 60 * 60 * 1000));

  const medsSummary = checked.map(id => {
    const m = medMap[id];
    return `• ${m.name} (${m.sub}): ${m.wait || 'Standard Pause'}`;
  }).join('\n') || 'None disclosed';

  const title = 'Tattoo / Piercing Session & Medication Washout Deadlines';
  const details = `PRE-PROCEDURE MEDICATION WASHOUT DEADLINES:\n\n${medsSummary}\n\nGenerated by Poli Medication Interaction Checker.`;

  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startStr}/${endStr}&details=${encodeURIComponent(details)}`;

  window.open(gcalUrl, '_blank');
  showToast('🌐 Opening Google Calendar with pre-filled washout details...');
}


/* Modal accessibility. Both overlays were mouse-only: no Escape, no focus move,
   so a keyboard user who opened the emergency guide was trapped behind it.
   Delegated + generic so any future .modal-overlay inherits the behaviour. */
(function () {
  var lastFocus = null;

  function openModals() {
    return Array.prototype.filter.call(
      document.querySelectorAll('.modal-overlay'),
      function (m) { return m.style.display && m.style.display !== 'none'; });
  }

  function closeModal(m) {
    m.style.display = 'none';
    document.body.classList.remove('modal-open');
    if (lastFocus && lastFocus.focus) { lastFocus.focus(); lastFocus = null; }
  }

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape' && e.key !== 'Esc') return;
    var open = openModals();
    if (open.length) { closeModal(open[open.length - 1]); }
  });

  // Click the backdrop (not the panel) to dismiss, the usual expectation.
  document.addEventListener('click', function (e) {
    if (e.target && e.target.classList
        && e.target.classList.contains('modal-overlay')) {
      closeModal(e.target);
    }
  });

  // Remember the opener and move focus into the dialog when one appears.
  document.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('button');
    if (!t) return;
    lastFocus = t;
    setTimeout(function () {
      var open = openModals();
      if (!open.length) return;
      var panel = open[open.length - 1];
      panel.setAttribute('tabindex', '-1');
      panel.focus();
    }, 30);
  });
})();

/* ── Supplements tab ──────────────────────────────────────────────────────────
 *
 * Data comes from js/supplement-stacking.js, generated by
 * scripts/build-supplement-stacking.js from SUPP.AI. It is a SNAPSHOT, not a
 * live call: a runtime dependency would break this page when supp.ai is down -
 * on something people read before a procedure - and would send a visitor's
 * supplement list to a third party.
 *
 * THE MOST IMPORTANT BRANCH IS THE ONE THAT FINDS NOTHING. A safety tool that
 * answers silence when it has no data is read as "you are fine". Every miss
 * says so explicitly instead.
 */
let suppQuery = '';

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function findSupplement(q) {
  const data = (typeof SUPPLEMENT_STACKING !== 'undefined' && SUPPLEMENT_STACKING) || [];
  const n = q.trim().toLowerCase();
  if (n.length < 2) return null;
  return data.find((s) => s.supplement.toLowerCase() === n)
      || data.find((s) => s.supplement.toLowerCase().includes(n))
      || null;
}

function renderSupplementResults() {
  const box = document.getElementById('supp-results');
  if (!box) return;
  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  if (!suppQuery.trim()) {
    box.innerHTML = '<p class="supp-empty">' + escapeHtml(dict.suppEmpty) + '</p>';
    return;
  }

  const hit = findSupplement(suppQuery);

  // Not in the library at all. This wording is deliberate and must not be
  // softened into something that reads like an all-clear.
  if (!hit) {
    box.innerHTML =
      '<div class="supp-card supp-unknown">'
      + '<h3>' + escapeHtml(dict.suppUnknownTitle) + ' "' + escapeHtml(suppQuery.trim()) + '"</h3>'
      + '<p>' + escapeHtml(dict.suppUnknownBody) + '</p>'
      + '</div>';
    return;
  }

  // Known supplement, but nothing published against the drugs we cover.
  if (!hit.interactions || !hit.interactions.length) {
    box.innerHTML =
      '<div class="supp-card supp-nopairs">'
      + '<h3>' + escapeHtml(hit.supplement) + '</h3>'
      + '<p>' + escapeHtml(dict.suppNoPairs) + '</p>'
      + '</div>';
    return;
  }

  box.innerHTML = hit.interactions.map((i) => {
    const clinical = i.papers.some((p) => p.clinical);
    const badge = clinical ? dict.suppClinical : dict.suppHuman;
    const papers = i.papers.map((p) =>
      '<li>' + escapeHtml(p.title) + ' (' + escapeHtml(p.year) + ')'
      + (p.pmid ? ' - <a href="https://pubmed.ncbi.nlm.nih.gov/' + encodeURIComponent(p.pmid)
                  + '/" target="_blank" rel="noopener noreferrer">PMID ' + escapeHtml(p.pmid) + '</a>' : '')
      + '</li>').join('');
    return '<div class="supp-card">'
      + '<h3>' + escapeHtml(hit.supplement) + ' + ' + escapeHtml(i.drug) + '</h3>'
      + '<span class="supp-badge">' + escapeHtml(badge) + '</span>'
      + '<p>' + escapeHtml(hit.supplement) + ' + ' + escapeHtml(i.drug) + ' '
      + escapeHtml(dict.suppStudied) + ' ' + i.paperCount + ' ' + escapeHtml(dict.suppStudies) + '</p>'
      + '<ul class="supp-papers">' + papers + '</ul>'
      + '<p class="supp-footer">' + escapeHtml(dict.suppCardFooter) + '</p>'
      + '</div>';
  }).join('');
}

(function initSupplementsTab() {
  const input = document.getElementById('supp-search');
  if (!input) return;
  let t = null;
  input.addEventListener('input', (e) => {
    suppQuery = e.target.value;
    clearTimeout(t);
    t = setTimeout(renderSupplementResults, 180);
  });
  renderSupplementResults();
})();
