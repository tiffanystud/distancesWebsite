// Recommended: All functions declared here

//Sätter chosenCity till T/F om target matchar något namn i "cities"
function isCityFound(target) {
    let cityFound = false;
    let chosenCity = null;
    const targetLC = target.toLowerCase();

    for (let cityValue of cities) {
        const cityValueLC = cityValue.name.toLowerCase()
        console.log("Innan if funktionen.");

        if (targetLC == cityValueLC) {
            console.log("Inuti if-satsen")
            //Jämför target med indexerad (chosenCity) array i Cities
            cityFound = true;
            chosenCity = cityValue;
            console.log(cityFound);
            break;
        } else {
            console.log("Denna stad finns ej");
            console.log(cityFound);
        }
        console.log("Chosen city = '" + chosenCity + "'");
        console.log("__________")
    }
};

// Recommended: constants with references to existing HTML-elements
const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const closestCity = document.getElementById("closest");
const furthestCity = document.getElementById("furthest");
const divCities = document.getElementById("cities");


// Recommended: Ask for the city name and then the rest of the code

const target = prompt("Vilken stad?");
console.log(target);
h2.textContent = target;

isCityFound(target);