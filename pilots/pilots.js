var pilots;
const imageSearch = require('image-search-google');

console.log(imageSearch.toString());

var total;
loadTotal();

function loadTotal() {
    fetch("http://ergast.com/api/f1/current/drivers.json")
        .then(response => response.json()) // retorna uma promise
        .then(result => {
            total = result.MRData.total;
            loadData(total);
        })
        .catch(err => {
            // trata se alguma das promises falhar
            console.error('Failed retrieving information', err);
        });
}

function loadData(value) {
    fetch(`http://ergast.com/api/f1/current/drivers.json?limit=${value}`)
        .then(response => response.json()) // retorna uma promise
        .then(result => {
            pilots = result;
            createHTML();
        })
        .catch(err => {
            // trata se alguma das promises falhar
            console.error('Failed retrieving information', err);
        });
}

var content_pilots = document.querySelector(".content-pilots");

function createHTML() {
    console.log(pilots);
    for(var i = 0; i < total; i++) {
        content_div = 
        `<div class="pilot">
            <img src="../src/images/photo-profile.png" alt="Piloto X">
            <div class="describer">
                <p>Nome: ${pilots.MRData.DriverTable.Drivers[i].givenName} ${pilots.MRData.DriverTable.Drivers[i].familyName}</p>
                <p>Nacionalidade: ${pilots.MRData.DriverTable.Drivers[i].nationality}</p>
                <p>Data de nascimento: ${pilots.MRData.DriverTable.Drivers[i].dateOfBirth}</p> 
                <p><a href="${pilots.MRData.DriverTable.Drivers[i].url}" target="_blank">Biografia</a></p>
            </div>
        </div>`;
        content_pilots.insertAdjacentHTML('beforeend', content_div);
    }
}