// Routebeheer van Marktly: koppelt de homepage en het nieuwe-product scherm aan hun paden.
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import NewProduct from './pages/NewProduct.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/nieuw" element={<NewProduct />} />
    </Routes>
  )
}

export default App
