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
import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import Profile from './components/auth/Profile';
import Logout from './components/auth/Logout';
import AuthProvider from './components/auth/AuthProvider';
import RequireAuth from './components/auth/RequireAuth';

function App() {

  return (
    <>
      <AuthProvider>
        <main>
          <Router>
            <NavbarLayout/>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/edit-room/:roomId' element={<EditRoom/>}/>
              <Route path='/add-room' element={<AddRoom/>}/>
              <Route path='/book-room/:roomId' element={
                <RequireAuth>
                  <Checkout/>
                </RequireAuth>
              }/>
              <Route path='/existing-rooms' element={<ExistingRooms/>}/>
              <Route path='/browse-all-rooms' element={<RoomListing/>}/>
              <Route path='/booking-success' element={<BookingSuccess/>}/>
              <Route path='/existing-bookings' element={<Bookings/>}/>
              <Route path='/find-booking' element={<FindBooking/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Registration/>}/>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/logout' element={<Logout/>}/>
              <Route path='/admin' element={<Admin/>}/>
            </Routes>
          </Router>
          <Footer/>
        </main>
      </AuthProvider>
    </>
  )
}

export default App
