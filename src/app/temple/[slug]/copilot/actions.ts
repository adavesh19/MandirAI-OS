'use server'

import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function getAstrologicalRecommendation(formData: {
  name: string
  gotra: string
  nakshatra: string
  intention: string
  templeName: string
  primaryDeity: string
}) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      // Return mock data if no key is present so UI still functions
      await new Promise(r => setTimeout(r, 1500))
      return {
        success: true,
        recommendation: `Based on Vedic astrology, for someone of ${formData.gotra} Gotra and ${formData.nakshatra} Nakshatra seeking ${formData.intention}, offering a special Archana or Abhishekam to Lord ${formData.primaryDeity} is highly auspicious. The upcoming Ekadashi or Poornima would be the ideal time.`,
        suggestedSeva: 'Special Abhishekam',
        auspiciousDate: 'Next Tuesday or Full Moon'
      }
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    
    const prompt = `You are a learned Vedic Purohit (Priest) and Astrologer at ${formData.templeName}, dedicated to ${formData.primaryDeity}.
    A devotee named ${formData.name} has come to you.
    Their Gotra is: ${formData.gotra || 'Unknown'}
    Their Nakshatra (birth star) is: ${formData.nakshatra || 'Unknown'}
    Their main intention or prayer is: ${formData.intention}

    Please provide:
    1. A short, compassionate, and wise response (2-3 paragraphs) explaining how the deity can bless them, referencing their Nakshatra/Gotra if possible.
    2. A suggested specific Seva (e.g., Rudrabhishekam, Kumkumarchana, Vahana Pooja).
    3. Suggested auspicious days to perform this (e.g., "Mondays", "Upcoming Amavasya").

    Format the response as a JSON object strictly matching this schema:
    {
      "recommendation": "The detailed compassionate text",
      "suggestedSeva": "Name of Seva",
      "auspiciousDate": "Best timing"
    }`

    const result = await model.generateContent(prompt)
    const text = result.response.text()
    
    // Extract JSON from markdown
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/{[\s\S]*}/)
    
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[1] || jsonMatch[0])
      return { success: true, ...parsed }
    }

    throw new Error('Failed to parse AI response')
  } catch (error: any) {
    console.error('Purohit Copilot Error:', error)
    return { success: false, error: 'The Purohit is currently unavailable. Please try again later.' }
  }
}
