import { PageType } from '@prisma/client'

interface MultilingualField {
  en: string
  hi: string
  kn: string
  ta: string
  te: string
}

interface GeneratedPage {
  title: MultilingualField
  description: MultilingualField
  content: MultilingualField
  seoMeta: {
    title: string
    description: string
    keywords: string[]
  }
}

export interface GeneratedWebsiteContent {
  HOME: GeneratedPage
  ABOUT: GeneratedPage
  HISTORY: GeneratedPage
  CONTACT: GeneratedPage
}

// Fallback generators in case Gemini API is not configured or fails
function getFallbackContent(templeName: string, deity: string, templeType: string): GeneratedWebsiteContent {
  return {
    HOME: {
      title: {
        en: `Welcome to ${templeName}`,
        hi: `${templeName} में आपका स्वागत है`,
        kn: `${templeName} ಗೆ ತಮಗೆ ಆದರದ ಸ್ವಾಗತ`,
        ta: `${templeName} அன்புடன் வரவேற்கிறது`,
        te: `${templeName} కి సుಸ್ವಾಗతం`,
      },
      description: {
        en: `A spiritual sanctuary dedicated to the worship of Lord ${deity || 'Divine'}.`,
        hi: `भगवान ${deity || 'दिव्य'} की पूजा को समर्पित एक आध्यात्मिक अभयारण्य।`,
        kn: `ಶ್ರೀ ${deity || 'ದೈವಿ'} ಆರಾಧನೆಗೆ ಸಮರ್ಪಿತವಾದ ಪವಿತ್ರ ಕ್ಷೇತ್ರ.`,
        ta: `ஸ்ரீ ${deity || 'தெய்வீக'} வழிபாட்டிற்கு அர்ப்பணிக்கப்பட்ட ஆன்மீக தலம்.`,
        te: `శ్రీ ${deity || 'దైవి'} ఆరాధనకు సమర్పించబడిన ఆధ్యాత్మిక ధామం.`,
      },
      content: {
        en: `<p>Welcome to the official portal of ${templeName}. Located in serene surroundings, our temple stands as a beacon of devotion, heritage, and service to humanity. Dedicated to ${deity || 'the Lord'}, we invite all devotees to seek blessings and participate in our daily poojas, festivals, and spiritual services.</p>`,
        hi: `<p>${templeName} के आधिकारिक पोर्टल पर आपका स्वागत है। शांत वातावरण में स्थित, हमारा मंदिर मानवता के लिए भक्ति, विरासत और सेवा के प्रतीक के रूप में खड़ा है। भगवान ${deity || 'दिव्य'} को समर्पित, हम सभी भक्तों को आशीर्वाद लेने और हमारे दैनिक अनुष्ठानों में भाग लेने के लिए आमंत्रित करते हैं।</p>`,
        kn: `<p>${templeName} ನ ಅಧಿಕೃತ ಜಾಲತಾಣಕ್ಕೆ ಸುಸ್ವಾಗತ. ಪ್ರಶಾಂತ ಪರಿಸರದಲ್ಲಿ ನೆಲೆಸಿರುವ ನಮ್ಮ ದೇವಾಲಯವು ಭಕ್ತಿ, ಪರಂಪರೆ ಮತ್ತು ಜನಸೇವೆಯ ಧಾಮವಾಗಿದೆ. ಶ್ರೀ ${deity || 'ದೈವ'} ಆಶೀರ್ವಾದ ಪಡೆಯಲು ಮತ್ತು ದೈನಂದಿನ ಪೂಜೆಗಳಲ್ಲಿ ಪಾಲ್ಗೊಳ್ಳಲು ಭಕ್ತರನ್ನು ಆದರದಿಂದ ಆಹ್ವಾನಿಸುತ್ತೇವೆ.</p>`,
        ta: `<p>${templeName} அதிகாரப்பூர்வ இணையதளத்திற்கு வரவேற்கிறோம். அமைதியான சூழலில் அமைந்துள்ள நமது ஆலயம் பக்தி, பாரம்பரியம் மற்றும் சேவையின் அடையாளமாக திகழ்கிறது. ஸ்ரீ ${deity || 'தெய்வ'} அருளைப் பெறவும் தினசரி வழிபாடுகளில் பங்கேற்கவும் உங்களை அன்புடன் அழைக்கிறோம்.</p>`,
        te: `<p>${templeName} అధికారిక పోర్టల్‌కు సుస్వాగతం. ప్రశాంతమైన వాతావరణంలో కొలువైన మా ఆలయం భక్తి, సంస్కృతి మరియు సేవాభావానికి నిలయం. శ్రీ ${deity || 'దైవ'} అనుగ్రహం పొందడానికి మరియు నిత్య సేవల్లో పాల్గొనడానికి భక్తులందరికీ ఆహ్వానం.</p>`,
      },
      seoMeta: {
        title: `${templeName} — Official Temple Website`,
        description: `Official website of ${templeName} dedicated to Lord ${deity}. Seek blessings, view timings, and donate online.`,
        keywords: [templeName, deity, templeType, 'temple timings', 'online donation', 'pooja booking'],
      },
    },
    ABOUT: {
      title: {
        en: `About Us`,
        hi: `हमारे बारे में`,
        kn: `ನಮ್ಮ ಬಗ್ಗೆ`,
        ta: `எங்களைப் பற்றி`,
        te: `మా గురించి`,
      },
      description: {
        en: `Learn more about the trust, administration, and activities of ${templeName}.`,
        hi: `${templeName} के ट्रस्ट, प्रशासन और गतिविधियों के बारे में जानें।`,
        kn: `${templeName} ಟ್ರಸ್ಟ್, ಆಡಳಿತ ಮತ್ತು ಸೇವಾ ಕಾರ್ಯಗಳ ಮಾಹಿತಿ.`,
        ta: `${templeName} அறக்கட்டளை, நிர்வாகம் மற்றும் செயல்பாடுகள் பற்றிய விவரம்.`,
        te: `${templeName} ట్రస్ట్, పాలక మండలి మరియు వివిధ సేవా కార్యక్రమాల వివరాలు.`,
      },
      content: {
        en: `<p>${templeName} is managed by a dedicated board of trustees committed to preserving our ancient traditions while engaging in welfare and education services. The temple trust runs a daily Annadanam (free meals) program, spiritual discourses, and community health camps for the benefit of all.</p>`,
        hi: `<p>${templeName} का प्रबंधन एक समर्पित ट्रस्ट मंडल द्वारा किया जाता है जो जनकल्याण और शिक्षा सेवाओं में संलग्न रहते हुए हमारी प्राचीन परंपराओं को संरक्षित करने के लिए प्रतिबद्ध है। मंदिर ट्रस्ट सभी के लाभ के लिए दैनिक अन्नदानम (मुफ्त भोजन) कार्यक्रम, आध्यात्मिक प्रवचन और सामुदायिक स्वास्थ्य शिविर चलाता है।</p>`,
        kn: `<p>${templeName} ನಮ್ಮ ಪುರಾತನ ಸಂಪ್ರದಾಯಗಳನ್ನು ರಕ್ಷಿಸುವ ಮತ್ತು ಜನ ಕಲ್ಯಾಣ ಕಾರ್ಯಗಳಲ್ಲಿ ತೊಡಗಿಸಿಕೊಂಡಿರುವ ಟ್ರಸ್ಟ್ ಮಂಡಳಿಯಿಂದ ನಿರ್ವಹಿಸಲ್ಪಡುತ್ತದೆ. ದೇವಾಲಯದ ವತಿಯಿಂದ ನಿತ್ಯ ಉಚಿತ ಅನ್ನದಾಸೋಹ, ಆಧ್ಯಾತ್ಮಿಕ ಪ್ರವಚನಗಳು ಹಾಗೂ ಆರೋಗ್ಯ ಶಿಬಿರಗಳನ್ನು ಸಮಾಜದ ಹಿತಕ್ಕಾಗಿ ನಡೆಸಲಾಗುತ್ತಿದೆ.</p>`,
        ta: `<p>${templeName} நமது பூர்விக பாரம்பரியங்களைப் பாதுகாக்கவும் சமூக சேவைகளில் ஈடுபடவும் அர்ப்பணிக்கப்பட்ட அறங்காவலர் குழுவினால் நிர்வகிக்கப்படுகிறது. ஆலயம் சார்பில் தினசரி அன்னதானத் திட்டம், ஆன்மீக சொற்பொழிவுகள் மற்றும் இலவச மருத்துவ முகாம்கள் நடத்தப்படுகின்றன.</p>`,
        te: `<p>${templeName} పాలక మండలి ఆధ్వర్యంలో మన సనాతన సంప్రదాయాలను రక్షిస్తూ సామాజిక సేవా కార్యక్రమాలు నిర్వహిస్తోంది. ఆలయం తరపున నిత్య అన్నదానం, ఆధ్యాత్మిక ప్రవచనాలు మరియు ఉచిత వైద్య శిబిరాలు వంటి కార్యక్రమాలు భక్తుల సౌకర్యార్థం కొనసాగుతున్నాయి.</p>`,
      },
      seoMeta: {
        title: `About ${templeName} — Trust & Administration`,
        description: `Read about the trustees, goals, welfare services, and administration of ${templeName}.`,
        keywords: ['temple trust', 'trustees', 'welfare activities', 'annadanam details', templeName],
      },
    },
    HISTORY: {
      title: {
        en: `Temple History & Legend`,
        hi: `मंदिर का इतिहास और पौराणिक कथा`,
        kn: `ದೇವಾಲಯದ ಇತಿಹಾಸ ಮತ್ತು ಹಿನ್ನೆಲೆ`,
        ta: `ஆலய வரலாறு மற்றும் தலபுராணம்`,
        te: `ఆలయ చరిత్ర మరియు పురాణ ప్రాశస్త్యం`,
      },
      description: {
        en: `Discover the origins, historical milestones, and sacred legends of ${templeName}.`,
        hi: `${templeName} की उत्पत्ति, ऐतिहासिक मील के पत्थर और पवित्र किंवदंतियों की खोज करें।`,
        kn: `${templeName} ಸ್ಥಾಪನೆ, ಐತಿಹಾಸಿಕ ಹಿನ್ನೆಲೆ ಮತ್ತು ದೈವಿಕ ಪವಾಡಗಳ ಮಾಹಿತಿ.`,
        ta: `${templeName} தோற்றம், வரலாற்றுச் சிறப்புகள் மற்றும் புனிதக் கதைகளை அறிந்து கொள்ளுங்கள்.`,
        te: `${templeName} ఆలయ ఆవిర్భావం, చారిత్రక విశేషాలు మరియు క్షేత్ర పురాణాన్ని తెలుసుకోండి.`,
      },
      content: {
        en: `<p>Dating back centuries, ${templeName} has been a center of faith for generations. Legend says that the deity manifested self-carved (Swayambhu) or was installed by revered saints of ancient times. Over the years, the temple structure was expanded under historical patronages, retaining its classic architectural marvel.</p>`,
        hi: `<p>सदियों पुराना, ${templeName} पीढ़ियों से आस्था का केंद्र रहा है। पौराणिक कथाओं के अनुसार, यहां मूर्ति स्वयंभू प्रकट हुई थी या प्राचीन काल के पूज्य संतों द्वारा स्थापित की गई थी। वर्षों से, ऐतिहासिक राजाओं के संरक्षण में मंदिर की वास्तुकला का विस्तार किया गया।</p>`,
        kn: `<p>ಶತಮಾನಗಳ ಸುದೀರ್ಘ ಇತಿಹಾಸ ಹೊಂದಿರುವ ${templeName} ತಲೆಮಾರುಗಳಿಂದ ಧಾರ್ಮಿಕ ಕೇಂದ್ರವಾಗಿದೆ. ಇಲ್ಲಿಯ ಆರಾಧ್ಯ ದೈವವು ಸ್ವಯಂಭೂ ಆಗಿ ನೆಲೆಗೊಂಡಿದ್ದು ಅಥವಾ ಮಹರ್ಷಿಗಳಿಂದ ಪ್ರತಿಷ್ಠಾಪಿಸಲ್ಪಟ್ಟಿದೆ ಎಂಬ ನಂಬಿಕೆಯಿದೆ. ಇತಿಹಾಸದ ವಿವಿಧ ರಾಜಮನೆತನಗಳ ಆಶ್ರಯದಲ್ಲಿ ದೇವಾಲಯವು ಅಭಿವೃದ್ಧಿ ಹೊಂದಿತು.</p>`,
        ta: `<p>நூற்றாண்டுகள் பழமை வாய்ந்த ${templeName} தலைமுறைகளாக மக்களின் ஆன்மீக மையமாகத் திகழ்கிறது. இங்குள்ள தெய்வம் சுயம்புவாகத் தோன்றியதாகவோ அல்லது முனிவர்களால் பிரதிஷ்டை செய்யப்பட்டதாகவோ நம்பப்படுகிறது. வரலாற்றில் பல்வேறு மன்னர்களின் ஆட்சியில் இக்கோவில் திருப்பணி செய்யப்பட்டு விரிவுபடுத்தப்பட்டது.</p>`,
        te: `<p>శతాబ్దాల ప్రాచీన చరిత్ర కలిగిన ${templeName} తరతరాలుగా భక్తుల కొంగుబంగారంగా నిలుస్తోంది. ఇక్కడి దేవతామూర్తి స్వయంభూగా వెలిసిందని లేదా పూర్వపు సిద్ధపురుషులచే ప్రతిష్టించబడిందని పురాణాలు చెబుతున్నాయి. వివిధ చారిత్రక రాజవంశాల కాలంలో ఆలయ వాస్తుశిల్పం విస్తరించబడింది.</p>`,
      },
      seoMeta: {
        title: `History & Legend of ${templeName}`,
        description: `Explore the historical origins, spiritual stories, and architecture of ${templeName}.`,
        keywords: ['temple history', 'sacred legend', 'swayambhu deity', 'ancient architecture', templeName],
      },
    },
    CONTACT: {
      title: {
        en: `Contact & Directions`,
        hi: `संपर्क और मार्ग निर्देश`,
        kn: `ಸಂಪರ್ಕ ಮಾಹಿತಿ`,
        ta: `தொடர்பு கொள்ள`,
        te: `సంప్రదించండి`,
      },
      description: {
        en: `Find opening hours, contact details, and location directions for ${templeName}.`,
        hi: `${templeName} के खुलने का समय, संपर्क विवरण और स्थान निर्देश प्राप्त करें।`,
        kn: `${templeName} ದರ್ಶನದ ಸಮಯ, ಸಂಪರ್ಕ ವಿಳಾಸ ಮತ್ತು ಮಾರ್ಗದರ್ಶನ.`,
        ta: `${templeName} திறக்கும் நேரம், முகவரி மற்றும் இருப்பிட விவரங்கள்.`,
        te: `${templeName} దర్శన వేళలు, ఆలయ చిరునామా మరియు చేరే మార్గాలు.`,
      },
      content: {
        en: `<p>We look forward to welcoming you to our temple. Seek blessings in person, reach out via our contact details for any pooja bookings, or find directions on how to reach us by road, train, or flight.</p>`,
        hi: `<p>हम मंदिर में आपका स्वागत करने के लिए उत्सुक हैं। स्वयं आकर दर्शन करें, किसी भी पूजा बुकिंग के लिए हमारे संपर्क विवरणों पर पहुंचें, या सड़क, ट्रेन या उड़ान द्वारा पहुंचने के निर्देश खोजें।</p>`,
        kn: `<p>ದೇವಾಲಯಕ್ಕೆ ಭೇಟಿ ನೀಡುವ ಭಕ್ತಾದಿಗಳನ್ನು ಪ್ರೀತಿಯಿಂದ ಸ್ವಾಗತಿಸುತ್ತೇವೆ. ಪೂಜಾ ಸೇವೆಗಳ ಬುಕಿಂಗ್ ಹಾಗೂ ರಸ್ತೆ, ರೈಲು ಅಥವಾ ವಿಮಾನ ಮಾರ್ಗಗಳ ಮೂಲಕ ನಮ್ಮನ್ನು ತಲುಪುವ ಬಗೆಗಿನ ವಿವರ ಇಲ್ಲಿದೆ.</p>`,
        ta: `<p>ஆலயத்திற்கு உங்களை அன்புடன் வரவேற்கிறோம். சிறப்பு வழிபாடுகள், கட்டணச் சீட்டுகள் பற்றிய தகவல்களுக்கு எங்களைத் தொடர்பு கொள்ளவும் அல்லது எளிதில் வந்து சேரும் வழிமுறைகளை இங்கே காணவும்.</p>`,
        te: `<p>మిమ్మల్ని మా ఆలయంలోకి సాదరంగా ఆహ్వಾನిస్తున్నాము. ప్రత్యేక పూజల బుకింగ్స్ సమాచారం కోసం లేదా ఆలయానికి చేరేందుకు రవాణా మార్గాల వివరాల కోసం ఇక్కడ చూడండి.</p>`,
      },
      seoMeta: {
        title: `Contact ${templeName} — Address & Timings`,
        description: `Get contact phone numbers, email address, locations, and directions for visiting ${templeName}.`,
        keywords: ['how to reach temple', 'temple phone number', 'darshan timings', 'temple location', templeName],
      },
    },
  }
}

