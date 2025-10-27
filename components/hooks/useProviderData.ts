import { useEffect } from 'react'
import axios from 'axios'
import { useBookingContext } from '@/components/context/BookingContext'
import { ProviderProfile } from '@/components/types/booking.types'

export const useProviderData = () => {
  const { setProfile, setLoading } = useBookingContext()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get<ProviderProfile>("/api/testing")
        setProfile(data)
        setLoading(false)
      } catch (err) {
        console.error("Fetch error:", err)
        setLoading(false)
      }
    }
    fetchData()
  }, [setProfile, setLoading])
}