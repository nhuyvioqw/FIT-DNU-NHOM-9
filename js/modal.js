function openModal(id){
  let r = rooms.find(x => x.id === id);

  document.getElementById("modal").classList.add("active");

  document.getElementById("modalContent").innerHTML = `
    <h2>${r.name}</h2>
    <p>${r.price}k / đêm</p>

    <input type="date" id="inDate" onchange="calc(${r.price})">
    <input type="date" id="outDate" onchange="calc(${r.price})">

    <p id="total"></p>

    <button onclick="book(${r.price})">Xác nhận</button>
    <button onclick="closeModal()">Đóng</button>
  `;
}


function closeModal(){
  document.getElementById("modal").classList.remove("active");
}

function calc(price){
  let inD = new Date(document.getElementById("inDate").value);
  let outD = new Date(document.getElementById("outDate").value);

  let nights = (outD - inD)/(1000*60*60*24);

  if(nights > 0){
    document.getElementById("total").innerText =
      nights + " đêm - " + (nights*price) + "k";
  }
}

function book(price){
  alert("Đặt phòng thành công 🔥");
}