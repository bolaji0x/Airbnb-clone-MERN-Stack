import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Register, Error, ProtectedRoute, Landing } from './pages'
import { SingleListing } from './components'

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path='/signup' element={<Register />} />
        
        <Route path='/landing' element={<Landing />} />
        <Route path='/listing' element={<SingleListing/>} />
        
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
