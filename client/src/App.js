import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Register, Error, ProtectedRoute, Landing } from './pages'
import { SingleListing } from './components'
import { Profile, AddBooking, SharedLayout, AllBookings } from './pages/dashboard'
function App() {
  return (
    <Router>
      <Routes>
      <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          
          <Route index element={<Profile />} />
          <Route path='all-bookings' element={<AllBookings />} />
          <Route path='add-booking' element={<AddBooking />} />
        </Route>
        
        <Route path='/signup' element={<Register />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='/listing' element={<SingleListing/>} />
        <Route path='ab' element={<AddBooking />} />
        
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
