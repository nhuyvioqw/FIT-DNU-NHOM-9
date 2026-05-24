function openBooking(id) {
  if(!currentUser) {
    showToast('🔐 Vui lòng đăng nhập để đặt phòng');
    setTimeout(()=>openAuth('login'),600);
    return;
  }

  const hotel = hotels.find(h => h.id === id);
  const roomApiId = hotel?._apiId || String(id);
  const checkin  = document.getElementById('checkin')?.value  || '';
  const checkout = document.getElementById('checkout')?.value || '';

  // Hiện toast đang xử lý
  showToast('📋 Đang đặt phòng...');

  const payload = {
    roomId:       roomApiId,
    customerName: currentUser.name,
    phone:        currentUser.email,
    checkIn:      checkin,
    checkOut:     checkout,
    guests:       2,
    status:       'confirmed'
  };

  fetch(BOOKING_API, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload)
  })
  .then(r => r.json())
  .then(data => {
    showToast('✅ Đặt phòng thành công! Mã: #' + data.id);
  })
  .catch(() => {
    showToast('❌ Đặt phòng thất bại, vui lòng thử lại');
  });
}
