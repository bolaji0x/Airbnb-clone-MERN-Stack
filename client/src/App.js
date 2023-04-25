import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Register, Error, ProtectedRoute, Landing } from './pages'


function App() {
  return (
    <Router>
      <Routes>
        
        <Route path='/signup' element={<Register />} />
        
        <Route path='/landing' element={<Landing />} />
        
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
