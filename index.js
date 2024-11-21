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
function createDistanceTable(arrayElems) {

    //Interera över alla element i distances, lägg till alla unika städer (dvs. kontroll av dubbletter)
    const cityIds = [];
    for (let i = 0; i < distances.length; i++) {
        if (!cityIds.includes(distances[i].city1)) {
            cityIds.push(distances[i].city1);
        }; 
        if (!cityIds.includes(distances[i].city2)) {
            cityIds.push(distances[i].city2);
        }; 
    };


}; //Fyll udda rutor (med modulus??)
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
for (let arrayElems of distances) {
    createDistanceTable(arrayElems);
}
