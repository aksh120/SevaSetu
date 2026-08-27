export type Lang = "en" | "hi";

export const LANGS: Lang[] = ["en", "hi"];

export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    vars[key] !== undefined ? String(vars[key]) : `{${key}}`
  );
}

const en = {
  nav: {
    roadmap: "Roadmap",
    dashboard: "Dashboard",
    notices: "Notices",
    noticesFull: "Notice Translator",
  },
  headerTagline: "NGO compliance copilot",
  footer: {
    aboutLink: "About this build: what’s real, what’s mocked",
    disclosure:
      "Independent hackathon prototype. Not an official government product, and not affiliated with or endorsed by any government body.",
    tagline: "Build What Moves India",
    productTitle: "Product",
    chainTitle: "The registration chain",
  },
  doc: {
    preparedFor: "Prepared for",
    refLabel: "Reference",
    generatedLabel: "Generated",
    stepsLabel: "Steps",
  },
  landing: {
    headline: "Cut through NGO paperwork before it slows you down",
    subhead:
      "Answer a few questions. Get the exact registrations your NGO needs, in order and in plain English.",
    cta: "Start my roadmap",
    smallPrint: "Takes about 2 minutes. No documents needed yet.",
    demoButton: "Demo: see a filled dashboard",
    demoTag: "simulated",
    steps: [
      {
        title: "Answer four questions",
        body: "Name, structure, funding plans, age. Nothing more.",
      },
      {
        title: "Get your exact roadmap",
        body: "Only the registrations your NGO actually needs, in order.",
      },
      {
        title: "Work through each step",
        body: "Plain-English guidance, a document checklist, and a clear status.",
      },
    ],
    bridgeCaption:
      "One pylon per registration. Outline until you start it, solid when it is approved, and marigold for what comes next.",
    stats: [
      { n: "7", l: "registrations covered" },
      { n: "2", l: "funding branches" },
      { n: "2", l: "languages" },
      { n: "0", l: "logins required" },
    ],
    bandTitle: "Built for first-time founders",
    band: [
      {
        title: "Every legal structure",
        body: "Trust, Society or Section-8 — the engine starts from wherever you are.",
      },
      {
        title: "Both funding routes",
        body: "CSR-1 and FCRA appear only when your funding plans call for them.",
      },
      {
        title: "Hindi + English",
        body: "Switch the entire product with one tap. No settings dig required.",
      },
    ],
  },
  intake: {
    title: "Tell us about your NGO",
    nameLabel: "What’s your NGO called?",
    namePlaceholder: "e.g. Prakash Foundation",
    structureLabel: "Do you already have a legal structure?",
    structureNone: "Not yet  -  help me pick",
    structureTrust: "Yes, it’s a Trust",
    structureSociety: "Yes, it’s a Society",
    structureSection8: "Yes, it’s a Section-8 Company",
    fundingLabel: "Where do you expect funding to come from?",
    fundingHint: "Select all that apply.",
    fundingIndividual: "Individual donations in India",
    fundingCsr: "CSR funding from Indian companies",
    fundingForeign: "Grants or donations from outside India",
    fundingUnsure: "Not sure yet",
    ageLabel: "How long has your NGO been operating?",
    ageStarting: "Just starting out",
    ageUnder3: "Less than 3 years",
    ageOver3: "3 years or more",
    cta: "Build my roadmap",
    nameError: "Enter your NGO’s name to continue.",
    fundingError: "Select at least one funding source. “Not sure yet” counts.",
    personaHeading: "Demoing or exploring? Load an example profile:",
  },
  roadmap: {
    title: "Your registration roadmap",
    subhead: "Based on what you told us, here’s what {org} needs, and why.",
    emptyTitle: "Your registration roadmap",
    emptyBody: "Complete your NGO’s profile to see your personalized roadmap.",
    startStep: "Start this step",
    continueCta: "Continue",
    calloutMessage:
      "You can start this later. FCRA Registration usually needs a longer track record first. We’ll let you know when it’s worth pursuing.",
    calloutHint:
      "For one specific contribution, a “prior permission” route can work before full registration.",
    changePrefix: "Something changed?",
    changeLink: "Update your answers",
    changeSuffix: "and we’ll rebuild the roadmap.",
    printButton: "Print",
    printKicker: "SevaSetu  -  registration roadmap",
    printPrepared: "Prepared for {org}",
    printDisclaimer:
      "Independent hackathon prototype  -  not an official government product, not affiliated with or endorsed by any government body.",
    side: {
      legendTitle: "How to read the bridge",
      legendComplete: "Complete",
      legendCurrent: "Current step",
      legendUpNext: "Up next",
      chainTitle: "The full chain",
      chainNote: "Conditional steps appear only when your funding plans call for them.",
    },
  },
  module: {
    back: "← Back to your roadmap",
    stepKicker: "Step {n}",
    whatItIs: "What it is",
    whyYouNeedIt: "Why you need it",
    whatYoullNeed: "What you’ll need",
    uploadsNote: "Uploads are simulated. Nothing leaves your browser.",
    upload: "Upload",
    uploaded: "UPLOADED",
    submit: "Submit for review",
    submitHint: "Upload everything on the checklist to submit.",
    submitted: "Submitted!",
    goToDashboard: "Go to your dashboard",
    backToRoadmap: "Back to roadmap",
    timeline: "Typical timeline",
    timelineCaption: "Timelines are illustrative, not official.",
  },
  dashboard: {
    title: "{org}’s Compliance Dashboard",
    emptyTitle: "Compliance Dashboard",
    emptyBody: "Complete your NGO’s profile to see your personalized dashboard.",
    startCta: "Start my roadmap",
    progressHeading: "Progress summary",
    progressLabel: "required steps complete",
    progressAria: "{done} of {total} steps complete",
    reviewNote: "Review is simulated. Submitted steps show Approved after a few seconds.",
    nextUp: "Next up",
    allSteps: "All steps",
    allSubmittedTitle: "All steps submitted",
    allSubmittedBody:
      "Every registration on {org}’s roadmap has been submitted; approvals land in a few seconds.",
    allApprovedTitle: "All steps approved",
    allApprovedBody:
      "Every registration on {org}’s roadmap is approved in this simulation. The full chain is complete.",
    translatorCardTitle: "Confused by a letter from one of these offices?",
    translatorCardBody:
      "The Notice Translator breaks down what a government notice means, what to do, and by when, in plain English.",
    openTranslator: "Open the Notice Translator →",
    startOver: "Start over. This clears the session.",
  },
  translator: {
    headline: "Confused by a government notice?",
    subhead: "Paste the text, or upload the letter. We’ll break down what it means and what to do.",
    noticeLabel: "Notice text",
    placeholder: "Paste the notice text here",
    uploadInstead: "Upload instead",
    translate: "Translate this",
    translating: "Translating…",
    loadExample: "Load example notice",
    illustrativeTag: "illustrative",
    notConfigured:
      "The translator isn’t connected yet  -  this deployment is missing its AI API key (any OpenAI-compatible free provider works  -  see docs/ai-provider.md). Everything else in SevaSetu works without it.",
    genericError: "Something went wrong on our end  -  try again in a moment.",
    outputHeading: "Plain-English translation",
    means: "What this means",
    doNext: "What you need to do",
    deadline: "By when",
    emptyError: "Paste the notice text first, or load the example below.",
    side: {
      outputTitle: "Translation output",
      idleTitle: "Your translation appears here",
      idleBody:
        "Paste a notice on the left and press Translate. The answer always has three parts: what it means, what to do, and by when.",
      howTitle: "How it works",
      how: [
        { title: "Paste or load", body: "Any government notice — English or Hindi." },
        { title: "Read live by AI", body: "An open model reads your text server-side. Nothing is stored." },
        { title: "Three-part answer", body: "Meaning, next action, deadline. Nothing else." },
      ],
      privacyNote: "Served by Groq, which never trains on your data.",
    },
  },
  about: {
    title: "About this build",
    intro:
      "SevaSetu was built for the Build What Moves India hackathon. It is a working prototype, and this page states plainly what is real, what is simulated, and how it would scale.",
    whoHeading: "Who this is for",
    whoBody:
      "A first-time NGO founder in India must piece together five separate government portals  -  structure registration, PAN, 12A, 80G, NGO Darpan, plus FCRA or CSR-1 if they plan to raise certain funding  -  each in legal language, each assuming you already know the chain’s hidden order. Most give up or pay an agent to guess for them. SevaSetu replaces that guesswork with one plain-English sequence built from a few questions about their NGO.",
    realHeading: "What is real",
    mockedHeading: "What is mocked",
    scalingHeading: "How it could scale beyond the demo",
    disclaimerHeading: "Standing disclaimer",
    disclaimerBody:
      "Independent hackathon prototype  -  not an official government product, not affiliated with or endorsed by any government body. Nothing here is legal advice.",
    back: "← Back to the start",
    real: [
      {
        title: "The branching roadmap engine",
        body: "Your intake answers genuinely drive which registrations appear and in what order  -  the same logic a real advisor would apply, encoded from the source content.",
      },
      {
        title: "The guided journey",
        body: "Every module, checklist, status change, and the dashboard reflect real state that persists through your session.",
      },
      {
        title: "AI notice translation",
        body: "When an API key is configured, the Notice Translator calls a real OpenAI model server-side  -  it reads your pasted notice live, not from a script.",
      },
    ],
    mocked: [
      {
        title: "Document uploads",
        body: "Upload buttons mark items complete in your browser only. No files are stored or transmitted anywhere.",
      },
      {
        title: "Submissions, statuses and approvals",
        body: "“Submitted” means recorded locally, and “Approved” arrives automatically a few seconds later  -  both simulated. No registrar, the income-tax department, NITI Aayog, or MHA is contacted, not even read-only.",
      },
      {
        title: "Example notice and personas",
        body: "The sample notice and the example NGO profiles are illustrative, written for this prototype.",
      },
      {
        title: "Timelines and thresholds",
        body: "Figures like “valid for a few years” are illustrative. Real rules change; verify against official sources before acting.",
      },
    ],
    scaling: [
      {
        title: "Persistence and accounts",
        body: "Swap session storage for a database with simple auth so founders can return to their roadmap across devices.",
      },
      {
        title: "Real document handling",
        body: "Integrate DigiLocker for verified documents instead of mock uploads, with encryption at rest.",
      },
      {
        title: "Live status where possible",
        body: "Where offices expose digital status checks, fetch them; everywhere else, structured reminders replace guessing.",
      },
      {
        title: "Language and assisted access",
        body: "Translate the full experience into Hindi and regional languages (this build ships a Hindi interface), plus an assisted mode for founders with low literacy.",
      },
    ],
  },
  badges: {
    mocked: "Mocked",
    simulatedStatuses: "Simulated statuses",
    mockedUpload: "Mocked upload",
    noOffice: "No office contacted",
    simulated: "simulated",
    illustrative: "illustrative",
  },
};

