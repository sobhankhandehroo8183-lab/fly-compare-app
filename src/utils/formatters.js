export const formatPrice = (price) => {
  return new Intl.NumberFormat('fa-IR').format(price) + ' تومان'
}

export const formatDate = (date, mode) => {
  const d = new Date(date)
  if (mode === 'HH:mm') {
    return d.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
  }
  return d.toLocaleDateString('fa-IR')
}