export const getAvailableDatesAndTimes = (selectedSlots: string[]) => {
  if (!selectedSlots.length) return { dates: [], times: {} }

  const now = new Date()
  const datesObj: Record<string, string[]> = {}
  const todayIndex = now.getDay() === 0 ? 6 : now.getDay() - 1

  selectedSlots.forEach((slot) => {
    const [dayOffsetStr, time] = slot.split("-")
    const dayOffset = parseInt(dayOffsetStr)

    for (let weekOffset = 0; weekOffset < 2; weekOffset++) {
      const targetDate = new Date(now)
      let daysToAdd = dayOffset - todayIndex + weekOffset * 7
      if (daysToAdd < 0 && weekOffset === 0) continue
      targetDate.setDate(now.getDate() + daysToAdd)

      const dateString = targetDate.toISOString().split("T")[0]
      if (!datesObj[dateString]) datesObj[dateString] = []
      if (!datesObj[dateString].includes(time)) {
        datesObj[dateString].push(time)
      }
    }
  })

  Object.keys(datesObj).forEach((date) => {
    datesObj[date].sort()
  })

  return {
    dates: Object.keys(datesObj).sort(),
    times: datesObj,
  }
}

export const formatCardNumber = (value: string) => {
  const cleaned = value.replace(/\s/g, '').replace(/[^0-9]/g, '')
  const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned
  return formatted
}

export const formatExpiryDate = (value: string) => {
  const cleaned = value.replace(/\D/g, '')
  let formatted = cleaned
  if (cleaned.length >= 2) {
    formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4)
  }
  return formatted
}

export const getSocialIcons = (socialMedia: any) => {
  const icons = [
    { name: "Website", icon: "Globe", url: socialMedia?.website, color: "text-green-600 hover:text-green-700" },
    { name: "Instagram", icon: "Instagram", url: socialMedia?.instagram, color: "text-pink-500 hover:text-pink-600" },
    { name: "Facebook", icon: "Facebook", url: socialMedia?.facebook, color: "text-blue-600 hover:text-blue-700" },
    { name: "Twitter", icon: "Twitter", url: socialMedia?.twitter, color: "text-sky-500 hover:text-sky-600" },
    { name: "YouTube", icon: "Youtube", url: socialMedia?.youtube, color: "text-red-500 hover:text-red-600" },
    { name: "LinkedIn", icon: "Linkedin", url: socialMedia?.linkedin, color: "text-blue-700 hover:text-blue-800" },
    { name: "TikTok", icon: "User", url: socialMedia?.tiktok, color: "text-black hover:text-gray-800" },
  ]
  return icons.filter(social => social.url)
}