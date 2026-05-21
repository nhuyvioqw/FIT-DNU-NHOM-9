// HIỂN THỊ ROOMS
function renderRooms(list = rooms){
  let html = "";

  list.forEach(r => {
    html += `
      <div class="card">
        <img src="${r.img}">
        <div class="card-content">
          <h3>${r.name}</h3>
          <p>${r.location}</p>
          <p class="price">${r.price}k</p>
          <button onclick="openModal(${r.id})">Đặt phòng</button>
        </div>
      </div>
    `;
  });

  document.getElementById("roomList").innerHTML = html;
}

// FILTER LOCATION (Navbar gọi)
function filterLocation(location){
  let result = roomsData.filter(r => r.location === location);
  renderRooms(result);
}

// FEATURED
function renderFeatured(){
  let html = "";

  rooms.slice(0,5).forEach(r => {
    html += `
      <div class="featured-card">
        <img src="${r.img}">
        <div class="featured-content">
          <h4>${r.name}</h4>
          <p>${r.location}</p>
          <p>${r.price}k</p>
        </div>
      </div>
    `;
  });

  document.getElementById("featuredRooms").innerHTML = html;
}

// SECTION
function showSection(id){
  document.querySelectorAll(".section")
    .forEach(s => s.classList.add("hidden"));

  document.getElementById(id).classList.remove("hidden");
}
function goManager(){
  window.location.href = "manager.html";
}
function goAdmin(){
  window.location.href = "admin.html";
}
let roomsData = JSON.parse(localStorage.getItem("rooms")) || rooms;

function renderRooms(list = roomsData){
  let html = "";

  list.forEach(r => {
    html += `
      <div class="card">
        <img src="${r.img}">
        <div class="card-content">
          <h3>${r.name}</h3>
          <p>${r.location}</p>
          <p class="price">${r.price}k</p>
          <button onclick="openModal(${r.id})">Đặt phòng</button>
        </div>
      </div>
    `;
  });

  document.getElementById("roomList").innerHTML = html;
}

// LOAD
renderRooms();
renderFeatured();