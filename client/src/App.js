import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Register, Error, ProtectedRoute, Landing } from './pages'
import { SingleListing } from './components'
import { Profile, AddListing, SharedLayout,  AllAccommodations, AllBookings, EditListing } from './pages/dashboard'

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
          <Route path='add-listing' element={<AddListing />} />
          <Route path='all-bookings' element={<AllBookings />} />
          <Route path='edit-listing/:id' element={<EditListing />} />
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
