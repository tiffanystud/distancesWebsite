function createCityBoxes() {

    for (let city of cities) {
        let cityBox = document.createElement("div");
        cityBox.classList.add("cityBox");
        cityBox.textContent = city.name;

        citiesDiv.appendChild(cityBox);
    }

}

function markCityBox(kindOfCityElem, kindOfClassPara) {

    const cityBoxes = document.querySelectorAll(".cityBox");
    let cityBox = null;

    for (let varBox of cityBoxes) {
        if (varBox.textContent === kindOfCityElem.name) {
            cityBox = varBox;
            break;

        }
    }

    if (cityBox) {
        if (kindOfClassPara === "target") {
            cityBox.classList.add(kindOfClassPara);

        } else {
            let cityIdH3;

            if (kindOfClassPara === "closest") {
                cityIdH3 = closestCityElem.id;

            } else {
                cityIdH3 = furthestCityElem.id;

            }

            cityBox.classList.add(cityIdH3);
        }
    }
}

function findCityById(keyOppositeValuePara) {

    for (let varCity of cities) {
        if (varCity.id === keyOppositeValuePara) {
            return varCity;
        }
    }

    return null;
}

function getTargetedCityByName(cityName) {

    for (let city of cities) {
        if (city.name.toLowerCase() === cityName.toLowerCase()) {
            return city;
        }
    }

    return null;
}

function getCityByDistance(targetPara, farOrClosePara) {
    let varTargetCity = null;
    let setOppositeDistance;

    if (farOrClosePara) {
        setOppositeDistance = Infinity;
    } else {
        setOppositeDistance = -10;
    }

    for (let varDistance of distances) {
        if ([varDistance.city1, varDistance.city2].includes(targetPara.id)) {

            let keyOppositeValue;
            if (varDistance.city1 === targetPara.id) {
                keyOppositeValue = varDistance.city2;
            } else {
                keyOppositeValue = varDistance.city1;
            }

            if 
            (
                (farOrClosePara && varDistance.distance < setOppositeDistance)
                ||
                (!farOrClosePara && varDistance.distance > setOppositeDistance)
            ) {
                setOppositeDistance = varDistance.distance;
                varTargetCity = findCityById(keyOppositeValue);
            }
        }
    }

    if (varTargetCity) {
        varTargetCity.distance = setOppositeDistance;
    }

    return varTargetCity;
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
const h2Elem = document.querySelector("h2");
const h3Elem = document.querySelector("h3");
const citiesElem = document.querySelector("#cities");
const tableElem = document.getElementById("table");
const titleElem = document.head.querySelector("title");
const closestCityElem = document.querySelector("#closest");
const furthestCityElem = document.querySelector("#furthest");

// Recommended: Ask for the city name and then the rest of the code

const target = prompt("Vilken stad?");
const targetPara = getTargetedCityByName(target);


createCityBoxes();

if (targetPara !== null) {
    markCityBox(targetPara, "target");

    const varClosestCity = getClosestCity(targetPara);
    const varFurthestCity = getFurthestCity(targetPara);

    markCityBox(varClosestCity, "closest");
    markCityBox(varFurthestCity, "furthest");

    boxDistanceText(varFurthestCity, varClosestCity);

    h2Elem.textContent = targetPara.name + " (" + targetPara.country + ")";
    titleElem.innerHTML = targetPara.name;

} else {

    h2Elem.textContent = target + " is not in the database";
    h3Elem.style.display = "none";
    titleElem.innerHTML = "Not Found";

}

createDistanceTable();
