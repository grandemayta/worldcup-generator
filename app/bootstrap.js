import { toArray, getCountryByZone, getCountrySelected } from './utils/utils.module';

window.addEventListener('load', () => {
    const BASE_URL = 'https://worldcup2018-api.firebaseio.com';
    const element = document.querySelector('#myApp');

    fetch(`${BASE_URL}/groups.json`)
        .then(response => response.json())
        .then(data => {
            const groups = toArray(data);

            fetch(`${BASE_URL}/zone.json`)
                .then( response => response.json() )
                .then( data => {
                    let countries = toArray(data);
                    let wcCountries = {};

                    //TODO FINAL RESULT
                    /* wcCountries = {
                        a: [
                            { name: 'Germany', rel: 1, zone: 1 },
                            { name: 'Perù', rel: 2, zone: 2 }
                        ],
                        b: [
                            { name: 'Argentina', rel: 2, zone: 1 },
                            { name: 'Perù', rel: 2, zone: 2 }
                        ]
                    }; */

                    let countriesByZone1 = getCountryByZone(countries, 1);
                    let countriesByZone2 = getCountryByZone(countries, 2);
                    let countriesByZone3 = getCountryByZone(countries, 3);
                    let countriesByZone4 = getCountryByZone(countries, 4);

                    wcCountries['A'] = [countriesByZone1[0]];
                    countriesByZone1.splice(0, 1);

                    try {

                    let time = 1;

                    debugger;

                        while(time <= 4) {

                            for (let i = time > 1 ? 0 : 1; i < groups.length; i++) {
                                let result;
                                
                                switch(time) {
                                    case 1:
                                        result = getCountrySelected(countriesByZone1);
                                        break;
                                    case 2:
                                        result = getCountrySelected(countriesByZone2);
                                        break;
                                    case 3:
                                        result = getCountrySelected(countriesByZone3);
                                        break;
                                    case 4:
                                        result = getCountrySelected(countriesByZone4);
                                        break;
                                    default:
                                        console.log('Opps!');
                                }

                                if (wcCountries[groups[i].name]) {
                                    let canGo = true;
                                    let findUE = 0;

                                    for(let j = 0; j < wcCountries[groups[i].name].length; j++) {
                                        if (wcCountries[groups[i].name][j].rel === 1) findUE++;
                                        
                                        if (result.countrySelected.rel === 1 && findUE > 1) {
                                            canGo = false;
                                            i-=1;
                                            break
                                        }

                                        else if (result.countrySelected.rel !== 1
                                            && ((wcCountries[groups[i].name][j].rel === result.countrySelected.rel)
                                            || (wcCountries[groups[i].name][j].name === result.countrySelected.name))) {
                                            canGo = false;
                                            i-=1;
                                            break;
                                        }
                                    }

                                    if (canGo) {
                                        wcCountries[groups[i].name].push(result.countrySelected);
                                        if (time === 1) countriesByZone1.splice(result.index, 1);
                                        else if (time == 2) countriesByZone2.splice(result.index, 1);
                                        else if (time === 3) countriesByZone3.splice(result.index, 1);
                                        else countriesByZone4.splice(result.index, 1);
                                    }
                                }
                                else {
                                    wcCountries[groups[i].name] = [result.countrySelected];
                                    if (time === 1) countriesByZone1.splice(result.index, 1);
                                    else if (time == 2) countriesByZone2.splice(result.index, 1);
                                    else if (time === 3) countriesByZone3.splice(result.index, 1);
                                    else countriesByZone4.splice(result.index, 1);
                                }
                            }

                            time++;
                        }

                        console.log(wcCountries);
                    } catch(e) {
                        console.log(e);
                    }

                });
        });
});