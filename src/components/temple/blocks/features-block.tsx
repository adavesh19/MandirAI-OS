'use client'

import * as React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/components/shared/language-context'

interface FeatureCard {
  image?: string
  title?: Record<string, string>
  description?: Record<string, string>
  ctaText?: Record<string, string>
  ctaLink?: string
}

interface FeaturesBlockProps {
  data: {
    title?: Record<string, string>
    features?: FeatureCard[]
  }
  settings?: {
    columns?: '2' | '3' | '4'
  }
  theme?: string
}

export default function FeaturesBlock({ data, settings, theme = 'classic' }: FeaturesBlockProps) {
  const { t } = useLanguage()

  // Default features if empty
  const defaultFeatures = [
    {
      image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=600&q=80',
      title: { en: 'Temple History', hi: 'मंदिर का इतिहास', kn: 'ದೇವಾಲಯದ ಇತಿಹಾಸ', ta: 'கோவில் வரலாறு', te: 'దేవాలయ చరిత్ర' },
      description: {
        en: 'Discover the ancient legends, sacred origin, and historical significance of our temple.',
        hi: 'हमारे मंदिर की प्राचीन किंवदंतियों, पवित्र उत्पत्ति और ऐतिहासिक महत्व की खोज करें।',
        kn: 'ನಮ್ಮ ದೇವಾಲಯದ ಪುರಾತನ ದಂತಕಥೆಗಳು, ಪವಿತ್ರ ಮೂಲ ಮತ್ತು ಐತಿಹಾಸಿಕ ಮಹತ್ವವನ್ನು ಅನ್ವೇಷಿಸಿ.',
        ta: 'எங்கள் கோவிலின் பழங்கால புராணங்கள், புனித தோற்றம் மற்றும் வரலாற்று முக்கியத்துவத்தைக் கண்டறியவும்.',
        te: 'మా దేవాలయం యొక్క పురాతన పురాణాలు, పవిత్ర మూలం మరియు చారిత్రక ప్రాముఖ్యతను కనుగొనండి.'
      },
      ctaText: { en: 'Read Legacy', hi: 'इतिहास पढ़ें', kn: 'ಇತಿಹಾಸ ಓದಿ', ta: 'வரலாறு வாசிக்க', te: 'చరిత్ర చదవండి' },
      ctaLink: '/history'
    },
    {
      image: 'https://images.unsplash.com/photo-1602631985686-2bb068645004?auto=format&fit=crop&w=600&q=80',
      title: { en: 'Daily Pujas', hi: 'दैनिक पूजा', kn: 'ದೈನಂದಿನ ಪೂಜೆಗಳು', ta: 'தினசரி பூஜைகள்', te: 'దినచర్య పూజలు' },
      description: {
        en: 'Learn about daily darshan timings, special seva details, and holy rituals performed by priests.',
        hi: 'दैनिक दर्शन समय, विशेष सेवा विवरण और पुजारियों द्वारा किए जाने वाले पवित्र अनुष्ठानों के बारे में जानें।',
        kn: 'ದೈನಂದಿನ ದರ್ಶನ ಸಮಯಗಳು, ವಿಶೇಷ ಸೇವಾ ವಿವರಗಳು ಮತ್ತು ಅರ್ಚಕರು ಮಾಡುವ ಪವಿತ್ರ ಆಚರಣೆಗಳ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ.',
        ta: 'தினசரி தரிசன நேரங்கள், சிறப்பு சேவை விவரங்கள் மற்றும் பூசாரிகள் செய்யும் புனித சடங்குகள் பற்றி அறிக.',
        te: 'పూజారులు చేసే దినచర్య దర్శన సమయాలు, ప్రత్యేక సేవా వివరాలు మరియు పవిత్ర పూజా విధానాల గురించి తెలుసుకోండి.'
      },
      ctaText: { en: 'View Sevas', hi: 'सेवाएं देखें', kn: 'ಸೇವೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ', ta: 'சேவைகளை காண்க', te: 'సేవలు చూడండి' },
      ctaLink: '/donate'
    },
    {
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80',
      title: { en: 'Charitable Trust', hi: 'चेरिटेबल ट्रस्ट', kn: 'ಧರ್ಮಾರ್ಥ ಟ್ರಸ್ಟ್', ta: 'அறக்கட்டளை', te: 'చారిటబుల్ ట్రస్ట్' },
      description: {
        en: 'Support our social welfare activities, annadanam fund, and educational programs.',
        hi: 'हमारी सामाजिक कल्याण गतिविधियों, अन्नदानम कोष और शैक्षिक कार्यक्रमों का समर्थन करें।',
        kn: 'ನಮ್ಮ ಸಾಮಾಜಿಕ ಕಲ್ಯಾಣ ಚಟುವಟಿಕೆಗಳು, ಅನ್ನದಾನ ನಿಧಿ ಮತ್ತು ಶೈಕ್ಷಣಿಕ ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಬೆಂಬಲಿಸಿ.',
        ta: 'எங்கள் சமூக நல நடவடிக்கைகள், அன்னதான நிதி மற்றும் கல்வி திட்டங்களுக்கு ஆதரவளிக்கவும்.',
        te: 'మా సామాజిక సంక్షేమ కార్యక్రమాలు, అన్నదానం నిధి మరియు విద్యా కార్యక్రమాలకు మద్దతు ఇవ్వండి.'
      },
      ctaText: { en: 'Get Involved', hi: 'योगदान दें', kn: 'ಭಾಗವಹಿಸಿ', ta: 'பங்கேற்க', te: 'పాల్గొనండి' },
      ctaLink: '/donate'
    }
  ]

  const list = data.features && data.features.length > 0 ? data.features : defaultFeatures

  // Typography styles
  let titleClasses = "font-serif text-2xl md:text-3xl text-stone-900 dark:text-stone-100 text-center "
  let cardClasses = "group flex flex-col overflow-hidden transition-all duration-300 border "
  let cardTextClasses = "p-5 flex-1 flex flex-col justify-between "
  let cardTitleClasses = "font-bold text-base md:text-lg mb-2 text-stone-900 dark:text-white "
  let cardDescClasses = "text-xs md:text-sm text-stone-500 dark:text-stone-400 font-light leading-relaxed mb-4 "
  let btnClasses = "inline-flex items-center gap-1 text-xs font-bold transition-all "

  if (theme === 'heritage') {
    titleClasses = "font-serif text-3xl font-extrabold text-red-900 dark:text-[#F5DEB3] text-center"
    cardClasses += "bg-white dark:bg-red-950/20 border-red-900/10 dark:border-[#D4AF37]/20 hover:border-[#D4AF37] hover:shadow-xl rounded-2xl "
    cardTitleClasses += "font-serif text-red-950 dark:text-white font-extrabold "
    btnClasses += "text-red-800 dark:text-amber-400 hover:text-red-950 font-serif border-b border-transparent hover:border-red-900 "
  } else if (theme === 'modern') {
    titleClasses = "font-sans text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight text-center"
    cardClasses += "bg-white dark:bg-stone-900 border-stone-200/50 dark:border-stone-800 rounded-[2.2rem] hover:shadow-2xl hover:-translate-y-1 "
    cardTitleClasses += "font-sans font-black tracking-tight "
    btnClasses += "text-orange-600 hover:text-orange-700 font-sans "
  } else if (theme === 'divine-glow') {
    titleClasses = "font-serif text-3xl font-extrabold text-orange-900 dark:text-amber-400 text-center tracking-wide"
    cardClasses += "bg-white/80 dark:bg-stone-950/80 border-amber-500/20 dark:border-amber-500/30 rounded-[2rem] shadow-[0_4px_20px_rgba(234,88,12,0.03)] hover:border-amber-500 hover:shadow-[0_4px_30px_rgba(245,158,11,0.12)] backdrop-blur-sm "
    cardTitleClasses += "font-serif text-orange-950 dark:text-white tracking-wide "
    btnClasses += "text-amber-600 dark:text-amber-400 hover:text-orange-600 font-serif tracking-widest uppercase text-[10px] "
  } else {
    // Classic
    titleClasses = "font-serif text-3xl font-normal text-stone-900 dark:text-white text-center"
    cardClasses += "bg-white dark:bg-stone-950 border-stone-200/40 dark:border-stone-850 hover:shadow-md rounded-2xl "
    cardTitleClasses += "font-serif text-stone-900 dark:text-stone-150 "
    btnClasses += "text-saffron-600 hover:text-saffron-700 font-serif "
  }

  // Handle columns
  let gridColsClass = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
  const cols = settings?.columns ? Number(settings.columns) : 3
  if (cols === 2) {
    gridColsClass = "grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
  } else if (cols === 4) {
    gridColsClass = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
  }

  return (
    <div className="space-y-8 my-10 w-full">
      {data.title && (
        <div className="text-center">
          <h2 className={titleClasses}>{t(data.title)}</h2>
          <div className="h-[2px] w-12 bg-stone-200 dark:bg-stone-800 mx-auto mt-3" />
        </div>
      )}

      <div className={gridColsClass}>
        {list.map((feat, idx) => (
          <div key={idx} className={cardClasses}>
            {feat.image && (
              <div className="aspect-[16/10] relative w-full overflow-hidden bg-stone-100 dark:bg-stone-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={feat.image}
                  alt={feat.title ? t(feat.title) : 'Feature Image'}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>
            )}
            <div className={cardTextClasses}>
              <div className="mb-4">
                <h4 className={cardTitleClasses}>{feat.title ? t(feat.title) : 'Card Title'}</h4>
                {feat.description && (
                  <p className={cardDescClasses}>{t(feat.description)}</p>
                )}
              </div>
              {feat.ctaText && (
                <div className="pt-2">
                  <Link
                    href={feat.ctaLink || '#'}
                    className={btnClasses}
                  >
                    {t(feat.ctaText)} <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