export async function generateTempleWebsite(
  templeName: string,
  deity: string,
  templeType: string,
  customInfo: string = ''
): Promise<GeneratedWebsiteContent> {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey || apiKey === 'your_gemini_api_key') {
    console.log('Gemini API key is not configured. Falling back to structured default templates.')
    return getFallbackContent(templeName, deity, templeType)
  }

  const prompt = `
  You are an expert full-stack copywriter specializing in Indian cultural heritage and Hindu temples.
  You need to generate rich, descriptive, and spiritual website content for a temple.
  
  Temple Details:
  - Temple Name: "${templeName}"
  - Deity: "${deity}"
  - Temple Type/Tradition: "${templeType}"
  - Custom Info/History context: "${customInfo}"

  Task:
  Generate structured web page content for four pages: HOME, ABOUT, HISTORY, and CONTACT.
  You MUST return content in 5 languages: English ("en"), Hindi ("hi"), Kannada ("kn"), Tamil ("ta"), and Telugu ("te").
  Provide the output strictly as a JSON object, exactly matching the following TypeScript interface:

  interface GeneratedPage {
    title: { en: string; hi: string; kn: string; ta: string; te: string };
    description: { en: string; hi: string; kn: string; ta: string; te: string };
    content: { en: string; hi: string; kn: string; ta: string; te: string }; // Rich HTML formatted string (containing <p>, <h3>, <ul>, etc.)
    seoMeta: {
      title: string;
      description: string;
      keywords: string[];
    };
  }

  interface GeneratedWebsiteContent {
    HOME: GeneratedPage;
    ABOUT: GeneratedPage;
    HISTORY: GeneratedPage;
    CONTACT: GeneratedPage;
  }

  Instructions:
  - Generate premium, elegant, and deeply spiritual copy.
  - The content field for each page must be structured in HTML (<p>, <h3>, <strong> elements). Do not use Markdown inside the content strings.
  - Translate accurately into Hindi, Kannada, Tamil, and Telugu, preserving the spiritual context and respectful language.
  - Return ONLY valid JSON matching this structure. Do not wrap the JSON in markdown code blocks like \`\`\`json.
  `

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
          },
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`Gemini API returned status ${response.status}`)
    }

    const data = await response.json()
    const textResult = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!textResult) {
      throw new Error('No content returned from Gemini API')
    }

    const jsonContent = JSON.parse(textResult) as GeneratedWebsiteContent
    return jsonContent
  } catch (error) {
    console.error('Failed to generate temple website using Gemini API:', error)
    console.log('Falling back to default templates.')
    return getFallbackContent(templeName, deity, templeType)
  }
}
