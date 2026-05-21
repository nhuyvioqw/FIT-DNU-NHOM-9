function initMap(){
    const hanoi = { lat: 21.0285, lng: 105.8542 };

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: hanoi
    });

    API.rooms.forEach(r => {
        new google.maps.Marker({
            position: {
                lat: hanoi.lat + Math.random()/100,
                lng: hanoi.lng + Math.random()/100
            },
            map,
            title: r.name
        });
    });
}

window.onload = initMap;