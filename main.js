
function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 3000);
}

function doSearch() {
  showToast('🔍 Đang tìm kiếm khách sạn phù hợp...');
  setTimeout(()=>{ document.getElementById('hotels').scrollIntoView({behavior:'smooth'}); }, 500);
}

function copyCode() {
  navigator.clipboard?.writeText('HANOI30').catch(()=>{});
  showToast('📋 Đã sao chép mã: HANOI30');
}

function switchTab(el) {
  document.querySelectorAll('.search-tab').forEach(t=>t.classList.remove('active'));
  el.classList.add('active');
}

// COUNTER ANIMATION
function animateCounter(el, target, suffix='') {
  let start = 0; const dur = 1800;
  const step = timestamp => {
    if(!start) start = timestamp;
    const progress = Math.min((timestamp-start)/dur,1);
    const ease = 1 - Math.pow(1-progress,3);
    el.textContent = Math.floor(ease*target).toLocaleString('vi-VN') + suffix;
    if(progress<1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// SCROLL REVEAL
const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:0.1});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// STATS OBSERVER
const statsObserver = new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting) {
    animateCounter(document.getElementById('cntHotels'),800,'+');
    animateCounter(document.getElementById('cntReviews'),48000,'+');
    animateCounter(document.getElementById('cntGuests'),125000,'+');
    statsObserver.disconnect();
  }
},{threshold:0.3});
statsObserver.observe(document.querySelector('.stats-bar'));

// SET DATES
const today = new Date(); const fmt = d=>d.toISOString().split('T')[0];
const tomorrow = new Date(today); tomorrow.setDate(today.getDate()+1);
const dayAfter = new Date(today); dayAfter.setDate(today.getDate()+3);
document.getElementById('checkin').value = fmt(tomorrow);
document.getElementById('checkout').value = fmt(dayAfter);

// INIT
renderHotels();

// ─── ROOM API ─────────────────────────────────────────────
// Fetch rooms từ MockAPI và cập nhật lại grid
const ROOM_API    = 'https://69fc3868fce564e2591782fe.mockapi.io/api/v1/room';
const BOOKING_API = 'https://69fc3868fce564e2591782fe.mockapi.io/api/v1/booking';

fetch(ROOM_API)
  .then(r => r.json())
  .then(apiRooms => {
    // Map API data → định dạng giống hotels[]
    const imgMap = {
      'superior':  'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=500&q=80',
      'deluxe':    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80',
      'executive': 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&q=80',
    };
    const mapped = apiRooms.map(r => ({
      id:         Number(r.id),
      name:       'Phòng ' + r.name,
      stars:      r.price >= 2000000 ? 5 : r.price >= 1000000 ? 4 : 3,
      location:   (r.type || 'Standard') + ' · Tối đa ' + r.guests + ' khách',
      score:      r.price >= 2000000 ? '9.2' : r.price >= 1000000 ? '8.7' : '8.3',
      scoreLabel: r.price >= 2000000 ? 'Xuất sắc' : r.price >= 1000000 ? 'Tuyệt vời' : 'Rất tốt',
      price:      r.price,
      badge:      r.type || null,
      badgeClass: r.type && r.type.toLowerCase()==='deluxe' ? 'gold' : r.type ? 'jade' : '',
      amenities:  [r.type || 'Standard', '👥 ' + r.guests + ' khách'],
      img:        imgMap[(r.type||'').toLowerCase()] || 'https://images.unsplash.com/photo-1551882547-ff40c4c97f7b?w=500&q=80',
      category:   r.price >= 2000000 ? ['luxury'] : r.price >= 1000000 ? ['boutique'] : ['budget'],
      _apiId:     r.id,   // lưu id gốc string để dùng khi đặt phòng
    }));
    // Ghi đè mảng hotels và render lại
    hotels.length = 0;
    mapped.forEach(h => hotels.push(h));
    renderHotels(currentFilter);
    showToast('🏨 Đã tải ' + hotels.length + ' phòng từ hệ thống');
  })
  .catch(() => { /* giữ nguyên dữ liệu mặc định nếu lỗi */ });
