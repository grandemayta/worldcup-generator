import { toArray, getCountry } from './utils/utils.module';

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
                    const countries = toArray(data);
                    const countriesByZone1 = getCountry(countries, 1);
                    const countriesByZone2 = getCountry(countries, 2);
                    const countriesByZone3 = getCountry(countries, 3);
                    const countriesByZone4 = getCountry(countries, 4);
        
                    let innerHTML = '<table>';
                    // ADD GROUPS CELL
                    innerHTML += '<tr>';
                    groups.forEach((group, index) => { 
                        innerHTML += `<th>Group ${group.name}</th>`;
                    });
                    innerHTML += '</tr>'

                    // ADD ZONE1 CELL
                    innerHTML += '<tr>';
                    countriesByZone1.forEach(countryByZone1 => {
                        innerHTML += `<td>${countryByZone1.name}</td>`;
                    });
                    innerHTML += '</tr>';

                    // ADD ZONE2 CELL
                    innerHTML += '<tr>';
                    countriesByZone2.forEach(countryByZone2 => {
                        innerHTML += `<td>${countryByZone2.name}</td>`;
                    });
                    innerHTML += '</tr>';

                    // ADD ZONE3 CELL
                    innerHTML += '<tr>';
                    countriesByZone3.forEach(countryByZone3 => {
                        innerHTML += `<td>${countryByZone3.name}</td>`;
                    });
                    innerHTML += '</tr>';

                    // ADD ZONE4 CELL
                    innerHTML += '<tr>';
                    countriesByZone4.forEach(countryByZone4 => {
                        innerHTML += `<td>${countryByZone4.name}</td>`;
                    });
                    innerHTML += '</tr>';

                    innerHTML +='</table></tr>';
                    element.innerHTML = innerHTML;
                });
        });
});

function templateHtml (group, country) {
    return `<th>
                Group ${group}
            </th>
            <td>
                ${country}
            </td>`;
}