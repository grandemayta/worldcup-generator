const getCountry = (countries, zone) => {
    return countries.filter(country => country.zone === zone);
};

export default getCountry;