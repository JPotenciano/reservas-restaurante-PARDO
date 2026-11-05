import { useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'pardo-reservations'

export function reservationsOverlap(first, second) {
  return first.startTime < second.endTime && first.endTime > second.startTime
}

function getTodayKey() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

export default function useBooking() {
  const [reservations, setReservations] = useState(() => {
    const storedReservations = localStorage.getItem(STORAGE_KEY)
    return storedReservations ? JSON.parse(storedReservations) : []
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations))
  }, [reservations])

  const addReservation = (reservation) => {
    const hasConflict = reservations.some(
      (item) =>
        item.date === reservation.date &&
        Number(item.table) === Number(reservation.table) &&
        reservationsOverlap(item, reservation),
    )

    if (hasConflict) {
      return { success: false, message: 'Esa mesa ya está reservada en ese horario. Elige otra mesa u hora.' }
    }

    const savedReservation = {
      ...reservation,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }
    const updatedReservations = [...reservations, savedReservation]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReservations))
    setReservations(updatedReservations)
    return { success: true, reservation: savedReservation }
  }

  const removeReservation = (id) => {
    const updatedReservations = reservations.filter((item) => item.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReservations))
    setReservations(updatedReservations)
  }

  const getReservationsForDate = (date) =>
    reservations.filter((reservation) => reservation.date === date)

  const stats = useMemo(() => ({
    total: reservations.length,
    guests: reservations.reduce((total, reservation) => total + Number(reservation.guests), 0),
    today: reservations.filter((reservation) => reservation.date === getTodayKey()).length,
  }), [reservations])

  return { reservations, addReservation, removeReservation, getReservationsForDate, stats }
}
