const getCountrySelected = (countries) => {
    let index = Math.floor((Math.random() * countries.length));
    let countrySelected = countries[index];

    return {
        countrySelected,
        index
    }
};

export default getCountrySelected;