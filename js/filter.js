function applyFilter(){
  let price = document.getElementById("price").value;
  let guests = document.getElementById("guests").value;
  let type = document.getElementById("type").value;

  let result = rooms.filter(r =>
    (!price || r.price <= price) &&
    (!guests || r.guests >= guests) &&
    (!type || r.type === type)
  );

  renderRooms(result);
}