import React, { createContext, useCallback, useEffect, useState } from "react";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const BookingContext = createContext({
  schedule: [],
  loading: false,
  error: null,
  addBooking: async (item) => {},
  deleteBookingAt: async (index) => {},
});

export function BookingProvider({ children }) {
  const [schedule, setSchedule] = useState([]);
  const [remoteSchedule, setRemoteSchedule] = useState([]);
  const [localBookings, setLocalBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const [res, stored] = await Promise.all([
          api.get("test/jadwalruangan").catch((e) => {
            // allow stored to load even if api fails
            return null;
          }),
          AsyncStorage.getItem("local_bookings"),
        ]);

        const remote = (res && res.data) || [];
        const storedLocal = stored ? JSON.parse(stored) : [];

        if (mounted) {
          setRemoteSchedule(remote);
          setLocalBookings(storedLocal);
          setSchedule([...storedLocal, ...remote]);
        }
      } catch (err) {
        if (mounted) setError(err.message || "Failed to load schedule");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  const addBooking = useCallback(async (item) => {
    // item should be { waktu_mulai, waktu_selesai, nama_ruangan, divisi, jumlah_peserta }
    setLocalBookings((prevLocal) => {
      const nextLocal = [item, ...prevLocal];
      // persist
      AsyncStorage.setItem("local_bookings", JSON.stringify(nextLocal)).catch(
        () => {}
      );
      // update combined schedule
      setSchedule((prev) => [item, ...prev]);
      return nextLocal;
    });
  }, []);

  const deleteBookingAt = useCallback(async (index) => {
    setSchedule((prev) => {
      if (index < 0 || index >= prev.length) return prev;
      const target = prev[index];
      const next = prev.filter((_, i) => i !== index);

      // Try to remove from local storage if it exists there
      setLocalBookings((prevLocal) => {
        const localIndex = prevLocal.findIndex(
          (b) => JSON.stringify(b) === JSON.stringify(target)
        );
        if (localIndex !== -1) {
          const nextLocal = prevLocal.filter((_, i) => i !== localIndex);
          AsyncStorage.setItem(
            "local_bookings",
            JSON.stringify(nextLocal)
          ).catch(() => {});
          return nextLocal;
        }
        return prevLocal;
      });

      return next;
    });
  }, []);

  return (
    <BookingContext.Provider
      value={{ schedule, loading, error, addBooking, deleteBookingAt }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export default BookingContext;
