import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import FlightResults from './pages/FlightResults'
import ComparePrices from './pages/ComparePrices'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/flight-results" element={<FlightResults />} />
        <Route path="/compare-prices" element={<ComparePrices />} />
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '16px',
          },
        }}
      />
    </>
  )
}

export default App