let roomsData = JSON.parse(localStorage.getItem("rooms")) || rooms;

function render(){
  let html = "";

  roomsData.forEach((r,i) => {
    html += `
      <div>
        ${r.name} - ${r.price}k - ${r.location}
        <button onclick="del(${i})">Xoá</button>
      </div>
    `;
  });

  document.getElementById("list").innerHTML = html;
}

function addRoom(){
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let location = document.getElementById("location").value;

  let newRoom = {
    id: Date.now(),
    name,
    price,
    location,
    img: "https://picsum.photos/300/200"
  };

  roomsData.push(newRoom);
  localStorage.setItem("rooms", JSON.stringify(roomsData));

  render();
}

function del(i){
  roomsData.splice(i,1);
  localStorage.setItem("rooms", JSON.stringify(roomsData));
  render();
}

render();