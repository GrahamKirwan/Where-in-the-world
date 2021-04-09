const input = document.querySelector('#search-input');
const resultsContainer = document.querySelector('#results-container');
const regions = document.querySelector('#regions');
const theme = document.querySelector('#colour-theme');
let cards = document.querySelectorAll('.results_card');


const apiCall = async function(country) {
    let res = await fetch(`https://restcountries.eu/rest/v2/name/${country}`);
    let data = await res.json();
    let flag = data[0].flag;
    let population = data[0].population;
    let region = data[0].region;
    let capital = data[0].capital;
    country = country.charAt(0).toUpperCase() + country.slice(1);
    generateHtml(flag, population, region, country, capital);
}

const findRegions = async function(region) {
    let res = await fetch(`https://restcountries.eu/rest/v2/region/${region}`);
    let data = await res.json();
    for(var i=0; i<data.length; i++){
        let name, flag, population, region, capital;
        name = data[i].name;
        flag = data[i].flag;
        population = data[i].population;
        region = data[i].region;
        capital = data[i].capital;
        generateHtml(flag, population, region, name, capital);
    }
}


function generateHtml(flag, population, region, country, capital) {

    let html =  `
        <div class="results_card">
        <div class="results_card--image">
            <img src="${flag}" alt="${country}">
        </div>
            <div class="results_card_details">
                <h2 class="results_card_details--heading">${country}</h2>
                <p class="results_card_details--pop"><strong>Population:</strong> ${breakNum(population)}</p>
                <p class="results_card_details--region"><strong>Region:</strong> ${region}</p>
                <p class="results_card_details--cap"><strong>Capital:</strong> ${capital}</p>
            </div>
        </div>
    `

    resultsContainer.insertAdjacentHTML('afterbegin', html);
    cards = document.querySelectorAll('.results_card');
    listenForCardClicks();

}

function breakNum(pop) {
    return pop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


input.addEventListener('keyup', function(e) {
    if(e.key === 'Enter' || e.keyCode === 13) {
        let country = input.value;
        apiCall(country);
        input.value = ''
    }

})

regions.addEventListener('change', function(e){
    let region = regions.value;
    resultsContainer.innerHTML = '';
    findRegions(region);
    
});


theme.addEventListener('click', function(){
    theme.innerHTML = '<i class="far fa-moon"></i> Light Mode';
});



function listenForCardClicks() {
    let countryClicked;
    cards.forEach(item => {
        item.addEventListener('click', event => {
          countryClicked = event.path[0].alt;
          renderClickedCountry(countryClicked);
        })

    });

};

listenForCardClicks();


function renderClickedCountry(countryClicked) {
    console.log(countryClicked);
}