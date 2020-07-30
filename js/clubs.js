// const API_KEY = "64d0222a56424adf974f9e6cc32f7e54";
// const BASE_URL = " https://api.football-data.org/v2/";

const ENDPOINT_TEAMS = `https://api.football-data.org/v2/teams/`;

const fetchAPITeams = url => {
    return fetch(url, {
            headers: {
                'X-Auth-Token': `64d0222a56424adf974f9e6cc32f7e54`
            }
        })
        .then(res => {
            if (res.status !== 200) {
                console.log("Error : " + res.status);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err);
        })
};

function getAllTeams() {
    if ("caches" in window) {
        caches.match(ENDPOINT_TEAMS).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log("Teams Data :" + data);
                    showTeams(data);
                })
            }
        })
    }

    fetchAPITeams(ENDPOINT_TEAMS)
        .then(data => {
            showTeams(data);
        })
        .catch(error => {
            console.log(error);
        })
}

function showTeams(data) {
    let teams = "";
    let teamsElement = document.getElementById("cardTeams");

    data.teams.forEach(function (team) {
        // console.log(data.teams);
        teamsElement.innerHTML = `
    <div class="col s6 m4 l3">
        <div class="card small hoverable">
            <div class="card-image waves-effect waves-block waves-light">
                <img class="activator" src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}">
            </div>
            <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">${team.name}<i
                        class="material-icons right">more_vert</i></span>
                <!-- <p><a href="#">This is a link</a></p> -->
            </div>
            <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">${team.name}<i
                        class="material-icons right">close</i></span>
                <ul>
                    <li>
                        <span><i class="tiny material-icons">home</i> ${team.venue}</span>
                    </li>
                    <li>
                        <span><i class="tiny material-icons">location_on</i> ${team.address}</span>
                    </li>
                    <li>
                        <span><i class="tiny material-icons">info</i> ${team.phone}</span>
                    </li>
                    <li>
                        <span><i class="tiny material-icons">language</i> ${team.website}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
        `;

    })
}