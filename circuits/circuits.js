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

initialize();

function carregarPontos() {

    $.getJSON("http://ergast.com/api/f1/circuits.json?limit=300", function(pontos) {
        console.log(pontos);
        $.each(pontos.MRData.CircuitTable.Circuits, function(index, ponto) {

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(ponto.Location.lat, ponto.Location.long),
                title: ponto.circuitName + ", " + ponto.Location.locality + " - " + ponto.Location.country,

                map: map
            });

            var contentString = ponto.circuitName + ", " + ponto.Location.locality + " - " + ponto.Location.country + '<br>' +
            '<a href="' + ponto.url + '" target="_blank"> Mais informações </a>';

            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            marker.addListener('click', function() {
                infowindow.open(map, marker);
            });
        });

    });

}

carregarPontos();
