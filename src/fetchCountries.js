 function fetchCountries(countryName) {
    return fetch(`https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,currencies,population,flags,languages`)
}

// fetchCountries("China")
export{ fetchCountries }
