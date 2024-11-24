// Skapar divar för varje stad som appendar vid funktionsanrop.
function createAllCityBoxes(city) {
    const cityDiv = document.createElement("div");
    cityDiv.classList.add("cityBox");
    cityDiv.textContent = city.name;
    return cityDiv;
}

//Funktion för att markera cityBox som target, closest eller furthest
function markCityBox(cityObject, kindOfCity) {
    //Hämta alla stadselement (cityBox) som har klassen "cityBox"
    const cityBoxes = document.querySelectorAll(".cityBox");

    //Iterera genom alla cityBox-divar och uppdatera klasser baserat på stadens namn
    for (let cityBox of cityBoxes) {
        if (cityBox.textContent === cityObject.name) {
            cityBox.classList.add(kindOfCity);
        } else {
            //Ta bort klasserna closest och furthest för de andra städerna
            if (kindOfCity === "closest" || kindOfCity === "furthest") {
                cityBox.classList.remove(kindOfCity);
            }
        }
    }
}

//Hitta staden som ligger närmst och länsgt bort från vald stad
function findClosestAndFurthest(targetCityId) {
    let closestCity = null;
    let furthestCity = null;
    let minDistance = Number.MAX_VALUE;  // Använd ett stort värde som initialvärde
    let maxDistance = -1;  // Använd ett litet värde som initialvärde

    // Iterera genom alla avstånd för att hitta närmaste och längsta stad
    for (let dist of distances) {
        // Kolla om targetCityId är antingen city1 eller city2 i avståndsobjektet
        if (dist.city1 === targetCityId || dist.city2 === targetCityId) {
            // Bestäm den andra staden i distansobjektet
            const otherCityId = (dist.city1 === targetCityId) ? dist.city2 : dist.city1;
            const distance = dist.distance;  // Avståndet mellan de två städerna

            // Kontrollera om detta avstånd är närmast eller längst
            if (distance < minDistance) {
                minDistance = distance;
                closestCity = otherCityId;
            }
            if (distance > maxDistance) {
                maxDistance = distance;
                furthestCity = otherCityId;
            }
        }
    }

    return { closestCity, furthestCity };
}

//Sätter rätt klasser på elementen utefter vald stad, closest och furthest
function updateCityBoxes(targetCityName) {
    //Hitta den stad som användaren valt inkl. LC
    const targetCity = cities.find(city => city.name.toLowerCase() === targetCityName.toLowerCase());

    if (targetCity) {
        //Markera den valda staden som "target"
        markCityBox(targetCity, "target");

        //Hitta närmaste och längst bort städerna
        const { closestCity, furthestCity } = findClosestAndFurthest(targetCity.id);

        //Hitta städerna som är närmst och längst bort 
        const closestCityBox = cities.find(city => city.id === closestCity);
        const furthestCityBox = cities.find(city => city.id === furthestCity);

        //Sätt rätt klass på städerna som hittats
        if (closestCityBox) markCityBox(closestCityBox, "closest");
        if (furthestCityBox) markCityBox(furthestCityBox, "furthest");
    }
}

//Kollar om staden finns i "cities"
function isCityFound(target) {
    let cityFound = false;
    let chosenCity = null;
    const targetLC = target.toLowerCase();

    // Sätter "chosenCity" till T/F om "target" matchar något namn i "cities"
    for (let cityValue of cities) {
        const cityValueLC = cityValue.name.toLowerCase();
        titleElem = document.querySelector("title");

        if (targetLC == cityValueLC) {  // Jämför target med indexerad (chosenCity) array i Cities
            cityFound = true;
            h2.textContent = target + " (" + cityValue.country + ")";
            chosenCity = cityValue;
            titleElem.innerText = cityValue.name;
            break;
        } else {
            h2.textContent = target + " finns inte i databasen";
            titleElem.innerText = "Not Found";
        }
    }
    return cityFound;
};

//Avståndstabellen 
function createDistanceTable() {
    const cityIds = [];
    for (let i = 0; i < distances.length; i++) {
        if (!cityIds.includes(distances[i].city1)) {
            cityIds.push(distances[i].city1);
        }
        if (!cityIds.includes(distances[i].city2)) {
            cityIds.push(distances[i].city2);
        }
    }

    cityIds.sort((a, b) => a - b);
    const citiesCount = cityIds.length;
    const headerRow = document.createElement("div");
    headerRow.classList.add("head_row", "cell");
    tableElem.appendChild(headerRow);

    for (let i = 0; i < citiesCount; i++) {
        const colHeaderCell = document.createElement("div");
        colHeaderCell.classList.add("head_column", "cell");
        colHeaderCell.textContent = cityIds[i];
        tableElem.appendChild(colHeaderCell);
        if (i % 2 === 0) {
            colHeaderCell.classList.add("even_col");
        }
    }

    for (let i = 0; i < citiesCount; i++) {
        const rowHeaderCell = document.createElement("div");
        rowHeaderCell.classList.add("head_row", "cell");
        const city = cities.find(city => city.id === cityIds[i]);
        rowHeaderCell.textContent = city.id + "-" + city.name;
        tableElem.appendChild(rowHeaderCell);
        if (i % 2 === 0) {
            rowHeaderCell.classList.add("even_row");
        }

        for (let j = 0; j < citiesCount; j++) {
            const cellElem = document.createElement("div");
            cellElem.classList.add("cell");
            if (i % 2 === 0) {
                cellElem.classList.add("even_row");
            }
            if (j % 2 === 0) {
                cellElem.classList.add("even_col");
            }

            let distanceMiles = "";
            for (let k = 0; k < distances.length; k++) {
                if (
                    (distances[k].city1 === cityIds[i] && distances[k].city2 === cityIds[j])
                    ||
                    (distances[k].city2 === cityIds[i] && distances[k].city1 === cityIds[j])
                ) {
                    distanceMiles = distances[k].distance.toString().slice(0, -1);
                    break;
                }
            }
            cellElem.textContent = distanceMiles;
            tableElem.appendChild(cellElem);
        }
    }
}

// Recommended: constants with references to existing HTML-elements
const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const divCities = document.getElementById("cities");
const tableElem = document.getElementById("table");

// Exempel på att skapa alla stadselement
let divCitiesElem = document.getElementById("cities");

for (let city of cities) {
    divCitiesElem.append(createAllCityBoxes(city));
}

const target = prompt("Vilken stad?");

const cityMatched = isCityFound(target);

//Uppdatera städerna och markera target, closest och furthest
updateCityBoxes(target);

// Skapa avståndstabellen
createDistanceTable();  