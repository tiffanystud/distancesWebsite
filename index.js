// Recommended: All functions declared here

//Skapar divar för varje stad som appendar vid funktionsanrop. 
function createAllCityBoxes(city) {
    const cityDiv = document.createElement("div");
    cityDiv.classList.add("cityBox");
    cityDiv.textContent = city.name;
    return cityDiv;
}



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
            h2.textContent = target + ' (' + cityValue.country + ')';
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


// Recommended: Ask for the city name and then the rest of the code

const target = prompt("Vilken stad?");
let divCitiesElem = document.getElementById("cities");

//Anrop av funktionen "createAllCityBoxes" för att skapa divar för varje stad.
for (let city of cities) {
    divCitiesElem.append(createAllCityBoxes(city));
};



const cityMatched = isCityFound(target);
console.log(cityMatched);