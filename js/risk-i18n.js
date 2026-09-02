/**
 * Translated risk-badge labels and their explanations.
 *
 * HAND-AUTHORED, NOT GENERATED. Same rule as med-content-i18n.js: this is
 * clinical copy and no script writes the prose. A script created the scaffold
 * and filled the English from the existing RISK_EXPLANATIONS; everything else
 * is for a person.
 *
 * HOW TO FILL IT IN
 * For each entry, write two things per language:
 *   label   - the short badge text a reader sees, e.g. "Bleeding Risk"
 *   explain - the tooltip sentence explaining the mechanism
 * Leave a value as '' and that language falls back to the English, visibly.
 *
 * THE TOP-LEVEL KEY IS NOT LANGUAGE. It is the English badge string with its
 * emoji stripped, and it is also the lookup key used by the medication data.
 * Never translate it, never re-order it, never add an accent to it: the badge
 * would stop resolving for every reader.
 *
 * 36 badges. 30 already have an English explanation.
 */
const RISK_I18N = {
  "Bleeding Risk": {
    en: { label: "Bleeding Risk", explain: "NSAIDs and blood thinners inhibit platelet aggregation (clotting factors) or thin blood, preventing rapid scab formation during skin perforation." },
    fr: { label: "Risque de saignement", explain: "Les AINS et les anticoagulants inhibent l'agrégation plaquettaire (facteurs de coagulation) ou fluidifient le sang, ce qui empêche la formation rapide d'une croûte lors de la perforation de la peau." },
    it: { label: "Rischio di sanguinamento", explain: '' },
    es: { label: "Riesgo de sangrado", explain: '' },
    de: { label: "Blutungsrisiko", explain: '' },
    nl: { label: "Bloedingsrisico", explain: '' },
    pt: { label: "Risco de hemorragia", explain: '' }
  },
  "Bradycardia": {
    en: { label: "Bradycardia", explain: "Beta-blockers slow heart rate, preventing normal cardiac response to pain and triggering dizziness." },
    fr: { label: "Bradycardie", explain: "Les bêtabloquants ralentissent le rythme cardiaque, ce qui empêche la réponse cardiaque normale à la douleur et provoque des vertiges." },
    it: { label: "Bradicardia", explain: '' },
    es: { label: "Bradicardia", explain: '' },
    de: { label: "Bradykardie", explain: '' },
    nl: { label: "Bradycardie", explain: '' },
    pt: { label: "Bradicardia", explain: '' }
  },
  "Cardiac Stress": {
    en: { label: "Cardiac Stress", explain: "" },
    fr: { label: "Stress cardiaque", explain: '' },
    it: { label: "Stress cardiaco", explain: '' },
    es: { label: "Estrés cardíaco", explain: '' },
    de: { label: "Belastung des Herzens", explain: '' },
    nl: { label: "Belasting van het hart", explain: '' },
    pt: { label: "Stress cardíaco", explain: '' }
  },
  "Dehydration Sensitivity": {
    en: { label: "Dehydration Sensitivity", explain: "Diuretic effects increase fluid loss, requiring double the normal water intake to prevent blood pressure drops." },
    fr: { label: "Sensibilité à la déshydratation", explain: "L'effet diurétique augmente les pertes hydriques et impose de boire deux fois plus d'eau que d'habitude pour éviter une chute de tension." },
    it: { label: "Sensibilità alla disidratazione", explain: '' },
    es: { label: "Sensibilidad a la deshidratación", explain: '' },
    de: { label: "Empfindlich gegenüber Austrocknung", explain: '' },
    nl: { label: "Gevoelig voor uitdroging", explain: '' },
    pt: { label: "Sensibilidade à desidratação", explain: '' }
  },
  "Delayed Healing": {
    en: { label: "Delayed Healing", explain: "Anticoagulants and steroids slow down fibrin formation and cell proliferation required for wound closure." },
    fr: { label: "Cicatrisation retardée", explain: "Les anticoagulants et les corticoïdes ralentissent la formation de fibrine et la prolifération cellulaire nécessaires à la fermeture de la plaie." },
    it: { label: "Guarigione ritardata", explain: '' },
    es: { label: "Cicatrización retardada", explain: '' },
    de: { label: "Verzögerte Heilung", explain: '' },
    nl: { label: "Vertraagde genezing", explain: '' },
    pt: { label: "Cicatrização retardada", explain: '' }
  },
  "Drowsiness": {
    en: { label: "Drowsiness", explain: "Antihistamines cause central sedation, making you sleepy during long procedures." },
    fr: { label: "Somnolence", explain: "Les antihistaminiques provoquent une sédation centrale qui donne envie de dormir pendant les longues séances." },
    it: { label: "Sonnolenza", explain: '' },
    es: { label: "Somnolencia", explain: '' },
    de: { label: "Schläfrigkeit", explain: '' },
    nl: { label: "Slaperigheid", explain: '' },
    pt: { label: "Sonolência", explain: '' }
  },
  "Fainting Risk": {
    en: { label: "Fainting Risk", explain: "Vasovagal syncope occurs when pain, stress, or medications trigger a sudden reflex drop in heart rate and blood pressure." },
    fr: { label: "Risque de malaise", explain: "La syncope vasovagale survient lorsque la douleur, le stress ou un médicament déclenchent une chute réflexe et brutale du rythme cardiaque et de la tension artérielle." },
    it: { label: "Rischio di svenimento", explain: '' },
    es: { label: "Riesgo de desmayo", explain: '' },
    de: { label: "Ohnmachtsrisiko", explain: '' },
    nl: { label: "Risico op flauwvallen", explain: '' },
    pt: { label: "Risco de desmaio", explain: '' }
  },
  "Fragile Skin": {
    en: { label: "Fragile Skin", explain: "Dermal layers are thinned, making skin easily torn by friction or adhesive bandage removal." },
    fr: { label: "Peau fragile", explain: "Les couches du derme sont amincies : la peau se déchire facilement sous l'effet des frottements ou du retrait d'un pansement adhésif." },
    it: { label: "Pelle fragile", explain: '' },
    es: { label: "Piel frágil", explain: '' },
    de: { label: "Empfindliche Haut", explain: '' },
    nl: { label: "Kwetsbare huid", explain: '' },
    pt: { label: "Pele frágil", explain: '' }
  },
  "Healing Delay": {
    en: { label: "Healing Delay", explain: "Impaired skin cell turnover delays epithelialization of fresh tattoo ink or piercing fistula walls." },
    fr: { label: "Retard de cicatrisation", explain: "Le renouvellement cellulaire de la peau étant ralenti, l'épithélialisation d'un tatouage frais ou des parois du canal d'un piercing prend plus de temps." },
    it: { label: "Ritardo di guarigione", explain: '' },
    es: { label: "Retraso en la cicatrización", explain: '' },
    de: { label: "Heilungsverzögerung", explain: '' },
    nl: { label: "Genezingsvertraging", explain: '' },
    pt: { label: "Atraso na cicatrização", explain: '' }
  },
  "Heart Rate Increase": {
    en: { label: "Heart Rate Increase", explain: "Stimulants raise baseline heart rate and sympathetic arousal, increasing jitteriness and pain sensitivity." },
    fr: { label: "Accélération du rythme cardiaque", explain: "Les stimulants augmentent le rythme cardiaque de base et l'activation sympathique, ce qui accroît la nervosité et la sensibilité à la douleur." },
    it: { label: "Aumento della frequenza cardiaca", explain: '' },
    es: { label: "Aumento de la frecuencia cardíaca", explain: '' },
    de: { label: "Erhöhte Herzfrequenz", explain: '' },
    nl: { label: "Verhoogde hartslag", explain: '' },
    pt: { label: "Aumento da frequência cardíaca", explain: '' }
  },
  "Heightened Sensitivity": {
    en: { label: "Heightened Sensitivity", explain: "" },
    fr: { label: "Sensibilité accrue", explain: '' },
    it: { label: "Sensibilità accentuata", explain: '' },
    es: { label: "Sensibilidad aumentada", explain: '' },
    de: { label: "Erhöhte Empfindlichkeit", explain: '' },
    nl: { label: "Verhoogde gevoeligheid", explain: '' },
    pt: { label: "Sensibilidade acrescida", explain: '' }
  },
  "High Bleeding Risk": {
    en: { label: "High Bleeding Risk", explain: "Strong anticoagulants severely inhibit clotting cascades, causing steady arterial or capillary bleeding during skin puncture." },
    fr: { label: "Risque de saignement élevé", explain: "Les anticoagulants puissants inhibent fortement la cascade de coagulation et provoquent un saignement artériel ou capillaire continu lors de la perforation de la peau." },
    it: { label: "Rischio di sanguinamento elevato", explain: '' },
    es: { label: "Riesgo de sangrado alto", explain: '' },
    de: { label: "Hohes Blutungsrisiko", explain: '' },
    nl: { label: "Hoog bloedingsrisico", explain: '' },
    pt: { label: "Risco de hemorragia elevado", explain: '' }
  },
  "High Infection Risk": {
    en: { label: "High Infection Risk", explain: "Immunosuppressive medications significantly impair bacterial defense, making sterile aftercare critical." },
    fr: { label: "Risque d'infection élevé", explain: "Les immunosuppresseurs réduisent nettement les défenses contre les bactéries : des soins parfaitement stériles deviennent indispensables." },
    it: { label: "Rischio di infezione elevato", explain: '' },
    es: { label: "Riesgo de infección alto", explain: '' },
    de: { label: "Hohes Infektionsrisiko", explain: '' },
    nl: { label: "Hoog infectierisico", explain: '' },
    pt: { label: "Risco de infeção elevado", explain: '' }
  },
  "Hypoglycemia Risk": {
    en: { label: "Hypoglycemia Risk", explain: "GLP-1 drugs delay stomach emptying and drop blood glucose, causing sudden nausea or weakness if sugar levels drop." },
    fr: { label: "Risque d'hypoglycémie", explain: "Les analogues du GLP-1 ralentissent la vidange gastrique et font baisser la glycémie, ce qui peut provoquer des nausées ou une faiblesse soudaines si le taux de sucre chute." },
    it: { label: "Rischio di ipoglicemia", explain: '' },
    es: { label: "Riesgo de hipoglucemia", explain: '' },
    de: { label: "Risiko einer Unterzuckerung", explain: '' },
    nl: { label: "Risico op lage bloedsuiker", explain: '' },
    pt: { label: "Risco de hipoglicemia", explain: '' }
  },
  "Infection Risk": {
    en: { label: "Infection Risk", explain: "Suppressed immune response reduces white blood cell activity, increasing vulnerability to bacterial skin infection." },
    fr: { label: "Risque d'infection", explain: "Une réponse immunitaire diminuée réduit l'activité des globules blancs et augmente la vulnérabilité aux infections cutanées bactériennes." },
    it: { label: "Rischio di infezione", explain: '' },
    es: { label: "Riesgo de infección", explain: '' },
    de: { label: "Infektionsrisiko", explain: '' },
    nl: { label: "Infectierisico", explain: '' },
    pt: { label: "Risco de infeção", explain: '' }
  },
  "Ink Staining Risk": {
    en: { label: "Ink Staining Risk", explain: "" },
    fr: { label: "Risque de coloration de l'encre", explain: '' },
    it: { label: "Rischio di alterazione dell'inchiostro", explain: '' },
    es: { label: "Riesgo de alteración de la tinta", explain: '' },
    de: { label: "Risiko einer Farbveränderung", explain: '' },
    nl: { label: "Risico op inktverkleuring", explain: '' },
    pt: { label: "Risco de alteração da tinta", explain: '' }
  },
  "Low Blood Pressure": {
    en: { label: "Low Blood Pressure", explain: "Sedatives and anti-anxiety drugs lower vascular tone, increasing fainting risk upon standing or pain stimulation." },
    fr: { label: "Tension artérielle basse", explain: "Les sédatifs et les anxiolytiques abaissent le tonus vasculaire, ce qui augmente le risque de malaise au lever ou sous l'effet de la douleur." },
    it: { label: "Pressione arteriosa bassa", explain: '' },
    es: { label: "Tensión arterial baja", explain: '' },
    de: { label: "Niedriger Blutdruck", explain: '' },
    nl: { label: "Lage bloeddruk", explain: '' },
    pt: { label: "Tensão arterial baixa", explain: '' }
  },
  "Mild Bleeding Risk": {
    en: { label: "Mild Bleeding Risk", explain: "Slight decrease in platelet stickiness or minor blood thinning leading to mild extra oozing." },
    fr: { label: "Risque de saignement léger", explain: "Légère diminution de l'adhésivité des plaquettes ou fluidification modérée du sang, à l'origine d'un suintement un peu plus abondant." },
    it: { label: "Rischio di sanguinamento lieve", explain: '' },
    es: { label: "Riesgo de sangrado leve", explain: '' },
    de: { label: "Leichtes Blutungsrisiko", explain: '' },
    nl: { label: "Licht bloedingsrisico", explain: '' },
    pt: { label: "Risco de hemorragia ligeiro", explain: '' }
  },
  "Minor Pigmentation Risk": {
    en: { label: "Minor Pigmentation Risk", explain: "Hormonal fluctuations sensitize melanocytes, increasing melasma risk when exposed to sun during healing." },
    fr: { label: "Risque de pigmentation mineur", explain: "Les variations hormonales sensibilisent les mélanocytes et augmentent le risque de mélasma en cas d'exposition au soleil pendant la cicatrisation." },
    it: { label: "Rischio di pigmentazione lieve", explain: '' },
    es: { label: "Riesgo de pigmentación leve", explain: '' },
    de: { label: "Geringes Pigmentierungsrisiko", explain: '' },
    nl: { label: "Licht pigmentatierisico", explain: '' },
    pt: { label: "Risco de pigmentação ligeiro", explain: '' }
  },
  "No Extra Bleeding": {
    en: { label: "No Extra Bleeding", explain: "Does not affect blood clotting or vascular constriction." },
    fr: { label: "Pas de saignement supplémentaire", explain: "N'a aucun effet sur la coagulation du sang ni sur la constriction des vaisseaux." },
    it: { label: "Nessun sanguinamento aggiuntivo", explain: '' },
    es: { label: "Sin sangrado adicional", explain: '' },
    de: { label: "Keine zusätzliche Blutung", explain: '' },
    nl: { label: "Geen extra bloeding", explain: '' },
    pt: { label: "Sem hemorragia adicional", explain: '' }
  },
  "Outbreak Prevention": {
    en: { label: "Outbreak Prevention", explain: "Lip trauma triggers dormant HSV-1 herpes cold sores; prophylactic antivirals suppress viral replication." },
    fr: { label: "Prévention des poussées", explain: "Un traumatisme de la lèvre réveille le virus HSV-1 responsable de l'herpès labial ; un antiviral pris en prévention bloque la réplication virale." },
    it: { label: "Prevenzione delle recidive", explain: '' },
    es: { label: "Prevención de brotes", explain: '' },
    de: { label: "Vorbeugung eines Ausbruchs", explain: '' },
    nl: { label: "Preventie van een uitbraak", explain: '' },
    pt: { label: "Prevenção de surtos", explain: '' }
  },
  "Photosensitivity": {
    en: { label: "Photosensitivity", explain: "Certain drugs make skin cells absorb UV rays rapidly, causing severe sunburn-like allergic reactions on fresh tattoos." },
    fr: { label: "Photosensibilité", explain: "Certains médicaments font absorber les rayons UV très rapidement par les cellules de la peau, ce qui provoque sur un tatouage frais des réactions allergiques proches d'un coup de soleil sévère." },
    it: { label: "Fotosensibilità", explain: '' },
    es: { label: "Fotosensibilidad", explain: '' },
    de: { label: "Lichtempfindlichkeit", explain: '' },
    nl: { label: "Lichtgevoeligheid", explain: '' },
    pt: { label: "Fotossensibilidade", explain: '' }
  },
  "Plasma Oozing": {
    en: { label: "Plasma Oozing", explain: "When blood clotting is delayed, blood vessel walls leak clear plasma onto skin, diluting tattoo ink and pushing pigment out of dermal layers." },
    fr: { label: "Suintement de plasma", explain: "Quand la coagulation est retardée, la paroi des vaisseaux laisse suinter un plasma clair à la surface de la peau, qui dilue l'encre et repousse le pigment hors du derme." },
    it: { label: "Essudazione di plasma", explain: '' },
    es: { label: "Exudación de plasma", explain: '' },
    de: { label: "Austritt von Wundwasser", explain: '' },
    nl: { label: "Lekkend wondvocht", explain: '' },
    pt: { label: "Exsudação de plasma", explain: '' }
  },
  "Rebound Bleeding": {
    en: { label: "Rebound Bleeding", explain: "Epinephrine temporarily shrinks blood vessels. When it wears off, blood vessels dilate rapidly (rebound hyperemia), producing heavy bleeding." },
    fr: { label: "Saignement de rebond", explain: "L'adrénaline resserre temporairement les vaisseaux. Lorsque son effet se dissipe, ils se dilatent brutalement (hyperémie de rebond) et le saignement devient abondant." },
    it: { label: "Sanguinamento di rimbalzo", explain: '' },
    es: { label: "Sangrado de rebote", explain: '' },
    de: { label: "Rebound-Blutung", explain: '' },
    nl: { label: "Rebound-bloeding", explain: '' },
    pt: { label: "Hemorragia de rebound", explain: '' }
  },
  "Rebound Shock": {
    en: { label: "Rebound Shock", explain: "When topical numbing wears off mid-session, pain receptors suddenly flood the brain without gradual adaptation, causing intense pain shock." },
    fr: { label: "Choc de rebond", explain: "Lorsque l'anesthésiant local cesse d'agir en pleine séance, les récepteurs de la douleur submergent le cerveau d'un coup, sans adaptation progressive, ce qui provoque un choc douloureux intense." },
    it: { label: "Shock di rimbalzo", explain: '' },
    es: { label: "Choque de rebote", explain: '' },
    de: { label: "Rebound-Schock", explain: '' },
    nl: { label: "Rebound-schok", explain: '' },
    pt: { label: "Choque de rebound", explain: '' }
  },
  "Safe Analgesic": {
    en: { label: "Safe Analgesic", explain: "Acetaminophen/Paracetamol works on central nervous system pain receptors without inhibiting platelet aggregation." },
    fr: { label: "Antalgique sans risque", explain: "Le paracétamol (acétaminophène) agit sur les récepteurs de la douleur du système nerveux central sans inhiber l'agrégation plaquettaire." },
    it: { label: "Analgesico sicuro", explain: '' },
    es: { label: "Analgésico seguro", explain: '' },
    de: { label: "Unbedenkliches Schmerzmittel", explain: '' },
    nl: { label: "Veilige pijnstiller", explain: '' },
    pt: { label: "Analgésico seguro", explain: '' }
  },
  "Sedation Risk": {
    en: { label: "Sedation Risk", explain: "Central nervous system depressants reduce alertness, lowering blood pressure and raising risk of lightheadedness or nausea." },
    fr: { label: "Risque de sédation", explain: "Les dépresseurs du système nerveux central diminuent la vigilance, font baisser la tension artérielle et augmentent le risque d'étourdissement ou de nausée." },
    it: { label: "Rischio di sedazione", explain: '' },
    es: { label: "Riesgo de sedación", explain: '' },
    de: { label: "Sedierungsrisiko", explain: '' },
    nl: { label: "Risico op sufheid", explain: '' },
    pt: { label: "Risco de sedação", explain: '' }
  },
  "Severe Dehydration": {
    en: { label: "Severe Dehydration", explain: "" },
    fr: { label: "Déshydratation sévère", explain: '' },
    it: { label: "Disidratazione grave", explain: '' },
    es: { label: "Deshidratación grave", explain: '' },
    de: { label: "Starke Austrocknung", explain: '' },
    nl: { label: "Ernstige uitdroging", explain: '' },
    pt: { label: "Desidratação grave", explain: '' }
  },
  "Severe Scarring": {
    en: { label: "Severe Scarring", explain: "Isotretinoin (Accutane) suppresses sebum and alters skin cell regeneration, causing fragile skin to form keloid or hypertrophic scars." },
    fr: { label: "Cicatrices importantes", explain: "L'isotrétinoïne (Accutane) supprime le sébum et modifie la régénération cellulaire : la peau, fragilisée, forme des cicatrices chéloïdes ou hypertrophiques." },
    it: { label: "Cicatrici gravi", explain: '' },
    es: { label: "Cicatrices graves", explain: '' },
    de: { label: "Starke Narbenbildung", explain: '' },
    nl: { label: "Ernstige littekenvorming", explain: '' },
    pt: { label: "Cicatrizes graves", explain: '' }
  },
  "Severe Vasoconstriction": {
    en: { label: "Severe Vasoconstriction", explain: "" },
    fr: { label: "Vasoconstriction sévère", explain: '' },
    it: { label: "Vasocostrizione grave", explain: '' },
    es: { label: "Vasoconstricción grave", explain: '' },
    de: { label: "Starke Gefäßverengung", explain: '' },
    nl: { label: "Sterke vaatvernauwing", explain: '' },
    pt: { label: "Vasoconstrição grave", explain: '' }
  },
  "Skin Fragility at Site": {
    en: { label: "Skin Fragility at Site", explain: "Topical corticosteroids thin local dermal collagen fibers." },
    fr: { label: "Fragilité cutanée sur la zone", explain: "Les corticoïdes locaux amincissent les fibres de collagène du derme à l'endroit où ils sont appliqués." },
    it: { label: "Fragilità cutanea nella zona", explain: '' },
    es: { label: "Fragilidad cutánea en la zona", explain: '' },
    de: { label: "Empfindliche Haut an der Stelle", explain: '' },
    nl: { label: "Kwetsbare huid op de plek", explain: '' },
    pt: { label: "Fragilidade cutânea na zona", explain: '' }
  },
  "Skin Sensitivity": {
    en: { label: "Skin Sensitivity", explain: "Accelerated exfoliation makes skin hyper-reactive to needle friction and aftercare products." },
    fr: { label: "Sensibilité cutanée", explain: "Une exfoliation accélérée rend la peau hyperréactive au frottement de l'aiguille et aux produits de soin." },
    it: { label: "Sensibilità cutanea", explain: '' },
    es: { label: "Sensibilidad cutánea", explain: '' },
    de: { label: "Hautempfindlichkeit", explain: '' },
    nl: { label: "Huidgevoeligheid", explain: '' },
    pt: { label: "Sensibilidade cutânea", explain: '' }
  },
  "Skin Texture Alteration": {
    en: { label: "Skin Texture Alteration", explain: "Topical anesthetics cause localized edema (fluid swelling in skin cells), making skin rubbery and harder for needles to deposit ink evenly." },
    fr: { label: "Modification de la texture de la peau", explain: "Les anesthésiants locaux provoquent un œdème localisé (gonflement des cellules par accumulation de liquide) qui rend la peau caoutchouteuse et complique le dépôt régulier de l'encre." },
    it: { label: "Alterazione della texture cutanea", explain: '' },
    es: { label: "Alteración de la textura de la piel", explain: '' },
    de: { label: "Veränderte Hautbeschaffenheit", explain: '' },
    nl: { label: "Veranderde huidstructuur", explain: '' },
    pt: { label: "Alteração da textura da pele", explain: '' }
  },
  "Slightly Thicker Blood": {
    en: { label: "Slightly Thicker Blood", explain: "Testosterone increases red blood cell count (hematocrit), making blood slightly denser during heavy linework." },
    fr: { label: "Sang légèrement plus épais", explain: "La testostérone augmente le nombre de globules rouges (hématocrite), ce qui rend le sang légèrement plus dense lors des tracés appuyés." },
    it: { label: "Sangue leggermente più denso", explain: '' },
    es: { label: "Sangre ligeramente más espesa", explain: '' },
    de: { label: "Etwas dickeres Blut", explain: '' },
    nl: { label: "Iets dikker bloed", explain: '' },
    pt: { label: "Sangue ligeiramente mais espesso", explain: '' }
  },
  "Vasoconstriction": {
    en: { label: "Vasoconstriction", explain: "Narrowing of blood vessels blanches skin, making alignment difficult and temporarily restricting blood flow." },
    fr: { label: "Vasoconstriction", explain: "Le resserrement des vaisseaux fait blanchir la peau, ce qui complique l'alignement et limite temporairement la circulation sanguine." },
    it: { label: "Vasocostrizione", explain: '' },
    es: { label: "Vasoconstricción", explain: '' },
    de: { label: "Gefäßverengung", explain: '' },
    nl: { label: "Vaatvernauwing", explain: '' },
    pt: { label: "Vasoconstrição", explain: '' }
  },
  "Vasodilation": {
    en: { label: "Vasodilation", explain: "" },
    fr: { label: "Vasodilatation", explain: '' },
    it: { label: "Vasodilatazione", explain: '' },
    es: { label: "Vasodilatación", explain: '' },
    de: { label: "Gefäßerweiterung", explain: '' },
    nl: { label: "Vaatverwijding", explain: '' },
    pt: { label: "Vasodilatação", explain: '' }
  }
};

/**
 * The label or explanation for a badge, in the current language.
 *
 * Falls back to English rather than to nothing, so an unfinished translation
 * reads correctly instead of rendering an empty badge.
 */
function riskText(englishKey, field) {
  var lang = (typeof currentLang !== 'undefined' && currentLang) ? currentLang : 'en';
  var entry = RISK_I18N[englishKey];
  if (!entry) return null;
  var v = entry[lang] && entry[lang][field];
  if (v) return v;
  return (entry.en && entry.en[field]) || null;
}

if (typeof window !== 'undefined') { window.RISK_I18N = RISK_I18N; window.riskText = riskText; }
