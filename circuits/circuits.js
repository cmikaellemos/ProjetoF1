var map;

function initialize() {
   var latlng = new google.maps.LatLng(0, 0);

   var options = {
       zoom: 2,
       center: latlng,
       mapTypeId: google.maps.MapTypeId.ROADMAP
   };

   map = new google.maps.Map(document.getElementById("map"), options);
}


var pontos;

function carregarPontos() {
    
    const ponto = pontos.MRData.RaceTable.Races;

    for (var i = 0; i < 20; i++) {
        loadMarker(ponto[i].Circuit);
    }
    
}

function loadMarker(ponto){
    var contentString = ponto.circuitName + ", " + ponto.Location.locality + " - " + ponto.Location.country + '<br>' +
    '<a href="' + ponto.url + '" target="_blank"> Mais informações </a>';
    
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(ponto.Location.lat, ponto.Location.long),
        title: ponto.circuitName + ", " + ponto.Location.locality + " - " + ponto.Location.country,
        
        map: map
    });
    
    marker.addListener('click', function() {
        infowindow.close();
        infowindow.open(map, marker);
    });
}

fetch("http://ergast.com/api/f1/current.json?limit=20")
.then(response => response.json()) // retorna uma promise
.then(result => {
    pontos = result;
    initialize();
    carregarPontos();
})
.catch(err => {
// trata se alguma das promises falhar
console.error('Failed retrieving information', err);
});


