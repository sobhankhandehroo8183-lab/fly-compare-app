import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeftIcon,
  ArrowPathIcon,
  RocketLaunchIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  HomeIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline'
import { 
  TrophyIcon,
  FireIcon,
  CheckCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/solid'

const mockFlightData = {
  airline: 'ترکیش ایرلاینز',
  flightNumber: 'TK-1234',
  origin: 'تهران (IKA)',
  destination: 'استانبول (IST)',
  duration: '3 ساعت',
}

const mockTripPrices = [
  { source: 'trip.com', priceInIRR: 12500000, isBestPrice: true, features: ['پشتیبانی ۲۴/۷', 'لغو رایگان'] },
  { source: 'kayak.com', priceInIRR: 12800000, isBestPrice: false, features: ['مقایسه قیمت'] },
]

const mockDomesticPrices = [
  { source: 'علی‌بابا', priceInIRR: 13800000, isBestPrice: false, features: ['پشتیبانی فارسی', 'پرداخت آسان'] },
  { source: 'فلای‌تودی', priceInIRR: 14200000, isBestPrice: false, features: ['تخفیف ویژه'] },
]

const mockCompareResult = {
  tripPrice: 12500000,
  domesticPrice: 13800000,
  savings: 1300000,
  isCheaper: true,
}

export default function ComparePrices() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const flightId = searchParams.get('flightId')
  
  const [isLoading, setIsLoading] = useState(false)
  const [comparisonResult, setComparisonResult] = useState(null)
  const [tripPrices, setTripPrices] = useState([])
  const [domesticPrices, setDomesticPrices] = useState([])

  const handleCompare = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setComparisonResult(mockCompareResult)
    setTripPrices(mockTripPrices)
    setDomesticPrices(mockDomesticPrices)
    setIsLoading(false)
  }

  useEffect(() => {
    if (flightId) handleCompare()
  }, [flightId])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان'
  }

  if (isLoading) {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/background2.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
          </div>
          <p className="mt-6 text-white text-lg">در حال دریافت قیمت‌ها...</p>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/background2.jpg')" }}
    >
      {/* ===== OVERLAY ===== */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

      {/* ===== HEADER / MENU ===== */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <PaperAirplaneIcon className="w-8 h-8 text-white rotate-45" />
          <span className="text-white font-bold text-xl hidden sm:block">FlyCompare</span>
        </motion.div>

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

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-full transition-all"
          >
            {mobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>

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
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-4">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/flight-results')}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
          >
            <ArrowLeftIcon className="w-6 h-6 text-white" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white drop-shadow-lg">🔍 مقایسه قیمت</h1>
            <p className="text-white/70 text-sm drop-shadow-lg">
              {mockFlightData.origin} → {mockFlightData.destination}
            </p>
          </div>
        </div>

        {/* Flight Info */}
        <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-xs text-white/50">شرکت هواپیمایی</div>
              <div className="font-semibold text-white">{mockFlightData.airline}</div>
            </div>
            <div>
              <div className="text-xs text-white/50">شماره پرواز</div>
              <div className="font-semibold text-white">{mockFlightData.flightNumber}</div>
            </div>
            <div>
              <div className="text-xs text-white/50">مسیر</div>
              <div className="font-semibold text-white">{mockFlightData.origin} → {mockFlightData.destination}</div>
            </div>
            <div>
              <div className="text-xs text-white/50">مدت زمان</div>
              <div className="font-semibold text-white">{mockFlightData.duration}</div>
            </div>
          </div>
        </div>

        {/* Results */}
        {comparisonResult && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Result Card */}
            <div className={`rounded-3xl shadow-2xl p-8 border-2 ${
              comparisonResult.isCheaper 
                ? 'bg-gradient-to-br from-emerald-500/30 to-teal-500/30 border-emerald-400' 
                : 'bg-gradient-to-br from-rose-500/30 to-amber-500/30 border-rose-400'
            } backdrop-blur-sm`}>
              <div className="text-center">
                <span className="text-6xl">{comparisonResult.isCheaper ? '🎉' : '⚠️'}</span>
                <h3 className="text-2xl font-bold mt-2 text-white">
                  {comparisonResult.isCheaper ? (
                    <span className="text-emerald-300">سایت‌های داخلی ارزان‌تر هستند!</span>
                  ) : (
                    <span className="text-rose-300">trip.com ارزان‌تر است!</span>
                  )}
                </h3>
                <p className="text-white/70 mt-2">
                  اختلاف قیمت: <span className="font-bold">{formatPrice(Math.abs(comparisonResult.savings))}</span>
                </p>
                
                {/* Price Bars */}
                <div className="max-w-2xl mx-auto mt-6">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-white/60 w-20 text-right">trip.com</span>
                    <div className="flex-1 h-3 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
                        style={{ width: `${(comparisonResult.tripPrice / Math.max(comparisonResult.tripPrice, comparisonResult.domesticPrice)) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-purple-300">{formatPrice(comparisonResult.tripPrice)}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-sm text-white/60 w-20 text-right">داخلی</span>
                    <div className="flex-1 h-3 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                        style={{ width: `${(comparisonResult.domesticPrice / Math.max(comparisonResult.tripPrice, comparisonResult.domesticPrice)) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-emerald-300">{formatPrice(comparisonResult.domesticPrice)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="font-bold text-lg text-purple-300 flex items-center gap-2 mb-4">
                  <GlobeAltIcon className="w-5 h-5" />
                  بین‌المللی
                </h3>
                {tripPrices.map((price, i) => (
                  <div key={i} className={`flex justify-between items-center p-3 rounded-xl mb-2 ${
                    price.isBestPrice ? 'bg-purple-500/20 border border-purple-400/30' : 'hover:bg-white/5'
                  }`}>
                    <div>
                      <span className="font-medium text-white">{price.source}</span>
                      {price.isBestPrice && (
                        <span className="badge-best text-[10px] ml-2">⭐ بهترین</span>
                      )}
                    </div>
                    <span className={`font-bold ${price.isBestPrice ? 'text-purple-300' : 'text-white/80'}`}>
                      {formatPrice(price.priceInIRR)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="font-bold text-lg text-emerald-300 flex items-center gap-2 mb-4">
                  <ShieldCheckIcon className="w-5 h-5" />
                  داخلی
                </h3>
                {domesticPrices.map((price, i) => (
                  <div key={i} className={`flex justify-between items-center p-3 rounded-xl mb-2 ${
                    price.isBestPrice ? 'bg-emerald-500/20 border border-emerald-400/30' : 'hover:bg-white/5'
                  }`}>
                    <div>
                      <span className="font-medium text-white">{price.source}</span>
                      {price.isBestPrice && (
                        <span className="badge-best text-[10px] ml-2">⭐ بهترین</span>
                      )}
                    </div>
                    <span className={`font-bold ${price.isBestPrice ? 'text-emerald-300' : 'text-white/80'}`}>
                      {formatPrice(price.priceInIRR)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <button
                onClick={() => navigate('/flight-results')}
                className="px-6 py-3 border-2 border-purple-400 text-purple-300 font-semibold rounded-xl hover:bg-purple-500/20 transition-all"
              >
                بازگشت به نتایج
              </button>
              <button
                onClick={handleCompare}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <ArrowPathIcon className="w-5 h-5" />
                مقایسه مجدد
              </button>
              <button
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <RocketLaunchIcon className="w-5 h-5" />
                خرید بلیط
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}