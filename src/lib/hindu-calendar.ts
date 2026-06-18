// Hindu Festival Auto-Calendar Utility
// Major festivals with approximate Gregorian dates for 2025

export interface HinduFestival {
  name: string
  nameHi: string
  nameKn: string
  nameTa: string
  nameTe: string
  description: string
  type: 'FESTIVAL' | 'POOJA' | 'CULTURAL'
  approximateMonth: number
  approximateDay: number
  duration: number
  deity?: string
  importance: 'major' | 'minor'
  emoji: string
}

export const HINDU_FESTIVALS_2025: HinduFestival[] = [
  { name: 'Makar Sankranti', nameHi: 'मकर संक्रांति', nameKn: 'ಮಕರ ಸಂಕ್ರಾಂತಿ', nameTa: 'பொங்கல்', nameTe: 'మకర సంక్రాంతి', description: 'Harvest festival marking the sun\'s entry into Capricorn', type: 'FESTIVAL', approximateMonth: 1, approximateDay: 14, duration: 1, importance: 'major', emoji: '🌾' },
  { name: 'Vasant Panchami', nameHi: 'वसंत पंचमी', nameKn: 'ವಸಂತ ಪಂಚಮಿ', nameTa: 'வசந்த பஞ்சமி', nameTe: 'వసంత పంచమి', description: 'Festival of Goddess Saraswati — patron of learning and arts', type: 'FESTIVAL', approximateMonth: 2, approximateDay: 2, duration: 1, deity: 'Saraswati', importance: 'major', emoji: '🎓' },
  { name: 'Maha Shivaratri', nameHi: 'महा शिवरात्रि', nameKn: 'ಮಹಾ ಶಿವರಾತ್ರಿ', nameTa: 'மகா சிவராத்திரி', nameTe: 'మహా శివరాత్రి', description: 'The great night of Lord Shiva — fasting and all-night vigil', type: 'FESTIVAL', approximateMonth: 2, approximateDay: 26, duration: 1, deity: 'Shiva', importance: 'major', emoji: '🔱' },
  { name: 'Holi', nameHi: 'होली', nameKn: 'ಹೋಳಿ', nameTa: 'ஹோலி', nameTe: 'హోలీ', description: 'Festival of colors celebrating victory of good over evil', type: 'FESTIVAL', approximateMonth: 3, approximateDay: 14, duration: 2, importance: 'major', emoji: '🎨' },
  { name: 'Ugadi / Gudi Padwa', nameHi: 'उगादि', nameKn: 'ಯುಗಾದಿ', nameTa: 'புத்தாண்டு', nameTe: 'ఉగాది', description: 'Hindu New Year — Kannada, Telugu and Marathi new year', type: 'FESTIVAL', approximateMonth: 3, approximateDay: 30, duration: 1, importance: 'major', emoji: '🪔' },
  { name: 'Ram Navami', nameHi: 'राम नवमी', nameKn: 'ರಾಮ ನವಮಿ', nameTa: 'ராம நவமி', nameTe: 'రామ నవమి', description: 'Birthday of Lord Rama — 9th day of Chaitra Navratri', type: 'FESTIVAL', approximateMonth: 4, approximateDay: 6, duration: 1, deity: 'Ram', importance: 'major', emoji: '🏹' },
  { name: 'Hanuman Jayanti', nameHi: 'हनुमान जयंती', nameKn: 'ಹನುಮಾನ್ ಜಯಂತಿ', nameTa: 'ஹனுமார் ஜெயந்தி', nameTe: 'హనుమాన్ జయంతి', description: 'Birth anniversary of Lord Hanuman', type: 'FESTIVAL', approximateMonth: 4, approximateDay: 12, duration: 1, deity: 'Hanuman', importance: 'major', emoji: '🐒' },
  { name: 'Akshaya Tritiya', nameHi: 'अक्षय तृतीया', nameKn: 'ಅಕ್ಷಯ ತೃತೀಯ', nameTa: 'அக்ஷய திருதியை', nameTe: 'అక్షయ తృతీయ', description: 'Auspicious day for new beginnings, gold purchases, and worship', type: 'POOJA', approximateMonth: 4, approximateDay: 30, duration: 1, importance: 'major', emoji: '🪙' },
  { name: 'Vat Savitri', nameHi: 'वट सावित्री', nameKn: 'ವಟ ಸಾವಿತ್ರಿ', nameTa: 'வட சாவித்ரி', nameTe: 'వట సావిత్రి', description: 'Festival where women pray for husbands\' long life under banyan tree', type: 'POOJA', approximateMonth: 6, approximateDay: 2, duration: 1, importance: 'minor', emoji: '🌳' },
  { name: 'Guru Purnima', nameHi: 'गुरु पूर्णिमा', nameKn: 'ಗುರು ಪೂರ್ಣಿಮಾ', nameTa: 'குரு பூர்ணிமா', nameTe: 'గురు పూర్ణిమ', description: 'Full moon day to honor spiritual teachers and gurus', type: 'POOJA', approximateMonth: 7, approximateDay: 10, duration: 1, importance: 'major', emoji: '📿' },
  { name: 'Nag Panchami', nameHi: 'नाग पंचमी', nameKn: 'ನಾಗ ಪಂಚಮಿ', nameTa: 'நாக பஞ்சமி', nameTe: 'నాగ పంచమి', description: 'Worship of serpent deities for protection and blessings', type: 'POOJA', approximateMonth: 7, approximateDay: 29, duration: 1, importance: 'minor', emoji: '🐍' },
  { name: 'Krishna Janmashtami', nameHi: 'जन्माष्टमी', nameKn: 'ಕೃಷ್ಣ ಜನ್ಮಾಷ್ಟಮಿ', nameTa: 'ஜன்மாஷ்டமி', nameTe: 'జన్మాష్టమి', description: 'Birthday of Lord Krishna — midnight celebrations with bhajans', type: 'FESTIVAL', approximateMonth: 8, approximateDay: 16, duration: 2, deity: 'Krishna', importance: 'major', emoji: '🪈' },
  { name: 'Ganesh Chaturthi', nameHi: 'गणेश चतुर्थी', nameKn: 'ಗಣೇಶ ಚತುರ್ಥಿ', nameTa: 'விநாயக சதுர்த்தி', nameTe: 'వినాయక చవితి', description: 'Ten-day festival celebrating the birth of Lord Ganesha', type: 'FESTIVAL', approximateMonth: 8, approximateDay: 27, duration: 10, deity: 'Ganesha', importance: 'major', emoji: '🐘' },
  { name: 'Navratri', nameHi: 'नवरात्रि', nameKn: 'ನವರಾತ್ರಿ', nameTa: 'நவராத்திரி', nameTe: 'నవరాత్రి', description: 'Nine nights of worship of Goddess Durga', type: 'FESTIVAL', approximateMonth: 10, approximateDay: 2, duration: 10, deity: 'Durga', importance: 'major', emoji: '🪔' },
  { name: 'Dussehra / Vijayadashami', nameHi: 'दशहरा', nameKn: 'ವಿಜಯದಶಮಿ', nameTa: 'விஜயதசமி', nameTe: 'విజయదశమి', description: 'Victory of Lord Rama over Ravana — triumph of good over evil', type: 'FESTIVAL', approximateMonth: 10, approximateDay: 12, duration: 1, importance: 'major', emoji: '🏹' },
  { name: 'Dhanteras', nameHi: 'धनतेरस', nameKn: 'ಧನತೇರಸ್', nameTa: 'தன்தேரஸ்', nameTe: 'ధన్తేరాస్', description: 'First day of Diwali — worship of Lord Dhanvantari and Lakshmi', type: 'FESTIVAL', approximateMonth: 10, approximateDay: 29, duration: 1, importance: 'major', emoji: '🪙' },
  { name: 'Diwali / Deepawali', nameHi: 'दीपावली', nameKn: 'ದೀಪಾವಳಿ', nameTa: 'தீபாவளி', nameTe: 'దీపావళి', description: 'Festival of Lights — celebrating Lord Rama\'s return to Ayodhya', type: 'FESTIVAL', approximateMonth: 10, approximateDay: 20, duration: 5, importance: 'major', emoji: '🎆' },
  { name: 'Karthik Purnima', nameHi: 'कार्तिक पूर्णिमा', nameKn: 'ಕಾರ್ತಿಕ ಪೂರ್ಣಿಮಾ', nameTa: 'கார்த்திகை பூர்ணிமா', nameTe: 'కార్తీక పూర్ణిమ', description: 'Holy full moon — lamp lighting at temples and riversides', type: 'FESTIVAL', approximateMonth: 11, approximateDay: 5, duration: 1, importance: 'major', emoji: '🌕' },
]

export function getFestivalsForYear(year: number): HinduFestival[] {
  return HINDU_FESTIVALS_2025
}

export function festivalToEventData(festival: HinduFestival, year: number, templeId: string) {
  const startDate = new Date(year, festival.approximateMonth - 1, festival.approximateDay)
  const endDate = new Date(year, festival.approximateMonth - 1, festival.approximateDay + festival.duration - 1)

  return {
    templeId,
    title: { en: festival.name, hi: festival.nameHi, kn: festival.nameKn, ta: festival.nameTa, te: festival.nameTe },
    description: { en: festival.description, hi: festival.description, kn: festival.description, ta: festival.description, te: festival.description },
    eventType: festival.type,
    startDate,
    endDate,
    location: 'Temple Premises',
    maxRegistrations: 0,
    registrationCount: 0,
    isRegistrationOpen: true,
    isFree: true,
    ticketPrice: null,
    posterUrl: null,
    status: 'UPCOMING',
  }
}
