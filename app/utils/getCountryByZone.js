const getCountryByZone = (countries, zone) => {
    return countries.filter(country => country.zone === zone);
};

export default getCountryByZone;