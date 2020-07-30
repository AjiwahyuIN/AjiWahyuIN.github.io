// const API_KEY = "64d0222a56424adf974f9e6cc32f7e54";
// const BASE_URL = "https://api.football-data.org/v2/";

// const LEAGUE_ID = 2021;
let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
let url = `https://api.football-data.org/v2/matches/`;

const fetchAPIMatch = url => {
    return fetch(proxyUrl + url, {
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

    data.matches[0].table.forEach(function (match) {
        matches += `
                    <tr>
                            <td><img src="${match.competition.area.ensignUrl.replace(/^http:\/\//i, 'https://')}" alt="mu">
                                <br><span>${match.homeTeam.name}</span>
                            </td>
                            <td>${match.score.fullTime.homeAway} - ${match.score.fullTime.awayTeam}</td>
                            <td><img src="/img/mu.png" alt="mu">
                                <br><span>${match.awayTeam.name}</span></td>
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
                                            Old Traffold
                                        </div>
                                    </li>
                                </ul>
                                <a onclick="M.toast({html: 'Saved'})" class="btn centered center-align"
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