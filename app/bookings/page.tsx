import BookingItem from "../_components/booking-item"
import Header from "../_components/header"
import { getConcludedBookings } from "../_data/get-concluded-bookings"
import { getConfirmedBookings } from "../_data/get-confirmed-bookings"
import { authOptions } from "../_lib/auth"
import { getServerSession } from "next-auth"

const Bookings = async () => {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">Você não está logado</h1>
      </div>
    )
  }
  const confirmedBookings = await getConfirmedBookings()
  const concludedBookings = await getConcludedBookings()
  return (
    <>
      <Header />
      <div className="space-y-3 p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>
        {confirmedBookings.length === 0 && (
          <p className="text-gray-400">Você não possui agendamentos!</p>
        )}
        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Confirmados
            </h2>
            {confirmedBookings.map((booking) => (
              <BookingItem
                key={booking.id}
                booking={JSON.parse(JSON.stringify(booking))}
              />
            ))}
          </>
        )}
        {confirmedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Finalizados
            </h2>
            {concludedBookings.map((booking) => (
              <BookingItem
                key={booking.id}
                booking={JSON.parse(JSON.stringify(booking))}
              />
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default Bookings
