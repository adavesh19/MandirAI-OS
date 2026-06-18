'use server'

import prisma from '@/lib/prisma'
import { getAuthUser } from '@/lib/dal'

export async function logMeditationSession(templeId: string, durationSeconds: number) {
  try {
    const user = await getAuthUser()
    if (!user || !user.phone) {
      return { success: false, error: 'Must be logged in to track spiritual health.' }
    }

    const devotee = await prisma.devotee.findFirst({
      where: { templeId, phone: user.phone }
    })

    if (!devotee) {
      return { success: false, error: 'Devotee profile not found.' }
    }

    // Award Karma Points based on duration (1 point per 60 seconds)
    const pointsToAward = Math.floor(durationSeconds / 60)
    
    // In a real implementation, we'd also store a 'MeditationSession' record, 
    // but for now we'll just update Karma Points directly to represent "Spiritual Health"
    
    if (pointsToAward > 0) {
      await prisma.devotee.update({
        where: { id: devotee.id },
        data: {
          karmaPoints: { increment: pointsToAward }
        }
      })
    }

    return { 
      success: true, 
      pointsAwarded: pointsToAward,
      newTotal: devotee.karmaPoints + pointsToAward
    }
  } catch (error: any) {
    console.error('Meditation log error:', error)
    return { success: false, error: 'Failed to record session' }
  }
}
