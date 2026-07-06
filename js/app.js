'use strict';

function escHtml(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

const CATEGORIES = [
  {
    label: 'Blood thinners / Anticoagulants',
    meds: [
      { id:'warfarin',    name:'Warfarin',         sub:'Coumadin',            sev:'high', tattoo:'Significant bleeding during tattooing — prolonged oozing impairs ink setting. Colour saturation and linework clarity are affected. Some studios decline clients on therapeutic anticoagulation.', piercing:'Excessive bleeding during piercing and prolonged healing phase. Any haematoma at a new piercing site delays fistula formation significantly.', wait:'Discuss stopping or bridging with your prescribing physician — do not discontinue without medical guidance.' },
      { id:'apixaban',    name:'Apixaban / Rivaroxaban', sub:'Eliquis / Xarelto',   sev:'high', tattoo:'Same bleeding profile as warfarin. Direct oral anticoagulants have shorter half-lives but effects are still significant during procedures.', piercing:'Elevated bleeding and bruising at piercing site. Jewellery pressure on a haematoma increases rejection risk.', wait:'Half-life 8–12 hours — discuss a supervised pause with your physician. Do not pause without medical approval.' },
      { id:'aspirin',     name:'Aspirin (therapeutic dose)', sub:'75–300 mg daily', sev:'mod', tattoo:'Low-dose aspirin increases procedural bleeding and slight bruising. Does not typically prevent tattooing but artist should be informed.', piercing:'Increased bruising and minor bleeding. Not usually a contraindication at low doses.', wait:'Aspirin irreversibly inhibits platelets — effects last 7–10 days after last dose. Discuss temporary pause with your GP if appropriate.' },
      { id:'clopidogrel', name:'Clopidogrel',       sub:'Plavix',              sev:'high', tattoo:'Significant platelet inhibition — similar bleeding profile to aspirin but often combined with other anticoagulants. Most studios will request medical clearance.', piercing:'Significant bleeding risk. Haematoma formation at piercing site is a real concern.', wait:'Do not stop clopidogrel without cardiologist approval — prescribed for cardiac protection. Discuss risk/benefit of any procedure with your physician.' },
    ],
  },
  {
    label: 'Retinoids (Acne / Anti-ageing)',
    meds: [
      { id:'isotretinoin', name:'Isotretinoin',     sub:'Accutane / Roaccutane', sev:'high', tattoo:'Isotretinoin dramatically alters skin cell turnover and sebum production. Tattooing during treatment causes unpredictable ink distribution, poor saturation, and markedly impaired healing. This is one of the clearest contraindications in professional tattooing.', piercing:'Skin is fragile and slow to heal. Fistula formation is severely impaired. New piercings on isotretinoin are strongly inadvisable.', wait:'Standard guidance: wait 6–12 months after completing isotretinoin before tattooing or getting new piercings. Discuss the minimum safe interval with your dermatologist.' },
      { id:'tretinoin',    name:'Tretinoin (topical)', sub:'Retin-A / Retinova', sev:'mod', tattoo:'Topical retinoids at the tattoo site thin the skin and increase sensitivity. Remove from tattoo area at least 2–4 weeks before the session. Systemic absorption from topical use is minimal.', piercing:'Avoid applying topical retinoids to or near a new piercing site during healing. No systemic contraindication.', wait:'Discontinue topical tretinoin at the specific site 2–4 weeks pre-tattoo. No washout needed for piercing unless the product is applied near the site.' },
    ],
  },
  {
    label: 'Corticosteroids',
    meds: [
      { id:'prednisone',   name:'Oral corticosteroids', sub:'Prednisone / prednisolone', sev:'mod', tattoo:'Systemic steroids suppress the immune response needed for tattoo healing. Increased infection risk and altered inflammatory healing phase. Colour vibrancy may be reduced.', piercing:'Immunosuppression significantly increases infection risk during piercing healing. Fistula formation may be delayed. Not recommended for elective piercings during steroid courses.', wait:'Short courses (under 2 weeks): usually safe to wait until course ends. Long-term steroid therapy: discuss risk with prescribing physician — not a simple contraindication but warrants care.' },
      { id:'inhaled',      name:'Inhaled / topical steroids', sub:'Fluticasone / betamethasone', sev:'low', tattoo:'Inhaled steroids have minimal systemic absorption and do not significantly affect tattooing. Topical steroids at the tattoo site should be discontinued 2 weeks before.', piercing:'Standard risk unless topical steroid is being applied to or near the piercing site.', wait:'No washout required for inhaled steroids. Discontinue topical steroids at the specific site 2 weeks before a piercing in that area.' },
    ],
  },
  {
    label: 'Immunosuppressants',
    meds: [
      { id:'methotrexate', name:'Methotrexate',     sub:'Rheumatrix / Maxtrex', sev:'high', tattoo:'Significant immune suppression means tattoo healing is unpredictable — increased infection risk, impaired inflammatory phase, and potential for opportunistic infection. Most artists require medical clearance.', piercing:'High infection risk with immunosuppression. Elective piercings during methotrexate therapy are strongly inadvisable without physician approval.', wait:'Discuss with your rheumatologist or oncologist before any procedure. Do not interrupt methotrexate for an elective procedure without guidance.' },
      { id:'biologics',    name:'Biologics',        sub:'Adalimumab, etanercept, infliximab', sev:'high', tattoo:'TNF inhibitors and similar biologics significantly impair the immune response to skin injury. Infection risk is substantially elevated. Medical clearance from prescribing physician is required.', piercing:'Elective piercings on biologic therapy carry substantial infection risk. Discuss risk/benefit carefully with your specialist.', wait:'Do not interrupt biologic therapy for an elective procedure. Timing relative to injection/infusion schedule may reduce peak immunosuppression — discuss with specialist.' },
      { id:'ciclosporin',  name:'Ciclosporin / Tacrolimus', sub:'Neoral / Prograf', sev:'high', tattoo:'Calcineurin inhibitors — used in transplant medicine and severe inflammatory conditions. High infection and poor healing risk during tattooing.', piercing:'High infection risk. Not recommended for elective piercings during therapy.', wait:'Discuss with transplant team or prescribing specialist before any skin-breaking procedure.' },
    ],
  },
  {
    label: 'Antibiotics',
    meds: [
      { id:'tetracyclines', name:'Tetracyclines',   sub:'Doxycycline / minocycline', sev:'mod', tattoo:'Tetracyclines cause photosensitivity — UV exposure on new tattoos during treatment can cause unexpected reactions. Also rarely associated with skin hyperpigmentation which may interact with tattoo ink.', piercing:'No direct piercing healing interaction. Minocycline causes blue-grey skin discolouration in some patients which may affect piercing site appearance.', wait:'No procedural wait required, but inform your artist. Avoid UV exposure on tattooed areas during tetracycline treatment.' },
      { id:'fluoroquinolones', name:'Fluoroquinolones', sub:'Ciprofloxacin / levofloxacin', sev:'low', tattoo:'No direct tattooing interaction. Course usually short-term.', piercing:'No specific interaction. Completing a course of antibiotics before a new piercing reduces infection risk.', wait:'No washout needed — short course antibiotics do not affect healing. Completing a course before a new piercing is sensible.' },
    ],
  },
  {
    label: 'SSRIs / SNRIs',
    meds: [
      { id:'ssri',         name:'SSRIs / SNRIs',    sub:'Fluoxetine, sertraline, venlafaxine', sev:'low', tattoo:'Mild antiplatelet effect reported with some SSRIs — may cause slightly increased bruising or minor bleeding during tattooing. Effect is generally small but worth informing your artist.', piercing:'Minor effect on platelet aggregation. No significant piercing contraindication.', wait:'No procedural wait required. Inform your artist if on SSRI therapy — slightly increased bruising is possible.' },
    ],
  },
  {
    label: 'Other medications',
    meds: [
      { id:'lithium',      name:'Lithium',          sub:'Priadel / Liskonum',  sev:'mod', tattoo:'Lithium affects wound healing at the cellular level and can impair keratinocyte migration. Healing may be slightly delayed. Ensure full hydration — lithium patients must remain well-hydrated during long sessions.', piercing:'Delayed fistula formation possible. No strong contraindication but monitor healing carefully.', wait:'No washout required. Ensure stable lithium levels and inform your artist of your medication.' },
      { id:'immunotherapy', name:'Cancer immunotherapy', sub:'Checkpoint inhibitors (PD-1, PD-L1)', sev:'high', tattoo:'Checkpoint inhibitors cause unusual immune activation — tattooing during treatment has been associated with rare but severe dermatological reactions. Medical oncology input is essential before any procedure.', piercing:'High risk of atypical inflammatory response. Not recommended without oncologist approval.', wait:'Discuss with your oncologist before any skin-breaking procedure. This is a high-risk combination requiring specialist input.' },
      { id:'diabetes_insulin', name:'Insulin / Diabetes medications', sub:'Type 1 or Type 2 diabetes', sev:'mod', tattoo:'Diabetes impairs skin healing — poorer immune response, increased infection risk, and slower wound closure. Well-controlled diabetes is lower risk than poorly controlled. Blood glucose should be stable on the day of tattooing.', piercing:'Elevated infection risk and slower fistula formation in poorly controlled diabetes. Well-controlled diabetes is not a contraindication with careful aftercare.', wait:'No washout required. Ensure blood glucose is well-controlled before and during healing. Inform your artist/piercer of your condition.' },
    ],
  },
];

const medListEl = document.getElementById('med-list');
const resultEl  = document.getElementById('result');

// Build checkbox list
CATEGORIES.forEach(cat => {
  const block = document.createElement('div');
  block.className = 'med-category';
  const itemsHtml = cat.meds.map(m => `
    <label class="med-item">
      <input type="checkbox" value="${escHtml(m.id)}" data-med-id="${escHtml(m.id)}">
      <span class="med-item-label">${escHtml(m.name)} <small>${escHtml(m.sub)}</small></span>
    </label>`).join('');
  block.innerHTML = `
    <div class="med-category-title">${escHtml(cat.label)}</div>
    <div class="med-items">${itemsHtml}</div>`;
  medListEl.appendChild(block);
});

// Build lookup map
const medMap = {};
CATEGORIES.forEach(cat => cat.meds.forEach(m => { medMap[m.id] = m; }));

medListEl.addEventListener('change', renderResults);

function renderResults() {
  const checked = Array.from(document.querySelectorAll('input[data-med-id]:checked')).map(el => el.dataset.medId);
  if (checked.length === 0) { resultEl.innerHTML = ''; return; }

  const sevOrder = { high: 0, mod: 1, low: 2 };
  const sorted = [...checked].sort((a, b) => sevOrder[medMap[a].sev] - sevOrder[medMap[b].sev]);

  const highCount = sorted.filter(id => medMap[id].sev === 'high').length;
  const modCount  = sorted.filter(id => medMap[id].sev === 'mod').length;

  let summaryColor = 'var(--sev-low)';
  if (highCount > 0) summaryColor = 'var(--sev-high)';
  else if (modCount > 0) summaryColor = 'var(--sev-mod)';

  const cardsHtml = sorted.map(id => {
    const m = medMap[id];
    const sevLabel = m.sev === 'high' ? 'High concern' : m.sev === 'mod' ? 'Moderate concern' : 'Low concern';
    return `
      <div class="interaction-card">
        <div class="interaction-head">
          <span class="interaction-name">${escHtml(m.name)} <small style="font-weight:400;font-size:0.8rem;color:var(--text-muted)">${escHtml(m.sub)}</small></span>
          <span class="sev-badge ${escHtml(m.sev)}">${escHtml(sevLabel)}</span>
        </div>
        <div class="interaction-body">
          <div class="effect-row">
            <span class="effect-type">Tattoo</span>
            <span class="effect-text">${escHtml(m.tattoo)}</span>
          </div>
          <div class="effect-row">
            <span class="effect-type">Piercing</span>
            <span class="effect-text">${escHtml(m.piercing)}</span>
          </div>
          ${m.wait ? `<div class="wait-note">⏱ ${escHtml(m.wait)}</div>` : ''}
        </div>
      </div>`;
  }).join('');

  resultEl.innerHTML = `
    <div class="result-header-box">
      <span class="result-count"><strong>${checked.length}</strong> medication${checked.length !== 1 ? 's' : ''} selected — ${highCount > 0 ? `<strong style="color:var(--sev-high)">${highCount} high concern</strong>` : modCount > 0 ? `<strong style="color:var(--sev-mod)">${modCount} moderate concern</strong>` : '<strong style="color:var(--sev-low)">low concern overall</strong>'}</span>
      <button class="clear-btn" id="clear-btn">Clear all</button>
    </div>
    ${cardsHtml}`;

  document.getElementById('clear-btn').addEventListener('click', () => {
    document.querySelectorAll('input[data-med-id]:checked').forEach(el => { el.checked = false; });
    resultEl.innerHTML = '';
  });
}
