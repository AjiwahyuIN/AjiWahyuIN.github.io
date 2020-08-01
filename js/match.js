// const API_KEY = "64d0222a56424adf974f9e6cc32f7e54";
// const BASE_URL = "https://api.football-data.org/v2/";

// const LEAGUE_ID = 2021;
let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
let url = `https://api.football-data.org/v2/competitions/2021/matches`;

const fetchAPIMatch = url => {
    return fetch(url, {
            headers: {
                'X-Auth-Token': API_KEY,
                // 'Access-Control-Allow-Origin': 'https://api.football-data.org'
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
}

function getAllMatch() {
    if ("caches" in window) {
        caches.match(url).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    showMatch(data);
                })
            }
        })
    }
    fetchAPIMatch(url)
        .then(data => {
            showMatch(data);
        })
        .catch(error => {
            console.log(error);
        })
}

function showMatch(data) {
    let matches = "";
    let matchElement = document.getElementById("cardMatch");

    data.matches.slice(0, 20).map(function (match) {
        const jsonToStr = JSON.stringify(match);
        matches += `
                    <tr>
                            <td><img src="" alt="mu">
                                <br><strong>${match.homeTeam.name}</strong>
                            </td>
                            <td><strong>${match.score.fullTime.homeTeam}</strong> - <strong>${match.score.fullTime.awayTeam}</strong></td>
                            <td><img src="" alt="mu">
                                <br><strong>${match.awayTeam.name}</strong></td>
                            <td>
                                <ul class="">
                                    <li>
                                        <div class="collapsible-header">
                                            <i class="material-icons">date_range</i><span>${match.utcDate}</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="collapsible-header">
                                            <i class="material-icons">place</i>
                                            ${match.homeTeam.name} Stadium
                                        </div>
                                    </li>
                                </ul>
                                <a onclick="favorite(${jsonToStr})" class="btn centered center-align"
                                    style="background-color: #37003C;">Save This Match</a>
                            </td>
                     </tr>
        `;
    });

    matchElement.innerHTML = `
    <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
                <table class="centered responsive-table">
                    <thead>
                        <tr>
                            <th> </th>
                            <th> </th>
                            <th> </th>
                            <th> </th>
                            <th> </th>
                        </tr>
                    </thead>

                    <tbody id="match" >
                        ${matches}
                    </tbody>
                </table>
            </div>
    `;
}

function getDataTeam() {
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

function getDataTeamById(id) {
    let urlid = 'https://api.football-data.org/v2/teams/' + id;
    return fetch(urlid, {
            headers: {
                'X-Auth-Token': API_KEY,
                // 'Access-Control-Allow-Origin': 'https://api.football-data.org'
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

}