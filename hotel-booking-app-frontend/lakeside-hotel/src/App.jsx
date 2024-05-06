import 'bootstrap/dist/css/bootstrap.min.css';
import AddRoom from './components/room/AddRoom'
import ExistingRooms from './components/room/ExistingRooms';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import EditRoom from './components/room/EditRoom';
import Footer from './components/layout/Footer';
import NavbarLayout from './components/layout/NavbarLayout';
import RoomListing from './components/room/RoomListing';
import Admin from './components/admin/Admin';
import Checkout from './components/bookings/Checkout';
import BookingSuccess from './components/bookings/BookingSuccess';
import Bookings from './components/bookings/Bookings';
import FindBooking from './components/bookings/FindBooking';

function App() {

  return (
    <>
      <main>
        <Router>
          <NavbarLayout/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/edit-room/:roomId' element={<EditRoom/>}/>
            <Route path='/add-room' element={<AddRoom/>}/>
            <Route path='/book-room/:roomId' element={<Checkout/>}/>
            <Route path='/existing-rooms' element={<ExistingRooms/>}/>
            <Route path='/browse-all-rooms' element={<RoomListing/>}/>
            <Route path='/booking-success' element={<BookingSuccess/>}/>
            <Route path='/existing-bookings' element={<Bookings/>}/>
            <Route path='/find-booking' element={<FindBooking/>}/>
            <Route path='/admin' element={<Admin/>}/>
          </Routes>
        </Router>
        <Footer/>
      </main>
    </>
  )
}

export default App
