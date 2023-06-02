import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Register, Error, ProtectedRoute, Landing } from './pages'
import { SingleListing } from './components'
import { Profile, AddBooking, SharedLayout,  AllAccommodations, AllBookings, EditBooking } from './pages/dashboard'

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
          <Route path='all-accommodations' element={<AllAccommodations />} />
          <Route path='add-booking' element={<AddBooking />} />
          <Route path='all-bookings' element={<AllBookings />} />
          <Route path='edit-booking/:id' element={<EditBooking />} />
        </Route>
        
        <Route path='/signup' element={<Register />} />
        <Route path='/homepage' element={<Landing />} />
        <Route path='/listing/:id' element={<SingleListing/>} />
        
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
