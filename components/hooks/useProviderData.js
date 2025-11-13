import { useEffect } from 'react';
import axios from 'axios';
import { useBookingContext } from '@/components/context/BookingContext';
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;


export const useProviderData = (expertID) => {
  const { setProfile, setLoading } = useBookingContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const { data } = await axios.get("/api/testing"); // Removed <ProviderProfile>
        const response = await fetch(`${backendUrl}/${expertID}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch from backend. Status: ${response.status}`);
        }

        const data = await response.json();
        setProfile(data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [setProfile, setLoading]);
};
