var races;
var round = [];

var recent = document.querySelector(".recents");
var next = document.querySelector(".nexts");

var total;
loadTotal();

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

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function createHTML() {
    const now = new Date();
    contentRecent = [];
    for(var i = 0; i < total; i++) {
        let race = races.MRData.RaceTable.Races[i];
        let raceDate = new Date(race.date + ' ' + race.time );
        if(  raceDate <= now) {
            fetch(`http://ergast.com/api/f1/${raceDate.getFullYear()}/${race.round}/results.json?limit=30`)
            .then(response => response.json()) // retorna uma promise
            .then(result => {
                console.log(result);
                contentRecent[race.round] = `<li> 
                <p> <strong>Rodada:</strong> ${race.round}, Dia ${raceDate.getDate()}/${raceDate.getMonth() + 1} 
                às ${raceDate.getHours()}:00 horas, horário de Brasília <p> 
                <p><strong>Local:</strong> ${race.Circuit.circuitName}, ${race.Circuit.Location.locality} - ${race.Circuit.Location.country} </p>
                <p><strong>Vencedor: </strong> ${result.MRData.RaceTable.Races["0"].Results["0"].Driver.givenName} ${result.MRData.RaceTable.Races["0"].Results["0"].Driver.familyName} </p>
                <p><strong>Tempo:</strong> ${result.MRData.RaceTable.Races["0"].Results["0"].Time.time}       <p><strong>Melhor volta: </strong> ${result.MRData.RaceTable.Races["0"].Results["0"].FastestLap.Time.time}</p>
                </li>`;
            })
            /* .then(() => {
                recent.insertAdjacentHTML('beforeend', contentRecent[race.round]);
            }) */
            .catch(err => {
                // trata se alguma das promises falhar
                console.error('Failed retrieving information', err);
            });               
        }
        if(  raceDate > now) {
            console.log(races.MRData.RaceTable.Races[i]);
            let contentNext = `<li> <p> <strong>Rodada</strong>: ${race.round}, Dia ${raceDate.getDate()}/${raceDate.getMonth() + 1} 
            às ${raceDate.getHours()}:00 horas, horário de Brasília <p> 
            <p><strong>Local:</strong> ${race.Circuit.circuitName}, ${race.Circuit.Location.locality} - ${race.Circuit.Location.country} </p></li>`;
            next.insertAdjacentHTML('beforeend', contentNext);
        }
    }
    sleep(5000).then(() => {
        for(var i = 1; i < contentRecent.length; i++){
            recent.insertAdjacentHTML('beforeend', contentRecent[i]);
        }
    });
}
