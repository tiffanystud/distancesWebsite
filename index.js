// Recommended: All functions declared here

//Skapar divar för varje stad som appendar vid funktionsanrop. 
function createAllCityBoxes(city) {
    const cityDiv = document.createElement("div");
    cityDiv.classList.add("cityBox");
    cityDiv.textContent = city.name;
    return cityDiv;
}

function markCityBox(cityObject, kindOfCity) {
    const cityBoxes = document.querySelectorAll(".cityBox");
    for (let cityBox of cityObject) {
        if (cityBox.textContent == cityObject.name) {
            cityBox.classList.add("target");
        } else if (cityBox > 1) { //Uppdatera villkoret
            cityBox.classList.add("closest");
        } else {
            cityBox.classList.add("furthest");
        }
    }
}




//--------------------------------------------------
//--------------------------------------------------
function createDistanceTable() {
    //Skapar en lista av unika cityIds från distances
    //Här itereras alla avstånd i distances och samlar alla unika städer (city1 och city2)
    const cityIds = [];
    for (let i = 0; i < distances.length; i++) {
        if (!cityIds.includes(distances[i].city1)) {
            cityIds.push(distances[i].city1);  //Lägger till city1 om staden inte redan finns
        }
        if (!cityIds.includes(distances[i].city2)) {
            cityIds.push(distances[i].city2);  //Lägger till city2 om staden inte redan finns
        }
    }

    //Sorterar cityIds i stigande ordning baserat på deras id
    cityIds.sort((a, b) => a - b);

    //Sparar antalet städer
    const citiesCount = cityIds.length; 
    
    //Skapar en div som ska innehålla toppraden för städerna (kolumnrubrikerna) header-row
    const headerRow = document.createElement("div");
    headerRow.classList.add("head_row", "cell");
    tableElem.appendChild(headerRow);  // Lägg till header-raden i tabellen


    //Går igenom cityIds och skapar en cell för varje stad
    for (let i = 0; i < citiesCount; i++) {
        const colHeaderCell = document.createElement("div");
        colHeaderCell.classList.add("head_column", "cell");
        colHeaderCell.textContent = cityIds[i]; //Sätter stadens id som kolumnrubrik
        tableElem.appendChild(colHeaderCell);

        //Lägger till en klass för jämna kolumner
        if (i % 2 === 0) {
            colHeaderCell.classList.add("even_col");
        }
    }

    //Skapa rader för varje stad (rowHeaderCell) och fyll cellerna med avstånd
    for (let i = 0; i < citiesCount; i++) {
        //Skapa ett radhuvud (stadens namn) för varje rad
        const rowHeaderCell = document.createElement("div");
        rowHeaderCell.classList.add("head_row", "cell");

        //Hitta staden i cities-arrayen baserat på id och sätt stadens namn i rowHeaderCell
        const city = cities.find(city => city.id === cityIds[i]);
        rowHeaderCell.textContent = city.id + "-" + city.name;  // Använd stadens namn om 
        tableElem.appendChild(rowHeaderCell);

        //Lägg till en klass för jämna rader
        if (i % 2 === 0) {
            rowHeaderCell.classList.add("even_row");
        }

        //Skapa celler för varje avstånd mellan städer
        //Varje stad gås igenom, skapar en cell för varje avstånd mellan den aktuella staden och den andra staden
        for (let j = 0; j < citiesCount; j++) {
            const cellElem = document.createElement("div");
            cellElem.classList.add("cell");

            //Lägg till en klass för jämna rader och kolumner
            if (i % 2 === 0) {
                cellElem.classList.add("even_row");
            }
            if (j % 2 === 0) {
                cellElem.classList.add("even_col");
            }

            //Hitta avståndet mellan de två städerna (cityIds[i] och cityIds[j])
            let distanceMiles = "";
            for (let k = 0; k < distances.length; k++) {

                //Kolla om avståndsförhållandet gäller mellan de två städerna
                if (
                    (distances[k].city1 === cityIds[i] && distances[k].city2 === cityIds[j]) 
                    ||
                    (distances[k].city2 === cityIds[i] && distances[k].city1 === cityIds[j])
                ) {

                    //Hämta avståndet och ta bort den sista siffran 
                    distanceMiles = distances[k].distance.toString().slice(0, -1);

                    //Avbryt om avståndet är funnet, så behöver det inte letas igenom alla objekt i distances.
                    break;
                }
            }

            //Sätt avståndet i cellens innehåll
            cellElem.textContent = distanceMiles;
            tableElem.appendChild(cellElem);  //Lägg till cellen i tabellen
        }
    }
}
//--------------------------------------------------
//--------------------------------------------------






function isCityFound(target) {
    let cityFound = false;
    let chosenCity = null;
    const targetLC = target.toLowerCase();

    //Sätter "chosenCity" till T/F om "target" matchar något namn i "cities"
    for (let cityValue of cities) {
        const cityValueLC = cityValue.name.toLowerCase()
        titleElem = document.querySelector("title");
        if (targetLC == cityValueLC) {
            //Jämför target med indexerad (chosenCity) array i Cities
            cityFound = true;
            h2.textContent = target + " (" + cityValue.country + ")";
            chosenCity = cityValue;
            //Sätt rätt title (fliken)
            titleElem.innerText = cityValue.name;
            //Avbryt loopen, chosenCity=T, staden finns i databasen
            break;
        } else {
            h2.textContent = target + " finns inte i databasen"
            //Sätt rätt title (fliken)
            titleElem.innerText = "Not Found"
        }
        console.log("__________")
    }
    return cityFound;
};

// Recommended: constants with references to existing HTML-elements
const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const closestCity = document.getElementById("closest");
const furthestCity = document.getElementById("furthest");
const divCities = document.getElementById("cities");
const tableElem = document.getElementById("table");


// Recommended: Ask for the city name and then the rest of the code
const target = prompt("Vilken stad?");


let divCitiesElem = document.getElementById("cities");
//Anrop av funktionen "createAllCityBoxes" för att skapa divar för varje stad.
for (let city of cities) {
    divCitiesElem.append(createAllCityBoxes(city));
};

const cityMatched = isCityFound(target);


// Interering av distances i databasen, det görs ett funktionsanrop per element/object i distances arrayen. 
createDistanceTable();