export type Copy = typeof en;

const hi: Copy = {
  nav: {
    roadmap: "रोडमैप",
    dashboard: "डैशबोर्ड",
    notices: "नोटिस",
    noticesFull: "नोटिस ट्रांसलेटर",
  },
  headerTagline: "NGO कंप्लायंस कोपायलट",
  footer: {
    aboutLink: "इस बिल्ड के बारे में  -  क्या असली है, क्या सिम्युलेटेड",
    disclosure:
      "स्वतंत्र हैकाथॉन प्रोटोटाइप  -  कोई आधिकारिक सरकारी उत्पाद नहीं, न किसी सरकारी निकाय से संबद्ध, न समर्थित।",
    tagline: "Build What Moves India",
    productTitle: "प्रोडक्ट",
    chainTitle: "पंजीकरण श्रृंखला",
  },
  doc: {
    preparedFor: "किसके लिए तैयार",
    refLabel: "संदर्भ",
    generatedLabel: "तैयार किया गया",
    stepsLabel: "चरण",
  },
  landing: {
    headline: "NGO का काग़ज़ी काम, आपकी राह में रुकावट न बने",
    subhead:
      "कुछ सवालों के जवाब दें। आपके NGO को जो पंजीकरण चाहिए, वही  -  सही क्रम में, सरल भाषा में।",
    cta: "मेरा रोडमैप बनाएं",
    smallPrint: "लगभग 2 मिनट लगते हैं। अभी कोई दस्तावेज़ नहीं चाहिए।",
    demoButton: "डेमो: भरा हुआ डैशबोर्ड देखें",
    demoTag: "सिम्युलेटेड",
    steps: [
      {
        title: "चार सवालों के जवाब दें",
        body: "नाम, संरचना, फंडिंग योजना, उम्र  -  बस इतना ही।",
      },
      {
        title: "अपना सटीक रोडमैप पाएं",
        body: "सिर्फ़ वही पंजीकरण जो आपके NGO को सच में चाहिए  -  सही क्रम में।",
      },
      {
        title: "हर चरण पूरा करें",
        body: "सरल भाषा में मार्गदर्शन, दस्तावेज़ सूची और साफ़ स्थिति।",
      },
    ],
    bridgeCaption:
      "हर पंजीकरण के लिए एक स्तंभ  -  शुरू करने तक खाका, स्वीकृत होने पर भरा हुआ, अगला चरण गेंदा रंग में।",
    stats: [
      { n: "7", l: "पंजीकरण शामिल" },
      { n: "2", l: "फंडिंग रास्ते" },
      { n: "2", l: "भाषाएँ" },
      { n: "0", l: "लॉगिन ज़रूरी" },
    ],
    bandTitle: "पहली बार संस्थापकों के लिए बनाया गया",
    band: [
      {
        title: "हर कानूनी संरचना",
        body: "ट्रस्ट, सोसाइटी या सेक्शन-8  -  इंजन आपकी मौजूदा स्थिति से शुरू होता है।",
      },
      {
        title: "दोनों फंडिंग रास्ते",
        body: "CSR-1 और FCRA तभी दिखते हैं जब आपकी फंडिंग योजना उन्हें मांगती है।",
      },
      {
        title: "हिंदी + अंग्रेज़ी",
        body: "एक टैप से पूरा प्रोडक्ट बदलें। किसी सेटिंग में जाना नहीं।",
      },
    ],
  },
  intake: {
    title: "अपने NGO के बारे में बताएं",
    nameLabel: "आपके NGO का नाम क्या है?",
    namePlaceholder: "जैसे: Prakash Foundation",
    structureLabel: "क्या आपके पास पहले से कानूनी संरचना है?",
    structureNone: "अभी नहीं  -  चुनने में मदद करें",
    structureTrust: "हाँ, यह एक ट्रस्ट है",
    structureSociety: "हाँ, यह एक सोसाइटी है",
    structureSection8: "हाँ, यह एक सेक्शन-8 कंपनी है",
    fundingLabel: "आपको फंडिंग कहाँ से मिलने की उम्मीद है?",
    fundingHint: "लागू सभी विकल्प चुनें।",
    fundingIndividual: "भारत में व्यक्तिगत दान",
    fundingCsr: "भारतीय कंपनियों की CSR फंडिंग",
    fundingForeign: "भारत के बाहर से अनुदान या दान",
    fundingUnsure: "अभी नहीं सोचा है",
    ageLabel: "आपका NGO कब से चल रहा है?",
    ageStarting: "अभी शुरुआत कर रहे हैं",
    ageUnder3: "3 साल से कम",
    ageOver3: "3 साल या अधिक",
    cta: "मेरा रोडमैप बनाएं",
    nameError: "आगे बढ़ने के लिए अपने NGO का नाम लिखें।",
    fundingError: "कम से कम एक फंडिंग स्रोत चुनें  -  “अभी नहीं सोचा है” भी गिनता है।",
    personaHeading: "डेमो देखना है? एक उदाहरण प्रोफ़ाइल लोड करें:",
  },
  roadmap: {
    title: "आपका पंजीकरण रोडमैप",
    subhead: "आपने जो बताया, उसके आधार पर {org} को यह चाहिए  -  और क्यों।",
    emptyTitle: "आपका पंजीकरण रोडमैप",
    emptyBody: "अपने NGO की प्रोफ़ाइल पूरी करें, फिर आपका व्यक्तिगत रोडमैप यहाँ दिखेगा।",
    startStep: "यह चरण शुरू करें",
    continueCta: "जारी रखें",
    calloutMessage:
      "आप इसे बाद में शुरू कर सकते हैं। FCRA पंजीकरण में आम तौर पर पहले लंबे संचालन रिकॉर्ड की ज़रूरत होती है  -  जब यह कारगर होगा, हम आपको बताएंगे।",
    calloutHint:
      "किसी एक विशेष योगदान के लिए “prior permission” रास्ता पूरी पंजीकरण से पहले भी काम कर सकता है।",
    changePrefix: "कुछ बदला?",
    changeLink: "अपने जवाब अपडेट करें",
    changeSuffix: "और हम रोडमैप फिर से बना देंगे।",
    printButton: "प्रिंट",
    printKicker: "SevaSetu  -  पंजीकरण रोडमैप",
    printPrepared: "{org} के लिए तैयार",
    printDisclaimer:
      "स्वतंत्र हैकाथॉन प्रोटोटाइप  -  कोई आधिकारिक सरकारी उत्पाद नहीं, न किसी सरकारी निकाय से संबद्ध, न समर्थित।",
    side: {
      legendTitle: "पुल कैसे पढ़ें",
      legendComplete: "पूरा हुआ",
      legendCurrent: "मौजूदा चरण",
      legendUpNext: "आगे की बारी",
      chainTitle: "पूरी श्रृंखला",
      chainNote: "शर्तित चरण तभी दिखते हैं जब आपकी फंडिंग योजना उन्हें मांगती हो।",
    },
  },
  module: {
    back: "← अपने रोडमैप पर वापस",
    stepKicker: "चरण {n}",
    whatItIs: "यह क्या है",
    whyYouNeedIt: "आपको इसकी ज़रूरत क्यों है",
    whatYoullNeed: "आपको क्या चाहिए",
    uploadsNote: "अपलोड सिम्युलेटेड हैं  -  कुछ भी आपके ब्राउज़र से बाहर नहीं जाता।",
    upload: "अपलोड",
    uploaded: "अपलोड हो गया",
    submit: "समीक्षा के लिए भेजें",
    submitHint: "भेजने के लिए चेकलिस्ट की हर चीज़ अपलोड करें।",
    submitted: "भेज दिया गया!",
    goToDashboard: "अपने डैशबोर्ड पर जाएं",
    backToRoadmap: "रोडमैप पर वापस",
    timeline: "आम तौर पर कितना समय लगता है",
    timelineCaption: "समय-सीमाएँ उदाहरण हैं, आधिकारिक नहीं।",
  },
  dashboard: {
    title: "{org} का कंप्लायंस डैशबोर्ड",
    emptyTitle: "कंप्लायंस डैशबोर्ड",
    emptyBody: "अपने NGO की प्रोफ़ाइल पूरी करें, फिर आपका व्यक्तिगत डैशबोर्ड यहाँ दिखेगा।",
    startCta: "मेरा रोडमैप बनाएं",
    progressHeading: "प्रगति सार",
    progressLabel: "ज़रूरी चरण पूरे",
    progressAria: "{total} में से {done} चरण पूरे",
    reviewNote: "समीक्षा सिम्युलेटेड है  -  भेजे गए चरण कुछ सेकंड बाद Approved दिखते हैं।",
    nextUp: "अगला चरण",
    allSteps: "सभी चरण",
    allSubmittedTitle: "सभी चरण भेजे गए",
    allSubmittedBody:
      "{org} के रोडमैप का हर पंजीकरण भेजा जा चुका है; स्वीकृतियाँ कुछ सेकंड में दिखेंगी।",
    allApprovedTitle: "सभी चरण स्वीकृत",
    allApprovedBody: "{org} के रोडमैप का हर पंजीकरण स्वीकृत है  -  पूरी श्रृंखला, पूरी।",
    translatorCardTitle: "इनमें से किसी दफ़्तर का पत्र समझ नहीं आ रहा?",
    translatorCardBody:
      "नोटिस ट्रांसलेटर सरल भाषा में बताता है कि सरकारी नोटिस का मतलब क्या है, क्या करना है, और कब तक।",
    openTranslator: "नोटिस ट्रांसलेटर खोलें →",
    startOver: "फिर से शुरू करें  -  यह सेशन साफ़ हो जाएगा",
  },
  translator: {
    headline: "कोई सरकारी नोटिस समझ नहीं आ रहा?",
    subhead: "टेक्स्ट पेस्ट करें, या पत्र अपलोड करें  -  हम बताएंगे इसका मतलब और आगे का रास्ता।",
    noticeLabel: "नोटिस का टेक्स्ट",
    placeholder: "नोटिस का टेक्स्ट यहाँ पेस्ट करें",
    uploadInstead: "इसके बजाय अपलोड करें",
    translate: "अनुवाद करें",
    translating: "अनुवाद हो रहा है…",
    loadExample: "उदाहरण नोटिस लोड करें",
    illustrativeTag: "उदाहरण",
    notConfigured:
      "ट्रांसलेटर अभी जुड़ा नहीं है  -  इस डिप्लॉयमेंट में AI API key मौजूद नहीं है (कोई भी OpenAI-संगत मुफ़्त प्रोवाइडर चलेगा)। इसके बिना भी SevaSetu का बाक़ी सब कुछ काम करता है।",
    genericError: "हमारी तरफ़ से कुछ गड़बड़ हो गई  -  कुछ देर में दोबारा कोशिश करें।",
    outputHeading: "सरल-भाषा अनुवाद",
    means: "इसका मतलब क्या है",
    doNext: "आपको क्या करना चाहिए",
    deadline: "कब तक",
    emptyError: "पहले नोटिस का टेक्स्ट पेस्ट करें, या नीचे उदाहरण लोड करें।",
    side: {
      outputTitle: "अनुवाद आउटपुट",
      idleTitle: "आपका अनुवाद यहाँ दिखेगा",
      idleBody:
        "बाईं ओर नोटिस पेस्ट करें और Translate दबाएं। जवाब में हमेशा तीन हिस्से होते हैं: मतलब, क्या करना है, और कब तक।",
      howTitle: "यह कैसे काम करता है",
      how: [
        { title: "पेस्ट करें या लोड करें", body: "कोई भी सरकारी नोटिस — हिंदी या अंग्रेज़ी।" },
        { title: "AI सीधे पढ़ता है", body: "खुला मॉडल आपका टेक्स्ट सर्वर-साइड पढ़ता है। कुछ भी सेव नहीं होता।" },
        { title: "तीन-हिस्सों वाला जवाब", body: "मतलब, अगला कदम, समय-सीमा। इससे ज़्यादा कुछ नहीं।" },
      ],
      privacyNote: "Groq पर संसाधित — जो आपके डेटा पर कभी ट्रेन नहीं करता।",
    },
  },
  about: {
    title: "इस बिल्ड के बारे में",
    intro:
      "SevaSetu को Build What Moves India हैकाथॉन के लिए बनाया गया है। यह एक चालू प्रोटोटाइप है, और यह पेज साफ़ शब्दों में बताता है कि क्या असली है, क्या सिम्युलेटेड है, और यह आगे कैसे बढ़ेगा।",
    whoHeading: "यह किसके लिए है",
    whoBody:
      "भारत में पहली बार NGO शुरू करने वाले संस्थापक को पाँच अलग-अलग सरकारी पोर्टल जोड़ने पड़ते हैं  -  संरचना पंजीकरण, PAN, 12A, 80G, NGO Darpan, और फंडिंग की योजना के हिसाब से FCRA या CSR-1  -  हर एक कानूनी भाषा में, हर एक यह मानकर कि आप श्रृंखला का छिपा क्रम जानते हैं। ज़्यादातर लोग हार मान लेते हैं या एजेंट को पैसे देकर अंदाज़े से काम करवाते हैं। SevaSetu उस अंदाज़े की जगह कुछ सवालों से बनी एक सरल-भाषा की सूची देता है।",
    realHeading: "जो असली है",
    mockedHeading: "जो सिम्युलेटेड है",
    scalingHeading: "डेमो से आगे यह कैसे बढ़ेगा",
    disclaimerHeading: "स्थायी अस्वीकरण",
    disclaimerBody:
      "स्वतंत्र हैकाथॉन प्रोटोटाइप  -  कोई आधिकारिक सरकारी उत्पाद नहीं, न किसी सरकारी निकाय से संबद्ध, न समर्थित। यहाँ कुछ भी कानूनी सलाह नहीं है।",
    back: "← शुरुआत पर वापस",
    real: [
      {
        title: "ब्रांचिंग रोडमैप इंजन",
        body: "आपके जवाब ही तय करते हैं कि कौन-से पंजीकरण, किस क्रम में दिखेंगे  -  वही तर्क जो एक अनुभवी सलाहकार लगाता, स्रोत कंटेंट से एनकोड।",
      },
      {
        title: "पूरी गाइडेड यात्रा",
        body: "हर मॉड्यूल, चेकलिस्ट, स्थिति-बदलाव और डैशबोर्ड असली स्थिति दिखाते हैं जो आपके पूरे सेशन में बनी रहती है।",
      },
      {
        title: "AI नोटिस अनुवाद",
        body: "API key मौजूद होने पर नोटिस ट्रांसलेटर सर्वर-साइड से असली OpenAI मॉडल को कॉल करता है  -  आपका पेस्ट किया नोटिस लाइव पढ़ता है, स्क्रिप्ट से नहीं।",
      },
    ],
    mocked: [
      {
        title: "दस्तावेज़ अपलोड",
        body: "अपलोड बटन सिर्फ़ आपके ब्राउज़र में चीज़ें पूरी कराते हैं। कोई फ़ाइल कहीं सेव या भेजी नहीं जाती।",
      },
      {
        title: "सबमिशन, स्थितियाँ और स्वीकृतियाँ",
        body: "“भेजा गया” का मतलब सिर्फ़ स्थानीय रिकॉर्ड है, और “स्वीकृत” कुछ सेकंड बाद अपने-आप आता है  -  दोनों सिम्युलेटेड। कोई रजिस्ट्रार, इनकम-टैक्स विभाग, NITI Aayog या MHA से संपर्क नहीं होता  -  पढ़ने के लिए भी नहीं।",
      },
      {
        title: "उदाहरण नोटिस और प्रोफ़ाइल",
        body: "नमूना नोटिस और उदाहरण NGO प्रोफ़ाइलें इस प्रोटोटाइप के लिए लिखी गई उदाहरण सामग्री हैं।",
      },
      {
        title: "समय-सीमाएँ और आँकड़े",
        body: "“कुछ वर्षों के लिए वैध” जैसे आँकड़े उदाहरण हैं। असली नियम बदलते रहते हैं; कोई कदम उठाने से पहले आधिकारिक स्रोतों से जाँचें।",
      },
    ],
    scaling: [
      {
        title: "डेटा सेव और अकाउंट",
        body: "सेशन स्टोरेज की जगह साधारण लॉगिन वाला डेटाबेस, ताकि संस्थापक किसी भी डिवाइस से अपना रोडमैप लौटा सकें।",
      },
      {
        title: "असली दस्तावेज़ प्रबंधन",
        body: "मॉक अपलोड की जगह DigiLocker से सत्यापित दस्तावेज़, एन्क्रिप्शन के साथ।",
      },
      {
        title: "जहाँ संभव हो, लाइव स्थिति",
        body: "जिन दफ़्तरों की डिजिटल स्थिति-जाँच उपलब्ध हो, उसे दिखाया जाए; बाकी जगह अनुमान की जगह संरचित रिमाइंडर।",
      },
      {
        title: "भाषा और सहायता",
        body: "पूरा अनुभव हिंदी और क्षेत्रीय भाषाओं में (इस बिल्ड में हिंदी इंटरफ़ेस शामिल है), और कम पढ़ाई-लिखाई वालों के लिए सहायता मोड।",
      },
    ],
  },
  badges: {
    mocked: "मॉक",
    simulatedStatuses: "सिम्युलेटेड स्थितियाँ",
    mockedUpload: "मॉक अपलोड",
    noOffice: "कोई दफ़्तर शामिल नहीं",
    simulated: "सिम्युलेटेड",
    illustrative: "उदाहरण",
  },
};

const DICTS: Record<Lang, Copy> = { en, hi };

export function getCopy(lang: Lang): Copy {
  return DICTS[lang];
}
