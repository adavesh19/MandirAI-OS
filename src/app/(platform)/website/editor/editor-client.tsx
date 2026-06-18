'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { Input } from '@/components/ui/input'
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  Save, 
  Image as ImageIcon, 
  Smartphone, 
  Monitor, 
  RotateCw, 
  Loader2, 
  CheckCircle2, 
  Eye, 
  Layers,
  UploadCloud,
  FileText,
  Clock,
  Compass,
  Heart,
  BookOpen,
  MapPin,
  MessageSquare
} from 'lucide-react'

// Define the block interfaces
interface Block {
  id: string
  type: 'hero' | 'timings' | 'gallery' | 'text' | 'sevas' | 'features' | 'quote' | 'map' | 'form'
  data: any
  settings?: any
}

interface EditorClientProps {
  templeSlug: string
  templeName: string
}

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi (हिंदी)' },
  { code: 'kn', label: 'Kannada (ಕನ್ನಡ)' },
  { code: 'ta', label: 'Tamil (தமிழ்)' },
  { code: 'te', label: 'Telugu (తెలుగు)' }
]

export default function EditorClient({ templeSlug, templeName }: EditorClientProps) {
  const router = useRouter()
  const [blocks, setBlocks] = React.useState<Block[]>([])
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)
  const [saveStatus, setSaveStatus] = React.useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const [previewDevice, setPreviewDevice] = React.useState<'desktop' | 'mobile'>('desktop')
  const [previewKey, setPreviewKey] = React.useState(Date.now())
  const [expandedBlockId, setExpandedBlockId] = React.useState<string | null>(null)
  const [activeTemplate, setActiveTemplate] = React.useState<string>('classic')
  
  // Tab control for mobile view ('editor' controls or 'preview' site view)
  const [mobileTab, setMobileTab] = React.useState<'editor' | 'preview'>('editor')
  
  // Multi-language active language tab per block
  // Maps blockId -> langCode ('en', 'hi', etc.)
  const [activeLangTab, setActiveLangTab] = React.useState<Record<string, string>>({})

  // Media Picker state
  const [mediaPickerOpen, setMediaPickerOpen] = React.useState(false)
  const [mediaList, setMediaList] = React.useState<any[]>([])
  const [mediaLoading, setMediaLoading] = React.useState(false)
  const [mediaUploading, setMediaUploading] = React.useState(false)
  const mediaFileInputRef = React.useRef<HTMLInputElement>(null)
  const [activePickerTarget, setActivePickerTarget] = React.useState<{
    blockId: string
    field: string
    index?: number
  } | null>(null)

  // Fetch blocks from API
  const fetchBlocks = async () => {
    try {
      const res = await fetch('/api/website/blocks')
      const data = await res.json()
      if (res.ok) {
        setBlocks(data.blocks || [])
        // Expand the first block by default if it exists
        if (data.blocks && data.blocks.length > 0) {
          setExpandedBlockId(data.blocks[0].id)
        }
      }
    } catch (err) {
      console.error('Failed to fetch blocks', err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch media files for the picker
  const fetchMedia = async () => {
    setMediaLoading(true)
    try {
      const res = await fetch('/api/media')
      const data = await res.json()
      if (res.ok) {
        setMediaList(data.mediaList || [])
      }
    } catch (err) {
      console.error('Failed to fetch media', err)
    } finally {
      setMediaLoading(false)
    }
  }

  React.useEffect(() => {
    fetchBlocks()
    fetch('/api/settings/template')
      .then(res => res.json())
      .then(data => {
        if (data.templateId) setActiveTemplate(data.templateId)
      })
  }, [])

  // Save blocks to API
  const handleSave = async () => {
    setSaving(true)
    setSaveStatus('saving')
    try {
      // 1. Save Blocks layout
      const res = await fetch('/api/website/blocks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blocks })
      })

      // 2. Save active template theme choice
      const resTemplate = await fetch('/api/settings/template', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId: activeTemplate })
      })

      if (res.ok && resTemplate.ok) {
        setSaveStatus('success')
        // Refresh live preview
        setPreviewKey(Date.now())
        setTimeout(() => setSaveStatus('idle'), 2500)
      } else {
        setSaveStatus('error')
        setTimeout(() => setSaveStatus('idle'), 3000)
      }
    } catch (err) {
      console.error('Error saving blocks:', err)
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 3000)
    } finally {
      setSaving(false)
    }
  }

  // Reordering helpers
  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const nextIndex = direction === 'up' ? index - 1 : index + 1
    if (nextIndex < 0 || nextIndex >= blocks.length) return

    const updated = [...blocks]
    const temp = updated[index]
    updated[index] = updated[nextIndex]
    updated[nextIndex] = temp
    setBlocks(updated)
  }

  const deleteBlock = (id: string) => {
    if (confirm('Are you sure you want to delete this section from the page?')) {
      setBlocks(prev => prev.filter(b => b.id !== id))
      if (expandedBlockId === id) {
        setExpandedBlockId(null)
      }
    }
  }

  const addBlock = (type: 'hero' | 'timings' | 'gallery' | 'text' | 'sevas' | 'features' | 'quote' | 'map' | 'form') => {
    const id = `${type}-${Date.now()}`
    let newBlock: Block

    switch (type) {
      case 'hero':
        newBlock = {
          id,
          type,
          settings: { alignment: 'center', backgroundImage: '', symbol: 'om' },
          data: {
            title: { 
              en: 'Welcome to ' + templeName, 
              hi: 'आपका स्वागत है ' + templeName + ' में', 
              kn: templeName + ' ಕ್ಕೆ ಸುಸ್ವಾಗತ', 
              ta: 'வரவேற்கிறோம் ' + templeName + ' க்கு', 
              te: templeName + ' కు సుస్వాగతం' 
            },
            subtitle: { 
              en: 'A place of peace, devotion, and spiritual harmony.', 
              hi: 'शांति, भक्ति और आध्यात्मिक सद्भाव का स्थान।', 
              kn: 'ಶಾಂತಿ, ಭಕ್ತಿ ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ಸಾಮರಸ್ಯದ ಸ್ಥಳ.', 
              ta: 'அமைதி, பக்தி மற்றும் ஆன்மீக நல்லிணக்கத்தின் இடம்.', 
              te: 'ప్రశాంతత, భక్తి మరియు ఆధ్యాత్మిక సామరస్యం ఉన్న ప్రదేశం.' 
            },
            ctaText: {
              en: 'Make an Offering',
              hi: 'भेंट चढ़ाएं',
              kn: 'ದೇಣಿಗೆ ನೀಡಿ',
              ta: 'நன்கொடை',
              te: 'విరాళం ఇవ్వండి'
            },
            ctaLink: '/donate'
          }
        }
        break
      case 'timings':
        newBlock = {
          id,
          type,
          settings: {},
          data: {
            morning: { 
              en: '06:00 AM - 12:00 PM', 
              hi: 'सुबह 06:00 बजे - दोपहर 12:00 बजे', 
              kn: 'ಬೆಳಗ್ಗೆ 06:00 - ಮಧ್ಯಾಹ್ನ 12:00', 
              ta: 'காலை 06:00 மணி - மதியம் 12:00 மணி', 
              te: 'ఉదయం 06:00 - మధ్యాహ్నం 12:00' 
            },
            evening: { 
              en: '04:00 PM - 09:00 PM', 
              hi: 'शाम 04:00 बजे - रात 09:00 बजे', 
              kn: 'ಸಂಜೆ 04:00 - ರಾತ್ರಿ 09:00', 
              ta: 'மாலை 04:00 மணி - இரவு 09:00 மணி', 
              te: 'సాయంత్రం 04:00 - రాత్రి 09:00' 
            },
            location: { 
              en: 'Temple Chowk, Main Street', 
              hi: 'मंदिर चौक, मुख्य मार्ग', 
              kn: 'ದೇವಸ್ಥಾನ ಚೌಕ, ಮುಖ್ಯ ರಸ್ತೆ', 
              ta: 'கோவில் சவுக், பிரதான சாலை', 
              te: 'దేవాలయ చౌక్, ప్రధాన వీధి' 
            },
            contact: { 
              en: '+91 80 1234 5678', 
              hi: '+91 80 1234 5678', 
              kn: '+91 80 1234 5678', 
              ta: '+91 80 1234 5678', 
              te: '+91 80 1234 5678' 
            }
          }
        }
        break
      case 'gallery':
        newBlock = {
          id,
          type,
          settings: { columns: '3' },
          data: {
            title: { 
              en: 'Sacred Gallery', 
              hi: 'पवित्र चित्र गैलरी', 
              kn: 'ಪವಿತ್ರ ಗ್ಯಾಲರಿ', 
              ta: 'புனித கேலரி', 
              te: 'పవిత్ర గ్యాలరీ' 
            },
            images: [
              { 
                url: 'https://images.unsplash.com/photo-1602631985686-2bb068645004?auto=format&fit=crop&w=600&q=80', 
                caption: { 
                  en: 'Temple Sanctum', 
                  hi: 'मंदिर गर्भगृह', 
                  kn: 'ದೇವಸ್ಥಾನದ ಗರ್ಭಗುಡಿ', 
                  ta: 'கோவில் கருவறை', 
                  te: 'దేవాలయ గర్భగుడి' 
                } 
              },
              { 
                url: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=600&q=80', 
                caption: { 
                  en: 'Prayer Hall', 
                  hi: 'प्रार्थना सभा', 
                  kn: 'ಪ್ರಾರ್ಥನಾ ಮಂದಿರ', 
                  ta: 'பிரார்த்தனை கூடம்', 
                  te: 'ప్రార్థనా మందిరం' 
                } 
              },
              { 
                url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80', 
                caption: { 
                  en: 'Evening Aarti', 
                  hi: 'संध्या आरती', 
                  kn: 'ಸಂಜೆ ಆರತಿ', 
                  ta: 'மாலை ஆரத்தி', 
                  te: 'సాయంత్రం హారతి' 
                } 
              }
            ]
          }
        }
        break
      case 'text':
        newBlock = {
          id,
          type,
          settings: { align: 'center', size: 'medium' },
          data: {
            heading: { 
              en: 'Our Sacred Journey', 
              hi: 'हमारी पवित्र यात्रा', 
              kn: 'ನಮ್ಮ ಪವಿತ್ರ ಪ್ರಯಾಣ', 
              ta: 'எங்கள் ஆன்மீக பயணம்', 
              te: 'మన పవిత్ర ప్రయాణం' 
            },
            html: { 
              en: '<p>Welcome to our sacred temple. Established with the vision to spread devotion and divine energy, the temple has been a center for spiritual seekers and devotees for decades.</p>\n<p>May the divine blessings bring peace, prosperity, and happiness to you and your loved ones.</p>', 
              hi: '<p>हमारे पवित्र मंदिर में आपका स्वागत है। भक्ति और दिव्य ऊर्जा का प्रसार करने के उद्देश्य से स्थापित यह मंदिर दशकों से आध्यात्मिक साधकों और भक्तों का केंद्र रहा है।</p>\n<p>दिव्य आशीर्वाद आपके और आपके प्रियजनों के लिए शांति, समृद्धि और प्रसन्नता लेकर आए।</p>', 
              kn: '<p>ನಮ್ಮ ಪವಿತ್ರ ದೇವಾಲಯಕ್ಕೆ ಸುಸ್ವಾಗತ. ಭಕ್ತಿ ಮತ್ತು ದೈವಿಕ ಶಕ್ತಿಯನ್ನು ಹರಡುವ ದೃಷ್ಟಿಯೊಂದಿಗೆ ಸ್ಥಾಪಿತವಾದ ಈ ದೇವಾಲಯವು ದಶಕಗಳಿಂದ ಆಧ್ಯಾತ್ಮಿಕ ಸಾಧಕರು ಮತ್ತು ಭಕ್ತರ ಕೇಂದ್ರವಾಗಿದೆ.</p>\n<p>ದೈವಿಕ ಆಶೀರ್ವಾದವು ನಿಮಗೆ ಮತ್ತು ನಿಮ್ಮ ಪ್ರೀತಿಪಾತ್ರರಿಗೆ ಶಾಂತಿ, ಸಮೃದ್ಧಿ ಮತ್ತು ಸಂತೋಷವನ್ನು ತರಲಿ.</p>', 
              ta: '<p>எங்கள் புனித கோவிலுக்கு உங்களை வரவேற்கிறோம். பக்தி மற்றும் தெய்வீக ஆற்றலை பரப்புவதற்கான தொலைநோக்குடன் நிறுவப்பட்ட இந்த தலம் பல தசாப்தங்களாக ஆன்மீக தேடுபவர்களுக்கும் பக்தர்களுக்கும் மையமாக இருந்து வருகிறது.</p>\n<p>தெய்வீக ஆசீர்வாதம் உங்களுக்கும் உங்கள் அன்புக்குரியவர்களுக்கும் அமைதி, வளம் மற்றும் மகிழ்ச்சியைக் கொண்டுவரட்டும்.</p>', 
              te: '<p>మా పవిత్ర దేవాలయానికి స్వాగతం. భక్తి మరియు దైవిక శక్తిని వ్యాప్తి చేసే లక్ష్యంతో స్థాపించబడిన ఈ ఆలయం దశాబ్దాలుగా ఆధ్యాత్మిక సాధకులకు మరియు భక్తులకు కేంద్రంగా ఉంది.</p>\n<p>దైవ ఆశీస్సులు మీకు మరియు మీ ప్రియమైనవారికి శాంతి, శ్రేయస్సు మరియు సంతోషాన్ని ప్రసాదించుగాక.</p>' 
            }
          }
        }
        break
      case 'sevas':
        newBlock = {
          id,
          type,
          settings: { columns: '3', backgroundStyle: 'light' },
          data: {
            title: {
              en: 'Sacred Sevas & Offerings',
              hi: 'पवित्र सेवा और भेंट',
              kn: 'ಪವಿತ್ರ ಸೇವೆಗಳು ಮತ್ತು ಕಾಣಿಕೆಗಳು',
              ta: 'புனித சேவைகள் மற்றும் காணிக்கைகள்',
              te: 'పవిత్ర sేవలు మరియు కానుకలు'
            },
            subtitle: {
              en: 'Participate in auspicious rituals and support our temple.',
              hi: 'शुभ अनुष्ठानों में भाग लें और हमारे मंदिर का समर्थन करें।',
              kn: 'ಶುಭ ಆಚರಣೆಗಳಲ್ಲಿ ಭಾಗವಹಿಸಿ ಮತ್ತು ನಮ್ಮ ದೇವಾಲಯವನ್ನು ಬೆಂಬಲಿಸಿ.',
              ta: 'மங்களகரமான சடங்குகளில் பங்கேற்று எங்கள் கோவிலுக்கு ஆதரவளிக்கவும்.',
              te: 'శుభ ప్రదమైన పూజలలో పాల్గొని మా దేవాలయమును రక్షించండి.'
            }
          }
        }
        break
      case 'features':
        newBlock = {
          id,
          type,
          settings: { columns: '3' },
          data: {
            title: {
              en: 'Temple Highlights',
              hi: 'मंदिर के मुख्य आकर्षण',
              kn: 'ದೇವಾಲಯದ ಮುಖ್ಯಾಂಶಗಳು',
              ta: 'கோவில் சிறப்பம்சங்கள்',
              te: 'దేవాలయం ముఖ్య అంశాలు'
            },
            features: [
              {
                image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=600&q=80',
                title: { en: 'Temple History', hi: 'मंदिर का इतिहास', kn: 'ದೇವಾಲಯದ ಇತಿಹಾಸ', ta: 'கோவில் வரலாறு', te: 'దేవాలయ చరిత్ర' },
                description: {
                  en: 'Discover ancient legends and historical origins.',
                  hi: 'प्राचीन किंवदंतियों और ऐतिहासिक उत्पत्ति की खोज करें।',
                  kn: 'ಪುರಾತನ ದಂತಕಥೆಗಳು ಮತ್ತು ಇತಿಹಾಸ ಮೂಲಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.',
                  ta: 'பழங்கால புராணங்களையும் வரலாற்று தோற்றங்களையும் கண்டறியவும்.',
                  te: 'పురాతన గాథలు మరియు చారిత్రక మూలాలను కనుగొనండి.'
                },
                ctaText: { en: 'Read History', hi: 'इतिहास पढ़ें', kn: 'ಇತಿಹಾಸ ಓದಿ', ta: 'வரலாறு வாசிக்க', te: 'చరిత్ర చదవండి' },
                ctaLink: '/history'
              },
              {
                image: 'https://images.unsplash.com/photo-1602631985686-2bb068645004?auto=format&fit=crop&w=600&q=80',
                title: { en: 'Weekly Pujas', hi: 'साप्ताहिक पूजा', kn: 'ಸಾಪ್ತಾಹಿಕ ಪೂಜೆಗಳು', ta: 'வாராந்திர பூஜைகள்', te: 'వార పూజలు' },
                description: {
                  en: 'View timings and special seva descriptions.',
                  hi: 'समय और विशेष सेवा विवरण देखें।',
                  kn: 'ಸಮಯ ಮತ್ತು ವಿಶೇಷ ಸೇವಾ ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ.',
                  ta: 'நேரங்களையும் சிறப்பு சேவை விவரங்களையும் காண்க.',
                  te: 'దర్శన సమయాలు మరియు ప్రత్యేక సేవలు చూడండి.'
                },
                ctaText: { en: 'View Sevas', hi: 'सेवाएं देखें', kn: 'ಸೇವೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ', ta: 'சேவைகளை காண்க', te: 'సేవలు చూడండి' },
                ctaLink: '/donate'
              }
            ]
          }
        }
        break
      case 'quote':
        newBlock = {
          id,
          type,
          settings: { alignment: 'center', borderStyle: 'ornate' },
          data: {
            shloka: {
              en: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।'
            },
            translation: {
              en: 'You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions.',
              hi: 'कर्म पर ही तुम्हारा अधिकार है, उसके फलों पर कभी नहीं।',
              kn: 'ಕರ್ಮದಲ್ಲಿ ಮಾತ್ರ ನಿನಗೆ ಅಧಿಕಾರವಿರಲಿ, ಅದರ ಫಲಗಳಲ್ಲಿ ಎಂದೂ ಬೇಡ.',
              ta: 'உன் கடமைகளைச் செய்ய மட்டுமே உனக்கு அதிகாரம் உண்டு, அதன் பலன்களில் இல்லை.',
              te: 'కర్మలను ఆచరించుటకే నీకు అధికారము కలదు, వాటి ఫలములపై ఎన్నడూ లేదు.'
            },
            source: {
              en: 'Bhagavad Gita 2.47',
              hi: 'भगवद गीता २.४७',
              kn: 'ಭಗವದ್ಗೀತೆ ೨.೪೭',
              ta: 'பகவத் கீதை 2.47',
              te: 'భగవద్గీత 2.47'
            }
          }
        }
        break
      case 'map':
        newBlock = {
          id,
          type,
          settings: { zoom: '15', height: '450px' },
          data: {
            addressQuery: {
              en: 'Somnath Temple, Prabhas Patan, Gujarat',
              hi: 'सोमनाथ मंदिर, प्रभास पाटन, गुजरात',
              kn: 'ಸೋಮನಾಥ ದೇವಾಲಯ, ಪ್ರಭಾಸ ಪಟನ, ಗುಜರಾತ್',
              ta: 'சோமநாதர் கோயில், பிரபாஸ் படான், குஜராத்',
              te: 'సోమనాథ్ దేవాలయం, ప్రభాస్ పటాన్, గుజరాత్'
            }
          }
        }
        break
      case 'form':
        newBlock = {
          id,
          type,
          settings: { formType: 'contact' },
          data: {
            title: {
              en: 'Send a Message',
              hi: 'हमें संदेश भेजें',
              kn: 'ನಮಗೆ ಸಂದೇಶ ಕಳುಹಿಸಿ',
              ta: 'எங்களுக்கு செய்தி அனுப்பவும்',
              te: 'మాకు సందేశం పంపండి'
            },
            description: {
              en: 'Have questions? Get in touch with the temple administration office.',
              hi: 'कोई प्रश्न हैं? मंदिर प्रशासन कार्यालय से संपर्क करें।',
              kn: 'ಪ್ರಶ್ನೆಗಳಿವೆಯೇ? ದೇವಸ್ಥಾನದ ಆಡಳಿತ ಕಚೇರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ.',
              ta: 'கேள்விகள் உள்ளதா? கோவில் நிர்வாக அலுவலகத்தை தொடர்பு கொள்ளவும்.',
              te: 'ప్రశ్నలు ఉన్నాయా? దేవాలయ కార్యాలయాన్ని సంప్రదించండి.'
            },
            successMessage: {
              en: 'Message sent successfully! We will get back to you soon.',
              hi: 'संदेश सफलतापूर्वक भेजा गया! हम आपसे जल्द ही संपर्क करेंगे।',
              kn: 'ಸಂದೇಶ ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ! ನಾವು ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್కಿಸುತ್ತೇವೆ.',
              ta: 'செய்தி வெற்றிகரமாக அனுப்பப்பட்டது! விரைவில் நாங்கள் உங்களைத் தொடர்புகொள்வோம்.',
              te: 'సందేశం విజయవంతంగా పంపబడింది! మేము త్వరలోనే మిమ్మల్ని సంప్రదిస్తాము.'
            }
          }
        }
        break
    }

    setBlocks(prev => [...prev, newBlock])
    setExpandedBlockId(id)
    setActiveLangTab(prev => ({ ...prev, [id]: 'en' }))
  }
  // Duplicate a block
  const duplicateBlock = (id: string, index: number) => {
    const target = blocks.find(b => b.id === id)
    if (!target) return
    const cloned: Block = {
      ...target,
      id: `${target.type}-${Date.now()}`,
      data: JSON.parse(JSON.stringify(target.data)),
      settings: JSON.parse(JSON.stringify(target.settings || {}))
    }
    const updated = [...blocks]
    updated.splice(index + 1, 0, cloned)
    setBlocks(updated)
    setExpandedBlockId(cloned.id)
  }

  // Insert HTML tag helper for Text block content
  const insertHtmlTag = (blockId: string, lang: string, tag: 'b' | 'i' | 'h3' | 'p' | 'br' | 'ul', textareaId: string) => {
    const textarea = document.getElementById(textareaId) as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const text = textarea.value
    const selected = text.substring(start, end)

    let replacement = ''
    switch (tag) {
      case 'b':
        replacement = `<b>${selected || 'Bold Text'}</b>`
        break
      case 'i':
        replacement = `<i>${selected || 'Italic Text'}</i>`
        break
      case 'h3':
        replacement = `<h3 class="font-serif font-bold text-xl text-stone-900 dark:text-white mt-4 mb-2">${selected || 'Section Heading'}</h3>\n`
        break
      case 'p':
        replacement = `<p class="mb-4">${selected || 'Paragraph content...'}</p>\n`
        break
      case 'br':
        replacement = `${text.substring(0, start)}<br/>${text.substring(end)}`
        break
      case 'ul':
        replacement = `<ul class="list-disc pl-5 mb-4 space-y-1">\n  <li>${selected || 'List item 1'}</li>\n  <li>List item 2</li>\n</ul>\n`
        break
    }

    let newText = ''
    if (tag === 'br') {
      newText = replacement
    } else {
      newText = text.substring(0, start) + replacement + text.substring(end)
    }

    updateBlockText(blockId, ['html'], lang, newText)

    // Refocus
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + replacement.length, start + replacement.length)
    }, 50)
  }

  // Update block text fields dynamically
  const updateBlockText = (blockId: string, fieldPath: string[], lang: string, val: string) => {
    setBlocks(prev => prev.map(block => {
      if (block.id !== blockId) return block

      const updated = { ...block } as any
      let current = updated

      // Traverse to the parent object of the field we want to change
      for (let i = 0; i < fieldPath.length - 1; i++) {
        const key = fieldPath[i]
        current[key] = { ...current[key] }
        current = current[key]
      }

      const lastKey = fieldPath[fieldPath.length - 1]
      current[lastKey] = {
        ...(current[lastKey] || {}),
        [lang]: val
      }

      return updated
    }))
  }

  // General settings update (non-multilingual)
  const updateBlockSetting = (blockId: string, settingKey: string, val: any) => {
    setBlocks(prev => prev.map(block => {
      if (block.id !== blockId) return block
      return {
        ...block,
        settings: {
          ...(block.settings || {}),
          [settingKey]: val
        }
      }
    }))
  }

  // Open Media Picker
  const openMediaPicker = (blockId: string, field: string, index?: number) => {
    setActivePickerTarget({ blockId, field, index })
    fetchMedia()
    setMediaPickerOpen(true)
  }

  // Handle selected image from picker
  const handleSelectMedia = (url: string) => {
    if (!activePickerTarget) return

    const { blockId, field, index } = activePickerTarget

    setBlocks(prev => prev.map(block => {
      if (block.id !== blockId) return block

      const updated = { ...block }
      if (block.type === 'hero' && field === 'backgroundImage') {
        updated.settings = { ...updated.settings, backgroundImage: url }
      } else if (block.type === 'gallery' && field === 'gallery' && typeof index === 'number') {
        const updatedImages = [...(updated.data.images || [])]
        updatedImages[index] = { ...updatedImages[index], url }
        updated.data = { ...updated.data, images: updatedImages }
      } else if (block.type === 'features' && field === 'features' && typeof index === 'number') {
        const updatedFeatures = [...(updated.data.features || [])]
        updatedFeatures[index] = { ...updatedFeatures[index], image: url }
        updated.data = { ...updated.data, features: updatedFeatures }
      }

      return updated
    }))

    setMediaPickerOpen(false)
    setActivePickerTarget(null)
  }

  // Media upload from picker modal
  const handlePickerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setMediaUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        body: formData
      })
      
      if (res.ok) {
        // Refresh media list
        fetchMedia()
      } else {
        const data = await res.json()
        alert(data.error || 'Failed to upload image')
      }
    } catch (err) {
      console.error(err)
      alert('Upload failed')
    } finally {
      setMediaUploading(false)
      if (mediaFileInputRef.current) mediaFileInputRef.current.value = ''
    }
  }

  // Add image card to gallery block
  const addGalleryImage = (blockId: string) => {
    setBlocks(prev => prev.map(block => {
      if (block.id !== blockId) return block
      const images = [...(block.data.images || [])]
      images.push({
        url: 'https://images.unsplash.com/photo-1602631985686-2bb068645004?auto=format&fit=crop&w=600&q=80',
        caption: { en: 'New Photo', hi: '', kn: '', ta: '', te: '' }
      })
      return {
        ...block,
        data: {
          ...block.data,
          images
        }
      }
    }))
  }

  // Remove image card from gallery block
  const deleteGalleryImage = (blockId: string, index: number) => {
    if (confirm('Are you sure you want to remove this photo?')) {
      setBlocks(prev => prev.map(block => {
        if (block.id !== blockId) return block
        const images = [...(block.data.images || [])].filter((_, i) => i !== index)
        return {
          ...block,
          data: {
            ...block.data,
            images
          }
        }
      }))
    }
  }

  // Update gallery caption text
  const updateGalleryCaption = (blockId: string, index: number, lang: string, val: string) => {
    setBlocks(prev => prev.map(block => {
      if (block.id !== blockId) return block
      const images = [...(block.data.images || [])]
      images[index] = {
        ...images[index],
        caption: {
          ...(images[index].caption || {}),
          [lang]: val
        }
      }
      return {
        ...block,
        data: {
          ...block.data,
          images
        }
      }
    }))
  }

  const getLanguageTab = (blockId: string) => {
    return activeLangTab[blockId] || 'en'
  }

  const setLanguageTab = (blockId: string, code: string) => {
    setActiveLangTab(prev => ({ ...prev, [blockId]: code }))
  }

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] min-h-[500px]">
      {/* Mobile view segment toggle */}
      <div className="flex lg:hidden bg-stone-100 dark:bg-stone-950 p-1 rounded-xl border border-stone-200/50 dark:border-stone-850 mb-4 shrink-0">
        <button
          onClick={() => setMobileTab('editor')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            mobileTab === 'editor'
              ? 'bg-white text-stone-900 dark:bg-stone-900 dark:text-white shadow-sm font-extrabold'
              : 'text-stone-450 hover:text-stone-750'
          }`}
        >
          Editor Controls
        </button>
        <button
          onClick={() => setMobileTab('preview')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            mobileTab === 'preview'
              ? 'bg-white text-stone-900 dark:bg-stone-900 dark:text-white shadow-sm font-extrabold'
              : 'text-stone-450 hover:text-stone-750'
          }`}
        >
          Live Preview
        </button>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden min-h-0">
        {/* ─────────────────────────────────────────────────────────
            LEFT PANEL: Sidebar editor controls
        ───────────────────────────────────────────────────────── */}
        <div className={`w-full lg:w-[460px] bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl flex-col overflow-hidden h-full shadow-sm ${
          mobileTab === 'editor' ? 'flex' : 'hidden lg:flex'
        }`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-stone-100 dark:border-stone-850 flex items-center justify-between bg-stone-50/50 dark:bg-stone-950/20 shrink-0">
          <div className="flex items-center gap-3">
            <Link href="/website">
              <Button variant="outline" size="icon" className="rounded-xl h-9 w-9 border-stone-200 dark:border-stone-700">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h3 className="font-heading font-bold text-stone-900 dark:text-stone-100 text-sm">Page Builder</h3>
              <p className="text-[10px] text-stone-400 font-semibold uppercase">Home Layout Blocks</p>
            </div>
          </div>
          
          <Button 
            onClick={handleSave} 
            disabled={saving || loading}
            size="sm"
            className="gradient-primary text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-saffron-500/10 hover:shadow-saffron-500/20 transition-all"
          >
            {saving ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Saving...
              </>
            ) : saveStatus === 'success' ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                Saved!
              </>
            ) : (
              <>
                <Save className="h-3.5 w-3.5" />
                Save Layout
              </>
            )}
          </Button>
        </div>

        {/* Scrollable Layout Blocks content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-stone-400">
              <Loader2 className="h-8 w-8 text-saffron-600 animate-spin mb-2" />
              <p className="text-xs font-semibold">Loading blocks catalog...</p>
            </div>
          ) : blocks.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-stone-200 dark:border-stone-800 rounded-xl bg-stone-50/50 dark:bg-stone-950/10">
              <Layers className="h-10 w-10 text-stone-300 dark:text-stone-750 mx-auto mb-3" />
              <h4 className="font-bold text-stone-700 dark:text-stone-300 text-sm">No page blocks found</h4>
              <p className="text-xs text-stone-450 dark:text-stone-550 max-w-[280px] mx-auto mt-1 mb-4">
                Your homepage is currently empty. Add blocks below to construct your temple layout.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Button size="sm" variant="outline" className="text-xs" onClick={() => addBlock('hero')}>+ Hero</Button>
                <Button size="sm" variant="outline" className="text-xs" onClick={() => addBlock('timings')}>+ Timings</Button>
                <Button size="sm" variant="outline" className="text-xs" onClick={() => addBlock('gallery')}>+ Gallery</Button>
                <Button size="sm" variant="outline" className="text-xs" onClick={() => addBlock('text')}>+ Text</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {blocks.map((block, index) => {
                const isExpanded = expandedBlockId === block.id
                const activeLang = getLanguageTab(block.id)

                return (
                  <Card 
                    key={block.id} 
                    className={`border transition-all duration-200 ${
                      isExpanded 
                        ? 'border-saffron-400 dark:border-saffron-850 shadow-sm ring-1 ring-saffron-400/20 bg-white dark:bg-stone-900' 
                        : 'border-stone-200 dark:border-stone-800 bg-stone-50/30 hover:bg-stone-50/70'
                    }`}
                  >
                    {/* Block Header */}
                    <div 
                      className="p-3.5 flex items-center justify-between cursor-pointer select-none"
                      onClick={() => setExpandedBlockId(isExpanded ? null : block.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center shrink-0">
                          {block.type === 'hero' && <Compass className="h-4 w-4 text-amber-500" />}
                          {block.type === 'timings' && <Clock className="h-4 w-4 text-emerald-500" />}
                          {block.type === 'gallery' && <ImageIcon className="h-4 w-4 text-purple-500" />}
                          {block.type === 'text' && <FileText className="h-4 w-4 text-blue-500" />}
                          {block.type === 'sevas' && <Heart className="h-4 w-4 text-rose-500" />}
                          {block.type === 'features' && <Layers className="h-4 w-4 text-indigo-500" />}
                          {block.type === 'quote' && <BookOpen className="h-4 w-4 text-amber-600" />}
                          {block.type === 'map' && <MapPin className="h-4 w-4 text-red-500" />}
                          {block.type === 'form' && <MessageSquare className="h-4 w-4 text-sky-500" />}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wide">
                            {block.type === 'hero' && 'Hero Banner'}
                            {block.type === 'timings' && 'Darshan Timings'}
                            {block.type === 'gallery' && 'Photo Gallery'}
                            {block.type === 'text' && 'Rich Text Section'}
                            {block.type === 'sevas' && 'Sevas Grid'}
                            {block.type === 'features' && 'Highlight Columns'}
                            {block.type === 'quote' && 'Holy Quote / Shloka'}
                            {block.type === 'map' && 'Interactive Map'}
                            {block.type === 'form' && 'Devotee Form Addon'}
                          </p>
                          <p className="text-[10px] text-stone-400 font-light truncate max-w-[200px]">
                            {block.type === 'hero' && (block.data.title?.en || 'Welcome Banner')}
                            {block.type === 'timings' && (block.data.location?.en || 'Location/Timings')}
                            {block.type === 'gallery' && (block.data.title?.en || 'Photos Collection')}
                            {block.type === 'text' && (block.data.heading?.en || 'Story/About Text')}
                            {block.type === 'sevas' && (block.data.title?.en || 'Sacred Sevas')}
                            {block.type === 'features' && (block.data.title?.en || 'Highlights')}
                            {block.type === 'quote' && (block.data.source?.en || 'Shloka Card')}
                            {block.type === 'map' && (block.data.addressQuery?.en || 'Map Location')}
                            {block.type === 'form' && (block.data.title?.en || 'Devotee Form')}
                          </p>
                        </div>
                      </div>

                      {/* Header Actions */}
                      <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 rounded-md text-stone-400 hover:text-stone-700 disabled:opacity-30"
                          disabled={index === 0}
                          onClick={() => moveBlock(index, 'up')}
                        >
                          <ChevronUp className="h-3.5 w-3.5" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 rounded-md text-stone-400 hover:text-stone-700 disabled:opacity-30"
                          disabled={index === blocks.length - 1}
                          onClick={() => moveBlock(index, 'down')}
                        >
                          <ChevronDown className="h-3.5 w-3.5" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 rounded-md text-stone-400 hover:text-saffron-650"
                          onClick={() => duplicateBlock(block.id, index)}
                          title="Duplicate/Clone Block"
                        >
                          <Layers className="h-3.5 w-3.5" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 rounded-md text-stone-400 hover:text-red-650"
                          onClick={() => deleteBlock(block.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>

                    {/* Block Editor Form */}
                    {isExpanded && (
                      <CardContent className="p-4 pt-0 border-t border-stone-100 dark:border-stone-850 bg-white dark:bg-stone-900 space-y-4">
                        {/* Language Selection Tabs */}
                        <div className="flex flex-wrap gap-1 border-b border-stone-100 dark:border-stone-850 pb-2 mb-2 justify-between items-center">
                          <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Edit Lang:</span>
                          <div className="flex gap-0.5">
                            {LANGUAGES.map(lang => (
                              <button
                                key={lang.code}
                                onClick={() => setLanguageTab(block.id, lang.code)}
                                className={`text-[10px] px-2 py-1 font-bold rounded-md transition-all uppercase ${
                                  activeLang === lang.code
                                    ? 'bg-saffron-50 text-saffron-700 dark:bg-saffron-950/40 dark:text-saffron-400 font-extrabold border border-saffron-200'
                                    : 'text-stone-450 hover:bg-stone-50 dark:hover:bg-stone-800'
                                }`}
                              >
                                {lang.code}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Block Type Fields */}
                        {block.type === 'hero' && (
                          <div className="space-y-3 text-xs">
                            <div className="space-y-1">
                              <label className="font-semibold text-stone-500">Banner Title ({activeLang.toUpperCase()})</label>
                              <Input 
                                value={block.data.title?.[activeLang] || ''}
                                onChange={e => updateBlockText(block.id, ['title'], activeLang, e.target.value)}
                                className="h-8 rounded-lg text-xs"
                                placeholder={`Enter title in ${LANGUAGES.find(l => l.code === activeLang)?.label}`}
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="font-semibold text-stone-500">Banner Subtitle ({activeLang.toUpperCase()})</label>
                              <textarea
                                value={block.data.subtitle?.[activeLang] || ''}
                                onChange={e => updateBlockText(block.id, ['subtitle'], activeLang, e.target.value)}
                                className="w-full text-xs p-2.5 rounded-lg border border-stone-200 dark:border-stone-750 bg-transparent min-h-[60px]"
                                placeholder={`Enter subtitle description in ${LANGUAGES.find(l => l.code === activeLang)?.label}`}
                              />
                            </div>
                            <div className="space-y-1 pt-1">
                              <label className="font-semibold text-stone-500 block">Banner Background Image</label>
                              <div className="flex gap-2">
                                <Input 
                                  value={block.settings?.backgroundImage || ''}
                                  onChange={e => updateBlockSetting(block.id, 'backgroundImage', e.target.value)}
                                  className="h-8 rounded-lg text-xs flex-1"
                                  placeholder="/uploads/custom-image.jpg or https://"
                                />
                                <Button 
                                  onClick={() => openMediaPicker(block.id, 'backgroundImage')}
                                  variant="outline" 
                                  size="sm"
                                  className="h-8 rounded-lg flex items-center gap-1 text-stone-550 text-xs shrink-0"
                                >
                                  <ImageIcon className="h-3.5 w-3.5 text-saffron-600" />
                                  Browse
                                </Button>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <label className="font-semibold text-stone-500">Banner Alignment</label>
                              <select 
                                value={block.settings?.alignment || 'center'}
                                onChange={e => updateBlockSetting(block.id, 'alignment', e.target.value)}
                                className="w-full h-8 text-xs px-2 rounded-lg border border-stone-200 dark:border-stone-750 bg-white dark:bg-stone-900"
                              >
                                <option value="center">Centered</option>
                                <option value="left">Left Aligned</option>
                                <option value="right">Right Aligned</option>
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className="font-semibold text-stone-500">Deity Symbol / Badge</label>
                              <select 
                                value={block.settings?.symbol || 'om'}
                                onChange={e => updateBlockSetting(block.id, 'symbol', e.target.value)}
                                className="w-full h-8 text-xs px-2 rounded-lg border border-stone-200 dark:border-stone-750 bg-white dark:bg-stone-900"
                              >
                                <option value="om">🕉️ Om / Sacred presence</option>
                                <option value="flag">🚩 Holy Saffron Flag</option>
                                <option value="lamp">🪔 Devotional Oil Lamp</option>
                                <option value="none">No Symbol (Clean Text)</option>
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className="font-semibold text-stone-500">CTA Button Text ({activeLang.toUpperCase()})</label>
                              <Input 
                                value={block.data.ctaText?.[activeLang] || ''}
                                onChange={e => updateBlockText(block.id, ['ctaText'], activeLang, e.target.value)}
                                className="h-8 rounded-lg text-xs"
                                placeholder="e.g. Make an Offering"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="font-semibold text-stone-500">CTA Button Link</label>
                              <Input 
                                value={block.data.ctaLink || ''}
                                onChange={e => {
                                  const updatedBlocks = blocks.map(b => {
                                    if (b.id === block.id) {
                                      return { ...b, data: { ...b.data, ctaLink: e.target.value } }
                                    }
                                    return b
                                  })
                                  setBlocks(updatedBlocks)
                                }}
                                className="h-8 rounded-lg text-xs"
                                placeholder="e.g. /donate or /sevas"
                              />
                            </div>
                          </div>
                        )}

                        {block.type === 'timings' && (
                          <div className="space-y-3 text-xs">
                            <div className="space-y-1">
                              <label className="font-semibold text-stone-500">Morning Timings ({activeLang.toUpperCase()})</label>
                              <Input 
                                value={block.data.morning?.[activeLang] || ''}
                                onChange={e => updateBlockText(block.id, ['morning'], activeLang, e.target.value)}
                                className="h-8 rounded-lg text-xs"
                                placeholder="e.g. 06:00 AM - 12:00 PM"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="font-semibold text-stone-500">Evening Timings ({activeLang.toUpperCase()})</label>
                              <Input 
                                value={block.data.evening?.[activeLang] || ''}
                                onChange={e => updateBlockText(block.id, ['evening'], activeLang, e.target.value)}
                                className="h-8 rounded-lg text-xs"
                                placeholder="e.g. 04:00 PM - 09:00 PM"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="font-semibold text-stone-500">Location description ({activeLang.toUpperCase()})</label>
                              <Input 
                                value={block.data.location?.[activeLang] || ''}
                                onChange={e => updateBlockText(block.id, ['location'], activeLang, e.target.value)}
                                className="h-8 rounded-lg text-xs"
                                placeholder="e.g. Temple Hill, Bengaluru"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="font-semibold text-stone-500">Contact Details ({activeLang.toUpperCase()})</label>
                              <Input 
                                value={block.data.contact?.[activeLang] || ''}
                                onChange={e => updateBlockText(block.id, ['contact'], activeLang, e.target.value)}
                                className="h-8 rounded-lg text-xs"
                                placeholder="e.g. +91 80 1234 5678"
                              />
                            </div>
                          </div>
                        )}

                        {block.type === 'gallery' && (
                          <div className="space-y-4 text-xs">
                            <div className="space-y-1">
                              <label className="font-semibold text-stone-500">Gallery Title ({activeLang.toUpperCase()})</label>
                              <Input 
                                value={block.data.title?.[activeLang] || ''}
                                onChange={e => updateBlockText(block.id, ['title'], activeLang, e.target.value)}
                                className="h-8 rounded-lg text-xs"
                                placeholder="e.g. Temple Sanctum & Deities"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="font-semibold text-stone-500">Grid Columns Layout</label>
                              <select 
                                value={block.settings?.columns || '3'}
                                onChange={e => updateBlockSetting(block.id, 'columns', e.target.value)}
                                className="w-full h-8 text-xs px-2 rounded-lg border border-stone-200 dark:border-stone-750 bg-white dark:bg-stone-900"
                              >
                                <option value="2">2 Columns (Large Cards)</option>
                                <option value="3">3 Columns (Standard Grid)</option>
                                <option value="4">4 Columns (Dense Compact)</option>
                              </select>
                            </div>

                            {/* Images Array Manager */}
                            <div className="space-y-2.5">
                              <div className="flex justify-between items-center">
                                <label className="font-bold text-[10px] text-stone-400 uppercase tracking-wider">Photo Cards</label>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  onClick={() => addGalleryImage(block.id)}
                                  className="h-6 text-[10px] hover:text-saffron-650 flex items-center gap-1 font-bold text-stone-500"
                                >
                                  <Plus className="h-3 w-3 text-saffron-650" />
                                  Add Image card
                                </Button>
                              </div>

                              <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
                                {(block.data.images || []).map((img: any, imgIdx: number) => (
                                  <div key={imgIdx} className="p-3 border border-stone-100 dark:border-stone-850 rounded-xl bg-stone-50/50 dark:bg-stone-950/20 space-y-2 flex flex-col relative group">
                                    <button 
                                      onClick={() => deleteGalleryImage(block.id, imgIdx)}
                                      className="absolute top-2 right-2 text-stone-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>

                                    <div className="flex gap-2">
                                      <div className="h-12 w-16 bg-stone-200 dark:bg-stone-800 rounded-md overflow-hidden shrink-0 border border-stone-200/50">
                                        <img src={img.url} alt="" className="h-full w-full object-cover" />
                                      </div>
                                      <div className="flex-1 space-y-1.5 min-w-0">
                                        <div className="flex gap-1.5">
                                          <Input 
                                            value={img.url}
                                            onChange={e => {
                                              const updatedImages = [...block.data.images]
                                              updatedImages[imgIdx].url = e.target.value
                                              setBlocks(prev => prev.map(b => b.id === block.id ? { ...b, data: { ...b.data, images: updatedImages } } : b))
                                            }}
                                            className="h-7 rounded-lg text-[10px] flex-1"
                                            placeholder="Image URL"
                                          />
                                          <Button 
                                            onClick={() => openMediaPicker(block.id, 'gallery', imgIdx)}
                                            variant="outline" 
                                            size="icon" 
                                            className="h-7 w-7 rounded-lg shrink-0 border-stone-200"
                                          >
                                            <ImageIcon className="h-3.5 w-3.5 text-saffron-650" />
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="space-y-0.5">
                                      <label className="text-[9px] font-bold text-stone-400">Caption ({activeLang.toUpperCase()})</label>
                                      <Input 
                                        value={img.caption?.[activeLang] || ''}
                                        onChange={e => updateGalleryCaption(block.id, imgIdx, activeLang, e.target.value)}
                                        className="h-7 rounded-lg text-[10px]"
                                        placeholder="e.g. Sanctum Garbhagriha"
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {block.type === 'text' && (
                          <div className="space-y-3 text-xs">
                            <div className="space-y-1">
                              <label className="font-semibold text-stone-500">Section Heading ({activeLang.toUpperCase()})</label>
                              <Input 
                                value={block.data.heading?.[activeLang] || ''}
                                onChange={e => updateBlockText(block.id, ['heading'], activeLang, e.target.value)}
                                className="h-8 rounded-lg text-xs"
                                placeholder="e.g. Historical Legacy"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="font-semibold text-stone-500">Text Sizing</label>
                              <select 
                                value={block.settings?.size || 'medium'}
                                onChange={e => updateBlockSetting(block.id, 'size', e.target.value)}
                                className="w-full h-8 text-xs px-2 rounded-lg border border-stone-200 dark:border-stone-750 bg-white dark:bg-stone-900"
                              >
                                <option value="small">Small Text</option>
                                <option value="medium">Standard Text</option>
                                <option value="large">Large Editorial Text</option>
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className="font-semibold text-stone-500">Text Alignment</label>
                              <select 
                                value={block.settings?.align || 'center'}
                                onChange={e => updateBlockSetting(block.id, 'align', e.target.value)}
                                className="w-full h-8 text-xs px-2 rounded-lg border border-stone-200 dark:border-stone-750 bg-white dark:bg-stone-900"
                              >
                                <option value="center">Centered Align</option>
                                <option value="left">Left Align</option>
                                <option value="justify">Justified Block Align</option>
                              </select>
                            </div>
                            <div className="space-y-1 pt-1">
                              <div className="flex justify-between items-center mb-1">
                                <label className="font-semibold text-stone-500">HTML Content ({activeLang.toUpperCase()})</label>
                                <div className="flex gap-0.5 bg-stone-100 dark:bg-stone-950 p-0.5 rounded-lg border border-stone-200/50 dark:border-stone-850 shrink-0">
                                  <button
                                    type="button"
                                    onClick={() => insertHtmlTag(block.id, activeLang, 'b', `textarea-${block.id}-${activeLang}`)}
                                    className="px-1.5 py-0.5 text-[10px] font-bold hover:bg-white dark:hover:bg-stone-800 rounded transition-colors text-stone-750 dark:text-stone-300"
                                    title="Bold"
                                  >
                                    B
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => insertHtmlTag(block.id, activeLang, 'i', `textarea-${block.id}-${activeLang}`)}
                                    className="px-1.5 py-0.5 text-[10px] italic hover:bg-white dark:hover:bg-stone-800 rounded transition-colors text-stone-750 dark:text-stone-300"
                                    title="Italic"
                                  >
                                    I
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => insertHtmlTag(block.id, activeLang, 'h3', `textarea-${block.id}-${activeLang}`)}
                                    className="px-1.5 py-0.5 text-[10px] font-bold hover:bg-white dark:hover:bg-stone-800 rounded transition-colors text-stone-750 dark:text-stone-300"
                                    title="Heading"
                                  >
                                    H
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => insertHtmlTag(block.id, activeLang, 'p', `textarea-${block.id}-${activeLang}`)}
                                    className="px-1.5 py-0.5 text-[10px] hover:bg-white dark:hover:bg-stone-800 rounded transition-colors text-stone-750 dark:text-stone-300"
                                    title="Paragraph"
                                  >
                                    P
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => insertHtmlTag(block.id, activeLang, 'br', `textarea-${block.id}-${activeLang}`)}
                                    className="px-1.5 py-0.5 text-[10px] hover:bg-white dark:hover:bg-stone-800 rounded transition-colors text-stone-750 dark:text-stone-300"
                                    title="Line Break"
                                  >
                                    ↵
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => insertHtmlTag(block.id, activeLang, 'ul', `textarea-${block.id}-${activeLang}`)}
                                    className="px-1.5 py-0.5 text-[10px] hover:bg-white dark:hover:bg-stone-800 rounded transition-colors text-stone-750 dark:text-stone-300"
                                    title="Bullet List"
                                  >
                                    • List
                                  </button>
                                </div>
                              </div>
                              <textarea
                                id={`textarea-${block.id}-${activeLang}`}
                                value={block.data.html?.[activeLang] || ''}
                                onChange={e => updateBlockText(block.id, ['html'], activeLang, e.target.value)}
                                className="w-full text-xs p-2.5 rounded-lg border border-stone-200 dark:border-stone-750 bg-transparent min-h-[140px] font-mono leading-relaxed"
                                placeholder="<p>Enter HTML paragraph content...</p>"
                              />
                            </div>
                          </div>
                        )}

                        {block.type === 'sevas' && (
                          <div className="space-y-3 text-xs">
                            <div className="space-y-1">
                              <label className="font-semibold text-stone-500">Sevas Title ({activeLang.toUpperCase()})</label>
                              <Input 
                                value={block.data.title?.[activeLang] || ''}
                                onChange={e => updateBlockText(block.id, ['title'], activeLang, e.target.value)}
                                className="h-8 rounded-lg text-xs"
                                placeholder="e.g. Sacred Sevas & Offerings"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="font-semibold text-stone-500">Sevas Subtitle ({activeLang.toUpperCase()})</label>
                              <textarea
                                value={block.data.subtitle?.[activeLang] || ''}
                                onChange={e => updateBlockText(block.id, ['subtitle'], activeLang, e.target.value)}
                                className="w-full text-xs p-2.5 rounded-lg border border-stone-200 dark:border-stone-750 bg-transparent min-h-[60px]"
                                placeholder="Enter subtitle..."
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="font-semibold text-stone-500">Grid Columns Layout</label>
                              <select 
                                value={block.settings?.columns || '3'}
                                onChange={e => updateBlockSetting(block.id, 'columns', e.target.value)}
                                className="w-full h-8 text-xs px-2 rounded-lg border border-stone-200 dark:border-stone-750 bg-white dark:bg-stone-900"
                              >
                                <option value="2">2 Columns</option>
                                <option value="3">3 Columns</option>
                                <option value="4">4 Columns</option>
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className="font-semibold text-stone-500">Background Style</label>
                              <select 
                                value={block.settings?.backgroundStyle || 'light'}
                                onChange={e => updateBlockSetting(block.id, 'backgroundStyle', e.target.value)}
                                className="w-full h-8 text-xs px-2 rounded-lg border border-stone-200 dark:border-stone-750 bg-white dark:bg-stone-900"
                              >
                                <option value="light">Light/Default background</option>
                                <option value="dark">Dark background</option>
                              </select>
                            </div>
                          </div>
                        )}

                        {block.type === 'features' && (
                          <div className="space-y-4 text-xs">
                            <div className="space-y-1">
                              <label className="font-semibold text-stone-500">Features Section Title ({activeLang.toUpperCase()})</label>
                              <Input 
                                value={block.data.title?.[activeLang] || ''}
                                onChange={e => updateBlockText(block.id, ['title'], activeLang, e.target.value)}
                                className="h-8 rounded-lg text-xs"
                                placeholder="e.g. Highlight Columns"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="font-semibold text-stone-500">Grid Columns</label>
                              <select 
                                value={block.settings?.columns || '3'}
                                onChange={e => updateBlockSetting(block.id, 'columns', e.target.value)}
                                className="w-full h-8 text-xs px-2 rounded-lg border border-stone-200 dark:border-stone-750 bg-white dark:bg-stone-900"
                              >
                                <option value="2">2 Columns</option>
                                <option value="3">3 Columns</option>
                                <option value="4">4 Columns</option>
                              </select>
                            </div>

                            <div className="space-y-3 pt-2">
                              <div className="flex justify-between items-center">
                                <label className="font-bold text-[10px] text-stone-400 uppercase tracking-wider">Highlight Cards</label>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  onClick={() => {
                                    const cards = [...(block.data.features || [])]
                                    cards.push({
                                      image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=600&q=80',
                                      title: { en: 'New Feature' },
                                      description: { en: 'Short description text.' },
                                      ctaText: { en: 'Learn More' },
                                      ctaLink: '/'
                                    })
                                    setBlocks(prev => prev.map(b => b.id === block.id ? { ...b, data: { ...b.data, features: cards } } : b))
                                  }}
                                  className="h-6 text-[10px] hover:text-saffron-650 flex items-center gap-1 font-bold text-stone-500"
                                >
                                  <Plus className="h-3 w-3 text-saffron-650" />
                                  Add Card
                                </Button>
                              </div>

                              <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                                {(block.data.features || []).map((feat: any, featIdx: number) => (
                                  <div key={featIdx} className="p-3 border border-stone-100 dark:border-stone-850 rounded-xl bg-stone-50/50 dark:bg-stone-950/20 space-y-2 relative group flex flex-col">
                                    <button 
                                      onClick={() => {
                                        if (confirm('Are you sure you want to remove this feature card?')) {
                                          const cards = [...(block.data.features || [])].filter((_, i) => i !== featIdx)
                                          setBlocks(prev => prev.map(b => b.id === block.id ? { ...b, data: { ...b.data, features: cards } } : b))
                                        }
                                      }}
                                      className="absolute top-2 right-2 text-stone-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>

                                    <div className="flex gap-2">
                                      <div className="h-12 w-16 bg-stone-200 dark:bg-stone-800 rounded-md overflow-hidden shrink-0 border border-stone-200/50">
                                        <img src={feat.image || ''} alt="" className="h-full w-full object-cover" />
                                      </div>
                                      <div className="flex-1 space-y-1.5 min-w-0">
                                        <div className="flex gap-1.5">
                                          <Input 
                                            value={feat.image || ''}
                                            onChange={e => {
                                              const cards = [...block.data.features]
                                              cards[featIdx].image = e.target.value
                                              setBlocks(prev => prev.map(b => b.id === block.id ? { ...b, data: { ...b.data, features: cards } } : b))
                                            }}
                                            className="h-7 rounded-lg text-[10px] flex-1"
                                            placeholder="Card Image URL"
                                          />
                                          <Button 
                                            onClick={() => openMediaPicker(block.id, 'features', featIdx)}
                                            variant="outline" 
                                            size="icon" 
                                            className="h-7 w-7 rounded-lg shrink-0 border-stone-200"
                                          >
                                            <ImageIcon className="h-3.5 w-3.5 text-saffron-650" />
                                          </Button>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="space-y-1.5">
                                      <div className="space-y-0.5">
                                        <label className="text-[9px] font-bold text-stone-400">Card Title ({activeLang.toUpperCase()})</label>
                                        <Input 
                                          value={feat.title?.[activeLang] || ''}
                                          onChange={e => {
                                            const cards = [...block.data.features]
                                            cards[featIdx].title = { ...(cards[featIdx].title || {}), [activeLang]: e.target.value }
                                            setBlocks(prev => prev.map(b => b.id === block.id ? { ...b, data: { ...b.data, features: cards } } : b))
                                          }}
                                          className="h-7 rounded-lg text-[10px]"
                                          placeholder="Card Title"
                                        />
                                      </div>
                                      <div className="space-y-0.5">
                                        <label className="text-[9px] font-bold text-stone-400">Description ({activeLang.toUpperCase()})</label>
                                        <textarea
                                          value={feat.description?.[activeLang] || ''}
                                          onChange={e => {
                                            const cards = [...block.data.features]
                                            cards[featIdx].description = { ...(cards[featIdx].description || {}), [activeLang]: e.target.value }
                                            setBlocks(prev => prev.map(b => b.id === block.id ? { ...b, data: { ...b.data, features: cards } } : b))
                                          }}
                                          className="w-full text-[10px] p-2 rounded-lg border border-stone-200 dark:border-stone-750 bg-transparent min-h-[50px]"
                                          placeholder="Card Description"
                                        />
                                      </div>
                                      <div className="grid grid-cols-2 gap-2">
                                        <div className="space-y-0.5">
                                          <label className="text-[9px] font-bold text-stone-400">Button Text ({activeLang.toUpperCase()})</label>
                                          <Input 
                                            value={feat.ctaText?.[activeLang] || ''}
                                            onChange={e => {
                                              const cards = [...block.data.features]
                                              cards[featIdx].ctaText = { ...(cards[featIdx].ctaText || {}), [activeLang]: e.target.value }
                                              setBlocks(prev => prev.map(b => b.id === block.id ? { ...b, data: { ...b.data, features: cards } } : b))
                                            }}
                                            className="h-7 rounded-lg text-[10px]"
                                            placeholder="e.g. Learn More"
                                          />
                                        </div>
                                        <div className="space-y-0.5">
                                          <label className="text-[9px] font-bold text-stone-400">Button Link</label>
                                          <Input 
                                            value={feat.ctaLink || ''}
                                            onChange={e => {
                                              const cards = [...block.data.features]
                                              cards[featIdx].ctaLink = e.target.value
                                              setBlocks(prev => prev.map(b => b.id === block.id ? { ...b, data: { ...b.data, features: cards } } : b))
                                            }}
                                            className="h-7 rounded-lg text-[10px]"
                                            placeholder="e.g. /history"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {block.type === 'quote' && (
                          <div className="space-y-3 text-xs">
                            <div className="space-y-1">
                              <label className="font-semibold text-stone-500">Holy Shloka / Verse ({activeLang.toUpperCase()})</label>
                              <textarea
                                value={block.data.shloka?.[activeLang] || ''}
                                onChange={e => updateBlockText(block.id, ['shloka'], activeLang, e.target.value)}
                                className="w-full text-xs p-2.5 rounded-lg border border-stone-200 dark:border-stone-750 bg-transparent min-h-[60px] font-serif"
                                placeholder="Enter Sanskrit shloka..."
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="font-semibold text-stone-500">Translation ({activeLang.toUpperCase()})</label>
                              <textarea
                                value={block.data.translation?.[activeLang] || ''}
                                onChange={e => updateBlockText(block.id, ['translation'], activeLang, e.target.value)}
                                className="w-full text-xs p-2.5 rounded-lg border border-stone-200 dark:border-stone-750 bg-transparent min-h-[70px]"
                                placeholder="Enter translation..."
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="font-semibold text-stone-500">Source/Reference ({activeLang.toUpperCase()})</label>
                              <Input 
                                value={block.data.source?.[activeLang] || ''}
                                onChange={e => updateBlockText(block.id, ['source'], activeLang, e.target.value)}
                                className="h-8 rounded-lg text-xs"
                                placeholder="e.g. Bhagavad Gita 2.47"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="font-semibold text-stone-500">Verse Alignment</label>
                              <select 
                                value={block.settings?.alignment || 'center'}
                                onChange={e => updateBlockSetting(block.id, 'alignment', e.target.value)}
                                className="w-full h-8 text-xs px-2 rounded-lg border border-stone-200 dark:border-stone-750 bg-white dark:bg-stone-900"
                              >
                                <option value="center">Centered Alignment</option>
                                <option value="left">Left Alignment</option>
                                <option value="right">Right Alignment</option>
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className="font-semibold text-stone-500">Border / Card Style</label>
                              <select 
                                value={block.settings?.borderStyle || 'ornate'}
                                onChange={e => updateBlockSetting(block.id, 'borderStyle', e.target.value)}
                                className="w-full h-8 text-xs px-2 rounded-lg border border-stone-200 dark:border-stone-750 bg-white dark:bg-stone-900"
                              >
                                <option value="ornate">Ornate Traditional Border</option>
                                <option value="double-gold">Double Gold Line Border</option>
                                <option value="simple">Simple Border</option>
                                <option value="glass">Glassmorphic Glow Card</option>
                              </select>
                            </div>
                          </div>
                        )}

                        {block.type === 'map' && (
                          <div className="space-y-3 text-xs">
                            <div className="space-y-1">
                              <label className="font-semibold text-stone-500">Address Search Query ({activeLang.toUpperCase()})</label>
                              <Input 
                                value={block.data.addressQuery?.[activeLang] || ''}
                                onChange={e => updateBlockText(block.id, ['addressQuery'], activeLang, e.target.value)}
                                className="h-8 rounded-lg text-xs"
                                placeholder="e.g. Somnath Temple, Prabhas Patan, Gujarat"
                              />
                              <p className="text-[10px] text-stone-400 italic">Leave empty to use the address from the temple profile automatically.</p>
                            </div>
                            <div className="space-y-1">
                              <label className="font-semibold text-stone-500">Map Zoom Level</label>
                              <select 
                                value={block.settings?.zoom || '15'}
                                onChange={e => updateBlockSetting(block.id, 'zoom', e.target.value)}
                                className="w-full h-8 text-xs px-2 rounded-lg border border-stone-200 dark:border-stone-750 bg-white dark:bg-stone-900"
                              >
                                <option value="12">Zoom 12 (City View)</option>
                                <option value="14">Zoom 14 (Neighborhood)</option>
                                <option value="15">Zoom 15 (Standard)</option>
                                <option value="17">Zoom 17 (Street Level)</option>
                                <option value="19">Zoom 19 (Buildings)</option>
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className="font-semibold text-stone-500">Map Height</label>
                              <select 
                                value={block.settings?.height || '450px'}
                                onChange={e => updateBlockSetting(block.id, 'height', e.target.value)}
                                className="w-full h-8 text-xs px-2 rounded-lg border border-stone-200 dark:border-stone-750 bg-white dark:bg-stone-900"
                              >
                                <option value="300px">Compact (300px)</option>
                                <option value="450px">Standard (450px)</option>
                                <option value="600px">Tall (600px)</option>
                              </select>
                            </div>
                          </div>
                        )}

                        {block.type === 'form' && (
                          <div className="space-y-3 text-xs">
                            <div className="space-y-1">
                              <label className="font-semibold text-stone-500">Form Title ({activeLang.toUpperCase()})</label>
                              <Input 
                                value={block.data.title?.[activeLang] || ''}
                                onChange={e => updateBlockText(block.id, ['title'], activeLang, e.target.value)}
                                className="h-8 rounded-lg text-xs"
                                placeholder="e.g. Devotee Prayer Request"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="font-semibold text-stone-500">Form Description ({activeLang.toUpperCase()})</label>
                              <textarea
                                value={block.data.description?.[activeLang] || ''}
                                onChange={e => updateBlockText(block.id, ['description'], activeLang, e.target.value)}
                                className="w-full text-xs p-2.5 rounded-lg border border-stone-200 dark:border-stone-750 bg-transparent min-h-[60px]"
                                placeholder="Enter description..."
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="font-semibold text-stone-500">Form Type Addon</label>
                              <select 
                                value={block.settings?.formType || 'contact'}
                                onChange={e => updateBlockSetting(block.id, 'formType', e.target.value)}
                                className="w-full h-8 text-xs px-2 rounded-lg border border-stone-200 dark:border-stone-750 bg-white dark:bg-stone-900"
                              >
                                <option value="contact">General Contact/Enquiry Form</option>
                                <option value="prayer_request">Prayer Request / Family Archana Form</option>
                                <option value="feedback">Devotee Feedback & Suggestions Form</option>
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className="font-semibold text-stone-500">Success Message ({activeLang.toUpperCase()})</label>
                              <Input 
                                value={block.data.successMessage?.[activeLang] || ''}
                                onChange={e => updateBlockText(block.id, ['successMessage'], activeLang, e.target.value)}
                                className="h-8 rounded-lg text-xs"
                                placeholder="e.g. Message submitted successfully!"
                              />
                            </div>
                          </div>
                        )}
                        
                      </CardContent>
                    )}
                  </Card>
                )
              })}
            </div>
          )}
        </div>

        {/* Add Block Footer selector */}
        <div className="p-4 border-t border-stone-100 dark:border-stone-850 bg-stone-50/50 dark:bg-stone-950/20 shrink-0">
          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-2">Insert New Block</p>
          <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-9 gap-1.5">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => addBlock('hero')}
              className="rounded-xl flex flex-col gap-1 py-1.5 h-auto text-[8px] font-bold text-stone-700 bg-white border-stone-200 hover:border-amber-300 hover:text-amber-600 transition-all shrink-0"
            >
              <Compass className="h-3.5 w-3.5 text-amber-500" />
              Hero
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => addBlock('timings')}
              className="rounded-xl flex flex-col gap-1 py-1.5 h-auto text-[8px] font-bold text-stone-700 bg-white border-stone-200 hover:border-emerald-300 hover:text-emerald-600 transition-all shrink-0"
            >
              <Clock className="h-3.5 w-3.5 text-emerald-500" />
              Timings
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => addBlock('gallery')}
              className="rounded-xl flex flex-col gap-1 py-1.5 h-auto text-[8px] font-bold text-stone-700 bg-white border-stone-200 hover:border-purple-300 hover:text-purple-600 transition-all shrink-0"
            >
              <ImageIcon className="h-3.5 w-3.5 text-purple-500" />
              Gallery
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => addBlock('text')}
              className="rounded-xl flex flex-col gap-1 py-1.5 h-auto text-[8px] font-bold text-stone-700 bg-white border-stone-200 hover:border-blue-300 hover:text-blue-600 transition-all shrink-0"
            >
              <FileText className="h-3.5 w-3.5 text-blue-500" />
              Text
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => addBlock('sevas')}
              className="rounded-xl flex flex-col gap-1 py-1.5 h-auto text-[8px] font-bold text-stone-700 bg-white border-stone-200 hover:border-rose-350 hover:text-rose-600 transition-all shrink-0"
            >
              <Heart className="h-3.5 w-3.5 text-rose-500" />
              Sevas Grid
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => addBlock('features')}
              className="rounded-xl flex flex-col gap-1 py-1.5 h-auto text-[8px] font-bold text-stone-700 bg-white border-stone-200 hover:border-indigo-350 hover:text-indigo-600 transition-all shrink-0"
            >
              <Layers className="h-3.5 w-3.5 text-indigo-500" />
              Highlights
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => addBlock('quote')}
              className="rounded-xl flex flex-col gap-1 py-1.5 h-auto text-[8px] font-bold text-stone-700 bg-white border-stone-200 hover:border-amber-450 hover:text-amber-700 transition-all shrink-0"
            >
              <BookOpen className="h-3.5 w-3.5 text-amber-600" />
              Shloka
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => addBlock('map')}
              className="rounded-xl flex flex-col gap-1 py-1.5 h-auto text-[8px] font-bold text-stone-700 bg-white border-stone-200 hover:border-red-300 hover:text-red-650 transition-all shrink-0"
            >
              <MapPin className="h-3.5 w-3.5 text-red-500" />
              Map
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => addBlock('form')}
              className="rounded-xl flex flex-col gap-1 py-1.5 h-auto text-[8px] font-bold text-stone-700 bg-white border-stone-200 hover:border-sky-350 hover:text-sky-650 transition-all shrink-0"
            >
              <MessageSquare className="h-3.5 w-3.5 text-sky-500" />
              Form
            </Button>
          </div>
        </div>
      </div>

        {/* ─────────────────────────────────────────────────────────
            RIGHT PANEL: Live Preview frame
        ───────────────────────────────────────────────────────── */}
        <div className={`flex-1 bg-stone-100/50 dark:bg-stone-950/20 border border-stone-200 dark:border-stone-800 rounded-2xl flex-col overflow-hidden h-full shadow-sm relative ${
          mobileTab === 'preview' ? 'flex' : 'hidden lg:flex'
        }`}>
        {/* Preview Toolbar */}
        <div className="p-3 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-white dark:bg-stone-900 shrink-0">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-stone-400" />
            <span className="text-xs font-bold text-stone-850 dark:text-stone-300">Live Preview</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme switcher */}
            <select
              value={activeTemplate}
              onChange={e => {
                const nextTpl = e.target.value
                setActiveTemplate(nextTpl)
                // Save immediately to reflect in preview hot-reload
                fetch('/api/settings/template', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ templateId: nextTpl })
                }).then(res => {
                  if (res.ok) setPreviewKey(Date.now())
                })
              }}
              className="h-7 text-[10px] font-bold px-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-700 dark:text-stone-300 focus:outline-none"
            >
              <option value="classic">Theme: Classic Serene</option>
              <option value="heritage">Theme: Heritage Grand</option>
              <option value="modern">Theme: Modern Elegant</option>
              <option value="divine-glow">Theme: Divine Glow</option>
            </select>

            <div className="h-4 w-px bg-stone-200" />

            {/* Device toggles */}
            <div className="flex bg-stone-100 dark:bg-stone-950 p-0.5 rounded-lg border border-stone-200/50 dark:border-stone-850">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPreviewDevice('desktop')}
                className={`h-7 w-7 rounded-md ${
                  previewDevice === 'desktop'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-400 hover:text-stone-700'
                }`}
              >
                <Monitor className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPreviewDevice('mobile')}
                className={`h-7 w-7 rounded-md ${
                  previewDevice === 'mobile'
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-400 hover:text-stone-700'
                }`}
              >
                <Smartphone className="h-3.5 w-3.5" />
              </Button>
            </div>

            <div className="h-4 w-px bg-stone-200" />

            <Button
              variant="outline"
              size="icon"
              onClick={() => setPreviewKey(Date.now())}
              className="h-7 w-7 rounded-lg border-stone-200 text-stone-500"
            >
              <RotateCw className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* Live Website Preview Sandbox */}
        <div className="flex-1 p-4 flex items-center justify-center overflow-auto bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px]">
          <div
            className={`transition-all duration-300 bg-white border border-stone-200/60 dark:border-stone-850 shadow-lg rounded-xl overflow-hidden ${
              previewDevice === 'mobile'
                ? 'w-[375px] h-[640px] max-h-full border-[8px] border-stone-900 rounded-[28px] shadow-2xl relative'
                : 'w-full h-full'
            }`}
          >
            {/* Embedded Live Web View */}
            <iframe
              src={`/temple/${templeSlug}?t=${previewKey}`}
              className="w-full h-full border-0"
              title="Live Preview"
            />
          </div>
        </div>
      </div>

      </div>

      {/* ─────────────────────────────────────────────────────────
          IMAGE MODAL PICKER: Select and upload images
      ───────────────────────────────────────────────────────── */}
      <Modal
        isOpen={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        title="Select Photo from Media Gallery"
        description="Choose a photo from your media files or upload a new one to place in this layout block."
        size="xl"
      >
        <div className="space-y-4">
          {/* Picker Upload Button */}
          <div className="flex justify-between items-center border-b border-stone-100 dark:border-stone-850 pb-3">
            <span className="text-xs font-semibold text-stone-500">Available Uploads</span>
            <div>
              <input
                type="file"
                ref={mediaFileInputRef}
                onChange={handlePickerUpload}
                accept="image/*"
                className="hidden"
              />
              <Button
                onClick={() => mediaFileInputRef.current?.click()}
                disabled={mediaUploading}
                size="sm"
                className="bg-stone-900 text-white hover:bg-stone-850 dark:bg-stone-100 dark:text-stone-950 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm"
              >
                {mediaUploading ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <UploadCloud className="h-3.5 w-3.5" />
                    Upload Photo
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Media list grid */}
          {mediaLoading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="h-8 w-8 text-saffron-600 animate-spin" />
            </div>
          ) : mediaList.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-stone-200 dark:border-stone-800 rounded-xl bg-stone-50/50">
              <ImageIcon className="h-10 w-10 text-stone-300 mx-auto mb-2" />
              <p className="text-xs font-semibold text-stone-500">No media photos found</p>
              <p className="text-[10px] text-stone-400 mt-0.5">Upload a photo using the button above to begin.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 max-h-[360px] overflow-y-auto pr-1">
              {mediaList.map((media) => (
                <div
                  key={media.id}
                  onClick={() => handleSelectMedia(media.url)}
                  className="group relative cursor-pointer border border-stone-200/50 hover:border-saffron-500 rounded-lg overflow-hidden transition-all bg-stone-50 flex flex-col"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-stone-200 relative">
                    <img
                      src={media.url}
                      alt={media.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-2 border-t border-stone-100 dark:border-stone-850 shrink-0">
                    <p className="text-[10px] font-bold text-stone-750 truncate">{media.title}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}
