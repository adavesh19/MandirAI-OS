'use client'

import * as React from 'react'
import { Send, CheckCircle2, Loader2 } from 'lucide-react'
import { useLanguage } from '@/components/shared/language-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface FormBlockProps {
  data: {
    title?: Record<string, string>
    description?: Record<string, string>
    successMessage?: Record<string, string>
  }
  settings?: {
    formType?: 'contact' | 'prayer_request' | 'feedback'
  }
  theme?: 'classic' | 'heritage' | 'modern' | 'divine-glow'
}

export default function FormBlock({ data, settings, theme = 'classic' }: FormBlockProps) {
  const { t } = useLanguage()
  const formType = settings?.formType || 'contact'

  const [formData, setFormData] = React.useState({ name: '', email: '', phone: '', message: '' })
  const [submitting, setSubmitting] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    // Simulate API submission guard delay
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    }, 1500)
  }

  // Label configuration
  const formLabels = {
    contact: {
      title: { en: 'Send a Message', hi: 'हमें संदेश भेजें', kn: 'ನಮಗೆ ಸಂದೇಶ ಕಳುಹಿಸಿ', ta: 'எங்களுக்கு செய்தி அனுப்பவும்', te: 'మాకు సందేశం పంపండి' },
      desc: { en: 'Have questions? Get in touch with the temple administration office.', hi: 'कोई प्रश्न हैं? मंदिर प्रशासन कार्यालय से संपर्क करें।', kn: 'ಪ್ರಶ್ನೆಗಳಿವೆಯೇ? ದೇವಸ್ಥಾನದ ಆಡಳಿತ ಕಚೇರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ.', ta: 'கேள்விகள் உள்ளதா? கோவில் நிர்வாக அலுவலகத்தை தொடர்பு கொள்ளவும்.', te: 'ప్రశ్నలు ఉన్నాయా? దేవాలయ కార్యాలయాన్ని సంప్రదించండి.' },
      success: { en: 'Message sent successfully! We will get back to you soon.', hi: 'संदेश सफलतापूर्वक भेजा गया! हम आपसे जल्द ही संपर्क करेंगे।', kn: 'ಸಂದೇಶ ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ! ನಾವು ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತೇವೆ.', ta: 'செய்தி வெற்றிகரமாக அனுப்பப்பட்டது! விரைவில் நாங்கள் உங்களைத் தொடர்புகொள்வோம்.', te: 'సందేశం విజయవంతంగా పంపబడింది! మేము త్వరలోనే మిమ్మల్ని సంప్రదిస్తాము.' }
    },
    prayer_request: {
      title: { en: 'Request a Prayer / Pooja', hi: 'प्रार्थना / पूजा अनुरोध', kn: 'ಪ್ರಾರ್ಥನೆ / ಪೂಜೆ ವಿನಂತಿ', ta: 'பிரார்த்தனை / பூஜை கோரிக்கை', te: 'ప్రార్థన / పూజ అభ్యర్థన' },
      desc: { en: 'Submit your details for special prayers or family archana recitations.', hi: 'विशेष प्रार्थनाओं या पारिवारिक अर्चना पाठों के लिए अपना विवरण जमा करें।', kn: 'ವಿಶೇಷ ಪ್ರಾರ್ಥನೆಗಳು ಅಥವಾ ಕೌಟುಂಬಿಕ ಅರ್ಚನೆಗಾಗಿ ನಿಮ್ಮ ವಿವರಗಳನ್ನು ಸಲ್ಲಿಸಿ.', ta: 'சிறப்பு பிரார்த்தனைகள் அல்லது குடும்ப அர்ச்சனைக்காக உங்கள் விவரங்களைச் சமர்ப்பிக்கவும்.', te: 'ప్రత్యేక పూజలు లేదా అర్చనల కొరకు మీ వివరాలను సమర్పించండి.' },
      success: { en: 'Prayer request submitted! Priests will include your family in daily prayers.', hi: 'प्रार्थना अनुरोध सबमिट किया गया! पुजारी आपके परिवार को दैनिक प्रार्थनाओं में शामिल करेंगे।', kn: 'ಪ್ರಾರ್ಥನೆ ವಿನಂತಿ ಸಲ್ಲಿಸಲಾಗಿದೆ! ಅರ್ಚಕರು ನಿಮ್ಮ ಕುಟುಂಬವನ್ನು ದೈನಂದಿನ ಪ್ರಾರ್ಥನೆಯಲ್ಲಿ ಸೇರಿಸಿಕೊಳ್ಳುತ್ತಾರೆ.', ta: 'பிரார்த்தனை கோரிக்கை சமர்ப்பிக்கப்பட்டது! தினசரி பிரார்த்தனைகளில் பூசாரிகள் உங்கள் குடும்பத்தை சேர்ப்பார்கள்.', te: 'ప్రార్థన అభ్యర్థన విజయవంతంగా చేరింది! పూజారులు దినచర్య పూజలలో మీ నామాలను స్మరిస్తారు.' }
    },
    feedback: {
      title: { en: 'Devotee Feedback & Suggestions', hi: 'भक्त प्रतिक्रिया और सुझाव', kn: 'ಭಕ್ತರ ಪ್ರತಿಕ್ರಿಯೆ ಮತ್ತು ಸಲಹೆಗಳು', ta: 'பக்தர் கருத்து மற்றும் பரிந்துரைகள்', te: 'భక్తుల అభిప్రాయాలు మరియు సూచనలు' },
      desc: { en: 'Help us improve temple facilities and devotee services.', hi: 'मंदिर सुविधाओं और भक्त सेवाओं में सुधार करने में हमारी सहायता करें।', kn: 'ದೇವಾಲಯದ ಸೌಲಭ್ಯಗಳು ಮತ್ತು ಭಕ್ತರ ಸೇವೆಗಳನ್ನು ಸುಧಾರಿಸಲು ನಮಗೆ ಸಹಾಯ ಮಾಡಿ.', ta: 'கோவில் வசதிகள் மற்றும் பக்தர் சேவைகளை மேம்படுத்த எங்களுக்கு உதவுங்கள்.', te: 'దేవాలయ సేవలను మరింత మెరుగుపరచడానికి మీ సూచనలు ఇవ్వండి.' },
      success: { en: 'Thank you for your valuable feedback!', hi: 'आपकी बहुमूल्य प्रतिक्रिया के लिए धन्यवाद!', kn: 'ನಿಮ್ಮ ಅಮೂಲ್ಯವಾದ ಪ್ರತಿಕ್ರಿಯೆಗೆ ಧನ್ಯವಾದಗಳು!', ta: 'உங்கள் மதிப்புமிக்க கருத்துக்கு நன்றி!', te: 'మీ విలువైన అభిప్రాయానికి ధన్యవాదాలు!' }
    }
  }

  const activeLabels = formLabels[formType]
  const title = data.title ? t(data.title) : t(activeLabels.title)
  const desc = data.description ? t(data.description) : t(activeLabels.desc)
  const successMsg = data.successMessage ? t(data.successMessage) : t(activeLabels.success)

  // Styling maps
  let cardClasses = "my-10 p-8 border rounded-3xl transition-all duration-300 max-w-xl mx-auto "
  let titleClasses = "font-bold text-xl md:text-2xl mb-2 text-stone-900 dark:text-white "
  let descClasses = "text-xs md:text-sm text-stone-500 dark:text-stone-400 font-light mb-6 "
  let inputClasses = "h-10 rounded-xl text-xs border bg-transparent text-stone-800 dark:text-stone-100 "
  let textareaClasses = "w-full text-xs p-3 rounded-xl border bg-transparent text-stone-800 dark:text-stone-100 min-h-[90px] focus:outline-none "
  let submitBtnClasses = "w-full h-10 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all "

  if (theme === 'heritage') {
    cardClasses += "bg-red-950/20 border-[#D4AF37]/30 shadow-md "
    titleClasses += "font-serif text-red-950 dark:text-[#F5DEB3] "
    descClasses += "font-serif text-stone-600 dark:text-stone-300 "
    inputClasses += "border-red-900/20 dark:border-[#D4AF37]/20 focus:border-[#D4AF37] "
    textareaClasses += "border-red-900/20 dark:border-[#D4AF37]/20 focus:border-[#D4AF37] "
    submitBtnClasses += "bg-gradient-to-r from-red-800 to-red-950 text-[#F5DEB3] border border-[#D4AF37] hover:from-red-750 font-serif "
  } else if (theme === 'modern') {
    cardClasses += "bg-white dark:bg-stone-900 border-stone-200/50 dark:border-stone-800 rounded-[2.2rem] shadow-sm hover:shadow-md "
    titleClasses += "font-sans font-black tracking-tight "
    inputClasses += "border-stone-200/60 dark:border-stone-800 focus:border-orange-500 "
    textareaClasses += "border-stone-200/60 dark:border-stone-800 focus:border-orange-500 "
    submitBtnClasses += "bg-orange-600 hover:bg-orange-550 text-white font-sans "
  } else if (theme === 'divine-glow') {
    cardClasses += "bg-gradient-to-b from-stone-950/70 to-[#1c0d02]/50 border-amber-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.3)] backdrop-blur-sm "
    titleClasses += "font-serif text-[#FFFDD0] [text-shadow:0_1px_3px_rgba(234,88,12,0.15)] "
    descClasses += "font-serif text-amber-100/60 font-light "
    inputClasses += "border-amber-500/20 text-amber-100 focus:border-amber-500 "
    textareaClasses += "border-amber-500/20 text-amber-100 focus:border-amber-500 "
    submitBtnClasses += "bg-gradient-to-r from-amber-500 to-orange-600 text-white font-serif uppercase tracking-widest text-[10px] shadow-md hover:shadow-lg hover:from-amber-600 hover:to-orange-700 "
  } else {
    // Classic
    cardClasses += "bg-white dark:bg-stone-950 border-stone-200/40 dark:border-stone-850 shadow-sm "
    titleClasses += "font-serif text-stone-950 dark:text-stone-50 font-normal "
    descClasses += "font-serif text-stone-500 dark:text-stone-300 font-light "
    inputClasses += "border-stone-200 dark:border-stone-800 focus:border-saffron-550 "
    textareaClasses += "border-stone-200 dark:border-stone-800 focus:border-saffron-550 "
    submitBtnClasses += "bg-saffron-650 hover:bg-saffron-600 text-white font-serif "
  }

  return (
    <div className={cardClasses}>
      <div className="mb-6">
        <h3 className={titleClasses}>{title}</h3>
        <p className={descClasses}>{desc}</p>
      </div>

      {submitted ? (
        <div className="p-5 border border-emerald-500/10 bg-emerald-50/5 text-emerald-600 rounded-2xl flex flex-col items-center text-center gap-3 animate-fade-in">
          <CheckCircle2 className="h-10 w-10 text-emerald-500 animate-bounce" />
          <p className="text-xs font-semibold leading-relaxed">{successMsg}</p>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-stone-400">Full Name</label>
              <Input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Devotee Name"
                className={inputClasses}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-stone-400">Phone Number</label>
              <Input
                type="tel"
                required
                value={formData.phone}
                onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="e.g. +91 98765 43210"
                className={inputClasses}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-stone-400">Email Address (Optional)</label>
            <Input
              type="email"
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="devotee@example.com"
              className={inputClasses}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-stone-400">
              {formType === 'prayer_request' ? 'Prayer Intent / Details' : 'Message Details'}
            </label>
            <textarea
              required
              rows={3}
              value={formData.message}
              onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
              placeholder={formType === 'prayer_request' ? 'e.g. Health and prosperity for my family...' : 'Type your details here...'}
              className={textareaClasses}
            />
          </div>

          <Button type="submit" disabled={submitting} className={submitBtnClasses}>
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-3.5 w-3.5" />
                Submit
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  )
}
