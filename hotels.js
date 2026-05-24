
const hotels = [
  {
    id: 1, name: "Sofitel Legend Metropole Hà Nội", stars: 5,
    location: "Phố Ngô Quyền, Hoàn Kiếm", score: 9.4, scoreLabel: "Xuất sắc",
    price: 3850000, badge: "Best Seller", badgeClass: "gold",
    amenities: ["Hồ bơi", "Spa", "Nhà hàng", "Gym"],
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80",
    category: ["luxury"]
  },
  {
    id: 2, name: "JW Marriott Hanoi", stars: 5,
    location: "Từ Liêm, Cầu Giấy", score: 9.1, scoreLabel: "Tuyệt vời",
    price: 2950000, badge: "Giảm 20%", badgeClass: "",
    amenities: ["Hồ bơi", "Buffet sáng", "Spa"],
    img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&q=80",
    category: ["luxury"]
  },
  {
    id: 3, name: "La Siesta Premium", stars: 4,
    location: "Hàng Bè, Hoàn Kiếm", score: 9.0, scoreLabel: "Tuyệt vời",
    price: 1650000, badge: "Boutique", badgeClass: "jade",
    amenities: ["Rooftop bar", "Bữa sáng", "Wifi"],
    img: "https://images.unsplash.com/photo-1519449556851-5720b33024e7?w=500&q=80",
    category: ["boutique", "oldquarter"]
  },
  {
    id: 4, name: "InterContinental Hanoi Westlake", stars: 5,
    location: "Hồ Tây, Tây Hồ", score: 9.3, scoreLabel: "Xuất sắc",
    price: 3200000, badge: "Hồ Tây", badgeClass: "jade",
    amenities: ["Hồ bơi vô cực", "Spa", "View hồ"],
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&q=80",
    category: ["luxury", "lake"]
  },
  {
    id: 5, name: "Hanoi La Castela Hotel", stars: 3,
    location: "Hàng Gai, Phố cổ", score: 8.5, scoreLabel: "Rất tốt",
    price: 680000, badge: "Tiết kiệm", badgeClass: "",
    amenities: ["Wifi miễn phí", "Lễ tân 24/7"],
    img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&q=80",
    category: ["budget", "oldquarter"]
  },
  {
    id: 6, name: "Apricot Hotel Hanoi", stars: 5,
    location: "Phan Đình Phùng, Ba Đình", score: 9.2, scoreLabel: "Xuất sắc",
    price: 2780000, badge: "Mới khai trương", badgeClass: "jade",
    amenities: ["Hồ bơi", "Nhà hàng", "Bar"],
    img: "https://images.unsplash.com/photo-1551882547-ff40c4c97f7b?w=500&q=80",
    category: ["luxury"]
  }
];

let favs = new Set();
let currentFilter = 'all';

function renderStars(n) {
  return Array(n).fill('<span class="star">★</span>').join('');
}

function renderHotels(filter='all') {
  const grid = document.getElementById('hotelGrid');
  const list = filter === 'all' ? hotels : hotels.filter(h => h.category.includes(filter));
  grid.innerHTML = list.map((h,i) => `
    <div class="hotel-card" style="animation-delay:${i*0.07}s" onclick="openHotel(${h.id})">
      <div class="card-img-wrap">
        <img src="${h.img}" alt="${h.name}" loading="lazy">
        ${h.badge ? `<div class="card-badge ${h.badgeClass}">${h.badge}</div>` : ''}
        <button class="card-fav ${favs.has(h.id)?'active':''}" onclick="toggleFav(event,${h.id})" title="Yêu thích">
          ${favs.has(h.id) ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="card-body">
        <div class="card-stars">${renderStars(h.stars)}</div>
        <div class="card-name">${h.name}</div>
        <div class="card-location">${h.location}</div>
        <div class="card-amenities">
          ${h.amenities.map(a=>`<span class="amenity">${a}</span>`).join('')}
        </div>
        <div class="card-footer">
          <div class="card-score">
            <div class="score-box">${h.score}</div>
            <div class="score-label">
              <strong>${h.scoreLabel}</strong>
              đánh giá khách lưu trú
            </div>
          </div>
          <div class="card-price">
            <span class="price-from">từ</span>
            <div class="price-num">${(h.price/1000).toFixed(0)}K ₫</div>
            <span class="price-night">/đêm</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function filterHotels(el, cat) {
  document.querySelectorAll('.pill').forEach(p=>p.classList.remove('active'));
  el.classList.add('active');
  currentFilter = cat;
  renderHotels(cat);
}

function toggleFav(e, id) {
  e.stopPropagation();
  if(favs.has(id)) { favs.delete(id); showToast('💔 Đã xóa khỏi yêu thích'); }
  else { favs.add(id); showToast('❤️ Đã thêm vào yêu thích!'); }
  renderHotels(currentFilter);
}

function openHotel(id) {
  const h = hotels.find(x=>x.id===id);
  document.getElementById('modalTitle').textContent = h.name;
  document.getElementById('modalDesc').textContent = h.location;
  document.getElementById('modalContent').innerHTML = `
    <img src="${h.img}" style="width:100%;height:180px;object-fit:cover;border-radius:12px;margin-bottom:1rem;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
      <div>${renderStars(h.stars)}</div>
      <div style="font-family:'Cormorant Garamond',serif;font-size:1.5rem;color:var(--red-viet);font-weight:600;">
        ${(h.price/1000).toFixed(0)}K ₫<span style="font-size:0.8rem;color:var(--mist);font-family:'DM Sans',sans-serif;">/đêm</span>
      </div>
    </div>
    <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:1.2rem;">
      ${h.amenities.map(a=>`<span class="amenity">${a}</span>`).join('')}
    </div>
    <button class="btn-primary" style="width:100%;justify-content:center;" onclick="showToast('✅ Đặt phòng thành công! Chúng tôi sẽ liên hệ sớm.');closeModal()">
      Đặt phòng ngay →
    </button>
  `;
  document.getElementById('modal').classList.add('show');
}

function closeModal(e) {
  if(!e || e.target===document.getElementById('modal')) {
    document.getElementById('modal').classList.remove('show');
  }
}
