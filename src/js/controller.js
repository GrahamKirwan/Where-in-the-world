const input = document.querySelector('#search-input');
const resultsContainer = document.querySelector('#results-container');

const apiCall = async function(country) {
    let res = await fetch(`https://restcountries.eu/rest/v2/name/${country}`);
    let data = await res.json();
    let flag = data[0].flag;
    let population = data[0].population;
    let region = data[0].region;
    let capital = data[0].capital;
    generateHtml(flag, population, region, country, capital);
}


function generateHtml(flag, population, region, country, capital) {

    let html =  `
        <div class="results_card">
        <div class="results_card--image">
            <img src="${flag}" alt="${country}">
        </div>
            <div class="results_card_details">
                <h2 class="results_card_details--heading">${country}</h2>
                <p class="results_card_details--pop"><strong>Population:</strong> ${population}</p>
                <p class="results_card_details--region"><strong>Region:</strong> ${region}</p>
                <p class="results_card_details--cap"><strong>Capital:</strong> ${capital}</p>
            </div>
        </div>
    `

    console.log(html)
    resultsContainer.insertAdjacentHTML('afterbegin', html);
}


input.addEventListener('keyup', function(e) {
    if(e.key === 'Enter' || e.keyCode === 13) {
        let country = input.value;
        apiCall(country);
    }

})