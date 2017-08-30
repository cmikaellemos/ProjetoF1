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
            this.races = result;
            createHTMLrecent();
        })
        .catch(err => {
            // trata se alguma das promises falhar
            console.error('Failed retrieving information', err);
        });
}

function loadUniqueRace(year, roundNumber) {
    fetch(`http://ergast.com/api/f1/${year}/.json?limit=${value}`)
    .then(response => response.json()) // retorna uma promise
    .then(result => {
        this.races = result;
        createHTMLrecent();
    })
    .catch(err => {
        // trata se alguma das promises falhar
        console.error('Failed retrieving information', err);
    });
}

function createHTMLrecent() {
    const now = new Date();
    console.log(now);
    for(var i = 0; i < total; i++) {
        let race = races.MRData.RaceTable.Races[i];
        let raceDate = new Date(race.date + ' ' + race.time );
        //loadUniqueRace(raceDate.getFullYear, race.round);
        if(  raceDate <= now) {
            console.log(races.MRData.RaceTable.Races[i]);
            let contentRecent = `<li> <p> Rodada: ${race.round}, Dia ${raceDate.getDate()}/${raceDate.getMonth() + 1} 
            às ${raceDate.getHours()}:00 horas, horário de Brasília <p> </li> <hr>`;
            recent.insertAdjacentHTML('beforeend', contentRecent);
        }
        if(  raceDate > now) {
            console.log(races.MRData.RaceTable.Races[i]);
            let contentNext = `<li> <p> Rodada: ${race.round}, Dia ${raceDate.getDate()}/${raceDate.getMonth() + 1} 
            às ${raceDate.getHours()}:00 horas, horário de Brasília <p> </li> <hr>`;
            next.insertAdjacentHTML('beforeend', contentNext);
        }
    }
}

