import './css/styles.css';
import {fetchCountries} from "./fetchCountries"
import Notiflix from 'notiflix';
const Handlebars = require("handlebars");
const debounce = require('lodash.debounce');

const refs = {
    input: document.querySelector('[id="search-box"]'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

const DEBOUNCE_DELAY = 1000;

refs.input.addEventListener("input", debounce(onFormInput, DEBOUNCE_DELAY));

function onFormInput(evt) {
  
    const value = evt.target.value.trim();
    if (value === "") {
          return
      }
    

    fetchCountries(value).then(response => response.json()).then(countries => {
        shownNotifications(countries)
        if (value === "") {
            refs.countryInfo.innerHTML = "";
            refs.countryList.innerHTML = "";

        }
        else if (countries.length === 1) {
            refs.countryList.innerHTML = "";
            refs.countryInfo.innerHTML = renderCountryInfo(countries);
           
        } else {
            refs.countryInfo.innerHTML = "";
            refs.countryList.innerHTML = renderCountryList(countries);
        }
        return countries
        
    })
}


    function renderCountryList(countries) {
        return countries.map(country => `<li><img src="${country.flags.svg}" width=30 height=20 alt="${country.name.common}"><p>${country.name.common}</p></li`).join("")
    }

    function renderCountryInfo(countries) {
        return countries.map(country =>
            `<img src="${country.flags.svg}" alt="${country.name.common}" width=45 height=35/><h2 class="title">${country.name.common}</h2><ul><li class="country-info-item">Capital:<span class="country-info-value">${country.capital}</span></li><li class="country-info-item">Population:<span class="country-info-value">${country.population}</span></li><li class="country-info-item">Languages:<span class="country-info-value">${Object.values(country.languages)}</span></li></ul></div>`).join("")
    }

function shownNotifications(value) {
    if (value.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.', {
          timeout: 3000,
        });
    } else if (value.status === 404) {
        refs.countryList.innerHTML = "";
        Notiflix.Notify.failure('Oops, there is no country with that name', {
            timeout: 3000,
        });
    }
    
}

