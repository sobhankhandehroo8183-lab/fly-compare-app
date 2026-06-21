import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchParams } from '../redux/slices/flightSearchSlice'
import { motion } from 'framer-motion'
import { 
  MagnifyingGlassIcon, 
  CalendarIcon, 
  UserIcon,
  PaperAirplaneIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  ClockIcon,
  CheckBadgeIcon,
  SparklesIcon,
  RocketLaunchIcon,
  HomeIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { FireIcon } from '@heroicons/react/24/solid'
import toast from 'react-hot-toast'

export default function HomePage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    adults: 1,
    children: 0,
    cabinClass: 'economy',
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.origin || !formData.destination || !formData.departureDate) {
      toast.error('لطفاً تمام فیلدهای اجباری را پر کنید')
      return
    }
    if (formData.origin === formData.destination) {
      toast.error('مبدا و مقصد نمی‌توانند یکسان باشند')
      return
    }

    setIsLoading(true)
    dispatch(setSearchParams(formData))
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    navigate('/flight-results')
  }

  const handleInputChange = (e) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value,
    }))
  }

  const popularDestinations = [
    { name: 'استانبول', code: 'IST', flag: '🇹🇷', price: '۱۲.۵M' },
    { name: 'دبی', code: 'DXB', flag: '🇦🇪', price: '۱۸.۵M' },
    { name: 'لندن', code: 'LHR', flag: '🇬🇧', price: '۳۲M' },
    { name: 'پاریس', code: 'CDG', flag: '🇫🇷', price: '۲۸M' },
  ]

  const stats = [
    { number: '۵۰۰+', label: 'مسیر پروازی' },
    { number: '۱۰۰۰+', label: 'کاربر راضی' },
    { number: '۹۸%', label: 'رضایت کاربران' },
    { number: '۲۴/۷', label: 'پشتیبانی' },
  ]

  const features = [
    { icon: <GlobeAltIcon className="w-5 h-5" />, title: 'مقایسه لحظه‌ای', desc: '۵+ منبع معتبر' },
    { icon: <ShieldCheckIcon className="w-5 h-5" />, title: 'ضمانت قیمت', desc: 'تفاوت را برمی‌گردانیم' },
    { icon: <ClockIcon className="w-5 h-5" />, title: 'پشتیبانی ۲۴/۷', desc: 'همیشه در کنار شما' },
    { icon: <SparklesIcon className="w-5 h-5" />, title: 'پرداخت آسان', desc: 'با کلیه کارت‌ها' },
  ]

  return (
    <div 
      className="min-h-screen relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/background.jpg')",
      }}
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
              href="#"
              className="text-sm font-medium hover:text-white transition-colors flex items-center gap-1"
            >
              <HomeIcon className="w-4 h-4" />
              خانه
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05, color: '#fff' }}
              href="#"
              className="text-sm font-medium hover:text-white transition-colors flex items-center gap-1"
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
              <a href="#" className="text-white font-medium p-2 hover:bg-white/10 rounded-xl transition-all">خانه</a>
              <a href="#" className="text-white font-medium p-2 hover:bg-white/10 rounded-xl transition-all">جستجو</a>
              <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white hover:bg-white/30 transition-all border border-white/20">
                ورود / ثبت‌نام
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* ===== MAIN CONTENT - 2 COLUMNS ===== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-4 md:py-8">
        
        {/* ===== HERO TITLE ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-2">
            <span className="gradient-text">پروازهای خارجی</span>
            <br />
            <span className="text-white drop-shadow-lg">با بهترین قیمت</span>
          </h1>

          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto drop-shadow-lg">
            قیمت‌ها را از <span className="text-purple-300 font-bold">trip.com</span> و{' '}
            <span className="text-emerald-300 font-bold">سایت‌های داخلی</span> مقایسه کن
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            {[
              { icon: ShieldCheckIcon, label: 'ضمانت بهترین قیمت', color: 'text-emerald-300' },
              { icon: ClockIcon, label: 'مقایسه لحظه‌ای', color: 'text-purple-300' },
              { icon: CheckBadgeIcon, label: '۱۰۰۰+ مسیر', color: 'text-blue-300' },
              { icon: RocketLaunchIcon, label: 'پرداخت امن', color: 'text-amber-300' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/15 text-xs"
              >
                <item.icon className={`w-4 h-4 ${item.color}`} />
                <span className="text-white/80">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ===== 2 COLUMNS: LEFT (IMAGE) + RIGHT (FORM) ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          
          {/* ===== LEFT - DECORATION / IMAGE ===== */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex flex-col items-center justify-center h-full min-h-[350px] relative"
          >
            <div className="relative w-full max-w-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl blur-3xl" />
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 text-center">
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, -5, 0, 5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-7xl mb-3"
                >
                  ✈️
                </motion.div>
                <h3 className="text-white font-bold text-xl mb-1">سفر خود را برنامه‌ریزی کن</h3>
                <p className="text-white/60 text-sm">بهترین قیمت‌ها را در کمترین زمان پیدا کن</p>
                
                <div className="mt-4 flex items-center justify-center gap-4">
                  <div className="text-center">
                    <div className="text-white font-bold text-lg">۵۰۰+</div>
                    <div className="text-white/40 text-xs">مسیر</div>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div className="text-center">
                    <div className="text-white font-bold text-lg">۱۰۰۰+</div>
                    <div className="text-white/40 text-xs">کاربر</div>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div className="text-center">
                    <div className="text-white font-bold text-lg">۹۸%</div>
                    <div className="text-white/40 text-xs">رضایت</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ===== RIGHT - SEARCH FORM ===== */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/15 backdrop-blur-2xl rounded-3xl p-5 md:p-6 border border-white/20 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1">✈️ مبدا</label>
                  <input
                    type="text"
                    name="origin"
                    value={formData.origin}
                    onChange={handleInputChange}
                    placeholder="تهران (IKA)"
                    className="w-full px-3 py-2 bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 text-sm focus:ring-2 focus:ring-purple-400/50 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1">📍 مقصد</label>
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    placeholder="استانبول (IST)"
                    className="w-full px-3 py-2 bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/50 text-sm focus:ring-2 focus:ring-purple-400/50 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1">📅 تاریخ رفت</label>
                  <input
                    type="date"
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-white text-sm focus:ring-2 focus:ring-purple-400/50 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1">🔄 برگشت</label>
                  <input
                    type="date"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-white text-sm focus:ring-2 focus:ring-purple-400/50 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1">👤 بزرگسالان</label>
                  <input
                    type="number"
                    name="adults"
                    value={formData.adults}
                    onChange={handleInputChange}
                    min="1"
                    max="9"
                    className="w-full px-3 py-2 bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-white text-sm focus:ring-2 focus:ring-purple-400/50 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1">👶 کودکان</label>
                  <input
                    type="number"
                    name="children"
                    value={formData.children}
                    onChange={handleInputChange}
                    min="0"
                    max="9"
                    className="w-full px-3 py-2 bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-white text-sm focus:ring-2 focus:ring-purple-400/50 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1">🎯 کلاس</label>
                  <select
                    name="cabinClass"
                    value={formData.cabinClass}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-white text-sm focus:ring-2 focus:ring-purple-400/50 focus:border-transparent outline-none transition-all"
                  >
                    <option value="economy" className="text-gray-800">اکونومی</option>
                    <option value="premium" className="text-gray-800">پریمیوم</option>
                    <option value="business" className="text-gray-800">بیزینس</option>
                    <option value="first" className="text-gray-800">فرست</option>
                  </select>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/40 hover:shadow-xl hover:shadow-purple-500/50 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    در حال جستجو...
                  </>
                ) : (
                  <>
                    <MagnifyingGlassIcon className="w-4 h-4" />
                    جستجوی پرواز
                  </>
                )}
              </motion.button>
            </form>

            {/* Stats - Small */}
            <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-white/15">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-sm font-bold gradient-text">{stat.number}</div>
                  <div className="text-[10px] text-white/50">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ===== POPULAR DESTINATIONS ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <h3 className="text-sm font-bold text-white/80 flex items-center gap-2 mb-3">
            <FireIcon className="w-4 h-4 text-rose-400 animate-pulse" />
            مقاصد محبوب
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {popularDestinations.map((dest, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -3, scale: 1.03 }}
                className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center border border-white/15 cursor-pointer hover:shadow-lg transition-all"
                onClick={() => setFormData(prev => ({ ...prev, destination: `${dest.name} (${dest.code})` }))}
              >
                <div className="text-2xl">{dest.flag}</div>
                <div className="font-bold text-white text-xs">{dest.name}</div>
                <div className="text-[10px] text-white/50">{dest.code}</div>
                <div className="text-xs text-white font-bold mt-0.5 bg-white/15 rounded-full px-2 py-0.5 inline-block">
                  {dest.price}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ===== FEATURES ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -2 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-2 text-center border border-white/10"
            >
              <div className="text-white/80 mx-auto mb-1">{feature.icon}</div>
              <div className="font-bold text-white text-[10px]">{feature.title}</div>
              <div className="text-[8px] text-white/50">{feature.desc}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ===== FOOTER ===== */}
        <div className="text-center text-[10px] text-white/30 mt-4 pt-3 border-t border-white/5">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <span>🔹 مقایسه بین trip.com، علی‌بابا، فلای‌تودی</span>
            <span>🔹 قیمت‌ها به‌روزرسانی لحظه‌ای</span>
          </div>
        </div>

      </div>
    </div>
  )
}