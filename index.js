
// Recommended: All functions declared here

function getTargetedCityByName(cityName) {
    for (let city of cities) {
        if (city.name.toLowerCase() === cityName.toLowerCase()) {
            return city;
        }
    }
    return null;
}

function createCityBoxes() {
    for (let city of cities) {
        let cityBox = document.createElement("div");
        cityBox.classList.add("cityBox");
        cityBox.textContent = city.name;
        citiesElem.appendChild(cityBox);
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

function getClosestCity(targetPara) {
    return getCityByDistance(targetPara, true);
}

function getFurthestCity(targetPara) {
    return getCityByDistance(targetPara, false);
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

            if (
                (farOrClosePara && varDistance.distance < setOppositeDistance) ||
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

function findCityById(keyOppositeValuePara) {
    for (let varCity of cities) {
        if (varCity.id === keyOppositeValuePara) {
            return varCity;
        }
    }
    return null;
}

function distanceBoxText(furthestCityPara, closestCityPara) {
    const closestBoxElem = document.querySelector(".closest");
    const furthestBoxElem = document.querySelector(".furthest");

    closestBoxElem.textContent += " ligger " + closestCityPara.distance / 10 + " mil bort";
    furthestBoxElem.textContent += " ligger " + furthestCityPara.distance / 10 + " mil bort";

    const closestIdInH3 = document.querySelector("#closest");
    const furthestIdInH3 = document.querySelector("#furthest");

    closestIdInH3.textContent = closestCityPara.name;
    furthestIdInH3.textContent = furthestCityPara.name;
}

function createDistanceTable() {
    const numberOfRows = cities.length + 1;
    const numberOfCols = cities.length + 1;

    for (let varRow = 0; varRow < numberOfRows; varRow++) {
        for (let varCol = 0; varCol < numberOfCols; varCol++) {
            let tableCell = document.createElement("div");
            tableCell.classList.add("cell");

            if (varRow === 0) {
                tableCell.classList.add("head_row");
                if (varCol !== 0) {
                    tableCell.textContent = varCol - 1;
                }
            }

            if (varRow >= 1 && varCol >= 1) {
                const city1 = varCol - 1;
                const city2 = varRow - 1;

                let distanceValue = null;
                for (let key in distances) {
                    if (
                        (distances[key].city1 === city1 && distances[key].city2 === city2) ||
                        (distances[key].city2 === city1 && distances[key].city1 === city2)
                    ) {
                        distanceValue = distances[key];
                        break;
                    }
                }

                if (distanceValue) {
                    tableCell.textContent = distanceValue.distance / 10;
                }
            }

            if (varCol === 0) {
                tableCell.classList.add("head_column");
                if (varRow >= 1) {
                    tableCell.textContent = cities[varRow - 1].id + "-" + cities[varRow - 1].name;
                }
            }

            if (varCol % 2 === 1 && varRow !== 0) {
                tableCell.classList.add("even_col");
            }

            if (varRow % 2 === 1) {
                tableCell.classList.add("even_row");
            }

            tableElem.appendChild(tableCell);
        }
    }
}


// Recommended: constants with references to existing HTML-elements

const citiesElem = document.querySelector("#cities");
const h2Elem = document.querySelector("h2");
const h3Elem = document.querySelector("h3");
const closestCityElem = document.querySelector("#closest");
const furthestCityElem = document.querySelector("#furthest");
const tableElem = document.querySelector("#table");
const titleElem = document.head.querySelector("title");


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

    distanceBoxText(varFurthestCity, varClosestCity);

    h2Elem.textContent = targetPara.name + " (" + targetPara.country + ")";
    titleElem.innerHTML = targetPara.name;
} else {
    h2Elem.textContent = target + " finns inte i databasen";
    h3Elem.style.display = "none";
    titleElem.innerHTML = "Not Found";
}

createDistanceTable();
