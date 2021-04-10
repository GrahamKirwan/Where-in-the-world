const input = document.querySelector('#search-input');
const resultsContainer = document.querySelector('#results-container');
const regions = document.querySelector('#regions');
const theme = document.querySelector('#colour-theme');
const countryOverlay = document.querySelector('.country_info');
const backBtn = document.querySelector('.back_btn');
const infoContainer = document.querySelector('#info-container');



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

const countryInfo = async function(country) {
    let res = await fetch(`https://restcountries.eu/rest/v2/name/${country}`);
    let data = await res.json();

        let name, flag, population, region, capital, nativeName, subRegion, topLevelDomain, currencies, languages, borders;
        name = data[0].name;
        name = name.charAt(0).toUpperCase() + name.slice(1);
        nativeName = data[0].nativeName;
        subRegion = data[0].subregion;
        flag = data[0].flag;
        population = data[0].population;
        region = data[0].region;
        capital = data[0].capital;
        topLevelDomain = data[0].topLevelDomain[0];
        currencies = data[0].currencies[0].name;
        languages = data[0].languages;
        borders = data[0].borders;
        generateInfoHtml(flag, population, region, name, capital, currencies, topLevelDomain, nativeName, subRegion, languages, borders)
    
}


function generateHtml(flag, population, region, country, capital) {

    let html =  `
        <div class="results_card" name="${country}">
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

// Listen on card container for a click
resultsContainer.addEventListener('click', function(e){
    if(e.path[0].hasAttribute('alt')) {
        let country = e.path[2].getAttribute('name');
        renderCountryDetails(country);
    }
    
})

function renderCountryDetails(country) {
    countryOverlay.style.display = 'initial';
    resultsContainer.style.display = 'none';
    countryInfo(country);
    
}

backBtn.addEventListener('click', function(){
    countryOverlay.style.display = 'none';
    resultsContainer.style.display = 'flex';
    document.querySelector('#info_container_inner').remove();
})

function generateInfoHtml(flag, population, region, name, capital, currencies, topLevelDomain, nativeName, subRegion, languages, borders) {

    
    let html =  `
        <div class="info_container" id="info_container_inner">
            <div class="info_container_left">
                <img src="${flag}" alt="${name}">
            </div>
            <div class="info_container_right">
                <h2 class="info_container_right--heading">${name}</h2>
                <div class="info_container_right--info">
                    <div class="info_container_right--info--left">
                        <p><strong>Native Name: </strong>${nativeName}</p>
                        <p><strong>Population: </strong>${population}</p>
                        <p><strong>Region: </strong>${region}</p>
                        <p><strong>Sub Region: </strong>${subRegion}</p>
                        <p><strong>Capital: </strong>${capital}</p>
                    </div>
                    <div class="info_container_right--info--right">
                        <p><strong>Top Level Domain: </strong>${topLevelDomain}</p>
                        <p><strong>Currencies: </strong>${currencies}</p>
                        <p><strong>Languages: </strong>${languages}</p>
                    </div>
                </div>
                <div class="info_container_right--borders">
                    <p><strong>Border Countries: </strong><span>France</span><span>Germany</span><span>Netherlands</span></p>
                </div>
            </div>
        </div>
    `
    
    infoContainer.insertAdjacentHTML('beforeend', html);

}