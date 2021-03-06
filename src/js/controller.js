const input = document.querySelector('#search-input');
const resultsContainer = document.querySelector('#results-container');
const regions = document.querySelector('#regions');
const theme = document.querySelector('#colour-theme');
const countryOverlay = document.querySelector('.country_info');
const backBtn = document.querySelector('.back_btn');
const infoContainer = document.querySelector('#info-container');
const regionDropdown = document.querySelector('.inputs_filter_dropdown');
const regionFilter = document.querySelector('.inputs_filter');



const apiCall = async function(country) {
    let res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    let data = await res.json();
    let flag = data[0].flags.png;
    let population = data[0].population;
    let region = data[0].region;
    let capital = data[0].capital;
    country = country.charAt(0).toUpperCase() + country.slice(1);
    generateHtml(flag, population, region, country, capital);
}

const findRegions = async function(region) {
    let res = await fetch(`https://restcountries.com/v3.1/region/${region}`);
    let data = await res.json();
    for(var i=data.length-1; i>=0; i--){
        let name, flag, population, region, capital;
        name = data[i].name.common;
        flag = data[i].flags.png;
        population = data[i].population;
        region = data[i].region;
        capital = data[i].capital;
        generateHtml(flag, population, region, name, capital);
    }
}

const allCountries = async function() {
    let res = await fetch(`https://restcountries.com/v3.1/all`);
    let data = await res.json();
    for(var i=data.length-1; i>=0; i--){
        let name, flag, population, region, capital;
        name = data[i].name.common;
        flag = data[i].flags.png;
        population = data[i].population;
        region = data[i].region;
        capital = data[i].capital;
        generateHtml(flag, population, region, name, capital);
    }
}

const countryInfo = async function(country) {
    let res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    let data = await res.json();

        let name, flag, population, region, capital, nativeName, subRegion, topLevelDomain, currencies, languages, borders;
        name = data[0].name.common;
        name = name.charAt(0).toUpperCase() + name.slice(1);
        nativeName = data[0].name.common;
        subRegion = data[0].subregion;
        flag = data[0].flags.png;
        population = data[0].population;
        region = data[0].region;
        capital = data[0].capital;
        topLevelDomain = data[0].tld[0];
        // currencies = data[0].currencies[0].name;
        languages = data[0].languages;
        borders = data[0].borders[0];
        borders = await apiCallBorder(borders);
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

// regions.addEventListener('change', function(e){
//     let region = regions.value;
//     resultsContainer.innerHTML = '';
//     findRegions(region);
    
// });

regionFilter.addEventListener('click', function(){
    regionDropdown.classList.toggle("displayed");
});

regionDropdown.addEventListener('click', function(e){
    if(e.path[0].attributes.value.textContent){
        let region = e.path[0].attributes.value.textContent;
        resultsContainer.innerHTML = '';
        findRegions(region);
        regionDropdown.classList.toggle("displayed");
    }
});


let boo = true;
theme.addEventListener('click', function(){

    if(boo){
        theme.innerHTML = '<i class="far fa-moon"></i> Light Mode';
        makeDark();
        boo = false;
    } else {
        theme.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
        makeLight();
        boo = true;
    }
});

function makeLight() {
    console.log('you just choose light mode');
    myFunction_set_light();
} 

function makeDark() {
    console.log('you just choose dark mode');
    myFunction_set_dark();
}

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
                        <p><strong>Population: </strong>${breakNum(population)}</p>
                        <p><strong>Region: </strong>${region}</p>
                        <p><strong>Sub Region: </strong>${subRegion}</p>
                        <p><strong>Capital: </strong>${capital}</p>
                    </div>
                    <div class="info_container_right--info--right">
                        <p><strong>Top Level Domain: </strong>${topLevelDomain}</p>
                        <p><strong>Currencies: </strong>${currencies}</p>
                        <p><strong>Languages: </strong>${breakLang(languages)}</p>
                    </div>
                </div>
                <div class="info_container_right--borders">
                    <p><strong>Border Countries: </strong>${borders}</p>
                </div>
            </div>
        </div>
    `
    
    infoContainer.insertAdjacentHTML('beforeend', html);

}

function breakLang(languages) {
    let string = '';
    for(let i=0; i<languages.length; i++){
        string = string + languages[i].name + ' ';
    }
    return string;
}


const apiCallBorder = async function(borders) {
    let names = [];
    let stringHtml = '';

    for(let i=0; i<borders.length; i++){
        let res = await fetch(`https://restcountries.com/v3.1/alpha/${borders[i]}`);
        let data = await res.json();
        names.push(data.name);
    }

    for(let x=0; x<names.length; x++){
        stringHtml = stringHtml + `<span>${names[x]}</span>`;
    }
    // return '<span>France</span><span>Germany</span><span>Netherlands</span>';
    return stringHtml;
    

}


// Get the root element
var r = document.querySelector(':root');

// Create a function for setting a variable value
function myFunction_set_dark() {
  r.style.setProperty('--light-bg', 'hsl(207, 26%, 17%)');
  r.style.setProperty('--white', 'hsl(209, 23%, 22%)');
  r.style.setProperty('--black', '#fff');
  r.style.setProperty('--dark-grey', '#fff');
}
function myFunction_set_light() {
    r.style.setProperty('--light-bg', 'hsl(0, 0%, 98%)');
    r.style.setProperty('--white', 'hsl(0, 0%, 100%)');
    r.style.setProperty('--black', '#000');
    r.style.setProperty('--dark-grey', 'hsl(0, 0%, 52%)');
}

// Load in Europe countries on load
// findRegions('Europe');

allCountries();