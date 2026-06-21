import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { 
  ArrowLeftIcon, 
  AdjustmentsHorizontalIcon,
  CheckBadgeIcon,
  HomeIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import { StarIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid'

const mockFlights = [
  {
    id: '1',
    airline: 'ترکیش ایرلاینز',
    flightNumber: 'TK-1234',
    origin: 'IKA',
    destination: 'IST',
    departureTime: new Date(Date.now() + 3600000).toISOString(),
    arrivalTime: new Date(Date.now() + 7200000).toISOString(),
    duration: '180',
    price: 12500000,
    priceInIRR: 12500000,
    stops: 0,
    source: 'trip.com',
    isBestPrice: true,
    rating: 4.8,
    reviews: 234,
  },
  {
    id: '2',
    airline: 'امارات',
    flightNumber: 'EK-5678',
    origin: 'IKA',
    destination: 'DXB',
    departureTime: new Date(Date.now() + 7200000).toISOString(),
    arrivalTime: new Date(Date.now() + 10800000).toISOString(),
    duration: '240',
    price: 18500000,
    priceInIRR: 18500000,
    stops: 1,
    source: 'علی‌بابا',
    isBestPrice: false,
    rating: 4.5,
    reviews: 189,
  },
  {
    id: '3',
    airline: 'قطر ایرویز',
    flightNumber: 'QR-9012',
    origin: 'IKA',
    destination: 'LHR',
    departureTime: new Date(Date.now() + 10800000).toISOString(),
    arrivalTime: new Date(Date.now() + 18000000).toISOString(),
    duration: '360',
    price: 32000000,
    priceInIRR: 32000000,
    stops: 1,
    source: 'فلای‌تودی',
    isBestPrice: false,
    rating: 4.9,
    reviews: 312,
  },
]

export default function FlightResults() {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const flightSearch = useSelector((state) => state.flightSearch)
  const { results, isLoading, origin, destination } = flightSearch
  
  const [filteredResults, setFilteredResults] = useState([])
  const [sortBy, setSortBy] = useState('price')

  const displayResults = results.length > 0 ? results : mockFlights

  useEffect(() => {
    const sorted = [...displayResults]
    if (sortBy === 'price') {
      sorted.sort((a, b) => (a.priceInIRR || 0) - (b.priceInIRR || 0))
    } else if (sortBy === 'duration') {
      sorted.sort((a, b) => (parseInt(a.duration) || 0) - (parseInt(b.duration) || 0))
    } else if (sortBy === 'rating') {
      sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    }
    setFilteredResults(sorted)
  }, [displayResults, sortBy])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان'
  }

  const formatDate = (date, mode) => {
    const d = new Date(date)
    if (mode === 'HH:mm') {
      return d.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
    }
    return d.toLocaleDateString('fa-IR')
  }

  if (isLoading) {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/background1.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <PaperAirplaneIcon className="w-6 h-6 text-purple-500 animate-pulse rotate-45" />
            </div>
          </div>
          <p className="mt-6 text-white text-lg">در حال جستجوی بهترین قیمت‌ها...</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/background1.jpg')" }}
    >
      {/* ===== OVERLAY ===== */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

      {/* ===== HEADER / MENU ===== */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo - Left */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <PaperAirplaneIcon className="w-8 h-8 text-white rotate-45" />
          <span className="text-white font-bold text-xl hidden sm:block">FlyCompare</span>
        </motion.div>

        {/* Menu - Right */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 text-white/80">
            <motion.a 
              whileHover={{ scale: 1.05, color: '#fff' }}
              onClick={() => navigate('/')}
              className="text-sm font-medium hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <HomeIcon className="w-4 h-4" />
              خانه
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05, color: '#fff' }}
              className="text-sm font-medium hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <MagnifyingGlassIcon className="w-4 h-4" />
              جستجو
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white hover:bg-white/30 transition-all border border-white/20"
            >
              ورود / ثبت‌نام
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-full transition-all"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 mt-2 mx-4 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 md:hidden"
          >
            <div className="flex flex-col gap-3">
              <a onClick={() => navigate('/')} className="text-white font-medium p-2 hover:bg-white/10 rounded-xl transition-all cursor-pointer">خانه</a>
              <a className="text-white font-medium p-2 hover:bg-white/10 rounded-xl transition-all cursor-pointer">جستجو</a>
              <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white hover:bg-white/30 transition-all border border-white/20">
                ورود / ثبت‌نام
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-4">
        
        {/* ===== HEADER ===== */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
            >
              <ArrowLeftIcon className="w-6 h-6 text-white" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white drop-shadow-lg">✈️ نتایج پروازها</h1>
              <p className="text-white/70 text-sm drop-shadow-lg">
                {origin || 'مبدا'} → {destination || 'مقصد'} • {filteredResults.length} پرواز
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-white text-sm focus:ring-2 focus:ring-purple-400/50 outline-none"
            >
              <option value="price" className="text-gray-800">قیمت</option>
              <option value="duration" className="text-gray-800">مدت زمان</option>
              <option value="rating" className="text-gray-800">امتیاز</option>
            </select>
          </div>
        </div>

        {/* ===== RESULTS ===== */}
        <div className="space-y-4">
          {filteredResults.length === 0 ? (
            <div className="text-center py-20 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20">
              <p className="text-white/60">هیچ پروازی یافت نشد</p>
            </div>
          ) : (
            filteredResults.map((flight, index) => (
              <motion.div
                key={flight.id || index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:bg-white/25 transition-all cursor-pointer"
                onClick={() => navigate(`/compare-prices?flightId=${flight.id}`)}
              >
                <div className="flex flex-wrap items-center gap-4">
                  {/* Airline */}
                  <div className="flex items-center gap-3 min-w-[120px]">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {flight.airline?.charAt(0) || '✈'}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{flight.airline}</div>
                      <div className="text-xs text-white/50">{flight.flightNumber}</div>
                    </div>
                  </div>

                  {/* Route */}
                  <div className="flex-1 flex items-center justify-center gap-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-white">
                        {formatDate(flight.departureTime, 'HH:mm')}
                      </div>
                      <div className="text-sm text-white/60">{flight.origin}</div>
                    </div>
                    <div className="flex flex-col items-center flex-1 max-w-[150px]">
                      <div className="text-xs text-white/50 flex items-center gap-2">
                        <span>{flight.duration}h</span>
                        {flight.stops === 0 && (
                          <span className="text-emerald-400 text-xs">مستقیم</span>
                        )}
                      </div>
                      <div className="w-full h-[2px] bg-gradient-to-r from-purple-400 to-blue-400 relative">
                        <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2">
                          <div className="w-3 h-3 bg-white border-2 border-purple-400 rounded-full" />
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-white">
                        {formatDate(flight.arrivalTime, 'HH:mm')}
                      </div>
                      <div className="text-sm text-white/60">{flight.destination}</div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-4 min-w-[180px] justify-end">
                    <div className="text-right">
                      <div className="text-2xl font-bold gradient-text">
                        {formatPrice(flight.priceInIRR || flight.price || 0)}
                      </div>
                      <div className="flex items-center gap-2 justify-end mt-1">
                        {flight.isBestPrice && (
                          <span className="badge-best text-[10px]">⭐ بهترین قیمت</span>
                        )}
                        {flight.rating && (
                          <span className="text-xs text-white/50 flex items-center gap-1">
                            <StarIcon className="w-3 h-3 text-amber-400 fill-amber-400" />
                            {flight.rating}
                          </span>
                        )}
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105">
                      مقایسه
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* ===== FOOTER ===== */}
        <div className="text-center text-[10px] text-white/30 mt-6 pt-3 border-t border-white/5">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span>🔹 مقایسه بین trip.com، علی‌بابا، فلای‌تودی</span>
            <span>🔹 قیمت‌ها به‌روزرسانی لحظه‌ای</span>
          </div>
        </div>
      </div>
    </div>
  )
}