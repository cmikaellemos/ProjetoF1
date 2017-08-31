var races;
var round;

var recent = document.querySelector(".recents");
var next = document.querySelector(".nexts");

var total;
loadTotal();
console.log(recent);

function loadTotal() {
    fetch("http://ergast.com/api/f1/current.json")
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
    fetch(`http://ergast.com/api/f1/current.json?limit=${value}`)
        .then(response => response.json()) // retorna uma promise
        .then(result => {
            races = result;
            createHTML();
        })
        .catch(err => {
            // trata se alguma das promises falhar
            console.error('Failed retrieving information', err);
        });
}

function loadUniqueRace(year, roundNumber) {
    fetch(`http://ergast.com/api/f1/${year}/${roundNumber}/results.json?limit=30`)
    .then(response => response.json()) // retorna uma promise
    .then(result => {
        round = result;
    })
    .catch(err => {
        // trata se alguma das promises falhar
        console.error('Failed retrieving information', err);
    });
}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function createHTML() {
    const now = new Date();
    for(var i = 0; i < total; i++) {
        let race = races.MRData.RaceTable.Races[i];
        let raceDate = new Date(race.date + ' ' + race.time );
        if(  raceDate <= now) {
            loadUniqueRace(raceDate.getFullYear(), race.round);
            sleep(2000).then(() => {
                // Do something after the sleep!
                console.log(races.MRData.RaceTable.Races[i]);
                console.log(round);
                let contentRecent = `<li> 
                <p> <strong>Rodada:</strong> ${race.round}, Dia ${raceDate.getDate()}/${raceDate.getMonth() + 1} 
                às ${raceDate.getHours()}:00 horas, horário de Brasília <p> 
                <p><strong>Local:</strong> ${race.Circuit.circuitName}, ${race.Circuit.Location.locality} - ${race.Circuit.Location.country} </p>
                <p><strong>Vencedor: </strong> ${round.MRData.RaceTable.Races[0].Results.Driver.givenName}</p>
                </li>`;
                recent.insertAdjacentHTML('beforeend', contentRecent);
            })
        }
        if(  raceDate > now) {
            console.log(races.MRData.RaceTable.Races[i]);
            let contentNext = `<li> <p> <strong>Rodada</strong>: ${race.round}, Dia ${raceDate.getDate()}/${raceDate.getMonth() + 1} 
            às ${raceDate.getHours()}:00 horas, horário de Brasília <p> 
            <p><strong>Local:</strong> ${race.Circuit.circuitName}, ${race.Circuit.Location.locality} - ${race.Circuit.Location.country} </p></li>`;
            next.insertAdjacentHTML('beforeend', contentNext);
        }
    }
}
